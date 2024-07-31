import { UserModel } from "../models/user_model.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import crypto from "crypto";



//Reseting a password
const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpString = otp.toString();
    const hashedOtp = crypto.createHash("sha256").update(otpString).digest("hex")
    const newOtp = otp.toString();
    return {otpString, hashedOtp};
}

export const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json('No user found with the given email');
        }

        const {otpString, hashedOtp} = generateOTP();
        user.resetToken = hashedOtp;
        user.resetTokenExpiresAt = Date.now() + 1800000  //Token expires in 30mins
        await user.save();
      


        // Send OTP via email
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
             auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: 'Momo Fraud Support <fromMomo.com>', // Your email address
            to: user.email,
            subject: 'Password Reset',
            text: `Please use the following OTP to complete the process of resetting your password:\n\n${otpString}\n\n. If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.error('There was an error', err);
                return res.status(500).json('Error sending email');
            } else {
                res.status(200).json('If your email is registered with us, you will receive a password recovery instruction.');
            }
        });
    } catch (error) {
        // next(error)
        console.log(error);
    }
};

export const verifyCode = async(req, res, next) => {
    try {
        const { email, newOTP } = req.body;
        // const user = await UserModel.findOne({ email });

        // Validate email format
        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
    // CHECKS IF THE OTP IS == TO GENERATED ONE
          if (!user.resetToken == newOTP) {
            return res.status(400).json({ message: 'Code is not valid ' });
          }
    // CHECKS IF THE OTP HAS EXPIRED 
          if (Date.now() > user.resetPasswordExpires) {
            return res.status(400).json({ message: 'Invalid or expired code' });
          }
      
        // OTP is valid, allow the user to reset the password
      user.resetToken = null;
        user.resetTokenExpiresAt = null;
        await user.save();
        res.status(201).json({ message:'Code Is Valid'});
    } catch (error) {
      next(error); 
    }
};


