import 'dotenv/config';
import app from "./src/index.js";
import connectDb from './src/config/db.config.js';
import EnvDetails from "./src/utils/envDetails.js";

connectDb();
app.listen(EnvDetails.PORT , () => {
    console.log(`Server listen on port ${EnvDetails?.PORT} .`)
})