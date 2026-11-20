# Import Data from a Spreadsheet (Admin)

| | |
|---|---|
| **Status** | 📝 Discussion / design notes — no code changed |
| **Goal** | Admin downloads a template, fills it in Excel/Google Sheets, uploads it back, reviews a preview, and imports content in bulk |
| **Scope** | Admin area only; public site/API shapes unchanged |
| **Verdict** | **Feasible with the current stack.** Most of the hard work already exists (Zod schemas, Prisma, auth, cache revalidation); the real complexity is relationships, images, and translations |

---

## 1. Short answer

Yes. The project is a good fit:

- every entity already has a **Zod create schema** (`src/utils/validators.ts`),
- writes already go through **Prisma** with nested translation helpers,
- admin routes already enforce **JWT auth + role checks + CSRF**,
- public cache invalidation is a single call (`revalidatePublicContent()`),
- images are stored locally and referenced by URL (`/uploads/...`).

A spreadsheet import is essentially:

```
file → parse rows → map columns → validate with the same Zod schema
     → resolve relations (slug → id) → preview → transaction → revalidate
```

No new architecture is required. The work is in the import layer, the template,
and the review UI.

---

## 2. What already helps

| Piece | Where | Reuse |
|---|---|---|
| Entity validation | `src/utils/validators.ts` | Parse each row with `createXSchema` |
| Slug generation | `src/utils/slug.ts` (`toSlug`) | Auto-fill slug when blank |
| Nested translations | `src/lib/content/translations.ts` | `translationsCreate()` after mapping |
| Publication fields | `publicationFields(status)` | Set `published_at` correctly |
| Unique-slug error | `handleError()` maps Prisma `P2002` → 409 | Row-level “slug already exists” |
| Public cache bust | `revalidatePublicContent()` | Call once after commit |
| Auth | `requireAuth` / `requireRole` | Admin-only import routes |
| Image storage | `src/lib/uploads.ts` | Template accepts existing `/uploads/...` URLs |
| Admin UI patterns | existing list/detail pages, `save-modal`, toasts | Preview screen + confirm flow |

---

## 3. What makes it non-trivial

| Issue | Why | Proposed handling |
|---|---|---|
| Relations | Venues need destination + experience IDs; themes need experience; portfolios need optional relations | Import by **slug**, resolve to IDs server-side |
| Images | Images are files, not cell values | v1: URL column only (existing `/uploads/...` or public `https://`); v2: ZIP + manifest |
| Translations | 5 locales × many fields per entity | Optional second sheet in long format (`ref_slug, locale, field, value`) |
| Nested JSON | `highlights`, `inclusions`, `story_sections`, `credit` | v1: `|`-separated cells; complex objects as JSON cells |
| Rich text | Articles/portfolio content is TipTap HTML | v1: plain text/markdown or sanitized HTML; never trust raw HTML |
| Arrays are required | e.g. destination `highlights` needs ≥1 item | Template marks them required; empty cell = validation error |
| Slug collisions | Unique in DB | Create-only by default; optional explicit “update existing” mode |
| Ordering | Venue cannot exist before its destination | Process sheets in dependency order inside one transaction |

---

## 4. File format decision

### Option A — CSV only (fastest)

- Template `.csv` (UTF-8 with BOM so Excel reads accents/CJK correctly).
- Import with `papaparse` (quote/newline safe).
- No new heavy dependency; works with Excel, Google Sheets, Numbers.
- Weaknesses: no dropdown validation, no instructions sheet, one table per file,
  Excel may mangle slugs/dates/long numbers, and users often save as `.xlsx`.

### Option B — XLSX only (nicer UX) ✅ recommended

- `exceljs` (MIT, maintained) on the server:
  - generate a styled template with an **Instructions** tab, **Reference** tab,
    dropdown validations, frozen header, text-formatted slug/URL columns,
  - parse `.xlsx` on upload (never bundle it into the client).
