// Terjemahan zh — bentuk data harus sama persis dengan wedding-experience-data.en.ts
// ─── EXPERIENCE LIST ──────────────────────────────────────────────────────────

import { WeddingExperience } from "@/types";

export const weddingExperienceList: WeddingExperience[] = [
  // ─── Private Villa Weddings ──────────────────────────────────────────────

  {
    id: "1",
    slug: "private-villa-weddings",
    category: "private_villa_weddings",
    name: "私人别墅婚礼",

    // Hero
    hero_style: "split",
    hero_image: "/images/venues/banner/private-bg.png",
    hero_desc:
      "私密、设计自由，以及个性化而非商业化的氛围——让您的婚礼成为独一无二、只属于您的体验。",

    // Intro
    intro_label: "为何选择别墅",
    intro_heading: ["为何选择", "巴厘岛私人别墅婚礼"],
    intro_body:
      "在 Linda Wiryani Design and Event Planning，我们专注于巴厘岛私人别墅婚礼，打造亲密、富有建筑美感且情感沉浸的庆典。无论是俯瞰大海、隐于丛林，还是藏身宁静庄园，私人别墅都能让婚礼成为层次丰富的体验，而不只是一场一小时的仪式。",
    intro_list_label: "私人别墅为您提供：",
    intro_list: [
      "充分的创意自由",
      "灵活的仪式与宴会布局",
      "可举办多日庆典的空间",
      "宾客的完全私密",
      "如家一般温暖的情感氛围",
    ],
    intro_footnote:
      "因此，别墅婚礼非常适合希望婚礼如同私人聚会、而非舞台演出的新人。",
    intro_images: ["", ""],

    // Approach
    approach_label: "我们的理念",
    approach_heading: ["以设计为先的", "别墅婚礼策划"],
    approach_body:
      "设计一场别墅婚礼，远不止于装饰，更需要从整体上理解建筑与空间。我们将每一座别墅视为一块空白画布，打造与周围环境自然融合的设计理念。",
    approach_list_label: "这需要理解：",
    approach_list: [
      "建筑与空间动线",
      "自然光线及其变化",
      "宾客的动线与舒适度",
      "音响与技术规划",
      "一整天的情感节奏",
    ],
    approach_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767280276/Wedding_15_ofe4kx.jpg",

    // Services
    services_label: "我们提供的服务",
    services_heading: ["我们的私人别墅", "婚礼服务"],
    services_list: [
      "精心挑选的别墅推荐",
      "场地分析与布局设计",
      "完整的婚礼概念开发",
      "供应商甄选与协调",
      "制作规划与物流安排",
      "造型、花艺与空间设计",
      "婚礼当天的执行与管理",
    ],
    services_footnote: "每一个元素都力求和谐统一，而非拥挤堆砌。",
    services_dark_label: "这一天的展开",
    services_dark_heading: ["从仪式", "到庆典"],
    services_dark_body:
      "私人别墅婚礼往往能容纳由多个动人时刻组成的完整庆典。我们为您设计整体的情感节奏，让婚礼自然流淌。",
    services_dark_list: [
      "欢迎聚会",
      "泳池畔鸡尾酒会",
      "日落仪式",
      "长桌晚宴",
      "after-party 体验",
    ],

    // Closing
    closing_label: "为您而设",
    closing_heading: ["一场私人别墅婚礼", "如家般温暖"],
    closing_body:
      "您的别墅婚礼应当温暖、用心且极具个人色彩。每一场别墅婚礼都是量身定制，绝非套餐。如果您正在筹划巴厘岛私人别墅婚礼，希望找到一支以设计为导向、懂空间、懂情感、懂执行的团队，我们将非常荣幸陪伴您走过这段旅程。",
    closing_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767280288/Wedding_5_rt7stj.jpg",
    closing_couple_label: "专为追求以下特质的新人打造：",
    closing_couple_values: [
      "远离喧嚣的私密感",
      "精致的美学",
      "建筑之美",
      "从容安心的策划支持",
      "高品质的宾客体验",
    ],

    // Relations
    faqs: [
      {
        id: "faq-pvw-1",
        experience_id: "1",
        question: "为什么选择巴厘岛的私人别墅婚礼？",
        answer:
          "私人别墅婚礼带来私密性、创意自由、灵活的布局以及更具个性的氛围。新人可以设计多重时刻的体验，例如欢迎晚宴、泳池畔聚会、日落仪式和温馨的婚宴。",
        sort_order: 0,
      },
      {
        id: "faq-pvw-2",
        experience_id: "1",
        question: "私人别墅适合举办奢华婚礼吗？",
        answer:
          "适合。巴厘岛许多私人别墅按奢华酒店的待客标准打造，非常适合高端婚礼。经过恰当的设计、制作与策划，私人别墅同样能承办精致而高格调的婚礼庆典。",
        sort_order: 1,
      },
      {
        id: "faq-pvw-3",
        experience_id: "1",
        question: "巴厘岛的别墅婚礼可以容纳多少宾客？",
        answer:
          "宾客容量取决于具体的别墅。有些别墅适合 10–30 位宾客的私密婚礼，而较大的庄园可容纳 50–150 位宾客。我们会从舒适度、动线和制作可行性等方面评估每处场地。",
        sort_order: 2,
      },
      {
        id: "faq-pvw-4",
        experience_id: "1",
        question: "别墅婚礼需要特殊许可吗？",
        answer:
          "根据地点和规模，部分别墅婚礼需要当地许可、banjar（村社）批准或活动许可。作为您的婚礼策划师，我们会全程指导您完成所有法规与物流方面的要求。",
        sort_order: 3,
      },
      {
        id: "faq-pvw-5",
        experience_id: "1",
        question: "你们提供别墅婚礼的全程策划与设计吗？",
        answer:
          "提供。我们的私人别墅婚礼服务涵盖场地甄选、完整的创意设计、供应商管理、制作规划以及婚礼当天的全程统筹。",
        sort_order: 4,
      },
    ],
  },

  // ─── Intimate Weddings ───────────────────────────────────────────────────

  {
    id: "2",
    slug: "intimate-weddings",
    category: "intimate_weddings",
    name: "私密婚礼",

    // Hero
    hero_style: "bottom",
    hero_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878596/BAL_1453_e7hd8w.jpg",
    hero_desc:
      "私密婚礼为联结、专注与美好留出空间，不事铺张。专为重质不重量、重氛围不重排场的新人而设计。",

    // Intro
    intro_label: "为何选择私密",
    intro_heading: ["为何选择", "巴厘岛私密婚礼"],
    intro_body:
      "在 Linda Wiryani Design and Event Planning，我们专注于巴厘岛私密婚礼，打造温暖、用心且极具个人色彩的庆典。这类婚礼专为重质不重量、重氛围不重排场的新人而设计。",
    intro_list_label: null,
    intro_list: [
      "与宾客更深的联结",
      "更大的设计自由度",
      "更有意义的仪式",
      "更高品质的宾客体验",
      "自然轻松的节奏",
    ],
    intro_footnote:
      "巴厘岛多样的自然环境，让私密婚礼既有电影般的质感，又不失踏实温暖。",
    intro_images: ["", ""],

    // Approach
    approach_label: "我们的设计方式",
    approach_heading: ["我们的私密婚礼", "设计理念"],
    approach_body:
      "我们围绕情感节奏与空间和谐来设计私密婚礼。每一个细节的选择，都是为了烘托整体的感受，而不是喧宾夺主。",
    approach_list_label: "我们的设计围绕：",
    approach_list: [
      "情感节奏",
      "空间和谐",
      "体贴周到的宾客体验",
      "精致的美学语言",
      "从容的执行",
    ],
    approach_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878580/BAL_1451_dhfxcj.jpg",

    // Services
    services_label: "我们提供的服务",
    services_heading: ["我们的私密婚礼", "服务"],
    services_list: [
      "场地与别墅甄选",
      "婚礼设计开发",
      "造型与花艺指导",
      "供应商甄选",
      "预算与日程管理",
      "婚礼当天统筹",
    ],
    services_footnote:
      "我们的职责，是搭建好整体框架，让您放下操心，全然投入当下。",
    services_dark_label: "体验",
    services_dark_heading: ["为全然投入当下", "而设计"],
    services_dark_body:
      "私密婚礼让您真正体验属于自己的庆典。人数更少，每一个时刻都更加鲜活——仪式、晚宴，以及亲友之间无声的默契与联结。",
    services_dark_list: [
      "极具个人色彩的氛围",
      "每位宾客都真正在场",
      "从容而动人的仪式",
      "精致的用餐体验",
      "真诚联结的空间",
    ],

    // Closing
    closing_label: "一场处处是您的私密婚礼",
    closing_heading: ["重质不重量。", "重氛围，不重排场。"],
    closing_body:
      "如果您正在筹划巴厘岛私密婚礼，希望找到一支以设计为导向、秉持待客之道的团队，我们将非常荣幸陪伴您走过这段旅程。",
    closing_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878569/BAL_1210_gktw4p.jpg",
    closing_couple_label: null,
    closing_couple_values: [],

    // Relations
    faqs: [
      {
        id: "faq-iw-1",
        experience_id: "2",
        question: "什么样的婚礼算是私密婚礼？",
        answer:
          "私密婚礼通常邀请 10–50 位宾客，让彼此联结更深入、设计更灵活，氛围也更轻松，聚焦于有意义的时刻。",
        sort_order: 0,
      },
      {
        id: "faq-iw-2",
        experience_id: "2",
        question: "为什么选择巴厘岛的私密婚礼？",
        answer:
          "巴厘岛的风光、私密场地与自然之美，让它成为私密婚礼的理想之地。宾客人数较少，新人便能全然感受场地、仪式与庆典。",
        sort_order: 1,
      },
      {
        id: "faq-iw-3",
        experience_id: "2",
        question: "私密婚礼的花费会更低吗？",
        answer:
          "不一定。私密婚礼往往更注重品质而非规模，许多新人会把预算投入更高端的场地、精致的设计、出色的餐饮与宾客体验。",
        sort_order: 2,
      },
      {
        id: "faq-iw-4",
        experience_id: "2",
        question: "你们提供私密婚礼的全程策划吗？",
        answer:
          "提供。我们为私密婚礼提供完整的创意与物流策划，包括场地选择、设计开发、供应商协调以及婚礼当天的管理。",
        sort_order: 3,
      },
      {
        id: "faq-iw-5",
        experience_id: "2",
        question: "私密婚礼也能拥有奢华感吗？",
        answer:
          "当然可以。奢华无关规模，而在于用心、设计与执行。私密婚礼往往能呈现更高水准的细节与个性化。",
        sort_order: 4,
      },
    ],
  },

  // ─── Elopement Weddings ──────────────────────────────────────────────────

  {
    id: "3",
    slug: "elopement-weddings",
    category: "elopement_weddings",
    name: "私奔婚礼",

    // Hero
    hero_style: "centered",
    hero_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939447/Lake_Elopement_hbxm9l.png",
    hero_desc:
      "巴厘岛私奔婚礼——亲密、情感丰盈、视觉如诗——是一场有意义的体验，而非匆匆的仪式。",

    // Intro
    intro_label: "场景",
    intro_heading: ["为何新人", "选择在巴厘岛私奔"],
    intro_body:
      "无论是在隐秘的海滩、丛林空地、私人别墅，还是壮丽的悬崖之上，我们的私奔婚礼都是一段有意义的体验，而非匆匆的仪式。在这里，私奔婚礼往往不像一场活动，更像是一个神圣的时刻。",
    intro_list_label: "巴厘岛拥有完美的场景：",
    intro_list: [
      "自然之美",
      "灵性的氛围",
      "私密与幽静",
      "富有象征意义的仪式场景",
      "浪漫如电影般的风景",
    ],
    intro_footnote: null,
    intro_images: ["", ""],

    // Approach
    approach_label: "我们的理念",
    approach_heading: ["以设计为主导的", "私奔婚礼体验"],
    approach_body:
      "每一个元素都经过精心挑选，只为成就专注与意义。无论只有你们两人，还是身边几位至亲好友，我们都会为您的时刻留出自然展开的空间。",
    approach_list_label: "我们的私奔婚礼策划注重：",
    approach_list: [
      "情感叙事",
      "与自然景观的和谐融合",
      "简约而精致的造型",
      "从容不迫的节奏",
      "真实的联结",
    ],
    approach_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939447/Volcano_mount_batur_y3gtwu.png",

    // Services
    services_label: "我们提供的服务",
    services_heading: ["我们的巴厘岛", "私奔婚礼服务"],
    services_list: [
      "场地寻找与许可办理",
      "仪式设计与概念",
      "造型与花艺指导",
      "供应商协调",
      "时间表与物流规划",
      "现场统筹",
    ],
    services_footnote: "献给追求深度、而非炫耀的新人。",
    services_dark_label: "我们的价值观",
    services_dark_heading: ["情感重于", "制作排场"],
    services_dark_body:
      "我们为珍视“简约而有意义”的新人设计私奔婚礼。每一个细节都经过考量，绝无多余。",
    services_dark_list: [
      "情感重于制作排场",
      "简约而有意义",
      "细腻敏感的设计",
      "低调的奢华",
      "个性化的仪式体验",
    ],

    // Closing
    closing_label: "一场神圣的私奔婚礼",
    closing_heading: ["永恒。踏实。", "情感真挚。"],
    closing_body:
      "如果您正在寻找一位将私奔婚礼视为艺术体验的巴厘岛婚礼策划师，我们将非常荣幸与您共同创造。",
    closing_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939441/Waterfall_Wedding_1_kk2634.png",
    closing_couple_label: null,
    closing_couple_values: [],

    // Relations
    faqs: [
      {
        id: "faq-ew-1",
        experience_id: "3",
        question: "什么是巴厘岛私奔婚礼？",
        answer:
          "巴厘岛私奔婚礼是一场以新人为中心的亲密仪式，通常没有宾客，或只邀请几位至亲好友。它强调情感、简约与有意义的体验，而非盛大的排场。",
        sort_order: 0,
      },
      {
        id: "faq-ew-2",
        experience_id: "3",
        question: "我们可以在巴厘岛哪里举行私奔婚礼？",
        answer:
          "热门的私奔婚礼地点包括私人别墅、隐秘海滩、丛林空地、瀑布、悬崖场地和精品度假村。我们会根据私密性、氛围与舒适度帮您精选场地。",
        sort_order: 1,
      },
      {
        id: "faq-ew-3",
        experience_id: "3",
        question: "私奔婚礼在巴厘岛具有法律效力吗？",
        answer:
          "法律要求因国籍和个人情况而异。我们会为新人提供象征性仪式、法律流程以及推荐方案方面的指导。",
        sort_order: 2,
      },
      {
        id: "faq-ew-4",
        experience_id: "3",
        question: "私奔婚礼也能拥有精美的设计吗？",
        answer:
          "当然可以。我们的私奔婚礼以设计为导向并精心策划，注重精致的造型、富有意义的仪式流程，以及与自然相融的视觉和谐。",
        sort_order: 3,
      },
      {
        id: "faq-ew-5",
        experience_id: "3",
        question: "你们也策划只有新人两人的私奔婚礼吗？",
        answer:
          "可以。无论是只有两个人，还是极少数宾客，我们都能设计。每一段体验都是量身定制。",
        sort_order: 4,
      },
    ],
  },

  // ─── Luxury Weddings ─────────────────────────────────────────────────────

  {
    id: "4",
    slug: "luxury-weddings",
    category: "luxury_weddings",
    name: "奢华婚礼",

    // Hero
    hero_style: "editorial",
    hero_image: "/images/venues/banner/signature-bg.png",
    hero_desc: "巴厘岛的奢华婚礼，由建筑、氛围与故事塑造——而非潮流。",

    // Intro
    intro_label: "我们的定义",
    intro_heading: ["Linda Wiryani 眼中的", "奢华定义"],
    intro_body:
      "在 Linda Wiryani Design and Event Planning，我们在巴厘岛设计格调高雅、宁静且情感丰盈的奢华婚礼。我们的婚礼由建筑、氛围与故事塑造，而非追逐潮流。",
    intro_list_label: null,
    intro_list: [
      "艺术指导",
      "情感深度",
      "空间之美",
      "无缝衔接的执行",
      "低调周到的服务",
    ],
    intro_footnote: "真正的奢华，是一切都自然流畅、毫不费力。",
    intro_images: ["", ""],

    // Approach
    approach_label: "我们的工作方式",
    approach_heading: ["我们的奢华婚礼", "设计理念"],
    approach_body:
      "每一场奢华婚礼都始于一个过程，而非一套模板。这确保每场庆典从第一次交谈到最后的道别，始终浑然一体、用心至极。",
    approach_list_label: "每一场奢华婚礼都始于：",
    approach_list: [
      "愿景与情感梳理",
      "场地与环境研究",
      "设计叙事的构建",
      "宾客体验规划",
      "技术与制作的精准把控",
    ],
    approach_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1768288826/Amankila_-_Manggis_-_Bali_-_Indonesia_-_Private_Event_04_plvo4w.jpg",

    // Services
    services_label: "我们提供的服务",
    services_heading: ["我们的奢华", "婚礼服务"],
    services_list: [
      "创意指导与设计",
      "场地与供应商甄选",
      "预算与制作管理",
      "多日活动策划",
      "造型、花艺与空间设计",
      "婚礼当天的全盘统筹",
    ],
    services_footnote:
      "我们每年有意只承接有限数量的奢华婚礼，以确保全情投入创意工作。",
    services_dark_label: "为您而设",
    services_dark_heading: ["献给崇尚", "艺术之美的新人"],
    services_dark_body:
      "选择我们工作室的新人，追求的是美学的智慧、情感的叙事，以及世界级的执行水准。",
    services_dark_list: [
      "美学的智慧",
      "沉稳的专业素养",
      "情感叙事",
      "建筑之美",
      "世界级的宾客体验",
    ],

    // Closing
    closing_label: "一场历久弥新的奢华婚礼",
    closing_heading: ["奢华从不应喧嚣。", "它应当是深思熟虑的。"],
    closing_body:
      "如果您正在寻找巴厘岛的奢华婚礼策划师，我们将非常荣幸为您设计一场有意义、精致且令人难忘的庆典。",
    closing_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1768288832/Amankila_-_Manggis_-_Bali_-_Indonesia_-_Private_Event_06_rzqgiu.jpg",
    closing_couple_label: null,
    closing_couple_values: [],

    // Relations
    faqs: [
      {
        id: "faq-lw-1",
        experience_id: "4",
        question: "是什么定义了巴厘岛的奢华婚礼？",
        answer:
          "奢华婚礼的定义在于深思熟虑的设计、精致的美学、无缝衔接的执行、情感叙事与卓越的宾客体验，而不仅仅是预算或规模。",
        sort_order: 0,
      },
      {
        id: "faq-lw-2",
        experience_id: "4",
        question: "你们策划多日的奢华婚礼吗？",
        answer:
          "策划。我们负责设计并管理多日婚礼体验，包括欢迎活动、彩排聚会、婚礼当日以及告别庆典。",
        sort_order: 1,
      },
      {
        id: "faq-lw-3",
        experience_id: "4",
        question: "巴厘岛的奢华婚礼费用是多少？",
        answer:
          "预算差异很大，取决于宾客人数、场地、设计范围与制作复杂度。巴厘岛的奢华婚礼通常起步于需要完整的专业设计、策划与制作的层级。",
        sort_order: 2,
      },
      {
        id: "faq-lw-4",
        experience_id: "4",
        question: "你们每年承接多少场婚礼？",
        answer:
          "我们有意限制承接的奢华婚礼数量，以确保全神贯注的创意投入、亲力亲为的参与和卓越的执行。",
        sort_order: 3,
      },
      {
        id: "faq-lw-5",
        experience_id: "4",
        question: "你们与高端场地和供应商合作吗？",
        answer:
          "合作。我们与遍布巴厘岛、值得信赖的奢华场地、匠人及婚礼专业人士携手，他们均符合我们对品质、可靠与精致的标准。",
        sort_order: 4,
      },
    ],
  },
];

