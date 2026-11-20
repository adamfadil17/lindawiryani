# Lindawiryani — Public ↔ Admin Integration Roadmap

| | |
|---|---|
| **Last updated** | 2026-11-20 |
| **Current phase** | Phase 7 complete — awaiting review |
| **Next phase** | Phase 8 — Deployment on Contabo VPS |
| **Deployment target** | Contabo VPS (self-managed Linux, single Node.js process) |

Legend: ✅ done · 🟨 partial · ⬜ todo

---

## 1. Goal

Connect the public website to the admin dashboard (Next.js API routes + Prisma + PostgreSQL), so that content edited in the admin appears on the public site in all 6 locales (`en`, `id`, `zh`, `fr`, `ja`, `de`), with good security and a safe production deployment.

Work is done in order, phase by phase, and stops at the end of each phase for review.

## 2. Deployment Target: Contabo VPS

The project will be deployed on a Contabo VPS, not Vercel/serverless. This changes several earlier assumptions:

| Topic | Implication | Affected tasks |
|---|---|---|
| Process model | One long-running Node process → the in-memory rate limiter works as designed. **Run a single instance** (PM2 `fork` mode, not `cluster`), otherwise counters are per-process. Alternative: move to Redis. | 0.5, 8.2 |
| Client IP | App sits behind nginx. `X-Forwarded-For` / `X-Real-IP` must be **overwritten** by nginx, and the app port bound to `127.0.0.1`, otherwise clients can spoof their IP and bypass rate limits. | 0.5, 8.4 |
| HTTPS | `Secure` cookies (Phase 1) and HSTS need TLS → nginx + Let's Encrypt. CSRF Origin check needs nginx to pass the `Host` header. | 1.1, 1.3, 1.6, 8.4 |
| Caching | Single instance → Next's in-process cache and `revalidateTag` work without a shared cache handler. Do not scale to multiple instances without one. | 4.2 |
| Database | PostgreSQL on the same VPS, listening on localhost only; backups are our responsibility. | 8.3, 8.7 |
| Uploads | Local disk under `UPLOAD_DIR` (`/var/lib/lindawiryani/uploads`), served by nginx at `/uploads` and included in backups. Disk usage grows with media, so size the VPS accordingly. | 5.4, 8.4, 8.7 |
| Build | `next build` can run out of memory on small plans. Add swap, or build locally/CI and ship the output. | 8.5 |
| Email | Gmail SMTP over 465/587. Outbound port 25 is commonly blocked by VPS providers — verify on Contabo. | 6.3 |
| Migrations | Production uses `prisma migrate deploy` (never `migrate dev`). | 2.x, 8.5 |

**Assumptions (confirm or override):** nginx as reverse proxy, PM2 as process manager, PostgreSQL installed locally on the same VPS, Ubuntu LTS.

## 3. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript, Tailwind 4 |
| i18n | next-intl 4 — 6 locales, `as-needed` prefix |
| Database | PostgreSQL + Prisma 7 (`@prisma/adapter-pg`) |
| Auth | JWT HS256 (`jose`) + bcryptjs |
| Validation | zod 4 |
| Editor | TipTap 3 (stores HTML) |
| Email / anti-spam | nodemailer (Gmail), reCAPTCHA v2 |
| Media | Local VPS disk (new uploads) · legacy Cloudinary URLs remain supported |

Route groups: `[locale]/(public)` (localized) and `(admin)` (`/auth/login`, `/dashboard/*`, not localized), split in `middleware.ts`.

## 4. Current State (before integration)

- **Public** reads the DB through a `server-only` data layer (`src/lib/content`) with per-field EN fallback. The old static data files were removed at the Phase 7 cutover; genuinely static copy (services, our-approach, wedding-concepts, working-with-us vendor copy) and extracted reviews/experience-page copy live in `src/lib/data/static` and the remaining static data modules.
- **Admin** → axios → `/api/*` → Prisma → Postgres. Base rows are English; translations live in `*Translation` tables.
- **Public forms** (contact, vendor, career) only send email; nothing is stored in `inquiry_submissions` / `submissions`. The `InquirySubmission` model does not match the current contact form fields.
- **IDs:** static data uses `"1"`, `"2"`…; DB uses UUIDs. `slug` is the only stable key.
- **No DB model** for services, our-approach, wedding-concepts, working-with-us copy, reviews → stay static.
- **Missing admin pieces:** translation UI and the inquiries page now exist (Phase 5); image upload is local (`/api/uploads`, see `docs/uploads.md`).
- **Schema gaps:** resolved in Phase 2 — `*Translation` tables per entity, `status`/`published_at`/`sort_order`, FK indexes, `onDelete: Cascade` on gallery/FAQ/translations, slug policy enforced, `InquirySubmission` redesigned. Admin-facing translation UI is still missing (Phase 5).
- **Stable keys:** destination categories, FAQs, and open positions also have `slug` (Phase 3), so the content seed is idempotent for every entity.
- **Slug policy:** create uses the supplied slug; PATCH never regenerates it; published slugs are immutable (409).

