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
import { updateWeddingExperienceSchema } from "@/utils";
import { toSlug, ensureUniqueSlug } from "@/utils/slug";
import { moveFromTemp } from "@/utils/file";
import path from "path";
import { existsSync } from "fs";
import { unlink } from "fs/promises";
import { de } from "zod/v4/locales";

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

const WEDDING_EXPERIENCE_INCLUDE = {
  faqs: { orderBy: { sort_order: "asc" as const } },
  venues: true,
  themes: true,
  portfolios: true,
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const experience = await prisma.weddingExperience.findUnique({
      where: { id },
      include: WEDDING_EXPERIENCE_INCLUDE,
    });
    if (!experience) return notFound("Wedding Experience");
    return ok(experience);
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

    const existing = await prisma.weddingExperience.findUnique({
      where: { id },
    });
    if (!existing) return notFound("Wedding Experience");

    const body = await req.json();
    const dto = updateWeddingExperienceSchema.parse(body);

    let slug: string | undefined;
    if (dto.name) {
      const baseSlug = toSlug(dto.name);
      slug = await ensureUniqueSlug(baseSlug, async (s) => {
        const existing = await prisma.weddingExperience.findUnique({
          where: { slug: s },
        });
        return !!existing && existing.id !== id;
      });
    }

    const finalSlug = slug ?? existing.slug;

    const hero_image =
      dto.hero_image && dto.hero_image !== existing.hero_image
        ? await moveFromTemp(dto.hero_image, `experiences/${finalSlug}`)
        : dto.hero_image;
    if (hero_image && hero_image !== existing.hero_image)
      await deleteFile(existing.hero_image);

    const approach_image =
      dto.approach_image && dto.approach_image !== existing.approach_image
        ? await moveFromTemp(dto.approach_image, `experiences/${finalSlug}`)
        : dto.approach_image;
    if (approach_image && approach_image !== existing.approach_image)
      await deleteFile(existing.approach_image);

    const closing_image =
      dto.closing_image && dto.closing_image !== existing.closing_image
        ? await moveFromTemp(dto.closing_image, `experiences/${finalSlug}`)
        : dto.closing_image;
    if (closing_image && closing_image !== existing.closing_image)
      await deleteFile(existing.closing_image);

    const intro_images = dto.intro_images
      ? await Promise.all(
          dto.intro_images.map((url: string) =>
            moveFromTemp(url, `experiences/${finalSlug}`),
          ),
        )
      : undefined;

    if (intro_images && existing.intro_images) {
      const oldUrls = existing.intro_images as string[];
      const removed = oldUrls.filter((url) => !intro_images.includes(url));
      await Promise.all(removed.map(deleteFile));
    }

    const experience = await prisma.weddingExperience.update({
      where: { id },
      data: {
        ...dto,
        ...(hero_image !== undefined && { hero_image }),
        ...(approach_image !== undefined && { approach_image }),
        ...(closing_image !== undefined && { closing_image }),
        ...(intro_images !== undefined && { intro_images }),
        ...(slug !== undefined && { slug }),
      },
      include: WEDDING_EXPERIENCE_INCLUDE,
    });
    return ok(experience);
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

    const existing = await prisma.weddingExperience.findUnique({
      where: { id },
    });
    if (!existing) return notFound("Wedding Experience");

    await deleteFile(existing.hero_image);
    await deleteFile(existing.approach_image);
    await deleteFile(existing.closing_image);
    await Promise.all((existing.intro_images as string[]).map(deleteFile));

    await prisma.weddingExperience.delete({ where: { id } });
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
