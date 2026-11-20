import { NextRequest, NextResponse } from "next/server";

import { prisma, handleError } from "@/lib";
import { requireAuth, requireRole } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // S2: unread-inquiry count is internal information.
    const payload = await requireAuth(req);
    requireRole(payload, "admin", "editor");

    const count = await prisma.inquirySubmission.count({
      where: { status: "new" },
    });

    return NextResponse.json({ count });
  } catch (error) {
    // `handleError` keeps 401/403 meaningful; unexpected errors log and 500.
    return handleError(error);
  }
}
