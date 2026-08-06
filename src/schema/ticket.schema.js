import { z } from "zod";

export const ticketSchema = z.object({
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(1, "Description is required"),
  severity: z.string().min(1, "Please select severity"),
  status: z.string().default("Open"),
});