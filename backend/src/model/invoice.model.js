import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },

  ProductName: String,

  HSNCode: String,

  Quantity: Number,

  Rate: Number,

  GSTPercent: Number,

  TaxableAmount: Number,

  GSTAmount: Number,

  TotalAmount: Number
});

const invoiceSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },

    InvoiceNumber: {
      type: String,
      unique:true,
      required: true
    },

    InvoiceDate: {
      type: Date,
      default: Date.now
    },

    DueDate: {
      type: Date
    },

    items: [itemSchema],

    TotalTaxableAmount: Number,

    CGST: Number,

    SGST: Number,

    IGST: Number,

    Discount: {
      type: Number,
      default: 0
    },

    RoundOff: {
      type: Number,
      default: 0
    },

    GrandTotal: Number,

    Status: {
      type: String,
      enum: [
        "Draft",
        "Pending",
        "Paid",
        "Cancelled"
      ],
      default: "Pending"
    },

    Notes: String,

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const Invoice= mongoose.model("Invoice",invoiceSchema);

export default Invoice;