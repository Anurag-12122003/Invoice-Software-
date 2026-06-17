import express from 'express';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import companyRouter from './routes/company.route.js';
import Company from './model/company.model.js';
import customerRouter from './routes/customer.route.js';
import productRouter from './routes/product.route.js';
import invoiceRouter from './routes/invoice.route.js';
import paymentRouter from './routes/payment.route.js';
import dashboardRouter from './routes/dashboard.route.js';
import profileRouter from './routes/profile.route.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import User from './model/user.model.js';

const app = express();
// console.log()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
// console.log(__dirname)
// path.join();
// path.dirname()
// console.log(__dirname)
// console.log((import.meta.url))

// console.log(__dirname)
// console.log(__filename)

// express predefined middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser('anurag'))

// app.__dirname=__dirname;

// routes
app.use('/api', authRouter);
app.use('/api', companyRouter);
app.use('/api', customerRouter);
app.use('/api', productRouter);
app.use('/api', invoiceRouter);
app.use('/api', paymentRouter);
app.use('/api', dashboardRouter);
app.use('/api', profileRouter);

app.delete('/clean/unverified/user',async(req,res)=>{
        try {
        const now = new Date();

        // डेटाबेस क्वेरी: जो अनवेरीफाइड हैं और जिनका OTP एक्सपायर हो चुका है
        const result = await User.deleteMany({
            isVerified: false,
            verificationTokenExpiry: { $lt: now }
        });
        // { $lt: now } कोई भी ऐसा समय जो अभी के करंट समय (now) से पुराना या पीछे का हो।

        // सफलता का रिस्पॉन्स भेजें और बताएं कि कितने यूज़र्स डिलीट हुए
        return res.status(200).json({
            success: true,
            message: "Database cleanup completed successfully.",
            deletedCount: result.deletedCount
        });

    } catch (error) {
        console.error("Cleanup API Error:", error);
        return res.status(500).json({ 
            success: false,
            error: "Server error during database cleanup." 
        });
    }
})

// app.get("/indexes", async (req, res) => {
//   try {
//     const indexes = await Company.collection.indexes();
//     res.json(indexes);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// app.get("/drop-email-index", async (req, res) => {
//   try {
//     await Company.collection.dropIndex("email_1");

//     res.json({
//       success: true,
//       message: "Email index deleted"
//     });
//   } catch (err) {
//     res.json(err);
//   }
// });

export default app;