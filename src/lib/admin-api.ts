import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  entryInputToRow,
  mapEntry,
  mapLead,
  mapSettings,
  type EntryKind,
  type LeadStatus,
  type SiteEntryInput,
  type SiteSettings,
} from "./site-types";

// All reads and writes here run as the signed-in user; the database only allows them for admins.

export const isAdminQuery = (userId: string | undefined) =>
  queryOptions({
    queryKey: ["admin", "is-admin", userId ?? "none"],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) return false;
      const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
      if (error) throw error;
      return data === true;
    },
  });

export const adminOverviewQuery = () =>
  queryOptions({
    queryKey: ["admin", "overview"],
    queryFn: async () => {
      const count = async (table: "contact_requests" | "site_entries", filter?: [string, string | boolean]) => {
        let q = supabase.from(table).select("id", { count: "exact", head: true });
        if (filter) q = q.eq(filter[0], filter[1]);
        const { count: c, error } = await q;
        if (error) throw error;
        return c ?? 0;
      };
      const [totalLeads, newLeads, publishedEntries, draftEntries, recent] = await Promise.all([
        count("contact_requests"),
        count("contact_requests", ["status", "new"]),
        count("site_entries", ["published", true]),
        count("site_entries", ["published", false]),
        supabase.from("contact_requests").select("*").order("created_at", { ascending: false }).limit(5),
      ]);
      if (recent.error) throw recent.error;
      return { totalLeads, newLeads, publishedEntries, draftEntries, recentLeads: recent.data.map(mapLead) };
    },
  });

export const adminEntriesQuery = (kind?: EntryKind) =>
  queryOptions({
    queryKey: ["admin", "entries", kind ?? "all"],
    queryFn: async () => {
      let q = supabase.from("site_entries").select("*");
      if (kind) q = q.eq("kind", kind).order("sort_order").order("id");
      else q = q.order("kind").order("sort_order").order("id");
      const { data, error } = await q;
      if (error) throw error;
      return data.map(mapEntry);
    },
  });

export async function createEntry(input: SiteEntryInput) {
  const { data, error } = await supabase
    .from("site_entries")
    .insert(entryInputToRow(input) as never)
    .select()
    .single();
  if (error) {
    if (error.code === "23505") throw new Error("An entry with this slug already exists.");
    throw error;
  }
  return mapEntry(data);
}

export async function updateEntry(id: number, input: Partial<SiteEntryInput>) {
  const { data, error } = await supabase
    .from("site_entries")
    .update(entryInputToRow(input) as never)
    .eq("id", id)
    .select()
    .single();
  if (error) {
    if (error.code === "23505") throw new Error("An entry with this slug already exists.");
    throw error;
  }
  return mapEntry(data);
}

export async function deleteEntry(id: number) {
  const { error } = await supabase.from("site_entries").delete().eq("id", id);
  if (error) throw error;
}

export const adminLeadsQuery = (status?: LeadStatus) =>
  queryOptions({
    queryKey: ["admin", "leads", status ?? "all"],
    queryFn: async () => {
      let q = supabase.from("contact_requests").select("*");
      if (status) q = q.eq("status", status);
      const { data, error } = await q.order("created_at", { ascending: false });
      if (error) throw error;
      return data.map(mapLead);
    },
  });

export async function updateLeadStatus(id: number, status: LeadStatus) {
  const { data, error } = await supabase
    .from("contact_requests")
    .update({ status })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return mapLead(data);
}

export const adminSettingsQuery = () =>
  queryOptions({
    queryKey: ["admin", "settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();
      if (error) throw error;
      return mapSettings(data);
    },
  });

export async function saveSettings(settings: SiteSettings) {
  const { data, error } = await supabase
    .from("site_settings")
    .upsert({
      id: 1,
      contact_email: settings.contactEmail || null,
      phone: settings.phone || null,
      location: settings.location || null,
      instagram_url: settings.instagramUrl || null,
      linkedin_url: settings.linkedinUrl || null,
    })
    .select()
    .single();
  if (error) throw error;
  return mapSettings(data);
}
