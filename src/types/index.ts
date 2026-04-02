// ─── ENUMS ──────────────────────────────────────────────
export type VenueImageType = "HERO" | "GALLERY";
export type ThemeType = "ELOPEMENT" | "INTIMATE";
export type WeddingExperienceType =
  | "elopement_weddings"
  | "intimate_weddings"
  | "luxury_weddings"
  | "private_villa_weddings";

export type WeddingExperienceHeroStyle =
  | "split"
  | "centered"
  | "editorial"
  | "bottom";

export type vendorCategory =
  | "Photography"
  | "Videography"
  | "Floral & Décor"
  | "Catering & F&B"
  | "Live Music & Entertainment"
  | "Hair & Makeup"
  | "Lighting & AV"
  | "Transportation"
  | "Stationery & Printing"
  | "Venue"
  | "Other";

export type Currency = "IDR" | "USD";

export type Role = "admin" | "editor" | "user";
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  created_at: Date;
}

export type PublicUser = Omit<User, never>;

export interface AuthResponse {
  user: PublicUser;
  token: string;
  expiresIn: string;
}

// ─── EXPERIENCE FAQ ─────────────────────────────────────
export interface ExperienceFaq {
  id: string;
  experience_id: string;
  question: string;
  answer: string;
  sort_order: number;
}

export interface WeddingExperience {
  id: string;
  slug: string;
  category: WeddingExperienceType;
  name: string;

  // Hero
  hero_style: WeddingExperienceHeroStyle;
  hero_image: string;
  hero_desc: string;

  // Intro
  intro_label: string;
  intro_heading: [string, string];
  intro_body: string;
  intro_list_label: string | null;
  intro_list: string[];
  intro_footnote: string | null;
  intro_images: string[]; // max 2 images

  // Approach
  approach_label: string;
  approach_heading: [string, string];
  approach_body: string;
  approach_list_label: string | null;
  approach_list: string[];
  approach_image: string;

  // Services
  services_label: string;
  services_heading: [string, string];
  services_list: string[];
  services_footnote: string;
  services_dark_label: string;
  services_dark_heading: [string, string];
  services_dark_body: string;
  services_dark_list: string[];

  // Closing
  closing_label: string;
  closing_heading: [string, string];
  closing_body: string;
  closing_image: string;
  closing_couple_label: string | null;
  closing_couple_values: string[];

  // Relations
  faqs: ExperienceFaq[];
  venues?: Venue[];
  themes?: WeddingTheme[];
  portfolios?: Portfolio[];
}

// ─── DESTINATION CATEGORY ───────────────────────────────
export interface DestinationCategory {
  id: string;
  name: string;
  destinations: Destination[];
}

// ─── DESTINATION ────────────────────────────────────────
export interface Destination {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  category: DestinationCategory;
  type: string;
  description: string;
  long_description: string;
  location: string;
  atmosphere: string;
  accessibility_notes: string;
  seasonal_considerations: string;
  image: string;
  guest_capacity: string;
  highlights: string[];
  best_for: string[];
  ceremony_options: string[];
  reception_options: string[];
  accommodation_nearby: string[];
  dining_experiences: string[];
  unique_features: string[];
  venues?: Venue[];
}

// ─── VENUE ──────────────────────────────────────────────
export interface Venue {
  id: string;
  slug: string;
  name: string;
  slogan: string;
  description: string;
  image: string;
  capacity: number;
  starting_price: number;
  destination_id: string;
  destination: Destination;
  experience_id: string;
  experience: WeddingExperience;
  gallery: VenueImage[];
  themes?: WeddingTheme[];
  portfolios?: Portfolio[];
}

export interface VenueImage {
  id: string;
  url: string;
  sort_order: number;
  venue_id: string;
}

// ─── WEDDING THEME ──────────────────────────────────────
export interface WeddingTheme {
  id: string;
  slug: string;
  type: ThemeType;
  title: string;
  description: string;
  image: string;
  inclusions: string[];
  venue_id: string | null;
  venue?: Venue | null;
  experience_id: string;
  experience?: WeddingExperience;
  gallery: WeddingThemeImage[];
}

export interface WeddingThemeImage {
  id: string;
  url: string;
  sort_order: number;
  theme_id: string;
}

// ─── ARTICLE ────────────────────────────────────────────
export const articleCategories = [
  "Guides",
  "Planning Advice",
  "Destination Knowledge",
  "Venue & Location",
  "Real Weddings",
  "Design & Concept",
] as const;

export type ArticleCategory = (typeof articleCategories)[number];

export interface Article {
  id: string;
  slug: string;
  category: ArticleCategory;
  title: string;
  excerpt: string;
  published_at: string;
  image: string;
  content: string; // TipTap-serialised HTML
}

// ─── PORTFOLIO ──────────────────────────────────────────

export interface PortfolioStory {
  heading?: string;
  body: string[];
}

export interface PortfolioImage {
  id: string;
  url: string;
  sort_order: number;
  portfolio_id: string;
}

