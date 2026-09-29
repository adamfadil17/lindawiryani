import { createLocaleData } from "./locale-data";
import * as en from "./portfolio-data.en";
import * as id from "./portfolio-data.id";
import * as zh from "./portfolio-data.zh";
import * as fr from "./portfolio-data.fr";

export type PortfolioData = typeof en;

const { getData: getPortfolioData, useData: usePortfolioData } =
  createLocaleData<PortfolioData>({ en, id, zh, fr });

export { getPortfolioData, usePortfolioData };
