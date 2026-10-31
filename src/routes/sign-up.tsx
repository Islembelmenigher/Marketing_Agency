import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { AuthPage } from "@/components/site/layout";
import { Field, Mark } from "@/components/site/brand";
import { GoogleButton } from "@/components/site/google-button";

export const Route = createFileRoute("/sign-up")({
  head: () => ({
    meta: [
      { title: "Create your account | Loop & Lift Growth Studio" },
      { name: "description", content: "Create your Loop & Lift studio account." },
      { property: "og:title", content: "Create your account | Loop & Lift Growth Studio" },
      { property: "og:description", content: "Create your Loop & Lift studio account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignUpPage,
});

function SignUpPage() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (session) void navigate({ to: "/admin", replace: true });
  }, [session, navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter a valid email address.");
    if (password.length < 8) return setError("Choose a password with at least 8 characters.");
    setBusy(true);
    const { error: err } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { emailRedirectTo: `${window.location.origin}/sign-in` },
    });
    setBusy(false);
    if (err) return setError(err.message.includes("Password") ? err.message : "We couldn’t create that account. Please try again.");
    setSent(true);
  };

  return (
    <AuthPage>
      <div className="auth-card">
        <div className="auth-card-mark">
          <Mark />
        </div>
        <h1>{sent ? "Check your email" : "Create your account"}</h1>
        <p className="auth-sub">
          {sent ? `We sent a verification link to ${email}. Open it to finish setting up your account.` : "Start your Loop & Lift account"}
        </p>
        {!sent && (
          <>
            <GoogleButton onError={setError} />
            <div className="auth-divider">or</div>
            <form onSubmit={onSubmit} noValidate>
              <Field label="Email address">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@yourbrand.com" data-testid="input-email" />
              </Field>
              <Field label="Password">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" placeholder="At least 8 characters" data-testid="input-password" />
              </Field>
              {error && <p className="form-error" role="alert">{error}</p>}
              <button className="button-link auth-submit" type="submit" disabled={busy} data-testid="button-submit">
                {busy && <LoaderCircle className="spin" size={15} />}
                Continue
              </button>
            </form>
          </>
        )}
        <div className="auth-footer">
          Already have an account? <Link to="/sign-in">Sign in</Link>
        </div>
      </div>
    </AuthPage>
  );
}
