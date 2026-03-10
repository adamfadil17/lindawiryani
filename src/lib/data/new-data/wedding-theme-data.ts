
// ─── HELPERS ──────────────────────────────────────────────────────────────────

import { WeddingTheme } from "@/lib/types/new-strucutre";
import { venueList } from "./venue-data";
import { weddingExperienceList } from "./wedding-experience-data";

const getVenue = (id: string) => venueList.find((v) => v.id === id)!;
const getExp = (id: string) => weddingExperienceList.find((e) => e.id === id)!;

// ─── THEME LIST ───────────────────────────────────────────────────────────────

export const weddingThemeList: WeddingTheme[] = [

  {
    id: "cliffside-elopement",
    type: "ELOPEMENT",
    title: "Cliffside Elopement",
    themeName: "cliffside",
    description:
      "Exchange vows on dramatic clifftops overlooking the endless ocean, where earth meets sky in perfect harmony.",
    image: "/images/wedding-themes/elopmentCliffside.jpg",
    gallery: ["/images/wedding-themes/elopmentCliffside.jpg"],
    inclusions: [
      "Exclusive cliffside ceremony slot",
      "Elegant contemporary floral altar",
      "Professional wedding celebrant",
      "Commemorative wedding certificate",
      "Bridal bouquet and matching boutonniere",
      "Violin or Cello soloist performance",
    ],
    venueId: "7",
    experienceId: "elopement-weddings",
  },
  {
    id: "waterfall-elopement",
    type: "ELOPEMENT",
    title: "Waterfall Elopement",
    themeName: "waterfall",
    description:
      "Say 'I do' surrounded by the soothing sounds of cascading water in a hidden tropical paradise.",
    image: "/images/wedding-themes/elopmentWaterfall.jpg",
    gallery: ["/images/wedding-themes/elopmentWaterfall.jpg"],
    inclusions: [
      "Private waterfall ceremony location",
      "Tropical jungle floral decorations",
      "Balinese blessing or commitment ceremony",
      "Personalized wedding coordinator",
      "Signature welcome drinks for the couple",
      "Romantic dinner for two by the river",
    ],
    venueId: "6",
    experienceId: "elopement-weddings",
  },
  {
    id: "forest-jungle-elopement",
    type: "ELOPEMENT",
    title: "Forest & Jungle Elopement",
    themeName: "forest_jungle",
    description:
      "Celebrate your union beneath ancient trees in an enchanting natural cathedral of green.",
    image: "/images/wedding-themes/elopmentForestJungle.jpg",
    gallery: ["/images/wedding-themes/elopmentForestJungle.jpg"],
    inclusions: [
      "Sacred forest ceremony setting",
      "Bohemian style floral arrangement",
      "English speaking celebrant",
      "Sound system for ceremony music",
      "Fresh flower aisle decor",
      "One bottle of sparkling wine for toast",
    ],
    venueId: "20",
    experienceId: "elopement-weddings",
  },
  {
    id: "private-villa-elopement",
    type: "ELOPEMENT",
    title: "Private Villa Elopement",
    themeName: "private_villa",
    description:
      "Intimate luxury in an exclusive villa setting, where privacy and elegance create your perfect moment.",
    image: "/images/wedding-themes/elopmentPrivateVilla.jpg",
    gallery: ["/images/wedding-themes/elopmentPrivateVilla.jpg"],
    inclusions: [
      "Use of luxury villa garden or poolside",
      "Minimalist chic floral decoration",
      "Preparation room for bride and groom",
      "Private butler service during ceremony",
      "Handcrafted wedding cake (1-tier)",
      "Traditional Balinese flower girls",
    ],
    venueId: "17",
    experienceId: "elopement-weddings",
  },
  {
    id: "beachfront-elopement",
    type: "ELOPEMENT",
    title: "Beachfront Elopement",
    themeName: "beachfront",
    description:
      "Feel the sand beneath your feet as you commit to forever with the gentle rhythm of waves as your witness.",
    image: "/images/wedding-themes/elopmentBeachfront.jpg",
    gallery: ["/images/wedding-themes/elopmentBeachfront.jpg"],
    inclusions: [
      "Private beachfront ceremony area",
      "Driftwood or bamboo floral arch",
      "Scented cold towels for couple",
      "Professional sound system for vows",
      "Petal flower shower after ceremony",
      "Assistance with legal paperwork",
    ],
    venueId: "18",
    experienceId: "elopement-weddings",
  },
  {
    id: "sustainable-eco-elopement",
    type: "ELOPEMENT",
    title: "Sustainable & Eco Elopement",
    themeName: "sustainable-eco",
    description:
      "Celebrate your love in harmony with nature through an intimate elopement thoughtfully designed with sustainable details and mindful elegance.",
    image: "/images/wedding-themes/elopmentSustainableEco.jpg",
    gallery: ["/images/wedding-themes/elopmentSustainableEco.jpg"],
    inclusions: [
      "Private eco-conscious ceremony setting",
      "Natural bamboo or reclaimed wood ceremony arch",
      "Locally sourced seasonal florals",
      "Reusable or biodegradable decor elements",
      "Eco-friendly ceremonial accessories",
      "Assistance with legal paperwork",
    ],
    venueId: "6",
    experienceId: "elopement-weddings",
  },

  // ─── INTIMATE THEMES ──────────────────────────────────────────────────────

  {
    id: "private-villa-estate",
    type: "INTIMATE",
    title: "Private Villa Estate Weddings",
    themeName: "private_villa_estate",
    description:
      "Host your closest loved ones in an exclusive villa estate featuring stunning architecture and manicured gardens.",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1768446142/Wedding_1_fyzchu.jpg",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1768446142/Wedding_1_fyzchu.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1768446128/Wedding_2_pbz9so.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1768446105/Lifestyle_1_rka2va.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1768446105/Lifestyle_2_iplagw.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1768446107/Lifestyle_5_nhlcqw.jpg",
    ],
    inclusions: [
      "Exclusive 2-night stay for up to 10 guests",
      "Full estate wedding setup (up to 40 pax)",
      "Customized multi-course reception dinner",
      "Evening fairy light garden illumination",
      "Standard wedding bar setup",
      "Dedicated event management team",
    ],
    venueId: "10",
    experienceId: "intimate-weddings",
  },
  {
    id: "luxury-resort-intimate",
    type: "INTIMATE",
    title: "Luxury Resort Intimate Weddings",
    themeName: "resort_luxury",
    description:
      "Experience world-class hospitality and breathtaking venues within prestigious resort properties.",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878596/BAL_1453_e7hd8w.jpg",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878596/BAL_1453_e7hd8w.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878580/BAL_1451_dhfxcj.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878569/BAL_1210_gktw4p.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878582/BAL_1330_screen-hi-res_dym0xt.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878565/BAL_1338_screen-hi-res_hf0l9e.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878570/BAL_1429_vf3mvt.jpg",
    ],
    inclusions: [
      "Luxury beachfront pavilion venue",
      "Tiffany chairs for up to 60 guests",
      "Gourmet buffet or plated dinner",
      "Welcome signature cocktails and canapés",
      "Professional audio-visual setup",
      "Complimentary night for the newlyweds",
    ],
    venueId: "23",
    experienceId: "intimate-weddings",
  },
  {
    id: "garden-riverside",
    type: "INTIMATE",
    title: "Garden & Riverside Weddings",
    themeName: "garden",
    description:
      "Celebrate amidst blooming florals and flowing waters in serene natural garden settings.",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769608324/Wedding_3_demaoq.png",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769608324/Wedding_3_demaoq.png",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769608323/Wedding_1_zgtm4d.png",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769608331/Wedding_2_sxvamv.png",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769608324/Wedding_4_wynsx3.png",
    ],
    inclusions: [
      "Riverside lawn ceremony venue",
      "Rustic garden reception decoration",
      "Balinese Gamelan or Acoustic Band",
      "Full flower centerpiece for guest tables",
      "Menu tasting for up to 4 people",
      "Shuttle service within resort area",
    ],
    venueId: "30",
    experienceId: "intimate-weddings",
  },
  {
    id: "cultural-architectural",
    type: "INTIMATE",
    title: "Cultural & Architectural Settings",
    themeName: "cultural",
    description:
      "Honor tradition in venues that showcase Bali's rich cultural heritage and stunning architecture.",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769236708/Wedding_5_ucfdpj.jpg",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769236708/Wedding_5_ucfdpj.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769236705/Wedding_3_pnefn2.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769236703/Wedding_2_u5yqq8.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769236704/Wedding_1_t2ksqq.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769236705/Wedding_4_bssvtq.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769236708/Wedding_6_otcjrs.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769236705/Wedding_7_nnurto.jpg",
    ],
    inclusions: [
      "Traditional Balinese temple gateway backdrop",
      "Heritage-inspired ceremonial decor",
      "Balinese costume rental for couple",
      "Traditional Legong dance performance",
      "Balinese 'Rijsttafel' dinner experience",
      "Local community blessing ceremony",
    ],
    venueId: "19",
    experienceId: "intimate-weddings",
  },
  {
    id: "destination-intimate",
    type: "INTIMATE",
    title: "Destination Intimate Celebrations",
    themeName: "destination",
    description:
      "Create unforgettable memories in unique destination venues that perfectly frame your love story.",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767511823/Wedding_2_byu1us.jpg",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767511823/Wedding_2_byu1us.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767511815/Wedding_1_nlta08.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767511826/Wedding_3_risbjp.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767511813/Wedding_4_c98b0e.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767511820/Wedding_5_sersgy.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767511811/Wedding_6_uyayfs.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767511818/Wedding_7_f0vgit.jpg",
    ],
    inclusions: [
      "Panoramic mountain/ocean view venue",
      "Modern minimalist arch and aisle",
      "International menu selection",
      "Sunset cocktail hour on the deck",
      "Professional photography (4 hours)",
      "Sparkling cider for toast",
    ],
    venueId: "22",
    experienceId: "intimate-weddings",
  },
  {
    id: "forest-jungle-intimate",
    type: "INTIMATE",
    title: "Intimate Jungle or Forest Weddings",
    themeName: "forest_jungle",
    description:
      "Celebrate your union beneath ancient trees in an enchanting natural cathedral of green.",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769609440/Cover_1_py4g8y.jpg",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769609440/Cover_1_py4g8y.jpg",
    ],
    inclusions: [
      "Sacred forest ceremony setting",
      "Bohemian style floral arrangement",
      "English speaking celebrant",
      "Sound system for ceremony music",
      "Fresh flower aisle decor",
      "One bottle of sparkling wine for toast",
    ],
    venueId: "31",
    experienceId: "intimate-weddings",
  },
];