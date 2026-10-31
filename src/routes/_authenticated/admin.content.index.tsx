import { createFileRoute } from "@tanstack/react-router";
import { AdminContentPage } from "@/components/admin/content-page";

export const Route = createFileRoute("/_authenticated/admin/content/")({
  component: () => <AdminContentPage />,
});
