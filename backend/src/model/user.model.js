import mongoose from "mongoose";
import { type } from "node:os";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
        trim:true
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    role:{
        type: String,
        enum: ['user', 'admin'], // Restricts value to only these two options
        default: 'admin',
    },

},{timestamps:true});

const User=mongoose.model("User",userSchema);

export default User;