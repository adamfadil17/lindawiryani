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

import { updateWeddingThemeSchema } from "@/utils";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const theme = await prisma.weddingTheme.findUnique({
      where: { id },
      include: {
        images: { orderBy: { sort_order: "asc" } },
        venues: { include: { location: true } },
      },
    });
    if (!theme) return notFound("Wedding Theme");
    return ok(theme);
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
    const payload = requireAuth(req);
    requireRole(payload, "admin", "editor");

    const body = await req.json();
    const dto = updateWeddingThemeSchema.parse(body);

    const theme = await prisma.weddingTheme.update({
      where: { id },
      data: dto,
      include: { images: { orderBy: { sort_order: "asc" } } },
    });
    return ok(theme);
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
    const payload = requireAuth(req);
    requireRole(payload, "admin");

    await prisma.weddingTheme.delete({ where: { id } });
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
