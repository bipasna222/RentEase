import { z } from "zod";

export const leaseSchema = z.object({
  tenantEmail: z.string().email("Invalid email"),

  unit: z.string().min(1, "Please select a unit"),

  leaseStart: z.string().min(1, "Lease Start Date is required"),

  leaseEnd: z.string().min(1, "Lease End Date is required"),

  securityDeposit: z.coerce
    .number()
    .min(1, "Security Deposit is required"),
});