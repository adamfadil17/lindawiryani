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
import { updateDestinationCategorySchema } from "@/utils";
import { resolveContentAccess } from "@/lib/content/access";
import {
  translationsReplace,
  publicationFields,
} from "@/lib/content/translations";

const DESTINATION_CATEGORY_INCLUDE = {
  destinations: true,
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

    const category = await prisma.destinationCategory.findUnique({
      where: { id },
      include: DESTINATION_CATEGORY_INCLUDE,
    });
    if (!category || (!access.isStaff && category.status !== "published")) {
      return notFound("Destination Category");
    }
    return ok(category);
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
    const dto = updateDestinationCategorySchema.parse(body);
    const { translations, status, ...base } = dto;

    const current = await prisma.destinationCategory.findUnique({
      where: { id },
      select: { slug: true, status: true },
    });
    if (!current) return notFound("Destination Category");

    // D2: the slug follows the input and is immutable once published.
    if (dto.slug && dto.slug !== current.slug && current.status === "published") {
      return conflict("Slug cannot be changed after publish");
    }

    const category = await prisma.destinationCategory.update({
      where: { id: id },
      data: {
        ...base,
        ...publicationFields(status),
        ...(translations !== undefined
          ? { translations: translationsReplace("category", translations) }
          : {}),
      },
      include: DESTINATION_CATEGORY_INCLUDE,
    });
    await revalidatePublicContent();
    return ok(category);
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

    await prisma.destinationCategory.delete({ where: { id } });
    await revalidatePublicContent();
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
