import express from "express";
import {
  registration,
  login,
  logOut,
  googleLogin,
  adminLogin,
  forgotPassword,
  resetPassword
} from "../controller/authController.js";

const authRoutes = express.Router();

// 🔐 Auth Routes
authRoutes.post("/registration", registration);
authRoutes.post("/login", login);
authRoutes.get("/logout", logOut);
authRoutes.post("/googlelogin", googleLogin);
authRoutes.post("/adminlogin", adminLogin);

// 🔁 Forgot & Reset Password Routes
authRoutes.post("/forgot-password", forgotPassword);
authRoutes.post("/reset-password/:token", resetPassword);

export default authRoutes;
