// ─── ENUMS ──────────────────────────────────────────────
export type VenueImageType = "HERO" | "GALLERY";
export type ThemeType = "ELOPEMENT" | "INTIMATE";
export type WeddingExperienceType =
  | "elopement-weddings"
  | "intimate-weddings"
  | "luxury-weddings"
  | "private-villa-weddings";

export interface WeddingExperienceHero {
  style: "split" | "centered" | "editorial" | "bottom";
  image: string;
  desc: string;
}

export interface WeddingExperienceIntro {
  label: string;
  heading: [string, string];
  body: string;
  listLabel: string | null; // null when list is empty
  list: string[];
  footnote: string | null;
  image: string[]; //ini saya ingin untuk upload 2 images saja
}

export interface WeddingExperienceApproach {
  label: string;
  heading: [string, string];
  body: string;
  listLabel: string | null; // null when list is empty
  list: string[];
  image: string;
}

export interface WeddingExperienceServices {
  label: string;
  heading: [string, string];
  list: string[];
  footnote: string;
  darkPanel: {
    label: string;
    heading: [string, string];
    body: string;
    list: string[];
    cta: string;
  };
}

export interface WeddingExperienceClosing {
  label: string;
  heading: [string, string];
  body: string;
  image: string;
  coupleLabel: string | null;
  coupleValues: string[];
}

export interface WeddingExperienceFaq {
  q: string;
  a: string;
}

export interface WeddingExperience {
  id: string; // uuid — generated at save, never in form
  category: WeddingExperienceType;
  name: string;
  hero: WeddingExperienceHero;
  intro: WeddingExperienceIntro;
  approach: WeddingExperienceApproach;
  services: WeddingExperienceServices;
  closing: WeddingExperienceClosing;
  faqs: WeddingExperienceFaq[];
  venues?: Venue[];
  themes?: WeddingTheme[];
  portfolios?: Portfolio[];
}

// ─── DESTINATION CATEGORY ───────────────────────────────
export interface DestinationCategory {
  id: string;
  name: string;
  destinations?: Destination[];
}

// ─── DESTINATION ────────────────────────────────────────
export interface Destination {
  id: string;
  name: string;
  categoryId: string;
  category: DestinationCategory;
  type: string;
  description: string;
  longDescription: string;
  location: string;
  atmosphere: string;
  accessibilityNotes: string;
  seasonalConsiderations: string;
  image: string;
  guestCapacity: string;
  highlights: string[];
  bestFor: string[];
  ceremonyOptions: string[];
  receptionOptions: string[];
  accommodationNearby: string[];
  diningExperiences: string[];
  uniqueFeatures: string[];
  venues?: Venue[];
}

// ─── VENUE ──────────────────────────────────────────────
export interface Venue {
  id: string;
  name: string;
  slogan: string;
  description: string;
  capacity: number;
  startingPrice: number;
  destinationId: string;
  destination: Destination;
  experienceId: string;
  experience: WeddingExperience;
  images: VenueImage[];
  themes?: WeddingTheme[];
  portfolios?: Portfolio[];
}
export interface VenueImage {
  id: string;
  url: string;
  type: VenueImageType;
  venueId: string;
}

// ─── WEDDING THEME ──────────────────────────────────────
export interface WeddingTheme {
  id: string;
  type: ThemeType;
  title: string;
  themeName: string;
  description: string;
  image: string;
  inclusions: string[];
  gallery: string[];
  venueId: string;
  venue?: Venue;
  experienceId: string;
  experience?: WeddingExperience;
}

// ─── ARTICLE ────────────────────────────────────────────
export const articleCategories = [
  "All",
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
  publishedAt: string;
  image: string;
  content: string; // TipTap-serialised HTML
}

// ─── PORTFOLIO ──────────────────────────────────────────

export interface PortfolioStory {
  heading?: string;
  body: string[];
}

export interface Portfolio {
  id: string;
  slug: string;
  couple: string;
  subtitle: string;
  destinationId: string;
  venueId: string;
  experienceId: string;
  destination?: Destination;
  venue?: Venue;
  experience?: WeddingExperience[];
  heroImage: string;
  galleryImages: string[];
  tags: string[];
  excerpt: string;
  origin?: string;
  review?: string;
  content?: string;
  storySections: PortfolioStory[];
  credit: {
    role: string;
    planner: string;
    locationDetail: string;
    coupleOrigin: string;
  };
}

// ─── VENDOR INQUIRY ─────────────────────────────────────
export interface Vendor {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  vendorCategory: string;
  yearsInBusiness: string;
  portfolioLink: string;
  message: string;
}

// ─── CAREER APPLICATION ──────────────────────────────────
export interface Career {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  linkedIn: string;
  portfolioLink: string;
  coverLetter: string;
}

// ─── SUBMISSION (Career & Partnership) ──────────────────
export type SubmissionType = "vendor" | "career";
export type SubmissionStatus = "new" | "reviewed" | "contacted" | "archived";

export interface VendorSubmission extends Vendor {
  id: string;
  type: "vendor";
  status: SubmissionStatus;
  submittedAt: string;
}

export interface CareerSubmission extends Career {
  id: string;
  type: "career";
  status: SubmissionStatus;
  submittedAt: string;
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
  yourName: string;
  yourEmail: string;
  yourAddress: string;
  telephone: string;
  // Groom
  nameOfGroom: string;
  religionOfGroom: string;
  nationalityOfGroom: string;
  // Bride
  nameOfBride: string;
  religionOfBride: string;
  nationalityOfBride: string;
  // Wedding Details
  weddingDate: string;
  weddingVenue: string;
  numberOfAttendance: string;
  approximateWeddingBudget: string;
  // Accommodation & Travel
  hotelNameInBali: string;
  arrivalDate: string;
  departureDate: string;
  // Vision
  yourMessage: string;
}

// ─── INQUIRY SUBMISSION ──────────────────────────────────
export type InquiryStatus = "new" | "reviewed" | "quoted" | "booked" | "archived";

export interface InquirySubmission extends Inquiry {
  id: string;
  status: InquiryStatus;
  submittedAt: string;
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
  type: string;  // e.g. "Full-time", "Part-time / Freelance"
  level: string; // e.g. "Mid–Senior", "All levels"
  desc: string;
}

export const openPositions: Omit<OpenPosition, "id">[] = [
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