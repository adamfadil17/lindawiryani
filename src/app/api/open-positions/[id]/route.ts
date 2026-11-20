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
import { resolveContentAccess } from "@/lib/content/access";
import { updateOpenPositionSchema } from "@/utils";
import {
  translationsReplace,
  publicationFields,
} from "@/lib/content/translations";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const access = await resolveContentAccess(req);
    if (access.response) return access.response;

    const { id } = await params;
    const position = await prisma.openPosition.findUnique({
      where: { id },
      include: { translations: true },
    });
    if (
      !position ||
      (!access.isStaff && (position.status !== "published" || !position.is_active))
    ) {
      return notFound("Open Position");
    }
    return ok(position);
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
    const dto = updateOpenPositionSchema.parse(body);
    const { translations, status, ...base } = dto;

    const current = await prisma.openPosition.findUnique({
      where: { id },
      select: { slug: true, status: true },
    });
    if (!current) return notFound("Open position");

    // D2: the slug follows the input and is immutable once published.
    if (dto.slug && dto.slug !== current.slug && current.status === "published") {
      return conflict("Slug cannot be changed after publish");
    }

    const position = await prisma.openPosition.update({
      where: { id },
      data: {
        ...base,
        ...publicationFields(status),
        ...(translations !== undefined
          ? { translations: translationsReplace("position", translations) }
          : {}),
      },
    });
    await revalidatePublicContent();
    return ok(position);
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

    await prisma.openPosition.delete({ where: { id } });
    await revalidatePublicContent();
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
