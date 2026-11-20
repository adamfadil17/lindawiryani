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
import { revalidatePublicContent } from "@/lib/content/tags";
import { updateArticleSchema } from "@/utils";
import { resolveContentAccess } from "@/lib/content/access";
import {
  translationsReplace,
  publicationFields,
} from "@/lib/content/translations";
import { sanitizeRichText } from "@/lib/sanitize";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const access = await resolveContentAccess(req);
    if (access.response) return access.response;

    const { id } = await params;

    const article = await prisma.article.findUnique({
      where: { id },
      include: { translations: true },
    });
    if (!article || (!access.isStaff && article.status !== "published")) {
      return notFound("Article");
    }
    return ok(article);
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
    const dto = updateArticleSchema.parse(body);
    const { translations, status, ...base } = dto;

    const current = await prisma.article.findUnique({
      where: { id },
      select: { slug: true, status: true, first_published_at: true },
    });
    if (!current) return notFound("Article");

    const article = await prisma.article.update({
      where: { id: id },
      data: {
        ...base,
        ...(base.content !== undefined
          ? { content: sanitizeRichText(base.content) }
          : {}),
        ...publicationFields(status, current.first_published_at),
        ...(translations !== undefined
          ? { translations: translationsReplace("article", translations) }
          : {}),
      },
    });
    await revalidatePublicContent();
    return ok(article);
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

    await prisma.article.delete({ where: { id } });
    await revalidatePublicContent();
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
