const User = require('../models/User');
const OTP = require('../models/OTP');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');


exports.register = async (req, res) => {
    
    try{
        //get data from request body
        const {name, email, password,phone,role} = req.body;

        //check if user already exists
        const exitingUser  = await User.findOne({email});
        if(exitingUser){
            return res.status(400).json({
                success:false,
                message: "User already exists",
            })
        }
        
        //! Hash password Not Done yet

        //create User
        const user = await User.create({
            name,
            email,
            password,
            phone,
            role
        })

        const otp = Math.floor(100000 + Math.random() * 900000).toString();



        const otpEntry = await OTP.create({
            userId: user._id,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        })

        //send OTP to user's email
        await sendEmail({email, type:'verify', otp, name});

        //account created successfully
        res.status(201).json({
            success:true,
            message: "User registered successfully. Please verify using the OTP sent to your email.",
            userId: user._id
        })
        

    } catch(err){
        res.status(500).json({
            success:false,
            message: "Error occurred while registering user",
            error: err.message
        })
    }
} 


exports.verifyOTP = async (req,res)=>{
    try{
        const {email, otp} = req.body;

        //find user by email
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message: "User not found",
            })
        }
        //find OTP entry for the user
        const otpEntry = await OTP.findOne({userId: user._id, otp});
        if(!otpEntry){
            return res.status(400).json({
                success:false,
                message: "Invalid OTP",
            })
        }

        //OTP is valid now mark user as verified and delete the OTP entry

        await User.findByIdAndUpdate(user._id, {isVerified: true}, {new:true});
        await OTP.deleteOne({userId: user._id, otp});
        //send welcome email
         await sendEmail({ email, type: 'welcome', name: user.name });
        res.status(200).json({
            success:true,
            message: "OTP verified successfully",
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message: "Error occurred while verifying OTP",
            error: err.message
        })
    }
}