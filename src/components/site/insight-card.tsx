import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { formatDate, type SiteEntry } from "@/lib/site-types";

export function InsightCard({ entry }: { entry: SiteEntry }) {
  return (
    <Link to="/insights/$slug" params={{ slug: entry.slug }} className="insight-card">
      <div>
        <span className="eyebrow">{entry.kicker || "Studio note"}</span>
        <span className="insight-date">
          {formatDate(entry.updatedAt, { month: "short", year: "numeric" })}
        </span>
      </div>
      <h3>{entry.title}</h3>
      <p>{entry.summary || entry.body.slice(0, 150)}</p>
      <span className="insight-read">
        Read note <ArrowUpRight size={16} />
      </span>
    </Link>
  );
}
