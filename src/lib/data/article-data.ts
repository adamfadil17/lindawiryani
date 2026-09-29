import { createLocaleData } from "./locale-data";
import * as en from "./article-data.en";
import * as id from "./article-data.id";
import * as zh from "./article-data.zh";
import * as fr from "./article-data.fr";

export type ArticleData = typeof en;

const { getData: getArticleData, useData: useArticleData } =
  createLocaleData<ArticleData>({ en, id, zh, fr });

export { getArticleData, useArticleData };
