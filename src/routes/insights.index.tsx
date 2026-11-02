import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PublicFrame } from "@/components/site/layout";
import {
  ButtonLink,
  EmptyPanel,
  ErrorPanel,
  LoadingRows,
  PageIntro,
} from "@/components/site/brand";
import { InsightCard } from "@/components/site/insight-card";
import { publicEntriesQuery } from "@/lib/site-queries";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Insights | Loop & Lift Growth Studio" },
      {
        name: "description",
        content:
          "Practical notes on ecommerce conversion, measurement and building better customer relationships.",
      },
      { property: "og:title", content: "Insights | Loop & Lift Growth Studio" },
      {
        property: "og:description",
        content:
          "Practical notes on ecommerce conversion, measurement and building better customer relationships.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.prefetchQuery(publicEntriesQuery("article")),
  component: InsightsPage,
});

function InsightsPage() {
  const {
    data: entries = [],
    isLoading,
    isError,
    refetch,
  } = useQuery(publicEntriesQuery("article"));
  return (
    <PublicFrame>
      <main className="page-in">
        <PageIntro
          eyebrow="Notes for ecommerce people"
          title={
            <>
              A clearer take
              <br />
              <em>on what’s next.</em>
            </>
          }
          text="Practical ideas from the studio on ecommerce, measurement and building better customer relationships."
          marker="STUDIO NOTES"
        />
        <section className="insights-list">
          {isLoading ? (
            <LoadingRows />
          ) : isError ? (
            <ErrorPanel message="We couldn’t load the latest notes." retry={() => refetch()} />
          ) : entries.length ? (
            entries.map((e) => <InsightCard entry={e} key={e.id} />)
          ) : (
            <EmptyPanel
              title="Good notes are on the way."
              text="We’re preparing useful things to share. If you’re working through a growth question now, let’s start there."
              action={<ButtonLink to="/contact">Talk it through</ButtonLink>}
            />
          )}
        </section>
      </main>
    </PublicFrame>
  );
}
