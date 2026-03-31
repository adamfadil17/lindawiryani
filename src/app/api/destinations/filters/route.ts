import { NextRequest } from "next/server";
import { prisma, handleError, ok } from "@/lib";

export async function GET(_req: NextRequest) {
  try {
    const raw = await prisma.destinationCategory.findMany({
      // Hanya tampilkan category yang punya minimal 1 destination
      where: {
        destinations: { some: {} },
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: { destinations: true },
        },
      },
      orderBy: { name: "asc" },
    });

    const categories = raw.map((cat) => ({
      id: cat.id,
      name: cat.name,
      count: cat._count.destinations,
    }));

    return ok({ categories });
  } catch (error) {
    return handleError(error);
  }
}
