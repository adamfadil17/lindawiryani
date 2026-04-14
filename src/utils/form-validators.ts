import { z } from "zod";

// ─────────────────────────────────────────────
// SHARED BASE SCHEMAS
// (mirrors backend: uuidSchema, slugSchema)
// ─────────────────────────────────────────────

const uuidSchema = z.string().uuid("Invalid UUID format");

const slugSchema = z
  .string()
  .min(2, "Slug must be at least 2 characters")
  .max(255, "Slug must be at most 255 characters")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase-kebab-case");

// ─────────────────────────────────────────────
// USER
// ─────────────────────────────────────────────

export const userFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  role: z.enum(["admin", "editor", "user"]).default("user"),
});

export type UserFormData = z.output<typeof userFormSchema>;

// ─────────────────────────────────────────────
// DESTINATION CATEGORY
// ─────────────────────────────────────────────

export const destinationCategoryFormSchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(255, "Category name must be at most 255 characters"),
  slug: slugSchema,
  description: z.string().min(1).max(250, "Category Description must be at most 250 characters"),
});

export type DestinationCategoryFormData = z.infer<
  typeof destinationCategoryFormSchema
>;

// ─────────────────────────────────────────────
// DESTINATION LOCATION
// ─────────────────────────────────────────────

export const destinationLocationFormSchema = z.object({
  name: z
    .string()
    .min(2, "Location name must be at least 2 characters")
    .max(255, "Location name must be at most 255 characters"),
  slug: slugSchema,
  category_id: uuidSchema,
});

export type DestinationLocationFormData = z.infer<
  typeof destinationLocationFormSchema
>;

// ─────────────────────────────────────────────
// DESTINATION
// ─────────────────────────────────────────────

export const destinationFormSchema = z.object({
  name: z
    .string()
    .min(2, "Destination name must be at least 2 characters")
    .max(255, "Destination name must be at most 255 characters"),
  slug: slugSchema,
  location_id: uuidSchema,
  type: z
    .string()
    .min(1, "Type is required")
    .max(100, "Type must be at most 100 characters"),
  description: z.string().min(1, "Description is required"),
  long_description: z.string().min(1, "Long description is required"),
  atmosphere: z.string().min(1, "Atmosphere is required"),
  accessibility_notes: z.string().min(1, "Accessibility notes are required"),
  seasonal_considerations: z
    .string()
    .min(1, "Seasonal considerations are required"),
  image: z.string().url("Invalid image URL"),
  guest_capacity: z.string().min(1, "Guest capacity is required"),
  highlights: z.array(z.string()).min(1, "At least one highlight is required"),
  best_for: z
    .array(z.string())
    .min(1, "At least one best-for entry is required"),
  ceremony_options: z
    .array(z.string())
    .min(1, "At least one ceremony option is required"),
  reception_options: z
    .array(z.string())
    .min(1, "At least one reception option is required"),
  accommodation_nearby: z
    .array(z.string())
    .min(1, "At least one accommodation nearby is required"),
  dining_experiences: z
    .array(z.string())
    .min(1, "At least one dining experience is required"),
  unique_features: z
    .array(z.string())
    .min(1, "At least one unique feature is required"),
});

export type DestinationFormData = z.infer<typeof destinationFormSchema>;

// ─────────────────────────────────────────────
// WEDDING EXPERIENCE
// ─────────────────────────────────────────────

