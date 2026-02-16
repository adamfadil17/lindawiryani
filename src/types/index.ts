export type Role = "admin" | "editor" | "user";
export type InquiryStatus = "pending" | "contacted" | "closed";

export interface ImageUrl {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  created_at: Date;
}

export type PublicUser = Omit<User, never>;

export interface Gallery {
  id: string;
  image_url: string[];
  sort_order: number;
  category: string;
  images?: Image[];
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  created_at: Date;
  parent?: Location;
  children?: Location[];
  venues?: Venue[];
}

export interface WeddingTheme {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  og_image: string | null;
  created_at: Date;
  venues?: Venue[];
  images?: Image[];
}

export interface Venue {
  id: string;
  name: string;
  slug: string;
  venue_type: string;
  location_id: string;
  wedding_theme_id: string | null;
  description: string | null;
  content: string | null;
  featured_image: string | null;
  is_featured: boolean;
  og_image: string | null;
  created_at: Date;
  location?: Location;
  wedding_theme?: WeddingTheme;
  images?: Image[];
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  featured_image: string | null;
  is_active: boolean;
  og_image: string | null;
  created_at: Date;
  images?: Image[];
}

export interface WeddingExperience {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  featured_image: string | null;
  created_at: Date;
  images?: Image[];
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  wedding_date: Date | null;
  venue_preference: string | null;
  theme_preference: string | null;
  service_interest: string | null;
  message: string | null;
  status: InquiryStatus;
  created_at: Date;
}

export interface Image {
  id: string;
  portfolio_id: string | null;
  venue_id: string | null;
  theme_id: string | null;
  service_id: string | null;
  wedding_experiences_id: string | null;
  image_url: ImageUrl;
  sort_order: number;
  gallery?: Gallery;
  venue?: Venue;
  wedding_theme?: WeddingTheme;
  service?: Service;
  wedding_experience?: WeddingExperience;
}

export interface AuthResponse {
  user: PublicUser;
  token: string;
  expiresIn: string;
}
