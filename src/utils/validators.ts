import { z } from "zod";

const uuidSchema = z.string();

const slugSchema = z
  .string()
  .min(2)
  .max(255)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase-kebab-case");

const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type PaginationQuery = z.infer<typeof paginationSchema>;

export function parsePagination(searchParams: URLSearchParams): PaginationQuery {
  return paginationSchema.parse({
    page: searchParams.get("page") ?? 1,
    limit: searchParams.get("limit") ?? 10,
    search: searchParams.get("search") ?? undefined,
    sortBy: searchParams.get("sortBy") ?? undefined,
    sortOrder: searchParams.get("sortOrder") ?? "desc",
  });
}

export const createUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  role: z.enum(["admin", "editor", "user"]).default("user"),
});

export const updateUserSchema = createUserSchema.omit({ password: true }).partial();

export const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(1),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type LoginDto = z.infer<typeof loginSchema>;

export const createGallerySchema = z.object({
  image_url: z.array(z.string()).min(1),
  sort_order: z.number().int().min(0).default(0),
  category: z.string().min(1).max(100),
});

export const updateGallerySchema = createGallerySchema.partial();

export type CreateGalleryDto = z.infer<typeof createGallerySchema>;
export type UpdateGalleryDto = z.infer<typeof updateGallerySchema>;

export const createLocationSchema = z.object({
  name: z.string().min(2).max(255),
  slug: slugSchema,
  parent_id: uuidSchema.nullable().optional(),
});

export const updateLocationSchema = createLocationSchema.partial();

export type CreateLocationDto = z.infer<typeof createLocationSchema>;
export type UpdateLocationDto = z.infer<typeof updateLocationSchema>;

export const createWeddingThemeSchema = z.object({
  name: z.string().min(2).max(255),
  slug: slugSchema,
  description: z.string().optional(),
  og_image: z.string().url().optional().or(z.literal("")),
});

export const updateWeddingThemeSchema = createWeddingThemeSchema.partial();

export type CreateWeddingThemeDto = z.infer<typeof createWeddingThemeSchema>;
export type UpdateWeddingThemeDto = z.infer<typeof updateWeddingThemeSchema>;

export const createVenueSchema = z.object({
  name: z.string().min(2).max(255),
  slug: slugSchema,
  venue_type: z.string().min(1).max(100),
  location_id: uuidSchema,
  wedding_theme_id: uuidSchema.nullable().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  featured_image: z.string().url().optional().or(z.literal("")),
  is_featured: z.boolean().default(false),
  og_image: z.string().url().optional().or(z.literal("")),
});

export const updateVenueSchema = createVenueSchema.partial();

export type CreateVenueDto = z.infer<typeof createVenueSchema>;
export type UpdateVenueDto = z.infer<typeof updateVenueSchema>;

export const createServiceSchema = z.object({
  title: z.string().min(2).max(255),
  slug: slugSchema,
  description: z.string().optional(),
  content: z.string().optional(),
  featured_image: z.string().url().optional().or(z.literal("")),
  is_active: z.boolean().default(true),
  og_image: z.string().url().optional().or(z.literal("")),
});

export const updateServiceSchema = createServiceSchema.partial();

export type CreateServiceDto = z.infer<typeof createServiceSchema>;
export type UpdateServiceDto = z.infer<typeof updateServiceSchema>;

export const createWeddingExperienceSchema = z.object({
  title: z.string().min(2).max(255),
  slug: slugSchema,
  description: z.string().optional(),
  content: z.string().optional(),
  featured_image: z.string().url().optional().or(z.literal("")),
});

export const updateWeddingExperienceSchema = createWeddingExperienceSchema.partial();

export type CreateWeddingExperienceDto = z.infer<typeof createWeddingExperienceSchema>;
export type UpdateWeddingExperienceDto = z.infer<typeof updateWeddingExperienceSchema>;

export const createInquirySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  wedding_date: z.string().datetime().optional().or(z.literal("")),
  venue_preference: z.string().optional(),
  theme_preference: z.string().optional(),
  service_interest: z.string().optional(),
  message: z.string().optional(),
});

export const updateInquiryStatusSchema = z.object({
  status: z.enum(["pending", "contacted", "closed"]),
});

export type CreateInquiryDto = z.infer<typeof createInquirySchema>;
export type UpdateInquiryStatusDto = z.infer<typeof updateInquiryStatusSchema>;

const imageUrlSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

export const createImageSchema = z.object({
  portfolio_id: uuidSchema.nullable().optional(),
  venue_id: uuidSchema.nullable().optional(),
  theme_id: uuidSchema.nullable().optional(),
  service_id: uuidSchema.nullable().optional(),
  wedding_experiences_id: uuidSchema.nullable().optional(),
  image_url: imageUrlSchema,
  sort_order: z.number().int().min(0).default(0),
});

export const updateImageSchema = createImageSchema.partial();

export type CreateImageDto = z.infer<typeof createImageSchema>;
export type UpdateImageDto = z.infer<typeof updateImageSchema>;
