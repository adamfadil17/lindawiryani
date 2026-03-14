import { NextRequest } from "next/server";

import { prisma, handleError, paginated, requireAuth, requireRole, created } from "@/lib";
import { createSubmissionSchema, parsePagination, paginateQuery } from "@/utils";

export async function GET(req: NextRequest) {
  try {
    const payload = requireAuth(req);
    requireRole(payload, "admin", "editor");

    const { page, limit, search } = parsePagination(req.nextUrl.searchParams);
    const type = req.nextUrl.searchParams.get("type") ?? undefined;
    const status = req.nextUrl.searchParams.get("status") ?? undefined;

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { email: { contains: search, mode: "insensitive" } },
        // Vendor fields
        { company_name: { contains: search, mode: "insensitive" } },
        { contact_person: { contains: search, mode: "insensitive" } },
        // Career fields
        { full_name: { contains: search, mode: "insensitive" } },
        { position: { contains: search, mode: "insensitive" } },
      ];
    }
    if (type) where.type = type;
    if (status) where.status = status;

    const { data, meta } = await paginateQuery(
      () => prisma.submission.count({ where }),
      (skip, take) =>
        prisma.submission.findMany({
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
    // Public endpoint — no auth required (form submission from website)
    const body = await req.json();
    const dto = createSubmissionSchema.parse(body);

    const submission = await prisma.submission.create({
      data: dto.type === "vendor"
        ? {
            type: dto.type,
            email: dto.email,
            phone: dto.phone ?? null,
            message: dto.message ?? null,
            company_name: dto.company_name,
            contact_person: dto.contact_person,
            vendor_category: dto.vendor_category,
            years_in_business: dto.years_in_business ?? null,
            portfolio_link: dto.portfolio_link || null,
            website: dto.website || null,
          }
        : {
            type: dto.type,
            email: dto.email,
            phone: dto.phone ?? null,
            message: dto.message ?? null,
            full_name: dto.full_name,
            position: dto.position,
            experience: dto.experience ?? null,
            linked_in: dto.linked_in || null,
            cover_letter: dto.cover_letter ?? null,
          },
    });

    return created(submission);
  } catch (error) {
    return handleError(error);
  }
}