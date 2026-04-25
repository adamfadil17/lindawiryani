import { z } from "zod";

const uuidSchema = z.string().uuid();

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

export function parsePagination(
  searchParams: URLSearchParams,
): PaginationQuery {
  return paginationSchema.parse({
    page: searchParams.get("page") ?? 1,
    limit: searchParams.get("limit") ?? 10,
    search: searchParams.get("search") ?? undefined,
    sortBy: searchParams.get("sortBy") ?? undefined,
    sortOrder: searchParams.get("sortOrder") ?? "desc",
  });
}

// ─────────────────────────────────────────────
// USER
// ─────────────────────────────────────────────

export const createUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  role: z.enum(["admin", "editor", "user"]).default("user"),
});

export const updateUserSchema = createUserSchema
  .omit({ password: true })
  .partial();

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type LoginDto = z.infer<typeof loginSchema>;

// ─────────────────────────────────────────────
// DESTINATION CATEGORY
// ─────────────────────────────────────────────

export const createDestinationCategorySchema = z.object({
  name: z.string().min(2).max(255),
  slug: slugSchema,
  description: z.string().min(1).max(250),
});

export const updateDestinationCategorySchema =
  createDestinationCategorySchema.partial();

export type CreateDestinationCategoryDto = z.infer<
  typeof createDestinationCategorySchema
>;
export type UpdateDestinationCategoryDto = z.infer<
  typeof updateDestinationCategorySchema
>;

// ─────────────────────────────────────────────
// DESTINATION LOCATION
// ─────────────────────────────────────────────

export const createDestinationLocationSchema = z.object({
  name: z.string().min(2).max(255),
  slug: slugSchema,
  category_id: uuidSchema,
});

export const updateDestinationLocationSchema =
  createDestinationLocationSchema.partial();

export type CreateDestinationLocationDto = z.infer<
  typeof createDestinationLocationSchema
>;
export type UpdateDestinationLocationDto = z.infer<
  typeof updateDestinationLocationSchema
>;

// ─────────────────────────────────────────────
// DESTINATION
// ─────────────────────────────────────────────

export const createDestinationSchema = z.object({
  name: z.string().min(2).max(255),
  slug: slugSchema,
  location_id: uuidSchema,
  type: z.string().min(1).max(100),
  description: z.string().min(1),
  long_description: z.string().min(1),
  atmosphere: z.string().min(1),
  accessibility_notes: z.string().min(1),
  seasonal_considerations: z.string().min(1),
  image: z.string().url(),
  guest_capacity: z.string().min(1),
  highlights: z.array(z.string()).min(1),
  best_for: z.array(z.string()).min(1),
  ceremony_options: z.array(z.string()).min(1),
  reception_options: z.array(z.string()).min(1),
  accommodation_nearby: z.array(z.string()).min(1),
  dining_experiences: z.array(z.string()).min(1),
  unique_features: z.array(z.string()).min(1),
});

export const updateDestinationSchema = createDestinationSchema.partial();

export type CreateDestinationDto = z.infer<typeof createDestinationSchema>;
export type UpdateDestinationDto = z.infer<typeof updateDestinationSchema>;

// ─────────────────────────────────────────────
// WEDDING EXPERIENCE
// ─────────────────────────────────────────────

export const weddingExperienceTypeEnum = z.enum([
  "elopement_weddings",
  "intimate_weddings",
  "luxury_weddings",
  "private_villa_weddings",
]);

export const weddingExperienceHeroStyleEnum = z.enum([
  "split",
  "centered",
  "editorial",
  "bottom",
]);

export const createWeddingExperienceSchema = z.object({
  slug: slugSchema,
  category: weddingExperienceTypeEnum,
  name: z.string().min(2).max(255),

  // Hero
  hero_style: weddingExperienceHeroStyleEnum,
  hero_image: z.string().url(),
  hero_desc: z.string().min(1),

  // Intro
  intro_label: z.string().min(1),
  intro_heading: z.tuple([z.string(), z.string()]),
  intro_body: z.string().min(1),
  intro_list_label: z.string().nullable().optional(),
  intro_list: z.array(z.string()),
  intro_footnote: z.string().nullable().optional(),
  intro_images: z.array(z.string().url()).max(2),

  // Approach
  approach_label: z.string().min(1),
  approach_heading: z.tuple([z.string(), z.string()]),
  approach_body: z.string().min(1),
  approach_list_label: z.string().nullable().optional(),
  approach_list: z.array(z.string()),
  approach_image: z.string().url(),

  // Services
  services_label: z.string().min(1),
  services_heading: z.tuple([z.string(), z.string()]),
  services_list: z.array(z.string()).min(1),
  services_footnote: z.string().min(1),
  services_dark_label: z.string().min(1),
  services_dark_heading: z.tuple([z.string(), z.string()]),
  services_dark_body: z.string().min(1),
  services_dark_list: z.array(z.string()).min(1),

  // Closing
  closing_label: z.string().min(1),
  closing_heading: z.tuple([z.string(), z.string()]),
  closing_body: z.string().min(1),
  closing_image: z.string().url(),
  closing_couple_label: z.string().nullable().optional(),
  closing_couple_values: z.array(z.string()),
});

