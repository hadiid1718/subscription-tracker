import mongoose from "mongoose"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js"

export const signUp = async(req,res,next)=> {
const session = await mongoose.startSession()
session.startTransaction();
  try{
    //Logic to create a new User
    const { name, email,password} = req.body;
    const existingUser = await User.findOne({ email })
    if(existingUser) {
        const error =  new Error("User already exist with this email")
        error.statusCode = 409
        throw error;
    }

    //Hahs Password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password,salt)

    const newUsers = await User.create([{name, email,password:hashedpassword}], { session })

    const token = jwt.sign(
      {userId: newUsers[0]._id},
      JWT_SECRET,
      {expiresIn: JWT_EXPIRES_IN})

    


    await session.commitTransaction()
    session.endSession()
    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: {
            token,
            user: newUsers[0]
        }
    })
  }catch(error){
    await session.abortTransaction()
    session.endSession()
    next(error)
  }
}

export const signIn = async(req,res,next)=> {

}

export const signOut = async(req,res,next)=> {

}