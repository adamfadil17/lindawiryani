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
import { updatePortfolioSchema } from "@/utils";
import { toSlug, ensureUniqueSlug } from "@/utils/slug";
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

const PORTFOLIO_INCLUDE = {
  destination: true,
  venue: true,
  experience: true,
  gallery: { orderBy: { sort_order: "asc" as const } },
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
      include: PORTFOLIO_INCLUDE,
    });
    if (!portfolio) return notFound("Portfolio");
    return ok(portfolio);
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const payload = await requireAuth(req);
    requireRole(payload, "admin", "editor");

    const existing = await prisma.portfolio.findUnique({ where: { id } });
    if (!existing) return notFound("Portfolio");

    const body = await req.json();
    const dto = updatePortfolioSchema.parse(body);

    let slug: string | undefined;
    if (dto.couple) {
      const baseSlug = toSlug(dto.couple);
      slug = await ensureUniqueSlug(baseSlug, async (s) => {
        const existing = await prisma.portfolio.findUnique({
          where: { slug: s },
        });
        return !!existing && existing.id !== id;
      });
    }

    const finalSlug = slug ?? existing.slug;

    let image = dto.image;
    if (image && image !== existing.image) {
      image = await moveFromTemp(image, `portfolios/${finalSlug}`);
      await deleteFile(existing.image);
    }

    const portfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        ...dto,
        ...(image !== undefined && { image }),
        ...(slug !== undefined && { slug }),
      },
      include: PORTFOLIO_INCLUDE,
    });
    return ok(portfolio);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const payload = await requireAuth(req);
    requireRole(payload, "admin");

    const existing = await prisma.portfolio.findUnique({
      where: { id },
      include: { gallery: true },
    });
    if (!existing) return notFound("Portfolio");

    await deleteFile(existing.image);
    await Promise.all(existing.gallery.map((g) => deleteFile(g.url)));

    await prisma.portfolio.delete({ where: { id } });

    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
