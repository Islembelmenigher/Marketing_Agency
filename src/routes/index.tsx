import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2, ChevronDown } from "lucide-react";
import { PublicFrame } from "@/components/site/layout";
import { ArrowText, ButtonLink, Eyebrow, Mark } from "@/components/site/brand";
import { services } from "@/lib/site-content";
import { HomeServicesSection } from "@/components/site/service-cards";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Loop & Lift | Website Design, Conversion & Growth for Small Business" },
      {
        name: "description",
        content:
          "We design and improve websites that help businesses attract the right people, communicate their value and turn more visitors into customers.",
      },
      { property: "og:title", content: "Loop & Lift | Website Design, Conversion & Growth" },
      {
        property: "og:description",
        content:
          "We design and improve websites that help businesses attract the right people, communicate their value and turn more visitors into customers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Loop & Lift",
          description:
            "A digital growth agency helping small and medium-sized businesses improve their online presence and convert more visitors into customers.",
          serviceType: ["Website Development", "Conversion Optimisation", "SEO"],
          areaServed: "Worldwide",
        }),
      },
    ],
  }),
  component: HomePage,
});

const problems = [
  "Visitors arrive at your website but leave without getting in touch.",
  "Your site doesn't reflect the quality of what you actually offer.",
  "You're not sure which marketing activities are producing results.",
  "Your website isn't appearing for the searches your customers are making.",
];

const whyUs = [
  {
    num: "01",
    title: "We focus on results, not outputs",
    text: "A website is only valuable if it does something useful for your business. Every decision we make is connected to a goal you actually care about.",
  },
  {
    num: "02",
    title: "We explain what we're doing and why",
    text: "No black boxes. We work alongside you, share our thinking and make sure you understand the decisions being made.",
  },
  {
    num: "03",
    title: "We work across design, copy and measurement",
    text: "Most agencies specialise in one area. We connect website quality, messaging clarity and growth tracking into one coherent approach.",
  },
  {
    num: "04",
    title: "We're honest about what we can achieve",
    text: "We don't promise rankings, guaranteed leads or instant results. We do the right work, track whether it's helping and tell you the truth.",
  },
];

const faqs = [
  {
    q: "Who do you work with?",
    a: "We work with small and medium-sized businesses, service businesses and ecommerce brands that want to improve their online presence and convert more visitors into customers. We're a good fit if you're serious about growth but don't want to take on a large agency with layers of account management.",
  },
  {
    q: "What does a free website and growth audit involve?",
    a: "We review your existing website, assess how well it communicates your value and identifies the most significant opportunities for improvement. You receive a clear summary of what we found and where to focus first — no obligation to continue.",
  },
  {
    q: "Do you work on projects or retainers?",
    a: "Both. Some work — like a website build or an SEO audit — is project-based with a clear deliverable. Ongoing optimisation, analytics and content work suits a monthly arrangement. We'll recommend what fits your situation.",
  },
  {
    q: "How long does it take to see results?",
    a: "It depends on the work. Design and copy improvements can affect conversion within days of going live. SEO takes longer — typically three to six months to see meaningful organic visibility improvements. We'll be transparent about realistic timescales from the start.",
  },
  {
    q: "Do I need a big budget to work with you?",
    a: "We work with businesses of different sizes. A focused project — improving a landing page, setting up analytics or rewriting key website copy — doesn't require a large investment. A full website or long-term growth programme is a bigger commitment. We'll scope it clearly before you decide.",
  },
];

const approach = [
  {
    num: "01",
    phase: "Understand",
    title: "We start with your business, not our process",
    text: "Before touching anything, we learn about what you do, who you serve, what's already working and where the friction is. This shapes everything that follows.",
  },
  {
    num: "02",
    phase: "Plan",
    title: "We agree on what to focus on first",
    text: "Growth is a connected system. We identify the highest-impact opportunity and build a focused plan around it — not a long list of nice-to-haves.",
  },
  {
    num: "03",
    phase: "Build",
    title: "We do the work and share progress early",
    text: "Whether it's a website, a copywriting project or an analytics setup, we involve you throughout — explaining decisions and showing work before it's finalised.",
  },
  {
    num: "04",
    phase: "Review",
    title: "We track what changes and learn from it",
    text: "We close the loop on what improved, what didn't and what the next sensible move is. Growth is iterative, not a one-time event.",
  },
];

