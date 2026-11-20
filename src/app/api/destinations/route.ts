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
import {
  createDestinationSchema,
  parsePagination,
  paginateQuery,
} from "@/utils";

const DESTINATION_INCLUDE = {
  category: true,
  venues: true,
  portfolios: true,
};

const PUBLIC_DESTINATION_SELECT = {
  id: true,
  slug: true,
  name: true,
  category_id: true,
  type: true,
  description: true,
  long_description: true,
  location: true,
  atmosphere: true,
  accessibility_notes: true,
  seasonal_considerations: true,
  image: true,
  guest_capacity: true,
  highlights: true,
  best_for: true,
  ceremony_options: true,
  reception_options: true,
  accommodation_nearby: true,
  dining_experiences: true,
  unique_features: true,
  published_at: true,
} as const;

export async function GET(req: NextRequest) {
  try {
    const access = await resolveContentAccess(req);
    if (access.response) return access.response;

    const { page, limit, search } = parsePagination(req.nextUrl.searchParams);
    const categoryId = req.nextUrl.searchParams.get("categoryId") ?? undefined;
    const type = req.nextUrl.searchParams.get("type") ?? undefined;

    const where: Record<string, unknown> = {};
    if (!access.isStaff) where.status = "published";
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
          ...(access.isStaff
            ? { include: DESTINATION_INCLUDE }
            : { select: PUBLIC_DESTINATION_SELECT }),
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
    const dto = createDestinationSchema.parse(body);

    const destination = await prisma.destination.create({
      data: {
        name: dto.name,
        slug: dto.slug,
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
        ...publicationFields(dto.status),
        translations: translationsCreate("destination", dto.translations),
      },
      include: DESTINATION_INCLUDE,
    });

    await revalidatePublicContent();
    return created(destination);
  } catch (error) {
    return handleError(error);
  }
}
