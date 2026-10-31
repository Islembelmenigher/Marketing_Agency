import { createFileRoute } from "@tanstack/react-router";
import { AdminContentPage } from "@/components/admin/content-page";

export const Route = createFileRoute("/_authenticated/admin/content/$type")({
  component: ContentByType,
});

function ContentByType() {
  const { type } = Route.useParams();
  return <AdminContentPage key={type} type={type} />;
}
