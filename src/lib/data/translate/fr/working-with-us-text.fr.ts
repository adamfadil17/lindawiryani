import type { WorkingWithUsContent } from "@/lib/data/base/working-with-us-base";

// Teks working-with-us (fr). Dikunci per key; urutan ada di base/.
export const content: WorkingWithUsContent = {
  vendorCategories: {
    photography: "Photographie",
    videography: "Vidéographie",
    "floral-decor": "Fleurs & Décoration",
    "catering-fb": "Traiteur & Restauration",
    "live-music-entertainment": "Musique Live & Animation",
    "hair-makeup": "Coiffure & Maquillage",
    "lighting-av": "Éclairage & Audiovisuel",
    transportation: "Transport",
    "stationery-printing": "Papeterie & Impression",
    venue: "Lieu",
    other: "Autre",
  },
  openPositions: {
    "wedding-planner-coordinator": {
      title: "Wedding Planner & Coordinateur(trice)",
      type: "Temps plein",
      level: "Confirmé–Senior",
      desc: "Diriger la planification complète et l'exécution sur site de mariages de destination de luxe à Bali.",
    },
    "creative-design-consultant": {
      title: "Consultant(e) en Design Créatif",
      type: "Temps plein",
      level: "Senior",
      desc: "Concevoir et livrer des récits esthétiques sur mesure, moodboards et propositions de design pour les couples.",
    },
    "client-relations-executive": {
      title: "Chargé(e) des Relations Clients",
      type: "Temps plein",
      level: "Confirmé",
      desc: "Être le premier point de contact des couples internationaux, gérer les demandes, consultations et la communication continue.",
    },
    "social-media-content-creator": {
      title: "Créateur(trice) de Contenu & Réseaux Sociaux",
      type: "Temps partiel / Freelance",
      level: "Tous niveaux",
      desc: "Capturer et créer des contenus captivants de nos événements pour Instagram, Pinterest et au-delà.",
    },
  },
  vendorValues: {
    "01": {
      title: "Alignement Esthétique",
      desc: "Nous ne collaborons qu'avec des prestataires dont le travail reflète notre exigence de beauté et d'intention.",
    },
    "02": {
      title: "Fiabilité & Savoir-faire",
      desc: "Constance de la qualité et du professionnalisme sur chaque événement que nous produisons ensemble.",
    },
    "03": {
      title: "Esprit Collaboratif",
      desc: "Nous croyons que les grands mariages se co-créent — ils ne se contentent pas de se coordonner.",
    },
    "04": {
      title: "Sensibilité Culturelle",
      desc: "Un profond respect pour les traditions et les significations propres à chaque cérémonie.",
    },
  },
};