export const whyBali = [
  "壮丽的海边悬崖",
  "私人奢华别墅",
  "丛林与河畔景致",
  "白色沙滩",
  "精品度假村与隐秘庄园",
];

export const fullServiceIncludes = [
  "场地甄选与评估",
  "创意指导与设计开发",
  "供应商甄选与管理",
  "预算规划与成本控制",
  "制作日程与时间表",
  "宾客体验规划",
  "仪式与宴会的整体统筹",
  "婚礼当天的统筹与执行",
];

export const hospitalityValues = [
  "清晰明确",
  "精准细致",
  "宾客舒适",
  "情感流动",
  "无缝衔接的执行",
];

export const coupleValues = [
  "艺术叙事",
  "从容专业的策划",
  "精致的美学",
  "情感氛围",
  "体贴周到的宾客体验",
];

export const designFoundation = [
  "了解您的故事",
  "确立情感氛围",
  "研究您的场地及周边环境",
  "设计整场庆典的流程",
];

// Sub-experience cards
export const subExperiences = [
  {
    title: "私人别墅婚礼",
    subtitle: "于巴厘岛",
    tag: "私人别墅",
    desc: "私密、设计自由，以及个性化而非商业化的氛围。在完全属于您的空间里尽情庆祝。",
    href: "/wedding-experiences/private-villa-weddings",
    image: "/images/venues/banner/private-bg.png",
  },
  {
    title: "私密婚礼",
    subtitle: "于巴厘岛",
    tag: "私密",
    desc: "为联结、专注与美好留出空间，不事铺张。专为重质不重量的新人而设计。",
    href: "/wedding-experiences/intimate-weddings",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878596/BAL_1453_e7hd8w.jpg",
  },
  {
    title: "私奔婚礼",
    subtitle: "于巴厘岛",
    tag: "私奔",
    desc: "私奔婚礼不是缩小版的婚礼，而是更深刻的婚礼。情感丰盈，视觉如诗，完完全全属于您。",
    href: "/wedding-experiences/elopement-weddings",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767345590/Wedding_18_nnx6an.png",
  },
  {
    title: "奢华婚礼",
    subtitle: "于巴厘岛",
    tag: "奢华",
    desc: "奢华无关铺张，而在于精致、用心与体验。由建筑、氛围与故事塑造的婚礼。",
    href: "/wedding-experiences/luxury-weddings",
    image: "/images/venues/banner/signature-bg.png",
  },
];

