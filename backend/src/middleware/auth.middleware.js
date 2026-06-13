import jwt from 'jsonwebtoken'
import EnvDetails from '../utils/envDetails.js';

function verifyTokenFromCookie(req, res, next) {
    // cookie-parser की मदद से 'token' नाम की कुकी निकालें
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Access denied. Please login first." });
    }

    try {
        // टोकन चेक करें
        const verified = jwt.verify(token, EnvDetails.JWT_SECRET);
        req.user = verified; // डिकोड किया हुआ डेटा रिक्वेस्ट ऑब्जेक्ट में डाल दें
        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid or expired token." });
    }
}
