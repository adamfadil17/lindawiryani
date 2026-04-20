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
  createPortfolioImageSchema,
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

    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!portfolio) return notFound("Portfolio");

    const { page, limit } = parsePagination(req.nextUrl.searchParams);

    const where = { portfolio_id: id };

    const { data, meta } = await paginateQuery(
      () => prisma.portfolioImage.count({ where }),
      (skip, take) =>
        prisma.portfolioImage.findMany({
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

    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
      select: { id: true, slug: true },
    });
    if (!portfolio) return notFound("Portfolio");

    const body = await req.json();
    const dto = createPortfolioImageSchema.parse({
      ...body,
      portfolio_id: id,
    });

    const url = await moveFromTemp(
      dto.url,
      `portfolios/${portfolio.slug}/gallery`,
    );

    const image = await prisma.portfolioImage.create({
      data: {
        portfolio_id: dto.portfolio_id,
        url,
        sort_order: dto.sort_order,
      },
    });

    return created(image);
  } catch (error) {
    return handleError(error);
  }
}
