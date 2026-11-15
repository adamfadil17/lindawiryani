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
import { updateExperienceFaqSchema } from "@/utils";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; faqId: string }> },
) {
  try {
    const { id, faqId } = await params;

    const faq = await prisma.experienceFaq.findUnique({
      where: { id: faqId },
    });
    if (!faq || faq.experience_id !== id) return notFound("Experience FAQ");
    return ok(faq);
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; faqId: string }> },
) {
  try {
    const { id, faqId } = await params;

    const payload = await requireAuth(req);
    requireRole(payload, "admin", "editor");

    // Verify FAQ belongs to this experience
    const existing = await prisma.experienceFaq.findUnique({
      where: { id: faqId },
      select: { experience_id: true },
    });
    if (!existing || existing.experience_id !== id)
      return notFound("Experience FAQ");

    const body = await req.json();
    const dto = updateExperienceFaqSchema.parse(body);

    const faq = await prisma.experienceFaq.update({
      where: { id: faqId },
      data: dto,
    });
    return ok(faq);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; faqId: string }> },
) {
  try {
    const { id, faqId } = await params;

    const payload = await requireAuth(req);
    requireRole(payload, "admin");

    // Verify FAQ belongs to this experience
    const existing = await prisma.experienceFaq.findUnique({
      where: { id: faqId },
      select: { experience_id: true },
    });
    if (!existing || existing.experience_id !== id)
      return notFound("Experience FAQ");

    await prisma.experienceFaq.delete({ where: { id: faqId } });
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
