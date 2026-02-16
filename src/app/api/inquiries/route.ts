import { NextRequest } from "next/server";

import { prisma, handleError, paginated, requireAuth, requireRole, created } from "@/lib";

import { createInquirySchema, parsePagination, paginateQuery } from "@/utils";

export async function GET(req: NextRequest) {
  try {
    const payload = requireAuth(req);
    requireRole(payload, "admin", "editor");

    const { page, limit, search } = parsePagination(req.nextUrl.searchParams);
    const status = req.nextUrl.searchParams.get("status") ?? undefined;

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [{ name: { contains: search, mode: "insensitive" } }, { email: { contains: search, mode: "insensitive" } }];
    }
    if (status) where.status = status;

    const { data, meta } = await paginateQuery(
      () => prisma.inquiry.count({ where }),
      (skip, take) =>
        prisma.inquiry.findMany({
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

// Public endpoint — anyone can submit an inquiry
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const dto = createInquirySchema.parse(body);

    const inquiry = await prisma.inquiry.create({
      data: {
        ...dto,
        wedding_date: dto.wedding_date ? new Date(dto.wedding_date) : null,
      },
    });

    return created(inquiry);
  } catch (error) {
    return handleError(error);
  }
}
