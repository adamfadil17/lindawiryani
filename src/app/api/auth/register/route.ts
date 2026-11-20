import { NextRequest } from "next/server";

import { prisma, handleError, created, requireAuth, requireRole } from "@/lib";

import { createUserSchema, hashPassword } from "@/utils";

/**
 * S1: registration used to be public and accepted `role` from the request body,
 * so anyone could create an admin account and receive a token.
 *
 * It is now admin-only and returns no token. Admin-created users sign in
 * through /api/auth/login like everyone else.
 */
export async function POST(req: NextRequest) {
  try {
    const payload = await requireAuth(req);
    requireRole(payload, "admin");

    const body = await req.json();
    const dto = createUserSchema.parse(body);

    const hashedPassword = await hashPassword(dto.password);

    const user = await prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
      },
    });

    const { password: _, ...publicUser } = user;

    return created({ user: publicUser });
  } catch (error) {
    return handleError(error);
  }
}
