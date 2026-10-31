import { queryOptions } from "@tanstack/react-query";
import { getPublicEntry, getPublicSettings, listPublicEntries } from "./site.functions";
import type { EntryKind } from "./site-types";

export const publicEntriesQuery = (kind?: EntryKind) =>
  queryOptions({
    queryKey: ["public", "entries", kind ?? "all"],
    queryFn: () => listPublicEntries({ data: kind ? { kind } : undefined }),
  });

export const publicEntryQuery = (slug: string) =>
  queryOptions({
    queryKey: ["public", "entry", slug],
    queryFn: () => getPublicEntry({ data: { slug } }),
  });

export const publicSettingsQuery = () =>
  queryOptions({
    queryKey: ["public", "settings"],
    queryFn: () => getPublicSettings(),
    staleTime: 5 * 60_000,
  });
