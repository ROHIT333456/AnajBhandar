import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image1: {
    type: String,
    required: true
  },
  image2: {
    type: String,
    required: true
  },
  image3: {
    type: String,
    required: true
  },
  image4: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true // e.g., Basmati, Brown
  },
  subCategory: {
    type: String,
    required: true // e.g., Long Grain, Organic
  },
  sizes: {
    type: Array,
    required: true // e.g., ["1kg", "5kg"]
  },
  date: {
    type: Number,
    required: true
  },
  bestseller: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
