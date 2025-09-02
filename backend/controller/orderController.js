import razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import Product from "../model/productModel.js";

dotenv.config();

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/** Helper: calculate amount from DB + delivery fee */
const calculateOrderAmount = async (items) => {
  const ids = items.map((i) => i._id);
  const products = await Product.find({ _id: { $in: ids } }).lean();

  let total = 0;
  let totalQuantity = 0;

  for (const item of items) {
    const product = products.find((p) => p._id.toString() === item._id.toString());
    if (!product) continue;

    const sizeInKg = parseInt(String(item.size).replace("kg", ""), 10) || 0;
    const unitPrice = Number(product.price) || 0;
    const qty = parseInt(item.quantity, 10) || 0;

    total += sizeInKg * unitPrice * qty;
    totalQuantity += qty;
  }

  let deliveryCharge = 0;
  if (totalQuantity === 1) deliveryCharge = 40;
  else if (totalQuantity > 1) deliveryCharge = totalQuantity * 30;

<<<<<<< HEAD
  return Math.round(total + deliveryCharge);
=======
  return total ;
>>>>>>> 073e20f60f91aedd285cdb403d2fd75304ef8792
};

/** Helper: enrich items from DB */
const enrichItemsFromDB = async (items) => {
  const ids = items.map((i) => i._id);
  const products = await Product.find({ _id: { $in: ids } }).lean();

  const enriched = items.map((item) => {
    const product = products.find((p) => p._id.toString() === item._id.toString());
    if (!product) return null;

    return {
      _id: product._id,
      name: product.name,
      image1: product.image1,
      size: item.size,
      quantity: item.quantity,
      price: product.price, // per kg price
    };
  });

  return enriched.filter(Boolean);
};

/** ---------------- COD ---------------- */
export const placeOrder = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.userId;

    const amount = await calculateOrderAmount(items);
    const sanitizedItems = await enrichItemsFromDB(items);

    if (sanitizedItems.length === 0) {
      return res.status(400).json({ message: "No valid items in cart" });
    }

    const newOrder = new Order({
      items: sanitizedItems,
      amount,
      userId,
      address,
      paymentMethod: "COD",
      payment: false,
      status: "Order Placed", // COD is confirmed immediately
      date: Date.now(),
    });

    await newOrder.save();
    await User.findByIdAndUpdate(userId, { cartData: {} });

    res
      .status(201)
      .json({ message: "Order Placed Successfully", orderId: newOrder._id });
  } catch (error) {
    console.error("Order Placement Error (COD):", error);
    res.status(500).json({ message: "Order Placement Failed" });
  }
};

/** ------------- Razorpay: Create Order ------------- */
export const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.userId;

    const amount = await calculateOrderAmount(items);
    const sanitizedItems = await enrichItemsFromDB(items);

    if (sanitizedItems.length === 0) {
      return res.status(400).json({ message: "No valid items in cart" });
    }

    // Save as Pending first
    const newOrder = new Order({
      items: sanitizedItems,
      amount,
      userId,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      status: "Pending",
      date: Date.now(),
    });
    await newOrder.save();

    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: newOrder._id.toString(), // we'll use this later
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.error("Razorpay Order Create Error:", error);
        return res.status(500).json({ message: "Razorpay Error" });
      }
      res.status(200).json(order);
    });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ message: "Razorpay Error" });
  }
};

/** ------------- Razorpay: Verify Signature ------------- */
export const verifyRazorpay = async (req, res) => {
  try {
    const userId = req.userId;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Build expected signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // Fetch Razorpay order and get our receipt (mongo _id)
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    const orderIdInDB = orderInfo?.receipt;

    if (!orderIdInDB) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Mark as paid & confirmed
    await Order.findByIdAndUpdate(orderIdInDB, {
      payment: true,
      status: "Order Placed",
      paymentDetails: {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      },
    });

    // clear cart only after success
    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(200).json({ message: "Payment Verified" });
  } catch (err) {
    console.error("Verify Razorpay Error:", err);
    res.status(500).json({ message: err.message });
  }
};

/** ------------- Razorpay: Cancel (user closed checkout) ------------- */
export const cancelRazorpayOrder = async (req, res) => {
  try {
    // either pass `orderId` = Mongo _id (receipt) OR `razorpay_order_id
    const { orderId, razorpay_order_id } = req.body;

    let mongoId = orderId;
    if (!mongoId && razorpay_order_id) {
      const rpOrder = await razorpayInstance.orders.fetch(razorpay_order_id);
      mongoId = rpOrder?.receipt;
    }
    if (!mongoId) {
      return res.status(400).json({ message: "Order id required" });
    }

    await Order.findByIdAndUpdate(mongoId, { status: "Cancelled", payment: false });
    return res.status(200).json({ message: "Order Cancelled" });
  } catch (err) {
    console.error("Cancel Razorpay Order Error:", err);
    res.status(500).json({ message: err.message });
  }
};

/** ---------------- Queries & Admin ---------------- */
export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId }).sort({ date: -1 }).lean();
    res.status(200).json(orders);
  } catch (err) {
    console.error("User Orders Error:", err);
    res.status(500).json({ message: "User Order Error" });
  }
};

export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ date: -1 }).lean();
    res.status(200).json(orders);
  } catch (err) {
    console.error("Admin Orders Error:", err);
    res.status(500).json({ message: "Admin Order Error" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ message: "Status Updated" });
  } catch (err) {
    console.error("Update Status Error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });

    if (order.status !== "Order Placed")
      return res
        .status(400)
        .json({ success: false, message: "Only 'Order Placed' orders can be deleted" });

    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    console.error("Delete Order Error:", err);
    res.status(500).json({ success: false, message: "Delete Failed" });
  }
};
