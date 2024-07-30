import { UserModel } from "../models/user_model.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

//Reseting a password
const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const newOtp = otp.toString();
    console.log(newOtp);
    return newOtp;
}

export const resetPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json('No user found with the given email');
        }

        const otp = generateOTP();
        user.resetToken = otp;
        await user.save();

        console.log('EMAIL_USER:', process.env.EMAIL_USER);
        console.log('EMAIL_PASS:', process.env.EMAIL_PASS);



        // Send OTP via email
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, // Your email address
            to: user.email,
            subject: 'Password Reset',
            text: `Please use the following OTP to complete the process of resetting your password:\n\n${otp}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
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

