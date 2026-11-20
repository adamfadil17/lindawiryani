import { NextRequest } from "next/server";

import {
  badRequest,
  created,
  handleError,
  requireAuth,
  requireRole,
} from "@/lib";
import {
  consumeRateLimit,
  getClientIp,
  tooManyRequests,
} from "@/lib/rate-limit";
import { saveImage, UploadError } from "@/lib/uploads";

// `fs` needs the Node.js runtime (not Edge).
export const runtime = "nodejs";

/**
 * POST /api/uploads — admin-only image upload to local VPS storage.
 *
 * multipart/form-data with a single `file` field. Returns
 * `{ data: { url, bytes, contentType } }`; `url` is stored in the DB.
 */
export async function POST(req: NextRequest) {
  try {
    const payload = await requireAuth(req);
    requireRole(payload, "admin", "editor");

    const limit = consumeRateLimit({
      key: `uploads:${getClientIp(req)}`,
      limit: 60,
      windowMs: 60_000,
    });
    if (!limit.allowed) return tooManyRequests(limit);

    const contentType = req.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().startsWith("multipart/form-data")) {
      return badRequest("Expected multipart/form-data");
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return badRequest("Missing file field");
    }

    const saved = await saveImage(file);
    return created(saved);
  } catch (error) {
    if (error instanceof UploadError) {
      return badRequest(error.message);
    }

    return handleError(error);
  }
}
