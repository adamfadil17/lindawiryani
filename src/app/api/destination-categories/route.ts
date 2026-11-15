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
  createDestinationCategorySchema,
  parsePagination,
  paginateQuery,
} from "@/utils";

const DESTINATION_CATEGORY_INCLUDE = {
  destinations: true,
};

export async function GET(req: NextRequest) {
  try {
    const { page, limit, search } = parsePagination(req.nextUrl.searchParams);

    const where: Record<string, unknown> = {};
    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }

    const { data, meta } = await paginateQuery(
      () => prisma.destinationCategory.count({ where }),
      (skip, take) =>
        prisma.destinationCategory.findMany({
          where,
          include: DESTINATION_CATEGORY_INCLUDE,
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
    const dto = createDestinationCategorySchema.parse(body);

    const category = await prisma.destinationCategory.create({
      data: {
        name: dto.name,
      },
      include: DESTINATION_CATEGORY_INCLUDE,
    });

    return created(category);
  } catch (error) {
    return handleError(error);
  }
}
