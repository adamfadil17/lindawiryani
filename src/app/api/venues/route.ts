import { NextRequest } from "next/server";

import {
  prisma,
  handleError,
  paginated,
  requireAuth,
  requireRole,
  created,
} from "@/lib";
import { revalidatePublicContent } from "@/lib/content/tags";
import { resolveContentAccess } from "@/lib/content/access";
import {
  translationsCreate,
  publicationFields,
} from "@/lib/content/translations";
import { sanitizeRichText } from "@/lib/sanitize";
import { createVenueSchema, parsePagination, paginateQuery } from "@/utils";

const VENUE_INCLUDE = {
  destination: true,
  experience: true,
  gallery: { orderBy: { sort_order: "asc" as const } },
  themes: true,
  portfolios: true,
};

export async function GET(req: NextRequest) {
  try {
    const access = await resolveContentAccess(req);
    if (access.response) return access.response;

    const { page, limit, search } = parsePagination(req.nextUrl.searchParams);
    const destinationId =
      req.nextUrl.searchParams.get("destinationId") ?? undefined;
    const experienceId =
      req.nextUrl.searchParams.get("experienceId") ?? undefined;

    const where: Record<string, unknown> = {};
    if (!access.isStaff) where.status = "published";
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
          ...(access.isStaff
            ? { include: VENUE_INCLUDE }
            : {
                select: {
                  id: true,
                  slug: true,
                  name: true,
                  slogan: true,
                  description: true,
                  image: true,
                  capacity: true,
                  starting_price: true,
                  destination_id: true,
                  experience_id: true,
                  published_at: true,
                },
              }),
          skip,
          take,
          orderBy: { name: "asc" },
        } as never),
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

    const venue = await prisma.venue.create({
      data: {
        slug: dto.slug,
        name: dto.name,
        slogan: dto.slogan,
        description: sanitizeRichText(dto.description),
        image: dto.image,
        capacity: dto.capacity,
        starting_price: dto.starting_price,
        destination_id: dto.destination_id,
        experience_id: dto.experience_id,
        ...publicationFields(dto.status),
        translations: translationsCreate("venue", dto.translations),
      },
      include: VENUE_INCLUDE,
    });

    await revalidatePublicContent();
    return created(venue);
  } catch (error) {
    return handleError(error);
  }
}
