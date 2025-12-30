export type VenueCategory = "signature" | "private_villa";
export type WeddingConceptType = "elopement" | "intimate" | null;

export type Location =
  | "Uluwatu"
  | "Ubud"
  | "Sanur"
  | "Canggu"
  | "Seminyak"
  | "Manggis"
  | "Gianyar"
  | "All";

export interface WeddingTheme {
  title: string;
  description: string;
  venue: string;
  venueName: string;
  venueId?: number; // Link to actual venue data
  image: string;
  gallery: string[];
  inclusions: string[];
}

export interface VenueData {
  id: number;
  name: string;
  slogan: string;
  city: Location;
  province: string;
  capacity: number;
  startingPrice: number;
  category: VenueCategory;
  weddingConcept: {
    type: WeddingConceptType;
    theme: string;
  };

  images: {
    hero: string;
    gallery: string[];
  };

  description: string;
}

export const locations = [
  "All",
  "Uluwatu",
  "Ubud",
  "Sanur",
  "Canggu",
  "Seminyak",
  "Manggis",
  "Gianyar",
] as const;

export const elopementThemes: WeddingTheme[] = [
  {
    title: "Cliffside Elopement",
    description:
      "Exchange vows on dramatic clifftops overlooking the endless ocean, where earth meets sky in perfect harmony.",
    venue: "Wonderland Uluwatu",
    venueName: "Wonderland Uluwatu",
    venueId: undefined, // Not in venue list - special elopement location
    image:
      "/images/wedding-themes/dramatic-cliffside-wedding-ceremony-overlooking-oc.jpg",
    gallery: [
      "/images/wedding-themes/dramatic-cliffside-wedding-ceremony-overlooking-oc.jpg",
    ],
    inclusions: [
      "Exclusive cliffside ceremony slot",
      "Elegant contemporary floral altar",
      "Professional wedding celebrant",
      "Commemorative wedding certificate",
      "Bridal bouquet and matching boutonniere",
      "Violin or Cello soloist performance",
    ],
  },
  {
    title: "Waterfall Elopement",
    description:
      "Say 'I do' surrounded by the soothing sounds of cascading water in a hidden tropical paradise.",
    venue: "Tibumana Waterfall",
    venueName: "Tibumana Waterfall",
    venueId: undefined, // Special elopement location
    image:
      "/images/wedding-themes/romantic-waterfall-wedding-ceremony-in-lush-tropic.jpg",
    gallery: [
      "/images/wedding-themes/romantic-waterfall-wedding-ceremony-in-lush-tropic.jpg",
    ],
    inclusions: [
      "Private waterfall ceremony location",
      "Tropical jungle floral decorations",
      "Balinese blessing or commitment ceremony",
      "Personalized wedding coordinator",
      "Signature welcome drinks for the couple",
      "Romantic dinner for two by the river",
    ],
  },
  {
    title: "Forest & Jungle Elopement",
    description:
      "Celebrate your union beneath ancient trees in an enchanting natural cathedral of green.",
    venue: "Bagus Jati",
    venueName: "Bagus Jati",
    venueId: undefined, // Special elopement location
    image:
      "/images/wedding-themes/intimate-forest-wedding-ceremony-with-tropical-jun.jpg",
    gallery: [
      "/images/wedding-themes/intimate-forest-wedding-ceremony-with-tropical-jun.jpg",
    ],
    inclusions: [
      "Sacred forest ceremony setting",
      "Bohemian style floral arrangement",
      "English speaking celebrant",
      "Sound system for ceremony music",
      "Fresh flower aisle decor",
      "One bottle of sparkling wine for toast",
    ],
  },
  {
    title: "Private Villa Elopement",
    description:
      "Intimate luxury in an exclusive villa setting, where privacy and elegance create your perfect moment.",
    venue: "The Iman Villa",
    venueName: "The Iman Villa",
    venueId: 17, // Links to venue ID 17
    image:
      "/images/wedding-themes/luxury-private-villa-wedding-ceremony-with-infinit.jpg",
    gallery: [
      "/images/wedding-themes/luxury-private-villa-wedding-ceremony-with-infinit.jpg",
    ],
    inclusions: [
      "Use of luxury villa garden or poolside",
      "Minimalist chic floral decoration",
      "Preparation room for bride and groom",
      "Private butler service during ceremony",
      "Handcrafted wedding cake (1-tier)",
      "Traditional Balinese flower girls",
    ],
  },
  {
    title: "Oceanfront Elopement",
    description:
      "Feel the sand beneath your feet as you commit to forever with the gentle rhythm of waves as your witness.",
    venue: "Villa Ombak Biru",
    venueName: "Villa Ombak Biru",
    venueId: 18, // Links to venue ID 18
    image:
      "/images/wedding-themes/beachfront-wedding-ceremony-at-golden-hour-on-pris.jpg",
    gallery: [
      "/images/wedding-themes/beachfront-wedding-ceremony-at-golden-hour-on-pris.jpg",
    ],
    inclusions: [
      "Private beachfront ceremony area",
      "Driftwood or bamboo floral arch",
      "Scented cold towels for couple",
      "Professional sound system for vows",
      "Petal flower shower after ceremony",
      "Assistance with legal paperwork",
    ],
  },
];

