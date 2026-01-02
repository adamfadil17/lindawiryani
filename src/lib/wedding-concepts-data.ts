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
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767252613/Wedding-1_mrvjc2.jpg",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767252613/Wedding-1_mrvjc2.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767252661/Wedding-2_jlrblv.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767252637/Wedding-3_ybyaba.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767252627/Wedding-4_l9r5zf.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767252660/Wedding-5_hglest.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767252620/Wedding-6_q7biuj.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767252595/Wedding-7_pix2zq.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767252604/Wedding-9_dhtcvi.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767252626/Wedding-10_yurp97.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767252629/Wedding-11_or8jcu.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767252610/Wedding-12_eedanq.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767252616/Wedding-13_m8lcyr.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767252645/Wedding-14_kkjk3e.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767252633/Wedding-15_lvplib.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767252651/Wedding-16_vhcwq9.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767252653/Wedding-17_rxuvix.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767252639/Wedding-18_gyatkk.jpg",
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
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767346132/Wedding_1_qx5c5n.jpg",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767346132/Wedding_1_qx5c5n.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767346133/Wedding_2_qewqpg.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767346137/Wedding_3_rxfguf.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767346138/Wedding_4_htlkyl.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767346140/Wedding_5_exmfpf.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767346142/Wedding_6_ep0xov.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767346143/Wedding_7_gjd4lv.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767346146/Wedding_8_cxfhck.jpg",
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
      hero: "https://res.cloudinary.com/dzerxindp/image/upload/v1767345907/Cover_1_ajxnjv.jpg",
      gallery: [
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345573/Wedding_1_zpep7m.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345638/Wedding_2_mpjhkn.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345594/Wedding_2_k8em3j.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345887/Wedding_3_umwzry.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345898/Wedding_4_qkdhxo.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345894/Wedding_5_lehwjl.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345898/Wedding_6_bsdksk.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345899/Wedding_7_nhuq25.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345903/Wedding_8_s2gfti.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345904/Wedding_9_eykq3e.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345560/Wedding_10_mqkk1v.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345572/Wedding_11_zkszx2.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345561/Wedding_12_ucurzt.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345566/Wedding_13_kp62st.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345577/Wedding_14_b6w8hm.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345579/Wedding_15_g1uxjm.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345583/Wedding_16_kl9wt8.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345587/Wedding_17_sg8mxw.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345590/Wedding_18_nnx6an.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345593/Wedding_19_co8xrv.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345867/Wedding_20_tw42id.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345867/Wedding_21_mbybsh.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345869/Wedding_22_etrs2a.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345871/Wedding_23_fphoon.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345874/Wedding_24_pi3oxk.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345875/Wedding_25_bubl69.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345879/Wedding_26_dsknf0.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345880/Wedding_27_ecfhgp.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345883/Wedding_28_cofmm8.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345884/Wedding_29_xplywh.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345888/Wedding_30_nk8qop.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345889/Wedding_31_m2qs4f.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345892/Wedding_32_bo1iao.png",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345893/Wedding_33_xa70nv.png",
      ],
    },
    description:
      "Nestled in the heart of Ubud's lush jungle, COMO Shambhala Estate offers a transformative wellness experience. This holistic sanctuary combines Balinese healing traditions with contemporary wellness practices, creating an intimate setting for couples seeking meaningful celebration.",
    availability: {
      forThemes: false,
      forVenueCategory: true,
    },
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
      forThemes: false,
      forVenueCategory: true,
    },
    categoryRelations: {
      category: "signature",
    },
  },
  {
    id: 3,
    name: "The Sayan House",
    slogan: "Contemporary Jungle Elegance",
    location: {
      cityId: "ubud",
      provinceId: "bali",
    },
    capacity: 0,
    startingPrice: 0,
    images: {
      hero: "https://res.cloudinary.com/dzerxindp/image/upload/v1767345367/Cover_1_cqzl9a.jpg",
      gallery: [
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345367/Cover_1_cqzl9a.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345353/Facilities_1_obbe0j.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345366/Facilities_2_ugbkga.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345365/Facilities_3_h5btbc.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345352/Facilities_4_wuzaiq.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345352/Facilities_5_aij3mj.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345361/Facilities_6_nejhhr.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345360/Facilities_7_vhojw2.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345358/Facilities_8_vjgmcj.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345355/Facilities_9_infzku.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345356/Facilities_10_jmdbgj.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345353/Facilities_11_mgf9lk.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345360/Facilities_12_azv9c0.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345365/Facilities_14_gke1vx.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345363/Facilities_15_acgpci.jpg",
      ],
    },
    description:
      "Perched above the Ayung River valley, The Sayan House features striking contemporary design harmonizing with natural surroundings. The venue offers panoramic jungle views and sophisticated spaces for intimate celebrations.",
    availability: {
      forThemes: false,
      forVenueCategory: true,
    },
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
      forThemes: false,
      forVenueCategory: true,
    },
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
      forThemes: false,
      forVenueCategory: true,
    },
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
      forThemes: false,
      forVenueCategory: true,
    },
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
      hero: "https://res.cloudinary.com/dzerxindp/image/upload/v1767344966/Cover_1_sk4zxm.jpg",
      gallery: [
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767344966/Cover_1_sk4zxm.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345113/Ceremony_at_The_One_2_fii5eq.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345116/Ceremony_at_The_One_3_fkhkn7.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345122/Ceremony_at_The_One_4_prmb2q.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345104/Ceremony_at_The_One_7_igzylj.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345106/Ceremony_at_The_One_8_szqsvt.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345112/Ceremony_at_The_One_9_nhk2gx.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345117/Ceremony_at_The_One_10_pxxeha.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345099/Ceremony_at_The_One_12_cxdvvk.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345119/Ceremony_at_The_One_13_kzvcto.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345120/Ceremony_at_The_One_15_ileyd9.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345099/Ceremony_at_The_One_17_amljpz.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345123/Ceremony_at_The_One_23_f9u4xr.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345107/Ceremony_at_The_One_24_yo61yn.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345105/Ceremony_at_The_One_25_jov06r.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345111/Ceremony_at_The_One_27_evxnf3.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345124/Ceremony_at_The_One_30_gztqjo.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345120/Ceremony_at_The_One_35_ozpicw.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345114/Dinner_at_The_One_2_fva98k.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345115/Dinner_at_The_One_3_ojkbkc.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345121/Dinner_at_The_One_5_syu2vq.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345101/Dinner_at_The_One_7_cjjlyr.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345115/Dinner_at_The_One_8_rldfmd.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345108/Dinner_at_The_One_10_umrnbw.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345109/Dinner_at_The_One_14_cpf8ur.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345110/Dinner_at_The_One_15_x0jbbv.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345118/Dinner_at_The_One_17_sc0ngv.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345109/Dinner_at_The_One_20_kcfxrs.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345103/Dinner_at_The_One_37_boaevh.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345100/Dinner_at_The_One_23_wclvd0.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345102/Dinner_at_The_One_38_d67ufg.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345077/Ceremony_at_The_View_1_gduepz.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345077/Ceremony_at_The_View_3_avqcly.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345096/Ceremony_at_The_View_5_rplk46.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345090/Ceremony_at_The_View_6_awau4c.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345095/Ceremony_at_The_View_7_qglez0.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345087/Ceremony_at_The_View_8_ur5vws.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345093/Ceremony_at_The_View_9_ht2fa4.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345080/Ceremony_at_The_View_12_sve6ma.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345092/Ceremony_at_The_View_14_zscmw2.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345096/Ceremony_at_The_View_18_nlvhxh.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345087/Ceremony_at_The_View_19_eoezuz.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345089/Ceremony_at_The_View_22_xuhrbv.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345085/Dinner_at_The_View_1_qfsoa4.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345082/Dinner_at_The_View_3_dndlrf.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345093/Dinner_at_The_View_4_ylqg9h.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345083/Dinner_at_The_View_5_mgmcws.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345094/Dinner_at_The_View_10_g0wqmy.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345088/Dinner_at_The_View_41_cdzsuk.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345084/Dinner_at_The_View_34_jpufbp.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345081/Dinner_at_The_View_35_1_q4y4wd.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345079/Dinner_at_The_View_50_r1gu5k.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345086/Dinner_at_The_View_49_dbnpmn.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345078/Dinner_at_The_View_56_vwgkrp.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345084/Dinner_at_The_View_61_bn3c15.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345091/Dinner_at_The_View_62_fusaku.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345039/Ceremony_at_The_Villa_1_rwermm.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345067/Ceremony_at_The_Villa_2_gnxv75.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345072/Ceremony_at_The_Villa_3_jd9kjz.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345074/Ceremony_at_The_Villa_5_ehopet.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345073/Ceremony_at_The_Villa_7_chup5w.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345075/Ceremony_at_The_Villa_8_d83gv8.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345064/Ceremony_at_The_Villa_9_bmno4l.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345048/Ceremony_at_The_Villa_12_mynm1h.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345038/Ceremony_at_The_Villa_14_q3q4q5.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345051/Ceremony_at_The_Villa_15_uu7snp.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345055/Ceremony_at_The_Villa_16_ib0j5l.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345041/Ceremony_at_The_Villa_19_jvrutf.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345041/Ceremony_at_The_Villa_25_wdgewv.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345041/Ceremony_at_The_Villa_26_r6aqun.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345062/Ceremony_at_The_Villa_27_idmtfi.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345048/Ceremony_at_The_Villa_28_fimifp.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345042/Ceremony_at_The_Villa_29_kdpmud.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345066/Ceremony_at_The_Villa_30_emt1a6.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345065/Ceremony_at_The_Villa_31_zdqsgf.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345042/Ceremony_at_The_Villa_32_ijrlme.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345057/Ceremony_at_The_Villa_33_kjmyk8.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345052/Ceremony_at_The_Villa_34_jmi1li.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345059/Ceremony_at_The_Villa_35_ntrixe.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345044/Ceremony_at_The_Villa_36_ttnr7m.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345053/Ceremony_at_The_Villa_37_cq2b1k.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345061/Ceremony_at_The_Villa_38_iqzj9p.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345058/Ceremony_at_The_Villa_39_imliyw.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345049/Ceremony_at_The_Villa_42_1_f2ibvf.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345050/Ceremony_at_The_Villa_45_jxyzep.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345060/Ceremony_at_The_Villa_46_wrivda.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345069/Ceremony_at_The_Villa_49_1_syaxgs.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345070/Ceremony_at_The_Villa_48_u9iewe.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345071/Ceremony_at_The_Villa_53_nkb8mx.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345073/Ceremony_at_The_Villa_59_mgcbdc.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345046/Ceremony_at_The_Villa_62_rflu0w.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345044/Dinner_at_The_Villa_1_nhdcjw.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345054/Dinner_at_The_Villa_3_kfyy3n.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345061/Dinner_at_The_Villa_4_ur3mur.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345068/Dinner_at_The_Villa_6_ho76h0.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345056/Dinner_at_The_Villa_9_mfqn0j.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345052/Dinner_at_The_Villa_12_wkhk0m.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345058/Dinner_at_The_Villa_13_ejnsk4.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345064/Dinner_at_The_Villa_16_changh.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345067/Dinner_at_The_Villa_19_wbkw92.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767345045/Dinner_at_The_Villa_23_o5mltr.jpg",
      ],
    },
    description:
      "Perched dramatically on limestone cliffs, The Edge is one of Bali's most iconic venues. This architectural masterpiece offers breathtaking ocean views and world-class facilities for unforgettable celebrations.",
    availability: {
      forThemes: false,
      forVenueCategory: true,
    },
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
      forThemes: false,
      forVenueCategory: true,
    },
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
      hero: "https://res.cloudinary.com/dzerxindp/image/upload/v1767365086/Villa_Jamadara_Common_Areas_MA059REV_rgb_eldlob.jpg",
      gallery: [
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365086/Villa_Jamadara_Common_Areas_MA059REV_rgb_eldlob.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364844/Villa_Ambar_Common_Areas_MA053_glplt4.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364871/Villa_Ambar_Common_Areas_MA068_k7jdol.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364859/Villa_Ambar_711_MA004_ts2vt2.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364846/Villa_Ambar_Common_Areas_MA067-66_p8cdwc.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364835/Villa_Ambar_Common_Areas_MA059-58_nhkgzb.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364833/Villa_Ambar_Common_Areas_MA083_nxy2xv.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364832/Villa_Ambar_711_MA001_aqhmv6.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364831/Villa_Ambar_711_MA005-6_vfoqkg.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364820/Villa_Ambar_714_MA033_wi3ikz.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364811/Villa_Ambar_714_MA024_gjaftx.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365024/Villa_Chintamani_Common_Areas_MA005_rgb_rfsth9.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365014/Villa_Chintamani_Common_Areas_MA046_rtsffj.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365005/Villa_Chintamani_Common_Areas_MA028_corfjb.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365002/Villa_Chintamani_Common_Areas_MA007-24R_rgb_lso2pb.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364972/Villa_Chintamani_Common_Areas_MA001_rgb_e5d5fr.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364929/Villa_Chintamani_Common_Areas_MA015_icxbnv.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364917/Villa_Chintamani_Private_Plunge_Suite_111_MA070_rgb_mh7mtn.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364917/Villa_Chintamani_Private_Plunge_Suite_114_MA093_rgb_qktmys.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364914/Villa_Chintamani_Ocean_View_Suite_110_4_zyyni1.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364909/Villa_Chintamani_Ocean_View_Suite_110_1_yaqjtz.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364909/Villa_Chintamani_Ocean_View_Suite_110_3_uftrdm.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364905/Villa_Chintamani_Ocean_View_Suite_110_2_ptkwis.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364905/Villa_Chintamani_Common_Areas_MA011-12_rgb_v2is8h.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364902/Villa_Chintamani_Common_Areas_MA014_rgb_jglf8p.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364898/Villa_Chintamani_Common_Areas_MA048_xsb2re.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365130/Villa_Jamadara_413_MA019_rgb_gb1uhy.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365085/Villa_Jamadara_Common_Areas_MA050REV_rgb_nte2j7.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365084/Villa_Jamadara_Common_Areas_MA034_rgb_yaz1bh.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365078/Villa_Jamadara_Common_Areas_MA152_rgb_befosk.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365075/Villa_Jamadara_414_MA022_rgb_jr2369.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365070/Villa_Jamadara_Common_Areas_MA105_rgb_dhwwks.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365066/Villa_Jamadara_Common_Areas_MA153_rgb_jwiktu.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365061/Villa_Jamadara_Common_Areas_MA133_rgb_myyzl4.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365059/Villa_Jamadara_Common_Areas_MA123_rgb_gtpkpb.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365055/Villa_Jamadara_Common_Areas_MA042REV_hfz2gc.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365054/Villa_Jamadara_414_MA028-27_rgb_jex3ig.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365050/Villa_Jamadara_Common_Areas_MA148_rgb_c3gpl8.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365050/Villa_Jamadara_Common_Areas_MA135-36_rgb_vm3tuz.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365193/Villa_Nora_Common_Areas_MA024_ixprkt.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365186/Villa_Nora_Garden_Terrace_213_MA077_rgb_vzy4dd.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365185/Villa_Nora_Common_Areas_MA016_k9pia8.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365178/Villa_Nora_Common_Areas_MA048_m53oyb.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365176/Villa_Nora_Garden_Terrace_213_MA079_rgb_vwrdjp.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365175/Villa_Nora_Ocean_View_Room_210_MA102_rgb_wfawlh.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365174/Villa_Nora_Common_Areas_MA027_rgb_hpduv7.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365165/Villa_Nora_Ocean_View_Room_210_MA097_rgb_vqcjuh.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365161/Villa_Nora_Common_Areas_MA054-55_z97yaw.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365158/Villa_Nora_Common_Areas_MA052_h67on5.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365157/Villa_Nora_Ocean_View_Room_210_MA094-95_rgb_h9qhwp.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365155/Villa_Nora_Garden_Terrace_214_MA087_rgb_bn6yzu.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365151/Villa_Nora_Garden_Terrace_214_MA091-90_jtnbcd.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365146/Villa_Nora_Garden_Terrace_212_MA076_rgb_gc31ou.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365145/Villa_Nora_Common_Areas_MA041_vw1ihl.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365137/Villa_Nora_Garden_Terrace_213_MA084_rgb_ifmt9k.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365247/Villa_Pawana_614_MA024_rgb_jznqdg.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365241/Villa_Pawana_Plunge_Pool_610_MA246_rgb_nobxoo.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365229/Villa_Pawana_Common_Areas_MA078_rgb_alf7ne.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365226/Villa_Pawana_Common_Areas_MA098_rgb_wocsst.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365224/Villa_Pawana_Common_Areas_MA105_rgb_pkxf9x.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365218/Villa_Pawana_Common_Areas_MA084REV_rgb_kltosi.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365217/Villa_Pawana_Common_Areas_MA096_rgb_gkhymu.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365209/Villa_Pawana_Common_Areas_MA094-95REV_rgb_vhlcue.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365209/Villa_Pawana_Plunge_Pool_610_MA107-06_rgb_jyeusy.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365206/Villa_Pawana_Plunge_Pool_610_MA241_rgb_skes96.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365287/VillaUngasanbyBI-110_doyr3x.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365280/VillaUngasanbyBI-2_fp47h3.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365274/VillaUngasanbyBI-13_awpziu.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365274/VillaUngasanbyBI-184_vhfnq1.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365273/VillaUngasanbyBI-193_c8mv6x.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365266/VillaUngasanbyBI-188_hz9uyt.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365265/VillaUngasanbyBI-172_ea044y.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365262/VillaUngasanbyBI-111_chbcum.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365262/VillaUngasanbyBI-160_etk88s.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365261/VillaUngasanbyBI-155_q9vxzr.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365256/VillaUngasanbyBI-104_cfnhre.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767365256/VillaUngasanbyBI-130_fpbnds.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364798/Villa_Tamarama_Common_Areas_MA082_rgb_a1f0i0.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364781/Villa_Tamarama_Common_Areas_MA074REV_rgb_kds4hd.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364779/Villa_Tamarama_Common_Areas_MA071_rgb_idzp7s.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364778/Villa_Tamarama_Common_Areas_MA038_rgb_qpyicg.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364770/Villa_Tamarama_Common_Areas_MA084_rgb_dmcw4l.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364764/Villa_Tamarama_Common_Areas_MA093_rgb_xssuls.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364749/Villa_Tamarama_Common_Areas_MA034_rgb_crvdmp.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364746/Villa_Tamarama_Common_Areas_MA062_rgb_ynhgrx.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364744/Villa_Tamarama_513_MA024-25_rgb_dhlbuu.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364742/Villa_Tamarama_513_MA017_rgb_b1lwpi.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364733/Villa_Tamarama_Common_Areas_MA088REV_rgb_rdtkfm.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364726/Villa_Tamarama_Common_Areas_MA057-56_rgb_xssmqj.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364725/Villa_Tamarama_512_MA007-6_rgb_v2_Large_buqiwu.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364721/Villa_Tamarama_Common_Areas_MA036_rgb_tx7tve.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767364720/Villa_Tamarama_First_Floor_Master_Bedroom_510_MA106_rgb_kgccmk.jpg",
        "",
      ],
    },
    description:
      "A collection of luxury villas perched on dramatic cliffs overlooking the Indian Ocean. The Ungasan offers unparalleled privacy and sophistication for exclusive celebrations.",
    availability: {
      forThemes: false,
      forVenueCategory: true,
    },
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
      forThemes: false,
      forVenueCategory: true,
    },
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
      hero: "https://res.cloudinary.com/dzerxindp/image/upload/v1767251755/Hero-1_gdbcyx.png",
      gallery: [
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251718/Hero-1_d9zumm.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251718/Hero-2_luytcz.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251719/Hero-3_ncf5kx.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251720/Hero-4_cdadtk.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251737/Wedding-1_wj2293.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251745/Wedding-2_gzxskt.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251746/Wedding-3_toebft.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251747/Wedding-4_bnifly.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251750/Wedding-5_m6a7z7.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251748/Wedding-6_ybuwdp.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251749/Wedding-7_vyulvw.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251751/Wedding-8_p58lsq.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251752/Wedding-9_eu2dmc.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251739/Wedding-10_npwjxb.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251741/Wedding-11_smmyvh.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251742/Wedding-12_qebmfr.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251742/Wedding-13_bbvacl.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251743/Wedding-14_zos6lk.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251744/Wedding-15_pm5vxi.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251711/Facilities-1_k71zal.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251712/Facilities-2_rx0oho.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251714/Facilities-3_ey3jvi.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251712/Facilities-4_dujknt.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251713/Facilities-5_axadms.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251714/Facilities-6_e6udk3.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251714/Facilities-7_muejjx.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251716/Facilities-8_eu4jbg.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251717/Facilities-9_qqixqx.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251711/Facilities-10_imwbqj.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251711/Facilities-11_tdxj7v.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251712/Facilities-12_kcy7dx.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251728/Room-1_yxasab.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251732/Room-2_rmtcsw.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251732/Room-3_lmlvgn.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251733/Room-4_wwnytq.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251734/Room-5_brk6xi.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251753/Room-6_xit0ia.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251736/Room-7_a6mktd.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251736/Room-8_oihsmb.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251738/Room-9_cdif5a.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251728/Room-10_ywdrcj.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251729/Room-11_ju2rgs.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251731/Room-12_ayvxar.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251721/Lifestyle-1_yhtwif.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251722/Lifestyle-2_fidjtg.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251723/Lifestyle-3_yghsqb.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251724/Lifestyle-4_cku4hy.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251725/Lifestyle-5_tbwnow.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251726/Lifestyle-6_ycc56r.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767251727/Lifestyle-7_tijioy.jpg",
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
      forThemes: false,
      forVenueCategory: true,
    },
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
      forThemes: false,
      forVenueCategory: true,
    },
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
      forThemes: false,
      forVenueCategory: true,
    },
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
      forThemes: false,
      forVenueCategory: true,
    },
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
      hero: "https://res.cloudinary.com/dzerxindp/image/upload/v1767252612/Hero-2_kipkts.jpg",
      gallery: [
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252612/Hero-2_kipkts.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252665/Hero-1_wwlmq2.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252590/Hero-3_d8jrvx.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252621/Hero-4_cdmx2a.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252624/Hero-5_nkw9eb.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252664/Hero-6_kkfj7x.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252573/Facilities-1_n6ky8m.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252578/Facilities-2_thftfv.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252586/Facilities-3_hdlv5y.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252573/Facilities-4_x8wgcj.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252583/Facilities-5_z29mkf.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252606/Facilities-6_rhzubn.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252649/Facilities-7_mgnjr3.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252657/Facilities-8_u9afla.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252655/Facilities-9_ewhi1l.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252594/Facilities-11_sguyz6.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252598/Facilities-12_v33zjj.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252642/Facilities-13_tafrx3.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252617/Facilities-14_litbfh.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252643/Facilities-15_apjrno.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252632/Room-1_dfjwpy.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252582/Room-2_jdwuld.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252574/Room-3_q1kuxy.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252602/Room-4_lno0af.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252575/Room-5_s73buz.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252608/Room-6_fspepm.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252599/Room-7_jaoklm.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252591/Room-8_xxueox.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252587/Room-9_vyva9h.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252650/Room-10_lormgo.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252579/Room-11_uv5gdx.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767252636/Lifestyle-1_j4mcba.jpg",
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
      hero: "https://res.cloudinary.com/dzerxindp/image/upload/v1767346147/Cover_1_koaony.jpg",
      gallery: [
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767346106/Hero_1_bgoodh.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767346107/Hero_2_zxqa35.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767346119/Room_3_hsfacd.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767346110/Room_1_ma9dzt.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767346115/Room_2_ncbnd5.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767346118/Room_3_xbqmuv.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767346148/Room_4_x24dma.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767346121/Room_4_edphiu.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767346122/Room_5_misbcq.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767346125/Room_6_uw2q5c.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767346126/Room_7_ueffbi.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767346129/Room_8_unse9j.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767346130/Room_9_txwnis.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767346111/Room_10_n41n1q.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767346115/Room_11_ogfss8.jpg",
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
  {
    id: 21,
    name: "Intercontinental Bali Resort",
    slogan: "A Luxury Beachfront Wedding Resort",
    location: {
      cityId: "jimbaran",
      provinceId: "bali",
    },
    capacity: 0,
    startingPrice: 0,
    images: {
      hero: "https://res.cloudinary.com/dzerxindp/image/upload/v1767280298/Cover_1_rafave.jpg",
      gallery: [
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280247/Hero_1_bkktzs.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280253/Hero_2_iivxkd.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280253/Hero_3_blwpya.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280254/Hero_4_vu82sm.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280254/Hero_5_g8n6va.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280256/Hero_6_vtkqvu.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280256/Hero_7_z7eop0.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280255/Hero_8_khc67e.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280257/Hero_9_cmkvjp.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280246/Hero_10_ecnmfw.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280247/Hero_11_dycx9z.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280250/Hero_12_vbn55x.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280249/Hero_13_cg9mgq.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280251/Hero_14_bnag6i.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280262/Hero_15_gnzuhu.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280279/Wedding_2_qednb5.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280270/Wedding_1_e5yfb7.webp",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280273/Wedding_1_b785ed.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280284/Wedding_3_pmxt2l.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280288/Wedding_5_rt7stj.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280287/Wedding_6_eyhmg5.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280289/Wedding_7_zfnicu.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280297/Wedding_8_pninwg.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280296/Wedding_9_xo1lac.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280271/Wedding_10_k5s6aa.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280277/Wedding_11_ecvwlt.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280275/Wedding_12_vpurkb.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280272/Wedding_13_qmeg0q.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280277/Wedding_14_v2jmdw.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280276/Wedding_15_ofe4kx.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280280/Wedding_16_mdckzj.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280308/Wedding_19_ut11xm.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280279/Wedding_20_avdcsq.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280280/Wedding_21_pv0va5.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280288/Wedding_22_pq9uqr.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280281/Wedding_23_cdngvd.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280283/Wedding_25_fewyxk.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280288/Wedding_26_hxui23.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280278/Wedding_17_ctbsuw.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280281/Wedding_18_aramhf.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280286/Wedding_4_ol6drp.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280285/Wedding_24_pdzcdn.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280236/Facilities_1_csdabd.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280235/Facilities_1_p0uasj.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280239/Facilities_2_bfbqxw.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280291/Facilities_3_ffrgkj.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280243/Facilities_4_qoiycf.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280243/Facilities_5_ybljjb.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280244/Facilities_6_xnck9y.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280250/Facilities_7_qaeemh.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280244/Facilities_8_okq7qw.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280246/Facilities_9_dot8eu.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280235/Facilities_10_cv0j7i.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280238/Facilities_11_swphfk.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280257/Facilities_12_nq6zvu.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280236/Facilities_13_t7hrdc.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280237/Facilities_14_frdhp4.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280237/Facilities_18_qu6uwa.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280237/Facilities_16_m1si6q.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280266/Facilities_17_snamaf.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280237/Facilities_18_qu6uwa.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280239/Facilities_19_n3dxs5.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280239/Facilities_20_vta5t9.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280297/Facilities_21_cmwjrl.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280240/Facilities_22_x85qva.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280241/Facilities_23_cjwbrc.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280242/Facilities_24_ynwrh6.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280261/Room_1_gprkag.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280269/Room_2_omsrca.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280265/Room_3_x93k9k.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280294/Room_4_bwmvys.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280267/Room_5_iz3plp.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280269/Room_6_jgm5w4.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280297/Room_7_swqxtw.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280268/Room_8_yw8n0u.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280277/Room_9_y0qhts.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280262/Room_10_gepkda.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280263/Room_11_hwwj9c.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280263/Room_12_doe0x4.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280268/Room_13_qenph0.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280266/Room_14_wez2fc.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280258/Lifestyle_1_cycgrh.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280270/Lifestyle_2_xtnhdw.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280259/Lifestyle_3_td05p6.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280258/Lifestyle_4_xqxuwb.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280260/Lifestyle_5_vdii08.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280259/Lifestyle_6_hydnok.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280261/Lifestyle_7_xddgcl.jpg",
        "https://res.cloudinary.com/dzerxindp/image/upload/v1767280261/Lifestyle_8_ivoz8o.jpg",
      ],
    },
    description:
      "InterContinental Bali Resort is a luxurious beachfront resort set along the pristine shores of Jimbaran Bay. Surrounded by lush tropical gardens and breathtaking ocean views, the resort offers a perfect blend of Balinese heritage and modern elegance. With a variety of spacious venues ranging from grand ballrooms to romantic beachfront settings, InterContinental Bali Resort is ideal for lavish weddings, sophisticated receptions, and unforgettable celebrations infused with five-star service and timeless coastal charm.",
    availability: {
      forThemes: false,
      forVenueCategory: true,
    },
    categoryRelations: {
      category: "signature",
    },
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
