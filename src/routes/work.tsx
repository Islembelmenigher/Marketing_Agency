import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { PublicFrame } from "@/components/site/layout";
import { ButtonLink, Eyebrow, PageIntro } from "@/components/site/brand";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Our Work | Loop & Lift Digital Growth Agency" },
      {
        name: "description",
        content:
          "Concept demonstrations that show how we think about website design, conversion optimisation and growth tracking. Not real client work or guaranteed results.",
      },
      { property: "og:title", content: "Our Work | Loop & Lift Digital Growth Agency" },
      {
        property: "og:description",
        content:
          "Concept demonstrations that show how we think about website design, conversion optimisation and growth tracking.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkPage,
});

const demos = [
  {
    category: "WEBSITE DEVELOPMENT / CONCEPT",
    num: "01",
    title: "A professional services website that starts conversations",
    problem:
      "A fictional consultancy whose homepage communicated what they did but not why a potential client should choose them. The site received visits from referrals but very few enquiries.",
    approach:
      "We restructured the page hierarchy, rewrote the value proposition and added a clearer client journey — from problem recognition to getting in touch.",
    whatWeDid: [
      "Homepage restructure and messaging rewrite",
      "New services page with problem-led copy",
      "Clearer calls to action throughout",
      "Improved mobile layout and navigation",
    ],
    indicators: ["Improved enquiry rate", "Clearer client journey", "Stronger first impression"],
    tags: ["Website design", "Copywriting", "Conversion", "UX"],
    accent: "work-lime",
  },
  {
    category: "CONVERSION OPTIMISATION / CONCEPT",
    num: "02",
    title: "A landing page that stopped visitors from bouncing at the headline",
    problem:
      "An illustrative SaaS product whose sign-up page was getting traffic from paid ads but converting poorly. The headline described features, not outcomes. The form asked for too much information upfront.",
    approach:
      "We rewrote the headline to lead with the outcome the customer cared about, simplified the form to a single field and added a trust element below the main CTA.",
    whatWeDid: [
      "Outcome-led headline and supporting copy",
      "Form simplified from six fields to one",
      "Social proof element added above the fold",
      "Mobile layout improvements",
    ],
    indicators: [
      "Higher sign-up rate",
      "Lower cost per acquisition",
      "Reduced drop-off at the form",
    ],
    tags: ["CRO", "Copywriting", "Landing page", "UX"],
    accent: "work-blue",
  },
  {
    category: "SEO & ANALYTICS / CONCEPT",
    num: "03",
    title: "Connecting traffic to results for a local service business",
    problem:
      "A fictional local trade business had Google Analytics installed but couldn't tell which enquiries were coming from organic search, referrals or paid ads. Tracking was incomplete and no conversion events were being recorded.",
    approach:
      "We audited the existing GA4 setup, implemented Google Tag Manager, configured conversion event tracking and set up a simple monthly report showing where enquiries were coming from.",
    whatWeDid: [
      "GA4 and GTM audit and reconfiguration",
      "Conversion event tracking (form submits, calls)",
      "Keyword and search intent research",
      "Monthly performance dashboard",
    ],
    indicators: ["Attribution clarity", "Informed marketing spend", "Searchability improvements"],
    tags: ["GA4", "GTM", "SEO", "Reporting"],
    accent: "work-violet",
  },
];

function DemoVisual({ index, accent }: { index: number; accent: string }) {
  if (index === 0)
    return (
      <div className={`demo-art ${accent}`}>
        <div className="demo-art-head">
          <span className="eyebrow">DEMO / 01</span>
          <span className="demo-art-stamp">
            FICTIONAL
            <br />
            CONCEPT
          </span>
        </div>
        <div className="demo-website-mock">
          <div className="dwm-header">
            <div className="dwm-logo" />
            <div className="dwm-nav">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="dwm-hero">
            <div className="dwm-headline" />
            <div className="dwm-sub" />
            <div className="dwm-sub short" />
            <div className="dwm-cta" />
          </div>
        </div>
      </div>
    );
  if (index === 1)
    return (
      <div className={`demo-art ${accent}`}>
        <div className="demo-art-head">
          <span className="eyebrow">DEMO / 02</span>
          <span className="demo-art-stamp">
            FICTIONAL
            <br />
            CONCEPT
          </span>
        </div>
        <div className="demo-lp-mock">
          <div className="dlm-headline" />
          <div className="dlm-sub" />
          <div className="dlm-form">
            <div className="dlm-input" />
            <div className="dlm-button" />
          </div>
          <div className="dlm-trust">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    );
  return (
    <div className={`demo-art ${accent}`}>
      <div className="demo-art-head">
        <span className="eyebrow">DEMO / 03</span>
        <span className="demo-art-stamp">
          FICTIONAL
          <br />
          CONCEPT
        </span>
      </div>
      <div className="demo-analytics-mock">
        <div className="dam-eyebrow">ACQUISITION SOURCES</div>
        <div className="dam-bars">
          <div className="dam-bar-row">
            <span>Organic search</span>
            <div className="dam-bar">
              <div style={{ width: "72%", background: "#83d746" }} />
            </div>
            <span>72%</span>
          </div>
          <div className="dam-bar-row">
            <span>Direct</span>
            <div className="dam-bar">
              <div style={{ width: "18%", background: "#7bb3c8" }} />
            </div>
            <span>18%</span>
          </div>
          <div className="dam-bar-row">
            <span>Referral</span>
            <div className="dam-bar">
              <div style={{ width: "10%", background: "#b4a7c8" }} />
            </div>
            <span>10%</span>
          </div>
        </div>
        <div className="dam-label mono">ILLUSTRATIVE DATA ONLY</div>
      </div>
    </div>
  );
}

function WorkPage() {
  return (
    <PublicFrame>
      <main className="page-in">
        <PageIntro
          eyebrow="Concept work"
          title={
            <>
              How we think.
              <br />
              <em>What we build.</em>
            </>
          }
          text="Every project below is a fictional demonstration — created to show how we approach real problems. These are not client projects, testimonials or real business results."
          marker="DEMONSTRATIONS ONLY"
        />

        <div className="demo-banner">
          <ShieldCheck size={17} />
          <span>
            All work below is fictional. We do not publish client names, logos, testimonials or
            actual outcome data.
          </span>
        </div>

        <section className="demo-projects">
          {demos.map((d, i) => (
            <article className="demo-project" key={d.num}>
              <DemoVisual index={i} accent={d.accent} />
              <div className="demo-project-copy">
                <span className="eyebrow">{d.category}</span>
                <h2 className="display">{d.title}</h2>

                <div className="demo-detail-block">
                  <h4>The problem</h4>
                  <p>{d.problem}</p>
                </div>

                <div className="demo-detail-block">
                  <h4>Our approach</h4>
                  <p>{d.approach}</p>
                </div>

                <div className="demo-detail-block">
                  <h4>What we did</h4>
                  <ul className="demo-did-list">
                    {d.whatWeDid.map((item) => (
                      <li key={item}>→ {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="demo-tags" style={{ marginTop: "20px" }}>
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
          <p>
            These concepts show how we think about real business problems. No client outcomes are
            implied, and illustrative indicators should not be interpreted as forecasts or promises.
          </p>
        </section>

        <section className="closing-cta" style={{ marginTop: "0" }}>
          <Eyebrow>Working on something similar?</Eyebrow>
          <h2 className="display">
            Let's talk about
            <br />
            <em>your project.</em>
          </h2>
          <ButtonLink to="/contact">Start the conversation</ButtonLink>
        </section>
      </main>
    </PublicFrame>
  );
}
