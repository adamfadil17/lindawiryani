import { NextRequest } from "next/server";

import { prisma, signToken, ok, unauthorized, handleError } from "@/lib";

import { loginSchema, comparePassword } from "@/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return unauthorized("Invalid credentials");

    const valid = await comparePassword(password, user.password);
    if (!valid) return unauthorized("Invalid credentials");

    const token = await signToken({ userId: user.id, email: user.email, role: user.role });

    const { password: _, ...publicUser } = user;
    return ok({
      user: publicUser,
      token,
      expiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
    });
  } catch (error) {
    return handleError(error);
  }
}