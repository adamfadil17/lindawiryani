// import { NextRequest } from "next/server";

// import { prisma, handleError, paginated, requireAuth, requireRole, created } from "@/lib";

// import { createImageSchema, parsePagination, paginateQuery } from "@/utils";

// const IMAGE_INCLUDE = {
//   gallery: true,
//   venue: true,
//   wedding_theme: true,
//   service: true,
//   wedding_experience: true,
// };

// export async function GET(req: NextRequest) {
//   try {
//     const { page, limit } = parsePagination(req.nextUrl.searchParams);
//     const venueId = req.nextUrl.searchParams.get("venueId") ?? undefined;
//     const themeId = req.nextUrl.searchParams.get("themeId") ?? undefined;
//     const serviceId = req.nextUrl.searchParams.get("serviceId") ?? undefined;
//     const portfolioId = req.nextUrl.searchParams.get("portfolioId") ?? undefined;
//     const experienceId = req.nextUrl.searchParams.get("experienceId") ?? undefined;

//     const where: Record<string, unknown> = {};
//     if (venueId) where.venue_id = venueId;
//     if (themeId) where.theme_id = themeId;
//     if (serviceId) where.service_id = serviceId;
//     if (portfolioId) where.portfolio_id = portfolioId;
//     if (experienceId) where.wedding_experiences_id = experienceId;

//     const { data, meta } = await paginateQuery(
//       () => prisma.image.count({ where }),
//       (skip, take) =>
//         prisma.image.findMany({
//           where,
//           include: IMAGE_INCLUDE,
//           skip,
//           take,
//           orderBy: { sort_order: "asc" },
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
//     const dto = createImageSchema.parse(body);

//     const image = await prisma.image.create({
//       data: dto,
//       include: IMAGE_INCLUDE,
//     });

//     return created(image);
//   } catch (error) {
//     return handleError(error);
//   }
// }
