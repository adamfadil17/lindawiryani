import { NextRequest } from "next/server";

import {
  prisma,
  handleError,
  paginated,
  created,
  badRequest,
  requireAuth,
  requireRole,
} from "@/lib";
import {
  consumeRateLimit,
  getClientIp,
  RATE_LIMITS,
  tooManyRequests,
} from "@/lib/rate-limit";
import { getRecaptchaToken, verifyRecaptcha } from "@/lib/recaptcha";
import { createInquirySchema, parsePagination, paginateQuery } from "@/utils";

export async function GET(req: NextRequest) {
  try {
    // S2: inquiry rows contain PII (names, emails, addresses, phone numbers).
    const payload = await requireAuth(req);
    requireRole(payload, "admin", "editor");

    const { page, limit, search } = parsePagination(req.nextUrl.searchParams);
    const status = req.nextUrl.searchParams.get("status") ?? undefined;

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { full_name: { contains: search, mode: "insensitive" } },
        { email_or_whatsapp: { contains: search, mode: "insensitive" } },
        { wedding_style: { contains: search, mode: "insensitive" } },
        { estimated_budget: { contains: search, mode: "insensitive" } },
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
    // Public endpoint — no auth required (inquiry form from website).
    const ipLimit = consumeRateLimit({
      key: `inquiries:post:${getClientIp(req)}`,
      ...RATE_LIMITS.publicForm,
    });
    if (!ipLimit.allowed) return tooManyRequests(ipLimit);

    const body = await req.json();

    const recaptchaToken = getRecaptchaToken(body);
    if (!recaptchaToken) return badRequest("reCAPTCHA token is required");
    if (!(await verifyRecaptcha(recaptchaToken))) {
      return badRequest("reCAPTCHA verification failed. Please try again.");
    }

    const dto = createInquirySchema.parse(body);

    const inquiry = await prisma.inquirySubmission.create({
      data: {
        full_name: dto.full_name,
        email_or_whatsapp: dto.email_or_whatsapp,

        wedding_date: dto.wedding_date ?? null,
        number_of_guests: dto.number_of_guests ?? null,

        wedding_location_interest: dto.wedding_location_interest,
        wedding_style: dto.wedding_style ?? null,
        estimated_budget: dto.estimated_budget ?? null,
        services_needed: dto.services_needed,
        venue_secured: dto.venue_secured ?? null,

        your_vision: dto.your_vision ?? null,
        how_did_you_find_us: dto.how_did_you_find_us ?? null,

        locale: dto.locale ?? null,
      },
    });

    return created(inquiry);
  } catch (error) {
    return handleError(error);
  }
}