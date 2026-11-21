# Manual Test Data — One Dummy Record per Entity

| | |
|---|---|
| **Purpose** | Manual QA / form testing |
| **Scope** | One representative record for every admin form and public submission form |
| **Assumption** | Testing on a local/staging database, not production |
| **Cleanup** | Delete each test record after testing |

> These are values to type into the admin forms. Slugs are generated from the
> title/name, so they are not listed as manual input. Relation fields point to
> existing records; if your local DB differs, choose any existing option with
> the same meaning.

## Shared test values

| Item | Value |
|---|---|
| Image URL | `https://res.cloudinary.com/dzerxindp/image/upload/v1767345907/Cover_1_ajxnjv.jpg` |
| Second image URL | `https://res.cloudinary.com/dzerxindp/image/upload/v1773237717/Anaz_Wijdane_105_tuda6g.png` |
| Test email | `dummy.test@example.com` |
| Test password | `TestDummy123!` |
| Test phone | `+62 812 3456 7890` |
| Future date | `2027-06-20` |
| ISO publish date | `2027-02-14T09:00:00.000Z` |

All test records should use **Published** status unless the test is specifically
about drafts.

---

## 1. Destination Category

**Admin path:** Dashboard → Destinations → Categories → Add Category

| Field | Value |
|---|---|
| Name | `Test Category` |
| Status | `Published` |
| Translations | Optional |

Expected slug: `test-category`.

Save, then verify it appears in the category dropdown on the Destination form.

---

## 2. Destination

**Admin path:** Dashboard → Destinations → Add Destination

| Field | Value |
|---|---|
| Destination Name | `Test Destination` |
| Category | Existing `Bali` category |
| Type | `Raw Coastal Simplicity` |
| Short Description | `A quiet coastal test destination for manual QA.` |
| Long Description | `This destination exists only to exercise the destination form, validation, image upload, and publish flow. It should be deleted after testing.` |
| Location | `East Bali` |
| Atmosphere | `Calm, coastal, and intentionally understated.` |
| Accessibility Notes | `Some paths are uneven; plan guest movement carefully.` |
| Seasonal Considerations | `Best tested in the dry season; avoid heavy rain periods.` |
| Guest Capacity | `5 - 60` |
| Image | Shared image URL |
| Highlights | `Quiet coastline`, `Ocean views`, `Privacy` |
| Best For | `Intimate ceremonies`, `Small celebrations` |
| Ceremony Options | `Beachfront ceremony`, `Cliffside vow exchange` |
| Reception Options | `Private villa dinner`, `Garden reception` |
| Accommodation Nearby | `Boutique villas`, `Coastal resorts` |
| Dining Experiences | `Private chef dinner`, `Seafood tasting menu` |
| Unique Features | `Direct beach access`, `Sunset-facing terrace` |
| Status | `Published` |
| Translations | Optional |

All list fields need **at least one item**.

Expected slug: `test-destination`.

---

## 3. Wedding Experience

**Admin path:** Dashboard → Wedding Experiences → Add Experience

This form is long; fill every required field.

### Identity

| Field | Value |
|---|---|
| Experience Name | `Test Experience` |
| Category | `Intimate Weddings` |
| Status | `Published` |

### Hero

| Field | Value |
|---|---|
| Hero Style | `split` |
| Hero Image | Shared image URL |
| Hero Description | `A test experience for validating the full wedding-experience editor.` |

### Intro

| Field | Value |
|---|---|
| Label | `The Setting` |
| Heading line 1 | `A quieter kind of` |
| Heading line 2 | `celebration` |
| Body | `This section tests the intro editor, lists, pair headings, and image limits.` |
| List Label | `What to expect` |
| List items | `Privacy`, `Natural light`, `Unhurried pacing` |
| Footnote | `Designed for testing only.` |
| Intro images | Shared image URL and second image URL (max 2) |

### Approach

| Field | Value |
|---|---|
| Label | `Our Approach` |
| Heading line 1 | `Thoughtful by` |
| Heading line 2 | `design` |
| Body | `A short body paragraph for the approach section.` |
| List Label | `We focus on` |
| List items | `Clear planning`, `Calm coordination` |
| Image | Shared image URL |

### Services

| Field | Value |
|---|---|
| Label | `What We Provide` |
| Heading line 1 | `From first idea` |
| Heading line 2 | `to final farewell` |
| List items | `Planning`, `Styling`, `Vendor coordination` |
| Footnote | `Test services footnote.` |
| Dark Label | `Our Values` |
| Dark Heading line 1 | `Emotion over` |
| Dark Heading line 2 | `production` |
| Dark Body | `A short dark-panel body paragraph.` |
| Dark List items | `Presence`, `Simplicity`, `Care` |

### Closing

