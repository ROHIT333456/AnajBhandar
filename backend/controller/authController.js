import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { genToken, genToken1 } from "../config/token.js";

// ✅ Registration
export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).json({ message: "User already exists" });
    if (!validator.isEmail(email)) return res.status(400).json({ message: "Invalid email" });
    if (password.length < 8) return res.status(400).json({ message: "Password too short" });

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashPassword });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json(user);
  } catch (error) {
    console.log("registration error");
    res.status(500).json({ message: `Registration error: ${error}` });
  }
};

// ✅ Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json(user);
  } catch (error) {
    console.log("login error");
    res.status(500).json({ message: `Login error: ${error}` });
  }
};

// ✅ Google Login
export const googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;
    let user = await User.findOne({ email });
    if (!user) user = await User.create({ name, email });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json(user);
  } catch (error) {
    console.log("googleLogin error");
    res.status(500).json({ message: `Google login error: ${error}` });
  }
};

// ✅ Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = await genToken1(email);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 1 * 24 * 60 * 60 * 1000
      });
      return res.status(200).json(token);
    }
    res.status(400).json({ message: "Invalid credentials" });
  } catch (error) {
    console.log("adminLogin error");
    res.status(500).json({ message: `Admin login error: ${error}` });
  }
};

// ✅ Logout
export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("logout error");
    res.status(500).json({ message: `Logout error: ${error}` });
  }
};

// ✅ Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Email not registered" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m"
    });

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
      }
    });

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Reset Password - Anaj Bhandar",
      html: `<p>Click below to reset your password:</p>
             <a href="${resetLink}" target="_blank">${resetLink}</a>
             <p>This link expires in 15 minutes.</p>`
    });

    return res.status(200).json({ message: "Reset email sent successfully" });
  } catch (error) {
    console.log("forgotPassword error", error);
    return res.status(500).json({ message: "Error sending reset email" });
  }
};

// ✅ Reset Password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.log("resetPassword error", error);
    return res.status(400).json({ message: "Invalid or expired reset link" });
  }
};
