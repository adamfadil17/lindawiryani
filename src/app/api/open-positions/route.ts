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
  createOpenPositionSchema,
  parsePagination,
  paginateQuery,
} from "@/utils";

export async function GET(req: NextRequest) {
  try {
    // Public endpoint — website visitors need to see available positions
    const { page, limit, search } = parsePagination(req.nextUrl.searchParams);
    const type = req.nextUrl.searchParams.get("type") ?? undefined;
    const level = req.nextUrl.searchParams.get("level") ?? undefined;
    const isActive = req.nextUrl.searchParams.get("isActive");

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { desc: { contains: search, mode: "insensitive" } },
      ];
    }
    if (type) where.type = type;
    if (level) where.level = level;

    // Default to active only for public; pass isActive=all to get all (admin use)
    if (isActive === "all") {
      // no filter — return all regardless of status
    } else if (isActive === "false") {
      where.is_active = false;
    } else {
      where.is_active = true;
    }

    const { data, meta } = await paginateQuery(
      () => prisma.openPosition.count({ where }),
      (skip, take) =>
        prisma.openPosition.findMany({
          where,
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
    const dto = createOpenPositionSchema.parse(body);

    const position = await prisma.openPosition.create({
      data: {
        title: dto.title,
        type: dto.type,
        level: dto.level,
        desc: dto.desc,
        is_active: dto.is_active,
      },
    });

    return created(position);
  } catch (error) {
    return handleError(error);
  }
}
