import path from "path";

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

/** Absolute directory uploaded files are written to (UPLOAD_DIR is relative to the project root). */
export function getUploadDir(): string {
  const configured = process.env.UPLOAD_DIR || "/public/uploads";
  return path.join(/*turbopackIgnore: true*/ process.cwd(), configured.replace(/^[/\\]+/, ""));
}

/** Public URL prefix stored in the database, e.g. "/uploads". */
export function getUploadUrlBase(): string {
  return (process.env.UPLOAD_URL_BASE || "/uploads").replace(/\/+$/, "");
}

export type DetectedImage = { ext: "png" | "jpg"; mime: "image/png" | "image/jpeg" };

/** Identify the real image type from the file's magic bytes (never trust the client's MIME type). */
export function detectImage(buf: Buffer): DetectedImage | null {
  if (
    buf.length > 8 &&
    buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  ) {
    return { ext: "png", mime: "image/png" };
  }
  if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return { ext: "jpg", mime: "image/jpeg" };
  }
  return null;
}

export const MIME_BY_EXT: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
};
