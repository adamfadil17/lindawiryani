import { NextRequest } from "next/server";

import { prisma, handleError, requireAuth, requireRole, notFound, ok, noContent } from "@/lib";

import { updateVenueSchema } from "@/utils";

const VENUE_INCLUDE = {
  location: { include: { parent: true } },
  wedding_theme: true,
  images: { orderBy: { sort_order: "asc" as const } },
};

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const venue = await prisma.venue.findUnique({
      where: { id: params.id },
      include: VENUE_INCLUDE,
    });
    if (!venue) return notFound("Venue");
    return ok(venue);
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const payload = requireAuth(req);
    requireRole(payload, "admin", "editor");

    const body = await req.json();
    const dto = updateVenueSchema.parse(body);

    const venue = await prisma.venue.update({
      where: { id: params.id },
      data: dto,
      include: VENUE_INCLUDE,
    });
    return ok(venue);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const payload = requireAuth(req);
    requireRole(payload, "admin");

    await prisma.venue.delete({ where: { id: params.id } });
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
