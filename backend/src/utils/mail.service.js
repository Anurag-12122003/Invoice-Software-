import nodemailer from "nodemailer";
import EnvDetails from "./envDetails.js";

// Ek asynchronous function jo email bhejega
const sendEmail = async (options) => {
  try {
    // 1. Transporter Create Karein (Yeh aapka email engine hai)
    const transporter = nodemailer.createTransport({
      service: EnvDetails.EMAIL_SERVICE, // Hum Gmail use kar rahe hain
      auth: {
        user: EnvDetails.EMAIL_USER,     // Aapka Gmail account
        pass: EnvDetails.EMAIL_PASSWORD, // Aapka 16-digit App Password
      },
    });

    // 2. Email ke Options Define Karein (Kisko bhejna hai, kya bhejna hai)
    const mailOptions = {
      from: `"Support Team" <${EnvDetails.EMAIL_USER}>`, // Bhejne wale ka naam aur email
      to: options.email,                                  // Jisko email bhejna hai (User)
      subject: options.subject,                            // Email ka Subject/Heading
      html: options.html,                                 // Email ki Body (HTML design)
    };

    // 3. Email Send Karein
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: ", info.messageId);
    
    return info;
  } catch (error) {
    console.error("Nodemailer Error: ", error);
    throw new Error("Email sending failed!");
  }
};

export default sendEmail;
