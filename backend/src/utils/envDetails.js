import path from "node:path";
import { fileURLToPath } from 'node:url';
const EnvDetails = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    EMAIL_SERVICE: process.env.EMAIL_SERVICE,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    FRONTEND_URL: process.env.FRONTEND_URL,
    __dirname: path.join(path.dirname(fileURLToPath(import.meta.url)).slice(0, -6)),
    email_Directory: path.join(path.dirname(fileURLToPath(import.meta.url)).slice(0, -6), "views")
};
export default EnvDetails;