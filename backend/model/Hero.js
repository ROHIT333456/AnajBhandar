import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  text1: { type: String, required: true },
  text2: { type: String, required: true },
  image: { type: String, required: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Hero', heroSchema);
