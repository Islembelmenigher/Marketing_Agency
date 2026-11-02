import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { ButtonLink, Eyebrow } from "@/components/site/brand";
import type { ServicePage } from "@/lib/service-pages";
import { services } from "@/lib/site-content";

function FaqDetail({ q, a, index }: { q: string; a: string; index: number }) {
  return (
    <details className="faq-item">
      <summary className="faq-question">
        <span className="faq-num mono">0{index + 1}</span>
        <span>{q}</span>
        <ChevronDown className="faq-chevron" size={18} />
      </summary>
      <p className="faq-answer">{a}</p>
    </details>
  );
}

export function ServiceLanding({ page }: { page: ServicePage }) {
  const themeClass = `service-${page.theme}`;
  const relatedServices = services.filter((s) => s.slug !== page.slug);

  return (
    <main className={`page-in service-landing ${themeClass}`}>
      {/* Hero */}
      <div className="service-hero">
        <div>
          <Eyebrow>{page.hero.kicker}</Eyebrow>
          <h1 className="display">{page.hero.headline}</h1>
          <p>{page.hero.intro}</p>
          <ButtonLink to="/contact" search={{ service: page.name }}>
            Discuss this service
          </ButtonLink>
        </div>
        <div className="service-hero-badge" aria-hidden="true">
          <div className="shb-inner">
            <span className="shb-num mono">
              SVC / 0{services.findIndex((s) => s.slug === page.slug) + 1}
            </span>
            <div className="shb-title display">{page.name}</div>
            <div className="shb-dots">
              {page.included.items.slice(0, 5).map((item) => (
                <span key={item.title} className="shb-dot">
                  {item.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Problems solved */}
      <section className="service-problems">
        <div className="service-problems-inner">
          <div className="service-problems-header">
            <Eyebrow>{page.problems.heading}</Eyebrow>
          </div>
          <ul className="service-problems-list">
            {page.problems.items.map((item) => (
              <li key={item} className="service-problem-item">
                <span className="service-problem-check">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What we do */}
      <section className="service-detail-content">
        <div>
          <Eyebrow>What's included</Eyebrow>
          <h2 className="display">{page.included.heading}</h2>
        </div>
        <ul>
          {page.included.items.map((item, i) => (
            <li key={item.title}>
              <span className="mono">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <strong>{item.title}</strong>
                <p
                  style={{
                    marginTop: "5px",
                    fontSize: "12px",
                    color: "#6d7a70",
                    lineHeight: "1.7",
                  }}
                >
                  {item.text}
                </p>
              </div>
              <item.icon size={16} />
            </li>
          ))}
        </ul>
      </section>

      {/* Business benefits */}
      <section className="service-benefits">
        <div className="service-benefits-inner">
          <div className="service-benefits-header">
            <Eyebrow>Business impact</Eyebrow>
            <h2 className="display">{page.benefits.heading}</h2>
          </div>
          <div className="benefits-grid">
            {page.benefits.items.map((item, i) => (
              <div className="benefit-card" key={item.title}>
                <span className="benefit-num mono">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="service-process">
        <div className="service-process-inner">
          <Eyebrow>Our approach</Eyebrow>
          <h2 className="display">{page.process.heading}</h2>
          <div className="process-steps">
            {page.process.steps.map((step) => (
              <div className="process-step-new" key={step.num}>
                <span className="process-step-num mono">{step.num}</span>
                <div className="process-step-content">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="service-faq">
        <div className="service-faq-inner">
          <Eyebrow>Common questions</Eyebrow>
          <h2 className="display">
            Things people
            <br />
            usually ask about this service.
          </h2>
          <div className="faq-list">
            {page.faq.map((item, i) => (
              <FaqDetail key={item.q} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="detail-end">
        <div>
          <h2 className="display">{page.cta.heading}</h2>
          <p>{page.cta.text}</p>
        </div>
        <ButtonLink to="/contact" search={{ service: page.name }}>
          Get in touch <ArrowUpRight size={16} />
        </ButtonLink>
      </div>

      {/* Related */}
      <div className="related-services">
        <Eyebrow>Other services</Eyebrow>
        {relatedServices.map((s) => (
          <Link
            key={s.slug}
            to="/services/$slug"
            params={{ slug: s.slug }}
            className="button-link button-light"
          >
            {s.title}
          </Link>
        ))}
      </div>
    </main>
  );
}
