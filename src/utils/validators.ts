import { z } from "zod";

import { ARTICLE_CATEGORY_VALUES } from "@/lib/article-category";

const uuidSchema = z.string().uuid();

const slugSchema = z
  .string()
  .min(2)
  .max(255)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase-kebab-case");

const paginationSchema = z.object({  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().max(200).optional(),
  sortBy: z.string().max(50).optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type PaginationQuery = z.infer<typeof paginationSchema>;

// ─────────────────────────────────────────────
// CONTENT I18N / PUBLISH
// ─────────────────────────────────────────────

export const contentStatusSchema = z.enum(["draft", "published"]);
export const translationLocaleEnum = z.enum(["id", "zh", "fr", "ja", "de"]);

const optionalText = z.string().max(50000).optional();
const optionalList = z.array(z.string()).optional();
const optionalPair = z.tuple([z.string(), z.string()]).optional();

const categoryTranslationSchema = z.object({
  name: z.string().max(255).optional(),
});

const destinationTranslationSchema = z.object({
  name: z.string().max(255).optional(),
  type: z.string().max(255).optional(),
  description: optionalText,
  long_description: optionalText,
  location: z.string().max(255).optional(),
  atmosphere: optionalText,
  accessibility_notes: optionalText,
  seasonal_considerations: optionalText,
  guest_capacity: z.string().max(255).optional(),
  highlights: optionalList,
  best_for: optionalList,
  ceremony_options: optionalList,
  reception_options: optionalList,
  accommodation_nearby: optionalList,
  dining_experiences: optionalList,
  unique_features: optionalList,
});

const experienceTranslationSchema = z.object({
  name: z.string().max(255).optional(),
  hero_desc: optionalText,
  intro_label: z.string().max(255).optional(),
  intro_heading: optionalPair,
  intro_body: optionalText,
  intro_list_label: z.string().max(255).optional(),
  intro_list: optionalList,
  intro_footnote: optionalText,
  approach_label: z.string().max(255).optional(),
  approach_heading: optionalPair,
  approach_body: optionalText,
  approach_list_label: z.string().max(255).optional(),
  approach_list: optionalList,
  services_label: z.string().max(255).optional(),
  services_heading: optionalPair,
  services_list: optionalList,
  services_footnote: optionalText,
  services_dark_label: z.string().max(255).optional(),
  services_dark_heading: optionalPair,
  services_dark_body: optionalText,
  services_dark_list: optionalList,
  closing_label: z.string().max(255).optional(),
  closing_heading: optionalPair,
  closing_body: optionalText,
  closing_couple_label: z.string().max(255).optional(),
  closing_couple_values: optionalList,
});

const faqTranslationSchema = z.object({
  question: z.string().max(2000).optional(),
  answer: z.string().max(20000).optional(),
});

const venueTranslationSchema = z.object({
  name: z.string().max(255).optional(),
  slogan: z.string().max(500).optional(),
  description: optionalText,
});

const themeTranslationSchema = z.object({
  title: z.string().max(255).optional(),
  description: optionalText,
  inclusions: optionalList,
});

const portfolioTranslationSchema = z.object({
  subtitle: z.string().max(500).optional(),
  tags: optionalList,
  excerpt: optionalText,
  origin: z.string().max(255).optional(),
  review: optionalText,
  content: z.string().max(500000).optional(),
  story_sections: z.array(z.unknown()).optional(),
  credit_role: z.string().max(500).optional(),
  credit_location_detail: z.string().max(500).optional(),
  credit_couple_origin: z.string().max(500).optional(),
});

const articleTranslationSchema = z.object({
  title: z.string().max(255).optional(),
  excerpt: optionalText,
  content: z.string().max(500000).optional(),
});

const positionTranslationSchema = z.object({
  title: z.string().max(255).optional(),
  type: z.string().max(255).optional(),
  level: z.string().max(255).optional(),
  desc: optionalText,
});

const translationsSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.partialRecord(translationLocaleEnum, schema).optional();

export function parsePagination(searchParams: URLSearchParams): PaginationQuery {
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

export const userRoleEnum = z.enum(["admin", "editor", "user"]);

export const createUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  role: userRoleEnum.default("user"),
});

export const updateUserSchema = createUserSchema.omit({ password: true }).partial();

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
  slug: slugSchema.optional(),
  status: contentStatusSchema.optional(),
  translations: translationsSchema(categoryTranslationSchema),
});

export const updateDestinationCategorySchema = createDestinationCategorySchema.partial();

export type CreateDestinationCategoryDto = z.infer<typeof createDestinationCategorySchema>;
export type UpdateDestinationCategoryDto = z.infer<typeof updateDestinationCategorySchema>;

// ─────────────────────────────────────────────
// DESTINATION
// ─────────────────────────────────────────────

export const createDestinationSchema = z.object({
  name: z.string().min(2).max(255),
  slug: slugSchema,
  category_id: uuidSchema,
  type: z.string().min(1).max(100),
  description: z.string().min(1),
  long_description: z.string().min(1),
  location: z.string().min(1),
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
  status: contentStatusSchema.optional(),
  translations: translationsSchema(destinationTranslationSchema),
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
  status: contentStatusSchema.optional(),
  translations: translationsSchema(experienceTranslationSchema),
});

export const updateWeddingExperienceSchema = createWeddingExperienceSchema.partial();

export type CreateWeddingExperienceDto = z.infer<typeof createWeddingExperienceSchema>;
export type UpdateWeddingExperienceDto = z.infer<typeof updateWeddingExperienceSchema>;

