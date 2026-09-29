import { createLocaleData } from "./locale-data";
import * as en from "./our-approach-data.en";
import * as id from "./our-approach-data.id";
import * as zh from "./our-approach-data.zh";
import * as fr from "./our-approach-data.fr";

export type OurApproachData = typeof en;

const { getData: getOurApproachData, useData: useOurApproachData } =
  createLocaleData<OurApproachData>({ en, id, zh, fr });

export { getOurApproachData, useOurApproachData };
