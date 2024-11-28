const dotenv = require("dotenv");
dotenv.config();
const Admin = require("../Models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Mailgun = require('mailgun.js');
const formData = require('form-data');



const secret_key = process.env.SECRET_KEY;
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

const otpStore = {};

const handleRegister = async (req, res) => {
  const { email, password } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const admin = await Admin.create({ email, password: passwordHash });
    const token = jwt.sign({ userId: admin._id }, secret_key, {
      expiresIn: "1h",
    });
    res
      .status(201)
      .json({
        status: "success",
        token: token,
        message: "Admin created successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "Something went wrong" });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: admin._id }, secret_key, {
      expiresIn: "1h",
    });
    const otp = Math.floor(100000 + Math.random() * 900000);
    // console.log("64",email,otp)
    const expirationTime = Date.now() + 5 * 60 * 1000; // 5 minutes
    otpStore[email] = { otp, expirationTime };

    // Send OTP email
    await sendEmail(email, otp);
    res
      .status(200)
      .json({
        status: "success",
        token: token,
        message: "OTP sent to your email.",
      });
  } catch (error) {
    res.status(400).json({ error:error,message: "Something went wrong" });
  }
};

// Helper function to send email
const sendEmail = async (toEmail, otp) => {
  const htmlTemplate = `
      <h1>Your OTP for Login</h1>
      <p>Your OTP is <strong>${otp}</strong>. It is valid for ${process.env.OTP_EXPIRATION_MINUTES} minutes.</p>
    `;

  await mg.messages.create(process.env.MAILGUN_DOMAIN, {
    from: process.env.SENDER_EMAIL,
    to: toEmail,
    subject: "Your Login OTP",
    html: htmlTemplate,
  });
};

const handleVerifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  // Validate input
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required." });
  }

  // Check if OTP exists for the email
  const storedOTPData = otpStore[email];
  if (!storedOTPData) {
    return res.status(401).json({ message: "No OTP found for this email." });
  }

  // Check if OTP is valid and not expired
  if (storedOTPData.otp !== otp || storedOTPData.expirationTime < Date.now()) {
    return res.status(401).json({ message: "Invalid or expired OTP." });
  }

  // OTP verified - Log in the user (or generate a session/JWT)
  delete otpStore[email]; // Remove OTP after successful verification
  res
    .status(200)
    .json({ message: "OTP verified successfully. You are now logged in." });
};

module.exports = {
  handleRegister,
  handleLogin,
  handleVerifyOTP,
};
