// import { NextRequest } from "next/server";

// import { prisma, handleError, paginated, requireAuth, requireRole, created } from "@/lib";

// import { createServiceSchema, parsePagination, paginateQuery } from "@/utils";

// export async function GET(req: NextRequest) {
//   try {
//     const { page, limit, search } = parsePagination(req.nextUrl.searchParams);
//     const activeOnly = req.nextUrl.searchParams.get("active") === "true";

//     const where: Record<string, unknown> = {};
//     if (search) {
//       where.OR = [{ title: { contains: search, mode: "insensitive" } }, { description: { contains: search, mode: "insensitive" } }];
//     }
//     if (activeOnly) where.is_active = true;

//     const { data, meta } = await paginateQuery(
//       () => prisma.service.count({ where }),
//       (skip, take) =>
//         prisma.service.findMany({
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
//     const dto = createServiceSchema.parse(body);

//     const service = await prisma.service.create({
//       data: dto,
//       include: { images: true },
//     });

//     return created(service);
//   } catch (error) {
//     return handleError(error);
//   }
// }
