import mongoose from "mongoose";
import { type } from "node:os";

const companySchema = new mongoose.Schema({
    CompanyName: {
        type: String,
        required: true
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
    Pan: {
        type: String,
        minlength: [10, "PAN must be 10 characters"],
        maxlength: [10, "PAN must be 10 characters"],
        uppercase: true
    },
    Address: {
        type: String
    },
    State: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        sparse: true,
        unique: true
    },
    Mobile: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

const Company = mongoose.model("Company", companySchema);

export default Company;