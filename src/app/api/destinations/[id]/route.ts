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
import { updateDestinationSchema } from "@/utils";
import { toSlug, ensureUniqueSlug } from "@/utils/slug";

const DESTINATION_INCLUDE = {
  category: true,
  venues: true,
  portfolios: true,
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const destination = await prisma.destination.findUnique({
      where: { id },
      include: DESTINATION_INCLUDE,
    });
    if (!destination) return notFound("Destination");
    return ok(destination);
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
    const dto = updateDestinationSchema.parse(body);

    let slug: string | undefined;
    if (dto.name) {
      const baseSlug = toSlug(dto.name);
      slug = await ensureUniqueSlug(baseSlug, async (s) => {
        const existing = await prisma.destination.findUnique({ where: { slug: s } });
        return !!existing && existing.id !== id;
      });
    }

    const destination = await prisma.destination.update({
      where: { id },
      data: {
        ...dto,
        ...(slug !== undefined && { slug }),
      },
      include: DESTINATION_INCLUDE,
    });
    return ok(destination);
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

    await prisma.destination.delete({ where: { id } });
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}