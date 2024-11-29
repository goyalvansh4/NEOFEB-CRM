require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const htmlTemplate = require("../Utils/EmialOTP");
const adminModel = require("../Models/Admin");

// Constants
const SECRET_KEY = process.env.SECRET_KEY;
const OTP_EXPIRATION_MINUTES = parseInt(process.env.OTP_EXPIRATION_MINUTES || 5, 10);
const EMAIL_USER = process.env.SMTP_USER;
const EMAIL_PASS = process.env.SMTP_PASS;

// In-memory OTP store (use a database or Redis for production)
const otpStore = {};

/**
 * Register a new admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const handleRegister = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin in the database
    const admin = await adminModel.create({ email, password: hashedPassword });

    res.status(201).json({
      status: "success",
      message: "Admin registered successfully.",
    });
  } catch (error) {
    console.error("Error during admin registration:", error);
    res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

/**
 * Login admin and send OTP for verification
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // Find admin by email
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expirationTime = Date.now() + OTP_EXPIRATION_MINUTES * 60 * 1000;

    // Store OTP in memory
    otpStore[email] = { otp, expirationTime };

    // Send OTP via email
    await sendEmail(email, otp);

    res.status(200).json({
      status: "success",
      message: "OTP sent to your email.",
    });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Verify OTP and log in the admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const handleVerifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required." });
  }

  const storedOTPData = otpStore[email];
  if (!storedOTPData) {
    return res.status(404).json({ message: "No OTP found for this email." });
  }

  if (storedOTPData.otp !== parseInt(otp, 10) || storedOTPData.expirationTime < Date.now()) {
    return res.status(401).json({ message: "Invalid or expired OTP." });
  }

  // Find admin to generate token
  const admin = await adminModel.findOne({ email });
  if (!admin) {
    return res.status(404).json({ message: "Admin not found." });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: admin._id }, SECRET_KEY, { expiresIn: "1h" });

  // OTP verified successfully, remove it from memory
  delete otpStore[email];

  res.status(200).json({
    status: "success",
    message: "OTP verified successfully. You are now logged in.",
    token,
  });
};

/**
 * Send an email using Nodemailer
 * @param {string} email - Recipient email address
 * @param {number} otp - OTP to send
 */
const sendEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Your OTP for Login",
      html: htmlTemplate(otp),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
};

module.exports = {
  handleRegister,
  handleLogin,
  handleVerifyOTP,
};
