// import the mongoose module to talk with mongoDB
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required:[true, "Please enter a username"],
        unique: true
    },
    email:{
        type: String,
        required:[true, "Please enter a email"],
        unique: true
    },
    password:{
        type: String,
        required:[true, "Please enter a password"]
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date

})

export const User = mongoose.models.users || mongoose.models("users", userSchema);