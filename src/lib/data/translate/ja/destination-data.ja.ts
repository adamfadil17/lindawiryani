import { translateDeep } from "@/lib/data/translate-deep";
import * as en from "@/lib/data/translate/en/destination-data.en";
import dict from "@/lib/data/translate/dictionaries/destination.ja.json";
import {
  categoryNames,
  destinationText,
  locationNames,
} from "./destination-text.ja";

// 翻訳の入口は 2 つあります。
//  1) ./destination-text.ja.ts … slug ごとの上書き（配列も位置で対応）。主にこちらを使います。
//  2) ./dictionaries/destination.ja.json … 英語原文 → 翻訳（zh と同じ方式。補助用）。
// どちらにも無い項目は、英語のまま表示されます。

export const destinationCategories = translateDeep(
  en.destinationCategories,
  dict,
).map((c) => ({ ...c, name: categoryNames[c.id] ?? c.name }));

export const destinationList = translateDeep(en.destinationList, dict).map(
  (d, i) => {
    const source = en.destinationList[i];
    return {
      ...d,
      ...destinationText[d.slug],
      location: locationNames[source.location] ?? d.location,
      category: {
        ...d.category,
        name: categoryNames[d.category_id] ?? d.category.name,
      },
    };
  },
);
