import type { ReactNode } from "react";
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ChevronDown, CircleHelp, Sparkles } from "lucide-react";

export function Mark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`brand-mark ${inverse ? "inverse" : ""}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

export function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`wordmark ${inverse ? "inverse" : ""}`}>
      <Mark inverse={inverse} />
      <span>
        loop <b>&</b> lift
      </span>
    </span>
  );
}

type BrandLinkProps = Omit<LinkComponentProps<"a">, "children" | "className"> & {
  children: ReactNode;
  className?: string;
};

export function ButtonLink({
  children,
  className = "",
  light = false,
  ...rest
}: BrandLinkProps & { light?: boolean }) {
  return (
    <Link
      {...(rest as LinkComponentProps<"a">)}
      className={`button-link ${light ? "button-light" : ""} ${className}`}
    >
      {children}
      <ArrowUpRight size={16} />
    </Link>
  );
}

export function ArrowText({ children, ...rest }: BrandLinkProps) {
  return (
    <Link {...(rest as LinkComponentProps<"a">)} className="arrow-text">
      {children}
      <ArrowRight size={16} />
    </Link>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="eyebrow section-eyebrow">{children}</div>;
}

export function PageIntro({
  eyebrow,
  title,
  text,
  marker,
}: {
  eyebrow: string;
  title: ReactNode;
  text: string;
  marker?: string;
}) {
  return (
    <section className="page-intro">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="display">{title}</h1>
        <p>{text}</p>
      </div>
      <span className="page-intro-marker mono">{marker || "L&L / STUDIO"}</span>
    </section>
  );
}

export function StoreIllustration() {
  return (
    <div className="store-visual" aria-label="Illustrative ecommerce analytics dashboard">
      <div className="visual-top">
        <div className="visual-brand">
          <span className="visual-dot" /> L&L / SIGNAL
        </div>
        <span className="eyebrow">Illustrative dashboard</span>
        <div className="visual-period">
          LAST 30 DAYS <ChevronDown size={12} />
        </div>
      </div>
      <div className="visual-body">
        <div className="visual-rail">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="visual-main">
          <div className="visual-welcome">
            <div>
              <span className="eyebrow">STORE PULSE / 01</span>
              <h3>
                Good things
                <br />
                are moving.
              </h3>
            </div>
            <span className="visual-ring">
              <span>↗</span>
            </span>
          </div>
          <div className="visual-stats">
            <div>
              <span>VISITORS</span>
              <strong>24.8k</strong>
              <small>illustrative</small>
            </div>
            <div>
              <span>CONVERSION</span>
              <strong>2.84%</strong>
              <small>illustrative</small>
            </div>
            <div>
              <span>RETURNING</span>
              <strong>38.1%</strong>
              <small>illustrative</small>
            </div>
          </div>
          <div className="chart-area">
            <div className="chart-labels">
              <span>DEMAND OVER TIME</span>
              <span>Illustrative data</span>
            </div>
            <svg
              viewBox="0 0 480 145"
              preserveAspectRatio="none"
              role="img"
              aria-label="Illustrative rising ecommerce trend line"
            >
              <path
                className="chart-line"
                d="M0 122 C35 111 42 104 78 108 S119 85 152 97 190 80 220 84 265 62 291 76 328 39 356 54 390 23 419 39 452 13 480 20"
                fill="none"
                strokeWidth="3"
              />
              <path
                d="M0 122 C35 111 42 104 78 108 S119 85 152 97 190 80 220 84 265 62 291 76 328 39 356 54 390 23 419 39 452 13 480 20 V145 H0Z"
                fill="url(#chart-fill)"
                opacity=".22"
              />
              <defs>
                <linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop className="chart-stop" />
                  <stop className="chart-stop" offset="1" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="visual-bottom">
            <span>
              <i /> Storefront healthy
            </span>
            <span className="mono">DEMO DATA ONLY</span>
          </div>
        </div>
      </div>
      <div className="float-note">
        <span className="float-arrow">
          <ArrowUpRight size={18} />
        </span>
        <span>
          <b>Signals, not noise.</b>
          <small>Practical growth direction</small>
        </span>
      </div>
    </div>
  );
}

export function LoadingRows() {
  return (
    <div className="loading-rows" aria-label="Loading">
      <i />
      <i />
      <i />
    </div>
  );
}

export function ErrorPanel({ message, retry }: { message: string; retry: () => void }) {
  return (
    <div className="error-panel">
      <CircleHelp size={22} />
      <p>{message}</p>
      <button onClick={retry} data-testid="button-retry">
        Try again
      </button>
    </div>
  );
}

export function EmptyPanel({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty-panel">
      <span className="empty-icon">
        <Sparkles size={19} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
      {action}
    </div>
  );
}

export function Field({
  label,
  children,
  required = false,
}: {
  label: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="field">
      <span>
        {label}
        {required && <i> · required</i>}
      </span>
      {children}
    </label>
  );
}
