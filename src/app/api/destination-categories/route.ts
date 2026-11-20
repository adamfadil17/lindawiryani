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
import {
  createDestinationCategorySchema,
  parsePagination,
  paginateQuery,
} from "@/utils";
import { toSlug } from "@/utils/slug";
import { resolveContentAccess } from "@/lib/content/access";
import {
  translationsCreate,
  publicationFields,
} from "@/lib/content/translations";

const DESTINATION_CATEGORY_INCLUDE = {
  destinations: true,
};

export async function GET(req: NextRequest) {
  try {
    const access = await resolveContentAccess(req);
    if (access.response) return access.response;

    const { page, limit, search } = parsePagination(req.nextUrl.searchParams);

    const where: Record<string, unknown> = {};
    if (!access.isStaff) where.status = "published";
    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }

    const { data, meta } = await paginateQuery(
      () => prisma.destinationCategory.count({ where }),
      (skip, take) =>
        prisma.destinationCategory.findMany({
          where,
          ...(access.isStaff
            ? { include: DESTINATION_CATEGORY_INCLUDE }
            : { select: { id: true, slug: true, name: true, published_at: true } }),
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
    const dto = createDestinationCategorySchema.parse(body);

    const category = await prisma.destinationCategory.create({
      data: {
        name: dto.name,
        slug: dto.slug ?? toSlug(dto.name),
        ...publicationFields(dto.status),
        translations: translationsCreate("category", dto.translations),
      },
      include: DESTINATION_CATEGORY_INCLUDE,
    });

    await revalidatePublicContent();
    return created(category);
  } catch (error) {
    return handleError(error);
  }
}