export const intimateThemes: WeddingTheme[] = [
  {
    title: "Private Villa Estate Weddings",
    description:
      "Host your closest loved ones in an exclusive villa estate featuring stunning architecture and manicured gardens.",
    venue: "Jeeva Saba Estate",
    venueName: "Jeeva Saba Estate",
    venueId: 10, // Links to venue ID 10
    image:
      "/images/wedding-themes/elegant-villa-estate-wedding-with-tropical-garden-.jpg",
    gallery: [
      "/images/wedding-themes/elegant-villa-estate-wedding-with-tropical-garden-.jpg",
    ],
    inclusions: [
      "Exclusive 2-night stay for up to 10 guests",
      "Full estate wedding setup (up to 40 pax)",
      "Customized multi-course reception dinner",
      "Evening fairy light garden illumination",
      "Standard wedding bar setup",
      "Dedicated event management team",
    ],
  },
  {
    title: "Luxury Resort Intimate Weddings",
    description:
      "Experience world-class hospitality and breathtaking venues within prestigious resort properties.",
    venue: "Four Seasons Resort Bali at Jimbaran Bay",
    venueName: "Four Seasons Resort Bali at Jimbaran Bay",
    venueId: undefined, // Not in current venue list
    image:
      "/images/wedding-themes/luxury-resort-wedding-pavilion-with-ocean-views-an.jpg",
    gallery: [
      "/images/wedding-themes/luxury-resort-wedding-pavilion-with-ocean-views-an.jpg",
    ],
    inclusions: [
      "Luxury beachfront pavilion venue",
      "Tiffany chairs for up to 60 guests",
      "Gourmet buffet or plated dinner",
      "Welcome signature cocktails and canapés",
      "Professional audio-visual setup",
      "Complimentary night for the newlyweds",
    ],
  },
  {
    title: "Garden & Riverside Weddings",
    description:
      "Celebrate amidst blooming florals and flowing waters in serene natural garden settings.",
    venue: "Maya Ubud Resort and Spa",
    venueName: "Maya Ubud Resort and Spa",
    venueId: undefined, // Not in current venue list
    image:
      "/images/wedding-themes/romantic-garden-wedding-by-riverside-with-lush-flo.jpg",
    gallery: [
      "/images/wedding-themes/romantic-garden-wedding-by-riverside-with-lush-flo.jpg",
    ],
    inclusions: [
      "Riverside lawn ceremony venue",
      "Rustic garden reception decoration",
      "Balinese Gamelan or Acoustic Band",
      "Full flower centerpiece for guest tables",
      "Menu tasting for up to 4 people",
      "Shuttle service within resort area",
    ],
  },
  {
    title: "Cultural & Architectural Settings",
    description:
      "Honor tradition in venues that showcase Bali's rich cultural heritage and stunning architecture.",
    venue: "The Sanctoo Suite and Villas",
    venueName: "The Sanctoo Suite and Villas",
    venueId: undefined, // Not in current venue list
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1762945273/Wedding-1_nbmcae.png",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1762945250/Hero-2_pqkyqg.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945247/Hero-1_pfuhns.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945251/Hero-3_srju4t.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945255/Hero-4_dd6hvy.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945256/Hero-5_sese0t.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945253/Hero-6_x4fgvz.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945273/Wedding-1_nbmcae.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945288/Wedding-2_fwaure.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945299/Wedding-3_keaptq.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945289/Wedding-4_jjkb78.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945289/Wedding-5_ryewg0.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945300/Wedding-6_hwlqdm.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945296/Wedding-7_sgkvwu.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945297/Wedding-9_r0n31b.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945274/Wedding-10_dfm0vg.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945277/Wedding-11_lxsjdn.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945280/Wedding-12_hixhba.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945280/Wedding-13_ybtevc.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945281/Wedding-14_fgfyaa.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945281/Wedding-15_esxvvj.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945283/Wedding-16_most5t.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945285/Wedding-17_ebg8fx.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945288/Wedding-18_y5yxwp.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945262/Room-1_ckf8hb.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945253/Room-2_sizvns.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945257/Room-3_huk6jg.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945262/Room-4_seqcbm.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945264/Room-5_gpzczl.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945272/Room-6_hqyjgx.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945270/Room-7_hjeyva.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945273/Room-8_yxlknj.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945272/Room-9_su9ufs.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945266/Room-10_kgvn2u.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945264/Room-11_ybook7.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945308/Facilities-1_cilm3y.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945310/Facilities-2_ujkbbu.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945316/Facilities-3_cpbctc.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945314/Facilities-4_ayjx4z.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945319/Facilities-5_kruotm.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945317/Facilities-6_diwmsy.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945316/Facilities-7_dqzcmq.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945316/Facilities-8_ryq1eq.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945324/Facilities-9_mzjw9u.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945305/Facilities-11_ctuf4q.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945298/Facilities-12_dsyrny.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945299/Facilities-13_prhpjh.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945307/Facilities-14_o3b0qk.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945308/Facilities-15_jqxs6i.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945264/Lifestyle-1_vlnj7n.png",

    ],
    inclusions: [
      "Traditional Balinese temple gateway backdrop",
      "Heritage-inspired ceremonial decor",
      "Balinese costume rental for couple",
      "Traditional Legong dance performance",
      "Balinese 'Rijsttafel' dinner experience",
      "Local community blessing ceremony",
    ],
  },
  {
    title: "Destination Intimate Celebrations",
    description:
      "Create unforgettable memories in unique destination venues that perfectly frame your love story.",
    venue: "Secret Seven Lombok",
    venueName: "Secret Seven Lombok",
    venueId: undefined, // Not in current venue list (Lombok location)
    image:
      "/images/wedding-themes/destination-wedding-venue-with-panoramic-mountain-.jpg",
    gallery: [
      "/images/wedding-themes/destination-wedding-venue-with-panoramic-mountain-.jpg",
    ],
    inclusions: [
      "Panoramic mountain/ocean view venue",
      "Modern minimalist arch and aisle",
      "International menu selection",
      "Sunset cocktail hour on the deck",
      "Professional photography (4 hours)",
      "Sparkling cider for toast",
    ],
  },
];

