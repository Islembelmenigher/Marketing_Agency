import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { supabase } from "@/integrations/supabase/client";
import { AuthProvider } from "@/hooks/use-auth";
import { PublicFrame } from "@/components/site/layout";
import { ButtonLink, Eyebrow } from "@/components/site/brand";

function NotFoundComponent() {
  return (
    <PublicFrame>
      <main className="not-found-page page-in">
        <Eyebrow>404 / Page not found</Eyebrow>
        <h1 className="display">
          This page took <em>another route.</em>
        </h1>
        <p>The page you’re looking for doesn’t exist or has moved. Let’s get you back on track.</p>
        <ButtonLink to="/">Back to the studio</ButtonLink>
      </main>
    </PublicFrame>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="auth-required">
      <h1>This page didn’t load</h1>
      <p>Something went wrong on our end. You can try again or head back home.</p>
      <div className="hero-actions">
        <button
          className="button-link"
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          Try again
        </button>
        <a href="/" className="arrow-text">
          Go home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Loop & Lift Growth Studio" },
      { name: "description", content: "A founder-led ecommerce growth studio for conversion, analytics, retention and search." },
      { property: "og:site_name", content: "Loop & Lift Growth Studio" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const { queryClient } = Route.useRouteContext();
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const router = useRouter();
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      void router.invalidate();
      if (event === "SIGNED_OUT") queryClient.removeQueries({ queryKey: ["admin"] });
      else void queryClient.invalidateQueries({ queryKey: ["admin"] });
    });
    return () => data.subscription.unsubscribe();
  }, [router, queryClient]);

  return <Outlet />;
}
