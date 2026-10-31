import { createFileRoute } from "@tanstack/react-router";
import { PublicFrame } from "@/components/site/layout";
import { ButtonLink, PageIntro } from "@/components/site/brand";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "How we work | Loop & Lift Growth Studio" },
      { name: "description", content: "Listen, focus, make and improve: a calm, close-to-the-decision way to make ecommerce progress." },
      { property: "og:title", content: "How we work | Loop & Lift Growth Studio" },
      { property: "og:description", content: "Listen, focus, make and improve: a calm, close-to-the-decision way to make ecommerce progress." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProcessPage,
});

const steps = [
  ["01", "Listen before prescribing", "We start with your goals, your customers and the context behind the numbers. You’ll leave the first session with a clearer question to solve.", "DISCOVER"],
  ["02", "Make the opportunity tangible", "We turn what we learn into a focused plan: what matters now, what can wait and how we’ll know whether the work is helping.", "FOCUS"],
  ["03", "Build alongside your team", "We do the hands-on work with you, sharing decisions early and making the unfamiliar feel manageable.", "MAKE"],
  ["04", "Learn, then choose again", "We close the loop on what changed and what we learned, so the next decision starts from a better place.", "IMPROVE"],
];

function ProcessPage() {
  return (
    <PublicFrame>
      <main className="page-in">
        <PageIntro
          eyebrow="A calm way to make progress"
          title={
            <>
              Good growth has
              <br />
              <em>a good rhythm.</em>
            </>
          }
          text="We keep the work close to the people making decisions. Clear enough to move quickly, thoughtful enough to get the details right."
          marker="OUR APPROACH"
        />
        <section className="process-timeline">
          {steps.map(([n, title, text, tag]) => (
            <article key={n}>
              <span className="mono process-num">{n}</span>
              <div>
                <span className="eyebrow">{tag}</span>
                <h2 className="display">{title}</h2>
                <p>{text}</p>
              </div>
              <span className="process-dot" />
            </article>
          ))}
        </section>
        <section className="process-quote">
          <span className="eyebrow">A note on pace</span>
          <p>“Momentum isn’t doing everything at once. It’s knowing what the next useful thing is—and making room to do it well.”</p>
          <span className="mono">THE LOOP & LIFT WAY</span>
        </section>
        <div className="align-end process-end">
          <ButtonLink to="/contact">Talk through your priorities</ButtonLink>
        </div>
      </main>
    </PublicFrame>
  );
}