const portfolioPreviews = [
  {
    category: "WEBSITE DEVELOPMENT / CONCEPT",
    title: "A professional services firm that started generating enquiries",
    text: "A fictional consultancy rebrand: clearer positioning, a restructured service page and a contact form that actually gets used.",
    tags: ["Website design", "Copywriting", "Conversion"],
    accent: "work-lime",
  },
  {
    category: "CONVERSION OPTIMISATION / CONCEPT",
    title: "A landing page that stopped visitors from leaving",
    text: "An illustrative project showing how headline changes, a clearer value proposition and a reduced form lifted a fictional SaaS sign-up rate.",
    tags: ["CRO", "Copywriting", "Landing page"],
    accent: "work-blue",
  },
  {
    category: "SEO & ANALYTICS / CONCEPT",
    title: "Fixing the measurement before fixing the marketing",
    text: "A fictional GA4 and GTM setup for a local service business, connecting organic traffic to actual enquiries for the first time.",
    tags: ["GA4", "SEO", "Growth tracking"],
    accent: "work-violet",
  },
];

function HeroIllustration() {
  return (
    <div className="hero-visual-wrap" aria-label="Illustrative website performance dashboard">
      <div className="hero-browser">
        <div className="hero-browser-bar">
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span className="browser-dot active" />
          <div className="browser-url">loopandlift.studio</div>
        </div>
        <div className="hero-browser-body">
          <div className="hero-browser-hero">
            <div className="hb-eyebrow">DIGITAL GROWTH AGENCY</div>
            <div className="hb-headline">
              Your website
              <br />
              should bring in
              <br />
              <em>business.</em>
            </div>
            <div className="hb-cta">Get a free audit →</div>
          </div>
          <div className="hero-metrics">
            <div className="metric-card">
              <span className="metric-label">VISITORS</span>
              <strong className="metric-value">↑ 41%</strong>
              <span className="metric-sub">illustrative</span>
            </div>
            <div className="metric-card accent">
              <span className="metric-label">CONVERSIONS</span>
              <strong className="metric-value">↑ 2.4×</strong>
              <span className="metric-sub">illustrative</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">SEARCH RANK</span>
              <strong className="metric-value">↑ 18 pos</strong>
              <span className="metric-sub">illustrative</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-float-badge">
        <span className="float-badge-icon">✓</span>
        <div>
          <b>Free audit complete</b>
          <small>3 high-impact recommendations</small>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
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

function HomePage() {
  return (
    <PublicFrame>
      <main>
        {/* ── HERO ── */}
        <section className="hero-new">
          <div className="hero-new-inner">
            <div className="hero-new-copy page-in">
              <div className="eyebrow section-eyebrow">
                Digital growth agency · Websites, conversion &amp; SEO
              </div>
              <h1 className="hero-headline display">
                Your website should
                <br />
                do more than
                <br />
                <em>look good.</em>
              </h1>
              <p className="hero-lead">
                We design and improve websites that help businesses attract the right people,
                communicate their value and turn more visitors into customers.
              </p>
              <div className="hero-actions">
                <ButtonLink to="/contact">Get a Free Website &amp; Growth Audit</ButtonLink>
                <ArrowText to="/work">Explore Our Work</ArrowText>
              </div>
              <div className="hero-footnote">
                <span className="pulse" />
                SMALL STUDIO &nbsp;·&nbsp; SENIOR THINKING &nbsp;·&nbsp; REAL WORK
              </div>
            </div>
            <div className="hero-new-art page-in">
              <HeroIllustration />
            </div>
          </div>
        </section>

        {/* ── PROBLEM STATEMENT ── */}
        <section className="problem-strip">
          <div className="problem-strip-inner">
            <div className="problem-heading">
              <Eyebrow>Common problems we solve</Eyebrow>
              <h2 className="display">Sound familiar?</h2>
            </div>
            <ul className="problem-list">
              {problems.map((p) => (
                <li key={p} className="problem-item">
                  <CheckCircle2 size={18} className="problem-icon" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="problem-cta">
              <ArrowText to="/contact">We can help — here's how</ArrowText>
            </div>
          </div>
        </section>

        {/* ── SERVICES (REDESIGNED 3 MAIN GLASS CARDS) ── */}
        <HomeServicesSection />

        {/* ── PORTFOLIO PREVIEW ── */}
        <section className="portfolio-preview">
          <div className="portfolio-preview-header">
            <Eyebrow>Selected concept work</Eyebrow>
            <h2 className="display">
              How we think.
              <br />
              <em>What we build.</em>
            </h2>
            <p>
              Every example below is a fictional demonstration — created to make our thinking
              tangible, not to imply real client work or guaranteed results.
            </p>
          </div>
          <div className="portfolio-grid">
            {portfolioPreviews.map((p, i) => (
              <article className={`portfolio-card ${p.accent}`} key={i}>
                <div className="portfolio-card-inner">
                  <span className="eyebrow">{p.category}</span>
                  <h3 className="display">{p.title}</h3>
                  <p>{p.text}</p>
                  <div className="demo-tags">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="portfolio-card-label mono">CONCEPT · NOT A REAL CLIENT</div>
              </article>
            ))}
          </div>
          <div className="portfolio-preview-footer">
            <ArrowText to="/work">See all concept work</ArrowText>
          </div>
        </section>

        {/* ── HOW WE WORK ── */}
        <section className="section approach-preview">
          <div className="approach-aside">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="display">
              A process built
              <br />
              around <em>your goals.</em>
            </h2>
            <p className="approach-aside > p">
              We keep the work focused, the communication clear and the decisions connected to what
              you're actually trying to achieve.
            </p>
          </div>
          <div className="approach-steps">
            {approach.map((step) => (
              <div className="approach-step" key={step.num}>
                <span className="mono">{step.num}</span>
                <div>
                  <div className="eyebrow">{step.phase}</div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                <span />
              </div>
            ))}
          </div>
        </section>

        {/* ── WHY LOOP & LIFT ── */}
        <section className="dark-band">
          <div className="dark-band-side">
            <Eyebrow>Why Loop &amp; Lift</Eyebrow>
            <span className="band-symbol">
              <Mark inverse />
            </span>
          </div>
          <div className="dark-band-copy">
            <h2 className="display">
              Senior thinking.
              <br />
              <em>No unnecessary layers.</em>
            </h2>
            <div className="why-us-grid">
              {whyUs.map((w) => (
                <div className="why-us-item" key={w.num}>
                  <span className="why-us-num mono">{w.num}</span>
                  <div>
                    <strong>{w.title}</strong>
                    <p>{w.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <ArrowText to="/about">About Loop &amp; Lift</ArrowText>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="faq-section section">
          <div className="faq-header">
            <Eyebrow>Common questions</Eyebrow>
            <h2 className="display">
              Things people
              <br />
              <em>usually ask us.</em>
            </h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </section>

        {/* ── CLOSING CTA ── */}
        <section className="closing-cta">
          <div className="closing-ornament">
            <span>loop</span>
            <span>lift</span>
          </div>
          <Eyebrow>A good place to start</Eyebrow>
          <h2 className="display">
            Get a free audit of
            <br />
            your <em>website &amp; growth.</em>
          </h2>
          <ButtonLink to="/contact">Request Your Free Audit</ButtonLink>
          <small>
            No commitment required. We'll review your site and tell you what we'd focus on first.
          </small>
        </section>
      </main>
    </PublicFrame>
  );
}
