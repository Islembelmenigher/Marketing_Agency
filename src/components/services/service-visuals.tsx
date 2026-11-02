import type { ReactNode } from "react";
import { Check, Lock, Search, ShoppingBag, Sparkles, Star } from "lucide-react";

/*
 * Hand-built product mockups, one hero visual and one detail visual per service.
 * All figures shown are illustrative and labelled as such.
 */

function Frame({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`sv ${className}`} role="img" aria-label={label}>
      <div aria-hidden="true" className="sv-inner">
        {children}
      </div>
    </div>
  );
}

function Browser({
  url,
  children,
  className = "",
}: {
  url: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`sv-browser ${className}`}>
      <div className="sv-browser-bar">
        <span className="sv-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="sv-url">
          <Lock size={10} /> {url}
        </span>
      </div>
      <div className="sv-browser-body">{children}</div>
    </div>
  );
}

const Tag = ({ children }: { children: ReactNode }) => <span className="sv-tag">{children}</span>;

/* ---------- Website development ---------- */

function WebHero() {
  return (
    <Frame
      label="Illustrative mockup of a responsive Shopify product page on desktop and mobile"
      className="sv-web"
    >
      <Browser url="northfield-home.com/products/linen-throw" className="sv-web-desktop">
        <div className="sv-store-nav">
          <b>NORTHFIELD</b>
          <span>Shop</span>
          <span>Bedroom</span>
          <span>Living</span>
          <span>Journal</span>
          <ShoppingBag size={13} />
        </div>
        <div className="sv-pdp">
          <div className="sv-pdp-gallery">
            <div className="sv-pdp-main">
              <span className="sv-throw" />
            </div>
            <div className="sv-pdp-thumbs">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="sv-pdp-info">
            <small>BEDROOM / THROWS</small>
            <h4>Washed linen throw</h4>
            <div className="sv-stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={10} />
              ))}
              <span>Reviews</span>
            </div>
            <strong>$129</strong>
            <div className="sv-swatches">
              <i />
              <i />
              <i />
              <i />
            </div>
            <span className="sv-atc">Add to cart</span>
            <ul>
              <li>
                <Check size={10} /> Free delivery over $100
              </li>
              <li>
                <Check size={10} /> 60-day returns
              </li>
            </ul>
          </div>
        </div>
      </Browser>
      <div className="sv-phone">
        <span className="sv-notch" />
        <div className="sv-phone-img">
          <span className="sv-throw" />
        </div>
        <div className="sv-phone-copy">
          <small>BEDROOM / THROWS</small>
          <b>Washed linen throw</b>
          <span>$129</span>
        </div>
        <span className="sv-atc">Add to cart</span>
      </div>
      <div className="sv-chip sv-web-chip">
        <span className="sv-chip-dot" /> Mobile-first · Performance budget on track
      </div>
    </Frame>
  );
}

function WebDetail() {
  const notes = [
    ["Clear product promise", "What it is, who it’s for, in one line."],
    ["Proof near the price", "Reviews and guarantees where doubt appears."],
    ["Delivery & returns", "Answered before the shopper has to ask."],
    ["Sticky add to cart", "Always within reach on mobile."],
  ];
  return (
    <Frame label="Illustrative annotated wireframe of a product page" className="sv-anatomy">
      <div className="sv-wire">
        <div className="sv-wire-img" />
        <div className="sv-wire-col">
          <i className="w60" data-n="1" />
          <i className="w40" />
          <i className="w30 tone" data-n="2" />
          <i className="w80 tall" />
          <i className="w70 dash" data-n="3" />
          <i className="w100 cta" data-n="4" />
        </div>
      </div>
      <ol className="sv-notes">
        {notes.map(([t, d], i) => (
          <li key={t}>
            <span>{i + 1}</span>
            <div>
              <b>{t}</b>
              <small>{d}</small>
            </div>
          </li>
        ))}
      </ol>
      <Tag>Product page anatomy · illustrative</Tag>
    </Frame>
  );
}

/* ---------- Analytics & conversion ---------- */

