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

import { updateServiceSchema } from "@/utils";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const service = await prisma.service.findUnique({
      where: { id },
      include: { images: { orderBy: { sort_order: "asc" } } },
    });
    if (!service) return notFound("Service");
    return ok(service);
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
    const dto = updateServiceSchema.parse(body);

    const service = await prisma.service.update({
      where: { id },
      data: dto,
      include: { images: { orderBy: { sort_order: "asc" } } },
    });
    return ok(service);
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

    await prisma.service.delete({ where: { id } });
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