- Adds one server dependency and a Node-runtime route (`runtime = "nodejs"`).
- Avoid `xlsx`/SheetJS from npm: the npm build is old and has known issues;
  current releases are distributed outside npm.

### Option C — XLSX template + accept CSV too

- Same parser entry point, two readers (`exceljs` / `papaparse`).
- Most user-friendly; small extra cost (~1 day).
- **Recommendation: start with B, add CSV if users ask.** Google Sheets can
  “Download as .xlsx”, so XLSX covers that workflow.

> Template files should be generated **per entity** (one workbook per import
> type), not one giant workbook. Simpler validation, clearer errors, smaller
> transactions.

---

## 5. Template design

Example for **Destinations** (one row per destination, data starts row 1):

| Column | Required | Notes |
|---|---|---|
| `name` | ✅ | 2–255 chars |
| `slug` | optional | Auto-generated from `name` if blank; lowercase-kebab |
| `category_slug` | ✅ | Must exist in **Reference** tab |
| `type` | ✅ | free text today (e.g. “Raw Coastal Simplicity”) |
| `description` | ✅ | short card text |
| `long_description` | ✅ | full page text |
| `location` | ✅ | |
| `atmosphere` | ✅ | |
| `accessibility_notes` | ✅ | |
| `seasonal_considerations` | ✅ | |
| `guest_capacity` | ✅ | free text (e.g. “5 – 60”) |
| `image_url` | ✅ | `/uploads/...` or public `https://...` |
| `highlights` | ✅ | `A \| B \| C` |
| `best_for` | ✅ | `A \| B \| C` |
| `ceremony_options` | ✅ | `A \| B \| C` |
| `reception_options` | ✅ | `A \| B \| C` |
| `accommodation_nearby` | ✅ | `A \| B \| C` |
| `dining_experiences` | ✅ | `A \| B \| C` |
| `unique_features` | ✅ | `A \| B \| C` |
| `status` | optional | `draft` (default) / `published` |

**Venues** are similarly small:

`slug`, `name`, `slogan`, `description`, `image_url`, `capacity` (int),
`starting_price` (number), `destination_slug`, `experience_slug`, `status`.

**Experiences, themes, portfolios, articles** are much wider (30–50 fields,
nested arrays/pairs). They should be a later phase, not the MVP.

### Workbook tabs

1. **Instructions** — what each column means, delimiters, required fields,
   one example row, common mistakes.
2. **Data** — empty table with validations; one row per record.
3. **Reference** — generated from the DB at download time:
   `category_slug | category_name`, `destination_slug | destination_name`,
   `experience_slug | experience_name`, `venue_slug | venue_name`.
4. **Lists** (hidden) — powers dropdown validation.
5. **Translations** (optional) — see §8.
6. Hidden `__meta` cell/sheet: `template_version`, `entity`, `generated_at`.

**Header strategy:** row 1 = human label (`Destination name`), row 2 = machine
key (`name`), data starts row 3. Parsing uses row 2, so labels can change
without breaking imports. CSV fallback uses machine keys directly.

**Do not pre-fill example data in the Data tab** — users forget to delete it.
Put the example in Instructions and reference sheets only.

---

## 6. Import pipeline

```
[Download template]  GET  /api/imports/[entity]/template
        │
        ▼
[Upload & preview]   POST /api/imports/[entity]/preview   (multipart file)
        │  parse → map → validate → resolve slugs
        │  returns { rows: [{ rowNumber, data, errors[], warnings[] }] }
        ▼
[Review screen]      admin sees per-row status, counts, first N errors
        │
        ▼
[Commit]             POST /api/imports/[entity]/commit    (JSON normalized rows)
                     re-validate → transaction → revalidatePublicContent()
```

Why two calls:

- preview never writes to the DB,
- commit re-validates and never trusts the client,
- no temporary files/tokens needed on the server,
- the same code path can power a future CLI import.