> **Local DB drift resolved (2026-11-20).** The development database had been created from an older schema (`destinations.location_id → destination_locations`, extra `destination_categories` columns). All content tables were empty (verified row counts), the two admin users were backed up, the database was rebuilt from `prisma/migrations`, and the users restored. `prisma migrate diff --from-config-datasource --to-schema` now reports **no difference**. The DB is ready for the Phase 2 migrations.

## 5. Design Decisions

| # | Decision |
|---|---|
| D1 | Translations in `*Translation` tables per entity (`@@unique([entity_id, locale])`); English required, other locales optional with per-field fallback to English. |
| D2 | Slug is locale-neutral, derived from the English name, immutable after publish. |
| D3 | Public reads the DB directly from Server Components via a `server-only` data layer (no HTTP hop). Output shape matches today's types so UI components change minimally. Tag-based cache + `revalidateTag` on admin save. |
| D4 | Stay static: services, our-approach, wedding-concepts, working-with-us copy, `messages/*.json`. |
| D5 | Auth via HttpOnly + Secure + SameSite cookie, Origin check for CSRF, no localStorage. |
| D6 | Rollback flag `CONTENT_SOURCE=static\|db` was used during the Phase 4–6 rollout. Removed at the Phase 7 cutover; rollback is now restoring a database backup. |
| D7 | Login rate limit is keyed **per IP and per IP+email**, not per email alone (a global per-email lockout would let anyone lock the real admin out). |
| D8 | Single Node instance on the VPS; revisit (Redis + shared cache) only if scaling out. |
| D9 | Uploads go to local VPS disk (`UPLOAD_DIR`), not Cloudinary: admin-only `/api/uploads`, magic-byte + 5 MB validation, UUID filenames, atomic writes. nginx serves `/uploads`; the Next route is the dev/fallback. The directory lives outside the repo and is backed up with the DB. |

## 6. Security Findings & Status

| # | Severity | Finding | Status | Where |
|---|---|---|---|---|
| S1 | Critical | Public `POST /api/auth/register` accepted `role` → anyone could create an admin | ✅ Done | 0.1 |
| S2 | Critical | 7 endpoints exposed PII without auth (inquiries, submissions, dashboard, badge, filters) | ✅ Done | 0.2 |
| S3 | High | `JWT_SECRET` fallback `"change-me-in-production"` | ✅ Done | 0.3 |
| S4 | High | Token in localStorage + JS-set cookie (XSS-stealable); two parallel auth mechanisms | ✅ Done | 1.1, 1.2 |
| S5 | High | No rate limiting / reCAPTCHA on login and public POSTs | 🟨 Partial (0.5 done; 1.7, 8.4 pending) | 0.5, 1.7, 8.4 |
| S6 | Medium | Email routes: no zod validation, user input interpolated into HTML emails, auto-reply to arbitrary address | ✅ Done | 6.3 |
| S7 | Medium | 3× `dangerouslySetInnerHTML` → stored XSS once content comes from DB | ✅ Done | 5.5 |
| S8 | Medium | Middleware doesn't check role; JWT 7d, not revocable, role not rechecked | ✅ Done | 1.4, 1.5 |
| S9 | Medium | Seed admin with hardcoded `Admin@123` | ✅ Done | 0.4 |
| S10 | Low | No security headers (CSP, HSTS, frame, referrer) | ✅ Done | 1.6, 8.4 |
| S11 | Low | Public GETs over-fetch nested data, unvalidated query params, `open-positions?isActive=all` leaks inactive | ✅ Done | 4.6 |
| S12 | Low | Prisma not singleton; `@prisma/client` in devDependencies; `eslint.ignoreDuringBuilds: true` | ✅ Done | 0.6, 7.5 |

## 7. Task List

### Phase 0 — Security hotfix

