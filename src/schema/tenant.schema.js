import { z } from "zod";

export const tenantSchema = z.object({
    fullName: z.string().min(1, "Full Name is required"),

    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email"),

    phone: z.string().min(1, "Phone Number is required"),

    unitNumber: z.string().min(1, "Unit Number is required"),

    leaseStart: z.string().min(1, "Lease Start Date is required"),

    leaseEnd: z.string().min(1, "Lease End Date is required"),
});