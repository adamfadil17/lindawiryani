import { createLocaleData } from "./locale-data";
import * as en from "./wedding-theme-data.en";
import * as id from "./wedding-theme-data.id";
import * as zh from "./wedding-theme-data.zh";
import * as fr from "./wedding-theme-data.fr";

export type WeddingThemeData = typeof en;

const { getData: getWeddingThemeData, useData: useWeddingThemeData } =
  createLocaleData<WeddingThemeData>({ en, id, zh, fr });

export { getWeddingThemeData, useWeddingThemeData };
