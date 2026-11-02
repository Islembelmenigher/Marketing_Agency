import { useState } from "react";
import { createFileRoute, Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  Inbox,
  LayoutDashboard,
  Menu,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Wordmark } from "@/components/site/brand";
import { isAdminQuery } from "@/lib/admin-api";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Studio admin | Loop & Lift" },
      { name: "description", content: "The private Loop & Lift studio dashboard." },
      { property: "og:title", content: "Studio admin | Loop & Lift" },
      { property: "og:description", content: "The private Loop & Lift studio dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminGate,
});

const adminNavigation = [
  { label: "Overview", to: "/admin", icon: LayoutDashboard },
  { label: "Content", to: "/admin/content", icon: FileText },
  { label: "Leads", to: "/admin/leads", icon: Inbox },
  { label: "Settings", to: "/admin/settings", icon: Settings2 },
] as const;

function AdminGate() {
  const { user } = Route.useRouteContext();
  const { data: isAdmin, isLoading } = useQuery(isAdminQuery(user.id));
  if (isLoading)
    return (
      <div className="admin-loading">
        <div className="skeleton-card" />
        <div className="skeleton-card" />
      </div>
    );
  if (!isAdmin)
    return (
      <div className="auth-required">
        <ShieldCheck size={26} />
        <h1>Admin access only</h1>
        <p>Your account is signed in, but it isn’t assigned studio administrator access.</p>
        <Link to="/" className="arrow-text">
          Return to the public site <ArrowRight size={16} />
        </Link>
      </div>
    );
  return <AdminLayout />;
}

function crumb(pathname: string) {
  if (pathname.startsWith("/admin/content")) {
    const type = pathname.split("/")[3] ?? "";
    return type ? type.charAt(0).toUpperCase() + type.slice(1) : "Content";
  }
  if (pathname.startsWith("/admin/leads")) return "Leads";
  if (pathname.startsWith("/admin/settings")) return "Settings";
  return "Overview";
}

function AdminLayout() {
  const { user } = Route.useRouteContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [mobile, setMobile] = useState(false);
  const name =
    (user.user_metadata?.["full_name"] as string | undefined) || user.email || "Studio admin";

  const signOut = async () => {
    await qc.cancelQueries();
    qc.removeQueries({ queryKey: ["admin"] });
    await supabase.auth.signOut();
    void navigate({ to: "/", replace: true });
  };

  return (
    <div className="admin-frame">
      <aside className={`admin-sidebar ${mobile ? "shown" : ""}`}>
        <Link to="/" className="admin-brand">
          <Wordmark />
          <span className="eyebrow">STUDIO ADMIN</span>
        </Link>
        <div className="admin-nav-label eyebrow">WORKSPACE</div>
        <nav>
          {adminNavigation.map((item) => {
            const active =
              item.to === "/admin"
                ? pathname === "/admin" || pathname === "/admin/"
                : pathname.startsWith(item.to);
            return (
              <Link
                to={item.to}
                onClick={() => setMobile(false)}
                key={item.to}
                className={`admin-nav-item ${active ? "active" : ""}`}
              >
                <item.icon size={18} />
                {item.label}
                {item.label === "Leads" && <span className="nav-notice" />}
              </Link>
            );
          })}
        </nav>
        <div className="admin-sidebar-bottom">
          <span className="admin-avatar">{name.slice(0, 1).toUpperCase()}</span>
          <div>
            <b>{name}</b>
            <small>Administrator</small>
          </div>
          <button
            onClick={signOut}
            aria-label="Sign out"
            title="Sign out"
            data-testid="button-sign-out"
          >
            <ArrowUpRight size={16} />
          </button>
        </div>
      </aside>
      <div className="admin-content">
        <header className="admin-topbar">
          <button
            className="mobile-menu admin-mobile-menu"
            onClick={() => setMobile(!mobile)}
            aria-label="Toggle dashboard navigation"
          >
            <Menu />
          </button>
          <div className="admin-breadcrumb">
            <span>Loop & Lift</span>
            <span>/</span>
            <b>{crumb(pathname)}</b>
          </div>
          <Link to="/" className="view-site" target="_blank">
            View public site <ArrowUpRight size={14} />
          </Link>
        </header>
        <Outlet />
      </div>
    </div>
  );
}
