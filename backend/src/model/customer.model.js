import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },

    CustomerName: {
      type: String,
      required: true,
      trim: true
    },

    GSTIN: {
      type: String,
      minlength: [15, "GSTIN must be 15 characters"],
      maxlength: [15, "GSTIN must be 15 characters"],
      uppercase: true,
      trim: true,
      sparse: true,
      unique: true
    },

    Mobile: {
      type: String
    },

    Email: {
      type: String,
      lowercase: true,
      trim: true,
      sparse: true,
      unique: true
    },

    Address: {
      type: String
    },

    State: {
      type: String
    },

    City: {
      type: String
    },

    Pincode: {
      type: String
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);
const Customer = mongoose.model(
  "Customer",
  customerSchema
);
export default Customer;