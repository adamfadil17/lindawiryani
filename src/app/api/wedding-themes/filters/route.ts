import { NextRequest } from "next/server";
import { prisma, handleError, ok } from "@/lib";

export async function GET(_req: NextRequest) {
  try {
    const experiences = await prisma.weddingExperience.findMany({
      where: { themes: { some: {} } },
      select: {
        id: true,
        name: true,
        category: true,
      },
      orderBy: { name: "asc" },
    });

    return ok({ experiences });
  } catch (error) {
    return handleError(error);
  }
}