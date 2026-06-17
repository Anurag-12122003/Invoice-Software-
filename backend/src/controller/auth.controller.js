import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import EnvDetails from '../utils/envDetails.js'
import jwt from 'jsonwebtoken'
import sendEmail from "../utils/mail.service.js";
import { getResetPasswordEmailHtml, getVerificationEmailHtml } from "../constant.js";
import randomstring from "randomstring";

class AuthController {

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email: email }).select("+password");

            if (!user) {
                return res.status(400).json({ error: "Invalid username or password" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: "Invalid username or password" });
            }

            // स्टेप C: JWT टोकन जेनरेट करें
            const token = jwt.sign(
                { userId: user._id, email: user.email },
                EnvDetails.JWT_SECRET,
                { expiresIn: '2h' }
            );
            // स्टेप D: टोकन को HTTP-Only Cookie में सेट करें
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 2 * 60 * 60 * 1000
            });

            res.json({ message: "Login successful!", data: user });

        } catch (error) {
            res.status(500).json({ error: "Server error during login." });
        }
    }
    async signup(req, res) {
        try {
            const { name, email, password } = req.body;

            if(password.length<6){
                return res.status(412).json({ error: "Password must be 6 character." });
            }
            // 1. Check karein ki email pehle se exist to nahi karta
            const userExists = await User.findOne({ email: email });
            if (userExists) {
                return res.status(400).json({ error: "Email already registered. Try another." });
            }

            // 2. 6-Digit Alphanumeric Code Generate Karein
            const verificationCode = randomstring.generate({
                length: 6,
                charset: 'alphanumeric',
                capitalization: 'uppercase',
            });

            // 3. Code aur Password dono ko hash karein (Kyunki schema me hook nahi hai)
            const hashedCode = await bcrypt.hash(verificationCode, 10);
            const hashedPassword = await bcrypt.hash(password, 10);

            // 4. Create new user (FIXED: 'new' hata diya aur 'await' add kiya)
            const newUser = await User.create({
                name: name,
                email: email,
                password: hashedPassword, // Hashed password save kiya
                verificationToken: hashedCode, // Hashed code save kiya
                verificationTokenExpiry: Date.now() + 15 * 60 * 1000 // 15 mins expiry
            });

            // 5. User ko Email Bhejein (Raw code bhej rahe hain)
            const emailHtml = getVerificationEmailHtml(newUser.name, verificationCode);
            await sendEmail({
                email: newUser.email,
                subject: "Verify Your Account - OTP Code",
                html: emailHtml
            });

            // 6. Response Sent
            res.status(201).json({
                message: "User registered successfully! Please check your email for the 6-digit code.",
                data: newUser
            });

        } catch (error) {
            console.error("Signup Error:", error); // Yeh line error check karne me madad karegi
            res.status(500).json({ error: "Server error during registration." });
        }
    }

    logout(req, res) {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 2 * 60 * 60 * 1000
        });
        res.json({ message: "Logged out successfully" });
    }

    async verifyEmail(req, res) {
        try {
            const { email, verificationCode } = req.body;

            // 1. Validation: Dono fields zaroori hain
            if (!email || !verificationCode) {
                return res.status(400).json({ error: "Email and verification code are required." });
            }

            // 2. User ko database me search karein
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ error: "User not found." });
            }

            // 3. Check karein ki user pehle se verified to nahi hai
            if (user.isVerified) {
                return res.status(400).json({ message: "Account is already verified. You can log in." });
            }

            // 4. Check karein ki OTP code expire to nahi ho gaya
            if (Date.now() > user.verificationTokenExpiry) {
                return res.status(400).json({ error: "Verification code has expired. Please request a new one." });
            }

            // 5. Code Match Karein (Frontend ka raw code vs Database ka hashed token)
            const isCodeValid = await bcrypt.compare(verificationCode.toUpperCase(), user.verificationToken);
            if (!isCodeValid) {
                return res.status(400).json({ error: "Invalid verification code. Please check again." });
            }

            // 6. Database Update: User ko verified mark karein aur tokens clear karein
            user.isVerified = true;
            user.verificationToken = undefined;       // Purana token clear kiya
            user.verificationTokenExpiry = undefined; // Expiry clear kiya
            await user.save();

            // 7. Success Response
            return res.status(200).json({
                success: true,
                message: "Email verified successfully! You can now log in."
            });

        } catch (error) {
            console.error("Verification Error:", error);
            return res.status(500).json({ error: "Server error during email verification." });
        }
    }
    // ==========================================
    // 1. FORGOT PASSWORD (OTP GENERATION & EMAIL)
    // ==========================================
    async forgotPassword(req, res) {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({ error: "Email is required." });
            }

            // User check karein
            const user = await User.findOne({ email });

            // OWASP Security Tip: Agar user nahi bhi milta, toh hackers ko ye mat batao ki email galat hai.
            // Isse email scraping rukti hai. Response same rakhein.
            if (!user) {
                return res.status(200).json({ message: "If that email exists, a password reset code has been sent." });
            }

            // Naya 6-digit alphanumeric code generate karein
            const resetCode = randomstring.generate({
                length: 6,
                charset: 'alphanumeric',
                capitalization: 'uppercase',
            });

            // Code ko hash karke database me save karein (Model me hooks na hone ki wajah se yahan hash kar rahe hain)
            const hashedResetToken = await bcrypt.hash(resetCode, 10);
            const name = user.name;
            user.passwordResetToken = hashedResetToken;
            user.passwordResetExpires = Date.now() + 15 * 60 * 1000; // Sirf 15 mins expiry
            await user.save();

            const emailHtml = getResetPasswordEmailHtml(name, resetCode);
            // Email send karein
            await sendEmail({
                email: user.email,
                subject: "Password Reset Code",
                html: emailHtml
            });

            return res.status(200).json({ message: "If that email exists, a password reset code has been sent." });

        } catch (error) {
            console.error("Forgot Password Error:", error);
            return res.status(500).json({ error: "Server error during forgot password." });
        }
    }
    // ==========================================
    // 2. RESET PASSWORD (VERIFY OTP & UPDATE PASSWORD)
    // ==========================================
    async resetPassword(req, res) {
        try {
            const { email, resetCode, newPassword } = req.body;

            // Validation check
            if (!email || !resetCode || !newPassword) {
                return res.status(400).json({ error: "All fields (email, code, new password) are required." });
            }

            if (newPassword.length < 6) {
                return res.status(400).json({ error: "Password must be at least 6 characters long." });
            }

            // User search karein
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: "User not found." });
            }

            // Check karein ki tokens database me exist karte hain ya nahi
            if (!user.passwordResetToken || !user.passwordResetExpires) {
                return res.status(400).json({ error: "Invalid or expired session. Please request a new code." });
            }

            // Expiry check karein
            if (Date.now() > user.passwordResetExpires) {
                return res.status(400).json({ error: "Reset code has expired. Please request a new one." });
            }

            // Code Match Karein (Frontend ka code vs Database ka hashed token)
            const isCodeValid = await bcrypt.compare(resetCode.toUpperCase(), user.passwordResetToken);
            if (!isCodeValid) {
                return res.status(400).json({ error: "Invalid reset code. Please check again." });
            }

            // Naye password ko hash karein (kyunki schema me pre-save nahi chal raha hai)
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Database update karein aur fields clean karein
            user.password = hashedPassword;
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save();

            return res.status(200).json({ success: true, message: "Password updated successfully! You can now log in." });

        } catch (error) {
            console.error("Reset Password Error:", error);
            return res.status(500).json({ error: "Server error during password reset." });
        }
    }
}
export default AuthController;

