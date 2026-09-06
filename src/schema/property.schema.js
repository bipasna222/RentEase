import { z } from "zod";

export const propertySchema = z.object({
  propertyName: z.string().min(1, "Property Name is required"),
  address: z.string().min(1, "Address is required"),
  totalFloors: z.coerce
    .number()
    .min(1, "Total Floors must be at least 1"),
});