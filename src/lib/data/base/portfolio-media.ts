/**
 * Portfolio images (cover + gallery), keyed by portfolio id. Language-neutral.
 * Gallery entries become `<id>-img-<n>` with sort_order n-1.
 */
export interface PortfolioMedia {
  image: string;
  gallery: string[];
}

export const portfolioMedia: Record<string, PortfolioMedia> = {
  "1": {
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773237717/Anaz_Wijdane_105_tuda6g.png",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773237709/Anaz_Wijdane_165_ao3tfo.png",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773237715/instagram4_kdks4e.png",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773708619/Anaz_Jane_102_eqb8ne.png",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773237700/Anaz_Wijdane_50_v5ndzy.png",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773237701/Anaz_Wijdane_48_frybgq.png",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773237697/Anaz_Wijdane_15_xdxmw7.png",
    ],
  },
};

export function buildPortfolioGallery(portfolioId: string, urls: string[]) {
  return urls.map((url, i) => ({
    id: `${portfolioId}-img-${i + 1}`,
    url,
    sort_order: i,
    portfolio_id: portfolioId,
  }));
}
