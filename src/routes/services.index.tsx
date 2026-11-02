import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PublicFrame } from "@/components/site/layout";
import { ButtonLink, Eyebrow, PageIntro } from "@/components/site/brand";
import { services } from "@/lib/site-content";
import { servicePages } from "@/lib/service-pages";

const description =
  "Website development, conversion optimisation and SEO for small and medium-sized businesses. Clear services, honest pricing and measurable results.";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services | Loop & Lift Digital Growth Agency" },
      { name: "description", content: description },
      { property: "og:title", content: "Services | Loop & Lift Digital Growth Agency" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <PublicFrame>
      <main className="page-in">
        <PageIntro
          eyebrow="What we do"
          title={
            <>
              Three services.
              <br />
              <em>One connected approach.</em>
            </>
          }
          text="We help businesses improve their websites, convert more visitors and understand where their growth is coming from. Each service works on its own. They work better together."
          marker="01—03 / SERVICES"
        />

        {/* Service rows with detail */}
        <section className="services-page-list" aria-label="Our services">
          {services.map((s, i) => {
            const page = servicePages.find((p) => p.slug === s.slug);
            return (
              <article className="service-detail-row" key={s.slug}>
                <span className="service-index mono">0{i + 1}</span>
                <span className={`service-icon large ${s.color}`} aria-hidden="true">
                  <s.icon size={24} />
                </span>
                <div>
                  <h2>{s.title}</h2>
                  <p>{page?.hero.intro ?? s.text}</p>
                  {page && (
                    <div className="demo-tags" style={{ marginTop: "14px" }}>
                      {page.included.items.slice(0, 4).map((item) => (
                        <span key={item.title}>{item.title}</span>
                      ))}
                    </div>
                  )}
                </div>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="circle-link"
                  aria-label={`Explore ${s.title}`}
                  data-testid={`service-card-${s.slug}`}
                >
                  <ArrowUpRight size={18} />
                </Link>
              </article>
            );
          })}
        </section>

        {/* Bottom CTA */}
        <section className="services-note">
          <div>
            <Eyebrow>Not sure which service you need?</Eyebrow>
            <h2 className="display">That's what the first conversation is for.</h2>
            <p>
              Tell us where your business is and what you're trying to improve. We'll recommend the
              most useful starting point.
            </p>
          </div>
          <ButtonLink to="/contact">Start the conversation</ButtonLink>
        </section>
      </main>
    </PublicFrame>
  );
}
