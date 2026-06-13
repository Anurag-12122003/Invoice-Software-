import express from 'express';
import connectDb from './config/db.config.js';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import { fileURLToPath } from 'node:url';
import cookieParser from 'cookie-parser';
import path from 'node:path';
dotenv.config()

// connectDb()
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

export default app;