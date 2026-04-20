import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { requireAuth, requireRole, handleError } from "@/lib";

const UPLOAD_DIR =
  process.env.UPLOAD_DIR ?? path.join(process.cwd(), "public", "uploads");
const UPLOAD_URL_BASE = process.env.UPLOAD_URL_BASE ?? "/uploads";

export async function DELETE(req: NextRequest) {
  try {
    const payload = await requireAuth(req);
    requireRole(payload, "admin", "editor");

    const { url } = (await req.json()) as { url: string };

    if (!url || !url.startsWith(UPLOAD_URL_BASE)) {
      return NextResponse.json({ error: "Invalid file URL" }, { status: 400 });
    }

    const relativePath = url.slice(UPLOAD_URL_BASE.length);
    const filepath = path.join(UPLOAD_DIR, relativePath);

    if (existsSync(filepath)) {
      await unlink(filepath);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleError(error);
  }
}
