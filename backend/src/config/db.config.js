// import { mo } from "mongoose";
import mongoose from "mongoose";
import EnvDetails from "../utils/envDetails.js";

const connectDb= async()=>{
    try {
        const conn=await mongoose.connect(EnvDetails.MONGO_URI);
        console.log(`Db connected Succsessfully ${conn.connection.host}`)
    } catch (error) {
        console.error("db connect failed ",error.message);
        process.exit(1);
    }
}
export default connectDb;