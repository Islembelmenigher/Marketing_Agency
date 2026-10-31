import { Activity, Globe2, Mail, Search, ShoppingBag, type LucideIcon } from "lucide-react";

export type ServiceSummary = {
  slug: string;
  num: string;
  title: string;
  text: string;
  icon: LucideIcon;
  color: "green" | "blue" | "violet";
};

export const services: ServiceSummary[] = [
  { slug: "website-development", num: "01", title: "Websites that earn the next click", text: "Shopify builds and thoughtful redesigns that make the best parts of your brand easier to buy.", icon: ShoppingBag, color: "green" },
  { slug: "analytics-conversion", num: "02", title: "Know what is actually working", text: "Measurement and conversion work that replaces guesswork with a clearer next move.", icon: Activity, color: "blue" },
  { slug: "email-retention", num: "03", title: "Make the second order feel natural", text: "Lifecycle email and retention systems built around useful timing, not inbox noise.", icon: Mail, color: "violet" },
  { slug: "seo-ai-search", num: "04", title: "Get found where buying starts", text: "Technical SEO and answer-ready content for the search habits customers have now.", icon: Search, color: "green" },
  { slug: "localization", num: "05", title: "Grow beyond your first market", text: "A practical plan for local experiences, currencies and content that travel well.", icon: Globe2, color: "blue" },
];

export const serviceCopy: Record<string, { kicker: string; headline: string; intro: string; bullets: string[] }> = {
  "website-development": { kicker: "Commerce, made clearer", headline: "A better store is a growth channel.", intro: "We bring brand, buying experience and store operations into one considered Shopify experience. No shiny rebuild for its own sake—just a site that makes the right decision easier.", bullets: ["Shopify strategy, theme design and development", "Product detail and collection-page systems", "Accessibility, performance and QA", "Migration planning with a calm launch"] },
  "analytics-conversion": { kicker: "Evidence before instinct", headline: "Make every growth decision count.", intro: "The best next move is usually hidden in the customer journey. We make that journey visible, then test the friction that matters most.", bullets: ["GA4 and ecommerce event plans", "Consent-aware measurement implementation", "Conversion research and journey reviews", "Prioritized experiments with clear readouts"] },
  "email-retention": { kicker: "More value after checkout", headline: "Retention should feel like good service.", intro: "Thoughtful lifecycle marketing turns a one-time transaction into a lasting relationship. We build the flows, segments and editorial rhythm that make each message earn its place.", bullets: ["Lifecycle and welcome-series strategy", "Klaviyo flows and campaign architecture", "Segmentation and deliverability foundations", "Retention measurement and iteration"] },
  "seo-ai-search": { kicker: "Useful visibility", headline: "Be the answer customers remember.", intro: "Search is changing, but the fundamentals remain human: a useful answer, a credible source and a fast, well-structured store. We connect the technical details to the buying questions.", bullets: ["Technical SEO and crawl diagnostics", "Search intent and collection architecture", "AI search readiness and structured data", "Editorial briefs grounded in customer questions"] },
  localization: { kicker: "Expansion, without the guesswork", headline: "Make new markets feel like home.", intro: "International growth is not a currency switch. We help you choose where to go next and build the operational and on-site details that make the experience feel considered.", bullets: ["Market readiness and prioritization", "Localized storefront and content strategy", "Currency, duties and checkout experience", "Measurement plan for new-market learning"] },
};

export const industries = ["Food & beverage", "Home & living", "Beauty & personal care", "Fashion & accessories", "Outdoor & active", "Thoughtful everyday goods"];

export const navItems = [
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/industries" },
  { label: "How we work", to: "/process" },
  { label: "Work", to: "/work" },
  { label: "Insights", to: "/insights" },
  { label: "About", to: "/about" },
] as const;

export const DEFAULT_CONTACT_EMAIL = "hello@loopandlift.studio";
