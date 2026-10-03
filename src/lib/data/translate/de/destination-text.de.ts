import type { DestinationContent } from "@/lib/data/base/destination-base";

// Teks destination (de). Dikunci per slug; field lain ada di base/.
//
// Konvensi nama tempat (SEO de):
// - Nama tempat tetap dalam bentuk Latin (Bali, Ubud, Uluwatu, ...), karena itu yang dicari
//   pengguna di Jerman. Hanya kata penunjuk arah/wilayah yang diterjemahkan (Süd-Bali, Ost-Bali, ...).
// - Nama bisnis, hotel, dan venue tidak diterjemahkan.
const categoryNames: DestinationContent["categoryNames"] = {
  "cat-bali": "Bali",
  "cat-themes": "Themen",
  "cat-islands": "Inseln",
  "cat-outsite-bali": "Außerhalb von Bali",
};

const locationNames: DestinationContent["locationNames"] = {
  "South Bali": "Süd-Bali",
  "Ubud & Gianyar": "Ubud & Gianyar",
  "West Bali": "West-Bali",
  "Nusa Islands": "Nusa-Inseln",
  Lombok: "Lombok",
  Sumba: "Sumba",
  Java: "Java",
  "East Bali": "Ost-Bali",
  "North Bali": "Nord-Bali",
  "Highlands, Lakes and Mountains": "Hochland, Seen und Berge",
  "Ubud & Gianyar, North Bali, West Bali":
    "Ubud & Gianyar, Nord-Bali, West-Bali",
  "South Bali, Ubud & Gianyar, East Bali, North Bali, West Bali":
    "Süd-Bali, Ubud & Gianyar, Ost-Bali, Nord-Bali, West-Bali",
  "Ubud & Gianyar, East Bali, North Bali, West Bali":
    "Ubud & Gianyar, Ost-Bali, Nord-Bali, West-Bali",
  "South Bali, East Bali, North Bali": "Süd-Bali, Ost-Bali, Nord-Bali",
  "Ubud & Gianyar, East Bali": "Ubud & Gianyar, Ost-Bali",
  "Ubud & Gianyar, East Bali, West Bali": "Ubud & Gianyar, Ost-Bali, West-Bali",
  "South Bali, Ubud & Gianyar, Highlands, Lakes and Mountains":
    "Süd-Bali, Ubud & Gianyar, Hochland, Seen und Berge",
  "Ubud, South Bali": "Ubud, Süd-Bali",
};