| ID | Task | Status |
|---|---|---|
| 0.1 | Make register admin-only (ignore `role` from the public, return no token) | ✅ |
| 0.2 | Add `requireAuth` + `requireRole(admin, editor)` to the 7 exposed endpoints; admin UI call sites must send auth headers | ✅ |
| 0.3 | Require `JWT_SECRET` (≥ 32 chars in production), remove the fallback, pin algorithm to HS256 | ✅ |
| 0.4 | Seed admin from `ADMIN_EMAIL` / `ADMIN_PASSWORD`; add `npm run db:reset-admin` for existing accounts | ✅ |
| 0.5 | Rate limit login (per IP, per IP+email), public POSTs and the 3 email routes; reCAPTCHA on `/api/inquiries` and `/api/submissions` | ✅ |
| 0.6 | Prisma singleton; move prisma/dotenv to `dependencies`; add `.env.example`; re-sync lockfile (`npm ci` must pass) | ✅ |
| 0.7 | Add `scripts/smoke-security.sh` covering the Phase 0 endpoints | ✅ |

### Phase 1 — Auth hardening

| ID | Task | Files | Status |
|---|---|---|---|
| 1.1 | Login sets HttpOnly + Secure + SameSite cookie; no token in response body | `api/auth/login`, `logout`, `me` | ✅ |
| 1.2 | `requireAuth` reads cookie; remove localStorage and `getAuthHeaders`; axios instance with `withCredentials` (codemod across admin pages) | `lib/auth.ts`, `lib/getAuthHeaders.ts`, `hook/*`, `(admin)/dashboard/**` | ✅ |
| 1.3 | CSRF: Origin/Host check on mutating methods | new helper | ✅ |
| 1.4 | Role gate in middleware or dashboard layout (admin / editor / user matrix) | `middleware.ts`, `(admin)/dashboard/layout.tsx` | ✅ |
| 1.5 | Revocation: `User.token_version`, shorter token lifetime, DB check on mutating routes | `schema.prisma`, `lib/auth.ts` | ✅ |
| 1.6 | Security headers + CSP (allow reCAPTCHA, Cloudinary); HSTS | `next.config.ts` | ✅ |
| 1.7 | Login hardening against distributed brute force (e.g. reCAPTCHA after N failures, failure logging/alert) | `api/auth/login` | ✅ |

> **Checkpoint M1 — staging deploy on the VPS after Phase 1.** Secure cookies, CSRF and client-IP handling behave differently behind nginx/HTTPS, so run tasks 8.1–8.4 and deploy a staging copy before starting Phase 2.

### Phase 2 — Schema and i18n model

| ID | Task | Files | Status |
|---|---|---|---|
| 2.1 | Translation tables: Destination, DestinationCategory, WeddingExperience, ExperienceFaq, Venue, WeddingTheme, Portfolio, Article, OpenPosition | `schema.prisma` + migration | ✅ |
| 2.2 | Add `status` (draft/published), `published_at`, `sort_order` | `schema.prisma` | ✅ |
| 2.3 | FK indexes; `onDelete: Cascade` for gallery, FAQ, translations | `schema.prisma` | ✅ |
| 2.4 | Slug policy: follow input, never regenerate on PATCH | `api/destinations/**`, other content routes | ✅ |
| 2.5 | Redesign `InquirySubmission` to match the real contact form (array fields as `Json` / `String[]`) | `schema.prisma`, validators | ✅ |
| 2.6 | Decide fate of `WeddingTheme.type` (column dropped, type still in `types/index.ts`) | `types/index.ts`, theme components | ✅ |

> **2.6 decision:** `WeddingTheme.type` stays as an **optional UI-only** field for the static site; DB-backed themes will group by `WeddingExperience.category` in Phase 4. No DB column.

> **Phase 3 note:** `status` defaults to `draft`. The content seed (3.1) must explicitly set `status: "published"` (and `published_at`) or the public site will show nothing after the Phase 4 cutover.

> **Phase 3 implemented:** stable `slug` columns were added to `DestinationCategory`, `ExperienceFaq`, and `OpenPosition` so every entity can be upserted by slug; admin POST derives one when omitted. The seed was idempotent and seeded **4 categories, 53 destinations, 4 experiences (20 FAQs), 24 venues, 21 themes, 1 portfolio, 14 articles, 4 positions**, all `published`, with per-field translations for `id/zh/fr/ja/de`. The one-time `db:seed-content` / `db:verify-parity` tools were removed at the Phase 7 cutover after 9,668 parity checks passed; new environments restore a database dump.

### Phase 3 — Migrate static content to the DB

| ID | Task | Files | Status |
|---|---|---|---|
| 3.1 | Idempotent content seed (upsert by slug, two-pass relations via slug→UUID map). Order: categories → destinations → experiences + FAQ → venues → themes → portfolios → articles → positions | `prisma/seed-content.ts` | ✅ |
| 3.2 | Move `*-media.ts` into gallery tables (hero vs gallery per the `-hero` / `-g-n` convention) | seed | ✅ |
| 3.3 | Parity script: compare counts and fields DB vs static per locale, including fallback behaviour | `scripts/verify-parity.ts` | ✅ |

