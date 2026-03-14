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
      where.OR = [
        { your_name: { contains: search, mode: "insensitive" } },
        { your_email: { contains: search, mode: "insensitive" } },
        { name_of_groom: { contains: search, mode: "insensitive" } },
        { name_of_bride: { contains: search, mode: "insensitive" } },
        { wedding_venue: { contains: search, mode: "insensitive" } },
      ];
    }
    if (status) where.status = status;

    const { data, meta } = await paginateQuery(
      () => prisma.inquirySubmission.count({ where }),
      (skip, take) =>
        prisma.inquirySubmission.findMany({
          where,
          skip,
          take,
          orderBy: { submitted_at: "desc" },
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
    // Public endpoint — no auth required (inquiry form from website)
    const body = await req.json();
    const dto = createInquirySchema.parse(body);

    const inquiry = await prisma.inquirySubmission.create({
      data: {
        your_name: dto.your_name,
        your_email: dto.your_email,
        your_address: dto.your_address,
        telephone: dto.telephone,

        name_of_groom: dto.name_of_groom,
        religion_of_groom: dto.religion_of_groom,
        nationality_of_groom: dto.nationality_of_groom,

        name_of_bride: dto.name_of_bride,
        religion_of_bride: dto.religion_of_bride,
        nationality_of_bride: dto.nationality_of_bride,

        wedding_date: dto.wedding_date,
        wedding_venue: dto.wedding_venue,
        number_of_attendance: dto.number_of_attendance,
        approximate_wedding_budget: dto.approximate_wedding_budget,

        hotel_name_in_bali: dto.hotel_name_in_bali,
        arrival_date: dto.arrival_date,
        departure_date: dto.departure_date,

        your_message: dto.your_message,
      },
    });

    return created(inquiry);
  } catch (error) {
    return handleError(error);
  }
}