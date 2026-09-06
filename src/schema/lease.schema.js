import { z } from "zod";

export const leaseSchema = z.object({
    tenantEmail: z.string().email("Valid tenant email is required"),

    unit: z.string().min(1, "Unit is required"),

    leaseStart: z.string().min(1, "Lease start date is required"),

    leaseEnd: z.string().min(1, "Lease end date is required"),

    securityDeposit: z.coerce
        .number()
        .min(0, "Security deposit must be 0 or more"),
});