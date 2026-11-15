import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

import { handleError, created, requireAuth } from "@/lib";
import { ApiError } from "@/lib/auth";
import { MAX_UPLOAD_BYTES, detectImage, getUploadDir, getUploadUrlBase } from "@/lib/upload";

export const runtime = "nodejs";

/**
 * POST /api/upload  (multipart/form-data, field "file")
 * Saves a PNG/JPG to UPLOAD_DIR and returns its public URL, which is what
 * gets stored in the database instead of the image bytes.
 */
export async function POST(req: NextRequest) {
  try {
    await requireAuth(req);

    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) throw new ApiError(400, 'Missing "file" field');
    if (file.size === 0) throw new ApiError(400, "File is empty");
    if (file.size > MAX_UPLOAD_BYTES) throw new ApiError(400, "Image must be less than 5MB");

    const buffer = Buffer.from(await file.arrayBuffer());
    const image = detectImage(buffer);
    if (!image) throw new ApiError(400, "Only PNG or JPG images are allowed");

    const dir = getUploadDir();
    await fs.mkdir(dir, { recursive: true });

    const filename = `${randomUUID()}.${image.ext}`;
    await fs.writeFile(path.join(/*turbopackIgnore: true*/ dir, filename), buffer);

    return created({ url: `${getUploadUrlBase()}/${filename}`, filename, size: buffer.length });
  } catch (err) {
    return handleError(err);
  }
}
