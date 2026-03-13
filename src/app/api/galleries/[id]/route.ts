// import { NextRequest } from "next/server";
// import {
//   prisma,
//   handleError,
//   requireAuth,
//   requireRole,
//   notFound,
//   ok,
//   noContent,
// } from "@/lib";
// import { updateGallerySchema } from "@/utils";

// export async function GET(
//   _req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;

//     const gallery = await prisma.gallery.findUnique({
//       where: { id },
//       include: { images: true },
//     });

//     if (!gallery) return notFound("Gallery");
//     return ok(gallery);
//   } catch (error) {
//     return handleError(error);
//   }
// }

// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;

//     const payload = requireAuth(req);
//     requireRole(payload, "admin", "editor");

//     const body = await req.json();
//     const dto = updateGallerySchema.parse(body);

//     const gallery = await prisma.gallery.update({
//       where: { id },
//       data: dto,
//       include: { images: true },
//     });

//     return ok(gallery);
//   } catch (error) {
//     return handleError(error);
//   }
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;

//     const payload = requireAuth(req);
//     requireRole(payload, "admin");

//     await prisma.gallery.delete({ where: { id } });
//     return noContent();
//   } catch (error) {
//     return handleError(error);
//   }
// }