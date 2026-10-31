import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { AuthPage } from "@/components/site/layout";
import { Field, Mark } from "@/components/site/brand";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Choose a new password | Loop & Lift Growth Studio" },
      { name: "description", content: "Set a new password for your Loop & Lift studio account." },
      { property: "og:title", content: "Choose a new password | Loop & Lift Growth Studio" },
      { property: "og:description", content: "Set a new password for your Loop & Lift studio account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { session, ready } = useAuth();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [linkSeen, setLinkSeen] = useState(false);

  useEffect(() => {
    if (window.location.hash.includes("type=recovery") || window.location.search.includes("code=")) setLinkSeen(true);
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) return setError("Choose a password with at least 8 characters.");
    setBusy(true);
    const { error: err } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (err) return setError(err.message.includes("assword") ? err.message : "We couldn’t update your password. Request a new link and try again.");
    void navigate({ to: "/admin", replace: true });
  };

  const waiting = !session && (!ready || linkSeen);

  return (
    <AuthPage>
      <div className="auth-card">
        <div className="auth-card-mark">
          <Mark />
        </div>
        <h1>Choose a new password</h1>
        {session ? (
          <>
            <p className="auth-sub">Pick something memorable that you don’t use elsewhere.</p>
            <form onSubmit={onSubmit} noValidate>
              <Field label="New password">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" placeholder="At least 8 characters" data-testid="input-new-password" />
              </Field>
              {error && <p className="form-error" role="alert">{error}</p>}
              <button className="button-link auth-submit" type="submit" disabled={busy}>
                {busy && <LoaderCircle className="spin" size={15} />}
                Save password
              </button>
            </form>
          </>
        ) : waiting ? (
          <p className="auth-sub">Checking your link…</p>
        ) : (
          <p className="auth-sub">This link is invalid or has expired. Request a new one from the sign-in page.</p>
        )}
        <div className="auth-footer">
          <Link to="/sign-in">Back to sign in</Link>
        </div>
      </div>
    </AuthPage>
  );
}
