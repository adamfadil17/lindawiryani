import { createLocaleData } from "./locale-data";
import * as en from "./translate/en/working-with-us.en";
import * as id from "./translate/id/working-with-us.id";
import * as zh from "./translate/zh/working-with-us.zh";
import * as fr from "./translate/fr/working-with-us.fr";
import * as ja from "./translate/ja/working-with-us.ja";

export type WorkingWithUsData = typeof en;

const { getData: getWorkingWithUsData, useData: useWorkingWithUsData } =
  createLocaleData<WorkingWithUsData>({ en, id, zh, fr, ja });

export { getWorkingWithUsData, useWorkingWithUsData };
