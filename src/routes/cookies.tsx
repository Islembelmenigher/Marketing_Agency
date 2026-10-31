import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/legal-page";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookies | Loop & Lift Growth Studio" },
      { name: "description", content: "A short note on the essential technologies this website uses and how to manage cookies." },
      { property: "og:title", content: "Cookies | Loop & Lift Growth Studio" },
      { property: "og:description", content: "A short note on the essential technologies this website uses and how to manage cookies." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <LegalPage kind="cookies" />,
});
