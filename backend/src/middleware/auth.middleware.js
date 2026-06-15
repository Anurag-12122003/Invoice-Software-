import jwt from "jsonwebtoken";
import EnvDetails from "../utils/envDetails.js";
export const protect = (req, res, next) => {
  try {
   const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    const decoded = jwt.verify(token, EnvDetails.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};
