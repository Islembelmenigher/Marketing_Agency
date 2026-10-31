import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { publicSettingsQuery } from "@/lib/site-queries";
import { DEFAULT_CONTACT_EMAIL, navItems } from "@/lib/site-content";
import { ButtonLink, Wordmark } from "./brand";

function PublicHeader() {
  const [open, setOpen] = useState(false);
  const { session } = useAuth();
  return (
    <header className="public-header">
      <div className="header-inner">
        <Link to="/" className="brand" data-testid="link-home">
          <Wordmark />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          {session ? (
            <Link to="/admin" className="signin-link" data-testid="link-dashboard">
              Dashboard
            </Link>
          ) : (
            <Link to="/sign-in" className="signin-link" data-testid="link-sign-in">
              Sign in
            </Link>
          )}
          <ButtonLink to="/contact" className="header-cta">
            Let’s talk
          </ButtonLink>
        </div>
        <button className="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)} data-testid="button-mobile-menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link key={item.to} onClick={() => setOpen(false)} to={item.to}>
              {item.label}
              <ArrowRight size={16} />
            </Link>
          ))}
          <Link onClick={() => setOpen(false)} to="/contact">
            Let’s talk
            <ArrowRight size={16} />
          </Link>
        </nav>
      )}
    </header>
  );
}

const footerLinks = [
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/industries" },
  { label: "Our approach", to: "/process" },
  { label: "Selected work", to: "/work" },
  { label: "Insights", to: "/insights" },
] as const;

function Footer() {
  const { data: settings } = useQuery(publicSettingsQuery());
  const email = settings?.contactEmail || DEFAULT_CONTACT_EMAIL;
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <Link to="/" className="brand">
            <Wordmark inverse />
          </Link>
          <p className="footer-note">
            Good growth should feel
            <br />
            good to build.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <span className="eyebrow">Explore</span>
            {footerLinks.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </div>
          <div>
            <span className="eyebrow">Say hello</span>
            <a href={`mailto:${email}`}>{email}</a>
            {settings?.phone && <a href={`tel:${settings.phone}`}>{settings.phone}</a>}
            {settings?.location && <span>{settings.location}</span>}
            {settings?.instagramUrl && (
              <a href={settings.instagramUrl} target="_blank" rel="noreferrer">
                Instagram ↗
              </a>
            )}
            {settings?.linkedinUrl && (
              <a href={settings.linkedinUrl} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
            )}
          </div>
        </div>
        <div className="footer-cta">
          <span className="eyebrow">A good place to start</span>
          <ButtonLink to="/contact" light>
            Talk through your next move
          </ButtonLink>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Loop & Lift Growth Studio</span>
        <div>
          <Link to="/privacy">Privacy</Link>
          <Link to="/cookies">Cookies</Link>
          <Link to="/terms">Terms</Link>
        </div>
        <span className="mono">Built for the long game.</span>
      </div>
    </footer>
  );
}

export function PublicFrame({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <PublicHeader />
      {children}
      <Footer />
    </div>
  );
}

export function AuthPage({ children }: { children: ReactNode }) {
  return (
    <div className="auth-page">
      <div className="auth-backdrop">
        <div className="auth-brand">
          <Link to="/">
            <Wordmark />
          </Link>
          <span>Good growth, built together.</span>
        </div>
        <div className="auth-shape">
          <span>loop</span>
          <span>lift</span>
          <i />
        </div>
        <span className="auth-foot mono">LOOP & LIFT / GROWTH STUDIO</span>
      </div>
      <div className="auth-content">
        <Link to="/" className="auth-mobile-brand">
          <Wordmark />
        </Link>
        {children}
        <Link to="/" className="auth-home">
          Back to the studio <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
