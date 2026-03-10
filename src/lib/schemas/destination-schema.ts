import { z } from "zod";

export const destinationSchema = z.object({
  name: z
    .string()
    .min(1, "Destination name is required")
    .min(2, "Name must be at least 2 characters"),
  categoryId: z
    .string()
    .min(1, "Category is required"),
  type: z
    .string()
    .min(1, "Type is required")
    .min(2, "Type must be at least 2 characters"),
  description: z
    .string()
    .min(1, "Short description is required")
    .min(10, "Description must be at least 10 characters")
    .max(300, "Description must be less than 300 characters"),
  longDescription: z
    .string()
    .min(1, "Long description is required")
    .min(20, "Long description must be at least 20 characters"),
  location: z
    .string()
    .min(1, "Location is required"),
  atmosphere: z
    .string()
    .optional(),
  accessibilityNotes: z
    .string()
    .optional(),
  seasonalConsiderations: z
    .string()
    .optional(),
  imageUrl: z
    .string()
    .min(1, "Image URL is required")
    .url("Must be a valid URL"),
  guestCapacity: z
    .string()
    .optional(),
  highlights: z
    .array(z.string())
    .min(1, "At least one highlight is required"),
  bestFor: z
    .array(z.string())
    .min(1, "At least one 'best for' option is required"),
  ceremonyOptions: z
    .array(z.string())
    .optional(),
  receptionOptions: z
    .array(z.string())
    .optional(),
  accommodationNearby: z
    .array(z.string())
    .optional(),
  diningExperiences: z
    .array(z.string())
    .optional(),
  uniqueFeatures: z
    .array(z.string())
    .optional(),
});

export type DestinationFormData = z.infer<typeof destinationSchema>;