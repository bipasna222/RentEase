import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
  role: z.string().min(1, "Please select a role"),
});