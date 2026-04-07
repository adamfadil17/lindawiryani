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
  createDestinationLocationSchema,
  parsePagination,
  paginateQuery,
} from "@/utils";
import { toSlug, ensureUniqueSlug } from "@/utils/slug";

const DESTINATION_LOCATION_INCLUDE = {
  category: true,
  destinations: true,
};

export async function GET(req: NextRequest) {
  try {
    const { page, limit, search } = parsePagination(req.nextUrl.searchParams);
    const categoryId = req.nextUrl.searchParams.get("categoryId") ?? undefined;

    const where: Record<string, unknown> = {};
    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }
    if (categoryId) where.category_id = categoryId;

    const { data, meta } = await paginateQuery(
      () => prisma.destinationLocation.count({ where }),
      (skip, take) =>
        prisma.destinationLocation.findMany({
          where,
          include: DESTINATION_LOCATION_INCLUDE,
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
    const dto = createDestinationLocationSchema.parse(body);

    const baseSlug = toSlug(dto.name);
    const slug = await ensureUniqueSlug(baseSlug, async (s) => {
      const existing = await prisma.destinationLocation.findUnique({
        where: { slug: s },
      });
      return !!existing;
    });

    const location = await prisma.destinationLocation.create({
      data: {
        name: dto.name,
        slug,
        category_id: dto.category_id,
      },
      include: DESTINATION_LOCATION_INCLUDE,
    });

    return created(location);
  } catch (error) {
    return handleError(error);
  }
}