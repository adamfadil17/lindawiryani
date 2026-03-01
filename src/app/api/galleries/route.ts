import { NextRequest } from "next/server";

import { prisma, handleError, paginated, requireAuth, requireRole, created } from "@/lib";

import { createGallerySchema, parsePagination, paginateQuery } from "@/utils";

export async function GET(req: NextRequest) {
  try {
    const { page, limit, search } = parsePagination(req.nextUrl.searchParams);

    const where = search ? { category: { contains: search, mode: "insensitive" as const } } : {};

    const { data, meta } = await paginateQuery(
      () => prisma.gallery.count({ where }),
      (skip, take) =>
        prisma.gallery.findMany({
          where,
          include: { images: true },
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

export async function POST(req: NextRequest) {
  try {
    const payload = requireAuth(req);
    requireRole(payload, "admin", "editor");

    const body = await req.json();
    const dto = createGallerySchema.parse(body);

    const gallery = await prisma.gallery.create({
      data: dto,
      include: { images: true },
    });

    return created(gallery);
  } catch (error) {
    return handleError(error);
  }
}
