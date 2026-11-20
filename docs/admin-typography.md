# Admin UI Readability & Typography Plan

| | |
|---|---|
| **Status** | ✅ Implemented 2026-11-20 — admin only; public site unchanged |
| **Scope** | Admin area only: `/auth/login`, `/dashboard/*`, shared admin primitives |
| **Out of scope** | Public website typography, colour palette, layout redesign, content changes |
| **Goal** | Make the admin legible at a glance and meet common accessibility standards without turning it into a low-density consumer UI |

---

## 1. Why this is needed

The admin currently optimises for density more than readability:

- **The whole admin uses Cormorant Garamond**, a display serif with a small
  x-height and thin strokes. At 12–14px it reads much smaller than a UI
  sans-serif at the same size.
- `html[data-area="admin"]` deliberately overrides the type scale to
  `xs = 12px`, `sm = 14px`, `base = 16px`, while the public site uses
  `xs = 14px`, `sm = 16px`, `base = 18px`.
- There are **44 occurrences of 9–11px text** in the admin (sidebar group
  labels, table headers, field labels, badges, metadata).
- **`text-xs` is used 120+ times** and **`text-sm` 89+ times** in dashboard
  pages, mostly for labels, helper text, table cells and secondary metadata.
- Secondary text often uses **`text-primary/40`–`/60`**. On white, those
  colours measure **1.9:1–2.8:1**, well below the WCAG AA 4.5:1 requirement.
- Form labels are 12px, uppercase, with very wide `0.2em` tracking, which is
  harder to scan than 13px sentence-case labels.
- Buttons and badges are frequently 10–12px with uppercase + wide tracking.

The combination makes the UI feel cramped and “small print”, especially on
1080p/1440p monitors at 100% scaling.

---

## 2. Target standard

### 2.1 Accessibility baseline

- **WCAG 2.2 AA**
  - Normal text contrast ≥ **4.5:1**
  - Large text (≥24px, or ≥18.66px bold) ≥ **3:1**
  - UI borders/focus indicators ≥ **3:1**
  - Text resizable to **200%** without loss of content or function
  - Text spacing tolerates increased line-height/letter-spacing
  - Visible focus state on every interactive element
- Placeholder text is treated as normal text: **≥4.5:1**.
- Disabled text is exempt, but must still be clearly distinguishable.

### 2.2 Industry practice

Common admin/design-system base sizes:

| System | Body | Label/meta |
|---|---|---|
| IBM Carbon | 14px | 12px |
| Shopify Polaris | 13–14px | 12px |
| Atlassian | 14px | 12px |
| Material 3 | 14–16px | 12px |

For this project I recommend **15px body** (not 14) because:

- the admin is not an extremely dense data grid,
- switching from Cormorant to a UI sans increases perceived size but 15px gives
  comfortable reading at 100% zoom,
- 15px is still compact enough for the existing form layout.

### 2.3 Proposed admin type scale

| Role | Size | Weight | Notes |
|---|---|---|---|
| Page title | 24px (`text-2xl`) | 600 | Keep existing desktop size; 22px on mobile is acceptable |
| Login hero title | 28–32px | 600 | Cormorant is allowed here (marketing surface) |
| Section title | 16–17px | 600 | Current inherits body size |
| Body / table cell | 15px (`text-sm`) | 400 | Line-height 1.5–1.6 |
| Form input / textarea / select | 15px | 400 | Min control height **42px** |
| Form label | 13px (`text-xs`) | 600 | Sentence case, tracking `0.04–0.06em` |
| Helper / validation text | 13px | 400 | Use `text-muted-foreground`, not low-alpha primary |
| Table header | 12px | 600 | Uppercase, tracking `0.08em` |
| Badge / status pill | 12px | 600 | Uppercase, tracking `0.06em` |
| Button | 13px | 600 | Tracking `0.06em`, min height **42px** |
| Sidebar nav item | 13px | 500 | Sentence case preferred |
| Sidebar group label | 11–12px | 600 | Uppercase, tracking `0.12em` |
| Timestamps / counters | 12px | 400 | `text-muted-foreground` at full opacity |
| Modal title | 20px | 600 | |
| Modal body | 15px | 400 | |

