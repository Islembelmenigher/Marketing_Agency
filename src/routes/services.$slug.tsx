import { createFileRoute, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PublicFrame } from "@/components/site/layout";
import { ArrowText, ButtonLink, Eyebrow, StoreIllustration } from "@/components/site/brand";
import { serviceCopy, services } from "@/lib/site-content";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const config = serviceCopy[params.slug];
    const summary = services.find((s) => s.slug === params.slug);
    if (!config || !summary) throw notFound();
    return { config, title: summary.title };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.title} | Loop & Lift` : "Service | Loop & Lift";
    const description = loaderData?.config.intro ?? "Ecommerce growth services from Loop & Lift.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useParams();
  const { config } = Route.useLoaderData();
  return (
    <PublicFrame>
      <main className="page-in">
        <section className={`service-hero service-${slug}`}>
          <div>
            <Eyebrow>{config.kicker}</Eyebrow>
            <h1 className="display">{config.headline}</h1>
            <p>{config.intro}</p>
            <ButtonLink to="/contact">Talk about this work</ButtonLink>
          </div>
          <div className="service-hero-graphic">
            <StoreIllustration />
          </div>
        </section>
        <section className="service-detail-content">
          <div>
            <Eyebrow>What this can include</Eyebrow>
            <h2 className="display">
              The work is shaped
              <br />
              around your <em>business.</em>
            </h2>
          </div>
          <ul>
            {config.bullets.map((b, i) => (
              <li key={b}>
                <span className="mono">0{i + 1}</span>
                {b}
                <Check size={17} />
              </li>
            ))}
          </ul>
        </section>
        <section className="detail-end">
          <p>Good work starts with context. We’ll learn how your store works today, then recommend a sensible next step.</p>
          <ButtonLink to="/contact">Start with a conversation</ButtonLink>
        </section>
        <section className="related-services">
          <Eyebrow>Connected capabilities</Eyebrow>
          {services
            .filter((s) => s.slug !== slug)
            .slice(0, 3)
            .map((s) => (
              <ArrowText key={s.slug} to="/services/$slug" params={{ slug: s.slug }}>
                {s.title}
              </ArrowText>
            ))}
        </section>
      </main>
    </PublicFrame>
  );
}
