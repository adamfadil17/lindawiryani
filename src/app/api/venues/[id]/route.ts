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
import { updateVenueSchema } from "@/utils";
import { toSlug, ensureUniqueSlug } from "@/utils/slug";

const VENUE_INCLUDE = {
  destination: true,
  experience: true,
  gallery: { orderBy: { sort_order: "asc" as const } },
  themes: true,
  portfolios: true,
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const venue = await prisma.venue.findUnique({
      where: { id },
      include: VENUE_INCLUDE,
    });
    if (!venue) return notFound("Venue");
    return ok(venue);
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
    const dto = updateVenueSchema.parse(body);

    // Auto-regenerate slug jika name ikut diupdate
    let slug: string | undefined;
    if (dto.name) {
      const baseSlug = toSlug(dto.name);
      slug = await ensureUniqueSlug(baseSlug, async (s) => {
        const existing = await prisma.venue.findUnique({ where: { slug: s } });
        // Skip slug milik diri sendiri
        return !!existing && existing.id !== id;
      });
    }

    const venue = await prisma.venue.update({
      where: { id },
      data: {
        ...dto,
        ...(slug !== undefined && { slug }),
      },
      include: VENUE_INCLUDE,
    });
    return ok(venue);
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

    await prisma.venue.delete({ where: { id } });
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}