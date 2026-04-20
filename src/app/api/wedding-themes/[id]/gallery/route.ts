import { NextRequest } from "next/server";

import {
  prisma,
  handleError,
  paginated,
  requireAuth,
  requireRole,
  created,
  notFound,
} from "@/lib";
import {
  createWeddingThemeImageSchema,
  parsePagination,
  paginateQuery,
} from "@/utils";
import { moveFromTemp } from "@/utils/file";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const theme = await prisma.weddingTheme.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!theme) return notFound("Wedding Theme");

    const { page, limit } = parsePagination(req.nextUrl.searchParams);

    const where = { theme_id: id };

    const { data, meta } = await paginateQuery(
      () => prisma.weddingThemeImage.count({ where }),
      (skip, take) =>
        prisma.weddingThemeImage.findMany({
          where,
          skip,
          take,
          orderBy: { sort_order: "asc" },
        }),
      page,
      limit,
    );

    return paginated(data, meta);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const payload = await requireAuth(req);
    requireRole(payload, "admin", "editor");

    const theme = await prisma.weddingTheme.findUnique({
      where: { id },
      select: { id: true, slug: true },
    });
    if (!theme) return notFound("Wedding Theme");

    const body = await req.json();
    const dto = createWeddingThemeImageSchema.parse({
      ...body,
      theme_id: id,
    });

    const url = await moveFromTemp(
      dto.url,
      `wedding-themes/${theme.slug}/gallery`,
    );

    const image = await prisma.weddingThemeImage.create({
      data: {
        theme_id: dto.theme_id,
        url,
        sort_order: dto.sort_order,
      },
    });

    return created(image);
  } catch (error) {
    return handleError(error);
  }
}
