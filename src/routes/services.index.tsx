import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PublicFrame } from "@/components/site/layout";
import { ButtonLink, Eyebrow, PageIntro } from "@/components/site/brand";
import { services } from "@/lib/site-content";
import { servicePages } from "@/lib/service-pages";

const description =
  "Ecommerce growth services for independent brands: Shopify website development, analytics and conversion, email retention, SEO and AI search, and localization.";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services | Loop & Lift Growth Studio" },
      { name: "description", content: description },
      { property: "og:title", content: "Services | Loop & Lift Growth Studio" },
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
          eyebrow="How we help"
          title={
            <>
              Growth, built
              <br />
              <em>from the right parts.</em>
            </>
          }
          text="Ecommerce growth is a connected system. We join up the customer experience, the data and the work that keeps people coming back. Choose a service to see exactly what it involves."
          marker="01—05 / CAPABILITIES"
        />
        <section className="svc-grid-wrap" aria-label="Our services">
          <ul className="svc-grid">
            {services.map((s, i) => {
              const page = servicePages.find((p) => p.slug === s.slug);
              return (
                <li key={s.slug} className={i === 0 ? "featured" : ""}>
                  <Link to="/services/$slug" params={{ slug: s.slug }} className={`svc-card svc-${s.color}`} data-testid={`service-card-${s.slug}`}>
                    <span className="svc-card-top">
                      <span className={`service-icon large ${s.color}`} aria-hidden="true">
                        <s.icon size={23} />
                      </span>
                      <span className="mono svc-num">{s.num} / 05</span>
                    </span>
                    <span className="svc-name eyebrow">{page?.name}</span>
                    <span className="svc-title display">{s.title}</span>
                    <span className="svc-text">{s.text}</span>
                    {page && (
                      <span className="svc-tags">
                        {page.included.items.slice(0, 3).map((item) => (
                          <span key={item.title}>{item.title}</span>
                        ))}
                      </span>
                    )}
                    <span className="svc-explore">
                      Explore service
                      <span className="svc-arrow" aria-hidden="true">
                        <ArrowRight size={18} />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="services-note">
          <Eyebrow>Not sure which one?</Eyebrow>
          <h2 className="display">That’s what the first conversation is for.</h2>
          <ButtonLink to="/contact">Tell us what you’re working on</ButtonLink>
        </section>
      </main>
    </PublicFrame>
  );
}
