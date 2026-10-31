import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { CONTACT_RATE_LIMIT, CONTACT_THANKS, contactSchema } from "./contact-schema";
import { ENTRY_KINDS, mapEntry, mapSettings } from "./site-types";
import { createPublicClient, getCallerFingerprint } from "./site.server";

export const listPublicEntries = createServerFn({ method: "GET" })
  .inputValidator((data: { kind?: (typeof ENTRY_KINDS)[number] } | undefined) =>
    z.object({ kind: z.enum(ENTRY_KINDS).optional() }).optional().parse(data),
  )
  .handler(async ({ data }) => {
    const client = createPublicClient();
    let query = client.from("site_entries").select("*").eq("published", true);
    if (data?.kind) query = query.eq("kind", data.kind);
    const { data: rows, error } = await query
      .order("sort_order", { ascending: true })
      .order("id", { ascending: true });
    if (error) {
      console.error("listPublicEntries failed", error);
      throw new Error("Could not load entries");
    }
    return rows.map(mapEntry);
  });

export const getPublicEntry = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => z.object({ slug: z.string().min(1).max(160) }).parse(data))
  .handler(async ({ data }) => {
    const client = createPublicClient();
    const { data: row, error } = await client
      .from("site_entries")
      .select("*")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) {
      console.error("getPublicEntry failed", error);
      throw new Error("Could not load entry");
    }
    return row ? mapEntry(row) : null;
  });

export const getPublicSettings = createServerFn({ method: "GET" }).handler(async () => {
  const client = createPublicClient();
  const { data: row, error } = await client.from("site_settings").select("*").limit(1).maybeSingle();
  if (error) {
    console.error("getPublicSettings failed", error);
    throw new Error("Could not load settings");
  }
  return mapSettings(row);
});

export type ContactResult =
  | { accepted: true; message: string }
  | { accepted: false; reason: "invalid" | "rate_limited" | "error" };

export const submitContactRequest = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data)
  .handler(async ({ data }): Promise<ContactResult> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Rate limit every attempt per caller, like the original endpoint.
    const fingerprint = await getCallerFingerprint();
    const windowStart = new Date(Date.now() - CONTACT_RATE_LIMIT.windowMinutes * 60_000).toISOString();
    const { count, error: countError } = await supabaseAdmin
      .from("contact_attempts")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", fingerprint)
      .gte("created_at", windowStart);
    if (countError) {
      console.error("contact rate-limit check failed", countError);
      return { accepted: false, reason: "error" };
    }
    if ((count ?? 0) >= CONTACT_RATE_LIMIT.max) return { accepted: false, reason: "rate_limited" };
    await supabaseAdmin.from("contact_attempts").insert({ ip_hash: fingerprint });
    await supabaseAdmin
      .from("contact_attempts")
      .delete()
      .lt("created_at", new Date(Date.now() - 24 * 60 * 60_000).toISOString());

    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) return { accepted: false, reason: "invalid" };

    // Bots that fill the hidden field get the same reply, but nothing is stored.
    if (parsed.data.honeypot?.trim()) return { accepted: true, message: CONTACT_THANKS };

    const { error } = await supabaseAdmin.from("contact_requests").insert({
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      brand: parsed.data.brand || null,
      site_url: parsed.data.siteUrl || null,
      service: parsed.data.service || null,
      message: parsed.data.message,
    });
    if (error) {
      console.error("contact insert failed", error);
      return { accepted: false, reason: "error" };
    }
    return { accepted: true, message: CONTACT_THANKS };
  });
