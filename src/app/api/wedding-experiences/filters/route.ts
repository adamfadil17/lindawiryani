import { NextRequest } from "next/server";
import { prisma, handleError, ok } from "@/lib";
import { WeddingExperienceType } from "@/../generated/prisma";

// ─── GET /api/wedding-experiences/filters ─────────────────────────────────────
//
// Mengembalikan stat per WeddingExperienceType (venue/theme/faq count
// + experience id) dalam satu query — stat row di halaman dashboard
// terisi langsung tanpa perlu N+1 request ke setiap experience.
//
// Response shape:
// {
//   data: {
//     categoryStats: {
//       category: WeddingExperienceType;
//       experienceId: string | null;
//       venueCount: number;
//       themeCount: number;
//       faqCount: number;
//     }[]
//   }
// }

export async function GET(_req: NextRequest) {
  try {
    // Ambil semua experience sekaligus dengan count relasi yang dibutuhkan.
    // Prisma tidak mendukung groupBy pada relasi, jadi kita findMany dengan
    // _count lalu kelompokkan per kategori di sisi aplikasi.
    const experiences = await prisma.weddingExperience.findMany({
      select: {
        id: true,
        category: true,
        _count: {
          select: {
            venues: true,
            themes: true,
            faqs: true,
          },
        },
      },
    });

    // Susun map category → stat agar hasilnya selalu
    // mencakup semua 4 nilai enum (meskipun belum ada experience-nya)
    const statsMap = new Map<
      WeddingExperienceType,
      {
        category: WeddingExperienceType;
        experienceId: string | null;
        venueCount: number;
        themeCount: number;
        faqCount: number;
      }
    >();

    // Inisialisasi dengan default 0 untuk semua nilai enum
    for (const cat of Object.values(WeddingExperienceType)) {
      statsMap.set(cat, {
        category: cat,
        experienceId: null,
        venueCount: 0,
        themeCount: 0,
        faqCount: 0,
      });
    }

    // Isi dengan data nyata dari DB
    for (const exp of experiences) {
      statsMap.set(exp.category, {
        category: exp.category,
        experienceId: exp.id,
        venueCount: exp._count.venues,
        themeCount: exp._count.themes,
        faqCount: exp._count.faqs,
      });
    }

    // Kembalikan dalam urutan tetap (sesuai urutan enum di schema)
    const categoryOrder: WeddingExperienceType[] = [
      WeddingExperienceType.luxury_weddings,
      WeddingExperienceType.private_villa_weddings,
      WeddingExperienceType.intimate_weddings,
      WeddingExperienceType.elopement_weddings,
    ];

    const categoryStats = categoryOrder.map((cat) => statsMap.get(cat)!);

    return ok({ categoryStats });
  } catch (error) {
    return handleError(error);
  }
}
