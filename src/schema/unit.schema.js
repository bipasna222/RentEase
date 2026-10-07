import { z } from "zod";

export const unitSchema = z.object({
  unitNumber: z.string().min(1, "Unit Number is required"),

  bedrooms: z.coerce
    .number()
    .min(1, "Bedrooms must be at least 1"),

  bathrooms: z.coerce
    .number()
    .min(1, "Bathrooms must be at least 1"),

  rent: z.coerce
    .number()
    .min(1, "Rent must be greater than 0"),

  description: z.string().min(1, "Description is required"),

  image: z.string().min(1, "Image URL is required"),

  status: z.string().min(1, "Status is required"),
});