import { useMemo, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowUpRight,
  Check,
  FileText,
  Globe2,
  LoaderCircle,
  PenLine,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { EmptyPanel, ErrorPanel, Field, LoadingRows } from "@/components/site/brand";
import { adminEntriesQuery, createEntry, deleteEntry, updateEntry } from "@/lib/admin-api";
import { ENTRY_KINDS, type EntryKind, type SiteEntry, type SiteEntryInput } from "@/lib/site-types";

const contentKinds: { label: string; value: "" | EntryKind }[] = [
  { label: "All content", value: "" },
  { label: "Pages", value: "page" },
  { label: "Services", value: "service" },
  { label: "Pricing", value: "pricing" },
  { label: "Articles", value: "article" },
  { label: "Policies", value: "policy" },
  { label: "Projects", value: "project" },
];

const blankEntry: SiteEntryInput = {
  kind: "page",
  slug: "",
  title: "",
  kicker: "",
  summary: "",
  body: "",
  price: null,
  currency: "USD",
  published: false,
  featured: false,
  sortOrder: 0,
  seoTitle: "",
  seoDescription: "",
};

export function AdminContentPage({ type }: { type?: string }) {
  const kind = (ENTRY_KINDS as readonly string[]).includes(type ?? "")
    ? (type as EntryKind)
    : undefined;
  const { data: entries = [], isLoading, isError, refetch } = useQuery(adminEntriesQuery(kind));
  const qc = useQueryClient();
  const [editing, setEditing] = useState<SiteEntry | null>(null);
  const [creating, setCreating] = useState(false);
  const [busy, setBusy] = useState(false);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const filtered = useMemo(
    () =>
      entries.filter((e) =>
        `${e.title} ${e.slug} ${e.summary || ""}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [entries, search],
  );

  const invalidate = () => {
    void qc.invalidateQueries({ queryKey: ["admin"] });
    void qc.invalidateQueries({ queryKey: ["public"] });
  };

  const onSave = async (data: SiteEntryInput, id?: number) => {
    setBusy(true);
    try {
      if (id) {
        await updateEntry(id, data);
        setEditing(null);
        setNotice("Your content was updated.");
      } else {
        await createEntry(data);
        setCreating(false);
        setNotice("New content saved.");
      }
      invalidate();
    } catch (err) {
      const message = err instanceof Error && err.message.includes("slug") ? err.message : null;
      setNotice(
        message ??
          (id
            ? "Could not update that entry. Please try again."
            : "Could not create that entry. Please try again."),
      );
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async (entry: SiteEntry) => {
    if (!window.confirm(`Delete “${entry.title}”? This cannot be undone.`)) return;
    try {
      await deleteEntry(entry.id);
      setNotice("Entry deleted.");
      invalidate();
    } catch {
      setNotice("Could not delete that entry.");
    }
  };

  const onPublish = async (entry: SiteEntry) => {
    try {
      await updateEntry(entry.id, { published: !entry.published });
      setNotice(entry.published ? "Entry returned to draft." : "Entry published.");
      invalidate();
    } catch {
      setNotice("Could not change publish status.");
    }
  };

  return (
    <main className="admin-main page-in">
      <div className="admin-page-heading">
        <div>
          <span className="eyebrow">PUBLISHING / CONTENT</span>
          <h1 className="display">A good story, well told.</h1>
          <p>Manage the content that makes the public site useful.</p>
        </div>
        <button
          className="admin-primary"
          onClick={() => {
            setCreating(true);
            setEditing(null);
          }}
          data-testid="button-new-entry"
        >
          <Plus size={16} /> New entry
        </button>
      </div>
      <div className="content-controls">
        <div className="admin-tabs">
          {contentKinds.map((item) =>
            item.value ? (
              <Link
                to="/admin/content/$type"
                params={{ type: item.value }}
                key={item.label}
                className={kind === item.value ? "selected" : ""}
              >
                {item.label}
              </Link>
            ) : (
              <Link to="/admin/content" key={item.label} className={!kind ? "selected" : ""}>
                {item.label}
              </Link>
            ),
          )}
        </div>
        <label className="search-input">
          <Search size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search content"
            data-testid="input-search-content"
          />
        </label>
      </div>
      {notice && (
        <div className="admin-notice" role="status">
          <Check size={15} />
          {notice}
          <button onClick={() => setNotice("")} aria-label="Dismiss">
            <X size={14} />
          </button>
        </div>
      )}
      {isLoading ? (
        <LoadingRows />
      ) : isError ? (
        <ErrorPanel message="Content couldn’t load." retry={() => refetch()} />
      ) : filtered.length ? (
        <div className="content-table">
          <div className="table-head">
            <span>ENTRY</span>
            <span>TYPE</span>
            <span>UPDATED</span>
            <span>STATUS</span>
            <span>ACTIONS</span>
          </div>
          {filtered.map((entry) => (
            <div className="content-row" key={entry.id}>
              <div className="content-title">
                <span className="content-type-icon">
                  <FileText size={16} />
                </span>
                <div>
                  <b>{entry.title}</b>
                  <small>/{entry.slug}</small>
                </div>
              </div>
              <span className="content-kind">{entry.kind}</span>
              <span className="content-date">{new Date(entry.updatedAt).toLocaleDateString()}</span>
              <span className={`status-pill ${entry.published ? "published" : "draft"}`}>
                {entry.published ? "Published" : "Draft"}
              </span>
              <div className="row-actions">
                <button
                  title={entry.published ? "Unpublish" : "Publish"}
                  aria-label={entry.published ? "Unpublish entry" : "Publish entry"}
                  onClick={() => onPublish(entry)}
                  data-testid={`button-toggle-publish-${entry.id}`}
                >
                  {entry.published ? <Globe2 size={16} /> : <ArrowUpRight size={16} />}
                </button>
                <button
                  title="Edit entry"
                  aria-label="Edit entry"
                  onClick={() => {
                    setEditing(entry);
                    setCreating(false);
                  }}
                  data-testid={`button-edit-entry-${entry.id}`}
                >
                  <PenLine size={16} />
                </button>
                <button
                  title="Delete entry"
                  aria-label="Delete entry"
                  onClick={() => onDelete(entry)}
                  data-testid={`button-delete-entry-${entry.id}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyPanel
          title="Nothing here yet."
          text="Create a page, article, service detail or policy. Drafts stay private until you publish."
          action={
            <button className="admin-primary" onClick={() => setCreating(true)}>
              <Plus size={16} /> Create an entry
            </button>
          }
        />
      )}
      {(creating || editing) && (
        <EntryEditor
          key={editing?.id ?? "new"}
          entry={editing || undefined}
          initialKind={kind}
          busy={busy}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          onSave={(data) => onSave(data, editing?.id)}
        />
      )}
    </main>
  );
}

