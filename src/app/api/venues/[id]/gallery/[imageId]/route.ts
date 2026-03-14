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
import { updateVenueImageSchema } from "@/utils";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> },
) {
  try {
    const { id, imageId } = await params;

    const image = await prisma.venueImage.findUnique({
      where: { id: imageId },
    });
    if (!image || image.venue_id !== id) return notFound("Venue Image");
    return ok(image);
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> },
) {
  try {
    const { id, imageId } = await params;

    const payload = requireAuth(req);
    requireRole(payload, "admin", "editor");

    const existing = await prisma.venueImage.findUnique({
      where: { id: imageId },
      select: { venue_id: true },
    });
    if (!existing || existing.venue_id !== id) return notFound("Venue Image");

    const body = await req.json();
    const dto = updateVenueImageSchema.parse(body);

    const image = await prisma.venueImage.update({
      where: { id: imageId },
      data: dto,
    });
    return ok(image);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> },
) {
  try {
    const { id, imageId } = await params;

    const payload = requireAuth(req);
    requireRole(payload, "admin");

    const existing = await prisma.venueImage.findUnique({
      where: { id: imageId },
      select: { venue_id: true },
    });
    if (!existing || existing.venue_id !== id) return notFound("Venue Image");

    await prisma.venueImage.delete({ where: { id: imageId } });
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
