import mongoose from "mongoose";

const unitSchema = new mongoose.Schema(
    {
        unitNumber: {
            type: String,
            required: true,
        },

        bedrooms: {
            type: Number,
            required: true,
        },

        bathrooms: {
            type: Number,
            required: true,
        },

        rent: {
            type: Number,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Unit ||
    mongoose.model("Unit", unitSchema);