import { NextRequest } from "next/server";

import {
  prisma,
  handleError,
  requireAuth,
  requireRole,
  notFound,
  ok,
  noContent,
} from "@/lib";
import { updatePortfolioImageSchema } from "@/utils";
import path from "path";
import { existsSync } from "fs";
import { unlink } from "fs/promises";
import { moveFromTemp } from "@/utils/file";

const UPLOAD_DIR =
  process.env.UPLOAD_DIR ?? path.join(process.cwd(), "public", "uploads");
const UPLOAD_URL_BASE = process.env.UPLOAD_URL_BASE ?? "/uploads";

async function deleteFile(url: string) {
  if (!url || !url.startsWith(UPLOAD_URL_BASE)) return;
  const relativePath = url.slice(UPLOAD_URL_BASE.length);
  const filepath = path.join(UPLOAD_DIR, relativePath);
  if (existsSync(filepath)) {
    await unlink(filepath).catch(() => {});
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> },
) {
  try {
    const { id, imageId } = await params;

    const image = await prisma.portfolioImage.findUnique({
      where: { id: imageId },
    });
    if (!image || image.portfolio_id !== id) return notFound("Portfolio Image");
    return ok(image);
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> },
) {
  try {
    const { id, imageId } = await params;

    const payload = await requireAuth(req);
    requireRole(payload, "admin", "editor");

    const existing = await prisma.portfolioImage.findUnique({
      where: { id: imageId },
    });
    if (!existing || existing.portfolio_id !== id)
      return notFound("Portfolio Image");

    const body = await req.json();
    const dto = updatePortfolioImageSchema.parse(body);

    if (dto.url && dto.url !== existing.url) {
      const portfolio = await prisma.portfolio.findUnique({
        where: { id },
        select: { slug: true },
      });

      dto.url = await moveFromTemp(
        dto.url,
        `portfolios/${portfolio!.slug}/gallery`,
      );
      await deleteFile(existing.url);
    }

    const image = await prisma.portfolioImage.update({
      where: { id: imageId },
      data: dto,
    });
    return ok(image);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> },
) {
  try {
    const { id, imageId } = await params;

    const payload = await requireAuth(req);
    requireRole(payload, "admin");

    const existing = await prisma.portfolioImage.findUnique({
      where: { id: imageId },
    });
    if (!existing || existing.portfolio_id !== id)
      return notFound("Portfolio Image");

    await deleteFile(existing.url);

    await prisma.portfolioImage.delete({ where: { id: imageId } });
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
