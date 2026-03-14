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
import { updateDestinationCategorySchema } from "@/utils";

const DESTINATION_CATEGORY_INCLUDE = {
  destinations: true,
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const category = await prisma.destinationCategory.findUnique({
      where: { id },
      include: DESTINATION_CATEGORY_INCLUDE,
    });
    if (!category) return notFound("Destination Category");
    return ok(category);
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
    const dto = updateDestinationCategorySchema.parse(body);

    const category = await prisma.destinationCategory.update({
      where: { id: id },
      data: dto,
      include: DESTINATION_CATEGORY_INCLUDE,
    });
    return ok(category);
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

    await prisma.destinationCategory.delete({ where: { id } });
    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
