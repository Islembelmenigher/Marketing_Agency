import { createFileRoute, Link, notFound, type ErrorComponentProps, useRouter } from "@tanstack/react-router";
import { PublicFrame } from "@/components/site/layout";
import { ButtonLink, Eyebrow } from "@/components/site/brand";
import { ServiceLanding } from "@/components/services/service-page";
import { getServicePage } from "@/lib/service-pages";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const page = getServicePage(params.slug);
    if (!page) throw notFound();
    return { slug: page.slug };
  },
  head: ({ params }) => {
    const page = getServicePage(params.slug);
    if (!page) {
      return { meta: [{ title: "Service not found | Loop & Lift" }, { name: "robots", content: "noindex" }] };
    }
    const url = `/services/${page.slug}`;
    return {
      meta: [
        { title: page.seo.title },
        { name: "description", content: page.seo.description },
        { property: "og:title", content: page.seo.title },
        { property: "og:description", content: page.seo.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: page.seo.title },
        { name: "twitter:description", content: page.seo.description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: page.name,
            description: page.seo.description,
            serviceType: page.name,
            provider: { "@type": "Organization", name: "Loop & Lift Growth Studio" },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Services", item: "/services" },
              { "@type": "ListItem", position: 3, name: page.name, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: ServicePageRoute,
  notFoundComponent: ServiceNotFound,
  errorComponent: ServiceError,
});

function ServicePageRoute() {
  const { slug } = Route.useParams();
  const page = getServicePage(slug);
  if (!page) return <ServiceNotFound />;
  return (
    <PublicFrame>
      <ServiceLanding page={page} />
    </PublicFrame>
  );
}

function ServiceNotFound() {
  return (
    <PublicFrame>
      <main className="not-found-page page-in">
        <Eyebrow>Service not found</Eyebrow>
        <h1 className="display">
          We don’t offer <em>that one</em> yet.
        </h1>
        <p>The service you’re looking for doesn’t exist or has moved. Here’s everything we do.</p>
        <ButtonLink to="/services">See all services</ButtonLink>
      </main>
    </PublicFrame>
  );
}

function ServiceError({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  console.error(error);
  return (
    <PublicFrame>
      <main className="not-found-page page-in">
        <Eyebrow>Something went wrong</Eyebrow>
        <h1 className="display">This page didn’t load.</h1>
        <p>Please try again, or head back to the services overview.</p>
        <div className="hero-actions">
          <button
            className="button-link"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </button>
          <Link to="/services" className="arrow-text">
            All services
          </Link>
        </div>
      </main>
    </PublicFrame>
  );
}
