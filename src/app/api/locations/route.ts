// import { NextRequest } from "next/server";

// import { prisma, handleError, paginated, requireAuth, requireRole, created } from "@/lib";

// import { createLocationSchema, parsePagination, paginateQuery } from "@/utils";

// export async function GET(req: NextRequest) {
//   try {
//     const { page, limit, search } = parsePagination(req.nextUrl.searchParams);
//     const parentOnly = req.nextUrl.searchParams.get("parentOnly") === "true";

//     const where: Record<string, unknown> = {};
//     if (search) {
//       where.OR = [{ name: { contains: search, mode: "insensitive" } }, { slug: { contains: search, mode: "insensitive" } }];
//     }
//     if (parentOnly) where.parent_id = null;

//     const { data, meta } = await paginateQuery(
//       () => prisma.location.count({ where }),
//       (skip, take) =>
//         prisma.location.findMany({
//           where,
//           include: { parent: true, children: true },
//           skip,
//           take,
//           orderBy: { name: "asc" },
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
//     const dto = createLocationSchema.parse(body);

//     const location = await prisma.location.create({
//       data: dto,
//       include: { parent: true, children: true },
//     });

//     return created(location);
//   } catch (error) {
//     return handleError(error);
//   }
// }
