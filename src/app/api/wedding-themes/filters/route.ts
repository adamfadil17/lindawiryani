import { NextRequest } from "next/server";
import { prisma, handleError, ok, requireAuth, requireRole } from "@/lib";

export async function GET(req: NextRequest) {
  try {
    const payload = await requireAuth(req);
    requireRole(payload, "admin", "editor");

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