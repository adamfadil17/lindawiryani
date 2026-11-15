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
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const inquiry = await prisma.inquirySubmission.findUnique({
      where: { id },
    });
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

    const payload = await requireAuth(req);
    requireRole(payload, "admin", "editor");

    const body = await req.json();
    const dto = updateInquiryStatusSchema.parse(body);

    const inquiry = await prisma.inquirySubmission.update({
      where: { id },
      data: { status: dto.status },
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

    const payload = await requireAuth(req);
    requireRole(payload, "admin");

    await prisma.inquirySubmission.delete({ where: { id } });
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
