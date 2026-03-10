// ─── EXPERIENCE LIST ──────────────────────────────────────────────────────────

import { WeddingExperience } from "@/lib/types/new-strucutre";

export const weddingExperienceList: WeddingExperience[] = [

  // ─── Private Villa Weddings ──────────────────────────────────────────────

  {
    id: "1",
    category: "private-villa-weddings",
    name: "Private Villa Weddings",
    hero: {
      style: "split",
      image: "https://placehold.net/default.svg",
      desc: "Privacy, freedom of design, and an atmosphere that feels personal rather than commercial — where your wedding becomes an experience that could only be yours.",
    },
    intro: {
      label: "Why Villa",
      heading: ["Why Choose a Private", "Villa Wedding in Bali"],
      body: "At Linda Wiryani Design and Event Planning, we specialize in private villa weddings in Bali, designing celebrations that feel intimate, architectural, and emotionally immersive. Whether overlooking the ocean, nestled in the jungle, or hidden within a quiet estate, private villas allow weddings to unfold as a multi-layered experience — not a one-hour ceremony.",
      listLabel: "Private villas provide:",
      list: [
        "Full creative freedom",
        "Flexible ceremony and reception layouts",
        "Multi-day celebration potential",
        "Complete guest privacy",
        "A home-like emotional environment",
      ],
      footnote:
        "This makes villa weddings ideal for couples who want their wedding to feel like a private gathering rather than a staged production.",
    },
    approach: {
      label: "Our Approach",
      heading: ["Design-First", "Villa Wedding Planning"],
      body: "Designing a villa wedding requires more than decoration. It requires understanding the architecture and space as a whole. We study each villa as a blank canvas and build a design concept that integrates naturally with its surroundings.",
      listLabel: "It requires understanding:",
      list: [
        "Architecture and space flow",
        "Natural light and transitions",
        "Guest movement and comfort",
        "Acoustic and technical planning",
        "Emotional pacing of the day",
      ],
      image: "https://placehold.net/default.svg",
    },
    services: {
      label: "What We Offer",
      heading: ["Our Private Villa", "Wedding Services"],
      list: [
        "Curated villa recommendations",
        "Site analysis and layout design",
        "Full wedding concept development",
        "Vendor curation and coordination",
        "Production planning and logistics",
        "Styling, floral, and spatial design",
        "Wedding day execution and management",
      ],
      footnote: "Every element is designed to feel cohesive, not crowded.",
      darkPanel: {
        label: "The Day Unfolds",
        heading: ["From Ceremony", "to Celebration"],
        body: "Private villa weddings often allow for a full multi-moment celebration. We design the full emotional rhythm so your wedding flows naturally.",
        list: [
          "Welcome gatherings",
          "Poolside cocktails",
          "Sunset ceremonies",
          "Long-table dinners",
          "After-party experiences",
        ],
        cta: "PLAN YOUR VILLA WEDDING",
      },
    },
    closing: {
      label: "For You",
      heading: ["A Private Villa Wedding", "That Feels Like Home"],
      body: "Your villa wedding should feel warm, intentional, and deeply personal. Each villa wedding is custom-built, never packaged. If you are planning a private villa wedding in Bali and want a design-led team who understands space, emotion, and execution — we would be honored to guide your journey.",
      image: "https://placehold.net/default.svg",
      coupleLabel: "Created for couples who seek:",
      coupleValues: [
        "Seclusion and intimacy",
        "Refined aesthetics",
        "Architectural beauty",
        "Calm planning support",
        "Elevated guest experiences",
      ],
    },
    faqs: [
      {
        q: "Why choose a private villa wedding in Bali?",
        a: "Private villa weddings offer privacy, creative freedom, flexible layouts, and a more personal atmosphere. They allow couples to design multi-moment experiences such as welcome dinners, poolside gatherings, sunset ceremonies, and intimate receptions.",
      },
      {
        q: "Are private villas suitable for luxury weddings?",
        a: "Yes. Many private villas in Bali are designed to luxury hospitality standards and are ideal for high-end weddings. With proper design, production, and planning, private villas can host refined, elevated wedding celebrations.",
      },
      {
        q: "How many guests can attend a villa wedding in Bali?",
        a: "Guest capacity depends on the villa. Some villas are ideal for intimate weddings of 10–30 guests, while larger estates can host celebrations of 50–150 guests. We assess each property for comfort, flow, and production feasibility.",
      },
      {
        q: "Do villa weddings require special permits?",
        a: "Some villa weddings require local permissions, banjar approvals, or event permits depending on location and scale. As your wedding planner, we guide you through all regulatory and logistical requirements.",
      },
      {
        q: "Do you provide full planning and design for villa weddings?",
        a: "Yes. Our private villa wedding service includes venue sourcing, full creative design, vendor management, production planning, and complete on-the-day coordination.",
      },
    ],
  },

  // ─── Intimate Weddings ───────────────────────────────────────────────────

  {
    id: "2",
    category: "intimate-weddings",
    name: "Intimate Weddings",
    hero: {
      style: "bottom",
      image: "https://placehold.net/default.svg",
      desc: "An intimate wedding allows space for connection, presence, and beauty without excess. Designed for couples who value quality over quantity — and atmosphere over spectacle.",
    },
    intro: {
      label: "Why Intimate",
      heading: ["Why Choose an", "Intimate Wedding in Bali"],
      body: "At Linda Wiryani Design and Event Planning, we specialize in intimate weddings in Bali, crafting celebrations that feel warm, intentional, and deeply personal. These weddings are designed for couples who value quality over quantity and atmosphere over spectacle.",
      listLabel: null,
      list: [
        "Deeper guest connection",
        "Greater design flexibility",
        "More meaningful ceremonies",
        "Higher guest experience quality",
        "Natural, relaxed flow",
      ],
      footnote:
        "Bali's diverse environments allow intimate weddings to feel cinematic yet grounded.",
    },
    approach: {
      label: "How We Design",
      heading: ["Our Intimate", "Wedding Philosophy"],
      body: "We design intimate weddings around emotional rhythm and spatial harmony. Every detail is chosen to support the overall feeling — not overwhelm it.",
      listLabel: "We design around:",
      list: [
        "Emotional rhythm",
        "Spatial harmony",
        "Thoughtful guest experience",
        "Refined aesthetic language",
        "Calm execution",
      ],
      image: "https://placehold.net/default.svg",
    },
    services: {
      label: "What We Offer",
      heading: ["Our Intimate", "Wedding Services"],
      list: [
        "Venue and villa sourcing",
        "Wedding design development",
        "Styling and floral direction",
        "Vendor curation",
        "Budget and schedule management",
        "Wedding day coordination",
      ],
      footnote:
        "Our role is to design the structure so you can release control and remain fully present.",
      darkPanel: {
        label: "The Experience",
        heading: ["Designed for", "Presence"],
        body: "Intimate weddings allow you to truly experience your celebration. With a smaller gathering, every moment becomes vivid — the ceremony, the dinner, the quiet connections between loved ones.",
        list: [
          "Deeply personal atmosphere",
          "Every guest meaningfully present",
          "Unhurried, emotional ceremony",
          "Refined dining experience",
          "Space for true connection",
        ],
        cta: "PLAN YOUR INTIMATE WEDDING",
      },
    },
    closing: {
      label: "An Intimate Wedding That Feels Like You",
      heading: ["Quality over quantity.", "Atmosphere over spectacle."],
      body: "If you are planning an intimate wedding in Bali and desire a design-led, hospitality-driven team, we would be honored to guide your journey.",
      image: "https://placehold.net/default.svg",
      coupleLabel: null,
      coupleValues: [],
    },
    faqs: [
      {
        q: "What is considered an intimate wedding?",
        a: "An intimate wedding typically includes 10–50 guests, allowing for deeper connection, flexible design, and a more relaxed atmosphere focused on meaningful moments.",
      },
      {
        q: "Why choose an intimate wedding in Bali?",
        a: "Bali's landscapes, private venues, and natural beauty make it ideal for intimate weddings. Smaller guest counts allow couples to fully experience the location, ceremony, and celebration.",
      },
      {
        q: "Are intimate weddings less expensive?",
        a: "Not necessarily. Intimate weddings often focus on quality rather than scale. Many couples invest in higher-end venues, refined design, exceptional food, and guest experience.",
      },
      {
        q: "Do you offer full planning for intimate weddings?",
        a: "Yes. We provide full creative and logistical planning for intimate weddings, including venue selection, design development, vendor coordination, and wedding day management.",
      },
      {
        q: "Can intimate weddings still feel luxurious?",
        a: "Yes. Luxury is not about size — it is about care, design, and execution. Intimate weddings often allow for a higher level of detail and personalization.",
      },
    ],
  },

  // ─── Elopement Weddings ──────────────────────────────────────────────────

  {
    id: "3",
    category: "elopement-weddings",
    name: "Elopement Weddings",
    hero: {
      style: "centered",
      image: "https://placehold.net/default.svg",
      desc: "Bali Elopement Weddings — intimate, emotionally rich, and visually poetic — designed as meaningful experiences, not quick ceremonies.",
    },
    intro: {
      label: "The Setting",
      heading: ["Why Couples", "Choose to Elope in Bali"],
      body: "Whether on a hidden beach, jungle clearing, private villa, or dramatic cliffside, our elopements are created as meaningful experiences, not quick ceremonies. Elopements here often feel less like events and more like sacred moments.",
      listLabel: "Bali offers the perfect setting:",
      list: [
        "Natural beauty",
        "Spiritual atmosphere",
        "Privacy and seclusion",
        "Symbolic ceremony environments",
        "Romantic, cinematic landscapes",
      ],
      footnote: null,
    },
    approach: {
      label: "Our Philosophy",
      heading: ["A Design-Led", "Elopement Experience"],
      body: "Every element is curated to support presence and meaning. Whether just the two of you or a small circle of loved ones, we create space for your moment to unfold naturally.",
      listLabel: "Our elopement planning focuses on:",
      list: [
        "Emotional storytelling",
        "Natural integration with landscape",
        "Simple yet refined styling",
        "Calm, unhurried flow",
        "Authentic connection",
      ],
      image: "https://placehold.net/default.svg",
    },
    services: {
      label: "What We Provide",
      heading: ["Our Bali", "Elopement Services"],
      list: [
        "Location sourcing and permits",
        "Ceremony design and concept",
        "Styling and floral direction",
        "Vendor coordination",
        "Timeline and logistics planning",
        "On-site coordination",
      ],
      footnote: "For Couples Seeking Depth, Not Display.",
      darkPanel: {
        label: "Our Values",
        heading: ["Emotion over", "Production"],
        body: "We design elopements for couples who value simplicity with meaning. Every detail is considered, nothing is excessive.",
        list: [
          "Emotion over production",
          "Simplicity with meaning",
          "Design with sensitivity",
          "Quiet luxury",
          "Personal ceremony experiences",
        ],
        cta: "PLAN YOUR ELOPEMENT",
      },
    },
    closing: {
      label: "An Elopement That Feels Sacred",
      heading: ["Timeless. Grounded.", "Emotionally true."],
      body: "If you are looking for a Bali elopement wedding planner who approaches elopements as artful experiences, we would be honored to create with you.",
      image: "https://placehold.net/default.svg",
      coupleLabel: null,
      coupleValues: [],
    },
    faqs: [
      {
        q: "What is a Bali elopement wedding?",
        a: "A Bali elopement wedding is an intimate ceremony focused on the couple, often with no guests or only a small circle of loved ones. It emphasizes emotion, simplicity, and meaningful experience over large production.",
      },
      {
        q: "Where can we elope in Bali?",
        a: "Popular elopement locations include private villas, hidden beaches, jungle clearings, waterfalls, cliffside venues, and boutique resorts. We help curate locations based on privacy, atmosphere, and comfort.",
      },
      {
        q: "Are elopement weddings legally recognized in Bali?",
        a: "Legal requirements vary depending on nationality and personal circumstances. We guide couples on symbolic ceremonies, legal processes, and recommended options.",
      },
      {
        q: "Can elopements still be beautifully designed?",
        a: "Absolutely. Our elopements are design-led and thoughtfully curated, focusing on refined styling, meaningful ceremony flow, and visual harmony with nature.",
      },
      {
        q: "Do you plan elopements for just the couple?",
        a: "Yes. We design elopements both for two people and for very small guest counts. Each experience is custom-built.",
      },
    ],
  },

  // ─── Luxury Weddings ─────────────────────────────────────────────────────

  {
    id: "4",
    category: "luxury-weddings",
    name: "Luxury Weddings",
    hero: {
      style: "editorial",
      image: "https://placehold.net/default.svg",
      desc: "Luxury weddings in Bali shaped by architecture, atmosphere, and storytelling — not trends.",
    },
    intro: {
      label: "Our Definition",
      heading: ["What Defines Luxury", "at Linda Wiryani"],
      body: "At Linda Wiryani Design and Event Planning, we design luxury weddings in Bali that feel elevated, calm, and emotionally rich. Our weddings are shaped by architecture, atmosphere, and storytelling — not trends.",
      listLabel: null,
      list: [
        "Artistic direction",
        "Emotional depth",
        "Spatial beauty",
        "Seamless execution",
        "Discreet, thoughtful service",
      ],
      footnote: "True luxury is when everything flows effortlessly.",
    },
    approach: {
      label: "How We Work",
      heading: ["Our Luxury Wedding", "Design Approach"],
      body: "Every luxury wedding begins with a process — not a template. This ensures every celebration feels cohesive and intentional from the first conversation to the final farewell.",
      listLabel: "Every luxury wedding begins with:",
      list: [
        "Vision & emotional mapping",
        "Venue and environment study",
        "Design narrative development",
        "Guest experience planning",
        "Technical and production precision",
      ],
      image: "https://placehold.net/default.svg",
    },
    services: {
      label: "What We Offer",
      heading: ["Our Luxury", "Wedding Services"],
      list: [
        "Creative direction and design",
        "Venue and vendor curation",
        "Budget and production management",
        "Multi-day event planning",
        "Styling, floral, and spatial design",
        "Wedding day orchestration",
      ],
      footnote:
        "We intentionally take a limited number of luxury weddings each year to ensure full creative involvement.",
      darkPanel: {
        label: "For You",
        heading: ["For Couples Who", "Value Artistry"],
        body: "Our studio is chosen by couples who seek aesthetic intelligence, emotional storytelling, and world-class execution.",
        list: [
          "Aesthetic intelligence",
          "Calm professionalism",
          "Emotional storytelling",
          "Architectural beauty",
          "World-class guest experience",
        ],
        cta: "PLAN YOUR LUXURY WEDDING",
      },
    },
    closing: {
      label: "A Luxury Wedding That Feels Timeless",
      heading: ["Luxury should never feel loud.", "It should feel considered."],
      body: "If you are searching for a luxury wedding planner in Bali, we would be honored to design a celebration that feels meaningful, refined, and unforgettable.",
      image: "https://placehold.net/default.svg",
      coupleLabel: null,
      coupleValues: [],
    },
    faqs: [
      {
        q: "What defines a luxury wedding in Bali?",
        a: "A luxury wedding is defined by thoughtful design, refined aesthetics, seamless execution, emotional storytelling, and exceptional guest experience — not simply budget or scale.",
      },
      {
        q: "Do you plan multi-day luxury weddings?",
        a: "Yes. We design and manage multi-day wedding experiences including welcome events, rehearsal gatherings, ceremony days, and farewell celebrations.",
      },
      {
        q: "How much does a luxury wedding in Bali cost?",
        a: "Budgets vary widely depending on guest count, venues, design scope, and production complexity. Luxury weddings in Bali typically begin where full professional design, planning, and production are required.",
      },
      {
        q: "How many weddings do you take each year?",
        a: "We intentionally limit the number of luxury weddings we accept to ensure full creative focus, personal involvement, and execution excellence.",
      },
      {
        q: "Do you work with high-end venues and vendors?",
        a: "Yes. We collaborate with trusted luxury venues, artisans, and wedding professionals across Bali who meet our standards for quality, reliability, and refinement.",
      },
    ],
  },
];