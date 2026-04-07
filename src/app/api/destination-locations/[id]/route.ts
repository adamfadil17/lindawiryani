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
import { updateDestinationLocationSchema } from "@/utils";
import { toSlug, ensureUniqueSlug } from "@/utils/slug";

const DESTINATION_LOCATION_INCLUDE = {
  category: true,
  destinations: true,
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const location = await prisma.destinationLocation.findUnique({
      where: { id },
      include: DESTINATION_LOCATION_INCLUDE,
    });
    if (!location) return notFound("Destination Location");
    return ok(location);
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
    const dto = updateDestinationLocationSchema.parse(body);

    let slug: string | undefined;
    if (dto.name) {
      const baseSlug = toSlug(dto.name);
      slug = await ensureUniqueSlug(baseSlug, async (s) => {
        const existing = await prisma.destinationLocation.findUnique({
          where: { slug: s },
        });
        return !!existing && existing.id !== id;
      });
    }

    const location = await prisma.destinationLocation.update({
      where: { id },
      data: {
        ...dto,
        ...(slug !== undefined && { slug }),
      },
      include: DESTINATION_LOCATION_INCLUDE,
    });
    return ok(location);
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

    const existing = await prisma.destinationLocation.findUnique({
      where: { id },
    });
    if (!existing) return notFound("Destination Location");

    await prisma.destinationLocation.delete({ where: { id } });
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
