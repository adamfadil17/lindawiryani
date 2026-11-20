# Lindawiryani — Wedding Planner Website & Admin

Next.js 15 (App Router) website for Linda Wiryani with a PostgreSQL-backed
admin dashboard. The public site is fully localized in **English, Indonesian,
Chinese, French, Japanese, and German**.

## Stack

- Next.js 15 / React 19 / TypeScript / Tailwind 4
- PostgreSQL + Prisma 7 (`@prisma/adapter-pg`)
- next-intl 4 (`as-needed` locale prefixes)
- JWT HS256 in an HttpOnly cookie (`jose`) + bcryptjs
- TipTap 3 for rich text, `sanitize-html` on write and render
- Local VPS image uploads (`/uploads`, see `docs/uploads.md`)
- Gmail SMTP + reCAPTCHA v2 for public forms

## Local setup

```bash
npm install
cp .env.example .env          # fill in DATABASE_URL, JWT_SECRET, admin, SMTP, reCAPTCHA
npm run db:migrate:deploy     # apply migrations
npm run db:seed               # creates the first admin from ADMIN_EMAIL/ADMIN_PASSWORD
npm run dev                   # http://localhost:3000
```

The public site lives at `/`, `/id`, `/zh`, `/fr`, `/ja`, `/de`.
The admin is not localized: `/auth/login`, `/dashboard/*`.

## Content model

- Base tables store English content; `*Translation` tables store `id/zh/fr/ja/de`
  per field. Missing fields fall back to English.
- Every content entity has `status` (`draft`/`published`), `sort_order`, and a
  stable `slug` (immutable after publish).
- The public site reads the DB directly from Server Components through
  `src/lib/content`, with a `public-content` cache tag invalidated by admin
  mutations (`revalidateTag`).
- Static-only copy (services, our-approach, wedding-concepts, working-with-us
  vendor copy, portfolio reviews, wedding-experiences page copy) intentionally
  stays in `src/lib/data`.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / start |
| `npm run db:migrate:deploy` | Apply migrations (production) |
| `npm run db:seed` | Create the first admin (env-based) |
| `npm run db:reset-admin` | Rotate an existing admin password |
| `npm run email:verify` | Check Gmail SMTP connectivity |
| `bash scripts/smoke-security.sh` | Security + role regression (set `ADMIN_EMAIL`/`ADMIN_PASSWORD` for the authenticated section) |

## Media

New uploads go to local disk (`UPLOAD_DIR`) via the admin-only
`POST /api/uploads`; nginx serves `/uploads` in production. Existing Cloudinary
URLs remain valid. Setup, backups, and nginx configuration are documented in
[`docs/uploads.md`](docs/uploads.md).

## Deployment

Target: a single Contabo VPS running one Node process behind nginx, with local
PostgreSQL. See `docs/task.md` Phase 8 for the server, TLS, PM2, backup, and
release checklist.