export const updateWeddingExperienceSchema =
  createWeddingExperienceSchema.partial();

export type CreateWeddingExperienceDto = z.infer<
  typeof createWeddingExperienceSchema
>;
export type UpdateWeddingExperienceDto = z.infer<
  typeof updateWeddingExperienceSchema
>;

// ─────────────────────────────────────────────
// EXPERIENCE FAQ
// ─────────────────────────────────────────────

export const createExperienceFaqSchema = z.object({
  experience_id: uuidSchema,
  question: z.string().min(2),
  answer: z.string().min(2),
  sort_order: z.number().int().min(0).default(0),
});

export const updateExperienceFaqSchema = createExperienceFaqSchema
  .omit({ experience_id: true })
  .partial();

export type CreateExperienceFaqDto = z.infer<typeof createExperienceFaqSchema>;
export type UpdateExperienceFaqDto = z.infer<typeof updateExperienceFaqSchema>;

// ─────────────────────────────────────────────
// VENUE
// ─────────────────────────────────────────────

export const createVenueSchema = z.object({
  slug: slugSchema,
  name: z.string().min(2).max(255),
  slogan: z.string().min(2),
  description: z.string().min(1),
  image: z.string().url(),
  capacity: z.number().int().positive(),
  starting_price: z.number().positive(),
  destination_id: uuidSchema,
  experience_id: uuidSchema,
});

export const updateVenueSchema = createVenueSchema.partial();

export type CreateVenueDto = z.infer<typeof createVenueSchema>;
export type UpdateVenueDto = z.infer<typeof updateVenueSchema>;

// ─────────────────────────────────────────────
// VENUE IMAGE
// ─────────────────────────────────────────────

export const createVenueImageSchema = z.object({
  venue_id: uuidSchema,
  url: z.string().url(),
  sort_order: z.number().int().min(0).default(0),
});

export const updateVenueImageSchema = createVenueImageSchema
  .omit({ venue_id: true })
  .partial();

export type CreateVenueImageDto = z.infer<typeof createVenueImageSchema>;
export type UpdateVenueImageDto = z.infer<typeof updateVenueImageSchema>;

// ─────────────────────────────────────────────
// WEDDING THEME
// ─────────────────────────────────────────────

export const weddingThemeTypeEnum = z.enum(["ELOPEMENT", "INTIMATE"]);

export const createWeddingThemeSchema = z.object({
  slug: slugSchema,
  title: z.string().min(2).max(255),
  description: z.string().min(1),
  image: z.string().url(),
  venue_id: z
    .union([uuidSchema, z.literal(""), z.undefined()])
    .transform((v) => v || undefined),
  experience_id: uuidSchema,
});

export const updateWeddingThemeSchema = createWeddingThemeSchema.partial();

export type CreateWeddingThemeDto = z.infer<typeof createWeddingThemeSchema>;
export type UpdateWeddingThemeDto = z.infer<typeof updateWeddingThemeSchema>;

// ─────────────────────────────────────────────
// WEDDING THEME IMAGE
// ─────────────────────────────────────────────

export const createWeddingThemeImageSchema = z.object({
  theme_id: uuidSchema,
  url: z.string().url(),
  sort_order: z.number().int().min(0).default(0),
});

export const updateWeddingThemeImageSchema = createWeddingThemeImageSchema
  .omit({ theme_id: true })
  .partial();

export type CreateWeddingThemeImageDto = z.infer<
  typeof createWeddingThemeImageSchema
>;
export type UpdateWeddingThemeImageDto = z.infer<
  typeof updateWeddingThemeImageSchema
>;

// ─────────────────────────────────────────────
// ARTICLE
// ─────────────────────────────────────────────

export const articleCategoryEnum = z.enum([
  "Guides",
  "Featured",
  "Planning_Advice",
  "Destination_Knowledge",
  "Venue_and_Location",
  "Real_Weddings",
  "Design_and_Concept",
]);

export const createArticleSchema = z.object({
  slug: slugSchema,
  category: articleCategoryEnum,
  title: z.string().min(2).max(255),
  excerpt: z.string().min(1),
  published_at: z.string().datetime(),
  image: z.string().url(),
  content: z.string().min(1),
});

export const updateArticleSchema = createArticleSchema.partial();

export type CreateArticleDto = z.infer<typeof createArticleSchema>;
export type UpdateArticleDto = z.infer<typeof updateArticleSchema>;

// ─────────────────────────────────────────────
// PORTFOLIO
// ─────────────────────────────────────────────

const storySectionSchema = z.object({
  heading: z.string().optional(),
  body: z.array(z.string()).min(1),
});