export const weddingExperienceFormSchema = z.object({
  slug: slugSchema,
  category: z.enum([
    "elopement_weddings",
    "intimate_weddings",
    "luxury_weddings",
    "private_villa_weddings",
  ]),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(255, "Name must be at most 255 characters"),
  // Hero Section
  hero_style: z.enum(["split", "centered", "editorial", "bottom"]),
  // backend: url() — no empty string
  hero_image: z.string().url("Invalid image URL"),
  hero_desc: z.string().min(1, "Hero description is required"),
  // Intro Section
  intro_label: z.string().min(1, "Intro label is required"),
  // backend: z.tuple — disamakan
  intro_heading: z.tuple([
    z.string().min(1, "Intro heading part 1 is required"),
    z.string().min(1, "Intro heading part 2 is required"),
  ]),
  intro_body: z.string().min(1, "Intro body is required"),
  intro_list_label: z.string().nullable().optional(),
  intro_list: z.array(z.string()),
  intro_footnote: z.string().nullable().optional(),
  intro_images: z
    .array(z.string().url("Invalid image URL"))
    .max(2, "Maximum 2 intro images"),
  // Approach Section
  approach_label: z.string().min(1, "Approach label is required"),
  approach_heading: z.tuple([
    z.string().min(1, "Approach heading part 1 is required"),
    z.string().min(1, "Approach heading part 2 is required"),
  ]),
  approach_body: z.string().min(1, "Approach body is required"),
  approach_list_label: z.string().nullable().optional(),
  approach_list: z.array(z.string()),
  // backend: url() — no empty string
  approach_image: z.string().url("Invalid image URL"),
  // Services Section
  services_label: z.string().min(1, "Services label is required"),
  services_heading: z.tuple([
    z.string().min(1, "Services heading part 1 is required"),
    z.string().min(1, "Services heading part 2 is required"),
  ]),
  services_list: z.array(z.string()).min(1, "At least one service is required"),
  services_footnote: z.string().min(1, "Services footnote is required"),
  services_dark_label: z.string().min(1, "Services dark label is required"),
  services_dark_heading: z.tuple([
    z.string().min(1, "Services dark heading part 1 is required"),
    z.string().min(1, "Services dark heading part 2 is required"),
  ]),
  services_dark_body: z.string().min(1, "Services dark body is required"),
  services_dark_list: z
    .array(z.string())
    .min(1, "At least one services dark list item is required"),
  // Closing Section
  closing_label: z.string().min(1, "Closing label is required"),
  closing_heading: z.tuple([
    z.string().min(1, "Closing heading part 1 is required"),
    z.string().min(1, "Closing heading part 2 is required"),
  ]),
  closing_body: z.string().min(1, "Closing body is required"),
  // backend: url() — no empty string
  closing_image: z.string().url("Invalid image URL"),
  closing_couple_label: z.string().nullable().optional(),
  closing_couple_values: z.array(z.string()),
});

export type WeddingExperienceFormData = z.infer<
  typeof weddingExperienceFormSchema
>;

// ─────────────────────────────────────────────
// EXPERIENCE FAQ
// ─────────────────────────────────────────────

export const experienceFaqFormSchema = z.object({
  experience_id: uuidSchema,
  question: z.string().min(2, "Question must be at least 2 characters"),
  answer: z.string().min(2, "Answer must be at least 2 characters"),
  sort_order: z.number().int().min(0).default(0),
});

export type ExperienceFaqFormData = z.infer<typeof experienceFaqFormSchema>;

// ─────────────────────────────────────────────
// VENUE
// ─────────────────────────────────────────────

export const venueFormSchema = z.object({
  slug: slugSchema,
  name: z
    .string()
    .min(2, "Venue name must be at least 2 characters")
    .max(255, "Venue name must be at most 255 characters"),
  slogan: z.string().min(2, "Slogan must be at least 2 characters"),
  description: z.string().min(1, "Description is required"),
  // backend: url() — no empty string
  image: z.string().url("Invalid image URL"),
  capacity: z.number().int().positive("Capacity must be a positive integer"),
  // backend: positive() — price harus > 0, bukan >= 0
  starting_price: z.number().positive("Starting price must be greater than 0"),
  destination_id: uuidSchema,
  experience_id: uuidSchema,
});

export type VenueFormData = z.infer<typeof venueFormSchema>;

// ─────────────────────────────────────────────
// VENUE IMAGE
// ─────────────────────────────────────────────

