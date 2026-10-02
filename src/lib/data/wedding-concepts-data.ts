import { createLocaleData } from "./locale-data";
import * as en from "./translate/en/wedding-concepts-data.en";
import * as id from "./translate/id/wedding-concepts-data.id";
import * as zh from "./translate/zh/wedding-concepts-data.zh";
import * as fr from "./translate/fr/wedding-concepts-data.fr";
import * as ja from "./translate/ja/wedding-concepts-data.ja";

export type WeddingConceptsData = typeof en;

const { getData: getWeddingConceptsData, useData: useWeddingConceptsData } =
  createLocaleData<WeddingConceptsData>({ en, id, zh, fr, ja });

export { getWeddingConceptsData, useWeddingConceptsData };
