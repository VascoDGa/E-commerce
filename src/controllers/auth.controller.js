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



export const logIN = asyncHandler(async(req,res) => {

    const {email, password} = req.body

    if(!email|| !password){
        throw new customErrors("Enter valid credentials", 400)
    }

    const user = User.findOne({email}).select("+password")

    if(!user){
        throw new customErrors("Invalid password", 400)
    }

    const isPasswordMatched = await user.comparePassword(password)

    if(isPasswordMatched){
        const token = user.getJWTtoken()
        user.password = undefined
        res.cookie("token", token ,cookieOption)
        res.status(200).json({
            success: true,
            token,
            user
        })
    }

    throw new customErrors("Password is incorrect", 400)

})

export const logOut = asyncHandler(async(req, res) => {
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
})