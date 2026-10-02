import { createLocaleData } from "./locale-data";
import * as en from "./translate/en/portfolio-data.en";
import * as id from "./translate/id/portfolio-data.id";
import * as zh from "./translate/zh/portfolio-data.zh";
import * as fr from "./translate/fr/portfolio-data.fr";
import * as ja from "./translate/ja/portfolio-data.ja";

export type PortfolioData = typeof en;

const { getData: getPortfolioData, useData: usePortfolioData } =
  createLocaleData<PortfolioData>({ en, id, zh, fr, ja });

export { getPortfolioData, usePortfolioData };
