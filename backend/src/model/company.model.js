import mongoose from "mongoose";
import Customer from './customer.model.js';
import Product from './product.model.js';
import Payment from './payment.model.js';
import Invoice from './invoice.model.js';

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

companySchema.pre('findOneAndDelete', async function (next) {
    try {
        const companyId = this.getQuery()._id;

        // 1. इस कंपनी से जुड़े सभी कस्टमर्स, प्रोडक्ट्स और पेमेंट्स को एक साथ साफ़ करें
        await Customer.deleteMany({ company: companyId });
        await Product.deleteMany({ company: companyId });
        await Payment.deleteMany({ company: companyId });

        // 2. इनवॉइसेज को डिलीट करें (items इनवॉइस स्कीमा के अंदर ही हैं, इसलिए वो भी साफ हो जाएंगे)
        await Invoice.deleteMany({ company: companyId });

    } catch (error) {
        throw new Error(error.message)
    }
});

const Company = mongoose.model("Company", companySchema);

export default Company;