function EntryEditor({
  entry,
  initialKind,
  busy,
  onClose,
  onSave,
}: {
  entry: SiteEntry | undefined;
  initialKind: EntryKind | undefined;
  busy: boolean;
  onClose: () => void;
  onSave: (data: SiteEntryInput) => void;
}) {
  const [form, setForm] = useState<SiteEntryInput>(() =>
    entry
      ? {
          kind: entry.kind,
          slug: entry.slug,
          title: entry.title,
          kicker: entry.kicker || "",
          summary: entry.summary || "",
          body: entry.body,
          price: entry.price,
          currency: entry.currency || "USD",
          published: entry.published,
          featured: entry.featured,
          sortOrder: entry.sortOrder,
          seoTitle: entry.seoTitle || "",
          seoDescription: entry.seoDescription || "",
        }
      : { ...blankEntry, kind: initialKind || "page" },
  );
  const [error, setError] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) return setError("Title and slug are required.");
    if (form.slug.length > 160) return setError("Keep the slug under 160 characters.");
    setError("");
    onSave({
      ...form,
      title: form.title.trim(),
      slug: form.slug.trim().toLowerCase().replace(/\s+/g, "-"),
      price:
        form.price === null || form.price === undefined || Number.isNaN(form.price)
          ? null
          : Number(form.price),
      sortOrder: Number(form.sortOrder) || 0,
    });
  };
  const set = <K extends keyof SiteEntryInput>(key: K, value: SiteEntryInput[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));
  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form className="entry-modal" onSubmit={submit} noValidate>
        <div className="modal-head">
          <div>
            <span className="eyebrow">{entry ? "EDIT ENTRY" : "NEW ENTRY"}</span>
            <h2>{entry ? "Shape the details." : "Start with the essentials."}</h2>
          </div>
          <button type="button" className="icon-close" onClick={onClose} aria-label="Close editor">
            <X size={18} />
          </button>
        </div>
        <div className="entry-form-scroll">
          <div className="form-row">
            <Field label="Title" required>
              <input
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                maxLength={240}
                autoFocus
                data-testid="input-entry-title"
              />
            </Field>
            <Field label="Content type">
              <select value={form.kind} onChange={(e) => set("kind", e.target.value as EntryKind)}>
                {ENTRY_KINDS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="URL slug" required>
            <input
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              placeholder="a-clear-useful-slug"
              maxLength={160}
              data-testid="input-entry-slug"
            />
          </Field>
          <div className="form-row">
            <Field label="Kicker">
              <input value={form.kicker || ""} onChange={(e) => set("kicker", e.target.value)} />
            </Field>
            <Field label="Summary">
              <input value={form.summary || ""} onChange={(e) => set("summary", e.target.value)} />
            </Field>
          </div>
          <Field label="Body copy">
            <textarea
              rows={9}
              maxLength={30000}
              value={form.body}
              onChange={(e) => set("body", e.target.value)}
            />
          </Field>
          <div className="form-row">
            <Field label="Price">
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price ?? ""}
                onChange={(e) =>
                  set("price", e.target.value === "" ? null : Number(e.target.value))
                }
              />
            </Field>
            <Field label="Currency">
              <input
                maxLength={3}
                value={form.currency || ""}
                onChange={(e) => set("currency", e.target.value.toUpperCase())}
              />
            </Field>
            <Field label="Sort order">
              <input
                type="number"
                value={form.sortOrder ?? 0}
                onChange={(e) => set("sortOrder", Number(e.target.value))}
              />
            </Field>
          </div>
          <div className="form-row">
            <Field label="SEO title">
              <input
                maxLength={240}
                value={form.seoTitle || ""}
                onChange={(e) => set("seoTitle", e.target.value)}
              />
            </Field>
            <Field label="SEO description">
              <input
                maxLength={320}
                value={form.seoDescription || ""}
                onChange={(e) => set("seoDescription", e.target.value)}
              />
            </Field>
          </div>
          <div className="toggle-row">
            <label>
              <input
                type="checkbox"
                checked={!!form.published}
                onChange={(e) => set("published", e.target.checked)}
              />{" "}
              Publish this entry
            </label>
            <label>
              <input
                type="checkbox"
                checked={!!form.featured}
                onChange={(e) => set("featured", e.target.checked)}
              />{" "}
              Feature on site
            </label>
          </div>
          {error && <p className="form-error">{error}</p>}
        </div>
        <div className="modal-actions">
          <button className="button-quiet" type="button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="admin-primary"
            disabled={busy}
            type="submit"
            data-testid="button-save-entry"
          >
            {busy ? <LoaderCircle className="spin" size={15} /> : <Check size={15} />}
            {busy ? "Saving…" : "Save entry"}
          </button>
        </div>
      </form>
    </div>
  );
}
