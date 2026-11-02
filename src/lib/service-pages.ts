import {
  Activity,
  BarChart3,
  Code2,
  FileSearch,
  Gauge,
  Globe2,
  Layout,
  LineChart,
  MessageSquare,
  PenLine,
  Search,
  Smartphone,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

type Item = { icon: LucideIcon; title: string; text: string };

export type ServicePage = {
  slug: string;
  name: string;
  theme: "web" | "data" | "search";
  seo: { title: string; description: string };
  hero: {
    kicker: string;
    headline: string;
    intro: string;
  };
  problems: { heading: string; items: string[] };
  included: {
    heading: string;
    items: Item[];
  };
  benefits: {
    heading: string;
    items: { title: string; text: string }[];
  };
  process: {
    heading: string;
    steps: { num: string; title: string; text: string }[];
  };
  faq: { q: string; a: string }[];
  cta: { heading: string; text: string };
};

export const servicePages: ServicePage[] = [
  {
    slug: "website-development",
    name: "Website & Landing Page Development",
    theme: "web",
    seo: {
      title: "Website & Landing Page Development | Loop & Lift",
      description:
        "Business websites, landing pages and redesigns built to communicate your value clearly and convert more visitors into customers.",
    },
    hero: {
      kicker: "Built to convert",
      headline: "A website that works as hard as you do.",
      intro:
        "Most websites look fine but fail to do their job. We design and build websites that clearly explain what you offer, build trust quickly and guide visitors toward the action you want them to take.",
    },
    problems: {
      heading: "Signs your website is holding you back",
      items: [
        "Visitors arrive but leave without getting in touch or buying anything",
        "Your website doesn't reflect the quality of what you actually offer",
        "Messaging is unclear — visitors can't tell what you do or who it's for",
        "The site looks dated or doesn't work well on mobile",
        "Pages load slowly and you're losing visitors before they've read anything",
        "You're embarrassed to send prospects to your own website",
      ],
    },
    included: {
      heading: "What we do",
      items: [
        {
          icon: Layout,
          title: "Business website development",
          text: "Complete website design and build for service businesses, agencies and consultancies.",
        },
        {
          icon: TrendingUp,
          title: "High-converting landing pages",
          text: "Pages designed around a single goal: getting the visitor to take one specific action.",
        },
        {
          icon: Sparkles,
          title: "Website redesign & modernisation",
          text: "Update an existing site's design, structure and messaging without starting from scratch.",
        },
        {
          icon: MessageSquare,
          title: "UX & messaging improvements",
          text: "Improve how your site communicates: clearer headlines, better page flow and stronger calls to action.",
        },
        {
          icon: Smartphone,
          title: "Responsive mobile-first development",
          text: "Every site we build works properly on all screen sizes, with mobile treated as the primary experience.",
        },
        {
          icon: Gauge,
          title: "Website performance optimisation",
          text: "Faster load times, better Core Web Vitals and technical improvements that keep visitors on the page.",
        },
        {
          icon: Code2,
          title: "Structure & conversion improvements",
          text: "Reorganise page layouts, navigation and information architecture to reduce friction and guide decisions.",
        },
        {
          icon: PenLine,
          title: "Conversion-focused page design",
          text: "Visual design that supports clarity and action, not decoration for its own sake.",
        },
      ],
    },
    benefits: {
      heading: "What changes when your website works",
      items: [
        {
          title: "More enquiries and leads",
          text: "A site with clear messaging and well-placed calls to action converts more of your existing visitors.",
        },
        {
          title: "A stronger first impression",
          text: "Prospects judge your credibility in seconds. A professional website builds confidence before a conversation even starts.",
        },
        {
          title: "Less time explaining yourself",
          text: "When your site communicates clearly, discovery calls and sales conversations start from a better place.",
        },
        {
          title: "A platform you're proud to share",
          text: "Stop hesitating before sending a proposal or sharing a link. A site that reflects your quality removes that friction.",
        },
      ],
    },
    process: {
      heading: "How we approach the work",
      steps: [
        {
          num: "01",
          title: "Discovery & brief",
          text: "We learn about your business, your customers and what the site needs to achieve. This informs every decision that follows.",
        },
        {
          num: "02",
          title: "Strategy & structure",
          text: "We define the page structure, messaging hierarchy and calls to action before a single pixel is designed.",
        },
        {
          num: "03",
          title: "Design & development",
          text: "We design and build your site, sharing progress early so you can give feedback before things are finalised.",
        },
        {
          num: "04",
          title: "Review & launch",
          text: "We test thoroughly across devices, fix any issues and help you launch with confidence.",
        },
      ],
    },
    faq: [
      {
        q: "Do you build on a specific platform?",
        a: "We work with a range of platforms depending on what fits your business best. We'll recommend the right approach after understanding your needs.",
      },
      {
        q: "Can you redesign my existing website without rebuilding it completely?",
        a: "Often, yes. We'll assess what's worth keeping and what needs to change. Sometimes a structural rethink and better copy makes more difference than a complete rebuild.",
      },
      {
        q: "How long does a website project take?",
        a: "A focused landing page can be completed in two to three weeks. A full website typically takes six to ten weeks depending on scope, content and how quickly feedback can be given.",
      },
      {
        q: "Do you write the copy as well?",
        a: "Yes. We can write or rewrite your website copy as part of the project. Clear messaging is as important as the visual design.",
      },
      {
        q: "What if I already have a designer?",
        a: "We can work from designs provided by your designer, or collaborate with your team. We're flexible about how the work is divided.",
      },
    ],
    cta: {
      heading: "Ready to build a website that earns its place?",
      text: "Tell us about your business and what you need the site to do. We'll come back with a clear first step.",
    },
  },
  {
    slug: "conversion-optimisation",
    name: "Conversion Optimisation & Copywriting",
    theme: "data",
    seo: {
      title: "Conversion Optimisation & Copywriting | Loop & Lift",
      description:
        "Turn more of your existing website visitors into customers through better messaging, clearer journeys and the removal of conversion blockers.",
    },
    hero: {
      kicker: "More from what you already have",
      headline: "Your website has more potential than it's using.",
      intro:
        "Most websites have a conversion problem, not a traffic problem. We identify where visitors are dropping off, what's stopping them from taking action and what to change first to get better results.",
    },
    problems: {
      heading: "Signs your site is leaking conversions",
      items: [
        "You're getting visitors but not enquiries, sign-ups or sales",
        "Visitors land on the page but leave without scrolling past the hero",
        "Your headline doesn't immediately explain what you do",
        "Your calls to action are vague, buried or easy to miss",
        "Forms have more fields than necessary and feel like hard work",
        "You're not sure which page is causing visitors to leave",
      ],
    },
    included: {
      heading: "What we do",
      items: [
        {
          icon: Activity,
          title: "Conversion rate optimisation",
          text: "Systematic analysis of where and why visitors aren't converting, followed by prioritised improvements.",
        },
        {
          icon: TrendingUp,
          title: "Landing page optimisation",
          text: "Review and improve existing landing pages to increase the percentage of visitors who take the desired action.",
        },
        {
          icon: PenLine,
          title: "Website messaging & copywriting",
          text: "Rewrite your headlines, body copy and calls to action to be clearer, more persuasive and better matched to what your customers care about.",
        },
        {
          icon: MessageSquare,
          title: "Headline & CTA improvements",
          text: "Fix the most common conversion killers: unclear value propositions, weak calls to action and confusing headlines.",
        },
        {
          icon: FileSearch,
          title: "Customer journey analysis",
          text: "Map how visitors move through your site and identify where they get lost, confused or lose confidence.",
        },
        {
          icon: Gauge,
          title: "Friction & usability identification",
          text: "Pinpoint specific friction points that are making it harder for visitors to do what you want them to do.",
        },
        {
          icon: BarChart3,
          title: "Funnel analysis",
          text: "Review the conversion funnel from first visit to completed action and identify where the biggest drop-off is happening.",
        },
        {
          icon: LineChart,
          title: "Conversion bottleneck recommendations",
          text: "A prioritised set of recommendations focused on the changes most likely to move the needle.",
        },
      ],
    },
    benefits: {
      heading: "What improves when conversion improves",
      items: [
        {
          title: "More from the traffic you already have",
          text: "Better conversion means more enquiries and sales without spending more on advertising or SEO.",
        },
        {
          title: "Clearer customer communication",
          text: "Better messaging doesn't just convert more visitors — it also attracts better-fit customers and reduces time spent on poor enquiries.",
        },
        {
          title: "A lower cost per acquisition",
          text: "When more of your visitors convert, every pound or dollar you spend on marketing goes further.",
        },
        {
          title: "Confidence in your website's direction",
          text: "Stop guessing what to change and start making decisions based on evidence of what's actually causing the problem.",
        },
      ],
    },
    process: {
      heading: "How we approach conversion work",
      steps: [
        {
          num: "01",
          title: "Audit & analysis",
          text: "We review your analytics, heatmaps, user recordings and copy to understand where visitors are dropping off and why.",
        },
        {
          num: "02",
          title: "Diagnosis & priorities",
          text: "We identify the most significant conversion blockers and present a prioritised list of changes to make first.",
        },
        {
          num: "03",
          title: "Implement & improve",
          text: "We make the recommended changes — to copy, design, layout or page structure — and ensure they're properly implemented.",
        },
        {
          num: "04",
          title: "Review results",
          text: "We review what changed after the improvements and establish whether further work is warranted.",
        },
      ],
    },
    faq: [
      {
        q: "How much traffic do I need before conversion optimisation makes sense?",
        a: "There's no hard minimum. Even with modest traffic, improving your messaging, layout and calls to action can produce meaningful results. With very low traffic, qualitative approaches like user session review and messaging analysis are particularly valuable.",
      },
      {
        q: "Will you run A/B tests?",
        a: "Sometimes, but not always. A/B testing requires significant traffic to produce reliable results. For many businesses, the bigger gains come from fixing clear problems rather than testing marginal differences.",
      },
      {
        q: "Do you only work on conversion, or do you also improve the copy?",
        a: "Both. Copywriting and conversion are closely connected. We routinely rewrite page copy as part of conversion work because weak messaging is often the primary cause of poor conversion.",
      },
      {
        q: "How do you measure the impact of your work?",
        a: "We establish what we're measuring before starting and review the relevant metrics after changes have been live long enough to produce reliable data.",
      },
    ],
    cta: {
      heading: "Getting more from your existing traffic starts here.",
      text: "Tell us where visitors are arriving and where they're dropping off. We'll suggest a useful first step.",
    },
  },
  {
    slug: "seo-analytics-growth",
    name: "SEO, Analytics & Growth Tracking",
    theme: "search",
    seo: {
      title: "SEO, Analytics & Growth Tracking | Loop & Lift",
      description:
        "Get found in search, understand your visitors and track the things that produce real business results. Technical SEO, GA4, GTM and performance reporting.",
    },
    hero: {
      kicker: "Visibility and clarity",
      headline: "Know where your visitors come from. Know what to do next.",
      intro:
        "If you don't know where your customers are coming from or what they do on your website, you're making growth decisions in the dark. We set up the measurement you need and help you get found by the right people.",
    },
    problems: {
      heading: "Signs your visibility and tracking need work",
      items: [
        "You don't know which marketing activities are actually producing results",
        "Your website isn't appearing for searches your customers are making",
        "You have Google Analytics but you're not sure what to look at",
        "Tracking is set up but key conversion events aren't being recorded",
        "Your website structure makes it hard for search engines to understand your content",
        "You're spending on advertising without reliable data on what's working",
      ],
    },
    included: {
      heading: "What we do",
      items: [
        {
          icon: Code2,
          title: "Technical SEO",
          text: "Fix the crawlability, indexing, speed and structure issues that prevent search engines from properly reading your site.",
        },
        {
          icon: PenLine,
          title: "On-page SEO",
          text: "Optimise page titles, headings, meta descriptions, internal linking and content to improve search relevance.",
        },
        {
          icon: Search,
          title: "Keyword & search intent research",
          text: "Identify the searches your target customers are making and map your content to match their intent.",
        },
        {
          icon: Globe2,
          title: "Website structure & internal linking",
          text: "Organise your site architecture so search engines and visitors can find what matters most.",
        },
        {
          icon: Sparkles,
          title: "AI search readiness",
          text: "Structure your content and technical setup so your business can appear in AI-powered search summaries and answer engines.",
        },
        {
          icon: BarChart3,
          title: "Google Analytics 4 configuration",
          text: "Set up GA4 properly so you're tracking meaningful events — not just page views.",
        },
        {
          icon: Activity,
          title: "Google Tag Manager",
          text: "Implement GTM to manage your tracking tags cleanly without needing developer involvement for every change.",
        },
        {
          icon: LineChart,
          title: "Performance dashboards & reporting",
          text: "Clear reports that show what's working, what's not and what to focus on next — without wading through raw data.",
        },
      ],
    },
    benefits: {
      heading: "What changes when you can see clearly",
      items: [
        {
          title: "Better qualified visitors from search",
          text: "Appearing for the right search terms brings visitors who are already looking for what you offer.",
        },
        {
          title: "Smarter decisions, faster",
          text: "Reliable tracking means you spend less time guessing and more time acting on evidence.",
        },
        {
          title: "Marketing spend that goes further",
          text: "When you know what's producing results, you can invest more confidently and cut what isn't working.",
        },
        {
          title: "A foundation for long-term growth",
          text: "SEO and good measurement are compounding — the work you do now keeps producing results over time.",
        },
      ],
    },
    process: {
      heading: "How we approach SEO and analytics work",
      steps: [
        {
          num: "01",
          title: "Audit & baseline",
          text: "We review your current technical setup, tracking implementation and search visibility to understand where things stand.",
        },
        {
          num: "02",
          title: "Strategy & priorities",
          text: "We identify the highest-impact opportunities and agree on what to tackle first based on your goals.",
        },
        {
          num: "03",
          title: "Implementation",
          text: "We implement the technical, content and tracking changes, working directly in your tools or alongside your team.",
        },
        {
          num: "04",
          title: "Monitoring & reporting",
          text: "We set up reporting that makes it easy to see what's improving and what needs further attention.",
        },
      ],
    },
    faq: [
      {
        q: "How long does SEO take to produce results?",
        a: "Technical improvements and tracking fixes can show results within weeks. Organic search visibility typically improves over three to six months as search engines reindex your site and new content gains authority. We'll be honest about realistic timescales.",
      },
      {
        q: "Can you guarantee search rankings?",
        a: "No. Anyone who guarantees specific rankings is making a promise they cannot keep. We focus on doing the right things — improving technical quality, content relevance and site authority — which increases the probability of better rankings over time.",
      },
      {
        q: "Do I need to already have Google Analytics?",
        a: "Not necessarily. If you don't have it, we'll set it up as part of the engagement. If you do, we'll review whether it's configured correctly and fix any gaps in your tracking.",
      },
      {
        q: "What's the difference between SEO and paid advertising?",
        a: "Paid advertising produces traffic while you're paying for it. SEO builds organic visibility that compounds over time. Both have their place. We focus on organic search, but we can help you ensure your tracking is set up to measure paid campaigns accurately.",
      },
      {
        q: "What is AI search readiness?",
        a: "AI-powered search tools like ChatGPT, Google's AI Overviews and Perplexity draw on structured, well-organised web content. We help you structure your content and technical setup so your business has a better chance of appearing in those results.",
      },
    ],
    cta: {
      heading: "Start getting found — and start understanding your results.",
      text: "Tell us about your current setup and what you're trying to achieve. We'll identify the most useful first step.",
    },
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((p) => p.slug === slug);
}
