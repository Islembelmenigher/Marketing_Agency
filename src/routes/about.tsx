import { createFileRoute } from "@tanstack/react-router";
import { PublicFrame } from "@/components/site/layout";
import { ArrowText, ButtonLink, Eyebrow, Mark, PageIntro } from "@/components/site/brand";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Loop & Lift Growth Studio" },
      { name: "description", content: "Loop & Lift is a founder-led ecommerce growth studio for teams who want an experienced partner, not another layer of process." },
      { property: "og:title", content: "About | Loop & Lift Growth Studio" },
      { property: "og:description", content: "Loop & Lift is a founder-led ecommerce growth studio for teams who want an experienced partner, not another layer of process." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const values = [
  ["Practical over performative", "Good ideas need to work in the day-to-day of a real business."],
  ["Curious with the numbers", "Data can sharpen intuition, not replace it. We make both useful."],
  ["Kind, clear collaboration", "The best work happens when people can ask the honest question."],
];

function AboutPage() {
  return (
    <PublicFrame>
      <main className="page-in">
        <PageIntro
          eyebrow="A small studio with a point of view"
          title={
            <>
              Less noise.
              <br />
              <em>More useful growth.</em>
            </>
          }
          text="Loop & Lift is a founder-led ecommerce growth studio for teams who want an experienced partner, not another layer of process."
          marker="ABOUT LOOP & LIFT"
        />
        <section className="about-story">
          <div className="about-stamp">
            <Mark />
            <span>
              THINK
              <br />
              CLEARLY
              <br />
              MOVE
              <br />
              TOGETHER
            </span>
          </div>
          <div>
            <Eyebrow>Why we’re here</Eyebrow>
            <h2 className="display">
              The work should
              <br />
              make sense <em>to the people
              <br />
              doing it.</em>
            </h2>
            <p>There’s no shortage of advice about ecommerce growth. What’s harder to find is someone who can connect the strategy to the build, explain the trade-offs and stay close enough to make the work better.</p>
            <p>That’s the kind of partner we wanted to be. Loop & Lift keeps the team intentionally small, the work senior and the conversation honest.</p>
            <ArrowText to="/process">How we work</ArrowText>
          </div>
        </section>
        <section className="about-values">
          {values.map(([a, b], i) => (
            <article key={a}>
              <span className="mono">0{i + 1}</span>
              <h3>{a}</h3>
              <p>{b}</p>
            </article>
          ))}
        </section>
        <section className="about-bottom">
          <h2 className="display">
            A growth partner
            <br />
            for the <em>long game.</em>
          </h2>
          <ButtonLink to="/contact">Get to know us</ButtonLink>
        </section>
      </main>
    </PublicFrame>
  );
}