**Single-endpoint alternative:** `?dryRun=1` on one route. Simpler, but the file
is uploaded twice (once to preview, once to commit). Fine for ≤5 MB, but the
two-endpoint flow is cleaner and the preview JSON doubles as an error report.

### Suggested module layout

```
src/lib/import/
  types.ts            # ImportRow, ImportResult, ImportContext
  workbook.ts         # exceljs read/write, header mapping, meta version
  columns.ts          # per-entity column definitions (key, label, required)
  resolve.ts          # slug → id maps, cached per request
  validate.ts         # shared row validation + Zod error flattening
  destinations.ts     # entity adapter: mapRow → Prisma data
  venues.ts
  index.ts            # registry: entity → adapter
src/app/api/imports/[entity]/route.ts   # preview + commit, or split
src/app/(admin)/dashboard/import/page.tsx
```

Each adapter implements:

```ts
interface ImportAdapter<T> {
  entity: string;
  columns: ColumnDef[];
  mapRow(row: Record<string, string>, ctx: ImportContext): T; // normalized DTO
  validate(row: T): ZodResult;
  create(row: T, tx: PrismaTransaction): Promise<void>;
  templateContext(): Promise<TemplateContext>; // reference data
}
```

This keeps one review UI and one workbook builder for every entity.

---

## 7. Validation & errors

- Reuse the **exact** `createXSchema` so import and the normal form accept the
  same data.
- Validate per row; collect **all** errors instead of failing on the first.
- Return:
  ```json
  {
    "row": 14,
    "field": "highlights",
    "message": "Expected at least 1 item",
    "value": ""
  }
  ```
- Map Zod issues to `path.join(".")` (already the API convention).
- Track 3 states: `valid`, `warning`, `error`.
  - warning = slug auto-generated, duplicate `name`, unknown optional reference.
  - error = required missing, invalid number/URL, relation not found.
- Show a summary (“48 valid, 2 with errors”) and let the user download an
  **error report** (same columns + `_errors` column) to fix and re-upload.
- Empty cells: treat as `undefined` for optional fields; required fields produce
  a clear “required” error, never a silent default.
- Numbers: `capacity` must be a positive integer, `starting_price` positive.
  Accept `1,500` / `1.500` only if you deliberately normalise; otherwise ask
  for plain `1500` and say so in Instructions.

---

## 8. Translations

Two choices:

**A. Long-format sheet (recommended)**

| entity | ref_slug | locale | field | value |
|---|---|---|---|---|
| destination | amed | de | description | … |
| destination | amed | de | highlights | A \| B \| C |

- Easy to add fields without new columns.
- Matches `translationsCreate(entity, { [locale]: {…} })`.
- Locale codes: `id`, `zh`, `fr`, `ja`, `de` (English is the base table).

**B. Wide columns** (`name_id`, `name_zh`, …) — friendlier for one entity but
explodes for experiences (5 locales × 25 fields) and is brittle.

**MVP recommendation:** skip translations entirely. Import English/base content
first, then translate in the existing translation editor. Add sheet §A in phase 3.

---

## 9. Images

v1 (recommended):

- One `image_url` column per record, plus optional `gallery_urls`
  (`url1 | url2 | url3`) for venues/themes/portfolios.
- Accept:
  - existing local paths (`/uploads/2026/…jpg`),
  - public `https://…` URLs.
- **Do not download remote images server-side in v1.** That turns the importer
  into an SSRF surface and bypasses `uploads.ts` size/type checks.
- Validate extension and require `https` (block `http`, `file:`, `data:`).
- Remind users that the public site CSP only renders images from
  `res.cloudinary.com`, `placehold.net`, Google, and self — arbitrary hotlinks
  will be blocked by the browser. Prefer uploading images to the media library
  first and pasting the resulting `/uploads/...` path.

v2 (optional):

