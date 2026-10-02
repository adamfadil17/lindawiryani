import { createLocaleData } from "./locale-data";
import * as en from "./translate/en/our-approach-data.en";
import * as id from "./translate/id/our-approach-data.id";
import * as zh from "./translate/zh/our-approach-data.zh";
import * as fr from "./translate/fr/our-approach-data.fr";
import * as ja from "./translate/ja/our-approach-data.ja";

export type OurApproachData = typeof en;

const { getData: getOurApproachData, useData: useOurApproachData } =
  createLocaleData<OurApproachData>({ en, id, zh, fr, ja });

export { getOurApproachData, useOurApproachData };
