import mongoose from "mongoose";

const leaseSchema = new mongoose.Schema(
    {
        tenantEmail: {
            type: String,
            required: true,
        },

        unit: {
            type: String,
            required: true,
        },

        leaseStart: {
            type: String,
            required: true,
        },

        leaseEnd: {
            type: String,
            required: true,
        },

        securityDeposit: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Lease ||
    mongoose.model("Lease", leaseSchema);