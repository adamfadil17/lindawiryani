// import { NextRequest } from "next/server";

// import { prisma, handleError, paginated, requireAuth, requireRole, created } from "@/lib";

// import { createWeddingThemeSchema, parsePagination, paginateQuery } from "@/utils";

// export async function GET(req: NextRequest) {
//   try {
//     const { page, limit, search } = parsePagination(req.nextUrl.searchParams);

//     const where = search
//       ? {
//           OR: [{ name: { contains: search, mode: "insensitive" as const } }, { slug: { contains: search, mode: "insensitive" as const } }],
//         }
//       : {};

//     const { data, meta } = await paginateQuery(
//       () => prisma.weddingTheme.count({ where }),
//       (skip, take) =>
//         prisma.weddingTheme.findMany({
//           where,
//           include: { images: { orderBy: { sort_order: "asc" } } },
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
//     const dto = createWeddingThemeSchema.parse(body);

//     const theme = await prisma.weddingTheme.create({
//       data: dto,
//       include: { images: true },
//     });

//     return created(theme);
//   } catch (error) {
//     return handleError(error);
//   }
// }
