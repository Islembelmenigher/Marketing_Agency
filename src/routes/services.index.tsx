import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PublicFrame } from "@/components/site/layout";
import { ButtonLink, Eyebrow, PageIntro } from "@/components/site/brand";
import { services } from "@/lib/site-content";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services | Loop & Lift Growth Studio" },
      { name: "description", content: "Ecommerce growth across Shopify builds, analytics and conversion, email retention, SEO and AI search, and localization." },
      { property: "og:title", content: "Services | Loop & Lift Growth Studio" },
      { property: "og:description", content: "Ecommerce growth across Shopify builds, analytics and conversion, email retention, SEO and AI search, and localization." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
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
          text="Ecommerce growth is a connected system. We join up the customer experience, the data and the work that keeps people coming back."
          marker="01—05 / CAPABILITIES"
        />
        <section className="services-page-list">
          {services.map((s) => (
            <div className="service-detail-row" key={s.slug}>
              <span className="mono service-index">{s.num}</span>
              <div className={`service-icon large ${s.color}`}>
                <s.icon size={23} />
              </div>
              <div>
                <h2 className="display">{s.title}</h2>
                <p>{s.text}</p>
              </div>
              <ButtonLink to="/services/$slug" params={{ slug: s.slug }} className="circle-link" aria-label={s.title}>
                <ArrowUpRight size={19} />
              </ButtonLink>
            </div>
          ))}
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