function DataHero() {
  const steps = [
    ["Sessions", 100],
    ["Product views", 64],
    ["Add to cart", 22],
    ["Checkout", 11],
    ["Purchase", 6],
  ] as const;
  return (
    <Frame
      label="Illustrative analytics dashboard with a conversion funnel, an A/B test and a heatmap"
      className="sv-data"
    >
      <div className="sv-dash">
        <div className="sv-dash-head">
          <span>
            <span className="sv-chip-dot" /> L&L / SIGNAL · Conversion overview
          </span>
          <span className="sv-pill">Last 30 days</span>
        </div>
        <div className="sv-dash-grid">
          <div className="sv-card sv-funnel">
            <div className="sv-card-title">
              <b>Customer journey</b>
              <small>Share of sessions reaching each step</small>
            </div>
            {steps.map(([label, value], i) => (
              <div className="sv-funnel-row" key={label}>
                <span>{label}</span>
                <div className="sv-funnel-track">
                  <i style={{ width: `${value}%` }} className={i === 2 ? "leak" : ""} />
                </div>
                <em>{value}%</em>
              </div>
            ))}
            <div className="sv-leak-note">Biggest drop: product view → add to cart</div>
          </div>
          <div className="sv-dash-side">
            <div className="sv-card sv-ab">
              <div className="sv-card-title">
                <b>Test 07 · Delivery info above the fold</b>
              </div>
              <div className="sv-ab-row">
                <span>A · Control</span>
                <div className="sv-ab-bar">
                  <i style={{ width: "48%" }} />
                </div>
              </div>
              <div className="sv-ab-row win">
                <span>B · Variant</span>
                <div className="sv-ab-bar">
                  <i style={{ width: "62%" }} />
                </div>
              </div>
              <small className="sv-ab-foot">
                <Check size={11} /> Variant ahead · still collecting data
              </small>
            </div>
            <div className="sv-card sv-heat-mini">
              <div className="sv-card-title">
                <b>Click map · product page</b>
              </div>
              <div className="sv-heat-page">
                <i className="h1" />
                <i className="h2" />
                <i className="h3" />
              </div>
            </div>
          </div>
        </div>
        <div className="sv-dash-foot">ILLUSTRATIVE DATA · NOT A CLIENT RESULT</div>
      </div>
    </Frame>
  );
}

function DataDetail() {
  return (
    <Frame
      label="Illustrative heatmap of a product page next to the path from visitor to customer"
      className="sv-heat"
    >
      <div className="sv-heat-board">
        <div className="sv-heat-shot">
          <div className="sv-heat-img" />
          <div className="sv-heat-lines">
            <i />
            <i />
            <i />
            <i className="btn" />
          </div>
          <span className="spot s1" />
          <span className="spot s2" />
          <span className="spot s3" />
          <span className="sv-heat-label">Rage clicks on size guide</span>
        </div>
        <div className="sv-ladder">
          <small>FROM VISITOR TO CUSTOMER</small>
          {[
            ["Visitors", "Arrive from ads, search and email", "w100"],
            ["Engaged shoppers", "Browse products and compare", "w75"],
            ["Intent", "Add to cart or start checkout", "w45"],
            ["Customers", "Complete a purchase", "w25"],
          ].map(([t, d, w]) => (
            <div className={`sv-ladder-step ${w}`} key={t}>
              <b>{t}</b>
              <span>{d}</span>
            </div>
          ))}
        </div>
      </div>
      <Tag>Heatmap & journey · illustrative</Tag>
    </Frame>
  );
}

/* ---------- Email & retention ---------- */

function RetentionHero() {
  return (
    <Frame label="Illustrative email inbox and automated customer flow" className="sv-ret">
      <div className="sv-inbox">
        <div className="sv-inbox-head">
          <b>Inbox</b>
          <span>3 new</span>
        </div>
        {[
          [
            "Northfield Coffee",
            "Your beans, brewed properly",
            "A three-step guide for your first bag",
            true,
          ],
          ["Northfield Coffee", "Running low?", "Your usual roast is ready when you are", false],
          [
            "Northfield Coffee",
            "A thank-you, just for you",
            "Early access to the winter roast",
            false,
          ],
        ].map(([from, subject, preview, unread], i) => (
          <div className={`sv-mail ${unread ? "unread" : ""}`} key={i}>
            <span className="sv-avatar">N</span>
            <div>
              <b>{from}</b>
              <strong>{subject}</strong>
              <small>{preview}</small>
            </div>
          </div>
        ))}
      </div>
      <div className="sv-flow">
        <small className="sv-flow-title">POST-PURCHASE FLOW</small>
        <div className="sv-node trigger">Placed first order</div>
        <span className="sv-link" />
        <div className="sv-node wait">Wait 3 days</div>
        <span className="sv-link" />
        <div className="sv-node mail">Email · Brewing guide</div>
        <span className="sv-link" />
        <div className="sv-node split">Opened?</div>
        <div className="sv-branches">
          <div className="sv-node mail small">Yes · Reorder reminder</div>
          <div className="sv-node sms small">No · Friendly SMS</div>
        </div>
      </div>
    </Frame>
  );
}

