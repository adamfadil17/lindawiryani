import type { WeddingConceptsContent } from "@/lib/data/base/wedding-concepts-base";

// Teks wedding-concepts (de). Dikunci per nomor layer; field lain ada di base/.
export const content: WeddingConceptsContent = {
  venueCurationConsiderations: [
    "Architektonische Identität und Umgebung",
    "Atmosphäre und Ortscharakter",
    "Ablauf von Zeremonie und Empfang",
    "Gästekomfort und Logistik",
    "Gestalterische Flexibilität und Einschränkungen",
    "Harmonie zwischen Location und Vision",
  ],
  stylingFocusAreas: [
    "Räumliche Ausgewogenheit",
    "Natürliche Materialpaletten",
    "Geschichtete Texturen",
    "Durchdachte Blumen und Installationen",
    "Bewusster Einsatz von Farbe und Leerraum",
    "Stimmigkeit zwischen Zeremonie- und Feierbereichen",
  ],
  editorialSources: [
    "Architektur und Landschaft",
    "Mode und Handwerkskunst",
    "Kunst, Kultur und Reisen",
    "Licht, Bewegung und Emotion",
  ],
  conceptLayers: {
    "01": {
      title: "Location-Kuratierung",
      subtitle: "Das Fundament",
      desc: "Die Kuratierung der Location ist das Fundament jeder Hochzeit, die wir gestalten. Statt ein erschöpfendes Verzeichnis zu präsentieren, bieten wir einen sorgfältig ausgewählten Überblick über Locations nach Gebiet – damit Paare Ortscharakter, Location-Stil und ungefähre Einstiegsbudgets verstehen können.",
      tag: "Location-Kuratierung",
      supports: [
        "Destination Weddings auf Bali",
        "Hochzeiten in Privatvillen",
        "Intime Hochzeiten & Elopements",
      ],
    },
    "02": {
      title: "Hochzeitsthemen",
      subtitle: "Emotionale Richtung",
      desc: "Hochzeitsthemen helfen Paaren, das Gefühl ihrer Feier zu klären, statt Dekoration vorzugeben. Unsere Themen sind keine Trends. Sie sind emotionale Rahmen – sie leiten, wie Raum, Tempo und Atmosphäre zusammenfinden.",
      tag: "Themen",
      supports: [
        "Größe und Intimität",
        "Zeremonie-Stil",
        "Gästeerlebnis",
      ],
    },
    "03": {
      title: "Styling-Konzepte",
      subtitle: "Vision, sichtbar gemacht",
      desc: "Styling-Konzepte übersetzen Vision in physische Form. Hier wird Atmosphäre sichtbar – durch Komposition, Materialität, Textur und Zurückhaltung. Beim Styling geht es nie um Überfluss, sondern um Klarheit und Harmonie.",
      tag: "Styling",
      supports: [
        "Luxushochzeiten auf Bali",
        "Hochzeiten in Privatvillen",
        "Intime Feiern",
      ],
    },
    "04": {
      title: "Redaktionelle Inspiration",
      subtitle: "Wo das Storytelling beginnt",
      desc: "Redaktionelle Inspiration ist der Ausgangspunkt des Storytellings. Statt Trends zu kopieren, schöpfen wir aus Architektur, Mode, Kunst, Kultur und Reisen – sie verbinden Vorstellung und Wirklichkeit und leiten sowohl die kreative Richtung als auch die Umsetzung.",
      tag: "Redaktionell",
      supports: [
        "Portfolio-Geschichten",
        "Journal-Artikel",
        "Styling-Konzepte",
      ],
    },
  },
  planningJourney: [
    "Ihr Konzept klären",
    "Die richtige Umgebung entdecken",
    "Ihre Design-Erzählung formen",
    "Das Gästeerlebnis kuratieren",
    "Mit ruhiger Präzision umsetzen",
  ],
};
