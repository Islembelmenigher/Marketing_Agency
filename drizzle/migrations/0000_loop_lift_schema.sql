-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Server-only admin email allowlist (replaces the ADMIN_EMAILS environment variable)
CREATE TABLE public.admin_emails (
  email text PRIMARY KEY CHECK (email = lower(email)),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.admin_emails TO service_role;
ALTER TABLE public.admin_emails ENABLE ROW LEVEL SECURITY;
INSERT INTO public.admin_emails (email) VALUES ('belmenigherislem@gmail.com');

-- Grant/revoke admin from the verified primary email, like the original requireAdmin check
CREATE OR REPLACE FUNCTION public.sync_admin_role_from_email()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.email IS NOT NULL
     AND NEW.email_confirmed_at IS NOT NULL
     AND EXISTS (SELECT 1 FROM public.admin_emails WHERE email = lower(NEW.email)) THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  ELSIF TG_OP = 'UPDATE' THEN
    DELETE FROM public.user_roles WHERE user_id = NEW.id AND role = 'admin';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_admin_sync
  AFTER INSERT OR UPDATE OF email, email_confirmed_at ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.sync_admin_role_from_email();

-- updated_at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Website content
CREATE TABLE public.site_entries (
  id serial PRIMARY KEY,
  kind text NOT NULL CHECK (kind IN ('page', 'service', 'pricing', 'project', 'article', 'policy')),
  slug text NOT NULL CHECK (char_length(slug) BETWEEN 1 AND 160),
  title text NOT NULL CHECK (char_length(title) BETWEEN 1 AND 240),
  kicker text,
  summary text,
  body text NOT NULL DEFAULT '' CHECK (char_length(body) <= 30000),
  price real CHECK (price IS NULL OR price >= 0),
  currency text CHECK (currency IS NULL OR char_length(currency) <= 3),
  published boolean NOT NULL DEFAULT false,
  featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  seo_title text CHECK (seo_title IS NULL OR char_length(seo_title) <= 240),
  seo_description text CHECK (seo_description IS NULL OR char_length(seo_description) <= 320),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT site_entries_slug_unique UNIQUE (slug)
);
GRANT SELECT ON public.site_entries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_entries TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.site_entries_id_seq TO authenticated;
GRANT ALL ON public.site_entries TO service_role;
GRANT ALL ON SEQUENCE public.site_entries_id_seq TO service_role;
ALTER TABLE public.site_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read published entries" ON public.site_entries
  FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Admins can read all entries" ON public.site_entries
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can create entries" ON public.site_entries
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update entries" ON public.site_entries
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete entries" ON public.site_entries
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER site_entries_updated_at BEFORE UPDATE ON public.site_entries
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Contact form enquiries (written only by the server)
CREATE TABLE public.contact_requests (
  id serial PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  brand text,
  site_url text,
  service text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'archived')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE, DELETE ON public.contact_requests TO authenticated;
GRANT ALL ON public.contact_requests TO service_role;
GRANT ALL ON SEQUENCE public.contact_requests_id_seq TO service_role;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read enquiries" ON public.contact_requests
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update enquiries" ON public.contact_requests
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete enquiries" ON public.contact_requests
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER contact_requests_updated_at BEFORE UPDATE ON public.contact_requests
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX contact_requests_created_at_idx ON public.contact_requests (created_at DESC);

-- Contact form rate limiting (server-only)
CREATE TABLE public.contact_attempts (
  id bigserial PRIMARY KEY,
  ip_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.contact_attempts TO service_role;
GRANT ALL ON SEQUENCE public.contact_attempts_id_seq TO service_role;
ALTER TABLE public.contact_attempts ENABLE ROW LEVEL SECURITY;
CREATE INDEX contact_attempts_ip_time_idx ON public.contact_attempts (ip_hash, created_at DESC);

-- Studio settings (single row)
CREATE TABLE public.site_settings (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  contact_email text,
  phone text,
  location text,
  instagram_url text,
  linkedin_url text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read studio settings" ON public.site_settings
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can create studio settings" ON public.site_settings
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update studio settings" ON public.site_settings
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER site_settings_updated_at BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Starter website content from the original project
INSERT INTO public.site_entries (kind, slug, title, kicker, summary, body, price, currency, published, featured, sort_order, seo_title, seo_description) VALUES
  ('page', 'home', 'Your website gets visitors. Let''s turn more of them into customers.', 'Loop & Lift Growth Studio', 'We help growing ecommerce brands build better shopping experiences, understand customer behavior, recover lost sales and turn first-time buyers into repeat customers.', 'Turn traffic into customers. Turn customers into repeat buyers.

We help growing ecommerce brands improve conversion, understand customer behavior, recover lost sales and build stronger customer relationships. Start with a practical growth audit, not a promise of overnight results.

The problems we look for: visitors leaving without purchasing; product pages that do not explain value; abandoned carts; inconsistent email automation; analytics no one uses; and search visibility that does not match the quality of the business.

Four connected disciplines: Website Development & Conversion; Analytics & Customer Behavior; Email Marketing & Retention; SEO & AI Search Visibility.

Our process: Discover, Analyze, Optimize, Measure, Grow.

We make data-informed decisions, focus on revenue rather than vanity metrics, communicate clearly and avoid unnecessary tools. Any metrics shown on this site are illustrative examples, not client results.', NULL, NULL, true, true, 0, 'Loop & Lift | Ecommerce Growth Studio', 'Turn more ecommerce visitors into customers with conversion, analytics, retention and search support.'),
  ('page', 'services', 'Practical growth support for every part of the customer journey', 'Services', 'Strategy and implementation across ecommerce conversion, analytics, retention and discoverability.', 'We connect the work that helps ecommerce customers find, understand, buy and return. Engagements are scoped around your store, goals and evidence—not a fixed checklist.', NULL, NULL, true, true, 1, NULL, NULL),
  ('service', 'website-development', 'Build a shopping experience that makes buying easier.', 'Website Development & Landing Pages', 'Improve the way visitors understand your products, build confidence and complete a purchase.', 'Your website is more than its appearance. It should help people understand products, trust the offer and buy with less friction.

Conversion-focused landing pages for offers, campaigns, products or customer segments. Shopify theme customization that improves your existing store without replacing infrastructure unnecessarily. Product-page improvements to descriptions, benefit hierarchy, reviews, trust signals, delivery and returns details, calls to action and mobile usability. Responsive redesigns, performance improvements, conversion copywriting and ongoing maintenance.

Technology may include Shopify, Liquid, HTML, CSS, JavaScript, React or Next.js where it is appropriate. We prefer improving an existing Shopify theme when it is the practical solution. The objective is to help more qualified visitors complete a purchase—not to guarantee a specific sales increase.', NULL, NULL, true, true, 2, 'Ecommerce Website Development & Landing Pages', 'Conversion-focused Shopify improvements, landing pages, product-page optimization and maintenance.'),
  ('service', 'analytics-conversion', 'Understand where you''re losing customers. Make improvements backed by data.', 'Analytics & Conversion Optimization', 'Find useful signals in customer behavior and turn them into a prioritized improvement plan.', 'Many stores receive traffic without knowing where customers hesitate or leave. We configure Google Analytics 4, Google Tag Manager and Microsoft Clarity; verify ecommerce events; review conversion funnels, traffic sources, heatmaps and session recordings; and build clear Looker Studio reports.

Events can include product views, add to cart, begin checkout, purchase, form submission and important button interactions. We check for duplicate events and purchase tracking. CRO support may include UX audits, product and landing-page improvements, checkout recommendations, hypotheses and A/B tests when traffic and experimental design make them meaningful.

Behavioral data provides signals to interpret; it cannot reveal every visitor''s motivation. The benefits are better customer understanding, clearer bottlenecks and more informed decisions—not guaranteed outcomes.', NULL, NULL, true, true, 3, NULL, NULL),
  ('service', 'email-retention', 'Turn one-time buyers into customers who come back.', 'Email Marketing & Customer Retention', 'Plan useful lifecycle communication that reaches eligible subscribers at the right time.', 'Email marketing is more than sending newsletters. We can configure Klaviyo and Shopify tracking, consent and suppression settings; build welcome, abandoned-cart, browse-abandonment, post-purchase, win-back and suitable replenishment flows; and plan campaigns, segmentation, copy, design and meaningful tests.

Reporting can include revenue attributed to email, clicks, conversion, unsubscribes, deliverability signals and automation performance. The aim is to improve relationships and retention, and reduce dependence on constant new-customer acquisition.

We only configure permission-based marketing, honor unsubscribe requests, maintain suppression lists and respect applicable data-protection and marketing laws. We do not use scraped or unconsented lists.', NULL, NULL, true, true, 4, NULL, NULL),
  ('service', 'seo-ai-search', 'Make your business easier to discover across search engines and AI-powered search.', 'SEO & AI Search Visibility', 'Improve technical accessibility, page structure and useful content for people and search systems.', 'SEO support includes technical audits, crawlability and indexing checks, sitemaps, canonicals, redirects, mobile performance, titles, descriptions, headings, internal links, search intent, product and category pages, image alt text, Google Search Console and Bing Webmaster Tools.

Where accurate, we implement Schema.org JSON-LD for the visible organization, website, services, products, breadcrumbs and editorial content. For AI search, we review crawler access and clarify useful, factual content. OAI-SearchBot supports ChatGPT Search discovery; GPTBot is associated with model training. Training crawler access is not enabled by default. An optional llms.txt guide is not a guaranteed ranking method or a Google requirement.

Useful content and technical accessibility can improve discoverability, but search engines and AI systems decide whether pages are indexed, cited or recommended. We never guarantee recommendations by ChatGPT, Gemini, Perplexity or other assistants.', NULL, NULL, true, true, 5, NULL, NULL),
  ('service', 'localization', 'Make every market feel like home.', 'Optional multilingual localization', 'Localize ecommerce experiences in English, French and Arabic, including right-to-left support.', 'Optional support includes Weglot integration, translation platform setup and review, language switchers, multilingual URLs, hreflang, multilingual SEO, Arabic right-to-left layout and mobile/desktop checks. Human review is important for commercial, legal and product information; machine translations are not always accurate.', NULL, NULL, true, false, 6, NULL, NULL),
  ('pricing', 'analytics-tracking-setup', 'Analytics & Tracking Setup', 'From €250', 'A practical baseline for understanding your ecommerce traffic and key events.', 'Basic tracking setup; GA4 configuration; Microsoft Clarity installation; basic event verification; initial documentation.', 250, 'EUR', true, true, 7, NULL, NULL),
  ('pricing', 'landing-page-development', 'Landing Page Development', 'From €500', 'A responsive landing page built around a clear offer and customer journey.', 'Strategy and page structure; responsive landing page. The original package brief was incomplete, so further inclusions are intentionally left unspecified.', 500, 'EUR', true, true, 8, NULL, NULL),
  ('page', 'industries', 'Ecommerce growth support built around your kind of business', 'Who we help', 'For growing skincare, wellness, cosmetics, fashion and lifestyle brands.', 'Beauty and skincare brands may need clearer product benefits, stronger trust signals, better product pages and thoughtful replenishment communication. Wellness and cosmetics businesses can benefit from clearer education and a more useful purchase journey. Fashion and lifestyle stores may need stronger collection pages, mobile usability, product content and search structure. Shopify and other direct-to-consumer brands can connect landing-page improvements, behavior analytics, retention and search work to their specific priorities.

The right work depends on the store and its evidence. No service can guarantee more revenue.', NULL, NULL, true, true, 9, NULL, NULL),
  ('page', 'process', 'A clear process, from first questions to ongoing improvement', 'Our process', 'Discovery, audit, strategy, implementation, measurement and ongoing growth.', '1. Discovery: understand the business, audience, objectives, tools and challenges.
2. Audit: review the store, customer journey, analytics, automation and search visibility.
3. Strategy: prioritize actions using business needs and available evidence.
4. Implementation: deliver agreed development, tracking, optimization, email or SEO work.
5. Measurement: review relevant data and decide what needs further work.
6. Ongoing growth: provide monthly support and continuous optimization where appropriate.

Clients provide appropriate website and analytics access, marketing-platform access, brand assets, product information, approvals and feedback. Clients retain ownership of their website, store, customer data and software accounts.', NULL, NULL, true, false, 10, NULL, NULL),
  ('page', 'about', 'A founder-led studio focused on the work that moves ecommerce forward', 'About Loop & Lift', 'Strategy and implementation for growing ecommerce businesses.', 'Loop & Lift Growth Studio is a founder-led ecommerce growth partner. We connect better shopping experiences, useful analytics, responsible customer retention and search visibility. Our approach is practical: clear communication, evidence-informed decisions, a focus on business outcomes rather than vanity metrics, and no unnecessary tools or complicated processes.

We do not claim client results, awards, credentials, employees or years of experience that have not been supplied.', NULL, NULL, true, false, 11, NULL, NULL),
  ('page', 'work', 'Independent demonstrations of the work', 'Concept projects', 'These fictional concepts show possible approaches. They are not client engagements or measured case studies.', 'Each project is an independent demonstration. No fictional brands, metrics, testimonials or outcomes are presented as real client work. Use the admin dashboard to replace these examples with verified client case studies when available.', NULL, NULL, true, true, 12, NULL, NULL),
  ('project', 'luma-skin', 'Luma Skin', 'Concept Project · Skincare', 'An independent demonstration of a clearer skincare product journey.', 'Fictional skincare brand. Demonstrates a landing page concept, product-page hierarchy, sample welcome and abandoned-cart email journeys, and an illustrative analytics view. Recommendations focus on explaining product benefits, trust and mobile shopping. This is not a client engagement and contains no client results.', NULL, NULL, true, true, 13, NULL, NULL),
  ('project', 'roast-republic', 'Roast Republic', 'Concept Project · Coffee subscription', 'An independent demonstration of a premium coffee subscription experience.', 'Fictional coffee brand. Demonstrates subscription landing-page structure, product presentation, sample welcome communication and post-purchase retention ideas. This is not a client engagement and contains no client results.', NULL, NULL, true, true, 14, NULL, NULL),
  ('project', 'northline', 'Northline', 'Concept Project · Fashion', 'An independent demonstration of a responsive fashion shopping experience.', 'Fictional fashion brand. Demonstrates responsive collection and product pages, mobile shopping, and sample SEO and product-content improvements. This is not a client engagement and contains no client results.', NULL, NULL, true, true, 15, NULL, NULL),
  ('article', 'where-to-look-before-buying-more-traffic', 'Where to look before buying more ecommerce traffic', 'Conversion', 'A practical first pass through the shopping journey before increasing acquisition spend.', 'Start with the journey you already have. Check that product views, add-to-cart, checkout and purchase events are recorded consistently. Compare important device and traffic-source segments. Review product pages for clear benefits, delivery and returns information, trust signals and a visible next step. Use recordings and heatmaps as clues, not proof of intent. Prioritize one testable change and measure it carefully; do not assume a single change will lift revenue.', NULL, NULL, true, true, 16, 'Where to Look Before Buying More Ecommerce Traffic', 'A practical conversion review for growing ecommerce stores before increasing acquisition spend.'),
  ('article', 'a-useful-first-analytics-audit', 'A useful first analytics audit for a growing Shopify store', 'Analytics', 'Check event quality, purchase tracking and funnel consistency before interpreting reports.', 'Begin by documenting the decisions the store wants to make. Then verify traffic, product views, add-to-cart, checkout and purchase events; test for duplicate purchase recording; compare a few known orders with analytics; and label the key funnel steps. Keep the first report focused on acquisition, conversion and retention questions. Analytics are useful signals that need context, not a complete explanation of customer motivation.', NULL, NULL, true, false, 17, NULL, NULL),
  ('article', 'permission-based-retention', 'What responsible ecommerce email retention includes', 'Retention', 'Lifecycle messaging works best when it respects customer choice and timing.', 'A useful retention program starts with consent and suppression rules, then maps welcome, post-purchase and other relevant communication to customer needs. Review message relevance, mobile readability, unsubscribe rates and deliverability signals alongside attributed revenue. Do not treat every customer as eligible for every campaign, and never use scraped or unconsented lists.', NULL, NULL, true, false, 18, NULL, NULL),
  ('policy', 'privacy-policy', 'Privacy Policy', 'Draft for business review', 'This editable draft needs the business''s actual processing details and legal review before launch.', 'DRAFT — Replace this page with a policy reviewed for the business''s actual practices and applicable law before relying on it. This site may collect information that visitors submit through its contact form, such as name, email address, store URL and message. The information is intended to be used to respond to the request and manage the inquiry. Do not add analytics, advertising, processors, retention periods, legal bases or international-transfer claims until they are verified. Contact details and data-controller information must be supplied by the business.', NULL, NULL, true, false, 19, NULL, NULL),
  ('policy', 'cookie-policy', 'Cookie Policy', 'Draft for business review', 'This editable draft needs an inventory of the cookies and similar technologies actually used.', 'DRAFT — Before launch, inventory the cookies and similar technologies used by the live site, describe their purposes and durations, and add any consent controls required for the business''s markets. This starter website does not claim a specific analytics or advertising configuration. Have the final policy reviewed against the actual implementation and applicable law.', NULL, NULL, true, false, 20, NULL, NULL),
  ('policy', 'terms-of-service', 'Terms of Service', 'Draft for business review', 'This editable draft is not a substitute for business-specific terms or legal review.', 'DRAFT — Add the correct legal business name, jurisdiction, service scope, fees, payment terms, cancellations, intellectual property, liability terms and dispute process before launch. This page is an editable placeholder, not legal advice or a compliance statement. Have business-specific terms reviewed by a qualified professional.', NULL, NULL, true, false, 21, NULL, NULL)
ON CONFLICT (slug) DO NOTHING;