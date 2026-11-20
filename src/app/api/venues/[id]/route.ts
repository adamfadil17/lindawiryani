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
import { revalidatePublicContent } from "@/lib/content/tags";
import { updateVenueSchema } from "@/utils";
import { resolveContentAccess } from "@/lib/content/access";
import {
  translationsReplace,
  publicationFields,
} from "@/lib/content/translations";

const VENUE_INCLUDE = {
  destination: true,
  experience: true,
  gallery: { orderBy: { sort_order: "asc" as const } },
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

    const venue = await prisma.venue.findUnique({
      where: { id },
      include: VENUE_INCLUDE,
    });
    if (!venue || (!access.isStaff && venue.status !== "published")) {
      return notFound("Venue");
    }
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

    const payload = await requireAuth(req);
    requireRole(payload, "admin", "editor");

    const body = await req.json();
    const dto = updateVenueSchema.parse(body);
    const { translations, status, ...base } = dto;

    const current = await prisma.venue.findUnique({
      where: { id },
      select: { slug: true, status: true, first_published_at: true },
    });
    if (!current) return notFound("Venue");

    const venue = await prisma.venue.update({
      where: { id },
      data: {
        ...base,
        ...publicationFields(status, current.first_published_at),
        ...(translations !== undefined
          ? { translations: translationsReplace("venue", translations) }
          : {}),
      },
      include: VENUE_INCLUDE,
    });
    await revalidatePublicContent();
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

    const payload = await requireAuth(req);
    requireRole(payload, "admin");

    await prisma.$transaction(async (tx) => {
      await tx.venueImage.deleteMany({ where: { venue_id: id } });

      await tx.weddingTheme.updateMany({
        where: { venue_id: id },
        data: { venue_id: null },
      });

      await tx.portfolio.updateMany({
        where: { venue_id: id },
        data: { venue_id: null },
      });

      await tx.venue.delete({ where: { id } });
    });

    await revalidatePublicContent();
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
