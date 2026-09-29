import { createLocaleData } from "./locale-data";
import * as en from "./services-data.en";
import * as id from "./services-data.id";
import * as zh from "./services-data.zh";
import * as fr from "./services-data.fr";

export type ServicesData = typeof en;

const { getData: getServicesData, useData: useServicesData } =
  createLocaleData<ServicesData>({ en, id, zh, fr });

export { getServicesData, useServicesData };
