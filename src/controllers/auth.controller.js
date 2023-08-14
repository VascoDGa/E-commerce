import asyncHandler from "../service/asyncHandler"
import "../utils/customErrors"
import User from "../models/user.js"


export const cookieOption = {
    expires: new Date(Date.now()+ 3 *24 * 60 *60 *1000),
    httpOnly: true
}

export const signUp = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        throw new customErrors("Please enter valid credentials", 400)
    }

    const existingUser = await User.findOne({email})

    if(existingUser){
        throw new customErrors("User already exists", 400)
    }

    const user = User.create({
        name,
        email,
        password
    })

    const token = user.getJWTtoken()

    user.password = undefined

    res.cookie("token", token, cookieOption)

    res.status(200).json({
        success: true,
        token,
        user
    })




})