export const faqs = [
  {
    q: "巴厘岛目的地婚礼策划师负责什么？",
    a: "巴厘岛目的地婚礼策划师既负责创意设计，也负责在巴厘岛结婚的新人的全部策划流程，包括场地甄选、设计开发、供应商协调、预算指导、物流、时间表以及婚礼当天的执行。",
  },
  {
    q: "为什么要聘请巴厘岛本地的婚礼策划师？",
    a: "本地的巴厘岛婚礼策划师对场地、法规、文化礼仪、值得信赖的供应商以及现场制作的实际情况了如指掌——相比远程策划，沟通更顺畅，执行水准也更高。",
  },
  {
    q: "巴厘岛的目的地婚礼应提前多久开始筹备？",
    a: "大多数巴厘岛目的地婚礼会提前 9–15 个月筹备，以便留出时间确认场地档期、开发设计、预订供应商、安排宾客行程并办理许可。奢华婚礼和私人别墅婚礼往往需要更长的筹备期。",
  },
  {
    q: "你们与国际新人合作吗？",
    a: "合作。Linda Wiryani Design and Event Planning 专注于为国际新人策划目的地婚礼。我们陪伴客户走完整个策划旅程，包括时差协调、线上咨询以及细致的策划体系。",
  },
  {
    q: "你们能帮我们挑选合适的巴厘岛婚礼场地吗？",
    a: "可以。我们会根据您的愿景、宾客人数、设计方向与体验目标，精选并推荐婚礼场地——包括遍布巴厘岛的私人别墅、度假村和隐秘之地。",
  },
];
