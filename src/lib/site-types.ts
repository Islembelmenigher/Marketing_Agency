import type { Tables } from "@/integrations/supabase/types";

export const ENTRY_KINDS = ["page", "service", "pricing", "project", "article", "policy"] as const;
export type EntryKind = (typeof ENTRY_KINDS)[number];

export const LEAD_STATUSES = ["new", "contacted", "qualified", "archived"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type SiteEntry = {
  id: number;
  kind: EntryKind;
  slug: string;
  title: string;
  kicker: string | null;
  summary: string | null;
  body: string;
  price: number | null;
  currency: string | null;
  published: boolean;
  featured: boolean;
  sortOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SiteEntryInput = {
  kind: EntryKind;
  slug: string;
  title: string;
  kicker: string | null;
  summary: string | null;
  body: string;
  price: number | null;
  currency: string | null;
  published: boolean;
  featured: boolean;
  sortOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
};

export type ContactRequest = {
  id: number;
  name: string;
  email: string;
  brand: string | null;
  siteUrl: string | null;
  service: string | null;
  message: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
};

export type SiteSettings = {
  contactEmail: string | null;
  phone: string | null;
  location: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
};

export const emptySettings: SiteSettings = {
  contactEmail: null,
  phone: null,
  location: null,
  instagramUrl: null,
  linkedinUrl: null,
};

export function mapEntry(row: Tables<"site_entries">): SiteEntry {
  return {
    id: row.id,
    kind: row.kind as EntryKind,
    slug: row.slug,
    title: row.title,
    kicker: row.kicker,
    summary: row.summary,
    body: row.body,
    price: row.price,
    currency: row.currency,
    published: row.published,
    featured: row.featured,
    sortOrder: row.sort_order,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function entryInputToRow(input: Partial<SiteEntryInput>) {
  const row: Record<string, unknown> = {};
  if (input.kind !== undefined) row.kind = input.kind;
  if (input.slug !== undefined) row.slug = input.slug;
  if (input.title !== undefined) row.title = input.title;
  if (input.kicker !== undefined) row.kicker = input.kicker || null;
  if (input.summary !== undefined) row.summary = input.summary || null;
  if (input.body !== undefined) row.body = input.body;
  if (input.price !== undefined) row.price = input.price;
  if (input.currency !== undefined) row.currency = input.currency || null;
  if (input.published !== undefined) row.published = input.published;
  if (input.featured !== undefined) row.featured = input.featured;
  if (input.sortOrder !== undefined) row.sort_order = input.sortOrder;
  if (input.seoTitle !== undefined) row.seo_title = input.seoTitle || null;
  if (input.seoDescription !== undefined) row.seo_description = input.seoDescription || null;
  return row;
}

export function mapLead(row: Tables<"contact_requests">): ContactRequest {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    brand: row.brand,
    siteUrl: row.site_url,
    service: row.service,
    message: row.message,
    status: row.status as LeadStatus,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapSettings(row: Tables<"site_settings"> | null | undefined): SiteSettings {
  if (!row) return emptySettings;
  return {
    contactEmail: row.contact_email,
    phone: row.phone,
    location: row.location,
    instagramUrl: row.instagram_url,
    linkedinUrl: row.linkedin_url,
  };
}

export function formatDate(value: string, options: Intl.DateTimeFormatOptions) {
  return new Date(value).toLocaleDateString("en", { timeZone: "UTC", ...options });
}
