import { Activity, Globe2, Layout, type LucideIcon } from "lucide-react";

export type ServiceSummary = {
  slug: string;
  num: string;
  title: string;
  text: string;
  icon: LucideIcon;
  color: "green" | "blue" | "violet";
};

export const services: ServiceSummary[] = [
  {
    slug: "website-development",
    num: "01",
    title: "Website & Landing Page Development",
    text: "Business websites, high-converting landing pages and redesigns that communicate your value and encourage visitors to act.",
    icon: Layout,
    color: "green",
  },
  {
    slug: "conversion-optimisation",
    num: "02",
    title: "Conversion Optimisation & Copywriting",
    text: "Turn more of your existing visitors into customers through better messaging, clearer journeys and friction removal.",
    icon: Activity,
    color: "blue",
  },
  {
    slug: "seo-analytics-growth",
    num: "03",
    title: "SEO, Analytics & Growth Tracking",
    text: "Get found, understand your visitors and track what actually produces business results—not vanity metrics.",
    icon: Globe2,
    color: "violet",
  },
];

export const navItems = [
  { label: "Services", to: "/services" },
  { label: "Our Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export const DEFAULT_CONTACT_EMAIL = "hello@loopandlift.studio";
