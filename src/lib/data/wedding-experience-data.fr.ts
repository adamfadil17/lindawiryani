// Terjemahan fr — bentuk data harus sama persis dengan wedding-experience-data.en.ts
// ─── EXPERIENCE LIST ──────────────────────────────────────────────────────────

import { WeddingExperience } from "@/types";

export const weddingExperienceList: WeddingExperience[] = [
  // ─── Private Villa Weddings ──────────────────────────────────────────────

  {
    id: "1",
    slug: "private-villa-weddings",
    category: "private_villa_weddings",
    name: "Mariages en Villa Privée",

    // Hero
    hero_style: "split",
    hero_image: "/images/venues/banner/private-bg.png",
    hero_desc:
      "Intimité, liberté de conception et atmosphère personnelle plutôt que commerciale — où votre mariage devient une expérience qui ne pourrait être qu'à vous.",

    // Intro
    intro_label: "Pourquoi une villa",
    intro_heading: ["Pourquoi choisir", "un mariage en villa privée à Bali"],
    intro_body:
      "Chez Linda Wiryani Design and Event Planning, nous sommes spécialisés dans les mariages en villa privée à Bali, en concevant des célébrations intimes, architecturales et émotionnellement immersives. Qu'elles dominent l'océan, soient nichées dans la jungle ou cachées au cœur d'un domaine paisible, les villas privées permettent au mariage de se déployer comme une expérience à plusieurs niveaux — et non comme une cérémonie d'une heure.",
    intro_list_label: "Les villas privées offrent :",
    intro_list: [
      "Une liberté créative totale",
      "Des aménagements flexibles pour la cérémonie et la réception",
      "La possibilité de célébrer sur plusieurs jours",
      "Une intimité totale pour vos invités",
      "Une atmosphère chaleureuse, comme à la maison",
    ],
    intro_footnote:
      "C'est ce qui rend les mariages en villa idéaux pour les couples qui souhaitent une célébration à l'image d'une réunion privée plutôt que d'une production mise en scène.",
    intro_images: ["", ""],

    // Approach
    approach_label: "Notre approche",
    approach_heading: [
      "Une planification de mariage en villa",
      "guidée par le design",
    ],
    approach_body:
      "Concevoir un mariage en villa demande bien plus que de la décoration. Il faut comprendre l'architecture et l'espace dans leur ensemble. Nous étudions chaque villa comme une toile vierge et construisons un concept de design qui s'intègre naturellement à son environnement.",
    approach_list_label: "Il faut comprendre :",
    approach_list: [
      "L'architecture et la circulation des espaces",
      "La lumière naturelle et ses transitions",
      "Les déplacements et le confort des invités",
      "La planification acoustique et technique",
      "Le rythme émotionnel de la journée",
    ],
    approach_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767280276/Wedding_15_ofe4kx.jpg",

    // Services
    services_label: "Ce que nous offrons",
    services_heading: ["Nos services de mariage", "en villa privée"],
    services_list: [
      "Recommandations de villas soigneusement sélectionnées",
      "Analyse du site et conception de l'aménagement",
      "Développement complet du concept de mariage",
      "Sélection et coordination des prestataires",
      "Planification de la production et de la logistique",
      "Stylisme, décoration florale et design de l'espace",
      "Exécution et gestion du jour J",
    ],
    services_footnote:
      "Chaque élément est pensé pour être cohérent, jamais surchargé.",
    services_dark_label: "Le déroulé de la journée",
    services_dark_heading: ["De la cérémonie", "à la célébration"],
    services_dark_body:
      "Les mariages en villa privée permettent souvent une célébration riche en moments variés. Nous concevons l'ensemble du rythme émotionnel afin que votre mariage se déroule tout naturellement.",
    services_dark_list: [
      "Rassemblements d'accueil",
      "Cocktails au bord de la piscine",
      "Cérémonies au coucher du soleil",
      "Dîners à la grande table",
      "Expériences d'after-party",
    ],

    // Closing
    closing_label: "Pour vous",
    closing_heading: ["Un mariage en villa privée", "qui a des airs de maison"],
    closing_body:
      "Votre mariage en villa doit être chaleureux, intentionnel et profondément personnel. Chaque mariage en villa est conçu sur mesure, jamais en formule toute faite. Si vous préparez un mariage en villa privée à Bali et souhaitez une équipe guidée par le design, qui comprend l'espace, l'émotion et l'exécution, ce sera un honneur de vous accompagner.",
    closing_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767280288/Wedding_5_rt7stj.jpg",
    closing_couple_label: "Conçu pour les couples en quête de :",
    closing_couple_values: [
      "Retrait et intimité",
      "Une esthétique raffinée",
      "La beauté architecturale",
      "Un accompagnement serein",
      "Des expériences d'invités haut de gamme",
    ],

    // Relations
    faqs: [
      {
        id: "faq-pvw-1",
        experience_id: "1",
        question: "Pourquoi choisir un mariage en villa privée à Bali ?",
        answer:
          "Les mariages en villa privée offrent intimité, liberté créative, aménagements flexibles et atmosphère plus personnelle. Ils permettent aux couples de composer des expériences en plusieurs temps : dîners de bienvenue, réunions au bord de la piscine, cérémonies au coucher du soleil et réceptions intimes.",
        sort_order: 0,
      },
      {
        id: "faq-pvw-2",
        experience_id: "1",
        question: "Les villas privées conviennent-elles aux mariages de luxe ?",
        answer:
          "Oui. De nombreuses villas privées à Bali sont conçues selon les standards de l'hospitalité de luxe et conviennent parfaitement aux mariages haut de gamme. Grâce à un design, une production et une planification adaptés, elles peuvent accueillir des célébrations raffinées et élevées.",
        sort_order: 1,
      },
      {
        id: "faq-pvw-3",
        experience_id: "1",
        question:
          "Combien d'invités peuvent assister à un mariage en villa à Bali ?",
        answer:
          "La capacité d'accueil dépend de la villa. Certaines conviennent parfaitement aux mariages intimes de 10 à 30 invités, tandis que les domaines plus vastes peuvent accueillir de 50 à 150 invités. Nous évaluons chaque propriété selon le confort, la fluidité et la faisabilité de la production.",
        sort_order: 2,
      },
      {
        id: "faq-pvw-4",
        experience_id: "1",
        question:
          "Les mariages en villa nécessitent-ils des autorisations spéciales ?",
        answer:
          "Selon le lieu et l'ampleur de l'événement, certains mariages en villa nécessitent des autorisations locales, l'accord du banjar ou des permis d'événement. En tant que wedding planner, nous vous guidons à travers toutes les exigences réglementaires et logistiques.",
        sort_order: 3,
      },
      {
        id: "faq-pvw-5",
        experience_id: "1",
        question:
          "Proposez-vous une planification et un design complets pour les mariages en villa ?",
        answer:
          "Oui. Notre service de mariage en villa privée comprend la recherche du lieu, la conception créative complète, la gestion des prestataires, la planification de la production et la coordination intégrale le jour J.",
        sort_order: 4,
      },
    ],
  },

  // ─── Intimate Weddings ───────────────────────────────────────────────────

  {
    id: "2",
    slug: "intimate-weddings",
    category: "intimate_weddings",
    name: "Mariages Intimes",

    // Hero
    hero_style: "bottom",
    hero_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878596/BAL_1453_e7hd8w.jpg",
    hero_desc:
      "Un mariage intime laisse place à la connexion, à la présence et à la beauté, sans excès. Conçu pour les couples qui privilégient la qualité à la quantité — et l'atmosphère au spectacle.",

    // Intro
    intro_label: "Pourquoi l'intime",
    intro_heading: ["Pourquoi choisir", "un mariage intime à Bali"],
    intro_body:
      "Chez Linda Wiryani Design and Event Planning, nous sommes spécialisés dans les mariages intimes à Bali, en créant des célébrations chaleureuses, intentionnelles et profondément personnelles. Ces mariages sont conçus pour les couples qui privilégient la qualité à la quantité et l'atmosphère au spectacle.",
    intro_list_label: null,
    intro_list: [
      "Une connexion plus profonde avec les invités",
      "Une plus grande flexibilité de design",
      "Des cérémonies plus significatives",
      "Une meilleure qualité d'expérience pour les invités",
      "Un déroulement naturel et détendu",
    ],
    intro_footnote:
      "La diversité des environnements de Bali permet aux mariages intimes d'être à la fois cinématographiques et authentiques.",
    intro_images: ["", ""],

    // Approach
    approach_label: "Notre façon de concevoir",
    approach_heading: ["Notre philosophie", "du mariage intime"],
    approach_body:
      "Nous concevons les mariages intimes autour du rythme émotionnel et de l'harmonie des espaces. Chaque détail est choisi pour soutenir l'émotion d'ensemble — sans jamais l'écraser.",
    approach_list_label: "Nous concevons autour de :",
    approach_list: [
      "Le rythme émotionnel",
      "L'harmonie des espaces",
      "Une expérience d'invités attentionnée",
      "Un langage esthétique raffiné",
      "Une exécution sereine",
    ],
    approach_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878580/BAL_1451_dhfxcj.jpg",

    // Services
    services_label: "Ce que nous offrons",
    services_heading: ["Nos services de", "mariage intime"],
    services_list: [
      "Recherche de lieux et de villas",
      "Développement du design du mariage",
      "Direction du stylisme et de la décoration florale",
      "Sélection des prestataires",
      "Gestion du budget et du calendrier",
      "Coordination du jour J",
    ],
    services_footnote:
      "Notre rôle est de concevoir la structure afin que vous puissiez lâcher prise et rester pleinement présents.",
    services_dark_label: "L'expérience",
    services_dark_heading: ["Conçu pour", "la présence"],
    services_dark_body:
      "Un mariage intime vous permet de vivre pleinement votre célébration. Avec un rassemblement plus restreint, chaque instant devient vivant — la cérémonie, le dîner, les liens discrets entre les proches.",
    services_dark_list: [
      "Une atmosphère profondément personnelle",
      "Chaque invité pleinement présent",
      "Une cérémonie sans précipitation, riche en émotion",
      "Une expérience gastronomique raffinée",
      "Un espace pour de vraies connexions",
    ],

    // Closing
    closing_label: "Un mariage intime à votre image",
    closing_heading: [
      "La qualité plutôt que la quantité.",
      "L'atmosphère plutôt que le spectacle.",
    ],
    closing_body:
      "Si vous préparez un mariage intime à Bali et souhaitez une équipe guidée par le design et l'hospitalité, ce sera un honneur de vous accompagner.",
    closing_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878569/BAL_1210_gktw4p.jpg",
    closing_couple_label: null,
    closing_couple_values: [],

    // Relations
    faqs: [
      {
        id: "faq-iw-1",
        experience_id: "2",
        question: "Qu'est-ce qu'un mariage intime ?",
        answer:
          "Un mariage intime réunit généralement de 10 à 50 invités, ce qui favorise des liens plus profonds, un design flexible et une atmosphère plus détendue, centrée sur les moments qui comptent.",
        sort_order: 0,
      },
      {
        id: "faq-iw-2",
        experience_id: "2",
        question: "Pourquoi choisir un mariage intime à Bali ?",
        answer:
          "Les paysages, les lieux privés et la beauté naturelle de Bali en font un cadre idéal pour les mariages intimes. Un nombre d'invités réduit permet aux couples de profiter pleinement du lieu, de la cérémonie et de la fête.",
        sort_order: 1,
      },
      {
        id: "faq-iw-3",
        experience_id: "2",
        question: "Les mariages intimes sont-ils moins chers ?",
        answer:
          "Pas forcément. Les mariages intimes privilégient souvent la qualité plutôt que l'ampleur. De nombreux couples investissent dans des lieux haut de gamme, un design raffiné, une cuisine exceptionnelle et l'expérience des invités.",
        sort_order: 2,
      },
      {
        id: "faq-iw-4",
        experience_id: "2",
        question:
          "Proposez-vous une planification complète pour les mariages intimes ?",
        answer:
          "Oui. Nous assurons la planification créative et logistique complète des mariages intimes, y compris le choix du lieu, le développement du design, la coordination des prestataires et la gestion du jour J.",
        sort_order: 3,
      },
      {
        id: "faq-iw-5",
        experience_id: "2",
        question: "Un mariage intime peut-il rester luxueux ?",
        answer:
          "Oui. Le luxe n'est pas une question de taille — il tient au soin, au design et à l'exécution. Les mariages intimes permettent souvent un niveau de détail et de personnalisation plus élevé.",
        sort_order: 4,
      },
    ],
  },

  // ─── Elopement Weddings ──────────────────────────────────────────────────

  {
    id: "3",
    slug: "elopement-weddings",
    category: "elopement_weddings",
    name: "Mariages en Elopement",

    // Hero
    hero_style: "centered",
    hero_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939447/Lake_Elopement_hbxm9l.png",
    hero_desc:
      "Les mariages en elopement à Bali — intimes, riches en émotion et d'une poésie visuelle — sont conçus comme des expériences porteuses de sens, et non comme des cérémonies expédiées.",

    // Intro
    intro_label: "Le cadre",
    intro_heading: ["Pourquoi les couples", "choisissent l'elopement à Bali"],
    intro_body:
      "Que ce soit sur une plage secrète, dans une clairière de jungle, dans une villa privée ou au sommet d'une falaise spectaculaire, nos elopements sont conçus comme des expériences porteuses de sens, et non comme des cérémonies expédiées. Ici, un elopement ressemble moins à un événement qu'à un moment sacré.",
    intro_list_label: "Bali offre le cadre parfait :",
    intro_list: [
      "Une beauté naturelle",
      "Une atmosphère spirituelle",
      "Intimité et retrait",
      "Des cadres de cérémonie symboliques",
      "Des paysages romantiques et cinématographiques",
    ],
    intro_footnote: null,
    intro_images: ["", ""],

    // Approach
    approach_label: "Notre philosophie",
    approach_heading: ["Une expérience d'elopement", "guidée par le design"],
    approach_body:
      "Chaque élément est choisi pour servir la présence et le sens. Que vous soyez à deux ou entourés d'un petit cercle de proches, nous créons l'espace nécessaire pour que votre moment se déploie naturellement.",
    approach_list_label: "Notre planification d'elopement met l'accent sur :",
    approach_list: [
      "Une narration émotionnelle",
      "Une intégration naturelle au paysage",
      "Un stylisme simple mais raffiné",
      "Un déroulement calme, sans précipitation",
      "Une connexion authentique",
    ],
    approach_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939447/Volcano_mount_batur_y3gtwu.png",

    // Services
    services_label: "Ce que nous proposons",
    services_heading: ["Nos services d'elopement", "à Bali"],
    services_list: [
      "Recherche de lieux et démarches d'autorisation",
      "Design et concept de la cérémonie",
      "Direction du stylisme et de la décoration florale",
      "Coordination des prestataires",
      "Planification du calendrier et de la logistique",
      "Coordination sur place",
    ],
    services_footnote:
      "Pour les couples en quête de profondeur, pas d'apparat.",
    services_dark_label: "Nos valeurs",
    services_dark_heading: ["L'émotion avant", "la production"],
    services_dark_body:
      "Nous concevons des elopements pour les couples qui aiment la simplicité pleine de sens. Chaque détail est réfléchi, rien n'est excessif.",
    services_dark_list: [
      "L'émotion avant la production",
      "La simplicité porteuse de sens",
      "Un design empreint de sensibilité",
      "Un luxe discret",
      "Des cérémonies personnalisées",
    ],

    // Closing
    closing_label: "Un elopement empreint de sacré",
    closing_heading: ["Intemporel. Ancré.", "Émotionnellement vrai."],
    closing_body:
      "Si vous cherchez un wedding planner d'elopement à Bali qui considère chaque elopement comme une expérience artistique, ce sera un honneur de créer avec vous.",
    closing_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939441/Waterfall_Wedding_1_kk2634.png",
    closing_couple_label: null,
    closing_couple_values: [],

    // Relations
    faqs: [
      {
        id: "faq-ew-1",
        experience_id: "3",
        question: "Qu'est-ce qu'un mariage en elopement à Bali ?",
        answer:
          "Un mariage en elopement à Bali est une cérémonie intime centrée sur le couple, souvent sans invités ou avec un tout petit cercle de proches. Il privilégie l'émotion, la simplicité et une expérience porteuse de sens plutôt qu'une grande production.",
        sort_order: 0,
      },
      {
        id: "faq-ew-2",
        experience_id: "3",
        question: "Où pouvons-nous nous marier en elopement à Bali ?",
        answer:
          "Parmi les lieux d'elopement les plus prisés : villas privées, plages secrètes, clairières de jungle, cascades, sites en bord de falaise et resorts de charme. Nous vous aidons à sélectionner les lieux selon l'intimité, l'atmosphère et le confort.",
        sort_order: 1,
      },
      {
        id: "faq-ew-3",
        experience_id: "3",
        question:
          "Les mariages en elopement sont-ils légalement reconnus à Bali ?",
        answer:
          "Les exigences légales varient selon la nationalité et la situation personnelle. Nous guidons les couples sur les cérémonies symboliques, les démarches juridiques et les options recommandées.",
        sort_order: 2,
      },
      {
        id: "faq-ew-4",
        experience_id: "3",
        question:
          "Un elopement peut-il aussi être magnifiquement mis en scène ?",
        answer:
          "Absolument. Nos elopements sont guidés par le design et soigneusement composés, avec un stylisme raffiné, un déroulé de cérémonie porteur de sens et une harmonie visuelle avec la nature.",
        sort_order: 3,
      },
      {
        id: "faq-ew-5",
        experience_id: "3",
        question: "Organisez-vous des elopements rien que pour le couple ?",
        answer:
          "Oui. Nous concevons des elopements aussi bien pour deux personnes que pour un très petit nombre d'invités. Chaque expérience est réalisée sur mesure.",
        sort_order: 4,
      },
    ],
  },

  // ─── Luxury Weddings ─────────────────────────────────────────────────────

  {
    id: "4",
    slug: "luxury-weddings",
    category: "luxury_weddings",
    name: "Mariages de Luxe",

    // Hero
    hero_style: "editorial",
    hero_image: "/images/venues/banner/signature-bg.png",
    hero_desc:
      "Des mariages de luxe à Bali façonnés par l'architecture, l'atmosphère et la narration — et non par les tendances.",

    // Intro
    intro_label: "Notre définition",
    intro_heading: ["Ce qui définit le luxe", "chez Linda Wiryani"],
    intro_body:
      "Chez Linda Wiryani Design and Event Planning, nous concevons à Bali des mariages de luxe empreints d'élévation, de calme et de richesse émotionnelle. Nos mariages sont façonnés par l'architecture, l'atmosphère et la narration — et non par les tendances.",
    intro_list_label: null,
    intro_list: [
      "Direction artistique",
      "Profondeur émotionnelle",
      "Beauté des espaces",
      "Exécution sans faille",
      "Un service discret et attentionné",
    ],
    intro_footnote: "Le vrai luxe, c'est quand tout se déroule avec fluidité.",
    intro_images: ["", ""],

    // Approach
    approach_label: "Notre façon de travailler",
    approach_heading: ["Notre approche du design", "de mariage de luxe"],
    approach_body:
      "Chaque mariage de luxe commence par une démarche — jamais par un modèle. C'est ce qui garantit que chaque célébration soit cohérente et intentionnelle, de la première conversation aux derniers adieux.",
    approach_list_label: "Chaque mariage de luxe commence par :",
    approach_list: [
      "Vision et cartographie émotionnelle",
      "Étude du lieu et de l'environnement",
      "Élaboration du récit de design",
      "Planification de l'expérience des invités",
      "Précision technique et de production",
    ],
    approach_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1768288826/Amankila_-_Manggis_-_Bali_-_Indonesia_-_Private_Event_04_plvo4w.jpg",

    // Services
    services_label: "Ce que nous offrons",
    services_heading: ["Nos services de", "mariage de luxe"],
    services_list: [
      "Direction créative et design",
      "Sélection des lieux et des prestataires",
      "Gestion du budget et de la production",
      "Planification d'événements sur plusieurs jours",
      "Stylisme, décoration florale et design de l'espace",
      "Orchestration du jour J",
    ],
    services_footnote:
      "Nous acceptons volontairement un nombre limité de mariages de luxe chaque année afin de garantir une implication créative totale.",
    services_dark_label: "Pour vous",
    services_dark_heading: ["Pour les couples qui", "valorisent l'art"],
    services_dark_body:
      "Notre studio est choisi par les couples en quête d'intelligence esthétique, de narration émotionnelle et d'une exécution de classe mondiale.",
    services_dark_list: [
      "Intelligence esthétique",
      "Un professionnalisme serein",
      "Une narration émotionnelle",
      "La beauté architecturale",
      "Une expérience d'invités de classe mondiale",
    ],

    // Closing
    closing_label: "Un mariage de luxe intemporel",
    closing_heading: [
      "Le luxe ne doit jamais être bruyant.",
      "Il doit être réfléchi.",
    ],
    closing_body:
      "Si vous recherchez un wedding planner de luxe à Bali, ce sera un honneur de concevoir pour vous une célébration porteuse de sens, raffinée et inoubliable.",
    closing_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1768288832/Amankila_-_Manggis_-_Bali_-_Indonesia_-_Private_Event_06_rzqgiu.jpg",
    closing_couple_label: null,
    closing_couple_values: [],

    // Relations
    faqs: [
      {
        id: "faq-lw-1",
        experience_id: "4",
        question: "Qu'est-ce qui définit un mariage de luxe à Bali ?",
        answer:
          "Un mariage de luxe se définit par un design réfléchi, une esthétique raffinée, une exécution sans faille, une narration émotionnelle et une expérience d'invités exceptionnelle — et pas seulement par le budget ou l'ampleur.",
        sort_order: 0,
      },
      {
        id: "faq-lw-2",
        experience_id: "4",
        question: "Organisez-vous des mariages de luxe sur plusieurs jours ?",
        answer:
          "Oui. Nous concevons et gérons des expériences de mariage sur plusieurs jours, y compris les événements de bienvenue, les réunions de répétition, les journées de cérémonie et les célébrations d'adieu.",
        sort_order: 1,
      },
      {
        id: "faq-lw-3",
        experience_id: "4",
        question: "Combien coûte un mariage de luxe à Bali ?",
        answer:
          "Les budgets varient considérablement selon le nombre d'invités, les lieux, l'ampleur du design et la complexité de la production. À Bali, les mariages de luxe commencent généralement là où un design, une planification et une production professionnels complets sont nécessaires.",
        sort_order: 2,
      },
      {
        id: "faq-lw-4",
        experience_id: "4",
        question: "Combien de mariages acceptez-vous chaque année ?",
        answer:
          "Nous limitons volontairement le nombre de mariages de luxe que nous acceptons afin de garantir une concentration créative totale, une implication personnelle et une exécution d'excellence.",
        sort_order: 3,
      },
      {
        id: "faq-lw-5",
        experience_id: "4",
        question:
          "Travaillez-vous avec des lieux et des prestataires haut de gamme ?",
        answer:
          "Oui. Nous collaborons avec des lieux de luxe, des artisans et des professionnels du mariage de confiance à travers Bali, qui répondent à nos standards de qualité, de fiabilité et de raffinement.",
        sort_order: 4,
      },
    ],
  },
];

