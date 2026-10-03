import type { ServicesContent } from "@/lib/data/base/services-base";

// Teks services (fr). Dikunci per service id / nomor; field lain ada di base/.
export const content: ServicesContent = {
  services: {
    "full-wedding-planning": {
      name: "Planification & Coordination Complète du Mariage",
      tag: "De Bout en Bout",
      intro: "Services de planification de mariage de bout en bout pour les mariages de destination, villas privées et célébrations raffinées à Bali. Nous gérons votre parcours nuptial du concept à la réalisation avec une précision sereine et des standards d'hospitalité cinq étoiles.",
      includes: {
        title: "Ce Que Ce Service Comprend",
        items: [
          "Concept de mariage & direction créative",
          "Recherche de lieu & étude de faisabilité",
          "Gestion des prestataires & budgétisation",
          "Style, calendrier & planification du déroulement",
          "Coordination complète le jour J",
        ],
      },
      bestFor: {
        title: "Idéal Pour",
        desc: "Les mariages de destination, mariages de luxe, mariages en villa privée, et les couples recherchant une expérience entièrement gérée.",
      },
    },
    "wedding-styling": {
      name: "Style de Mariage & Direction Créative",
      tag: "Axé Design",
      intro: "Style de mariage axé sur le design à Bali, centré sur l'atmosphère, la beauté spatiale et la narration émotionnelle.",
      includes: {
        title: "Notre Approche du Style",
        items: [
          "Moodboards & narration visuelle",
          "Palette de couleurs & direction des matériaux",
          "Style de cérémonie & réception",
          "Conseils esthétiques floraux & de table",
        ],
      },
      bestFor: {
        title: "Idéal Pour",
        desc: "Les couples ayant déjà un accompagnement de planification mais souhaitant un design de luxe fort et cohérent.",
      },
    },
    "private-villa-weddings": {
      name: "Spécialiste des Mariages en Villa Privée à Bali",
      tag: "Villa & Domaine",
      intro: "Nous sommes spécialisés dans la transformation de villas et domaines privés en lieux de mariage magnifiquement structurés à travers Bali.",
      includes: {
        title: "Services de Mariage en Villa",
        items: [
          "Étude du site & planification de l'agencement",
          "Cartographie du flux des invités & de la production",
          "Style & création d'atmosphère",
          "Coordination complète pour propriétés privées",
        ],
      },
      bestFor: {
        title: "Idéal Pour",
        desc: "Domaines privés, villas boutique, lieux secrets, et mariages hors hôtel.",
      },
    },
    "intimate-elopements": {
      name: "Mariages Intimes & Elopements à Bali",
      tag: "Intime",
      intro: "Des mariages paisibles et significatifs conçus autour de la connexion, de la nature et de la simplicité intentionnelle.",
      includes: {
        title: "Services Intimes & Elopement",
        items: [
          "Conseils sur le lieu & le concept",
          "Décor minimaliste ou raffiné",
          "Déroulement de cérémonie symbolique",
          "Coordination de prestataires de confiance",
        ],
      },
      bestFor: {
        title: "Idéal Pour",
        desc: "Elopements, micro-mariages, renouvellements de vœux, et cérémonies de destination pleines d'âme.",
      },
    },
    "concept-consultation": {
      name: "Consultation Concept & Design de Mariage",
      tag: "Consultation",
      intro: "Un service ciblé pour les couples recherchant des conseils professionnels avant de s'engager dans une planification complète.",
      includes: {
        title: "La Consultation Couvre",
        items: [
          "Raffinement de la vision & du thème",
          "Direction de design",
          "Aperçus budgétaires & de faisabilité",
          "Feuille de route créative",
        ],
      },
      bestFor: {
        title: "Idéal Pour",
        desc: "La planification en phase précoce, la clarté créative, et la validation du design.",
      },
    },
    "event-table-styling": {
      name: "Style d'Événement & de Table à Bali",
      tag: "Style",
      intro: "Des espaces de cérémonie sélectionnés et des tablescapes raffinées qui rehaussent l'expérience des invités.",
      includes: {
        title: "Portée du Style",
        items: [
          "Style de cérémonie & réception",
          "Tablescape & concepts de restauration",
          "Harmonie spatiale & sélection des détails",
          "Supervision du style sur site",
        ],
      },
      bestFor: {
        title: "Idéal Pour",
        desc: "Les couples recherchant une célébration magnifiquement stylisée sans coordination de planification complète.",
      },
    },
    "guest-management": {
      name: "Gestion des Invités de Destination",
      tag: "Complément",
      intro: "Un accompagnement de mariage de destination garantissant une expérience fluide pour vous et vos invités à Bali.",
      includes: {
        title: "Les Services aux Invités Peuvent Inclure",
        items: [
          "Communication avec les invités & kits d'information",
          "Coordination des transferts & de l'hébergement",
          "Planification de l'itinéraire du mariage",
          "Assistance aux invités sur site",
        ],
      },
      bestFor: {
        title: "Idéal Pour",
        desc: "Les couples internationaux accueillant des invités venus de l'étranger qui ont besoin d'une expérience balinaise entièrement accompagnée.",
      },
    },
  },
  whyChooseReasons: {
    "01": {
      title: "Près de Deux Décennies dans l'Hôtellerie de Luxe",
      desc: "Notre fondement provient de près de vingt ans passés dans des environnements d'hôtellerie cinq étoiles. Cette expérience façonne notre façon de planifier, concevoir et exécuter les mariages — non seulement avec beauté, mais aussi avec fluidité. Le déroulement, le timing, le confort des invités et le rythme émotionnel sont au cœur de chaque célébration que nous orchestrons.",
    },
    "02": {
      title: "Studio de Mariage Basé à Bali",
      desc: "Basés à Bali, nous apportons une compréhension locale approfondie, des réseaux professionnels de confiance et une connaissance du terrain à chaque mariage. Cela nous permet de sélectionner lieux, prestataires et équipes de production avec précision.",
    },
    "03": {
      title: "Méthodologie Axée sur le Design",
      desc: "Chaque mariage commence par un concept. Plutôt que des modèles, nous développons chaque célébration à travers l'ambiance, les matériaux, les proportions et la conscience spatiale. Notre rôle s'étend au-delà de la planification jusqu'à la direction créative.",
    },
    "04": {
      title: "Spécialistes des Mariages Intimes & en Villa Privée",
      desc: "Nous sommes reconnus pour concevoir des mariages intimes et transformer des villas privées en environnements de mariage magnifiquement structurés — des elopements isolés aux célébrations en villa sur plusieurs jours.",
    },
    "05": {
      title: "Serein, Structuré, Sans Modèle",
      desc: "Notre studio accepte un nombre limité de mariages chaque année pour garantir clarté, présence et souci du détail. Chaque projet suit un processus raffiné, permettant aux couples de vivre leur parcours nuptial avec sérénité et confiance.",
    },
  },
  serviceDestinations: [
    "Expériences de mariage de destination à travers Bali et l'Indonésie",
    "Mariages en villa privée à Bali",
    "Mariages intimes et elopements à Bali",
    "Mariages de luxe à Bali",
  ],
};
