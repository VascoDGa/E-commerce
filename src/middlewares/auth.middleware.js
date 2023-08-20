import User from "../models/user.js";
import JWT from "jsonwebtoken";
import CustomErrors from "../utils/customErrors.js"
import config from "../config/index.js";
import asyncHandler from "../service/asyncHandler.js";

export const isLoggedIn =  asyncHandler( async (req, res , next) => {
    let tokken;

    if(req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))){
        token = req.cookies.token || req.headers.authorization.split(" ")[1]
    }

    if(!token){
        throw new CustomErrors("Not authorised", 400)
    }

    try {
        
        const decodedJWTPayload = JWT.verify(token, config.JWT_SECRET)
        
        req.user = await User.findById(decodedJWTPayload._id,"name email role")
        next()

    } catch (error) {

        throw new CustomErrors("Not authorised",400)
        
    }
    next()
})

export const authorise = (...requiredRoles) => asyncHandler(async (req,res,next) => {
    if(!requiredRoles.includes(req.user.role)){
        throw new CustomErrors("Not authorised",400)
    }
    next()
})  