export const whyBali = [
  "Falaises océanes spectaculaires",
  "Villas de luxe privées",
  "Cadres de jungle et de bord de rivière",
  "Plages de sable blanc",
  "Resorts de charme et domaines secrets",
];

export const fullServiceIncludes = [
  "Recherche et évaluation des lieux",
  "Direction créative et développement du design",
  "Sélection et gestion des prestataires",
  "Planification budgétaire et maîtrise des coûts",
  "Calendriers et plannings de production",
  "Planification de l'expérience des invités",
  "Orchestration de la cérémonie et de la réception",
  "Coordination et exécution le jour J",
];

export const hospitalityValues = [
  "Clarté",
  "Précision",
  "Confort des invités",
  "Fluidité émotionnelle",
  "Exécution sans faille",
];

export const coupleValues = [
  "Narration artistique",
  "Une planification sereine et professionnelle",
  "Une esthétique raffinée",
  "Une atmosphère émotionnelle",
  "Une expérience d'invités attentionnée",
];

export const designFoundation = [
  "Comprendre votre histoire",
  "Définir l'atmosphère émotionnelle",
  "Étudier votre lieu et son environnement",
  "Concevoir le déroulé de toute la célébration",
];

// Sub-experience cards
export const subExperiences = [
  {
    title: "Mariages en Villa Privée",
    subtitle: "à Bali",
    tag: "Villa privée",
    desc: "Intimité, liberté de conception et atmosphère personnelle plutôt que commerciale. Célébrer dans des espaces qui deviennent entièrement les vôtres.",
    href: "/wedding-experiences/private-villa-weddings",
    image: "/images/venues/banner/private-bg.png",
  },
  {
    title: "Mariages Intimes",
    subtitle: "à Bali",
    tag: "Intime",
    desc: "Un espace pour la connexion, la présence et la beauté, sans excès. Conçu pour les couples qui privilégient la qualité à la quantité.",
    href: "/wedding-experiences/intimate-weddings",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878596/BAL_1453_e7hd8w.jpg",
  },
  {
    title: "Mariages en Elopement",
    subtitle: "à Bali",
    tag: "Elopement",
    desc: "Un elopement n'est pas un mariage en plus petit — c'est un mariage plus profond. Riche en émotion, d'une poésie visuelle, et entièrement à vous.",
    href: "/wedding-experiences/elopement-weddings",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767345590/Wedding_18_nnx6an.png",
  },
  {
    title: "Mariages de Luxe",
    subtitle: "à Bali",
    tag: "Luxe",
    desc: "Le luxe n'est pas une question d'excès — il tient au raffinement, au soin et à l'expérience. Des mariages façonnés par l'architecture, l'atmosphère et la narration.",
    href: "/wedding-experiences/luxury-weddings",
    image: "/images/venues/banner/signature-bg.png",
  },
];

