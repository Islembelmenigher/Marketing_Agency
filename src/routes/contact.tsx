import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, Check, LoaderCircle, Mail, MessageSquareText } from "lucide-react";
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
      { title: "Contact | Loop & Lift Digital Growth Agency" },
      {
        name: "description",
        content:
          "Get a free website and growth audit, or tell us about your project. We'll respond with a useful next step, not a sales pitch.",
      },
      { property: "og:title", content: "Contact | Loop & Lift Digital Growth Agency" },
      {
        property: "og:description",
        content:
          "Get a free website and growth audit, or tell us about your project. We'll respond with a useful next step, not a sales pitch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const budgetOptions = [
  { value: "", label: "Select a range (optional)" },
  { value: "Under £2,000", label: "Under £2,000" },
  { value: "£2,000–£5,000", label: "£2,000–£5,000" },
  { value: "£5,000–£10,000", label: "£5,000–£10,000" },
  { value: "£10,000–£25,000", label: "£10,000–£25,000" },
  { value: "£25,000+", label: "£25,000+" },
  { value: "Not sure yet", label: "Not sure yet" },
];

const emptyForm = {
  name: "",
  email: "",
  brand: "",
  siteUrl: "",
  service: "",
  budget: "",
  message: "",
  consent: false,
  honeypot: "",
};

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
    if (values.name.trim().length < 2) return setError("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      return setError("Please enter a valid email address.");
    if (values.message.trim().length < 10)
      return setError("Please give us a little more detail — at least a sentence or two.");
    if (!values.consent)
      return setError("Please confirm you're happy for us to use your details to respond.");
    mutation.mutate(values, {
      onSuccess: (result) => {
        if (result.accepted) {
          setSuccess(
            result.message || "Thanks for reaching out. We'll be in touch within one working day.",
          );
          setValues(emptyForm);
          void qc.invalidateQueries({ queryKey: ["admin"] });
        } else if (result.reason === "rate_limited") {
          setError("Too many requests. Please try again in about 15 minutes.");
        } else if (result.reason === "invalid") {
          setError(
            "Some details look off. Please check your name, email and message and try again.",
          );
        } else {
          setError("Something went wrong. Please try again, or email us directly.");
        }
      },
      onError: (err) => {
        console.error("Contact form submission failed", err);
        setError("We couldn't reach our server. Please check your connection and try again.");
      },
    });
  };

  return (
    <PublicFrame>
      <main className="page-in">
        <PageIntro
          eyebrow="Get in touch"
          title={
            <>
              Let's talk about
              <br />
              <em>your website.</em>
            </>
          }
          text="Tell us about your business and what you need to improve. We'll review your website and come back with a clear, honest assessment — no commitment required."
          marker="HELLO / L&L"
        />
        <section className="contact-layout">
          <div className="contact-aside">
            <Eyebrow>What happens next</Eyebrow>
            <div className="contact-step">
              <span>01</span>
              <p>We read your message and review your website (if you share one).</p>
            </div>
            <div className="contact-step">
              <span>02</span>
              <p>
                We come back within one working day with a response or a few follow-up questions.
              </p>
            </div>
            <div className="contact-step">
              <span>03</span>
              <p>If it feels like a good fit, we agree on a clear first step together.</p>
            </div>
            <div className="contact-note">
              <Mail size={18} />
              <p>
                Not sure what you need? That's fine — just describe the problem you're trying to
                solve and we'll suggest where to start.
              </p>
            </div>
          </div>

          <form
            className="contact-form"
            onSubmit={onSubmit}
            noValidate
            aria-label="Contact enquiry form"
          >
            <div className="form-row">
              <Field label="Your name" required>
                <input
                  data-testid="input-contact-name"
                  value={values.name}
                  onChange={(e) => setValues({ ...values, name: e.target.value })}
                  placeholder="First and last name"
                  autoComplete="name"
                  aria-required="true"
                />
              </Field>
              <Field label="Work email" required>
                <input
                  data-testid="input-contact-email"
                  type="email"
                  value={values.email}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                  placeholder="you@yourbusiness.com"
                  autoComplete="email"
                  aria-required="true"
                />
              </Field>
            </div>

            <div className="form-row">
              <Field label="Company or business name">
                <input
                  data-testid="input-contact-brand"
                  value={values.brand}
                  onChange={(e) => setValues({ ...values, brand: e.target.value })}
                  placeholder="Your business"
                />
              </Field>
              <Field label="Website URL">
                <input
                  data-testid="input-contact-site"
                  value={values.siteUrl}
                  onChange={(e) => setValues({ ...values, siteUrl: e.target.value })}
                  placeholder="https://"
                  type="url"
                />
              </Field>
            </div>

            <div className="form-row">
              <Field label="Service of interest">
                <select
                  data-testid="select-contact-service"
                  value={values.service}
                  onChange={(e) => setValues({ ...values, service: e.target.value })}
                >
                  <option value="">Select a service (optional)</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Free website audit">Free website &amp; growth audit</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </Field>
              <Field label="Project budget">
                <select
                  value={values.budget}
                  onChange={(e) => setValues({ ...values, budget: e.target.value })}
                  aria-label="Approximate project budget"
                >
                  {budgetOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Tell us about your project" required>
              <textarea
                data-testid="input-contact-message"
                value={values.message}
                onChange={(e) => setValues({ ...values, message: e.target.value })}
                placeholder="What are you working on? What's the problem you're trying to solve? What would a good outcome look like?"
                rows={6}
                aria-required="true"
              />
            </Field>

            {/* Spam trap */}
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
              <input
                type="checkbox"
                checked={values.consent}
                onChange={(e) => setValues({ ...values, consent: e.target.checked })}
                data-testid="input-contact-consent"
                aria-required="true"
              />
              <span>
                I'm happy for Loop &amp; Lift to use these details to reply to my enquiry.
              </span>
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

            <button
              className="button-link submit-button"
              type="submit"
              disabled={mutation.isPending}
              data-testid="button-contact-submit"
            >
              {mutation.isPending ? (
                <>
                  <LoaderCircle className="spin" size={16} /> Sending…
                </>
              ) : (
                <>
                  Send your message <ArrowUpRight size={16} />
                </>
              )}
            </button>
            <span className="privacy-note">
              Your details are kept private. See our <Link to="/privacy">privacy policy</Link>.
            </span>
          </form>
        </section>
      </main>
    </PublicFrame>
  );
}
