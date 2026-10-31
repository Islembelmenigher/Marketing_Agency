import { createClient } from "@supabase/supabase-js";
import { getRequestIP } from "@tanstack/react-start/server";
import type { Database } from "@/integrations/supabase/types";

/** Read-only client for public data; RLS limits it to published content. */
export function createPublicClient() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("Backend connection is not configured");
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

/** One-way hash of the caller's IP so rate limiting never stores raw addresses. */
export async function getCallerFingerprint() {
  const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`loop-lift:${ip}`));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
