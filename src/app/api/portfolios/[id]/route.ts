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

    const payload = requireAuth(req);
    requireRole(payload, "admin", "editor");

    const body = await req.json();
    const dto = updatePortfolioSchema.parse(body);

    // Auto-regenerate slug jika couple ikut diupdate
    let slug: string | undefined;
    if (dto.couple) {
      const baseSlug = toSlug(dto.couple);
      slug = await ensureUniqueSlug(baseSlug, async (s) => {
        const existing = await prisma.portfolio.findUnique({ where: { slug: s } });
        // Skip slug milik diri sendiri
        return !!existing && existing.id !== id;
      });
    }

    const portfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        ...dto,
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

    const payload = requireAuth(req);
    requireRole(payload, "admin");

    await prisma.portfolio.delete({ where: { id } });
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}