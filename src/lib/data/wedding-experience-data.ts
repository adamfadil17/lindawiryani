import { createLocaleData } from "./locale-data";
import * as en from "./wedding-experience-data.en";
import * as id from "./wedding-experience-data.id";
import * as zh from "./wedding-experience-data.zh";
import * as fr from "./wedding-experience-data.fr";

export type WeddingExperienceData = typeof en;

const {
  getData: getWeddingExperienceData,
  useData: useWeddingExperienceData,
} = createLocaleData<WeddingExperienceData>({ en, id, zh, fr });

export { getWeddingExperienceData, useWeddingExperienceData };
