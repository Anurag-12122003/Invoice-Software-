import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import EnvDetails from '../utils/envDetails.js'
import jwt from 'jsonwebtoken'

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
                { expiresIn: '7d' }
            );
            // स्टेप D: टोकन को HTTP-Only Cookie में सेट करें
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.json({ message: "Login successful!", data: user });

        } catch (error) {
            res.status(500).json({ error: "Server error during login." });
        }
    }
    async signup(req, res) {

        try {
            const { name, email, password } = req.body;
            const userExists = await User.findOne({ email: email });
            if (userExists) {
                return res.status(400).json({ error: "Username already taken. Try another." });
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            // create new user for saving in MongoDB
            const newUser = new User({
                name: name,
                email: email,
                password: hashedPassword
            });
            await newUser.save();

            res.status(201).json({ message: "User registered successfully!" });
        } catch (error) {
            res.status(500).json({ error: "Server error during registration." });
        }
    }
    logout(req, res) {
        res.clearCookie('token');
        res.json({ message: "Logged out successfully" });
    }
}
export default AuthController