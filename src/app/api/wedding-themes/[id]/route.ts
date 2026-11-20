import { NextRequest } from "next/server";

import {
  prisma,
  handleError,
  conflict,
  requireAuth,
  requireRole,
  notFound,
  ok,
  noContent,
} from "@/lib";
import { revalidatePublicContent } from "@/lib/content/tags";
import { updateWeddingThemeSchema } from "@/utils";
import { resolveContentAccess } from "@/lib/content/access";
import {
  translationsReplace,
  publicationFields,
} from "@/lib/content/translations";
import { sanitizeRichText } from "@/lib/sanitize";

const WEDDING_THEME_INCLUDE = {
  venue: true,
  experience: true,
  gallery: { orderBy: { sort_order: "asc" as const } },
  translations: true,
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const access = await resolveContentAccess(req);
    if (access.response) return access.response;

    const { id } = await params;

    const theme = await prisma.weddingTheme.findUnique({
      where: { id },
      include: WEDDING_THEME_INCLUDE,
    });
    if (!theme || (!access.isStaff && theme.status !== "published")) {
      return notFound("Wedding Theme");
    }
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
    const { translations, status, ...base } = dto;

    const current = await prisma.weddingTheme.findUnique({
      where: { id },
      select: { slug: true, status: true },
    });
    if (!current) return notFound("Wedding theme");

    // D2: the slug follows the input and is immutable once published.
    if (dto.slug && dto.slug !== current.slug && current.status === "published") {
      return conflict("Slug cannot be changed after publish");
    }

    const theme = await prisma.weddingTheme.update({
      where: { id },
      data: {
        ...base,
        ...(typeof base.description === "string"
          ? { description: sanitizeRichText(base.description) }
          : {}),
        ...publicationFields(status),
        ...(translations !== undefined
          ? { translations: translationsReplace("theme", translations) }
          : {}),
      },
      include: WEDDING_THEME_INCLUDE,
    });
    await revalidatePublicContent();
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

    await revalidatePublicContent();
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
