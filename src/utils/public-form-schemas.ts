import { z } from "zod";

/**
 * Schemas for the public form payloads (camelCase, exactly what the browser
 * sends). Kept separate from the admin snake_case API schemas.
 */

const optionalText = (max = 5000) => z.string().max(max).optional();
const optionalUrl = z
  .string()
  .url("Invalid URL")
  .optional()
  .or(z.literal(""));

const optionalEmail = z.string().email("Invalid email address");

export const contactFormPayloadSchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(150),
  emailOrWhatsapp: z.string().min(3, "Email or WhatsApp is required").max(255),
  weddingDate: z.string().max(100).optional(),
  numberOfGuests: z.string().max(50).optional(),
  weddingLocationInterest: z.array(z.string()).default([]),
  weddingStyle: z.string().max(100).optional(),
  estimatedBudget: z.string().max(100).optional(),
  servicesNeeded: z.array(z.string()).default([]),
  venueSecured: z.string().max(100).optional(),
  yourVision: optionalText(5000),
  howDidYouFindUs: z.string().max(100).optional(),
  locale: z.string().min(2).max(10).optional(),
});

export const vendorInquiryPayloadSchema = z.object({
  companyName: z.string().min(2).max(255),
  contactPerson: z.string().min(2).max(255),
  email: optionalEmail,
  phone: z.string().max(50).optional(),
  website: optionalUrl,
  vendorCategory: z.string().min(1).max(255),
  yearsInBusiness: z.string().max(100).optional(),
  portfolioLink: optionalUrl,
  message: optionalText(5000),
});

export const careerApplicationPayloadSchema = z.object({
  fullName: z.string().min(2).max(255),
  email: optionalEmail,
  phone: z.string().max(50).optional(),
  position: z.string().min(2).max(255),
  experience: optionalText(5000),
  linkedIn: optionalUrl,
  portfolioLink: optionalUrl,
  coverLetter: optionalText(20000),
});

export type ContactFormPayload = z.infer<typeof contactFormPayloadSchema>;
export type VendorInquiryPayload = z.infer<typeof vendorInquiryPayloadSchema>;
export type CareerApplicationPayload = z.infer<typeof careerApplicationPayloadSchema>;
