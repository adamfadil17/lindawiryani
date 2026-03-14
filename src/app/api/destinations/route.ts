import { NextRequest } from "next/server";

import {
  prisma,
  handleError,
  paginated,
  requireAuth,
  requireRole,
  created,
} from "@/lib";
import {
  createDestinationSchema,
  parsePagination,
  paginateQuery,
} from "@/utils";
import { toSlug, ensureUniqueSlug } from "@/utils/slug";

const DESTINATION_INCLUDE = {
  category: true,
  venues: true,
  portfolios: true,
};

export async function GET(req: NextRequest) {
  try {
    const { page, limit, search } = parsePagination(req.nextUrl.searchParams);
    const categoryId = req.nextUrl.searchParams.get("categoryId") ?? undefined;
    const type = req.nextUrl.searchParams.get("type") ?? undefined;

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
      ];
    }
    if (categoryId) where.category_id = categoryId;
    if (type) where.type = type;

    const { data, meta } = await paginateQuery(
      () => prisma.destination.count({ where }),
      (skip, take) =>
        prisma.destination.findMany({
          where,
          include: DESTINATION_INCLUDE,
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
    const payload = requireAuth(req);
    requireRole(payload, "admin", "editor");

    const body = await req.json();
    const dto = createDestinationSchema.parse(body);

    const baseSlug = toSlug(dto.name);
    const slug = await ensureUniqueSlug(baseSlug, async (s) => {
      const existing = await prisma.destination.findUnique({ where: { slug: s } });
      return !!existing;
    });

    const destination = await prisma.destination.create({
      data: {
        name: dto.name,
        slug,
        category_id: dto.category_id,
        type: dto.type,
        description: dto.description,
        long_description: dto.long_description,
        location: dto.location,
        atmosphere: dto.atmosphere,
        accessibility_notes: dto.accessibility_notes,
        seasonal_considerations: dto.seasonal_considerations,
        image: dto.image,
        guest_capacity: dto.guest_capacity,
        highlights: dto.highlights,
        best_for: dto.best_for,
        ceremony_options: dto.ceremony_options,
        reception_options: dto.reception_options,
        accommodation_nearby: dto.accommodation_nearby,
        dining_experiences: dto.dining_experiences,
        unique_features: dto.unique_features,
      },
      include: DESTINATION_INCLUDE,
    });

    return created(destination);
  } catch (error) {
    return handleError(error);
  }
}