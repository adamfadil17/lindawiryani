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
import { moveFromTemp } from "@/utils/file";
import path from "path";
import { existsSync } from "fs";
import { unlink } from "fs/promises";

const UPLOAD_DIR =
  process.env.UPLOAD_DIR ?? path.join(process.cwd(), "public", "uploads");
const UPLOAD_URL_BASE = process.env.UPLOAD_URL_BASE ?? "/uploads";

async function deleteFile(url: string) {
  if (!url || !url.startsWith(UPLOAD_URL_BASE)) return;
  const relativePath = url.slice(UPLOAD_URL_BASE.length);
  const filepath = path.join(UPLOAD_DIR, relativePath);
  if (existsSync(filepath)) {
    await unlink(filepath).catch(() => {});
  }
}

const DESTINATION_INCLUDE = {
  location: {
    include: { category: true },
  },
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

    const payload = await requireAuth(req);
    requireRole(payload, "admin", "editor");

    const existing = await prisma.destination.findUnique({ where: { id } });
    if (!existing) return notFound("Destination");

    const body = await req.json();
    const dto = updateDestinationSchema.parse(body);

    let slug: string | undefined;
    if (dto.name) {
      const baseSlug = `${toSlug(dto.name)}-wedding`;
      slug = await ensureUniqueSlug(baseSlug, async (s) => {
        const existing = await prisma.destination.findUnique({
          where: { slug: s },
        });
        return !!existing && existing.id !== id;
      });
    }

    const finalSlug = slug ?? existing.slug;

    let image = dto.image;
    if (image && image !== existing.image) {
      image = await moveFromTemp(image, `destinations/${finalSlug}`);
      await deleteFile(existing.image);
    }

    const destination = await prisma.destination.update({
      where: { id },
      data: {
        ...dto,
        ...(image !== undefined && { image }),
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

    const payload = await requireAuth(req);
    requireRole(payload, "admin");

    const existing = await prisma.destination.findUnique({ where: { id } });
    if (!existing) return notFound("Destination");

    await deleteFile(existing.image);

    await prisma.destination.delete({ where: { id } });

    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
