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
      trim: true,
      uppercase: true,
      sparse: true
    },

    Mobile: {
      type: String
    },

    Email: {
      type: String,
      lowercase: true
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
const Customer= mongoose.model(
  "Customer",
  customerSchema
);
export default Customer;