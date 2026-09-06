import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        tenantEmail: {
            type: String,
            required: true,
        },

        month: {
            type: String,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            required: true,
            default: "Unpaid",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Payment ||
    mongoose.model("Payment", paymentSchema);