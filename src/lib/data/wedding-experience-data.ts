import { createLocaleData } from "./locale-data";
import * as en from "./translate/en/wedding-experience-data.en";
import * as id from "./translate/id/wedding-experience-data.id";
import * as zh from "./translate/zh/wedding-experience-data.zh";
import * as fr from "./translate/fr/wedding-experience-data.fr";
import * as ja from "./translate/ja/wedding-experience-data.ja";

export type WeddingExperienceData = typeof en;

const {
  getData: getWeddingExperienceData,
  useData: useWeddingExperienceData,
} = createLocaleData<WeddingExperienceData>({ en, id, zh, fr, ja });

export { getWeddingExperienceData, useWeddingExperienceData };
