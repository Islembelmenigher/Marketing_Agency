import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { isAdminQuery } from "@/lib/admin-api";
import { AuthPage } from "@/components/site/layout";
import { Mark } from "@/components/site/brand";

// Private owner sign-in. Reachable by URL only; never linked from public pages.
export const Route = createFileRoute("/admin_/login")({
  head: () => ({
    meta: [
      { title: "Studio sign-in | Loop & Lift" },
      { name: "description", content: "Private sign-in for the Loop & Lift studio owner." },
      { property: "og:title", content: "Studio sign-in | Loop & Lift" },
      { property: "og:description", content: "Private sign-in for the Loop & Lift studio owner." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { session, ready } = useAuth();
  const userId = session?.user.id;
  const { data: isAdmin, isLoading, isError } = useQuery(isAdminQuery(userId));
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message);
        setBusy(false);
      }
    } catch {
      setError("Sign-in failed. Please try again.");
      setBusy(false);
    }
  };

  useEffect(() => {
    if (!userId || isLoading) return;
    if (isError) {
      setError(
        "Signed in, but admin access could not be checked. Verify the database migrations and has_role function in Supabase.",
      );
      void supabase.auth.signOut();
      return;
    }
    if (isAdmin) {
      void navigate({ to: "/admin", replace: true });
      return;
    }
    // Signed in with an account that isn't the studio owner: end that session.
    void (async () => {
      await qc.cancelQueries();
      qc.removeQueries({ queryKey: ["admin"] });
      await supabase.auth.signOut();
      setError("This account isn’t authorised for the studio dashboard.");
    })();
  }, [userId, isAdmin, isLoading, isError, navigate, qc]);

  const checking = !ready || (!!userId && (isLoading || isAdmin));

  return (
    <AuthPage>
      <div className="auth-card">
        <div className="auth-card-mark">
          <Mark />
        </div>
        <h1>Studio sign-in</h1>
        <p className="auth-sub">
          For the studio owner only. Use your authorised email and password.
        </p>
        {checking ? (
          <p className="auth-note" role="status">
            <LoaderCircle className="spin" size={15} /> Checking your session…
          </p>
        ) : (
          <form onSubmit={signIn}>
            <div className="field">
              <label htmlFor="admin-email">Email</label>
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-submit" disabled={busy}>
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>
        )}
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <p className="auth-note">There is no public registration. Other accounts are refused.</p>
      </div>
    </AuthPage>
  );
}
