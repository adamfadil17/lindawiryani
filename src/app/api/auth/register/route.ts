import { NextRequest } from "next/server";

import { prisma, signToken, handleError, created } from "@/lib";

import { createUserSchema, hashPassword } from "@/utils";

export async function POST(req: NextRequest) {
  try {
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

    const token = signToken({ userId: user.id, email: user.email, role: user.role });
    const { password: _, ...publicUser } = user;

    return created({
      user: publicUser,
      token,
      expiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
    });
  } catch (error) {
    return handleError(error);
  }
}
