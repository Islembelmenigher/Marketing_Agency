import { createFileRoute, redirect } from "@tanstack/react-router";

// Industries page removed. Redirect to about page which covers who we work with.
export const Route = createFileRoute("/industries")({
  loader: () => {
    throw redirect({ to: "/about", statusCode: 301 });
  },
  component: () => null,
});
