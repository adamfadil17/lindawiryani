import { Portfolio } from "@/types";

export const portfolioItems: Portfolio[] = [
  // ─── 1. Anaz & Jane ──────────────────────────────────────────────────────────
  {
    id: "1",
    slug: "anaz-jane-tegalalang",
    couple: "Anaz & Jane",
    subtitle: "穿越巴厘岛德格拉朗梯田的婚后之旅",
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
    tags: ["婚后旅程", "梯田", "杂志风"],
    excerpt:
      "从摩洛哥远道来到巴厘岛，Anaz 和 Jane 在德格拉朗翡翠般的梯田间，找到了婚礼当天静谧的延续——摩洛哥的传承与巴厘岛的自然在此交汇。",
    origin: "摩洛哥",
    review: "",
    // ── TipTap HTML ────────────────────────────────────────────────────────────
    // Edit this field from the admin CMS. The `storySections` array below is
    // kept as an empty fallback; `content` always takes rendering priority.
    content: `
<p>有些时刻，不需要被刻意安排，只需要被感受。</p>
<p>对 Anaz 和 Jane 而言，他们在巴厘岛的婚后体验从来不是为了重现婚礼当天，而是被设计成婚礼的静谧延续——一个让彼此得以呼吸、漫步、在庆典结束后安然相伴的空间。</p>
<p>从摩洛哥远道来到巴厘岛，吸引他们的不只是这座岛的美，更是它的节奏：自然缓缓舒展的方式，静默蕴含意义的方式，光线掠过大地的方式。</p>
<p>我们将他们的婚后之旅安排在德格拉朗——层层翠绿的稻田在乌布的山丘间轻柔流淌，构成了巴厘岛最富诗意的自然景观之一。</p>

<h2>当风景成为故事</h2>
<p>德格拉朗不仅仅是一个地点，它是水、土地与光影共同谱写的鲜活画卷。</p>
<p>在这里，清晨的空气微凉，田野仿佛在呼吸，风声与远处的流水声取代了交谈。</p>
<p>正是在这样的氛围中，Anaz 和 Jane 开始了他们的婚后拍摄——他们不是摆姿势拍照的新婚夫妻，而是两个允许自己融入风景的人。</p>
<p>没有匆忙，没有表演，只有行走、相伴与静静的联结。</p>
<p>他们漫步梯田的过程自然而然地展开——毫无保留的笑声、轻柔的停顿，以及当光线在田野上渐渐柔和时，共享的宁静。</p>

<h2>一场婚后体验，而非一次拍摄</h2>
<p>在 Linda Wiryani Design and Event Planning，我们将婚后体验设计为一场情感之旅，而不是一次摄影拍摄。</p>
<p>对 Anaz 和 Jane 来说，初衷从来不是夸张的造型或繁复的布置，而是创造一个亲密的空间，让他们的情感存在于一个踏实、诗意而鲜活的环境之中。</p>
<p>梯田既是背景，也是见证。柔和的服饰呼应着周围的自然色调。他们简单的姿态让环境成为主角，镜头则静静跟随。</p>

<h2>在摩洛哥与巴厘岛之间</h2>
<p>来自摩洛哥——一片质感深厚、历史悠久、色彩浓郁的土地——Anaz 和 Jane 在巴厘岛的风景中意外地找到了熟悉感。</p>
<p>形式各异，精神相通。两种文化都对土地怀有敬意，都将美视为一种被生活的体验，而非用来展示的东西。</p>
<p>他们的婚后之旅成为两个世界的交汇点——摩洛哥的传承与巴厘岛的自然，在同一画面中静静共存。</p>

<h2>超越影像的记忆</h2>
<p>Anaz 和 Jane 在德格拉朗留下的，不只是影像，更是那份感受。</p>
<p>那种漫无目的行走的感觉，那种倾听胜过言语的感觉，那种让一个地方塑造一个瞬间的感觉。</p>
<p>他们的婚后故事提醒我们：最有意义的体验，往往不在仪式之中，而在仪式之后的空隙里——当世界变得柔软，真实的事物才有了浮现的余地。</p>
    `.trim(),
    // ── Structured fallback (kept empty — content field is used instead) ───────
    story_sections: [],
    credit_role: "婚后体验与创意指导",
    credit_planner: "Linda Wiryani Design and Event Planning",
    credit_location_detail: "德格拉朗梯田，乌布，巴厘岛",
    credit_couple_origin: "Anaz & Jane — 摩洛哥",
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
      "Linda 和她的团队让一切都显得毫不费力。从第一次交谈到最后一支舞，每一个细节都处理得那么用心、那么周到。我们无需操心任何事——只需全心享受当下。",
    couple: "Anaz & Jane",
    origin: "摩洛哥",
  },
];
