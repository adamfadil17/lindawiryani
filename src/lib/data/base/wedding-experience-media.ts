/**
 * Wedding-experience images, keyed by experience id (and sub-experience slug). Language-neutral.
 */
export interface WeddingExperienceMedia {
  hero_image: string;
  intro_images: string[];
  approach_image: string;
  closing_image: string;
}

export const weddingExperienceMedia: Record<string, WeddingExperienceMedia> = {
  "1": {
    hero_image:
      "/images/venues/banner/private-bg.png",
    intro_images: ["", ""],
    approach_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767280276/Wedding_15_ofe4kx.jpg",
    closing_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767280288/Wedding_5_rt7stj.jpg",
  },
  "2": {
    hero_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878596/BAL_1453_e7hd8w.jpg",
    intro_images: ["", ""],
    approach_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878580/BAL_1451_dhfxcj.jpg",
    closing_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878569/BAL_1210_gktw4p.jpg",
  },
  "3": {
    hero_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939447/Lake_Elopement_hbxm9l.png",
    intro_images: ["", ""],
    approach_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939447/Volcano_mount_batur_y3gtwu.png",
    closing_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939441/Waterfall_Wedding_1_kk2634.png",
  },
  "4": {
    hero_image:
      "/images/venues/banner/signature-bg.png",
    intro_images: ["", ""],
    approach_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1768288826/Amankila_-_Manggis_-_Bali_-_Indonesia_-_Private_Event_04_plvo4w.jpg",
    closing_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1768288832/Amankila_-_Manggis_-_Bali_-_Indonesia_-_Private_Event_06_rzqgiu.jpg",
  },
};

/** Gambar kartu sub-experience, per slug. */
export const subExperienceImages: Record<string, string> = {
  "private-villa-weddings":
    "/images/venues/banner/private-bg.png",
  "intimate-weddings":
    "https://res.cloudinary.com/dzerxindp/image/upload/v1767878596/BAL_1453_e7hd8w.jpg",
  "elopement-weddings":
    "https://res.cloudinary.com/dzerxindp/image/upload/v1767345590/Wedding_18_nnx6an.png",
  "luxury-weddings":
    "/images/venues/banner/signature-bg.png",
};
