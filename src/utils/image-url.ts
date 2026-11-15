import { z } from "zod";

/**
 * Image reference stored in the database: either a file uploaded through
 * /api/upload ("/uploads/<uuid>.png") or an absolute http(s) URL (e.g. Cloudinary).
 * Data URLs are deliberately rejected so image bytes never end up in a table.
 */
export const imageUrlSchema = (message = "Invalid image URL") =>
  z.string().refine((v) => {
    if (v.startsWith("/uploads/")) return !v.includes("..") && !v.includes("\\");
    return /^https?:\/\//i.test(v) && z.string().url().safeParse(v).success;
  }, message);
