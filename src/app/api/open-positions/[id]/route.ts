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
import { updateOpenPositionSchema } from "@/utils";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    // Public endpoint — visitors can view individual position details
    const position = await prisma.openPosition.findUnique({
      where: { id },
    });
    if (!position) return notFound("Open Position");
    return ok(position);
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
    const dto = updateOpenPositionSchema.parse(body);

    const position = await prisma.openPosition.update({
      where: { id },
      data: dto,
    });
    return ok(position);
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

    const existing = await prisma.openPosition.findUnique({ where: { id } });
    if (!existing) return notFound("Open Position");

    await prisma.openPosition.delete({ where: { id } });
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
