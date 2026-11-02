import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowUpRight, Check, Globe2, Mail, ShoppingBag, X } from "lucide-react";
import { EmptyPanel, ErrorPanel, LoadingRows } from "@/components/site/brand";
import { adminLeadsQuery, updateLeadStatus } from "@/lib/admin-api";
import { LEAD_STATUSES, type ContactRequest, type LeadStatus } from "@/lib/site-types";
import { DEFAULT_CONTACT_EMAIL } from "@/lib/site-content";

export const Route = createFileRoute("/_authenticated/admin/leads")({
  component: AdminLeadsPage,
});

function AdminLeadsPage() {
  const [status, setStatus] = useState<"" | LeadStatus>("");
  const [selected, setSelected] = useState<ContactRequest | null>(null);
  const {
    data: leads = [],
    isLoading,
    isError,
    refetch,
  } = useQuery(adminLeadsQuery(status || undefined));
  const qc = useQueryClient();
  const [notice, setNotice] = useState("");

  const changeStatus = async (lead: ContactRequest, next: LeadStatus) => {
    try {
      await updateLeadStatus(lead.id, next);
      void qc.invalidateQueries({ queryKey: ["admin"] });
      setNotice(`${lead.name} marked ${next}.`);
      if (selected) setSelected({ ...selected, status: next });
    } catch {
      setNotice("Could not update this enquiry.");
    }
  };

  return (
    <main className="admin-main page-in">
      <div className="admin-page-heading">
        <div>
          <span className="eyebrow">INBOX / ENQUIRIES</span>
          <h1 className="display">The people behind the next move.</h1>
          <p>Read the context, then make a thoughtful first response.</p>
        </div>
        <a className="admin-secondary" href={`mailto:${DEFAULT_CONTACT_EMAIL}`}>
          <Mail size={16} /> Email studio
        </a>
      </div>
      <div className="lead-filters">
        {(["", ...LEAD_STATUSES] as const).map((s) => (
          <button
            key={s || "all"}
            className={status === s ? "selected" : ""}
            onClick={() => setStatus(s)}
            data-testid={`filter-leads-${s || "all"}`}
          >
            {s || "All enquiries"}
            {s === "new" && <span />}
          </button>
        ))}
      </div>
      {notice && (
        <div className="admin-notice">
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
        <ErrorPanel message="Enquiries couldn’t load." retry={() => refetch()} />
      ) : leads.length ? (
        <section className="lead-list">
          {leads.map((lead) => (
            <button
              className={`lead-card ${selected?.id === lead.id ? "active" : ""}`}
              key={lead.id}
              onClick={() => setSelected(lead)}
              data-testid={`lead-card-${lead.id}`}
            >
              <div className="lead-card-top">
                <span className="lead-avatar">{lead.name.slice(0, 1)}</span>
                <div>
                  <b>{lead.name}</b>
                  <small>{lead.brand || "Independent brand"}</small>
                </div>
                <span className={`status-pill ${lead.status}`}>{lead.status}</span>
                <span className="lead-created">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p>{lead.message}</p>
              <span className="lead-card-service">
                {lead.service || "General enquiry"}
                {lead.siteUrl && <span> · {lead.siteUrl}</span>}
              </span>
            </button>
          ))}
        </section>
      ) : (
        <EmptyPanel
          title="No enquiries in this view."
          text={
            status
              ? "Try another status filter, or return to all enquiries."
              : "New contact form messages will appear here, ready for a thoughtful reply."
          }
          action={
            <a href={`mailto:${DEFAULT_CONTACT_EMAIL}`} className="arrow-text">
              Email the studio <ArrowUpRight size={15} />
            </a>
          }
        />
      )}
      {selected && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <section className="lead-modal">
            <div className="modal-head">
              <div>
                <span className="eyebrow">ENQUIRY / #{selected.id}</span>
                <h2>{selected.name}</h2>
              </div>
              <button
                className="icon-close"
                onClick={() => setSelected(null)}
                aria-label="Close enquiry"
              >
                <X size={18} />
              </button>
            </div>
            <div className="lead-detail-meta">
              <span className={`status-pill ${selected.status}`}>{selected.status}</span>
              <span>{new Date(selected.createdAt).toLocaleString()}</span>
            </div>
            <div className="lead-detail-contact">
              <a href={`mailto:${selected.email}`}>
                <Mail size={15} />
                {selected.email}
              </a>
              {selected.brand && (
                <span>
                  <ShoppingBag size={15} />
                  {selected.brand}
                </span>
              )}
              {selected.siteUrl && (
                <a
                  href={
                    selected.siteUrl.startsWith("http")
                      ? selected.siteUrl
                      : `https://${selected.siteUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <Globe2 size={15} />
                  {selected.siteUrl}
                </a>
              )}
            </div>
            <div className="lead-message">
              <span className="eyebrow">THEIR NOTE</span>
              <p>{selected.message}</p>
            </div>
            <div className="lead-detail-actions">
              <a
                className="button-link"
                href={`mailto:${selected.email}?subject=${encodeURIComponent("Re: your note to Loop & Lift")}`}
              >
                Reply by email <ArrowUpRight size={15} />
              </a>
              <label className="field">
                <span>Update status</span>
                <select
                  value={selected.status}
                  onChange={(e) => changeStatus(selected, e.target.value as LeadStatus)}
                  data-testid="select-lead-status"
                >
                  {LEAD_STATUSES.map((s) => (
                    <option value={s} key={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
