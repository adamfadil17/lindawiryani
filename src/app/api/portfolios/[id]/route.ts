import { NextRequest } from "next/server";

import {
  prisma,
  handleError,
  requireAuth,
  requireRole,
  notFound,
  ok,
  noContent,
} from "@/lib";
import { revalidatePublicContent } from "@/lib/content/tags";
import { updatePortfolioSchema } from "@/utils";
import { resolveContentAccess } from "@/lib/content/access";
import {
  translationsReplace,
  publicationFields,
} from "@/lib/content/translations";
import { sanitizeRichText } from "@/lib/sanitize";

const PORTFOLIO_INCLUDE = {
  destination: true,
  venue: true,
  experience: true,
  gallery: { orderBy: { sort_order: "asc" as const } },
  translations: true,
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const access = await resolveContentAccess(req);
    if (access.response) return access.response;

    const { id } = await params;

    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
      include: PORTFOLIO_INCLUDE,
    });
    if (!portfolio || (!access.isStaff && portfolio.status !== "published")) {
      return notFound("Portfolio");
    }
    return ok(portfolio);
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const payload = await requireAuth(req);
    requireRole(payload, "admin", "editor");

    const body = await req.json();
    const dto = updatePortfolioSchema.parse(body);
    const { translations, status, ...base } = dto;

    // Optional relations: "" and null clear the relation, a UUID sets it.
    // A missing key must stay missing so Prisma does not overwrite it.
    const data = {
      ...base,
      ...(base.destination_id !== undefined
        ? { destination_id: base.destination_id || null }
        : {}),
      ...(base.venue_id !== undefined
        ? { venue_id: base.venue_id || null }
        : {}),
      ...(base.experience_id !== undefined
        ? { experience_id: base.experience_id || null }
        : {}),
    };

    const current = await prisma.portfolio.findUnique({
      where: { id },
      select: { slug: true, status: true, first_published_at: true },
    });
    if (!current) return notFound("Portfolio");

    const portfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        ...data,
        ...(typeof data.content === "string"
          ? { content: sanitizeRichText(data.content) }
          : {}),
        ...publicationFields(status, current.first_published_at),
        ...(translations !== undefined
          ? { translations: translationsReplace("portfolio", translations) }
          : {}),
      },
      include: PORTFOLIO_INCLUDE,
    });
    await revalidatePublicContent();
    return ok(portfolio);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const payload = await requireAuth(req);
    requireRole(payload, "admin");

    const existing = await prisma.portfolio.findUnique({ where: { id } });
    if (!existing) return notFound("Portfolio");

    await prisma.$transaction(async (tx) => {
      await tx.portfolioImage.deleteMany({ where: { portfolio_id: id } });
      await tx.portfolio.delete({ where: { id } });
    });

    await revalidatePublicContent();
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
