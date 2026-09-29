import { createLocaleData } from "./locale-data";
import * as en from "./working-with-us.en";
import * as id from "./working-with-us.id";
import * as zh from "./working-with-us.zh";
import * as fr from "./working-with-us.fr";

export type WorkingWithUsData = typeof en;

const { getData: getWorkingWithUsData, useData: useWorkingWithUsData } =
  createLocaleData<WorkingWithUsData>({ en, id, zh, fr });

export { getWorkingWithUsData, useWorkingWithUsData };