export const venueImageFormSchema = z.object({
  url: z.string().url("Invalid image URL"),
  sort_order: z.number().int().min(0).default(0),
  venue_id: uuidSchema,
});

export type VenueImageFormData = z.infer<typeof venueImageFormSchema>;

// ─────────────────────────────────────────────
// WEDDING THEME
// ─────────────────────────────────────────────

export const weddingThemeFormSchema = z.object({
  slug: slugSchema,
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(255, "Title must be at most 255 characters"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Invalid image URL"),
  inclusions: z.array(z.string()).min(1, "At least one inclusion is required"),
  venue_id: z
    .union([uuidSchema, z.literal(""), z.undefined()])
    .transform((v) => v || undefined),
  experience_id: uuidSchema,
});

export type WeddingThemeFormData = z.infer<typeof weddingThemeFormSchema>;

// ─────────────────────────────────────────────
// WEDDING THEME IMAGE
// ─────────────────────────────────────────────

export const weddingThemeImageFormSchema = z.object({
  url: z.string().url("Invalid image URL"),
  sort_order: z.number().int().min(0).default(0),
  theme_id: uuidSchema,
});

export type WeddingThemeImageFormData = z.infer<
  typeof weddingThemeImageFormSchema
>;

// ─────────────────────────────────────────────
// ARTICLE
// ─────────────────────────────────────────────

// backend: enum menggunakan underscore dan "and"
export const articleCategoryEnum = z.enum([
  "Guides",
  "Featured",
  "Planning_Advice",
  "Destination_Knowledge",
  "Venue_and_Location",
  "Real_Weddings",
  "Design_and_Concept",
]);

export const articleFormSchema = z.object({
  slug: slugSchema,
  category: articleCategoryEnum,
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(255, "Title must be at most 255 characters"),
  excerpt: z.string().min(1, "Excerpt is required"),
  // backend: z.string().datetime() — frontend kirim ISO string, bukan Date object
  published_at: z
    .string()
    .datetime({ message: "Invalid datetime format, use ISO 8601" }),
  // backend: url() — no empty string
  image: z.string().url("Invalid image URL"),
  content: z.string().min(1, "Content is required"),
});

export type ArticleFormData = z.infer<typeof articleFormSchema>;

// ─────────────────────────────────────────────
// PORTFOLIO
// ─────────────────────────────────────────────

export const portfolioFormSchema = z.object({
  slug: slugSchema,
  couple: z
    .string()
    .min(2, "Couple name must be at least 2 characters")
    .max(255, "Couple name must be at most 255 characters"),
  subtitle: z.string().min(1, "Subtitle is required"),
  destination_id: z
    .union([uuidSchema, z.literal(""), z.undefined()])
    .transform((v) => v || undefined),
  venue_id: z
    .union([uuidSchema, z.literal(""), z.undefined()])
    .transform((v) => v || undefined),
  experience_id: z
    .union([uuidSchema, z.literal(""), z.undefined()])
    .transform((v) => v || undefined),
  // backend: url() — no empty string
  image: z.string().url("Invalid image URL"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  origin: z.string().optional(),
  review: z.string().optional(),
  content: z.string().optional(),
  story_sections: z.array(
    z.object({
      heading: z.string().optional(),
      // backend: body min(1)
      body: z
        .array(z.string())
        .min(1, "Story section body must have at least one paragraph"),
    }),
  ),
  credit_role: z.string().min(1, "Credit role is required"),
  credit_planner: z.string().min(1, "Credit planner is required"),
  credit_location_detail: z
    .string()
    .min(1, "Credit location detail is required"),
  credit_couple_origin: z.string().min(1, "Credit couple origin is required"),
});

export type PortfolioFormData = z.infer<typeof portfolioFormSchema>;

// ─────────────────────────────────────────────
// PORTFOLIO IMAGE
// ─────────────────────────────────────────────

export const portfolioImageFormSchema = z.object({
  url: z.string().url("Invalid image URL"),
  sort_order: z.number().int().min(0).default(0),
  portfolio_id: uuidSchema,
});

export type PortfolioImageFormData = z.infer<typeof portfolioImageFormSchema>;

// ─────────────────────────────────────────────
// SUBMISSION (Vendor & Career)
// backend menggunakan discriminatedUnion berdasarkan "type"
// ─────────────────────────────────────────────

export const vendorSubmissionFormSchema = z.object({
  type: z.literal("vendor"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().optional(),
  // required untuk vendor
  company_name: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(255, "Company name must be at most 255 characters"),
  contact_person: z
    .string()
    .min(2, "Contact person must be at least 2 characters")
    .max(255, "Contact person must be at most 255 characters"),
  vendor_category: z.string().min(1, "Vendor category is required"),
  years_in_business: z.string().optional(),
  portfolio_link: z.string().url("Invalid URL").optional().or(z.literal("")),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export const careerSubmissionFormSchema = z.object({
  type: z.literal("career"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().optional(),
  // required untuk career
  full_name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(255, "Full name must be at most 255 characters"),
  position: z
    .string()
    .min(2, "Position must be at least 2 characters")
    .max(255, "Position must be at most 255 characters"),
  experience: z.string().optional(),
  linked_in: z
    .string()
    .url("Invalid LinkedIn URL")
    .optional()
    .or(z.literal("")),
  cover_letter: z.string().optional(),
});

// discriminated union — dipakai saat submit ke API
export const submissionFormSchema = z.discriminatedUnion("type", [
  vendorSubmissionFormSchema,
  careerSubmissionFormSchema,
]);

export type VendorSubmissionFormData = z.infer<
  typeof vendorSubmissionFormSchema
>;
export type CareerSubmissionFormData = z.infer<
  typeof careerSubmissionFormSchema
>;
export type SubmissionFormData = z.infer<typeof submissionFormSchema>;

// ─────────────────────────────────────────────
// INQUIRY SUBMISSION
// ─────────────────────────────────────────────

export const inquirySubmissionFormSchema = z.object({
  your_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  your_email: z.string().email("Invalid email address"),
  your_address: z.string().min(2, "Address must be at least 2 characters"),
  telephone: z.string().min(1, "Telephone is required"),
  name_of_groom: z
    .string()
    .min(2, "Groom name must be at least 2 characters")
    .max(100, "Groom name must be at most 100 characters"),
  religion_of_groom: z.string().min(1, "Groom religion is required"),
  nationality_of_groom: z.string().min(1, "Groom nationality is required"),
  name_of_bride: z
    .string()
    .min(2, "Bride name must be at least 2 characters")
    .max(100, "Bride name must be at most 100 characters"),
  religion_of_bride: z.string().min(1, "Bride religion is required"),
  nationality_of_bride: z.string().min(1, "Bride nationality is required"),
  wedding_date: z.string().min(1, "Wedding date is required"),
  wedding_venue: z.string().min(1, "Wedding venue is required"),
  number_of_attendance: z.string().min(1, "Number of attendees is required"),
  approximate_wedding_budget: z.string().min(1, "Budget is required"),
  hotel_name_in_bali: z.string().min(1, "Hotel name is required"),
  arrival_date: z.string().min(1, "Arrival date is required"),
  departure_date: z.string().min(1, "Departure date is required"),
  your_message: z.string().min(1, "Message is required"),
});

export type InquirySubmissionFormData = z.infer<
  typeof inquirySubmissionFormSchema
>;

// ─────────────────────────────────────────────
// OPEN POSITION
// ─────────────────────────────────────────────

export const openPositionFormSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(255, "Title must be at most 255 characters"),
  type: z.string().min(1, "Type is required"),
  level: z.string().min(1, "Level is required"),
  desc: z.string().min(1, "Description is required"),
  is_active: z.boolean().default(true),
});

export type OpenPositionFormData = z.infer<typeof openPositionFormSchema>;
