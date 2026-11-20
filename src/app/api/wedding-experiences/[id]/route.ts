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
import { updateWeddingExperienceSchema } from "@/utils";
import { resolveContentAccess } from "@/lib/content/access";
import {
  translationsReplace,
  publicationFields,
} from "@/lib/content/translations";

const WEDDING_EXPERIENCE_INCLUDE = {
  faqs: {
    include: { translations: true },
    orderBy: { sort_order: "asc" as const },
  },
  venues: true,
  themes: true,
  portfolios: true,
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

    const experience = await prisma.weddingExperience.findUnique({
      where: { id },
      include: WEDDING_EXPERIENCE_INCLUDE,
    });
    if (!experience || (!access.isStaff && experience.status !== "published")) {
      return notFound("Wedding Experience");
    }
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

    const body = await req.json();
    const dto = updateWeddingExperienceSchema.parse(body);
    const { translations, status, ...base } = dto;

    const current = await prisma.weddingExperience.findUnique({
      where: { id },
      select: { slug: true, status: true },
    });
    if (!current) return notFound("Wedding experience");

    // D2: the slug follows the input and is immutable once published.
    if (dto.slug && dto.slug !== current.slug && current.status === "published") {
      return conflict("Slug cannot be changed after publish");
    }

    const experience = await prisma.weddingExperience.update({
      where: { id },
      data: {
        ...base,
        ...publicationFields(status),
        ...(translations !== undefined
          ? { translations: translationsReplace("experience", translations) }
          : {}),
      },
      include: WEDDING_EXPERIENCE_INCLUDE,
    });
    await revalidatePublicContent();
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

    await prisma.weddingExperience.delete({ where: { id } });
    await revalidatePublicContent();
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
