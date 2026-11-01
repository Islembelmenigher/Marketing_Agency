<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules

- Public pages read Cloud data only through `createServerFn` functions in `src/lib/site.functions.ts` using a publishable-key server client; RLS limits anon to published entries and settings.
- Contact enquiries are written only by the `submitContactRequest` server function (service role), which applies the honeypot and per-IP rate limit; there is no anon INSERT policy on `contact_requests`.
- Admin access comes from `public.user_roles`; a trigger on `auth.users` grants/revokes `admin` when a verified email matches the server-only `public.admin_emails` allowlist. Never derive admin from user metadata.
- Admin dashboard pages live under `src/routes/_authenticated/admin*` and query Cloud from the browser as the signed-in user; RLS (`has_role(auth.uid(), 'admin')`) is the security boundary.
- Brand styling is the editorial CSS class system in `src/styles.css` carried over from the original site; extend those classes rather than adding ad hoc colors in components.
- The router uses setupRouterSsrQueryIntegration so queries prefetched in loaders reach the browser; without it the first browser render mismatches the server HTML.
