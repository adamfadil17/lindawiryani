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

import { updateUserSchema } from "@/utils";

const SELECT_PUBLIC = {
  id: true,
  name: true,
  email: true,
  role: true,
  created_at: true,
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const payload = await requireAuth(req);
    requireRole(payload, "admin");

    const user = await prisma.user.findUnique({
      where: { id },
      select: SELECT_PUBLIC,
    });

    if (!user) return notFound("User");
    return ok(user);
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
    requireRole(payload, "admin");

    const body = await req.json();
    const dto = updateUserSchema.parse(body);

    const user = await prisma.user.update({
      where: { id },
      data: dto,
      select: SELECT_PUBLIC,
    });

    return ok(user);
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

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) return notFound("User");

    await prisma.user.delete({ where: { id } });
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
