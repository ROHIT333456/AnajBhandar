import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String
  },

  cartData: {
    type: Object,
    default: {}
  },

  // ✅ Add these two fields for forgot/reset password feature
  resetToken: {
    type: String
  },

  resetTokenExpire: {
    type: Date
  }

}, { timestamps: true, minimize: false });

const User = mongoose.model("User", userSchema);

export default User;
