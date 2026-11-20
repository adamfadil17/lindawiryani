import { randomUUID } from "node:crypto";
import { mkdir, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Local (VPS) image storage.
 *
 * Files live outside the repo/public folder (UPLOAD_DIR) and are served at
 * UPLOAD_URL_BASE by nginx in production, or by the Next.js route in
 * `src/app/uploads/[...path]/route.ts` in development / when nginx is absent.
 */

export class UploadError extends Error {
  status = 400;
  constructor(message: string) {
    super(message);
    this.name = "UploadError";
  }
}

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export function getUploadRoot(): string {
  const configured = process.env.UPLOAD_DIR?.trim();
  if (!configured) {
    throw new Error(
      "UPLOAD_DIR is not set. Add it to your environment (see .env.example).",
    );
  }
  return path.resolve(configured);
}

export function getUploadUrlBase(): string {
  const configured = (process.env.UPLOAD_URL_BASE ?? "/uploads").trim();
  if (!configured) return "/uploads";

  if (/^https?:\/\//i.test(configured)) {
    return configured.replace(/\/+$/, "");
  }

  return `/${configured.replace(/^\/+|\/+$/g, "")}`;
}

export function getMaxUploadBytes(): number {
  const megabytes = Number(process.env.MAX_UPLOAD_SIZE_MB ?? 5);
  const safe = Number.isFinite(megabytes) && megabytes > 0 ? megabytes : 5;
  return Math.floor(safe * 1024 * 1024);
}

/** Detect image type from magic bytes — never trust the client MIME type. */
function detectImageExtension(buffer: Buffer): string | null {
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return ".jpg";
  }

  const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (buffer.length >= 8 && buffer.subarray(0, 8).equals(pngSignature)) {
    return ".png";
  }

  if (
    buffer.length >= 12 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return ".webp";
  }

  return null;
}

export interface SavedImage {
  url: string;
  bytes: number;
  contentType: string;
}

/**
 * Validates and writes an uploaded image.
 *
 * - size cap from MAX_UPLOAD_SIZE_MB
 * - real type from magic bytes (JPEG/PNG/WebP only)
 * - UUID filename (no user-controlled paths)
 * - `yyyy/mm` subfolders keep directories small
 * - atomic write (temp file + rename)
 */
export async function saveImage(file: File): Promise<SavedImage> {
  const maxBytes = getMaxUploadBytes();

  if (!file || file.size <= 0) {
    throw new UploadError("The uploaded file is empty.");
  }

  if (file.size > maxBytes) {
    throw new UploadError(
      `Image is too large. Maximum size is ${Math.floor(maxBytes / (1024 * 1024))} MB.`,
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  if (buffer.length > maxBytes) {
    throw new UploadError(
      `Image is too large. Maximum size is ${Math.floor(maxBytes / (1024 * 1024))} MB.`,
    );
  }

  const extension = detectImageExtension(buffer);
  if (!extension) {
    throw new UploadError("Unsupported image format. Use JPEG, PNG, or WebP.");
  }

  const now = new Date();
  const subdirectory = `${now.getUTCFullYear()}/${String(
    now.getUTCMonth() + 1,
  ).padStart(2, "0")}`;
  const filename = `${randomUUID()}${extension}`;

  const directory = path.join(getUploadRoot(), subdirectory);
  await mkdir(directory, { recursive: true });

  const destination = path.join(directory, filename);
  const temporary = `${destination}.${randomUUID()}.tmp`;

  try {
    await writeFile(temporary, buffer, { flag: "wx", mode: 0o644 });
    await rename(temporary, destination);
  } catch (error) {
    await unlink(temporary).catch(() => undefined);
    throw error;
  }

  return {
    url: `${getUploadUrlBase()}/${subdirectory}/${filename}`,
    bytes: buffer.length,
    contentType: CONTENT_TYPES[extension],
  };
}

/**
 * Maps URL path segments to an absolute file path under UPLOAD_DIR.
 * Returns null for anything dangerous (traversal, dotfiles, unknown extensions).
 */
export function resolveUploadPath(segments: string[]): string | null {
  if (segments.length === 0) return null;

  for (const segment of segments) {
    if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(segment)) return null;
    if (segment === "." || segment === "..") return null;
  }

  const extension = path.extname(segments[segments.length - 1]).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(extension)) return null;

  const root = getUploadRoot();
  const absolute = path.resolve(root, ...segments);

  if (absolute !== root && !absolute.startsWith(root + path.sep)) {
    return null;
  }

  return absolute;
}

export function getUploadContentType(filePath: string): string | null {
  const extension = path.extname(filePath).toLowerCase();
  return CONTENT_TYPES[extension] ?? null;
}
