import * as en from "@/lib/data/translate/en/wedding-concepts-data.en";

// 日本語訳。href・image・number などは英語版から引き継ぎ、
// 文章だけを置き換えています（並び順は wedding-concepts-data.en.ts と同じ）。
type Layer = (typeof en.conceptLayers)[number];

export const venueCurationConsiderations: typeof en.venueCurationConsiderations = [
  "建築的な個性とロケーション",
  "空気感と場所の持つ雰囲気",
  "セレモニーとレセプションの流れ",
  "ゲストの快適さと運営面",
  "デザインの自由度と制約",
  "会場とビジョンの調和",
];

export const stylingFocusAreas: typeof en.stylingFocusAreas = [
  "空間のバランス",
  "自然素材のパレット",
  "重なり合う質感",
  "思慮深いフローラルとインスタレーション",
  "色彩と余白の意図的な使い方",
  "セレモニーとお祝いのエリアの一体感",
];

export const editorialSources: typeof en.editorialSources = [
  "建築と風景",
  "ファッションと職人技",
  "アート、文化、旅",
  "光、動き、感情",
];

const layerText: Pick<
  Layer,
  "title" | "subtitle" | "desc" | "tag" | "supports"
>[] = [
  {
    title: "会場のキュレーション",
    subtitle: "すべての土台",
    desc: "会場のキュレーションは、私たちがデザインするすべてのウェディングの土台です。網羅的なリストをお見せするのではなく、エリアごとに厳選した会場の概要をご紹介し、ロケーションの個性、会場のスタイル、開始価格の目安をご理解いただけるようにしています。",
    tag: "会場のキュレーション",
    supports: [
      "バリ島のデスティネーションウェディング",
      "プライベートヴィラウェディング",
      "少人数＆エロープメントウェディング",
    ],
  },
  {
    title: "ウェディングテーマ",
    subtitle: "感情の方向性",
    desc: "ウェディングテーマは、装飾を決めるためではなく、祝福の感覚を明確にするためのものです。私たちのテーマは流行ではなく、感情の枠組みです。空間、ペース、空気感がどのようにひとつになるかを導きます。",
    tag: "テーマ",
    supports: ["規模と親密さ", "セレモニーのスタイル", "ゲスト体験"],
  },
  {
    title: "スタイリングコンセプト",
    subtitle: "ビジョンを目に見える形に",
    desc: "スタイリングコンセプトは、ビジョンを目に見える形にします。構成、素材感、質感、そして抑制を通じて、空気感が可視化される場所です。スタイリングは、決して過剰さのためのものではありません。明快さと調和のためのものです。",
    tag: "スタイリング",
    supports: [
      "バリ島のラグジュアリーウェディング",
      "プライベートヴィラウェディング",
      "少人数の祝福",
    ],
  },
  {
    title: "エディトリアルなインスピレーション",
    subtitle: "ストーリーテリングの始まり",
    desc: "ストーリーテリングは、エディトリアルなインスピレーションから始まります。流行を真似るのではなく、建築、ファッション、アート、文化、旅から着想を得て、想像と現実をつなぎ、クリエイティブディレクションと実行の両方を導きます。",
    tag: "エディトリアル",
    supports: ["ポートフォリオのストーリー", "ジャーナルの記事", "スタイリングコンセプト"],
  },
];

export const conceptLayers: Layer[] = en.conceptLayers.map((l, i) => ({
  ...l,
  ...layerText[i],
}));

export const planningJourney: typeof en.planningJourney = [
  "コンセプトを明確にする",
  "ふさわしい環境を見つける",
  "デザインの物語を形づくる",
  "ゲスト体験を演出する",
  "穏やかな精密さで実行する",
];
