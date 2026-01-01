export type WeddingThemeType = "elopement" | "intimate";
export type VenueCategoryType = "signature" | "private_villa";
export type CityType =
  | "uluwatu"
  | "ubud"
  | "sanur"
  | "canggu"
  | "seminyak"
  | "manggis"
  | "gianyar"
  | "jimbaran"
  | "all";

// ============================================
// LOCATION DATA
// ============================================
export interface City {
  id: CityType;
  name: string;
  provinceId: string;
  slug: string;
}

export interface Province {
  id: string;
  name: string;
  slug: string;
}

// Cities data
export const cities: City[] = [
  { id: "uluwatu", name: "Uluwatu", provinceId: "bali", slug: "uluwatu" },
  { id: "ubud", name: "Ubud", provinceId: "bali", slug: "ubud" },
  { id: "sanur", name: "Sanur", provinceId: "bali", slug: "sanur" },
  { id: "canggu", name: "Canggu", provinceId: "bali", slug: "canggu" },
  { id: "seminyak", name: "Seminyak", provinceId: "bali", slug: "seminyak" },
  { id: "manggis", name: "Manggis", provinceId: "bali", slug: "manggis" },
  { id: "gianyar", name: "Gianyar", provinceId: "bali", slug: "gianyar" },
  { id: "jimbaran", name: "Jimbaran", provinceId: "bali", slug: "jimbaran" },
];

// Province data
export const provinces: Province[] = [
  { id: "bali", name: "Bali", slug: "bali" },
];

// ============================================
// MASTER & RELATIONAL DATA
// ============================================

export interface Venue {
  id: number;
  name: string;
  slogan: string;
  location: {
    cityId: CityType;
    provinceId: string;
  };
  capacity: number;
  startingPrice: number;
  images: {
    hero: string;
    gallery: string[];
  };
  description: string;

  availability: {
    forThemes: boolean;
    forVenueCategory: boolean;
  };

  themeRelations?: {
    themeType: WeddingThemeType;
    themeName: string;
  }[];

  categoryRelations?: {
    category: VenueCategoryType;
  };
}

export interface WeddingTheme {
  id: string;
  type: WeddingThemeType;
  title: string;
  description: string;
  themeName: string;
  venueId: number | undefined;
  image: string;
  gallery: string[];
  inclusions: string[];
}

export interface VenueCategory {
  id: VenueCategoryType;
  name: "Signature Venues" | "Private Villas";
  slug: VenueCategoryType;
  description: string;
  bannerImage: string;
}

// ============================================
// WEDDING THEMES DATA
// ============================================

