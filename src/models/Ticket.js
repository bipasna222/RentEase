import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        severity: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            required: true,
            default: "Open",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Ticket ||
    mongoose.model("Ticket", ticketSchema);