function RetentionDetail() {
  const stages = [
    ["Day 0", "Sign-up", "Welcome series"],
    ["Day 1", "First order", "Order & delivery updates"],
    ["Day 4", "Product arrives", "How-to & care content"],
    ["Day 21", "Reorder window", "Replenishment reminder"],
    ["Day 60", "Loyal or lapsing", "VIP perks or win-back"],
  ];
  return (
    <Frame
      label="Illustrative customer lifecycle timeline with a message for each stage"
      className="sv-life"
    >
      <div className="sv-life-track">
        {stages.map(([day, stage, msg], i) => (
          <div className="sv-life-stage" key={stage} style={{ ["--i" as string]: i }}>
            <span className="sv-life-day mono">{day}</span>
            <span className="sv-life-dot" />
            <b>{stage}</b>
            <small>{msg}</small>
          </div>
        ))}
      </div>
      <Tag>Customer lifecycle · illustrative timing</Tag>
    </Frame>
  );
}

/* ---------- SEO & AI search ---------- */

function SearchHero() {
  return (
    <Frame
      label="Illustrative search results page showing an AI answer and organic results featuring the store"
      className="sv-serp"
    >
      <div className="sv-serp-window">
        <div className="sv-searchbar">
          <Search size={14} />
          <span>best linen bedding for hot sleepers</span>
        </div>
        <div className="sv-ai">
          <span className="sv-ai-label">
            <Sparkles size={12} /> AI overview
          </span>
          <p>
            <i className="w95" />
            <i className="w80" />
            <i className="w60" />
          </p>
          <div className="sv-sources">
            <span className="you">northfield-home.com</span>
            <span>review site</span>
            <span>forum</span>
          </div>
        </div>
        <div className="sv-result you">
          <span className="sv-you-tag">Your store</span>
          <small>northfield-home.com › bedding › linen</small>
          <b>Washed Linen Bedding for Hot Sleepers | Northfield</b>
          <div className="sv-rich">
            <span className="sv-stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={10} />
              ))}
            </span>
            <span>Reviews · In stock · From $89</span>
          </div>
        </div>
        <div className="sv-result">
          <small>competitor.com › sheets</small>
          <b>
            <i className="w70" />
          </b>
          <p>
            <i className="w90" />
          </p>
        </div>
      </div>
      <div className="sv-rank">
        <small>Organic visibility</small>
        <svg viewBox="0 0 120 40" preserveAspectRatio="none">
          <path
            d="M0 34 L20 31 L40 32 L60 24 L80 19 L100 12 L120 6"
            fill="none"
            strokeWidth="2.5"
          />
        </svg>
        <span>Illustrative trend</span>
      </div>
    </Frame>
  );
}

function SearchDetail() {
  const rows: [string, string, string][] = [
    ["linen duvet cover", "Buy", "Collection"],
    ["linen vs cotton sheets", "Compare", "Guide"],
    ["how to wash linen", "Learn", "Article"],
    ["washed linen throw", "Buy", "Product"],
  ];
  return (
    <Frame label="Illustrative keyword map and site structure diagram" className="sv-kw">
      <div className="sv-kw-table">
        <div className="sv-kw-row head">
          <span>Search term</span>
          <span>Intent</span>
          <span>Mapped page</span>
        </div>
        {rows.map(([k, i, p]) => (
          <div className="sv-kw-row" key={k}>
            <span>{k}</span>
            <span className={`intent ${i.toLowerCase()}`}>{i}</span>
            <span>{p}</span>
          </div>
        ))}
      </div>
      <div className="sv-tree">
        <div className="sv-tree-node root">Home</div>
        <div className="sv-tree-level">
          <div className="sv-tree-node">Bedding</div>
          <div className="sv-tree-node">Living</div>
          <div className="sv-tree-node guide">Guides</div>
        </div>
        <div className="sv-tree-level small">
          <div className="sv-tree-node">Duvet covers</div>
          <div className="sv-tree-node">Sheets</div>
          <div className="sv-tree-node">Throws</div>
          <div className="sv-tree-node guide">Linen vs cotton</div>
        </div>
      </div>
      <Tag>Keyword map & structure · illustrative</Tag>
    </Frame>
  );
}

