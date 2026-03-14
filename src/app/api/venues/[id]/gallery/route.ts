import { NextRequest } from "next/server";

import {
  prisma,
  handleError,
  paginated,
  requireAuth,
  requireRole,
  created,
  notFound,
} from "@/lib";
import {
  createVenueImageSchema,
  parsePagination,
  paginateQuery,
} from "@/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const venue = await prisma.venue.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!venue) return notFound("Venue");

    const { page, limit } = parsePagination(req.nextUrl.searchParams);

    const where = { venue_id: id };

    const { data, meta } = await paginateQuery(
      () => prisma.venueImage.count({ where }),
      (skip, take) =>
        prisma.venueImage.findMany({
          where,
          skip,
          take,
          orderBy: { sort_order: "asc" },
        }),
      page,
      limit,
    );

    return paginated(data, meta);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const payload = requireAuth(req);
    requireRole(payload, "admin", "editor");

    const venue = await prisma.venue.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!venue) return notFound("Venue");

    const body = await req.json();
    const dto = createVenueImageSchema.parse({ ...body, venue_id: id });

    const image = await prisma.venueImage.create({
      data: {
        venue_id: dto.venue_id,
        url: dto.url,
        sort_order: dto.sort_order,
      },
    });

    return created(image);
  } catch (error) {
    return handleError(error);
  }
}
