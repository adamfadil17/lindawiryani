import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const count = await prisma.inquirySubmission.count({
      where: { status: "new" },
    });

    return NextResponse.json({ count });
  } catch (error) {
    console.error("[INQUIRY_BADGE_GET]", error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
