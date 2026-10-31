import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { PublicFrame } from "@/components/site/layout";
import { ArrowText, ButtonLink, Eyebrow, StoreIllustration } from "@/components/site/brand";
import { InsightCard } from "@/components/site/insight-card";
import { publicEntriesQuery } from "@/lib/site-queries";
import { services } from "@/lib/site-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Loop & Lift | Ecommerce Growth Studio" },
      { name: "description", content: "Turn more ecommerce visitors into customers with conversion, analytics, retention and search support." },
      { property: "og:title", content: "Loop & Lift | Ecommerce Growth Studio" },
      { property: "og:description", content: "Turn more ecommerce visitors into customers with conversion, analytics, retention and search support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.prefetchQuery(publicEntriesQuery("article")),
  component: HomePage,
});

const approach = [
  ["01", "Find the signal", "Start with the numbers, the customer experience and the question behind the brief."],
  ["02", "Choose the useful move", "Build a focused plan around the biggest opportunity—not a long list of nice-to-haves."],
  ["03", "Make it real", "Ship the work together, keep learning, and leave your team with a clearer way to continue."],
];

function HomePage() {
  const { data: entries = [], isLoading, isError, refetch } = useQuery(publicEntriesQuery("article"));
  const stories = entries.slice(0, 2);
  return (
    <PublicFrame>
      <main>
        <section className="hero">
          <div className="hero-copy page-in">
            <Eyebrow>Independent growth studio · Ecommerce, always</Eyebrow>
            <h1 className="display">
              Make your next
              <br />
              growth move <em>count.</em>
            </h1>
            <p>We help ambitious ecommerce teams build a clearer, more profitable way forward—through better stores, sharper measurement and customer relationships that last.</p>
            <div className="hero-actions">
              <ButtonLink to="/contact">Let’s find your next move</ButtonLink>
              <ArrowText to="/services">Explore what we do</ArrowText>
            </div>
            <div className="hero-footnote">
              <span className="pulse" /> SMALL STUDIO. SENIOR THINKING. REAL WORK.
            </div>
          </div>
          <div className="hero-art page-in">
            <StoreIllustration />
            <span className="hero-art-caption">A clearer view of what’s moving the business.</span>
          </div>
          <div className="hero-index mono">
            01 <span> / 05</span>
          </div>
        </section>
        <section className="intro-strip">
          <p>
            Growth isn’t a trick.
            <br />
            <b>It’s a system you can keep improving.</b>
          </p>
          <span>We connect the parts of ecommerce that are too often treated separately.</span>
        </section>
        <section className="section services-preview">
          <div className="section-heading">
            <div>
              <Eyebrow>What we make better</Eyebrow>
              <h2 className="display">
                A little less friction.
                <br />
                <em>A lot more direction.</em>
              </h2>
            </div>
            <p>Pick the problem you’re solving. We’ll bring the right mix of strategy and hands-on work.</p>
          </div>
          <div className="service-list">
            {services.map((s) => (
              <Link to="/services/$slug" params={{ slug: s.slug }} key={s.slug} className="service-row">
                <span className={`service-icon ${s.color}`}>
                  <s.icon size={20} />
                </span>
                <span className="service-number mono">{s.num}</span>
                <span className="service-row-copy">
                  <strong>{s.title}</strong>
                  <small>{s.text}</small>
                </span>
                <ArrowUpRight className="row-arrow" size={19} />
              </Link>
            ))}
          </div>
          <div className="align-end">
            <ArrowText to="/services">See all services</ArrowText>
          </div>
        </section>
        <section className="dark-band">
          <div className="dark-band-side">
            <Eyebrow>Our point of view</Eyebrow>
            <span className="band-symbol">↗</span>
          </div>
          <div className="dark-band-copy">
            <h2 className="display">
              More growth work.
              <br />
              <em>Less growth theatre.</em>
            </h2>
            <p>We’re a founder-led studio for the people doing the real work of building a business. Clear thinking, senior hands, no borrowed playbook.</p>
            <ArrowText to="/about">Meet Loop & Lift</ArrowText>
          </div>
        </section>
        <section className="section approach-preview">
          <div className="approach-aside">
            <Eyebrow>How we work</Eyebrow>
            <p>Small teams make better decisions when the important things are visible.</p>
            <ArrowText to="/process">Our way of working</ArrowText>
          </div>
          <div className="approach-steps">
            {approach.map(([n, title, text]) => (
              <div className="approach-step" key={n}>
                <span className="mono">{n}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <ArrowUpRight size={17} />
              </div>
            ))}
          </div>
        </section>
        <section className="work-teaser">
          <div className="work-visual">
            <div className="work-tile tile-one">
              <div className="tile-top">
                <span className="eyebrow">CONCEPT STORE / A</span>
                <span className="tile-chip">DEMO</span>
              </div>
              <div className="tile-packaging">
                <span>
                  good
                  <br />
                  rituals
                </span>
                <div className="pack-jar" />
              </div>
              <div className="tile-caption">A fictional direct-to-consumer pantry brand</div>
            </div>
            <div className="work-sticker">
              <span>
                Fictional
                <br />
                demonstration
              </span>
              <Sparkles size={17} />
            </div>
            <div className="work-tile tile-two">
              <span className="eyebrow">JOURNEY MAP / B</span>
              <div className="journey-path">
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="journey-labels">
                <span>DISCOVER</span>
                <span>CONSIDER</span>
                <span>RETURN</span>
              </div>
              <b>
                Make the
                <br />
                second visit
                <br />
                count.
              </b>
              <div className="tile-caption">Illustrative journey concept · No client results</div>
            </div>
          </div>
          <div className="work-teaser-copy">
            <Eyebrow>Work, without the theatre</Eyebrow>
            <h2 className="display">
              Thoughtful ideas.
              <br />
              <em>Real-world detail.</em>
            </h2>
            <p>Every example in our portfolio is a fictional demonstration—made to show how we think, not to imply client work or results.</p>
            <ArrowText to="/work">Explore our concepts</ArrowText>
          </div>
        </section>
        <section className="insights-preview">
          <div className="section-heading">
            <div>
              <Eyebrow>Notes from the studio</Eyebrow>
              <h2 className="display">
                Useful thoughts
                <br />
                for the <em>long game.</em>
              </h2>
            </div>
            <ArrowText to="/insights">All insights</ArrowText>
          </div>
          {isLoading ? (
            <div className="skeleton-lines">
              <i />
              <i />
            </div>
          ) : isError ? (
            <div className="inline-error">
              The latest notes didn’t load. <button onClick={() => refetch()}>Try again</button>
            </div>
          ) : stories.length ? (
            <div className="insight-row">
              {stories.map((entry) => (
                <InsightCard entry={entry} key={entry.id} />
              ))}
            </div>
          ) : (
            <div className="quiet-empty">
              We’re putting the finishing touches on our first notes. In the meantime, <Link to="/contact">let’s talk through your question.</Link>
            </div>
          )}
        </section>
        <section className="closing-cta">
          <div className="closing-ornament">
            <span>loop</span>
            <span>lift</span>
          </div>
          <Eyebrow>There’s always a next move</Eyebrow>
          <h2 className="display">
            Let’s make it
            <br />
            <em>a good one.</em>
          </h2>
          <ButtonLink to="/contact">Start a conversation</ButtonLink>
          <small>No deck required. Just bring the thing you’re figuring out.</small>
        </section>
      </main>
    </PublicFrame>
  );
}