- Upload a ZIP: `images/…` + the workbook referencing relative filenames.
- Server unzips into a temp dir, validates each file with the same magic-byte
  checks as `saveImage`, then creates DB rows.
- Must guard zip bombs (entry count, total uncompressed size, path traversal).

---

## 10. Nested / JSON fields

| Field type | Cell format | Example |
|---|---|---|
| `string[]` | `|` separated | `Beach \| Cliff \| Jungle` |
| `[string, string]` (headings) | exactly one `|` | `A quieter kind of luxury\|Designed around you` |
| `tags` | `|` separated | `Editorial \| Beach` |
| `story_sections` (portfolio) | JSON cell | `[{"heading":"…","body":["…"]}]` |
| `credit` (portfolio) | 4 columns | `credit_role`, `credit_planner`, … |
| `content` (article/portfolio) | text or sanitized HTML | keep HTML minimal |

Rules:

- Document the delimiter in Instructions; escape a literal `|` as `\|` (or use
  `;` if `|` is common in copy).
- Reject JSON cells that are not valid JSON with a row-level error.
- Run rich text through `sanitizeRichText` on write (already done by the
  translation helper; do the same for base fields if HTML is accepted).

---

## 11. Conflict & update policy

Default: **create only**.

| Mode | Behaviour | Recommendation |
|---|---|---|
| Create only | Duplicate slug → row error | MVP default (safest) |
| Upsert by slug | Create new, update matching | Phase 2, behind an explicit checkbox + preview diff |
| Update only | Unknown slug → row error | Useful for bulk edits |
| Delete | Never supported | Keep deletes manual |

Never silently overwrite existing content. If upsert is added, the preview must
show “will update: 12, will create: 8” and list changed fields per row.

---

## 12. Transactions & performance

- One import = one **interactive Prisma transaction** per entity.
- Create parents first, then nested rows (`translations`, `gallery`, FAQs).
- `createMany` for image rows after the parent IDs exist.
- Chunk large imports (100 rows) but keep the **all-or-nothing** promise for
  MVP; a partially imported catalogue is worse than a failed import.
- Prisma’s default interactive-transaction timeout is 5 s; raise it explicitly
  (`timeout: 30_000`) and cap rows (suggest **500 per file**) so it stays fast.
- Resolve slug → id maps **once** per request (`Map<string, string>`), not per row.
- Call `revalidatePublicContent()` **once** after commit.
- Import route should be `runtime = "nodejs"` and rate-limited
  (`consumeRateLimit`, e.g. 5 imports/10 min per IP).

---

## 13. Security checklist

- `requireAuth` + `requireRole(payload, "admin")` (consider editor read-only
  preview if desired; bulk writes are admin territory).
- CSRF already enforced by middleware for mutating requests.
- Validate file type by **magic bytes**, not only extension/MIME:
  - `.xlsx` starts with `PK\x03\x04`,
  - reject `.xls`, `.xlsm`, macro-enabled files.
- Max upload size: reuse `MAX_UPLOAD_SIZE_MB` (5 MB default) or a dedicated
  `MAX_IMPORT_SIZE_MB`.
- Max rows / max cell length (e.g. 50k chars, matching Zod limits).
- **CSV/formula injection:** when generating error reports or templates, prefix
  cells starting with `=`, `+`, `-`, `@` so Excel does not execute them.
- Never echo raw file contents into HTML; the preview renders text nodes.
- Sanitize any accepted HTML (`sanitizeRichText`).
- No remote image fetching (SSRF), as above.
- Do not accept `id` columns from users; resolve by slug. Prevents overwriting
  arbitrary records by guessing IDs.
- Log the commit (admin id, entity, rows created, duration) to the server log;
  an `ImportLog` table is optional v2.

---

## 14. Admin UX

Entry points:

- Primary: **Dashboard → Import** page with a card per entity.
- Secondary: “Import” button on each list page header, pre-selecting that entity.

Flow:

1. Entity + short explanation + **Download template**.
2. Drop zone / file picker (`.xlsx`, optional `.csv`).
3. Parsing state → preview table:
   - green/amber/red row status,
   - “48 valid · 2 errors · 0 warnings”,
   - error list with row + column,
   - **Download error report**.
4. Confirm dialog (reuse `SaveModal`) with the counts and “create only” mode.
5. Success toast + link to the list page, which is already revalidated.

Typing rules: the admin typography scale applies (inputs 15px, labels 13px,
tables 15px) — reuse the primitives already improved.

---

## 15. Recommended scope & estimate

### MVP (1.5–2 weeks)

- Entities: **Destination Categories → Destinations → Venues**
- XLSX template + import, **create only**
- Image URL column (local `/uploads` or `https`)
- Arrays via `|`
- Preview + per-row errors + error report
- Admin-only, 500-row cap, transaction, cache revalidation
- No translations, no upsert, no ZIP images

Effort breakdown: parser/template 3–4 d, adapters 2–3 d, preview UI 3–4 d,
security/tests 2 d.

### Phase 2 (1–2 weeks)

- **Wedding Themes** and **Wedding Experiences** (wide sheets, pairs, FAQs)
- CSV support
- Upsert-by-slug with diff preview

### Phase 3 (1–2 weeks)

- Translations long-format sheet
- Portfolio + Articles (rich text, story sections, galleries)
- ZIP image import
- Import history / audit table
- Export current data for round-trip edits

**Full coverage: roughly 4–6 weeks of focused work.** The MVP delivers most of
the value because destinations/venues are the bulk of the catalogue.

---

## 16. Testing plan

- Unit: header mapping, delimiter parsing, slug resolution, error flattening.
- Fixtures: valid file, missing required cell, duplicate slug, unknown
  `category_slug`, invalid number, invalid URL, formula-injection cell,
  oversized file, `.xlsm` file, 500-row file.
- Integration: preview returns no DB writes; commit is atomic (force an error
  on row N and assert zero rows created); `revalidatePublicContent` called once.
- Smoke additions: unauthenticated import → 401; editor (if blocked) → 403;
  oversized upload → 413/400.
- Manual: LibreOffice + Excel + Google Sheets export, Windows/UTF-8 accents,
  CJK text, 125%/200% zoom on the preview table.

---

## 17. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Users paste arbitrary image URLs | Broken images on public site (CSP) | Validate scheme + document `/uploads` preference |
| Excel auto-formats slugs/dates | Silent data corruption | Text-format columns in template; validate slugs strictly |
| 500-row transaction timeout | Import fails after minutes | Cap rows, chunk reads, 30 s timeout, clear error |
| Partial imports | Duplicate/missing content | All-or-nothing transaction for MVP |
| Translations confuse users | Wrong-locale copy | Skip in MVP; long-format sheet later |
| Template drifts from schema | Valid forms, invalid imports | Single `columns.ts` + Zod as source of truth; template version check |
| CSV formula injection | Malicious spreadsheet execution | Prefix dangerous cells; never export raw user text unescaped |

---

## 18. Decisions needed

1. **Entities for v1** — confirm Destinations + Venues (plus Categories)?
2. **Format** — XLSX only, or XLSX + CSV?
3. **Who can import** — admin only, or admin + editor?
4. **Existing records** — create-only for v1, or upsert by slug from day one?
5. **Images** — URL column only, or ZIP upload in v1?
6. **Translations** — skip in v1?
7. **Row limit** — 500 per file acceptable?
8. **Import history** — needed for audit, or server logs enough?

---

## 19. Non-goals

- Editing the public site’s data model or API response shapes.
- Importing users, inquiries, submissions, or any PII.
- Importing images as binary data inside the spreadsheet.
- Autonomic sync with Google Sheets (no OAuth, no scheduled pull).
- Deleting records via import.
- Replacing the existing create/edit forms — import is an additional path.