export const elopementThemes: WeddingTheme[] = [
  {
    id: "cliffside-elopement",
    type: "elopement",
    title: "Cliffside Elopement",
    description:
      "Exchange vows on dramatic clifftops overlooking the endless ocean, where earth meets sky in perfect harmony.",
    themeName: "cliffside",
    venueId: undefined,
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
    id: "waterfall-elopement",
    type: "elopement",
    title: "Waterfall Elopement",
    description:
      "Say 'I do' surrounded by the soothing sounds of cascading water in a hidden tropical paradise.",
    themeName: "waterfall",
    venueId: undefined,
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
    id: "forest-jungle-elopement",
    type: "elopement",
    title: "Forest & Jungle Elopement",
    description:
      "Celebrate your union beneath ancient trees in an enchanting natural cathedral of green.",
    themeName: "forest_jungle",
    venueId: undefined,
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
    id: "private-villa-elopement",
    type: "elopement",
    title: "Private Villa Elopement",
    description:
      "Intimate luxury in an exclusive villa setting, where privacy and elegance create your perfect moment.",
    themeName: "private_villa",
    venueId: undefined,
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
    id: "oceanfront-elopement",
    type: "elopement",
    title: "Oceanfront Elopement",
    description:
      "Feel the sand beneath your feet as you commit to forever with the gentle rhythm of waves as your witness.",
    themeName: "oceanfront",
    venueId: undefined,
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
    id: "private-villa-estate",
    type: "intimate",
    title: "Private Villa Estate Weddings",
    description:
      "Host your closest loved ones in an exclusive villa estate featuring stunning architecture and manicured gardens.",
    themeName: "private_villa_estate",
    venueId: undefined,
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
    id: "luxury-resort-intimate",
    type: "intimate",
    title: "Luxury Resort Intimate Weddings",
    description:
      "Experience world-class hospitality and breathtaking venues within prestigious resort properties.",
    themeName: "resort_luxury",
    venueId: undefined,
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
    id: "garden-riverside",
    type: "intimate",
    title: "Garden & Riverside Weddings",
    description:
      "Celebrate amidst blooming florals and flowing waters in serene natural garden settings.",
    themeName: "garden",
    venueId: undefined,
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
    id: "cultural-architectural",
    type: "intimate",
    title: "Cultural & Architectural Settings",
    description:
      "Honor tradition in venues that showcase Bali's rich cultural heritage and stunning architecture.",
    themeName: "cultural",
    venueId: 19,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1762945273/Wedding-1_nbmcae.png",
    gallery: [
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
    id: "destination-intimate",
    type: "intimate",
    title: "Destination Intimate Celebrations",
    description:
      "Create unforgettable memories in unique destination venues that perfectly frame your love story.",
    themeName: "destination",
    venueId: undefined,
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
  {
    id: "forest-jungle-intimate",
    type: "intimate",
    title: "Intimate Jungle or Forest Weddings",
    description:
      "Celebrate your union beneath ancient trees in an enchanting natural cathedral of green.",
    themeName: "forest_jungle",
    venueId: 20,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767177794/wedding3_p67d1q.png",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767177794/wedding3_p67d1q.png",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767177794/wedding_2_euqnhw.png",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767177794/Wedding_1_mhx7ts.png",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767177847/wedding_8_wdmeld.png",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767177795/wedding_7_u5ltxb.png",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767177791/Wedding_5_cvnerq.png",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767177791/wedding_4_hkr0qy.png",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767177791/wedding_6_ex3tgu.png",
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
];

// ============================================
// VENUE MASTER DATA
// ============================================

export const venues: Venue[] = [
  {
    id: 1,
    name: "COMO Shambhala Estate",
    slogan: "Holistic Wellness Sanctuary",
    location: {
      cityId: "ubud",
      provinceId: "bali",
    },
    capacity: 0,
    startingPrice: 0,
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
    availability: {
      forThemes: true,
      forVenueCategory: true,
    },
    themeRelations: [
      {
        themeType: "intimate",
        themeName: "wellness_retreat",
      },
    ],
    categoryRelations: {
      category: "signature",
    },
  },
  {
    id: 2,
    name: "Bambu Indah",
    slogan: "Sustainable Bamboo Luxury",
    location: {
      cityId: "ubud",
      provinceId: "bali",
    },
    capacity: 0,
    startingPrice: 0,
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "An eco-luxury boutique hotel showcasing extraordinary bamboo architecture. Bambu Indah offers a unique blend of sustainability and sophistication, perfect for couples who value environmental consciousness without compromising on luxury.",
    availability: {
      forThemes: true,
      forVenueCategory: true,
    },
    themeRelations: [
      {
        themeType: "intimate",
        themeName: "eco_luxury",
      },
    ],
    categoryRelations: {
      category: "signature",
    },
  },
  {
    id: 3,
    name: "Sayan House",
    slogan: "Contemporary Jungle Elegance",
    location: {
      cityId: "ubud",
      provinceId: "bali",
    },
    capacity: 0,
    startingPrice: 0,
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "Perched above the Ayung River valley, Sayan House features striking contemporary design harmonizing with natural surroundings. The venue offers panoramic jungle views and sophisticated spaces for intimate celebrations.",
    availability: {
      forThemes: true,
      forVenueCategory: true,
    },
    themeRelations: [
      {
        themeType: "intimate",
        themeName: "modern_tropical",
      },
    ],
    categoryRelations: {
      category: "signature",
    },
  },
  {
    id: 4,
    name: "Pantai Lima Estate",
    slogan: "Beachfront Architectural Marvel",
    location: {
      cityId: "canggu",
      provinceId: "bali",
    },
    capacity: 0,
    startingPrice: 0,
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "A stunning beachfront estate featuring contemporary architecture and direct beach access. Pantai Lima Estate combines modern luxury with the raw beauty of Bali's coastline, ideal for sophisticated beach celebrations.",
    availability: {
      forThemes: true,
      forVenueCategory: true,
    },
    themeRelations: [
      {
        themeType: "intimate",
        themeName: "beachfront",
      },
    ],
    categoryRelations: {
      category: "signature",
    },
  },
  {
    id: 5,
    name: "Noku Beach House",
    slogan: "Oceanfront Serenity",
    location: {
      cityId: "seminyak",
      provinceId: "bali",
    },
    capacity: 0,
    startingPrice: 0,
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "An exclusive beachfront venue offering unobstructed ocean views and contemporary tropical design. Noku Beach House provides refined elegance for intimate seaside celebrations.",
    availability: {
      forThemes: true,
      forVenueCategory: true,
    },
    themeRelations: [
      {
        themeType: "intimate",
        themeName: "beachfront",
      },
    ],
    categoryRelations: {
      category: "signature",
    },
  },
  {
    id: 6,
    name: "Arnalaya Beach House",
    slogan: "Coastal Sophistication",
    location: {
      cityId: "canggu",
      provinceId: "bali",
    },
    capacity: 0,
    startingPrice: 0,
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "A beautifully designed beachfront property combining Balinese charm with modern amenities. Arnalaya Beach House offers an intimate setting with direct beach access and stunning sunset views.",
    availability: {
      forThemes: true,
      forVenueCategory: true,
    },
    themeRelations: [
      {
        themeType: "intimate",
        themeName: "beachfront",
      },
    ],
    categoryRelations: {
      category: "signature",
    },
  },
  {
    id: 7,
    name: "The Edge Bali",
    slogan: "Cliffside Architectural Icon",
    location: {
      cityId: "uluwatu",
      provinceId: "bali",
    },
    capacity: 0,
    startingPrice: 0,
    images: {
      hero: "https://res.cloudinary.com/dzerxindp/image/upload/v1767126415/Ceremony_at_The_View_1_pb6vjt.jpg",
      gallery: [
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767126415/Ceremony_at_The_View_1_pb6vjt.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767126412/Ceremony_at_The_View_2_bawsvk.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767126518/Ceremony_at_The_View_13_pkfvol.jpg",
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
    availability: {
      forThemes: true,
      forVenueCategory: true,
    },
    themeRelations: [
      {
        themeType: "intimate",
        themeName: "cliffside",
      },
    ],
    categoryRelations: {
      category: "signature",
    },
  },
  {
    id: 8,
    name: "Alila Manggis",
    slogan: "Coastal Tranquility Redefined",
    location: {
      cityId: "manggis",
      provinceId: "bali",
    },
    capacity: 0,
    startingPrice: 0,
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "Set along a black sand beach with Mount Agung as backdrop, Alila Manggis offers serene luxury and authentic Balinese hospitality. The resort provides intimate spaces for meaningful celebrations.",
    availability: {
      forThemes: true,
      forVenueCategory: true,
    },
    themeRelations: [
      {
        themeType: "intimate",
        themeName: "resort_luxury",
      },
    ],
    categoryRelations: {
      category: "signature",
    },
  },
  {
    id: 9,
    name: "The Ungasan Clifftop Resort",
    slogan: "Cliffside Luxury Sanctuary",
    location: {
      cityId: "uluwatu",
      provinceId: "bali",
    },
    capacity: 0,
    startingPrice: 0,
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "A collection of luxury villas perched on dramatic cliffs overlooking the Indian Ocean. The Ungasan offers unparalleled privacy and sophistication for exclusive celebrations.",
    availability: {
      forThemes: true,
      forVenueCategory: true,
    },
    themeRelations: [
      {
        themeType: "intimate",
        themeName: "cliffside",
      },
    ],
    categoryRelations: {
      category: "signature",
    },
  },
  {
    id: 10,
    name: "Jeeva Saba Estate",
    slogan: "Secluded Beachfront Paradise",
    location: {
      cityId: "gianyar",
      provinceId: "bali",
    },
    capacity: 0,
    startingPrice: 0,
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "A stunning beachfront estate offering complete privacy and natural beauty. Jeeva Saba combines traditional Balinese architecture with modern luxury, perfect for intimate villa celebrations.",
    availability: {
      forThemes: true,
      forVenueCategory: false,
    },
    themeRelations: [
      {
        themeType: "intimate",
        themeName: "private_villa_estate",
      },
    ],
  },
  {
    id: 11,
    name: "Pandawa Cliff Estate",
    slogan: "Cliffside Elegance",
    location: {
      cityId: "uluwatu",
      provinceId: "bali",
    },
    capacity: 0,
    startingPrice: 0,
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "Perched above Pandawa Beach, this exclusive villa offers breathtaking cliff and ocean views. The estate provides ultimate privacy for intimate celebrations with panoramic vistas.",
    availability: {
      forThemes: true,
      forVenueCategory: true,
    },
    themeRelations: [
      {
        themeType: "intimate",
        themeName: "cliffside",
      },
    ],
    categoryRelations: {
      category: "private_villa",
    },
  },
  {
    id: 12,
    name: "Uma Kalai",
    slogan: "Private Villa Wedding Venue in Bali",
    location: {
      cityId: "ubud",
      provinceId: "bali",
    },
    capacity: 0,
    startingPrice: 0,
    images: {
      hero: "https://res.cloudinary.com/dzerxindp/image/upload/v1762412265/Hero-1_hsslnr.png",
      gallery: [
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412265/Hero-1_hsslnr.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412261/Hero-2_ywj1jm.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412265/Hero-3_or6ske.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412262/Hero-4_c9kodj.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412046/Wedding-1_fgmshs.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412109/Wedding-2_swb4bc.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412124/Wedding-3_zwpaho.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412113/Wedding-4_bxqbsa.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412135/Wedding-5_t7twn5.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412133/Wedding-6_wsgjk6.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412126/Wedding-7_wadlje.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412165/Wedding-8_bfxhyn.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412170/Wedding-9_jcsc84.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412107/Wedding-10_cnhyag.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412047/Wedding-11_p3emmd.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412087/Wedding-12_yqx5yi.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412085/Wedding-13_dnoo7w.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412068/Wedding-14_nixpbj.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412049/Wedding-15_w3afos.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412177/Facilities-1_ymxt1s.png",
        // "https://res.cloudinary.com/dzerxindp/image/upload/v1762412208/Facilities-2_j7gby2.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412223/Facilities-3_w2lbdr.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412214/Facilities-4_c2cg5o.png",
        // "https://res.cloudinary.com/dzerxindp/image/upload/v1762412229/Facilities-5_fqydzj.png",
        // "https://res.cloudinary.com/dzerxindp/image/upload/v1762412230/Facilities-6_tzhdt2.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412225/Facilities-7_j6xuzy.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412246/Facilities-8_dnhz4q.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412259/Facilities-9_blro6n.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412176/Facilities-10_qscvgy.png",
        // "https://res.cloudinary.com/dzerxindp/image/upload/v1762412189/Facilities-11_etukal.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412174/Facilities-12_tnwula.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762411958/Room-1_s2zgqg.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412001/Room-2_ljn2ej.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762411990/Room-3_tc2wnl.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412020/Room-4_laf6fd.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412018/Room-5_ye8acx.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412028/Room-6_qjb7ib.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412032/Room-7_epagy3.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762411953/Room-8_blsxaq.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412046/Room-9_zjuyyb.png",
        // "https://res.cloudinary.com/dzerxindp/image/upload/v1762411978/Room-10_xameee.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762411994/Room-11_srasqm.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762412005/Room-12_uhkprj.png",
        // "https://res.cloudinary.com/dzerxindp/image/upload/v1762411955/Lifestyle-1_mruckr.png",
        // "https://res.cloudinary.com/dzerxindp/image/upload/v1762411962/Lifestyle-2_ubs2hs.png",
        // "https://res.cloudinary.com/dzerxindp/image/upload/v1762411955/Lifestyle-3_gch7p8.png",
        // "https://res.cloudinary.com/dzerxindp/image/upload/v1762411965/Lifestyle-4_qnhyal.png",
        // "https://res.cloudinary.com/dzerxindp/image/upload/v1762411988/Lifestyle-5_p7kd7u.png",
        // "https://res.cloudinary.com/dzerxindp/image/upload/v1762411975/Lifestyle-6_xh8lms.png",
        // "https://res.cloudinary.com/dzerxindp/image/upload/v1762411992/Lifestyle-7_etyjwi.png",
      ],
    },
    description:
      "Hidden in the lush hills of Sayan, Uma Kalai Ubud is a luxury private villa wedding venue where romance meets nature. Set against panoramic rice field views, this exclusive estate offers an intimate setting for small weddings and elopements of up to 40 guests. Blending Balinese heritage with refined modern elegance, Uma Kalai invites couples to celebrate love surrounded by breathtaking landscapes, curated wellness experiences, and the soulful energy of Ubud — creating a truly timeless Bali wedding experience.",
    availability: {
      forThemes: false,
      forVenueCategory: true,
    },
    categoryRelations: {
      category: "private_villa",
    },
  },
  {
    id: 13,
    name: "Villa Vedas Bali",
    slogan: "Tropical Garden Oasis",
    location: {
      cityId: "canggu",
      provinceId: "bali",
    },
    capacity: 0,
    startingPrice: 0,
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "A beautifully designed villa featuring lush tropical gardens and contemporary Balinese architecture. Villa Vedas offers an intimate garden setting for romantic celebrations.",
    availability: {
      forThemes: true,
      forVenueCategory: true,
    },
    themeRelations: [
      {
        themeType: "intimate",
        themeName: "garden",
      },
    ],
    categoryRelations: {
      category: "private_villa",
    },
  },
  {
    id: 14,
    name: "Nag Shampa Private Estate",
    slogan: "Beachfront Luxury Living",
    location: {
      cityId: "seminyak",
      provinceId: "bali",
    },
    capacity: 0,
    startingPrice: 0,
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "An expansive beachfront estate offering direct beach access and sophisticated living spaces. Nag Shampa provides the perfect blend of privacy and luxury for intimate celebrations.",
    availability: {
      forThemes: true,
      forVenueCategory: true,
    },
    themeRelations: [
      {
        themeType: "intimate",
        themeName: "beachfront",
      },
    ],
    categoryRelations: {
      category: "private_villa",
    },
  },
  {
    id: 15,
    name: "Villa Florimar",
    slogan: "Coastal Contemporary Haven",
    location: {
      cityId: "sanur",
      provinceId: "bali",
    },
    capacity: 0,
    startingPrice: 0,
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "A stylish beachfront villa featuring contemporary design and serene coastal views. Villa Florimar offers intimate oceanfront settings for romantic elopements.",
    availability: {
      forThemes: true,
      forVenueCategory: true,
    },
    themeRelations: [
      {
        themeType: "elopement",
        themeName: "oceanfront",
      },
    ],
    categoryRelations: {
      category: "private_villa",
    },
  },
  {
    id: 16,
    name: "Villa Kavya",
    slogan: "Clifftop Paradise",
    location: {
      cityId: "uluwatu",
      provinceId: "bali",
    },
    capacity: 0,
    startingPrice: 0,
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "A luxurious clifftop villa offering spectacular ocean views and modern amenities. Villa Kavya provides an exclusive setting for intimate celebrations with breathtaking vistas.",
    availability: {
      forThemes: true,
      forVenueCategory: true,
    },
    themeRelations: [
      {
        themeType: "intimate",
        themeName: "cliffside",
      },
    ],
    categoryRelations: {
      category: "private_villa",
    },
  },
  {
    id: 17,
    name: "The Iman Villa",
    slogan: "Secluded Villa Sanctuary",
    location: {
      cityId: "canggu",
      provinceId: "bali",
    },
    capacity: 0,
    startingPrice: 0,
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "An intimate private villa offering complete seclusion and personalized service. The Iman Villa is perfect for couples seeking privacy and tranquility for their elopement.",
    availability: {
      forThemes: true,
      forVenueCategory: false,
    },
    themeRelations: [
      {
        themeType: "elopement",
        themeName: "private_villa",
      },
    ],
  },
  {
    id: 18,
    name: "Villa Ombak Biru",
    slogan: "Oceanfront Intimacy",
    location: {
      cityId: "seminyak",
      provinceId: "bali",
    },
    capacity: 0,
    startingPrice: 0,
    images: {
      hero: "",
      gallery: [""],
    },
    description:
      "A charming oceanfront villa offering direct beach access and intimate spaces. Villa Ombak Biru provides the perfect setting for romantic beachfront elopements.",
    availability: {
      forThemes: true,
      forVenueCategory: false,
    },
    themeRelations: [
      {
        themeType: "elopement",
        themeName: "oceanfront",
      },
    ],
  },
  {
    id: 19,
    name: "The Sanctoo Suite and Villas",
    slogan: "A Serene & Elegant Wedding Venue",
    location: {
      cityId: "ubud",
      provinceId: "bali",
    },
    capacity: 0,
    startingPrice: 0,
    images: {
      hero: "https://res.cloudinary.com/dzerxindp/image/upload/v1762945273/Wedding-1_nbmcae.png",
      gallery: [
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945250/Hero-2_pqkyqg.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945247/Hero-1_pfuhns.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945251/Hero-3_srju4t.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945255/Hero-4_dd6hvy.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945256/Hero-5_sese0t.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1762945253/Hero-6_x4fgvz.png",
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
    },
    description:
      "Escape the ordinary and embrace the extraordinary with a wedding at Sanctoo Suites and Villas. Our serene setting, limited to 120 guests,provides an intimate and tranquil backdrop for your special day. With a focus on personalized service and seamless coordination, we create a truly unforgettable wedding experience that blendselegance with effortless grace. Experience a truly unforgettable wedding dinner at Sanctoo Suites and Villas. Our talented decorators are dedicated to fulfilling the bride's every wish, creating a captivating ambiance with stunning floral arrangements, elegant table settings, and captivating lighting. Whether you prefer the grandeur of long tables or the intimacy of round tables, we will tailor your wedding feast to create a truly magical experience.",
    availability: {
      forThemes: true,
      forVenueCategory: false,
    },
    themeRelations: [
      {
        themeType: "intimate",
        themeName: "cultural",
      },
    ],
  },
  {
    id: 20,
    name: "Hiliwatu Ubud",
    slogan: "An Intimate Jungle Forest Wedding Sanctuary",
    location: {
      cityId: "ubud",
      provinceId: "bali",
    },
    capacity: 0,
    startingPrice: 0,
    images: {
      hero: "https://res.cloudinary.com/dzerxindp/image/upload/v1767178450/TX_DPSHB_AERIAL_02_zwhgt7.jpg",
      gallery: [
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767178450/TX_DPSHB_AERIAL_02_zwhgt7.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767178465/TX_DPSHB_AERIAL_01_n4ohfx.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767178452/TX_DPSHB_LOBBY_hqkgpz.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767178450/Suite_Room_fxycmb.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767178450/Suite_Room_2_vsduje.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767178450/Suite_Room_3_gu8dlm.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767178450/Suite_Room_4_wng49c.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767178453/TX_DPSHB_SUITE_BATHROOM_qld8kv.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767178454/TX_DPSHB_SUITE_BERDROOM_OUTWARDS_yqvprj.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767178455/TX_DPSHB_ONE_BEDROOM_VILLA_BEDROOM_INWARD_yxbfed.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767178457/TX_DPSHB_ONE_BEDROOM_VILLA_BEDROOM_OUTWARD_a5rayi.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767178458/TX_DPSHB_SUITE_BEDROOM_INWARDS_vqr4cj.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767178458/TX_DPSHB_ONE_BEDROOM_VILLA_POOL_ylnmd6.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767178476/TX_DPSHB_SUITE_BALCONY_tnhywb.jpg",
      ],
    },
    description:
      "Hiliwatu Ubud is an exclusive oceanfront venue perched on Bali’s dramatic cliffs, offering breathtaking sea views and a serene atmosphere. Designed for intimate and private celebrations, this venue is ideal for couples seeking a romantic elopement or a small, elegant wedding surrounded by nature and ocean breeze.",
    availability: {
      forThemes: true,
      forVenueCategory: false,
    },
    themeRelations: [
      {
        themeType: "intimate",
        themeName: "forest_jungle",
      },
    ],
  },
];

// ============================================
// CATEGORY IMAGES
// ============================================

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

// ============================================
// VENUE CATEGORIES
// ============================================

export const venueCategories: VenueCategory[] = [
  {
    id: "signature",
    name: "Signature Venues",
    slug: "signature",
    description:
      "Iconic and prestigious venues featuring world-class amenities and breathtaking locations.",
    bannerImage: "/images/categories/signature-venues-banner.jpg",
  },
  {
    id: "private_villa",
    name: "Private Villas",
    slug: "private_villa",
    description:
      "Exclusive private villas offering intimate settings and complete privacy for your celebration.",
    bannerImage: "/images/categories/private-villas-banner.jpg",
  },
];