### Phase 4 — Public reads from the DB

| ID | Task | Files | Status |
|---|---|---|---|
| 4.1 | `server-only` data layer (`getDestinations(locale)`, `getVenueBySlug(...)`, …) with locale + EN fallback, same output shapes as today | `lib/content/*` | ✅ |
| 4.2 | Tagged cache + `revalidateTag` from admin mutations; `generateStaticParams` from DB (single-instance cache on the VPS) | `lib/content/*`, admin routes | ✅ |
| 4.3 | Replace `useXData()`: server pages fetch and pass props to `page-client.tsx`; update shared components | journal, destinations, wedding-experiences, portfolio, home, `shared/venues.tsx`, `shared/wedding-themes.tsx`, all `[slug]/page.tsx` | ✅ |
| 4.4 | Sitemap + metadata from DB (published only, `lastmod` from `updated_at`); no hreflang for locales without a translation | `sitemap.ts`, `generateMetadata`, `lib/seo.ts` | ✅ |
| 4.5 | Working-with-us reads `OpenPosition` from DB | `working-with-us/page-client.tsx` | ✅ |
| 4.6 | Public GET hardening: published only, `select` DTOs, validated query params, rate limit | `api/**/route.ts` | ✅ |
| 4.7 | `CONTENT_SOURCE` flag for rollback | data layer | ✅ |

> **Phase 4 implemented:** the public site reads the DB through `src/lib/content`. All page data is fetched in Server Components and passed to client components; static-only copy remains static per D4. Mutations call `revalidateTag("public-content")`; the sitemap is dynamic, published-only, and uses `updated_at`. Anonymous content GETs are published-only, rate-limited (120/min/IP), and return reduced DTOs; staff keep full rows via the session cookie.

### Phase 5 — Translation-aware admin

| ID | Task | Files | Status |
|---|---|---|---|
| 5.1 | Locale tabs component + translation completeness indicator | `components/shared/locale-tabs.tsx` | ✅ |
| 5.2 | zod schemas + API accept nested `translations`, upsert in one transaction | `utils/validators.ts`, all content routes | ✅ |
| 5.3 | Update admin forms per entity | destinations, categories, experiences (+FAQ), venues, themes, portfolio, journal, positions | ✅ |
| 5.4 | Local VPS image upload: admin-only multipart endpoint, magic-byte + size validation, UUID filenames, store `/uploads/...` URL (replaces FileReader base64); nginx serving + backups documented | `image-upload.tsx`, `api/uploads`, `lib/uploads.ts`, `docs/uploads.md` | ✅ |
| 5.5 | Sanitize TipTap HTML on write (server) and on render (allowlist) | `api/articles`, `api/portfolios`, 3 render sites | ✅ |
| 5.6 | Draft/publish toggle + preview | admin forms, routes | ✅ |
| 5.7 | Admin Inquiries page; connect the badge | `(admin)/dashboard/inquiries/*` | ✅ |

> **Phase 5 implemented:** admin forms now send `{ status, translations: { id|zh|fr|ja|de: {…} } }`; APIs validate with zod and replace translations transactionally. A shared `TranslationsEditor` (locale tabs + completeness dots) is in all eight entity forms, including per-FAQ translations. `status` defaults to draft, flips to published with `published_at`, and published forms link to the live page. Articles/portfolios/theme descriptions are sanitized with `sanitize-html` on write and again in the public data layer. `/dashboard/inquiries` now has a searchable, status-filtered list and a detail page (status + delete), and the nav badge points to it.

### Phase 6 — Public forms → DB

| ID | Task | Files | Status |
|---|---|---|---|
| 6.1 | Contact form: zod validation, reCAPTCHA, rate limit, **store in DB first**, then email | `api/send-email/contact`, `contact/page-client.tsx` | ✅ |
| 6.2 | Vendor and career forms → `Submission` table, then email | two `working-with-us/*` routes | ✅ |
| 6.3 | Escape HTML in email templates; validate the auto-reply address (email only, not free-text WhatsApp); confirm outbound SMTP port works from the VPS | 3 email routes | ✅ |

> **Phase 6 implemented:** all three public form routes validate with zod, store the submission in PostgreSQL first, then send email best-effort. Contact submissions map to `InquirySubmission` (arrays, locale included); vendor/career map to `Submission`. User input is HTML-escaped in every template, subjects are CR/LF-sanitized, and the contact auto-reply only goes to a syntactically valid email (WhatsApp-only contacts skip it). `EMAIL_DISABLED=true` lets local/staging tests store without sending. VPS SMTP can be confirmed with `npm run email:verify` (Gmail 587/465; port 25 is irrelevant).

