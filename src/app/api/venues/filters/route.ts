import { NextRequest } from "next/server";
import { prisma, handleError, ok } from "@/lib";

export async function GET(_req: NextRequest) {
  try {
    const [destinations, experiences] = await Promise.all([
      prisma.destination.findMany({
        where: { venues: { some: {} } },
        select: { id: true, name: true },
        orderBy: { name: "asc" },
      }),
      prisma.weddingExperience.findMany({
        where: { venues: { some: {} } },
        select: { id: true, name: true, category: true },
        orderBy: { name: "asc" },
      }),
    ]);

    return ok({ destinations, experiences });
  } catch (error) {
    return handleError(error);
  }
}
