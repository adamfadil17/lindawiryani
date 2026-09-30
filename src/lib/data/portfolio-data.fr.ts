import { Portfolio } from "@/types";

export const portfolioItems: Portfolio[] = [
  // ─── 1. Anaz & Jane ──────────────────────────────────────────────────────────
  {
    id: "1",
    slug: "anaz-jane-tegalalang",
    couple: "Anaz & Jane",
    subtitle:
      "Un voyage post-mariage à travers les rizières en terrasses de Tegalalang, à Bali",
    destination_id: "2",
    venue_id: "1",
    experience_id: "3",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773237717/Anaz_Wijdane_105_tuda6g.png",
    gallery: [
      {
        id: "1-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1773237709/Anaz_Wijdane_165_ao3tfo.png",
        sort_order: 0,
        portfolio_id: "1",
      },
      {
        id: "1-img-2",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1773237715/instagram4_kdks4e.png",
        sort_order: 1,
        portfolio_id: "1",
      },
      {
        id: "1-img-3",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1773708619/Anaz_Jane_102_eqb8ne.png",
        sort_order: 2,
        portfolio_id: "1",
      },
      {
        id: "1-img-4",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1773237700/Anaz_Wijdane_50_v5ndzy.png",
        sort_order: 3,
        portfolio_id: "1",
      },
      {
        id: "1-img-5",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1773237701/Anaz_Wijdane_48_frybgq.png",
        sort_order: 4,
        portfolio_id: "1",
      },
      {
        id: "1-img-6",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1773237697/Anaz_Wijdane_15_xdxmw7.png",
        sort_order: 5,
        portfolio_id: "1",
      },
    ],
    tags: ["Post-mariage", "Rizières en terrasses", "Éditorial"],
    excerpt:
      "Venus du Maroc jusqu'à Bali, Anaz et Jane ont découvert un paisible prolongement de leur jour de mariage au cœur des rizières en terrasses émeraude de Tegalalang — un point de rencontre entre l'héritage marocain et la nature balinaise.",
    origin: "Maroc",
    review: "",
    // ── TipTap HTML ────────────────────────────────────────────────────────────
    // Edit this field from the admin CMS. The `storySections` array below is
    // kept as an empty fallback; `content` always takes rendering priority.
    content: `
<p>Il est des moments qui ne demandent pas à être mis en scène. Ils demandent simplement à être ressentis.</p>
<p>Pour Anaz et Jane, leur expérience post-mariage à Bali n'a jamais été pensée pour reproduire le jour de leur mariage. Elle a été conçue comme un prolongement paisible de celui-ci — un espace pour respirer, flâner et être présents l'un à l'autre une fois la fête passée.</p>
<p>Venus du Maroc jusqu'à Bali, ils ont été attirés non seulement par la beauté de l'île, mais aussi par son rythme. Par la lenteur avec laquelle la nature se déploie. Par le sens que porte le silence. Par la façon dont la lumière glisse sur le paysage.</p>
<p>Nous avons conçu leur voyage post-mariage à Tegalalang, où des strates de rizières émeraude ondulent doucement sur les collines d'Ubud, dessinant l'un des environnements naturels les plus poétiques de Bali.</p>

<h2>Quand le paysage devient l'histoire</h2>
<p>Tegalalang n'est pas simplement un lieu. C'est une composition vivante d'eau, de terre et de lumière.</p>
<p>Ici, l'air du matin est frais. Les champs respirent. Le bruit du vent et de l'eau lointaine remplace la conversation.</p>
<p>C'est dans cette atmosphère qu'Anaz et Jane ont commencé leur séance post-mariage — non pas en jeunes mariés posant pour des photos, mais en deux personnes qui se laissent devenir une part du paysage.</p>
<p>Pas de précipitation. Pas de performance. Seulement le mouvement, la présence et une connexion silencieuse.</p>
<p>Leur promenade à travers les terrasses s'est déroulée naturellement — des rires sans retenue, de douces pauses et un calme partagé tandis que la lumière s'adoucissait sur les champs.</p>

<h2>Une expérience post-mariage, pas un shooting</h2>
<p>Chez Linda Wiryani Design and Event Planning, nous concevons les expériences post-mariage comme des voyages émotionnels plutôt que comme des séances photo.</p>
<p>Pour Anaz et Jane, l'intention n'a jamais été un stylisme spectaculaire ou des mises en scène élaborées. Il s'agissait de créer un espace d'intimité, de laisser leur lien exister dans un cadre ancré, poétique et vivant.</p>
<p>Les rizières en terrasses sont devenues à la fois toile de fond et témoin. La douceur de leurs tenues faisait écho à la palette naturelle qui les entourait. La simplicité de leur présence a laissé l'environnement mener la danse. L'appareil photo suivait en silence.</p>

<h2>Entre le Maroc et Bali</h2>
<p>Venant du Maroc, une terre aux textures, à l'histoire et aux couleurs profondes, Anaz et Jane ont trouvé dans les paysages de Bali une familiarité inattendue.</p>
<p>Différents par la forme, semblables par l'esprit. Les deux cultures vouent un respect à la terre. Toutes deux conçoivent la beauté comme quelque chose que l'on vit, et non que l'on exhibe.</p>
<p>Leur voyage post-mariage est devenu un point de rencontre entre deux mondes — où l'héritage marocain et la nature balinaise coexistent en silence dans un même cadre.</p>

<h2>Un souvenir qui vit au-delà des images</h2>
<p>Ce qui reste du séjour d'Anaz et Jane à Tegalalang, ce ne sont pas seulement les images — c'est le ressenti.</p>
<p>Celui de marcher sans destination. D'écouter plutôt que de parler. De laisser un lieu façonner un instant.</p>
<p>Leur histoire post-mariage nous rappelle que les expériences les plus significatives surviennent souvent non pas pendant la cérémonie, mais dans les espaces qui suivent — quand le monde s'adoucit et que quelque chose de vrai a la place d'apparaître.</p>
    `.trim(),
    // ── Structured fallback (kept empty — content field is used instead) ───────
    story_sections: [],
    credit_role: "Expérience post-mariage et direction créative",
    credit_planner: "Linda Wiryani Design and Event Planning",
    credit_location_detail: "Rizières en terrasses de Tegalalang, Ubud, Bali",
    credit_couple_origin: "Anaz & Jane — Maroc",
  },

  //   // ─── 2. Sofia & James ────────────────────────────────────────────────────────
  //   {
  //     id: "2",
  //     slug: "sofia-james-uluwatu-cliff",
  //     couple: "Sofia & James",
  //     subtitle: "A Clifftop Ceremony Above the Indian Ocean",
  //     destination_id: "2",
  //     venue_id: "2",
  //     experience_id: "2",
  //     image: "https://placehold.net/default.svg",
  //     gallery: [
  //       { id: "2-img-1", url: "https://placehold.net/default.svg", sort_order: 0, portfolio_id: "2" },
  //       { id: "2-img-2", url: "https://placehold.net/default.svg", sort_order: 1, portfolio_id: "2" },
  //       { id: "2-img-3", url: "https://placehold.net/default.svg", sort_order: 2, portfolio_id: "2" },
  //       { id: "2-img-4", url: "https://placehold.net/default.svg", sort_order: 3, portfolio_id: "2" },
  //       { id: "2-img-5", url: "https://placehold.net/default.svg", sort_order: 4, portfolio_id: "2" },
  //       { id: "2-img-6", url: "https://placehold.net/default.svg", sort_order: 5, portfolio_id: "2" },
  //     ],
  //     tags: ["Clifftop", "Ocean", "Sunset"],
  //     excerpt:
  //       "Against the dramatic backdrop of Uluwatu's limestone cliffs, Sofia and James exchanged vows as golden light spilled across the Indian Ocean — a celebration both intimate and awe-inspiring.",
  //     content: `
  // <p>Against the dramatic backdrop of Uluwatu's limestone cliffs, Sofia and James exchanged vows as golden light spilled across the Indian Ocean.</p>
  // <p>A celebration both intimate and awe-inspiring — designed around the natural theatre of place.</p>
  //     `.trim(),
  //     story_sections: [],
  //     credit_role: "Wedding Design & Event Planning",
  //     credit_planner: "Linda Wiryani Design and Event Planning",
  //     credit_location_detail: "Uluwatu Clifftop, Bali",
  //     credit_couple_origin: "Sofia & James",
  //   },

  //   // ─── 3. Mei & Thomas ─────────────────────────────────────────────────────────
  //   {
  //     id: "3",
  //     slug: "mei-thomas-private-villa-canggu",
  //     couple: "Mei & Thomas",
  //     subtitle: "An Intimate Garden Ceremony in Canggu",
  //     destination_id: "3",
  //     venue_id: "3",
  //     experience_id: "3",
  //     image: "https://placehold.net/default.svg",
  //     gallery: [
  //       { id: "3-img-1", url: "https://placehold.net/default.svg", sort_order: 0, portfolio_id: "3" },
  //       { id: "3-img-2", url: "https://placehold.net/default.svg", sort_order: 1, portfolio_id: "3" },
  //       { id: "3-img-3", url: "https://placehold.net/default.svg", sort_order: 2, portfolio_id: "3" },
  //       { id: "3-img-4", url: "https://placehold.net/default.svg", sort_order: 3, portfolio_id: "3" },
  //       { id: "3-img-5", url: "https://placehold.net/default.svg", sort_order: 4, portfolio_id: "3" },
  //       { id: "3-img-6", url: "https://placehold.net/default.svg", sort_order: 5, portfolio_id: "3" },
  //     ],
  //     tags: ["Private Villa", "Garden", "Intimate"],
  //     excerpt:
  //       "Surrounded by tropical gardens and close friends, Mei and Thomas chose Canggu's relaxed energy as the backdrop for a day that felt wholly and beautifully their own.",
  //     content: `
  // <p>Surrounded by tropical gardens and the people they love most, Mei and Thomas chose Canggu's relaxed energy as the setting for a day that felt wholly and beautifully their own.</p>
  // <p>Nothing was templated. Everything was intentional.</p>
  //     `.trim(),
  //     story_sections: [],
  //     credit_role: "Wedding Design & Event Planning",
  //     credit_planner: "Linda Wiryani Design and Event Planning",
  //     credit_location_detail: "Private Villa, Canggu, Bali",
  //     credit_couple_origin: "Mei & Thomas",
  //   },

  //   // ─── 4. Clara & Rafael ───────────────────────────────────────────────────────
  //   {
  //     id: "4",
  //     slug: "clara-rafael-nusa-penida",
  //     couple: "Clara & Rafael",
  //     subtitle: "Elopement on the Edge of the World",
  //     destination_id: "4",
  //     venue_id: "4",
  //     experience_id: "4",
  //     image: "https://placehold.net/default.svg",
  //     gallery: [
  //       { id: "4-img-1", url: "https://placehold.net/default.svg", sort_order: 0, portfolio_id: "4" },
  //       { id: "4-img-2", url: "https://placehold.net/default.svg", sort_order: 1, portfolio_id: "4" },
  //       { id: "4-img-3", url: "https://placehold.net/default.svg", sort_order: 2, portfolio_id: "4" },
  //       { id: "4-img-4", url: "https://placehold.net/default.svg", sort_order: 3, portfolio_id: "4" },
  //       { id: "4-img-5", url: "https://placehold.net/default.svg", sort_order: 4, portfolio_id: "4" },
  //       { id: "4-img-6", url: "https://placehold.net/default.svg", sort_order: 5, portfolio_id: "4" },
  //     ],
  //     tags: ["Elopement", "Clifftop", "Remote"],
  //     excerpt:
  //       "Clara and Rafael chose Nusa Penida's wild coastline as witness — an elopement pared down to its most essential truth: presence, connection, and the vast blue horizon.",
  //     content: `
  // <p>Clara and Rafael chose Nusa Penida's wild coastline as witness — an elopement pared down to its most essential truth.</p>
  // <p>Presence. Connection. And the vast blue horizon stretching endlessly before them.</p>
  //     `.trim(),
  //     story_sections: [],
  //     credit_role: "Elopement Design & Creative Direction",
  //     credit_planner: "Linda Wiryani Design and Event Planning",
  //     credit_location_detail: "Kelingking Beach, Nusa Penida, Bali",
  //     credit_couple_origin: "Clara & Rafael",
  //   },

  //   // ─── 5. Amara & Luca ─────────────────────────────────────────────────────────
  //   {
  //     id: "5",
  //     slug: "amara-luca-seminyak-villa",
  //     couple: "Amara & Luca",
  //     subtitle: "Multi-Day Luxury Celebration in Seminyak",
  //     destination_id: "5",
  //     venue_id: "5",
  //     experience_id: "5",
  //     image: "https://placehold.net/default.svg",
  //     gallery: [
  //       { id: "5-img-1", url: "https://placehold.net/default.svg", sort_order: 0, portfolio_id: "5" },
  //       { id: "5-img-2", url: "https://placehold.net/default.svg", sort_order: 1, portfolio_id: "5" },
  //       { id: "5-img-3", url: "https://placehold.net/default.svg", sort_order: 2, portfolio_id: "5" },
  //       { id: "5-img-4", url: "https://placehold.net/default.svg", sort_order: 3, portfolio_id: "5" },
  //       { id: "5-img-5", url: "https://placehold.net/default.svg", sort_order: 4, portfolio_id: "5" },
  //       { id: "5-img-6", url: "https://placehold.net/default.svg", sort_order: 5, portfolio_id: "5" },
  //     ],
  //     tags: ["Luxury", "Multi-Day", "Villa Estate"],
  //     excerpt:
  //       "Across three days of curated celebrations, Amara and Luca welcomed their guests to a Seminyak estate where each moment — from welcome gathering to farewell brunch — was thoughtfully orchestrated.",
  //     content: `
  // <p>Across three days of curated celebrations, Amara and Luca welcomed their guests to a Seminyak estate where each moment was thoughtfully orchestrated.</p>
  // <p>From the welcome gathering at dusk to the farewell brunch in morning light — every detail carried the same intention: to make each guest feel held within something meaningful.</p>
  //     `.trim(),
  //     story_sections: [],
  //     credit_role: "Luxury Wedding Design & Multi-Day Event Planning",
  //     credit_planner: "Linda Wiryani Design and Event Planning",
  //     credit_location_detail: "Luxury Villa Estate, Seminyak, Bali",
  //     credit_couple_origin: "Amara & Luca",
  //   },

  //   // ─── 6. Hana & Ben ───────────────────────────────────────────────────────────
  //   {
  //     id: "6",
  //     slug: "hana-ben-east-bali",
  //     couple: "Hana & Ben",
  //     subtitle: "A Riverside Ceremony Among Sacred Temples",
  //     destination_id: "6",
  //     venue_id: "6",
  //     experience_id: "6",
  //     image: "https://placehold.net/default.svg",
  //     gallery: [
  //       { id: "6-img-1", url: "https://placehold.net/default.svg", sort_order: 0, portfolio_id: "6" },
  //       { id: "6-img-2", url: "https://placehold.net/default.svg", sort_order: 1, portfolio_id: "6" },
  //       { id: "6-img-3", url: "https://placehold.net/default.svg", sort_order: 2, portfolio_id: "6" },
  //       { id: "6-img-4", url: "https://placehold.net/default.svg", sort_order: 3, portfolio_id: "6" },
  //       { id: "6-img-5", url: "https://placehold.net/default.svg", sort_order: 4, portfolio_id: "6" },
  //       { id: "6-img-6", url: "https://placehold.net/default.svg", sort_order: 5, portfolio_id: "6" },
  //     ],
  //     tags: ["Riverside", "Valley", "Sacred"],
  //     excerpt:
  //       "In the lush Sidemen Valley, Hana and Ben found a setting that felt untouched by time — rice paddies, river song, and the quiet presence of Mount Agung framing every frame.",
  //     content: `
  // <p>In the lush Sidemen Valley of East Bali, Hana and Ben found a setting that felt untouched by time.</p>
  // <p>Rice paddies stretched toward the horizon. River song replaced music. And the quiet presence of Mount Agung framed every moment with a stillness that needed no words.</p>
  //     `.trim(),
  //     story_sections: [],
  //     credit_role: "Wedding Design & Event Planning",
  //     credit_planner: "Linda Wiryani Design and Event Planning",
  //     credit_location_detail: "Sidemen Valley, East Bali",
  //     credit_couple_origin: "Hana & Ben",
  //   },
];

export const reviews = [
  {
    quote:
      "Linda et son équipe ont rendu tout cela naturel. De notre première conversation jusqu'à la dernière danse, chaque détail a été géré avec tant de soin et de délicatesse. Nous n'avions à nous soucier de rien — nous n'avions qu'à être pleinement présents.",
    couple: "Anaz & Jane",
    origin: "Maroc",
  },
];
