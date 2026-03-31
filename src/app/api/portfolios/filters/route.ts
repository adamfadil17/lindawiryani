import { NextRequest } from "next/server";
import { prisma, handleError, ok } from "@/lib";

/**
 * GET /api/portfolios/filters
 *
 * Mengembalikan tiga daftar filter option yang hanya berisi entri yang
 * benar-benar dipakai oleh minimal satu Portfolio. Ini mencegah dropdown
 * menampilkan opsi yang tidak akan menghasilkan hasil apapun.
 *
 * Response shape:
 * {
 *   data: {
 *     destinations : Array<{ id, name }>
 *     venues       : Array<{ id, name }>
 *     experiences  : Array<{ id, name, category }>
 *   }
 * }
 *
 * File ini ditempatkan di: app/api/portfolios/filters/route.ts
 */
export async function GET(_req: NextRequest) {
  try {
    const [destinations, venues, experiences] = await Promise.all([
      // Hanya destination yang punya ≥1 portfolio
      prisma.destination.findMany({
        where: { portfolios: { some: {} } },
        select: { id: true, name: true },
        orderBy: { name: "asc" },
      }),

      // Hanya venue yang punya ≥1 portfolio
      prisma.venue.findMany({
        where: { portfolios: { some: {} } },
        select: { id: true, name: true },
        orderBy: { name: "asc" },
      }),

      // Hanya experience yang punya ≥1 portfolio
      // category (WeddingExperienceType enum) ikut dikirim untuk
      // keperluan badge colouring di sisi client
      prisma.weddingExperience.findMany({
        where: { portfolios: { some: {} } },
        select: { id: true, name: true, category: true },
        orderBy: { name: "asc" },
      }),
    ]);

    return ok({ destinations, venues, experiences });
  } catch (error) {
    return handleError(error);
  }
}
