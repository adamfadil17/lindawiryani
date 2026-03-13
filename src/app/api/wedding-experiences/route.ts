// import { NextRequest } from "next/server";

// import { prisma, handleError, paginated, requireAuth, requireRole, created } from "@/lib";

// import { createWeddingExperienceSchema, parsePagination, paginateQuery } from "@/utils";

// export async function GET(req: NextRequest) {
//   try {
//     const { page, limit, search } = parsePagination(req.nextUrl.searchParams);

//     const where = search
//       ? {
//           OR: [{ title: { contains: search, mode: "insensitive" as const } }, { description: { contains: search, mode: "insensitive" as const } }],
//         }
//       : {};

//     const { data, meta } = await paginateQuery(
//       () => prisma.weddingExperience.count({ where }),
//       (skip, take) =>
//         prisma.weddingExperience.findMany({
//           where,
//           include: { images: { orderBy: { sort_order: "asc" } } },
//           skip,
//           take,
//           orderBy: { created_at: "desc" },
//         }),
//       page,
//       limit,
//     );

//     return paginated(data, meta);
//   } catch (error) {
//     return handleError(error);
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     const payload = requireAuth(req);
//     requireRole(payload, "admin", "editor");

//     const body = await req.json();
//     const dto = createWeddingExperienceSchema.parse(body);

//     const experience = await prisma.weddingExperience.create({
//       data: dto,
//       include: { images: true },
//     });

//     return created(experience);
//   } catch (error) {
//     return handleError(error);
//   }
// }
