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
import { updateVenueSchema } from "@/utils";
import { toSlug, ensureUniqueSlug } from "@/utils/slug";
import { moveFromTemp } from "@/utils/file";
import { unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

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

const VENUE_INCLUDE = {
  destination: true,
  experience: true,
  gallery: { orderBy: { sort_order: "asc" as const } },
  themes: true,
  portfolios: true,
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const venue = await prisma.venue.findUnique({
      where: { id },
      include: VENUE_INCLUDE,
    });
    if (!venue) return notFound("Venue");
    return ok(venue);
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

    const existing = await prisma.venue.findUnique({ where: { id } });
    if (!existing) return notFound("Venue");

    const body = await req.json();
    const dto = updateVenueSchema.parse(body);

    let slug: string | undefined;
    if (dto.name) {
      const baseSlug = toSlug(dto.name);
      slug = await ensureUniqueSlug(baseSlug, async (s) => {
        const found = await prisma.venue.findUnique({ where: { slug: s } });
        return !!found && found.id !== id;
      });
    }

    const finalSlug = slug ?? existing.slug;

    let image = dto.image;
    if (image && image !== existing.image) {
      image = await moveFromTemp(image, `venues/${finalSlug}`);
      await deleteFile(existing.image);
    }

    const venue = await prisma.venue.update({
      where: { id },
      data: {
        ...dto,
        ...(image !== undefined && { image }),
        ...(slug !== undefined && { slug }),
      },
      include: VENUE_INCLUDE,
    });
    return ok(venue);
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

    const existing = await prisma.venue.findUnique({
      where: { id },
      include: { gallery: true },
    });
    if (!existing) return notFound("Venue");

    await deleteFile(existing.image);
    await Promise.all(existing.gallery.map((g) => deleteFile(g.url)));

    await prisma.venue.delete({ where: { id } });

    return noContent();
  } catch (error) {
    return handleError(error);
  }
}
