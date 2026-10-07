import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    unitNumber: {
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Tenant ||
  mongoose.model("Tenant", tenantSchema);