import type { ServicesContent } from "@/lib/data/base/services-base";

// Teks services (de). Dikunci per service id / nomor; field lain ada di base/.
export const content: ServicesContent = {
  services: {
    "full-wedding-planning": {
      name: "Komplette Hochzeitsplanung & -koordination",
      tag: "Rundum",
      intro: "Hochzeitsplanung von A bis Z für Destination Weddings, Privatvillen und erlesene Feiern auf Bali. Wir begleiten Ihren Weg vom Konzept bis zur Umsetzung mit ruhiger Präzision und den Standards der Fünf-Sterne-Gastfreundschaft.",
      includes: {
        title: "Das umfasst diese Leistung",
        items: [
          "Hochzeitskonzept & kreative Leitung",
          "Location-Suche & Machbarkeitsprüfung",
          "Dienstleistermanagement & Budgetierung",
          "Styling, Zeitplan & Ablaufplanung",
          "Vollständige Koordination am Hochzeitstag",
        ],
      },
      bestFor: {
        title: "Ideal für",
        desc: "Destination Weddings, Luxushochzeiten, Hochzeiten in Privatvillen und Paare, die ein vollständig betreutes Erlebnis wünschen.",
      },
    },
    "wedding-styling": {
      name: "Hochzeitsstyling & kreative Leitung",
      tag: "Designorientiert",
      intro: "Designorientiertes Hochzeitsstyling auf Bali mit Fokus auf Atmosphäre, räumliche Schönheit und emotionales Storytelling.",
      includes: {
        title: "Unser Styling-Ansatz",
        items: [
          "Moodboards & visuelles Storytelling",
          "Farbpalette & Materialrichtung",
          "Styling von Zeremonie & Empfang",
          "Beratung zu Blumen & Tischästhetik",
        ],
      },
      bestFor: {
        title: "Ideal für",
        desc: "Paare, die bereits Unterstützung bei der Planung haben, aber ein starkes, stimmiges Luxusdesign wünschen.",
      },
    },
    "private-villa-weddings": {
      name: "Spezialistin für Hochzeiten in Privatvillen auf Bali",
      tag: "Villa & Anwesen",
      intro: "Wir sind darauf spezialisiert, Privatvillen und Anwesen auf ganz Bali in wunderschön strukturierte Hochzeitslocations zu verwandeln.",
      includes: {
        title: "Leistungen für Villenhochzeiten",
        items: [
          "Standortanalyse & Layoutplanung",
          "Gästefluss & Produktionsplanung",
          "Styling & Schaffung von Atmosphäre",
          "Vollständige Koordination für Privatanwesen",
        ],
      },
      bestFor: {
        title: "Ideal für",
        desc: "Private Anwesen, Boutique-Villen, verborgene Orte und Hochzeiten außerhalb von Hotels.",
      },
    },
    "intimate-elopements": {
      name: "Intime Hochzeiten & Elopements auf Bali",
      tag: "Intim",
      intro: "Ruhige, bedeutungsvolle Hochzeiten, gestaltet um Verbundenheit, Natur und bewusste Schlichtheit.",
      includes: {
        title: "Leistungen für intime Hochzeiten & Elopements",
        items: [
          "Beratung zu Ort & Konzept",
          "Minimalistisches oder erlesenes Dekor",
          "Symbolischer Zeremonieablauf",
          "Koordination vertrauenswürdiger Dienstleister",
        ],
      },
      bestFor: {
        title: "Ideal für",
        desc: "Elopements, Micro-Weddings, Erneuerung des Eheversprechens und seelenvolle Destination-Zeremonien.",
      },
    },
    "concept-consultation": {
      name: "Hochzeitskonzept- & Designberatung",
      tag: "Beratung",
      intro: "Eine fokussierte Leistung für Paare, die professionelle Begleitung suchen, bevor sie sich für eine komplette Planung entscheiden.",
      includes: {
        title: "Die Beratung umfasst",
        items: [
          "Verfeinerung von Vision & Thema",
          "Designrichtung",
          "Einblicke in Budget & Machbarkeit",
          "Kreative Roadmap",
        ],
      },
      bestFor: {
        title: "Ideal für",
        desc: "Frühe Planungsphase, kreative Klarheit und Design-Validierung.",
      },
    },
    "event-table-styling": {
      name: "Event- & Tischstyling auf Bali",
      tag: "Styling",
      intro: "Kuratierte Zeremonieräume und erlesene Tischgestaltung, die das Gästeerlebnis aufwerten.",
      includes: {
        title: "Umfang des Stylings",
        items: [
          "Styling von Zeremonie & Empfang",
          "Konzepte für Tischgestaltung & Dinner",
          "Räumliche Harmonie & Detailkuratierung",
          "Styling-Begleitung vor Ort",
        ],
      },
      bestFor: {
        title: "Ideal für",
        desc: "Paare, die eine wunderschön gestylte Feier ohne vollständige Planungskoordination wünschen.",
      },
    },
    "guest-management": {
      name: "Gästemanagement für Destination Weddings",
      tag: "Zusatzleistung",
      intro: "Unterstützung bei Destination Weddings, die Ihnen und Ihren Gästen auf Bali ein nahtloses Erlebnis sichert.",
      includes: {
        title: "Gästeleistungen können umfassen",
        items: [
          "Gästekommunikation & Infopakete",
          "Koordination von Transfers & Unterkünften",
          "Planung des Hochzeitsprogramms",
          "Betreuung der Gäste vor Ort",
        ],
      },
      bestFor: {
        title: "Ideal für",
        desc: "Internationale Paare, die Gäste aus dem Ausland mitbringen und ein rundum betreutes Bali-Erlebnis benötigen.",
      },
    },
  },
  whyChooseReasons: {
    "01": {
      title: "Fast zwei Jahrzehnte in der Luxushotellerie",
      desc: "Unser Fundament stammt aus fast zwanzig Jahren in der Fünf-Sterne-Hotellerie. Diese Erfahrung prägt, wie wir Hochzeiten planen, gestalten und umsetzen – nicht nur schön, sondern nahtlos. Ablauf, Timing, Gästekomfort und emotionaler Rhythmus stehen bei jeder Feier, die wir kuratieren, im Mittelpunkt.",
    },
    "02": {
      title: "Hochzeitsstudio mit Sitz auf Bali",
      desc: "Mit Sitz auf Bali bringen wir tiefes lokales Verständnis, vertrauenswürdige professionelle Netzwerke und Wissen vor Ort in jede Hochzeit ein. So können wir Locations, Dienstleister und Produktionsteams präzise kuratieren.",
    },
    "03": {
      title: "Designorientierte Methodik",
      desc: "Jede Hochzeit beginnt mit einem Konzept. Statt Schablonen entwickeln wir jede Feier über Stimmung, Material, Proportion und räumliches Gespür. Unsere Rolle reicht von der Planung bis zur kreativen Leitung.",
    },
    "04": {
      title: "Spezialisten für intime Hochzeiten & Privatvillen",
      desc: "Wir sind bekannt dafür, intime Hochzeiten zu gestalten und Privatvillen in wunderschön strukturierte Hochzeitsumgebungen zu verwandeln – vom abgeschiedenen Elopement bis zur mehrtägigen Villenfeier.",
    },
    "05": {
      title: "Ruhig, strukturiert, ohne Schablone",
      desc: "Unser Studio nimmt jedes Jahr nur eine begrenzte Zahl von Hochzeiten an, um Klarheit, Präsenz und Liebe zum Detail zu sichern. Jedes Projekt folgt einem erprobten Prozess, damit Paare ihren Weg zur Hochzeit mit Leichtigkeit und Vertrauen erleben.",
    },
  },
  serviceDestinations: [
    "Destination-Wedding-Erlebnisse auf Bali und in ganz Indonesien",
    "Hochzeiten in Privatvillen auf Bali",
    "Intime Hochzeiten und Elopements auf Bali",
    "Luxushochzeiten auf Bali",
  ],
};
