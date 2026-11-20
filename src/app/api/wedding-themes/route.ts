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
import {
  createWeddingThemeSchema,
  parsePagination,
  paginateQuery,
} from "@/utils";

const WEDDING_THEME_INCLUDE = {
  venue: true,
  experience: true,
  gallery: { orderBy: { sort_order: "asc" as const } },
};

export async function GET(req: NextRequest) {
  try {
    const access = await resolveContentAccess(req);
    if (access.response) return access.response;

    const { page, limit, search } = parsePagination(req.nextUrl.searchParams);
    const venueId = req.nextUrl.searchParams.get("venueId") ?? undefined;
    const experienceId =
      req.nextUrl.searchParams.get("experienceId") ?? undefined;

    const where: Record<string, unknown> = {};
    if (!access.isStaff) where.status = "published";
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }
    if (venueId) where.venue_id = venueId;
    if (experienceId) where.experience_id = experienceId;

    const { data, meta } = await paginateQuery(
      () => prisma.weddingTheme.count({ where }),
      (skip, take) =>
        prisma.weddingTheme.findMany({
          where,
          ...(access.isStaff
            ? { include: WEDDING_THEME_INCLUDE }
            : {
                select: {
                  id: true,
                  slug: true,
                  title: true,
                  description: true,
                  image: true,
                  inclusions: true,
                  venue_id: true,
                  experience_id: true,
                  published_at: true,
                },
              }),
          skip,
          take,
          orderBy: { title: "asc" },
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
    const dto = createWeddingThemeSchema.parse(body);

    const theme = await prisma.weddingTheme.create({
      data: {
        slug: dto.slug,
        title: dto.title,
        description: sanitizeRichText(dto.description),
        image: dto.image,
        inclusions: dto.inclusions,
        venue_id: dto.venue_id ?? null,
        experience_id: dto.experience_id,
        ...publicationFields(dto.status),
        translations: translationsCreate("theme", dto.translations),
      },
      include: WEDDING_THEME_INCLUDE,
    });

    await revalidatePublicContent();
    return created(theme);
  } catch (error) {
    return handleError(error);
  }
}
