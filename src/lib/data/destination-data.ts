import { createLocaleData } from "./locale-data";
import * as en from "./translate/en/destination-data.en";
import * as id from "./translate/id/destination-data.id";
import * as zh from "./translate/zh/destination-data.zh";
import * as fr from "./translate/fr/destination-data.fr";
import * as ja from "./translate/ja/destination-data.ja";

export type DestinationData = typeof en;

const { getData: getDestinationData, useData: useDestinationData } =
  createLocaleData<DestinationData>({ en, id, zh, fr, ja });

export { getDestinationData, useDestinationData };