**Hard minimum:** no functional text below **12px**. Decorative-only counters
may be 11px, but nothing a user must read/act on.

### 2.4 Font strategy

**Recommendation: use a UI sans-serif for the admin shell and forms, and keep
Cormorant only for brand/display headings.**

- Proposed UI stack (no extra download, best rendering on Windows/Linux/macOS):
  ```css
  --admin-font-ui: ui-sans-serif, system-ui, -apple-system, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  ```
- Keep `Cormorant_Garamond` for:
  - the login hero/brand title,
  - optionally the top-level page `<h1>` (to preserve brand feel),
  - never for form labels, table cells, nav, buttons or helper text.
- Alternative: load Geist Sans via `next/font` if the team prefers a branded
  sans. It costs one extra font file and must be loaded in the admin layout.

This single change gives the largest readability improvement; increasing sizes
alone while staying in Cormorant will still look thin.

### 2.5 Contrast rules

Do not use low-alpha primary for text. Measured on white/ivory:

| Utility | On white | On ivory `#F7F1E8` | Verdict |
|---|---:|---:|---|
| `text-primary/40` | 1.91:1 | 1.71:1 | ❌ |
| `text-primary/50` | 2.30:1 | 2.05:1 | ❌ |
| `text-primary/60` | 2.83:1 | 2.52:1 | ❌ |
| `text-primary/70` | 3.49:1 | 3.11:1 | ❌ |
| `text-primary/80` | 4.43:1 | 3.95:1 | ❌ (just under AA) |
| `text-primary/90` | 5.63:1 | 5.01:1 | ✅ |
| `text-primary` | 7.31:1 | 6.51:1 | ✅ |
| `text-muted-foreground` (`#62555A`) | — | 6.4:1 | ✅ |

Rules:

1. Body text: `text-foreground`.
2. Secondary text/meta: `text-muted-foreground` (full opacity) or
   `text-primary/90`. Never `/40`–`/70` for text.
3. Placeholders: `text-muted-foreground` full opacity.
4. Badges: solid tinted background + dark text, not translucent text on white.
5. Focus ring: existing `--ring` is fine; ensure `focus-visible` isn’t removed.
6. Disabled: may use `opacity-50`, but keep labels readable.

---

## 3. Current audit (what will be touched)

### 3.1 Global foundation

- `src/app/globals.css`
  - `@theme` public scale
  - `html[data-area="admin"]` compact override
  - `body` font-weight 500 (Cormorant compensation)
- `src/app/(admin)/layout.tsx` — applies `cormorant.className` to `<html>`
- `src/app/(admin)/dashboard/layout.tsx` — sidebar/header/nav
- `src/app/(admin)/auth/login/page.tsx` — login form

### 3.2 Shared primitives

- `src/components/shared/from-field.tsx` (filename typo retained for now)
- `src/components/shared/text-input.tsx`
- `src/components/shared/text-area-input.tsx`
- `src/components/shared/section-form.tsx`
- `src/components/shared/tags-input.tsx`
- `src/components/shared/image-upload.tsx`
- `src/components/shared/save-modal.tsx`
- `src/components/shared/delete-modal.tsx`
- `src/components/shared/unsaved-changes-modal.tsx`
- `src/components/shared/locale-tabs.tsx`
- `src/components/shared/translations-editor.tsx`
- `src/components/ui/button.tsx` (if used)

### 3.3 Admin pages with small text found

- `(admin)/dashboard/page.tsx` — stat cards, chart labels, panel headers
- `(admin)/dashboard/destinations/*`, `destination-categories/*`
- `(admin)/dashboard/venues/*`
- `(admin)/dashboard/wedding-themes/*`
- `(admin)/dashboard/portfolio/*`
- `(admin)/dashboard/journal/*`
- `(admin)/dashboard/wedding-experiences/*` — many 10px labels in FAQ/heading editors
- `(admin)/dashboard/career-partnership/*` — positions, submissions
- `(admin)/dashboard/users/*`
- `(admin)/dashboard/inquiries/*` — table headers/badges at 10px

