import { Destination, DestinationCategory } from "@/types";
// ─── CATEGORIES ───────────────────────────────────────────────────────────────

export const destinationCategories: DestinationCategory[] = [
  { id: "cat-bali", name: "Bali", destinations: [] },
  { id: "cat-themes", name: "Themes", destinations: [] },
  { id: "cat-islands", name: "Islands", destinations: [] },
  { id: "cat-outsite-bali", name: "Outside Bali", destinations: [] },
];

const getCat = (id: string): DestinationCategory =>
  destinationCategories.find((c) => c.id === id)!;

// ─── DESTINATIONS ─────────────────────────────────────────────────────────────
// id slug digunakan sebagai destinationId di venue-data.ts

export const destinationList: Destination[] = [
  {
    id: "1",
    name: "Uluwatu",
    slug: "uluwatu-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Luxury Cliffside",
    description:
      "Dramatic ocean cliffs, open horizons, and architectural venues, ideal for cinematic, luxury destination weddings and sunset ceremonies shaped by scale and elegance.",
    long_description:
      "Uluwatu is one of Bali's most breathtaking wedding destinations, known for its dramatic cliffs, expansive ocean views, and unforgettable sunsets over the Indian Ocean. We design weddings in Uluwatu that embrace the power of the landscape — creating celebrations that feel elevated, intentional, and visually striking. Our Uluwatu weddings are shaped by open horizons, ocean winds, and the interplay between architecture and nature. From private clifftop villas to exclusive oceanfront resorts, our weddings in Uluwatu are curated as complete experiences, not just beautifully decorated events.",
    location: "South Bali",
    atmosphere:
      "Dramatic yet refined — expansive, open, and light-filled, where the setting itself becomes the ceremony with a strong sense of place",
    accessibility_notes:
      "Some venues involve stairs, multi-level layouts, or transport coordination for guests and vendors; clifftop venues often have specific sound limitations and curfews that must be respected",
    seasonal_considerations:
      "Strong ocean winds require careful selection of ceremony structures, floral installations, and décor elements; ceremony timing is precisely planned to capture optimal sunset light and photography moments",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773495615/uluwatu-cover_rcjccs.jpg",
    guest_capacity: "50 - 500+",
    highlights: [
      "Dramatic limestone cliffs and expansive ocean views",
      "Unforgettable sunsets over the Indian Ocean",
      "Architectural clifftop villas and luxury resorts",
      "Exclusive venues with privacy and grandeur",
      "Cinematic, design-led wedding environments",
    ],
    best_for: [
      "Dramatic cliffside ceremony settings",
      "Luxury environments with privacy and exclusivity",
      "Couples seeking visual impact and grandeur",
      "Sunset ceremonies and cliffside celebrations",
      "Elevated, cinematic destination experiences",
    ],
    ceremony_options: [
      "Cliff-edge sunset ceremonies",
      "Oceanfront cliffside settings",
      "Architectural venue ceremonies",
      "Private villa and estate ceremonies",
      "Intimate cliffside elopements",
    ],
    reception_options: [
      "Infinity pool receptions",
      "Cliffside dining and banquets",
      "Multi-level venue celebrations",
      "Luxury villa estate receptions",
      "Sunset cocktail and evening reception flows",
    ],
    accommodation_nearby: [
      "Exclusive clifftop villas and resorts",
      "Private villa estates with staff",
      "Boutique luxury hotels",
      "High-end resort properties",
    ],
    dining_experiences: [
      "World-class resort restaurants",
      "Private chef experiences",
      "Oceanview cliffside dining",
      "Multi-course sunset dinners",
      "Artisanal catering services",
    ],
    unique_features: [
      "Cliff-edge ceremony above the ocean",
      "Sunset moments that feel cinematic",
      "Architectural design opportunities",
      "Private venue exclusivity and scale",
      "Iconic Bali wedding experience",
    ],
  },
  {
    id: "2",
    name: "Ubud",
    slug: "ubud-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Spiritual & Artistic",
    description:
      "Jungle valleys, rivers, rice terraces, and spiritual depth, ideal for intimate, artistic, and emotionally grounded weddings rooted in nature and culture.",
    long_description:
      "Ubud is one of Bali's most iconic and soulful wedding destinations, known for its lush jungles, rice terraces, river valleys, and a deep connection to culture and nature. We design weddings in Ubud that go beyond visual beauty — creating celebrations that feel immersive, intentional, and emotionally resonant. Our Ubud weddings are shaped by natural textures, filtered light, and a sense of stillness that allows each moment to feel grounded and meaningful. We work with couples drawn to Ubud for its atmosphere, connection to nature, and its ability to create a wedding experience that feels deeply personal.",
    location: "Ubud & Gianyar",
    atmosphere:
      "Calm yet deeply expressive — nature-led and immersive, intimate and emotionally grounded, with an organic elegance shaped by jungle, valley, and filtered light",
    accessibility_notes:
      "Some venues involve steps, slopes, or natural terrain requiring careful guest movement planning; many venues are tucked into jungle landscapes needing realistic transportation scheduling",
    seasonal_considerations:
      "Jungle environments require preparation for humidity and potential rain; timing carefully planned to capture the most beautiful light within forest and valley settings; sound and event flow influenced by venue's natural and peaceful atmosphere",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775311396/Ubud_final1_-_crop_atau_edit_dikit_biar_beda_dari_aslinya_ya_qolh2y.png",
    guest_capacity: "20 - 200",
    highlights: [
      "Lush jungle, rice terraces, and river valley settings",
      "Deep cultural and spiritual connection",
      "Filtered natural light through tropical landscapes",
      "Boutique villas and resorts integrated with nature",
      "Intimate and emotionally resonant atmosphere",
    ],
    best_for: [
      "Nature-integrated ceremony settings",
      "Couples seeking calm, privacy, and emotional depth",
      "Unique non-traditional venue experiences",
      "Intimate and meaningful wedding journeys",
      "A deeper connection to Bali's cultural landscape",
    ],
    ceremony_options: [
      "Jungle and forest ceremonies",
      "Riverside and valley settings",
      "Rice terrace ceremony backdrops",
      "Private villa garden ceremonies",
      "Sacred and spiritual spaces",
    ],
    reception_options: [
      "Private villa and boutique resort receptions",
      "Eco-resort intimate gatherings",
      "Riverside dinners surrounded by nature",
      "Garden settings with organic design",
      "Retreat-style multi-day event experiences",
    ],
    accommodation_nearby: [
      "Private jungle villas and boutique resorts",
      "Heritage hotels with cultural character",
      "Wellness and spiritual retreat centers",
      "Nature-integrated eco-lodges",
    ],
    dining_experiences: [
      "Farm-to-table and organic cuisine",
      "Traditional Balinese cultural dining",
      "Private chef nature-immersive experiences",
      "Wellness-focused and holistic menus",
    ],
    unique_features: [
      "A ceremony surrounded by nature",
      "Quiet and meaningful gathering atmosphere",
      "Immersive experience shaped by landscape",
      "Deeply personal and emotionally unforgettable",
      "Multi-day retreat possibilities",
    ],
  },
  {
    id: "3",
    name: "Canggu",
    slug: "canggu-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Contemporary Villa",
    description:
      "Contemporary private villas, relaxed coastal energy, and creative culture, ideal for modern destination weddings with a private villa lifestyle atmosphere.",
    long_description:
      "Canggu is one of Bali's most dynamic coastal destinations, known for its black-sand beaches, modern venues, and a vibrant creative energy that blends lifestyle, design, and community. We design weddings in Canggu that reflect its contemporary spirit — creating celebrations that feel stylish, expressive, and thoughtfully curated. Our Canggu weddings are shaped by modern architecture, sunset light, and a balance between relaxed atmosphere and elevated design. From private villas to stylish beach clubs, Canggu provides versatile venues for weddings that blend celebration, design, and social energy.",
    location: "South Bali",
    atmosphere:
      "Stylish yet relaxed — creative, design-forward, and social, feeling less like formal events and more like beautifully curated modern gatherings",
    accessibility_notes:
      "Guest transportation and timing should be carefully managed especially during peak hours; some areas have specific sound limitations for evening celebrations",
    seasonal_considerations:
      "Design elements must consider wind, humidity, and open-air coastal environments; sunset timing aligned with Bali's western coastline for maximum atmosphere",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773709788/canggu_zloeql.jpg",
    guest_capacity: "30 - 300",
    highlights: [
      "Contemporary villa and beach club settings",
      "Black-sand beaches and sunset views",
      "Vibrant creative and lifestyle-oriented culture",
      "Flexible, non-traditional venue options",
      "Social and experiential wedding atmospheres",
    ],
    best_for: [
      "Design-forward and aesthetic-driven couples",
      "Stylish beachfront and contemporary venues",
      "Flexible, non-traditional wedding formats",
      "Social and engaging celebrations",
      "A balance of relaxed and elevated experiences",
    ],
    ceremony_options: [
      "Villa garden and pool ceremonies",
      "Beach and beach club settings",
      "Indoor-outdoor contemporary spaces",
      "Rooftop sunset ceremonies",
      "Intimate modern elopements",
    ],
    reception_options: [
      "Villa lounge and pool party events",
      "Beach club receptions",
      "Multi-space indoor celebrations",
      "Vibrant evening reception flows",
      "Modern boutique venue gatherings",
    ],
    accommodation_nearby: [
      "Modern villa rentals",
      "Contemporary boutique resorts",
      "Stylish hotels and guesthouses",
      "Beach club properties",
    ],
    dining_experiences: [
      "Contemporary and international cuisine",
      "Beach club dining experiences",
      "Private chef villa services",
      "Sunset cocktail and dinner flows",
    ],
    unique_features: [
      "Sunset celebrations with a contemporary edge",
      "Social and expressive gathering atmosphere",
      "Creative community and design flexibility",
      "Lifestyle-driven multi-day villa experiences",
      "Modern coastal wedding identity",
    ],
  },
  {
    id: "4",
    name: "Seminyak",
    slug: "seminyak-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Elegant Boutique",
    description:
      "Boutique resorts, elegant villas, and central accessibility, ideal for refined destination weddings with polished hospitality and vibrant guest experiences.",
    long_description:
      "Seminyak is one of Bali's most refined coastal destinations, known for its upscale beach clubs, stylish venues, and a vibrant yet sophisticated atmosphere that blends luxury with lifestyle. We design weddings in Seminyak that reflect its polished character — creating celebrations that feel elegant, contemporary, and effortlessly curated. Our Seminyak weddings are shaped by sunset light, refined spaces, and a seamless balance between design and guest experience. We work with couples drawn to Seminyak for its combination of beachfront beauty, high-end venues, and a cosmopolitan yet relaxed energy.",
    location: "South Bali",
    atmosphere:
      "Elegant yet relaxed — refined and design-conscious, social and beautifully orchestrated, with modern coastal sophistication and timeless appeal",
    accessibility_notes:
      "Excellent airport access and well-developed infrastructure; guest logistics and transportation should be managed to account for busy areas; certain venues have sound restrictions and curfews that must be carefully planned around",
    seasonal_considerations:
      "Ceremony timing aligned with Bali's sunset for most flattering light and atmosphere; design elements must consider coastal breeze, humidity, and open-air environments; seamless transitions between ceremony, cocktail, and reception spaces essential",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773709789/seminyak_bihos7.jpg",
    guest_capacity: "50 - 400",
    highlights: [
      "Upscale beach clubs and stylish lifestyle venues",
      "Iconic Bali sunset beachfront settings",
      "Luxury resorts and elegant private villas",
      "Vibrant yet sophisticated cosmopolitan atmosphere",
      "Refined hospitality with seamless guest experiences",
    ],
    best_for: [
      "Stylish and contemporary beachfront weddings",
      "Couples seeking refined elegance with social energy",
      "Sunset celebrations with curated ambiance",
      "International guests requiring easy accessibility",
      "A balance between luxury and relaxed lifestyle",
    ],
    ceremony_options: [
      "Sunset beach and beachfront ceremonies",
      "Luxury resort garden settings",
      "Villa courtyard and pool ceremonies",
      "Boutique beach club settings",
      "Intimate stylish elopements",
    ],
    reception_options: [
      "Beachfront dinner receptions",
      "Resort banquet and terrace celebrations",
      "Villa lifestyle receptions",
      "Sunset cocktail and sophisticated evening flows",
      "Multi-space venue experiences",
    ],
    accommodation_nearby: [
      "Boutique luxury resorts and beach clubs",
      "Elegant private villa properties",
      "Upscale hotels with lifestyle amenities",
      "High-end villa estates with staff",
    ],
    dining_experiences: [
      "Resort and beachfront restaurant dining",
      "Upscale catering and multi-course experiences",
      "Sunset cocktail and lifestyle dining flows",
      "Private chef and bespoke catering services",
    ],
    unique_features: [
      "Sunset celebration with refined ambiance",
      "Stylish and social gathering atmosphere",
      "Seamless blend of luxury and comfort",
      "Bali's modern coastal lifestyle as backdrop",
      "Polished design and effortless execution",
    ],
  },
  {
    id: "5",
    name: "Sanur",
    slug: "sanur-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Seaside Charm",
    description:
      "Calm coastlines, heritage charm, and timeless seaside elegance, ideal for intimate, family-friendly destination weddings with a gentle, unhurried rhythm.",
    long_description:
      "Sanur is one of Bali's most refined coastal destinations, known for its gentle beaches, sunrise views, and a sense of quiet sophistication that feels distinctly different from the island's more vibrant west coast. We design weddings in Sanur that embrace its calm atmosphere — creating celebrations that feel intimate, elegant, and deeply connected to the natural rhythm of the sea. Our Sanur weddings are shaped by soft morning light, ocean breezes, and a slower pace that allows each moment to unfold with intention.",
    location: "South Bali",
    atmosphere:
      "Calm yet beautifully curated — intimate, soft, airy, and light-filled with timeless seaside elegance and a slower, more meaningful pace",
    accessibility_notes:
      "Quieter alternative to busier areas, established boutique accommodations, calm east coast waterfront setting; morning ceremonies preferred to avoid midday heat",
    seasonal_considerations:
      "East coast location provides calmer waters and gentler weather patterns; sunrise timing planned carefully to align with optimal morning light and photography conditions",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775311085/Sanur_Beach_i0zlll.png",
    guest_capacity: "20 - 250",
    highlights: [
      "Calm and gentle east coast beaches",
      "Beautiful sunrise ceremony settings",
      "Heritage charm and quiet sophistication",
      "Timeless seaside elegance",
      "Family-friendly and intimate atmosphere",
    ],
    best_for: [
      "Intimate and family-oriented weddings",
      "Sunrise beach ceremonies",
      "Couples seeking calm and refined coastal settings",
      "Elegant simplicity and unhurried rhythm",
      "Meaningful connections in a peaceful environment",
    ],
    ceremony_options: [
      "Sunrise beachfront ceremonies",
      "Resort garden settings",
      "Waterfront venues",
      "Boutique villa ceremonies",
      "Intimate beachside elopements",
    ],
    reception_options: [
      "Seaside brunch receptions",
      "Waterfront dinner celebrations",
      "Resort banquets",
      "Intimate garden gatherings",
      "Relaxed afternoon celebrations",
    ],
    accommodation_nearby: [
      "Boutique beachfront resorts",
      "Heritage hotels and villas",
      "Family-friendly resort properties",
      "Peaceful waterfront stays",
    ],
    dining_experiences: [
      "Seafood specialties and waterfront dining",
      "Sunrise brunch catering",
      "Casual yet elegant restaurant experiences",
      "Family-style and intimate dining",
    ],
    unique_features: [
      "Rare sunrise wedding ceremonies by the sea",
      "Quiet sophistication distinct from west coast Bali",
      "Heritage atmosphere and timeless character",
      "Calm waters and peaceful setting",
      "Morning-to-afternoon celebration rhythm",
    ],
  },
  {
    id: "6",
    name: "Nusa Dua",
    slug: "nusa-dua-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Luxury Resort",
    description:
      "Expansive beachfront resorts, controlled environments, and polished service, ideal for formal luxury destination weddings with large guest logistics.",
    long_description:
      "Nusa Dua is one of Bali's most prestigious coastal destinations, known for its pristine beaches, world-class resorts, and a highly refined environment designed for comfort, privacy, and elevated experiences. We design weddings in Nusa Dua that reflect its polished character — creating celebrations that feel luxurious, seamless, and thoughtfully executed. Our Nusa Dua weddings are shaped by clean beachfront landscapes, refined architecture, and a level of service that ensures every detail is carefully managed. We work with couples drawn to Nusa Dua for its exclusivity, safety, and the ease of hosting a beautifully organized destination wedding.",
    location: "South Bali",
    atmosphere:
      "Elegant and well-structured — refined, polished, and seamless in execution, luxurious without feeling excessive with world-class resort hospitality",
    accessibility_notes:
      "Closest to airport with all-inclusive resort infrastructure; highly accessible making guest transportation and accommodation seamless; luxury resorts operate with structured systems requiring precise planning and coordination with venue teams",
    seasonal_considerations:
      "Resort infrastructure handles all weather considerations with strong backup plans; indoor and outdoor options available year-round; timelines carefully managed to ensure smooth transitions between each part of the celebration",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773709793/nusa-dua_n5nqlj.png",
    guest_capacity: "100 - 1000+",
    highlights: [
      "Pristine beachfront and world-class resort settings",
      "Clean, well-maintained and private beach environments",
      "Comprehensive luxury resort facilities and amenities",
      "High international service standards",
      "Seamless indoor and outdoor venue flexibility",
    ],
    best_for: [
      "Luxury beachfront ceremonies with full resort services",
      "Large guest gatherings requiring seamless logistics",
      "Couples seeking high service standards and comfort",
      "Formal luxury celebrations with polished execution",
      "Destination weddings with comprehensive resort experience",
    ],
    ceremony_options: [
      "Pristine beachfront ceremonies",
      "Resort garden and lawn settings",
      "Elegant ballroom ceremonies",
      "Multiple indoor and outdoor ceremony options",
    ],
    reception_options: [
      "Grand ballroom receptions",
      "Beachfront dinner celebrations",
      "Multi-venue resort events",
      "Large-scale refined celebrations",
      "Seamless indoor-outdoor reception flows",
    ],
    accommodation_nearby: [
      "International luxury resort rooms and suites",
      "Private resort villa accommodations",
      "Comprehensive resort amenity packages",
      "Premium beachfront properties",
    ],
    dining_experiences: [
      "Fine dining and multi-course resort experiences",
      "Gourmet catering and bespoke menus",
      "Specialty and themed dining experiences",
      "World-class culinary services",
    ],
    unique_features: [
      "Beautifully organized beachfront ceremony setting",
      "Refined celebration with effortless operational flow",
      "Luxurious yet comfortable guest experience",
      "Bali's most polished coastal resort destination",
      "Professional coordination and world-class infrastructure",
    ],
  },
  {
    id: "7",
    name: "Tabanan",
    slug: "tabanan-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Retreat & Landscape",
    description:
      "Rice terraces, jungle valleys, cool highland lakes, and wild west coast beaches — ideal for retreat-style, sustainable, and landscape-led celebrations.",
    long_description:
      "Tabanan offers diverse landscapes: rice terraces, jungle valleys, cool highland lakes, and wild west coast beaches. We design retreat-style, sustainable, and landscape-led celebrations here that feel immersive and environmentally thoughtful. Perfect for couples seeking multi-day experiences shaped by nature.",
    location: "West Bali",
    atmosphere:
      "Retreat-like and immersive, with a sustainable, landscape-driven quality that feels connected to nature",
    accessibility_notes:
      "Diverse terrain requires planning; multiple venue options, scenic drives, various accommodation levels",
    seasonal_considerations:
      "West coast exposure means different weather; seasonal planning important for outdoor activities",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773709788/tabanan_poexyo.jpg",
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
    id: "8",
    name: "Nusa Penida",
    slug: "nusa-penida-wedding",
    category_id: "cat-islands",
    category: getCat("cat-islands"),
    type: "Clifftop & Cinematic Drama",
    description:
      "Rugged cliffs, deep blue ocean, and open horizons, ideal for bold, cinematic, and visually extraordinary destination weddings shaped by scale, light, and untamed natural beauty.",
    long_description:
      "Nusa Penida offers one of Bali's most dramatic and visually striking landscapes — where rugged cliffs, deep blue ocean, and open horizons create a setting that feels vast, powerful, and unforgettable. Unlike the softer rhythm of mainland Bali, Nusa Penida carries a raw and untamed energy — making it ideal for weddings that feel bold, cinematic, and deeply connected to nature. At Linda Wiryani Design and Event Planning, we design weddings in Nusa Penida that embrace this scale — creating celebrations that feel intentional, immersive, and visually extraordinary. Our Nusa Penida weddings are shaped by cliffside views, strong natural light, and the expansive meeting point between land and ocean.",
    location: "Nusa Islands",
    atmosphere:
      "Bold yet refined — expansive and visually striking, minimal and landscape-driven, elegant within a raw natural setting where cliffs, ocean, and sky create a naturally dramatic composition",
    accessibility_notes:
      "Island access requires coordinated boat transfers for guests and vendors; cliffside locations require careful planning for safety and guest movement; strong coastal winds must be considered in design and setup; certain technical elements may need to be arranged from mainland Bali",
    seasonal_considerations:
      "Strong coastal winds and open environmental exposure must be carefully considered in design and structure planning; natural light across exposed cliff landscapes is particularly dramatic at sunrise and sunset; dry season preferred for travel logistics and outdoor ceremony conditions",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775309453/Nusa_Penida_final_h8b3bp.png",
    guest_capacity: "5 - 80",
    highlights: [
      "Dramatic clifftop ceremony settings with expansive ocean views",
      "Raw and untamed natural environment unlike any mainland Bali setting",
      "Bold, cinematic, and editorial-quality wedding landscapes",
      "Strong visual storytelling shaped by cliff, sky, and deep blue sea",
      "A unique and visually powerful island wedding destination",
    ],
    best_for: [
      "Couples seeking a one-of-a-kind dramatic landscape setting",
      "Clifftop ceremonies with expansive ocean and horizon views",
      "Bold, adventurous, and visually striking wedding experiences",
      "Editorial and concept-driven island celebrations",
      "A raw, elevated, and deeply unforgettable Bali wedding",
    ],
    ceremony_options: [
      "Clifftop ceremonies with dramatic ocean backdrop",
      "Beachfront and coastal settings within rugged terrain",
      "Intimate elopements on remote island landscapes",
      "Scenic viewpoint and elevated open-air ceremonies",
    ],
    reception_options: [
      "Intimate clifftop dinner gatherings with ocean views",
      "Beachfront and open-air island receptions",
      "Small-scale editorial and concept-driven celebrations",
      "Adventure-style and landscape-immersive experiences",
    ],
    accommodation_nearby: [
      "Boutique island eco-lodges and nature retreats",
      "Small resort and villa properties",
      "Guesthouse stays with island character",
      "Clifftop and coastal accommodation options",
    ],
    dining_experiences: [
      "Private chef clifftop and coastal dining experiences",
      "Fresh seafood and local island cuisine",
      "Intimate beachfront dinner settings",
      "Concept-driven bespoke catering in dramatic surroundings",
    ],
    unique_features: [
      "Ceremony on the edge of Bali's most dramatic cliffside landscape",
      "Bold and visually powerful gathering shaped by ocean and sky",
      "A wedding that feels raw, cinematic, and deeply extraordinary",
      "One of Bali's most striking and emotionally impactful island settings",
      "An immersive, visually unforgettable, and truly one-of-a-kind experience",
    ],
  },
  {
    id: "8b",
    name: "Nusa Lembongan",
    slug: "nusa-lembongan-wedding",
    category_id: "cat-islands",
    category: getCat("cat-islands"),
    type: "Relaxed Island Elegance",
    description:
      "Clear waters, soft coastal light, and a relaxed island atmosphere, ideal for intimate, effortless, and naturally beautiful destination weddings shaped by ocean, simplicity, and ease.",
    long_description:
      "Nusa Lembongan offers a different rhythm of Bali — one that feels slower, lighter, and more connected to the ocean. Surrounded by clear waters, soft coastal light, and a relaxed island atmosphere, this destination creates a wedding experience that feels intimate, effortless, and naturally beautiful. At Linda Wiryani Design and Event Planning, we design weddings in Nusa Lembongan that embrace this simplicity — creating celebrations that feel calm, refined, and deeply connected to the island environment. Our Nusa Lembongan weddings are shaped by ocean views, open skies, and a sense of ease that allows each moment to unfold naturally.",
    location: "Nusa Islands",
    atmosphere:
      "Relaxed yet refined — light-filled and naturally elegant, intimate and atmosphere-led, effortless with quiet sophistication shaped by ocean, open sky, and the unhurried rhythm of island life",
    accessibility_notes:
      "Island access requires boat transfers for guests and vendors; guest accommodation planning is important due to the island's limited but curated options; wind and ocean conditions must be carefully considered; certain technical elements may need to be arranged from mainland Bali; schedules must account for island transport and setup timing",
    seasonal_considerations:
      "Light transitions from day to sunset must be considered for ceremony timing; wind conditions and coastal exposure influence design and structure choices; dry season provides the most stable conditions for island access and outdoor celebrations",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775309427/Nusa_Lembongan_Final_vc5hxp.png",
    guest_capacity: "10 - 100",
    highlights: [
      "Clear waters and soft coastal light creating a naturally beautiful setting",
      "Relaxed and intimate island atmosphere away from mainland crowds",
      "Oceanfront ceremony locations with open sky and sea views",
      "Curated villas and boutique properties offering privacy and natural beauty",
      "A slower, more intentional wedding experience shaped by island rhythm",
    ],
    best_for: [
      "Couples seeking a quiet island setting away from crowds",
      "Intimate and meaningful oceanfront celebrations",
      "A relaxed yet elegantly refined wedding atmosphere",
      "Private villa and boutique venue island experiences",
      "A destination that feels both private and accessible",
    ],
    ceremony_options: [
      "Oceanfront ceremonies with clear water and open sky backdrops",
      "Beachfront and coastal garden settings",
      "Private villa ocean-view ceremonies",
      "Intimate island elopements in relaxed coastal surroundings",
    ],
    reception_options: [
      "Relaxed open-air dining under open skies",
      "Boutique villa and private resort receptions",
      "Intimate beachfront dinner gatherings",
      "Small-scale island celebration experiences",
    ],
    accommodation_nearby: [
      "Curated boutique villas and private island properties",
      "Small resort properties with ocean views",
      "Intimate guesthouses and eco-lodge stays",
      "Beachfront villa rentals with direct water access",
    ],
    dining_experiences: [
      "Private chef ocean-view dining experiences",
      "Fresh seafood and local island cuisine",
      "Relaxed beachfront and open-air dinner settings",
      "Intimate and effortlessly curated catering experiences",
    ],
    unique_features: [
      "Ceremony by the ocean in one of Bali's most relaxed island settings",
      "Quiet and meaningful gathering shaped by light, water, and open sky",
      "A wedding that feels calm, intimate, and naturally effortless",
      "Bali's most accessible yet private island wedding destination",
      "A celebration defined by simplicity, ocean, and genuine connection",
    ],
  },
  {
    id: "8c",
    name: "Nusa Ceningan",
    slug: "nusa-ceningan-wedding",
    category_id: "cat-islands",
    category: getCat("cat-islands"),
    type: "Intimate Coastal Charm",
    description:
      "Smaller scale, coastal textures, and a slower island rhythm, ideal for intimate, understated, and naturally connected destination weddings shaped by simplicity and quiet coastal beauty.",
    long_description:
      "Nusa Ceningan offers one of Bali's most intimate and understated island experiences — where smaller scale, coastal textures, and a slower rhythm create a setting that feels personal, relaxed, and naturally beautiful. Located between Nusa Lembongan and Nusa Penida, this island carries a unique balance — combining the ease of Lembongan with the character and edge of Penida, yet in a more quiet and intimate form. At Linda Wiryani Design and Event Planning, we design weddings in Nusa Ceningan that embrace this simplicity — creating celebrations that feel calm, intentional, and effortlessly refined. Our Nusa Ceningan weddings are shaped by ocean views, coastal cliffs, and a sense of stillness that allows each moment to feel grounded and present.",
    location: "Nusa Islands",
    atmosphere:
      "Intimate yet elevated — simple and thoughtfully curated, calm, natural, and atmosphere-led, elegant with quiet character shaped by coastal cliffs, ocean views, and the stillness of a lesser-explored island",
    accessibility_notes:
      "Guests typically arrive via Nusa Lembongan requiring coordinated transfers; limited but curated accommodation options require early planning; open coastal environments require careful consideration for setup and design; some elements may need to be arranged from mainland Bali; schedules must align with island transport and setup timing",
    seasonal_considerations:
      "Open environments and wind conditions require thoughtful design and structural choices; natural light and soft ocean reflections create beautiful ceremony conditions particularly at golden hour; dry season preferred for stable access and outdoor event planning",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775309438/Nusa_Ceningan_Wedding_xhxycj.png",
    guest_capacity: "5 - 60",
    highlights: [
      "Intimate and quiet island atmosphere unlike any other Bali destination",
      "Coastal cliffs and ocean views in a smaller, more personal setting",
      "A unique balance between ease and edge — calm yet characterful",
      "Less explored and genuinely private island environment",
      "Naturally beautiful surroundings shaped by simplicity and texture",
    ],
    best_for: [
      "Couples seeking a quiet and private intimate island setting",
      "Coastal and cliffside ceremony locations in a relaxed environment",
      "A unique and less commercial island wedding destination",
      "Intimate elopements with a slower and more intentional pace",
      "A wedding experience that feels simple, personal, and authentic",
    ],
    ceremony_options: [
      "Coastal cliffside ceremonies with expansive ocean views",
      "Intimate beachfront and shoreline settings",
      "Private villa and boutique venue ceremonies",
      "Elopements in quiet and secluded island surroundings",
    ],
    reception_options: [
      "Intimate open-air gatherings by the coast",
      "Small boutique venue and private villa receptions",
      "Quiet beachfront dinner celebrations",
      "Relaxed and personal island gathering experiences",
    ],
    accommodation_nearby: [
      "Small boutique villas and private island retreats",
      "Intimate guesthouses with coastal views",
      "Eco-lodge and nature-integrated stays",
      "Nearby Nusa Lembongan accommodation options",
    ],
    dining_experiences: [
      "Private chef intimate coastal dining experiences",
      "Fresh seafood and simple local island cuisine",
      "Quiet beachfront and open-air meal settings",
      "Understated and authentically curated catering",
    ],
    unique_features: [
      "Ceremony in one of Bali's most intimate and less explored island settings",
      "Quiet and personal gathering shaped by coastal simplicity and stillness",
      "A wedding that feels calm, authentic, and deeply connected to its surroundings",
      "Bali's most understated and genuinely private island wedding destination",
      "A celebration defined by intimacy, texture, and natural coastal beauty",
    ],
  },
  {
    id: "9",
    name: "Lombok",
    slug: "lombok-wedding",
    category_id: "cat-outsite-bali",
    category: getCat("cat-outsite-bali"),
    type: "Island Escape & Coastal Simplicity",
    description:
      "Wide open beaches, gentle landscapes, and a slower island rhythm, ideal for intimate, effortless, and quietly elegant destination weddings shaped by space, simplicity, and natural beauty.",
    long_description:
      "Lombok offers a quieter and more understated alternative to Bali — where wide open beaches, gentle landscapes, and a slower rhythm create a setting that feels calm, spacious, and deeply relaxing. Less developed and more natural in character, Lombok allows weddings to unfold in a way that feels unhurried, intimate, and beautifully connected to its surroundings. At Linda Wiryani Design and Event Planning, we design weddings in Lombok that embrace this sense of space — creating celebrations that feel effortless, refined, and quietly elevated. Our Lombok weddings are shaped by open coastlines, soft light, and a sense of stillness that allows each moment to feel grounded and intentional.",
    location: "Lombok",
    atmosphere:
      "Spacious yet intimate — calm and naturally elegant, light-filled and atmosphere-led, refined with quiet sophistication shaped by wide coastlines, open horizons, and the unhurried rhythm of a less developed island",
    accessibility_notes:
      "Accessible via Lombok International Airport or fast boat from Bali; flights, transfers, and logistics must be carefully coordinated; guest accommodations require early planning due to more limited options compared to Bali; certain vendors and technical elements may need to be brought from Bali; schedules must allow for travel and setup logistics",
    seasonal_considerations:
      "Wind and sun exposure across open coastal landscapes must be carefully considered in design and timing; dry season (May–October) provides the most stable conditions for outdoor ceremonies; natural light across wide horizons is particularly beautiful at golden hour and sunset",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775309336/Lombok_uo3d50.png",
    guest_capacity: "10 - 150",
    highlights: [
      "Wide and untouched beachfront ceremony settings",
      "A quieter and more relaxed island atmosphere away from crowds",
      "Natural and less commercial open coastal environment",
      "Curated villas and boutique resorts offering privacy and flexibility",
      "A true sense of space, openness, and peaceful escape",
    ],
    best_for: [
      "Couples seeking a calm and exclusive beachfront destination",
      "Intimate weddings in a natural and unhurried setting",
      "Private villa and boutique resort celebrations",
      "A wedding experience that feels peaceful and immersive",
      "A destination that offers both space and quiet refinement",
    ],
    ceremony_options: [
      "Beachfront ceremonies along wide open coastlines",
      "Oceanfront resort and villa garden settings",
      "Intimate elopements in quiet natural surroundings",
      "Cliffside and elevated viewpoint ceremonies",
    ],
    reception_options: [
      "Private resort and villa outdoor dinner receptions",
      "Beachfront open-air celebration gatherings",
      "Intimate boutique venue experiences",
      "Relaxed and nature-surrounded evening events",
    ],
    accommodation_nearby: [
      "Boutique beachfront resorts and eco-luxury retreats",
      "Private villa rentals with ocean views",
      "Intimate island guesthouses and glamping stays",
      "Curated properties with privacy and natural character",
    ],
    dining_experiences: [
      "Private chef beachfront dining experiences",
      "Fresh seafood and local Sasak cuisine",
      "Sunset and open-air coastal dinner settings",
      "Intimate and effortlessly curated catering experiences",
    ],
    unique_features: [
      "Ceremony along one of Indonesia's most unspoiled and spacious coastlines",
      "Quiet and meaningful gathering shaped by space, light, and open horizon",
      "A wedding that feels peaceful, natural, and beautifully understated",
      "A private and exclusive destination beyond the pace of Bali",
      "A celebration defined by simplicity, calm, and genuine escape",
    ],
  },
  {
    id: "9b",
    name: "Sumba",
    slug: "sumba-wedding",
    category_id: "cat-outsite-bali",
    category: getCat("cat-outsite-bali"),
    type: "Remote Luxury & Cinematic Landscape",
    description:
      "Vast savannahs, dramatic coastlines, and a deep cultural presence, ideal for exclusive, immersive, and truly extraordinary destination weddings shaped by landscape, authenticity, and quiet luxury.",
    long_description:
      "Sumba offers one of Indonesia's most extraordinary and untouched landscapes — where vast savannahs, dramatic coastlines, and a deep cultural presence create a setting that feels both powerful and rare. Far removed from the pace of Bali, Sumba invites a different kind of wedding experience — one that is slower, more intentional, and deeply connected to land, tradition, and space. At Linda Wiryani Design and Event Planning, we design weddings in Sumba that embrace this scale and authenticity — creating celebrations that feel immersive, refined, and truly one of a kind. Our Sumba weddings are shaped by open horizons, raw textures, and a quiet sense of luxury that comes from simplicity, isolation, and meaning.",
    location: "Sumba",
    atmosphere:
      "Expansive yet deeply intimate — raw yet refined, minimal and landscape-driven, elevated with quiet sophistication shaped by vast savannahs, dramatic coastal cliffs, and the rare sense of an untouched and culturally rich island",
    accessibility_notes:
      "Remote destination requiring detailed coordination for flights, transfers, and all guest logistics; limited but high-end accommodation options require early planning; many elements including vendors and technical setups may need to be brought from Bali; open landscapes require careful planning for sun, wind, and natural exposure; extended planning timelines are essential for smooth execution",
    seasonal_considerations:
      "Open savannahs and coastal environments require full preparation for sun, wind, and natural elements; dry season is strongly preferred for ceremony conditions and travel logistics; natural light across vast open landscapes creates particularly dramatic and cinematic conditions at sunrise and sunset",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775309390/Sumba_wedding_erkew6.png",
    guest_capacity: "10 - 100",
    highlights: [
      "Vast savannah and dramatic clifftop coastal ceremony settings",
      "One of Indonesia's most exclusive and rarely explored destinations",
      "Deep cultural presence and authenticity shaped by Sumbanese heritage",
      "Cinematic and editorial-quality natural landscapes",
      "Ultra-luxury private resort properties with rare exclusivity",
    ],
    best_for: [
      "Couples seeking a remote, exclusive, and truly extraordinary destination",
      "Savannah and clifftop ceremonies with cinematic visual impact",
      "A deeply immersive and culturally connected wedding experience",
      "Ultra-luxury private resort and concept-driven celebrations",
      "A wedding that feels rare, refined, and profoundly unforgettable",
    ],
    ceremony_options: [
      "Open savannah ceremonies with vast landscape backdrops",
      "Clifftop and coastal ceremonies along dramatic shorelines",
      "Private resort and ultra-luxury venue ceremony settings",
      "Intimate elopements within raw and untouched natural surroundings",
    ],
    reception_options: [
      "Private resort and clifftop open-air dinner receptions",
      "Savannah landscape intimate gathering experiences",
      "Ultra-luxury concept-driven celebration events",
      "Small and deeply personal nature-immersed gatherings",
    ],
    accommodation_nearby: [
      "Ultra-luxury private resorts and eco-retreats",
      "Clifftop and ocean-view boutique properties",
      "Exclusive private villa and estate stays",
      "Curated high-end nature-integrated accommodations",
    ],
    dining_experiences: [
      "Private chef savannah and clifftop dining experiences",
      "Fresh local cuisine with authentic Sumbanese flavours",
      "Sunset and open landscape intimate dinner settings",
      "Concept-driven bespoke catering in extraordinary surroundings",
    ],
    unique_features: [
      "Ceremony within one of Indonesia's most vast and untouched landscapes",
      "Rare and powerful gathering shaped by savannah, culture, and open horizon",
      "A wedding that feels exclusive, cinematic, and deeply extraordinary",
      "Indonesia's most remote and visually striking luxury wedding destination",
      "A transformative, one-of-a-kind, and profoundly memorable experience",
    ],
  },
  {
    id: "9c",
    name: "Banyuwangi",
    slug: "banyuwangi-wedding",
    category_id: "cat-outsite-bali",
    category: getCat("cat-outsite-bali"),
    type: "Nature-Led Discovery & Landscape",
    description:
      "Mountains, forests, coastline, and open natural environments layered together, ideal for immersive, adventurous, and quietly extraordinary destination weddings shaped by natural diversity and quiet discovery.",
    long_description:
      "Banyuwangi offers one of Indonesia's most diverse and lesser-known landscapes — where mountains, forests, coastline, and open natural environments come together in a setting that feels both raw and quietly beautiful. Located at the eastern edge of Java, Banyuwangi carries a sense of discovery — offering wedding experiences that feel unique, immersive, and far removed from more familiar destinations. At Linda Wiryani Design and Event Planning, we design weddings in Banyuwangi that embrace this diversity — creating celebrations that feel grounded, intentional, and deeply connected to nature. Our Banyuwangi weddings are shaped by layered landscapes, shifting light, and a sense of calm that allows each moment to unfold naturally.",
    location: "Java",
    atmosphere:
      "Natural yet refined — immersive and visually layered, calm with a sense of exploration, elegant within a raw natural context shaped by the contrast between mountain, forest, and coastal landscapes",
    accessibility_notes:
      "Accessible via flights and land transfers from Bali; all travel logistics and coordination must be carefully planned for guests and vendors; certain vendors and technical elements may need to be arranged from Bali; different landscape types require tailored planning for layout, terrain, and guest safety; schedules must account for travel distances and setup logistics",
    seasonal_considerations:
      "Layered landscape types — mountain, forest, and coastal — each require specific seasonal considerations and contingency planning; natural light varies significantly across different environments requiring careful ceremony timing; dry season preferred for outdoor events and travel logistics",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775309279/Banyuwangi_wdrvji.png",
    guest_capacity: "10 - 120",
    highlights: [
      "Diverse natural landscapes combining mountain, forest, and coastal settings",
      "A lesser-known and genuinely unique destination beyond Bali",
      "Volcano and elevated landscape ceremony settings with dramatic views",
      "Lush forest and jungle environments for immersive celebrations",
      "A calm, uncrowded, and visually rich natural environment",
    ],
    best_for: [
      "Couples seeking a unique and nature-diverse wedding destination",
      "Mountain, volcano, and forest landscape ceremony settings",
      "A wedding that feels adventurous yet refined and intentional",
      "Intimate celebrations with strong visual richness and natural depth",
      "A setting that offers both exploration and quiet natural beauty",
    ],
    ceremony_options: [
      "Mountain and volcano landscape ceremonies with dramatic views",
      "Forest and jungle-immersive nature ceremony settings",
      "Coastal and ocean-view beachfront ceremonies",
      "Elevated viewpoint and open natural landscape elopements",
    ],
    reception_options: [
      "Nature-surrounded intimate dinner gatherings",
      "Forest and mountain-view open-air celebrations",
      "Boutique venue and private resort receptions",
      "Concept-driven landscape-integrated experiences",
    ],
    accommodation_nearby: [
      "Boutique nature lodges and eco-retreats",
      "Mountain and forest-view villa properties",
      "Coastal resort and beachfront stays",
      "Nature-integrated guesthouse and retreat accommodations",
    ],
    dining_experiences: [
      "Private chef nature and landscape dining experiences",
      "Fresh local East Java cuisine and produce",
      "Mountain-view and forest-surrounded intimate meals",
      "Concept-driven bespoke catering within natural settings",
    ],
    unique_features: [
      "Ceremony within one of Indonesia's most diverse and layered natural landscapes",
      "Quiet and meaningful gathering shaped by mountain, forest, and coastal contrast",
      "A wedding that feels unique, immersive, and quietly extraordinary",
      "One of Indonesia's most emerging and visually rich destination experiences",
      "A celebration defined by natural diversity, discovery, and genuine beauty",
    ],
  },
  {
    id: "9d",
    name: "Magelang",
    slug: "magelang-wedding",
    category_id: "cat-outsite-bali",
    category: getCat("cat-outsite-bali"),
    type: "Heritage & Architectural Elegance",
    description:
      "Ancient heritage, volcanic landscapes, and architectural beauty, ideal for serene, culturally rich, and timeless destination weddings shaped by stillness, symmetry, and refined elegance.",
    long_description:
      "Magelang offers one of Indonesia's most refined and culturally significant wedding settings — where ancient heritage, volcanic landscapes, and architectural beauty come together in quiet harmony. Set within a region rich in history and surrounded by mountains, this destination creates a wedding experience that feels both grounded and elevated — where every moment carries a sense of presence and meaning. At Linda Wiryani Design and Event Planning, we design weddings in Magelang that embrace this balance — creating celebrations that feel serene, intentional, and deeply connected to both landscape and culture. Our Magelang weddings are shaped by symmetry, natural light, and a sense of stillness that allows the experience to unfold with quiet refinement.",
    location: "Java",
    atmosphere:
      "Timeless and refined — calm and architecturally grounded, minimal yet visually powerful, elegant with quiet depth shaped by ancient heritage, volcanic mountain surroundings, and the stillness of a culturally significant landscape",
    accessibility_notes:
      "Accessible via flights to Yogyakarta and coordinated land transfers; all travel logistics must be carefully planned for guests and vendors; certain venue locations may have specific usage and operational guidelines; structured environments require thoughtful guest movement and spatial planning; careful scheduling ensures a smooth and well-paced experience",
    seasonal_considerations:
      "Outdoor and semi-open settings require weather contingency planning; natural light across open courtyards, terraces, and architectural spaces creates beautiful ceremony conditions particularly in the morning and late afternoon; dry season preferred for open-air ceremonies and guest comfort",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775433444/Magelang_q1pjqj.png",
    guest_capacity: "20 - 200",
    highlights: [
      "Ancient heritage and iconic architectural settings with deep cultural significance",
      "Volcanic mountain surroundings creating a powerful and serene natural backdrop",
      "Refined and timeless atmosphere unlike any other Indonesian destination",
      "Architectural symmetry and spatial beauty ideal for ceremony design",
      "A calm and contemplative environment shaped by history and landscape",
    ],
    best_for: [
      "Couples seeking a culturally rich and historically significant setting",
      "Architectural and heritage ceremony environments with strong visual presence",
      "A serene and timeless wedding atmosphere shaped by culture and landscape",
      "Refined and design-led celebrations within iconic Indonesian settings",
      "A wedding experience that feels deeply intentional and quietly luxurious",
    ],
    ceremony_options: [
      "Architectural and heritage site ceremony settings",
      "Open courtyard and terrace ceremonies with mountain views",
      "Intimate elopements within culturally significant surroundings",
      "Landscape and volcanic mountain view ceremony backdrops",
    ],
    reception_options: [
      "Heritage garden and architectural ground dinner receptions",
      "Open courtyard and terrace elegant gathering experiences",
      "Refined boutique venue and private estate celebrations",
      "Intimate and culturally immersive evening gatherings",
    ],
    accommodation_nearby: [
      "Boutique heritage hotels and refined retreat properties",
      "Mountain-view villas and nature-integrated stays",
      "Cultural guesthouses and curated private accommodations",
      "Yogyakarta area luxury hotels and resort properties",
    ],
    dining_experiences: [
      "Private chef heritage and architectural setting dining experiences",
      "Fresh Central Java cuisine and traditional local dishes",
      "Open courtyard and terrace intimate dinner settings",
      "Refined and culturally inspired bespoke catering experiences",
    ],
    unique_features: [
      "Ceremony within one of Indonesia's most iconic and culturally significant landscapes",
      "Timeless and meaningful gathering shaped by heritage, architecture, and mountain presence",
      "A wedding that feels refined, serene, and deeply connected to Indonesian culture",
      "One of Indonesia's most elegant and historically resonant destination settings",
      "A celebration defined by stillness, symmetry, and quiet architectural beauty",
    ],
  },

  {
    id: "10",
    name: "Kuta",
    slug: "kuta-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Beachfront Celebration",
    description:
      "Golden beaches, legendary sunsets, and vibrant coastal energy, ideal for joyful, relaxed, and accessible beachfront destination weddings shaped by the rhythm of the ocean.",
    long_description:
      "Kuta is one of Bali's most iconic coastal destinations, known for its golden beaches, vibrant energy, and legendary sunsets over the Indian Ocean. We design weddings in Kuta that celebrate the beauty of the oceanfront while creating an experience that feels joyful, relaxed, and thoughtfully curated. Our Kuta weddings embrace the natural rhythm of the coastline — where ocean views, sunset light, and shared celebration shape the atmosphere of the day. We work with international couples who are drawn to Kuta for its accessibility, beachfront venues, and the lively yet welcoming spirit that defines this part of Bali.",
    location: "South Bali",
    atmosphere:
      "Relaxed yet beautifully curated — celebratory rather than formal, open, airy, and ocean-inspired with elegant warmth",
    accessibility_notes:
      "Excellent airport proximity and international accessibility; well-established beachfront resorts with full guest services; beachfront venues have specific sound management policies that must be respected",
    seasonal_considerations:
      "Ceremony timing carefully planned to align with Bali's sunset light and ideal photography conditions; shading, flooring, and layout planning essential for guest comfort in open beachfront environments",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775311046/Kuta_beach_wedding_frmx6j.png",
    guest_capacity: "30 - 400",
    highlights: [
      "Golden beachfront ceremony settings",
      "Iconic Bali sunset views",
      "Vibrant and celebratory coastal energy",
      "Excellent accessibility for international guests",
      "Beachfront resorts with full-service venues",
    ],
    best_for: [
      "Joyful beachfront destination weddings",
      "Sunset ceremonies by the ocean",
      "Accessible locations for international guests",
      "Relaxed and celebratory atmospheres",
      "Classic Bali coastal charm",
    ],
    ceremony_options: [
      "Sunset beach ceremonies",
      "Beachfront resort settings",
      "Oceanview ceremony spaces",
      "Intimate beachside elopements",
    ],
    reception_options: [
      "Beachfront dinner receptions",
      "Resort oceanview banquets",
      "Sunset cocktail and evening flows",
      "Vibrant open-air celebrations",
    ],
    accommodation_nearby: [
      "Beachfront resort hotels",
      "International hotel brands",
      "Mid-range and luxury properties",
      "Boutique coastal stays",
    ],
    dining_experiences: [
      "Beachfront dining on the sand",
      "Resort multi-course experiences",
      "Sunset cocktail catering",
      "International and local cuisine options",
    ],
    unique_features: [
      "Sunset celebrations by the Indian Ocean",
      "Joyful gathering of friends and family",
      "Relaxed yet beautiful coastal experience",
      "Bali's most accessible beachfront location",
      "Iconic shoreline wedding memories",
    ],
  },
  {
    id: "11",
    name: "Legian",
    slug: "legian-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Beachfront & Lifestyle",
    description:
      "Beachfront settings, vibrant coastal atmosphere, and relaxed energy, ideal for lively yet refined destination weddings shaped by flow, light, and effortless social elegance.",
    long_description:
      "Legian is one of Bali's most balanced coastal destinations, situated between Seminyak and Kuta, offering a blend of beachfront beauty, vibrant atmosphere, and approachable rhythm that makes it ideal for celebrations that feel social, warm, and naturally enjoyable. We design weddings in Legian that embrace this energy — creating celebrations that feel effortless, intentional, and beautifully curated. Our Legian weddings are shaped by open coastal settings, sunset light, and a seamless flow between ceremony, cocktail, and reception that allows each moment to feel engaging and alive. We work with couples drawn to Legian for its accessibility, lively character, and a setting that feels both welcoming and refined.",
    location: "South Bali",
    atmosphere:
      "Relaxed yet stylish — vibrant, social, and light-filled, where beachfront energy meets effortless elegance and each celebration feels warm, lively, and beautifully curated",
    accessibility_notes:
      "Central location between Seminyak and Kuta with excellent accessibility for guests and vendors; wide range of nearby accommodation and amenities; urban coastal areas may have specific sound regulations and curfews that must be carefully planned around",
    seasonal_considerations:
      "West-facing coastline captures beautiful sunset light ideal for ceremony timing; coastal wind and environmental exposure must be considered in design and setup; seamless transitions between ceremony and reception essential for guest comfort in open coastal environments",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775455577/Legian_mjifbs.png",
    guest_capacity: "30 - 350",
    highlights: [
      "Open beachfront settings with easy coastal access",
      "Vibrant yet approachable lifestyle atmosphere",
      "Central location between Seminyak and Kuta",
      "Boutique resort and lifestyle venue options",
      "Beautiful sunset views over the Indian Ocean",
    ],
    best_for: [
      "Beachfront weddings with a social and lively energy",
      "Couples seeking a relaxed yet stylish coastal setting",
      "Celebrations close to accommodation, dining, and entertainment",
      "Warm and engaging gatherings with effortless flow",
      "A versatile setting for both ceremony and reception",
    ],
    ceremony_options: [
      "Open beachfront sunset ceremonies",
      "Boutique resort garden and terrace settings",
      "Indoor-outdoor coastal venue ceremonies",
      "Villa pool and garden ceremonies",
      "Intimate beachside elopements",
    ],
    reception_options: [
      "Beachfront dinner and sunset reception flows",
      "Boutique resort terrace celebrations",
      "Social and lifestyle-oriented evening gatherings",
      "Cocktail and dinner receptions with ocean views",
      "Multi-space venue experiences with relaxed energy",
    ],
    accommodation_nearby: [
      "Boutique beachfront resorts and hotels",
      "Contemporary villa rentals",
      "Lifestyle hotels with coastal amenities",
      "Centrally located guesthouses and properties",
    ],
    dining_experiences: [
      "Beachfront dining and sunset cocktail experiences",
      "Contemporary and international cuisine",
      "Private chef and bespoke catering services",
      "Resort and lifestyle restaurant dining",
    ],
    unique_features: [
      "Sunset ceremony on one of Bali's most accessible beachfronts",
      "A social and atmosphere-led gathering with effortless energy",
      "Central coastal location combining convenience with charm",
      "A wedding that feels warm, stylish, and naturally engaging",
      "Bali's vibrant lifestyle as the backdrop for celebration",
    ],
  },
  {
    id: "12",
    name: "Jimbaran",
    slug: "jimbaran-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Beachfront Intimacy",
    description:
      "Calm bay, golden sunsets, and understated luxury, ideal for intimate and refined beachfront weddings shaped by warmth, flowing light, and the quiet beauty of the ocean.",
    long_description:
      "Jimbaran is one of Bali's most timeless coastal destinations, known for its calm bay, golden sunsets, and a sense of understated luxury that feels both welcoming and refined. We design weddings in Jimbaran that embrace the natural warmth of the coastline — creating celebrations that feel intimate, elegant, and effortlessly connected to the ocean. Our Jimbaran weddings are shaped by soft waves, glowing sunset light, and a slower, more grounded rhythm that allows each moment to feel meaningful. We work with couples who are drawn to Jimbaran for its balance of beachfront beauty, privacy, and a relaxed yet sophisticated atmosphere.",
    location: "South Bali",
    atmosphere:
      "Warm yet refined — intimate, welcoming, and soft with glowing ocean-inspired light that feels elegant without formality",
    accessibility_notes:
      "Sheltered west-facing bay provides calmer conditions than open beaches; close to airport; luxury resort infrastructure with comprehensive guest services; beachfront setup requires flooring and seating planning on sand",
    seasonal_considerations:
      "West-facing bay captures beautiful golden sunset tones; ceremony timing carefully planned for optimal sunset light; wind patterns calmer than northern coastal areas but ocean breeze planning still required",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775313394/Jimbaran_Four_Seasons_Jimbaran_Image_bpl6qe.jpg",
    guest_capacity: "20 - 300",
    highlights: [
      "Calm, sheltered bay and golden sandy beach",
      "Iconic Bali sunset views over the ocean",
      "Understated luxury with privacy",
      "Renowned beachfront resorts and private villas",
      "Refined yet welcoming coastal atmosphere",
    ],
    best_for: [
      "Intimate and refined beachfront celebrations",
      "Sunset ceremonies with calm ocean conditions",
      "Couples seeking elegant relaxation and privacy",
      "Beachfront dining experiences on the sand",
      "Timeless Bali coastal wedding memories",
    ],
    ceremony_options: [
      "Sunset beach and bay ceremonies",
      "Beachfront resort garden settings",
      "Private villa ocean ceremonies",
      "Intimate sand elopements",
    ],
    reception_options: [
      "Beachfront dinner on the sand",
      "Resort terrace and garden receptions",
      "Sunset cocktail and evening flows",
      "Intimate private villa gatherings",
    ],
    accommodation_nearby: [
      "Renowned beachfront luxury resorts",
      "Private villa estates",
      "Boutique coastal hotels",
      "Full-service resort properties",
    ],
    dining_experiences: [
      "Beachfront seafood dining on the sand",
      "Multi-course sunset dinner experiences",
      "Private chef villa services",
      "Resort fine dining and gourmet catering",
    ],
    unique_features: [
      "Sunset ceremony above the calm sheltered bay",
      "Beachfront dinner under the open evening sky",
      "Warm and grounded coastal celebration rhythm",
      "Jimbaran's golden coastline as wedding backdrop",
      "Balance of intimacy, elegance, and ocean beauty",
    ],
  },

  {
    id: "13",
    name: "Ketewel",
    slug: "ketewel-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Coastal Privacy",
    description:
      "Black-sand beaches, ocean views, and quiet coastal authenticity, ideal for private, intimate, and naturally elegant weddings away from Bali's more crowded destinations.",
    long_description:
      "Ketewel is one of Bali's more understated coastal destinations, located along the island's east coast and known for its black-sand beaches, ocean views, and a sense of calm that feels untouched and authentic. We design weddings in Ketewel that embrace its quiet beauty — creating celebrations that feel intimate, grounded, and naturally elegant. Our Ketewel weddings are shaped by open coastlines, soft ocean light, and a slower rhythm that allows each moment to feel personal and unhurried. We work with couples drawn to Ketewel for its privacy, its proximity to Ubud, and its ability to offer a peaceful alternative to Bali's more crowded beach destinations.",
    location: "Ubud & Gianyar",
    atmosphere:
      "Intimate yet refined — natural and understated, calm, airy, and grounded with elegant restraint that allows the setting to lead",
    accessibility_notes:
      "Conveniently located between Sanur and Ubud; private villa settings require careful guest navigation coordination; transport and navigation should be clearly coordinated for guests unfamiliar with the area",
    seasonal_considerations:
      "Open coastal areas require careful selection of décor elements and ceremony structures for wind; minimal built infrastructure means preparation for sun, wind, and potential rain is essential; black sand and terrain require flooring and layout planning for guest comfort",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775310462/Pantai_Ketewel_kvtdjp.png",
    guest_capacity: "10 - 100",
    highlights: [
      "Black-sand beaches with natural coastal character",
      "Quiet and untouched ocean views",
      "Private villa settings with direct coastline access",
      "Easy access to both Ubud and South Bali",
      "Authentic and unhurried Bali atmosphere",
    ],
    best_for: [
      "Intimate weddings seeking privacy and seclusion",
      "Couples wanting a natural and unfiltered coastal setting",
      "Elopements with emotional connection and simplicity",
      "Authentic Bali experience away from crowds",
      "A slower, more relaxed and meaningful pace",
    ],
    ceremony_options: [
      "Oceanfront ceremonies with natural backdrops",
      "Black-sand beachfront settings",
      "Private villa garden and ocean-view ceremonies",
      "Intimate coastal elopements",
    ],
    reception_options: [
      "Private villa ocean-view receptions",
      "Relaxed garden and coastal gatherings",
      "Intimate dinner celebrations",
      "Nature-integrated small-scale events",
    ],
    accommodation_nearby: [
      "Private coastal villas with ocean views",
      "Boutique eco-lodges and guesthouses",
      "Nature-integrated retreat properties",
      "Nearby Sanur and Ubud accommodation options",
    ],
    dining_experiences: [
      "Private chef villa dining experiences",
      "Intimate oceanfront dinner settings",
      "Fresh local and coastal cuisine",
      "Relaxed and personal catering experiences",
    ],
    unique_features: [
      "Private ceremony by the authentic Bali ocean",
      "Meaningful gathering in a peaceful coastal setting",
      "Relaxed yet refined celebration atmosphere",
      "Natural black-sand coastline as wedding backdrop",
      "Quiet beauty distinct from commercial beach destinations",
    ],
  },
  {
    id: "14",
    name: "Saba",
    slug: "saba-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Beachfront & Garden Calm",
    description:
      "Quiet coastlines, open beaches, and surrounding greenery along Bali's east coast, ideal for calm, intimate, and naturally refined destination weddings shaped by coastal openness and understated elegance.",
    long_description:
      "Saba is located along Bali's east coast in Gianyar, offering a quieter and more understated coastal setting — where open beaches, soft light, and surrounding greenery create a wedding atmosphere that feels calm, intimate, and naturally refined. Less commercial than Bali's west coast, Saba carries a sense of privacy and ease, making it ideal for couples who seek a peaceful yet beautiful environment for their celebration. At Linda Wiryani Design and Event Planning, we design weddings in Saba that embrace this balance — creating celebrations that feel relaxed, intentional, and seamlessly connected to both nature and space. Our Saba weddings are shaped by coastal openness, gentle light, and the interplay between beachfront and garden environments.",
    location: "Ubud & Gianyar",
    atmosphere:
      "Calm yet beautifully curated — light-filled and naturally elegant, open, airy, and inviting, refined without excess, where soft coastal light, beachfront openness, and surrounding greenery create a wedding experience that feels intimate, spacious, and effortlessly meaningful",
    accessibility_notes:
      "Easily accessible from central and south Bali allowing smooth coordination for guests and vendors; beachfront and open-air venues require careful consideration of wind exposure for ceremony structures and décor elements; each venue may have specific sound and operational guidelines that must be respected",
    seasonal_considerations:
      "Open coastal environments require thoughtful planning for wind conditions, sun exposure, and potential rain; ceremony timing is carefully planned to align with natural daylight and optimal photography conditions; morning and late afternoon provide the most beautiful and even lighting for beachfront and garden settings",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775360613/Saba_Jeeva_Saba_Resort_zx50m3.png",
    guest_capacity: "20 - 200",
    highlights: [
      "Quiet beachfront ceremony settings away from Bali's busier coastlines",
      "Open landscapes with calm atmosphere and natural coastal light",
      "A unique balance between beachfront and garden environments",
      "Less crowded and more private coastal venues",
      "Easily accessible from central and south Bali",
    ],
    best_for: [
      "Couples seeking a peaceful and intimate coastal environment",
      "Quiet beachfront ceremonies with soft natural light",
      "A relaxed yet curated and beautifully refined atmosphere",
      "A balance between openness and privacy in a natural setting",
      "Calm and meaningful destination weddings away from commercial areas",
    ],
    ceremony_options: [
      "Quiet beachfront ceremonies beside open coastal landscapes",
      "Garden ceremony settings surrounded by natural greenery",
      "Private villa and estate beachfront ceremonies",
      "Intimate beachside elopements in relaxed surroundings",
      "Indoor-outdoor venue ceremonies with coastal garden flow",
    ],
    reception_options: [
      "Beachfront open-air dinner receptions with coastal atmosphere",
      "Garden and lawn receptions with natural greenery surroundings",
      "Private villa and estate intimate celebrations",
      "Relaxed seaside gathering experiences with refined styling",
      "Evening beach receptions with ambient lighting and ocean breeze",
    ],
    accommodation_nearby: [
      "Private coastal villas and estate properties",
      "Boutique beachfront resorts and guesthouses",
      "Nature-integrated villa accommodations near Ubud",
      "Peaceful waterfront stays along Gianyar's coastline",
    ],
    dining_experiences: [
      "Private chef beachfront and garden dining experiences",
      "Fresh local and coastal cuisine with Balinese influences",
      "Relaxed and intimate open-air dinner settings",
      "Farm-to-table and organic catering in natural surroundings",
    ],
    unique_features: [
      "Ceremony beside a quiet stretch of coastline away from crowds",
      "A relaxed and meaningful gathering shaped by light and space",
      "The unique interplay between beachfront and garden environments",
      "A calm and naturally elegant coastal wedding experience",
      "A celebration that feels intimate, open, and quietly unforgettable",
    ],
  },
  {
    id: "15",
    name: "Tegallalang",
    slug: "tegallalang-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Rice Terrace Landscape",
    description:
      "Layered rice terraces, soft natural light, and iconic Bali scenery, ideal for intimate, scenic, and landscape-led weddings that feel both expansive and deeply personal.",
    long_description:
      "Tegallalang is one of Bali's most iconic landscapes, known for its layered rice terraces, soft natural light, and a sense of openness that feels both serene and visually striking. We design weddings in Tegallalang that are deeply connected to the land — creating celebrations that feel organic, intentional, and visually poetic. Our Tegallalang weddings are shaped by sweeping green terraces, morning mist, and a quiet atmosphere that allows each moment to feel grounded and present. We work with couples drawn to Tegallalang for its unique scenery, its proximity to Ubud, and its ability to create a wedding experience that feels both intimate and expansive.",
    location: "Ubud & Gianyar",
    atmosphere:
      "Scenic yet intimate — organic and design-conscious, light-filled and naturally expressive, with an elegant grounded simplicity shaped by landscape and horizon",
    accessibility_notes:
      "Rice terrace environments may involve steps, slopes, and uneven ground requiring careful guest flow planning; proximity to Ubud provides good accommodation options; terrain and elevation differences must be factored into event design",
    seasonal_considerations:
      "Morning and late afternoon offer the most flattering natural light for ceremonies and photography; open landscapes require preparation for sun exposure, humidity, and potential rain; design should respect and integrate with the surrounding agricultural and natural environment",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775309750/Ricefield_wedding_goma3z.jpg",
    guest_capacity: "15 - 120",
    highlights: [
      "Iconic layered rice terrace ceremony backdrops",
      "Open landscapes with sweeping natural views",
      "Soft morning mist and late afternoon golden light",
      "Calm and nature-led environment",
      "Proximity to Ubud's culture and amenities",
    ],
    best_for: [
      "Rice terrace and landscape-led ceremony settings",
      "Couples seeking a unique and iconic Bali backdrop",
      "Nature-integrated and visually poetic celebrations",
      "Intimate weddings with a sense of openness and space",
      "Morning and scenic photography-focused experiences",
    ],
    ceremony_options: [
      "Rice terrace overlook ceremonies",
      "Open terrace and landscape settings",
      "Villa and boutique venue terrace ceremonies",
      "Intimate elopements with terrace views",
    ],
    reception_options: [
      "Intimate villa receptions with terrace views",
      "Nature-surrounded garden gatherings",
      "Boutique venue celebrations",
      "Quiet and meaningful small-scale dinners",
    ],
    accommodation_nearby: [
      "Boutique villas and resorts with rice field views",
      "Ubud heritage hotels and eco-lodges",
      "Nature-integrated private villas",
      "Wellness and retreat properties nearby",
    ],
    dining_experiences: [
      "Farm-to-table and locally sourced cuisine",
      "Private chef terrace dining experiences",
      "Organic and wellness-focused menus",
      "Intimate dinners with rice terrace views",
    ],
    unique_features: [
      "Ceremony overlooking layered green rice terraces",
      "Quiet and meaningful gathering in iconic Bali landscape",
      "Celebration shaped by nature and open space",
      "Both iconic and deeply personal wedding setting",
      "Environmentally sensitive and nature-integrated design",
    ],
  },

  {
    id: "16",
    name: "Sidemen",
    slug: "sidemen-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Valley & Rice Field",
    description:
      "Sweeping rice fields, river valleys, and Mount Agung views, ideal for intimate, deeply personal, and nature-immersed weddings rooted in stillness and authenticity.",
    long_description:
      "Sidemen is one of Bali's most untouched and atmospheric regions, known for its sweeping rice fields, river valleys, and views of Mount Agung that create a landscape both powerful and deeply serene. We design weddings in Sidemen that are rooted in stillness and connection — creating celebrations that feel intimate, meaningful, and immersed in nature. Our Sidemen weddings are shaped by open valleys, layered greenery, and a sense of quiet that allows each moment to unfold with clarity and intention. We work with couples drawn to Sidemen for its authenticity, its distance from the crowds, and its ability to offer a wedding experience that feels truly personal.",
    location: "East Bali",
    atmosphere:
      "Deeply calm and immersive — intimate and emotionally grounded, natural and understated, with an elegant quiet refinement shaped by valley, rice field, and mountain",
    accessibility_notes:
      "More remote location requiring clear planning for guest transport and logistics; open landscapes and natural terrain require careful layout and flow planning; facilities, shading, and layout must be thoughtfully designed for guest comfort",
    seasonal_considerations:
      "Ceremony timing carefully planned to capture the most beautiful natural light across valley and mountain landscapes; preparation for sun exposure, humidity, and occasional rain is essential; open terrain requires thoughtful weather contingency planning",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775433568/sidemen_zthbs0.png",
    guest_capacity: "10 - 80",
    highlights: [
      "Expansive rice field and valley ceremony views",
      "Mount Agung as a powerful and symbolic backdrop",
      "Quiet and untouched authentic natural environment",
      "Boutique retreats and private villas integrated with nature",
      "Deeply intimate and personal atmosphere",
    ],
    best_for: [
      "Couples seeking privacy, seclusion, and emotional depth",
      "Nature-integrated and landscape-led ceremony settings",
      "Intimate weddings with authentic non-commercial surroundings",
      "Elopements with stillness and meaningful personal connection",
      "A slower, more grounded and meaningful wedding journey",
    ],
    ceremony_options: [
      "Rice field and valley overlook ceremonies",
      "Mount Agung view ceremony settings",
      "Boutique villa and retreat garden ceremonies",
      "Intimate elopements in open natural landscapes",
    ],
    reception_options: [
      "Private villa and boutique retreat receptions",
      "Intimate nature-surrounded dinners",
      "Small-scale garden gatherings",
      "Retreat-style multi-moment experiences",
    ],
    accommodation_nearby: [
      "Boutique retreat villas with valley views",
      "Nature-integrated private villa properties",
      "Eco-lodges and sustainable stays",
      "Heritage and cultural guesthouses",
    ],
    dining_experiences: [
      "Farm-to-table and locally grown cuisine",
      "Private chef valley-view dining experiences",
      "Traditional Balinese and community-style meals",
      "Intimate dinners surrounded by nature",
    ],
    unique_features: [
      "Ceremony overlooking rice fields with Mount Agung backdrop",
      "Quiet and meaningful gathering in untouched Bali",
      "Immersive experience shaped by valley and mountain nature",
      "Deeply personal and emotionally unforgettable setting",
      "Authentic distance from commercial tourist destinations",
    ],
  },
  {
    id: "17",
    name: "Amed",
    slug: "amed-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Raw Coastal Simplicity",
    description:
      "Black volcanic beaches, calm waters, and expansive horizon views, ideal for intimate, authentic, and nature-immersed weddings shaped by simplicity and raw coastal beauty.",
    long_description:
      "Amed is one of Bali's most raw and unspoiled coastal destinations, known for its black volcanic beaches, calm waters, and expansive views that stretch toward the horizon. We design weddings in Amed that embrace its natural simplicity — creating celebrations that feel intimate, grounded, and deeply connected to the environment. Our Amed weddings are shaped by open coastlines, gentle ocean rhythms, and a sense of stillness that allows each moment to feel present and unfiltered. We work with couples drawn to Amed for its authenticity, its distance from the crowds, and its ability to offer a wedding experience that feels truly personal.",
    location: "East Bali",
    atmosphere:
      "Simple yet refined — intimate and grounded, calm, open, and horizon-led with an elegant restraint that feels raw, real, and deeply connected",
    accessibility_notes:
      "More remote location requiring careful coordination for guest transport and timelines; volcanic sand and uneven surfaces require thoughtful layout and setup planning; both sunrise and sunset offer unique lighting opportunities influencing ceremony planning",
    seasonal_considerations:
      "Open coastal environments require preparation for sun, wind, and humidity; sunrise and sunset both provide beautiful and unique lighting for ceremonies and photography; dry season preferred for travel logistics to remote location",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775310741/Amed_x6fd3m.png",
    guest_capacity: "5 - 60",
    highlights: [
      "Black volcanic beach and raw coastline settings",
      "Expansive ocean views meeting Mount Agung",
      "Quiet, unspoiled, and non-commercial atmosphere",
      "Boutique resorts and private villas in nature",
      "Authentic and deeply intimate coastal character",
    ],
    best_for: [
      "Couples seeking privacy, simplicity, and connection",
      "Quiet oceanfront ceremony settings away from crowds",
      "Intimate elopements with a raw and unfiltered feel",
      "Nature-immersed celebrations with a slower pace",
      "A connection between ocean, mountain, and landscape",
    ],
    ceremony_options: [
      "Oceanfront ceremonies with Mount Agung views",
      "Black volcanic beach settings",
      "Boutique villa and resort garden ceremonies",
      "Intimate sunrise or sunset elopements",
    ],
    reception_options: [
      "Intimate oceanfront dinners",
      "Boutique resort and villa receptions",
      "Small-scale relaxed gatherings",
      "Nature-surrounded celebration experiences",
    ],
    accommodation_nearby: [
      "Boutique oceanfront resorts and eco-lodges",
      "Private coastal villas",
      "Dive resort and nature retreat properties",
      "Simple and authentic guesthouse stays",
    ],
    dining_experiences: [
      "Fresh seafood and local coastal cuisine",
      "Private chef intimate dining experiences",
      "Sunrise or sunset oceanfront meals",
      "Simple and authentic locally sourced catering",
    ],
    unique_features: [
      "Quiet ceremony by the raw and authentic Bali ocean",
      "Meaningful and intimate gathering shaped by horizon",
      "Celebration defined by simplicity, connection, and natural beauty",
      "Raw, real, and unforgettable wedding atmosphere",
      "Unique volcanic beach and mountain view combination",
    ],
  },
  {
    id: "18",
    name: "Manggis",
    slug: "manggis-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Coastal & Nature Balance",
    description:
      "Calm shoreline, lush tropical surroundings, and understated elegance, ideal for serene, intimate, and naturally balanced weddings in East Bali.",
    long_description:
      "Manggis is one of Bali's most quietly refined coastal destinations, located in East Bali and known for its calm shoreline, lush surroundings, and a sense of understated elegance that feels both natural and elevated. We design weddings in Manggis that embrace this balance — creating celebrations that feel serene, intimate, and thoughtfully composed. Our Manggis weddings are shaped by the meeting of ocean and greenery, where coastal views blend seamlessly with tropical landscapes. We work with couples drawn to Manggis for its peaceful atmosphere, its proximity to Sidemen and Candidasa, and its ability to offer a wedding experience that feels both private and refined.",
    location: "East Bali",
    atmosphere:
      "Serene yet refined — intimate and well-balanced, natural and softly elegant, relaxed with a polished touch where ocean and tropical greenery harmoniously meet",
    accessibility_notes:
      "Located in East Bali requiring clear planning for guest transport and logistics; layout design must consider transitions between beachfront and landscaped garden areas; both sunrise and sunset provide beautiful lighting influencing ceremony planning",
    seasonal_considerations:
      "Preparation for sun, humidity, and occasional rain is essential; natural light throughout the day varies between coastal and garden settings; seamless flow between ceremony and reception areas should account for East Bali's climate patterns",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775310715/Manggis_smosgw.png",
    guest_capacity: "10 - 100",
    highlights: [
      "Calm East Bali shoreline and ocean views",
      "Lush tropical greenery meeting coastal landscapes",
      "Quiet and less commercial refined environment",
      "Boutique resorts with privacy and refined service",
      "Proximity to Sidemen, Candidasa, and Taman Ujung",
    ],
    best_for: [
      "Couples seeking harmony of coast and nature",
      "Intimate and serene oceanfront ceremony settings",
      "Private and refined celebrations away from crowds",
      "Balanced tropical and coastal wedding atmospheres",
      "A slower, tranquil, and meaningful pace",
    ],
    ceremony_options: [
      "Ocean-view ceremonies with tropical backdrops",
      "Coastal garden and beach settings",
      "Boutique resort lawn and terrace ceremonies",
      "Intimate villa garden elopements",
    ],
    reception_options: [
      "Oceanfront dinner and gathering receptions",
      "Garden and tropical landscape celebrations",
      "Boutique resort and villa receptions",
      "Intimate relaxed coastal gatherings",
    ],
    accommodation_nearby: [
      "Boutique East Bali coastal resorts",
      "Private villas with ocean and garden views",
      "Nature-integrated retreat properties",
      "Heritage and eco-lodge stays",
    ],
    dining_experiences: [
      "Oceanfront dining with tropical garden views",
      "Private chef and boutique catering experiences",
      "Fresh seafood and local East Bali cuisine",
      "Sunrise or sunset intimate dining settings",
    ],
    unique_features: [
      "Ceremony overlooking the ocean with lush greenery",
      "Gathering surrounded by balanced coastal and tropical nature",
      "Relaxed yet refined East Bali coastal celebration",
      "Bali's quiet coastal elegance as wedding backdrop",
      "Harmony of sea, landscape, and intimate atmosphere",
    ],
  },
  {
    id: "19",
    name: "Candidasa",
    slug: "candidasa-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Tranquil Coastal Horizon",
    description:
      "Calm shoreline, open horizon views, and quiet authenticity, ideal for intimate, tranquil, and naturally elegant coastal weddings away from Bali's busier destinations.",
    long_description:
      "Candidasa is one of Bali's most peaceful coastal destinations, located in East Bali and known for its calm shoreline, oceanfront views, and a quiet atmosphere that feels both authentic and refined. We design weddings in Candidasa that embrace this sense of tranquility — creating celebrations that feel intimate, balanced, and naturally elegant. Our Candidasa weddings are shaped by open ocean views, gentle coastal light, and a slower rhythm that allows each moment to feel present and meaningful. We work with couples drawn to Candidasa for its peaceful environment, its understated charm, and its ability to offer a wedding experience away from the crowds.",
    location: "East Bali",
    atmosphere:
      "Calm yet refined — intimate and grounded, open, airy, and horizon-led with an elegant understated simplicity and authentic coastal charm",
    accessibility_notes:
      "Located in East Bali requiring careful travel logistics for guests and vendors; open oceanfront areas require attention to wind, layout, and stability of décor elements; boutique resort and villa settings provide comfort within a natural environment",
    seasonal_considerations:
      "Both sunrise and sunset offer beautiful lighting influencing ceremony planning; preparation for sun, humidity, and occasional rain is essential; shading, seating, and layout planning are important for open-air environments",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775310702/Candidasa_gpublk.png",
    guest_capacity: "10 - 100",
    highlights: [
      "Calm East Bali shoreline with open horizon views",
      "Peaceful and less commercial coastal atmosphere",
      "Uninterrupted sea views from ceremony settings",
      "Boutique resorts and private villas with privacy",
      "Authentic Bali coastal charm and understated elegance",
    ],
    best_for: [
      "Quiet oceanfront ceremonies with open horizon",
      "Couples seeking calm and privacy away from crowds",
      "Intimate and meaningful coastal wedding experiences",
      "A slower, relaxed, and authentic pace",
      "East Bali coastal charm with refined simplicity",
    ],
    ceremony_options: [
      "Oceanfront ceremonies with open horizon views",
      "Coastal boutique resort and lawn settings",
      "Private villa garden and ocean ceremonies",
      "Intimate beachside elopements",
    ],
    reception_options: [
      "Oceanfront dinner celebrations",
      "Boutique resort terrace receptions",
      "Intimate garden and coastal gatherings",
      "Relaxed villa reception experiences",
    ],
    accommodation_nearby: [
      "Boutique East Bali oceanfront resorts",
      "Private coastal villas",
      "Heritage resort and eco-lodge stays",
      "Nature-integrated retreat properties",
    ],
    dining_experiences: [
      "Oceanfront dining with horizon views",
      "Fresh seafood and local East Bali cuisine",
      "Private chef intimate dinner experiences",
      "Boutique catering with a relaxed coastal feel",
    ],
    unique_features: [
      "Ceremony overlooking the open and uninterrupted sea",
      "Quiet and meaningful gathering in authentic Bali",
      "Relaxed yet elegant coastal celebration atmosphere",
      "Bali's serene East Coast as wedding backdrop",
      "Understated charm and natural coastal elegance",
    ],
  },
  {
    id: "20",
    name: "Taman Ujung",
    slug: "taman-ujung-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Heritage Water Palace",
    description:
      "Royal water palace, reflective pools, and classical Balinese architecture against Mount Agung, ideal for timeless, artistic, and culturally rich destination weddings.",
    long_description:
      "Taman Ujung is one of Bali's most unique and historic wedding destinations, known for its royal water palace, expansive gardens, and architectural beauty set against the backdrop of Mount Agung and the eastern coastline. We design weddings in Taman Ujung that honor both the setting and its heritage — creating celebrations that feel timeless, atmospheric, and deeply intentional. Our Taman Ujung weddings are shaped by reflective water, open landscapes, and classical Balinese architecture that brings a sense of quiet grandeur to every moment. We work with couples drawn to Taman Ujung for its cultural significance, its visual symmetry, and its ability to create a wedding experience that feels truly distinctive.",
    location: "East Bali",
    atmosphere:
      "Timeless yet distinctive — elegant and visually structured, artistic and atmospheric, grand yet serene with a sense of quiet grandeur rooted in heritage and reflection",
    accessibility_notes:
      "Heritage site that may require permits and adherence to specific guidelines; large open spaces and pathways require thoughtful planning for guest movement; transport and coordination must be carefully arranged due to East Bali location",
    seasonal_considerations:
      "Outdoor heritage setting requires preparation for sun exposure, wind, and rain; styling should enhance the space without overpowering its architectural and cultural significance; timing planned to capture optimal light across water surfaces and gardens",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775310726/Taman_Ujung_qugneh.png",
    guest_capacity: "20 - 150",
    highlights: [
      "Historic royal water palace and reflecting pools",
      "Expansive classical Balinese gardens",
      "Architectural symmetry and cultural grandeur",
      "Mount Agung and eastern coastline as backdrop",
      "Unique and truly distinctive Bali wedding setting",
    ],
    best_for: [
      "Couples seeking a historic and architectural wedding backdrop",
      "Artistic and culturally rich celebration settings",
      "Visually striking and timeless atmospheres",
      "Weddings blending cultural heritage with refined design",
      "A one-of-a-kind memorable and iconic experience",
    ],
    ceremony_options: [
      "Ceremonies within water palace reflecting pool areas",
      "Garden pathway and bridge ceremony settings",
      "Open landscape heritage site ceremonies",
      "Intimate spaces within architectural surrounds",
    ],
    reception_options: [
      "Heritage garden and palace ground receptions",
      "Open landscape elegant dinner gatherings",
      "Cultural and architectural backdrop celebrations",
      "Intimate gatherings within palace settings",
    ],
    accommodation_nearby: [
      "East Bali boutique resorts and heritage hotels",
      "Private coastal villas near Candidasa",
      "Nature retreat and eco-lodge properties",
      "Nearby Sidemen and Manggis accommodations",
    ],
    dining_experiences: [
      "Elegant heritage setting dinner experiences",
      "Private chef and cultural catering services",
      "Traditional Balinese inspired cuisine",
      "Intimate garden dining with architectural views",
    ],
    unique_features: [
      "Ceremony within a historic royal Balinese water palace",
      "Visually striking and meaningful heritage gathering",
      "Celebration shaped by architecture, water, and nature",
      "Timeless and unforgettable cultural wedding backdrop",
      "One of Bali's most distinctive and iconic venues",
    ],
  },
  {
    id: "21",
    name: "Tulamben",
    slug: "tulamben-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Raw Volcanic Coast",
    description:
      "Volcanic shoreline, calm waters, and quiet oceanfront atmosphere shaped by Mount Agung, ideal for intimate, elemental, and deeply authentic coastal destination weddings.",
    long_description:
      "Tulamben is one of Bali's most unique coastal destinations, known for its volcanic shoreline, calm waters, and a quiet atmosphere shaped by the presence of Mount Agung and the vast open sea. At Linda Wiryani Design and Event Planning, we design weddings in Tulamben that embrace its raw and elemental character — creating celebrations that feel intimate, grounded, and deeply connected to nature. Our Tulamben weddings are shaped by dark volcanic stones, still ocean horizons, and a sense of depth that allows each moment to feel quiet and meaningful. We work with couples who are drawn to Tulamben for its authenticity, its peaceful environment, and its ability to offer a wedding experience far removed from the usual.",
    location: "East Bali",
    atmosphere:
      "Raw yet refined — intimate and deeply grounded, calm, open, and elemental, with elegant natural simplicity shaped by volcanic coast and open sea horizon",
    accessibility_notes:
      "Located in East Bali requiring careful coordination for guest transport and timelines; rocky and uneven volcanic terrain requires thoughtful layout and setup planning; boutique properties provide comfort within a natural and remote environment",
    seasonal_considerations:
      "Both sunrise and sunset offer unique lighting conditions influencing ceremony planning; open environments require preparation for sun, wind, and humidity; shading, seating, and facilities must be carefully arranged for guest comfort in remote settings",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775310732/Tulamben_c0x7dy.png",
    guest_capacity: "10 - 80",
    highlights: [
      "Dramatic volcanic black shoreline with open ocean views",
      "Mount Agung as a backdrop from the coast",
      "Quiet and non-commercial authentic atmosphere",
      "Boutique resorts with strong connection to the environment",
      "Deeply intimate and raw natural coastal setting",
    ],
    best_for: [
      "Quiet oceanfront ceremony settings",
      "Volcanic beaches with strong natural character",
      "Couples seeking a peaceful and non-commercial environment",
      "Intimate and deeply personal wedding experiences",
      "A raw and untouched coastal setting with privacy",
    ],
    ceremony_options: [
      "Volcanic shoreline oceanfront ceremonies",
      "Boutique resort beachfront settings",
      "Intimate elopements by the open sea",
      "Sunrise or sunset volcanic beach ceremonies",
    ],
    reception_options: [
      "Boutique resort and villa oceanfront receptions",
      "Intimate open-air gatherings by the sea",
      "Small-scale relaxed coastal celebrations",
      "Nature-surrounded dinner experiences",
    ],
    accommodation_nearby: [
      "Boutique oceanfront resorts and dive lodges",
      "Private coastal villas",
      "Nature retreat and eco-lodge properties",
      "Simple and authentic guesthouse stays",
    ],
    dining_experiences: [
      "Fresh seafood and local coastal cuisine",
      "Private chef intimate dining experiences",
      "Sunrise or sunset oceanfront meals",
      "Simple and authentic locally sourced catering",
    ],
    unique_features: [
      "Ceremony by a raw volcanic shoreline unlike anywhere in Bali",
      "Quiet and meaningful gathering shaped by ocean and Mount Agung",
      "Celebration defined by elemental simplicity and natural depth",
      "Raw, real, and unforgettable volcanic coast atmosphere",
      "Unique combination of volcanic beach, calm sea, and mountain backdrop",
    ],
  },
  {
    id: "22",
    name: "Tirta Gangga",
    slug: "tirta-gangga-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Heritage Water Garden",
    description:
      "Royal water gardens, reflective pools, and stone pathways within an iconic cultural landscape, ideal for intimate, timeless, and culturally rich destination weddings.",
    long_description:
      "Tirta Gangga is one of Bali's most iconic cultural landscapes, known for its royal water gardens, stone pathways, and tranquil pools that create a setting both serene and visually poetic. At Linda Wiryani Design and Event Planning, we design weddings in Tirta Gangga that honor its heritage and atmosphere — creating celebrations that feel intimate, timeless, and deeply connected to place. Our Tirta Gangga weddings are shaped by reflective water, carved stone, and a sense of stillness that allows each moment to feel calm and intentional. We work with couples who are drawn to Tirta Gangga for its cultural depth, its unique aesthetic, and its ability to create a wedding experience that feels truly distinctive.",
    location: "East Bali",
    atmosphere:
      "Serene yet visually striking — intimate and atmospheric, artistic and culturally grounded, elegant with quiet refinement shaped by water, stone, and heritage",
    accessibility_notes:
      "Heritage and cultural site requiring permits and adherence to specific site guidelines; stepping stones and water pathways require careful planning for guest flow and safety; located in East Bali requiring well-coordinated transport and logistics",
    seasonal_considerations:
      "Outdoor garden and water feature environment requires preparation for sun, humidity, and rain; styling should enhance the setting without overpowering its architectural and cultural character; timing planned to capture optimal reflection of light across pools and surfaces",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775310736/Tirta_Gangga_zqgi1k.png",
    guest_capacity: "10 - 80",
    highlights: [
      "Iconic royal Balinese water garden setting",
      "Reflective pools and stone stepping pathways",
      "Culturally rich and historically significant landscape",
      "Peaceful and meditative heritage atmosphere",
      "Visually unique and artistically poetic environment",
    ],
    best_for: [
      "Water garden ceremony settings with reflective pools",
      "Couples seeking a culturally rich and historic environment",
      "A calm and contemplative wedding atmosphere",
      "Architectural and artistic beauty as wedding backdrop",
      "A timeless and deeply meaningful wedding experience",
    ],
    ceremony_options: [
      "Ceremonies among reflective pools and stepping stones",
      "Water garden pathway and heritage settings",
      "Intimate elopements within cultural surrounds",
      "Open garden and water feature ceremonies",
    ],
    reception_options: [
      "Heritage garden intimate dinner gatherings",
      "Cultural landscape and garden receptions",
      "Small and meaningful water garden celebrations",
      "Quiet and atmospheric evening gatherings",
    ],
    accommodation_nearby: [
      "East Bali boutique resorts and heritage hotels",
      "Private coastal villas near Candidasa and Amlapura",
      "Nature retreat and eco-lodge properties",
      "Nearby Manggis and Sidemen accommodations",
    ],
    dining_experiences: [
      "Elegant heritage setting dinner experiences",
      "Private chef and cultural catering services",
      "Traditional Balinese inspired cuisine",
      "Intimate garden dining with architectural views",
    ],
    unique_features: [
      "Ceremony surrounded by royal Balinese water gardens",
      "Quiet and meaningful gathering shaped by water and stone",
      "Celebration honoring cultural heritage and refined design",
      "Timeless and unforgettable iconic Bali heritage setting",
      "One of Bali's most artistically distinctive wedding backdrops",
    ],
  },
  {
    id: "23",
    name: "Savana Tianyar",
    slug: "savana-tianyar-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Cinematic Savannah & Volcano",
    description:
      "Wide-open savannah, golden grasses, and dramatic Mount Agung views, ideal for bold, cinematic, and visually extraordinary destination weddings in an untamed natural setting.",
    long_description:
      "Savana Tianyar is one of Bali's most extraordinary and lesser-known landscapes, located along the eastern coastline and known for its wide-open savannah, golden grasses, and dramatic views of Mount Agung. At Linda Wiryani Design and Event Planning, we design weddings in Savana Tianyar that embrace its vast and untamed beauty — creating celebrations that feel expansive, cinematic, and deeply connected to nature. Our Savana Tianyar weddings are shaped by open horizons, earthy textures, and a sense of freedom that allows each moment to feel powerful and unfiltered. We work with couples who are drawn to Savana Tianyar for its uniqueness, its dramatic landscape, and its ability to create a wedding experience unlike anywhere else in Bali.",
    location: "East Bali",
    atmosphere:
      "Cinematic yet grounded — bold and visually expressive, open, airy, and expansive, elegant within a raw and untamed natural landscape shaped by savannah and volcano",
    accessibility_notes:
      "Remote location requiring detailed coordination for transportation, setup, and vendor access; natural terrain requires thoughtful planning for flooring, seating, and structural stability; open and exposed setting necessitates full logistics support for guests and crew",
    seasonal_considerations:
      "Sunrise and sunset offer the most dramatic lighting, strongly influencing ceremony scheduling; open landscapes require full preparation for sun, wind, and changing weather; shading, facilities, and guest comfort must be carefully designed for open environments",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775310728/Savana_Tianyar_kbc804.png",
    guest_capacity: "10 - 100",
    highlights: [
      "Wide-open savannah with golden grasses and expansive skies",
      "Dramatic Mount Agung as the dominant visual backdrop",
      "Raw and untouched natural environment",
      "Cinematic and editorial-quality visual setting",
      "Truly unique alternative to beach or jungle weddings",
    ],
    best_for: [
      "Couples seeking a bold and one-of-a-kind landscape setting",
      "Cinematic and editorial-style wedding experiences",
      "Open space with uninterrupted savannah and mountain views",
      "A raw, expressive, and visually powerful celebration",
      "Nature-driven destination weddings with dramatic scenery",
    ],
    ceremony_options: [
      "Open savannah ceremonies with Mount Agung backdrop",
      "Expansive landscape field ceremonies",
      "Intimate elopements within golden savannah terrain",
      "Sunrise or sunset dramatic nature ceremonies",
    ],
    reception_options: [
      "Open-air savannah dinner gatherings",
      "Candlelit receptions within the natural landscape",
      "Intimate and visually striking outdoor celebrations",
      "Concept-driven editorial reception experiences",
    ],
    accommodation_nearby: [
      "Boutique East Bali resorts and eco-properties",
      "Private coastal villas near Tulamben and Kubu",
      "Nature and dive retreat lodges",
      "Remote guesthouse and highland stays",
    ],
    dining_experiences: [
      "Open landscape private chef dining experiences",
      "Local East Bali cuisine with fresh coastal produce",
      "Intimate sunrise or sunset savannah meals",
      "Concept-driven bespoke catering services",
    ],
    unique_features: [
      "Ceremony within a vast open savannah — unlike any Bali setting",
      "Powerful gathering framed by golden fields and Mount Agung",
      "Celebration shaped by nature, scale, and cinematic atmosphere",
      "Bold, unique, and visually unforgettable wedding backdrop",
      "Bali's most dramatic and unconventional landscape venue",
    ],
  },
  {
    id: "24",
    name: "Lovina",
    slug: "lovina-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Serene North Coast",
    description:
      "Calm sea, black sand beaches, and authentic northern Bali atmosphere, ideal for peaceful, intimate, and meaningfully grounded destination weddings away from the crowds.",
    long_description:
      "Lovina offers a very different side of Bali — quieter, slower, and deeply connected to the island's natural beauty and local life. Located on Bali's north coast, Lovina is known for its calm sea, black sand beaches, and peaceful coastal atmosphere. At Linda Wiryani Design and Event Planning, we design weddings in Lovina for couples who seek stillness, authenticity, and meaningful connection with nature. Lovina weddings unfold at a gentler pace — where the ocean is calm, the horizon feels expansive, and celebrations feel intimate and grounded. Many couples choose Lovina when they want a Bali wedding experience that feels away from the crowds and closer to the essence of the island.",
    location: "North Bali",
    atmosphere:
      "Peaceful rather than busy — natural rather than heavily styled, intimate rather than grand, elegant in a quiet and understated way shaped by calm sea and authentic local life",
    accessibility_notes:
      "Located approximately 2.5–3 hours from Bali's international airport requiring well-organized guest transportation; some vendors travel from southern Bali requiring careful scheduling; north coast setting creates a distinct logistical planning context",
    seasonal_considerations:
      "Calm sea and coastal climate create beautiful conditions requiring careful planning for open-air events; soft morning and sunset light strongly influence ceremony timing; many couples turn Lovina weddings into multi-day celebrations to fully explore the northern landscape",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775310970/Lovina_1_m76vmj.png",
    guest_capacity: "10 - 100",
    highlights: [
      "Calm and gentle north Bali sea and ocean horizon",
      "Authentic black sand beaches and coastal atmosphere",
      "Quiet and non-commercial northern Bali environment",
      "Boutique beachfront villas and private properties",
      "Deeply intimate and meaningful coastal setting",
    ],
    best_for: [
      "Quiet coastal environments away from tourist crowds",
      "Authentic Bali atmosphere and local character",
      "Calm oceanfront intimate wedding settings",
      "Slower, more reflective and meaningful celebrations",
      "Tranquility, privacy, and emotional intimacy",
    ],
    ceremony_options: [
      "Intimate oceanfront ceremonies by the calm sea",
      "Black sand beach and coastal settings",
      "Private villa beachfront ceremonies",
      "Elopements in northern Bali nature settings",
    ],
    reception_options: [
      "Beachfront villa intimate dinner receptions",
      "Relaxed open-air coastal gatherings",
      "Boutique property garden celebrations",
      "Multi-day nature retreat wedding experiences",
    ],
    accommodation_nearby: [
      "Peaceful beachfront villas and boutique resorts",
      "Private north Bali coastal villa stays",
      "Eco-lodge and nature retreat properties",
      "Authentic guesthouses with local character",
    ],
    dining_experiences: [
      "Fresh north Bali seafood and local cuisine",
      "Intimate private chef beachfront dining",
      "Sunset and starlit coastal dinner experiences",
      "Simple and authentic locally sourced catering",
    ],
    unique_features: [
      "Ceremony by Bali's calmest and most serene northern sea",
      "Quiet and meaningful gathering away from the island's busier areas",
      "Celebration shaped by authentic local atmosphere and natural beauty",
      "Peaceful, intimate, and deeply memorable coastal wedding",
      "A slower, more connected, and emotionally resonant Bali experience",
    ],
  },
  {
    id: "25",
    name: "Munduk",
    slug: "munduk-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Misty Highland Jungle",
    description:
      "Mountain air, misty jungle valleys, and dramatic highland viewpoints, ideal for intimate, nature-immersive, and emotionally grounded destination weddings in Bali's highlands.",
    long_description:
      "Munduk is one of Bali's most breathtaking highland destinations — a place where mountain air, misty valleys, and jungle landscapes create a setting unlike anywhere else on the island. Located in the hills of North Bali, Munduk is known for its cool climate, dramatic viewpoints, waterfalls, and peaceful atmosphere. At Linda Wiryani Design and Event Planning, we design weddings in Munduk for couples who are drawn to nature, landscape, and a sense of quiet intimacy. Munduk weddings feel immersive — surrounded by mountains, forest, and open horizons that create an atmosphere both emotional and unforgettable. Many couples choose Munduk when they want their wedding to feel deeply connected to nature and away from the busier areas of Bali.",
    location: "North Bali",
    atmosphere:
      "Immersive rather than decorative — natural rather than overly styled, intimate rather than grand, atmospheric and deeply memorable shaped by mountain mist, jungle, and cool highland air",
    accessibility_notes:
      "Located approximately 2.5–3 hours from Bali's international airport requiring well-organized guest transportation; some wedding vendors travel from southern Bali requiring structured scheduling and production planning; mountain roads require careful timing",
    seasonal_considerations:
      "Highland temperatures are cooler and mist may appear during certain times of day creating a unique and beautiful atmosphere; evening events require additional attention to lighting, flooring, and temperature considerations; dry season preferred for outdoor ceremonies",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775433888/Munduk_wusb1v.png",
    guest_capacity: "10 - 80",
    highlights: [
      "Dramatic mountain and jungle valley viewpoints",
      "Cool highland climate and fresh mountain air",
      "Misty forest landscapes and natural waterfalls",
      "Boutique eco-resorts and intimate highland estates",
      "Deeply personal and visually extraordinary natural setting",
    ],
    best_for: [
      "Mountain and jungle landscape ceremony settings",
      "Couples seeking a cooler climate and fresh highland air",
      "Quiet, nature-driven, and emotionally immersive environments",
      "Intimate destination weddings in dramatic natural scenery",
      "A deep emotional connection with Bali's highland beauty",
    ],
    ceremony_options: [
      "Cliffside ceremonies overlooking misty jungle valleys",
      "Mountain viewpoint and highland landscape settings",
      "Intimate elopements surrounded by jungle and forest",
      "Boutique eco-resort garden and terrace ceremonies",
    ],
    reception_options: [
      "Candlelit dinners surrounded by jungle and forest",
      "Boutique highland resort intimate receptions",
      "Open-air mountain view gathering celebrations",
      "Multi-day nature retreat wedding experiences",
    ],
    accommodation_nearby: [
      "Boutique eco-resorts and highland retreat properties",
      "Intimate jungle villas and nature lodges",
      "Highland estate and private villa stays",
      "Mountain guesthouses with scenic valley views",
    ],
    dining_experiences: [
      "Highland farm-to-table and organic cuisine",
      "Private chef intimate mountain dinner experiences",
      "Local north Bali cuisine with fresh highland produce",
      "Atmospheric candlelit jungle dining experiences",
    ],
    unique_features: [
      "Ceremony overlooking misty jungle valleys and mountain horizons",
      "Immersive gathering surrounded by Bali's highland nature",
      "Celebration shaped by cool air, mist, forest, and landscape",
      "Peaceful, emotional, and deeply memorable mountain wedding",
      "One of Bali's most atmospheric and nature-connected settings",
    ],
  },
  {
    id: "26",
    name: "Pemuteran",
    slug: "pemuteran-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Eco Coastal Serenity",
    description:
      "Calm seas, mountain backdrops, and eco-conscious boutique resorts in North-West Bali, ideal for intimate, nature-led, and restorative destination weddings far from the crowds.",
    long_description:
      "Pemuteran is one of Bali's most peaceful and nature-focused coastal destinations, located in North-West Bali and known for its calm seas, mountain backdrops, and close connection to marine conservation. At Linda Wiryani Design and Event Planning, we design weddings in Pemuteran that embrace its quiet beauty — creating celebrations that feel intimate, grounded, and deeply connected to nature. Our Pemuteran weddings are shaped by still waters, soft coastal light, and a sense of simplicity that allows each moment to feel meaningful and unhurried. We work with couples who are drawn to Pemuteran for its tranquility, its distance from the crowds, and its ability to offer a wedding experience that feels both authentic and restorative.",
    location: "North Bali",
    atmosphere:
      "Calm yet refined — intimate and nature-led, soft, open, and grounded, elegant with understated simplicity shaped by still waters, mountain views, and eco-conscious surroundings",
    accessibility_notes:
      "Located in North-West Bali requiring careful planning for guest travel time and vendor logistics; eco and environmental considerations influence design choices; boutique eco-resort settings provide comfort within a naturally harmonious environment",
    seasonal_considerations:
      "Both sunrise and sunset provide beautiful natural lighting opportunities influencing ceremony timing; preparation for sun, humidity, and open-air environments is essential; shading, layout, and facilities must be carefully designed for remote comfort",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775313508/Pemuteran_exl1bs.png",
    guest_capacity: "10 - 80",
    highlights: [
      "Calm and peaceful North-West Bali coastal setting",
      "Mountain and sea backdrop creating natural visual balance",
      "Eco-conscious boutique resorts with authentic character",
      "Marine conservation connection and sustainable environment",
      "Quiet, unhurried, and deeply restorative atmosphere",
    ],
    best_for: [
      "Quiet beachfront ceremony settings with calm seas",
      "Eco-conscious and nature-led wedding environments",
      "Intimate and meaningful celebrations away from crowds",
      "Couples seeking a slower and more mindful pace",
      "A restorative and authentic Bali wedding experience",
    ],
    ceremony_options: [
      "Beachfront ceremonies with mountain and ocean views",
      "Eco-resort garden and coastal settings",
      "Intimate elopements by the calm sea",
      "Sunrise or sunset nature ceremonies",
    ],
    reception_options: [
      "Eco-resort intimate dinner gatherings",
      "Open-air beachfront and garden receptions",
      "Boutique villa relaxed celebrations",
      "Small-scale nature-surrounded experiences",
    ],
    accommodation_nearby: [
      "Boutique eco-resorts and nature lodges",
      "Private coastal villas with mountain views",
      "Marine conservation resort properties",
      "Sustainable and nature-integrated stays",
    ],
    dining_experiences: [
      "Fresh north Bali seafood and local coastal cuisine",
      "Eco-conscious private chef dining experiences",
      "Sunrise or sunset beachfront intimate meals",
      "Organic and locally sourced catering services",
    ],
    unique_features: [
      "Ceremony framed by calm waters and mountain landscape",
      "Quiet and meaningful gathering in a restorative coastal setting",
      "Celebration shaped by nature, simplicity, and eco-conscious beauty",
      "Bali's most peaceful and nature-connected north-west coast",
      "Intimate, grounding, and deeply personal wedding atmosphere",
    ],
  },
  {
    id: "27",
    name: "Menjangan",
    slug: "menjangan-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Protected Nature Reserve Coast",
    description:
      "Pristine coastline within West Bali National Park, crystal-clear waters, and complete seclusion, ideal for rare, immersive, and deeply intimate destination weddings in untouched nature.",
    long_description:
      "Menjangan is one of Bali's most exclusive and untouched destinations, located within the protected area of West Bali National Park and known for its pristine coastline, calm waters, and extraordinary natural surroundings. At Linda Wiryani Design and Event Planning, we design weddings in Menjangan that embrace its rare sense of seclusion — creating celebrations that feel intimate, immersive, and deeply connected to nature. Our Menjangan weddings are shaped by still ocean horizons, wild landscapes, and a quiet atmosphere that allows each moment to feel truly present. We work with couples who are drawn to Menjangan for its privacy, its natural purity, and its ability to offer a wedding experience that feels completely removed from the ordinary.",
    location: "West Bali",
    atmosphere:
      "Pure yet refined — intimate and immersive, calm, open, and nature-led, elegant with minimal intervention shaped by pristine coastline, crystal-clear sea, and protected wilderness",
    accessibility_notes:
      "Located within West Bali National Park requiring specific permits and strict adherence to environmental regulations; remote location demands detailed coordination for transport, setup, and vendor access; limited on-site infrastructure requires full logistical planning",
    seasonal_considerations:
      "Preparation for sun, wind, and natural coastal conditions is essential; open protected environment requires careful timing for ceremony and photography; eco-luxury resort partners provide structural support within a pristine natural setting",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775434370/Menjangan_final_gkgtup.png",
    guest_capacity: "10 - 60",
    highlights: [
      "Pristine coastline within West Bali National Park",
      "Crystal-clear waters and untouched natural beaches",
      "Complete privacy and seclusion within protected wilderness",
      "Eco-luxury resort access within a national park setting",
      "Truly rare and exclusive Bali wedding destination",
    ],
    best_for: [
      "Couples seeking complete privacy and natural seclusion",
      "Pristine and untouched coastal ceremony environments",
      "Intimate and immersive nature-led celebrations",
      "A strong connection to wildlife and protected surroundings",
      "A wedding experience that feels rare and unforgettable",
    ],
    ceremony_options: [
      "Oceanfront ceremonies on pristine untouched coastline",
      "Nature reserve beach and shoreline settings",
      "Intimate elopements within protected wilderness",
      "Eco-luxury resort ceremony settings",
    ],
    reception_options: [
      "Eco-luxury resort intimate dinner receptions",
      "Open-air nature-surrounded gatherings",
      "Small and exclusive coastal celebrations",
      "Private and immersive nature retreat experiences",
    ],
    accommodation_nearby: [
      "Eco-luxury resorts within the national park",
      "Boutique nature lodges near Pemuteran",
      "Private coastal properties near the park boundary",
      "Sustainable and conservation-focused stays",
    ],
    dining_experiences: [
      "Eco-luxury private chef and curated dining experiences",
      "Fresh local seafood and nature-inspired cuisine",
      "Intimate oceanfront meals in untouched surroundings",
      "Sustainable and locally sourced catering services",
    ],
    unique_features: [
      "Ceremony within one of Bali's last truly pristine natural settings",
      "Quiet and deeply personal gathering in protected wilderness",
      "Celebration shaped by purity, stillness, and rare natural beauty",
      "Bali's most exclusive and nature-protected wedding destination",
      "A rare, immersive, and completely unforgettable experience",
    ],
  },
  {
    id: "28",
    name: "Pupuan",
    slug: "pupuan-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Hidden Jungle & Waterfall",
    description:
      "Dense jungles, terraced landscapes, and hidden waterfalls in West Bali, ideal for intimate, adventurous, and deeply immersive destination weddings in untouched nature.",
    long_description:
      "Pupuan is one of Bali's most untouched and lesser-known regions, located in West Bali and known for its dense jungles, terraced landscapes, and hidden waterfalls that create a setting both raw and deeply atmospheric. At Linda Wiryani Design and Event Planning, we design weddings in Pupuan that embrace its hidden beauty — creating celebrations that feel intimate, immersive, and naturally refined. Our Pupuan weddings are shaped by lush greenery, flowing water, and a sense of quiet discovery that allows each moment to feel deeply personal. We work with couples who are drawn to Pupuan for its seclusion, its natural richness, and its ability to offer a wedding experience far from the familiar.",
    location: "West Bali",
    atmosphere:
      "Immersive yet refined — intimate and adventurous, natural and expressive, elegant within a raw environment shaped by dense jungle, hidden waterfalls, and terraced landscapes",
    accessibility_notes:
      "Remote location requiring detailed coordination for transport, setup, and vendor access; jungle and waterfall terrain requires careful planning for guest movement and safety; natural light in forest environments requires precise timing for ceremony and photography",
    seasonal_considerations:
      "Humidity, rainfall, and natural elements must be fully prepared for; water levels and slippery surfaces near waterfalls require safety management; dry season is preferable for most outdoor ceremonies and photography",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775434109/Pupuan_cyfep8.png",
    guest_capacity: "10 - 60",
    highlights: [
      "Dense jungle and hidden waterfall landscapes",
      "Terraced West Bali greenery and natural textures",
      "Deeply secluded and undiscovered natural setting",
      "Boutique nature retreats and private jungle venues",
      "Intimate and adventurous atmosphere far from mainstream Bali",
    ],
    best_for: [
      "Jungle and waterfall ceremony settings",
      "Couples seeking a remote and untouched natural environment",
      "Privacy, seclusion, and a sense of discovery",
      "Deeply immersive and adventurous nature experiences",
      "A unique and personal alternative to mainstream Bali wedding locations",
    ],
    ceremony_options: [
      "Waterfall ceremonies within hidden natural landscapes",
      "Jungle and forest nature settings",
      "Intimate elopements surrounded by greenery and water",
      "Terraced landscape and elevated viewpoint ceremonies",
    ],
    reception_options: [
      "Jungle retreat intimate dinner gatherings",
      "Nature-surrounded open-air celebrations",
      "Private venue and boutique retreat receptions",
      "Small and meaningful forest gathering experiences",
    ],
    accommodation_nearby: [
      "Secluded jungle retreat and eco-lodge stays",
      "Private nature villa and highland properties",
      "Boutique West Bali retreat accommodations",
      "Nature-integrated guesthouse and farm stays",
    ],
    dining_experiences: [
      "Private chef jungle and nature dining experiences",
      "Fresh local West Bali produce and organic cuisine",
      "Waterfall-side intimate meal settings",
      "Farm-to-table and locally sourced catering services",
    ],
    unique_features: [
      "Ceremony near hidden waterfalls unlike any mainstream Bali venue",
      "Deeply personal and immersive gathering in untouched jungle",
      "Celebration shaped by nature, discovery, and raw natural beauty",
      "Adventurous yet refined and emotionally powerful atmosphere",
      "One of Bali's most hidden and authentically natural settings",
    ],
  },
  {
    id: "29",
    name: "Jatiluwih",
    slug: "jatiluwih-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "UNESCO Rice Terrace Heritage",
    description:
      "Expansive UNESCO-recognized rice terraces, sweeping mountain views, and timeless cultural heritage, ideal for grand yet serene, landscape-led, and culturally meaningful destination weddings.",
    long_description:
      "Jatiluwih is one of Bali's most iconic and protected landscapes, known for its expansive rice terraces, UNESCO-recognized heritage, and a sense of openness that feels both grand and deeply serene. At Linda Wiryani Design and Event Planning, we design weddings in Jatiluwih that honor its cultural and natural significance — creating celebrations that feel immersive, intentional, and timeless. Our Jatiluwih weddings are shaped by sweeping green landscapes, mountain air, and a quiet atmosphere that allows each moment to feel grounded and meaningful. We work with couples who are drawn to Jatiluwih for its scale, its authenticity, and its ability to create a wedding experience that feels both iconic and deeply connected to Bali's heritage.",
    location: "West Bali",
    atmosphere:
      "Grand yet serene — natural and culturally grounded, open, airy, and landscape-led, elegant with timeless simplicity shaped by vast rice terraces, mountain air, and heritage surroundings",
    accessibility_notes:
      "Located in central West Bali requiring coordinated transport for guests and vendors; UNESCO-protected setting requires design and setup to respect agricultural and cultural landscape; slopes and uneven rice terrace terrain require careful planning for guest flow",
    seasonal_considerations:
      "Morning and late afternoon provide the most beautiful natural light for ceremonies and photography; preparation for sun, wind, and rain is essential in open landscapes; shading, seating, and pathways must be carefully designed",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775455696/Jatiluwih_area_1_barat_k8b4wm.png",
    guest_capacity: "20 - 120",
    highlights: [
      "Expansive UNESCO-recognized rice terrace landscapes",
      "Sweeping mountain and valley views",
      "Deeply authentic and culturally significant setting",
      "Grand in scale yet calm and grounded in atmosphere",
      "One of Bali's most iconic and visually timeless backdrops",
    ],
    best_for: [
      "Wide-open rice terrace landscape ceremony settings",
      "Couples seeking UNESCO heritage and cultural connection",
      "A peaceful and nature-integrated environment with scale",
      "Mountain and valley views as wedding backdrop",
      "A timeless, meaningful, and iconic Bali wedding experience",
    ],
    ceremony_options: [
      "Terrace-view ceremonies overlooking vast rice fields",
      "Open landscape and elevated viewpoint settings",
      "Boutique retreat garden and terrace ceremonies",
      "Intimate elopements within the rice terrace landscape",
    ],
    reception_options: [
      "Boutique retreat and landscape-integrated receptions",
      "Open-air terrace-view dinner gatherings",
      "Intimate nature-surrounded celebration experiences",
      "Heritage landscape cultural dinner settings",
    ],
    accommodation_nearby: [
      "Boutique retreats and eco-lodges within the terrace area",
      "Nature-integrated villas near Jatiluwih",
      "Central Bali highland accommodation options",
      "Tabanan area guesthouses and retreat properties",
    ],
    dining_experiences: [
      "Farm-to-table dining within rice terrace surroundings",
      "Private chef and landscape-inspired cuisine experiences",
      "Local Tabanan produce and traditional Balinese dishes",
      "Open-air terrace-view intimate dining settings",
    ],
    unique_features: [
      "Ceremony overlooking one of Bali's most iconic UNESCO landscapes",
      "Grand yet serene gathering shaped by scale and cultural heritage",
      "Celebration that feels timeless, iconic, and deeply connected to Bali",
      "Bali's most expansive and culturally significant wedding backdrop",
      "An immersive, visually extraordinary, and deeply meaningful experience",
    ],
  },
  {
    id: "30",
    name: "Secluded Waterfalls",
    slug: "secluded-waterfalls-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Hidden Waterfall Nature",
    description:
      "Hidden cascading waterfalls, dense greenery, and raw natural light in West Bali, ideal for intimate, adventurous, and emotionally powerful destination weddings in nature's most dramatic settings.",
    long_description:
      "Hidden within the lush landscapes of West Bali, secluded waterfalls offer one of the most intimate and atmospheric wedding settings on the island — where cascading water, dense greenery, and natural light create a space that feels both powerful and deeply serene. At Linda Wiryani Design and Event Planning, we design waterfall weddings that embrace this sense of discovery — creating celebrations that feel immersive, personal, and connected to nature at its most raw and beautiful. Our waterfall weddings are shaped by sound, movement, and texture — where water, stone, and forest come together to form a setting unlike any other. We work with couples who are drawn to these hidden locations for their privacy, their natural drama, and their ability to create a wedding experience that feels truly unique.",
    location: "West Bali",
    atmosphere:
      "Immersive yet refined — intimate and emotionally powerful, natural and expressive, elegant within a raw environment shaped by cascading water, dense forest, and dramatic natural light",
    accessibility_notes:
      "Waterfall locations often involve walking paths, steps, or uneven terrain requiring careful planning for guest movement; water levels, slippery surfaces, and natural conditions must be carefully managed; remote settings require detailed coordination for transport and vendor access",
    seasonal_considerations:
      "Rainfall can affect water flow and accessibility requiring flexible contingency planning; natural light within forest environments varies making timing essential; dry season generally preferred for accessibility and guest safety at waterfall sites",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775434113/Pupuan_secluded_waterfall2_anoeww.png",
    guest_capacity: "10 - 50",
    highlights: [
      "Hidden cascading waterfalls in West Bali lush landscapes",
      "Dense tropical greenery and dramatic natural textures",
      "Complete privacy and seclusion in undiscovered settings",
      "Powerful sound, movement, and atmosphere of flowing water",
      "Truly one-of-a-kind ceremony backdrops unlike any venue in Bali",
    ],
    best_for: [
      "Hidden and private ceremony locations with dramatic water backdrops",
      "Couples seeking a deep connection to raw and untouched nature",
      "Intimate, adventurous, and emotionally powerful celebrations",
      "A sense of exclusivity, discovery, and unique storytelling",
      "A wedding experience that feels truly one-of-a-kind",
    ],
    ceremony_options: [
      "Ceremonies directly in front of cascading waterfall backdrops",
      "Forest and jungle framed intimate ceremony settings",
      "Waterfall pool and natural stone platform ceremonies",
      "Elopements in hidden and private waterfall locations",
    ],
    reception_options: [
      "Intimate nature gatherings near waterfall settings",
      "Forest-surrounded private dinner experiences",
      "Small and meaningful open-air celebrations",
      "Concept-driven waterfall and nature reception experiences",
    ],
    accommodation_nearby: [
      "Boutique eco-lodges and jungle retreats in West Bali",
      "Private nature villas near waterfall locations",
      "Tabanan and Pupuan area guesthouses and retreats",
      "Nature-integrated accommodation with forest character",
    ],
    dining_experiences: [
      "Private chef and nature-immersive dining experiences",
      "Fresh local West Bali cuisine with organic produce",
      "Waterfall-side intimate and atmospheric meals",
      "Concept-driven bespoke catering in natural settings",
    ],
    unique_features: [
      "Ceremony with cascading waterfall as the natural backdrop",
      "Deeply personal and immersive gathering shaped by water and forest",
      "Celebration defined by movement, sound, raw beauty, and emotion",
      "Bali's most hidden and dramatically atmospheric wedding setting",
      "A transformative, powerful, and truly unforgettable experience",
    ],
  },
  {
    id: "31",
    name: "Kintamani",
    slug: "kintamani-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Volcano & Lake View Highland",
    description:
      "Dramatic volcano and crater lake views, expansive highland landscapes, and cool mountain air, ideal for elevated, cinematic, and landscape-led destination weddings shaped by scale and atmosphere.",
    long_description:
      "Kintamani is one of Bali's most dramatic and iconic landscapes, known for its sweeping views of Mount Batur, volcanic terrain, and the serene presence of Lake Batur that together create a setting both powerful and contemplative. At Linda Wiryani Design and Event Planning, we design weddings in Kintamani that embrace its scale and atmosphere — creating celebrations that feel elevated, intentional, and deeply connected to the land. Our Kintamani weddings are shaped by mountain air, expansive horizons, and a sense of quiet that allows each moment to feel grounded and meaningful. We work with couples who are drawn to Kintamani for its dramatic scenery, its cooler climate, and its ability to create a wedding experience that feels both cinematic and serene.",
    location: "Highlands, Lakes and Mountains",
    atmosphere:
      "Expansive yet serene — dramatic and visually expressive, light-filled and landscape-led, elegant with natural simplicity shaped by volcano views, crater lake, and mountain air",
    accessibility_notes:
      "Highland location requiring coordinated transport for guests and vendors; open highland environments require careful design choices for décor and structures due to wind conditions; elevated locations may involve slopes and varied terrain requiring careful guest flow planning",
    seasonal_considerations:
      "Morning and late afternoon offer the most beautiful natural light for ceremonies and photography; mountain views can be influenced by weather conditions requiring flexible planning; preparation for cooler temperatures and wind is essential for guest comfort",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773709786/kintamani_jdqg0a.jpg",
    guest_capacity: "20 - 200",
    highlights: [
      "Sweeping views of Mount Batur and volcanic terrain",
      "Serene crater lake presence framing the landscape",
      "Cool mountain air and expansive open horizons",
      "Dramatic and cinematic highland wedding environment",
      "A unique alternative to Bali's coastal and jungle settings",
    ],
    best_for: [
      "Volcano and crater lake views as wedding backdrop",
      "Couples seeking a cooler climate and fresh mountain air",
      "Expansive landscapes with dramatic highland scenery",
      "A calm and contemplative wedding atmosphere",
      "A unique, elevated, and visually striking Bali wedding experience",
    ],
    ceremony_options: [
      "Volcano-view open-air ceremony settings",
      "Crater lake panorama ceremony backdrops",
      "Highland terrace and elevated viewpoint ceremonies",
      "Boutique retreat garden ceremonies with mountain views",
      "Intimate elopements in highland landscape settings",
    ],
    reception_options: [
      "Panoramic volcano and lake view dinner receptions",
      "Open-air highland terrace celebration gatherings",
      "Boutique retreat and highland venue receptions",
      "Intimate nature-surrounded evening experiences",
      "Landscape-led sunset and dinner reception flows",
    ],
    accommodation_nearby: [
      "Boutique highland retreats with volcano views",
      "Nature-integrated villas near Lake Batur",
      "Kintamani caldera area guesthouses and lodges",
      "Highland eco-retreats with panoramic lake scenery",
    ],
    dining_experiences: [
      "Caldera-view dining with local Balinese cuisine",
      "Private chef highland dinner experiences",
      "Fresh mountain produce and traditional local dishes",
      "Open-air terrace dining overlooking volcano and lake",
    ],
    unique_features: [
      "Ceremony overlooking Mount Batur and crater lake simultaneously",
      "Elevated celebration shaped by volcanic landscape and mountain air",
      "A wedding that feels powerful, cinematic, and deeply serene",
      "One of Bali's most dramatic and visually distinctive settings",
      "An immersive highland experience unlike any coastal or jungle venue",
    ],
  },
  {
    id: "32",
    name: "Bedugul",
    slug: "bedugul-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Lake & Highland Nature",
    description:
      "Cool highland lakes, misty mountain landscapes, and serene botanical surroundings, ideal for calm, intimate, and nature-led destination weddings shaped by soft light and quiet elegance.",
    long_description:
      "Bedugul is one of Bali's most atmospheric highland destinations, known for its cool climate, misty landscapes, and the serene beauty of its lakes surrounded by mountains and forest. At Linda Wiryani Design and Event Planning, we design weddings in Bedugul that embrace its quiet and poetic character — creating celebrations that feel calm, intimate, and deeply connected to nature. Our Bedugul weddings are shaped by soft light, mountain air, and reflective lake surfaces that create an atmosphere both serene and visually captivating. We work with couples who are drawn to Bedugul for its unique highland setting, its cooler climate, and its ability to create a wedding experience that feels peaceful and refined.",
    location: "Highlands, Lakes and Mountains",
    atmosphere:
      "Soft yet visually striking — calm and atmospheric, intimate and refined, elegant with natural simplicity shaped by misty lakes, mountain air, and cool highland environment",
    accessibility_notes:
      "Highland area requiring coordinated transport for guests and vendors; open landscapes and natural terrain require careful planning for guest flow; cooler weather requires preparation for guest comfort especially during early morning or evening events",
    seasonal_considerations:
      "Highland areas may experience more frequent rain requiring flexible planning; natural mist can enhance atmosphere but also influence visibility and timing; seating, coverings, and layout must be thoughtfully arranged for changing conditions",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775310185/Bedugul_Elopement_Venue_Final_hezj0f.png",
    guest_capacity: "20 - 150",
    highlights: [
      "Cool highland lakes with misty mountain surroundings",
      "Serene botanical gardens and nature venues",
      "Soft natural light and atmospheric highland environment",
      "A calm and less crowded alternative to coastal Bali",
      "Unique and scenic highland landscape experience",
    ],
    best_for: [
      "Lakefront ceremony settings in misty highland landscapes",
      "Couples seeking cooler temperatures and fresh mountain air",
      "A calm and less crowded wedding environment",
      "Intimate and meaningful celebrations in nature",
      "A unique and scenic highland Bali wedding experience",
    ],
    ceremony_options: [
      "Lakefront ceremonies with misty mountain backdrops",
      "Botanical garden and nature venue ceremonies",
      "Open highland landscape ceremony settings",
      "Private retreat garden ceremonies near the lake",
      "Intimate elopements in quiet highland surroundings",
    ],
    reception_options: [
      "Lake-view receptions in highland nature settings",
      "Botanical garden and open-air outdoor gatherings",
      "Intimate retreat-style celebration experiences",
      "Nature-surrounded evening dinner receptions",
      "Calm, atmospheric highland landscape celebrations",
    ],
    accommodation_nearby: [
      "Boutique highland retreats near Bedugul lakes",
      "Nature-integrated villas with lake and mountain views",
      "Bedugul area guesthouses and eco-lodges",
      "Highland resort properties with garden settings",
    ],
    dining_experiences: [
      "Lakeside dining with fresh highland produce",
      "Private chef and nature-inspired cuisine experiences",
      "Local Balinese highland dishes and organic ingredients",
      "Open-air garden and terrace intimate dining settings",
    ],
    unique_features: [
      "Ceremony framed by misty lake and mountain landscape",
      "Calm and poetic gathering shaped by soft light and cool air",
      "A wedding that feels serene, refined, and deeply atmospheric",
      "Bali's most distinctive cool highland wedding environment",
      "A peaceful, intimate, and visually unique celebration experience",
    ],
  },
  {
    id: "33",
    name: "Lake Beratan",
    slug: "lake-beratan-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Sacred Lake Temple & Highland",
    description:
      "Iconic floating temple on calm highland waters, misty mountain atmosphere, and cultural depth, ideal for symbolic, atmospheric, and visually timeless destination weddings shaped by reflection and heritage.",
    long_description:
      "Lake Beratan is one of Bali's most iconic and visually recognizable destinations, known for its serene waters and the presence of the floating temple that appears to rise gently from the lake. At Linda Wiryani Design and Event Planning, we design weddings at Lake Beratan that embrace its cultural and natural beauty — creating celebrations that feel calm, symbolic, and deeply atmospheric. Our Lake Beratan weddings are shaped by still water, mountain air, and soft mist that together create a setting both poetic and unforgettable. We work with couples who are drawn to Lake Beratan for its iconic scenery, its spiritual presence, and its ability to create a wedding experience that feels both meaningful and visually striking.",
    location: "Highlands, Lakes and Mountains",
    atmosphere:
      "Serene yet iconic — cultural and visually refined, soft, atmospheric, and poetic, elegant with quiet depth shaped by still lake waters, floating temple, and misty highland landscape",
    accessibility_notes:
      "As a sacred and cultural site, certain guidelines and respectful practices must be followed; layout and movement must be carefully planned within public and open spaces; cooler highland temperatures require preparation for guest comfort",
    seasonal_considerations:
      "Natural mist enhances atmosphere but may influence visibility and timing; flexible planning is essential due to changing highland weather conditions; morning and late afternoon offer the most beautiful light for ceremonies and photography",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775311306/Lake_Beratan_mv4twx.png",
    guest_capacity: "20 - 150",
    highlights: [
      "Iconic floating Pura Ulun Danu Beratan temple on the lake",
      "Serene reflective waters with misty mountain backdrop",
      "Deeply symbolic and culturally rich wedding environment",
      "Soft natural light and poetic highland atmosphere",
      "One of Bali's most visually recognizable and timeless settings",
    ],
    best_for: [
      "Lakefront ceremonies with iconic temple backdrop views",
      "Couples seeking a culturally rich and symbolic environment",
      "Misty, highland, and atmospheric wedding settings",
      "Calm and reflective ceremony experiences",
      "A visually distinctive and timelessly memorable Bali wedding",
    ],
    ceremony_options: [
      "Lakefront ceremonies framed by the floating temple",
      "Highland lake-view open-air ceremony settings",
      "Cultural and landscape-inspired ceremony backdrops",
      "Intimate elopements by the calm lakeside",
      "Boutique retreat ceremonies near the lake",
    ],
    reception_options: [
      "Lake Beratan view dinner and celebration receptions",
      "Cultural and atmospheric highland gathering experiences",
      "Intimate boutique retreat receptions near the water",
      "Open-air lake-view evening celebration settings",
      "Refined and nature-surrounded intimate gatherings",
    ],
    accommodation_nearby: [
      "Boutique highland hotels near Lake Beratan",
      "Nature-integrated retreats in the Bedugul area",
      "Lakeside guesthouses and eco-lodges",
      "Highland resort properties with garden and lake views",
    ],
    dining_experiences: [
      "Lakeside dining with views of the floating temple",
      "Private chef highland culinary experiences",
      "Fresh Bedugul highland produce and local Balinese cuisine",
      "Open-air terrace and garden intimate dining settings",
    ],
    unique_features: [
      "Ceremony with the iconic floating temple as a natural backdrop",
      "Symbolic and culturally layered gathering on sacred highland waters",
      "A wedding that feels timeless, poetic, and deeply meaningful",
      "Bali's most recognizable and visually iconic lake wedding setting",
      "A serene, reflective, and unforgettable celebration experience",
    ],
  },
  {
    id: "34",
    name: "Lake Buyan",
    slug: "lake-buyan-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Secluded Forest Lake Highland",
    description:
      "Calm and untouched highland lake waters, dense surrounding forest, and deeply quiet atmosphere, ideal for intimate, nature-immersive, and emotionally personal destination weddings shaped by stillness.",
    long_description:
      "Lake Buyan is one of Bali's most serene and untouched highland destinations, known for its calm waters, surrounding forest, and a sense of quiet that feels deeply immersive and restorative. At Linda Wiryani Design and Event Planning, we design weddings at Lake Buyan that embrace its natural stillness — creating celebrations that feel intimate, atmospheric, and deeply connected to nature. Our Lake Buyan weddings are shaped by misty mornings, reflective water, and dense greenery that create a setting both peaceful and visually poetic. We work with couples who are drawn to Lake Buyan for its seclusion, its natural beauty, and its ability to create a wedding experience that feels quiet, personal, and away from the ordinary.",
    location: "Highlands, Lakes and Mountains",
    atmosphere:
      "Calm yet immersive — intimate and nature-led, soft, atmospheric, and expressive, elegant with natural simplicity shaped by misty forest, reflective lake, and secluded highland surroundings",
    accessibility_notes:
      "Lake surroundings may involve uneven ground and forest paths requiring careful planning for guest movement; remote setting requires detailed coordination for transport and vendor access; natural terrain and minimal facilities require thoughtful arrangement",
    seasonal_considerations:
      "Natural mist enhances atmosphere but can influence timing and visibility; changing highland weather requires flexible planning; morning light within forested lakeside environments is particularly beautiful for photography",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775311292/Lake_Buyan_bt7cbw.png",
    guest_capacity: "10 - 80",
    highlights: [
      "Untouched calm lake waters surrounded by dense forest",
      "Deeply secluded and private highland environment",
      "Misty mornings and reflective lake surfaces",
      "A quiet and less visited alternative to other Bali lake destinations",
      "Intimate and deeply immersive nature-led atmosphere",
    ],
    best_for: [
      "Quiet lakefront ceremonies in secluded forest settings",
      "Couples seeking privacy, seclusion, and nature connection",
      "Intimate and deeply personal wedding celebrations",
      "A calm and contemplative highland atmosphere",
      "A natural, unique, and away-from-ordinary Bali experience",
    ],
    ceremony_options: [
      "Lakeside forest ceremonies with calm water backdrops",
      "Intimate open-air ceremonies within natural surroundings",
      "Secluded lakefront elopement settings",
      "Nature retreat and outdoor highland ceremony experiences",
      "Forest-framed intimate ceremony settings",
    ],
    reception_options: [
      "Quiet lake-view intimate dinner receptions",
      "Nature retreat outdoor celebration gatherings",
      "Forest-surrounded small and meaningful experiences",
      "Secluded lakeside atmospheric evening settings",
      "Organic and nature-integrated celebration experiences",
    ],
    accommodation_nearby: [
      "Boutique eco-lodges and nature retreats near Lake Buyan",
      "Highland villas with forest and lake surroundings",
      "Bedugul area guesthouses and nature-integrated properties",
      "Remote highland retreat accommodation options",
    ],
    dining_experiences: [
      "Private chef lakeside dining experiences",
      "Fresh highland produce and locally inspired cuisine",
      "Intimate nature-surrounded meal settings",
      "Quiet forest and lakeside atmospheric dining",
    ],
    unique_features: [
      "Ceremony by one of Bali's most secluded and untouched lakes",
      "Deeply intimate gathering shaped by mist, forest, and water",
      "A wedding that feels calm, personal, and away from the world",
      "Bali's most quiet and nature-immersive lake wedding setting",
      "A truly private and emotionally meaningful celebration experience",
    ],
  },
  {
    id: "35",
    name: "Lake Tamblingan",
    slug: "lake-tamblingan-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Sacred & Ancient Forest Lake",
    description:
      "Bali's most untouched and sacred highland lake, surrounded by ancient forest and temples, ideal for intimate, spiritually meaningful, and deeply contemplative destination weddings shaped by stillness and culture.",
    long_description:
      "Lake Tamblingan is one of Bali's most untouched and sacred highland destinations, known for its quiet waters, surrounding forest, and ancient temples that create an atmosphere both serene and deeply spiritual. At Linda Wiryani Design and Event Planning, we design weddings at Lake Tamblingan that honor its purity and presence — creating celebrations that feel intimate, meaningful, and deeply connected to nature and culture. Our Lake Tamblingan weddings are shaped by still water, misty forest, and a sense of silence that allows each moment to feel grounded and intentional. We work with couples who are drawn to Lake Tamblingan for its sacred character, its seclusion, and its ability to create a wedding experience that feels truly reflective and unique.",
    location: "Highlands, Lakes and Mountains",
    atmosphere:
      "Serene yet powerful — intimate and spiritually grounded, soft, atmospheric, and immersive, elegant with quiet depth shaped by sacred lake, misty forest, and ancient temple surroundings",
    accessibility_notes:
      "As a spiritually significant and protected area, respectful planning and adherence to local customs are essential; forest paths and lake access require thoughtful planning for guest movement; remote setting requires detailed coordination for transport and vendor access",
    seasonal_considerations:
      "Natural mist enhances atmosphere but may influence timing and photography; changing natural highland conditions require flexible planning; cultural sensitivity and seasonal ceremonial calendars must be respected when planning event timing",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775311301/Lake_Tamblingan_im1kso.png",
    guest_capacity: "10 - 60",
    highlights: [
      "Sacred and untouched lake waters with ancient temple presence",
      "Dense surrounding forest with deep spiritual atmosphere",
      "One of Bali's most preserved and culturally significant landscapes",
      "A sense of true stillness and presence found nowhere else",
      "Intimate and deeply spiritual wedding environment",
    ],
    best_for: [
      "Sacred lakefront ceremonies with forest and temple surroundings",
      "Couples seeking a deep connection to Bali's spiritual landscape",
      "A peaceful, quiet, and deeply contemplative environment",
      "Intimate and reflective ceremonies with cultural meaning",
      "A unique, timeless, and spiritually grounded Bali wedding",
    ],
    ceremony_options: [
      "Sacred lakeside ceremonies with temple presence",
      "Forest-framed intimate ceremony settings",
      "Lakefront elopements in sacred and quiet surroundings",
      "Nature and culture-inspired open-air ceremony experiences",
      "Spiritual and contemplative highland ceremony settings",
    ],
    reception_options: [
      "Intimate lake-view nature gathering receptions",
      "Forest-surrounded quiet dinner celebration experiences",
      "Sacred landscape-inspired intimate gatherings",
      "Small and meaningful outdoor celebration settings",
      "Nature and culture-immersive evening experiences",
    ],
    accommodation_nearby: [
      "Boutique eco-lodges and highland retreats near Munduk",
      "Nature villas and forest guesthouses in North Bali",
      "Tamblingan area retreat and eco-accommodation properties",
      "Remote highland nature-integrated lodging options",
    ],
    dining_experiences: [
      "Private chef lakeside and forest dining experiences",
      "Fresh North Bali produce and traditional local cuisine",
      "Intimate and atmospheric nature-surrounded meals",
      "Quiet forest and lakeside contemplative dining settings",
    ],
    unique_features: [
      "Ceremony at Bali's most sacred and spiritually resonant lake",
      "Deeply intimate gathering shaped by stillness, forest, and water",
      "A wedding that feels timeless, sacred, and profoundly meaningful",
      "Bali's most untouched and culturally significant lake wedding setting",
      "A transformative, spiritual, and truly unforgettable experience",
    ],
  },
  {
    id: "36",
    name: "Bali Botanical Garden",
    slug: "bali-botanical-garden-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Garden & Highland Nature",
    description:
      "Expansive botanical gardens with towering trees, vast open greenery, and cool highland air in Bedugul, ideal for open, relaxed, and naturally elegant destination weddings shaped by space and simplicity.",
    long_description:
      "Bali Botanical Garden in Bedugul is one of the island's most expansive and serene natural destinations, known for its vast greenery, towering trees, and open landscapes set within the cool highlands. At Linda Wiryani Design and Event Planning, we design weddings in Bali Botanical Garden that embrace its sense of space and nature — creating celebrations that feel open, calm, and beautifully integrated with the environment. Our Botanical Garden weddings are shaped by forest textures, soft highland light, and a sense of quiet that allows each moment to feel grounded and intentional. We work with couples who are drawn to this location for its scale, its natural beauty, and its ability to create a wedding experience that feels both relaxed and visually refined.",
    location: "Highlands, Lakes and Mountains",
    atmosphere:
      "Open yet intimate — natural and softly structured, calm, airy, and refreshing, elegant with understated simplicity shaped by vast garden spaces, towering trees, and cool highland light",
    accessibility_notes:
      "As a public garden, permits and usage guidelines must be carefully followed; large open areas require careful planning for seating, pathways, and guest flow; cooler temperatures and potential rain require flexible planning and preparation",
    seasonal_considerations:
      "Morning and late afternoon provide the most beautiful natural light for ceremonies and photography; shading, flooring, and layout must be thoughtfully designed for outdoor guest comfort; highland weather patterns require flexible planning",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775433667/Bedugul_Botanical_Garden_z7wq6r.png",
    guest_capacity: "20 - 200",
    highlights: [
      "Expansive botanical gardens with towering trees and vast greenery",
      "Cool highland climate and refreshing mountain air",
      "Open and flexible outdoor spaces within natural surroundings",
      "A calm and less crowded environment in Bedugul highlands",
      "Unique spacious garden setting unlike any other in Bali",
    ],
    best_for: [
      "Expansive garden and forest outdoor ceremony settings",
      "Couples seeking a cool highland climate and open nature",
      "Relaxed yet visually beautiful outdoor celebrations",
      "Intimate yet spacious wedding gatherings",
      "A calm, refreshing, and naturally elegant Bali wedding experience",
    ],
    ceremony_options: [
      "Open garden ceremonies among trees and open fields",
      "Forest-framed intimate ceremony settings",
      "Botanical landscape open-air ceremony backdrops",
      "Elopements within quiet garden surroundings",
      "Nature-integrated spacious outdoor ceremony settings",
    ],
    reception_options: [
      "Outdoor garden reception and nature-inspired gatherings",
      "Picnic-style and relaxed open landscape celebrations",
      "Forest-surrounded intimate dinner experiences",
      "Open-air botanical garden dinner receptions",
      "Creative and flexible outdoor celebration formats",
    ],
    accommodation_nearby: [
      "Boutique highland hotels and retreats in Bedugul",
      "Nature-integrated villas near the botanical garden",
      "Bedugul area eco-lodges and guesthouses",
      "Highland resort properties with garden views",
    ],
    dining_experiences: [
      "Private chef garden dining experiences in nature",
      "Fresh Bedugul highland produce and local Balinese cuisine",
      "Outdoor picnic-style and nature-surrounded meal settings",
      "Open-air garden intimate and atmospheric dining",
    ],
    unique_features: [
      "Ceremony surrounded by one of Bali's most expansive botanical gardens",
      "Open and spacious gathering shaped by forest, greenery, and highland air",
      "A wedding that feels fresh, natural, relaxed, and visually elegant",
      "Bali's most unique and open garden wedding environment",
      "A calm, beautifully integrated, and unforgettable outdoor celebration",
    ],
  },
  {
    id: "37",
    name: "Mount Batur & Volcanic Landscapes",
    slug: "mount-batur-volcanic-landscapes-wedding",
    category_id: "cat-bali",
    category: getCat("cat-bali"),
    type: "Volcanic Terrain & Lava Field",
    description:
      "Raw volcanic terrain, dramatic black lava fields, and sweeping views of Mount Batur, ideal for bold, cinematic, and visually powerful destination weddings shaped by earth, energy, and raw natural beauty.",
    long_description:
      "The Mount Batur area is one of Bali's most dramatic and elemental landscapes, defined by volcanic terrain, black lava fields, and expansive views shaped by past eruptions and natural forces. At Linda Wiryani Design and Event Planning, we design weddings in the Batur region that embrace this raw beauty — creating celebrations that feel powerful, grounded, and visually unforgettable. Our Batur weddings are shaped by rugged textures, open horizons, and the presence of the volcano itself — creating an atmosphere that feels both intense and deeply meaningful. We work with couples who are drawn to this landscape for its uniqueness, its dramatic character, and its ability to create a wedding experience unlike any other in Bali.",
    location: "Highlands, Lakes and Mountains",
    atmosphere:
      "Bold yet refined — minimal and landscape-driven, expansive, open, and powerful, elegant within a raw natural context shaped by volcanic terrain, lava fields, and dramatic mountain presence",
    accessibility_notes:
      "Lava fields are uneven and rugged requiring careful planning for layout and safety; remote locations require coordination for transport, setup, and vendor access; open landscapes require thoughtful design choices for structures and décor due to wind and environmental exposure",
    seasonal_considerations:
      "Sunrise and early morning provide the most dramatic and beautiful light for ceremonies and photography; cool mornings and strong sun exposure during the day must be carefully considered; remote terrain requires additional logistics planning for dry season access",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775311302/Volcano_mount_batur_mk3yom.png",
    guest_capacity: "10 - 80",
    highlights: [
      "Dramatic black lava fields and volcanic terrain backdrops",
      "Expansive views of Mount Batur as a powerful focal point",
      "A raw and untouched natural environment unlike any in Bali",
      "Bold, cinematic, and editorial-quality wedding setting",
      "A deeply unique alternative to beach, jungle, or rice field weddings",
    ],
    best_for: [
      "Volcanic landscapes and lava field ceremony backdrops",
      "Couples seeking raw natural energy and strong visual impact",
      "A one-of-a-kind setting with dramatic character",
      "Editorial, concept-driven, and cinematic wedding experiences",
      "A bold, powerful, and visually unforgettable Bali wedding",
    ],
    ceremony_options: [
      "Volcano and lava field open-air ceremony settings",
      "Sunrise ceremonies with Mount Batur as the backdrop",
      "Rugged volcanic terrain intimate ceremony experiences",
      "Intimate elopements within the dramatic lava landscape",
      "Editorial and concept-driven ceremony productions",
    ],
    reception_options: [
      "Volcanic landscape-inspired intimate dinner gatherings",
      "Editorial and creative open-air reception experiences",
      "Sunrise and morning celebration dining settings",
      "Minimal and landscape-driven intimate receptions",
      "Concept-driven bespoke volcanic terrain celebrations",
    ],
    accommodation_nearby: [
      "Boutique highland retreats near Mount Batur",
      "Caldera-view lodges and eco-guesthouses in Kintamani",
      "Nature-integrated villas near Lake Batur",
      "Highland retreat properties with volcano panoramas",
    ],
    dining_experiences: [
      "Private chef volcanic landscape dining experiences",
      "Fresh highland produce and local Balinese cuisine",
      "Sunrise and morning outdoor atmospheric meal settings",
      "Concept-driven bespoke catering in volcanic surroundings",
    ],
    unique_features: [
      "Ceremony set within one of Bali's most dramatic volcanic landscapes",
      "Bold and powerful gathering shaped by lava, earth, and mountain",
      "A wedding that feels raw, cinematic, and deeply unforgettable",
      "Bali's most elemental and visually striking wedding setting",
      "A transformative, one-of-a-kind, and truly powerful experience",
    ],
  },

  // ─── THEMES ───────────────────────────────────────────────────────────────

  {
    id: "t1",
    name: "Lake Weddings",
    slug: "lake-weddings",
    category_id: "cat-themes",
    category: getCat("cat-themes"),
    type: "Reflective Highland Serenity",
    description:
      "Stillwater reflections, mountain mist, and atmospheric highland calm, ideal for intimate, contemplative, and visually poetic weddings shaped by nature, stillness, and quiet emotional depth.",
    long_description:
      "Lake weddings in Bali offer a rare kind of experience — one defined not by movement, but by stillness. Surrounded by mountains, forest, and mist, these settings create a natural sense of calm where every moment feels more present, more intentional, and more deeply felt. At Linda Wiryani Design and Event Planning, we design lake weddings that embrace this atmosphere — creating celebrations that feel intimate, immersive, and visually poetic. Our approach is not to impose design, but to work in harmony with the environment — where water, light, and landscape shape the experience naturally.",
    location: "Highlands, Lakes and Mountains",
    atmosphere:
      "Calm and contemplative — visually soft and layered, emotionally grounded and naturally elegant, where the still surface of the water, cooler highland air, and soft diffused light slow everything down and allow each moment to unfold with clarity and presence",
    accessibility_notes:
      "Cooler highland temperatures require preparation for guest comfort, particularly in early morning or evening events; natural mist enhances atmosphere but may influence timing and photography; terrain may involve uneven ground or forest paths requiring thoughtful layout planning; certain sacred lake locations require respectful planning and adherence to local cultural guidelines",
    seasonal_considerations:
      "Highland weather can change quickly requiring flexible planning and contingency solutions; natural mist and cloud cover can vary throughout the day influencing ceremony timing; morning and late afternoon provide the most atmospheric lighting conditions for ceremonies and photography",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775434577/lake-wedding_xqsyuv.png",
    guest_capacity: "10 - 150",
    highlights: [
      "Still water reflections and misty mountain atmosphere as ceremony backdrop",
      "Cooler highland temperatures and fresh mountain air",
      "Sacred and culturally rich lake settings including Beratan, Buyan, and Tamblingan",
      "Volcanic crater lake drama at Lake Batur within the Mount Batur caldera",
      "A deeply intimate and contemplative atmosphere unlike any coastal setting",
    ],
    best_for: [
      "Couples seeking a calm, peaceful, and emotionally meaningful environment",
      "Lakefront ceremonies with misty mountain and reflective water backdrops",
      "A unique alternative to beach or clifftop wedding settings",
      "Intimate and culturally connected celebrations with spiritual depth",
      "A wedding experience that feels timeless, serene, and deeply intentional",
    ],
    ceremony_options: [
      "Lakefront ceremonies with still water and mountain reflections",
      "Sacred lake settings with cultural and spiritual significance",
      "Volcanic crater lake ceremonies with expansive open views",
      "Misty highland garden ceremonies in the Bedugul highlands",
      "Intimate elopements beside quiet and secluded forest lakes",
    ],
    reception_options: [
      "Intimate lakeside dinner gatherings with atmospheric highland views",
      "Boutique retreat and highland venue open-air receptions",
      "Cultural and landscape-inspired celebratory experiences",
      "Editorial and concept-driven celebrations shaped by reflection and light",
      "Multi-moment experiences flowing from ceremony to gathering to dining",
    ],
    accommodation_nearby: [
      "Boutique highland retreats and lake-view eco-lodges",
      "Nature-integrated villas near Lake Beratan and Bedugul",
      "Forest and lake-surrounded guesthouses near Buyan and Tamblingan",
      "Caldera-view lodges and retreat properties near Lake Batur",
    ],
    dining_experiences: [
      "Lakeside private chef dining with mountain and water views",
      "Fresh highland produce and local Balinese cuisine",
      "Misty open-air atmospheric dinner experiences",
      "Intimate nature-surrounded candlelit meal settings",
    ],
    unique_features: [
      "Ceremony reflected on still highland lake waters",
      "Quiet and meaningful gathering shaped by mist, mountain, and water",
      "A wedding that feels calm, timeless, and deeply atmospheric",
      "Access to Bali's most sacred and scenically iconic lake settings",
      "A celebration defined by stillness, reflection, and natural elegance",
    ],
  },
  {
    id: "t2",
    name: "Waterfall Weddings",
    slug: "waterfall-weddings",
    category_id: "cat-themes",
    category: getCat("cat-themes"),
    type: "Nature-Immersive & Intimate Flow",
    description:
      "Cascading water, lush forest textures, and soft diffused natural light, ideal for intimate, nature-driven, and emotionally grounded weddings shaped by movement, sound, and refined accessibility.",
    long_description:
      "Waterfall weddings in Bali offer a rare balance — where nature feels powerful, yet the experience remains calm, intimate, and beautifully curated. Unlike more extreme or adventurous locations, there are waterfalls across Ubud, Central Bali, West Bali, and North Bali that allow couples to experience this setting without compromising comfort or accessibility. At Linda Wiryani Design and Event Planning, we design waterfall weddings that feel immersive without being overwhelming — creating celebrations that are safe, intentional, and deeply connected to the natural environment. Our approach focuses on selecting locations where the beauty of cascading water, lush greenery, and natural light can be experienced with ease.",
    location: "Ubud & Gianyar, North Bali, West Bali",
    atmosphere:
      "Intimate yet visually striking — natural and softly curated, safe and well-considered, elegant within a raw natural setting where the sound of water, the texture of stone, and surrounding forest create a layered and deeply immersive atmosphere",
    accessibility_notes:
      "Carefully selected waterfall locations prioritise safe access and manageable walking distances with minimal steps; terrain and safety conditions are assessed for each site; water levels and slippery surfaces require careful setup planning; natural light within forest environments varies and requires precise timing for ceremony and photography",
    seasonal_considerations:
      "Water flow varies depending on season influencing both design choices and ceremony timing; dry season generally preferred for most accessible and stable conditions; soft natural light is most beautiful in the morning and late afternoon within forest environments",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775309703/Pupuan_wedding_qvxx0o.png",
    guest_capacity: "5 - 60",
    highlights: [
      "Cascading waterfall as a naturally dramatic and intimate ceremony backdrop",
      "Accessible locations across Ubud, North Bali, West Bali, and Central Highlands",
      "Soft diffused forest light ideal for photography and atmosphere",
      "A sense of natural enclosure, privacy, and emotional intimacy",
      "A unique and personal alternative to traditional beach or villa venues",
    ],
    best_for: [
      "Couples seeking a unique, non-traditional, and nature-connected ceremony",
      "Intimate elopements in private and naturally immersive settings",
      "A wedding experience that feels emotionally grounded and quietly personal",
      "Nature-integrated celebrations with refined styling and comfort",
      "Editorial and soft-adventure weddings in accessible natural environments",
    ],
    ceremony_options: [
      "Ceremonies directly framed by cascading waterfall backdrops",
      "Forest and jungle-enclosed intimate ceremony settings",
      "Accessible waterfall locations suitable for small groups and guests",
      "Intimate elopements in private and hidden waterfall surroundings",
    ],
    reception_options: [
      "Nature gatherings near waterfall settings with forest surroundings",
      "Private intimate dinners within lush natural environments",
      "Small and meaningful open-air celebrations shaped by natural textures",
      "Editorial and concept-driven nature reception experiences",
    ],
    accommodation_nearby: [
      "Boutique eco-lodges and jungle retreat properties near waterfall locations",
      "Private nature villas in Ubud, West Bali, and North Bali",
      "Forest-integrated guesthouses and highland retreat accommodations",
      "Nearby boutique resort and villa stays with nature access",
    ],
    dining_experiences: [
      "Private chef forest and nature-immersive dining experiences",
      "Fresh local Balinese cuisine with organic produce",
      "Waterfall-side intimate and atmospheric meal settings",
      "Soft and naturally curated catering in forest surroundings",
    ],
    unique_features: [
      "Ceremony framed by the sound and movement of cascading water",
      "Deeply personal and immersive gathering shaped by water, stone, and forest",
      "A wedding that feels intimate, natural, and beautifully effortless",
      "Access to Bali's most beautiful and accessible waterfall locations",
      "A celebration defined by connection, nature, and quiet emotional depth",
    ],
  },
  {
    id: "t3",
    name: "Private Villa Weddings",
    slug: "private-villa-weddings",
    category_id: "cat-themes",
    category: getCat("cat-themes"),
    type: "Exclusive Privacy & Creative Freedom",
    description:
      "Complete privacy, design freedom, and a fully immersive personal environment, ideal for elegant, creative, and deeply personalised destination weddings shaped by architecture, intimacy, and seamless experience.",
    long_description:
      "Private villa weddings in Bali offer a fundamentally different experience — one defined by privacy, flexibility, and the freedom to create a celebration that is entirely your own. Unlike traditional venues, private villas provide a blank canvas — where architecture, landscape, and design come together to shape a wedding that feels personal, immersive, and deeply intentional. At Linda Wiryani Design and Event Planning, we specialise in designing private villa weddings that balance creative vision with seamless execution — creating celebrations that feel both elevated and effortless. Our approach is rooted in understanding space, flow, and experience — ensuring that every element of the wedding feels considered, refined, and uniquely yours.",
    location: "South Bali, Ubud & Gianyar, East Bali, North Bali, West Bali",
    atmosphere:
      "Intimate yet elevated — design-led and highly curated, seamless and well-orchestrated, elegant without feeling excessive, where complete creative freedom transforms a private space into a fully personalised and immersive celebration environment",
    accessibility_notes:
      "Each villa has its own policies regarding events, sound, and capacity requiring individual coordination; lighting, power, catering, and technical requirements must typically be sourced and brought in by the planning team; sound and curfew restrictions vary by area and local regulations; weather contingency plans are essential as most villas are outdoor-focused",
    seasonal_considerations:
      "Most villas are outdoor-focused requiring flexible weather contingency planning; lighting transitions from day to evening must be carefully designed; timing of ceremony, cocktail, and reception flow should align with natural light and Bali's seasonal sunset conditions",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775309730/Private_Villa_Weddings_ckh0kd.png",
    guest_capacity: "10 - 300",
    highlights: [
      "Complete creative freedom in design, layout, and celebration format",
      "A fully private and exclusive environment for couple and guests",
      "Flexible timelines without the constraints of traditional venues",
      "Multi-day wedding experiences from welcome dinners to post-wedding brunches",
      "Villas available across all of Bali's key regions — cliffside, jungle, coastal, and highland",
    ],
    best_for: [
      "Couples seeking complete privacy and a fully personalised wedding experience",
      "Design-led and creatively directed celebration environments",
      "Multi-day gatherings combining ceremony, dining, and guest stay",
      "Intimate and meaningful celebrations with a strong editorial vision",
      "A wedding that feels entirely personal, refined, and uniquely yours",
    ],
    ceremony_options: [
      "Villa garden and pool ceremonies with full design freedom",
      "Clifftop villa ceremonies with expansive ocean views in South Bali",
      "Jungle and valley-view villa ceremonies in Ubud and surroundings",
      "Coastal and beachfront villa settings in Canggu, Seminyak, and East Bali",
      "Intimate elopements within private and beautifully curated villa spaces",
    ],
    reception_options: [
      "Full-scale villa destination wedding receptions combining ceremony and dining",
      "Multi-day immersive experiences flowing across villa spaces",
      "Design-led and editorial receptions in architecturally curated environments",
      "Intimate villa gatherings focused on connection, atmosphere, and personal meaning",
      "Luxury lifestyle receptions blending design, hospitality, and experience",
    ],
    accommodation_nearby: [
      "Private villa estate properties with full guest accommodation",
      "Clifftop and oceanview villas in Uluwatu and South Bali",
      "Jungle and valley villas in Ubud with nature-integrated surroundings",
      "Coastal lifestyle villas in Canggu and Seminyak",
    ],
    dining_experiences: [
      "Private chef villa dining experiences tailored to the couple's vision",
      "Multi-course sunset dinners on villa terraces and pool decks",
      "Bespoke catering and lifestyle dining within intimate villa environments",
      "Welcome dinners, wedding feasts, and post-celebration brunches",
    ],
    unique_features: [
      "A fully personalised celebration environment shaped entirely by design vision",
      "Privacy and exclusivity that transforms a wedding into an immersive experience",
      "Seamless flow between ceremony, cocktail, reception, and overnight guest stay",
      "Creative freedom to design without the limitations of traditional venues",
      "A wedding experience that feels deeply personal, refined, and completely your own",
    ],
  },
  {
    id: "t4",
    name: "Mountain Weddings",
    slug: "mountain-weddings",
    category_id: "cat-themes",
    category: getCat("cat-themes"),
    type: "Elevated Highland & Volcanic Grandeur",
    description:
      "Panoramic views, cooler mountain air, and an expansive sense of space and light, ideal for elevated, calm, and visually refined destination weddings shaped by landscape, atmosphere, and natural grandeur.",
    long_description:
      "Mountain weddings in Bali offer a distinct kind of experience — one defined by elevation, atmosphere, and an expansive sense of space. Set within highland regions surrounded by volcanoes, valleys, and forest, these settings create a natural environment where the air feels lighter, the views feel endless, and every moment feels more present. At Linda Wiryani Design and Event Planning, we design mountain weddings that embrace this elevated atmosphere — creating celebrations that feel calm, intentional, and visually striking. Our approach focuses on working with the landscape — allowing light, air, and horizon to shape the experience in a way that feels both powerful and refined.",
    location: "Highlands, Lakes and Mountains",
    atmosphere:
      "Expansive yet intimate — calm and atmosphere-led, light-filled and visually refined, elegant with natural restraint, where cooler temperatures, panoramic valley views, and the sense of elevation above the ordinary create a deeply grounded and powerful wedding environment",
    accessibility_notes:
      "Highland locations require coordinated transport for guests and vendors; open elevated landscapes require careful design and structural considerations for wind and environmental exposure; elevated terrain may involve slopes or uneven ground requiring thoughtful layout and guest flow planning; cooler temperatures require preparation for guest comfort, particularly in early morning or evening events",
    seasonal_considerations:
      "Mountain views can be influenced by cloud cover and changing weather conditions requiring flexible planning; morning and late afternoon provide the most beautiful natural light for ceremonies and photography; dry season preferred for most stable highland conditions and outdoor ceremony planning",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775314171/Kintamani_romzer.png",
    guest_capacity: "15 - 200",
    highlights: [
      "Panoramic views across volcanic landscapes, valleys, and open horizons",
      "Cooler highland temperatures and fresh, light mountain air",
      "Kintamani and Mount Batur area offering bold and cinematic volcanic views",
      "Bedugul highlands with cool lakes, forests, and serene garden environments",
      "Sidemen Valley combining rice fields, mountain views, and intimate natural depth",
    ],
    best_for: [
      "Couples seeking a setting with panoramic views and elevated atmosphere",
      "Volcano and crater lake view ceremony settings in Kintamani and Batur",
      "A cooler, calmer, and less crowded alternative to beach or coastal weddings",
      "Intimate highland and nature-led weddings with strong visual presence",
      "A wedding experience that feels elevated, refined, and quietly extraordinary",
    ],
    ceremony_options: [
      "Volcano-view open-air ceremonies overlooking Mount Batur and crater lake",
      "Bedugul highland ceremonies with misty lakes and garden surroundings",
      "Munduk and North Bali highland ceremonies with forest and valley views",
      "Sidemen Valley ceremonies combining mountain, rice field, and valley scenery",
      "Intimate highland elopements in open and elevated natural landscapes",
    ],
    reception_options: [
      "Panoramic mountain and valley view intimate dinner receptions",
      "Open-air highland terrace celebration gatherings",
      "Boutique highland retreat and venue dinner experiences",
      "Candlelit and landscape-led evening celebration flows",
      "Multi-moment highland experiences from ceremony to sunset dining",
    ],
    accommodation_nearby: [
      "Boutique highland retreats and caldera-view eco-lodges",
      "Mountain-view villas and nature-integrated retreat properties",
      "Bedugul and Kintamani area guesthouses and highland resorts",
      "Munduk and North Bali highland retreat and nature lodge accommodations",
    ],
    dining_experiences: [
      "Caldera and mountain-view private chef dining experiences",
      "Fresh highland produce and traditional local Balinese cuisine",
      "Open-air terrace and valley-view intimate dinner settings",
      "Atmospheric candlelit highland dining surrounded by nature",
    ],
    unique_features: [
      "Ceremony overlooking volcanic landscapes and expansive mountain horizons",
      "Elevated gathering shaped by cool air, vast views, and open highland space",
      "A wedding that feels powerful, refined, and deeply connected to the land",
      "Access to Bali's most dramatic highland and volcanic wedding settings",
      "A celebration defined by elevation, atmosphere, and natural grandeur",
    ],
  },
  {
    id: "t5",
    name: "Jungle & Forest Weddings",
    slug: "jungle-forest-weddings",
    category_id: "cat-themes",
    category: getCat("cat-themes"),
    type: "Nature-Integrated Atmosphere & Depth",
    description:
      "Layered jungle greenery, filtered natural light, and a deeply immersive forest atmosphere, ideal for intimate, emotionally rich, and nature-led weddings shaped by texture, organic beauty, and authentic connection.",
    long_description:
      "Jungle and forest weddings in Bali offer a deeply immersive experience — where nature is not a backdrop, but an integral part of the celebration. Surrounded by layered greenery, filtered light, and natural textures, these settings create an atmosphere that feels intimate, grounded, and emotionally rich. At Linda Wiryani Design and Event Planning, we design jungle weddings that move beyond decoration — creating celebrations that feel connected, intentional, and naturally expressive. Our approach focuses on allowing the environment to lead — where light, foliage, and landscape shape the tone and flow of the day.",
    location: "Ubud & Gianyar, East Bali, North Bali, West Bali",
    atmosphere:
      "Intimate yet visually rich — immersive and atmospheric, soft, layered, and expressive, elegant with natural restraint, where a sense of enclosure, filtered natural light, organic textures, and a calm sensory experience create a wedding that feels less staged and more deeply lived",
    accessibility_notes:
      "Forest environments may involve uneven ground or natural terrain requiring careful layout and guest flow planning; humidity requires preparation for guest comfort including ventilation and shaded seating areas; filtered light conditions require precise timing for ceremony and photography; natural settings with dense vegetation require thoughtful pathway and accessibility planning",
    seasonal_considerations:
      "Jungle areas may experience sudden rain requiring contingency planning and flexible structure options; filtered forest light is most beautiful and gentle in the morning and late afternoon; humidity levels increase during wet season requiring additional guest comfort preparations; dry season preferred for most outdoor jungle ceremony and reception experiences",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775311974/Pupuan_Jungle_Wedding_not_the_rice_field_image_ufaadl.png",
    guest_capacity: "10 - 150",
    highlights: [
      "Layered jungle greenery and organic textures as natural ceremony surroundings",
      "Soft, filtered natural light creating a gentle and immersive atmosphere",
      "Ubud and Central Bali offering refined jungle venues with accessibility",
      "Sidemen Valley and Tegallalang for lush, intimate forest and rice field settings",
      "Pupuan and North Bali highlands for deeper, more secluded jungle immersion",
    ],
    best_for: [
      "Couples seeking an emotionally grounded and nature-integrated ceremony setting",
      "Intimate weddings with a strong connection to natural texture and atmosphere",
      "A unique and deeply immersive alternative to beach or open landscape venues",
      "Nature-led celebrations that feel authentic, personal, and beautifully organic",
      "A wedding experience that feels alive, connected, and naturally expressive",
    ],
    ceremony_options: [
      "Jungle and forest-enclosed ceremony settings with canopy and greenery",
      "Riverside and valley-floor ceremonies surrounded by tropical nature",
      "Tegallalang and rice field–forest transition intimate ceremony settings",
      "Sidemen Valley ceremonies combining jungle, mountain, and valley depth",
      "Elopements in private and secluded forest surroundings",
    ],
    reception_options: [
      "Private jungle retreat and nature-immersive dinner receptions",
      "Forest-surrounded open-air gathering and celebration experiences",
      "Editorial and design-led jungle receptions with refined natural styling",
      "Intimate candlelit dinners within enclosed and atmospheric natural settings",
      "Multi-moment nature experiences flowing from ceremony to forest dining",
    ],
    accommodation_nearby: [
      "Boutique jungle villas and eco-lodge retreat properties in Ubud",
      "Nature-integrated private villas in Tegallalang and Sidemen",
      "Forest guesthouses and retreat accommodations in North and West Bali",
      "Eco-resorts and sustainable properties within jungle landscapes",
    ],
    dining_experiences: [
      "Private chef jungle and forest atmosphere dining experiences",
      "Farm-to-table and organic cuisine sourced from local surroundings",
      "Riverside and valley-view intimate dinner settings",
      "Immersive and naturally curated catering within forest environments",
    ],
    unique_features: [
      "Ceremony surrounded by layered green jungle canopy and organic textures",
      "Intimate and emotionally rich gathering shaped by filtered light and forest depth",
      "A wedding that feels immersive, alive, and deeply connected to nature",
      "Access to Bali's most beautiful and diverse jungle and forest wedding settings",
      "A celebration defined by atmosphere, texture, and natural emotional resonance",
    ],
  },
  {
    id: "t6",
    name: "Beachfront & Oceanfront Weddings",
    slug: "beachfront-oceanfront-weddings",
    category_id: "cat-themes",
    category: getCat("cat-themes"),
    type: "Coastal Horizon & Effortless Elegance",
    description:
      "Endless ocean horizons, evolving natural light, and the open rhythm of the coast, ideal for relaxed yet refined destination weddings shaped by freedom, warmth, and the iconic beauty of Bali's shoreline.",
    long_description:
      "Beachfront weddings in Bali offer one of the most iconic and emotionally resonant experiences — where the horizon stretches endlessly, the light shifts gently toward sunset, and every moment feels open and alive. Set along Bali's coastline, these weddings are shaped by ocean air, natural light, and a sense of freedom that allows the celebration to feel both relaxed and elevated. At Linda Wiryani Design and Event Planning, we design beachfront weddings that go beyond scenery — creating celebrations that feel intentional, refined, and deeply connected to the rhythm of the coast. Our approach is to work with the environment — allowing ocean, light, and space to guide the atmosphere and flow of the day.",
    location: "South Bali, East Bali, North Bali",
    atmosphere:
      "Relaxed yet beautifully curated — light-filled and atmosphere-led, open, airy, and elegant, social, warm, and effortlessly refined, where uninterrupted ocean views, natural light evolving from afternoon to sunset, and coastal air create a wedding experience that feels both expansive and deeply welcoming",
    accessibility_notes:
      "Wind and coastal exposure must be carefully considered in structural design, florals, and styling elements; ceremony timing must be precisely planned to align with Bali's sunset light and photography conditions; shading, flooring, and seating are essential for guest comfort in open beachfront environments; beach and coastal venues often have specific sound and operational guidelines that must be respected",
    seasonal_considerations:
      "West-facing beaches capture Bali's most iconic golden sunset tones — ceremony timing is carefully planned for maximum visual and photographic impact; dry season provides more stable coastal wind conditions; coastal breeze and open exposure require flexible contingency planning year-round",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775309697/Beachfront_or_oceanfront_wedding_cpcdau.png",
    guest_capacity: "20 - 500",
    highlights: [
      "Iconic Bali sunset ceremonies along the ocean coastline",
      "Dramatic clifftop settings in Uluwatu with expansive ocean views",
      "Calm bay and beachfront elegance in Jimbaran and Nusa Dua",
      "Stylish coastal energy at Seminyak, Canggu, and Kuta beachfronts",
      "Peaceful sunrise and gentle coastal settings along Sanur's east coast",
    ],
    best_for: [
      "Couples seeking an iconic Bali ocean ceremony at golden hour",
      "A relaxed yet elevated beachfront celebration with social warmth",
      "Clifftop and oceanfront settings with dramatic visual impact",
      "Large celebrations combining sunset ceremony with open-air reception",
      "A wedding experience that feels open, warm, and naturally memorable",
    ],
    ceremony_options: [
      "Sunset beach ceremonies along Bali's west-facing coastlines",
      "Clifftop ocean-view ceremonies in Uluwatu and South Bali",
      "Calm bay beachfront ceremonies in Jimbaran and Nusa Dua",
      "Stylish contemporary beachfront settings in Seminyak and Canggu",
      "Intimate sunrise and gentle east coast ceremonies in Sanur",
    ],
    reception_options: [
      "Beachfront dinner receptions under open evening skies",
      "Sunset cocktail and flowing evening celebration experiences",
      "Clifftop and ocean-view resort banquet and terrace gatherings",
      "Beach club and contemporary coastal reception environments",
      "Intimate oceanfront dining and small-scale coastal celebrations",
    ],
    accommodation_nearby: [
      "Clifftop villas and luxury resorts in Uluwatu and South Bali",
      "Boutique beachfront hotels and villas in Seminyak and Canggu",
      "Luxury resort properties in Nusa Dua and Jimbaran",
      "Heritage beachfront hotels and peaceful coastal stays in Sanur",
    ],
    dining_experiences: [
      "Beachfront sunset dinner experiences on the sand",
      "Multi-course ocean-view resort dining and bespoke catering",
      "Sunset cocktail and lifestyle catering along the coast",
      "Private chef beachfront and clifftop dining settings",
    ],
    unique_features: [
      "Ceremony by the ocean with Bali's iconic sunset as a natural backdrop",
      "A joyful and open gathering shaped by light, horizon, and coastal warmth",
      "A wedding that feels relaxed, alive, and beautifully effortless",
      "Access to Bali's most diverse and iconic beachfront wedding settings",
      "A celebration defined by openness, natural light, and the rhythm of the sea",
    ],
  },
  {
    id: "t7",
    name: "Royal Balinese Weddings",
    slug: "royal-balinese-weddings",
    category_id: "cat-themes",
    category: getCat("cat-themes"),
    type: "Heritage Architecture & Cultural Artistry",
    description:
      "Traditional Balinese architecture, intricate carvings, and layered ceremonial spaces, ideal for culturally meaningful, visually distinctive, and deeply intentional weddings shaped by heritage, artistry, and timeless elegance.",
    long_description:
      "Royal Balinese weddings offer a deeply distinctive experience — where celebration is shaped not only by design, but by culture, symbolism, and architectural beauty. Set within spaces defined by intricate carvings, traditional pavilions, and layered courtyards, these weddings carry a sense of heritage that feels both visually striking and emotionally meaningful. At Linda Wiryani Design and Event Planning, we design Royal Balinese weddings that honor this richness — creating celebrations that feel respectful, refined, and thoughtfully integrated with their surroundings. Our approach is rooted in understanding both space and meaning — ensuring that every element feels aligned with the cultural and architectural context.",
    location: "Ubud & Gianyar, East Bali",
    atmosphere:
      "Timeless and refined — culturally grounded yet elevated, visually rich yet balanced, elegant with depth and meaning, where traditional Balinese architecture with detailed carvings, open-air pavilions, structured courtyards, and natural materials of stone, wood, and thatch create a space that carries a sense of story and makes the setting itself part of the wedding narrative",
    accessibility_notes:
      "Cultural sensitivity and respect for local customs must be carefully integrated throughout planning; certain heritage locations may have specific rules, restrictions, and usage guidelines; traditional compounds require thoughtful movement planning across multiple pavilions and courtyards; décor and styling must enhance rather than overpower the existing architectural setting; many traditional venues are semi-open requiring weather contingency planning",
    seasonal_considerations:
      "Semi-open traditional venues require flexible contingency planning for rain; natural light within carved courtyards and pavilions is most beautiful in the morning and late afternoon; timing of ceremonies and processions should respect local cultural calendars and ceremonial considerations",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775309659/Royal_Balinese_Wedding_g6qmts.png",
    guest_capacity: "20 - 250",
    highlights: [
      "Authentic traditional Balinese architecture with intricate stone carvings",
      "Open-air pavilions, layered courtyards, and natural material surroundings",
      "Ubud and Gianyar — the cultural heart of Bali with refined heritage venues",
      "East Bali heritage palaces and water gardens with strong architectural presence",
      "Boutique heritage venues and private villas preserving traditional Balinese design",
    ],
    best_for: [
      "Couples seeking a culturally rich and architecturally distinctive setting",
      "Weddings that blend Balinese heritage with refined contemporary design",
      "A celebration with deep cultural meaning and visual artistry",
      "Intimate ceremonies that feel rooted in tradition and place",
      "A uniquely Balinese wedding experience that feels both timeless and intentional",
    ],
    ceremony_options: [
      "Ceremonies within traditional pavilions and carved courtyard settings",
      "Heritage palace and water garden ceremony environments",
      "Boutique venue ceremonies preserving authentic Balinese architectural style",
      "Private villa ceremonies integrating traditional Balinese design elements",
      "Intimate elopements within culturally significant architectural surroundings",
    ],
    reception_options: [
      "Layered courtyard and pavilion-flow reception experiences",
      "Heritage garden and architectural ground dinner gatherings",
      "Culturally inspired multi-space celebrations across traditional compounds",
      "Editorial and design-led receptions within architecturally rich environments",
      "Intimate cultural gatherings focused on atmosphere, meaning, and connection",
    ],
    accommodation_nearby: [
      "Boutique heritage hotels and traditional-style villa properties in Ubud",
      "Cultural compounds and privately owned heritage stays in Gianyar",
      "Historic palace-adjacent properties in the Karangasem region",
      "Private villas with authentic Balinese architectural character",
    ],
    dining_experiences: [
      "Traditional Balinese cuisine served within courtyard and pavilion settings",
      "Private chef experiences integrating cultural flavours and refined presentation",
      "Heritage-inspired multi-course dinners within architectural surroundings",
      "Culturally rich communal and celebratory dining experiences",
    ],
    unique_features: [
      "Ceremony within a space defined by centuries of Balinese artistry and tradition",
      "A deeply meaningful gathering shaped by architecture, culture, and symbolism",
      "A wedding that feels timeless, visually rich, and authentically Balinese",
      "Access to Bali's most architecturally significant and culturally resonant settings",
      "A celebration where the space itself becomes an integral part of the story",
    ],
  },
  {
    id: "t8",
    name: "Rice Paddy Field Weddings",
    slug: "rice-paddy-field-weddings",
    category_id: "cat-themes",
    category: getCat("cat-themes"),
    type: "Iconic Landscape & Cultural Harmony",
    description:
      "Layered terraces, open skies, and the living cultural landscape of Bali's rice fields, ideal for expansive, grounded, and authentically Balinese weddings shaped by natural light, agricultural heritage, and iconic scenery.",
    long_description:
      "Rice paddy field weddings in Bali capture one of the island's most recognizable and meaningful landscapes — where layered terraces, open skies, and the rhythm of nature create a setting that feels both expansive and deeply grounded. These environments are more than visually beautiful; they represent a living cultural landscape shaped by tradition, community, and harmony with nature. At Linda Wiryani Design and Event Planning, we design rice field weddings that honor this balance — creating celebrations that feel immersive, intentional, and connected to place. Our approach is to work with the landscape — allowing space, light, and natural texture to shape the atmosphere of the day.",
    location: "Ubud & Gianyar, East Bali, West Bali",
    atmosphere:
      "Expansive yet intimate — natural and visually balanced, light-filled and atmosphere-led, elegant with quiet simplicity, where layered terraces, open skies, soft natural light, and a connection to Bali's living agricultural and cultural heritage create a wedding that feels both iconic and meaningfully grounded",
    accessibility_notes:
      "Terraced landscapes may involve slopes, steps, or uneven paths requiring careful layout and guest flow planning; open environments require preparation for sun exposure, wind, and rain with shading and flooring essential; rice fields are working cultural landscapes requiring respectful planning and environmental sensitivity; morning and late afternoon provide the most beautiful natural light for ceremonies and photography",
    seasonal_considerations:
      "Rice field colour and visual character change through agricultural cycles — green terraces are most lush during and after rainy season while golden pre-harvest periods offer a different beauty; open terrain requires full weather contingency planning; morning and golden hour light is particularly beautiful across terraced landscapes",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775433769/Pupuan_rice_paddy_field_ogv5b9.png",
    guest_capacity: "15 - 200",
    highlights: [
      "Iconic Tegallalang terraced landscapes with dramatic visual layering",
      "UNESCO-recognised Jatiluwih rice terraces offering expansive open-scale views",
      "Sidemen Valley combining rice fields with mountain views and quiet intimacy",
      "Refined Ubud-area venues integrating rice field views with comfort and access",
      "Secluded Pupuan and West Bali settings with untouched rice field privacy",
    ],
    best_for: [
      "Couples seeking Bali's most iconic and authentically recognizable landscape",
      "Rice terrace view ceremonies with open skies and expansive natural surroundings",
      "A culturally meaningful and visually timeless wedding backdrop",
      "Nature-integrated celebrations with a strong sense of Balinese place and identity",
      "A wedding that feels both elegantly grounded and deeply connected to the island",
    ],
    ceremony_options: [
      "Rice terrace overlook ceremonies with sweeping landscape views",
      "UNESCO Jatiluwih open-scale terrace ceremony settings",
      "Tegallalang iconic layered terrace and valley ceremony backdrops",
      "Sidemen Valley intimate rice field and mountain view ceremonies",
      "Intimate elopements within quiet and secluded rice terrace surroundings",
    ],
    reception_options: [
      "Rice field view terrace dinner and gathering receptions",
      "Boutique venue and villa receptions overlooking agricultural landscapes",
      "Cultural and landscape-inspired celebratory dining experiences",
      "Intimate and nature-surrounded small-scale evening gatherings",
      "Multi-moment experiences flowing from ceremony to sunset rice field dining",
    ],
    accommodation_nearby: [
      "Boutique villas and eco-lodges with direct rice field and terrace views",
      "Nature-integrated private villas in Tegallalang and Ubud surroundings",
      "Heritage retreat properties in Sidemen Valley with valley and mountain views",
      "Jatiluwih area guesthouses and sustainable retreat accommodations",
    ],
    dining_experiences: [
      "Private chef terrace and rice field view dining experiences",
      "Farm-to-table cuisine using locally grown Balinese produce",
      "Organic and culturally inspired multi-course meal settings",
      "Intimate dinners overlooking layered green rice terraces",
    ],
    unique_features: [
      "Ceremony overlooking Bali's most iconic and culturally significant landscape",
      "A gathering surrounded by the living agricultural heritage of the island",
      "A wedding that feels timeless, authentic, and deeply connected to Bali",
      "Access to the island's most recognizable and visually striking terrace settings",
      "A celebration where landscape, culture, and natural beauty are inseparable",
    ],
  },
  {
    id: "t9",
    name: "Riverside Weddings",
    slug: "riverside-weddings",
    category_id: "cat-themes",
    category: getCat("cat-themes"),
    type: "Intimate Flow & Sensory Atmosphere",
    description:
      "Flowing water, layered valley greenery, and soft filtered light along Bali's riverside landscapes, ideal for intimate, emotionally rich, and deeply immersive weddings shaped by sound, texture, and natural rhythm.",
    long_description:
      "Riverside weddings in Bali offer a deeply immersive experience — where the gentle flow of water, surrounding greenery, and layered landscape create a setting that feels calm, intimate, and naturally alive. Unlike expansive coastal or mountain environments, riverside settings bring a sense of closeness — where sound, texture, and movement create a space that feels both grounding and emotionally rich. At Linda Wiryani Design and Event Planning, we design riverside weddings that embrace this atmosphere — creating celebrations that feel personal, immersive, and beautifully connected to nature. Our approach is to work with the rhythm of the environment — allowing water, light, and landscape to shape the experience organically.",
    location: "Ubud & Gianyar, East Bali, North Bali, West Bali",
    atmosphere:
      "Intimate yet visually rich — calm and atmosphere-led, soft, layered, and immersive, elegant with natural refinement, where the sound of flowing water, a sense of enclosure provided by valley walls and tropical greenery, and soft filtered light within natural surroundings create a wedding that feels less staged and more deeply experiential",
    accessibility_notes:
      "Riverbanks and valley settings may involve uneven ground, slopes, or natural terrain requiring careful layout and guest pathway planning; humidity and natural moisture require preparation for guest comfort including ventilation and appropriate flooring; water levels and river flow may vary seasonally affecting setup areas and accessibility; filtered light within valley environments requires precise ceremony and photography timing",
    seasonal_considerations:
      "River flow and water levels vary depending on rainfall and season requiring flexible site assessment and planning; valley and jungle-edge environments experience increased humidity during wet season; filtered forest light within valleys is most gentle and beautiful in the morning and late afternoon; dry season preferred for most accessible and comfortable riverside ceremony conditions",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775309711/Riverside_Wedding_Setting_iyvxh5.png",
    guest_capacity: "10 - 100",
    highlights: [
      "Natural flowing water as the defining sound and atmosphere of the ceremony",
      "Refined Ubud and Ayung River settings with accessible jungle riverside beauty",
      "Sidemen Valley combining riverside landscapes with rice fields and mountain views",
      "Hidden central Bali valley rivers offering complete privacy and layered natural depth",
      "North and West Bali remote riverside environments with deep seclusion",
    ],
    best_for: [
      "Couples seeking an intimate, sensory-rich, and emotionally grounded setting",
      "A unique nature-immersive alternative to beach or open landscape ceremonies",
      "Riverside elopements with a strong sense of calm, flow, and personal connection",
      "Nature-integrated celebrations where water, sound, and texture lead the atmosphere",
      "A wedding experience that feels deeply personal, alive, and quietly unforgettable",
    ],
    ceremony_options: [
      "Riverside ceremonies beside flowing water with jungle and valley surroundings",
      "Ubud and Ayung River valley ceremony settings with refined natural character",
      "Sidemen Valley riverside ceremonies combining water, rice fields, and mountain views",
      "Hidden central Bali valley ceremonies with complete privacy and natural enclosure",
      "Intimate elopements along quiet and secluded riverside landscapes",
    ],
    reception_options: [
      "Riverside terrace and valley-floor intimate dinner receptions",
      "Nature-immersive open-air gathering experiences beside flowing water",
      "Editorial and design-led riverside celebrations with refined natural styling",
      "Candlelit intimate dinners within enclosed and atmospheric valley settings",
      "Multi-moment experiences flowing from ceremony to riverside dining",
    ],
    accommodation_nearby: [
      "Boutique jungle and riverside villas in Ubud and Ayung River valley",
      "Nature-integrated private retreat properties in Sidemen Valley",
      "Eco-lodges and valley guesthouses in Central Bali hidden river settings",
      "Remote nature retreat accommodations in North and West Bali",
    ],
    dining_experiences: [
      "Private chef riverside and valley atmosphere dining experiences",
      "Farm-to-table and locally sourced Balinese cuisine",
      "Valley-floor and jungle-edge intimate candlelit dinner settings",
      "Nature-immersive and sensory catering alongside flowing water",
    ],
    unique_features: [
      "Ceremony beside flowing water in one of Bali's most intimate natural settings",
      "A deeply sensory gathering shaped by the sound, movement, and texture of the river",
      "A wedding that feels calm, immersive, and profoundly connected to nature",
      "Access to Bali's most beautiful and atmospheric riverside valley settings",
      "A celebration defined by flow, intimacy, and quiet emotional depth",
    ],
  },
  {
    id: "t10",
    name: "Garden Weddings",
    slug: "garden-weddings",
    category_id: "cat-themes",
    category: getCat("cat-themes"),
    type: "Outdoor Elegance & Effortless Balance",
    description:
      "Open lawns, curated greenery, and a structured yet naturally relaxed outdoor environment, ideal for fresh, elegant, and versatile destination weddings shaped by space, light, and effortless refinement.",
    long_description:
      "Garden weddings in Bali offer a beautifully balanced experience — where nature feels present, yet the setting remains structured, comfortable, and refined. Surrounded by greenery, open lawns, and curated landscapes, these environments create a setting that feels fresh, airy, and naturally elegant. At Linda Wiryani Design and Event Planning, we design garden weddings that embrace this harmony — creating celebrations that feel relaxed, intentional, and visually cohesive. Our approach is to work with both nature and space — allowing greenery, light, and layout to shape a wedding that feels effortless and elevated.",
    location: "South Bali, Ubud & Gianyar, Highlands, Lakes and Mountains",
    atmosphere:
      "Open yet intimate — fresh, airy, and inviting, structured yet relaxed, elegant with understated charm, where open lawns balanced with natural greenery, soft even light throughout the day, and a setting that feels both natural and comfortable create a wedding experience that is approachable yet refined",
    accessibility_notes:
      "Large open areas require careful spatial planning for guest flow, ceremony layout, and reception transitions; shading, seating, and flooring must be thoughtfully arranged for guest comfort in outdoor environments; technical elements including lighting, sound, and catering infrastructure must be integrated smoothly; weather contingency planning is essential for outdoor settings",
    seasonal_considerations:
      "Open garden environments require flexible planning for sun exposure and potential rain; natural light transitions throughout the day should be considered for both ceremony and reception timing; morning and late afternoon provide the most beautiful and even lighting conditions for photography and atmosphere",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775313016/Garden_Weddings_b0lzyq.png",
    guest_capacity: "20 - 400",
    highlights: [
      "Bedugul Botanical Garden with cool highland greenery and expansive open lawns",
      "Ubud and Central Bali lush garden environments integrated with jungle landscapes",
      "Exclusive private villa garden grounds combining privacy with natural beauty",
      "Coastal garden venues offering a balance between greenery and ocean atmosphere",
      "Boutique resort outdoor venues with curated landscapes and hospitality infrastructure",
    ],
    best_for: [
      "Couples seeking a natural yet structured outdoor celebration environment",
      "A versatile setting suitable for both ceremony and flowing reception",
      "Fresh, airy, and elegantly relaxed outdoor wedding experiences",
      "Editorial and design-led celebrations within beautifully curated garden spaces",
      "A wedding that feels natural, timeless, and effortlessly refined",
    ],
    ceremony_options: [
      "Open lawn ceremonies surrounded by curated garden greenery",
      "Bedugul highland botanical garden and open landscape ceremony settings",
      "Private villa garden and pool terrace ceremony environments",
      "Boutique resort outdoor ceremony and reception spaces",
      "Intimate elopements within enclosed and beautifully landscaped garden surroundings",
    ],
    reception_options: [
      "Open garden lawn dinner receptions with natural greenery surroundings",
      "Seamless indoor-outdoor venue transitions from ceremony to reception",
      "Botanical garden and highland outdoor celebration gatherings",
      "Editorial and design-led garden receptions with refined styling",
      "Multi-space villa and resort garden celebration experiences",
    ],
    accommodation_nearby: [
      "Boutique resort properties with landscaped garden grounds",
      "Private villa estates with curated garden and lawn spaces",
      "Highland retreats and eco-lodges near Bedugul Botanical Garden",
      "Nature-integrated villa accommodations in Ubud and Central Bali",
    ],
    dining_experiences: [
      "Private chef garden and open-air lawn dining experiences",
      "Farm-to-table and organic garden cuisine with fresh local produce",
      "Boutique resort catering within structured outdoor environments",
      "Sunset and evening garden dining with ambient lighting and natural surroundings",
    ],
    unique_features: [
      "Ceremony surrounded by curated greenery in one of Bali's most versatile natural settings",
      "A balanced and elegantly refined gathering shaped by open space and natural beauty",
      "A wedding that feels fresh, timeless, and effortlessly connected to the outdoors",
      "Access to Bali's most diverse and beautifully curated garden wedding environments",
      "A celebration defined by openness, balance, and naturally elegant simplicity",
    ],
  },
  {
    id: "t11",
    name: "Chapel Weddings",
    slug: "chapel-weddings",
    category_id: "cat-themes",
    category: getCat("cat-themes"),
    type: "Architectural Elegance & Intimate Atmosphere",
    description:
      "Defined architecture, controlled light, and symmetrical elegance, ideal for refined and timeless destination wedding ceremonies shaped by structure, clarity, and intimate focus.",
    long_description:
      "Chapel weddings in Bali offer a refined and structured setting — where architecture, light, and symmetry come together to create a ceremony that feels both intimate and timeless. Defined by clean lines, controlled environments, and carefully framed views, chapels provide a space where every detail feels intentional and beautifully composed. At Linda Wiryani Design and Event Planning, we design chapel weddings that embrace this sense of clarity — creating celebrations that feel elegant, meaningful, and seamlessly orchestrated. Our approach is to work with architecture and atmosphere — allowing light, space, and proportion to shape a wedding that feels calm, elevated, and refined.",
    location: "South Bali, Ubud & Gianyar, Highlands, Lakes and Mountains",
    atmosphere:
      "Elegant and composed — intimate, focused, and architecturally refined, where clean lines and controlled light draw attention to the couple and the ceremony itself, creating a setting that feels timeless, calm, and deeply meaningful",
    accessibility_notes:
      "Chapel venues vary in location across Bali from resort-integrated settings to standalone architectural spaces; guest capacity and seating are defined by the chapel structure and must be planned accordingly; each chapel may have specific guidelines and regulations that must be respected",
    seasonal_considerations:
      "Controlled indoor environments provide weather-independent reliability; natural and artificial lighting must be carefully aligned for ceremony timing; indoor chapel settings offer consistent atmosphere regardless of season or weather conditions",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775361533/chapel-wedding_ejqsqz.png",
    guest_capacity: "10 - 150",
    highlights: [
      "Defined architectural spaces with clean lines and visual symmetry",
      "Controlled environment providing comfort and consistency in any weather",
      "Intimate and focused ceremony atmosphere",
      "Ocean view and landscape-framed chapel settings across Bali",
      "Seamless integration with nearby reception areas and resort venues",
    ],
    best_for: [
      "Couples seeking a structured and elegantly composed ceremony environment",
      "A refined and timeless setting protected from outdoor conditions",
      "Ceremonies where architecture and light shape the emotional experience",
      "Intimate gatherings with a formal and focused atmosphere",
      "A wedding that feels classic, elegant, and beautifully orchestrated",
    ],
    ceremony_options: [
      "Intimate chapel ceremonies within resort and private estate settings",
      "Ocean view chapel ceremonies with framed landscape surroundings",
      "Destination chapel ceremonies with full planning and design integration",
      "Intimate chapel elopements with a calm and focused atmosphere",
      "Luxury resort chapel ceremonies with seamless reception transitions",
    ],
    reception_options: [
      "Seamless chapel to reception transitions within resort environments",
      "Intimate indoor receptions following structured chapel ceremonies",
      "Garden and terrace receptions connected to chapel ceremony spaces",
      "Multi-space resort celebrations flowing from chapel to open-air dining",
      "Candlelit and elegantly styled evening receptions",
    ],
    accommodation_nearby: [
      "Luxury resort properties with integrated chapel and reception venues",
      "Boutique hotels and private villas near chapel settings",
      "Highland and lakeside accommodations with nearby architectural venues",
      "Full-service resort properties with comprehensive guest amenities",
    ],
    dining_experiences: [
      "Resort fine dining and gourmet catering within elegant settings",
      "Private chef and bespoke multi-course dinner experiences",
      "Intimate candlelit receptions with refined styling and ambiance",
      "Sunset cocktail and evening reception flows following chapel ceremonies",
    ],
    unique_features: [
      "A ceremony framed by architecture, light, and beautifully composed symmetry",
      "A controlled and intimate environment focused entirely on the couple",
      "Weather-independent reliability within an elegant and refined setting",
      "A wedding experience that feels timeless, composed, and deeply meaningful",
      "Access to Bali's most refined architectural ceremony spaces",
    ],
  },
];