const destinationText: DestinationContent["destinationText"] = {
  "uluwatu-wedding": {
    name: "Uluwatu",
    type: "Luxus an den Klippen",
    description:
      "Dramatische Klippen am Meer, offene Horizonte und architektonische Locations – ideal für filmreife Luxus-Destination-Weddings und Zeremonien bei Sonnenuntergang, geprägt von Weite und Eleganz.",
    long_description:
      "Uluwatu ist eine der atemberaubendsten Hochzeitsdestinationen Balis, bekannt für dramatische Klippen, weite Meerblicke und unvergessliche Sonnenuntergänge über dem Indischen Ozean. Wir gestalten Hochzeiten in Uluwatu, die die Kraft der Landschaft aufgreifen – und Feiern schaffen, die gehoben, bewusst und visuell eindrucksvoll wirken. Unsere Hochzeiten in Uluwatu werden von offenen Horizonten, Meerwinden und dem Zusammenspiel von Architektur und Natur geprägt. Von privaten Villen auf den Klippen bis zu exklusiven Resorts direkt am Meer kuratieren wir unsere Hochzeiten in Uluwatu als vollständige Erlebnisse – nicht nur als schön dekorierte Events.",
    atmosphere:
      "Dramatisch und doch erlesen – weit, offen und lichtdurchflutet, wo der Ort selbst zur Zeremonie wird und einen starken Ortscharakter besitzt",
    accessibility_notes:
      "Bei manchen Locations gibt es Treppen, mehrstöckige Layouts oder eine Transportkoordination für Gäste und Dienstleister; Locations an den Klippen haben oft besondere Lautstärkebeschränkungen und Sperrstunden, die eingehalten werden müssen",
    seasonal_considerations:
      "Starke Meerwinde erfordern eine sorgfältige Auswahl von Zeremoniestrukturen, floralen Installationen und Dekorationselementen; der Zeitpunkt der Zeremonie wird präzise geplant, um das beste Licht bei Sonnenuntergang und die schönsten Fotomomente einzufangen",
    highlights: [
      "Dramatische Kalksteinklippen und weite Meerblicke",
      "Unvergessliche Sonnenuntergänge über dem Indischen Ozean",
      "Architektonische Villen auf den Klippen und Luxusresorts",
      "Exklusive Locations mit Privatsphäre und Grandeur",
      "Filmreife, designorientierte Hochzeitsumgebungen",
    ],
    best_for: [
      "Dramatische Zeremonieschauplätze an den Klippen",
      "Luxuriöse Umgebungen mit Privatsphäre und Exklusivität",
      "Paare, die visuelle Wirkung und Grandeur suchen",
      "Zeremonien bei Sonnenuntergang und Feiern an den Klippen",
      "Gehobene, filmreife Destination-Erlebnisse",
    ],
    ceremony_options: [
      "Zeremonien bei Sonnenuntergang am Klippenrand",
      "Schauplätze an den Klippen mit Blick aufs Meer",
      "Zeremonien in architektonischen Locations",
      "Zeremonien in Privatvillen und Anwesen",
      "Intime Elopements an den Klippen",
    ],
    reception_options: [
      "Empfänge am Infinity-Pool",
      "Dinner und Bankette an den Klippen",
      "Feiern in mehrstöckigen Locations",
      "Empfänge in luxuriösen Villenanwesen",
      "Cocktails bei Sonnenuntergang und fließende Abendempfänge",
    ],
    accommodation_nearby: [
      "Exklusive Villen und Resorts auf den Klippen",
      "Private Villenanwesen mit Personal",
      "Boutique-Luxushotels",
      "Hochwertige Resorts",
    ],
    dining_experiences: [
      "Restaurants von Weltklasse in Resorts",
      "Erlebnisse mit privatem Koch",
      "Dinner an den Klippen mit Meerblick",
      "Mehrgängige Dinner bei Sonnenuntergang",
      "Handwerklich erlesenes Catering",
    ],
    unique_features: [
      "Zeremonie am Klippenrand über dem Meer",
      "Sonnenuntergangsmomente, die filmreif wirken",
      "Architektonische Gestaltungsmöglichkeiten",
      "Exklusivität und Größe privater Locations",
      "Ikonisches Hochzeitserlebnis auf Bali",
    ],
  },
  "ubud-wedding": {
    name: "Ubud",
    type: "Spirituell & künstlerisch",
    description:
      "Dschungeltäler, Flüsse, Reisterrassen und spirituelle Tiefe – ideal für intime, künstlerische und emotional verwurzelte Hochzeiten in Natur und Kultur.",
    long_description:
      "Ubud ist eine der ikonischsten und seelenvollsten Hochzeitsdestinationen Balis, bekannt für üppigen Dschungel, Reisterrassen, Flusstäler und eine tiefe Verbindung zu Kultur und Natur. Wir gestalten Hochzeiten in Ubud, die über optische Schönheit hinausgehen – und Feiern schaffen, die immersiv, bewusst und emotional berührend wirken. Unsere Hochzeiten in Ubud werden von natürlichen Texturen, gefiltertem Licht und einer Stille geprägt, in der sich jeder Moment bodenständig und bedeutungsvoll anfühlt. Wir arbeiten mit Paaren, die wegen der Atmosphäre, der Verbundenheit mit der Natur und der Fähigkeit des Ortes zu Ubud kommen, ein zutiefst persönliches Hochzeitserlebnis zu schaffen.",
    atmosphere:
      "Ruhig und doch zutiefst ausdrucksstark – von der Natur geleitet und immersiv, intim und emotional verwurzelt, mit einer organischen Eleganz, geprägt von Dschungel, Tal und gefiltertem Licht",
    accessibility_notes:
      "Bei manchen Locations gibt es Stufen, Hänge oder natürliches Gelände, die eine sorgfältige Planung der Gästebewegung erfordern; viele Locations liegen versteckt in Dschungellandschaften und brauchen eine realistische Transportplanung",
    seasonal_considerations:
      "Dschungelumgebungen erfordern Vorbereitung auf Luftfeuchtigkeit und möglichen Regen; der Zeitpunkt wird sorgfältig geplant, um das schönste Licht in Wald- und Talumgebungen einzufangen; Klang und Ablauf des Events werden von der natürlichen und friedlichen Atmosphäre der Location beeinflusst",
    highlights: [
      "Üppiger Dschungel, Reisterrassen und Flusstäler",
      "Tiefe kulturelle und spirituelle Verbundenheit",
      "Gefiltertes natürliches Licht durch tropische Landschaften",
      "Boutique-Villen und Resorts, in die Natur integriert",
      "Intime und emotional berührende Atmosphäre",
    ],
    best_for: [
      "In die Natur integrierte Zeremonieschauplätze",
      "Paare, die Ruhe, Privatsphäre und emotionale Tiefe suchen",
      "Einzigartige, nicht traditionelle Location-Erlebnisse",
      "Intime und bedeutungsvolle Hochzeitsreisen",
      "Eine tiefere Verbindung zu Balis Kulturlandschaft",
    ],
    ceremony_options: [
      "Zeremonien im Dschungel und Wald",
      "Schauplätze am Fluss und im Tal",
      "Zeremoniekulissen vor Reisterrassen",
      "Zeremonien in Villengärten",
      "Heilige und spirituelle Orte",
    ],
    reception_options: [
      "Empfänge in Privatvillen und Boutique-Resorts",
      "Intime Zusammenkünfte in Öko-Resorts",
      "Dinner am Fluss, umgeben von Natur",
      "Gartenschauplätze mit organischem Design",
      "Mehrtägige Events im Retreat-Stil",
    ],
    accommodation_nearby: [
      "Private Dschungelvillen und Boutique-Resorts",
      "Heritage-Hotels mit kulturellem Charakter",
      "Wellness- und spirituelle Retreat-Zentren",
      "In die Natur integrierte Öko-Lodges",
    ],
    dining_experiences: [
      "Farm-to-Table- und Bio-Küche",
      "Traditionelle balinesische Kulinarik",
      "Immersive Naturerlebnisse mit privatem Koch",
      "Wellness-orientierte und ganzheitliche Menüs",
    ],
    unique_features: [
      "Eine Zeremonie, umgeben von Natur",
      "Stille und bedeutungsvolle Atmosphäre des Beisammenseins",
      "Immersives Erlebnis, geprägt von der Landschaft",
      "Zutiefst persönlich und emotional unvergesslich",
      "Möglichkeiten für mehrtägige Retreats",
    ],
  },
  "canggu-wedding": {
    name: "Canggu",
    type: "Zeitgenössische Villa",
    description:
      "Zeitgenössische Privatvillen, entspannte Küstenenergie und kreative Kultur – ideal für moderne Destination Weddings mit der Atmosphäre eines Lebensstils in Privatvillen.",
    long_description:
      "Canggu ist eine der dynamischsten Küstendestinationen Balis, bekannt für Strände mit schwarzem Sand, moderne Locations und eine lebendige kreative Energie, die Lebensstil, Design und Gemeinschaft verbindet. Wir gestalten Hochzeiten in Canggu, die seinen zeitgenössischen Geist widerspiegeln – und Feiern schaffen, die stilvoll, ausdrucksstark und durchdacht kuratiert wirken. Unsere Hochzeiten in Canggu werden von moderner Architektur, Licht bei Sonnenuntergang und einer Balance zwischen entspannter Atmosphäre und gehobenem Design geprägt. Von Privatvillen bis zu stilvollen Beach Clubs bietet Canggu vielseitige Locations für Hochzeiten, die Feier, Design und soziale Energie verbinden.",
    atmosphere:
      "Stilvoll und doch entspannt – kreativ, designorientiert und gesellig, weniger wie förmliche Events und mehr wie wunderschön kuratierte moderne Zusammenkünfte",
    accessibility_notes:
      "Gästetransport und Timing sollten besonders in Stoßzeiten sorgfältig gesteuert werden; in manchen Gegenden gibt es besondere Lautstärkebeschränkungen für Abendfeiern",
    seasonal_considerations:
      "Designelemente müssen Wind, Luftfeuchtigkeit und offene Küstenumgebungen berücksichtigen; der Zeitpunkt des Sonnenuntergangs ist auf Balis Westküste abgestimmt, um maximale Atmosphäre zu erzielen",
    highlights: [
      "Schauplätze in zeitgenössischen Villen und Beach Clubs",
      "Strände mit schwarzem Sand und Ausblicke auf den Sonnenuntergang",
      "Lebendige kreative und lifestyleorientierte Kultur",
      "Flexible, nicht traditionelle Location-Optionen",
      "Gesellige und erlebnisorientierte Hochzeitsatmosphären",
    ],
    best_for: [
      "Designorientierte und ästhetikgetriebene Paare",
      "Stilvolle Locations direkt am Strand und zeitgenössische Locations",
      "Flexible, nicht traditionelle Hochzeitsformate",
      "Gesellige und mitreißende Feiern",
      "Eine Balance aus entspannten und gehobenen Erlebnissen",
    ],
    ceremony_options: [
      "Zeremonien im Villengarten und am Pool",
      "Schauplätze am Strand und in Beach Clubs",
      "Zeitgenössische Räume zwischen Innen und Außen",
      "Zeremonien bei Sonnenuntergang auf dem Dach",
      "Intime moderne Elopements",
    ],
    reception_options: [
      "Events in der Villa-Lounge und Pool-Partys",
      "Empfänge im Beach Club",
      "Feiern in mehreren Innenräumen",
      "Lebendige Abendempfänge",
      "Zusammenkünfte in modernen Boutique-Locations",
    ],
    accommodation_nearby: [
      "Moderne Mietvillen",
      "Zeitgenössische Boutique-Resorts",
      "Stilvolle Hotels und Gästehäuser",
      "Beach-Club-Anlagen",
    ],
    dining_experiences: [
      "Zeitgenössische und internationale Küche",
      "Kulinarische Erlebnisse im Beach Club",
      "Villenservice mit privatem Koch",
      "Cocktails und Dinner bei Sonnenuntergang",
    ],
    unique_features: [
      "Feiern bei Sonnenuntergang mit zeitgenössischem Touch",
      "Gesellige und ausdrucksstarke Atmosphäre des Beisammenseins",
      "Kreative Gemeinschaft und gestalterische Flexibilität",
      "Lifestyle-orientierte mehrtägige Villenerlebnisse",
      "Moderne Küstenidentität der Hochzeit",
    ],
  },
  "seminyak-wedding": {
    name: "Seminyak",
    type: "Elegant & Boutique",
    description:
      "Boutique-Resorts, elegante Villen und zentrale Erreichbarkeit – ideal für erlesene Destination Weddings mit gepflegter Gastfreundschaft und lebendigen Gästeerlebnissen.",
    long_description:
      "Seminyak ist eine der erlesensten Küstendestinationen Balis, bekannt für gehobene Beach Clubs, stilvolle Locations und eine lebendige und zugleich raffinierte Atmosphäre, die Luxus mit Lebensstil verbindet. Wir gestalten Hochzeiten in Seminyak, die seinen gepflegten Charakter widerspiegeln – und Feiern schaffen, die elegant, zeitgemäß und mühelos kuratiert wirken. Unsere Hochzeiten in Seminyak werden von Licht bei Sonnenuntergang, erlesenen Räumen und einer nahtlosen Balance zwischen Design und Gästeerlebnis geprägt. Wir arbeiten mit Paaren, die Seminyak wegen der Kombination aus Schönheit direkt am Strand, hochwertigen Locations und einer weltoffenen und zugleich entspannten Energie wählen.",
    atmosphere:
      "Elegant und doch entspannt – erlesen und designbewusst, gesellig und wunderschön orchestriert, mit moderner Küstenraffinesse und zeitloser Anziehungskraft",
    accessibility_notes:
      "Ausgezeichnete Flughafenanbindung und gut ausgebaute Infrastruktur; Gästelogistik und Transport sollten so geplant werden, dass belebte Gegenden berücksichtigt werden; bei bestimmten Locations gibt es Lautstärkebeschränkungen und Sperrstunden, die sorgfältig eingeplant werden müssen",
    seasonal_considerations:
      "Der Zeitpunkt der Zeremonie ist auf Balis Sonnenuntergang abgestimmt, um das schmeichelhafteste Licht und die schönste Atmosphäre zu erzielen; Designelemente müssen Meeresbrise, Luftfeuchtigkeit und offene Umgebungen berücksichtigen; nahtlose Übergänge zwischen Zeremonie-, Cocktail- und Empfangsbereichen sind unerlässlich",
    highlights: [
      "Gehobene Beach Clubs und stilvolle Lifestyle-Locations",
      "Ikonische Schauplätze am Strand mit Balis Sonnenuntergang",
      "Luxusresorts und elegante Privatvillen",
      "Lebendige und zugleich raffinierte weltoffene Atmosphäre",
      "Erlesene Gastfreundschaft mit nahtlosen Gästeerlebnissen",
    ],
    best_for: [
      "Stilvolle und zeitgenössische Hochzeiten direkt am Strand",
      "Paare, die erlesene Eleganz mit sozialer Energie suchen",
      "Feiern bei Sonnenuntergang mit kuratiertem Ambiente",
      "Internationale Gäste, die leichte Erreichbarkeit benötigen",
      "Eine Balance zwischen Luxus und entspanntem Lebensstil",
    ],
    ceremony_options: [
      "Zeremonien bei Sonnenuntergang am Strand",
      "Schauplätze in Luxusresort-Gärten",
      "Zeremonien im Villenhof und am Pool",
      "Boutique-Beach-Club-Schauplätze",
      "Intime stilvolle Elopements",
    ],
    reception_options: [
      "Dinner-Empfänge direkt am Strand",
      "Bankette und Feiern auf Resortterrassen",
      "Empfänge im Villenstil",
      "Cocktails bei Sonnenuntergang und raffinierte Abendabläufe",
      "Location-Erlebnisse in mehreren Räumen",
    ],
    accommodation_nearby: [
      "Boutique-Luxusresorts und Beach Clubs",
      "Elegante Privatvillen",
      "Gehobene Hotels mit Lifestyle-Ausstattung",
      "Hochwertige Villenanwesen mit Personal",
    ],
    dining_experiences: [
      "Dinner in Resort- und Strandrestaurants",
      "Gehobenes Catering und mehrgängige Erlebnisse",
      "Cocktails bei Sonnenuntergang und Lifestyle-Dining",
      "Privatkoch und maßgeschneidertes Catering",
    ],
    unique_features: [
      "Feier bei Sonnenuntergang mit erlesenem Ambiente",
      "Stilvolle und gesellige Atmosphäre des Beisammenseins",
      "Nahtlose Verbindung von Luxus und Komfort",
      "Balis moderner Küstenlebensstil als Kulisse",
      "Gepflegtes Design und mühelose Umsetzung",
    ],
  },
  "sanur-wedding": {
    name: "Sanur",
    type: "Charme am Meer",
    description:
      "Ruhige Küsten, Heritage-Charme und zeitlose Eleganz am Meer – ideal für intime, familienfreundliche Destination Weddings in sanftem, unhektischem Rhythmus.",
    long_description:
      "Sanur ist eine der erlesensten Küstendestinationen Balis, bekannt für sanfte Strände, Ausblicke auf den Sonnenaufgang und eine stille Raffinesse, die sich deutlich von der lebhafteren Westküste der Insel unterscheidet. Wir gestalten Hochzeiten in Sanur, die seine ruhige Atmosphäre aufgreifen – und Feiern schaffen, die intim, elegant und tief mit dem natürlichen Rhythmus des Meeres verbunden wirken. Unsere Hochzeiten in Sanur werden von weichem Morgenlicht, Meeresbrisen und einem langsameren Tempo geprägt, in dem sich jeder Moment mit Absicht entfalten kann.",
    atmosphere:
      "Ruhig und doch wunderschön kuratiert – intim, weich, luftig und lichtdurchflutet, mit zeitloser Eleganz am Meer und einem langsameren, bedeutungsvolleren Tempo",
    accessibility_notes:
      "Ruhigere Alternative zu belebteren Gegenden, etablierte Boutique-Unterkünfte, ruhiger Küstenstreifen an der Ostküste; Zeremonien am Morgen werden bevorzugt, um die Mittagshitze zu vermeiden",
    seasonal_considerations:
      "Die Lage an der Ostküste bietet ruhigeres Wasser und mildere Wetterlagen; der Zeitpunkt bei Sonnenaufgang wird sorgfältig geplant, um optimales Morgenlicht und Fotobedingungen zu nutzen",
    highlights: [
      "Ruhige und sanfte Strände an der Ostküste",
      "Wunderschöne Schauplätze für Zeremonien bei Sonnenaufgang",
      "Heritage-Charme und stille Raffinesse",
      "Zeitlose Eleganz am Meer",
      "Familienfreundliche und intime Atmosphäre",
    ],
    best_for: [
      "Intime und familienorientierte Hochzeiten",
      "Strandzeremonien bei Sonnenaufgang",
      "Paare, die ruhige und erlesene Küstenschauplätze suchen",
      "Elegante Schlichtheit und unhektischer Rhythmus",
      "Bedeutungsvolle Verbindungen in friedlicher Umgebung",
    ],
    ceremony_options: [
      "Zeremonien bei Sonnenaufgang direkt am Strand",
      "Schauplätze in Resortgärten",
      "Locations am Wasser",
      "Zeremonien in Boutique-Villen",
      "Intime Elopements am Strand",
    ],
    reception_options: [
      "Brunch-Empfänge am Meer",
      "Dinner-Feiern am Wasser",
      "Resort-Bankette",
      "Intime Zusammenkünfte im Garten",
      "Entspannte Feiern am Nachmittag",
    ],
    accommodation_nearby: [
      "Boutique-Resorts direkt am Strand",
      "Heritage-Hotels und Villen",
      "Familienfreundliche Resortanlagen",
      "Friedliche Aufenthalte am Wasser",
    ],
    dining_experiences: [
      "Meeresfrüchte-Spezialitäten und Dinner am Wasser",
      "Catering für Sonnenaufgangs-Brunch",
      "Ungezwungene und doch elegante Restauranterlebnisse",
      "Dinner im Familienstil und in intimer Runde",
    ],
    unique_features: [
      "Seltene Hochzeitszeremonien bei Sonnenaufgang am Meer",
      "Stille Raffinesse, die sich vom Westen Balis unterscheidet",
      "Heritage-Atmosphäre und zeitloser Charakter",
      "Ruhiges Wasser und friedliche Umgebung",
      "Feierrhythmus vom Morgen bis zum Nachmittag",
    ],
  },
  "nusa-dua-wedding": {
    name: "Nusa Dua",
    type: "Luxusresort",
    description:
      "Weitläufige Resorts direkt am Strand, kontrollierte Umgebungen und erlesener Service – ideal für förmliche Luxus-Destination-Weddings mit großer Gästelogistik.",
    long_description:
      "Nusa Dua ist eine der renommiertesten Küstendestinationen Balis, bekannt für makellose Strände, Resorts von Weltklasse und eine hochgradig erlesene Umgebung, die auf Komfort, Privatsphäre und gehobene Erlebnisse ausgelegt ist. Wir gestalten Hochzeiten in Nusa Dua, die seinen gepflegten Charakter widerspiegeln – und Feiern schaffen, die luxuriös, nahtlos und durchdacht umgesetzt wirken. Unsere Hochzeiten in Nusa Dua werden von sauberen Küstenlandschaften, erlesener Architektur und einem Serviceniveau geprägt, das sicherstellt, dass jedes Detail sorgfältig gesteuert wird. Wir arbeiten mit Paaren, die Nusa Dua wegen seiner Exklusivität, Sicherheit und der Leichtigkeit wählen, eine wunderschön organisierte Destination Wedding auszurichten.",
    atmosphere:
      "Elegant und gut strukturiert – erlesen, gepflegt und nahtlos in der Umsetzung, luxuriös ohne übertrieben zu wirken, mit Resort-Gastfreundschaft von Weltklasse",
    accessibility_notes:
      "Nächstgelegen zum Flughafen mit All-inclusive-Resortinfrastruktur; sehr gut erreichbar, sodass Gästetransport und Unterkunft nahtlos verlaufen; Luxusresorts arbeiten mit strukturierten Systemen, die präzise Planung und Abstimmung mit den Teams der Location erfordern",
    seasonal_considerations:
      "Die Resortinfrastruktur deckt alle Wetterlagen mit starken Ausweichplänen ab; Optionen im Innen- und Außenbereich stehen das ganze Jahr über zur Verfügung; Zeitpläne werden sorgfältig gesteuert, um reibungslose Übergänge zwischen den einzelnen Teilen der Feier zu sichern",
    highlights: [
      "Makellose Strände und Resortumgebungen von Weltklasse",
      "Saubere, gepflegte und private Strandumgebungen",
      "Umfassende Einrichtungen und Annehmlichkeiten eines Luxusresorts",
      "Hohe internationale Servicestandards",
      "Nahtlose Flexibilität zwischen Innen- und Außenlocations",
    ],
    best_for: [
      "Luxuriöse Zeremonien direkt am Strand mit vollem Resortservice",
      "Große Gästegesellschaften, die eine nahtlose Logistik erfordern",
      "Paare, die hohe Servicestandards und Komfort suchen",
      "Förmliche Luxusfeiern mit makelloser Umsetzung",
      "Destination Weddings mit umfassendem Resorterlebnis",
    ],
    ceremony_options: [
      "Makellose Zeremonien direkt am Strand",
      "Schauplätze in Resortgärten und auf Rasenflächen",
      "Elegante Zeremonien im Ballsaal",
      "Mehrere Zeremonie-Optionen im Innen- und Außenbereich",
    ],
    reception_options: [
      "Empfänge im großen Ballsaal",
      "Dinner-Feiern direkt am Strand",
      "Resort-Events an mehreren Locations",
      "Erlesene Feiern im großen Rahmen",
      "Nahtlose Empfangsabläufe zwischen Innen und Außen",
    ],
    accommodation_nearby: [
      "Internationale Luxus-Resortzimmer und Suiten",
      "Unterkünfte in privaten Resortvillen",
      "Umfassende Resort-Annehmlichkeitspakete",
      "Erstklassige Anlagen direkt am Strand",
    ],
    dining_experiences: [
      "Gehobene Gastronomie und mehrgängige Resorterlebnisse",
      "Gourmet-Catering und maßgeschneiderte Menüs",
      "Spezial- und Themendinner",
      "Kulinarische Services von Weltklasse",
    ],
    unique_features: [
      "Wunderschön organisierter Zeremonieschauplatz am Strand",
      "Erlesene Feier mit mühelosem betrieblichem Ablauf",
      "Luxuriöses und zugleich komfortables Gästeerlebnis",
      "Balis erlesenste Küstenresort-Destination",
      "Professionelle Koordination und Infrastruktur von Weltklasse",
    ],
  },
  "tabanan-wedding": {
    name: "Tabanan",
    type: "Retreat & Landschaft",
    description:
      "Reisterrassen, Dschungeltäler, kühle Hochlandseen und wilde Strände an der Westküste – ideal für Feiern im Retreat-Stil, nachhaltig und von der Landschaft geprägt.",
    long_description:
      "Tabanan bietet vielfältige Landschaften: Reisterrassen, Dschungeltäler, kühle Hochlandseen und wilde Strände an der Westküste. Wir gestalten hier Feiern im Retreat-Stil, nachhaltig und von der Landschaft geprägt, die immersiv und umweltbewusst wirken. Perfekt für Paare, die mehrtägige, von der Natur geprägte Erlebnisse suchen.",
    atmosphere:
      "Retreat-artig und immersiv, mit einer nachhaltigen, landschaftsgeprägten Qualität, die sich mit der Natur verbunden anfühlt",
    accessibility_notes:
      "Vielfältiges Gelände erfordert Planung; mehrere Location-Optionen, landschaftlich reizvolle Fahrten, verschiedene Unterkunftsniveaus",
    seasonal_considerations:
      "Die Lage an der Westküste bedeutet anderes Wetter; saisonale Planung ist für Aktivitäten im Freien wichtig",
    highlights: [
      "Reisterrassen",
      "Dschungeltäler",
      "Hochlandseen",
      "Wilde Strände an der Westküste",
      "Vielfältige Landschaften",
    ],
    best_for: [
      "Feiern im Retreat-Stil",
      "Nachhaltige Praktiken",
      "Landschaftsgeprägtes Design",
      "Mehrtägige Events",
      "Immersive Naturerlebnisse",
    ],
    ceremony_options: [
      "Zeremonien auf Reisterrassen",
      "Lichtungen im Dschungel",
      "Schauplätze am See",
      "Strandzeremonien",
    ],
    reception_options: [
      "Feiern an mehreren Orten",
      "Events im Retreat-Stil",
      "Zusammenkünfte im Freien",
      "Mehrtägige Erlebnisse",
    ],
    accommodation_nearby: [
      "Öko-Lodges",
      "Heritage-Resorts",
      "Aufenthalte auf dem Bauernhof",
      "Nachhaltige Anlagen",
    ],
    dining_experiences: [
      "Farm-to-Table-Küche",
      "Lokale landwirtschaftliche Erlebnisse",
      "Nachhaltiges Dinieren",
      "Gemeinschaftsmahlzeiten",
    ],
    unique_features: [
      "Kulissen aus Reisfeldern",
      "Vielfältige Landschaften",
      "Retreat-Atmosphäre",
      "Fokus auf Nachhaltigkeit",
      "Mehrtägige Möglichkeiten",
    ],
  },
  "nusa-penida-wedding": {
    name: "Nusa Penida",
    type: "Klippen & filmreife Dramatik",
    description:
      "Schroffe Klippen, tiefblaues Meer und offene Horizonte – ideal für mutige, filmreife und visuell außergewöhnliche Destination Weddings, geprägt von Weite, Licht und ungezähmter natürlicher Schönheit.",
    long_description:
      "Nusa Penida bietet eine der dramatischsten und visuell eindrucksvollsten Landschaften Balis – wo schroffe Klippen, tiefblaues Meer und offene Horizonte einen Rahmen schaffen, der weit, kraftvoll und unvergesslich wirkt. Anders als der sanftere Rhythmus des Festlands von Bali trägt Nusa Penida eine rohe und ungezähmte Energie in sich – ideal für Hochzeiten, die mutig, filmreif und tief mit der Natur verbunden wirken. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten auf Nusa Penida, die diese Weite aufgreifen – und Feiern schaffen, die bewusst, immersiv und visuell außergewöhnlich wirken. Unsere Hochzeiten auf Nusa Penida werden von Ausblicken an den Klippen, starkem natürlichem Licht und dem weiten Treffpunkt von Land und Meer geprägt.",
    atmosphere:
      "Mutig und doch erlesen – weit und visuell eindrucksvoll, minimalistisch und landschaftsgeprägt, elegant in einer rohen Naturkulisse, in der Klippen, Meer und Himmel eine von Natur aus dramatische Komposition bilden",
    accessibility_notes:
      "Der Zugang zur Insel erfordert koordinierte Bootstransfers für Gäste und Dienstleister; Locations an den Klippen verlangen sorgfältige Planung für Sicherheit und Gästebewegung; starke Küstenwinde müssen bei Design und Aufbau berücksichtigt werden; bestimmte technische Elemente müssen möglicherweise vom Festland Balis aus organisiert werden",
    seasonal_considerations:
      "Starke Küstenwinde und die offene Exposition gegenüber der Umwelt müssen bei Design und Strukturplanung sorgfältig bedacht werden; das natürliche Licht über den exponierten Klippenlandschaften ist bei Sonnenaufgang und Sonnenuntergang besonders dramatisch; die Trockenzeit ist für Reiselogistik und Bedingungen für Zeremonien im Freien zu bevorzugen",
    highlights: [
      "Dramatische Zeremonieschauplätze auf den Klippen mit weiten Meerblicken",
      "Rohe und ungezähmte Naturumgebung, die sich von jedem Schauplatz auf dem Festland Balis unterscheidet",
      "Mutige, filmreife Hochzeitslandschaften in Editorial-Qualität",
      "Starkes visuelles Storytelling, geprägt von Klippe, Himmel und tiefblauem Meer",
      "Eine einzigartige und visuell kraftvolle Inselhochzeitsdestination",
    ],
    best_for: [
      "Paare, die einen einzigartigen dramatischen Landschaftsrahmen suchen",
      "Zeremonien auf den Klippen mit weiten Meer- und Horizontblicken",
      "Mutige, abenteuerliche und visuell eindrucksvolle Hochzeitserlebnisse",
      "Editorial- und konzeptgetriebene Inselfeiern",
      "Eine rohe, gehobene und zutiefst unvergessliche Hochzeit auf Bali",
    ],
    ceremony_options: [
      "Zeremonien auf den Klippen vor dramatischer Meereskulisse",
      "Schauplätze am Strand und an der Küste in schroffem Gelände",
      "Intime Elopements in abgelegenen Inselandschaften",
      "Zeremonien an Aussichtspunkten und auf erhöhten Plattformen unter freiem Himmel",
    ],
    reception_options: [
      "Intime Dinner auf den Klippen mit Meerblick",
      "Empfänge am Strand und unter freiem Himmel auf der Insel",
      "Kleine Editorial- und konzeptgetriebene Feiern",
      "Erlebnisse im Abenteuerstil und mit Eintauchen in die Landschaft",
    ],
    accommodation_nearby: [
      "Boutique-Öko-Lodges und Naturrefugien auf der Insel",
      "Kleine Resort- und Villenanlagen",
      "Aufenthalte in Gästehäusern mit Inselcharakter",
      "Unterkunftsoptionen an den Klippen und an der Küste",
    ],
    dining_experiences: [
      "Dinner-Erlebnisse mit privatem Koch an den Klippen und an der Küste",
      "Frische Meeresfrüchte und lokale Inselküche",
      "Intime Dinner-Schauplätze direkt am Strand",
      "Konzeptgetriebenes, maßgeschneidertes Catering in dramatischer Umgebung",
    ],
    unique_features: [
      "Zeremonie am Rand von Balis dramatischster Klippenlandschaft",
      "Mutiges und visuell kraftvolles Beisammensein, geprägt von Meer und Himmel",
      "Eine Hochzeit, die roh, filmreif und zutiefst außergewöhnlich wirkt",
      "Einer von Balis eindrucksvollsten und emotional wirkungsvollsten Inselschauplätzen",
      "Ein immersives, visuell unvergessliches und wahrhaft einzigartiges Erlebnis",
    ],
  },
  "nusa-lembongan-wedding": {
    name: "Nusa Lembongan",
    type: "Entspannte Inselelegance",
    description:
      "Klares Wasser, weiches Küstenlicht und eine entspannte Inselatmosphäre – ideal für intime, mühelose und natürlich schöne Destination Weddings, geprägt von Meer, Schlichtheit und Leichtigkeit.",
    long_description:
      "Nusa Lembongan bietet einen anderen Rhythmus von Bali – langsamer, leichter und stärker mit dem Meer verbunden. Umgeben von klarem Wasser, weichem Küstenlicht und einer entspannten Inselatmosphäre schafft diese Destination ein Hochzeitserlebnis, das intim, mühelos und natürlich schön wirkt. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten auf Nusa Lembongan, die diese Schlichtheit aufgreifen – und Feiern schaffen, die ruhig, erlesen und tief mit der Inselumgebung verbunden wirken. Unsere Hochzeiten auf Nusa Lembongan werden von Meerblicken, offenem Himmel und einer Leichtigkeit geprägt, in der sich jeder Moment ganz natürlich entfalten kann.",
    atmosphere:
      "Entspannt und doch erlesen – lichtdurchflutet und von Natur aus elegant, intim und atmosphärengeleitet, mühelos mit stiller Raffinesse, geprägt von Meer, offenem Himmel und dem unhektischen Rhythmus des Inselalltags",
    accessibility_notes:
      "Der Zugang zur Insel erfordert Bootstransfers für Gäste und Dienstleister; die Planung der Gästeunterkünfte ist wegen der begrenzten, aber kuratierten Optionen der Insel wichtig; Wind- und Meeresbedingungen müssen sorgfältig bedacht werden; bestimmte technische Elemente müssen möglicherweise vom Festland Balis aus organisiert werden; Zeitpläne müssen Inseltransport und Aufbauzeiten berücksichtigen",
    seasonal_considerations:
      "Der Lichtübergang vom Tag zum Sonnenuntergang muss beim Zeitpunkt der Zeremonie bedacht werden; Windverhältnisse und Küstenexposition beeinflussen Design- und Strukturentscheidungen; die Trockenzeit bietet die stabilsten Bedingungen für den Inselzugang und Feiern im Freien",
    highlights: [
      "Klares Wasser und weiches Küstenlicht schaffen einen natürlich schönen Rahmen",
      "Entspannte und intime Inselatmosphäre fern vom Trubel des Festlands",
      "Zeremonieorte direkt am Meer mit offenem Himmel und Meerblick",
      "Kuratierte Villen und Boutique-Anlagen mit Privatsphäre und natürlicher Schönheit",
      "Ein langsameres, bewussteres Hochzeitserlebnis, geprägt vom Rhythmus der Insel",
    ],
    best_for: [
      "Paare, die einen ruhigen Inselschauplatz fernab des Trubels suchen",
      "Intime und bedeutungsvolle Feiern direkt am Meer",
      "Eine entspannte und zugleich elegant erlesene Hochzeitsatmosphäre",
      "Inselerlebnisse in Privatvillen und Boutique-Locations",
      "Eine Destination, die sich zugleich privat und zugänglich anfühlt",
    ],
    ceremony_options: [
      "Zeremonien direkt am Meer vor klarem Wasser und offenem Himmel",
      "Schauplätze am Strand und in Küstengärten",
      "Zeremonien mit Meerblick in Privatvillen",
      "Intime Inselelopements in entspannter Küstenumgebung",
    ],
    reception_options: [
      "Entspanntes Dinner unter freiem Himmel",
      "Empfänge in Boutique-Villen und privaten Resorts",
      "Intime Dinner direkt am Strand",
      "Kleine Erlebnisse für Inselfeiern",
    ],
    accommodation_nearby: [
      "Kuratierte Boutique-Villen und private Inselanwesen",
      "Kleine Resortanlagen mit Meerblick",
      "Intime Gästehäuser und Aufenthalte in Öko-Lodges",
      "Strandvillen zur Miete mit direktem Zugang zum Wasser",
    ],
    dining_experiences: [
      "Dinner-Erlebnisse mit privatem Koch und Meerblick",
      "Frische Meeresfrüchte und lokale Inselküche",
      "Entspannte Dinner-Schauplätze am Strand und unter freiem Himmel",
      "Intime und mühelos kuratierte Catering-Erlebnisse",
    ],
    unique_features: [
      "Zeremonie am Meer in einem von Balis entspanntesten Inselschauplätzen",
      "Stilles und bedeutungsvolles Beisammensein, geprägt von Licht, Wasser und offenem Himmel",
      "Eine Hochzeit, die ruhig, intim und natürlich mühelos wirkt",
      "Balis zugänglichste und zugleich privateste Inselhochzeitsdestination",
      "Eine Feier, geprägt von Schlichtheit, Meer und echter Verbundenheit",
    ],
  },
  "nusa-ceningan-wedding": {
    name: "Nusa Ceningan",
    type: "Intimer Küstencharme",
    description:
      "Kleinerer Maßstab, Küstentexturen und ein langsamerer Inselrhythmus – ideal für intime, zurückhaltende und natürlich verbundene Destination Weddings, geprägt von Schlichtheit und stiller Küstenschönheit.",
    long_description:
      "Nusa Ceningan bietet eines von Balis intimsten und zurückhaltendsten Inselerlebnissen – wo kleinerer Maßstab, Küstentexturen und ein langsamerer Rhythmus einen Rahmen schaffen, der persönlich, entspannt und natürlich schön wirkt. Zwischen Nusa Lembongan und Nusa Penida gelegen, trägt diese Insel eine einzigartige Balance in sich – sie verbindet die Leichtigkeit Lembongans mit dem Charakter und der Kantigkeit Penidas, nur in ruhigerer und intimerer Form. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten auf Nusa Ceningan, die diese Schlichtheit aufgreifen – und Feiern schaffen, die ruhig, bewusst und mühelos erlesen wirken. Unsere Hochzeiten auf Nusa Ceningan werden von Meerblicken, Küstenklippen und einer Stille geprägt, in der sich jeder Moment bodenständig und gegenwärtig anfühlt.",
    atmosphere:
      "Intim und doch gehoben – schlicht und durchdacht kuratiert, ruhig, natürlich und atmosphärengeleitet, elegant mit stillem Charakter, geprägt von Küstenklippen, Meerblicken und der Stille einer wenig erkundeten Insel",
    accessibility_notes:
      "Gäste reisen in der Regel über Nusa Lembongan an, was koordinierte Transfers erfordert; begrenzte, aber kuratierte Unterkunftsoptionen verlangen frühzeitige Planung; offene Küstenumgebungen erfordern sorgfältige Überlegungen bei Aufbau und Design; manche Elemente müssen möglicherweise vom Festland Balis aus organisiert werden; Zeitpläne müssen auf Inseltransport und Aufbauzeiten abgestimmt sein",
    seasonal_considerations:
      "Offene Umgebungen und Windverhältnisse erfordern durchdachte Design- und Strukturentscheidungen; natürliches Licht und weiche Spiegelungen des Meeres schaffen besonders zur goldenen Stunde wunderschöne Bedingungen für Zeremonien; die Trockenzeit wird für stabilen Zugang und die Planung von Events im Freien bevorzugt",
    highlights: [
      "Intime und stille Inselatmosphäre, anders als jede andere Destination auf Bali",
      "Küstenklippen und Meerblicke in kleinerem, persönlicherem Rahmen",
      "Eine einzigartige Balance zwischen Leichtigkeit und Kantigkeit – ruhig und doch charaktervoll",
      "Wenig erkundete und wirklich private Inselumgebung",
      "Natürlich schöne Umgebung, geprägt von Schlichtheit und Textur",
    ],
    best_for: [
      "Paare, die einen ruhigen und privaten intimen Inselschauplatz suchen",
      "Zeremonieorte an der Küste und auf den Klippen in entspannter Umgebung",
      "Eine einzigartige und weniger kommerzielle Inselhochzeitsdestination",
      "Intime Elopements in langsamerem und bewussterem Tempo",
      "Ein Hochzeitserlebnis, das schlicht, persönlich und authentisch wirkt",
    ],
    ceremony_options: [
      "Zeremonien auf den Küstenklippen mit weiten Meerblicken",
      "Intime Schauplätze am Strand und am Ufer",
      "Zeremonien in Privatvillen und Boutique-Locations",
      "Elopements in stiller und abgeschiedener Inselumgebung",
    ],
    reception_options: [
      "Intime Zusammenkünfte unter freiem Himmel an der Küste",
      "Empfänge in kleinen Boutique-Locations und Privatvillen",
      "Stille Dinner-Feiern direkt am Strand",
      "Entspannte und persönliche Zusammenkünfte auf der Insel",
    ],
    accommodation_nearby: [
      "Kleine Boutique-Villen und private Inselrefugien",
      "Intime Gästehäuser mit Küstenblick",
      "Aufenthalte in Öko-Lodges und naturintegrierten Anlagen",
      "Unterkunftsoptionen auf dem nahegelegenen Nusa Lembongan",
    ],
    dining_experiences: [
      "Intime Küsten-Dinner mit privatem Koch",
      "Frische Meeresfrüchte und einfache lokale Inselküche",
      "Stille Schauplätze für Mahlzeiten am Strand und unter freiem Himmel",
      "Zurückhaltendes und authentisch kuratiertes Catering",
    ],
    unique_features: [
      "Zeremonie in einem der intimsten und am wenigsten erkundeten Inselschauplätze Balis",
      "Stilles und persönliches Beisammensein, geprägt von Schlichtheit und Stille der Küste",
      "Eine Hochzeit, die ruhig, authentisch und tief mit ihrer Umgebung verbunden wirkt",
      "Balis zurückhaltendste und wirklich privateste Inselhochzeitsdestination",
      "Eine Feier, geprägt von Intimität, Textur und natürlicher Küstenschönheit",
    ],
  },
  "lombok-wedding": {
    name: "Lombok",
    type: "Inselflucht & Küstenschlichtheit",
    description:
      "Weite offene Strände, sanfte Landschaften und ein langsamerer Inselrhythmus – ideal für intime, mühelose und still elegante Destination Weddings, geprägt von Raum, Schlichtheit und natürlicher Schönheit.",
    long_description:
      "Lombok bietet eine ruhigere und zurückhaltendere Alternative zu Bali – wo weite offene Strände, sanfte Landschaften und ein langsamerer Rhythmus einen Rahmen schaffen, der ruhig, geräumig und zutiefst entspannend wirkt. Weniger erschlossen und natürlicher im Charakter, lässt Lombok Hochzeiten auf unhektische, intime und wunderschön mit der Umgebung verbundene Weise entstehen. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten auf Lombok, die dieses Gefühl von Weite aufgreifen – und Feiern schaffen, die mühelos, erlesen und still gehoben wirken. Unsere Hochzeiten auf Lombok werden von offenen Küsten, weichem Licht und einer Stille geprägt, in der sich jeder Moment bodenständig und bewusst anfühlt.",
    atmosphere:
      "Geräumig und doch intim – ruhig und natürlich elegant, lichtdurchflutet und atmosphärengeleitet, erlesen mit stiller Raffinesse, geprägt von weiten Küsten, offenen Horizonten und dem unhektischen Rhythmus einer weniger erschlossenen Insel",
    accessibility_notes:
      "Erreichbar über den internationalen Flughafen Lombok oder per Schnellboot von Bali; Flüge, Transfers und Logistik müssen sorgfältig abgestimmt werden; Gästeunterkünfte erfordern frühzeitige Planung, da die Auswahl begrenzter ist als auf Bali; bestimmte Dienstleister und technische Elemente müssen möglicherweise aus Bali herangeholt werden; Zeitpläne müssen Reise- und Aufbaulogistik berücksichtigen",
    seasonal_considerations:
      "Wind und Sonneneinstrahlung über den offenen Küstenlandschaften müssen bei Design und Timing sorgfältig bedacht werden; die Trockenzeit (Mai–Oktober) bietet die stabilsten Bedingungen für Zeremonien im Freien; das natürliche Licht über den weiten Horizonten ist zur goldenen Stunde und bei Sonnenuntergang besonders schön",
    highlights: [
      "Weite und unberührte Zeremonieschauplätze direkt am Strand",
      "Ruhigere und entspanntere Inselatmosphäre fern vom Trubel",
      "Natürliche und weniger kommerzielle offene Küstenumgebung",
      "Kuratierte Villen und Boutique-Resorts mit Privatsphäre und Flexibilität",
      "Ein echtes Gefühl von Weite, Offenheit und friedlicher Auszeit",
    ],
    best_for: [
      "Paare, die eine ruhige und exklusive Destination am Strand suchen",
      "Intime Hochzeiten in natürlicher und unhektischer Umgebung",
      "Feiern in Privatvillen und Boutique-Resorts",
      "Ein Hochzeitserlebnis, das friedlich und immersiv wirkt",
      "Eine Destination, die Raum und stille Raffinesse bietet",
    ],
    ceremony_options: [
      "Zeremonien am Strand entlang weiter offener Küsten",
      "Schauplätze in Resortanlagen am Meer und in Villengärten",
      "Intime Elopements in stiller natürlicher Umgebung",
      "Zeremonien an den Klippen und an erhöhten Aussichtspunkten",
    ],
    reception_options: [
      "Dinner-Empfänge im Freien in Privatresorts und Villen",
      "Feiern unter freiem Himmel direkt am Strand",
      "Intime Erlebnisse in Boutique-Locations",
      "Entspannte Abendevents inmitten der Natur",
    ],
    accommodation_nearby: [
      "Boutique-Resorts direkt am Strand und Öko-Luxus-Refugien",
      "Privatvillen zur Miete mit Meerblick",
      "Intime Gästehäuser auf der Insel und Glamping-Aufenthalte",
      "Kuratierte Anlagen mit Privatsphäre und natürlichem Charakter",
    ],
    dining_experiences: [
      "Dinner-Erlebnisse mit privatem Koch am Strand",
      "Frische Meeresfrüchte und lokale Sasak-Küche",
      "Schauplätze für Dinner bei Sonnenuntergang unter freiem Himmel an der Küste",
      "Intime und mühelos kuratierte Catering-Erlebnisse",
    ],
    unique_features: [
      "Zeremonie an einer von Indonesiens unberührtesten und weitläufigsten Küsten",
      "Stilles und bedeutungsvolles Beisammensein, geprägt von Raum, Licht und offenem Horizont",
      "Eine Hochzeit, die friedlich, natürlich und wunderschön zurückhaltend wirkt",
      "Eine private und exklusive Destination jenseits des Tempos von Bali",
      "Eine Feier, geprägt von Schlichtheit, Ruhe und echter Auszeit",
    ],
  },
  "sumba-wedding": {
    name: "Sumba",
    type: "Abgelegener Luxus & filmreife Landschaft",
    description:
      "Weite Savannen, dramatische Küsten und eine tiefe kulturelle Präsenz – ideal für exklusive, immersive und wahrhaft außergewöhnliche Destination Weddings, geprägt von Landschaft, Authentizität und stillem Luxus.",
    long_description:
      "Sumba bietet eine von Indonesiens außergewöhnlichsten und unberührtesten Landschaften – wo weite Savannen, dramatische Küsten und eine tiefe kulturelle Präsenz einen Rahmen schaffen, der zugleich kraftvoll und selten wirkt. Weit entfernt vom Tempo Balis lädt Sumba zu einer anderen Art von Hochzeitserlebnis ein – langsamer, bewusster und tief mit Land, Tradition und Raum verbunden. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten auf Sumba, die diese Weite und Authentizität aufgreifen – und Feiern schaffen, die immersiv, erlesen und wahrhaft einzigartig wirken. Unsere Hochzeiten auf Sumba werden von offenen Horizonten, rohen Texturen und einem stillen Gefühl von Luxus geprägt, das aus Schlichtheit, Abgeschiedenheit und Bedeutung entsteht.",
    atmosphere:
      "Weit und doch zutiefst intim – roh und doch erlesen, minimalistisch und landschaftsgeprägt, gehoben mit stiller Raffinesse, geprägt von weiten Savannen, dramatischen Küstenklippen und dem seltenen Gefühl einer unberührten, kulturell reichen Insel",
    accessibility_notes:
      "Abgelegene Destination, die detaillierte Koordination von Flügen, Transfers und der gesamten Gästelogistik erfordert; begrenzte, aber hochwertige Unterkunftsoptionen verlangen frühzeitige Planung; viele Elemente, darunter Dienstleister und technische Aufbauten, müssen möglicherweise aus Bali herangeholt werden; offene Landschaften erfordern sorgfältige Planung für Sonne, Wind und natürliche Exposition; lange Planungsvorläufe sind für eine reibungslose Umsetzung unerlässlich",
    seasonal_considerations:
      "Offene Savannen und Küstenumgebungen erfordern vollständige Vorbereitung auf Sonne, Wind und natürliche Elemente; die Trockenzeit wird für Zeremoniebedingungen und Reiselogistik dringend bevorzugt; das natürliche Licht über weiten offenen Landschaften schafft bei Sonnenaufgang und Sonnenuntergang besonders dramatische und filmreife Bedingungen",
    highlights: [
      "Zeremonieschauplätze in weiter Savanne und an dramatischen Küstenklippen",
      "Eine von Indonesiens exklusivsten und selten erkundeten Destinationen",
      "Tiefe kulturelle Präsenz und Authentizität, geprägt vom sumbanesischen Erbe",
      "Filmreife Naturlandschaften in Editorial-Qualität",
      "Private Ultraluxus-Resortanlagen mit seltener Exklusivität",
    ],
    best_for: [
      "Paare, die eine abgelegene, exklusive und wahrhaft außergewöhnliche Destination suchen",
      "Zeremonien in der Savanne und auf den Klippen mit filmreifer visueller Wirkung",
      "Ein zutiefst immersives und kulturell verbundenes Hochzeitserlebnis",
      "Ultraluxus-Privatresorts und konzeptgetriebene Feiern",
      "Eine Hochzeit, die selten, erlesen und zutiefst unvergesslich wirkt",
    ],
    ceremony_options: [
      "Zeremonien in der offenen Savanne vor weiten Landschaftskulissen",
      "Zeremonien auf den Klippen und an der Küste entlang dramatischer Ufer",
      "Zeremonieschauplätze in Privatresorts und Ultraluxus-Locations",
      "Intime Elopements inmitten roher und unberührter Natur",
    ],
    reception_options: [
      "Dinner-Empfänge unter freiem Himmel in Privatresorts und auf den Klippen",
      "Intime Zusammenkünfte in der Savannenlandschaft",
      "Konzeptgetriebene Ultraluxus-Feiern",
      "Kleine und zutiefst persönliche Zusammenkünfte inmitten der Natur",
    ],
    accommodation_nearby: [
      "Private Ultraluxusresorts und Öko-Refugien",
      "Boutique-Anlagen auf den Klippen und mit Meerblick",
      "Exklusive Aufenthalte in Privatvillen und Anwesen",
      "Kuratierte hochwertige, naturintegrierte Unterkünfte",
    ],
    dining_experiences: [
      "Dinner-Erlebnisse mit privatem Koch in der Savanne und auf den Klippen",
      "Frische lokale Küche mit authentischen sumbanesischen Aromen",
      "Intime Dinner-Schauplätze bei Sonnenuntergang in offener Landschaft",
      "Konzeptgetriebenes, maßgeschneidertes Catering in außergewöhnlicher Umgebung",
    ],
    unique_features: [
      "Zeremonie in einer von Indonesiens weitesten und unberührtesten Landschaften",
      "Seltenes und kraftvolles Beisammensein, geprägt von Savanne, Kultur und offenem Horizont",
      "Eine Hochzeit, die exklusiv, filmreif und zutiefst außergewöhnlich wirkt",
      "Indonesiens abgelegenste und visuell eindrucksvollste Luxus-Hochzeitsdestination",
      "Ein transformierendes, einzigartiges und zutiefst unvergessliches Erlebnis",
    ],
  },
  "banyuwangi-wedding": {
    name: "Banyuwangi",
    type: "Von der Natur geleitete Entdeckung & Landschaft",
    description:
      "Berge, Wälder, Küsten und offene Naturlandschaften in vielschichtiger Verbindung – ideal für immersive, abenteuerliche und still außergewöhnliche Destination Weddings, geprägt von natürlicher Vielfalt und stiller Entdeckung.",
    long_description:
      "Banyuwangi bietet eine von Indonesiens vielfältigsten und weniger bekannten Landschaften – wo Berge, Wälder, Küsten und offene Naturlandschaften in einem Rahmen zusammenkommen, der roh und still schön zugleich wirkt. Am östlichen Rand von Java gelegen, trägt Banyuwangi ein Gefühl von Entdeckung in sich – und bietet Hochzeitserlebnisse, die einzigartig, immersiv und weit entfernt von vertrauteren Destinationen wirken. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten in Banyuwangi, die diese Vielfalt aufgreifen – und Feiern schaffen, die bodenständig, bewusst und tief mit der Natur verbunden wirken. Unsere Hochzeiten in Banyuwangi werden von vielschichtigen Landschaften, wechselndem Licht und einer Ruhe geprägt, in der sich jeder Moment ganz natürlich entfalten kann.",
    atmosphere:
      "Natürlich und doch erlesen – immersiv und visuell vielschichtig, ruhig mit einem Gefühl des Erkundens, elegant in einem rohen natürlichen Kontext, geprägt vom Kontrast zwischen Berg-, Wald- und Küstenlandschaften",
    accessibility_notes:
      "Erreichbar über Flüge und Landtransfers von Bali; die gesamte Reiselogistik und Koordination für Gäste und Dienstleister muss sorgfältig geplant werden; bestimmte Dienstleister und technische Elemente müssen möglicherweise aus Bali organisiert werden; verschiedene Landschaftstypen erfordern maßgeschneiderte Planung für Layout, Gelände und Gästesicherheit; Zeitpläne müssen Reisedistanzen und Aufbaulogistik berücksichtigen",
    seasonal_considerations:
      "Vielschichtige Landschaftstypen – Berg, Wald und Küste – erfordern jeweils eigene saisonale Überlegungen und Ausweichplanung; das natürliche Licht variiert stark zwischen den Umgebungen und erfordert ein sorgfältiges Timing der Zeremonie; die Trockenzeit wird für Events im Freien und die Reiselogistik bevorzugt",
    highlights: [
      "Vielfältige Naturlandschaften, die Berg-, Wald- und Küstenschauplätze verbinden",
      "Eine weniger bekannte und wirklich einzigartige Destination jenseits von Bali",
      "Zeremonieschauplätze in Vulkan- und Höhenlandschaften mit dramatischen Ausblicken",
      "Üppige Wald- und Dschungelumgebungen für immersive Feiern",
      "Eine ruhige, nicht überlaufene und visuell reiche Naturumgebung",
    ],
    best_for: [
      "Paare, die eine einzigartige und naturvielfältige Hochzeitsdestination suchen",
      "Zeremonieschauplätze in Berg-, Vulkan- und Waldlandschaften",
      "Eine Hochzeit, die abenteuerlich und doch erlesen und bewusst wirkt",
      "Intime Feiern mit starker visueller Fülle und natürlicher Tiefe",
      "Ein Rahmen, der sowohl Erkundung als auch stille natürliche Schönheit bietet",
    ],
    ceremony_options: [
      "Zeremonien in Berg- und Vulkanlandschaften mit dramatischen Ausblicken",
      "Zeremonieschauplätze in Wald und Dschungel, eingebettet in die Natur",
      "Zeremonien an Küste und Strand mit Meerblick",
      "Elopements an erhöhten Aussichtspunkten und in offener Naturlandschaft",
    ],
    reception_options: [
      "Intime Dinner inmitten der Natur",
      "Feiern unter freiem Himmel mit Wald- und Bergblick",
      "Empfänge in Boutique-Locations und Privatresorts",
      "Konzeptgetriebene, in die Landschaft integrierte Erlebnisse",
    ],
    accommodation_nearby: [
      "Boutique-Naturlodges und Öko-Refugien",
      "Villen mit Berg- und Waldblick",
      "Aufenthalte in Küstenresorts und direkt am Strand",
      "Naturintegrierte Gästehäuser und Retreat-Unterkünfte",
    ],
    dining_experiences: [
      "Dinner-Erlebnisse mit privatem Koch in Natur und Landschaft",
      "Frische lokale Küche und Produkte aus Ostjava",
      "Intime Mahlzeiten mit Bergblick und umgeben von Wald",
      "Konzeptgetriebenes, maßgeschneidertes Catering in natürlicher Umgebung",
    ],
    unique_features: [
      "Zeremonie in einer von Indonesiens vielfältigsten und vielschichtigsten Naturlandschaften",
      "Stilles und bedeutungsvolles Beisammensein, geprägt vom Kontrast zwischen Berg, Wald und Küste",
      "Eine Hochzeit, die einzigartig, immersiv und still außergewöhnlich wirkt",
      "Eines von Indonesiens aufstrebendsten und visuell reichsten Destinationserlebnissen",
      "Eine Feier, geprägt von natürlicher Vielfalt, Entdeckung und echter Schönheit",
    ],
  },
  "magelang-wedding": {
    name: "Magelang",
    type: "Erbe & architektonische Eleganz",
    description:
      "Uraltes Erbe, Vulkanlandschaften und architektonische Schönheit – ideal für ruhige, kulturell reiche und zeitlose Destination Weddings, geprägt von Stille, Symmetrie und erlesener Eleganz.",
    long_description:
      "Magelang bietet einen von Indonesiens erlesensten und kulturell bedeutendsten Hochzeitsrahmen – wo uraltes Erbe, Vulkanlandschaften und architektonische Schönheit in stiller Harmonie zusammenkommen. In einer geschichtsträchtigen Region, umgeben von Bergen, schafft diese Destination ein Hochzeitserlebnis, das bodenständig und gehoben zugleich wirkt – wo jeder Moment von Präsenz und Bedeutung getragen ist. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten in Magelang, die diese Balance aufgreifen – und Feiern schaffen, die ruhig, bewusst und tief mit Landschaft und Kultur verbunden wirken. Unsere Hochzeiten in Magelang werden von Symmetrie, natürlichem Licht und einer Stille geprägt, in der sich das Erlebnis mit stiller Raffinesse entfalten kann.",
    atmosphere:
      "Zeitlos und erlesen – ruhig und architektonisch verwurzelt, minimalistisch und doch visuell kraftvoll, elegant mit stiller Tiefe, geprägt von uraltem Erbe, vulkanischer Bergumgebung und der Stille einer kulturell bedeutenden Landschaft",
    accessibility_notes:
      "Erreichbar über Flüge nach Yogyakarta und koordinierte Landtransfers; die gesamte Reiselogistik muss für Gäste und Dienstleister sorgfältig geplant werden; bei bestimmten Locations können besondere Nutzungs- und Betriebsrichtlinien gelten; strukturierte Umgebungen erfordern durchdachte Gästebewegung und Raumplanung; sorgfältige Zeitplanung sichert ein reibungsloses und gut getaktetes Erlebnis",
    seasonal_considerations:
      "Schauplätze im Freien und halboffene Umgebungen erfordern Wetterausweichplanung; das natürliche Licht über offenen Höfen, Terrassen und architektonischen Räumen schafft besonders am Morgen und späten Nachmittag wunderschöne Zeremoniebedingungen; die Trockenzeit wird für Zeremonien unter freiem Himmel und den Gästekomfort bevorzugt",
    highlights: [
      "Uraltes Erbe und ikonische architektonische Schauplätze von tiefer kultureller Bedeutung",
      "Vulkanische Bergumgebung als kraftvolle und ruhige natürliche Kulisse",
      "Erlesene und zeitlose Atmosphäre, anders als jede andere Destination Indonesiens",
      "Architektonische Symmetrie und räumliche Schönheit, ideal für die Zeremoniegestaltung",
      "Eine ruhige und besinnliche Umgebung, geprägt von Geschichte und Landschaft",
    ],
    best_for: [
      "Paare, die einen kulturell reichen und historisch bedeutsamen Rahmen suchen",
      "Zeremonieumgebungen in Architektur und Erbe mit starker visueller Präsenz",
      "Eine ruhige und zeitlose Hochzeitsatmosphäre, geprägt von Kultur und Landschaft",
      "Erlesene und designorientierte Feiern an ikonischen indonesischen Schauplätzen",
      "Ein Hochzeitserlebnis, das zutiefst bewusst und still luxuriös wirkt",
    ],
    ceremony_options: [
      "Zeremonieschauplätze in architektonischen und historischen Stätten",
      "Zeremonien auf offenen Höfen und Terrassen mit Bergblick",
      "Intime Elopements in kulturell bedeutsamer Umgebung",
      "Zeremoniekulissen mit Landschafts- und Vulkanbergblick",
    ],
    reception_options: [
      "Dinner-Empfänge in Heritage-Gärten und auf architektonischen Anlagen",
      "Elegante Zusammenkünfte auf offenen Höfen und Terrassen",
      "Erlesene Feiern in Boutique-Locations und privaten Anwesen",
      "Intime und kulturell immersive Abendveranstaltungen",
    ],
    accommodation_nearby: [
      "Boutique-Heritage-Hotels und erlesene Retreat-Anlagen",
      "Villen mit Bergblick und naturintegrierte Aufenthalte",
      "Kulturelle Gästehäuser und kuratierte private Unterkünfte",
      "Luxushotels und Resortanlagen im Raum Yogyakarta",
    ],
    dining_experiences: [
      "Dinner-Erlebnisse mit privatem Koch in historischer und architektonischer Umgebung",
      "Frische zentraljavanische Küche und traditionelle lokale Gerichte",
      "Intime Dinner-Schauplätze auf offenen Höfen und Terrassen",
      "Erlesene, kulturell inspirierte maßgeschneiderte Catering-Erlebnisse",
    ],
    unique_features: [
      "Zeremonie in einer von Indonesiens ikonischsten und kulturell bedeutendsten Landschaften",
      "Zeitloses und bedeutungsvolles Beisammensein, geprägt von Erbe, Architektur und Bergpräsenz",
      "Eine Hochzeit, die erlesen, ruhig und tief mit der indonesischen Kultur verbunden wirkt",
      "Einer von Indonesiens elegantesten und historisch eindrucksvollsten Destinationsschauplätzen",
      "Eine Feier, geprägt von Stille, Symmetrie und stiller architektonischer Schönheit",
    ],
  },
  "kuta-wedding": {
    name: "Kuta",
    type: "Feier am Strand",
    description:
      "Goldene Strände, legendäre Sonnenuntergänge und lebendige Küstenenergie – ideal für fröhliche, entspannte und gut erreichbare Destination Weddings am Strand, geprägt vom Rhythmus des Meeres.",
    long_description:
      "Kuta ist eine der ikonischsten Küstendestinationen Balis, bekannt für goldene Strände, lebendige Energie und legendäre Sonnenuntergänge über dem Indischen Ozean. Wir gestalten Hochzeiten in Kuta, die die Schönheit der Lage direkt am Meer feiern und zugleich ein Erlebnis schaffen, das fröhlich, entspannt und durchdacht kuratiert wirkt. Unsere Hochzeiten in Kuta umarmen den natürlichen Rhythmus der Küste – wo Meerblicke, Licht bei Sonnenuntergang und gemeinsames Feiern die Atmosphäre des Tages prägen. Wir arbeiten mit internationalen Paaren, die Kuta wegen der guten Erreichbarkeit, der Locations direkt am Strand und des lebhaften und zugleich herzlichen Geistes wählen, der diesen Teil Balis prägt.",
    atmosphere:
      "Entspannt und doch wunderschön kuratiert – eher festlich als förmlich, offen, luftig und vom Meer inspiriert, mit eleganter Wärme",
    accessibility_notes:
      "Ausgezeichnete Nähe zum Flughafen und internationale Erreichbarkeit; etablierte Resorts direkt am Strand mit vollem Gästeservice; für Locations am Strand gelten besondere Lärmschutzregeln, die eingehalten werden müssen",
    seasonal_considerations:
      "Der Zeitpunkt der Zeremonie wird sorgfältig auf Balis Sonnenuntergangslicht und ideale Fotobedingungen abgestimmt; Schatten, Bodenbeläge und Layoutplanung sind für den Gästekomfort in offenen Strandumgebungen unerlässlich",
    highlights: [
      "Zeremonieschauplätze am goldenen Strand",
      "Ikonische Ausblicke auf Balis Sonnenuntergang",
      "Lebendige und festliche Küstenenergie",
      "Ausgezeichnete Erreichbarkeit für internationale Gäste",
      "Resorts direkt am Strand mit Full-Service-Locations",
    ],
    best_for: [
      "Fröhliche Destination Weddings am Strand",
      "Zeremonien bei Sonnenuntergang am Meer",
      "Gut erreichbare Orte für internationale Gäste",
      "Entspannte und festliche Atmosphären",
      "Klassischer Küstencharme Balis",
    ],
    ceremony_options: [
      "Strandzeremonien bei Sonnenuntergang",
      "Schauplätze in Resorts direkt am Strand",
      "Zeremonieräume mit Meerblick",
      "Intime Elopements am Strand",
    ],
    reception_options: [
      "Dinner-Empfänge direkt am Strand",
      "Bankette im Resort mit Meerblick",
      "Cocktails bei Sonnenuntergang und Abendabläufe",
      "Lebendige Feiern unter freiem Himmel",
    ],
    accommodation_nearby: [
      "Resorthotels direkt am Strand",
      "Internationale Hotelmarken",
      "Anlagen der gehobenen Mittelklasse und des Luxussegments",
      "Boutique-Aufenthalte an der Küste",
    ],
    dining_experiences: [
      "Dinner am Strand im Sand",
      "Mehrgängige Erlebnisse im Resort",
      "Cocktail-Catering bei Sonnenuntergang",
      "Internationale und lokale Küche zur Auswahl",
    ],
    unique_features: [
      "Feiern bei Sonnenuntergang am Indischen Ozean",
      "Fröhliches Beisammensein von Freunden und Familie",
      "Entspanntes und dennoch wunderschönes Küstenerlebnis",
      "Balis am besten erreichbare Location direkt am Strand",
      "Ikonische Hochzeitserinnerungen am Ufer",
    ],
  },
  "legian-wedding": {
    name: "Legian",
    type: "Strand & Lebensstil",
    description:
      "Schauplätze am Strand, lebendige Küstenatmosphäre und entspannte Energie – ideal für lebhafte und zugleich erlesene Destination Weddings, geprägt von Fluss, Licht und müheloser sozialer Eleganz.",
    long_description:
      "Legian ist eine von Balis ausgewogensten Küstendestinationen zwischen Seminyak und Kuta und bietet eine Mischung aus Schönheit direkt am Strand, lebendiger Atmosphäre und zugänglichem Rhythmus – ideal für Feiern, die gesellig, herzlich und von Natur aus angenehm wirken. Wir gestalten Hochzeiten in Legian, die diese Energie aufgreifen – und Feiern schaffen, die mühelos, bewusst und wunderschön kuratiert wirken. Unsere Hochzeiten in Legian werden von offenen Küstenschauplätzen, Licht bei Sonnenuntergang und einem nahtlosen Fluss zwischen Zeremonie, Cocktail und Empfang geprägt, durch den sich jeder Moment lebendig und mitreißend anfühlt. Wir arbeiten mit Paaren, die Legian wegen der Erreichbarkeit, des lebhaften Charakters und eines Rahmens wählen, der zugleich einladend und erlesen wirkt.",
    atmosphere:
      "Entspannt und doch stilvoll – lebendig, gesellig und lichtdurchflutet, wo Strandenergie auf mühelose Eleganz trifft und jede Feier warm, lebhaft und wunderschön kuratiert wirkt",
    accessibility_notes:
      "Zentrale Lage zwischen Seminyak und Kuta mit ausgezeichneter Erreichbarkeit für Gäste und Dienstleister; große Auswahl an Unterkünften und Annehmlichkeiten in der Nähe; in städtischen Küstenbereichen können besondere Lärmschutzvorschriften und Sperrstunden gelten, die sorgfältig eingeplant werden müssen",
    seasonal_considerations:
      "Die nach Westen ausgerichtete Küste fängt wunderschönes Sonnenuntergangslicht ein, ideal für das Timing der Zeremonie; Küstenwind und Umwelteinflüsse müssen bei Design und Aufbau berücksichtigt werden; nahtlose Übergänge zwischen Zeremonie und Empfang sind für den Gästekomfort in offenen Küstenumgebungen unerlässlich",
    highlights: [
      "Offene Schauplätze am Strand mit leichtem Zugang zur Küste",
      "Lebendige und zugleich zugängliche Lifestyle-Atmosphäre",
      "Zentrale Lage zwischen Seminyak und Kuta",
      "Boutique-Resorts und Lifestyle-Locations zur Auswahl",
      "Wunderschöne Ausblicke auf den Sonnenuntergang über dem Indischen Ozean",
    ],
    best_for: [
      "Hochzeiten am Strand mit geselliger und lebhafter Energie",
      "Paare, die einen entspannten und zugleich stilvollen Küstenrahmen suchen",
      "Feiern in der Nähe von Unterkunft, Gastronomie und Unterhaltung",
      "Herzliche und mitreißende Zusammenkünfte mit müheloser Dramaturgie",
      "Ein vielseitiger Rahmen für Zeremonie und Empfang",
    ],
    ceremony_options: [
      "Offene Zeremonien am Strand bei Sonnenuntergang",
      "Schauplätze in Boutique-Resortgärten und auf Terrassen",
      "Zeremonien in Küstenlocations zwischen Innen und Außen",
      "Zeremonien am Villenpool und im Garten",
      "Intime Elopements am Strand",
    ],
    reception_options: [
      "Dinner am Strand und Empfangsabläufe bei Sonnenuntergang",
      "Feiern auf Terrassen von Boutique-Resorts",
      "Gesellige und lifestyleorientierte Abendveranstaltungen",
      "Cocktail- und Dinner-Empfänge mit Meerblick",
      "Location-Erlebnisse in mehreren Räumen mit entspannter Energie",
    ],
    accommodation_nearby: [
      "Boutique-Resorts und Hotels direkt am Strand",
      "Zeitgenössische Mietvillen",
      "Lifestyle-Hotels mit Annehmlichkeiten an der Küste",
      "Zentral gelegene Gästehäuser und Anlagen",
    ],
    dining_experiences: [
      "Dinner am Strand und Cocktails bei Sonnenuntergang",
      "Zeitgenössische und internationale Küche",
      "Privatkoch und maßgeschneidertes Catering",
      "Dinner in Resort- und Lifestyle-Restaurants",
    ],
    unique_features: [
      "Zeremonie bei Sonnenuntergang an einem von Balis am besten erreichbaren Stränden",
      "Geselliges und atmosphärengeleitetes Beisammensein mit müheloser Energie",
      "Zentrale Küstenlage, die Bequemlichkeit mit Charme verbindet",
      "Eine Hochzeit, die warm, stilvoll und natürlich mitreißend wirkt",
      "Balis lebendiger Lebensstil als Kulisse der Feier",
    ],
  },
  "jimbaran-wedding": {
    name: "Jimbaran",
    type: "Intimität am Strand",
    description:
      "Ruhige Bucht, goldene Sonnenuntergänge und zurückhaltender Luxus – ideal für intime und erlesene Hochzeiten am Strand, geprägt von Wärme, fließendem Licht und der stillen Schönheit des Meeres.",
    long_description:
      "Jimbaran ist eine von Balis zeitlosesten Küstendestinationen, bekannt für ihre ruhige Bucht, goldene Sonnenuntergänge und ein Gefühl von zurückhaltendem Luxus, das einladend und erlesen zugleich wirkt. Wir gestalten Hochzeiten in Jimbaran, die die natürliche Wärme der Küste aufgreifen – und Feiern schaffen, die intim, elegant und mühelos mit dem Meer verbunden wirken. Unsere Hochzeiten in Jimbaran werden von sanften Wellen, glühendem Licht bei Sonnenuntergang und einem langsameren, bodenständigeren Rhythmus geprägt, in dem sich jeder Moment bedeutungsvoll anfühlt. Wir arbeiten mit Paaren, die Jimbaran wegen der Balance aus Schönheit am Strand, Privatsphäre und einer entspannten und zugleich raffinierten Atmosphäre wählen.",
    atmosphere:
      "Warm und doch erlesen – intim, einladend und weich, mit glühendem, vom Meer inspiriertem Licht, das elegant ohne Förmlichkeit wirkt",
    accessibility_notes:
      "Die geschützte, nach Westen ausgerichtete Bucht bietet ruhigere Bedingungen als offene Strände; nahe am Flughafen; Luxusresort-Infrastruktur mit umfassendem Gästeservice; der Aufbau am Strand erfordert Planung von Bodenbelägen und Bestuhlung im Sand",
    seasonal_considerations:
      "Die nach Westen ausgerichtete Bucht fängt wunderschöne goldene Sonnenuntergangstöne ein; der Zeitpunkt der Zeremonie wird sorgfältig für optimales Sonnenuntergangslicht geplant; die Windverhältnisse sind ruhiger als in nördlichen Küstenbereichen, dennoch ist eine Planung für die Meeresbrise erforderlich",
    highlights: [
      "Ruhige, geschützte Bucht und goldener Sandstrand",
      "Ikonische Ausblicke auf den Sonnenuntergang über dem Meer auf Bali",
      "Zurückhaltender Luxus mit Privatsphäre",
      "Renommierte Resorts direkt am Strand und Privatvillen",
      "Erlesene und zugleich einladende Küstenatmosphäre",
    ],
    best_for: [
      "Intime und erlesene Feiern am Strand",
      "Zeremonien bei Sonnenuntergang bei ruhigen Meeresbedingungen",
      "Paare, die elegante Entspannung und Privatsphäre suchen",
      "Dinner-Erlebnisse am Strand im Sand",
      "Zeitlose Hochzeitserinnerungen an Balis Küste",
    ],
    ceremony_options: [
      "Zeremonien am Strand und in der Bucht bei Sonnenuntergang",
      "Schauplätze in Resortgärten direkt am Strand",
      "Zeremonien am Meer in Privatvillen",
      "Intime Elopements im Sand",
    ],
    reception_options: [
      "Dinner am Strand im Sand",
      "Empfänge auf Resortterrassen und in Gärten",
      "Cocktails bei Sonnenuntergang und Abendabläufe",
      "Intime Zusammenkünfte in Privatvillen",
    ],
    accommodation_nearby: [
      "Renommierte Luxusresorts direkt am Strand",
      "Private Villenanwesen",
      "Boutique-Hotels an der Küste",
      "Full-Service-Resortanlagen",
    ],
    dining_experiences: [
      "Meeresfrüchte-Dinner am Strand im Sand",
      "Mehrgängige Dinner-Erlebnisse bei Sonnenuntergang",
      "Villenservice mit privatem Koch",
      "Gehobene Resortgastronomie und Gourmet-Catering",
    ],
    unique_features: [
      "Zeremonie bei Sonnenuntergang über der ruhigen geschützten Bucht",
      "Dinner am Strand unter dem offenen Abendhimmel",
      "Warmer und bodenständiger Rhythmus der Küstenfeier",
      "Jimbarans goldene Küste als Hochzeitskulisse",
      "Balance aus Intimität, Eleganz und Schönheit des Meeres",
    ],
  },
  "ketewel-wedding": {
    name: "Ketewel",
    type: "Küstenprivatsphäre",
    description:
      "Strände mit schwarzem Sand, Meerblicke und stille Küstenauthentizität – ideal für private, intime und natürlich elegante Hochzeiten abseits von Balis überlaufeneren Destinationen.",
    long_description:
      "Ketewel ist eine von Balis zurückhaltenderen Küstendestinationen an der Ostküste der Insel, bekannt für Strände mit schwarzem Sand, Meerblicke und eine Ruhe, die unberührt und authentisch wirkt. Wir gestalten Hochzeiten in Ketewel, die seine stille Schönheit aufgreifen – und Feiern schaffen, die intim, bodenständig und natürlich elegant wirken. Unsere Hochzeiten in Ketewel werden von offenen Küsten, weichem Meerlicht und einem langsameren Rhythmus geprägt, in dem sich jeder Moment persönlich und unhektisch anfühlt. Wir arbeiten mit Paaren, die Ketewel wegen der Privatsphäre, der Nähe zu Ubud und der Möglichkeit wählen, eine friedliche Alternative zu Balis überlaufeneren Strand-Destinationen zu bieten.",
    atmosphere:
      "Intim und doch erlesen – natürlich und zurückhaltend, ruhig, luftig und bodenständig, mit eleganter Zurückhaltung, die dem Ort die Führung überlässt",
    accessibility_notes:
      "Günstig zwischen Sanur und Ubud gelegen; Privatvillen erfordern eine sorgfältige Koordination der Gästeführung; Transport und Orientierung sollten für Gäste, die die Gegend nicht kennen, klar abgestimmt werden",
    seasonal_considerations:
      "Offene Küstenbereiche erfordern eine sorgfältige Auswahl von Dekorationselementen und Zeremoniestrukturen im Hinblick auf Wind; durch die minimale gebaute Infrastruktur ist Vorbereitung auf Sonne, Wind und möglichen Regen unerlässlich; schwarzer Sand und Gelände erfordern Planung von Bodenbelägen und Layout für den Gästekomfort",
    highlights: [
      "Strände mit schwarzem Sand und natürlichem Küstencharakter",
      "Ruhige und unberührte Meerblicke",
      "Privatvillen mit direktem Zugang zur Küste",
      "Leichter Zugang sowohl nach Ubud als auch nach Süd-Bali",
      "Authentische und unhektische Atmosphäre Balis",
    ],
    best_for: [
      "Intime Hochzeiten, die Privatsphäre und Abgeschiedenheit suchen",
      "Paare, die einen natürlichen und unverfälschten Küstenrahmen wünschen",
      "Elopements mit emotionaler Verbindung und Schlichtheit",
      "Authentisches Bali-Erlebnis fernab vom Trubel",
      "Ein langsameres, entspannteres und bedeutungsvolleres Tempo",
    ],
    ceremony_options: [
      "Zeremonien direkt am Meer mit natürlichen Kulissen",
      "Schauplätze am Strand mit schwarzem Sand",
      "Zeremonien in Villengärten und mit Meerblick",
      "Intime Elopements an der Küste",
    ],
    reception_options: [
      "Empfänge in Privatvillen mit Meerblick",
      "Entspannte Zusammenkünfte im Garten und an der Küste",
      "Intime Dinner-Feiern",
      "Naturintegrierte Events im kleinen Rahmen",
    ],
    accommodation_nearby: [
      "Private Küstenvillen mit Meerblick",
      "Boutique-Öko-Lodges und Gästehäuser",
      "Naturintegrierte Retreat-Anlagen",
      "Unterkunftsoptionen in der Nähe in Sanur und Ubud",
    ],
    dining_experiences: [
      "Dinner-Erlebnisse in der Villa mit privatem Koch",
      "Intime Dinner-Schauplätze direkt am Meer",
      "Frische lokale und Küstenküche",
      "Entspannte und persönliche Catering-Erlebnisse",
    ],
    unique_features: [
      "Private Zeremonie am authentischen Meer Balis",
      "Bedeutungsvolles Beisammensein in friedlicher Küstenumgebung",
      "Entspannte und zugleich erlesene Feieratmosphäre",
      "Natürliche Küste mit schwarzem Sand als Hochzeitskulisse",
      "Stille Schönheit, die sich von kommerziellen Strand-Destinationen unterscheidet",
    ],
  },
  "saba-wedding": {
    name: "Saba",
    type: "Ruhe zwischen Strand & Garten",
    description:
      "Stille Küsten, offene Strände und umgebendes Grün entlang der Ostküste Balis – ideal für ruhige, intime und natürlich erlesene Destination Weddings, geprägt von Küstenweite und zurückhaltender Eleganz.",
    long_description:
      "Saba liegt an Balis Ostküste in Gianyar und bietet einen ruhigeren und zurückhaltenderen Küstenrahmen – wo offene Strände, weiches Licht und umgebendes Grün eine Hochzeitsatmosphäre schaffen, die ruhig, intim und natürlich erlesen wirkt. Weniger kommerziell als Balis Westküste, trägt Saba ein Gefühl von Privatsphäre und Leichtigkeit in sich – ideal für Paare, die eine friedliche und zugleich schöne Umgebung für ihre Feier suchen. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten in Saba, die diese Balance aufgreifen – und Feiern schaffen, die entspannt, bewusst und nahtlos mit Natur und Raum verbunden wirken. Unsere Hochzeiten in Saba werden von Küstenweite, sanftem Licht und dem Zusammenspiel von Strand- und Gartenumgebungen geprägt.",
    atmosphere:
      "Ruhig und doch wunderschön kuratiert – lichtdurchflutet und natürlich elegant, offen, luftig und einladend, erlesen ohne Übermaß, wo weiches Küstenlicht, Weite am Strand und umgebendes Grün ein Hochzeitserlebnis schaffen, das intim, geräumig und mühelos bedeutungsvoll wirkt",
    accessibility_notes:
      "Aus Zentral- und Süd-Bali leicht erreichbar, was eine reibungslose Koordination für Gäste und Dienstleister ermöglicht; Locations am Strand und unter freiem Himmel erfordern sorgfältige Überlegungen zur Windexposition bei Zeremoniestrukturen und Dekorationselementen; jede Location kann besondere Lärmschutz- und Betriebsrichtlinien haben, die eingehalten werden müssen",
    seasonal_considerations:
      "Offene Küstenumgebungen erfordern durchdachte Planung für Windverhältnisse, Sonneneinstrahlung und möglichen Regen; der Zeitpunkt der Zeremonie wird sorgfältig auf das natürliche Tageslicht und optimale Fotobedingungen abgestimmt; Morgen und später Nachmittag bieten das schönste und gleichmäßigste Licht für Schauplätze am Strand und im Garten",
    highlights: [
      "Stille Zeremonieschauplätze am Strand fernab von Balis belebteren Küsten",
      "Offene Landschaften mit ruhiger Atmosphäre und natürlichem Küstenlicht",
      "Eine einzigartige Balance zwischen Strand- und Gartenumgebungen",
      "Weniger überlaufene und privatere Locations an der Küste",
      "Aus Zentral- und Süd-Bali leicht erreichbar",
    ],
    best_for: [
      "Paare, die eine friedliche und intime Küstenumgebung suchen",
      "Stille Zeremonien am Strand bei weichem natürlichem Licht",
      "Eine entspannte und zugleich kuratierte, wunderschön erlesene Atmosphäre",
      "Eine Balance zwischen Offenheit und Privatsphäre in natürlicher Umgebung",
      "Ruhige und bedeutungsvolle Destination Weddings abseits kommerzieller Gegenden",
    ],
    ceremony_options: [
      "Stille Zeremonien am Strand neben offenen Küstenlandschaften",
      "Zeremonieschauplätze im Garten, umgeben von natürlichem Grün",
      "Zeremonien am Strand in Privatvillen und Anwesen",
      "Intime Elopements am Strand in entspannter Umgebung",
      "Zeremonien in Locations zwischen Innen und Außen mit Küstengarten-Fluss",
    ],
    reception_options: [
      "Dinner-Empfänge unter freiem Himmel am Strand mit Küstenatmosphäre",
      "Empfänge in Garten und auf Rasenflächen, umgeben von natürlichem Grün",
      "Intime Feiern in Privatvillen und Anwesen",
      "Entspannte Zusammenkünfte am Meer mit erlesenem Styling",
      "Abendempfänge am Strand mit Stimmungslicht und Meeresbrise",
    ],
    accommodation_nearby: [
      "Private Küstenvillen und Anwesen",
      "Boutique-Resorts und Gästehäuser direkt am Strand",
      "Naturintegrierte Villenunterkünfte in der Nähe von Ubud",
      "Friedliche Aufenthalte am Wasser entlang der Küste von Gianyar",
    ],
    dining_experiences: [
      "Dinner-Erlebnisse mit privatem Koch am Strand und im Garten",
      "Frische lokale und Küstenküche mit balinesischen Einflüssen",
      "Entspannte und intime Dinner-Schauplätze unter freiem Himmel",
      "Farm-to-Table- und Bio-Catering in natürlicher Umgebung",
    ],
    unique_features: [
      "Zeremonie an einem ruhigen Küstenabschnitt fernab vom Trubel",
      "Ein entspanntes und bedeutungsvolles Beisammensein, geprägt von Licht und Raum",
      "Das einzigartige Zusammenspiel von Strand- und Gartenumgebungen",
      "Ein ruhiges und natürlich elegantes Hochzeitserlebnis an der Küste",
      "Eine Feier, die intim, offen und still unvergesslich wirkt",
    ],
  },
  "tegallalang-wedding": {
    name: "Tegallalang",
    type: "Reisterrassenlandschaft",
    description:
      "Vielschichtige Reisterrassen, weiches natürliches Licht und ikonische Szenerie Balis – ideal für intime, malerische und landschaftsgeprägte Hochzeiten, die weit und zutiefst persönlich zugleich wirken.",
    long_description:
      "Tegallalang ist eine von Balis ikonischsten Landschaften, bekannt für ihre vielschichtigen Reisterrassen, weiches natürliches Licht und ein Gefühl von Offenheit, das ruhig und visuell eindrucksvoll zugleich wirkt. Wir gestalten Hochzeiten in Tegallalang, die tief mit dem Land verbunden sind – und Feiern schaffen, die organisch, bewusst und visuell poetisch wirken. Unsere Hochzeiten in Tegallalang werden von weitläufigen grünen Terrassen, Morgennebel und einer stillen Atmosphäre geprägt, in der sich jeder Moment bodenständig und gegenwärtig anfühlt. Wir arbeiten mit Paaren, die Tegallalang wegen der einzigartigen Szenerie, der Nähe zu Ubud und der Möglichkeit wählen, ein Hochzeitserlebnis zu schaffen, das intim und weit zugleich wirkt.",
    atmosphere:
      "Malerisch und doch intim – organisch und designbewusst, lichtdurchflutet und natürlich ausdrucksstark, mit eleganter, bodenständiger Schlichtheit, geprägt von Landschaft und Horizont",
    accessibility_notes:
      "Reisterrassenumgebungen können Stufen, Hänge und unebenen Boden mit sich bringen, was eine sorgfältige Planung des Gästeflusses erfordert; die Nähe zu Ubud bietet gute Unterkunftsoptionen; Gelände- und Höhenunterschiede müssen bei der Eventgestaltung berücksichtigt werden",
    seasonal_considerations:
      "Morgen und später Nachmittag bieten das schmeichelhafteste natürliche Licht für Zeremonien und Fotografie; offene Landschaften erfordern Vorbereitung auf Sonneneinstrahlung, Luftfeuchtigkeit und möglichen Regen; das Design sollte die umgebende landwirtschaftliche und natürliche Umgebung respektieren und sich in sie einfügen",
    highlights: [
      "Ikonische Zeremoniekulissen mit vielschichtigen Reisterrassen",
      "Offene Landschaften mit weiten Naturblicken",
      "Sanfter Morgennebel und goldenes Licht am späten Nachmittag",
      "Ruhige und von der Natur geleitete Umgebung",
      "Nähe zu Ubuds Kultur und Annehmlichkeiten",
    ],
    best_for: [
      "Zeremonieschauplätze auf Reisterrassen und in der Landschaft",
      "Paare, die eine einzigartige und ikonische Kulisse Balis suchen",
      "Naturintegrierte und visuell poetische Feiern",
      "Intime Hochzeiten mit einem Gefühl von Offenheit und Raum",
      "Erlebnisse am Morgen mit Fokus auf landschaftliche Fotografie",
    ],
    ceremony_options: [
      "Zeremonien mit Blick über die Reisterrassen",
      "Offene Terrassen- und Landschaftsschauplätze",
      "Zeremonien auf Terrassen von Villen und Boutique-Locations",
      "Intime Elopements mit Terrassenblick",
    ],
    reception_options: [
      "Intime Villenempfänge mit Terrassenblick",
      "Gartenzusammenkünfte inmitten der Natur",
      "Feiern in Boutique-Locations",
      "Stille und bedeutungsvolle Dinner im kleinen Rahmen",
    ],
    accommodation_nearby: [
      "Boutique-Villen und Resorts mit Blick auf die Reisfelder",
      "Heritage-Hotels und Öko-Lodges in Ubud",
      "Naturintegrierte Privatvillen",
      "Wellness- und Retreat-Anlagen in der Nähe",
    ],
    dining_experiences: [
      "Farm-to-Table-Küche und Küche mit lokalen Zutaten",
      "Terrassen-Dinner-Erlebnisse mit privatem Koch",
      "Bio- und Wellness-orientierte Menüs",
      "Intime Dinner mit Blick auf die Reisterrassen",
    ],
    unique_features: [
      "Zeremonie mit Blick über vielschichtige grüne Reisterrassen",
      "Stilles und bedeutungsvolles Beisammensein in der ikonischen Landschaft Balis",
      "Feier, geprägt von Natur und offenem Raum",
      "Ein ebenso ikonischer wie zutiefst persönlicher Hochzeitsrahmen",
      "Umweltsensibles und naturintegriertes Design",
    ],
  },
  "sidemen-wedding": {
    name: "Sidemen",
    type: "Tal & Reisfeld",
    description:
      "Weitläufige Reisfelder, Flusstäler und Blicke auf den Mount Agung – ideal für intime, zutiefst persönliche und in die Natur eingetauchte Hochzeiten, verwurzelt in Stille und Authentizität.",
    long_description:
      "Sidemen ist eine von Balis unberührtesten und atmosphärischsten Regionen, bekannt für weitläufige Reisfelder, Flusstäler und Blicke auf den Mount Agung, die eine Landschaft schaffen, die kraftvoll und zutiefst ruhig zugleich ist. Wir gestalten Hochzeiten in Sidemen, die in Stille und Verbundenheit verwurzelt sind – und Feiern schaffen, die intim, bedeutungsvoll und in die Natur eingetaucht wirken. Unsere Hochzeiten in Sidemen werden von offenen Tälern, vielschichtigem Grün und einer Stille geprägt, in der sich jeder Moment mit Klarheit und Absicht entfalten kann. Wir arbeiten mit Paaren, die Sidemen wegen der Authentizität, der Distanz zum Trubel und der Möglichkeit wählen, ein wahrhaft persönliches Hochzeitserlebnis zu bieten.",
    atmosphere:
      "Zutiefst ruhig und immersiv – intim und emotional bodenständig, natürlich und zurückhaltend, mit eleganter stiller Raffinesse, geprägt von Tal, Reisfeld und Berg",
    accessibility_notes:
      "Abgelegenere Lage, die klare Planung von Gästetransport und Logistik erfordert; offene Landschaften und natürliches Gelände verlangen sorgfältige Layout- und Ablaufplanung; Einrichtungen, Schatten und Layout müssen im Sinne des Gästekomforts durchdacht gestaltet werden",
    seasonal_considerations:
      "Der Zeitpunkt der Zeremonie wird sorgfältig geplant, um das schönste natürliche Licht über Tal- und Berglandschaften einzufangen; Vorbereitung auf Sonneneinstrahlung, Luftfeuchtigkeit und gelegentlichen Regen ist unerlässlich; offenes Gelände erfordert durchdachte Wetterausweichplanung",
    highlights: [
      "Weite Ausblicke auf Reisfelder und Tal bei der Zeremonie",
      "Der Mount Agung als kraftvolle und symbolische Kulisse",
      "Stille und unberührte, authentische Naturumgebung",
      "Boutique-Refugien und Privatvillen, in die Natur integriert",
      "Zutiefst intime und persönliche Atmosphäre",
    ],
    best_for: [
      "Paare, die Privatsphäre, Abgeschiedenheit und emotionale Tiefe suchen",
      "Naturintegrierte und landschaftsgeprägte Zeremonieschauplätze",
      "Intime Hochzeiten in authentischer, nicht kommerzieller Umgebung",
      "Elopements mit Stille und bedeutungsvoller persönlicher Verbindung",
      "Ein langsamerer, bodenständigerer und bedeutungsvollerer Weg zur Hochzeit",
    ],
    ceremony_options: [
      "Zeremonien mit Blick über Reisfelder und Tal",
      "Zeremonieschauplätze mit Blick auf den Mount Agung",
      "Zeremonien in Boutique-Villen und Retreat-Gärten",
      "Intime Elopements in offenen Naturlandschaften",
    ],
    reception_options: [
      "Empfänge in Privatvillen und Boutique-Retreats",
      "Intime Dinner inmitten der Natur",
      "Zusammenkünfte im Garten im kleinen Rahmen",
      "Mehrteilige Erlebnisse im Retreat-Stil",
    ],
    accommodation_nearby: [
      "Boutique-Retreat-Villen mit Talblick",
      "Naturintegrierte Privatvillen",
      "Öko-Lodges und nachhaltige Aufenthalte",
      "Heritage- und Kultur-Gästehäuser",
    ],
    dining_experiences: [
      "Farm-to-Table-Küche und Küche mit lokalem Anbau",
      "Dinner-Erlebnisse mit privatem Koch und Talblick",
      "Traditionelle balinesische Mahlzeiten und Mahlzeiten im Gemeinschaftsstil",
      "Intime Dinner, umgeben von Natur",
    ],
    unique_features: [
      "Zeremonie mit Blick über Reisfelder vor der Kulisse des Mount Agung",
      "Stilles und bedeutungsvolles Beisammensein im unberührten Bali",
      "Immersives Erlebnis, geprägt von Tal- und Bergnatur",
      "Zutiefst persönlicher und emotional unvergesslicher Rahmen",
      "Authentische Distanz zu kommerziellen Touristendestinationen",
    ],
  },
  "amed-wedding": {
    name: "Amed",
    type: "Rohe Küstenschlichtheit",
    description:
      "Schwarze Vulkanstrände, ruhiges Wasser und weite Horizontblicke – ideal für intime, authentische und in die Natur eingetauchte Hochzeiten, geprägt von Schlichtheit und roher Küstenschönheit.",
    long_description:
      "Amed ist eine von Balis rohesten und unberührtesten Küstendestinationen, bekannt für schwarze Vulkanstrände, ruhiges Wasser und weite Ausblicke bis zum Horizont. Wir gestalten Hochzeiten in Amed, die seine natürliche Schlichtheit aufgreifen – und Feiern schaffen, die intim, bodenständig und tief mit der Umgebung verbunden wirken. Unsere Hochzeiten in Amed werden von offenen Küsten, sanften Rhythmen des Meeres und einer Stille geprägt, in der sich jeder Moment gegenwärtig und unverfälscht anfühlt. Wir arbeiten mit Paaren, die Amed wegen der Authentizität, der Distanz zum Trubel und der Möglichkeit wählen, ein wahrhaft persönliches Hochzeitserlebnis zu bieten.",
    atmosphere:
      "Schlicht und doch erlesen – intim und bodenständig, ruhig, offen und vom Horizont geleitet, mit eleganter Zurückhaltung, die roh, echt und tief verbunden wirkt",
    accessibility_notes:
      "Abgelegenere Lage, die sorgfältige Koordination von Gästetransport und Zeitplänen erfordert; Vulkansand und unebene Flächen verlangen durchdachte Layout- und Aufbauplanung; sowohl Sonnenaufgang als auch Sonnenuntergang bieten einzigartige Lichtmöglichkeiten, die die Planung der Zeremonie beeinflussen",
    seasonal_considerations:
      "Offene Küstenumgebungen erfordern Vorbereitung auf Sonne, Wind und Luftfeuchtigkeit; Sonnenaufgang und Sonnenuntergang bieten beide wunderschönes und einzigartiges Licht für Zeremonien und Fotografie; die Trockenzeit wird für die Reiselogistik zu dieser abgelegenen Location bevorzugt",
    highlights: [
      "Schauplätze am schwarzen Vulkanstrand und an der rohen Küste",
      "Weite Meerblicke, die auf den Mount Agung treffen",
      "Stille, unberührte und nicht kommerzielle Atmosphäre",
      "Boutique-Resorts und Privatvillen in der Natur",
      "Authentischer und zutiefst intimer Küstencharakter",
    ],
    best_for: [
      "Paare, die Privatsphäre, Schlichtheit und Verbundenheit suchen",
      "Stille Zeremonieschauplätze am Meer fernab vom Trubel",
      "Intime Elopements mit rohem und unverfälschtem Gefühl",
      "In die Natur eingetauchte Feiern in langsamerem Tempo",
      "Eine Verbindung zwischen Meer, Berg und Landschaft",
    ],
    ceremony_options: [
      "Zeremonien am Meer mit Blick auf den Mount Agung",
      "Schauplätze am schwarzen Vulkanstrand",
      "Zeremonien in Boutique-Villen und Resortgärten",
      "Intime Elopements bei Sonnenaufgang oder Sonnenuntergang",
    ],
    reception_options: [
      "Intime Dinner direkt am Meer",
      "Empfänge in Boutique-Resorts und Villen",
      "Entspannte Zusammenkünfte im kleinen Rahmen",
      "Feiererlebnisse inmitten der Natur",
    ],
    accommodation_nearby: [
      "Boutique-Resorts direkt am Meer und Öko-Lodges",
      "Private Küstenvillen",
      "Tauchresorts und Naturrefugien",
      "Einfache und authentische Aufenthalte in Gästehäusern",
    ],
    dining_experiences: [
      "Frische Meeresfrüchte und lokale Küstenküche",
      "Intime Dinner-Erlebnisse mit privatem Koch",
      "Mahlzeiten am Meer bei Sonnenaufgang oder Sonnenuntergang",
      "Einfaches und authentisches Catering mit lokalen Zutaten",
    ],
    unique_features: [
      "Stille Zeremonie am rohen und authentischen Meer Balis",
      "Bedeutungsvolles und intimes Beisammensein, geprägt vom Horizont",
      "Feier, geprägt von Schlichtheit, Verbundenheit und natürlicher Schönheit",
      "Rohe, echte und unvergessliche Hochzeitsatmosphäre",
      "Einzigartige Kombination aus Vulkanstrand und Bergblick",
    ],
  },
  "manggis-wedding": {
    name: "Manggis",
    type: "Balance zwischen Küste & Natur",
    description:
      "Ruhige Küste, üppige tropische Umgebung und zurückhaltende Eleganz – ideal für ruhige, intime und natürlich ausgewogene Hochzeiten in Ost-Bali.",
    long_description:
      "Manggis ist eine von Balis still erlesensten Küstendestinationen in Ost-Bali, bekannt für ihre ruhige Küste, üppige Umgebung und ein Gefühl zurückhaltender Eleganz, das natürlich und gehoben zugleich wirkt. Wir gestalten Hochzeiten in Manggis, die diese Balance aufgreifen – und Feiern schaffen, die ruhig, intim und durchdacht komponiert wirken. Unsere Hochzeiten in Manggis werden vom Zusammentreffen von Meer und Grün geprägt, wo sich Küstenblicke nahtlos mit tropischen Landschaften verbinden. Wir arbeiten mit Paaren, die Manggis wegen der friedlichen Atmosphäre, der Nähe zu Sidemen und Candidasa und der Möglichkeit wählen, ein Hochzeitserlebnis zu bieten, das privat und erlesen zugleich wirkt.",
    atmosphere:
      "Ruhig und doch erlesen – intim und ausgewogen, natürlich und sanft elegant, entspannt mit gepflegter Note, wo Meer und tropisches Grün harmonisch aufeinandertreffen",
    accessibility_notes:
      "Lage in Ost-Bali, die klare Planung von Gästetransport und Logistik erfordert; das Layout muss die Übergänge zwischen Strand und angelegten Gartenbereichen berücksichtigen; sowohl Sonnenaufgang als auch Sonnenuntergang bieten wunderschönes Licht, das die Planung der Zeremonie beeinflusst",
    seasonal_considerations:
      "Vorbereitung auf Sonne, Luftfeuchtigkeit und gelegentlichen Regen ist unerlässlich; das natürliche Licht variiert im Tagesverlauf zwischen Küsten- und Gartenschauplätzen; der nahtlose Fluss zwischen Zeremonie- und Empfangsbereichen sollte die Klimamuster Ost-Balis berücksichtigen",
    highlights: [
      "Ruhige Küste Ost-Balis und Meerblicke",
      "Üppiges tropisches Grün trifft auf Küstenlandschaften",
      "Stille und weniger kommerzielle erlesene Umgebung",
      "Boutique-Resorts mit Privatsphäre und erlesenem Service",
      "Nähe zu Sidemen, Candidasa und Taman Ujung",
    ],
    best_for: [
      "Paare, die Harmonie von Küste und Natur suchen",
      "Intime und ruhige Zeremonieschauplätze am Meer",
      "Private und erlesene Feiern fernab vom Trubel",
      "Ausgewogene tropische und küstennahe Hochzeitsatmosphären",
      "Ein langsameres, ruhiges und bedeutungsvolles Tempo",
    ],
    ceremony_options: [
      "Zeremonien mit Meerblick vor tropischen Kulissen",
      "Schauplätze in Küstengärten und am Strand",
      "Zeremonien auf Rasenflächen und Terrassen von Boutique-Resorts",
      "Intime Elopements im Villengarten",
    ],
    reception_options: [
      "Dinner- und Gesellschaftsempfänge direkt am Meer",
      "Feiern in Garten und tropischer Landschaft",
      "Empfänge in Boutique-Resorts und Villen",
      "Intime entspannte Zusammenkünfte an der Küste",
    ],
    accommodation_nearby: [
      "Boutique-Küstenresorts in Ost-Bali",
      "Privatvillen mit Meer- und Gartenblick",
      "Naturintegrierte Retreat-Anlagen",
      "Aufenthalte in Heritage-Unterkünften und Öko-Lodges",
    ],
    dining_experiences: [
      "Dinner am Meer mit Blick auf tropische Gärten",
      "Erlebnisse mit privatem Koch und Boutique-Catering",
      "Frische Meeresfrüchte und lokale Küche Ost-Balis",
      "Intime Dinner-Schauplätze bei Sonnenaufgang oder Sonnenuntergang",
    ],
    unique_features: [
      "Zeremonie mit Blick über das Meer und üppiges Grün",
      "Beisammensein, umgeben von ausgewogener Küsten- und Tropennatur",
      "Entspannte und zugleich erlesene Küstenfeier in Ost-Bali",
      "Balis stille Küstenelegance als Hochzeitskulisse",
      "Harmonie von Meer, Landschaft und intimer Atmosphäre",
    ],
  },
  "candidasa-wedding": {
    name: "Candidasa",
    type: "Ruhiger Küstenhorizont",
    description:
      "Ruhige Küste, offene Horizontblicke und stille Authentizität – ideal für intime, ruhige und natürlich elegante Hochzeiten an der Küste abseits von Balis belebteren Destinationen.",
    long_description:
      "Candidasa ist eine von Balis friedlichsten Küstendestinationen in Ost-Bali, bekannt für ihre ruhige Küste, Blicke aufs Meer und eine stille Atmosphäre, die authentisch und erlesen zugleich wirkt. Wir gestalten Hochzeiten in Candidasa, die dieses Gefühl von Ruhe aufgreifen – und Feiern schaffen, die intim, ausgewogen und natürlich elegant wirken. Unsere Hochzeiten in Candidasa werden von offenen Meerblicken, sanftem Küstenlicht und einem langsameren Rhythmus geprägt, in dem sich jeder Moment gegenwärtig und bedeutungsvoll anfühlt. Wir arbeiten mit Paaren, die Candidasa wegen der friedlichen Umgebung, des zurückhaltenden Charmes und der Möglichkeit wählen, ein Hochzeitserlebnis fernab vom Trubel zu bieten.",
    atmosphere:
      "Ruhig und doch erlesen – intim und bodenständig, offen, luftig und vom Horizont geleitet, mit eleganter zurückhaltender Schlichtheit und authentischem Küstencharme",
    accessibility_notes:
      "Lage in Ost-Bali, die sorgfältige Reiselogistik für Gäste und Dienstleister erfordert; offene Bereiche am Meer verlangen Aufmerksamkeit für Wind, Layout und Standfestigkeit der Dekorationselemente; Boutique-Resorts und Villen bieten Komfort in natürlicher Umgebung",
    seasonal_considerations:
      "Sowohl Sonnenaufgang als auch Sonnenuntergang bieten wunderschönes Licht, das die Planung der Zeremonie beeinflusst; Vorbereitung auf Sonne, Luftfeuchtigkeit und gelegentlichen Regen ist unerlässlich; Planung von Schatten, Bestuhlung und Layout ist für Umgebungen unter freiem Himmel wichtig",
    highlights: [
      "Ruhige Küste Ost-Balis mit offenen Horizontblicken",
      "Friedliche und weniger kommerzielle Küstenatmosphäre",
      "Ungestörte Meerblicke von den Zeremonieschauplätzen",
      "Boutique-Resorts und Privatvillen mit Privatsphäre",
      "Authentischer Küstencharme Balis und zurückhaltende Eleganz",
    ],
    best_for: [
      "Stille Zeremonien am Meer mit offenem Horizont",
      "Paare, die Ruhe und Privatsphäre fernab vom Trubel suchen",
      "Intime und bedeutungsvolle Hochzeitserlebnisse an der Küste",
      "Ein langsameres, entspanntes und authentisches Tempo",
      "Küstencharme Ost-Balis mit erlesener Schlichtheit",
    ],
    ceremony_options: [
      "Zeremonien am Meer mit offenen Horizontblicken",
      "Boutique-Resorts an der Küste und Rasenschauplätze",
      "Zeremonien in Villengärten und am Meer",
      "Intime Elopements am Strand",
    ],
    reception_options: [
      "Dinner-Feiern direkt am Meer",
      "Empfänge auf Terrassen von Boutique-Resorts",
      "Intime Zusammenkünfte im Garten und an der Küste",
      "Entspannte Empfangserlebnisse in der Villa",
    ],
    accommodation_nearby: [
      "Boutique-Resorts am Meer in Ost-Bali",
      "Private Küstenvillen",
      "Aufenthalte in Heritage-Resorts und Öko-Lodges",
      "Naturintegrierte Retreat-Anlagen",
    ],
    dining_experiences: [
      "Dinner am Meer mit Horizontblick",
      "Frische Meeresfrüchte und lokale Küche Ost-Balis",
      "Intime Dinner-Erlebnisse mit privatem Koch",
      "Boutique-Catering mit entspanntem Küstengefühl",
    ],
    unique_features: [
      "Zeremonie mit Blick über das offene und ungestörte Meer",
      "Stilles und bedeutungsvolles Beisammensein im authentischen Bali",
      "Entspannte und zugleich elegante Atmosphäre einer Küstenfeier",
      "Balis ruhige Ostküste als Hochzeitskulisse",
      "Zurückhaltender Charme und natürliche Küstenelegance",
    ],
  },
  "taman-ujung-wedding": {
    name: "Taman Ujung",
    type: "Heritage-Wasserpalast",
    description:
      "Königlicher Wasserpalast, spiegelnde Teiche und klassische balinesische Architektur vor dem Mount Agung – ideal für zeitlose, künstlerische und kulturell reiche Destination Weddings.",
    long_description:
      "Taman Ujung ist eine von Balis einzigartigsten und historischsten Hochzeitsdestinationen, bekannt für ihren königlichen Wasserpalast, weitläufige Gärten und architektonische Schönheit vor der Kulisse des Mount Agung und der Ostküste. Wir gestalten Hochzeiten in Taman Ujung, die sowohl den Ort als auch sein Erbe ehren – und Feiern schaffen, die zeitlos, atmosphärisch und zutiefst bewusst wirken. Unsere Hochzeiten in Taman Ujung werden von spiegelndem Wasser, offenen Landschaften und klassischer balinesischer Architektur geprägt, die jedem Moment ein Gefühl stiller Grandeur verleiht. Wir arbeiten mit Paaren, die Taman Ujung wegen seiner kulturellen Bedeutung, seiner visuellen Symmetrie und der Möglichkeit wählen, ein wahrhaft unverwechselbares Hochzeitserlebnis zu schaffen.",
    atmosphere:
      "Zeitlos und doch unverwechselbar – elegant und visuell strukturiert, künstlerisch und atmosphärisch, großartig und doch ruhig, mit einem Gefühl stiller Grandeur, verwurzelt in Erbe und Spiegelung",
    accessibility_notes:
      "Historische Stätte, die möglicherweise Genehmigungen und die Einhaltung besonderer Richtlinien erfordert; große offene Flächen und Wege verlangen durchdachte Planung der Gästebewegung; Transport und Koordination müssen wegen der Lage in Ost-Bali sorgfältig organisiert werden",
    seasonal_considerations:
      "Historischer Schauplatz im Freien, der Vorbereitung auf Sonneneinstrahlung, Wind und Regen erfordert; das Styling sollte den Raum aufwerten, ohne seine architektonische und kulturelle Bedeutung zu überlagern; das Timing ist darauf ausgelegt, das optimale Licht über Wasserflächen und Gärten einzufangen",
    highlights: [
      "Historischer königlicher Wasserpalast und spiegelnde Teiche",
      "Weitläufige klassische balinesische Gärten",
      "Architektonische Symmetrie und kulturelle Grandeur",
      "Mount Agung und Ostküste als Kulisse",
      "Einzigartiger und wahrhaft unverwechselbarer Hochzeitsrahmen auf Bali",
    ],
    best_for: [
      "Paare, die eine historische und architektonische Hochzeitskulisse suchen",
      "Künstlerische und kulturell reiche Feierschauplätze",
      "Visuell eindrucksvolle und zeitlose Atmosphären",
      "Hochzeiten, die kulturelles Erbe mit erlesenem Design verbinden",
      "Ein einzigartiges, unvergessliches und ikonisches Erlebnis",
    ],
    ceremony_options: [
      "Zeremonien in den Bereichen der spiegelnden Teiche des Wasserpalastes",
      "Schauplätze an Gartenwegen und Brücken",
      "Zeremonien an der historischen Stätte in offener Landschaft",
      "Intime Räume innerhalb der architektonischen Umgebung",
    ],
    reception_options: [
      "Empfänge in Heritage-Gärten und auf dem Palastgelände",
      "Elegante Dinner-Zusammenkünfte in offener Landschaft",
      "Feiern vor kultureller und architektonischer Kulisse",
      "Intime Zusammenkünfte im Palastrahmen",
    ],
    accommodation_nearby: [
      "Boutique-Resorts und Heritage-Hotels in Ost-Bali",
      "Private Küstenvillen in der Nähe von Candidasa",
      "Naturrefugien und Öko-Lodges",
      "Unterkünfte in der Nähe in Sidemen und Manggis",
    ],
    dining_experiences: [
      "Elegante Dinner-Erlebnisse im historischen Rahmen",
      "Privatkoch und kulturelle Catering-Services",
      "Traditionelle, von der balinesischen Küche inspirierte Gerichte",
      "Intimes Dinner im Garten mit architektonischen Ausblicken",
    ],
    unique_features: [
      "Zeremonie in einem historischen königlichen balinesischen Wasserpalast",
      "Visuell eindrucksvolles und bedeutungsvolles Beisammensein im historischen Rahmen",
      "Feier, geprägt von Architektur, Wasser und Natur",
      "Zeitlose und unvergessliche kulturelle Hochzeitskulisse",
      "Eine von Balis unverwechselbarsten und ikonischsten Locations",
    ],
  },
  "tulamben-wedding": {
    name: "Tulamben",
    type: "Raue Vulkanküste",
    description:
      "Vulkanische Küste, ruhiges Wasser und stille Atmosphäre am Meer, geprägt vom Mount Agung – ideal für intime, elementare und zutiefst authentische Destination Weddings an der Küste.",
    long_description:
      "Tulamben ist eine von Balis einzigartigsten Küstendestinationen, bekannt für ihre vulkanische Küste, ruhiges Wasser und eine stille Atmosphäre, geprägt von der Präsenz des Mount Agung und des weiten offenen Meeres. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten in Tulamben, die seinen rohen und elementaren Charakter aufgreifen – und Feiern schaffen, die intim, bodenständig und tief mit der Natur verbunden wirken. Unsere Hochzeiten in Tulamben werden von dunklen Vulkansteinen, stillen Meereshorizonten und einem Gefühl von Tiefe geprägt, in dem sich jeder Moment still und bedeutungsvoll anfühlt. Wir arbeiten mit Paaren, die Tulamben wegen der Authentizität, der friedlichen Umgebung und der Möglichkeit wählen, ein Hochzeitserlebnis weit abseits des Üblichen zu bieten.",
    atmosphere:
      "Roh und doch erlesen – intim und zutiefst bodenständig, ruhig, offen und elementar, mit eleganter natürlicher Schlichtheit, geprägt von Vulkanküste und offenem Meereshorizont",
    accessibility_notes:
      "Lage in Ost-Bali, die sorgfältige Koordination von Gästetransport und Zeitplänen erfordert; felsiges und unebenes Vulkangelände verlangt durchdachte Layout- und Aufbauplanung; Boutique-Anlagen bieten Komfort in natürlicher und abgelegener Umgebung",
    seasonal_considerations:
      "Sowohl Sonnenaufgang als auch Sonnenuntergang bieten einzigartige Lichtverhältnisse, die die Planung der Zeremonie beeinflussen; offene Umgebungen erfordern Vorbereitung auf Sonne, Wind und Luftfeuchtigkeit; Schatten, Bestuhlung und Einrichtungen müssen in abgelegener Umgebung sorgfältig für den Gästekomfort organisiert werden",
    highlights: [
      "Dramatische schwarze Vulkanküste mit offenen Meerblicken",
      "Mount Agung als Kulisse von der Küste aus",
      "Stille und nicht kommerzielle, authentische Atmosphäre",
      "Boutique-Resorts mit starker Verbindung zur Umgebung",
      "Zutiefst intimer und roher natürlicher Küstenrahmen",
    ],
    best_for: [
      "Stille Zeremonieschauplätze am Meer",
      "Vulkanstrände mit starkem natürlichem Charakter",
      "Paare, die eine friedliche und nicht kommerzielle Umgebung suchen",
      "Intime und zutiefst persönliche Hochzeitserlebnisse",
      "Ein roher und unberührter Küstenrahmen mit Privatsphäre",
    ],
    ceremony_options: [
      "Zeremonien am Meer an der Vulkanküste",
      "Schauplätze am Strand von Boutique-Resorts",
      "Intime Elopements am offenen Meer",
      "Zeremonien bei Sonnenaufgang oder Sonnenuntergang am Vulkanstrand",
    ],
    reception_options: [
      "Empfänge in Boutique-Resorts und Villen direkt am Meer",
      "Intime Zusammenkünfte unter freiem Himmel am Meer",
      "Entspannte Küstenfeiern im kleinen Rahmen",
      "Dinner-Erlebnisse inmitten der Natur",
    ],
    accommodation_nearby: [
      "Boutique-Resorts am Meer und Tauch-Lodges",
      "Private Küstenvillen",
      "Naturrefugien und Öko-Lodges",
      "Einfache und authentische Aufenthalte in Gästehäusern",
    ],
    dining_experiences: [
      "Frische Meeresfrüchte und lokale Küstenküche",
      "Intime Dinner-Erlebnisse mit privatem Koch",
      "Mahlzeiten am Meer bei Sonnenaufgang oder Sonnenuntergang",
      "Einfaches und authentisches Catering mit lokalen Zutaten",
    ],
    unique_features: [
      "Zeremonie an einer rohen Vulkanküste, wie es sie sonst nirgends auf Bali gibt",
      "Stilles und bedeutungsvolles Beisammensein, geprägt von Meer und Mount Agung",
      "Feier, geprägt von elementarer Schlichtheit und natürlicher Tiefe",
      "Rohe, echte und unvergessliche Atmosphäre an der Vulkanküste",
      "Einzigartige Kombination aus Vulkanstrand, ruhigem Meer und Bergkulisse",
    ],
  },
  "tirta-gangga-wedding": {
    name: "Tirta Gangga",
    type: "Heritage-Wassergarten",
    description:
      "Königliche Wassergärten, spiegelnde Teiche und Steinwege in einer ikonischen Kulturlandschaft – ideal für intime, zeitlose und kulturell reiche Destination Weddings.",
    long_description:
      "Tirta Gangga ist eine von Balis ikonischsten Kulturlandschaften, bekannt für ihre königlichen Wassergärten, Steinwege und stillen Teiche, die einen Rahmen schaffen, der ruhig und visuell poetisch zugleich ist. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten in Tirta Gangga, die sein Erbe und seine Atmosphäre ehren – und Feiern schaffen, die intim, zeitlos und tief mit dem Ort verbunden wirken. Unsere Hochzeiten in Tirta Gangga werden von spiegelndem Wasser, behauenem Stein und einer Stille geprägt, in der sich jeder Moment ruhig und bewusst anfühlt. Wir arbeiten mit Paaren, die Tirta Gangga wegen der kulturellen Tiefe, der einzigartigen Ästhetik und der Möglichkeit wählen, ein wahrhaft unverwechselbares Hochzeitserlebnis zu schaffen.",
    atmosphere:
      "Ruhig und doch visuell eindrucksvoll – intim und atmosphärisch, künstlerisch und kulturell verwurzelt, elegant mit stiller Raffinesse, geprägt von Wasser, Stein und Erbe",
    accessibility_notes:
      "Historische und kulturelle Stätte, die Genehmigungen und die Einhaltung besonderer Richtlinien der Stätte erfordert; Trittsteine und Wasserwege verlangen sorgfältige Planung für Gästefluss und Sicherheit; Lage in Ost-Bali, die gut abgestimmten Transport und Logistik erfordert",
    seasonal_considerations:
      "Gartenumgebung im Freien mit Wasserelementen, die Vorbereitung auf Sonne, Luftfeuchtigkeit und Regen erfordert; das Styling sollte den Rahmen aufwerten, ohne seinen architektonischen und kulturellen Charakter zu überlagern; das Timing ist darauf ausgelegt, die optimale Spiegelung des Lichts auf Teichen und Flächen einzufangen",
    highlights: [
      "Ikonischer königlicher balinesischer Wassergarten als Schauplatz",
      "Spiegelnde Teiche und steinerne Trittwege",
      "Kulturell reiche und historisch bedeutsame Landschaft",
      "Friedliche und meditative Heritage-Atmosphäre",
      "Visuell einzigartige und künstlerisch poetische Umgebung",
    ],
    best_for: [
      "Zeremonieschauplätze im Wassergarten mit spiegelnden Teichen",
      "Paare, die eine kulturell reiche und historische Umgebung suchen",
      "Eine ruhige und besinnliche Hochzeitsatmosphäre",
      "Architektonische und künstlerische Schönheit als Hochzeitskulisse",
      "Ein zeitloses und zutiefst bedeutungsvolles Hochzeitserlebnis",
    ],
    ceremony_options: [
      "Zeremonien zwischen spiegelnden Teichen und Trittsteinen",
      "Schauplätze an Wegen im Wassergarten und im historischen Rahmen",
      "Intime Elopements in kultureller Umgebung",
      "Zeremonien im offenen Garten und an Wasserelementen",
    ],
    reception_options: [
      "Intime Dinner-Zusammenkünfte im Heritage-Garten",
      "Empfänge in Kulturlandschaft und Garten",
      "Kleine und bedeutungsvolle Feiern im Wassergarten",
      "Stille und atmosphärische Abendveranstaltungen",
    ],
    accommodation_nearby: [
      "Boutique-Resorts und Heritage-Hotels in Ost-Bali",
      "Private Küstenvillen in der Nähe von Candidasa und Amlapura",
      "Naturrefugien und Öko-Lodges",
      "Unterkünfte in der Nähe in Manggis und Sidemen",
    ],
    dining_experiences: [
      "Elegante Dinner-Erlebnisse im historischen Rahmen",
      "Privatkoch und kulturelle Catering-Services",
      "Traditionelle, von der balinesischen Küche inspirierte Gerichte",
      "Intimes Dinner im Garten mit architektonischen Ausblicken",
    ],
    unique_features: [
      "Zeremonie, umgeben von königlichen balinesischen Wassergärten",
      "Stilles und bedeutungsvolles Beisammensein, geprägt von Wasser und Stein",
      "Feier, die kulturelles Erbe und erlesenes Design ehrt",
      "Zeitloser und unvergesslicher ikonischer Heritage-Rahmen auf Bali",
      "Eine von Balis künstlerisch unverwechselbarsten Hochzeitskulissen",
    ],
  },
  "savana-tianyar-wedding": {
    name: "Savana Tianyar",
    type: "Filmreife Savanne & Vulkan",
    description:
      "Weite offene Savanne, goldene Gräser und dramatische Blicke auf den Mount Agung – ideal für mutige, filmreife und visuell außergewöhnliche Destination Weddings in ungezähmter Natur.",
    long_description:
      "Savana Tianyar ist eine von Balis außergewöhnlichsten und weniger bekannten Landschaften an der Ostküste, bekannt für weite offene Savanne, goldene Gräser und dramatische Blicke auf den Mount Agung. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten in Savana Tianyar, die seine weite und ungezähmte Schönheit aufgreifen – und Feiern schaffen, die weit, filmreif und tief mit der Natur verbunden wirken. Unsere Hochzeiten in Savana Tianyar werden von offenen Horizonten, erdigen Texturen und einem Gefühl von Freiheit geprägt, in dem sich jeder Moment kraftvoll und unverfälscht anfühlt. Wir arbeiten mit Paaren, die Savana Tianyar wegen seiner Einzigartigkeit, seiner dramatischen Landschaft und der Möglichkeit wählen, ein Hochzeitserlebnis wie nirgendwo sonst auf Bali zu schaffen.",
    atmosphere:
      "Filmreif und doch bodenständig – mutig und visuell ausdrucksstark, offen, luftig und weit, elegant in einer rohen und ungezähmten Naturlandschaft, geprägt von Savanne und Vulkan",
    accessibility_notes:
      "Abgelegene Lage, die detaillierte Koordination von Transport, Aufbau und Zugang für Dienstleister erfordert; natürliches Gelände verlangt durchdachte Planung für Bodenbeläge, Bestuhlung und bauliche Stabilität; der offene und ungeschützte Rahmen erfordert volle logistische Unterstützung für Gäste und Crew",
    seasonal_considerations:
      "Sonnenaufgang und Sonnenuntergang bieten das dramatischste Licht und beeinflussen die Terminierung der Zeremonie stark; offene Landschaften erfordern volle Vorbereitung auf Sonne, Wind und wechselndes Wetter; Schatten, Einrichtungen und Gästekomfort müssen für offene Umgebungen sorgfältig gestaltet werden",
    highlights: [
      "Weite offene Savanne mit goldenen Gräsern und weitem Himmel",
      "Der dramatische Mount Agung als dominante visuelle Kulisse",
      "Rohe und unberührte Naturumgebung",
      "Filmreifer visueller Rahmen in Editorial-Qualität",
      "Wirklich einzigartige Alternative zu Hochzeiten am Strand oder im Dschungel",
    ],
    best_for: [
      "Paare, die einen mutigen und einzigartigen Landschaftsrahmen suchen",
      "Filmreife Hochzeitserlebnisse im Editorial-Stil",
      "Offener Raum mit ungestörten Blicken auf Savanne und Berg",
      "Eine rohe, ausdrucksstarke und visuell kraftvolle Feier",
      "Von der Natur getriebene Destination Weddings mit dramatischer Szenerie",
    ],
    ceremony_options: [
      "Zeremonien in der offenen Savanne vor der Kulisse des Mount Agung",
      "Zeremonien auf weiten Landschaftsflächen",
      "Intime Elopements im goldenen Savannengelände",
      "Dramatische Naturzeremonien bei Sonnenaufgang oder Sonnenuntergang",
    ],
    reception_options: [
      "Dinner-Zusammenkünfte in der Savanne unter freiem Himmel",
      "Empfänge bei Kerzenschein in der natürlichen Landschaft",
      "Intime und visuell eindrucksvolle Feiern im Freien",
      "Konzeptgetriebene Empfangserlebnisse im Editorial-Stil",
    ],
    accommodation_nearby: [
      "Boutique-Resorts und Öko-Anlagen in Ost-Bali",
      "Private Küstenvillen in der Nähe von Tulamben und Kubu",
      "Natur- und Tauch-Retreat-Lodges",
      "Abgelegene Gästehäuser und Aufenthalte im Hochland",
    ],
    dining_experiences: [
      "Dinner-Erlebnisse mit privatem Koch in offener Landschaft",
      "Lokale Küche Ost-Balis mit frischen Produkten von der Küste",
      "Intime Mahlzeiten in der Savanne bei Sonnenaufgang oder Sonnenuntergang",
      "Konzeptgetriebene, maßgeschneiderte Catering-Services",
    ],
    unique_features: [
      "Zeremonie in einer weiten offenen Savanne – anders als jeder andere Schauplatz auf Bali",
      "Kraftvolles Beisammensein, gerahmt von goldenen Feldern und dem Mount Agung",
      "Feier, geprägt von Natur, Weite und filmreifer Atmosphäre",
      "Mutige, einzigartige und visuell unvergessliche Hochzeitskulisse",
      "Balis dramatischste und unkonventionellste Landschaftslocation",
    ],
  },
  "lovina-wedding": {
    name: "Lovina",
    type: "Ruhige Nordküste",
    description:
      "Ruhiges Meer, Strände mit schwarzem Sand und authentische Atmosphäre Nord-Balis – ideal für friedliche, intime und bedeutungsvoll bodenständige Destination Weddings abseits des Trubels.",
    long_description:
      "Lovina zeigt eine ganz andere Seite von Bali – ruhiger, langsamer und zutiefst verbunden mit der natürlichen Schönheit und dem lokalen Leben der Insel. An Balis Nordküste gelegen, ist Lovina bekannt für ruhiges Meer, Strände mit schwarzem Sand und eine friedliche Küstenatmosphäre. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten in Lovina für Paare, die Stille, Authentizität und bedeutungsvolle Verbindung mit der Natur suchen. Hochzeiten in Lovina entfalten sich in sanfterem Tempo – das Meer ist ruhig, der Horizont wirkt weit, und Feiern wirken intim und bodenständig. Viele Paare wählen Lovina, wenn sie ein Hochzeitserlebnis auf Bali möchten, das fernab vom Trubel liegt und der Essenz der Insel näher ist.",
    atmosphere:
      "Friedlich statt belebt – natürlich statt stark gestylt, intim statt großartig, elegant auf stille und zurückhaltende Weise, geprägt von ruhigem Meer und authentischem lokalem Leben",
    accessibility_notes:
      "Etwa 2,5–3 Stunden vom internationalen Flughafen Balis entfernt, was einen gut organisierten Gästetransport erfordert; einige Dienstleister reisen aus Süd-Bali an, was sorgfältige Terminplanung verlangt; die Lage an der Nordküste schafft einen eigenen logistischen Planungskontext",
    seasonal_considerations:
      "Ruhiges Meer und Küstenklima schaffen wunderschöne Bedingungen, die sorgfältige Planung für Events unter freiem Himmel erfordern; weiches Morgenlicht und Sonnenuntergangslicht beeinflussen das Timing der Zeremonie stark; viele Paare machen aus Hochzeiten in Lovina mehrtägige Feiern, um die Landschaft im Norden voll zu erkunden",
    highlights: [
      "Ruhiges und sanftes Meer und Meereshorizont in Nord-Bali",
      "Authentische Strände mit schwarzem Sand und Küstenatmosphäre",
      "Stille und nicht kommerzielle Umgebung in Nord-Bali",
      "Boutique-Villen direkt am Strand und private Anlagen",
      "Zutiefst intimer und bedeutungsvoller Küstenrahmen",
    ],
    best_for: [
      "Stille Küstenumgebungen fernab von Touristenmassen",
      "Authentische Atmosphäre und lokaler Charakter Balis",
      "Intime Hochzeitsschauplätze am ruhigen Meer",
      "Langsamere, besinnlichere und bedeutungsvollere Feiern",
      "Ruhe, Privatsphäre und emotionale Intimität",
    ],
    ceremony_options: [
      "Intime Zeremonien am Meer an der ruhigen See",
      "Schauplätze am Strand mit schwarzem Sand und an der Küste",
      "Zeremonien am Strand in Privatvillen",
      "Elopements in der Natur Nord-Balis",
    ],
    reception_options: [
      "Intime Dinner-Empfänge in Strandvillen",
      "Entspannte Zusammenkünfte unter freiem Himmel an der Küste",
      "Gartenfeiern in Boutique-Anlagen",
      "Mehrtägige Hochzeitserlebnisse im Naturretreat",
    ],
    accommodation_nearby: [
      "Friedliche Strandvillen und Boutique-Resorts",
      "Aufenthalte in privaten Küstenvillen in Nord-Bali",
      "Öko-Lodges und Naturretreat-Anlagen",
      "Authentische Gästehäuser mit lokalem Charakter",
    ],
    dining_experiences: [
      "Frische Meeresfrüchte und lokale Küche aus Nord-Bali",
      "Intimes Dinner am Strand mit privatem Koch",
      "Dinner-Erlebnisse an der Küste bei Sonnenuntergang und unter dem Sternenhimmel",
      "Einfaches und authentisches Catering mit lokalen Zutaten",
    ],
    unique_features: [
      "Zeremonie am ruhigsten und stillsten Meer im Norden Balis",
      "Stilles und bedeutungsvolles Beisammensein fernab der belebteren Gegenden der Insel",
      "Feier, geprägt von authentischer lokaler Atmosphäre und natürlicher Schönheit",
      "Friedliche, intime und zutiefst unvergessliche Hochzeit an der Küste",
      "Ein langsameres, verbundeneres und emotional berührendes Bali-Erlebnis",
    ],
  },
  "munduk-wedding": {
    name: "Munduk",
    type: "Nebliger Hochlanddschungel",
    description:
      "Bergluft, neblige Dschungeltäler und dramatische Aussichtspunkte im Hochland – ideal für intime, in die Natur eingetauchte und emotional bodenständige Destination Weddings im Hochland Balis.",
    long_description:
      "Munduk ist eine von Balis atemberaubendsten Destinationen im Hochland – ein Ort, an dem Bergluft, neblige Täler und Dschungellandschaften einen Rahmen schaffen, wie es ihn sonst nirgends auf der Insel gibt. In den Hügeln von Nord-Bali gelegen, ist Munduk bekannt für sein kühles Klima, dramatische Aussichtspunkte, Wasserfälle und eine friedliche Atmosphäre. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten in Munduk für Paare, die sich zu Natur, Landschaft und einem Gefühl stiller Intimität hingezogen fühlen. Hochzeiten in Munduk wirken immersiv – umgeben von Bergen, Wald und offenen Horizonten, die eine Atmosphäre schaffen, die emotional und unvergesslich zugleich ist. Viele Paare wählen Munduk, wenn ihre Hochzeit tief mit der Natur verbunden sein und abseits der belebteren Gegenden Balis stattfinden soll.",
    atmosphere:
      "Immersiv statt dekorativ – natürlich statt überstylt, intim statt großartig, atmosphärisch und zutiefst unvergesslich, geprägt von Bergnebel, Dschungel und kühler Hochlandluft",
    accessibility_notes:
      "Etwa 2,5–3 Stunden vom internationalen Flughafen Balis entfernt, was einen gut organisierten Gästetransport erfordert; einige Hochzeitsdienstleister reisen aus Süd-Bali an, was strukturierte Terminplanung und Produktionsplanung verlangt; Bergstraßen erfordern sorgfältiges Timing",
    seasonal_considerations:
      "Die Temperaturen im Hochland sind kühler, und zu bestimmten Tageszeiten kann Nebel aufziehen, der eine einzigartige und wunderschöne Atmosphäre schafft; Abendveranstaltungen erfordern zusätzliche Aufmerksamkeit für Beleuchtung, Bodenbeläge und Temperatur; die Trockenzeit wird für Zeremonien im Freien bevorzugt",
    highlights: [
      "Dramatische Aussichtspunkte auf Berge und Dschungeltäler",
      "Kühles Hochlandklima und frische Bergluft",
      "Neblige Waldlandschaften und natürliche Wasserfälle",
      "Boutique-Öko-Resorts und intime Anwesen im Hochland",
      "Zutiefst persönlicher und visuell außergewöhnlicher Naturrahmen",
    ],
    best_for: [
      "Zeremonieschauplätze in Berg- und Dschungellandschaften",
      "Paare, die ein kühleres Klima und frische Hochlandluft suchen",
      "Stille, von der Natur geleitete und emotional immersive Umgebungen",
      "Intime Destination Weddings in dramatischer Naturkulisse",
      "Eine tiefe emotionale Verbindung zur Schönheit des Hochlands von Bali",
    ],
    ceremony_options: [
      "Zeremonien an den Klippen mit Blick über neblige Dschungeltäler",
      "Aussichtspunkte in den Bergen und Schauplätze in der Hochlandlandschaft",
      "Intime Elopements, umgeben von Dschungel und Wald",
      "Zeremonien in Gärten und auf Terrassen von Boutique-Öko-Resorts",
    ],
    reception_options: [
      "Dinner bei Kerzenschein, umgeben von Dschungel und Wald",
      "Intime Empfänge in Boutique-Resorts im Hochland",
      "Feiern unter freiem Himmel mit Bergblick",
      "Mehrtägige Hochzeitserlebnisse im Naturretreat",
    ],
    accommodation_nearby: [
      "Boutique-Öko-Resorts und Retreat-Anlagen im Hochland",
      "Intime Dschungelvillen und Naturlodges",
      "Aufenthalte in Anwesen und Privatvillen im Hochland",
      "Berg-Gästehäuser mit malerischem Talblick",
    ],
    dining_experiences: [
      "Farm-to-Table- und Bio-Küche im Hochland",
      "Intime Dinner-Erlebnisse in den Bergen mit privatem Koch",
      "Lokale Küche aus Nord-Bali mit frischen Produkten aus dem Hochland",
      "Atmosphärische Dinner-Erlebnisse im Dschungel bei Kerzenschein",
    ],
    unique_features: [
      "Zeremonie mit Blick über neblige Dschungeltäler und Berghorizonte",
      "Immersives Beisammensein, umgeben von der Hochlandnatur Balis",
      "Feier, geprägt von kühler Luft, Nebel, Wald und Landschaft",
      "Friedliche, emotionale und zutiefst unvergessliche Hochzeit in den Bergen",
      "Einer von Balis atmosphärischsten und naturverbundensten Schauplätzen",
    ],
  },
  "pemuteran-wedding": {
    name: "Pemuteran",
    type: "Öko-Ruhe an der Küste",
    description:
      "Ruhiges Meer, Bergkulissen und umweltbewusste Boutique-Resorts im Nordwesten Balis – ideal für intime, von der Natur geleitete und erholsame Destination Weddings fernab vom Trubel.",
    long_description:
      "Pemuteran ist eine von Balis friedlichsten und naturorientiertesten Küstendestinationen im Nordwesten Balis, bekannt für ruhiges Meer, Bergkulissen und eine enge Verbindung zum Meeresschutz. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten in Pemuteran, die seine stille Schönheit aufgreifen – und Feiern schaffen, die intim, bodenständig und tief mit der Natur verbunden wirken. Unsere Hochzeiten in Pemuteran werden von stillem Wasser, weichem Küstenlicht und einer Schlichtheit geprägt, in der sich jeder Moment bedeutungsvoll und unhektisch anfühlt. Wir arbeiten mit Paaren, die Pemuteran wegen der Ruhe, der Distanz zum Trubel und der Möglichkeit wählen, ein Hochzeitserlebnis zu bieten, das authentisch und erholsam zugleich wirkt.",
    atmosphere:
      "Ruhig und doch erlesen – intim und von der Natur geleitet, weich, offen und bodenständig, elegant mit zurückhaltender Schlichtheit, geprägt von stillem Wasser, Bergblicken und umweltbewusster Umgebung",
    accessibility_notes:
      "Lage im Nordwesten Balis, die sorgfältige Planung von Reisezeit der Gäste und Dienstleisterlogistik erfordert; ökologische und umweltbezogene Aspekte beeinflussen Designentscheidungen; Boutique-Öko-Resorts bieten Komfort in natürlich harmonischer Umgebung",
    seasonal_considerations:
      "Sowohl Sonnenaufgang als auch Sonnenuntergang bieten wunderschöne natürliche Lichtmöglichkeiten, die das Timing der Zeremonie beeinflussen; Vorbereitung auf Sonne, Luftfeuchtigkeit und Umgebungen unter freiem Himmel ist unerlässlich; Schatten, Layout und Einrichtungen müssen für den Komfort in abgelegener Lage sorgfältig gestaltet werden",
    highlights: [
      "Ruhiger und friedlicher Küstenrahmen im Nordwesten Balis",
      "Berg- und Meereskulisse für natürliche visuelle Balance",
      "Umweltbewusste Boutique-Resorts mit authentischem Charakter",
      "Verbindung zum Meeresschutz und nachhaltige Umwelt",
      "Stille, unhektische und zutiefst erholsame Atmosphäre",
    ],
    best_for: [
      "Stille Zeremonieschauplätze am Strand bei ruhigem Meer",
      "Umweltbewusste und von der Natur geleitete Hochzeitsumgebungen",
      "Intime und bedeutungsvolle Feiern fernab vom Trubel",
      "Paare, die ein langsameres und achtsameres Tempo suchen",
      "Ein erholsames und authentisches Hochzeitserlebnis auf Bali",
    ],
    ceremony_options: [
      "Zeremonien am Strand mit Berg- und Meerblick",
      "Schauplätze in Öko-Resortgärten und an der Küste",
      "Intime Elopements am ruhigen Meer",
      "Naturzeremonien bei Sonnenaufgang oder Sonnenuntergang",
    ],
    reception_options: [
      "Intime Dinner-Zusammenkünfte im Öko-Resort",
      "Empfänge unter freiem Himmel am Strand und im Garten",
      "Entspannte Feiern in Boutique-Villen",
      "Erlebnisse im kleinen Rahmen inmitten der Natur",
    ],
    accommodation_nearby: [
      "Boutique-Öko-Resorts und Naturlodges",
      "Private Küstenvillen mit Bergblick",
      "Resortanlagen mit Meeresschutz-Engagement",
      "Nachhaltige und naturintegrierte Aufenthalte",
    ],
    dining_experiences: [
      "Frische Meeresfrüchte und lokale Küstenküche aus Nord-Bali",
      "Umweltbewusste Dinner-Erlebnisse mit privatem Koch",
      "Intime Mahlzeiten am Strand bei Sonnenaufgang oder Sonnenuntergang",
      "Bio- und lokal bezogene Catering-Services",
    ],
    unique_features: [
      "Zeremonie, gerahmt von ruhigem Wasser und Berglandschaft",
      "Stilles und bedeutungsvolles Beisammensein in erholsamer Küstenumgebung",
      "Feier, geprägt von Natur, Schlichtheit und umweltbewusster Schönheit",
      "Balis friedlichste und naturverbundenste Nordwestküste",
      "Intime, erdende und zutiefst persönliche Hochzeitsatmosphäre",
    ],
  },
  "menjangan-wedding": {
    name: "Menjangan",
    type: "Küste im Naturschutzgebiet",
    description:
      "Unberührte Küste im Westbali-Nationalpark, kristallklares Wasser und vollständige Abgeschiedenheit – ideal für seltene, immersive und zutiefst intime Destination Weddings in unberührter Natur.",
    long_description:
      "Menjangan ist eine von Balis exklusivsten und unberührtesten Destinationen im geschützten Gebiet des Westbali-Nationalparks, bekannt für ihre unberührte Küste, ruhiges Wasser und außergewöhnliche natürliche Umgebung. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten in Menjangan, die sein seltenes Gefühl von Abgeschiedenheit aufgreifen – und Feiern schaffen, die intim, immersiv und tief mit der Natur verbunden wirken. Unsere Hochzeiten in Menjangan werden von stillen Meereshorizonten, wilden Landschaften und einer stillen Atmosphäre geprägt, in der sich jeder Moment wahrhaft gegenwärtig anfühlt. Wir arbeiten mit Paaren, die Menjangan wegen der Privatsphäre, der natürlichen Reinheit und der Möglichkeit wählen, ein Hochzeitserlebnis zu bieten, das vollkommen abseits des Gewöhnlichen liegt.",
    atmosphere:
      "Rein und doch erlesen – intim und immersiv, ruhig, offen und von der Natur geleitet, elegant mit minimalem Eingriff, geprägt von unberührter Küste, kristallklarem Meer und geschützter Wildnis",
    accessibility_notes:
      "Lage im Westbali-Nationalpark, die besondere Genehmigungen und strikte Einhaltung von Umweltvorschriften erfordert; abgelegene Lage, die detaillierte Koordination von Transport, Aufbau und Zugang für Dienstleister verlangt; begrenzte Infrastruktur vor Ort erfordert vollständige logistische Planung",
    seasonal_considerations:
      "Vorbereitung auf Sonne, Wind und natürliche Küstenbedingungen ist unerlässlich; die offene geschützte Umgebung erfordert sorgfältiges Timing für Zeremonie und Fotografie; Partner aus dem Öko-Luxus-Resortbereich bieten bauliche Unterstützung in unberührter Natur",
    highlights: [
      "Unberührte Küste im Westbali-Nationalpark",
      "Kristallklares Wasser und unberührte Naturstrände",
      "Vollständige Privatsphäre und Abgeschiedenheit in geschützter Wildnis",
      "Zugang zu Öko-Luxusresorts in einer Nationalparkumgebung",
      "Wahrhaft seltene und exklusive Hochzeitsdestination auf Bali",
    ],
    best_for: [
      "Paare, die vollständige Privatsphäre und natürliche Abgeschiedenheit suchen",
      "Makellose und unberührte Zeremonieumgebungen an der Küste",
      "Intime und immersive, von der Natur geleitete Feiern",
      "Eine starke Verbindung zur Tierwelt und geschützten Umgebung",
      "Ein Hochzeitserlebnis, das selten und unvergesslich wirkt",
    ],
    ceremony_options: [
      "Zeremonien am Meer an unberührter Küste",
      "Schauplätze an Strand und Ufer im Naturschutzgebiet",
      "Intime Elopements in geschützter Wildnis",
      "Zeremonieschauplätze in Öko-Luxusresorts",
    ],
    reception_options: [
      "Intime Dinner-Empfänge in Öko-Luxusresorts",
      "Zusammenkünfte unter freiem Himmel inmitten der Natur",
      "Kleine und exklusive Feiern an der Küste",
      "Private und immersive Naturretreat-Erlebnisse",
    ],
    accommodation_nearby: [
      "Öko-Luxusresorts im Nationalpark",
      "Boutique-Naturlodges in der Nähe von Pemuteran",
      "Private Küstenanlagen nahe der Parkgrenze",
      "Nachhaltige und auf Naturschutz ausgerichtete Aufenthalte",
    ],
    dining_experiences: [
      "Öko-Luxus mit privatem Koch und kuratierte Dinner-Erlebnisse",
      "Frische lokale Meeresfrüchte und naturinspirierte Küche",
      "Intime Mahlzeiten am Meer in unberührter Umgebung",
      "Nachhaltige und lokal bezogene Catering-Services",
    ],
    unique_features: [
      "Zeremonie in einem von Balis letzten wirklich unberührten Naturschauplätzen",
      "Stilles und zutiefst persönliches Beisammensein in geschützter Wildnis",
      "Feier, geprägt von Reinheit, Stille und seltener natürlicher Schönheit",
      "Balis exklusivste und naturgeschützte Hochzeitsdestination",
      "Ein seltenes, immersives und vollkommen unvergessliches Erlebnis",
    ],
  },
  "pupuan-wedding": {
    name: "Pupuan",
    type: "Verborgener Dschungel & Wasserfall",
    description:
      "Dichte Dschungel, terrassierte Landschaften und verborgene Wasserfälle in West-Bali – ideal für intime, abenteuerliche und zutiefst immersive Destination Weddings in unberührter Natur.",
    long_description:
      "Pupuan ist eine von Balis unberührtesten und weniger bekannten Regionen in West-Bali, bekannt für dichte Dschungel, terrassierte Landschaften und verborgene Wasserfälle, die einen Rahmen schaffen, der roh und zutiefst atmosphärisch zugleich ist. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten in Pupuan, die seine verborgene Schönheit aufgreifen – und Feiern schaffen, die intim, immersiv und natürlich erlesen wirken. Unsere Hochzeiten in Pupuan werden von üppigem Grün, fließendem Wasser und einem Gefühl stiller Entdeckung geprägt, in dem sich jeder Moment zutiefst persönlich anfühlt. Wir arbeiten mit Paaren, die Pupuan wegen der Abgeschiedenheit, des natürlichen Reichtums und der Möglichkeit wählen, ein Hochzeitserlebnis fernab des Vertrauten zu bieten.",
    atmosphere:
      "Immersiv und doch erlesen – intim und abenteuerlich, natürlich und ausdrucksstark, elegant in einer rohen Umgebung, geprägt von dichtem Dschungel, verborgenen Wasserfällen und terrassierten Landschaften",
    accessibility_notes:
      "Abgelegene Lage, die detaillierte Koordination von Transport, Aufbau und Zugang für Dienstleister erfordert; Dschungel- und Wasserfallgelände verlangt sorgfältige Planung für Gästebewegung und Sicherheit; das natürliche Licht in Waldumgebungen erfordert präzises Timing für Zeremonie und Fotografie",
    seasonal_considerations:
      "Auf Luftfeuchtigkeit, Niederschlag und natürliche Elemente muss man sich vollständig vorbereiten; Wasserstände und rutschige Flächen an Wasserfällen erfordern Sicherheitsmanagement; die Trockenzeit ist für die meisten Zeremonien im Freien und für Fotografie vorzuziehen",
    highlights: [
      "Dichte Dschungel- und verborgene Wasserfalllandschaften",
      "Terrassiertes Grün und natürliche Texturen in West-Bali",
      "Zutiefst abgeschiedener und unentdeckter Naturrahmen",
      "Boutique-Naturrefugien und private Dschungel-Locations",
      "Intime und abenteuerliche Atmosphäre fernab des Mainstreams Balis",
    ],
    best_for: [
      "Zeremonieschauplätze im Dschungel und am Wasserfall",
      "Paare, die eine abgelegene und unberührte Naturumgebung suchen",
      "Privatsphäre, Abgeschiedenheit und ein Gefühl der Entdeckung",
      "Zutiefst immersive und abenteuerliche Naturerlebnisse",
      "Eine einzigartige und persönliche Alternative zu den gängigen Hochzeitslocations auf Bali",
    ],
    ceremony_options: [
      "Zeremonien an Wasserfällen in verborgenen Naturlandschaften",
      "Naturschauplätze in Dschungel und Wald",
      "Intime Elopements, umgeben von Grün und Wasser",
      "Zeremonien in terrassierter Landschaft und an erhöhten Aussichtspunkten",
    ],
    reception_options: [
      "Intime Dinner-Zusammenkünfte im Dschungelretreat",
      "Feiern unter freiem Himmel inmitten der Natur",
      "Empfänge in privaten Locations und Boutique-Retreats",
      "Kleine und bedeutungsvolle Zusammenkünfte im Wald",
    ],
    accommodation_nearby: [
      "Aufenthalte in abgeschiedenen Dschungelretreats und Öko-Lodges",
      "Private Naturvillen und Anlagen im Hochland",
      "Boutique-Retreat-Unterkünfte in West-Bali",
      "Naturintegrierte Gästehäuser und Aufenthalte auf dem Bauernhof",
    ],
    dining_experiences: [
      "Dinner-Erlebnisse im Dschungel und in der Natur mit privatem Koch",
      "Frische lokale Produkte aus West-Bali und Bio-Küche",
      "Intime Mahlzeiten am Wasserfall",
      "Farm-to-Table- und lokal bezogene Catering-Services",
    ],
    unique_features: [
      "Zeremonie in der Nähe verborgener Wasserfälle, anders als jede gängige Location auf Bali",
      "Zutiefst persönliches und immersives Beisammensein im unberührten Dschungel",
      "Feier, geprägt von Natur, Entdeckung und roher natürlicher Schönheit",
      "Abenteuerliche und zugleich erlesene, emotional kraftvolle Atmosphäre",
      "Einer von Balis verborgensten und authentisch natürlichsten Schauplätzen",
    ],
  },
  "jatiluwih-wedding": {
    name: "Jatiluwih",
    type: "UNESCO-Reisterrassen-Erbe",
    description:
      "Weitläufige, von der UNESCO anerkannte Reisterrassen, weite Bergblicke und zeitloses kulturelles Erbe – ideal für großartige und zugleich ruhige, landschaftsgeprägte und kulturell bedeutungsvolle Destination Weddings.",
    long_description:
      "Jatiluwih ist eine von Balis ikonischsten und geschütztesten Landschaften, bekannt für ihre weitläufigen Reisterrassen, das von der UNESCO anerkannte Erbe und ein Gefühl von Offenheit, das großartig und zutiefst ruhig zugleich wirkt. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten in Jatiluwih, die seine kulturelle und natürliche Bedeutung ehren – und Feiern schaffen, die immersiv, bewusst und zeitlos wirken. Unsere Hochzeiten in Jatiluwih werden von weitläufigen grünen Landschaften, Bergluft und einer stillen Atmosphäre geprägt, in der sich jeder Moment bodenständig und bedeutungsvoll anfühlt. Wir arbeiten mit Paaren, die Jatiluwih wegen seiner Weite, Authentizität und der Möglichkeit wählen, ein Hochzeitserlebnis zu schaffen, das ikonisch und tief mit Balis Erbe verbunden zugleich wirkt.",
    atmosphere:
      "Großartig und doch ruhig – natürlich und kulturell verwurzelt, offen, luftig und landschaftsgeprägt, elegant mit zeitloser Schlichtheit, geprägt von weiten Reisterrassen, Bergluft und Heritage-Umgebung",
    accessibility_notes:
      "Lage im zentralen West-Bali, die koordinierten Transport für Gäste und Dienstleister erfordert; der UNESCO-geschützte Rahmen verlangt, dass Design und Aufbau die landwirtschaftliche und kulturelle Landschaft respektieren; Hänge und unebenes Reisterrassengelände erfordern sorgfältige Planung des Gästeflusses",
    seasonal_considerations:
      "Morgen und später Nachmittag bieten das schönste natürliche Licht für Zeremonien und Fotografie; Vorbereitung auf Sonne, Wind und Regen ist in offenen Landschaften unerlässlich; Schatten, Bestuhlung und Wege müssen sorgfältig gestaltet werden",
    highlights: [
      "Weitläufige, von der UNESCO anerkannte Reisterrassenlandschaften",
      "Weite Berg- und Talblicke",
      "Zutiefst authentischer und kulturell bedeutsamer Rahmen",
      "Großartig in der Weite und doch ruhig und bodenständig in der Atmosphäre",
      "Eine von Balis ikonischsten und visuell zeitlosesten Kulissen",
    ],
    best_for: [
      "Zeremonieschauplätze in weiter offener Reisterrassenlandschaft",
      "Paare, die UNESCO-Erbe und kulturelle Verbundenheit suchen",
      "Eine friedliche und naturintegrierte Umgebung mit Weite",
      "Berg- und Talblicke als Hochzeitskulisse",
      "Ein zeitloses, bedeutungsvolles und ikonisches Hochzeitserlebnis auf Bali",
    ],
    ceremony_options: [
      "Zeremonien mit Terrassenblick über weite Reisfelder",
      "Schauplätze in offener Landschaft und an erhöhten Aussichtspunkten",
      "Zeremonien in Boutique-Retreat-Gärten und auf Terrassen",
      "Intime Elopements in der Reisterrassenlandschaft",
    ],
    reception_options: [
      "Empfänge in Boutique-Retreats und landschaftsintegrierte Empfänge",
      "Dinner-Zusammenkünfte unter freiem Himmel mit Terrassenblick",
      "Intime Feiererlebnisse inmitten der Natur",
      "Kulturelle Dinner-Schauplätze in der Heritage-Landschaft",
    ],
    accommodation_nearby: [
      "Boutique-Retreats und Öko-Lodges im Terrassengebiet",
      "Naturintegrierte Villen in der Nähe von Jatiluwih",
      "Unterkunftsoptionen im Hochland von Zentral-Bali",
      "Gästehäuser und Retreat-Anlagen im Raum Tabanan",
    ],
    dining_experiences: [
      "Farm-to-Table-Dinner inmitten der Reisterrassen",
      "Erlebnisse mit privatem Koch und landschaftsinspirierter Küche",
      "Lokale Produkte aus Tabanan und traditionelle balinesische Gerichte",
      "Intime Dinner-Schauplätze unter freiem Himmel mit Terrassenblick",
    ],
    unique_features: [
      "Zeremonie mit Blick über eine von Balis ikonischsten UNESCO-Landschaften",
      "Großartiges und zugleich ruhiges Beisammensein, geprägt von Weite und kulturellem Erbe",
      "Feier, die zeitlos, ikonisch und tief mit Bali verbunden wirkt",
      "Balis weitläufigste und kulturell bedeutsamste Hochzeitskulisse",
      "Ein immersives, visuell außergewöhnliches und zutiefst bedeutungsvolles Erlebnis",
    ],
  },
  "secluded-waterfalls-wedding": {
    name: "Abgeschiedene Wasserfälle",
    type: "Natur am verborgenen Wasserfall",
    description:
      "Verborgene Wasserfälle, dichtes Grün und rohes natürliches Licht in West-Bali – ideal für intime, abenteuerliche und emotional kraftvolle Destination Weddings in den dramatischsten Schauplätzen der Natur.",
    long_description:
      "Verborgen in den üppigen Landschaften West-Balis bieten abgeschiedene Wasserfälle einen der intimsten und atmosphärischsten Hochzeitsschauplätze der Insel – wo herabstürzendes Wasser, dichtes Grün und natürliches Licht einen Raum schaffen, der kraftvoll und zutiefst ruhig zugleich wirkt. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten am Wasserfall, die dieses Gefühl von Entdeckung aufgreifen – und Feiern schaffen, die immersiv, persönlich und mit der Natur in ihrer rohesten und schönsten Form verbunden wirken. Unsere Hochzeiten am Wasserfall werden von Klang, Bewegung und Textur geprägt – wo Wasser, Stein und Wald einen Rahmen bilden, wie es ihn sonst nirgends gibt. Wir arbeiten mit Paaren, die diese verborgenen Orte wegen ihrer Privatsphäre, ihrer natürlichen Dramatik und der Möglichkeit wählen, ein wahrhaft einzigartiges Hochzeitserlebnis zu schaffen.",
    atmosphere:
      "Immersiv und doch erlesen – intim und emotional kraftvoll, natürlich und ausdrucksstark, elegant in einer rohen Umgebung, geprägt von herabstürzendem Wasser, dichtem Wald und dramatischem natürlichem Licht",
    accessibility_notes:
      "Wasserfallorte erfordern oft Wanderwege, Stufen oder unebenes Gelände, was sorgfältige Planung der Gästebewegung verlangt; Wasserstände, rutschige Flächen und natürliche Bedingungen müssen sorgfältig gesteuert werden; abgelegene Schauplätze erfordern detaillierte Koordination von Transport und Zugang für Dienstleister",
    seasonal_considerations:
      "Regen kann Wasserführung und Zugänglichkeit beeinflussen und erfordert flexible Ausweichplanung; das natürliche Licht in Waldumgebungen variiert, daher ist das Timing entscheidend; die Trockenzeit wird für Zugänglichkeit und Gästesicherheit an Wasserfällen in der Regel bevorzugt",
    highlights: [
      "Verborgene Wasserfälle in den üppigen Landschaften West-Balis",
      "Dichtes tropisches Grün und dramatische natürliche Texturen",
      "Vollständige Privatsphäre und Abgeschiedenheit in unentdeckten Schauplätzen",
      "Kraftvoller Klang, Bewegung und Atmosphäre fließenden Wassers",
      "Wahrhaft einzigartige Zeremoniekulissen, wie es sie sonst nirgends auf Bali gibt",
    ],
    best_for: [
      "Verborgene und private Zeremonieorte mit dramatischer Wasserkulisse",
      "Paare, die eine tiefe Verbindung zur rohen und unberührten Natur suchen",
      "Intime, abenteuerliche und emotional kraftvolle Feiern",
      "Ein Gefühl von Exklusivität, Entdeckung und einzigartigem Storytelling",
      "Ein Hochzeitserlebnis, das wahrhaft einzigartig wirkt",
    ],
    ceremony_options: [
      "Zeremonien direkt vor herabstürzenden Wasserfallkulissen",
      "Intime Zeremonieschauplätze, gerahmt von Wald und Dschungel",
      "Zeremonien am Wasserfallbecken und auf natürlichen Steinplattformen",
      "Elopements an verborgenen und privaten Wasserfallorten",
    ],
    reception_options: [
      "Intime Naturzusammenkünfte in der Nähe von Wasserfällen",
      "Private Dinner-Erlebnisse, umgeben von Wald",
      "Kleine und bedeutungsvolle Feiern unter freiem Himmel",
      "Konzeptgetriebene Empfangserlebnisse am Wasserfall und in der Natur",
    ],
    accommodation_nearby: [
      "Boutique-Öko-Lodges und Dschungelretreats in West-Bali",
      "Private Naturvillen in der Nähe von Wasserfallorten",
      "Gästehäuser und Retreats im Raum Tabanan und Pupuan",
      "Naturintegrierte Unterkünfte mit Waldcharakter",
    ],
    dining_experiences: [
      "Dinner-Erlebnisse mit privatem Koch inmitten der Natur",
      "Frische lokale Küche aus West-Bali mit Bio-Zutaten",
      "Intime und atmosphärische Mahlzeiten am Wasserfall",
      "Konzeptgetriebenes, maßgeschneidertes Catering in natürlicher Umgebung",
    ],
    unique_features: [
      "Zeremonie mit herabstürzendem Wasserfall als natürlicher Kulisse",
      "Zutiefst persönliches und immersives Beisammensein, geprägt von Wasser und Wald",
      "Feier, geprägt von Bewegung, Klang, roher Schönheit und Emotion",
      "Balis verborgenster und dramatisch atmosphärischster Hochzeitsrahmen",
      "Ein transformierendes, kraftvolles und wahrhaft unvergessliches Erlebnis",
    ],
  },
  "kintamani-wedding": {
    name: "Kintamani",
    type: "Hochland mit Vulkan- & Seeblick",
    description:
      "Dramatische Blicke auf Vulkan und Kratersee, weitläufige Hochlandlandschaften und kühle Bergluft – ideal für gehobene, filmreife und landschaftsgeprägte Destination Weddings, geprägt von Weite und Atmosphäre.",
    long_description:
      "Kintamani ist eine von Balis dramatischsten und ikonischsten Landschaften, bekannt für weite Blicke auf den Mount Batur, vulkanisches Gelände und die ruhige Präsenz des Batur-Sees, die zusammen einen Rahmen schaffen, der kraftvoll und besinnlich zugleich ist. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten in Kintamani, die seine Weite und Atmosphäre aufgreifen – und Feiern schaffen, die gehoben, bewusst und tief mit dem Land verbunden wirken. Unsere Hochzeiten in Kintamani werden von Bergluft, weiten Horizonten und einer Stille geprägt, in der sich jeder Moment bodenständig und bedeutungsvoll anfühlt. Wir arbeiten mit Paaren, die Kintamani wegen der dramatischen Szenerie, des kühleren Klimas und der Möglichkeit wählen, ein Hochzeitserlebnis zu schaffen, das filmreif und ruhig zugleich wirkt.",
    atmosphere:
      "Weit und doch ruhig – dramatisch und visuell ausdrucksstark, lichtdurchflutet und landschaftsgeprägt, elegant mit natürlicher Schlichtheit, geprägt von Vulkanblicken, Kratersee und Bergluft",
    accessibility_notes:
      "Lage im Hochland, die koordinierten Transport für Gäste und Dienstleister erfordert; offene Hochlandumgebungen verlangen wegen der Windverhältnisse sorgfältige Entscheidungen bei Dekoration und Strukturen; erhöhte Lagen können Hänge und unterschiedliches Gelände mit sich bringen, was sorgfältige Planung des Gästeflusses erfordert",
    seasonal_considerations:
      "Morgen und später Nachmittag bieten das schönste natürliche Licht für Zeremonien und Fotografie; Bergblicke können von den Wetterbedingungen beeinflusst werden, was flexible Planung erfordert; Vorbereitung auf kühlere Temperaturen und Wind ist für den Gästekomfort unerlässlich",
    highlights: [
      "Weite Blicke auf den Mount Batur und das vulkanische Gelände",
      "Ruhige Präsenz des Kratersees, die die Landschaft rahmt",
      "Kühle Bergluft und weite offene Horizonte",
      "Dramatische und filmreife Hochzeitsumgebung im Hochland",
      "Eine einzigartige Alternative zu Balis Küsten- und Dschungelschauplätzen",
    ],
    best_for: [
      "Vulkan- und Kratersee-Blicke als Hochzeitskulisse",
      "Paare, die ein kühleres Klima und frische Bergluft suchen",
      "Weitläufige Landschaften mit dramatischer Hochlandszenerie",
      "Eine ruhige und besinnliche Hochzeitsatmosphäre",
      "Ein einzigartiges, gehobenes und visuell eindrucksvolles Hochzeitserlebnis auf Bali",
    ],
    ceremony_options: [
      "Zeremonieschauplätze unter freiem Himmel mit Vulkanblick",
      "Zeremoniekulissen mit Panorama des Kratersees",
      "Zeremonien auf Hochlandterrassen und an erhöhten Aussichtspunkten",
      "Zeremonien in Boutique-Retreat-Gärten mit Bergblick",
      "Intime Elopements in Hochlandlandschaften",
    ],
    reception_options: [
      "Dinner-Empfänge mit Panoramablick auf Vulkan und See",
      "Feiern auf Hochlandterrassen unter freiem Himmel",
      "Empfänge in Boutique-Retreats und Locations im Hochland",
      "Intime Abendveranstaltungen inmitten der Natur",
      "Landschaftsgeprägte Abläufe bei Sonnenuntergang und Dinner-Empfang",
    ],
    accommodation_nearby: [
      "Boutique-Retreats im Hochland mit Vulkanblick",
      "Naturintegrierte Villen in der Nähe des Batur-Sees",
      "Gästehäuser und Lodges im Kintamani-Kalderagebiet",
      "Öko-Retreats im Hochland mit Panoramablick auf den See",
    ],
    dining_experiences: [
      "Dinner mit Kalderablick und lokaler balinesischer Küche",
      "Dinner-Erlebnisse im Hochland mit privatem Koch",
      "Frische Bergprodukte und traditionelle lokale Gerichte",
      "Dinner auf Terrassen unter freiem Himmel mit Blick auf Vulkan und See",
    ],
    unique_features: [
      "Zeremonie mit gleichzeitigem Blick auf Mount Batur und Kratersee",
      "Gehobene Feier, geprägt von Vulkanlandschaft und Bergluft",
      "Eine Hochzeit, die kraftvoll, filmreif und zutiefst ruhig wirkt",
      "Einer von Balis dramatischsten und visuell unverwechselbarsten Schauplätzen",
      "Ein immersives Hochlanderlebnis, anders als jede Location an der Küste oder im Dschungel",
    ],
  },
  "bedugul-wedding": {
    name: "Bedugul",
    type: "Natur an See & Hochland",
    description:
      "Kühle Hochlandseen, neblige Berglandschaften und ruhige botanische Umgebung – ideal für ruhige, intime und von der Natur geleitete Destination Weddings, geprägt von weichem Licht und stiller Eleganz.",
    long_description:
      "Bedugul ist eine von Balis atmosphärischsten Destinationen im Hochland, bekannt für sein kühles Klima, neblige Landschaften und die ruhige Schönheit seiner von Bergen und Wald umgebenen Seen. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten in Bedugul, die seinen stillen und poetischen Charakter aufgreifen – und Feiern schaffen, die ruhig, intim und tief mit der Natur verbunden wirken. Unsere Hochzeiten in Bedugul werden von weichem Licht, Bergluft und spiegelnden Seeoberflächen geprägt, die eine Atmosphäre schaffen, die ruhig und visuell fesselnd zugleich ist. Wir arbeiten mit Paaren, die Bedugul wegen des einzigartigen Hochlandrahmens, des kühleren Klimas und der Möglichkeit wählen, ein Hochzeitserlebnis zu schaffen, das friedlich und erlesen wirkt.",
    atmosphere:
      "Weich und doch visuell eindrucksvoll – ruhig und atmosphärisch, intim und erlesen, elegant mit natürlicher Schlichtheit, geprägt von nebligen Seen, Bergluft und kühler Hochlandumgebung",
    accessibility_notes:
      "Hochlandgebiet, das koordinierten Transport für Gäste und Dienstleister erfordert; offene Landschaften und natürliches Gelände verlangen sorgfältige Planung des Gästeflusses; kühleres Wetter erfordert Vorbereitung auf den Gästekomfort, besonders bei Events am frühen Morgen oder Abend",
    seasonal_considerations:
      "Im Hochland kann es häufiger regnen, was flexible Planung erfordert; natürlicher Nebel kann die Atmosphäre verstärken, aber auch Sicht und Timing beeinflussen; Bestuhlung, Überdachungen und Layout müssen für wechselnde Bedingungen durchdacht angeordnet werden",
    highlights: [
      "Kühle Hochlandseen inmitten nebliger Berge",
      "Ruhige botanische Gärten und Natur-Locations",
      "Weiches natürliches Licht und atmosphärische Hochlandumgebung",
      "Eine ruhige und weniger überlaufene Alternative zum Küsten-Bali",
      "Einzigartiges und malerisches Erlebnis in der Hochlandlandschaft",
    ],
    best_for: [
      "Zeremonieschauplätze am Seeufer in nebligen Hochlandlandschaften",
      "Paare, die kühlere Temperaturen und frische Bergluft suchen",
      "Eine ruhige und weniger überlaufene Hochzeitsumgebung",
      "Intime und bedeutungsvolle Feiern in der Natur",
      "Ein einzigartiges und malerisches Hochzeitserlebnis im Hochland von Bali",
    ],
    ceremony_options: [
      "Zeremonien am Seeufer vor nebligen Bergkulissen",
      "Zeremonien in botanischen Gärten und Natur-Locations",
      "Zeremonieschauplätze in offener Hochlandlandschaft",
      "Zeremonien in privaten Retreat-Gärten nahe dem See",
      "Intime Elopements in stiller Hochlandumgebung",
    ],
    reception_options: [
      "Empfänge mit Seeblick in Hochlandnatur",
      "Zusammenkünfte im botanischen Garten und unter freiem Himmel",
      "Intime Feiererlebnisse im Retreat-Stil",
      "Abend-Dinner-Empfänge inmitten der Natur",
      "Ruhige, atmosphärische Feiern in der Hochlandlandschaft",
    ],
    accommodation_nearby: [
      "Boutique-Retreats im Hochland nahe den Seen von Bedugul",
      "Naturintegrierte Villen mit See- und Bergblick",
      "Gästehäuser und Öko-Lodges im Raum Bedugul",
      "Resortanlagen im Hochland mit Gartenumgebung",
    ],
    dining_experiences: [
      "Dinner am See mit frischen Produkten aus dem Hochland",
      "Erlebnisse mit privatem Koch und naturinspirierter Küche",
      "Lokale balinesische Gerichte aus dem Hochland und Bio-Zutaten",
      "Intime Dinner-Schauplätze im Garten und auf Terrassen unter freiem Himmel",
    ],
    unique_features: [
      "Zeremonie, gerahmt von nebligem See und Berglandschaft",
      "Ruhiges und poetisches Beisammensein, geprägt von weichem Licht und kühler Luft",
      "Eine Hochzeit, die ruhig, erlesen und zutiefst atmosphärisch wirkt",
      "Balis unverwechselbarste Hochzeitsumgebung im kühlen Hochland",
      "Ein friedliches, intimes und visuell einzigartiges Feiererlebnis",
    ],
  },
  "lake-beratan-wedding": {
    name: "Beratan-See",
    type: "Heiliger Seetempel & Hochland",
    description:
      "Ikonischer schwimmender Tempel auf ruhigem Hochlandwasser, neblige Bergatmosphäre und kulturelle Tiefe – ideal für symbolische, atmosphärische und visuell zeitlose Destination Weddings, geprägt von Spiegelung und Erbe.",
    long_description:
      "Der Beratan-See ist eine von Balis ikonischsten und visuell bekanntesten Destinationen, bekannt für sein ruhiges Wasser und den schwimmenden Tempel, der sanft aus dem See aufzusteigen scheint. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten am Beratan-See, die seine kulturelle und natürliche Schönheit aufgreifen – und Feiern schaffen, die ruhig, symbolisch und zutiefst atmosphärisch wirken. Unsere Hochzeiten am Beratan-See werden von stillem Wasser, Bergluft und sanftem Nebel geprägt, die zusammen einen Rahmen schaffen, der poetisch und unvergesslich zugleich ist. Wir arbeiten mit Paaren, die den Beratan-See wegen der ikonischen Szenerie, seiner spirituellen Präsenz und der Möglichkeit wählen, ein Hochzeitserlebnis zu schaffen, das bedeutungsvoll und visuell eindrucksvoll zugleich wirkt.",
    atmosphere:
      "Ruhig und doch ikonisch – kulturell und visuell erlesen, weich, atmosphärisch und poetisch, elegant mit stiller Tiefe, geprägt von stillem Seewasser, schwimmendem Tempel und nebliger Hochlandlandschaft",
    accessibility_notes:
      "Als heilige und kulturelle Stätte sind bestimmte Richtlinien und respektvolle Praktiken einzuhalten; Layout und Bewegung müssen in öffentlichen und offenen Bereichen sorgfältig geplant werden; kühlere Temperaturen im Hochland erfordern Vorbereitung auf den Gästekomfort",
    seasonal_considerations:
      "Natürlicher Nebel verstärkt die Atmosphäre, kann aber Sicht und Timing beeinflussen; flexible Planung ist wegen wechselnder Wetterbedingungen im Hochland unerlässlich; Morgen und später Nachmittag bieten das schönste Licht für Zeremonien und Fotografie",
    highlights: [
      "Ikonischer schwimmender Tempel Pura Ulun Danu Beratan auf dem See",
      "Ruhige spiegelnde Wasserflächen mit nebliger Bergkulisse",
      "Zutiefst symbolische und kulturell reiche Hochzeitsumgebung",
      "Weiches natürliches Licht und poetische Hochlandatmosphäre",
      "Einer von Balis visuell bekanntesten und zeitlosesten Schauplätzen",
    ],
    best_for: [
      "Zeremonien am Seeufer mit Blick auf die ikonische Tempelkulisse",
      "Paare, die eine kulturell reiche und symbolische Umgebung suchen",
      "Neblige, hochgelegene und atmosphärische Hochzeitsschauplätze",
      "Ruhige und besinnliche Zeremonieerlebnisse",
      "Eine visuell unverwechselbare und zeitlos unvergessliche Hochzeit auf Bali",
    ],
    ceremony_options: [
      "Zeremonien am Seeufer, gerahmt vom schwimmenden Tempel",
      "Zeremonieschauplätze unter freiem Himmel mit Blick auf den Hochlandsee",
      "Kulturell und landschaftlich inspirierte Zeremoniekulissen",
      "Intime Elopements am ruhigen Seeufer",
      "Zeremonien in Boutique-Retreats in der Nähe des Sees",
    ],
    reception_options: [
      "Dinner- und Feierempfänge mit Blick auf den Beratan-See",
      "Kulturelle und atmosphärische Zusammenkünfte im Hochland",
      "Intime Empfänge in Boutique-Retreats in Wassernähe",
      "Abendfeiern unter freiem Himmel mit Seeblick",
      "Erlesene, von Natur umgebene intime Zusammenkünfte",
    ],
    accommodation_nearby: [
      "Boutique-Hotels im Hochland in der Nähe des Beratan-Sees",
      "Naturintegrierte Retreats im Raum Bedugul",
      "Gästehäuser und Öko-Lodges am See",
      "Resortanlagen im Hochland mit Garten- und Seeblick",
    ],
    dining_experiences: [
      "Dinner am See mit Blick auf den schwimmenden Tempel",
      "Kulinarische Erlebnisse im Hochland mit privatem Koch",
      "Frische Produkte aus dem Hochland von Bedugul und lokale balinesische Küche",
      "Intime Dinner-Schauplätze auf Terrassen und im Garten unter freiem Himmel",
    ],
    unique_features: [
      "Zeremonie mit dem ikonischen schwimmenden Tempel als natürlicher Kulisse",
      "Symbolisches und kulturell vielschichtiges Beisammensein auf heiligen Hochlandgewässern",
      "Eine Hochzeit, die zeitlos, poetisch und zutiefst bedeutungsvoll wirkt",
      "Balis bekanntester und visuell ikonischster Hochzeitsrahmen am See",
      "Ein ruhiges, besinnliches und unvergessliches Feiererlebnis",
    ],
  },
  "lake-buyan-wedding": {
    name: "Buyan-See",
    type: "Abgeschiedener Waldsee im Hochland",
    description:
      "Ruhige und unberührte Hochlandseegewässer, dichter umgebender Wald und zutiefst stille Atmosphäre – ideal für intime, in die Natur eingetauchte und emotional persönliche Destination Weddings, geprägt von Stille.",
    long_description:
      "Der Buyan-See ist eine von Balis ruhigsten und unberührtesten Destinationen im Hochland, bekannt für sein ruhiges Wasser, den umgebenden Wald und eine Stille, die zutiefst immersiv und erholsam wirkt. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten am Buyan-See, die seine natürliche Stille aufgreifen – und Feiern schaffen, die intim, atmosphärisch und tief mit der Natur verbunden wirken. Unsere Hochzeiten am Buyan-See werden von nebligen Morgen, spiegelndem Wasser und dichtem Grün geprägt, die einen Rahmen schaffen, der friedlich und visuell poetisch zugleich ist. Wir arbeiten mit Paaren, die den Buyan-See wegen der Abgeschiedenheit, der natürlichen Schönheit und der Möglichkeit wählen, ein Hochzeitserlebnis zu schaffen, das still, persönlich und fernab des Gewöhnlichen wirkt.",
    atmosphere:
      "Ruhig und doch immersiv – intim und von der Natur geleitet, weich, atmosphärisch und ausdrucksstark, elegant mit natürlicher Schlichtheit, geprägt von nebligem Wald, spiegelndem See und abgeschiedener Hochlandumgebung",
    accessibility_notes:
      "Die Umgebung des Sees kann unebenen Boden und Waldwege mit sich bringen, was sorgfältige Planung der Gästebewegung erfordert; die abgelegene Lage verlangt detaillierte Koordination von Transport und Zugang für Dienstleister; natürliches Gelände und minimale Einrichtungen erfordern durchdachte Anordnung",
    seasonal_considerations:
      "Natürlicher Nebel verstärkt die Atmosphäre, kann aber Timing und Sicht beeinflussen; wechselndes Wetter im Hochland erfordert flexible Planung; das Morgenlicht in bewaldeten Umgebungen am See ist für die Fotografie besonders schön",
    highlights: [
      "Unberührte ruhige Seegewässer, umgeben von dichtem Wald",
      "Zutiefst abgeschiedene und private Hochlandumgebung",
      "Neblige Morgen und spiegelnde Seeoberflächen",
      "Eine stille und weniger besuchte Alternative zu anderen Seen-Destinationen auf Bali",
      "Intime und zutiefst immersive, von der Natur geleitete Atmosphäre",
    ],
    best_for: [
      "Stille Zeremonien am Seeufer in abgeschiedener Waldumgebung",
      "Paare, die Privatsphäre, Abgeschiedenheit und Naturverbundenheit suchen",
      "Intime und zutiefst persönliche Hochzeitsfeiern",
      "Eine ruhige und besinnliche Hochlandatmosphäre",
      "Ein natürliches, einzigartiges und vom Gewöhnlichen abgewandtes Bali-Erlebnis",
    ],
    ceremony_options: [
      "Zeremonien im Wald am See vor ruhigen Wasserkulissen",
      "Intime Zeremonien unter freiem Himmel in natürlicher Umgebung",
      "Abgeschiedene Elopement-Schauplätze am Seeufer",
      "Naturretreat- und Zeremonieerlebnisse im Hochland unter freiem Himmel",
      "Intime Zeremonieschauplätze, vom Wald gerahmt",
    ],
    reception_options: [
      "Stille intime Dinner-Empfänge mit Seeblick",
      "Feierliche Zusammenkünfte im Naturretreat unter freiem Himmel",
      "Kleine und bedeutungsvolle Erlebnisse, umgeben von Wald",
      "Abgeschiedene und atmosphärische Abendschauplätze am See",
      "Bio- und naturintegrierte Feiererlebnisse",
    ],
    accommodation_nearby: [
      "Boutique-Öko-Lodges und Naturretreats in der Nähe des Buyan-Sees",
      "Villen im Hochland mit Wald- und Seeumgebung",
      "Gästehäuser und naturintegrierte Anlagen im Raum Bedugul",
      "Abgelegene Unterkunftsoptionen in Hochland-Retreats",
    ],
    dining_experiences: [
      "Dinner-Erlebnisse am See mit privatem Koch",
      "Frische Produkte aus dem Hochland und lokal inspirierte Küche",
      "Intime Schauplätze für Mahlzeiten inmitten der Natur",
      "Stilles, atmosphärisches Dinieren im Wald und am See",
    ],
    unique_features: [
      "Zeremonie an einem von Balis abgeschiedensten und unberührtesten Seen",
      "Zutiefst intimes Beisammensein, geprägt von Nebel, Wald und Wasser",
      "Eine Hochzeit, die ruhig, persönlich und weltabgewandt wirkt",
      "Balis stillster und naturimmersivster Hochzeitsrahmen am See",
      "Ein wahrhaft privates und emotional bedeutungsvolles Feiererlebnis",
    ],
  },
  "lake-tamblingan-wedding": {
    name: "Tamblingan-See",
    type: "Heiliger & uralter Waldsee",
    description:
      "Balis unberührtester und heiligster Hochlandsee, umgeben von uraltem Wald und Tempeln – ideal für intime, spirituell bedeutungsvolle und zutiefst besinnliche Destination Weddings, geprägt von Stille und Kultur.",
    long_description:
      "Der Tamblingan-See ist eine von Balis unberührtesten und heiligsten Destinationen im Hochland, bekannt für sein stilles Wasser, den umgebenden Wald und uralte Tempel, die eine Atmosphäre schaffen, die ruhig und zutiefst spirituell zugleich ist. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten am Tamblingan-See, die seine Reinheit und Präsenz ehren – und Feiern schaffen, die intim, bedeutungsvoll und tief mit Natur und Kultur verbunden wirken. Unsere Hochzeiten am Tamblingan-See werden von stillem Wasser, nebligem Wald und einer Stille geprägt, in der sich jeder Moment bodenständig und bewusst anfühlt. Wir arbeiten mit Paaren, die den Tamblingan-See wegen seines heiligen Charakters, seiner Abgeschiedenheit und der Möglichkeit wählen, ein wahrhaft besinnliches und einzigartiges Hochzeitserlebnis zu schaffen.",
    atmosphere:
      "Ruhig und doch kraftvoll – intim und spirituell bodenständig, weich, atmosphärisch und immersiv, elegant mit stiller Tiefe, geprägt von heiligem See, nebligem Wald und uralter Tempelumgebung",
    accessibility_notes:
      "Als spirituell bedeutsames und geschütztes Gebiet sind respektvolle Planung und die Einhaltung lokaler Bräuche unerlässlich; Waldwege und Seezugang erfordern durchdachte Planung der Gästebewegung; die abgelegene Lage verlangt detaillierte Koordination von Transport und Zugang für Dienstleister",
    seasonal_considerations:
      "Natürlicher Nebel verstärkt die Atmosphäre, kann aber Timing und Fotografie beeinflussen; wechselnde natürliche Bedingungen im Hochland erfordern flexible Planung; kulturelle Sensibilität und saisonale Zeremonienkalender müssen bei der Planung des Veranstaltungszeitpunkts respektiert werden",
    highlights: [
      "Heilige und unberührte Seegewässer mit der Präsenz uralter Tempel",
      "Dichter umgebender Wald mit tiefer spiritueller Atmosphäre",
      "Eine von Balis am besten bewahrten und kulturell bedeutsamsten Landschaften",
      "Ein Gefühl wahrer Stille und Präsenz, wie man es sonst nirgends findet",
      "Intime und zutiefst spirituelle Hochzeitsumgebung",
    ],
    best_for: [
      "Heilige Zeremonien am Seeufer inmitten von Wald und Tempeln",
      "Paare, die eine tiefe Verbindung zu Balis spiritueller Landschaft suchen",
      "Eine friedliche, stille und zutiefst besinnliche Umgebung",
      "Intime und besinnliche Zeremonien mit kultureller Bedeutung",
      "Eine einzigartige, zeitlose und spirituell bodenständige Hochzeit auf Bali",
    ],
    ceremony_options: [
      "Heilige Zeremonien am Seeufer mit Tempelpräsenz",
      "Intime Zeremonieschauplätze, vom Wald gerahmt",
      "Elopements am Seeufer in heiliger und stiller Umgebung",
      "Von Natur und Kultur inspirierte Zeremonieerlebnisse unter freiem Himmel",
      "Spirituelle und besinnliche Zeremonieschauplätze im Hochland",
    ],
    reception_options: [
      "Intime Empfänge mit Seeblick inmitten der Natur",
      "Stille Dinner-Feiererlebnisse, umgeben von Wald",
      "Intime Zusammenkünfte, inspiriert von der heiligen Landschaft",
      "Kleine und bedeutungsvolle Schauplätze für Feiern im Freien",
      "Abenderlebnisse mit Eintauchen in Natur und Kultur",
    ],
    accommodation_nearby: [
      "Boutique-Öko-Lodges und Retreats im Hochland in der Nähe von Munduk",
      "Naturvillen und Waldgästehäuser in Nord-Bali",
      "Retreat- und Öko-Unterkünfte im Raum Tamblingan",
      "Abgelegene, naturintegrierte Unterkunftsoptionen im Hochland",
    ],
    dining_experiences: [
      "Dinner-Erlebnisse am See und im Wald mit privatem Koch",
      "Frische Produkte aus Nord-Bali und traditionelle lokale Küche",
      "Intime und atmosphärische Mahlzeiten inmitten der Natur",
      "Stille, besinnliche Dinner-Schauplätze im Wald und am See",
    ],
    unique_features: [
      "Zeremonie an Balis heiligstem und spirituell eindrucksvollstem See",
      "Zutiefst intimes Beisammensein, geprägt von Stille, Wald und Wasser",
      "Eine Hochzeit, die zeitlos, heilig und zutiefst bedeutungsvoll wirkt",
      "Balis unberührtester und kulturell bedeutsamster Hochzeitsrahmen am See",
      "Ein transformierendes, spirituelles und wahrhaft unvergessliches Erlebnis",
    ],
  },
  "bali-botanical-garden-wedding": {
    name: "Bali Botanical Garden",
    type: "Garten & Hochlandnatur",
    description:
      "Weitläufige botanische Gärten mit hoch aufragenden Bäumen, weitem Grün und kühler Hochlandluft in Bedugul – ideal für offene, entspannte und natürlich elegante Destination Weddings, geprägt von Raum und Schlichtheit.",
    long_description:
      "Der Bali Botanical Garden in Bedugul ist eine von den weitläufigsten und ruhigsten Naturdestinationen der Insel, bekannt für sein weites Grün, hoch aufragende Bäume und offene Landschaften im kühlen Hochland. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten im Bali Botanical Garden, die sein Gefühl von Raum und Natur aufgreifen – und Feiern schaffen, die offen, ruhig und wunderschön in die Umgebung integriert wirken. Unsere Hochzeiten im Botanischen Garten werden von Waldtexturen, weichem Hochlandlicht und einer Stille geprägt, in der sich jeder Moment bodenständig und bewusst anfühlt. Wir arbeiten mit Paaren, die diesen Ort wegen seiner Weite, natürlichen Schönheit und der Möglichkeit wählen, ein Hochzeitserlebnis zu schaffen, das entspannt und visuell erlesen wirkt.",
    atmosphere:
      "Offen und doch intim – natürlich und sanft strukturiert, ruhig, luftig und erfrischend, elegant mit zurückhaltender Schlichtheit, geprägt von weiten Gartenflächen, hoch aufragenden Bäumen und kühlem Hochlandlicht",
    accessibility_notes:
      "Da es sich um einen öffentlichen Garten handelt, müssen Genehmigungen und Nutzungsrichtlinien sorgfältig beachtet werden; große offene Flächen erfordern sorgfältige Planung von Bestuhlung, Wegen und Gästefluss; kühlere Temperaturen und möglicher Regen verlangen flexible Planung und Vorbereitung",
    seasonal_considerations:
      "Morgen und später Nachmittag bieten das schönste natürliche Licht für Zeremonien und Fotografie; Schatten, Bodenbeläge und Layout müssen für den Gästekomfort im Freien durchdacht gestaltet werden; Wettermuster im Hochland erfordern flexible Planung",
    highlights: [
      "Weitläufige botanische Gärten mit hoch aufragenden Bäumen und weitem Grün",
      "Kühles Hochlandklima und erfrischende Bergluft",
      "Offene und flexible Außenbereiche in natürlicher Umgebung",
      "Eine ruhige und weniger überlaufene Umgebung im Hochland von Bedugul",
      "Einzigartiger, geräumiger Gartenrahmen, anders als jeder andere auf Bali",
    ],
    best_for: [
      "Zeremonieschauplätze im weiten Garten und Wald unter freiem Himmel",
      "Paare, die kühles Hochlandklima und offene Natur suchen",
      "Entspannte und zugleich visuell wunderschöne Feiern im Freien",
      "Intime und zugleich geräumige Hochzeitsgesellschaften",
      "Ein ruhiges, erfrischendes und natürlich elegantes Hochzeitserlebnis auf Bali",
    ],
    ceremony_options: [
      "Zeremonien im offenen Garten zwischen Bäumen und offenen Wiesen",
      "Intime Zeremonieschauplätze, vom Wald gerahmt",
      "Zeremoniekulissen unter freiem Himmel in botanischer Landschaft",
      "Elopements in stiller Gartenumgebung",
      "Naturintegrierte, geräumige Zeremonieschauplätze im Freien",
    ],
    reception_options: [
      "Empfänge im Garten und naturinspirierte Zusammenkünfte im Freien",
      "Feiern im Picknick-Stil und entspannte Feiern in offener Landschaft",
      "Intime Dinner-Erlebnisse, umgeben von Wald",
      "Dinner-Empfänge im botanischen Garten unter freiem Himmel",
      "Kreative und flexible Formate für Feiern im Freien",
    ],
    accommodation_nearby: [
      "Boutique-Hotels und Retreats im Hochland in Bedugul",
      "Naturintegrierte Villen in der Nähe des botanischen Gartens",
      "Öko-Lodges und Gästehäuser im Raum Bedugul",
      "Resortanlagen im Hochland mit Gartenblick",
    ],
    dining_experiences: [
      "Dinner-Erlebnisse im Garten mit privatem Koch in der Natur",
      "Frische Produkte aus dem Hochland von Bedugul und lokale balinesische Küche",
      "Mahlzeiten im Picknick-Stil im Freien und inmitten der Natur",
      "Intimes und atmosphärisches Dinieren im Garten unter freiem Himmel",
    ],
    unique_features: [
      "Zeremonie, umgeben von einem von Balis weitläufigsten botanischen Gärten",
      "Offenes und geräumiges Beisammensein, geprägt von Wald, Grün und Hochlandluft",
      "Eine Hochzeit, die frisch, natürlich, entspannt und visuell elegant wirkt",
      "Balis einzigartigste und offenste Hochzeitsumgebung im Garten",
      "Eine ruhige, wunderschön integrierte und unvergessliche Feier im Freien",
    ],
  },
  "mount-batur-volcanic-landscapes-wedding": {
    name: "Mount Batur & Vulkanlandschaften",
    type: "Vulkangelände & Lavafeld",
    description:
      "Raues Vulkangelände, dramatische schwarze Lavafelder und weite Blicke auf den Mount Batur – ideal für mutige, filmreife und visuell kraftvolle Destination Weddings, geprägt von Erde, Energie und roher natürlicher Schönheit.",
    long_description:
      "Das Gebiet um den Mount Batur ist eine von Balis dramatischsten und elementarsten Landschaften, geprägt von Vulkangelände, schwarzen Lavafeldern und weiten Ausblicken, die von vergangenen Ausbrüchen und Naturkräften geformt wurden. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten in der Batur-Region, die diese rohe Schönheit aufgreifen – und Feiern schaffen, die kraftvoll, bodenständig und visuell unvergesslich wirken. Unsere Hochzeiten am Batur werden von schroffen Texturen, offenen Horizonten und der Präsenz des Vulkans selbst geprägt – und schaffen eine Atmosphäre, die intensiv und zutiefst bedeutungsvoll zugleich ist. Wir arbeiten mit Paaren, die diese Landschaft wegen ihrer Einzigartigkeit, ihres dramatischen Charakters und der Möglichkeit wählen, ein Hochzeitserlebnis zu schaffen, wie es auf Bali kein zweites gibt.",
    atmosphere:
      "Mutig und doch erlesen – minimalistisch und landschaftsgeprägt, weit, offen und kraftvoll, elegant in einem rohen natürlichen Kontext, geprägt von Vulkangelände, Lavafeldern und dramatischer Bergpräsenz",
    accessibility_notes:
      "Lavafelder sind uneben und schroff, was sorgfältige Planung von Layout und Sicherheit erfordert; abgelegene Orte verlangen Koordination von Transport, Aufbau und Zugang für Dienstleister; offene Landschaften erfordern wegen Wind und Umwelteinflüssen durchdachte Entscheidungen bei Strukturen und Dekoration",
    seasonal_considerations:
      "Sonnenaufgang und früher Morgen bieten das dramatischste und schönste Licht für Zeremonien und Fotografie; kühle Morgen und starke Sonneneinstrahlung im Tagesverlauf müssen sorgfältig bedacht werden; das abgelegene Gelände erfordert zusätzliche Logistikplanung für den Zugang in der Trockenzeit",
    highlights: [
      "Dramatische schwarze Lavafelder und Vulkangelände als Kulisse",
      "Weite Blicke auf den Mount Batur als kraftvoller Blickfang",
      "Eine rohe und unberührte Naturumgebung, die auf Bali ihresgleichen sucht",
      "Mutiger, filmreifer Hochzeitsrahmen in Editorial-Qualität",
      "Eine zutiefst einzigartige Alternative zu Hochzeiten am Strand, im Dschungel oder im Reisfeld",
    ],
    best_for: [
      "Vulkanlandschaften und Lavafelder als Zeremoniekulissen",
      "Paare, die rohe Naturenergie und starke visuelle Wirkung suchen",
      "Ein einzigartiger Schauplatz mit dramatischem Charakter",
      "Editorial-, konzeptgetriebene und filmreife Hochzeitserlebnisse",
      "Eine mutige, kraftvolle und visuell unvergessliche Hochzeit auf Bali",
    ],
    ceremony_options: [
      "Zeremonieschauplätze unter freiem Himmel an Vulkan und Lavafeld",
      "Zeremonien bei Sonnenaufgang mit dem Mount Batur als Kulisse",
      "Intime Zeremonieerlebnisse im schroffen Vulkangelände",
      "Intime Elopements in der dramatischen Lavalandschaft",
      "Editorial- und konzeptgetriebene Zeremonieproduktionen",
    ],
    reception_options: [
      "Intime Dinner-Zusammenkünfte, inspiriert von der Vulkanlandschaft",
      "Editorial- und kreative Empfangserlebnisse unter freiem Himmel",
      "Dinner-Schauplätze für Feiern bei Sonnenaufgang und am Morgen",
      "Minimalistische und landschaftsgeprägte intime Empfänge",
      "Konzeptgetriebene, maßgeschneiderte Feiern im Vulkangelände",
    ],
    accommodation_nearby: [
      "Boutique-Retreats im Hochland in der Nähe des Mount Batur",
      "Lodges und Öko-Gästehäuser mit Kalderablick in Kintamani",
      "Naturintegrierte Villen in der Nähe des Batur-Sees",
      "Retreat-Anlagen im Hochland mit Vulkanpanorama",
    ],
    dining_experiences: [
      "Dinner-Erlebnisse in der Vulkanlandschaft mit privatem Koch",
      "Frische Produkte aus dem Hochland und lokale balinesische Küche",
      "Atmosphärische Mahlzeiten im Freien bei Sonnenaufgang und am Morgen",
      "Konzeptgetriebenes, maßgeschneidertes Catering in vulkanischer Umgebung",
    ],
    unique_features: [
      "Zeremonie in einer von Balis dramatischsten Vulkanlandschaften",
      "Mutiges und kraftvolles Beisammensein, geprägt von Lava, Erde und Berg",
      "Eine Hochzeit, die roh, filmreif und zutiefst unvergesslich wirkt",
      "Balis elementarster und visuell eindrucksvollster Hochzeitsrahmen",
      "Ein transformierendes, einzigartiges und wahrhaft kraftvolles Erlebnis",
    ],
  },
  "lake-weddings": {
    name: "Hochzeiten am See",
    type: "Spiegelnde Hochlandruhe",
    description:
      "Spiegelungen in stillem Wasser, Bergnebel und atmosphärische Hochlandruhe – ideal für intime, besinnliche und visuell poetische Hochzeiten, geprägt von Natur, Stille und stiller emotionaler Tiefe.",
    long_description:
      "Hochzeiten am See auf Bali bieten eine seltene Art von Erlebnis – geprägt nicht von Bewegung, sondern von Stille. Umgeben von Bergen, Wald und Nebel schaffen diese Schauplätze eine natürliche Ruhe, in der sich jeder Moment gegenwärtiger, bewusster und tiefer empfunden anfühlt. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten am See, die diese Atmosphäre aufgreifen – und Feiern schaffen, die intim, immersiv und visuell poetisch wirken. Unser Ansatz ist es nicht, Design aufzuzwingen, sondern in Harmonie mit der Umgebung zu arbeiten – wo Wasser, Licht und Landschaft das Erlebnis ganz natürlich prägen.",
    atmosphere:
      "Ruhig und besinnlich – visuell weich und vielschichtig, emotional bodenständig und natürlich elegant, wo die stille Wasseroberfläche, kühlere Hochlandluft und weiches diffuses Licht alles verlangsamen und jeden Moment mit Klarheit und Präsenz entfalten lassen",
    accessibility_notes:
      "Kühlere Temperaturen im Hochland erfordern Vorbereitung auf den Gästekomfort, besonders bei Events am frühen Morgen oder Abend; natürlicher Nebel verstärkt die Atmosphäre, kann aber Timing und Fotografie beeinflussen; das Gelände kann unebenen Boden oder Waldwege mit sich bringen, was durchdachte Layoutplanung erfordert; bestimmte heilige Seen verlangen respektvolle Planung und die Einhaltung lokaler kultureller Richtlinien",
    seasonal_considerations:
      "Das Wetter im Hochland kann sich schnell ändern, was flexible Planung und Ausweichlösungen erfordert; natürlicher Nebel und Wolkenbedeckung können im Tagesverlauf variieren und das Timing der Zeremonie beeinflussen; Morgen und später Nachmittag bieten die atmosphärischsten Lichtverhältnisse für Zeremonien und Fotografie",
    highlights: [
      "Spiegelungen in stillem Wasser und neblige Bergatmosphäre als Zeremoniekulisse",
      "Kühlere Temperaturen im Hochland und frische Bergluft",
      "Heilige und kulturell reiche Seeschauplätze, darunter Beratan, Buyan und Tamblingan",
      "Dramatik des vulkanischen Kratersees am Batur-See innerhalb der Caldera des Mount Batur",
      "Eine zutiefst intime und besinnliche Atmosphäre, anders als jeder Küstenrahmen",
    ],
    best_for: [
      "Paare, die eine ruhige, friedliche und emotional bedeutungsvolle Umgebung suchen",
      "Zeremonien am Seeufer vor nebligen Bergen und spiegelndem Wasser",
      "Eine einzigartige Alternative zu Hochzeitsschauplätzen am Strand oder auf den Klippen",
      "Intime und kulturell verbundene Feiern mit spiritueller Tiefe",
      "Ein Hochzeitserlebnis, das zeitlos, ruhig und zutiefst bewusst wirkt",
    ],
    ceremony_options: [
      "Zeremonien am Seeufer mit stillem Wasser und Bergspiegelungen",
      "Heilige Seeschauplätze mit kultureller und spiritueller Bedeutung",
      "Zeremonien am vulkanischen Kratersee mit weiten offenen Ausblicken",
      "Zeremonien in nebligen Hochlandgärten im Hochland von Bedugul",
      "Intime Elopements an stillen und abgeschiedenen Waldseen",
    ],
    reception_options: [
      "Intime Dinner-Zusammenkünfte am See mit atmosphärischen Hochlandblicken",
      "Empfänge unter freiem Himmel in Boutique-Retreats und Locations im Hochland",
      "Kulturell und landschaftlich inspirierte Feiererlebnisse",
      "Editorial- und konzeptgetriebene Feiern, geprägt von Spiegelung und Licht",
      "Mehrteilige Erlebnisse, die von der Zeremonie über das Beisammensein bis zum Dinner fließen",
    ],
    accommodation_nearby: [
      "Boutique-Retreats im Hochland und Öko-Lodges mit Seeblick",
      "Naturintegrierte Villen in der Nähe des Beratan-Sees und von Bedugul",
      "Gästehäuser, umgeben von Wald und See, nahe Buyan und Tamblingan",
      "Lodges und Retreat-Anlagen mit Kalderablick in der Nähe des Batur-Sees",
    ],
    dining_experiences: [
      "Dinner mit privatem Koch am See mit Berg- und Wasserblick",
      "Frische Produkte aus dem Hochland und lokale balinesische Küche",
      "Atmosphärische Dinner-Erlebnisse im Nebel unter freiem Himmel",
      "Intime Mahlzeiten bei Kerzenschein inmitten der Natur",
    ],
    unique_features: [
      "Zeremonie, gespiegelt im stillen Wasser des Hochlandsees",
      "Stilles und bedeutungsvolles Beisammensein, geprägt von Nebel, Berg und Wasser",
      "Eine Hochzeit, die ruhig, zeitlos und zutiefst atmosphärisch wirkt",
      "Zugang zu Balis heiligsten und landschaftlich ikonischsten Seeschauplätzen",
      "Eine Feier, geprägt von Stille, Spiegelung und natürlicher Eleganz",
    ],
  },
  "waterfall-weddings": {
    name: "Hochzeiten am Wasserfall",
    type: "Naturimmersiver & intimer Fluss",
    description:
      "Herabstürzendes Wasser, üppige Waldtexturen und weiches diffuses natürliches Licht – ideal für intime, von der Natur geleitete und emotional bodenständige Hochzeiten, geprägt von Bewegung, Klang und erlesener Zugänglichkeit.",
    long_description:
      "Hochzeiten am Wasserfall auf Bali bieten eine seltene Balance – wo die Natur kraftvoll wirkt und das Erlebnis dennoch ruhig, intim und wunderschön kuratiert bleibt. Anders als extremere oder abenteuerlichere Orte gibt es in Ubud, Zentral-Bali, West-Bali und Nord-Bali Wasserfälle, an denen Paare diesen Rahmen erleben können, ohne Komfort oder Zugänglichkeit zu opfern. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten am Wasserfall, die immersiv wirken, ohne zu überwältigen – und Feiern schaffen, die sicher, bewusst und tief mit der natürlichen Umgebung verbunden sind. Unser Ansatz konzentriert sich auf die Auswahl von Orten, an denen sich die Schönheit herabstürzenden Wassers, üppiges Grün und natürliches Licht mit Leichtigkeit erleben lassen.",
    atmosphere:
      "Intim und doch visuell eindrucksvoll – natürlich und sanft kuratiert, sicher und gut durchdacht, elegant in einer rohen Naturkulisse, in der das Rauschen des Wassers, die Textur des Steins und der umgebende Wald eine vielschichtige und zutiefst immersive Atmosphäre schaffen",
    accessibility_notes:
      "Sorgfältig ausgewählte Wasserfallorte legen Wert auf sicheren Zugang und überschaubare Gehstrecken mit wenigen Stufen; Gelände- und Sicherheitsbedingungen werden für jeden Ort bewertet; Wasserstände und rutschige Flächen erfordern sorgfältige Aufbauplanung; das natürliche Licht in Waldumgebungen variiert und erfordert präzises Timing für Zeremonie und Fotografie",
    seasonal_considerations:
      "Die Wasserführung variiert je nach Jahreszeit und beeinflusst sowohl Designentscheidungen als auch das Timing der Zeremonie; die Trockenzeit wird in der Regel für die zugänglichsten und stabilsten Bedingungen bevorzugt; weiches natürliches Licht ist in Waldumgebungen morgens und am späten Nachmittag am schönsten",
    highlights: [
      "Herabstürzender Wasserfall als natürlich dramatische und intime Zeremoniekulisse",
      "Zugängliche Orte in Ubud, Nord-Bali, West-Bali und im zentralen Hochland",
      "Weiches diffuses Waldlicht, ideal für Fotografie und Atmosphäre",
      "Ein Gefühl natürlicher Geborgenheit, Privatsphäre und emotionaler Intimität",
      "Eine einzigartige und persönliche Alternative zu klassischen Locations am Strand oder in Villen",
    ],
    best_for: [
      "Paare, die eine einzigartige, nicht traditionelle und naturverbundene Zeremonie suchen",
      "Intime Elopements in privater und natürlich immersiver Umgebung",
      "Ein Hochzeitserlebnis, das emotional bodenständig und still persönlich wirkt",
      "Naturintegrierte Feiern mit erlesenem Styling und Komfort",
      "Editorial- und Soft-Adventure-Hochzeiten in zugänglichen Naturumgebungen",
    ],
    ceremony_options: [
      "Zeremonien, direkt von herabstürzenden Wasserfallkulissen gerahmt",
      "Intime Zeremonieschauplätze, von Wald und Dschungel umschlossen",
      "Zugängliche Wasserfallorte für kleine Gruppen und Gäste",
      "Intime Elopements an privaten und verborgenen Wasserfällen",
    ],
    reception_options: [
      "Zusammenkünfte in der Natur nahe Wasserfällen inmitten von Wald",
      "Private intime Dinner in üppiger Naturumgebung",
      "Kleine und bedeutungsvolle Feiern unter freiem Himmel, geprägt von natürlichen Texturen",
      "Editorial- und konzeptgetriebene Empfangserlebnisse in der Natur",
    ],
    accommodation_nearby: [
      "Boutique-Öko-Lodges und Dschungelretreats in der Nähe von Wasserfällen",
      "Private Naturvillen in Ubud, West-Bali und Nord-Bali",
      "Waldintegrierte Gästehäuser und Retreat-Unterkünfte im Hochland",
      "Aufenthalte in nahegelegenen Boutique-Resorts und Villen mit Zugang zur Natur",
    ],
    dining_experiences: [
      "Dinner-Erlebnisse im Wald und inmitten der Natur mit privatem Koch",
      "Frische lokale balinesische Küche mit Bio-Zutaten",
      "Intime und atmosphärische Mahlzeiten am Wasserfall",
      "Sanftes und natürlich kuratiertes Catering in Waldumgebung",
    ],
    unique_features: [
      "Zeremonie, gerahmt von Klang und Bewegung herabstürzenden Wassers",
      "Zutiefst persönliches und immersives Beisammensein, geprägt von Wasser, Stein und Wald",
      "Eine Hochzeit, die intim, natürlich und wunderschön mühelos wirkt",
      "Zugang zu Balis schönsten und am besten erreichbaren Wasserfallorten",
      "Eine Feier, geprägt von Verbundenheit, Natur und stiller emotionaler Tiefe",
    ],
  },
  "private-villa-weddings": {
    name: "Hochzeiten in Privatvillen",
    type: "Exklusive Privatsphäre & kreative Freiheit",
    description:
      "Vollständige Privatsphäre, gestalterische Freiheit und eine vollständig immersive persönliche Umgebung – ideal für elegante, kreative und zutiefst personalisierte Destination Weddings, geprägt von Architektur, Intimität und nahtlosem Erlebnis.",
    long_description:
      "Hochzeiten in Privatvillen auf Bali bieten ein grundlegend anderes Erlebnis – geprägt von Privatsphäre, Flexibilität und der Freiheit, eine Feier zu gestalten, die ganz Ihre eigene ist. Anders als klassische Locations bieten Privatvillen eine leere Leinwand – wo Architektur, Landschaft und Design zusammenkommen und eine Hochzeit formen, die persönlich, immersiv und zutiefst bewusst wirkt. Bei Linda Wiryani Design and Event Planning sind wir darauf spezialisiert, Hochzeiten in Privatvillen zu gestalten, die kreative Vision mit nahtloser Umsetzung verbinden – und Feiern schaffen, die gehoben und mühelos zugleich wirken. Unser Ansatz wurzelt im Verständnis von Raum, Fluss und Erlebnis – damit sich jedes Element der Hochzeit durchdacht, erlesen und einzigartig Ihres anfühlt.",
    atmosphere:
      "Intim und doch gehoben – designorientiert und stark kuratiert, nahtlos und gut orchestriert, elegant ohne übertrieben zu wirken, wo vollständige kreative Freiheit einen privaten Raum in eine vollständig personalisierte und immersive Feierumgebung verwandelt",
    accessibility_notes:
      "Jede Villa hat eigene Richtlinien für Events, Lautstärke und Kapazität, die individuelle Abstimmung erfordern; Beleuchtung, Strom, Catering und technische Anforderungen müssen in der Regel vom Planungsteam beschafft und mitgebracht werden; Lärm- und Sperrstundenbeschränkungen variieren je nach Gebiet und lokalen Vorschriften; Wetterausweichpläne sind unerlässlich, da die meisten Villen auf den Außenbereich ausgerichtet sind",
    seasonal_considerations:
      "Die meisten Villen sind auf den Außenbereich ausgerichtet, was flexible Wetterausweichplanung erfordert; die Lichtübergänge vom Tag zum Abend müssen sorgfältig gestaltet werden; das Timing von Zeremonie, Cocktail und Empfang sollte auf das natürliche Licht und die saisonalen Sonnenuntergangszeiten auf Bali abgestimmt sein",
    highlights: [
      "Vollständige kreative Freiheit bei Design, Layout und Feierformat",
      "Eine vollständig private und exklusive Umgebung für Paar und Gäste",
      "Flexible Zeitpläne ohne die Einschränkungen klassischer Locations",
      "Mehrtägige Hochzeitserlebnisse vom Willkommensdinner bis zum Brunch nach der Hochzeit",
      "Villen in allen wichtigen Regionen Balis – an den Klippen, im Dschungel, an der Küste und im Hochland",
    ],
    best_for: [
      "Paare, die vollständige Privatsphäre und ein vollständig personalisiertes Hochzeitserlebnis suchen",
      "Designorientierte und kreativ geleitete Feierumgebungen",
      "Mehrtägige Zusammenkünfte, die Zeremonie, Dinner und Aufenthalt der Gäste verbinden",
      "Intime und bedeutungsvolle Feiern mit starker Editorial-Vision",
      "Eine Hochzeit, die ganz persönlich, erlesen und einzigartig Ihre eigene wirkt",
    ],
    ceremony_options: [
      "Zeremonien im Villengarten und am Pool mit voller gestalterischer Freiheit",
      "Zeremonien in Villen auf den Klippen mit weiten Meerblicken in Süd-Bali",
      "Zeremonien in Villen mit Dschungel- und Talblick in Ubud und Umgebung",
      "Villen an der Küste und direkt am Strand in Canggu, Seminyak und Ost-Bali",
      "Intime Elopements in privaten und wunderschön kuratierten Villenräumen",
    ],
    reception_options: [
      "Destination-Wedding-Empfänge in Villen im großen Rahmen, die Zeremonie und Dinner verbinden",
      "Mehrtägige immersive Erlebnisse, die sich über die Villenräume erstrecken",
      "Designorientierte Editorial-Empfänge in architektonisch kuratierten Umgebungen",
      "Intime Villenzusammenkünfte mit Fokus auf Verbundenheit, Atmosphäre und persönliche Bedeutung",
      "Luxuriöse Lifestyle-Empfänge, die Design, Gastfreundschaft und Erlebnis verbinden",
    ],
    accommodation_nearby: [
      "Private Villenanwesen mit vollständiger Gästeunterkunft",
      "Villen auf den Klippen und mit Meerblick in Uluwatu und Süd-Bali",
      "Dschungel- und Talvillen in Ubud mit naturintegrierter Umgebung",
      "Küstenvillen im Lifestyle-Stil in Canggu und Seminyak",
    ],
    dining_experiences: [
      "Dinner-Erlebnisse in der Villa mit privatem Koch, abgestimmt auf die Vision des Paares",
      "Mehrgängige Dinner bei Sonnenuntergang auf Villenterrassen und Poolterrassen",
      "Maßgeschneidertes Catering und Lifestyle-Dining in intimer Villenumgebung",
      "Willkommensdinner, Hochzeitsfestmahl und Brunch nach der Feier",
    ],
    unique_features: [
      "Eine vollständig personalisierte Feierumgebung, ganz von der Designvision geprägt",
      "Privatsphäre und Exklusivität, die eine Hochzeit in ein immersives Erlebnis verwandeln",
      "Nahtloser Fluss zwischen Zeremonie, Cocktail, Empfang und Übernachtung der Gäste",
      "Kreative Freiheit, ohne die Einschränkungen klassischer Locations zu gestalten",
      "Ein Hochzeitserlebnis, das zutiefst persönlich, erlesen und ganz Ihr eigenes wirkt",
    ],
  },
  "mountain-weddings": {
    name: "Hochzeiten in den Bergen",
    type: "Gehobene Hochland- & Vulkangrandeur",
    description:
      "Panoramablicke, kühlere Bergluft und ein weites Gefühl von Raum und Licht – ideal für gehobene, ruhige und visuell erlesene Destination Weddings, geprägt von Landschaft, Atmosphäre und natürlicher Grandeur.",
    long_description:
      "Hochzeiten in den Bergen auf Bali bieten eine besondere Art von Erlebnis – geprägt von Höhe, Atmosphäre und einem weiten Gefühl von Raum. In Hochlandregionen, umgeben von Vulkanen, Tälern und Wald, schaffen diese Schauplätze eine natürliche Umgebung, in der die Luft leichter wirkt, die Ausblicke endlos erscheinen und jeder Moment gegenwärtiger ist. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten in den Bergen, die diese gehobene Atmosphäre aufgreifen – und Feiern schaffen, die ruhig, bewusst und visuell eindrucksvoll wirken. Unser Ansatz konzentriert sich darauf, mit der Landschaft zu arbeiten – und Licht, Luft und Horizont das Erlebnis so formen zu lassen, dass es kraftvoll und erlesen zugleich wirkt.",
    atmosphere:
      "Weit und doch intim – ruhig und atmosphärengeleitet, lichtdurchflutet und visuell erlesen, elegant mit natürlicher Zurückhaltung, wo kühlere Temperaturen, weite Talblicke und das Gefühl, über dem Gewöhnlichen zu stehen, eine zutiefst bodenständige und kraftvolle Hochzeitsumgebung schaffen",
    accessibility_notes:
      "Orte im Hochland erfordern koordinierten Transport für Gäste und Dienstleister; offene erhöhte Landschaften verlangen sorgfältige Design- und Strukturüberlegungen im Hinblick auf Wind und Umwelteinflüsse; erhöhtes Gelände kann Hänge oder unebenen Boden mit sich bringen, was durchdachte Layout- und Gästeflussplanung erfordert; kühlere Temperaturen verlangen Vorbereitung auf den Gästekomfort, besonders bei Events am frühen Morgen oder Abend",
    seasonal_considerations:
      "Bergblicke können von Wolkenbedeckung und wechselnden Wetterbedingungen beeinflusst werden, was flexible Planung erfordert; Morgen und später Nachmittag bieten das schönste natürliche Licht für Zeremonien und Fotografie; die Trockenzeit wird für die stabilsten Bedingungen im Hochland und die Planung von Zeremonien im Freien bevorzugt",
    highlights: [
      "Panoramablicke über Vulkanlandschaften, Täler und offene Horizonte",
      "Kühlere Temperaturen im Hochland und frische, leichte Bergluft",
      "Die Region Kintamani und Mount Batur mit mutigen und filmreifen Vulkanblicken",
      "Das Hochland von Bedugul mit kühlen Seen, Wäldern und ruhigen Gartenumgebungen",
      "Das Sidemen-Tal, das Reisfelder, Bergblicke und intime natürliche Tiefe verbindet",
    ],
    best_for: [
      "Paare, die einen Rahmen mit Panoramablicken und gehobener Atmosphäre suchen",
      "Zeremonieschauplätze mit Blick auf Vulkan und Kratersee in Kintamani und Batur",
      "Eine kühlere, ruhigere und weniger überlaufene Alternative zu Hochzeiten am Strand oder an der Küste",
      "Intime Hochzeiten im Hochland, von der Natur geleitet und mit starker visueller Präsenz",
      "Ein Hochzeitserlebnis, das gehoben, erlesen und still außergewöhnlich wirkt",
    ],
    ceremony_options: [
      "Zeremonien unter freiem Himmel mit Vulkanblick auf Mount Batur und Kratersee",
      "Zeremonien im Hochland von Bedugul mit nebligen Seen und Gartenumgebung",
      "Zeremonien im Hochland von Munduk und Nord-Bali mit Wald- und Talblick",
      "Zeremonien im Sidemen-Tal, die Berg-, Reisfeld- und Talszenerie verbinden",
      "Intime Elopements im Hochland in offener und erhöhter Naturlandschaft",
    ],
    reception_options: [
      "Intime Dinner-Empfänge mit Panoramablick auf Berg und Tal",
      "Feiern auf Hochlandterrassen unter freiem Himmel",
      "Dinner-Erlebnisse in Boutique-Retreats und Locations im Hochland",
      "Abendliche Feierabläufe bei Kerzenschein und von der Landschaft geleitet",
      "Mehrteilige Erlebnisse im Hochland von der Zeremonie bis zum Dinner bei Sonnenuntergang",
    ],
    accommodation_nearby: [
      "Boutique-Retreats im Hochland und Öko-Lodges mit Kalderablick",
      "Villen mit Bergblick und naturintegrierte Retreat-Anlagen",
      "Gästehäuser und Resorts im Hochland im Raum Bedugul und Kintamani",
      "Retreat- und Naturlodge-Unterkünfte im Hochland von Munduk und Nord-Bali",
    ],
    dining_experiences: [
      "Dinner-Erlebnisse mit privatem Koch und Blick auf Kaldera und Berge",
      "Frische Produkte aus dem Hochland und traditionelle lokale balinesische Küche",
      "Intime Dinner-Schauplätze auf Terrassen unter freiem Himmel mit Talblick",
      "Atmosphärisches Dinieren im Hochland bei Kerzenschein inmitten der Natur",
    ],
    unique_features: [
      "Zeremonie mit Blick über Vulkanlandschaften und weite Berghorizonte",
      "Gehobenes Beisammensein, geprägt von kühler Luft, weiten Ausblicken und offenem Hochlandraum",
      "Eine Hochzeit, die kraftvoll, erlesen und tief mit dem Land verbunden wirkt",
      "Zugang zu Balis dramatischsten Hochzeitsschauplätzen im Hochland und in Vulkanlandschaften",
      "Eine Feier, geprägt von Höhe, Atmosphäre und natürlicher Grandeur",
    ],
  },
  "jungle-forest-weddings": {
    name: "Hochzeiten im Dschungel & Wald",
    type: "Naturintegrierte Atmosphäre & Tiefe",
    description:
      "Vielschichtiges Dschungelgrün, gefiltertes natürliches Licht und eine zutiefst immersive Waldatmosphäre – ideal für intime, emotional reiche und von der Natur geleitete Hochzeiten, geprägt von Textur, organischer Schönheit und authentischer Verbundenheit.",
    long_description:
      "Hochzeiten im Dschungel und Wald auf Bali bieten ein zutiefst immersives Erlebnis – wo die Natur nicht Kulisse, sondern fester Bestandteil der Feier ist. Umgeben von vielschichtigem Grün, gefiltertem Licht und natürlichen Texturen schaffen diese Schauplätze eine Atmosphäre, die intim, bodenständig und emotional reich wirkt. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten im Dschungel, die über Dekoration hinausgehen – und Feiern schaffen, die verbunden, bewusst und natürlich ausdrucksstark wirken. Unser Ansatz konzentriert sich darauf, die Umgebung führen zu lassen – wo Licht, Laub und Landschaft Ton und Fluss des Tages prägen.",
    atmosphere:
      "Intim und doch visuell reich – immersiv und atmosphärisch, weich, vielschichtig und ausdrucksstark, elegant mit natürlicher Zurückhaltung, wo ein Gefühl der Geborgenheit, gefiltertes natürliches Licht, organische Texturen und ein ruhiges sinnliches Erlebnis eine Hochzeit schaffen, die weniger inszeniert und mehr zutiefst gelebt wirkt",
    accessibility_notes:
      "Waldumgebungen können unebenen Boden oder natürliches Gelände mit sich bringen, was sorgfältige Layout- und Gästeflussplanung erfordert; Luftfeuchtigkeit verlangt Vorbereitung auf den Gästekomfort, einschließlich Belüftung und schattiger Sitzbereiche; gefilterte Lichtverhältnisse erfordern präzises Timing für Zeremonie und Fotografie; natürliche Schauplätze mit dichter Vegetation verlangen durchdachte Wege- und Zugänglichkeitsplanung",
    seasonal_considerations:
      "In Dschungelgebieten kann es plötzlich regnen, was Ausweichplanung und flexible Strukturoptionen erfordert; gefiltertes Waldlicht ist morgens und am späten Nachmittag am schönsten und sanftesten; die Luftfeuchtigkeit steigt in der Regenzeit, was zusätzliche Vorbereitung für den Gästekomfort erfordert; die Trockenzeit wird für die meisten Zeremonie- und Empfangserlebnisse im Dschungel im Freien bevorzugt",
    highlights: [
      "Vielschichtiges Dschungelgrün und organische Texturen als natürliche Zeremonieumgebung",
      "Weiches, gefiltertes natürliches Licht, das eine sanfte und immersive Atmosphäre schafft",
      "Ubud und Zentral-Bali mit erlesenen und gut erreichbaren Dschungel-Locations",
      "Sidemen-Tal und Tegallalang für üppige, intime Wald- und Reisfeldschauplätze",
      "Das Hochland von Pupuan und Nord-Bali für tieferes, abgeschiedeneres Eintauchen in den Dschungel",
    ],
    best_for: [
      "Paare, die einen emotional bodenständigen und naturintegrierten Zeremonierahmen suchen",
      "Intime Hochzeiten mit starker Verbindung zu natürlicher Textur und Atmosphäre",
      "Eine einzigartige und zutiefst immersive Alternative zu Locations am Strand oder in offener Landschaft",
      "Von der Natur geleitete Feiern, die authentisch, persönlich und wunderschön organisch wirken",
      "Ein Hochzeitserlebnis, das lebendig, verbunden und natürlich ausdrucksstark wirkt",
    ],
    ceremony_options: [
      "Zeremonieschauplätze, von Dschungel und Wald umschlossen, mit Blätterdach und Grün",
      "Zeremonien am Flussufer und auf dem Talboden, umgeben von tropischer Natur",
      "Intime Zeremonieschauplätze in Tegallalang und im Übergang von Reisfeld zu Wald",
      "Zeremonien im Sidemen-Tal, die Dschungel, Berg und Tal in ihrer Tiefe verbinden",
      "Elopements in privater und abgeschiedener Waldumgebung",
    ],
    reception_options: [
      "Dinner-Empfänge in privaten Dschungelretreats und inmitten der Natur",
      "Zusammenkünfte und Feiererlebnisse unter freiem Himmel, umgeben von Wald",
      "Editorial- und designorientierte Dschungelempfänge mit erlesenem natürlichem Styling",
      "Intime Dinner bei Kerzenschein in umschlossener und atmosphärischer Naturumgebung",
      "Mehrteilige Naturerlebnisse, die von der Zeremonie bis zum Dinner im Wald fließen",
    ],
    accommodation_nearby: [
      "Boutique-Dschungelvillen und Öko-Lodge-Retreats in Ubud",
      "Naturintegrierte Privatvillen in Tegallalang und Sidemen",
      "Waldgästehäuser und Retreat-Unterkünfte in Nord- und West-Bali",
      "Öko-Resorts und nachhaltige Anlagen in Dschungellandschaften",
    ],
    dining_experiences: [
      "Dinner-Erlebnisse mit privatem Koch in Dschungel- und Waldatmosphäre",
      "Farm-to-Table- und Bio-Küche aus der lokalen Umgebung",
      "Intime Dinner-Schauplätze am Fluss und mit Talblick",
      "Immersives und natürlich kuratiertes Catering in Waldumgebung",
    ],
    unique_features: [
      "Zeremonie, umgeben von vielschichtigem grünem Dschungelblätterdach und organischen Texturen",
      "Intimes und emotional reiches Beisammensein, geprägt von gefiltertem Licht und Waldtiefe",
      "Eine Hochzeit, die immersiv, lebendig und tief mit der Natur verbunden wirkt",
      "Zugang zu Balis schönsten und vielfältigsten Hochzeitsschauplätzen im Dschungel und Wald",
      "Eine Feier, geprägt von Atmosphäre, Textur und natürlichem emotionalem Nachklang",
    ],
  },
  "beachfront-oceanfront-weddings": {
    name: "Hochzeiten direkt am Strand & am Meer",
    type: "Küstenhorizont & mühelose Eleganz",
    description:
      "Endlose Meereshorizonte, sich wandelndes natürliches Licht und der offene Rhythmus der Küste – ideal für entspannte und zugleich erlesene Destination Weddings, geprägt von Freiheit, Wärme und der ikonischen Schönheit von Balis Küste.",
    long_description:
      "Hochzeiten direkt am Strand auf Bali bieten eines der ikonischsten und emotional eindrucksvollsten Erlebnisse – wo sich der Horizont endlos erstreckt, das Licht sanft zum Sonnenuntergang wandert und sich jeder Moment offen und lebendig anfühlt. An Balis Küste gelegen, werden diese Hochzeiten von Meeresluft, natürlichem Licht und einem Gefühl von Freiheit geprägt, das die Feier entspannt und gehoben zugleich wirken lässt. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten am Strand, die über die Kulisse hinausgehen – und Feiern schaffen, die bewusst, erlesen und tief mit dem Rhythmus der Küste verbunden wirken. Unser Ansatz ist es, mit der Umgebung zu arbeiten – und Meer, Licht und Raum die Atmosphäre und den Fluss des Tages leiten zu lassen.",
    atmosphere:
      "Entspannt und doch wunderschön kuratiert – lichtdurchflutet und atmosphärengeleitet, offen, luftig und elegant, gesellig, warm und mühelos erlesen, wo ungestörte Meerblicke, natürliches Licht, das sich vom Nachmittag zum Sonnenuntergang wandelt, und Küstenluft ein Hochzeitserlebnis schaffen, das weit und zutiefst einladend zugleich wirkt",
    accessibility_notes:
      "Wind und Küstenexposition müssen bei Strukturdesign, Blumen und Styling-Elementen sorgfältig bedacht werden; der Zeitpunkt der Zeremonie muss präzise auf Balis Sonnenuntergangslicht und Fotobedingungen abgestimmt werden; Schatten, Bodenbeläge und Bestuhlung sind für den Gästekomfort in offenen Strandumgebungen unerlässlich; an Strand- und Küsten-Locations gelten oft besondere Lärmschutz- und Betriebsrichtlinien, die eingehalten werden müssen",
    seasonal_considerations:
      "Nach Westen ausgerichtete Strände fangen Balis ikonischste goldene Sonnenuntergangstöne ein – der Zeitpunkt der Zeremonie wird sorgfältig für maximale visuelle und fotografische Wirkung geplant; die Trockenzeit bietet stabilere Küstenwindverhältnisse; Küstenbrise und offene Exposition erfordern das ganze Jahr über flexible Ausweichplanung",
    highlights: [
      "Ikonische Zeremonien bei Sonnenuntergang an Balis Meeresküste",
      "Dramatische Schauplätze auf den Klippen in Uluwatu mit weiten Meerblicken",
      "Ruhige Bucht und Eleganz direkt am Strand in Jimbaran und Nusa Dua",
      "Stilvolle Küstenenergie an den Stränden von Seminyak, Canggu und Kuta",
      "Friedliche Sonnenaufgänge und sanfte Küstenschauplätze an Sanurs Ostküste",
    ],
    best_for: [
      "Paare, die eine ikonische Zeremonie am Meer zur goldenen Stunde auf Bali suchen",
      "Eine entspannte und zugleich gehobene Feier am Strand mit geselliger Wärme",
      "Schauplätze auf den Klippen und direkt am Meer mit dramatischer visueller Wirkung",
      "Große Feiern, die eine Zeremonie bei Sonnenuntergang mit einem Empfang unter freiem Himmel verbinden",
      "Ein Hochzeitserlebnis, das offen, warm und natürlich unvergesslich wirkt",
    ],
    ceremony_options: [
      "Strandzeremonien bei Sonnenuntergang entlang von Balis nach Westen ausgerichteten Küsten",
      "Zeremonien auf den Klippen mit Meerblick in Uluwatu und Süd-Bali",
      "Zeremonien am Strand der ruhigen Bucht in Jimbaran und Nusa Dua",
      "Stilvolle zeitgenössische Schauplätze am Strand in Seminyak und Canggu",
      "Intime Zeremonien bei Sonnenaufgang und sanfte Zeremonien an der Ostküste in Sanur",
    ],
    reception_options: [
      "Dinner-Empfänge am Strand unter offenem Abendhimmel",
      "Cocktails bei Sonnenuntergang und fließende Abendfeiern",
      "Bankette und Zusammenkünfte auf Terrassen in Resorts auf den Klippen und mit Meerblick",
      "Beach Clubs und zeitgenössische Empfangsumgebungen an der Küste",
      "Intimes Dinner am Meer und kleine Feiern an der Küste",
    ],
    accommodation_nearby: [
      "Villen auf den Klippen und Luxusresorts in Uluwatu und Süd-Bali",
      "Boutique-Hotels und Villen direkt am Strand in Seminyak und Canggu",
      "Luxusresort-Anlagen in Nusa Dua und Jimbaran",
      "Heritage-Hotels direkt am Strand und friedliche Aufenthalte an der Küste in Sanur",
    ],
    dining_experiences: [
      "Dinner-Erlebnisse am Strand im Sand bei Sonnenuntergang",
      "Mehrgängige Resort-Dinner mit Meerblick und maßgeschneidertes Catering",
      "Cocktails bei Sonnenuntergang und Lifestyle-Catering entlang der Küste",
      "Dinner-Schauplätze am Strand und auf den Klippen mit privatem Koch",
    ],
    unique_features: [
      "Zeremonie am Meer mit Balis ikonischem Sonnenuntergang als natürlicher Kulisse",
      "Ein fröhliches und offenes Beisammensein, geprägt von Licht, Horizont und Wärme der Küste",
      "Eine Hochzeit, die entspannt, lebendig und wunderschön mühelos wirkt",
      "Zugang zu Balis vielfältigsten und ikonischsten Hochzeitsschauplätzen am Strand",
      "Eine Feier, geprägt von Offenheit, natürlichem Licht und dem Rhythmus des Meeres",
    ],
  },
  "royal-balinese-weddings": {
    name: "Königliche balinesische Hochzeiten",
    type: "Heritage-Architektur & kulturelle Kunstfertigkeit",
    description:
      "Traditionelle balinesische Architektur, kunstvolle Schnitzereien und vielschichtige zeremonielle Räume – ideal für kulturell bedeutungsvolle, visuell unverwechselbare und zutiefst bewusste Hochzeiten, geprägt von Erbe, Kunstfertigkeit und zeitloser Eleganz.",
    long_description:
      "Königliche balinesische Hochzeiten bieten ein zutiefst unverwechselbares Erlebnis – wo die Feier nicht nur vom Design, sondern von Kultur, Symbolik und architektonischer Schönheit geprägt wird. In Räumen mit kunstvollen Schnitzereien, traditionellen Pavillons und vielschichtigen Innenhöfen tragen diese Hochzeiten ein Gefühl von Erbe in sich, das visuell eindrucksvoll und emotional bedeutungsvoll zugleich wirkt. Bei Linda Wiryani Design and Event Planning gestalten wir königliche balinesische Hochzeiten, die diesen Reichtum ehren – und Feiern schaffen, die respektvoll, erlesen und durchdacht in ihre Umgebung integriert wirken. Unser Ansatz wurzelt im Verständnis von Raum und Bedeutung – damit sich jedes Element mit dem kulturellen und architektonischen Kontext im Einklang anfühlt.",
    atmosphere:
      "Zeitlos und erlesen – kulturell verwurzelt und doch gehoben, visuell reich und doch ausgewogen, elegant mit Tiefe und Bedeutung, wo traditionelle balinesische Architektur mit detaillierten Schnitzereien, offene Pavillons, strukturierte Innenhöfe und natürliche Materialien wie Stein, Holz und Reet einen Raum schaffen, der ein Gefühl von Geschichte trägt und den Ort selbst zum Teil der Hochzeitserzählung macht",
    accessibility_notes:
      "Kulturelle Sensibilität und Respekt vor lokalen Bräuchen müssen in der gesamten Planung sorgfältig integriert werden; bestimmte historische Orte können besondere Regeln, Einschränkungen und Nutzungsrichtlinien haben; traditionelle Anlagen erfordern durchdachte Bewegungsplanung über mehrere Pavillons und Innenhöfe hinweg; Dekoration und Styling müssen den bestehenden architektonischen Rahmen aufwerten, statt ihn zu überlagern; viele traditionelle Locations sind halboffen und erfordern Wetterausweichplanung",
    seasonal_considerations:
      "Halboffene traditionelle Locations erfordern flexible Ausweichplanung bei Regen; das natürliche Licht in geschnitzten Innenhöfen und Pavillons ist morgens und am späten Nachmittag am schönsten; das Timing von Zeremonien und Prozessionen sollte lokale Kulturkalender und zeremonielle Gesichtspunkte respektieren",
    highlights: [
      "Authentische traditionelle balinesische Architektur mit kunstvollen Steinschnitzereien",
      "Offene Pavillons, vielschichtige Innenhöfe und Umgebung aus natürlichen Materialien",
      "Ubud und Gianyar – das kulturelle Herz Balis mit erlesenen Heritage-Locations",
      "Heritage-Paläste und Wassergärten in Ost-Bali mit starker architektonischer Präsenz",
      "Boutique-Heritage-Locations und Privatvillen, die traditionelles balinesisches Design bewahren",
    ],
    best_for: [
      "Paare, die einen kulturell reichen und architektonisch unverwechselbaren Rahmen suchen",
      "Hochzeiten, die balinesisches Erbe mit erlesenem zeitgenössischem Design verbinden",
      "Eine Feier mit tiefer kultureller Bedeutung und visueller Kunstfertigkeit",
      "Intime Zeremonien, die in Tradition und Ort verwurzelt wirken",
      "Ein einzigartig balinesisches Hochzeitserlebnis, das zeitlos und bewusst zugleich wirkt",
    ],
    ceremony_options: [
      "Zeremonien in traditionellen Pavillons und geschnitzten Innenhöfen",
      "Zeremonieumgebungen in Heritage-Palästen und Wassergärten",
      "Zeremonien in Boutique-Locations, die den authentischen balinesischen Baustil bewahren",
      "Zeremonien in Privatvillen mit traditionellen balinesischen Designelementen",
      "Intime Elopements in kulturell bedeutsamer architektonischer Umgebung",
    ],
    reception_options: [
      "Empfangserlebnisse mit Fluss durch vielschichtige Innenhöfe und Pavillons",
      "Dinner-Zusammenkünfte in Heritage-Gärten und auf architektonischen Anlagen",
      "Kulturell inspirierte Feiern in mehreren Räumen traditioneller Anlagen",
      "Editorial- und designorientierte Empfänge in architektonisch reicher Umgebung",
      "Intime kulturelle Zusammenkünfte mit Fokus auf Atmosphäre, Bedeutung und Verbundenheit",
    ],
    accommodation_nearby: [
      "Boutique-Heritage-Hotels und Villenanlagen im traditionellen Stil in Ubud",
      "Kulturelle Anlagen und private Heritage-Unterkünfte in Gianyar",
      "Historische Anlagen in der Nähe von Palästen in der Region Karangasem",
      "Privatvillen mit authentischem balinesischem architektonischem Charakter",
    ],
    dining_experiences: [
      "Traditionelle balinesische Küche, serviert in Innenhöfen und Pavillons",
      "Erlebnisse mit privatem Koch, die kulturelle Aromen und erlesene Präsentation verbinden",
      "Von Heritage inspirierte mehrgängige Dinner in architektonischer Umgebung",
      "Kulturell reiche gemeinschaftliche und festliche Dinner-Erlebnisse",
    ],
    unique_features: [
      "Zeremonie in einem Raum, geprägt von Jahrhunderten balinesischer Kunstfertigkeit und Tradition",
      "Ein zutiefst bedeutungsvolles Beisammensein, geprägt von Architektur, Kultur und Symbolik",
      "Eine Hochzeit, die zeitlos, visuell reich und authentisch balinesisch wirkt",
      "Zugang zu Balis architektonisch bedeutsamsten und kulturell eindrucksvollsten Schauplätzen",
      "Eine Feier, bei der der Raum selbst zu einem festen Bestandteil der Geschichte wird",
    ],
  },
  "rice-paddy-field-weddings": {
    name: "Hochzeiten im Reisfeld",
    type: "Ikonische Landschaft & kulturelle Harmonie",
    description:
      "Vielschichtige Terrassen, offener Himmel und die lebendige Kulturlandschaft von Balis Reisfeldern – ideal für weite, bodenständige und authentisch balinesische Hochzeiten, geprägt von natürlichem Licht, landwirtschaftlichem Erbe und ikonischer Szenerie.",
    long_description:
      "Hochzeiten im Reisfeld auf Bali fangen eine der bekanntesten und bedeutungsvollsten Landschaften der Insel ein – wo vielschichtige Terrassen, offener Himmel und der Rhythmus der Natur einen Rahmen schaffen, der weit und zutiefst bodenständig zugleich wirkt. Diese Umgebungen sind mehr als visuell schön; sie stehen für eine lebendige Kulturlandschaft, geprägt von Tradition, Gemeinschaft und Harmonie mit der Natur. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten im Reisfeld, die diese Balance ehren – und Feiern schaffen, die immersiv, bewusst und mit dem Ort verbunden wirken. Unser Ansatz ist es, mit der Landschaft zu arbeiten – und Raum, Licht und natürliche Textur die Atmosphäre des Tages prägen zu lassen.",
    atmosphere:
      "Weit und doch intim – natürlich und visuell ausgewogen, lichtdurchflutet und atmosphärengeleitet, elegant mit stiller Schlichtheit, wo vielschichtige Terrassen, offener Himmel, weiches natürliches Licht und die Verbindung zu Balis lebendigem landwirtschaftlichem und kulturellem Erbe eine Hochzeit schaffen, die ikonisch und bedeutungsvoll bodenständig zugleich wirkt",
    accessibility_notes:
      "Terrassenlandschaften können Hänge, Stufen oder unebene Wege mit sich bringen, was sorgfältige Layout- und Gästeflussplanung erfordert; offene Umgebungen verlangen Vorbereitung auf Sonneneinstrahlung, Wind und Regen, wobei Schatten und Bodenbeläge unerlässlich sind; Reisfelder sind genutzte Kulturlandschaften, die respektvolle Planung und Umweltsensibilität erfordern; Morgen und später Nachmittag bieten das schönste natürliche Licht für Zeremonien und Fotografie",
    seasonal_considerations:
      "Farbe und visueller Charakter der Reisfelder verändern sich im Laufe der landwirtschaftlichen Zyklen – grüne Terrassen sind während und nach der Regenzeit am üppigsten, während goldene Phasen vor der Ernte eine andere Schönheit bieten; offenes Gelände erfordert vollständige Wetterausweichplanung; Licht am Morgen und zur goldenen Stunde ist über Terrassenlandschaften besonders schön",
    highlights: [
      "Ikonische Terrassenlandschaften von Tegallalang mit dramatischer visueller Schichtung",
      "Von der UNESCO anerkannte Reisterrassen von Jatiluwih mit weiten offenen Ausblicken",
      "Sidemen-Tal, das Reisfelder mit Bergblicken und stiller Intimität verbindet",
      "Erlesene Locations im Raum Ubud, die Blicke auf Reisfelder mit Komfort und Zugänglichkeit verbinden",
      "Abgeschiedene Schauplätze in Pupuan und West-Bali mit unberührter Privatsphäre in den Reisfeldern",
    ],
    best_for: [
      "Paare, die Balis ikonischste und authentisch wiedererkennbare Landschaft suchen",
      "Zeremonien mit Blick auf Reisterrassen unter offenem Himmel und in weiter Natur",
      "Eine kulturell bedeutungsvolle und visuell zeitlose Hochzeitskulisse",
      "Naturintegrierte Feiern mit starkem Gefühl für balinesischen Ort und Identität",
      "Eine Hochzeit, die elegant bodenständig und tief mit der Insel verbunden wirkt",
    ],
    ceremony_options: [
      "Zeremonien mit Blick über die Reisterrassen und weite Landschaftsblicke",
      "Zeremonieschauplätze auf den weiten UNESCO-Terrassen von Jatiluwih",
      "Ikonische vielschichtige Terrassen- und Talkulissen in Tegallalang für Zeremonien",
      "Intime Zeremonien mit Blick auf Reisfelder und Berge im Sidemen-Tal",
      "Intime Elopements in stiller und abgeschiedener Reisterrassenumgebung",
    ],
    reception_options: [
      "Dinner- und Gesellschaftsempfänge auf Terrassen mit Blick auf Reisfelder",
      "Empfänge in Boutique-Locations und Villen mit Blick auf landwirtschaftliche Landschaften",
      "Kulturell und landschaftlich inspirierte festliche Dinner-Erlebnisse",
      "Intime und von Natur umgebene kleine Abendzusammenkünfte",
      "Mehrteilige Erlebnisse von der Zeremonie bis zum Dinner im Reisfeld bei Sonnenuntergang",
    ],
    accommodation_nearby: [
      "Boutique-Villen und Öko-Lodges mit direktem Blick auf Reisfelder und Terrassen",
      "Naturintegrierte Privatvillen in Tegallalang und Umgebung von Ubud",
      "Heritage-Retreat-Anlagen im Sidemen-Tal mit Tal- und Bergblick",
      "Gästehäuser und nachhaltige Retreat-Unterkünfte im Raum Jatiluwih",
    ],
    dining_experiences: [
      "Dinner-Erlebnisse mit privatem Koch auf Terrassen mit Blick auf Reisfelder",
      "Farm-to-Table-Küche mit lokal angebauten balinesischen Produkten",
      "Bio- und kulturell inspirierte mehrgängige Mahlzeiten",
      "Intime Dinner mit Blick auf vielschichtige grüne Reisterrassen",
    ],
    unique_features: [
      "Zeremonie mit Blick über Balis ikonischste und kulturell bedeutsamste Landschaft",
      "Ein Beisammensein, umgeben vom lebendigen landwirtschaftlichen Erbe der Insel",
      "Eine Hochzeit, die zeitlos, authentisch und tief mit Bali verbunden wirkt",
      "Zugang zu den bekanntesten und visuell eindrucksvollsten Terrassenschauplätzen der Insel",
      "Eine Feier, bei der Landschaft, Kultur und natürliche Schönheit untrennbar sind",
    ],
  },
  "riverside-weddings": {
    name: "Hochzeiten am Fluss",
    type: "Intimer Fluss & sinnliche Atmosphäre",
    description:
      "Fließendes Wasser, vielschichtiges Grün im Tal und weiches gefiltertes Licht entlang von Balis Flusslandschaften – ideal für intime, emotional reiche und zutiefst immersive Hochzeiten, geprägt von Klang, Textur und natürlichem Rhythmus.",
    long_description:
      "Hochzeiten am Fluss auf Bali bieten ein zutiefst immersives Erlebnis – wo der sanfte Fluss des Wassers, umgebendes Grün und vielschichtige Landschaft einen Rahmen schaffen, der ruhig, intim und natürlich lebendig wirkt. Anders als weite Küsten- oder Berglandschaften bringen Schauplätze am Fluss ein Gefühl von Nähe mit sich – wo Klang, Textur und Bewegung einen Raum schaffen, der erdend und emotional reich zugleich wirkt. Bei Linda Wiryani Design and Event Planning gestalten wir Hochzeiten am Fluss, die diese Atmosphäre aufgreifen – und Feiern schaffen, die persönlich, immersiv und wunderschön mit der Natur verbunden wirken. Unser Ansatz ist es, mit dem Rhythmus der Umgebung zu arbeiten – und Wasser, Licht und Landschaft das Erlebnis organisch prägen zu lassen.",
    atmosphere:
      "Intim und doch visuell reich – ruhig und atmosphärengeleitet, weich, vielschichtig und immersiv, elegant mit natürlicher Raffinesse, wo das Rauschen fließenden Wassers, ein Gefühl der Geborgenheit durch Talwände und tropisches Grün sowie weiches gefiltertes Licht in natürlicher Umgebung eine Hochzeit schaffen, die weniger inszeniert und mehr zutiefst erlebnisorientiert wirkt",
    accessibility_notes:
      "Flussufer und Täler können unebenen Boden, Hänge oder natürliches Gelände mit sich bringen, was sorgfältige Layout- und Wegeplanung für die Gäste erfordert; Luftfeuchtigkeit und natürliche Nässe verlangen Vorbereitung auf den Gästekomfort, einschließlich Belüftung und geeigneter Bodenbeläge; Wasserstände und Strömung des Flusses können saisonal variieren und Aufbaubereiche sowie Zugänglichkeit beeinflussen; gefiltertes Licht in Talumgebungen erfordert präzises Timing für Zeremonie und Fotografie",
    seasonal_considerations:
      "Strömung und Wasserstände des Flusses variieren je nach Niederschlag und Jahreszeit, was flexible Standortbewertung und Planung erfordert; Täler und Dschungelränder erleben in der Regenzeit höhere Luftfeuchtigkeit; gefiltertes Waldlicht in den Tälern ist morgens und am späten Nachmittag am sanftesten und schönsten; die Trockenzeit wird für die zugänglichsten und angenehmsten Bedingungen bei Zeremonien am Fluss bevorzugt",
    highlights: [
      "Natürlich fließendes Wasser als prägender Klang und Atmosphäre der Zeremonie",
      "Erlesene Schauplätze in Ubud und am Ayung-Fluss mit zugänglicher Dschungelschönheit am Fluss",
      "Sidemen-Tal, das Flusslandschaften mit Reisfeldern und Bergblicken verbindet",
      "Verborgene Flusstäler in Zentral-Bali mit vollständiger Privatsphäre und vielschichtiger natürlicher Tiefe",
      "Abgelegene Flussumgebungen in Nord- und West-Bali mit tiefer Abgeschiedenheit",
    ],
    best_for: [
      "Paare, die einen intimen, sinnesreichen und emotional bodenständigen Rahmen suchen",
      "Eine einzigartige, in die Natur eingetauchte Alternative zu Zeremonien am Strand oder in offener Landschaft",
      "Elopements am Fluss mit starkem Gefühl von Ruhe, Fluss und persönlicher Verbundenheit",
      "Naturintegrierte Feiern, bei denen Wasser, Klang und Textur die Atmosphäre führen",
      "Ein Hochzeitserlebnis, das zutiefst persönlich, lebendig und still unvergesslich wirkt",
    ],
    ceremony_options: [
      "Zeremonien am Fluss neben fließendem Wasser inmitten von Dschungel und Tal",
      "Zeremonieschauplätze in Ubud und im Tal des Ayung-Flusses mit erlesenem natürlichem Charakter",
      "Zeremonien am Fluss im Sidemen-Tal, die Wasser, Reisfelder und Bergblicke verbinden",
      "Zeremonien in verborgenen Tälern in Zentral-Bali mit vollständiger Privatsphäre und natürlicher Geborgenheit",
      "Intime Elopements entlang stiller und abgeschiedener Flusslandschaften",
    ],
    reception_options: [
      "Intime Dinner-Empfänge auf Terrassen am Fluss und auf dem Talboden",
      "Immersive Zusammenkünfte unter freiem Himmel in der Natur am fließenden Wasser",
      "Editorial- und designorientierte Feiern am Fluss mit erlesenem natürlichem Styling",
      "Intime Dinner bei Kerzenschein in umschlossener und atmosphärischer Talumgebung",
      "Mehrteilige Erlebnisse, die von der Zeremonie bis zum Dinner am Fluss fließen",
    ],
    accommodation_nearby: [
      "Boutique-Villen im Dschungel und am Fluss in Ubud und im Tal des Ayung-Flusses",
      "Naturintegrierte private Retreat-Anlagen im Sidemen-Tal",
      "Öko-Lodges und Talgästehäuser an verborgenen Flussschauplätzen in Zentral-Bali",
      "Abgelegene Naturretreat-Unterkünfte in Nord- und West-Bali",
    ],
    dining_experiences: [
      "Dinner-Erlebnisse mit privatem Koch in Fluss- und Talatmosphäre",
      "Farm-to-Table- und lokal bezogene balinesische Küche",
      "Intime Dinner-Schauplätze bei Kerzenschein auf dem Talboden und am Dschungelrand",
      "Naturimmersives und sinnliches Catering am fließenden Wasser",
    ],
    unique_features: [
      "Zeremonie am fließenden Wasser in einem von Balis intimsten Naturschauplätzen",
      "Ein zutiefst sinnliches Beisammensein, geprägt von Klang, Bewegung und Textur des Flusses",
      "Eine Hochzeit, die ruhig, immersiv und zutiefst mit der Natur verbunden wirkt",
      "Zugang zu Balis schönsten und atmosphärischsten Flusstälern",
      "Eine Feier, geprägt von Fluss, Intimität und stiller emotionaler Tiefe",
    ],
  },
  "garden-weddings": {
    name: "Gartenhochzeiten",
    type: "Eleganz im Freien & mühelose Balance",
    description:
      "Offene Rasenflächen, kuratiertes Grün und eine strukturierte und zugleich natürlich entspannte Außenumgebung – ideal für frische, elegante und vielseitige Destination Weddings, geprägt von Raum, Licht und müheloser Raffinesse.",
    long_description:
      "Gartenhochzeiten auf Bali bieten ein wunderschön ausgewogenes Erlebnis – wo die Natur präsent wirkt und der Rahmen dennoch strukturiert, komfortabel und erlesen bleibt. Umgeben von Grün, offenen Rasenflächen und kuratierten Landschaften schaffen diese Umgebungen einen Rahmen, der frisch, luftig und natürlich elegant wirkt. Bei Linda Wiryani Design and Event Planning gestalten wir Gartenhochzeiten, die diese Harmonie aufgreifen – und Feiern schaffen, die entspannt, bewusst und visuell stimmig wirken. Unser Ansatz ist es, sowohl mit Natur als auch mit Raum zu arbeiten – und Grün, Licht und Layout eine Hochzeit prägen zu lassen, die mühelos und gehoben wirkt.",
    atmosphere:
      "Offen und doch intim – frisch, luftig und einladend, strukturiert und doch entspannt, elegant mit zurückhaltendem Charme, wo offene Rasenflächen im Wechsel mit natürlichem Grün, weiches gleichmäßiges Licht im Tagesverlauf und ein Rahmen, der natürlich und komfortabel zugleich wirkt, ein Hochzeitserlebnis schaffen, das zugänglich und erlesen ist",
    accessibility_notes:
      "Große offene Flächen erfordern sorgfältige Raumplanung für Gästefluss, Zeremonielayout und Empfangsübergänge; Schatten, Bestuhlung und Bodenbeläge müssen für den Gästekomfort im Freien durchdacht angeordnet werden; technische Elemente wie Beleuchtung, Ton und Catering-Infrastruktur müssen reibungslos integriert werden; Wetterausweichplanung ist für Außenschauplätze unerlässlich",
    seasonal_considerations:
      "Offene Gartenumgebungen erfordern flexible Planung für Sonneneinstrahlung und möglichen Regen; die natürlichen Lichtübergänge im Tagesverlauf sollten sowohl für das Timing von Zeremonie als auch Empfang bedacht werden; Morgen und später Nachmittag bieten das schönste und gleichmäßigste Licht für Fotografie und Atmosphäre",
    highlights: [
      "Botanischer Garten von Bedugul mit kühlem Grün des Hochlands und weiten offenen Rasenflächen",
      "Üppige Gartenumgebungen in Ubud und Zentral-Bali, in Dschungellandschaften integriert",
      "Exklusive Gartenanlagen privater Villen, die Privatsphäre mit natürlicher Schönheit verbinden",
      "Gartenlocations an der Küste, die eine Balance zwischen Grün und Meeresatmosphäre bieten",
      "Outdoor-Locations in Boutique-Resorts mit kuratierten Landschaften und Gastfreundschaftsinfrastruktur",
    ],
    best_for: [
      "Paare, die eine natürliche und zugleich strukturierte Feierumgebung im Freien suchen",
      "Ein vielseitiger Rahmen, geeignet für Zeremonie und fließenden Empfang",
      "Frische, luftige und elegant entspannte Hochzeitserlebnisse im Freien",
      "Editorial- und designorientierte Feiern in wunderschön kuratierten Gartenräumen",
      "Eine Hochzeit, die natürlich, zeitlos und mühelos erlesen wirkt",
    ],
    ceremony_options: [
      "Zeremonien auf offenen Rasenflächen, umgeben von kuratiertem Gartengrün",
      "Zeremonieschauplätze im botanischen Garten und in offener Landschaft im Hochland von Bedugul",
      "Zeremonieumgebungen im Garten und auf Poolterrassen von Privatvillen",
      "Zeremonie- und Empfangsflächen im Freien in Boutique-Resorts",
      "Intime Elopements in umschlossener und wunderschön gestalteter Gartenumgebung",
    ],
    reception_options: [
      "Dinner-Empfänge auf offenen Gartenrasenflächen, umgeben von natürlichem Grün",
      "Nahtlose Übergänge zwischen Innen- und Außenlocation von der Zeremonie zum Empfang",
      "Zusammenkünfte im botanischen Garten und Feiern im Freien im Hochland",
      "Editorial- und designorientierte Gartenempfänge mit erlesenem Styling",
      "Feiererlebnisse in Villen und Resortgärten mit mehreren Räumen",
    ],
    accommodation_nearby: [
      "Boutique-Resortanlagen mit angelegten Gartenflächen",
      "Private Villenanwesen mit kuratierten Garten- und Rasenflächen",
      "Retreats im Hochland und Öko-Lodges in der Nähe des Bali Botanical Garden von Bedugul",
      "Naturintegrierte Villenunterkünfte in Ubud und Zentral-Bali",
    ],
    dining_experiences: [
      "Dinner-Erlebnisse im Garten und auf offenen Rasenflächen mit privatem Koch",
      "Farm-to-Table- und Bio-Gartenküche mit frischen lokalen Produkten",
      "Boutique-Resort-Catering in strukturierten Außenumgebungen",
      "Dinner im Garten bei Sonnenuntergang und am Abend mit Stimmungslicht und natürlicher Umgebung",
    ],
    unique_features: [
      "Zeremonie, umgeben von kuratiertem Grün in einem von Balis vielseitigsten Naturschauplätzen",
      "Ein ausgewogenes und elegant erlesenes Beisammensein, geprägt von offenem Raum und natürlicher Schönheit",
      "Eine Hochzeit, die frisch, zeitlos und mühelos mit der Natur verbunden wirkt",
      "Zugang zu Balis vielfältigsten und wunderschön kuratierten Hochzeitsumgebungen im Garten",
      "Eine Feier, geprägt von Offenheit, Balance und natürlich eleganter Schlichtheit",
    ],
  },
  "chapel-weddings": {
    name: "Kapellenhochzeiten",
    type: "Architektonische Eleganz & intime Atmosphäre",
    description:
      "Klar definierte Architektur, kontrolliertes Licht und symmetrische Eleganz – ideal für erlesene und zeitlose Destination-Wedding-Zeremonien, geprägt von Struktur, Klarheit und intimem Fokus.",
    long_description:
      "Kapellenhochzeiten auf Bali bieten einen erlesenen und strukturierten Rahmen – wo Architektur, Licht und Symmetrie zusammenkommen und eine Zeremonie schaffen, die intim und zeitlos zugleich wirkt. Geprägt von klaren Linien, kontrollierten Umgebungen und sorgfältig gerahmten Ausblicken bieten Kapellen einen Raum, in dem jedes Detail bewusst und wunderschön komponiert wirkt. Bei Linda Wiryani Design and Event Planning gestalten wir Kapellenhochzeiten, die dieses Gefühl von Klarheit aufgreifen – und Feiern schaffen, die elegant, bedeutungsvoll und nahtlos orchestriert wirken. Unser Ansatz ist es, mit Architektur und Atmosphäre zu arbeiten – und Licht, Raum und Proportion eine Hochzeit prägen zu lassen, die ruhig, gehoben und erlesen wirkt.",
    atmosphere:
      "Elegant und komponiert – intim, fokussiert und architektonisch erlesen, wo klare Linien und kontrolliertes Licht die Aufmerksamkeit auf das Paar und die Zeremonie selbst lenken und einen Rahmen schaffen, der zeitlos, ruhig und zutiefst bedeutungsvoll wirkt",
    accessibility_notes:
      "Kapellen befinden sich an unterschiedlichen Orten auf Bali, von in Resorts integrierten Schauplätzen bis zu freistehenden architektonischen Räumen; Gästekapazität und Bestuhlung sind durch die Kapellenstruktur vorgegeben und müssen entsprechend geplant werden; jede Kapelle kann besondere Richtlinien und Vorschriften haben, die eingehalten werden müssen",
    seasonal_considerations:
      "Kontrollierte Innenumgebungen bieten wetterunabhängige Verlässlichkeit; natürliches und künstliches Licht müssen für das Timing der Zeremonie sorgfältig aufeinander abgestimmt werden; Kapellen im Innenbereich bieten unabhängig von Jahreszeit oder Wetter eine gleichbleibende Atmosphäre",
    highlights: [
      "Klar definierte architektonische Räume mit klaren Linien und visueller Symmetrie",
      "Kontrollierte Umgebung, die bei jedem Wetter Komfort und Beständigkeit bietet",
      "Intime und fokussierte Zeremonieatmosphäre",
      "Kapellen auf ganz Bali mit Meerblick und von der Landschaft gerahmt",
      "Nahtlose Integration mit nahegelegenen Empfangsbereichen und Resort-Locations",
    ],
    best_for: [
      "Paare, die eine strukturierte und elegant komponierte Zeremonieumgebung suchen",
      "Ein erlesener und zeitloser Rahmen, geschützt vor Witterungsbedingungen im Freien",
      "Zeremonien, bei denen Architektur und Licht das emotionale Erlebnis prägen",
      "Intime Zusammenkünfte in förmlicher und fokussierter Atmosphäre",
      "Eine Hochzeit, die klassisch, elegant und wunderschön orchestriert wirkt",
    ],
    ceremony_options: [
      "Intime Kapellenzeremonien in Resorts und privaten Anwesen",
      "Kapellenzeremonien mit Meerblick und von der Landschaft gerahmter Umgebung",
      "Destination-Kapellenzeremonien mit vollständiger Planung und Designintegration",
      "Intime Elopements in der Kapelle mit ruhiger und fokussierter Atmosphäre",
      "Kapellenzeremonien in Luxusresorts mit nahtlosen Übergängen zum Empfang",
    ],
    reception_options: [
      "Nahtlose Übergänge von der Kapelle zum Empfang in Resortumgebungen",
      "Intime Empfänge im Innenbereich nach strukturierten Kapellenzeremonien",
      "Empfänge in Garten und auf Terrasse, verbunden mit den Zeremonieräumen der Kapelle",
      "Feiern in Resorts mit mehreren Räumen, die von der Kapelle zum Dinner unter freiem Himmel fließen",
      "Abendempfänge bei Kerzenschein und elegant gestylt",
    ],
    accommodation_nearby: [
      "Luxusresort-Anlagen mit integrierten Kapellen- und Empfangs-Locations",
      "Boutique-Hotels und Privatvillen in der Nähe von Kapellen",
      "Unterkünfte im Hochland und am See mit nahegelegenen architektonischen Locations",
      "Full-Service-Resortanlagen mit umfassenden Gästeeinrichtungen",
    ],
    dining_experiences: [
      "Gehobene Resortgastronomie und Gourmet-Catering in eleganter Umgebung",
      "Privatkoch und maßgeschneiderte mehrgängige Dinner-Erlebnisse",
      "Intime Empfänge bei Kerzenschein mit erlesenem Styling und Ambiente",
      "Cocktails bei Sonnenuntergang und Abendempfänge im Anschluss an Kapellenzeremonien",
    ],
    unique_features: [
      "Eine Zeremonie, gerahmt von Architektur, Licht und wunderschön komponierter Symmetrie",
      "Eine kontrollierte und intime Umgebung, ganz auf das Paar ausgerichtet",
      "Wetterunabhängige Verlässlichkeit in elegantem und erlesenem Rahmen",
      "Ein Hochzeitserlebnis, das zeitlos, komponiert und zutiefst bedeutungsvoll wirkt",
      "Zugang zu Balis erlesensten architektonischen Zeremonieräumen",
    ],
  },
};

export const content: DestinationContent = {
  categoryNames,
  locationNames,
  destinationText,
};
