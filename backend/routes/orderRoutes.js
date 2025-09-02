import express from "express";
import isAuth from "../middleware/isAuth.js";
import adminAuth from "../middleware/adminAuth.js";
import {
  allOrders,
  placeOrder,
  placeOrderRazorpay,
  updateStatus,
  userOrders,
  verifyRazorpay,
  deleteOrder,
  cancelRazorpayOrder,
} from "../controller/orderController.js";

const orderRoutes = express.Router();

// User
orderRoutes.post("/placeorder", isAuth, placeOrder);          // COD
orderRoutes.post("/razorpay", isAuth, placeOrderRazorpay);    // Create RP order → Pending
orderRoutes.post("/verifyrazorpay", isAuth, verifyRazorpay);  // Success → Placed
orderRoutes.post("/cancel", isAuth, cancelRazorpayOrder);     // Cancel → Cancelled
orderRoutes.post("/userorder", isAuth, userOrders);

// Admin
orderRoutes.post("/list", adminAuth, allOrders);
orderRoutes.post("/status", adminAuth, updateStatus);
orderRoutes.delete("/delete/:orderId", adminAuth, deleteOrder);

export default orderRoutes;
