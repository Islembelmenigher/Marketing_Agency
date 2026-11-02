import { createFileRoute } from "@tanstack/react-router";
import { PublicFrame } from "@/components/site/layout";
import { ArrowText, ButtonLink, Eyebrow, Mark, PageIntro } from "@/components/site/brand";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Loop & Lift Digital Growth Agency" },
      {
        name: "description",
        content:
          "Loop & Lift is an independent digital growth agency combining website development, conversion optimisation and SEO to help businesses grow online.",
      },
      { property: "og:title", content: "About | Loop & Lift Digital Growth Agency" },
      {
        property: "og:description",
        content:
          "Loop & Lift is an independent digital growth agency combining website development, conversion optimisation and SEO to help businesses grow online.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    num: "01",
    title: "Clarity over cleverness",
    text: "Clear thinking, plain language and honest recommendations. We'd rather give you a useful answer than an impressive-sounding one.",
  },
  {
    num: "02",
    title: "Connected work",
    text: "Website quality, messaging and measurement are treated as a system, not separate departments. This is how meaningful change actually happens.",
  },
  {
    num: "03",
    title: "Independence you can trust",
    text: "We're not tied to particular platforms, tools or vendors. We recommend what's right for your situation.",
  },
];

const expectations = [
  {
    title: "You'll understand what we're doing and why",
    text: "We explain decisions before we make them, share work early and welcome questions. No black boxes.",
  },
  {
    title: "We'll be honest about what we can achieve",
    text: "We don't overpromise. If something is going to take longer than expected or produce less than hoped, we'll tell you.",
  },
  {
    title: "We focus on what matters to your business",
    text: "Not vanity metrics, not output for its own sake. We keep our attention on the things that actually move the dial for you.",
  },
  {
    title: "We work like a partner, not a vendor",
    text: "We're invested in your results. That means thinking about your situation when we're not in the room, not just when we're delivering.",
  },
];

function AboutPage() {
  return (
    <PublicFrame>
      <main className="page-in">
        <PageIntro
          eyebrow="An independent digital growth agency"
          title={
            <>
              We help businesses
              <br />
              <em>grow online — properly.</em>
            </>
          }
          text="Loop & Lift combines website development, conversion optimisation and SEO into one connected approach. We work with small and medium-sized businesses that want real results, not a longer list of outputs."
          marker="ABOUT LOOP & LIFT"
        />

        {/* Story */}
        <section className="about-story">
          <div className="about-stamp">
            <Mark />
            <span>
              DESIGN.
              <br />
              CONVERT.
              <br />
              GROW.
            </span>
          </div>
          <div>
            <Eyebrow>Our philosophy</Eyebrow>
            <h2 className="display">
              A website is only
              <br />
              valuable if it does
              <br />
              <em>something useful.</em>
            </h2>
            <p>
              Too many businesses have websites that look acceptable but don't communicate clearly,
              don't convert visitors into customers and don't provide any meaningful information
              about what's working or not.
            </p>
            <p>
              We started Loop &amp; Lift to change that. We combine the disciplines that are usually
              kept separate — design and development, messaging and copywriting, analytics and SEO —
              because that's the only way the work actually produces results.
            </p>
            <p>
              We work with founders, business owners and marketing teams who want a partner who
              understands the full picture, not just one piece of the puzzle.
            </p>
            <ArrowText to="/services">See what we do</ArrowText>
          </div>
        </section>

        {/* Values */}
        <section className="about-values">
          {values.map((v) => (
            <article key={v.num}>
              <span className="mono">{v.num}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </article>
          ))}
        </section>

        {/* Who we serve */}
        <section className="section">
          <div className="section-heading">
            <div>
              <Eyebrow>Who we work with</Eyebrow>
              <h2 className="display">
                Small and medium-sized
                <br />
                <em>businesses, mostly.</em>
              </h2>
            </div>
            <p>
              We work best with businesses that are serious about growth but don't want the overhead
              of a large agency relationship.
            </p>
          </div>
          <div className="about-who-grid">
            <div className="about-who-card">
              <h3>Service businesses</h3>
              <p>
                Consultancies, agencies, professional services firms and trades businesses that need
                a website that generates enquiries and communicates their expertise clearly.
              </p>
            </div>
            <div className="about-who-card">
              <h3>Ecommerce brands</h3>
              <p>
                Online stores that want to convert more of their existing visitors, improve their
                search visibility or understand their customer journey better.
              </p>
            </div>
            <div className="about-who-card">
              <h3>Growing businesses</h3>
              <p>
                Businesses at an inflection point — ready to invest in their online presence but
                wanting to do it thoughtfully and without wasting budget.
              </p>
            </div>
          </div>
        </section>

        {/* What to expect */}
        <section className="dark-band">
          <div className="dark-band-side">
            <Eyebrow>Working with us</Eyebrow>
            <span className="band-symbol">
              <Mark inverse />
            </span>
          </div>
          <div className="dark-band-copy">
            <h2 className="display">
              What to expect
              <br />
              <em>when we work together.</em>
            </h2>
            <div className="why-us-grid">
              {expectations.map((e, i) => (
                <div className="why-us-item" key={e.title}>
                  <span className="why-us-num mono">0{i + 1}</span>
                  <div>
                    <strong>{e.title}</strong>
                    <p>{e.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="about-bottom">
          <h2 className="display">
            Ready to work with
            <br />a growth partner that <em>gets it?</em>
          </h2>
          <ButtonLink to="/contact">Start the conversation</ButtonLink>
        </section>
      </main>
    </PublicFrame>
  );
}
