/**
 * Wedding-theme images (cover + gallery), keyed by theme id. Language-neutral.
 * Gallery entries become `<id>-img-<n>` with sort_order n-1.
 */
export interface WeddingThemeMedia {
  image: string;
  gallery: string[];
}

export const weddingThemeMedia: Record<string, WeddingThemeMedia> = {
  "private-villa-elopement": {
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776940317/Private_Villa_Elopement_Mutiara_6_etnh26.png",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776940317/Private_Villa_Elopement_Mutiara_6_etnh26.png",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776940317/Private_Villa_Elopement_Vivara1_wqecfn.png",
    ],
  },
  "cliffside-elopement": {
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939445/Cliffside_Elopement_1_vof9yx.png",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939445/Cliffside_Elopement_1_vof9yx.png",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939442/Cliffside_Elopement_2_naudou.png",
    ],
  },
  "architectural-modern-tropical-elopement": {
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939440/Architectural_Modern_Tropical_Elopements_nlnd5r.jpg",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939440/Architectural_Modern_Tropical_Elopements_nlnd5r.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1777015076/architectural-2_gafx5l.jpg",
    ],
  },
  "forest-jungle-elopement": {
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939441/Forest_Jungle_Elopements_wgemwg.png",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939441/Forest_Jungle_Elopements_wgemwg.png",
    ],
  },
  "waterfall-elopement": {
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939441/Waterfall_Wedding_1_kk2634.png",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939441/Waterfall_Wedding_1_kk2634.png",
    ],
  },
  "rice-field-elopement": {
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939441/Rice_Field_Elopements_z7rkqm.jpg",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939441/Rice_Field_Elopements_z7rkqm.jpg",
    ],
  },
  "beachfront-elopement": {
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939442/Beachfront_Elopement_Wedding_eo6b6g.jpg",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939442/Beachfront_Elopement_Wedding_eo6b6g.jpg",
    ],
  },
  "lake-elopement": {
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939447/Lake_Elopement_hbxm9l.png",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939447/Lake_Elopement_hbxm9l.png",
    ],
  },
  "volcano-mountain-elopement": {
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939447/Volcano_mount_batur_y3gtwu.png",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939447/Volcano_mount_batur_y3gtwu.png",
    ],
  },
  "riverside-elopement": {
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939444/Riverside_Elopement_ccm8dy.png",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939444/Riverside_Elopement_ccm8dy.png",
    ],
  },
  "eco-sustainable-elopement": {
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939444/Eco_and_Sustainable_Weddings_twb9v2.png",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939444/Eco_and_Sustainable_Weddings_twb9v2.png",
    ],
  },
  "sacred-spiritual-elopement": {
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939444/Sacred_or_Spiritual_Elopement_eelmde.png",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939444/Sacred_or_Spiritual_Elopement_eelmde.png",
    ],
  },
  "cultural-heritage-elopement": {
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939445/Cultural_Heritage-Inspired_Ceremonies_muscyz.png",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939445/Cultural_Heritage-Inspired_Ceremonies_muscyz.png",
    ],
  },
  "sunrise-purification-elopement": {
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939445/Sunrise_or_Purification_vfhluk.png",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939445/Sunrise_or_Purification_vfhluk.png",
    ],
  },
  "editorial-luxury-elopement": {
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939444/Editorial_yet_human_storytelling_xnjqzv.png",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939444/Editorial_yet_human_storytelling_xnjqzv.png",
    ],
  },
  "private-villa-estate": {
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1768446142/Wedding_1_fyzchu.jpg",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1768446142/Wedding_1_fyzchu.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1768446128/Wedding_2_pbz9so.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1768446105/Lifestyle_1_rka2va.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1768446105/Lifestyle_2_iplagw.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1768446107/Lifestyle_5_nhlcqw.jpg",
    ],
  },
  "luxury-resort-intimate": {
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878596/BAL_1453_e7hd8w.jpg",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878596/BAL_1453_e7hd8w.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878580/BAL_1451_dhfxcj.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878569/BAL_1210_gktw4p.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878582/BAL_1330_screen-hi-res_dym0xt.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878565/BAL_1338_screen-hi-res_hf0l9e.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878570/BAL_1429_vf3mvt.jpg",
    ],
  },
  "garden-riverside": {
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769608324/Wedding_3_demaoq.png",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769608324/Wedding_3_demaoq.png",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769608323/Wedding_1_zgtm4d.png",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769608331/Wedding_2_sxvamv.png",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769608324/Wedding_4_wynsx3.png",
    ],
  },
  "cultural-architectural": {
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769236708/Wedding_5_ucfdpj.jpg",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769236708/Wedding_5_ucfdpj.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769236705/Wedding_3_pnefn2.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769236703/Wedding_2_u5yqq8.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769236704/Wedding_1_t2ksqq.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769236705/Wedding_4_bssvtq.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769236708/Wedding_6_otcjrs.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769236705/Wedding_7_nnurto.jpg",
    ],
  },
  "destination-intimate": {
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767511823/Wedding_2_byu1us.jpg",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767511823/Wedding_2_byu1us.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767511815/Wedding_1_nlta08.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767511826/Wedding_3_risbjp.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767511813/Wedding_4_c98b0e.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767511820/Wedding_5_sersgy.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767511811/Wedding_6_uyayfs.jpg",
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767511818/Wedding_7_f0vgit.jpg",
    ],
  },
  "forest-jungle-intimate": {
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769609440/Cover_1_py4g8y.jpg",
    gallery: [
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769609440/Cover_1_py4g8y.jpg",
    ],
  },
};

export function buildThemeGallery(themeId: string, urls: string[]) {
  return urls.map((url, i) => ({
    id: `${themeId}-img-${i + 1}`,
    url,
    sort_order: i,
    theme_id: themeId,
  }));
}
