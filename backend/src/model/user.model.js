import mongoose from "mongoose";
import Company from './company.model.js'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Restricts value to only these two options
        default: 'admin',
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpiry: {
        type: Date

    },
    // --- ADDED: FORGOT PASSWORD FIELDS ---
    passwordResetToken: {
        type: String,
    },
    passwordResetExpires: {
        type: Date
    }
}, { timestamps: true });

// केस A: जब आप 'findByIdAndDelete' या 'findOneAndDelete' चलाकर यूज़र डिलीट करें
userSchema.pre('findOneAndDelete', async function (next) {
    try {
        const userId = this.getQuery()._id;

        // यूज़र की सभी कम्पनियों को ढूंढें और एक-एक करके डिलीट करें
        const companies = await Company.find({ user: userId });
        for (const company of companies) {
            await Company.findByIdAndDelete(company._id);
        }
    } catch (error) {
         throw new Error(error.message)
    }
});

// केस B: जब आप क्लीनअप API में 'deleteMany' चलाकर एक साथ कई अनवेरीफाइड यूज़र्स डिलीट करें
userSchema.pre('deleteMany', async function () {
    try {
        const conditions = this.getQuery();
        const users = await this.model.find(conditions, '_id');
        const userIds = users.map(u => u._id);

        if (userIds.length > 0) {
            const companies = await Company.find({ user: { $in: userIds } });
            for (const company of companies) {
                await Company.findByIdAndDelete(company._id);
            }
        }
    } catch (error) {
        throw new Error(error.message)
    }
});

const User = mongoose.model("User", userSchema);

export default User;