| Field | Value |
|---|---|
| Label | `Begin Your Story` |
| Heading line 1 | `An experience` |
| Heading line 2 | `made personal` |
| Body | `Closing body copy used for manual testing.` |
| Image | Shared image URL |
| Couple Label | `Made for` |
| Couple Values | `Couple A`, `Couple B` |

### FAQ

| Field | Value |
|---|---|
| Question | `What is included in this test experience?` |
| Answer | `This FAQ exists only to verify the FAQ editor and public FAQ rendering.` |

Expected slug: `test-experience`.

---

## 4. Venue

**Admin path:** Dashboard → Venues → Add Venue

| Field | Value |
|---|---|
| Venue Name | `Test Venue` |
| Slogan | `A quiet venue for manual testing` |
| Description | `A test venue record used to verify validation, images, relations, and publishing.` |
| Hero Image | Shared image URL |
| Capacity | `80` |
| Starting Price | `15000000` |
| Destination | Existing `Test Destination` (or any destination) |
| Wedding Experience | Existing `Test Experience` (or any experience) |
| Gallery | Shared image URL, second image URL |
| Status | `Published` |

`Starting Price` must be a positive number. `0` will fail the form validation.

Expected slug: `test-venue`.

---

## 5. Wedding Theme

**Admin path:** Dashboard → Wedding Themes → Add Theme

| Field | Value |
|---|---|
| Title | `Test Theme` |
| Description | `A test theme for validating inclusions, gallery uploads, and optional venue relations.` |
| Image | Shared image URL |
| Inclusions | `Ceremony styling`, `Floral direction`, `On-site coordination` |
| Venue | Optional — leave empty or choose `Test Venue` |
| Wedding Experience | Existing `Test Experience` (or any experience) |
| Gallery | Shared image URL, second image URL |
| Status | `Published` |

Expected slug: `test-theme`.

---

## 6. Journal / Article

**Admin path:** Dashboard → Journal → New Article

| Field | Value |
|---|---|
| Title | `Test Journal Article` |
| Category | `Planning Advice` |
| Excerpt | `A short excerpt used to test the journal card and detail page.` |
| Published Date | `2027-02-14` |
| Image | Shared image URL |
| Content | See HTML below |
| Status | `Published` |

Content:

```html
<h2>Test article heading</h2>
<p>This article exists only to validate the journal editor, rich-text
sanitisation, excerpt display, and public detail page.</p>
<p>Delete it after manual testing.</p>
```

Expected slug: `test-journal-article`.

Current category enum values accepted by the API:

`Guides`, `Planning_Advice`, `Destination_Knowledge`,
`Venue_and_Location`, `Real_Weddings`, `Design_and_Concept`.

---

## 7. Portfolio

**Admin path:** Dashboard → Portfolio → Add Portfolio

| Field | Value |
|---|---|
| Couple | `Test Couple` |
| Subtitle | `A manual test portfolio story` |
| Destination | `Test Destination` or any existing destination |
| Venue | `Test Venue` or any existing venue |
| Experience | `Test Experience` or any existing experience |
| Hero Image | Shared image URL |
| Tags | `Test`, `Editorial`, `Beach` |
| Excerpt | `A short portfolio excerpt for card and detail-page testing.` |
| Origin | `Test Origin` |
| Review | `A short testimonial used for manual testing.` |
| Content | See HTML below |
| Story Sections | Heading `The day`, Body paragraph `A quiet test story for the portfolio detail page.` |
| Credit Role | `Test Planning & Design` |
| Credit Planner | `Test Planner` |
| Credit Location Detail | `Test Location, Bali` |
| Credit Couple Origin | `Test Couple — Test Origin` |
| Gallery | Shared image URL, second image URL |
| Status | `Published` |

Content:

```html
<p>This portfolio exists only to validate the portfolio editor, gallery,
relations, and public detail page.</p>
<h2>A test section</h2>
<p>Delete this record after testing.</p>
```

Story sections structure:

```json
[
  {
    "heading": "The day",
    "body": ["A quiet test story for the portfolio detail page."]
  }
]
```

Expected slug: `test-couple`.

---

## 8. Open Position

**Admin path:** Dashboard → Career & Partnership → Add Position

| Field | Value |
|---|---|
| Title | `Test Wedding Planner` |
| Employment Type | `Full-time` |
| Level | `Mid-level` |
| Description | `A test position used to verify the open-position form and public listing.` |
| Active | `Yes` |
| Status | `Published` |

Expected slug: `test-wedding-planner`.

---

## 9. Admin User

**Admin path:** Dashboard → Users → Add User

Use three separate records if testing the role matrix:

| Name | Email | Password | Role |
|---|---|---|---|
| `Test Admin` | `dummy.admin@example.com` | `TestDummy123!` | `Admin` |
| `Test Editor` | `dummy.editor@example.com` | `TestDummy123!` | `Editor` |
| `Test User` | `dummy.user@example.com` | `TestDummy123!` | `User` |

