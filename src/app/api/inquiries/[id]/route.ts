import { NextRequest } from "next/server";

import {
  prisma,
  handleError,
  requireAuth,
  requireRole,
  notFound,
  ok,
  noContent,
} from "@/lib";

import { updateInquiryStatusSchema } from "@/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const payload = requireAuth(req);
    requireRole(payload, "admin", "editor");

    const inquiry = await prisma.inquiry.findUnique({ where: { id } });
    if (!inquiry) return notFound("Inquiry");
    return ok(inquiry);
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const payload = requireAuth(req);
    requireRole(payload, "admin", "editor");

    const body = await req.json();
    const { status } = updateInquiryStatusSchema.parse(body);

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: { status },
    });
    return ok(inquiry);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const payload = requireAuth(req);
    requireRole(payload, "admin");

    await prisma.inquiry.delete({ where: { id } });
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
