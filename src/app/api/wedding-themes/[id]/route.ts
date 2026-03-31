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
import { updateWeddingThemeSchema } from "@/utils";
import { toSlug, ensureUniqueSlug } from "@/utils/slug";

const WEDDING_THEME_INCLUDE = {
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

    const theme = await prisma.weddingTheme.findUnique({
      where: { id },
      include: WEDDING_THEME_INCLUDE,
    });
    if (!theme) return notFound("Wedding Theme");
    return ok(theme);
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

    const body = await req.json();
    const dto = updateWeddingThemeSchema.parse(body);

    let slug: string | undefined;
    if (dto.title) {
      const baseSlug = toSlug(dto.title);
      slug = await ensureUniqueSlug(baseSlug, async (s) => {
        const existing = await prisma.weddingTheme.findUnique({
          where: { slug: s },
        });
        return !!existing && existing.id !== id;
      });
    }

    const theme = await prisma.weddingTheme.update({
      where: { id },
      data: {
        ...dto,
        ...(slug !== undefined && { slug }),
      },
      include: WEDDING_THEME_INCLUDE,
    });
    return ok(theme);
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

    const existing = await prisma.weddingTheme.findUnique({ where: { id } });
    if (!existing) return notFound("Wedding Theme");

    await prisma.$transaction(async (tx) => {
      await tx.weddingThemeImage.deleteMany({ where: { theme_id: id } });
      await tx.weddingTheme.delete({ where: { id } });
    });

    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
