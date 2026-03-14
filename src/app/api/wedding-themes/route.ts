import { NextRequest } from "next/server";

import { prisma, handleError, paginated, requireAuth, requireRole, created } from "@/lib";
import { createWeddingThemeSchema, parsePagination, paginateQuery } from "@/utils";
import { toSlug, ensureUniqueSlug } from "@/utils/slug";

const WEDDING_THEME_INCLUDE = {
  venue: true,
  experience: true,
  gallery: { orderBy: { sort_order: "asc" as const } },
};

export async function GET(req: NextRequest) {
  try {
    const { page, limit, search } = parsePagination(req.nextUrl.searchParams);
    const venueId = req.nextUrl.searchParams.get("venueId") ?? undefined;
    const experienceId = req.nextUrl.searchParams.get("experienceId") ?? undefined;
    const type = req.nextUrl.searchParams.get("type") ?? undefined;

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { theme_name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }
    if (venueId) where.venue_id = venueId;
    if (experienceId) where.experience_id = experienceId;
    if (type) where.type = type;

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
    const payload = requireAuth(req);
    requireRole(payload, "admin", "editor");

    const body = await req.json();
    const dto = createWeddingThemeSchema.parse(body);

    const baseSlug = toSlug(dto.title);
    const slug = await ensureUniqueSlug(baseSlug, async (s) => {
      const existing = await prisma.weddingTheme.findUnique({ where: { slug: s } });
      return !!existing;
    });

    const theme = await prisma.weddingTheme.create({
      data: {
        slug,
        type: dto.type,
        title: dto.title,
        description: dto.description,
        image: dto.image,
        inclusions: dto.inclusions,
        venue_id: dto.venue_id,
        experience_id: dto.experience_id,
      },
      include: WEDDING_THEME_INCLUDE,
    });

    return created(theme);
  } catch (error) {
    return handleError(error);
  }
}