Password rules: at least 8 characters, one uppercase letter, one number.

Login test:

- Email: `dummy.editor@example.com`
- Password: `TestDummy123!`

Expected: Editor can enter the dashboard, but user-management/import-style
admin-only actions should be blocked.

---

## 10. Public Inquiry (Contact Form)

**Public path:** `/<locale>/contact`

Use camelCase field names if testing the API directly:

```json
{
  "fullName": "Test Inquiry",
  "emailOrWhatsapp": "dummy.inquiry@example.com",
  "weddingDate": "2027-06-20",
  "numberOfGuests": "80",
  "weddingLocationInterest": ["Ubud", "Uluwatu"],
  "weddingStyle": "Intimate & natural",
  "estimatedBudget": "IDR 250–500 million",
  "servicesNeeded": ["Full Planning", "Decoration & Styling"],
  "venueSecured": "Not yet",
  "yourVision": "A quiet coastal celebration with close family and friends.",
  "howDidYouFindUs": "Instagram",
  "locale": "en"
}
```

| Field | Value |
|---|---|
| Full Name | `Test Inquiry` |
| Email or WhatsApp | `dummy.inquiry@example.com` |
| Wedding Date | `2027-06-20` |
| Number of Guests | `80` |
| Location Interest | `Ubud`, `Uluwatu` |
| Wedding Style | `Intimate & natural` |
| Estimated Budget | `IDR 250–500 million` |
| Services Needed | `Full Planning`, `Decoration & Styling` |
| Venue Secured | `Not yet` |
| Your Vision | `A quiet coastal celebration with close family and friends.` |
| How Did You Find Us | `Instagram` |

Expected: inquiry is stored first, then email is sent best-effort. With
`EMAIL_DISABLED=true`, it should still appear in the admin Inquiry list.

Status transitions to test: `new → reviewed → quoted → booked → archived`.

---

## 11. Vendor Submission

**Public path:** `/<locale>/working-with-us` → Vendor inquiry form

```json
{
  "companyName": "Test Vendor Studio",
  "contactPerson": "Test Vendor Contact",
  "email": "dummy.vendor@example.com",
  "phone": "+62 812 3456 7890",
  "website": "https://example.com",
  "vendorCategory": "Photography",
  "yearsInBusiness": "5 years",
  "portfolioLink": "https://example.com/portfolio",
  "message": "A test vendor submission created for manual QA."
}
```

Expected: record appears under Career & Partnership → Vendor submissions.
Status transitions: `new → reviewed → contacted → archived`.

---

## 12. Career Submission

**Public path:** `/<locale>/working-with-us` → Career application form

```json
{
  "fullName": "Test Career Applicant",
  "email": "dummy.career@example.com",
  "phone": "+62 812 3456 7890",
  "position": "Test Wedding Planner",
  "experience": "Five years of event coordination experience.",
  "linkedIn": "https://www.linkedin.com/in/dummy-test",
  "portfolioLink": "https://example.com/career-portfolio",
  "coverLetter": "A short cover letter used only for manual testing."
}
```

Expected: record appears under Career & Partnership → Career submissions.
Status transitions: `new → reviewed → contacted → archived`.

---

## 13. Translation Smoke Check

Translations are optional in every form. To verify the translation editor and
locale fallback, use the Destination record and fill the Indonesian tab:

| Field | Value |
|---|---|
| Name | `Destinasi Uji` |
| Type | `Kesederhanaan Pesisir` |
| Description | `Destinasi pesisir untuk pengujian manual.` |
| Long Description | `Data ini hanya untuk menguji editor terjemahan dan fallback bahasa.` |
| Location | `Bali Timur` |
| Atmosphere | `Tenang dan dekat dengan alam.` |
| Guest Capacity | `5 - 60` |

Leave the other locale tabs empty. Expected: the public page falls back to
English for missing translation fields.

---

## 14. Minimum checklist after creating the records

- [ ] One category appears in the destination category dropdown.
- [ ] Destination list/detail page renders the new destination.
- [ ] Experience page renders with FAQ and section lists.
- [ ] Venue appears under its destination and experience.
- [ ] Theme appears under its experience.
- [ ] Article card and detail page render.
- [ ] Portfolio card and detail page render with gallery and story sections.
- [ ] Open position appears on the working-with-us page.
- [ ] Admin/editor/user login behaves according to role.
- [ ] Inquiry appears in the admin Inquiry list.
- [ ] Vendor and career submissions appear in the admin inbox.
- [ ] Status filter transitions work.
- [ ] Images show the admin loading spinner and then load.
- [ ] Delete every test record after testing.
