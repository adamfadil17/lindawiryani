import type { WeddingConceptsContent } from "@/lib/data/base/wedding-concepts-base";

// Teks wedding-concepts (fr). Dikunci per nomor layer; field lain ada di base/.
export const content: WeddingConceptsContent = {
  venueCurationConsiderations: [
    "Identité architecturale et cadre",
    "Atmosphère et sens du lieu",
    "Déroulement de la cérémonie et de la réception",
    "Confort des invités et logistique",
    "Flexibilité et contraintes de design",
    "Harmonie entre le lieu et la vision",
  ],
  stylingFocusAreas: [
    "Équilibre spatial",
    "Palettes de matériaux naturels",
    "Textures superposées",
    "Fleurs et installations réfléchies",
    "Usage intentionnel de la couleur et de l'espace négatif",
    "Cohésion entre les espaces de cérémonie et de célébration",
  ],
  editorialSources: [
    "Architecture et paysage",
    "Mode et artisanat",
    "Art, culture et voyage",
    "Lumière, mouvement et émotion",
  ],
  conceptLayers: {
    "01": {
      title: "Sélection du Lieu",
      subtitle: "Le Fondement",
      desc: "La sélection du lieu est le fondement de chaque mariage que nous concevons. Plutôt que de présenter un répertoire exhaustif, nous proposons un aperçu soigneusement sélectionné par région — pour aider les couples à comprendre le caractère du lieu, le style des sites et les budgets de départ indicatifs.",
      tag: "Sélection du Lieu",
      supports: [
        "Mariages de Destination à Bali",
        "Mariages en Villa Privée",
        "Mariages Intimes & Elopements",
      ],
    },
    "02": {
      title: "Thèmes de Mariage",
      subtitle: "Direction Émotionnelle",
      desc: "Les thèmes de mariage aident les couples à clarifier l'émotion de leur célébration plutôt qu'à dicter la décoration. Nos thèmes ne sont pas des tendances. Ce sont des cadres émotionnels — guidant comment l'espace, le rythme et l'atmosphère s'unissent.",
      tag: "Thèmes",
      supports: [
        "Échelle et Intimité",
        "Style de Cérémonie",
        "Expérience Invités",
      ],
    },
    "03": {
      title: "Concepts de Style",
      subtitle: "La Vision Rendue Visible",
      desc: "Les concepts de style traduisent la vision en forme physique. C'est ici que l'atmosphère devient visible — à travers la composition, la matérialité, la texture et la retenue. Le style n'est jamais une question d'excès. C'est une question de clarté et d'harmonie.",
      tag: "Style",
      supports: [
        "Mariages de Luxe à Bali",
        "Mariages en Villa Privée",
        "Célébrations Intimes",
      ],
    },
    "04": {
      title: "Inspiration Éditoriale",
      subtitle: "Où le Récit Commence",
      desc: "L'inspiration éditoriale est le point de départ du récit. Plutôt que de copier les tendances, nous puisons notre inspiration dans l'architecture, la mode, l'art, la culture et le voyage — reliant l'imagination et la réalité pour guider à la fois la direction créative et l'exécution.",
      tag: "Éditorial",
      supports: [
        "Récits de Portfolio",
        "Articles du Journal",
        "Concepts de Style",
      ],
    },
  },
  planningJourney: [
    "Clarifier votre concept",
    "Découvrir le bon environnement",
    "Façonner votre récit de design",
    "Sélectionner l'expérience invités",
    "Exécuter avec une précision sereine",
  ],
};
