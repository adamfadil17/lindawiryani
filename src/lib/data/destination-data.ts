import { Destination, DestinationCategory } from "@/types";
// ─── CATEGORIES ───────────────────────────────────────────────────────────────

export const destinationCategories: DestinationCategory[] = [
  { id: "cat-bali", name: "Bali", destinations: [] },
  { id: "cat-indonesia", name: "Indonesia", destinations: [] },
];

const getCat = (id: string): DestinationCategory =>
  destinationCategories.find((c) => c.id === id)!;

// ─── DESTINATIONS ─────────────────────────────────────────────────────────────
// id slug digunakan sebagai destinationId di venue-data.ts

export const destinationList: Destination[] = [
  {
    id: "1",
    name: "Uluwatu",
    slug: "uluwatu",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Luxury Cliffside",
    description:
      "Dramatic ocean cliffs, open horizons, and architectural venues, ideal for cinematic, luxury destination weddings and sunset ceremonies shaped by scale and elegance.",
    long_description:
      "Uluwatu is one of Bali's most iconic wedding destinations, known for its dramatic limestone cliffs, open ocean horizons, and refined coastal atmosphere. We specialize in design-led weddings in Uluwatu, creating destination celebrations that feel elevated, intentional, and emotionally immersive. From private cliffside villas to exclusive oceanfront resorts, our weddings in Uluwatu are curated as complete experiences, not just beautifully decorated events.",
    location: "Bukit Peninsula, Bali",
    atmosphere:
      "Cinematic yet calm, where the setting itself becomes part of the ceremony",
    accessibility_notes:
      "Excellent accessibility from airport, high-end venues, and breathtaking natural views make it ideal for international celebrations",
    seasonal_considerations:
      "Ceremony structures, florals, sound systems, and guest comfort must be carefully planned to work with coastal winds",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773495615/uluwatu-cover_rcjccs.jpg",
    guest_capacity: "50 - 500+",
    highlights: [
      "Sweeping ocean cliffs and sunset views",
      "Architectural villas and luxury resorts",
      "Dry, open landscapes and expansive skies",
      "Refined, exclusive atmosphere",
      "High-end hospitality destinations",
    ],
    best_for: [
      "Dramatic scenery without crowds",
      "Luxury environments with privacy",
      "Strong visual identity",
      "Sunset ceremonies and oceanfront celebrations",
      "Refined destination experiences",
    ],
    ceremony_options: [
      "Oceanfront cliffside ceremonies",
      "Architectural venue settings",
      "Sunset ceremonies",
      "Private villa ceremonies",
    ],
    reception_options: [
      "Infinity pool receptions",
      "Cliffside dining",
      "Multi-level celebrations",
      "Garden party setups",
    ],
    accommodation_nearby: [
      "Luxury resort properties",
      "Private villa estates",
      "Boutique hotels",
      "High-end villas with staff",
    ],
    dining_experiences: [
      "World-class resort restaurants",
      "Private chef experiences",
      "Oceanview dining",
      "Artisanal catering services",
    ],
    unique_features: [
      "Dramatic sunsets over the ocean",
      "Architectural design opportunities",
      "Private venue exclusivity",
      "Cinematic visual storytelling",
      "Refined luxury atmosphere",
    ],
  },
  {
    id: "2",
    name: "Ubud",
    slug: "ubud",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Spiritual & Artistic",
    description:
      "Jungle valleys, rivers, rice terraces, and spiritual depth, ideal for intimate, artistic, and emotionally grounded weddings rooted in nature and culture.",
    long_description:
      "Ubud is the cultural and spiritual heart of Bali known for its emerald jungles, flowing rivers, rice terraces, and deep artistic heritage. We specialize in design-led weddings in Ubud, creating celebrations that feel grounded, emotional, and intentionally connected to their surroundings. Our Ubud weddings are shaped by atmosphere, architecture, and inner experience, not trends or templates.",
    location: "Central Bali",
    atmosphere:
      "Retreat-like and immersive, where weddings unfold gently, allowing space for emotion, connection, and reflection",
    accessibility_notes:
      "Many Ubud venues are tucked into jungle landscapes, requiring careful guest transportation planning and realistic scheduling",
    seasonal_considerations:
      "Ubud experiences higher humidity and rainfall than coastal Bali. Wedding design, guest comfort, and production planning must reflect this environment",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773494652/ubud-cover_pbt3om.png",
    guest_capacity: "20 - 200",
    highlights: [
      "Emerald jungles and flowing rivers",
      "Rice terraces and natural topography",
      "Spiritual and wellness-oriented environments",
      "Cooler, softer climate",
      "Artistic and cultural depth",
    ],
    best_for: [
      "Grounded and sacred celebrations",
      "Intimate artistic experiences",
      "Nature-integrated ceremonies",
      "Wellness-oriented couples",
      "Emotionally deep connections",
    ],
    ceremony_options: [
      "Jungle ceremonies",
      "Riverside settings",
      "Rice terrace ceremonies",
      "Private villa gardens",
      "Sacred spaces",
    ],
    reception_options: [
      "Private villa celebrations",
      "Eco-resort gatherings",
      "Riverside dinners",
      "Garden settings",
      "Retreat-style multi-day events",
    ],
    accommodation_nearby: [
      "Boutique eco-resorts",
      "Private jungle villas",
      "Heritage hotels",
      "Wellness retreats",
    ],
    dining_experiences: [
      "Farm-to-table cuisine",
      "Traditional Balinese dining",
      "Private chef experiences",
      "Wellness-focused menus",
    ],
    unique_features: [
      "Natural jungle settings",
      "Spiritual significance",
      "Artistic community energy",
      "Rice paddy backdrops",
      "Multi-day retreat possibilities",
    ],
  },
  {
    id: "3",
    name: "Canggu",
    slug: "canggu",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Contemporary Villa",
    description:
      "Contemporary private villas, relaxed coastal energy, and creative culture, ideal for modern destination weddings with a private villa lifestyle atmosphere.",
    long_description:
      "Canggu is one of Bali's most dynamic wedding destinations, known for its contemporary villas, creative culture, and relaxed luxury lifestyle. We specialize in design-led weddings in Canggu, creating celebrations that feel modern, stylish, and deeply personal. Our Canggu weddings are curated as immersive villa experiences, where design, atmosphere, and guest journey come together naturally.",
    location: "Southwest Bali",
    atmosphere:
      "Modern and sophisticated yet comfortable, feeling less like formal events and more like beautifully curated gatherings",
    accessibility_notes:
      "Close to airport, numerous accommodation options, well-established vendor network, easy transportation",
    seasonal_considerations:
      "Coastal location means careful wind and sound planning, especially for outdoor ceremonies",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773709788/canggu_zloeql.jpg",
    guest_capacity: "30 - 300",
    highlights: [
      "Contemporary villa settings",
      "Creative, lifestyle-oriented environments",
      "Relaxed yet refined atmosphere",
      "Multi-day villa experiences",
      "Stylish, social atmospheres",
    ],
    best_for: [
      "Design freedom",
      "Comfortable luxury",
      "Social connections",
      "Artistic styling",
      "Unforced elegance",
    ],
    ceremony_options: [
      "Villa garden ceremonies",
      "Pool side settings",
      "Indoor-outdoor spaces",
      "Rooftop ceremonies",
    ],
    reception_options: [
      "Villa lounge events",
      "Pool parties",
      "Indoor celebrations",
      "Multi-space experiences",
      "Modern reception setups",
    ],
    accommodation_nearby: [
      "Modern villa rentals",
      "Contemporary resorts",
      "Stylish hotels",
      "Beach clubs",
    ],
    dining_experiences: [
      "Contemporary cuisine",
      "International menus",
      "Beach club dining",
      "Private chef services",
    ],
    unique_features: [
      "Modern architecture",
      "Creative community",
      "Design flexibility",
      "Lifestyle atmosphere",
      "Multi-day villa options",
    ],
  },
  {
    id: "4",
    name: "Seminyak",
    slug: "seminyak",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Elegant Boutique",
    description:
      "Boutique resorts, elegant villas, and central accessibility, ideal for refined destination weddings with polished hospitality and vibrant guest experiences.",
    long_description:
      "Seminyak is one of Bali's most established wedding destinations, offering boutique resorts, elegant villas, and central accessibility. We create refined destination weddings in Seminyak that combine polished hospitality with vibrant guest experiences, ideal for couples seeking sophisticated celebrations with excellent accessibility.",
    location: "Southwest Bali Coast",
    atmosphere:
      "Sophisticated yet relaxed, combining refined elegance with the ease of a beloved coastal destination",
    accessibility_notes:
      "Excellent airport access, well-developed infrastructure, numerous accommodation options, established vendor network",
    seasonal_considerations:
      "Beach weddings require careful timing; dry season (April-October) ideal for outdoor celebrations",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773709789/seminyak_bihos7.jpg",
    guest_capacity: "50 - 400",
    highlights: [
      "Boutique resort environments",
      "Elegant private villas",
      "Central accessibility",
      "Beach proximity",
      "Refined hospitality",
    ],
    best_for: [
      "Polished destination weddings",
      "International guest ease",
      "Resort-style celebrations",
      "Refined aesthetics",
      "Vibrant experiences",
    ],
    ceremony_options: [
      "Beach ceremonies",
      "Resort gardens",
      "Villa courtyards",
      "Pool settings",
    ],
    reception_options: [
      "Beachfront dinners",
      "Resort banquets",
      "Villa receptions",
      "Multi-space celebrations",
    ],
    accommodation_nearby: [
      "Boutique resorts",
      "Elegant hotels",
      "Villa properties",
      "Beach clubs",
    ],
    dining_experiences: [
      "Resort dining",
      "Beachfront restaurants",
      "Upscale catering",
      "Multi-course experiences",
    ],
    unique_features: [
      "Beach access",
      "Resort sophistication",
      "Central location",
      "Established infrastructure",
      "Polished service standards",
    ],
  },
  {
    id: "5",
    name: "Sanur",
    slug: "sanur",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Seaside Charm",
    description:
      "Calm coastlines, heritage charm, and timeless seaside elegance, ideal for intimate, family-friendly destination weddings with a gentle, unhurried rhythm.",
    long_description:
      "Sanur offers a different energy from Bali's busier coastal towns. Known for its calm coastlines, heritage charm, and timeless seaside elegance, Sanur is ideal for intimate, family-friendly destination weddings that feel unhurried and deeply connected. We create celebrations here that honor the gentle, gracious character of this beloved destination.",
    location: "Southeast Bali Coast",
    atmosphere:
      "Gracious and gentle, with a timeless seaside quality that feels peaceful and deeply welcoming",
    accessibility_notes:
      "Quieter alternative to busier areas, established accommodations, calm waterfront setting, good local vendor relationships",
    seasonal_considerations:
      "East coast location provides different weather patterns; generally pleasant year-round with calmer waters",
    image: "https://res.cloudinary.com/dzerxindp/image/upload/v1773709790/sanur_mlb6px.png",
    guest_capacity: "20 - 250",
    highlights: [
      "Calm, gentle coastlines",
      "Heritage charm and character",
      "Timeless seaside elegance",
      "Family-friendly atmosphere",
      "Unhurried rhythm",
    ],
    best_for: [
      "Intimate celebrations",
      "Family-oriented weddings",
      "Gentle, unhurried pace",
      "Heritage character",
      "Meaningful connections",
    ],
    ceremony_options: [
      "Beachfront ceremonies",
      "Resort settings",
      "Waterfront venues",
      "Garden spaces",
    ],
    reception_options: [
      "Seaside dinners",
      "Waterfront celebrations",
      "Resort banquets",
      "Intimate gatherings",
    ],
    accommodation_nearby: [
      "Beachfront hotels",
      "Resort properties",
      "Heritage villas",
      "Family resorts",
    ],
    dining_experiences: [
      "Seafood specialties",
      "Waterfront dining",
      "Casual elegance restaurants",
      "Family-style catering",
    ],
    unique_features: [
      "Calm waters",
      "Heritage atmosphere",
      "Family-friendly character",
      "Peaceful setting",
      "Timeless elegance",
    ],
  },
  {
    id: "6",
    name: "Kintamani",
    slug: "kintamani",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Sacred Highlands",
    description:
      "Volcanic highlands, sacred landscapes, and expansive crater views, ideal for intimate, spiritual, and nature-led ceremonies shaped by elemental beauty.",
    long_description:
      "Kintamani sits in Bali's volcanic highlands, offering sacred landscapes, expansive crater views, and an atmosphere of elemental beauty. We design intimate, spiritual, and nature-led ceremonies here that feel grounded in something larger than themselves. Kintamani is ideal for couples seeking ceremonies shaped by nature's power and spiritual significance.",
    location: "North Central Bali Highlands",
    atmosphere:
      "Sacred and grounded, with a sense of connection to something larger, shaped by volcanic landscape and natural power",
    accessibility_notes:
      "Highland location requires careful planning; cooler temperatures, mountain roads, remote setting",
    seasonal_considerations:
      "Higher elevation means cooler weather and potential mist; dry season preferred for outdoor ceremonies",
    image: "https://res.cloudinary.com/dzerxindp/image/upload/v1773709786/kintamani_jdqg0a.jpg",
    guest_capacity: "20 - 150",
    highlights: [
      "Volcanic highlands terrain",
      "Sacred mountain landscapes",
      "Expansive crater views",
      "Elemental beauty",
      "Spiritual significance",
    ],
    best_for: [
      "Intimate ceremonies",
      "Spiritual celebrations",
      "Nature-led design",
      "Mountain settings",
      "Elemental beauty seekers",
    ],
    ceremony_options: [
      "Crater overlook ceremonies",
      "Sacred temple gardens",
      "Mountain settings",
      "Panoramic viewpoint ceremonies",
    ],
    reception_options: [
      "Intimate mountain gatherings",
      "Scenic dining",
      "Resort celebrations",
      "Multi-moment experiences",
    ],
    accommodation_nearby: [
      "Mountain resorts",
      "Eco-lodges",
      "Heritage villas",
      "Spiritual retreat centers",
    ],
    dining_experiences: [
      "Local mountain cuisine",
      "Agricultural farm experiences",
      "Community-style dining",
      "Specialty menus",
    ],
    unique_features: [
      "Volcanic crater views",
      "Sacred significance",
      "Mountain atmosphere",
      "Elemental beauty",
      "Spiritual connection",
    ],
  },
  {
    id: "7",
    name: "Nusa Dua",
    slug: "nusa-dua",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Luxury Resort",
    description:
      "Expansive beachfront resorts, controlled environments, and polished service, ideal for formal luxury destination weddings with large guest logistics.",
    long_description:
      "Nusa Dua is Bali's premier resort destination, known for expansive beachfront properties, controlled environments, and polished service standards. We design formal luxury destination weddings here that handle large guest logistics with seamless coordination and refined execution. Ideal for couples seeking resort-based luxury celebrations.",
    location: "South Bali Peninsula",
    atmosphere:
      "Refined and elegant, with the ease and polish of world-class resort hospitality and comprehensive service infrastructure",
    accessibility_notes:
      "Closest to airport, all-inclusive resort infrastructure, comprehensive accommodation, extensive vendor options",
    seasonal_considerations:
      "Resort infrastructure handles all weather considerations; indoor and outdoor options available year-round",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773709793/nusa-dua_n5nqlj.png",
    guest_capacity: "100 - 1000+",
    highlights: [
      "Expansive beachfront resorts",
      "Controlled resort environments",
      "Polished service standards",
      "Large-scale capabilities",
      "World-class amenities",
    ],
    best_for: [
      "Formal luxury celebrations",
      "Large guest gatherings",
      "Resort-based logistics",
      "Polished execution",
      "Comprehensive services",
    ],
    ceremony_options: [
      "Beachfront ceremonies",
      "Resort ballrooms",
      "Garden venues",
      "Multiple ceremony options",
    ],
    reception_options: [
      "Ballroom receptions",
      "Beachfront celebrations",
      "Multi-venue events",
      "Large-scale celebrations",
    ],
    accommodation_nearby: [
      "Luxury resort rooms",
      "Private resort villas",
      "Suite accommodations",
      "Comprehensive resort amenities",
    ],
    dining_experiences: [
      "Fine dining restaurants",
      "Multi-course events",
      "Gourmet catering",
      "Specialty dining",
    ],
    unique_features: [
      "World-class infrastructure",
      "Comprehensive services",
      "Large-scale capabilities",
      "Resort luxury",
      "Professional coordination",
    ],
  },
  {
    id: "8",
    name: "East Bali",
    slug: "east-bali",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Spiritual & Artistic",
    description:
      "Sacred mountains, quiet valleys, and authentic village landscapes, ideal for soulful, artistic, and spiritually grounded destination weddings.",
    long_description:
      "East Bali offers sacred mountains, quiet valleys, and authentic village landscapes that feel far from typical tourist zones. We design soulful, artistic, and spiritually grounded weddings here that feel connected to something genuinely sacred. Ideal for couples seeking authenticity and spiritual depth.",
    location: "East Bali",
    atmosphere:
      "Soulful and authentic, with a genuine spiritual quality and connection to Balinese village culture",
    accessibility_notes:
      "Remote location requires planning; narrower guest capacity, authentic village settings, cultural sensitivity important",
    seasonal_considerations:
      "More remote location means weather can be more variable; careful seasonal planning necessary",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1768288675/Hero_1_w65ysv.jpg",
    guest_capacity: "15 - 100",
    highlights: [
      "Sacred mountain landscapes",
      "Quiet valley settings",
      "Authentic village character",
      "Spiritual significance",
      "Remote, secluded environments",
    ],
    best_for: [
      "Authentic experiences",
      "Spiritual seekers",
      "Artistic celebrations",
      "Quiet, remote settings",
      "Cultural connection",
    ],
    ceremony_options: [
      "Temple ceremonies",
      "Mountain settings",
      "Village gatherings",
      "Sacred spaces",
    ],
    reception_options: [
      "Village community gatherings",
      "Intimate celebrations",
      "Cultural celebrations",
      "Small-scale events",
    ],
    accommodation_nearby: [
      "Authentic local stays",
      "Eco-lodges",
      "Heritage properties",
      "Spiritual retreat centers",
    ],
    dining_experiences: [
      "Traditional Balinese cuisine",
      "Farm-based menus",
      "Community dining",
      "Authentic local experiences",
    ],
    unique_features: [
      "Spiritual authenticity",
      "Village culture",
      "Sacred landscapes",
      "Artistic community",
      "Genuine connection",
    ],
  },
  {
    id: "9",
    name: "Tabanan",
    slug: "tabanan",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Retreat & Landscape",
    description:
      "Rice terraces, jungle valleys, cool highland lakes, and wild west coast beaches — ideal for retreat-style, sustainable, and landscape-led celebrations.",
    long_description:
      "Tabanan offers diverse landscapes: rice terraces, jungle valleys, cool highland lakes, and wild west coast beaches. We design retreat-style, sustainable, and landscape-led celebrations here that feel immersive and environmentally thoughtful. Perfect for couples seeking multi-day experiences shaped by nature.",
    location: "West Central Bali",
    atmosphere:
      "Retreat-like and immersive, with a sustainable, landscape-driven quality that feels connected to nature",
    accessibility_notes:
      "Diverse terrain requires planning; multiple venue options, scenic drives, various accommodation levels",
    seasonal_considerations:
      "West coast exposure means different weather; seasonal planning important for outdoor activities",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773709788/tabanan_poexyo.jpg",
    guest_capacity: "20 - 200",
    highlights: [
      "Rice terraces",
      "Jungle valleys",
      "Highland lakes",
      "Wild west coast beaches",
      "Diverse landscapes",
    ],
    best_for: [
      "Retreat-style celebrations",
      "Sustainable practices",
      "Landscape-led design",
      "Multi-day events",
      "Nature-immersive experiences",
    ],
    ceremony_options: [
      "Rice terrace ceremonies",
      "Jungle clearings",
      "Lakeside settings",
      "Beach ceremonies",
    ],
    reception_options: [
      "Multi-location celebrations",
      "Retreat-style events",
      "Outdoor gatherings",
      "Multi-day experiences",
    ],
    accommodation_nearby: [
      "Eco-lodges",
      "Heritage resorts",
      "Farm stays",
      "Sustainable properties",
    ],
    dining_experiences: [
      "Farm-to-table cuisine",
      "Local agricultural experiences",
      "Sustainable dining",
      "Community-style meals",
    ],
    unique_features: [
      "Rice paddy backdrops",
      "Diverse landscapes",
      "Retreat atmosphere",
      "Sustainability focus",
      "Multi-day possibilities",
    ],
  },
  {
    id: "10",
    name: "Nusa Penida",
    slug: "nusa-penida",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Adventure & Drama",
    description:
      "Towering cliffs, untouched beaches, and cinematic scenery, ideal for elopements and intimate, adventure-inspired destination weddings.",
    long_description:
      "Nusa Penida, a neighboring island to Bali, offers towering cliffs, untouched beaches, and cinematic scenery that feels remote and dramatic. We design elopements and intimate, adventure-inspired weddings here that feel like journeys into something wild and untouched. Perfect for couples seeking drama and adventure.",
    location: "Island off Southeast Bali",
    atmosphere:
      "Wild and dramatic, with an adventurous quality and sense of discovery in a remote, beautiful setting",
    accessibility_notes:
      "Island location requires ferry access; smaller guest capacity, adventure mindset helpful, remote setting",
    seasonal_considerations:
      "Ocean conditions variable; dry season (April-October) ideal for island access and outdoor ceremonies",
    image: "https://res.cloudinary.com/dzerxindp/image/upload/v1773709791/nusa-penida_fqob5b.png",
    guest_capacity: "5 - 80",
    highlights: [
      "Towering seaside cliffs",
      "Untouched beaches",
      "Cinematic scenery",
      "Remote setting",
      "Adventure atmosphere",
    ],
    best_for: [
      "Elopements",
      "Adventure seekers",
      "Intimate ceremonies",
      "Cinematic moments",
      "Drama and beauty",
    ],
    ceremony_options: [
      "Cliff-top ceremonies",
      "Beach ceremonies",
      "Adventure settings",
      "Scenic viewpoint ceremonies",
    ],
    reception_options: [
      "Intimate celebrations",
      "Beachfront dinners",
      "Small-scale events",
      "Adventure-style gatherings",
    ],
    accommodation_nearby: [
      "Island eco-lodges",
      "Small resort properties",
      "Guesthouse stays",
      "Adventure accommodations",
    ],
    dining_experiences: [
      "Beachfront dining",
      "Simple elegant meals",
      "Fresh seafood",
      "Intimate dinner experiences",
    ],
    unique_features: [
      "Dramatic cliffs",
      "Untouched beaches",
      "Island adventure",
      "Cinematic scenery",
      "Remote romance",
    ],
  },
  {
    id: "11",
    name: "North Bali - Singaraja, Menjangan, Lovina, Munduk, Buyan and Tamblingan Lakes",
    slug: "north-bali",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Nature & Retreat",
    description:
      "National parks, coral-rich coastlines, mountain villages, and eco-luxury retreats, ideal for immersive, restorative, and nature-led destination weddings.",
    long_description:
      "North Bali, including Menjangan Island and Singaraja, offers national parks, coral-rich coastlines, mountain villages, and eco-luxury retreat settings. We design immersive, restorative, and nature-led weddings here that feel like complete retreats. Perfect for couples seeking wellness, nature connection, and authentic Balinese experience.",
    location: "North Bali",
    atmosphere:
      "Immersive and restorative, with a strong focus on nature connection, wellness, and authentic Balinese experience",
    accessibility_notes:
      "Remote location requires planning; island access for some venues, multi-day retreat options, nature-focused logistics",
    seasonal_considerations:
      "Northern exposure means different weather patterns; dry season ideal for ceremonies and activities",
    image: "https://res.cloudinary.com/dzerxindp/image/upload/v1773709789/singaraja_mt8hqt.png",
    guest_capacity: "20 - 150",
    highlights: [
      "National park settings",
      "Coral-rich coastlines",
      "Mountain villages",
      "Eco-luxury retreats",
      "Pristine nature",
    ],
    best_for: [
      "Nature immersion",
      "Wellness retreats",
      "Eco-luxury celebrations",
      "Restorative experiences",
      "Authentic Balinese culture",
    ],
    ceremony_options: [
      "Beachfront ceremonies",
      "National park settings",
      "Mountain venues",
      "Eco-resort gardens",
    ],
    reception_options: [
      "Retreat-style celebrations",
      "Nature-integrated events",
      "Multi-day experiences",
      "Wellness-focused gatherings",
    ],
    accommodation_nearby: [
      "Eco-luxury resorts",
      "Wellness retreat centers",
      "Mountain lodges",
      "Beach eco-lodges",
    ],
    dining_experiences: [
      "Farm-to-table cuisine",
      "Wellness-focused menus",
      "Local specialties",
      "Holistic dining experiences",
    ],
    unique_features: [
      "National park access",
      "Eco-luxury amenities",
      "Wellness focus",
      "Nature immersion",
      "Multi-day retreat options",
    ],
  },
  {
    id: "12",
    name: "Lombok Utara",
    slug: "lombok-utara",
    category_id: "cat-indonesia",
    category: getCat("cat-indonesia"),
    type: "Secluded Island Escape",
    description:
      "Pristine beaches, lush tropical landscapes, and an unspoiled natural environment — ideal for intimate and destination weddings seeking seclusion beyond Bali.",
    long_description:
      "North Lombok offers a rare combination of pristine coastline, jungle backdrops, and serene seclusion. As Bali's neighboring island escape, it is increasingly chosen for intimate destination weddings and elopements seeking beauty without the crowds. We curate private and refined celebrations here for couples who want something truly exclusive.",
    location: "North Lombok, West Nusa Tenggara",
    atmosphere:
      "Secluded and unhurried, with an unspoiled natural beauty and sense of complete privacy",
    accessibility_notes:
      "Accessible via Lombok International Airport or fast boat from Bali; remote venue settings require logistical planning",
    seasonal_considerations:
      "Dry season (May–October) ideal; tropical rainfall in wet season requires contingency planning",
    image: "https://placehold.net/default.svg",
    guest_capacity: "10 - 80",
    highlights: [
      "Pristine unspoiled beaches",
      "Lush tropical jungle settings",
      "Complete seclusion and privacy",
      "Dramatic island landscape",
      "Authentic local culture",
    ],
    best_for: [
      "Intimate destination weddings",
      "Elopements seeking true seclusion",
      "Couples wanting beyond-Bali experiences",
      "Private island aesthetics",
      "Nature-immersed celebrations",
    ],
    ceremony_options: [
      "Beachfront ceremonies",
      "Jungle clearing ceremonies",
      "Resort garden settings",
      "Cliffside viewpoints",
    ],
    reception_options: [
      "Private resort dinners",
      "Beachfront celebrations",
      "Intimate jungle gatherings",
      "Poolside receptions",
    ],
    accommodation_nearby: [
      "Boutique island resorts",
      "Eco-luxury retreats",
      "Private villa rentals",
      "Glamping and eco-lodges",
    ],
    dining_experiences: [
      "Fresh seafood dinners",
      "Private chef experiences",
      "Local Sasak cuisine",
      "Intimate candlelit dining",
    ],
    unique_features: [
      "True island seclusion",
      "Unspoiled natural beauty",
      "Beyond-Bali exclusivity",
      "Local cultural richness",
      "Small-scale intimate atmosphere",
    ],
  },
];
