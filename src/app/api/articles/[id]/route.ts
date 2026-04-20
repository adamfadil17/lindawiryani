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
import { updateArticleSchema } from "@/utils";
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

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const article = await prisma.article.findUnique({
      where: { id },
    });
    if (!article) return notFound("Article");
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

    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) return notFound("Article");

    const body = await req.json();
    const dto = updateArticleSchema.parse(body);

    let slug: string | undefined;
    if (dto.title) {
      const baseSlug = toSlug(dto.title);
      slug = await ensureUniqueSlug(baseSlug, async (s) => {
        const existing = await prisma.article.findUnique({
          where: { slug: s },
        });
        return !!existing && existing.id !== id;
      });
    }

    const finalSlug = slug ?? existing.slug;

    let image = dto.image;
    if (image && image !== existing.image) {
      image = await moveFromTemp(image, `articles/${finalSlug}`);
      await deleteFile(existing.image);
    }

    const article = await prisma.article.update({
      where: { id: id },
      data: {
        ...dto,
        ...(image !== undefined && { image }),
        ...(slug !== undefined && { slug }),
      },
    });
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

    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) return notFound("Article");

    await deleteFile(existing.image);

    await prisma.article.delete({ where: { id } });
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
