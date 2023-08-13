import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles.js";
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
import config from "../config/index.js";
import crypto from "crypto"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Username is required"],
            maxLength: [50 , "Max length must not exceed 50 characters"]
        },
        email: {
            type: String,
            required: [true, "Email is required"]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [8, "Minimum of 8 characters is required"],
            select: false
        },
        role: {
            type: String,
            enum: Object.values(AuthRoles),
            default: AuthRoles.USER
        },
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date
    },
    {timestamps:true}
)

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods = {
    comparePassword: async function(enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password)
    },
     getJWTtoken: function(){
        JWT.sign({_id: this._id}, config.JWT_SECRET, {
            expiresIn: config.JWT_EXPIRY
        })
     },
     generateForgotPasswordToken: function(){
        const fgpw = crypto.randomBytes(20).toString("hex")

        this.forgotPasswordToken = crypto.createHash("sha256").update(fgpw).digest("hex")
        this.forgotPasswordExpiry = Date.now() + 20*60*1000

        return fgpw
     }
}

export default mongoose.module("User",userSchema)