import {
  Activity,
  BarChart3,
  BookOpen,
  Braces,
  CalendarDays,
  ClipboardList,
  Code2,
  Coins,
  Compass,
  CreditCard,
  FileSearch,
  FileText,
  Filter,
  Gauge,
  Globe2,
  Languages,
  LayoutDashboard,
  LayoutTemplate,
  LineChart,
  ListOrdered,
  MessageCircle,
  MessageSquare,
  Network,
  PenLine,
  PenTool,
  PieChart,
  Plug,
  Rocket,
  Route,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Split,
  Store,
  TrendingUp,
  Users,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/*
 * Long-form content for each service landing page. Slugs match `services` in site-content.
 * Every scenario is a hypothetical example, never a client result.
 */

export type HeroLayout = "split" | "reverse" | "stacked" | "inverse";
export type IncludedStyle = "bento" | "list" | "grid";
export type ProcessStyle = "timeline" | "cycle" | "steps";

type Item = { title: string; text: string };

export type ServicePage = {
  slug: string;
  name: string;
  theme: "web" | "data" | "retention" | "search" | "global";
  seo: { title: string; description: string };
  hero: { layout: HeroLayout; eyebrow: string; headline: string; highlight: string; intro: string; points: string[] };
  problem: { heading: string; intro: string; points: Item[] };
  solution: { heading: string; paragraphs: string[]; bullets: string[]; visualSide: "left" | "right" };
  included: { style: IncludedStyle; heading: string; intro: string; items: (Item & { icon: LucideIcon })[] };
  impact: { heading: string; intro: string; items: Item[] };
  process: { style: ProcessStyle; heading: string; intro: string; steps: (Item & { output: string })[] };
  audience: { heading: string; intro: string; fits: string[]; scenarios: Item[] };
  faq: { q: string; a: string }[];
  cta: { heading: string; text: string };
};

export const servicePages: ServicePage[] = [
  {
    slug: "website-development",
    name: "Shopify Website Development",
    theme: "web",
    seo: {
      title: "Shopify Website Development & Redesign | Loop & Lift",
      description:
        "Custom Shopify builds and redesigns for independent ecommerce brands: fast, accessible stores with clear product pages, clean data and a calm launch.",
    },
    hero: {
      layout: "split",
      eyebrow: "Service 01 / Shopify website development",
      headline: "A store that makes",
      highlight: "buying feel easy.",
      intro:
        "We design and build Shopify stores for independent brands, from focused redesigns to full rebuilds. The goal is simple: help the right customer understand your product, trust it and check out without friction.",
      points: ["Custom Online Store 2.0 themes", "Built mobile-first, tuned for speed", "A launch plan that protects SEO and data"],
    },
    problem: {
      heading: "When the store gets in the way of the product.",
      intro:
        "Most stores don’t break all at once. They get slower, more patched-together and harder to change, until the website becomes the bottleneck for growth.",
      points: [
        { title: "Slow, heavy pages", text: "Apps, scripts and oversized images pile up. Every extra second on mobile gives a shopper a reason to leave." },
        { title: "Product pages that leave questions", text: "Sizing, ingredients, delivery and returns are buried. Customers go elsewhere to find answers, and often don’t come back." },
        { title: "A theme your team can’t edit", text: "Every campaign needs a developer. Simple changes take weeks, so the site falls behind the brand." },
        { title: "Risky redesigns", text: "Rebuilds that ignore redirects, tracking and search history can undo years of organic traffic overnight." },
      ],
    },
    solution: {
      heading: "Design and engineering, planned around how people buy.",
      paragraphs: [
        "We start with your products, customers and numbers, not a template. We map the questions a shopper needs answered at each step, then design pages that answer them in the right order.",
        "Development runs alongside design in a staging store you can see from week one. Everything is built as reusable Shopify sections, so your team can launch campaigns and landing pages without waiting on us.",
      ],
      bullets: [
        "Section-based theme your team can edit",
        "Performance budget agreed before design starts",
        "Accessibility checked against WCAG 2.2 AA",
        "Analytics and consent wired in before launch",
      ],
      visualSide: "left",
    },
    included: {
      style: "bento",
      heading: "What you receive",
      intro: "Every build is scoped to the business, but these are the building blocks most projects include.",
      items: [
        { icon: PenTool, title: "UX & interface design", text: "Wireframes and polished designs for home, collection, product, cart and content pages, on desktop and mobile." },
        { icon: Code2, title: "Custom Shopify theme", text: "A hand-built Online Store 2.0 theme with reusable sections, metafields and clean, documented code." },
        { icon: Smartphone, title: "Responsive, mobile-first pages", text: "Layouts designed for the thumb first, then scaled up, because most ecommerce visits arrive on a phone." },
        { icon: Gauge, title: "Performance & Core Web Vitals", text: "Optimized images, lean scripts and an app audit, so pages load quickly on real connections." },
        { icon: Plug, title: "Integrations", text: "Reviews, subscriptions, search, email capture and ERP or 3PL connections set up and tested." },
        { icon: LineChart, title: "Analytics & SEO foundations", text: "GA4 ecommerce events, consent mode, structured data, metadata and a complete redirect map." },
        { icon: Rocket, title: "Migration & launch", text: "Product and content migration, QA across devices, a launch-day checklist and a monitored go-live." },
        { icon: BookOpen, title: "Training & handover", text: "A walkthrough for your team, a written editing guide and 30 days of post-launch support." },
      ],
    },
    impact: {
      heading: "Why a better store matters",
      intro: "Your website is the one channel every other channel depends on. When it improves, ads, email and search traffic all work harder.",
      items: [
        { title: "More visitors become customers", text: "Clear product information and a lighter path to checkout remove the small doubts that stop a purchase." },
        { title: "Every channel gets more efficient", text: "Paid, email and organic visitors land on pages built to convert, so the budget you already spend goes further." },
        { title: "Your team moves faster", text: "Flexible sections mean new launches, landing pages and seasonal campaigns without a development queue." },
        { title: "A foundation that lasts", text: "Clean code, good documentation and sensible app choices keep the store maintainable as you grow." },
      ],
    },
    process: {
      style: "timeline",
      heading: "How a build comes together",
      intro: "Most builds run between two and four months, depending on scope. You’ll see real progress in a staging store throughout.",
      steps: [
        { title: "Discover", text: "We review analytics, customer feedback, competitors and your current store, then agree goals and scope.", output: "Project brief & sitemap" },
        { title: "Structure", text: "Wireframes for the key templates, built around the questions customers ask before they buy.", output: "Wireframes & content plan" },
        { title: "Design", text: "Desktop and mobile designs with a component library that scales across the whole site.", output: "Design system & pages" },
        { title: "Build", text: "Theme development in staging, integrations, content migration and performance tuning.", output: "Working staging store" },
        { title: "Test & launch", text: "Cross-device QA, accessibility checks, redirects and tracking verified, then a monitored go-live.", output: "Live store" },
        { title: "Improve", text: "We watch the data after launch, fix what surfaces and recommend the next improvements.", output: "30-day review" },
      ],
    },
    audience: {
      heading: "Who this is for",
      intro: "This suits brands that have proven demand and need a store that keeps up with it.",
      fits: [
        "Brands moving to Shopify from WooCommerce, Magento or a custom platform",
        "Shopify stores that have outgrown a template theme",
        "Teams preparing for a launch, rebrand or new product range",
        "Businesses whose mobile experience lags behind desktop",
      ],
      scenarios: [
        { title: "The platform move", text: "A homeware brand on an ageing WooCommerce setup needs to move to Shopify without losing search rankings or order history." },
        { title: "The template ceiling", text: "A skincare brand has grown on a stock theme, but every new product launch means fighting the layout." },
        { title: "The mobile gap", text: "A food brand sees most visits on phones, but its product pages were designed desktop-first." },
      ],
    },
    faq: [
      { q: "How long does a Shopify build take?", a: "Most projects take two to four months from kickoff to launch. A focused redesign of key templates can be quicker; a full migration with complex integrations can take longer. You’ll get a clear timeline after discovery." },
      { q: "Do you use templates or custom themes?", a: "We build custom themes on Shopify’s Online Store 2.0 architecture. Sometimes a well-built premium theme is the right starting point for budget or speed. If so, we’ll explain the trade-offs honestly." },
      { q: "Will we lose our SEO when we migrate?", a: "Every migration carries some risk, but most of it is avoidable. We map important URLs to redirects, preserve metadata and structured data, and monitor search performance after launch." },
      { q: "Can we edit the site ourselves afterwards?", a: "Yes. Everything is built as sections and blocks you can rearrange in the Shopify editor. Training and a written guide are included, so your team is confident from day one." },
      { q: "Do you work with Shopify Plus?", a: "Yes. We work across standard Shopify and Shopify Plus, including checkout extensibility, B2B and multi-store setups." },
      { q: "What happens after launch?", a: "Every build includes 30 days of post-launch support. Many brands then continue with conversion or retention work, but there’s no obligation." },
    ],
    cta: {
      heading: "Let’s talk about your store.",
      text: "Tell us what’s working, what isn’t and what’s coming next. We’ll give you an honest view of what a rebuild, or a smaller fix, could look like.",
    },
  },
  {
    slug: "analytics-conversion",
    name: "Analytics & Conversion Optimization",
    theme: "data",
    seo: {
      title: "Ecommerce Analytics & Conversion Rate Optimization | Loop & Lift",
      description:
        "GA4 measurement, conversion research and A/B testing for Shopify brands. Find where shoppers drop off and test the changes most likely to grow revenue.",
    },
    hero: {
      layout: "stacked",
      eyebrow: "Service 02 / Analytics & conversion",
      headline: "Turn more of your visitors into",
      highlight: "customers.",
      intro:
        "Most stores already have enough traffic to grow. The question is where it’s leaking. We set up measurement you can trust, find the friction in the customer journey and test the changes most likely to move revenue.",
      points: ["GA4 & server-side tracking", "Funnel, heatmap & session research", "A/B tests with clear readouts"],
    },
    problem: {
      heading: "You can’t fix what you can’t see.",
      intro:
        "Without reliable data, conversion work turns into opinion. Teams redesign on instinct, run tests that never reach an answer, or argue about numbers that don’t match.",
      points: [
        { title: "Numbers that don’t agree", text: "Shopify, GA4 and the ad platforms all report different revenue, and no one is sure which to trust." },
        { title: "Invisible drop-off", text: "You know the overall conversion rate, but not where in the journey shoppers give up, or why." },
        { title: "Changes made on instinct", text: "Redesigns ship without a baseline, so nobody knows whether they helped, hurt or did nothing." },
        { title: "Tests that go nowhere", text: "Small tweaks on low-traffic pages run for months and never produce a reliable result." },
      ],
    },
    solution: {
      heading: "Evidence first, then focused experiments.",
      paragraphs: [
        "We start by fixing the foundations: a measurement plan, clean ecommerce events and consent-aware tracking, checked against your real Shopify orders.",
        "Then we study behavior through funnels, heatmaps, session recordings, on-site surveys and customer interviews to find the moments where shoppers hesitate. Every idea is scored on expected impact and effort, so work starts where it matters most.",
      ],
      bullets: [
        "Tracking reconciled against real orders",
        "Numbers and customer voice combined",
        "Every test starts with a written hypothesis",
        "Results explained in plain language",
      ],
      visualSide: "right",
    },
    included: {
      style: "list",
      heading: "What’s included",
      intro: "Depending on where you’re starting, an engagement combines measurement, research and testing.",
      items: [
        { icon: ClipboardList, title: "Measurement plan", text: "A documented event plan defining exactly what is tracked, where, and why it matters to the business." },
        { icon: Activity, title: "GA4 & server-side tracking", text: "Ecommerce events, enhanced conversions and consent mode, validated against Shopify order data." },
        { icon: LayoutDashboard, title: "Dashboards & reporting", text: "Focused dashboards showing the few numbers your team should actually watch each week." },
        { icon: Filter, title: "Funnel & behavior analysis", text: "Step-by-step funnel analysis, heatmaps and session recordings to locate where and why shoppers drop off." },
        { icon: MessageSquare, title: "Customer research", text: "On-site polls, post-purchase surveys and interviews that capture objections in your customers’ own words." },
        { icon: ListOrdered, title: "Prioritized test roadmap", text: "A ranked backlog of experiments scored on potential impact, confidence and effort." },
        { icon: Split, title: "A/B test design & build", text: "Variants designed, built and checked in your testing tool, with sample size and duration agreed up front." },
        { icon: FileText, title: "Readouts & recommendations", text: "A clear summary for every test: what changed, what happened and what to do next." },
      ],
    },
    impact: {
      heading: "What better conversion means for the business",
      intro: "Conversion work doesn’t create demand. It makes sure the demand you already pay for isn’t wasted.",
      items: [
        { title: "More revenue from the same traffic", text: "Small gains at key steps compound across every visitor, every channel and every month." },
        { title: "Lower acquisition costs", text: "When more visitors buy, each customer costs less to win, leaving more room to invest in growth." },
        { title: "Decisions your team agrees on", text: "One trusted set of numbers ends debates and makes planning faster." },
        { title: "Fewer expensive mistakes", text: "Testing before rolling out catches risky changes early, not after a costly redesign." },
      ],
    },
    process: {
      style: "cycle",
      heading: "A cycle, not a one-off audit",
      intro: "Conversion optimization works best as a continuous loop. Each round of research and testing makes the next one sharper.",
      steps: [
        { title: "Measure", text: "Audit and fix tracking so every number is trustworthy and tied to real orders.", output: "Reliable data" },
        { title: "Research", text: "Combine analytics, heatmaps, recordings and customer feedback to find the biggest friction points.", output: "Research findings" },
        { title: "Prioritize", text: "Score each opportunity on impact, confidence and effort, and agree the roadmap together.", output: "Test roadmap" },
        { title: "Test", text: "Design, build and run controlled experiments with a clear hypothesis and success metric.", output: "Live experiments" },
        { title: "Learn", text: "Analyze results honestly, roll out winners and feed what we learned into the next cycle.", output: "Readout & next steps" },
      ],
    },
    audience: {
      heading: "Who this is for",
      intro: "Conversion work is most valuable when there’s steady traffic and a team ready to act on what we find.",
      fits: [
        "Stores with consistent traffic but a conversion rate that has plateaued",
        "Brands investing in paid media who want each visit to work harder",
        "Teams who don’t fully trust their analytics",
        "Businesses planning a redesign who want evidence first",
      ],
      scenarios: [
        { title: "The leaky checkout", text: "A fashion brand sees healthy add-to-cart numbers, but too many shoppers abandon when shipping costs appear." },
        { title: "The mismatched numbers", text: "A supplements brand’s GA4 revenue sits far below Shopify’s, so no one trusts the channel reports." },
        { title: "The redesign debate", text: "A homeware team disagrees about what to change on product pages and wants evidence before investing." },
      ],
    },
    faq: [
      { q: "How much traffic do we need for A/B testing?", a: "It depends on your conversion rate and the size of change you want to detect. As a rough guide, testing works best with several thousand sessions a week on the page being tested. With less traffic, we focus on research-led improvements and bolder changes." },
      { q: "Can you guarantee a higher conversion rate?", a: "No, and be wary of anyone who does. What we promise is a rigorous process: reliable data, focused research and honestly reported results. Losing tests are useful too; they stop you rolling out changes that would have hurt." },
      { q: "Which tools do you use?", a: "Usually GA4, Google Tag Manager, server-side tagging, Looker Studio, a heatmap and recording tool such as Hotjar or Microsoft Clarity, and a testing platform that suits your stack. We use tools you already pay for wherever possible." },
      { q: "Is the tracking privacy-compliant?", a: "We implement consent-aware tracking, including Google Consent Mode, and only collect what’s needed. Anything that needs your legal team’s input, we flag." },
      { q: "How long before we see results?", a: "Tracking fixes and research findings usually arrive in the first four to six weeks. Test results depend on traffic, but most experiments need two to four weeks to reach a reliable answer." },
    ],
    cta: {
      heading: "Let’s find where your store is leaking.",
      text: "Share your store and what you’re seeing in the numbers. We’ll suggest where to look first, and whether testing makes sense for you yet.",
    },
  },
  {
    slug: "email-retention",
    name: "Email Marketing & Retention",
    theme: "retention",
    seo: {
      title: "Email Marketing & Customer Retention for Shopify | Loop & Lift",
      description:
        "Klaviyo email and SMS flows, segmentation and campaigns that turn first-time buyers into loyal repeat customers, without filling their inbox with noise.",
    },
    hero: {
      layout: "reverse",
      eyebrow: "Service 03 / Email & retention",
      headline: "Turn first orders into",
      highlight: "lasting customers.",
      intro:
        "Winning a customer is expensive. Keeping one is where the profit is. We design lifecycle email and SMS that feels like good service: well-timed, genuinely useful and built around how your customers actually buy.",
      points: ["Klaviyo flows & segmentation", "Campaign calendar & templates", "Deliverability you can rely on"],
    },
    problem: {
      heading: "Most customers buy once, then hear nothing useful.",
      intro:
        "Many stores spend heavily to win customers, then rely on discount blasts to bring them back. The result is shrinking margins, tired lists and messages that get ignored.",
      points: [
        { title: "Missing or outdated flows", text: "Welcome, browse-abandonment and post-purchase flows were set up years ago, or never at all." },
        { title: "Everyone gets the same email", text: "New subscribers, loyal customers and lapsed buyers all receive the same message at the same time." },
        { title: "Discounts as the only lever", text: "Every campaign leads with a code, training customers to wait for the next sale." },
        { title: "Emails landing in spam", text: "Without proper authentication and list hygiene, even good emails never reach the inbox." },
      ],
    },
    solution: {
      heading: "A retention system built around the customer’s timeline.",
      paragraphs: [
        "We map the moments that matter in a customer’s relationship with you, from first sign-up to the reorder window and beyond, and design a message for each one.",
        "Automated flows do the steady, always-on work. Campaigns add the editorial voice: launches, stories and seasonal moments. Segmentation makes sure each person hears what’s relevant to them, not everything at once.",
      ],
      bullets: [
        "Flows timed to the real purchase cycle",
        "Segments built on behavior, not guesswork",
        "Content-led, with discounts used deliberately",
        "SPF, DKIM and DMARC set up properly",
      ],
      visualSide: "right",
    },
    included: {
      style: "grid",
      heading: "What’s included",
      intro: "We can build your program from scratch, or rebuild what’s already there so it works harder.",
      items: [
        { icon: Search, title: "Retention audit", text: "A review of current flows, campaigns, list health, deliverability and revenue attribution." },
        { icon: Route, title: "Lifecycle strategy", text: "A map of the customer journey with the messages, timing and goal for each stage." },
        { icon: Workflow, title: "Core automated flows", text: "Welcome, browse and cart abandonment, post-purchase, replenishment, win-back and VIP flows." },
        { icon: Users, title: "Segmentation", text: "Behavior-based segments by purchase history, engagement and predicted customer value." },
        { icon: LayoutTemplate, title: "Email design system", text: "On-brand, mobile-first templates and modules your team can reuse for every send." },
        { icon: CalendarDays, title: "Campaign planning", text: "A content calendar that balances launches, education and promotions." },
        { icon: MessageCircle, title: "SMS & sign-up capture", text: "Compliant SMS programs and sign-up forms that grow the list with the right people." },
        { icon: ShieldCheck, title: "Deliverability setup", text: "Domain authentication, warm-up, sunset policies and list hygiene to protect inbox placement." },
      ],
    },
    impact: {
      heading: "Why retention pays off",
      intro: "Repeat customers tend to buy more often, need less persuasion and recommend you to others. Retention turns one-off revenue into something more predictable.",
      items: [
        { title: "Higher customer lifetime value", text: "Thoughtful follow-up encourages second and third orders, raising what each customer is worth over time." },
        { title: "Less reliance on paid ads", text: "Email and SMS are owned channels. Once someone subscribes, reaching them again costs very little." },
        { title: "Healthier margins", text: "Content-led messaging reduces the need for constant discounting to drive sales." },
        { title: "Revenue that runs in the background", text: "Well-built flows keep working every day, whether or not your team has time to send a campaign." },
      ],
    },
    process: {
      style: "timeline",
      heading: "From audit to always-on",
      intro: "Core flows are usually live within six to eight weeks. From there, we refine month by month.",
      steps: [
        { title: "Audit", text: "Analyze your current program, list and data to find the biggest gaps and quick wins.", output: "Audit & priorities" },
        { title: "Map", text: "Define lifecycle stages, segments and the messages each one needs.", output: "Lifecycle map" },
        { title: "Build", text: "Design templates, write copy and build flows, tested across devices and inboxes.", output: "Live flows" },
        { title: "Run", text: "Plan and send campaigns on a steady calendar, with your team or on your behalf.", output: "Campaign calendar" },
        { title: "Optimize", text: "Test subject lines, timing and content; review performance monthly and refine.", output: "Monthly report" },
      ],
    },
    audience: {
      heading: "Who this is for",
      intro: "Retention work makes the biggest difference for brands whose products people can buy more than once.",
      fits: [
        "Consumable products: food, drink, beauty, supplements, pet care",
        "Brands with a growing list but few automated flows",
        "Stores relying heavily on discounts for repeat sales",
        "Teams moving to Klaviyo from another platform",
      ],
      scenarios: [
        { title: "The one-time buyer problem", text: "A coffee brand wins plenty of first orders, but few customers come back for a second bag." },
        { title: "The tired list", text: "A beauty brand sends the same weekly sale email to everyone, and engagement keeps falling." },
        { title: "The platform switch", text: "A pet-care brand is moving from Mailchimp to Klaviyo and wants to rebuild flows properly, not just copy them across." },
      ],
    },
    faq: [
      { q: "Do you only work with Klaviyo?", a: "Klaviyo is our main platform because it connects deeply with Shopify, but we also work with Omnisend, Drip and Shopify Email when they’re a better fit." },
      { q: "Will you write the emails too?", a: "Yes. We handle strategy, copywriting, design and build. If you have an in-house writer or designer, we’re happy to work alongside them." },
      { q: "How often should we email customers?", a: "There’s no universal answer; it depends on your product, audience and what you have to say. We’d rather send fewer, more useful emails, and we use engagement data to set frequency for each segment." },
      { q: "Can you help with SMS?", a: "Yes. We set up SMS with proper consent capture and use it where it adds value, usually for time-sensitive moments, rather than duplicating every email." },
      { q: "How do you measure success?", a: "We look beyond open rates: repeat purchase rate, revenue per recipient, time between orders and list health. Attribution windows are agreed up front so reporting stays honest." },
    ],
    cta: {
      heading: "Let’s bring your customers back.",
      text: "Tell us about your products, your list and how repeat purchases look today. We’ll suggest the flows and changes likely to make the biggest difference first.",
    },
  },
  {
    slug: "seo-ai-search",
    name: "SEO & AI Search",
    theme: "search",
    seo: {
      title: "Ecommerce SEO & AI Search Optimization | Loop & Lift",
      description:
        "Technical SEO, collection architecture and answer-ready content that helps Shopify stores get found on Google and in AI search by people ready to buy.",
    },
    hero: {
      layout: "split",
      eyebrow: "Service 04 / SEO & AI search",
      headline: "Be found when customers",
      highlight: "start looking.",
      intro:
        "Search is where buying journeys begin, on Google and increasingly in AI assistants. We make your store easy to crawl, understand and recommend, so qualified shoppers find you without you paying for every click.",
      points: ["Technical SEO for Shopify", "Collection & content architecture", "Structured data for AI answers"],
    },
    problem: {
      heading: "Great products, invisible in search.",
      intro:
        "Many stores rely almost entirely on ads and social because organic search never took off. Usually that isn’t about effort. It’s about structure.",
      points: [
        { title: "Technical issues blocking crawling", text: "Duplicate URLs, slow pages, broken links and messy filters waste search engines’ attention." },
        { title: "Collections no one searches for", text: "Category pages are named after internal logic, not the words customers actually type." },
        { title: "Thin product pages", text: "Supplier descriptions and missing details give search engines, and shoppers, little reason to choose you." },
        { title: "Absent from AI answers", text: "Without clear, structured information, AI assistants recommend competitors when people ask what to buy." },
      ],
    },
    solution: {
      heading: "Fix the foundations, then build pages that deserve to rank.",
      paragraphs: [
        "We begin with a technical audit so search engines can crawl and index the store efficiently. Then we research how your customers search, including the problems, comparisons and product terms they use, and shape the site structure around that demand.",
        "Finally, we strengthen the pages that matter most with clear, useful content and structured data, so both search engines and AI tools understand exactly what you sell and why it’s a good answer.",
      ],
      bullets: [
        "Technical fixes prioritized by impact",
        "Site structure mapped to real search demand",
        "Product and collection copy that helps buyers",
        "Schema for products, reviews and breadcrumbs",
      ],
      visualSide: "left",
    },
    included: {
      style: "bento",
      heading: "What’s included",
      intro: "A complete organic search program, from technical health to content that earns visibility.",
      items: [
        { icon: Wrench, title: "Technical SEO audit", text: "Crawling, indexing, Core Web Vitals, duplicate content, redirects and Shopify-specific issues, ranked by impact." },
        { icon: Search, title: "Keyword & intent research", text: "The terms, questions and comparisons your customers use at each stage of buying." },
        { icon: Network, title: "Collection architecture", text: "A collection structure and internal linking plan that matches how people search and browse." },
        { icon: FileSearch, title: "On-page optimization", text: "Titles, meta descriptions, headings and copy improved for priority collections and products." },
        { icon: Braces, title: "Structured data", text: "Product, review, breadcrumb and organization schema so search results and AI tools can read your store." },
        { icon: PenLine, title: "Content briefs", text: "Briefs for buying guides and helpful articles grounded in real customer questions." },
        { icon: Sparkles, title: "AI search readiness", text: "Clear, citable answers and consistent brand information that help AI assistants understand and recommend you." },
        { icon: TrendingUp, title: "Monthly reporting", text: "Search Console and analytics reporting focused on visibility, qualified visits and revenue, not vanity metrics." },
      ],
    },
    impact: {
      heading: "Why organic visibility matters",
      intro: "Search brings in shoppers who are already looking for what you sell. Unlike ads, that visibility keeps working after the work is done.",
      items: [
        { title: "Qualified visitors with intent", text: "People searching for a specific product or problem are often close to buying." },
        { title: "Lower cost per customer", text: "Organic visits don’t charge per click, balancing out rising paid media costs." },
        { title: "Compounding returns", text: "Strong pages and a clear structure keep earning visibility for months and years." },
        { title: "Trust and credibility", text: "Showing up in search results and AI answers signals that you’re an established, credible choice." },
      ],
    },
    process: {
      style: "steps",
      heading: "How we build search visibility",
      intro: "SEO is steady work. Each stage builds on the last, and early technical fixes create room for everything that follows.",
      steps: [
        { title: "Audit", text: "Technical crawl, Search Console review and a benchmark of current visibility against competitors.", output: "Audit & priorities" },
        { title: "Research", text: "Keyword and intent research mapped to your products, collections and content gaps.", output: "Keyword map" },
        { title: "Structure", text: "Collection, URL and internal linking plan aligned with how customers search.", output: "Site structure plan" },
        { title: "Optimize", text: "On-page improvements, structured data and technical fixes, implemented or briefed to your developers.", output: "Optimized pages" },
        { title: "Grow", text: "Content briefs, ongoing monitoring and monthly reporting on visibility and revenue.", output: "Monthly report" },
      ],
    },
    audience: {
      heading: "Who this is for",
      intro: "SEO is a long-term investment. It suits brands that want a growth channel that compounds over time.",
      fits: [
        "Stores heavily dependent on paid ads or social",
        "Brands with strong products but weak organic visibility",
        "Shops planning a migration or redesign that must protect rankings",
        "Categories where customers research before they buy",
      ],
      scenarios: [
        { title: "The ad-dependent store", text: "An outdoor brand gets most sales from paid ads and wants a channel that doesn’t charge for every visit." },
        { title: "The confusing catalog", text: "A home-goods store has hundreds of products in collections named for internal use, not customer searches." },
        { title: "The AI blind spot", text: "A skincare brand notices AI assistants recommend competitors when shoppers ask for product suggestions." },
      ],
    },
    faq: [
      { q: "How long does SEO take to work?", a: "Technical fixes can show impact within weeks, but meaningful organic growth usually builds over three to twelve months. SEO compounds: results tend to speed up once the foundations are in place." },
      { q: "Can you guarantee first-page rankings?", a: "No. Nobody controls search rankings, and guarantees are a red flag. We focus on what reliably improves visibility: technical health, relevant structure and genuinely useful pages." },
      { q: "What is AI search optimization?", a: "Tools like ChatGPT, Perplexity and Google’s AI Overviews summarize answers from across the web. We make sure your store’s information is clear, consistent and structured, so these tools understand your products and can cite you as a source." },
      { q: "Is Shopify good for SEO?", a: "Shopify is a solid foundation, but it has quirks, such as duplicate product URLs, fixed URL structures and app bloat. We know how to work within those limits." },
      { q: "Will you write the content?", a: "We provide detailed briefs and can write on request, or work with your writers. Either way, every piece starts from real customer questions, not keyword stuffing." },
    ],
    cta: {
      heading: "Let’s get your store found.",
      text: "Share your store and the products you most want people to find. We’ll take a first look at what’s holding your visibility back.",
    },
  },
  {
    slug: "localization",
    name: "International Expansion & Localization",
    theme: "global",
    seo: {
      title: "Ecommerce Localization & International Expansion | Loop & Lift",
      description:
        "Choose the right markets, then launch localized Shopify storefronts with the right currency, language, pricing, duties and checkout for each one.",
    },
    hero: {
      layout: "inverse",
      eyebrow: "Service 05 / Localization",
      headline: "Sell abroad like",
      highlight: "a local brand.",
      intro:
        "International growth is more than switching on a currency. We help you decide which markets to enter, then build storefronts that feel native, with local prices, language, delivery promises and checkout, so new customers buy with confidence.",
      points: ["Market prioritization", "Shopify Markets setup", "Local pricing, duties & content"],
    },
    problem: {
      heading: "Shipping abroad isn’t the same as selling abroad.",
      intro:
        "Many brands get international orders by accident, then try to scale them with a currency switcher. The experience feels foreign, and conversion in new markets stays low.",
      points: [
        { title: "Guesswork on where to go", text: "Markets are chosen on instinct or a single large order, not demand, competition and logistics." },
        { title: "Prices that feel wrong", text: "Automatic conversion produces odd prices like €23.47, and surprise import charges appear at delivery." },
        { title: "Copy that doesn’t travel", text: "Machine translation, the wrong sizing units and idioms that miss the mark all erode trust." },
        { title: "No way to measure progress", text: "International results are blended into the main store, so it’s impossible to tell what’s working." },
      ],
    },
    solution: {
      heading: "Choose deliberately, launch properly, learn quickly.",
      paragraphs: [
        "We start with a market assessment: where demand already exists, how competitive each market is, and what it takes to deliver there profitably. That gives you a shortlist and an order of priority, not a guess.",
        "Then we configure Shopify Markets for each region, covering domains, currencies, rounding rules, duties, payment methods and translated content, and set up measurement so you can see exactly how each market performs.",
      ],
      bullets: ["Data-led market shortlist", "Local pricing with sensible rounding", "Duties and taxes shown before checkout", "Per-market reporting from day one"],
      visualSide: "left",
    },
    included: {
      style: "list",
      heading: "What’s included",
      intro: "Everything needed to choose a market, launch there properly and know whether it’s working.",
      items: [
        { icon: Compass, title: "Market opportunity assessment", text: "Demand signals, existing orders, competition, logistics and regulation reviewed for each candidate market." },
        { icon: BarChart3, title: "Market prioritization", text: "A ranked shortlist with the reasoning behind each recommendation and a phased rollout plan." },
        { icon: Store, title: "Shopify Markets setup", text: "Domains or subfolders, currencies, pricing rules and market-specific catalogs configured correctly." },
        { icon: Coins, title: "Local pricing & duties", text: "Price lists, rounding, tax-inclusive pricing and duties collected at checkout to avoid delivery surprises." },
        { icon: Languages, title: "Translation & adaptation", text: "Professional translation workflows plus adapted sizing, units, imagery and tone." },
        { icon: CreditCard, title: "Local payments & checkout", text: "The payment methods customers expect in each market, from iDEAL to Klarna to local wallets." },
        { icon: Globe2, title: "International SEO", text: "hreflang, localized metadata and market-specific search research so each storefront can be found." },
        { icon: PieChart, title: "Per-market measurement", text: "Reporting that separates each market’s traffic, conversion and margin so you can decide what’s next." },
      ],
    },
    impact: {
      heading: "Why localization matters",
      intro: "Shoppers are far more comfortable buying when a store speaks their language, shows prices they understand and is clear about delivery.",
      items: [
        { title: "Higher conversion in new markets", text: "Local prices, language and payment options remove the hesitation that stops cross-border purchases." },
        { title: "Fewer costly surprises", text: "Clear duties and delivery information reduce refused parcels, refunds and support tickets." },
        { title: "Smarter use of budget", text: "A prioritized market plan focuses investment where demand and margin justify it." },
        { title: "Growth beyond your home market", text: "New markets open fresh customers for products that already sell well." },
      ],
    },
    process: {
      style: "steps",
      heading: "From shortlist to first sale",
      intro: "A first market typically goes live within two to three months, followed by a review before expanding further.",
      steps: [
        { title: "Assess", text: "Analyze demand, existing international orders, competition and logistics for candidate markets.", output: "Market assessment" },
        { title: "Prioritize", text: "Agree a shortlist and phased plan based on opportunity, effort and margin.", output: "Rollout plan" },
        { title: "Localize", text: "Configure Markets, pricing, duties, payments and translated, adapted content.", output: "Localized storefront" },
        { title: "Launch", text: "Test checkout and delivery end-to-end, set up hreflang and tracking, then go live.", output: "Live market" },
        { title: "Learn", text: "Review per-market performance and decide whether to expand, adjust or pause.", output: "Market review" },
      ],
    },
    audience: {
      heading: "Who this is for",
      intro: "Localization makes sense once your home market is working and international demand is starting to show.",
      fits: [
        "Brands already receiving international orders without a localized experience",
        "Stores planning their first expansion beyond one country",
        "Businesses seeing high cross-border cart abandonment",
        "Brands selling into the EU, UK, North America or Australia",
      ],
      scenarios: [
        { title: "The accidental exporter", text: "A UK stationery brand gets steady orders from Germany and the Netherlands but has never localized prices or content." },
        { title: "The duties surprise", text: "A US apparel brand selling to Europe sees refused deliveries because customers aren’t expecting import charges." },
        { title: "The next-market question", text: "A Canadian food brand wants to expand but can’t decide between the US and the UK." },
      ],
    },
    faq: [
      { q: "Do we need a separate store for each country?", a: "Usually not. Shopify Markets lets one store serve many countries with local currencies, languages and pricing. Separate stores make sense in specific cases, such as very different catalogs or legal entities, and we’ll advise on what fits." },
      { q: "Should we translate everything?", a: "Not necessarily. We prioritize the pages that drive purchases, such as product, collection, cart and policy pages, and use professional translation or review for anything customer-facing." },
      { q: "How do you handle duties and taxes?", a: "Where possible, we set duties and import taxes to be calculated and collected at checkout, so customers pay a clear, final price with no surprises at delivery." },
      { q: "Which markets should we enter first?", a: "That’s exactly what the assessment answers. We weigh your existing demand, competition, shipping costs, regulation and margins to recommend a sensible order." },
      { q: "Can you help with international SEO?", a: "Yes. We set up hreflang, localized URLs and metadata, and research how people search in each market so local storefronts can be found." },
    ],
    cta: {
      heading: "Let’s plan your next market.",
      text: "Tell us where your international orders come from today and where you’d like to grow. We’ll suggest a realistic first step.",
    },
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((p) => p.slug === slug);
}
