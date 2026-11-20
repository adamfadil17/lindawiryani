import { readFile, stat } from "node:fs/promises";
import { NextRequest } from "next/server";

import {
  getUploadContentType,
  resolveUploadPath,
} from "@/lib/uploads";

export const runtime = "nodejs";

function notFound(): Response {
  return new Response("Not found", { status: 404 });
}

/**
 * Development / no-nginx fallback for local uploads.
 *
 * Production serves UPLOAD_DIR directly from nginx at UPLOAD_URL_BASE
 * for better throughput, but this route keeps `npm run dev` working
 * without any extra setup.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const segments = (await params).path;
    const absolutePath = resolveUploadPath(segments);
    if (!absolutePath) return notFound();

    const info = await stat(absolutePath);
    if (!info.isFile()) return notFound();

    const contentType = getUploadContentType(absolutePath);
    if (!contentType) return notFound();

    const data = await readFile(absolutePath);

    return new Response(data, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(info.size),
        // Filenames are UUIDs and never change.
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return notFound();
  }
}
