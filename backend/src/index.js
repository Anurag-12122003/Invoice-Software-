import express from 'express';
import authRouter from './routes/auth.route.js';
import { fileURLToPath } from 'node:url';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import companyRouter from './routes/company.route.js';
import Company from './model/company.model.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// path.join();
// path.dirname()
// console.log(__dirname)
// console.log(path.resolve(fileURLToPath(import.meta.url)))
// console.log((import.meta.url))

// console.log(__dirname)
// console.log(__filename)


// express predefined middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser('anurag'))

// routes
app.use('/api', authRouter);
app.use('/api',companyRouter);

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