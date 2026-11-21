import { z } from "zod";

/**
 * Image values may be either:
 * - a full http(s) URL (Cloudinary, placehold, an external CDN), or
 * - a local upload path served by the app/nginx, e.g. `/uploads/2026/11/file.jpg`.
 *
 * `z.string().url()` rejects the relative `/uploads/...` form, which is exactly
 * what the admin image uploader returns when `UPLOAD_URL_BASE=/uploads`.
 * Keeping the value relative is deliberate: it stays valid across local,
 * staging and production domains.
 */
export const imageUrlSchema = z.string().refine(
  (value) => {
    if (!value || value !== value.trim()) return false;

    if (value.startsWith("/uploads/")) {
      return /^\/uploads\/(?:[A-Za-z0-9][A-Za-z0-9._-]*\/)*[A-Za-z0-9][A-Za-z0-9._-]*$/.test(
        value,
      );
    }

    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  },
  { message: "Invalid image URL" },
);
