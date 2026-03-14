import { NextRequest } from "next/server";

import { prisma, handleError, requireAuth, requireRole, notFound, ok, noContent } from "@/lib";
import { updateArticleSchema } from "@/utils";
import { toSlug, ensureUniqueSlug } from "@/utils/slug";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: params.id },
    });
    if (!article) return notFound("Article");
    return ok(article);
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const payload = requireAuth(req);
    requireRole(payload, "admin", "editor");

    const body = await req.json();
    const dto = updateArticleSchema.parse(body);

    let slug: string | undefined;
    if (dto.title) {
      const baseSlug = toSlug(dto.title);
      slug = await ensureUniqueSlug(baseSlug, async (s) => {
        const existing = await prisma.article.findUnique({ where: { slug: s } });
        return !!existing && existing.id !== params.id;
      });
    }

    const article = await prisma.article.update({
      where: { id: params.id },
      data: {
        ...dto,
        ...(slug !== undefined && { slug }),
      },
    });
    return ok(article);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const payload = requireAuth(req);
    requireRole(payload, "admin");

    await prisma.article.delete({ where: { id: params.id } });
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}