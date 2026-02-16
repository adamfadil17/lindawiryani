import { NextRequest } from "next/server";

import { prisma, ok, handleError, requireAuth, notFound } from "@/lib";

export async function GET(req: NextRequest) {
  try {
    const payload = requireAuth(req);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, name: true, email: true, role: true, created_at: true },
    });

    if (!user) return notFound("User");
    return ok(user);
  } catch (error) {
    return handleError(error);
  }
}
