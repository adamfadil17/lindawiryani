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
import { updatePortfolioImageSchema } from "@/utils";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> },
) {
  try {
    const { id, imageId } = await params;

    const image = await prisma.portfolioImage.findUnique({
      where: { id: imageId },
    });
    if (!image || image.portfolio_id !== id) return notFound("Portfolio Image");
    return ok(image);
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> },
) {
  try {
    const { id, imageId } = await params;

    const payload = requireAuth(req);
    requireRole(payload, "admin", "editor");

    const existing = await prisma.portfolioImage.findUnique({
      where: { id: imageId },
      select: { portfolio_id: true },
    });
    if (!existing || existing.portfolio_id !== id)
      return notFound("Portfolio Image");

    const body = await req.json();
    const dto = updatePortfolioImageSchema.parse(body);

    const image = await prisma.portfolioImage.update({
      where: { id: imageId },
      data: dto,
    });
    return ok(image);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> },
) {
  try {
    const { id, imageId } = await params;

    const payload = requireAuth(req);
    requireRole(payload, "admin");

    const existing = await prisma.portfolioImage.findUnique({
      where: { id: imageId },
      select: { portfolio_id: true },
    });
    if (!existing || existing.portfolio_id !== id)
      return notFound("Portfolio Image");

    await prisma.portfolioImage.delete({ where: { id: imageId } });
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
