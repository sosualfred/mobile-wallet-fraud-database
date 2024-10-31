import { AdminModel } from "../models/admin_model.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

// Function to generate OTP and hashed OTP
const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpString = otp.toString();
  const hashedOtp = crypto.createHash("sha256").update(otpString).digest("hex");
  return { otpString, hashedOtp };
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Find the admin with the provided email
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json("No admin found with the given email");
    }

    // Generate OTP and save the hashed OTP to the admin's record
    const { otpString, hashedOtp } = generateOTP();
    admin.resetToken = hashedOtp;
    admin.resetTokenExpiresAt = Date.now() + 1800000; // Token expires in 30 mins
    await admin.save();

    // Configure nodemailer transporter
    const passwordTransporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // True for 465, false for other ports
      auth: {
        user: process.env.EMAIL_ADMIN, // Corrected here
        pass: process.env.EMAIL_PASS,
      },
    });

    // Mail options for OTP
    const mailOptions = {
      from: `"Momo Fraud Support" <${process.env.EMAIL_ADMIN}>`, // Set from your actual email
      to: admin.email,
      subject: "Password Reset",
      text: `Please use the following OTP to complete the process of resetting your password:\n\n${otpString}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    // Send the email
    passwordTransporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error("Email sending error:", error);
        return res.status(500).json("Error sending email");
      } else {
        res.status(200).json(
          "If your email is registered with us, you will receive a password recovery instruction shortly."
        );
      }
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json("An error occurred during password recovery.");
  }
};


export const verifyAdminCode = async (req, res, next) => {
  try {
    const { email, newOtp } = req.body;

    // Grab and validate input (both email and otp)
    if (!email || !newOtp) {
      return res.status(400).json({ message: "Email and OTP must be provided." });
    }

    // Find the admin by email
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Ensure newOtp is a valid string before converting to string
    const otpHash = newOtp.toString(); 

    // Encrypt the OTP
    const hashedOtp = crypto.createHash("sha256").update(otpHash).digest("hex");

    // Compare the verification code with the one stored in the admin's details
    if (admin.resetToken !== hashedOtp) {
      return res.status(400).json({ message: "Code is not valid" });
    }

    // Check for verification code expiry
    if (Date.now() > admin.resetPasswordExpiresAt) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    // If everything is fine, send success response
    return res.status(200).json({ message: "Code has been verified!" });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};