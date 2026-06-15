import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: true
    },

    Amount: {
      type: Number,
      required: true
    },

    PaymentDate: {
      type: Date,
      default: Date.now
    },

    PaymentMode: {
      type: String,
      enum: [
        "Cash",
        "UPI",
        "Bank Transfer",
        "Cheque"
      ]
    },

    ReferenceNo: String,

    Remarks: String,

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const Payment= mongoose.model(
  "Payment",
  paymentSchema
);
export default Payment;