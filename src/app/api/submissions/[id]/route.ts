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
import { updateSubmissionStatusSchema } from "@/utils";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const submission = await prisma.submission.findUnique({
      where: { id },
    });
    if (!submission) return notFound("Submission");
    return ok(submission);
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
    const dto = updateSubmissionStatusSchema.parse(body);

    const submission = await prisma.submission.update({
      where: { id },
      data: { status: dto.status },
    });
    return ok(submission);
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

    const existing = await prisma.submission.findUnique({ where: { id } });
    if (!existing) return notFound("Submission");

    await prisma.submission.delete({ where: { id } });
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
