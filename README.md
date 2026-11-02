# Loop & Lift

Loop & Lift is a marketing and growth studio website with a private content and lead-management dashboard. The public site presents the studio, its services, work, insights, and contact options. Authorized administrators manage published content, enquiries, and site settings through the private dashboard.

## Technology

- React 19 and TypeScript
- TanStack Start and TanStack Router for server rendering and file-based routes
- TanStack Query for data loading and caching
- Supabase Auth and Postgres for authentication, content, settings, and enquiries
- Vite for local development and production builds
- Tailwind CSS utilities and the project-specific editorial styles in `src/styles.css`

## Getting Started

### Requirements

- Node.js and npm
- A Supabase project with the project's database migrations applied

### Install and run

```sh
npm install
npm run dev
```

Vite prints the local URL when the development server starts. If its default port is occupied, Vite selects another available port.

### Environment variables

Create a local `.env` file in the project root. Use your own Supabase project values; do not commit `.env` or paste secret keys into source files.

```dotenv
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_PUBLISHABLE_KEY=<publishable-key>
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<publishable-key>
SUPABASE_SERVICE_ROLE_KEY=<server-only-secret-key>
```

The `VITE_` values are exposed to browser code and must contain only the project URL and publishable key. `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security (RLS); keep it server-only and never add a `VITE_` prefix. The server and browser URLs should be the Supabase project root, without a `/rest/v1` suffix.

`LOVABLE_DB_MIGRATION_URL` is used by `drizzle.config.ts` for Drizzle CLI database access. It is not required by the app at runtime.

## Website Map

### Public website

| Route                            | Purpose                           |
| -------------------------------- | --------------------------------- |
| `/`                              | Studio homepage                   |
| `/about`                         | Studio background and positioning |
| `/process`                       | How the studio works              |
| `/services`                      | Services overview                 |
| `/services/$slug`                | Individual service pages          |
| `/industries`                    | Industries served                 |
| `/work`                          | Selected projects and results     |
| `/insights`                      | Articles and insights index       |
| `/insights/$slug`                | Individual insight article        |
| `/contact`                       | Contact enquiry form              |
| `/privacy`, `/terms`, `/cookies` | Legal and privacy information     |

### Private studio dashboard

The dashboard is available at `/admin` and requires an authenticated user with the `admin` role. Sign-in is at `/admin/login`; it is intentionally separate from the protected dashboard layout and is not linked from public pages.

| Route                  | Purpose                  |
| ---------------------- | ------------------------ |
| `/admin`               | Dashboard overview       |
| `/admin/content`       | Content management index |
| `/admin/content/$type` | Manage a content type    |
| `/admin/leads`         | Review contact enquiries |
| `/admin/settings`      | Manage site settings     |

## Source Layout

```text
src/
	components/
		admin/          Admin content-management UI
		services/       Service page sections and visuals
		site/           Shared public-site layout and content components
		ui/             Reusable interface primitives
	hooks/            Shared React hooks, including auth state
	integrations/
		supabase/        Browser and server Supabase clients and auth middleware
	lib/
		admin-api.ts    Admin queries and mutations
		site.functions.ts
										Validated server functions for public reads and contact submissions
		site.server.ts  Public server-side Supabase client and request helpers
		site-types.ts   Database-to-view data mapping and shared types
	routes/           File-based public, login, and dashboard route components
	test/             Vitest tests
	router.tsx        Router and server-rendered query integration
	styles.css        Global styles and editorial design system
drizzle/
	migrations/       SQL schema, RLS policies, auth triggers, and migrations
supabase/
	config.toml       Supabase local-development configuration
```

`src/routeTree.gen.ts` is generated from the route files. Make route changes in `src/routes/`, not in the generated route tree.

## Supabase and Security

- Apply the SQL files in `drizzle/migrations/` to the Supabase project in order. Review each migration before applying it to an existing database; the initial schema migration creates tables and is not intended to be blindly rerun.
- Enable email/password authentication in Supabase Auth. There is no public registration flow in the application.
- Admin access is controlled by `public.admin_emails`, `public.user_roles`, and the `public.has_role` function. Only allowlisted, confirmed users should be granted the `admin` role.
- Dashboard data access uses the signed-in user's Supabase session. RLS policies and `public.has_role` are the authorization boundary; hiding dashboard UI is not a security control.
- Public content reads go through validated TanStack Start server functions and return published entries/settings only.
- Contact requests are validated and written by a server function. The server applies a honeypot and per-caller rate limit, and uses the service-role key only on the server.
- Never expose the service-role/secret key, bypass RLS from browser code, or derive administrator access from user metadata.

For password recovery, a complete recovery flow requires a route that accepts the recovery session and calls Supabase `updateUser` with the new password. The sign-in page is not itself a password-reset form.

## Development Commands

| Command              | Description                         |
| -------------------- | ----------------------------------- |
| `npm run dev`        | Start the Vite development server   |
| `npm run build`      | Create a production build           |
| `npm run build:dev`  | Create a development-mode build     |
| `npm run preview`    | Preview a built application locally |
| `npm run lint`       | Run ESLint across the project       |
| `npm run format`     | Format project files with Prettier  |
| `npm test`           | Run the Vitest test suite once      |
| `npm run test:watch` | Run Vitest in watch mode            |

## Tests

Tests are located in `src/test/` and run with Vitest. They cover application routing, admin-login routing, and contact form validation/rate-limit rules.

```sh
npm test
```