export const createPortfolioSchema = z.object({
  slug: slugSchema,
  couple: z.string().min(2).max(255),
  subtitle: z.string().min(1),
  destination_id: z
    .union([uuidSchema, z.literal(""), z.undefined()])
    .transform((v) => v || undefined),
  venue_id: z
    .union([uuidSchema, z.literal(""), z.undefined()])
    .transform((v) => v || undefined),
  experience_id: z
    .union([uuidSchema, z.literal(""), z.undefined()])
    .transform((v) => v || undefined),
  image: z.string().url(),
  tags: z.array(z.string()).min(1),
  excerpt: z.string().min(1),
  origin: z.string().optional(),
  review: z.string().optional(),
  content: z.string().optional(),
  story_sections: z.array(storySectionSchema),
  credit_role: z.string().min(1),
  credit_planner: z.string().min(1),
  credit_location_detail: z.string().min(1),
  credit_couple_origin: z.string().min(1),
});

export const updatePortfolioSchema = createPortfolioSchema.partial();

export type CreatePortfolioDto = z.infer<typeof createPortfolioSchema>;
export type UpdatePortfolioDto = z.infer<typeof updatePortfolioSchema>;

// ─────────────────────────────────────────────
// PORTFOLIO IMAGE
// ─────────────────────────────────────────────

export const createPortfolioImageSchema = z.object({
  portfolio_id: uuidSchema,
  url: z.string().url(),
  sort_order: z.number().int().min(0).default(0),
});

export const updatePortfolioImageSchema = createPortfolioImageSchema
  .omit({ portfolio_id: true })
  .partial();

export type CreatePortfolioImageDto = z.infer<
  typeof createPortfolioImageSchema
>;
export type UpdatePortfolioImageDto = z.infer<
  typeof updatePortfolioImageSchema
>;

// ─────────────────────────────────────────────
// SUBMISSION (Vendor & Career)
// ─────────────────────────────────────────────

export const submissionTypeEnum = z.enum(["vendor", "career"]);
export const submissionStatusEnum = z.enum([
  "new",
  "reviewed",
  "contacted",
  "archived",
]);

export const createVendorSubmissionSchema = z.object({
  type: z.literal("vendor"),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional(),
  company_name: z.string().min(2).max(255),
  contact_person: z.string().min(2).max(255),
  vendor_category: z.string().min(1),
  years_in_business: z.string().optional(),
  portfolio_link: z.string().url().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
});

export const createCareerSubmissionSchema = z.object({
  type: z.literal("career"),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional(),
  full_name: z.string().min(2).max(255),
  position: z.string().min(2).max(255),
  experience: z.string().optional(),
  linked_in: z.string().url().optional().or(z.literal("")),
  cover_letter: z.string().optional(),
});

export const createSubmissionSchema = z.discriminatedUnion("type", [
  createVendorSubmissionSchema,
  createCareerSubmissionSchema,
]);

export const updateSubmissionStatusSchema = z.object({
  status: submissionStatusEnum,
});

export type CreateVendorSubmissionDto = z.infer<
  typeof createVendorSubmissionSchema
>;
export type CreateCareerSubmissionDto = z.infer<
  typeof createCareerSubmissionSchema
>;
export type CreateSubmissionDto = z.infer<typeof createSubmissionSchema>;
export type UpdateSubmissionStatusDto = z.infer<
  typeof updateSubmissionStatusSchema
>;

// ─────────────────────────────────────────────
// INQUIRY SUBMISSION
// ─────────────────────────────────────────────

export const inquiryStatusEnum = z.enum([
  "new",
  "reviewed",
  "quoted",
  "booked",
  "archived",
]);

export const createInquirySchema = z.object({
  // Contact Info
  your_name: z.string().min(2).max(100),
  your_email: z.string().email(),
  your_address: z.string().min(2),
  telephone: z.string().min(1),

  // Groom
  name_of_groom: z.string().min(2).max(100),
  religion_of_groom: z.string().min(1),
  nationality_of_groom: z.string().min(1),

  // Bride
  name_of_bride: z.string().min(2).max(100),
  religion_of_bride: z.string().min(1),
  nationality_of_bride: z.string().min(1),

  // Wedding Details
  wedding_date: z.string().min(1),
  wedding_venue: z.string().min(1),
  number_of_attendance: z.string().min(1),
  approximate_wedding_budget: z.string().min(1),

  // Accommodation & Travel
  hotel_name_in_bali: z.string().min(1),
  arrival_date: z.string().min(1),
  departure_date: z.string().min(1),

  // Vision
  your_message: z.string().min(1),
});

export const updateInquiryStatusSchema = z.object({
  status: inquiryStatusEnum,
});

export type CreateInquiryDto = z.infer<typeof createInquirySchema>;
export type UpdateInquiryStatusDto = z.infer<typeof updateInquiryStatusSchema>;

// ─────────────────────────────────────────────
// OPEN POSITION
// ─────────────────────────────────────────────

export const createOpenPositionSchema = z.object({
  title: z.string().min(2).max(255),
  type: z.string().min(1),
  level: z.string().min(1),
  desc: z.string().min(1),
  is_active: z.boolean().default(true),
});

export const updateOpenPositionSchema = createOpenPositionSchema.partial();

export type CreateOpenPositionDto = z.infer<typeof createOpenPositionSchema>;
export type UpdateOpenPositionDto = z.infer<typeof updateOpenPositionSchema>;
