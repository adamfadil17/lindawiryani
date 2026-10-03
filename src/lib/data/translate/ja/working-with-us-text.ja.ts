import type { WorkingWithUsContent } from "@/lib/data/base/working-with-us-base";

// 日本語訳。キー（カテゴリ・職種・番号）は base/ から共通で使い、文章だけをここに置きます。
export const content: WorkingWithUsContent = {
  vendorCategories: {
    photography: "写真撮影",
    videography: "映像撮影",
    "floral-decor": "フローラル＆装飾",
    "catering-fb": "ケータリング＆飲食",
    "live-music-entertainment": "ライブ音楽＆エンターテインメント",
    "hair-makeup": "ヘア＆メイク",
    "lighting-av": "照明＆音響・映像",
    transportation: "交通・送迎",
    "stationery-printing": "ステーショナリー＆印刷",
    venue: "会場",
    other: "その他",
  },
  openPositions: {
    "wedding-planner-coordinator": {
      title: "ウェディングプランナー＆コーディネーター",
      type: "フルタイム",
      level: "中級〜上級",
      desc: "バリ島のラグジュアリーなデスティネーションウェディングの、企画から当日の現場運営までを一貫して担当します。",
    },
    "creative-design-consultant": {
      title: "クリエイティブデザインコンサルタント",
      type: "フルタイム",
      level: "上級",
      desc: "お二人のために、オーダーメイドの美的ストーリー、ムードボード、デザイン提案を構想し、形にします。",
    },
    "client-relations-executive": {
      title: "クライアントリレーションズエグゼクティブ",
      type: "フルタイム",
      level: "中級",
      desc: "海外カップルの最初の窓口として、お問い合わせ、ご相談、日々のやり取りを担当します。",
    },
    "social-media-content-creator": {
      title: "ソーシャルメディア＆コンテンツクリエイター",
      type: "パートタイム／フリーランス",
      level: "全レベル",
      desc: "私たちのイベントから、Instagram、Pinterestなどに向けた魅力的なコンテンツを撮影・制作します。",
    },
  },
  vendorValues: {
    "01": {
      title: "美意識の一致",
      desc: "私たちは、美しさと想いへの基準を映し出す仕事をされているベンダーとのみ提携します。",
    },
    "02": {
      title: "信頼性と職人技",
      desc: "ともに手がけるすべてのイベントで、一貫した品質とプロ意識を大切にします。",
    },
    "03": {
      title: "協働の精神",
      desc: "すばらしいウェディングは、ただ調整されるのではなく、ともに創り上げられるものだと私たちは信じています。",
    },
    "04": {
      title: "文化への配慮",
      desc: "それぞれのセレモニーに息づく伝統と意味に、深い敬意を払います。",
    },
  },
};
