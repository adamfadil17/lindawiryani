import type { WeddingConceptsContent } from "@/lib/data/base/wedding-concepts-base";

// Teks wedding-concepts (en). Dikunci per nomor layer; field lain ada di base/.
export const content: WeddingConceptsContent = {
  venueCurationConsiderations: [
    "Architectural identity and setting",
    "Atmosphere and sense of place",
    "Ceremony and reception flow",
    "Guest comfort and logistics",
    "Design flexibility and restrictions",
    "Harmony between venue and vision",
  ],
  stylingFocusAreas: [
    "Spatial balance",
    "Natural material palettes",
    "Layered textures",
    "Thoughtful florals and installations",
    "Intentional use of colour and negative space",
    "Cohesion between ceremony and celebration areas",
  ],
  editorialSources: [
    "Architecture and landscape",
    "Fashion and craftsmanship",
    "Art, culture, and travel",
    "Light, movement, and emotion",
  ],
  conceptLayers: {
    "01": {
      title: "Venue Curation",
      subtitle: "The Foundation",
      desc: "Venue curation is the foundation of every wedding we design. Rather than presenting an exhaustive directory, we provide a carefully selected overview of venues by area — to help couples understand location character, venue style, and indicative starting budgets.",
      tag: "Venue Curation",
      supports: [
        "Destination Weddings in Bali",
        "Private Villa Weddings",
        "Intimate & Elopement Weddings",
      ],
    },
    "02": {
      title: "Wedding Themes",
      subtitle: "Emotional Direction",
      desc: "Wedding themes help couples clarify the feeling of their celebration rather than dictate decoration. Our themes are not trends. They are emotional frameworks — guiding how space, pacing, and atmosphere come together.",
      tag: "Themes",
      supports: [
        "Scale and Intimacy",
        "Ceremony Style",
        "Guest Experience",
      ],
    },
    "03": {
      title: "Styling Concepts",
      subtitle: "Vision Made Visible",
      desc: "Styling concepts translate vision into physical form. This is where atmosphere becomes visible — through composition, materiality, texture, and restraint. Styling is never about excess. It is about clarity and harmony.",
      tag: "Styling",
      supports: [
        "Luxury Weddings in Bali",
        "Private Villa Weddings",
        "Intimate Celebrations",
      ],
    },
    "04": {
      title: "Editorial Inspiration",
      subtitle: "Where Storytelling Begins",
      desc: "Editorial inspiration is where storytelling begins. Rather than copying trends, we draw inspiration from architecture, fashion, art, culture, and travel — bridging imagination and reality to guide both creative direction and execution.",
      tag: "Editorial",
      supports: [
        "Portfolio Stories",
        "Journal Articles",
        "Styling Concepts",
      ],
    },
  },
  planningJourney: [
    "Clarifying your concept",
    "Discovering the right environment",
    "Shaping your design narrative",
    "Curating guest experience",
    "Executing with calm precision",
  ],
};