export const elopementCategoryImages = [
  "/images/wedding-themes/dramatic-cliffside-wedding-ceremony-overlooking-oc.jpg",
  "/images/wedding-themes/romantic-waterfall-wedding-ceremony-in-lush-tropic.jpg",
  "/images/wedding-themes/intimate-forest-wedding-ceremony-with-tropical-jun.jpg",
];

export const intimateCategoryImages = [
  "/images/wedding-themes/elegant-villa-estate-wedding-with-tropical-garden-.jpg",
  "/images/wedding-themes/luxury-resort-wedding-pavilion-with-ocean-views-an.jpg",
  "/images/wedding-themes/romantic-garden-wedding-by-riverside-with-lush-flo.jpg",
];

export const getThemeById = (
  themeTitle: string,
  type: "elopement" | "intimate"
) => {
  const themes = type === "elopement" ? elopementThemes : intimateThemes;
  return themes.find((theme) => theme.title === themeTitle);
};

export const getThemesByVenueId = (venueId: number) => {
  const allThemes = [...elopementThemes, ...intimateThemes];
  return allThemes.filter((theme) => theme.venueId === venueId);
};

export const weddingConceptVenues: VenueData[] = [
  {
    id: 1,
    name: "COMO Shambhala Estate",
    slogan: "Holistic Wellness Sanctuary",
    city: "Ubud",
    province: "Bali",
    capacity: 0,
    startingPrice: 0, // TBC
    category: "signature",
    weddingConcept: {
      type: "intimate",
      theme: "wellness_retreat",
    },
    images: {
      hero: "https://res.cloudinary.com/dzerxindp/image/upload/v1767121622/CSE_1_ljnvgs.jpg",
      gallery: [
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767121622/CSE_1_ljnvgs.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767121621/CSE_3_fb3w1u.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767124015/Screenshot_2025-12-31_024403_vfonbh.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767124013/Screenshot_2025-12-31_024345_jqx6ui.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767123985/Screenshot_2025-12-31_023011_okj38x.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767123986/Screenshot_2025-12-31_023116_xhpyl7.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767123986/Screenshot_2025-12-31_023145_wfz1wf.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767123986/Screenshot_2025-12-31_023031_m9x4uh.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767123987/Screenshot_2025-12-31_023317_wt7hiu.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767123988/Screenshot_2025-12-31_023340_pbvtku.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767123988/Screenshot_2025-12-31_023215_aezr0m.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767123988/Screenshot_2025-12-31_023530_llae45.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767123989/Screenshot_2025-12-31_023436_jmo6xn.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767123989/Screenshot_2025-12-31_023620_hj8sid.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767123989/Screenshot_2025-12-31_023420_kwb6h6.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767123989/Screenshot_2025-12-31_023552_mkm7cb.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767123990/Screenshot_2025-12-31_023635_q3aye5.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767123990/Screenshot_2025-12-31_023657_t35mko.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767123990/Screenshot_2025-12-31_023739_dvgpmn.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767123991/Screenshot_2025-12-31_023747_m4t44x.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767123991/Screenshot_2025-12-31_023723_gld8rv.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767123992/Screenshot_2025-12-31_023058_ejnpem.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767123996/Screenshot_2025-12-31_023842_xrrpxl.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767123997/Screenshot_2025-12-31_023820_ck4d43.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767123997/Screenshot_2025-12-31_023806_dqxwsy.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767123997/Screenshot_2025-12-31_023907_vfxuiv.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767123997/Screenshot_2025-12-31_023925_wkqrct.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767123998/Screenshot_2025-12-31_023952_qnu85v.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767124009/Screenshot_2025-12-31_024153_ln7dve.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767124009/Screenshot_2025-12-31_024224_i8cruc.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767124009/Screenshot_2025-12-31_024013_xj5rxm.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767124011/Screenshot_2025-12-31_024243_p8t2g6.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767124010/Screenshot_2025-12-31_024304_bupzu8.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767124011/Screenshot_2025-12-31_024329_jlxxqy.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767124013/Screenshot_2025-12-31_024345_jqx6ui.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767124015/Screenshot_2025-12-31_024403_vfonbh.png",
      ],
    },
    description:
      "Nestled in the heart of Ubud's lush jungle, COMO Shambhala Estate offers a transformative wellness experience. This holistic sanctuary combines Balinese healing traditions with contemporary wellness practices, creating an intimate setting for couples seeking meaningful celebration.",
  },
  {
    id: 2,
    name: "Bambu Indah",
    slogan: "Sustainable Bamboo Luxury",
    city: "Ubud",
    province: "Bali",
    capacity: 0,
    startingPrice: 0,
    category: "signature",
    weddingConcept: {
      type: "intimate",
      theme: "eco_luxury",
    },
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "An eco-luxury boutique hotel showcasing extraordinary bamboo architecture. Bambu Indah offers a unique blend of sustainability and sophistication, perfect for couples who value environmental consciousness without compromising on luxury.",
  },
  {
    id: 3,
    name: "Sayan House",
    slogan: "Contemporary Jungle Elegance",
    city: "Ubud",
    province: "Bali",
    capacity: 0,
    startingPrice: 0,
    category: "signature",
    weddingConcept: {
      type: "intimate",
      theme: "modern_tropical",
    },
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "Perched above the Ayung River valley, Sayan House features striking contemporary design harmonizing with natural surroundings. The venue offers panoramic jungle views and sophisticated spaces for intimate celebrations.",
  },
  {
    id: 4,
    name: "Pantai Lima Estate",
    slogan: "Beachfront Architectural Marvel",
    city: "Canggu",
    province: "Bali",
    capacity: 0,
    startingPrice: 0,
    category: "signature",
    weddingConcept: {
      type: "intimate",
      theme: "beachfront",
    },
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "A stunning beachfront estate featuring contemporary architecture and direct beach access. Pantai Lima Estate combines modern luxury with the raw beauty of Bali's coastline, ideal for sophisticated beach celebrations.",
  },
  {
    id: 5,
    name: "Noku Beach House",
    slogan: "Oceanfront Serenity",
    city: "Seminyak",
    province: "Bali",
    capacity: 0,
    startingPrice: 0,
    category: "signature",
    weddingConcept: {
      type: "intimate",
      theme: "beachfront",
    },
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "An exclusive beachfront venue offering unobstructed ocean views and contemporary tropical design. Noku Beach House provides refined elegance for intimate seaside celebrations.",
  },
  {
    id: 6,
    name: "Arnalaya Beach House",
    slogan: "Coastal Sophistication",
    city: "Canggu",
    province: "Bali",
    capacity: 0,
    startingPrice: 0,
    category: "signature",
    weddingConcept: {
      type: "intimate",
      theme: "beachfront",
    },
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "A beautifully designed beachfront property combining Balinese charm with modern amenities. Arnalaya Beach House offers an intimate setting with direct beach access and stunning sunset views.",
  },
  {
    id: 7,
    name: "The Edge Bali",
    slogan: "Cliffside Architectural Icon",
    city: "Uluwatu",
    province: "Bali",
    capacity: 0,
    startingPrice: 0,
    category: "signature",
    weddingConcept: {
      type: "intimate",
      theme: "cliffside",
    },
    images: {
      hero: "https://res.cloudinary.com/dzerxindp/image/upload/v1767126415/Ceremony_at_The_View_1_pb6vjt.jpg",
      gallery: [
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767126415/Ceremony_at_The_View_1_pb6vjt.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767126412/Ceremony_at_The_View_2_bawsvk.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767126518/Ceremony_at_The_View_13_pkfvol.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767126518/Ceremony_at_The_View_10_bozvop.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767126511/Ceremony_at_The_View_18_jc4q1w.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767126503/Ceremony_at_The_View_22_wasmja.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767126504/Ceremony_at_The_View_12_rhaw71.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767126501/Ceremony_at_The_View_21_surdu2.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767126500/Ceremony_at_The_View_20_as0meo.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767126500/Ceremony_at_The_View_6_sm3bc6.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767126490/Ceremony_at_The_View_17_hlvz9b.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767126489/Ceremony_at_The_View_19_1_bwaelg.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767126488/Ceremony_at_The_View_16_vhvgdw.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767126487/Ceremony_at_The_View_14_gbyw6v.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767126417/Ceremony_at_The_View_15_ivxqhp.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767126416/Ceremony_at_The_View_5_mffbgk.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767126416/Ceremony_at_The_View_7_vrr5sd.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767126415/Ceremony_at_The_View_9_kuqvda.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767126412/Ceremony_at_The_View_3_cosu0j.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767125859/Dinner_at_The_View_15_zycj7q.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767125858/Dinner_at_The_View_16_fmc2sf.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767125853/Dinner_at_The_View_24_kpydq0.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767125850/Dinner_at_The_View_58_kjlwrw.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767125853/Dinner_at_The_View_22_nt3uxs.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767125854/Dinner_at_The_View_59_miw8m8.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767125853/Dinner_at_The_View_22_nt3uxs.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767125851/Dinner_at_The_View_18_gucnxx.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767125847/Dinner_at_The_View_57_flchfu.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767125845/Dinner_at_The_View_17_ewwueg.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767125845/Dinner_at_The_View_3_gulqg9.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767125844/Dinner_at_The_View_5_dhgr9v.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767125844/Dinner_at_The_View_2_lasf7s.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767125843/Dinner_at_The_View_56_ski5xj.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767125842/Dinner_at_The_View_54_o7kfnd.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767125843/Dinner_at_The_View_55_1_phjunp.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767125842/Dinner_at_The_View_4_cygyfo.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767125841/Dinner_at_The_View_21_xducbi.jpg",
      ],
    },
    description:
      "Perched dramatically on limestone cliffs, The Edge is one of Bali's most iconic venues. This architectural masterpiece offers breathtaking ocean views and world-class facilities for unforgettable celebrations.",
  },
  {
    id: 8,
    name: "Alila Manggis",
    slogan: "Coastal Tranquility Redefined",
    city: "Manggis",
    province: "Bali",
    capacity: 0,
    startingPrice: 0,
    category: "signature",
    weddingConcept: {
      type: "intimate",
      theme: "resort_luxury",
    },
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "Set along a black sand beach with Mount Agung as backdrop, Alila Manggis offers serene luxury and authentic Balinese hospitality. The resort provides intimate spaces for meaningful celebrations.",
  },
  {
    id: 9,
    name: "The Ungasan Clifftop Resort",
    slogan: "Cliffside Luxury Sanctuary",
    city: "Uluwatu",
    province: "Bali",
    capacity: 0,
    startingPrice: 0,
    category: "signature",
    weddingConcept: {
      type: "intimate",
      theme: "cliffside",
    },
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "A collection of luxury villas perched on dramatic cliffs overlooking the Indian Ocean. The Ungasan offers unparalleled privacy and sophistication for exclusive celebrations.",
  },
  {
    id: 10,
    name: "Jeeva Saba Estate",
    slogan: "Secluded Beachfront Paradise",
    city: "Gianyar",
    province: "Bali",
    capacity: 0,
    startingPrice: 0,
    category: "private_villa",
    weddingConcept: {
      type: "intimate",
      theme: "private_villa_estate",
    },
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "A stunning beachfront estate offering complete privacy and natural beauty. Jeeva Saba combines traditional Balinese architecture with modern luxury, perfect for intimate villa celebrations.",
  },
  {
    id: 11,
    name: "Pandawa Cliff Estate",
    slogan: "Cliffside Elegance",
    city: "Uluwatu",
    province: "Bali",
    capacity: 0,
    startingPrice: 0,
    category: "private_villa",
    weddingConcept: {
      type: "intimate",
      theme: "cliffside",
    },
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "Perched above Pandawa Beach, this exclusive villa offers breathtaking cliff and ocean views. The estate provides ultimate privacy for intimate celebrations with panoramic vistas.",
  },
  {
    id: 12,
    name: "Uma Kalai",
    slogan: "Ubud Jungle Retreat",
    city: "Ubud",
    province: "Bali",
    capacity: 0,
    startingPrice: 0,
    category: "private_villa",
    weddingConcept: {
      type: "elopement",
      theme: "forest_jungle",
    },
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "Nestled in Ubud's tranquil jungle, Uma Kalai offers authentic Balinese villa living with modern comforts. Perfect for couples seeking intimate jungle celebrations surrounded by nature.",
  },
  {
    id: 13,
    name: "Villa Vedas Bali",
    slogan: "Tropical Garden Oasis",
    city: "Canggu",
    province: "Bali",
    capacity: 0,
    startingPrice: 0,
    category: "private_villa",
    weddingConcept: {
      type: "intimate",
      theme: "garden",
    },
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "A beautifully designed villa featuring lush tropical gardens and contemporary Balinese architecture. Villa Vedas offers an intimate garden setting for romantic celebrations.",
  },
  {
    id: 14,
    name: "Nag Shampa Private Estate",
    slogan: "Beachfront Luxury Living",
    city: "Seminyak",
    province: "Bali",
    capacity: 0,
    startingPrice: 0,
    category: "private_villa",
    weddingConcept: {
      type: "intimate",
      theme: "beachfront",
    },
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "An expansive beachfront estate offering direct beach access and sophisticated living spaces. Nag Shampa provides the perfect blend of privacy and luxury for intimate celebrations.",
  },
  {
    id: 15,
    name: "Villa Florimar",
    slogan: "Coastal Contemporary Haven",
    city: "Sanur",
    province: "Bali",
    capacity: 0,
    startingPrice: 0,
    category: "private_villa",
    weddingConcept: {
      type: "elopement",
      theme: "oceanfront",
    },
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "A stylish beachfront villa featuring contemporary design and serene coastal views. Villa Florimar offers intimate oceanfront settings for romantic elopements.",
  },
  {
    id: 16,
    name: "Villa Kavya",
    slogan: "Clifftop Paradise",
    city: "Uluwatu",
    province: "Bali",
    capacity: 0,
    startingPrice: 0,
    category: "private_villa",
    weddingConcept: {
      type: "intimate",
      theme: "cliffside",
    },
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "A luxurious clifftop villa offering spectacular ocean views and modern amenities. Villa Kavya provides an exclusive setting for intimate celebrations with breathtaking vistas.",
  },
  {
    id: 17,
    name: "The Iman Villa",
    slogan: "Secluded Villa Sanctuary",
    city: "Canggu",
    province: "Bali",
    capacity: 0,
    startingPrice: 0,
    category: "private_villa",
    weddingConcept: {
      type: "elopement",
      theme: "private_villa",
    },
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "An intimate private villa offering complete seclusion and personalized service. The Iman Villa is perfect for couples seeking privacy and tranquility for their elopement.",
  },
  {
    id: 18,
    name: "Villa Ombak Biru",
    slogan: "Oceanfront Intimacy",
    city: "Seminyak",
    province: "Bali",
    capacity: 0,
    startingPrice: 0,
    category: "private_villa",
    weddingConcept: {
      type: "elopement",
      theme: "oceanfront",
    },
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "A charming oceanfront villa offering direct beach access and intimate spaces. Villa Ombak Biru provides the perfect setting for romantic beachfront elopements.",
  },
];

export const getVenuesByCategory = (category: VenueCategory) => {
  return weddingConceptVenues.filter((venue) => venue.category === category);
};

export const getVenuesByLocation = (location: string) => {
  if (location === "All") return weddingConceptVenues;
  return weddingConceptVenues.filter((venue) => venue.city === location);
};

export const getVenuesByCategoryAndLocation = (
  category: VenueCategory,
  location: string
) => {
  let venues = getVenuesByCategory(category);
  if (location !== "All") {
    venues = venues.filter((venue) => venue.city === location);
  }
  return venues;
};
