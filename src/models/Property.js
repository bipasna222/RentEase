import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
    {
        propertyName: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        totalFloors: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Property ||
    mongoose.model("Property", PropertySchema);