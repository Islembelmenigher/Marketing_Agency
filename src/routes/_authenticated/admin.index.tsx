import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  Globe2,
  Inbox,
  MessageSquareText,
  PenLine,
  Plus,
  Settings2,
  ShoppingBag,
} from "lucide-react";
import { EmptyPanel, ErrorPanel } from "@/components/site/brand";
import { adminOverviewQuery } from "@/lib/admin-api";
import type { ContactRequest } from "@/lib/site-types";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminOverviewPage,
});

function LeadPreview({ lead }: { lead: ContactRequest }) {
  return (
    <Link to="/admin/leads" className="lead-preview">
      <span className="lead-avatar">{lead.name.slice(0, 1)}</span>
      <span className="lead-preview-copy">
        <b>{lead.name}</b>
        <small>
          {lead.brand || lead.email} · {new Date(lead.createdAt).toLocaleDateString()}
        </small>
      </span>
      <span className={`status-pill ${lead.status}`}>{lead.status}</span>
      <ArrowUpRight size={15} />
    </Link>
  );
}

function AdminOverviewPage() {
  const { data, isLoading, isError, refetch } = useQuery(adminOverviewQuery());
  const weekday = new Date().toLocaleDateString("en", { weekday: "long" }).toUpperCase();
  const metrics = data
    ? [
        { title: "New enquiries", value: data.newLeads, note: "Needs a first look", Icon: Inbox },
        {
          title: "All enquiries",
          value: data.totalLeads,
          note: "Across the studio",
          Icon: MessageSquareText,
        },
        {
          title: "Published entries",
          value: data.publishedEntries,
          note: "Live on the website",
          Icon: Globe2,
        },
        {
          title: "Draft entries",
          value: data.draftEntries,
          note: "Ready when you are",
          Icon: PenLine,
        },
      ]
    : [];
  return (
    <main className="admin-main page-in">
      <div className="admin-page-heading">
        <div>
          <span className="eyebrow">{weekday} / STUDIO PULSE</span>
          <h1 className="display">Good morning.</h1>
          <p>A quick read on what’s moving across the studio.</p>
        </div>
        <Link to="/admin/content" className="admin-primary">
          <Plus size={16} /> Add content
        </Link>
      </div>
      {isLoading ? (
        <div className="metric-grid">
          {[1, 2, 3, 4].map((x) => (
            <div className="skeleton-card" key={x} />
          ))}
        </div>
      ) : isError || !data ? (
        <ErrorPanel message="The overview didn’t load." retry={() => refetch()} />
      ) : (
        <>
          <section className="metric-grid">
            {metrics.map(({ title, value, note, Icon }) => (
              <article className="metric-card" key={title}>
                <div className="metric-top">
                  <span>{title}</span>
                  <Icon size={17} />
                </div>
                <strong>{value}</strong>
                <small>{note}</small>
              </article>
            ))}
          </section>
          <div className="dashboard-lower">
            <section className="admin-panel recent-panel">
              <div className="admin-panel-head">
                <div>
                  <span className="eyebrow">INBOX / RECENT</span>
                  <h2>Latest enquiries</h2>
                </div>
                <Link to="/admin/leads">
                  Open inbox <ArrowRight size={14} />
                </Link>
              </div>
              {data.recentLeads.length ? (
                data.recentLeads.map((lead) => <LeadPreview key={lead.id} lead={lead} />)
              ) : (
                <EmptyPanel
                  title="A little room to breathe."
                  text="When someone reaches out, their note will land here."
                  action={
                    <Link className="arrow-text" to="/contact">
                      See the contact page <ArrowRight size={14} />
                    </Link>
                  }
                />
              )}
            </section>
            <section className="admin-panel quick-panel">
              <span className="eyebrow">QUICK ACTIONS</span>
              <h2>Keep things moving.</h2>
              <Link to="/admin/content/$type" params={{ type: "article" }} className="quick-action">
                <span>
                  <FileText size={17} />
                </span>
                <div>
                  <b>Write a studio note</b>
                  <small>Add an insight for the website</small>
                </div>
                <ArrowUpRight size={16} />
              </Link>
              <Link to="/admin/content/$type" params={{ type: "pricing" }} className="quick-action">
                <span>
                  <ShoppingBag size={17} />
                </span>
                <div>
                  <b>Review pricing content</b>
                  <small>Keep service details current</small>
                </div>
                <ArrowUpRight size={16} />
              </Link>
              <Link to="/admin/settings" className="quick-action">
                <span>
                  <Settings2 size={17} />
                </span>
                <div>
                  <b>Update studio details</b>
                  <small>Contact and social links</small>
                </div>
                <ArrowUpRight size={16} />
              </Link>
            </section>
          </div>
        </>
      )}
      <div className="admin-footnote">
        <span className="pulse" /> Website status is checked by the platform.{" "}
        <span className="mono">LOOP & LIFT / ADMIN</span>
      </div>
    </main>
  );
}