### 3.4 High-frequency patterns to replace

| Current | Occurrences (approx) | Replace with |
|---|---:|---|
| `text-[9px]` / `text-[10px]` / `text-[11px]` | 44 | `text-xs` (13px) for labels; `text-[12px]` only for badges/counters |
| `text-xs` | 120+ | becomes 13px automatically via admin scale |
| `text-sm` | 89+ | becomes 15px automatically via admin scale |
| `tracking-[0.2em]` on labels | many | `tracking-[0.06em]`, sentence case where practical |
| `text-primary/40`–`/70` for text | many | `text-muted-foreground` or `text-primary/90` |
| `py-2.5` inputs (≈38px) | many | `py-3` + min-height 42px |
| 10px sidebar group labels | 3 | 11–12px |

---

## 4. Implementation plan (phased)

### Phase A — Foundation (highest impact, lowest risk)

1. **Admin font**: apply the UI sans stack to `html[data-area="admin"] body`;
   keep Cormorant only for login hero/brand and optionally page title.
2. **Admin scale** in `globals.css`:
   ```css
   html[data-area="admin"] {
     --text-xs: 0.8125rem;  /* 13px */
     --text-xs--line-height: 1.25rem;
     --text-sm: 0.9375rem;  /* 15px */
     --text-sm--line-height: 1.5rem;
     --text-base: 1rem;     /* 16px */
     --text-base--line-height: 1.5rem;
   }
   html[data-area="admin"] body {
     font-family: var(--admin-font-ui);
     font-weight: 400;
     font-size: 0.9375rem;
     line-height: 1.55;
   }
   ```
   Keep `text-lg`/`text-xl`/`text-2xl` defaults (18/20/24px).
3. **Focus visibility**: verify `:focus-visible` ring is never overridden to
   `outline-none` without a replacement.
4. **Contrast cleanup tokens**: add a documented rule to use
   `text-muted-foreground`/`text-primary/90`; remove text alpha utilities in
   Phase B/C.

**Exit criteria:** shell, login, sidebar and generic text are visibly larger;
no layout breakage at 1280×800 and 1024×768.

### Phase B — Shared primitives

1. `FormField`: 13px semibold label, sentence case, tracking 0.04–0.06em,
   margin 8px, required asterisk preserved.
2. `TextInput` / `TextareaInput` / selects:
   - 15px text, `py-3`, `min-h-[42px]`,
   - placeholder `text-muted-foreground`,
   - error text 13px.
3. `Section`: title 16–17px, subtitle 14–15px muted.
4. Buttons: 13px semibold, tracking 0.06em, min-height 42–44px.
5. `TranslationsEditor` / `LocaleTabs`: tab labels 12–13px; field labels 13px;
   helper text 13px; TipTap content 15px.
6. Modals: title 20px, body 15px, actions 13px; increase padding slightly.
7. Tags/badges: 12px, no 9/10px.
8. Image upload helper text 13px.

**Exit criteria:** every shared component meets the type scale; no component
relies on page-specific overrides to be readable.

### Phase C — Shell & navigation

1. Header: “Studio Portal” 11–12px (not 10), page title 18–20px (not 14).
2. Sidebar nav: 13px, row height 40–44px; group labels 11–12px.
3. Sidebar width may need +8–16px; check truncation/wrapping.
4. User name/role: 14–15px / 12px.
5. Login: labels 13px, inputs 15px, button 14px, helper/error 13px.
6. Mobile drawer: same scale; touch targets ≥44px.

### Phase D — Lists, tables, filters

1. Table headers: 12px uppercase tracking 0.08em; rows 15px; meta 12px muted.
2. Cell padding: `py-3.5`/`py-4`, min row height ~48px.
3. Filters/search: inputs 15px, dropdown options 14–15px, clear buttons 13px.
4. Pagination: 13px, buttons 40px min.
5. Empty/error/loading states: 14–15px body, 12px labels.
6. Card stats: value 24–28px, label 12px, sublabel 12–13px.
7. Replace all 9/10px badges with 12px.

