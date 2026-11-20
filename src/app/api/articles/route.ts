import { NextRequest } from "next/server";

import {
  prisma,
  handleError,
  paginated,
  requireAuth,
  requireRole,
  created,
  badRequest,
} from "@/lib";
import { revalidatePublicContent } from "@/lib/content/tags";
import { createArticleSchema, parsePagination, paginateQuery, articleCategoryEnum } from "@/utils";
import { resolveContentAccess } from "@/lib/content/access";
import {
  translationsCreate,
  publicationFields,
} from "@/lib/content/translations";
import { sanitizeRichText } from "@/lib/sanitize";

export async function GET(req: NextRequest) {
  try {
    const access = await resolveContentAccess(req);
    if (access.response) return access.response;

    const { page, limit, search } = parsePagination(req.nextUrl.searchParams);
    const categoryParam = req.nextUrl.searchParams.get("category") ?? undefined;
    const categoryCheck = articleCategoryEnum.safeParse(categoryParam);
    if (categoryParam && !categoryCheck.success) {
      return badRequest("Invalid category");
    }
    const category = categoryCheck.success ? categoryCheck.data : undefined;

    const where: Record<string, unknown> = {};
    if (!access.isStaff) where.status = "published";
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
      ];
    }
    if (category) where.category = category;

    const { data, meta } = await paginateQuery(
      () => prisma.article.count({ where }),
      (skip, take) =>
        prisma.article.findMany({
          where,
          skip,
          take,
          orderBy: { published_at: "desc" },
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
    const dto = createArticleSchema.parse(body);

    const article = await prisma.article.create({
      data: {
        slug: dto.slug,
        category: dto.category,
        title: dto.title,
        excerpt: dto.excerpt,
        published_at: dto.published_at,
        image: dto.image,
        content: sanitizeRichText(dto.content),
        ...publicationFields(dto.status),
        translations: translationsCreate("article", dto.translations),
      },
    });

    await revalidatePublicContent();
    return created(article);
  } catch (error) {
    return handleError(error);
  }
}