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
import { createArticleSchema, parsePagination, paginateQuery } from "@/utils";
import { toSlug, ensureUniqueSlug } from "@/utils/slug";
import { moveFromTemp } from "@/utils/file";

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug") ?? undefined;
    if (slug) {
      const article = await prisma.article.findUnique({
        where: { slug },
      });
      if (!article) return notFound("Article");
      return ok(article);
    }

    const { page, limit, search } = parsePagination(req.nextUrl.searchParams);
    const category = req.nextUrl.searchParams.get("category") ?? undefined;

    const where: Record<string, unknown> = {};
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

    const baseSlug = toSlug(dto.title);
    const slug = await ensureUniqueSlug(baseSlug, async (s) => {
      const existing = await prisma.article.findUnique({ where: { slug: s } });
      return !!existing;
    });

    const image = await moveFromTemp(dto.image, `articles/${slug}`);

    const article = await prisma.article.create({
      data: {
        slug,
        category: dto.category,
        title: dto.title,
        excerpt: dto.excerpt,
        published_at: dto.published_at,
        image,
        content: dto.content,
      },
    });

    return created(article);
  } catch (error) {
    return handleError(error);
  }
}
