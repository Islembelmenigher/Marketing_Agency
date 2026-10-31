import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { AuthPage } from "@/components/site/layout";
import { Field, Mark } from "@/components/site/brand";
import { GoogleButton } from "@/components/site/google-button";

export const Route = createFileRoute("/sign-in")({
  head: () => ({
    meta: [
      { title: "Sign in | Loop & Lift Growth Studio" },
      { name: "description", content: "Sign in to your Loop & Lift studio account." },
      { property: "og:title", content: "Sign in | Loop & Lift Growth Studio" },
      { property: "og:description", content: "Sign in to your Loop & Lift studio account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [mode, setMode] = useState<"sign-in" | "forgot">("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (session) void navigate({ to: "/admin", replace: true });
  }, [session, navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter a valid email address.");
    setBusy(true);
    if (mode === "forgot") {
      const { error: err } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/reset-password` });
      setBusy(false);
      if (err) return setError("We couldn’t send that email. Please try again in a moment.");
      return setNotice("If an account exists for that email, a link to set a new password is on its way.");
    }
    const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (err) {
      if (/confirm/i.test(err.message)) return setError("Please confirm your email first—check your inbox for the verification link.");
      return setError("That email and password don’t match. If you had an account on our previous site, create a new password below.");
    }
  };

  return (
    <AuthPage>
      <div className="auth-card">
        <div className="auth-card-mark">
          <Mark />
        </div>
        <h1>{mode === "forgot" ? "Reset your password" : "Welcome back"}</h1>
        <p className="auth-sub">{mode === "forgot" ? "We’ll email you a link to choose a new password." : "Sign in to your studio account"}</p>
        {mode === "sign-in" && (
          <>
            <GoogleButton onError={setError} />
            <div className="auth-divider">or</div>
          </>
        )}
        <form onSubmit={onSubmit} noValidate>
          <Field label="Email address">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@yourbrand.com" data-testid="input-email" />
          </Field>
          {mode === "sign-in" && (
            <>
              <Field label="Password">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" placeholder="Your password" data-testid="input-password" />
              </Field>
              <div className="auth-row">
                <button type="button" onClick={() => { setMode("forgot"); setError(""); setNotice(""); }}>
                  Forgot password?
                </button>
              </div>
            </>
          )}
          {error && <p className="form-error" role="alert">{error}</p>}
          {notice && <p className="form-success" role="status">{notice}</p>}
          <button className="button-link auth-submit" type="submit" disabled={busy} data-testid="button-submit">
            {busy && <LoaderCircle className="spin" size={15} />}
            {mode === "forgot" ? "Send reset link" : "Continue"}
          </button>
        </form>
        <div className="auth-footer">
          {mode === "forgot" ? (
            <button type="button" className="auth-row-link" onClick={() => { setMode("sign-in"); setError(""); setNotice(""); }} style={{ background: "none", border: 0, cursor: "pointer" }}>
              <span className="auth-footer-link">Back to sign in</span>
            </button>
          ) : (
            <>
              Don’t have an account? <Link to="/sign-up">Sign up</Link>
            </>
          )}
        </div>
        {mode === "sign-in" && (
          <p className="auth-note">Had an account on our previous site? Sign up again with the same email, verify it, and choose a new password.</p>
        )}
      </div>
    </AuthPage>
  );
}
