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
  createExperienceFaqSchema,
  parsePagination,
  paginateQuery,
} from "@/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Verify parent exists
    const { id } = await params;

    const experience = await prisma.weddingExperience.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!experience) return notFound("Wedding Experience");

    const { page, limit, search } = parsePagination(req.nextUrl.searchParams);

    const where: Record<string, unknown> = { experience_id: id };
    if (search) {
      where.OR = [
        { question: { contains: search, mode: "insensitive" } },
        { answer: { contains: search, mode: "insensitive" } },
      ];
    }

    const { data, meta } = await paginateQuery(
      () => prisma.experienceFaq.count({ where }),
      (skip, take) =>
        prisma.experienceFaq.findMany({
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

    const payload = requireAuth(req);
    requireRole(payload, "admin", "editor");

    // Verify parent exists
    const experience = await prisma.weddingExperience.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!experience) return notFound("Wedding Experience");

    const body = await req.json();
    const dto = createExperienceFaqSchema.parse({
      ...body,
      experience_id: id,
    });

    const faq = await prisma.experienceFaq.create({
      data: {
        experience_id: dto.experience_id,
        question: dto.question,
        answer: dto.answer,
        sort_order: dto.sort_order,
      },
    });

    return created(faq);
  } catch (error) {
    return handleError(error);
  }
}
