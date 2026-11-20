import { NextRequest } from "next/server";

import { prisma, handleError, ok, requireAuth, requireRole } from "@/lib";

/** Role counts for the Users stat cards (admin-only). */
export async function GET(req: NextRequest) {
  try {
    const payload = await requireAuth(req);
    requireRole(payload, "admin");

    const grouped = await prisma.user.groupBy({
      by: ["role"],
      _count: { role: true },
    });

    const roles = { admin: 0, editor: 0, user: 0 };
    let total = 0;

    for (const row of grouped) {
      if (row.role in roles) {
        roles[row.role as keyof typeof roles] = row._count.role;
      }
      total += row._count.role;
    }

    return ok({ total, roles });
  } catch (error) {
    return handleError(error);
  }
}
