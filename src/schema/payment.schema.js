import { z } from "zod";

export const paymentSchema = z.object({
  tenantEmail: z.string().email("Valid email is required"),
  month: z.string().min(1, "Month is required"),
  amount: z.coerce.number().min(1, "Amount is required"),
});