import { createLocaleData } from "./locale-data";
import * as en from "./destination-data.en";
import * as id from "./destination-data.id";
import * as zh from "./destination-data.zh";
import * as fr from "./destination-data.fr";

export type DestinationData = typeof en;

const { getData: getDestinationData, useData: useDestinationData } =
  createLocaleData<DestinationData>({ en, id, zh, fr });

export { getDestinationData, useDestinationData };
