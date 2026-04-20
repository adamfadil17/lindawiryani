import { rename, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const UPLOAD_DIR =
  process.env.UPLOAD_DIR ?? path.join(process.cwd(), "public", "uploads");
const UPLOAD_URL_BASE = process.env.UPLOAD_URL_BASE ?? "/uploads";

export async function moveFromTemp(
  url: string,
  feature: string,
): Promise<string> {
  if (!url.startsWith(`${UPLOAD_URL_BASE}/temp/`)) return url;

  const filename = path.basename(url);
  const destDir = path.join(UPLOAD_DIR, feature);

  if (!existsSync(destDir)) {
    await mkdir(destDir, { recursive: true });
  }

  const srcPath = path.join(UPLOAD_DIR, "temp", filename);
  const destPath = path.join(destDir, filename);

  await rename(srcPath, destPath);

  return `${UPLOAD_URL_BASE}/${feature}/${filename}`;
}
