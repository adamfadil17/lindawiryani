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
    const payload = requireAuth(req);
    requireRole(payload, "admin", "editor");

    const body = await req.json();
    const dto = updateWeddingExperienceSchema.parse(body);

    let slug: string | undefined;
    if (dto.name) {
      const baseSlug = toSlug(dto.name);
      slug = await ensureUniqueSlug(baseSlug, async (s) => {
        const existing = await prisma.weddingExperience.findUnique({ where: { slug: s } });
        return !!existing && existing.id !== id;
      });
    }

    const experience = await prisma.weddingExperience.update({
      where: { id },
      data: {
        ...dto,
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

    const payload = requireAuth(req);
    requireRole(payload, "admin");

    await prisma.weddingExperience.delete({ where: { id } });
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}