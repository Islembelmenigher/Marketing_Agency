import { createFileRoute, redirect } from "@tanstack/react-router";

// Standalone process page removed. How we work is now on the homepage.
export const Route = createFileRoute("/process")({
  loader: () => {
    throw redirect({ to: "/about", statusCode: 301 });
  },
  component: () => null,
});