export const faqs = [
  {
    q: "Que fait un wedding planner de destination à Bali ?",
    a: "Un wedding planner de destination à Bali gère à la fois la conception créative et l'ensemble du processus de planification pour les couples qui se marient à Bali. Cela comprend la recherche du lieu, le développement du design, la coordination des prestataires, les conseils budgétaires, la logistique, les calendriers et l'exécution le jour J.",
  },
  {
    q: "Pourquoi faire appel à un wedding planner local à Bali ?",
    a: "Un wedding planner local à Bali possède une connaissance approfondie des lieux, de la réglementation, des considérations culturelles, des prestataires de confiance et des réalités de production sur place — pour une communication plus fluide et une exécution de meilleur niveau qu'une planification à distance.",
  },
  {
    q: "Combien de temps à l'avance faut-il planifier un mariage de destination à Bali ?",
    a: "La plupart des mariages de destination à Bali sont planifiés 9 à 15 mois à l'avance, ce qui laisse le temps de vérifier la disponibilité des lieux, de développer le design, de réserver les prestataires, d'organiser la logistique des invités et d'obtenir les autorisations. Les mariages de luxe et en villa privée gagnent souvent à être préparés encore plus tôt.",
  },
  {
    q: "Travaillez-vous avec des couples internationaux ?",
    a: "Oui. Linda Wiryani Design and Event Planning est spécialisé dans les mariages de destination pour les couples internationaux. Nous accompagnons nos clients tout au long de la planification, avec coordination des fuseaux horaires, consultations en ligne et systèmes de planification détaillés.",
  },
  {
    q: "Pouvez-vous nous aider à choisir le bon lieu de mariage à Bali ?",
    a: "Oui. Nous sélectionnons et recommandons des lieux de mariage selon votre vision, le nombre d'invités, la direction de design et vos objectifs d'expérience — y compris des villas privées, des resorts et des lieux secrets à travers Bali.",
  },
];
