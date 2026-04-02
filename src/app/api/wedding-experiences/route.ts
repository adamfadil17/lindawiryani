import { NextRequest } from "next/server";

import {
  prisma,
  handleError,
  paginated,
  requireAuth,
  requireRole,
  created,
  notFound,
  ok,
} from "@/lib";
import {
  createWeddingExperienceSchema,
  parsePagination,
  paginateQuery,
} from "@/utils";
import { toSlug, ensureUniqueSlug } from "@/utils/slug";

const WEDDING_EXPERIENCE_INCLUDE = {
  faqs: { orderBy: { sort_order: "asc" as const } },
  venues: {
    include: {
      destination: true,
      gallery: { orderBy: { sort_order: "asc" as const } },
    },
  },
  themes: true,
  portfolios: true,
};

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug") ?? undefined;
    if (slug) {
      const experience = await prisma.weddingExperience.findUnique({
        where: { slug },
        include: WEDDING_EXPERIENCE_INCLUDE,
      });
      if (!experience) return notFound("Wedding Experience");
      return ok(experience);
    }

    const { page, limit, search } = parsePagination(req.nextUrl.searchParams);
    const category = req.nextUrl.searchParams.get("category") ?? undefined;

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { hero_desc: { contains: search, mode: "insensitive" } },
      ];
    }
    if (category) where.category = category;

    const { data, meta } = await paginateQuery(
      () => prisma.weddingExperience.count({ where }),
      (skip, take) =>
        prisma.weddingExperience.findMany({
          where,
          include: WEDDING_EXPERIENCE_INCLUDE,
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
    const payload = await requireAuth(req);
    requireRole(payload, "admin", "editor");

    const body = await req.json();
    const dto = createWeddingExperienceSchema.parse(body);

    const baseSlug = toSlug(dto.name);
    const slug = await ensureUniqueSlug(baseSlug, async (s) => {
      const existing = await prisma.weddingExperience.findUnique({
        where: { slug: s },
      });
      return !!existing;
    });

    const experience = await prisma.weddingExperience.create({
      data: {
        slug,
        category: dto.category,
        name: dto.name,

        // Hero
        hero_style: dto.hero_style,
        hero_image: dto.hero_image,
        hero_desc: dto.hero_desc,

        // Intro
        intro_label: dto.intro_label,
        intro_heading: dto.intro_heading,
        intro_body: dto.intro_body,
        intro_list_label: dto.intro_list_label ?? null,
        intro_list: dto.intro_list,
        intro_footnote: dto.intro_footnote ?? null,
        intro_images: dto.intro_images,

        // Approach
        approach_label: dto.approach_label,
        approach_heading: dto.approach_heading,
        approach_body: dto.approach_body,
        approach_list_label: dto.approach_list_label ?? null,
        approach_list: dto.approach_list,
        approach_image: dto.approach_image,

        // Services
        services_label: dto.services_label,
        services_heading: dto.services_heading,
        services_list: dto.services_list,
        services_footnote: dto.services_footnote,
        services_dark_label: dto.services_dark_label,
        services_dark_heading: dto.services_dark_heading,
        services_dark_body: dto.services_dark_body,
        services_dark_list: dto.services_dark_list,

        // Closing
        closing_label: dto.closing_label,
        closing_heading: dto.closing_heading,
        closing_body: dto.closing_body,
        closing_image: dto.closing_image,
        closing_couple_label: dto.closing_couple_label ?? null,
        closing_couple_values: dto.closing_couple_values,
      },
      include: WEDDING_EXPERIENCE_INCLUDE,
    });

    return created(experience);
  } catch (error) {
    return handleError(error);
  }
}
