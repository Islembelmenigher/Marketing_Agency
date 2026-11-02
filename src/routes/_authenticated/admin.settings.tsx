import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, LoaderCircle, Settings2, Sparkles } from "lucide-react";
import { ErrorPanel, Field, Wordmark } from "@/components/site/brand";
import { adminSettingsQuery, saveSettings } from "@/lib/admin-api";
import { DEFAULT_CONTACT_EMAIL } from "@/lib/site-content";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  const { data, isLoading, isError, refetch } = useQuery(adminSettingsQuery());
  const qc = useQueryClient();
  const [form, setForm] = useState({
    contactEmail: "",
    phone: "",
    location: "",
    instagramUrl: "",
    linkedinUrl: "",
  });
  const [initialized, setInitialized] = useState(false);
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data && !initialized) {
      setForm({
        contactEmail: data.contactEmail || "",
        phone: data.phone || "",
        location: data.location || "",
        instagramUrl: data.instagramUrl || "",
        linkedinUrl: data.linkedinUrl || "",
      });
      setInitialized(true);
    }
  }, [data, initialized]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail))
      return setNotice("Use a valid contact email address.");
    setSaving(true);
    try {
      await saveSettings(form);
      setNotice("Studio details saved.");
      void qc.invalidateQueries({ queryKey: ["admin", "settings"] });
      void qc.invalidateQueries({ queryKey: ["public", "settings"] });
    } catch {
      setNotice("Could not save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="admin-main page-in">
      <div className="admin-page-heading">
        <div>
          <span className="eyebrow">STUDIO / SETTINGS</span>
          <h1 className="display">The details people need.</h1>
          <p>These details appear on the public website and in the studio footer.</p>
        </div>
      </div>
      {isLoading ? (
        <div className="skeleton-card settings-skeleton" />
      ) : isError ? (
        <ErrorPanel message="Studio settings couldn’t load." retry={() => refetch()} />
      ) : (
        <div className="settings-layout">
          <form className="settings-form admin-panel" onSubmit={submit}>
            <div className="admin-panel-head">
              <div>
                <span className="eyebrow">PUBLIC PROFILE</span>
                <h2>Contact details</h2>
              </div>
              <span className="settings-icon">
                <Settings2 size={18} />
              </span>
            </div>
            <Field label="Contact email">
              <input
                type="email"
                value={form.contactEmail}
                onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                placeholder={DEFAULT_CONTACT_EMAIL}
                data-testid="input-setting-email"
              />
            </Field>
            <Field label="Phone">
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+1 555 010 2024"
                data-testid="input-setting-phone"
              />
            </Field>
            <Field label="Location">
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Working everywhere, based in…"
                data-testid="input-setting-location"
              />
            </Field>
            <div className="settings-divider">
              <span className="eyebrow">SOCIAL</span>
              <p>Leave a field blank to hide it from the public site.</p>
            </div>
            <Field label="Instagram URL">
              <input
                type="url"
                value={form.instagramUrl}
                onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
                placeholder="https://instagram.com/…"
                data-testid="input-setting-instagram"
              />
            </Field>
            <Field label="LinkedIn URL">
              <input
                type="url"
                value={form.linkedinUrl}
                onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                placeholder="https://linkedin.com/company/…"
                data-testid="input-setting-linkedin"
              />
            </Field>
            {notice && (
              <div className="admin-notice">
                <Check size={15} />
                {notice}
              </div>
            )}
            <div className="settings-save">
              <span>Changes update the public site after saving.</span>
              <button
                className="admin-primary"
                disabled={saving}
                data-testid="button-save-settings"
              >
                {saving ? <LoaderCircle className="spin" size={15} /> : <Check size={15} />}
                {saving ? "Saving…" : "Save details"}
              </button>
            </div>
          </form>
          <aside className="settings-side">
            <div className="settings-preview">
              <span className="eyebrow">SITE FOOTER / PREVIEW</span>
              <Wordmark inverse />
              <p>{form.contactEmail || DEFAULT_CONTACT_EMAIL}</p>
              <small>{form.location || "Your location will appear here"}</small>
              <div className="preview-social">
                {form.instagramUrl && <span>Instagram ↗</span>}
                {form.linkedinUrl && <span>LinkedIn ↗</span>}
              </div>
            </div>
            <div className="settings-tip">
              <Sparkles size={17} />
              <p>
                <b>A small thought:</b> a human reply address can make a first hello feel more
                personal.
              </p>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
