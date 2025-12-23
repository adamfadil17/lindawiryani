export interface WeddingTheme {
  title: string;
  description: string;
  venue: string;
  venueName: string;
  image: string;
  gallery: string[]; 
  inclusions: string[]; 
}

export const elopementThemes: WeddingTheme[] = [
  {
    title: "Cliffside Elopement",
    description: "Exchange vows on dramatic clifftops overlooking the endless ocean, where earth meets sky in perfect harmony.",
    venue: "1 venue only",
    venueName: "Unknown",
    image: "/images/wedding-themes/dramatic-cliffside-wedding-ceremony-overlooking-oc.jpg",
    gallery: ["/images/wedding-themes/dramatic-cliffside-wedding-ceremony-overlooking-oc.jpg"],
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
    description: "Say 'I do' surrounded by the soothing sounds of cascading water in a hidden tropical paradise.",
    venue: "1 venue only",
    venueName: "Unknown",
    image: "/images/wedding-themes/romantic-waterfall-wedding-ceremony-in-lush-tropic.jpg",
    gallery: ["/images/wedding-themes/romantic-waterfall-wedding-ceremony-in-lush-tropic.jpg"],
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
    description: "Celebrate your union beneath ancient trees in an enchanting natural cathedral of green.",
    venue: "1 venue only",
    venueName: "Unknown",
    image: "/images/wedding-themes/intimate-forest-wedding-ceremony-with-tropical-jun.jpg",
    gallery: ["/images/wedding-themes/intimate-forest-wedding-ceremony-with-tropical-jun.jpg"],
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
    description: "Intimate luxury in an exclusive villa setting, where privacy and elegance create your perfect moment.",
    venue: "1 venue only",
    venueName: "Unknown",
    image: "/images/wedding-themes/luxury-private-villa-wedding-ceremony-with-infinit.jpg",
    gallery: ["/images/wedding-themes/luxury-private-villa-wedding-ceremony-with-infinit.jpg"],
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
    description: "Feel the sand beneath your feet as you commit to forever with the gentle rhythm of waves as your witness.",
    venue: "1 venue only",
    venueName: "Unknown",
    image: "/images/wedding-themes/beachfront-wedding-ceremony-at-golden-hour-on-pris.jpg",
    gallery: ["/images/wedding-themes/beachfront-wedding-ceremony-at-golden-hour-on-pris.jpg"],
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
    description: "Host your closest loved ones in an exclusive villa estate featuring stunning architecture and manicured gardens.",
    venue: "1 venue only",
    venueName: "Unknown",
    image: "/images/wedding-themes/elegant-villa-estate-wedding-with-tropical-garden-.jpg",
    gallery: ["/images/wedding-themes/elegant-villa-estate-wedding-with-tropical-garden-.jpg"],
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
    description: "Experience world-class hospitality and breathtaking venues within prestigious resort properties.",
    venue: "1 venue only",
    venueName: "Unknown",
    image: "/images/wedding-themes/luxury-resort-wedding-pavilion-with-ocean-views-an.jpg",
    gallery: ["/images/wedding-themes/luxury-resort-wedding-pavilion-with-ocean-views-an.jpg"],
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
    description: "Celebrate amidst blooming florals and flowing waters in serene natural garden settings.",
    venue: "1 venue only",
    venueName: "Unknown",
    image: "/images/wedding-themes/romantic-garden-wedding-by-riverside-with-lush-flo.jpg",
    gallery: ["/images/wedding-themes/romantic-garden-wedding-by-riverside-with-lush-flo.jpg"],
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
    description: "Honor tradition in venues that showcase Bali's rich cultural heritage and stunning architecture.",
    venue: "1 venue only",
    venueName: "Unknown",
    image: "/images/wedding-themes/balinese-traditional-architecture-wedding-venue-wi.jpg",
    gallery: ["/images/wedding-themes/balinese-traditional-architecture-wedding-venue-wi.jpg"],
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
    description: "Create unforgettable memories in unique destination venues that perfectly frame your love story.",
    venue: "1 venue only",
    venueName: "Unknown",
    image: "/images/wedding-themes/destination-wedding-venue-with-panoramic-mountain-.jpg",
    gallery: ["/images/wedding-themes/destination-wedding-venue-with-panoramic-mountain-.jpg"],
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