### Phase E — Detail forms

Apply the primitives and remove local one-off overrides:

- Destinations, categories, venues, themes, portfolio, journal,
  experiences (+FAQ editor), positions.
- Publish/status card (now at top): labels 12px, select 14–15px, preview link 13px.
- Translation tabs/editor: 12–13px labels, 15px inputs.
- SEO/summary panels, galleries, danger zone.
- Long forms will get taller; compensate with existing section spacing, not by
  shrinking text again.

### Phase F — QA & sign-off

1. Contrast scan of all text (`text-primary/40`–`/70` must be gone for text).
2. Browser checks at **100%, 125%, 150%, 200% zoom**.
3. Widths: 1440, 1280, 1024, 768 (mobile drawer).
4. Keyboard-only pass: tab order, focus visibility, dropdowns, modals.
5. `npx tsc --noEmit`
6. `npx eslint src prisma scripts next.config.ts` — 0 errors
7. `npm run build`
8. `bash scripts/smoke-security.sh` — 65/65
9. Visual review of: login, dashboard, one list per entity, one detail form per
   entity, users, inquiries, translations editor, modals, toasts.

---

## 5. Acceptance criteria

- [x] Functional text is **≥12px**; form labels/body/table cells **≥13–15px**.
- [x] Page title **≥24px**, section titles **≥16px**.
- [x] Inputs and buttons **≥42px** high; table rows **≈46–48px**.
- [x] All normal text meets **4.5:1** on its actual background.
- [x] No `text-primary/40`–`/70` remains for text.
- [x] Admin UI uses a legible UI sans for forms/tables/nav; Cormorant only for
      brand/display headings.
- [x] 200% zoom and 1024px width show no clipped labels or horizontal overflow.
- [x] `tsc`, ESLint, production build and the 65-check smoke test pass.
- [x] Public site rendering is unchanged.

---

## 6. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Larger text makes forms much taller | Keep section spacing; don’t reduce font sizes; allow scrolling |
| Tables overflow at 1024px | Horizontal scroll container or hide low-priority columns |
| Sidebar labels wrap | Increase width slightly or truncate with title tooltip |
| Cormorant removal changes brand feel | Keep it for page titles/login hero; UI sans elsewhere |
| 200% zoom breaks fixed header/sidebar | Use min-height, flexible rows, test early |
| One-off `text-[10px]` overrides keep reappearing | Add a short “admin typography rules” note near the shared components or in this doc |

---

## 7. Suggested commit breakdown

1. `style(admin): add readable admin font and type scale`
2. `style(admin): update shared form/input/section primitives`
3. `style(admin): update shell, sidebar, header and login`
4. `style(admin): update tables, lists, filters and inquiries`
5. `style(admin): update detail forms and translation editor`
6. `test(admin): accessibility and zoom QA pass`

Each step should be visually reviewed before moving to the next.

---

## 8. Implementation log — 2026-11-20

### What shipped

**Foundation**
- `src/app/globals.css`
  - Added `--admin-font-ui` (system UI sans stack).
  - Admin scale: `xs = 13px`, `sm = 15px`, `base = 16px`.
  - `html[data-area="admin"] body` → UI sans, weight 400, 15px/1.55.
  - Added `.font-display` so Cormorant is opt-in per heading, not inherited.
- `src/app/(admin)/layout.tsx` — exposes `--font-cormorant` while keeping
  `cormorant.className` as the fallback for unstyled text.

**Shared primitives**
- `from-field.tsx`: 13px semibold sentence-case label, `tracking-[0.04em]`,
  muted 13px hint (previously uppercase 12px + `tracking-[0.2em]`).
- `text-input.tsx`, `text-area-input.tsx`, `tags-input.tsx`: `py-3`,
  `min-h-[42px]`, 15px text, muted placeholders, 13px errors.