// ─────────────────────────────────────────────
// EXPERIENCE FAQ
// ─────────────────────────────────────────────

export const createExperienceFaqSchema = z.object({
  experience_id: uuidSchema,
  slug: slugSchema.optional(),
  question: z.string().min(2),
  answer: z.string().min(2),
  sort_order: z.number().int().min(0).default(0),
  translations: translationsSchema(faqTranslationSchema),
});

export const updateExperienceFaqSchema = createExperienceFaqSchema.omit({ experience_id: true }).partial();

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
  status: contentStatusSchema.optional(),
  translations: translationsSchema(venueTranslationSchema),
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

export const updateVenueImageSchema = createVenueImageSchema.omit({ venue_id: true }).partial();

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
  inclusions: z.array(z.string()).min(1),
  venue_id: z
      .union([uuidSchema, z.literal(""), z.undefined()])
      .transform((v) => v || undefined),
  experience_id: uuidSchema,
  status: contentStatusSchema.optional(),
  translations: translationsSchema(themeTranslationSchema),
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

export const updateWeddingThemeImageSchema = createWeddingThemeImageSchema.omit({ theme_id: true }).partial();

export type CreateWeddingThemeImageDto = z.infer<typeof createWeddingThemeImageSchema>;
export type UpdateWeddingThemeImageDto = z.infer<typeof updateWeddingThemeImageSchema>;

// ─────────────────────────────────────────────
// ARTICLE
// ─────────────────────────────────────────────

export const articleCategoryEnum = z.enum([...ARTICLE_CATEGORY_VALUES]);

export const createArticleSchema = z.object({
  slug: slugSchema,
  category: articleCategoryEnum,
  title: z.string().min(2).max(255),
  excerpt: z.string().min(1),
  published_at: z.string().datetime(),
  image: z.string().url(),
  content: z.string().min(1),
  status: contentStatusSchema.optional(),
  translations: translationsSchema(articleTranslationSchema),
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

/**
 * Optional relation ids accept:
 * - a UUID      → keep/set the relation
 * - "" / null   → clear the relation (Prisma receives null)
 * - undefined   → omitted (no change on PATCH)
 */
const optionalRelationId = z
  .union([uuidSchema, z.literal(""), z.null()])
  .optional();

export const createPortfolioSchema = z.object({
  slug: slugSchema,
  couple: z.string().min(2).max(255),
  subtitle: z.string().min(1),
  destination_id: optionalRelationId,
  venue_id: optionalRelationId,
  experience_id: optionalRelationId,
  image: z.string().url(),
  tags: z.array(z.string()).min(1),
  excerpt: z.string().min(1),
  origin: z.string().nullable().optional(),
  review: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  story_sections: z.array(storySectionSchema),
  credit_role: z.string().min(1),
  credit_planner: z.string().min(1),
  credit_location_detail: z.string().min(1),
  credit_couple_origin: z.string().min(1),
  status: contentStatusSchema.optional(),
  translations: translationsSchema(portfolioTranslationSchema),
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

export const updatePortfolioImageSchema = createPortfolioImageSchema.omit({ portfolio_id: true }).partial();

export type CreatePortfolioImageDto = z.infer<typeof createPortfolioImageSchema>;
export type UpdatePortfolioImageDto = z.infer<typeof updatePortfolioImageSchema>;

// ─────────────────────────────────────────────
// SUBMISSION (Vendor & Career)
// ─────────────────────────────────────────────

export const submissionTypeEnum = z.enum(["vendor", "career"]);
export const submissionStatusEnum = z.enum(["new", "reviewed", "contacted", "archived"]);

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

export type CreateVendorSubmissionDto = z.infer<typeof createVendorSubmissionSchema>;
export type CreateCareerSubmissionDto = z.infer<typeof createCareerSubmissionSchema>;
export type CreateSubmissionDto = z.infer<typeof createSubmissionSchema>;
export type UpdateSubmissionStatusDto = z.infer<typeof updateSubmissionStatusSchema>;

// ─────────────────────────────────────────────
// INQUIRY SUBMISSION
// ─────────────────────────────────────────────

export const inquiryStatusEnum = z.enum(["new", "reviewed", "quoted", "booked", "archived"]);

export const createInquirySchema = z.object({
  // Contact info
  full_name: z.string().min(2).max(150),
  email_or_whatsapp: z.string().min(3).max(255),

  // Wedding details
  wedding_date: z.string().max(100).optional(),
  number_of_guests: z.string().max(50).optional(),

  // Preferences
  wedding_location_interest: z.array(z.string()).default([]),
  wedding_style: z.string().max(100).optional(),
  estimated_budget: z.string().max(100).optional(),
  services_needed: z.array(z.string()).default([]),
  venue_secured: z.string().max(100).optional(),

  // Vision & discovery
  your_vision: z.string().max(5000).optional(),
  how_did_you_find_us: z.string().max(100).optional(),

  // Locale the inquiry was submitted in
  locale: z.string().min(2).max(10).optional(),
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
  slug: slugSchema.optional(),
  title: z.string().min(2).max(255),
  type: z.string().min(1),
  level: z.string().min(1),
  desc: z.string().min(1),
  is_active: z.boolean().default(true),
  status: contentStatusSchema.optional(),
  translations: translationsSchema(positionTranslationSchema),
});

export const updateOpenPositionSchema = createOpenPositionSchema.partial();

export type CreateOpenPositionDto = z.infer<typeof createOpenPositionSchema>;
export type UpdateOpenPositionDto = z.infer<typeof updateOpenPositionSchema>;