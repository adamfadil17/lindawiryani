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
import { createPortfolioSchema, parsePagination, paginateQuery } from "@/utils";

const PORTFOLIO_INCLUDE = {
  destination: true,
  venue: true,
  experience: true,
  gallery: { orderBy: { sort_order: "asc" as const } },
};

export async function GET(req: NextRequest) {
  try {
    const access = await resolveContentAccess(req);
    if (access.response) return access.response;

    const { page, limit, search } = parsePagination(req.nextUrl.searchParams);
    const destinationId =
      req.nextUrl.searchParams.get("destinationId") ?? undefined;
    const venueId = req.nextUrl.searchParams.get("venueId") ?? undefined;
    const experienceId =
      req.nextUrl.searchParams.get("experienceId") ?? undefined;

    const where: Record<string, unknown> = {};
    if (!access.isStaff) where.status = "published";
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
          ...(access.isStaff
            ? { include: PORTFOLIO_INCLUDE }
            : {
                select: {
                  id: true,
                  slug: true,
                  couple: true,
                  subtitle: true,
                  destination_id: true,
                  venue_id: true,
                  experience_id: true,
                  image: true,
                  tags: true,
                  excerpt: true,
                  origin: true,
                  review: true,
                  content: true,
                  story_sections: true,
                  credit_role: true,
                  credit_planner: true,
                  credit_location_detail: true,
                  credit_couple_origin: true,
                  published_at: true,
                },
              }),
          skip,
          take,
          orderBy: { created_at: "desc" },
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
    const dto = createPortfolioSchema.parse(body);

    const portfolio = await prisma.portfolio.create({
      data: {
        slug: dto.slug,
        couple: dto.couple,
        subtitle: dto.subtitle,
        destination_id: dto.destination_id || null,
        venue_id: dto.venue_id || null,
        experience_id: dto.experience_id || null,
        image: dto.image,
        tags: dto.tags,
        excerpt: dto.excerpt,
        origin: dto.origin ?? null,
        review: dto.review ?? null,
        content: dto.content ? sanitizeRichText(dto.content) : null,
        story_sections: dto.story_sections,
        credit_role: dto.credit_role,
        credit_planner: dto.credit_planner,
        credit_location_detail: dto.credit_location_detail,
        credit_couple_origin: dto.credit_couple_origin,
        ...publicationFields(dto.status),
        translations: translationsCreate("portfolio", dto.translations),
      },
      include: PORTFOLIO_INCLUDE,
    });

    await revalidatePublicContent();
    return created(portfolio);
  } catch (error) {
    return handleError(error);
  }
}
