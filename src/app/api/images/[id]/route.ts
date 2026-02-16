import { NextRequest } from "next/server";

import { prisma, handleError, requireAuth, requireRole, notFound, ok, noContent } from "@/lib";

import { updateImageSchema } from "@/utils";

const IMAGE_INCLUDE = {
  gallery: true,
  venue: true,
  wedding_theme: true,
  service: true,
  wedding_experience: true,
};

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const image = await prisma.image.findUnique({
      where: { id: params.id },
      include: IMAGE_INCLUDE,
    });
    if (!image) return notFound("Image");
    return ok(image);
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const payload = requireAuth(req);
    requireRole(payload, "admin", "editor");

    const body = await req.json();
    const dto = updateImageSchema.parse(body);

    const image = await prisma.image.update({
      where: { id: params.id },
      data: dto,
      include: IMAGE_INCLUDE,
    });
    return ok(image);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const payload = requireAuth(req);
    requireRole(payload, "admin");

    await prisma.image.delete({ where: { id: params.id } });
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