export interface Portfolio {
  id: string;
  slug: string;
  couple: string;
  subtitle: string;
  destination_id: string | null;
  venue_id: string | null;
  experience_id: string | null;
  destination?: Destination | null;
  venue?: Venue | null;
  experience?: WeddingExperience | null;
  image: string;
  gallery?: PortfolioImage[];
  tags: string[];
  excerpt: string;
  origin?: string;
  review?: string;
  content?: string;
  story_sections: PortfolioStory[];
  credit_role: string;
  credit_planner: string;
  credit_location_detail: string;
  credit_couple_origin: string;
}

// ─── VENDOR INQUIRY ─────────────────────────────────────
export interface Vendor {
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  website: string;
  vendor_category: vendorCategory;
  years_in_business: string;
  portfolio_link: string;
  message: string;
}

// ─── CAREER APPLICATION ──────────────────────────────────
export interface Career {
  full_name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  linked_in: string;
  portfolio_link: string;
  cover_letter: string;
}

// ─── SUBMISSION (Career & Partnership) ──────────────────
export type SubmissionType = "vendor" | "career";
export type SubmissionStatus = "new" | "reviewed" | "contacted" | "archived";

export interface VendorSubmission extends Vendor {
  id: string;
  type: "vendor";
  status: SubmissionStatus;
  submitted_at: string;
}

export interface CareerSubmission extends Career {
  id: string;
  type: "career";
  status: SubmissionStatus;
  submitted_at: string;
}

export type Submission = VendorSubmission | CareerSubmission;

export const submissionStatusConfig: Record<
  SubmissionStatus,
  { label: string; classes: string }
> = {
  new: {
    label: "New",
    classes: "bg-blue-50 text-blue-600 border border-blue-100",
  },
  reviewed: {
    label: "Reviewed",
    classes: "bg-amber-50 text-amber-600 border border-amber-100",
  },
  contacted: {
    label: "Contacted",
    classes: "bg-green-50 text-green-600 border border-green-100",
  },
  archived: {
    label: "Archived",
    classes: "bg-primary/5 text-primary/40 border border-primary/10",
  },
};

// ─── INQUIRY FORM ────────────────────────────────────────
export interface Inquiry {
  // Contact Info
  your_name: string;
  your_email: string;
  your_address: string;
  telephone: string;
  // Groom
  name_of_groom: string;
  religion_of_groom: string;
  nationality_of_groom: string;
  // Bride
  name_of_bride: string;
  religion_of_bride: string;
  nationality_of_bride: string;
  // Wedding Details
  wedding_date: string;
  wedding_venue: string;
  number_of_attendance: string;
  approximate_wedding_budget: string;
  // Accommodation & Travel
  hotel_name_in_bali: string;
  arrival_date: string;
  departure_date: string;
  // Vision
  your_message: string;
}

// ─── INQUIRY SUBMISSION ──────────────────────────────────
export type InquiryStatus =
  | "new"
  | "reviewed"
  | "quoted"
  | "booked"
  | "archived";

export interface InquirySubmission extends Inquiry {
  id: string;
  status: InquiryStatus;
  submitted_at: string;
}

export const inquiryStatusConfig: Record<
  InquiryStatus,
  { label: string; classes: string }
> = {
  new: {
    label: "New",
    classes: "bg-blue-50 text-blue-600 border border-blue-100",
  },
  reviewed: {
    label: "Reviewed",
    classes: "bg-amber-50 text-amber-600 border border-amber-100",
  },
  quoted: {
    label: "Quoted",
    classes: "bg-violet-50 text-violet-600 border border-violet-100",
  },
  booked: {
    label: "Booked",
    classes: "bg-green-50 text-green-600 border border-green-100",
  },
  archived: {
    label: "Archived",
    classes: "bg-primary/5 text-primary/40 border border-primary/10",
  },
};

// ─── OPEN POSITION ───────────────────────────────────────
export interface OpenPosition {
  id: string;
  title: string;
  type: string; // e.g. "Full-time", "Part-time / Freelance"
  level: string; // e.g. "Mid–Senior", "All levels"
  desc: string;
  is_active: boolean;
}

export type ExperienceData = Omit<WeddingExperience, "venues" | "themes" | "portfolios">;

export type ExperienceWithRelations = Omit<WeddingExperience, "venues" | "themes"> & {
  venues: Venue[];
  themes: WeddingTheme[];
};

export const openPositions: Omit<OpenPosition, "id" | "is_active">[] = [
  {
    title: "Wedding Planner & Coordinator",
    type: "Full-time",
    level: "Mid–Senior",
    desc: "Lead end-to-end planning and on-site execution of luxury destination weddings in Bali.",
  },
  {
    title: "Creative Design Consultant",
    type: "Full-time",
    level: "Senior",
    desc: "Conceptualise and deliver bespoke aesthetic narratives, mood boards, and design proposals for couples.",
  },
  {
    title: "Client Relations Executive",
    type: "Full-time",
    level: "Mid-level",
    desc: "Be the first point of contact for international couples, managing inquiries, consultations, and ongoing communication.",
  },
  {
    title: "Social Media & Content Creator",
    type: "Part-time / Freelance",
    level: "All levels",
    desc: "Capture and craft compelling content from our events for Instagram, Pinterest, and beyond.",
  },
];
