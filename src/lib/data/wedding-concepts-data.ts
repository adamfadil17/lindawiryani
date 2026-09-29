import { createLocaleData } from "./locale-data";
import * as en from "./wedding-concepts-data.en";
import * as id from "./wedding-concepts-data.id";
import * as zh from "./wedding-concepts-data.zh";
import * as fr from "./wedding-concepts-data.fr";

export type WeddingConceptsData = typeof en;

const { getData: getWeddingConceptsData, useData: useWeddingConceptsData } =
  createLocaleData<WeddingConceptsData>({ en, id, zh, fr });

export { getWeddingConceptsData, useWeddingConceptsData };