### Phase 7 — Verification and cleanup

| ID | Task | Status |
|---|---|---|
| 7.1 | Security regression: extend `scripts/smoke-security.sh` (from 0.7) to cover every route and role | ✅ |
| 7.2 | `next build` with DB; check ISR, hreflang, sitemap, all locales render | ✅ |
| 7.3 | Run parity script (3.3) + manual admin → public check per entity | ✅ |
| 7.4 | Cut over to `CONTENT_SOURCE=db`; delete `base/`, `translate/`, `*-data.ts`, old hooks; update README | ✅ |
| 7.5 | Remove `eslint.ignoreDuringBuilds`, fix resulting lint/type errors | ✅ |

> **Phase 7 completed:** parity passed 9,668 checks before cutover; the DB-backed static files, old data hooks, and one-time seed/parity tools were deleted. The security smoke test now covers **56 checks** including the admin/editor/user role matrix. `next build` succeeds with lint enabled (`eslint` reports 0 errors), all six locales render across 13 page types, the sitemap has 492 URLs with per-locale hreflang, and admin edits were verified to appear on the public pages for destinations, articles, portfolios, experiences, venues, themes, and positions.

### Phase 8 — Deployment on Contabo VPS

Tasks 8.1–8.4 are done early (before checkpoint M1) so staging exists; 8.5–8.10 complete the production release.

| ID | Task | Status |
|---|---|---|
| 8.1 | Server baseline: non-root sudo user; SSH key-only (no password, no root login); `ufw` allowing only 22/80/443; fail2ban; unattended security upgrades; swap if RAM is small | ⬜ |
| 8.2 | Runtime: Node.js LTS matching local; PM2 in **fork mode, single instance** (or a systemd unit); app listens on `127.0.0.1` only; auto-start on reboot | ⬜ |
| 8.3 | PostgreSQL local: listens on localhost only (port 5432 closed in `ufw`); dedicated least-privilege DB user + strong password; production `DATABASE_URL` | ⬜ |
| 8.4 | nginx reverse proxy + Let's Encrypt (auto-renew); HTTP→HTTPS redirect; pass `Host`, `X-Forwarded-Proto`; **overwrite** `X-Forwarded-For` / `X-Real-IP` with `$remote_addr`; request size limit; `location /uploads/` alias to `UPLOAD_DIR` + `client_max_body_size`; optional `limit_req` on `/api/auth/login` and `/api/send-email/*` | ⬜ |
| 8.5 | Build & release: `prisma generate` + `next build` (consider `output: "standalone"`); `deploy.sh` = pull → `npm ci` → `prisma migrate deploy` → build → `pm2 reload`; keep the previous build for rollback; build elsewhere if the VPS runs out of memory | ⬜ |
| 8.6 | Secrets: production `.env` mode 600, owned by the app user, outside the repo; **new** `JWT_SECRET` different from dev; seed the first admin once, then remove `ADMIN_PASSWORD` from the file | ⬜ |
| 8.7 | Backups: nightly `pg_dump` via cron **plus the `UPLOAD_DIR` media directory**, retention policy, copy off the server (object storage / another host), periodic **restore test**; optional Contabo snapshot | ⬜ |
| 8.8 | Observability: log rotation (PM2 + nginx), uptime monitor, disk/RAM alerts | ⬜ |
| 8.9 | Production verification: `BASE_URL=https://<domain> bash scripts/smoke-security.sh`; check response headers, TLS grade, cookies are `Secure` + `HttpOnly` | ⬜ |
| 8.10 | DNS + site URL: A/AAAA to the VPS, `www` redirect, set base URL/env used by canonical, sitemap and hreflang | ⬜ |

## 8. Owner Actions (Phase 0 verification)

| # | Action | Done |
|---|---|---|
| 1 | Apply the Phase 0 changes, run `npm install` | ⬜ |
| 2 | Run `bash scripts/smoke-security.sh` with `npm run dev` running → expect all checks to pass | ⬜ |
| 3 | **Rotate the admin password** if the DB was ever seeded: `ADMIN_EMAIL=… ADMIN_PASSWORD='…' npm run db:reset-admin` | ⬜ |
| 4 | Check the `users` table for accounts you don't recognise (register was public); delete them and change `JWT_SECRET` to invalidate old tokens | ⬜ |
| 5 | Confirm local `JWT_SECRET` is ≥ 32 characters (generate: `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`) | ⬜ |
| 6 | Confirm the VPS plan (RAM / disk), the domain name, and the assumptions in §2 | ⬜ |
