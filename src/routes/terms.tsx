import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/legal-page";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms | Loop & Lift Growth Studio" },
      { name: "description", content: "The general terms for using the Loop & Lift Growth Studio website." },
      { property: "og:title", content: "Terms | Loop & Lift Growth Studio" },
      { property: "og:description", content: "The general terms for using the Loop & Lift Growth Studio website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <LegalPage kind="terms" />,
});
