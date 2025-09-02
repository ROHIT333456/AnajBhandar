// ✅ Updated backend cart logic
import User from "../model/userModel.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userData = await User.findById(req.userId);

    if (!userData) return res.status(404).json({ message: "User not found" });

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }

    await User.findByIdAndUpdate(req.userId, { cartData });
    return res.status(201).json({ message: "Added to cart" });
  } catch (error) {
    console.error("addToCart error:", error);
    return res.status(500).json({ message: "addToCart error" });
  }
};

// Update cart quantity
export const UpdateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userData = await User.findById(req.userId);
    let cartData = userData.cartData || {};

    if (quantity > 0) {
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }
      cartData[itemId][size] = quantity;
    } else {
      // If quantity is 0 or less, remove the size or the product
      if (cartData[itemId]) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    }

    await User.findByIdAndUpdate(req.userId, { cartData });
    return res.status(201).json({ message: "Cart updated" });
  } catch (error) {
    console.error("updateCart error:", error);
    return res.status(500).json({ message: "updateCart error" });
  }
};

// Get user's cart
export const getUserCart = async (req, res) => {
  try {
    const userData = await User.findById(req.userId);
    let cartData = userData.cartData || {};
    return res.status(200).json(cartData);
  } catch (error) {
    console.error("getUserCart error:", error);
    return res.status(500).json({ message: "getUserCart error" });
  }
};
