import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

import { MIME_BY_EXT, getUploadDir } from "@/lib/upload";

export const runtime = "nodejs";

// Files are only ever written by /api/upload as "<uuid>.<png|jpg>", so accept nothing else.
const SAFE_NAME = /^[a-f0-9-]{36}\.(png|jpg|jpeg)$/i;

/**
 * Next's production server only serves files that existed in /public at build
 * time, so files uploaded while running are served from disk by this route.
 */
export async function GET(_req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await ctx.params;
  if (segments.length !== 1 || !SAFE_NAME.test(segments[0])) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const file = await fs.readFile(path.join(/*turbopackIgnore: true*/ getUploadDir(), segments[0]));
    const ext = segments[0].split(".").pop()!.toLowerCase();
    return new NextResponse(new Uint8Array(file), {
      headers: {
        "Content-Type": MIME_BY_EXT[ext] ?? "application/octet-stream",
        // Filenames are random UUIDs and never overwritten, so they can be cached forever.
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
