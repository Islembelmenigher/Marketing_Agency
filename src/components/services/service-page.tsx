import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronRight, Plus, RefreshCw, X } from "lucide-react";
import type { ServicePage } from "@/lib/service-pages";
import { servicePages } from "@/lib/service-pages";
import { services } from "@/lib/site-content";
import { ServiceDetailVisual, ServiceHeroVisual } from "./service-visuals";

const pad = (n: number) => String(n + 1).padStart(2, "0");

function Breadcrumbs({ name }: { name: string }) {
  return (
    <nav className="sp-crumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link to="/">Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
        </li>
        <li>
          <Link to="/services">Services</Link>
          <ChevronRight size={14} aria-hidden="true" />
        </li>
        <li aria-current="page">{name}</li>
      </ol>
    </nav>
  );
}

function CtaPair({ slug, inverse = false }: { slug: string; inverse?: boolean }) {
  return (
    <div className="sp-actions">
      <Link to="/contact" search={{ service: slug }} className="button-link sp-btn">
        Discuss your project
        <ArrowUpRight size={18} />
      </Link>
      <Link to="/services" className={`sp-btn-ghost ${inverse ? "inverse" : ""}`}>
        Explore our services
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}

function Hero({ page }: { page: ServicePage }) {
  const { hero } = page;
  return (
    <section className={`sp-hero sp-hero-${hero.layout}`}>
      <div className="sp-wrap">
        <Breadcrumbs name={page.name} />
        <div className="sp-hero-grid">
          <div className="sp-hero-copy">
            <span className="eyebrow sp-eyebrow">{hero.eyebrow}</span>
            <h1 className="display">
              {hero.headline} <em>{hero.highlight}</em>
            </h1>
            <p className="sp-lead">{hero.intro}</p>
            <ul className="sp-hero-points">
              {hero.points.map((p) => (
                <li key={p}>
                  <Check size={16} aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <CtaPair slug={page.slug} inverse={hero.layout === "inverse"} />
          </div>
          <div className="sp-hero-visual">
            <ServiceHeroVisual slug={page.slug} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Problem({ page }: { page: ServicePage }) {
  return (
    <section className="sp-section sp-problem" aria-labelledby="sp-problem">
      <div className="sp-wrap sp-two">
        <div className="sp-head sp-reveal">
          <span className="eyebrow sp-eyebrow">The problem</span>
          <h2 id="sp-problem" className="display">
            {page.problem.heading}
          </h2>
          <p>{page.problem.intro}</p>
        </div>
        <div className="sp-problem-grid">
          {page.problem.points.map((p) => (
            <article className="sp-problem-card sp-reveal" key={p.title}>
              <span className="sp-x" aria-hidden="true">
                <X size={16} />
              </span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution({ page }: { page: ServicePage }) {
  const { solution } = page;
  return (
    <section className="sp-section sp-solution" aria-labelledby="sp-solution">
      <div className={`sp-wrap sp-split ${solution.visualSide === "left" ? "visual-left" : ""}`}>
        <div className="sp-solution-copy sp-reveal">
          <span className="eyebrow sp-eyebrow">Our solution</span>
          <h2 id="sp-solution" className="display">
            {solution.heading}
          </h2>
          {solution.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <ul className="sp-checks">
            {solution.bullets.map((b) => (
              <li key={b}>
                <Check size={16} aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="sp-solution-visual sp-reveal">
          <ServiceDetailVisual slug={page.slug} />
        </div>
      </div>
    </section>
  );
}

function Included({ page }: { page: ServicePage }) {
  const { included } = page;
  const header = (
    <div className="sp-head sp-reveal">
      <span className="eyebrow sp-eyebrow">What’s included</span>
      <h2 id="sp-included" className="display">
        {included.heading}
      </h2>
      <p>{included.intro}</p>
    </div>
  );
  if (included.style === "list") {
    return (
      <section className="sp-section sp-included sp-included-list" aria-labelledby="sp-included">
        <div className="sp-wrap sp-two">
          <div className="sp-sticky">{header}</div>
          <ol className="sp-deliverables">
            {included.items.map((item, i) => (
              <li key={item.title} className="sp-reveal">
                <span className="sp-del-num mono">{pad(i)}</span>
                <span className="sp-icon" aria-hidden="true">
                  <item.icon size={20} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }
  return (
    <section className={`sp-section sp-included sp-included-${included.style}`} aria-labelledby="sp-included">
      <div className="sp-wrap">
        {header}
        <div className={`sp-cards sp-cards-${included.style}`}>
          {included.items.map((item, i) => (
            <article className="sp-card sp-reveal" key={item.title}>
              <div className="sp-card-top">
                <span className="sp-icon" aria-hidden="true">
                  <item.icon size={20} />
                </span>
                <span className="mono sp-card-num">{pad(i)}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Impact({ page }: { page: ServicePage }) {
  return (
    <section className="sp-section sp-impact" aria-labelledby="sp-impact">
      <div className="sp-wrap">
        <div className="sp-head sp-head-wide sp-reveal">
          <span className="eyebrow sp-eyebrow">Why it matters</span>
          <h2 id="sp-impact" className="display">
            {page.impact.heading}
          </h2>
          <p>{page.impact.intro}</p>
        </div>
        <div className="sp-impact-grid">
          {page.impact.items.map((item) => (
            <article key={item.title} className="sp-impact-item sp-reveal">
              <ArrowUpRight size={22} aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process({ page }: { page: ServicePage }) {
  const { process } = page;
  return (
    <section className={`sp-section sp-process sp-process-${process.style}`} aria-labelledby="sp-process">
      <div className="sp-wrap">
        <div className="sp-head sp-reveal">
          <span className="eyebrow sp-eyebrow">Our process</span>
          <h2 id="sp-process" className="display">
            {process.heading}
          </h2>
          <p>{process.intro}</p>
        </div>
        <ol className="sp-steps">
          {process.steps.map((step, i) => (
            <li key={step.title} className="sp-step sp-reveal">
              <span className="sp-step-num mono">{pad(i)}</span>
              <div className="sp-step-body">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <span className="sp-output">
                  <Check size={14} aria-hidden="true" /> {step.output}
                </span>
              </div>
            </li>
          ))}
        </ol>
        {process.style === "cycle" && (
          <p className="sp-cycle-note">
            <RefreshCw size={16} aria-hidden="true" /> Then the cycle starts again, informed by everything we learned.
          </p>
        )}
      </div>
    </section>
  );
}

function Audience({ page }: { page: ServicePage }) {
  const { audience } = page;
  return (
    <section className="sp-section sp-audience" aria-labelledby="sp-audience">
      <div className="sp-wrap sp-two">
        <div className="sp-reveal">
          <span className="eyebrow sp-eyebrow">Who it’s for</span>
          <h2 id="sp-audience" className="display">
            {audience.heading}
          </h2>
          <p className="sp-body">{audience.intro}</p>
          <ul className="sp-checks sp-fits">
            {audience.fits.map((f) => (
              <li key={f}>
                <Check size={16} aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="sp-scenarios">
          {audience.scenarios.map((s) => (
            <article key={s.title} className="sp-scenario sp-reveal">
              <span className="eyebrow">Example scenario</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
          <p className="sp-small">Hypothetical examples to show fit, not client case studies.</p>
        </div>
      </div>
    </section>
  );
}

function Faq({ page }: { page: ServicePage }) {
  return (
    <section className="sp-section sp-faq" aria-labelledby="sp-faq">
      <div className="sp-wrap sp-two">
        <div className="sp-sticky sp-reveal">
          <span className="eyebrow sp-eyebrow">FAQ</span>
          <h2 id="sp-faq" className="display">
            Questions we often hear
          </h2>
          <p className="sp-body">
            Something else on your mind? <Link to="/contact" search={{ service: page.slug }}>Ask us directly</Link>.
          </p>
        </div>
        <div className="sp-faq-list">
          {page.faq.map((f) => (
            <details key={f.q} className="sp-faq-item">
              <summary>
                <span>{f.q}</span>
                <Plus size={20} aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ page }: { page: ServicePage }) {
  return (
    <section className="sp-final" aria-labelledby="sp-final">
      <div className="sp-wrap sp-final-inner sp-reveal">
        <span className="eyebrow">{page.name}</span>
        <h2 id="sp-final" className="display">
          {page.cta.heading}
        </h2>
        <p>{page.cta.text}</p>
        <div className="sp-actions">
          <Link to="/contact" search={{ service: page.slug }} className="button-link sp-btn">
            Discuss your project
            <ArrowUpRight size={18} />
          </Link>
          <Link to="/services" className="sp-btn-ghost inverse">
            <ArrowLeft size={18} />
            Back to all services
          </Link>
        </div>
      </div>
    </section>
  );
}

function Related({ slug }: { slug: string }) {
  const others = services.filter((s) => s.slug !== slug);
  return (
    <section className="sp-section sp-related" aria-labelledby="sp-related">
      <div className="sp-wrap">
        <div className="sp-related-head">
          <h2 id="sp-related" className="display">
            Connected services
          </h2>
          <Link to="/services" className="arrow-text">
            View all services <ArrowRight size={16} />
          </Link>
        </div>
        <div className="sp-related-grid">
          {others.map((s) => {
            const p = servicePages.find((x) => x.slug === s.slug);
            return (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="sp-related-card">
                <span className={`service-icon ${s.color}`} aria-hidden="true">
                  <s.icon size={19} />
                </span>
                <span className="sp-related-name">{p?.name ?? s.title}</span>
                <span className="sp-related-text">{s.text}</span>
                <span className="sp-explore">
                  Explore service <ArrowRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ServiceLanding({ page }: { page: ServicePage }) {
  return (
    <main className={`sp-page sp-theme-${page.theme}`}>
      <Hero page={page} />
      <Problem page={page} />
      <Solution page={page} />
      <Included page={page} />
      <Impact page={page} />
      <Process page={page} />
      <Audience page={page} />
      <Faq page={page} />
      <FinalCta page={page} />
      <Related slug={page.slug} />
    </main>
  );
}
