import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    ProductName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },

    ProductCode: {
      type: String,
      trim: true,
      uppercase: true,
    },

    HSNCode: {
      type: String,
      trim: true,
    },

    Unit: {
      type: String,
      enum: ["PCS", "BOX", "KG", "GRAM", "LTR", "MTR", "DOZEN"],
      default: "PCS",
    },

    SalePrice: {
      type: Number,
      required: true,
      min: [0, "Sale price cannot be negative"],
    },

    PurchasePrice: {
      type: Number,
      default: 0,
      min: [0, "Purchase price cannot be negative"],
    },

    GSTPercent: {
      type: Number,
      enum:[0, 5, 12, 18, 28, 40],
      default: 18,
    },

    IsService: {
      type: Boolean,
      default: false,
    },

    Status: {
      type: Boolean,
      default: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Product= mongoose.model("Product", productSchema);

export default Product;
