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
  createWeddingThemeSchema,
  parsePagination,
  paginateQuery,
} from "@/utils";
import { toSlug, ensureUniqueSlug } from "@/utils/slug";
import { moveFromTemp } from "@/utils/file";

const WEDDING_THEME_INCLUDE = {
  venue: {
    include: {
      gallery: { orderBy: { sort_order: "asc" as const } },
      destination: true,
    },
  },
  experience: true,
  gallery: { orderBy: { sort_order: "asc" as const } },
};

export async function GET(req: NextRequest) {
  try {
    const { page, limit, search } = parsePagination(req.nextUrl.searchParams);
    const venueId = req.nextUrl.searchParams.get("venueId") ?? undefined;
    const experienceId =
      req.nextUrl.searchParams.get("experienceId") ?? undefined;
    const experienceCategory =
      req.nextUrl.searchParams.get("experienceCategory") ?? undefined;

    const where: Record<string, unknown> = {};
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
          include: WEDDING_THEME_INCLUDE,
          skip,
          take,
          orderBy: { title: "asc" },
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
    const dto = createWeddingThemeSchema.parse(body);

    const baseSlug = toSlug(dto.title);
    const slug = await ensureUniqueSlug(baseSlug, async (s) => {
      const existing = await prisma.weddingTheme.findUnique({
        where: { slug: s },
      });
      return !!existing;
    });

    const image = await moveFromTemp(dto.image, `wedding-themes/${slug}`);

    const theme = await prisma.weddingTheme.create({
      data: {
        slug,
        title: dto.title,
        description: dto.description,
        image,
        inclusions: dto.inclusions,
        venue_id: dto.venue_id ?? null,
        experience_id: dto.experience_id,
      },
      include: WEDDING_THEME_INCLUDE,
    });

    return created(theme);
  } catch (error) {
    return handleError(error);
  }
}
