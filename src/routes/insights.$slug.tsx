import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { PublicFrame } from "@/components/site/layout";
import { ErrorPanel, Eyebrow, LoadingRows } from "@/components/site/brand";
import { publicEntryQuery } from "@/lib/site-queries";
import { formatDate } from "@/lib/site-types";

export const Route = createFileRoute("/insights/$slug")({
  loader: async ({ context, params }) => {
    const entry = await context.queryClient.ensureQueryData(publicEntryQuery(params.slug)).catch(() => null);
    return { seoTitle: entry?.seoTitle || entry?.title || null, seoDescription: entry?.seoDescription || entry?.summary || null };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.seoTitle ? `${loaderData.seoTitle} | Loop & Lift` : "Studio note | Loop & Lift";
    const description = loaderData?.seoDescription ?? "A practical note from the Loop & Lift studio.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: InsightDetail,
});

function InsightDetail() {
  const { slug } = Route.useParams();
  const { data: entry, isLoading, isError, refetch } = useQuery(publicEntryQuery(slug));
  return (
    <PublicFrame>
      <main className="article-wrap page-in">
        {isLoading ? (
          <LoadingRows />
        ) : isError || !entry ? (
          <ErrorPanel message="We couldn’t find that note." retry={() => refetch()} />
        ) : (
          <>
            <Link to="/insights" className="back-link">
              <ArrowLeft size={15} /> All insights
            </Link>
            <div className="article-head">
              <Eyebrow>{entry.kicker || "Studio note"}</Eyebrow>
              <h1 className="display">{entry.title}</h1>
              <p>{entry.summary}</p>
              <span className="mono">{formatDate(entry.updatedAt, { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
            <article className="article-body prose">
              {entry.body
                .split("\n")
                .filter(Boolean)
                .map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
            </article>
          </>
        )}
      </main>
    </PublicFrame>
  );
}
