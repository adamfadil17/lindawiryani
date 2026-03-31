// ─── HELPERS ──────────────────────────────────────────────────────────────────

import { WeddingTheme } from "@/types";
import { venueList } from "./venue-data";
import { weddingExperienceList } from "./wedding-experience-data";

const getVenue = (id: string) => venueList.find((v) => v.id === id)!;
const getExp = (id: string) => weddingExperienceList.find((e) => e.id === id)!;

// ─── THEME LIST ───────────────────────────────────────────────────────────────

export const weddingThemeList: WeddingTheme[] = [
  // ─── ELOPEMENT THEMES ─────────────────────────────────────────────────────

  {
    id: "cliffside-elopement",
    slug: "cliffside-elopement",
    type: "ELOPEMENT",
    title: "Cliffside Elopement",
    description:
      "Exchange vows on dramatic clifftops overlooking the endless ocean, where earth meets sky in perfect harmony.",
    image: "/images/wedding-themes/elopmentCliffside.jpg",
    gallery: [
      {
        id: "cliffside-elopement-img-1",
        url: "/images/wedding-themes/elopmentCliffside.jpg",
        sort_order: 0,
        theme_id: "cliffside-elopement",
      },
    ],
    inclusions: [
      "Exclusive cliffside ceremony slot",
      "Elegant contemporary floral altar",
      "Professional wedding celebrant",
      "Commemorative wedding certificate",
      "Bridal bouquet and matching boutonniere",
      "Violin or Cello soloist performance",
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },
  {
    id: "waterfall-elopement",
    slug: "waterfall-elopement",
    type: "ELOPEMENT",
    title: "Waterfall Elopement",
    description:
      "Say 'I do' surrounded by the soothing sounds of cascading water in a hidden tropical paradise.",
    image: "/images/wedding-themes/elopmentWaterfall.jpg",
    gallery: [
      {
        id: "waterfall-elopement-img-1",
        url: "/images/wedding-themes/elopmentWaterfall.jpg",
        sort_order: 0,
        theme_id: "waterfall-elopement",
      },
    ],
    inclusions: [
      "Private waterfall ceremony location",
      "Tropical jungle floral decorations",
      "Balinese blessing or commitment ceremony",
      "Personalized wedding coordinator",
      "Signature welcome drinks for the couple",
      "Romantic dinner for two by the river",
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },
  {
    id: "forest-jungle-elopement",
    slug: "forest-jungle-elopement",
    type: "ELOPEMENT",
    title: "Forest & Jungle Elopement",
    description:
      "Celebrate your union beneath ancient trees in an enchanting natural cathedral of green.",
    image: "/images/wedding-themes/elopmentForestJungle.jpg",
    gallery: [
      {
        id: "forest-jungle-elopement-img-1",
        url: "/images/wedding-themes/elopmentForestJungle.jpg",
        sort_order: 0,
        theme_id: "forest-jungle-elopement",
      },
    ],
    inclusions: [
      "Sacred forest ceremony setting",
      "Bohemian style floral arrangement",
      "English speaking celebrant",
      "Sound system for ceremony music",
      "Fresh flower aisle decor",
      "One bottle of sparkling wine for toast",
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },
  {
    id: "private-villa-elopement",
    slug: "private-villa-elopement",
    type: "ELOPEMENT",
    title: "Private Villa Elopement",
    description:
      "Intimate luxury in an exclusive villa setting, where privacy and elegance create your perfect moment.",
    image: "/images/wedding-themes/elopmentPrivateVilla.jpg",
    gallery: [
      {
        id: "private-villa-elopement-img-1",
        url: "/images/wedding-themes/elopmentPrivateVilla.jpg",
        sort_order: 0,
        theme_id: "private-villa-elopement",
      },
    ],
    inclusions: [
      "Use of luxury villa garden or poolside",
      "Minimalist chic floral decoration",
      "Preparation room for bride and groom",
      "Private butler service during ceremony",
      "Handcrafted wedding cake (1-tier)",
      "Traditional Balinese flower girls",
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },
  {
    id: "beachfront-elopement",
    slug: "beachfront-elopement",
    type: "ELOPEMENT",
    title: "Beachfront Elopement",
    description:
      "Feel the sand beneath your feet as you commit to forever with the gentle rhythm of waves as your witness.",
    image: "/images/wedding-themes/elopmentBeachfront.jpg",
    gallery: [
      {
        id: "beachfront-elopement-img-1",
        url: "/images/wedding-themes/elopmentBeachfront.jpg",
        sort_order: 0,
        theme_id: "beachfront-elopement",
      },
    ],
    inclusions: [
      "Private beachfront ceremony area",
      "Driftwood or bamboo floral arch",
      "Scented cold towels for couple",
      "Professional sound system for vows",
      "Petal flower shower after ceremony",
      "Assistance with legal paperwork",
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },
  {
    id: "sustainable-eco-elopement",
    slug: "sustainable-eco-elopement",
    type: "ELOPEMENT",
    title: "Sustainable & Eco Elopement",
    description:
      "Celebrate your love in harmony with nature through an intimate elopement thoughtfully designed with sustainable details and mindful elegance.",
    image: "/images/wedding-themes/elopmentSustainableEco.jpg",
    gallery: [
      {
        id: "sustainable-eco-elopement-img-1",
        url: "/images/wedding-themes/elopmentSustainableEco.jpg",
        sort_order: 0,
        theme_id: "sustainable-eco-elopement",
      },
    ],
    inclusions: [
      "Private eco-conscious ceremony setting",
      "Natural bamboo or reclaimed wood ceremony arch",
      "Locally sourced seasonal florals",
      "Reusable or biodegradable decor elements",
      "Eco-friendly ceremonial accessories",
      "Assistance with legal paperwork",
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  // ─── INTIMATE THEMES ──────────────────────────────────────────────────────

  {
    id: "private-villa-estate",
    slug: "private-villa-estate",
    type: "INTIMATE",
    title: "Private Villa Estate Weddings",
    description:
      "Host your closest loved ones in an exclusive villa estate featuring stunning architecture and manicured gardens.",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1768446142/Wedding_1_fyzchu.jpg",
    gallery: [
      {
        id: "private-villa-estate-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1768446142/Wedding_1_fyzchu.jpg",
        sort_order: 0,
        theme_id: "private-villa-estate",
      },
      {
        id: "private-villa-estate-img-2",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1768446128/Wedding_2_pbz9so.jpg",
        sort_order: 1,
        theme_id: "private-villa-estate",
      },
      {
        id: "private-villa-estate-img-3",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1768446105/Lifestyle_1_rka2va.jpg",
        sort_order: 2,
        theme_id: "private-villa-estate",
      },
      {
        id: "private-villa-estate-img-4",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1768446105/Lifestyle_2_iplagw.jpg",
        sort_order: 3,
        theme_id: "private-villa-estate",
      },
      {
        id: "private-villa-estate-img-5",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1768446107/Lifestyle_5_nhlcqw.jpg",
        sort_order: 4,
        theme_id: "private-villa-estate",
      },
    ],
    inclusions: [
      "Exclusive 2-night stay for up to 10 guests",
      "Full estate wedding setup (up to 40 pax)",
      "Customized multi-course reception dinner",
      "Evening fairy light garden illumination",
      "Standard wedding bar setup",
      "Dedicated event management team",
    ],
    venue_id: "10",
    venue: getVenue("10"),
    experience_id: "2",
    experience: getExp("2"),
  },
  {
    id: "luxury-resort-intimate",
    slug: "luxury-resort-intimate",
    type: "INTIMATE",
    title: "Luxury Resort Intimate Weddings",
    description:
      "Experience world-class hospitality and breathtaking venues within prestigious resort properties.",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878596/BAL_1453_e7hd8w.jpg",
    gallery: [
      {
        id: "luxury-resort-intimate-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767878596/BAL_1453_e7hd8w.jpg",
        sort_order: 0,
        theme_id: "luxury-resort-intimate",
      },
      {
        id: "luxury-resort-intimate-img-2",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767878580/BAL_1451_dhfxcj.jpg",
        sort_order: 1,
        theme_id: "luxury-resort-intimate",
      },
      {
        id: "luxury-resort-intimate-img-3",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767878569/BAL_1210_gktw4p.jpg",
        sort_order: 2,
        theme_id: "luxury-resort-intimate",
      },
      {
        id: "luxury-resort-intimate-img-4",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767878582/BAL_1330_screen-hi-res_dym0xt.jpg",
        sort_order: 3,
        theme_id: "luxury-resort-intimate",
      },
      {
        id: "luxury-resort-intimate-img-5",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767878565/BAL_1338_screen-hi-res_hf0l9e.jpg",
        sort_order: 4,
        theme_id: "luxury-resort-intimate",
      },
      {
        id: "luxury-resort-intimate-img-6",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767878570/BAL_1429_vf3mvt.jpg",
        sort_order: 5,
        theme_id: "luxury-resort-intimate",
      },
    ],
    inclusions: [
      "Luxury beachfront pavilion venue",
      "Tiffany chairs for up to 60 guests",
      "Gourmet buffet or plated dinner",
      "Welcome signature cocktails and canapés",
      "Professional audio-visual setup",
      "Complimentary night for the newlyweds",
    ],
    venue_id: "23",
    venue: getVenue("23"),
    experience_id: "2",
    experience: getExp("2"),
  },
  {
    id: "garden-riverside",
    slug: "garden-riverside",
    type: "INTIMATE",
    title: "Garden & Riverside Weddings",
    description:
      "Celebrate amidst blooming florals and flowing waters in serene natural garden settings.",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769608324/Wedding_3_demaoq.png",
    gallery: [
      {
        id: "garden-riverside-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769608324/Wedding_3_demaoq.png",
        sort_order: 0,
        theme_id: "garden-riverside",
      },
      {
        id: "garden-riverside-img-2",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769608323/Wedding_1_zgtm4d.png",
        sort_order: 1,
        theme_id: "garden-riverside",
      },
      {
        id: "garden-riverside-img-3",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769608331/Wedding_2_sxvamv.png",
        sort_order: 2,
        theme_id: "garden-riverside",
      },
      {
        id: "garden-riverside-img-4",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769608324/Wedding_4_wynsx3.png",
        sort_order: 3,
        theme_id: "garden-riverside",
      },
    ],
    inclusions: [
      "Riverside lawn ceremony venue",
      "Rustic garden reception decoration",
      "Balinese Gamelan or Acoustic Band",
      "Full flower centerpiece for guest tables",
      "Menu tasting for up to 4 people",
      "Shuttle service within resort area",
    ],
    venue_id: "30",
    venue: getVenue("30"),
    experience_id: "2",
    experience: getExp("2"),
  },
  {
    id: "cultural-architectural",
    slug: "cultural-architectural",
    type: "INTIMATE",
    title: "Cultural & Architectural Settings",
    description:
      "Honor tradition in venues that showcase Bali's rich cultural heritage and stunning architecture.",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769236708/Wedding_5_ucfdpj.jpg",
    gallery: [
      {
        id: "cultural-architectural-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769236708/Wedding_5_ucfdpj.jpg",
        sort_order: 0,
        theme_id: "cultural-architectural",
      },
      {
        id: "cultural-architectural-img-2",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769236705/Wedding_3_pnefn2.jpg",
        sort_order: 1,
        theme_id: "cultural-architectural",
      },
      {
        id: "cultural-architectural-img-3",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769236703/Wedding_2_u5yqq8.jpg",
        sort_order: 2,
        theme_id: "cultural-architectural",
      },
      {
        id: "cultural-architectural-img-4",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769236704/Wedding_1_t2ksqq.jpg",
        sort_order: 3,
        theme_id: "cultural-architectural",
      },
      {
        id: "cultural-architectural-img-5",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769236705/Wedding_4_bssvtq.jpg",
        sort_order: 4,
        theme_id: "cultural-architectural",
      },
      {
        id: "cultural-architectural-img-6",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769236708/Wedding_6_otcjrs.jpg",
        sort_order: 5,
        theme_id: "cultural-architectural",
      },
      {
        id: "cultural-architectural-img-7",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769236705/Wedding_7_nnurto.jpg",
        sort_order: 6,
        theme_id: "cultural-architectural",
      },
    ],
    inclusions: [
      "Traditional Balinese temple gateway backdrop",
      "Heritage-inspired ceremonial decor",
      "Balinese costume rental for couple",
      "Traditional Legong dance performance",
      "Balinese 'Rijsttafel' dinner experience",
      "Local community blessing ceremony",
    ],
    venue_id: "19",
    venue: getVenue("19"),
    experience_id: "2",
    experience: getExp("2"),
  },
  {
    id: "destination-intimate",
    slug: "destination-intimate",
    type: "INTIMATE",
    title: "Destination Intimate Celebrations",
    description:
      "Create unforgettable memories in unique destination venues that perfectly frame your love story.",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767511823/Wedding_2_byu1us.jpg",
    gallery: [
      {
        id: "destination-intimate-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767511823/Wedding_2_byu1us.jpg",
        sort_order: 0,
        theme_id: "destination-intimate",
      },
      {
        id: "destination-intimate-img-2",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767511815/Wedding_1_nlta08.jpg",
        sort_order: 1,
        theme_id: "destination-intimate",
      },
      {
        id: "destination-intimate-img-3",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767511826/Wedding_3_risbjp.jpg",
        sort_order: 2,
        theme_id: "destination-intimate",
      },
      {
        id: "destination-intimate-img-4",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767511813/Wedding_4_c98b0e.jpg",
        sort_order: 3,
        theme_id: "destination-intimate",
      },
      {
        id: "destination-intimate-img-5",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767511820/Wedding_5_sersgy.jpg",
        sort_order: 4,
        theme_id: "destination-intimate",
      },
      {
        id: "destination-intimate-img-6",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767511811/Wedding_6_uyayfs.jpg",
        sort_order: 5,
        theme_id: "destination-intimate",
      },
      {
        id: "destination-intimate-img-7",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767511818/Wedding_7_f0vgit.jpg",
        sort_order: 6,
        theme_id: "destination-intimate",
      },
    ],
    inclusions: [
      "Panoramic mountain/ocean view venue",
      "Modern minimalist arch and aisle",
      "International menu selection",
      "Sunset cocktail hour on the deck",
      "Professional photography (4 hours)",
      "Sparkling cider for toast",
    ],
    venue_id: "22",
    venue: getVenue("22"),
    experience_id: "2",
    experience: getExp("2"),
  },
  {
    id: "forest-jungle-intimate",
    slug: "forest-jungle-intimate",
    type: "INTIMATE",
    title: "Intimate Jungle or Forest Weddings",
    description:
      "Celebrate your union beneath ancient trees in an enchanting natural cathedral of green.",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769609440/Cover_1_py4g8y.jpg",
    gallery: [
      {
        id: "forest-jungle-intimate-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769609440/Cover_1_py4g8y.jpg",
        sort_order: 0,
        theme_id: "forest-jungle-intimate",
      },
    ],
    inclusions: [
      "Sacred forest ceremony setting",
      "Bohemian style floral arrangement",
      "English speaking celebrant",
      "Sound system for ceremony music",
      "Fresh flower aisle decor",
      "One bottle of sparkling wine for toast",
    ],
    venue_id: "31",
    venue: getVenue("31"),
    experience_id: "2",
    experience: getExp("2"),
  },
];
