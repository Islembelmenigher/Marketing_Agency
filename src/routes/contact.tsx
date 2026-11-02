import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, Check, LoaderCircle, MessageSquareText } from "lucide-react";
import { PublicFrame } from "@/components/site/layout";
import { Eyebrow, Field, PageIntro } from "@/components/site/brand";
import { services } from "@/lib/site-content";
import { submitContactRequest } from "@/lib/site.functions";

export const Route = createFileRoute("/contact")({
  // ?service=<slug> pre-selects the service when arriving from a service page.
  validateSearch: (search: Record<string, unknown>): { service?: string } => {
    const service = search["service"];
    return typeof service === "string" && service.length <= 80 ? { service } : {};
  },
  head: () => ({
    meta: [
      { title: "Contact | Loop & Lift Growth Studio" },
      { name: "description", content: "Tell us what you’re figuring out. A short note is plenty—we’ll come back with a useful next step." },
      { property: "og:title", content: "Contact | Loop & Lift Growth Studio" },
      { property: "og:description", content: "Tell us what you’re figuring out. A short note is plenty—we’ll come back with a useful next step." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const emptyForm = { name: "", email: "", brand: "", siteUrl: "", service: "", message: "", consent: false, honeypot: "" };

function ContactPage() {
  const submit = useServerFn(submitContactRequest);
  const qc = useQueryClient();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { service: serviceSlug } = Route.useSearch();
  const [values, setValues] = useState(() => ({
    ...emptyForm,
    service: services.find((s) => s.slug === serviceSlug)?.title ?? "",
  }));
  const mutation = useMutation({ mutationFn: (data: typeof emptyForm) => submit({ data }) });

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (values.name.trim().length < 2) return setError("Add your name so we know who to reply to.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return setError("Enter a valid email address.");
    if (values.message.trim().length < 10) return setError("Give us a little more context (at least 10 characters).");
    if (!values.consent) return setError("Please confirm we can use your details to respond.");
    mutation.mutate(values, {
      onSuccess: (result) => {
        if (result.accepted) {
          setSuccess(result.message || "Thanks for reaching out. We’ll be in touch soon.");
          setValues(emptyForm);
          void qc.invalidateQueries({ queryKey: ["admin"] });
        } else if (result.reason === "rate_limited") {
          setError("Too many requests. Please try again in about 15 minutes.");
        } else if (result.reason === "invalid") {
          setError("Some details look off. Check your name, email and message, then try again.");
        } else {
          setError("Something got in the way. Please try again, or email us directly.");
        }
      },
      onError: (err) => {
        console.error("Contact form submission failed", err);
        setError("We couldn’t reach our server. Check your connection and try again.");
      },
    });
  };

  return (
    <PublicFrame>
      <main className="page-in">
        <PageIntro
          eyebrow="Start a conversation"
          title={
            <>
              Tell us what
              <br />
              <em>you’re figuring out.</em>
            </>
          }
          text="A short note is plenty. We’ll come back with a useful next step, not a pitch deck."
          marker="HELLO / L&L"
        />
        <section className="contact-layout">
          <div className="contact-aside">
            <Eyebrow>What happens next</Eyebrow>
            <div className="contact-step">
              <span>01</span>
              <p>We read your note and learn a little about the context.</p>
            </div>
            <div className="contact-step">
              <span>02</span>
              <p>We reply with a few questions or a time to talk.</p>
            </div>
            <div className="contact-step">
              <span>03</span>
              <p>If it feels right, we shape a clear first step together.</p>
            </div>
            <div className="contact-note">
              <MessageSquareText size={18} />
              <p>Not sure what you need yet? That’s a perfectly good place to start.</p>
            </div>
          </div>
          <form className="contact-form" onSubmit={onSubmit} noValidate>
            <div className="form-row">
              <Field label="Your name" required>
                <input data-testid="input-contact-name" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} placeholder="Name" autoComplete="name" />
              </Field>
              <Field label="Work email" required>
                <input data-testid="input-contact-email" type="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} placeholder="you@yourbrand.com" autoComplete="email" />
              </Field>
            </div>
            <div className="form-row">
              <Field label="Brand">
                <input data-testid="input-contact-brand" value={values.brand} onChange={(e) => setValues({ ...values, brand: e.target.value })} placeholder="Your company" />
              </Field>
              <Field label="Website">
                <input data-testid="input-contact-site" value={values.siteUrl} onChange={(e) => setValues({ ...values, siteUrl: e.target.value })} placeholder="https://" />
              </Field>
            </div>
            <Field label="What are you thinking about?">
              <select data-testid="select-contact-service" value={values.service} onChange={(e) => setValues({ ...values, service: e.target.value })}>
                <option value="">Choose a starting point</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="Something else">Something else</option>
              </select>
            </Field>
            <Field label="A little context" required>
              <textarea data-testid="input-contact-message" value={values.message} onChange={(e) => setValues({ ...values, message: e.target.value })} placeholder="What’s working, what feels stuck, or what are you curious about?" rows={5} />
            </Field>
            {/* Spam trap: hidden from people, and named so browser autofill and password managers leave it empty. */}
            <div className="sr-only" aria-hidden="true">
              <label>
                Leave this empty
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="one-time-code"
                  name="ll_hp_field"
                  data-1p-ignore
                  data-lpignore="true"
                  value={values.honeypot}
                  onChange={(e) => setValues({ ...values, honeypot: e.target.value })}
                />
              </label>
            </div>
            <label className="consent">
              <input type="checkbox" checked={values.consent} onChange={(e) => setValues({ ...values, consent: e.target.checked })} data-testid="input-contact-consent" />
              <span>I’m happy for Loop & Lift to use these details to reply to my enquiry.</span>
            </label>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            {success && (
              <p className="form-success" role="status">
                <Check size={17} />
                {success}
              </p>
            )}
            <button className="button-link submit-button" type="submit" disabled={mutation.isPending} data-testid="button-contact-submit">
              {mutation.isPending ? (
                <>
                  <LoaderCircle className="spin" size={16} /> Sending…
                </>
              ) : (
                <>
                  Send your note <ArrowUpRight size={16} />
                </>
              )}
            </button>
            <span className="privacy-note">
              Your details stay private. See our <Link to="/privacy">privacy policy</Link>.
            </span>
          </form>
        </section>
      </main>
    </PublicFrame>
  );
}
