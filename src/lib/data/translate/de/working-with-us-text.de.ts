import type { WorkingWithUsContent } from "@/lib/data/base/working-with-us-base";

// Teks working-with-us (de). Dikunci per key; urutan ada di base/.
export const content: WorkingWithUsContent = {
  vendorCategories: {
    photography: "Fotografie",
    videography: "Videografie",
    "floral-decor": "Blumen & Dekor",
    "catering-fb": "Catering & Gastronomie",
    "live-music-entertainment": "Live-Musik & Unterhaltung",
    "hair-makeup": "Haare & Make-up",
    "lighting-av": "Licht- & Veranstaltungstechnik",
    transportation: "Transport",
    "stationery-printing": "Papeterie & Druck",
    venue: "Location",
    other: "Sonstiges",
  },
  openPositions: {
    "wedding-planner-coordinator": {
      title: "Hochzeitsplaner:in & Koordinator:in",
      type: "Vollzeit",
      level: "Mittel bis Senior",
      desc: "Leitung der kompletten Planung und der Umsetzung vor Ort bei luxuriösen Destination Weddings auf Bali.",
    },
    "creative-design-consultant": {
      title: "Kreative:r Designberater:in",
      type: "Vollzeit",
      level: "Senior",
      desc: "Konzeption und Umsetzung individueller ästhetischer Erzählungen, Moodboards und Designvorschläge für Paare.",
    },
    "client-relations-executive": {
      title: "Client Relations Executive",
      type: "Vollzeit",
      level: "Mittleres Level",
      desc: "Erste Anlaufstelle für internationale Paare: Anfragen, Beratungsgespräche und die laufende Kommunikation.",
    },
    "social-media-content-creator": {
      title: "Social Media & Content Creator",
      type: "Teilzeit / Freelance",
      level: "Alle Level",
      desc: "Überzeugende Inhalte von unseren Events für Instagram, Pinterest und mehr einfangen und gestalten.",
    },
  },
  vendorValues: {
    "01": {
      title: "Ästhetische Übereinstimmung",
      desc: "Wir arbeiten nur mit Dienstleistern, deren Arbeit unseren Anspruch an Schönheit und Bewusstheit widerspiegelt.",
    },
    "02": {
      title: "Verlässlichkeit & Handwerkskunst",
      desc: "Gleichbleibende Qualität und Professionalität bei jedem Event, das wir gemeinsam umsetzen.",
    },
    "03": {
      title: "Geist der Zusammenarbeit",
      desc: "Wir glauben, dass großartige Hochzeiten gemeinsam gestaltet werden – nicht nur koordiniert.",
    },
    "04": {
      title: "Kulturelle Sensibilität",
      desc: "Tiefer Respekt vor den Traditionen und Bedeutungen, die in jeder Zeremonie stecken.",
    },
  },
};
