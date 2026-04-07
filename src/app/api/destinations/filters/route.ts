import { NextRequest } from "next/server";
import { prisma, handleError, ok } from "@/lib";

export async function GET(_req: NextRequest) {
  try {
    const raw = await prisma.destinationCategory.findMany({
      // Hanya tampilkan category yang punya minimal 1 destination
      where: {
        locations: {
          some: {
            destinations: { some: {} },
          },
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        locations: {
          where: {
            destinations: { some: {} },
          },
          select: {
            id: true,
            name: true,
            slug: true,
            _count: {
              select: { destinations: true },
            },
          },
          orderBy: { name: "asc" },
        },
        _count: {
          select: {
            locations: {
              where: {
                destinations: { some: {} },
              },
            },
          },
        },
      },
      orderBy: { name: "asc" },
    });

    const categories = raw.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      count: cat.locations.reduce((sum, loc) => sum + loc._count.destinations, 0),
      locations: cat.locations.map((loc) => ({
        id: loc.id,
        name: loc.name,
        slug: loc.slug,
        count: loc._count.destinations,
      })),
    }));

    return ok({ categories });
  } catch (error) {
    return handleError(error);
  }
}