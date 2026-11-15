import type { WorkingWithUsContent } from "@/lib/data/base/working-with-us-base";

// Teks working-with-us (zh). Dikunci per key; urutan ada di base/.
export const content: WorkingWithUsContent = {
  vendorCategories: {
    photography: "摄影",
    videography: "摄像",
    "floral-decor": "花艺与装饰",
    "catering-fb": "餐饮",
    "live-music-entertainment": "现场音乐与娱乐",
    "hair-makeup": "化妆与造型",
    "lighting-av": "灯光与音视频",
    transportation: "交通",
    "stationery-printing": "文具与印刷",
    venue: "场地",
    other: "其他",
  },
  openPositions: {
    "wedding-planner-coordinator": {
      title: "婚礼策划师与协调员",
      type: "全职",
      level: "中级至高级",
      desc: "负责巴厘岛奢华目的地婚礼的全程策划与现场执行。",
    },
    "creative-design-consultant": {
      title: "创意设计顾问",
      type: "全职",
      level: "高级",
      desc: "为新人构思并呈现定制化的美学叙事、情绪板与设计方案。",
    },
    "client-relations-executive": {
      title: "客户关系专员",
      type: "全职",
      level: "中级",
      desc: "作为国际新人的首要联络人，负责处理咨询、面谈及日常沟通。",
    },
    "social-media-content-creator": {
      title: "社交媒体与内容创作者",
      type: "兼职 / 自由职业",
      level: "不限级别",
      desc: "为 Instagram、Pinterest 等平台捕捉并创作我们活动的精彩内容。",
    },
  },
  vendorValues: {
    "01": {
      title: "美学契合",
      desc: "我们只与作品体现我们审美标准与用心程度的供应商合作。",
    },
    "02": {
      title: "可靠与匠心",
      desc: "在我们共同制作的每一场活动中，保持一致的品质与专业水准。",
    },
    "03": {
      title: "协作精神",
      desc: "我们相信，卓越的婚礼是共同创造的，而不仅仅是协调出来的。",
    },
    "04": {
      title: "文化敏感度",
      desc: "深深尊重每场仪式中蕴含的传统与意义。",
    },
  },
};
