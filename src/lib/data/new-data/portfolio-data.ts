import { Portfolio } from "@/lib/types/new-strucutre";


export const portfolioItems: Portfolio[] = [
  // ─── 1. Anaz & Jane ──────────────────────────────────────────────────────────
  {
    id: "1",
    slug: "anaz-jane-tegalalang",
    couple: "Anaz & Jane",
    subtitle:
      "A Post-Wedding Journey Through the Rice Terraces of Tegalalang, Bali",
    destinationId: "1",
    venueId: "1",
    experienceId: "1",
    heroImage: "https://placehold.net/default.svg",
    galleryImages: [
      "https://placehold.net/default.svg",
      "https://placehold.net/default.svg",
      "https://placehold.net/default.svg",
      "https://placehold.net/default.svg",
      "https://placehold.net/default.svg",
      "https://placehold.net/default.svg",
    ],
    tags: ["Post-Wedding", "Rice Terraces", "Editorial"],
    excerpt:
      "Traveling from Morocco to Bali, Anaz and Jane discovered a quiet continuation of their wedding day amid Tegalalang's emerald rice terraces — a meeting point of Moroccan heritage and Balinese nature.",
    origin: "Morocco",
    review: "",
    // ── TipTap HTML ────────────────────────────────────────────────────────────
    // Edit this field from the admin CMS. The `storySections` array below is
    // kept as an empty fallback; `content` always takes rendering priority.
    content: `
<p>There are moments that do not ask to be staged. They simply ask to be felt.</p>
<p>For Anaz and Jane, their post-wedding experience in Bali was never meant to replicate a wedding day. It was designed as a quiet continuation of it — a space to breathe, to wander, and to be present together after the celebration had passed.</p>
<p>Traveling from Morocco to Bali, they were drawn not only to the island's beauty, but to its rhythm. To the way nature unfolds slowly. To the way silence carries meaning. To the way light moves across landscape.</p>
<p>We curated their post-wedding journey in Tegalalang, where layers of emerald rice fields flow gently across the hills of Ubud, creating one of Bali's most poetic natural environments.</p>

<h2>Where the Landscape Becomes the Story</h2>
<p>Tegalalang is not simply a location. It is a living composition of water, earth, and light.</p>
<p>Here, the morning air is cool. The fields breathe. The sound of wind and distant water replaces conversation.</p>
<p>It was in this atmosphere that Anaz and Jane stepped into their post-wedding session — not as newlyweds posing for photographs, but as two people allowing themselves to be part of the landscape.</p>
<p>There was no rush. No performance. Only movement, presence, and quiet connection.</p>
<p>Their walk through the terraces unfolded naturally — bare moments of laughter, gentle pauses, and shared stillness as the light softened across the fields.</p>

<h2>A Post-Wedding Experience, Not a Photoshoot</h2>
<p>At Linda Wiryani Design and Event Planning, we design post-wedding experiences as emotional journeys rather than photography sessions.</p>
<p>For Anaz and Jane, the intention was never about dramatic styling or elaborate setups. It was about creating space for intimacy, allowing their connection to exist within a setting that felt grounded, poetic, and alive.</p>
<p>The rice terraces became both backdrop and witness. The softness of their wardrobe echoed the natural palette around them. The simplicity of their presence allowed the environment to lead. The camera followed quietly.</p>

<h2>Between Morocco and Bali</h2>
<p>Coming from Morocco, a land of deep texture, history, and color, Anaz and Jane found an unexpected familiarity in Bali's landscapes.</p>
<p>Different in form, yet similar in spirit. Both cultures hold a reverence for land. Both understand beauty as something lived, not displayed.</p>
<p>Their post-wedding journey became a meeting point between worlds — where Moroccan heritage and Balinese nature quietly coexisted within the same frame.</p>

<h2>A Memory That Lives Beyond the Images</h2>
<p>What remains from Anaz and Jane's time in Tegalalang is not only the imagery — but the feeling.</p>
<p>The feeling of walking without destination. Of listening instead of speaking. Of letting a place shape a moment.</p>
<p>Their post-wedding story is a reminder that the most meaningful experiences often happen not in ceremony, but in the spaces after — when the world softens and something real has room to appear.</p>
    `.trim(),
    // ── Structured fallback (kept empty — content field is used instead) ───────
    storySections: [],
    credit: {
      role: "Post-Wedding Experience & Creative Direction",
      planner: "Linda Wiryani Design and Event Planning",
      locationDetail: "Tegalalang Rice Terraces, Ubud, Bali",
      coupleOrigin: "Anaz & Jane — Morocco",
    },
  },

  // ─── 2. Sofia & James ────────────────────────────────────────────────────────
  {
    id: "2",
    slug: "sofia-james-uluwatu-cliff",
    couple: "Sofia & James",
    subtitle: "A Clifftop Ceremony Above the Indian Ocean",
    destinationId: "2",
    venueId: "2",
    experienceId: "2",
    heroImage: "https://placehold.net/default.svg",
    galleryImages: Array(6).fill("https://placehold.net/default.svg"),
    tags: ["Clifftop", "Ocean", "Sunset"],
    excerpt:
      "Against the dramatic backdrop of Uluwatu's limestone cliffs, Sofia and James exchanged vows as golden light spilled across the Indian Ocean — a celebration both intimate and awe-inspiring.",
    content: `
<p>Against the dramatic backdrop of Uluwatu's limestone cliffs, Sofia and James exchanged vows as golden light spilled across the Indian Ocean.</p>
<p>A celebration both intimate and awe-inspiring — designed around the natural theatre of place.</p>
    `.trim(),
    storySections: [],
    credit: {
      role: "Wedding Design & Event Planning",
      planner: "Linda Wiryani Design and Event Planning",
      locationDetail: "Uluwatu Clifftop, Bali",
      coupleOrigin: "Sofia & James",
    },
  },

  // ─── 3. Mei & Thomas ─────────────────────────────────────────────────────────
  {
    id: "3",
    slug: "mei-thomas-private-villa-canggu",
    couple: "Mei & Thomas",
    subtitle: "An Intimate Garden Ceremony in Canggu",
    destinationId: "3",
    venueId: "3",
    experienceId: "3",
    heroImage: "https://placehold.net/default.svg",
    galleryImages: Array(6).fill("https://placehold.net/default.svg"),
    tags: ["Private Villa", "Garden", "Intimate"],
    excerpt:
      "Surrounded by tropical gardens and close friends, Mei and Thomas chose Canggu's relaxed energy as the backdrop for a day that felt wholly and beautifully their own.",
    content: `
<p>Surrounded by tropical gardens and the people they love most, Mei and Thomas chose Canggu's relaxed energy as the setting for a day that felt wholly and beautifully their own.</p>
<p>Nothing was templated. Everything was intentional.</p>
    `.trim(),
    storySections: [],
    credit: {
      role: "Wedding Design & Event Planning",
      planner: "Linda Wiryani Design and Event Planning",
      locationDetail: "Private Villa, Canggu, Bali",
      coupleOrigin: "Mei & Thomas",
    },
  },

  // ─── 4. Clara & Rafael ───────────────────────────────────────────────────────
  {
    id: "4",
    slug: "clara-rafael-nusa-penida",
    couple: "Clara & Rafael",
    subtitle: "Elopement on the Edge of the World",
    destinationId: "4",
    venueId: "4",
    experienceId: "4",
    heroImage: "https://placehold.net/default.svg",
    galleryImages: Array(6).fill("https://placehold.net/default.svg"),
    tags: ["Elopement", "Clifftop", "Remote"],
    excerpt:
      "Clara and Rafael chose Nusa Penida's wild coastline as witness — an elopement pared down to its most essential truth: presence, connection, and the vast blue horizon.",
    content: `
<p>Clara and Rafael chose Nusa Penida's wild coastline as witness — an elopement pared down to its most essential truth.</p>
<p>Presence. Connection. And the vast blue horizon stretching endlessly before them.</p>
    `.trim(),
    storySections: [],
    credit: {
      role: "Elopement Design & Creative Direction",
      planner: "Linda Wiryani Design and Event Planning",
      locationDetail: "Kelingking Beach, Nusa Penida, Bali",
      coupleOrigin: "Clara & Rafael",
    },
  },

  // ─── 5. Amara & Luca ─────────────────────────────────────────────────────────
  {
    id: "5",
    slug: "amara-luca-seminyak-villa",
    couple: "Amara & Luca",
    subtitle: "Multi-Day Luxury Celebration in Seminyak",
    destinationId: "5",
    venueId: "5",
    experienceId: "5",
    heroImage: "https://placehold.net/default.svg",
    galleryImages: Array(6).fill("https://placehold.net/default.svg"),
    tags: ["Luxury", "Multi-Day", "Villa Estate"],
    excerpt:
      "Across three days of curated celebrations, Amara and Luca welcomed their guests to a Seminyak estate where each moment — from welcome gathering to farewell brunch — was thoughtfully orchestrated.",
    content: `
<p>Across three days of curated celebrations, Amara and Luca welcomed their guests to a Seminyak estate where each moment was thoughtfully orchestrated.</p>
<p>From the welcome gathering at dusk to the farewell brunch in morning light — every detail carried the same intention: to make each guest feel held within something meaningful.</p>
    `.trim(),
    storySections: [],
    credit: {
      role: "Luxury Wedding Design & Multi-Day Event Planning",
      planner: "Linda Wiryani Design and Event Planning",
      locationDetail: "Luxury Villa Estate, Seminyak, Bali",
      coupleOrigin: "Amara & Luca",
    },
  },

  // ─── 6. Hana & Ben ───────────────────────────────────────────────────────────
  {
    id: "6",
    slug: "hana-ben-east-bali",
    couple: "Hana & Ben",
    subtitle: "A Riverside Ceremony Among Sacred Temples",
    destinationId: "6",
    venueId: "6",
    experienceId: "6",
    heroImage: "https://placehold.net/default.svg",
    galleryImages: Array(6).fill("https://placehold.net/default.svg"),
    tags: ["Riverside", "Valley", "Sacred"],
    excerpt:
      "In the lush Sidemen Valley, Hana and Ben found a setting that felt untouched by time — rice paddies, river song, and the quiet presence of Mount Agung framing every frame.",
    content: `
<p>In the lush Sidemen Valley of East Bali, Hana and Ben found a setting that felt untouched by time.</p>
<p>Rice paddies stretched toward the horizon. River song replaced music. And the quiet presence of Mount Agung framed every moment with a stillness that needed no words.</p>
    `.trim(),
    storySections: [],
    credit: {
      role: "Wedding Design & Event Planning",
      planner: "Linda Wiryani Design and Event Planning",
      locationDetail: "Sidemen Valley, East Bali",
      coupleOrigin: "Hana & Ben",
    },
  },

  // ─── Add future portfolio items below ────────────────────────────────────────
  // For new items, populate the `content` field with TipTap-serialised HTML
  // from the admin editor. The `storySections` field can be left as [].
];