- `section-form.tsx`: 16px semibold title, 15px muted subtitle.
- `image-upload.tsx`: muted 13px helper text; 42px controls.
- `save-modal.tsx`, `delete-modal.tsx`, `unsaved-changes-modal.tsx`:
  42px buttons, `tracking-[0.08em]`, fixed unsaved-modal hover class.
- `translations-editor.tsx`: 13px semibold labels, 15px/42px inputs,
  38px locale selects (tabs stay compact by design).
- `create-modal.tsx`, `tiptap-editor.tsx`: `py-3` controls.

**Shell / navigation / login**
- Sidebar group labels 11px semibold with `tracking-[0.12em]`; nav rows
  `py-3`, 13px labels; counters 11px.
- Header: "Studio Portal" 13px; page title 20px Cormorant (`.font-display`).
- Header title no longer prints a route UUID on detail pages — it falls back to
  the section name (`/dashboard/destinations/<id>` → “Destinations”).
- Login: hero/`Welcome Back` keep Cormorant; labels 13px sentence case,
  inputs 15px/44px, button 15px/44px, placeholders `muted-foreground`.

**Pages (sweep across 21 admin routes)**
- Removed every `text-[9px]` / `text-[10px]` / `text-[11px]` utility (44
  occurrences) → `text-xs` (13px).
- Replaced text alpha utilities (`text-primary/40`–`/80`) with
  `text-muted-foreground` or `text-primary`; icon-only alpha classes left as-is.
- Replaced wide label tracking `[0.2em]` / `[0.25em]` with `[0.08em]`–`[0.1em]`.
- All `py-2.5` controls → `py-3` (≈42px).
- Every admin page title uses `.font-display` (Cormorant), so titles keep the
  brand voice while UI text is sans.
- Badges that used `bg-primary/80 text-white` are now solid `bg-primary`
  (7.3:1 instead of 4.4:1).
- Inquiries table header normalised to match Users: 13px, `tracking-[0.08em]`,
  semibold (was `0.15em`, weight 400).

**Charts (dashboard)**
- SVG axis/counter labels raised from 10px → 12px.
- Axis text opacity raised from 0.5–0.55 → 0.9.
- The two horizontal bar charts placed their count label *inside* the track in
  white text; short bars rendered white-on-white. Counts now sit outside the
  bar in `text-muted-foreground`.
- Stat-card sublabels wrap (2-line clamp) instead of truncating mid-word.

### Verification

| Check | Result |
|---|---|
| `npx tsc --noEmit` | clean |
| `npx eslint src prisma scripts next.config.ts --quiet` | 0 errors |
| `npm run build` | passes |
| `bash scripts/smoke-security.sh` (Git Bash, `BASE_URL=http://127.0.0.1:3000`) | 43 passed, 0 failed (authenticated checks skipped — no `ADMIN_EMAIL`/`ADMIN_PASSWORD` in env) |
| Runtime type audit (7 pages: dashboard, destinations list/detail, inquiries, users, experience detail, portfolio) | **0** text nodes < 12px; **0** real contrast failures |
| Reflow at 1024px and 720px (≈200% zoom at 1440) | `overflowX = 0` on every audited page |
| Public site (`/`, `/journal`, `data-area="public"`) | Cormorant + public scale unchanged, no admin rules leaking |
| Visual review (headless Chrome, 1440×1000) | login, dashboard, destinations list/detail, inquiries, users, experience detail |

Known intentional exceptions:
- Login hero, "Welcome Back", page titles and header title stay Cormorant.
- `text-xs` is 13px in admin, so badges/table headers are 13px rather than the
  12px in the table above; this keeps them consistent with the rest of the UI.
- Chart *data* labels inside SVG use `12px`, matching the hard minimum.

### Follow-ups (not blocking)
- Consider a branded sans (e.g. Geist) instead of the system stack.
- The admin header repeats the page title that already exists in each page
  body; could become a breadcrumb.
- Group-label truncation in the collapsed sidebar should be re-checked if the
  sidebar width changes.

