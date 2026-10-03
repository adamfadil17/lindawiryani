import type { WeddingConceptsContent } from "@/lib/data/base/wedding-concepts-base";

// Teks wedding-concepts (zh). Dikunci per nomor layer; field lain ada di base/.
export const content: WeddingConceptsContent = {
  venueCurationConsiderations: [
    "建筑特色与场地环境",
    "氛围与场所感",
    "仪式与宴会流程",
    "宾客舒适度与后勤",
    "设计的灵活性与限制",
    "场地与愿景之间的和谐",
  ],
  stylingFocusAreas: [
    "空间平衡",
    "天然材质色调",
    "层次分明的质感",
    "用心设计的花艺与装置",
    "色彩与留白的精心运用",
    "仪式区与庆典区的统一性",
  ],
  editorialSources: [
    "建筑与景观",
    "时尚与工艺",
    "艺术、文化与旅行",
    "光影、律动与情感",
  ],
  conceptLayers: {
    "01": {
      title: "场地甄选",
      subtitle: "基础所在",
      desc: "场地甄选是我们设计每一场婚礼的基础。我们不会提供繁杂的场地清单，而是按区域精心整理概览——帮助新人了解地域特色、场地风格及预算参考。",
      tag: "场地甄选",
      supports: [
        "巴厘岛目的地婚礼",
        "私人别墅婚礼",
        "私密与私奔婚礼",
      ],
    },
    "02": {
      title: "婚礼主题",
      subtitle: "情感方向",
      desc: "婚礼主题帮助新人厘清庆典所要传达的情感，而非主导装饰细节。我们的主题并非潮流趋势，而是情感框架——引导空间、节奏与氛围如何融为一体。",
      tag: "主题",
      supports: [
        "规模与私密感",
        "仪式风格",
        "宾客体验",
      ],
    },
    "03": {
      title: "造型概念",
      subtitle: "愿景的具象化",
      desc: "造型概念将愿景转化为实体形式。氛围在此变得可见——通过构图、材质、质感与克制的美学呈现。造型从不追求繁复，而是追求清晰与和谐。",
      tag: "造型",
      supports: [
        "巴厘岛奢华婚礼",
        "私人别墅婚礼",
        "私密庆典",
      ],
    },
    "04": {
      title: "编辑灵感",
      subtitle: "故事的起点",
      desc: "编辑灵感是叙事的起点。我们并非复制潮流，而是从建筑、时尚、艺术、文化与旅行中汲取灵感——连接想象与现实，为创意方向与落地执行提供指引。",
      tag: "编辑灵感",
      supports: [
        "作品故事",
        "杂志文章",
        "造型概念",
      ],
    },
  },
  planningJourney: [
    "厘清您的构想",
    "寻找合适的环境",
    "塑造设计叙事",
    "打造宾客体验",
    "以从容的精准度执行",
  ],
};
