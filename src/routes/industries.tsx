import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PublicFrame } from "@/components/site/layout";
import { ArrowText, Eyebrow, PageIntro } from "@/components/site/brand";
import { industries } from "@/lib/site-content";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Who we work with | Loop & Lift Growth Studio" },
      { name: "description", content: "We partner with founder-led and lean ecommerce teams in food, home, beauty, fashion, outdoor and everyday goods." },
      { property: "og:title", content: "Who we work with | Loop & Lift Growth Studio" },
      { property: "og:description", content: "We partner with founder-led and lean ecommerce teams in food, home, beauty, fashion, outdoor and everyday goods." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IndustriesPage,
});

const principles = [
  ["A real product story", "You have a clear reason to exist beyond a discount code."],
  ["Room to learn", "You’re open to evidence, experimentation and small useful changes."],
  ["People who care", "Your team wants a partner who will think with them and do the work."],
];

function IndustriesPage() {
  return (
    <PublicFrame>
      <main className="page-in">
        <PageIntro
          eyebrow="Who we work with"
          title={
            <>
              For the people
              <br />
              <em>building good things.</em>
            </>
          }
          text="We partner with founder-led and lean ecommerce teams who care about their product, their customers and what comes next."
          marker="THE RIGHT FIT"
        />
        <section className="industry-layout">
          <div className="industry-copy">
            <Eyebrow>Where we’re useful</Eyebrow>
            <h2 className="display">
              The product is
              <br />
              only <em>the beginning.</em>
            </h2>
            <p>From first-market momentum to a more mature growth engine, we bring practical ecommerce experience to brands with a point of view.</p>
            <ArrowText to="/contact">See if we’re a fit</ArrowText>
          </div>
          <div className="industry-grid">
            {industries.map((name, i) => (
              <div className={`industry-cell shade-${i % 4}`} key={name}>
                <span className="mono">0{i + 1}</span>
                <strong>{name}</strong>
                <ArrowUpRight size={17} />
              </div>
            ))}
          </div>
        </section>
        <section className="industry-principles">
          <Eyebrow>Good partners, in any category</Eyebrow>
          <div>
            {principles.map(([a, b], i) => (
              <article key={a}>
                <span className="mono">0{i + 1}</span>
                <h3>{a}</h3>
                <p>{b}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PublicFrame>
  );
}
