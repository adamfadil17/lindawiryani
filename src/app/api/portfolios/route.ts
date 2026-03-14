import { NextRequest } from "next/server";

import { prisma, handleError, paginated, requireAuth, requireRole, created } from "@/lib";
import { createPortfolioSchema, parsePagination, paginateQuery } from "@/utils";
import { toSlug, ensureUniqueSlug } from "@/utils/slug";

const PORTFOLIO_INCLUDE = {
  destination: true,
  venue: true,
  experience: true,
  gallery: { orderBy: { sort_order: "asc" as const } },
};

export async function GET(req: NextRequest) {
  try {
    const { page, limit, search } = parsePagination(req.nextUrl.searchParams);
    const destinationId = req.nextUrl.searchParams.get("destinationId") ?? undefined;
    const venueId = req.nextUrl.searchParams.get("venueId") ?? undefined;
    const experienceId = req.nextUrl.searchParams.get("experienceId") ?? undefined;

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { couple: { contains: search, mode: "insensitive" } },
        { subtitle: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
        { origin: { contains: search, mode: "insensitive" } },
      ];
    }
    if (destinationId) where.destination_id = destinationId;
    if (venueId) where.venue_id = venueId;
    if (experienceId) where.experience_id = experienceId;

    const { data, meta } = await paginateQuery(
      () => prisma.portfolio.count({ where }),
      (skip, take) =>
        prisma.portfolio.findMany({
          where,
          include: PORTFOLIO_INCLUDE,
          skip,
          take,
          orderBy: { created_at: "desc" },
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
    const dto = createPortfolioSchema.parse(body);

    const baseSlug = toSlug(dto.couple);
    const slug = await ensureUniqueSlug(baseSlug, async (s) => {
      const existing = await prisma.portfolio.findUnique({ where: { slug: s } });
      return !!existing;
    });

    const portfolio = await prisma.portfolio.create({
      data: {
        slug,
        couple: dto.couple,
        subtitle: dto.subtitle,
        destination_id: dto.destination_id,
        venue_id: dto.venue_id,
        experience_id: dto.experience_id,
        image: dto.image,
        tags: dto.tags,
        excerpt: dto.excerpt,
        origin: dto.origin ?? null,
        review: dto.review ?? null,
        content: dto.content ?? null,
        story_sections: dto.story_sections,
        credit_role: dto.credit_role,
        credit_planner: dto.credit_planner,
        credit_location_detail: dto.credit_location_detail,
        credit_couple_origin: dto.credit_couple_origin,
      },
      include: PORTFOLIO_INCLUDE,
    });

    return created(portfolio);
  } catch (error) {
    return handleError(error);
  }
}