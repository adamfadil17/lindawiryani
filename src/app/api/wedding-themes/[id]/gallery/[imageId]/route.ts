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
import { updateWeddingThemeImageSchema } from "@/utils";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> },
) {
  try {
    const { id, imageId } = await params;

    const image = await prisma.weddingThemeImage.findUnique({
      where: { id: imageId },
    });
    if (!image || image.theme_id !== id) return notFound("Wedding Theme Image");
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

    const existing = await prisma.weddingThemeImage.findUnique({
      where: { id: imageId },
      select: { theme_id: true },
    });
    if (!existing || existing.theme_id !== id)
      return notFound("Wedding Theme Image");

    const body = await req.json();
    const dto = updateWeddingThemeImageSchema.parse(body);

    const image = await prisma.weddingThemeImage.update({
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

    const existing = await prisma.weddingThemeImage.findUnique({
      where: { id: imageId },
      select: { theme_id: true },
    });
    if (!existing || existing.theme_id !== id)
      return notFound("Wedding Theme Image");

    await prisma.weddingThemeImage.delete({ where: { id: imageId } });
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
