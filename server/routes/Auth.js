import mongoose from 'mongoose';
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';



import { UserModel } from '../models/UserModel.js';

const router = express.Router()



//Signup
router.post("/signup", async (req, res) => {

    const { email, password } = req.body
    
    try {
        

    } catch (error) {
        console.log(error.message)
    }


})


//Login
router.post("/login", async (req, res) => {

    const { email, password } = req.body
    
    
    try {
        const isUser = await UserModel.findOne({ email: email })

        if(!isUser){
            res.status(500).json("User Not Found")
        }

        if(isUser){

            const isPassword = await bcrypt.compare(password, isUser.password)
            
            if(!isPassword){
                res.status(500).json("Invalid Password")
            }

            if(isPassword){

                const payload = {
                    id: isUser._id,
                    email: isUser.email,
                    tasks: isUser.tasks
                }

                const token = jwt.sign(payload, process.env.SECRET_KEY , { expiresIn: '24h' });
                
                res.header("token", token, { maxAge: 900000, httpOnly: true });
                res.status(200).json({
                    token: token, 
                    message: "Logged in Successfully"})
            }

        }


    } catch (error) {
        res.status(500).json(error.message)
    }


})





export { router as Authentication }