import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export const dynamic = "force-dynamic";

/** Liveness + database check, polled by the docker healthcheck and deploy.sh. */
export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json({ status: "error" }, { status: 503 });
  }
}
