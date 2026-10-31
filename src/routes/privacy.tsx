import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/legal-page";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy | Loop & Lift Growth Studio" },
      { name: "description", content: "How Loop & Lift collects and uses the details you share through the contact form." },
      { property: "og:title", content: "Privacy | Loop & Lift Growth Studio" },
      { property: "og:description", content: "How Loop & Lift collects and uses the details you share through the contact form." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <LegalPage kind="privacy" />,
});
