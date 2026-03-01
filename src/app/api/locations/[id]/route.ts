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

import { updateLocationSchema } from "@/utils";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const location = await prisma.location.findUnique({
      where: { id },
      include: { parent: true, children: true, venues: true },
    });
    if (!location) return notFound("Location");
    return ok(location);
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
    const dto = updateLocationSchema.parse(body);

    const location = await prisma.location.update({
      where: { id },
      data: dto,
      include: { parent: true, children: true },
    });
    return ok(location);
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

    await prisma.location.delete({ where: { id } });
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
