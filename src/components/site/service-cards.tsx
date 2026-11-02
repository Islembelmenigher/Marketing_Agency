import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Search, Smartphone, Sparkles, TrendingUp, Zap } from "lucide-react";

interface ServiceCardData {
  slug: string;
  num: string;
  category: string;
  title: string;
  description: string;
  highlights: string[];
  theme: "green" | "blue" | "violet";
}

const serviceCardsData: ServiceCardData[] = [
  {
    slug: "website-development",
    num: "01",
    category: "ARCHITECTURE & UI",
    title: "Website & Landing Page Development",
    description:
      "We design and build bespoke business websites and focused landing pages engineered to communicate your value clearly, build instant trust, and convert visitors into enquiries.",
    highlights: [
      "Custom responsive UI/UX architecture",
      "High-converting landing page systems",
      "Sub-second load times & Core Web Vitals",
    ],
    theme: "green",
  },
  {
    slug: "conversion-optimisation",
    num: "02",
    category: "MESSAGING & CRO",
    title: "Conversion Optimization & Copywriting",
    description:
      "We diagnose user journey bottlenecks and rewrite critical website copy to clarify your offer, remove hesitation, and generate more leads from the visitors you already have.",
    highlights: [
      "Customer journey & friction diagnostics",
      "Outcome-focused persuasive copywriting",
      "Headline, call-to-action & funnel refinement",
    ],
    theme: "blue",
  },
  {
    slug: "seo-analytics-growth",
    num: "03",
    category: "DISCOVERY & ANALYTICS",
    title: "SEO, Analytics & Growth Tracking",
    description:
      "We establish clean measurement and technical search foundations so you understand customer behavior, know what works, and build sustainable organic visibility.",
    highlights: [
      "Technical SEO & structured answer schema",
      "Google Analytics 4 & Tag Manager setup",
      "Actionable conversion event reporting",
    ],
    theme: "violet",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   MOCKUP 1: Website & Landing Page Development
   Layered website interface mockup with floating responsive viewport
   ───────────────────────────────────────────────────────────────────────────── */
function WebsiteDevelopmentMockup() {
  return (
    <div className="sc-stage sc-stage-web" aria-hidden="true">
      {/* Ambient background light */}
      <div className="sc-ambient-glow sc-ambient-green" />

      {/* Main glass browser window */}
      <div className="sc-glass-browser">
        {/* Browser Topbar */}
        <div className="sc-browser-topbar">
          <div className="sc-browser-traffic-lights">
            <span className="sc-light-dot" />
            <span className="sc-light-dot" />
            <span className="sc-light-dot active-green" />
          </div>
          <div className="sc-browser-url-pill">
            <span className="sc-lock-glyph">●</span>
            <span className="sc-url-caption">loopandlift.studio/preview</span>
          </div>
          <span className="sc-res-tag mono">DESKTOP</span>
        </div>

        {/* Browser Content Stage */}
        <div className="sc-browser-canvas">
          {/* Mini Nav */}
          <div className="sc-canvas-nav">
            <div className="sc-canvas-brand">
              <span className="sc-mini-logo" />
              <span className="sc-brand-name">STUDIO</span>
            </div>
            <div className="sc-canvas-nav-links">
              <span className="sc-mini-link" />
              <span className="sc-mini-link" />
              <span className="sc-mini-cta">Work</span>
            </div>
          </div>

          {/* Mini Hero Section */}
          <div className="sc-canvas-hero">
            <div className="sc-canvas-eyebrow">
              <span className="sc-pulse-dot" />
              <span>DIGITAL GROWTH // COMMERCE</span>
            </div>
            <div className="sc-canvas-headline">
              <span className="sc-line lg w-85" />
              <span className="sc-line lg w-60" />
            </div>
            <div className="sc-canvas-subline">
              <span className="sc-line sm w-70" />
            </div>
            <div className="sc-canvas-actions">
              <span className="sc-btn-primary">
                Book Audit <span className="sc-arrow">→</span>
              </span>
              <span className="sc-btn-secondary">Explore</span>
            </div>
          </div>
        </div>

        {/* Specular reflection sheen */}
        <div className="sc-specular-glare" />
      </div>

      {/* Floating responsive viewport frame (mobile preview) */}
      <div className="sc-floating-mobile">
        <div className="sc-mobile-notch-bar">
          <span className="sc-notch" />
        </div>
        <div className="sc-mobile-viewport">
          <div className="sc-mobile-nav">
            <span className="sc-mobile-logo-dot" />
            <span className="sc-mobile-burger" />
          </div>
          <div className="sc-mobile-body">
            <span className="sc-line xs w-65" />
            <span className="sc-line xs w-85" />
            <span className="sc-mobile-action-pill" />
          </div>
        </div>
        <div className="sc-mobile-badge mono">
          <Smartphone size={10} />
          <span>Mobile-First</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MOCKUP 2: Conversion Optimization & Copywriting
   User journey funnel stages & message optimization diagnostic card
   ───────────────────────────────────────────────────────────────────────────── */
function ConversionCopywritingMockup() {
  return (
    <div className="sc-stage sc-stage-cro" aria-hidden="true">
      {/* Ambient background light */}
      <div className="sc-ambient-glow sc-ambient-blue" />

      {/* Funnel sequence tracker */}
      <div className="sc-funnel-sequence">
        <div className="sc-funnel-node">
          <div className="sc-node-header">
            <span className="sc-node-index mono">01</span>
            <span className="sc-node-name">VISIT</span>
          </div>
          <span className="sc-node-label">Traffic In</span>
        </div>

        <div className="sc-funnel-bridge">
          <span className="sc-bridge-line" />
          <span className="sc-bridge-dot" />
        </div>

        <div className="sc-funnel-node">
          <div className="sc-node-header">
            <span className="sc-node-index mono">02</span>
            <span className="sc-node-name">ENGAGE</span>
          </div>
          <span className="sc-node-label">Clear Message</span>
        </div>

        <div className="sc-funnel-bridge">
          <span className="sc-bridge-line" />
          <span className="sc-bridge-dot active" />
        </div>

        <div className="sc-funnel-node active">
          <div className="sc-node-header active">
            <span className="sc-node-index mono">03</span>
            <span className="sc-node-name">CONVERT</span>
          </div>
          <span className="sc-node-label highlight">Lead Generated</span>
        </div>
      </div>

      {/* Interactive copy & diagnostic test card */}
      <div className="sc-glass-cro-card">
        <div className="sc-cro-topbar">
          <div className="sc-cro-badge">
            <span className="sc-pulse-beacon" />
            <span className="mono">MESSAGING TEST</span>
          </div>
          <span className="sc-friction-status mono">Friction Removed</span>
        </div>

        <div className="sc-cro-body">
          <div className="sc-cro-comparison">
            <div className="sc-cro-row before">
              <span className="sc-tag-flag before">BEFORE</span>
              <span className="sc-strike-line">Generic vague marketing statements...</span>
            </div>
            <div className="sc-cro-row after">
              <span className="sc-tag-flag after">AFTER</span>
              <p className="sc-value-prop">"We build websites that bring in qualified business."</p>
            </div>
          </div>

          <div className="sc-cro-cta-preview">
            <div className="sc-interactive-btn">
              <span>Get Free Growth Audit</span>
              <span className="sc-cursor-pointer">👆</span>
            </div>
            <div className="sc-cta-clarity-tag mono">
              <Zap size={10} />
              <span>Friction-Free Action</span>
            </div>
          </div>
        </div>

        {/* Specular reflection sheen */}
        <div className="sc-specular-glare" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MOCKUP 3: SEO, Analytics & Growth Tracking
   Search discovery bar & performance telemetry dashboard with upward growth
   ───────────────────────────────────────────────────────────────────────────── */
function SeoAnalyticsMockup() {
  return (
    <div className="sc-stage sc-stage-seo" aria-hidden="true">
      {/* Ambient background light */}
      <div className="sc-ambient-glow sc-ambient-violet" />

      {/* Search SERP preview bar */}
      <div className="sc-search-query-bar">
        <div className="sc-search-pill">
          <Search size={11} className="sc-search-icon" />
          <span className="sc-query-text">b2b digital growth agency</span>
        </div>
        <div className="sc-serp-indicator mono">
          <span className="sc-intent-pill">Top Rank</span>
        </div>
      </div>

      {/* Analytics telemetry glass card */}
      <div className="sc-glass-telemetry-card">
        <div className="sc-telemetry-head">
          <div className="sc-telemetry-title">
            <span className="sc-telemetry-dot" />
            <span className="mono">VISIBILITY &amp; EVENT TELEMETRY</span>
          </div>
          <span className="sc-cadence-pill mono">GA4 STREAM</span>
        </div>

        {/* Upward Growth SVG visualization */}
        <div className="sc-telemetry-chart-wrap">
          <svg viewBox="0 0 320 86" preserveAspectRatio="none" className="sc-chart-svg">
            <defs>
              <linearGradient id="scGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#84d848" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#84d848" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Horizontal guide grids */}
            <line
              x1="0"
              y1="26"
              x2="320"
              y2="26"
              stroke="rgba(200, 215, 195, 0.35)"
              strokeDasharray="3 3"
            />
            <line
              x1="0"
              y1="56"
              x2="320"
              y2="56"
              stroke="rgba(200, 215, 195, 0.35)"
              strokeDasharray="3 3"
            />
            {/* Area under curve */}
            <path
              d="M0,72 Q45,66 90,56 T180,42 T260,24 T320,10 L320,86 L0,86 Z"
              fill="url(#scGrowthGradient)"
            />
            {/* Growth curve */}
            <path
              d="M0,72 Q45,66 90,56 T180,42 T260,24 T320,10"
              fill="none"
              stroke="#5ba02c"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Nodes */}
            <circle cx="90" cy="56" r="3" fill="#f7f5ed" stroke="#5ba02c" strokeWidth="2" />
            <circle cx="180" cy="42" r="3" fill="#f7f5ed" stroke="#5ba02c" strokeWidth="2" />
            <circle cx="260" cy="24" r="3" fill="#f7f5ed" stroke="#5ba02c" strokeWidth="2" />
            <circle cx="320" cy="10" r="4.5" fill="#84d848" stroke="#1e2c26" strokeWidth="2" />
          </svg>
        </div>

        {/* Measurement metrics strip (factual structural indicators) */}
        <div className="sc-telemetry-metrics">
          <div className="sc-metric-col">
            <span className="sc-metric-label mono">STRUCTURED DATA</span>
            <span className="sc-metric-value">
              <Check size={11} className="sc-metric-check" />
              Schema Valid
            </span>
          </div>
          <div className="sc-metric-col">
            <span className="sc-metric-label mono">CORE WEB VITALS</span>
            <span className="sc-metric-value text-green">99 / 100</span>
          </div>
          <div className="sc-metric-col">
            <span className="sc-metric-label mono">GA4 EVENTS</span>
            <span className="sc-metric-value">Active Track</span>
          </div>
        </div>

        {/* Specular reflection sheen */}
        <div className="sc-specular-glare" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN SERVICE CARD COMPONENT
   ───────────────────────────────────────────────────────────────────────────── */
export function ServiceCard({ service }: { service: ServiceCardData }) {
  return (
    <article
      className={`service-glass-card sc-theme-${service.theme}`}
      data-testid={`service-card-${service.slug}`}
    >
      {/* Top light reflection border highlight */}
      <div className="sc-top-reflection" />

      {/* Visual illustration stage */}
      <div className="sc-card-visual-container">
        {service.slug === "website-development" && <WebsiteDevelopmentMockup />}
        {service.slug === "conversion-optimisation" && <ConversionCopywritingMockup />}
        {service.slug === "seo-analytics-growth" && <SeoAnalyticsMockup />}
      </div>

      {/* Content block */}
      <div className="sc-card-content">
        {/* Meta / Index */}
        <div className="sc-card-meta">
          <span className="sc-service-num mono">{service.num}</span>
          <span className="sc-service-cat mono">{service.category}</span>
        </div>

        {/* Title */}
        <h3 className="sc-service-title display">{service.title}</h3>

        {/* Description */}
        <p className="sc-service-desc">{service.description}</p>

        {/* Key capabilities / highlights */}
        <ul className="sc-service-highlights" aria-label={`Key capabilities of ${service.title}`}>
          {service.highlights.map((highlight) => (
            <li key={highlight} className="sc-highlight-item">
              <span className="sc-highlight-bullet">
                <Check size={12} strokeWidth={2.8} />
              </span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* CTA link button */}
        <div className="sc-card-footer">
          <Link
            to="/services/$slug"
            params={{ slug: service.slug }}
            className="sc-explore-btn"
            aria-label={`Explore ${service.title}`}
          >
            <span>Explore Service</span>
            <span className="sc-explore-arrow">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   FULL HOMEPAGE SECTION COMPONENT
   ───────────────────────────────────────────────────────────────────────────── */
export function HomeServicesSection() {
  return (
    <section className="services-showcase-section" aria-labelledby="services-showcase-heading">
      <div className="services-showcase-inner">
        {/* Section Header */}
        <div className="services-showcase-header">
          <div className="services-header-left">
            <div className="eyebrow section-eyebrow">Core Agency Disciplines</div>
            <h2 id="services-showcase-heading" className="display">
              Everything your website needs to <em>bring in business.</em>
            </h2>
          </div>
          <div className="services-header-right">
            <p>
              We combine website development, conversion copywriting and organic growth tracking
              into one connected, measurable system. No isolated silos or guesswork.
            </p>
            <div className="services-header-pill">
              <Sparkles size={14} className="text-lime-500" />
              <span>Three interconnected disciplines</span>
            </div>
          </div>
        </div>

        {/* Three Glass Cards Grid */}
        <div className="services-cards-grid">
          {serviceCardsData.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        {/* Bottom exploration strip */}
        <div className="services-showcase-footer">
          <span className="mono sc-footnote-text">
            LOOKING FOR A CUSTOM ENGAGEMENT? WE ADAPT TO YOUR GOALS.
          </span>
          <Link to="/services" className="sc-all-services-link">
            <span>View complete service breakdown &amp; deliverables</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
