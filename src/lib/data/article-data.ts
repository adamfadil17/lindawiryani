import { createLocaleData } from "./locale-data";
import * as en from "./translate/en/article-data.en";
import * as id from "./translate/id/article-data.id";
import * as zh from "./translate/zh/article-data.zh";
import * as fr from "./translate/fr/article-data.fr";
import * as ja from "./translate/ja/article-data.ja";

export type ArticleData = typeof en;

const { getData: getArticleData, useData: useArticleData } =
  createLocaleData<ArticleData>({ en, id, zh, fr, ja });

export { getArticleData, useArticleData };
