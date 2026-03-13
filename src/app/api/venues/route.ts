// import { NextRequest } from "next/server";

// import { prisma, handleError, paginated, requireAuth, requireRole, created } from "@/lib";

// import { createVenueSchema, parsePagination, paginateQuery } from "@/utils";

// const VENUE_INCLUDE = {
//   location: { include: { parent: true } },
//   wedding_theme: true,
//   images: { orderBy: { sort_order: "asc" as const } },
// };

// export async function GET(req: NextRequest) {
//   try {
//     const { page, limit, search } = parsePagination(req.nextUrl.searchParams);
//     const locationId = req.nextUrl.searchParams.get("locationId") ?? undefined;
//     const themeId = req.nextUrl.searchParams.get("themeId") ?? undefined;
//     const venueType = req.nextUrl.searchParams.get("venueType") ?? undefined;
//     const featured = req.nextUrl.searchParams.get("featured");

//     const where: Record<string, unknown> = {};
//     if (search) {
//       where.OR = [{ name: { contains: search, mode: "insensitive" } }, { description: { contains: search, mode: "insensitive" } }];
//     }
//     if (locationId) where.location_id = locationId;
//     if (themeId) where.wedding_theme_id = themeId;
//     if (venueType) where.venue_type = venueType;
//     if (featured === "true") where.is_featured = true;

//     const { data, meta } = await paginateQuery(
//       () => prisma.venue.count({ where }),
//       (skip, take) =>
//         prisma.venue.findMany({
//           where,
//           include: VENUE_INCLUDE,
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
//     const dto = createVenueSchema.parse(body);

//     const venue = await prisma.venue.create({
//       data: {
//         name: dto.name,
//         slug: dto.slug,
//         venue_type: dto.venue_type,
//         location_id: dto.location_id,
//         wedding_theme_id: dto.wedding_theme_id ?? null,
//         description: dto.description,
//         content: dto.content,
//         featured_image: dto.featured_image,
//         is_featured: dto.is_featured,
//         og_image: dto.og_image,
//       },
//       include: VENUE_INCLUDE,
//     });

//     return created(venue);
//   } catch (error) {
//     return handleError(error);
//   }
// }
