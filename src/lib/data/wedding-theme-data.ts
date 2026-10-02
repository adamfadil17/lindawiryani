import { createLocaleData } from "./locale-data";
import * as en from "./translate/en/wedding-theme-data.en";
import * as id from "./translate/id/wedding-theme-data.id";
import * as zh from "./translate/zh/wedding-theme-data.zh";
import * as fr from "./translate/fr/wedding-theme-data.fr";
import * as ja from "./translate/ja/wedding-theme-data.ja";

export type WeddingThemeData = typeof en;

const { getData: getWeddingThemeData, useData: useWeddingThemeData } =
  createLocaleData<WeddingThemeData>({ en, id, zh, fr, ja });

export { getWeddingThemeData, useWeddingThemeData };