/* ---------- Localization ---------- */

function GlobalHero() {
  const markets = [
    {
      code: "DE",
      currency: "EUR",
      name: "Leinendecke, gewaschen",
      price: "89 €",
      note: "inkl. MwSt. & Zölle",
      pay: ["Klarna", "PayPal"],
    },
    {
      code: "UK",
      currency: "GBP",
      name: "Washed linen throw",
      price: "£79",
      note: "Duties included",
      pay: ["Apple Pay", "Card"],
    },
    {
      code: "CA",
      currency: "CAD",
      name: "Washed linen throw",
      price: "CA$129",
      note: "Duties paid at checkout",
      pay: ["Shop Pay", "Card"],
    },
  ];
  return (
    <Frame
      label="Illustrative localized storefront cards for Germany, the United Kingdom and Canada"
      className="sv-global"
    >
      <div className="sv-switch">
        {markets.map((m, i) => (
          <span key={m.code} className={i === 1 ? "on" : ""}>
            {m.code} · {m.currency}
          </span>
        ))}
      </div>
      <div className="sv-markets">
        {markets.map((m) => (
          <div className="sv-market" key={m.code}>
            <div className="sv-market-top">
              <span className="sv-market-code">{m.code}</span>
              <small>{m.currency}</small>
            </div>
            <div className="sv-market-img">
              <span className="sv-throw" />
            </div>
            <b>{m.name}</b>
            <strong>{m.price}</strong>
            <span className="sv-market-note">
              <Check size={10} /> {m.note}
            </span>
            <div className="sv-market-pay">
              {m.pay.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function GlobalDetail() {
  const dots = [
    ["DE", 30, 26, "go"],
    ["NL", 22, 38, "go"],
    ["UK", 18, 20, "go"],
    ["US", 70, 18, "plan"],
    ["AU", 62, 52, "plan"],
    ["JP", 84, 70, "later"],
    ["FR", 46, 44, "plan"],
  ] as const;
  return (
    <Frame
      label="Illustrative market prioritization matrix comparing opportunity and effort"
      className="sv-matrix"
    >
      <div className="sv-matrix-plot">
        <span className="sv-q start">Start here</span>
        <span className="sv-q">Plan carefully</span>
        <span className="sv-q">Quick test</span>
        <span className="sv-q">Later</span>
        {dots.map(([code, x, y, kind]) => (
          <span className={`sv-dot ${kind}`} key={code} style={{ left: `${x}%`, top: `${y}%` }}>
            {code}
          </span>
        ))}
        <span className="sv-axis y">Opportunity ↑</span>
        <span className="sv-axis x">Effort →</span>
      </div>
      <Tag>Market prioritization · illustrative</Tag>
    </Frame>
  );
}

const heroes: Record<string, () => ReactNode> = {
  "website-development": WebHero,
  "analytics-conversion": DataHero,
  "email-retention": RetentionHero,
  "seo-ai-search": SearchHero,
  localization: GlobalHero,
};

const details: Record<string, () => ReactNode> = {
  "website-development": WebDetail,
  "analytics-conversion": DataDetail,
  "email-retention": RetentionDetail,
  "seo-ai-search": SearchDetail,
  localization: GlobalDetail,
};

export function ServiceHeroVisual({ slug }: { slug: string }) {
  const V = heroes[slug];
  return V ? <V /> : null;
}

export function ServiceDetailVisual({ slug }: { slug: string }) {
  const V = details[slug];
  return V ? <V /> : null;
}
