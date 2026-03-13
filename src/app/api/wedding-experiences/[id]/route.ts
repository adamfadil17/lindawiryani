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

// import { updateWeddingExperienceSchema } from "@/utils";

// export async function GET(
//   _req: NextRequest,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   try {
//     const { id } = await params;
//     const experience = await prisma.weddingExperience.findUnique({
//       where: { id },
//       include: { images: { orderBy: { sort_order: "asc" } } },
//     });
//     if (!experience) return notFound("Wedding Experience");
//     return ok(experience);
//   } catch (error) {
//     return handleError(error);
//   }
// }

// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   try {
//     const { id } = await params;
//     const payload = requireAuth(req);
//     requireRole(payload, "admin", "editor");

//     const body = await req.json();
//     const dto = updateWeddingExperienceSchema.parse(body);

//     const experience = await prisma.weddingExperience.update({
//       where: { id },
//       data: dto,
//       include: { images: { orderBy: { sort_order: "asc" } } },
//     });
//     return ok(experience);
//   } catch (error) {
//     return handleError(error);
//   }
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   try {
//     const { id } = await params;
//     const payload = requireAuth(req);
//     requireRole(payload, "admin");

//     await prisma.weddingExperience.delete({ where: { id } });
//     return noContent();
//   } catch (error) {
//     return handleError(error);
//   }
// }
