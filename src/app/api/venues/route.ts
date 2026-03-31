import { NextRequest } from "next/server";

import {
  prisma,
  handleError,
  paginated,
  requireAuth,
  requireRole,
  created,
} from "@/lib";
import { createVenueSchema, parsePagination, paginateQuery } from "@/utils";
import { toSlug, ensureUniqueSlug } from "@/utils/slug";

const VENUE_INCLUDE = {
  destination: true,
  experience: true,
  gallery: { orderBy: { sort_order: "asc" as const } },
  themes: true,
  portfolios: true,
};

export async function GET(req: NextRequest) {
  try {
    const { page, limit, search } = parsePagination(req.nextUrl.searchParams);
    const destinationId =
      req.nextUrl.searchParams.get("destinationId") ?? undefined;
    const experienceId =
      req.nextUrl.searchParams.get("experienceId") ?? undefined;

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { slogan: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }
    if (destinationId) where.destination_id = destinationId;
    if (experienceId) where.experience_id = experienceId;

    const { data, meta } = await paginateQuery(
      () => prisma.venue.count({ where }),
      (skip, take) =>
        prisma.venue.findMany({
          where,
          include: VENUE_INCLUDE,
          skip,
          take,
          orderBy: { name: "asc" },
        }),
      page,
      limit,
    );

    return paginated(data, meta);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await requireAuth(req);
    requireRole(payload, "admin", "editor");

    const body = await req.json();
    const dto = createVenueSchema.parse(body);

    const baseSlug = toSlug(dto.name);
    const slug = await ensureUniqueSlug(baseSlug, async (s) => {
      const existing = await prisma.venue.findUnique({ where: { slug: s } });
      return !!existing;
    });

    const venue = await prisma.venue.create({
      data: {
        slug,
        name: dto.name,
        slogan: dto.slogan,
        description: dto.description,
        image: dto.image,
        capacity: dto.capacity,
        starting_price: dto.starting_price,
        destination_id: dto.destination_id,
        experience_id: dto.experience_id,
      },
      include: VENUE_INCLUDE,
    });

    return created(venue);
  } catch (error) {
    return handleError(error);
  }
}
