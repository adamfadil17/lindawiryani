import { createLocaleData } from "./locale-data";
import * as en from "./translate/en/services-data.en";
import * as id from "./translate/id/services-data.id";
import * as zh from "./translate/zh/services-data.zh";
import * as fr from "./translate/fr/services-data.fr";
import * as ja from "./translate/ja/services-data.ja";

export type ServicesData = typeof en;

const { getData: getServicesData, useData: useServicesData } =
  createLocaleData<ServicesData>({ en, id, zh, fr, ja });

export { getServicesData, useServicesData };
