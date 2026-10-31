import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { PublicFrame } from "@/components/site/layout";
import { PageIntro } from "@/components/site/brand";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Concept work | Loop & Lift Growth Studio" },
      { name: "description", content: "Fictional demonstrations that make our ecommerce thinking tangible. Not client work, endorsements or real results." },
      { property: "og:title", content: "Concept work | Loop & Lift Growth Studio" },
      { property: "og:description", content: "Fictional demonstrations that make our ecommerce thinking tangible. Not client work, endorsements or real results." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkPage,
});

const demos = [
  { type: "STORE EXPERIENCE / FICTIONAL DEMONSTRATION", title: "A calmer path through the pantry", text: "A concept for a fictional refillable pantry brand: clearer product hierarchy, better bundle discovery and a more helpful reorder moment.", tone: "work-lime", tags: ["Shopify", "Merchandising", "Retention"] },
  { type: "MEASUREMENT / FICTIONAL DEMONSTRATION", title: "From scattered signals to one view", text: "An illustrative measurement plan for an imaginary home-goods store, showing how acquisition, product interest and repeat purchase can connect.", tone: "work-blue", tags: ["Analytics", "Customer journey", "Decision design"] },
  { type: "MARKET EXPANSION / FICTIONAL DEMONSTRATION", title: "An international launch, made human", text: "A fictional expansion concept exploring how language, duties, checkout expectations and customer care fit together in a new market.", tone: "work-violet", tags: ["Localization", "Shopify Markets", "Operations"] },
];

function DemoArt({ index }: { index: number }) {
  if (index === 0)
    return (
      <div className="demo-pantries">
        <span>
          everyday
          <br />
          <em>provisions</em>
        </span>
        <div className="jar-row">
          <i />
          <i />
          <i />
        </div>
        <small>REFILL · REPEAT · RESTOCK</small>
      </div>
    );
  if (index === 1)
    return (
      <div className="demo-data">
        <span className="eyebrow">A MORE USEFUL VIEW</span>
        <div className="demo-data-columns">
          {Array.from({ length: 8 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
        <div className="demo-data-line" />
        <small>ILLUSTRATIVE DASHBOARD · NOT REAL DATA</small>
      </div>
    );
  return (
    <div className="demo-map">
      <span>
        ONE STORE,
        <br />
        <em>MORE PLACES.</em>
      </span>
      <div className="map-orbit">
        <i />
        <i />
        <i />
      </div>
      <small>LOCAL CONTEXT / GLOBAL SYSTEM</small>
    </div>
  );
}

function WorkPage() {
  return (
    <PublicFrame>
      <main className="page-in">
        <PageIntro
          eyebrow="Selected thinking"
          title={
            <>
              Ideas you can
              <br />
              <em>get your hands on.</em>
            </>
          }
          text="These are fictional demonstrations, created to make our thinking tangible. They are not client work, endorsements or actual business results. Any metrics shown are illustrative."
          marker="DEMONSTRATIONS ONLY"
        />
        <div className="demo-banner">
          <ShieldCheck size={17} />
          <span>Every concept below is fictional. We don’t publish client names, logos, testimonials or outcome metrics here.</span>
        </div>
        <section className="demo-projects">
          {demos.map((d, i) => (
            <article className="demo-project" key={d.title}>
              <div className={`demo-art ${d.tone}`}>
                <div className="demo-art-head">
                  <span className="eyebrow">DEMO / 0{i + 1}</span>
                  <span className="demo-art-stamp">
                    FICTIONAL
                    <br />
                    CONCEPT
                  </span>
                </div>
                <DemoArt index={i} />
              </div>
              <div className="demo-project-copy">
                <span className="eyebrow">{d.type}</span>
                <h2 className="display">{d.title}</h2>
                <p>{d.text}</p>
                <div className="demo-tags">
                  {d.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>
        <section className="demo-disclaimer">
          <strong>Fictional by design.</strong>
          <p>These concepts show the questions we ask and the kinds of systems we build. No client outcomes are implied. Illustrative data should not be interpreted as a forecast or promise.</p>
        </section>
      </main>
    </PublicFrame>
  );
}
