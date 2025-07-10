import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import Product from "../model/productModel.js";
import razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Updated: Delivery charge based on quantity
const calculateOrderAmount = async (items) => {
  const products = await Product.find({});
  let total = 0;
  let totalQuantity = 0;

  for (const item of items) {
    const product = products.find(p => p._id.toString() === item._id.toString());
    if (!product) continue;

    const sizeInKg = parseInt(item.size.replace("kg", ""));
    const unitPrice = parseFloat(product.price);
    const quantity = parseInt(item.quantity);

    total += sizeInKg * unitPrice * quantity;
    totalQuantity += quantity;
  }

  // New delivery logic:
  let deliveryCharge = 0;
  if (totalQuantity === 1) {
    deliveryCharge = 40;
  } else if (totalQuantity > 1) {
    deliveryCharge = totalQuantity * 30;
  }

  return total + deliveryCharge;
};

// ✅ COD Order
export const placeOrder = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.userId;
    const amount = await calculateOrderAmount(items);

    const newOrder = new Order({
      items, amount, userId, address,
      paymentMethod: 'COD', payment: false, date: Date.now()
    });

    await newOrder.save();
    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.status(201).json({ message: 'Order Placed Successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Order Placement Failed' });
  }
};

// ✅ Razorpay Order
export const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.userId;
    const amount = await calculateOrderAmount(items);

    const newOrder = new Order({
      items, amount, userId, address,
      paymentMethod: 'Razorpay', payment: false, date: Date.now()
    });

    await newOrder.save();

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: newOrder._id.toString()
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) return res.status(500).json({ message: "Razorpay Error" });
      res.status(200).json(order);
    });

  } catch (error) {
    res.status(500).json({ message: 'Razorpay Error' });
  }
};

// ✅ Verify Razorpay Payment
export const verifyRazorpay = async (req, res) => {
  try {
    const userId = req.userId;
    const { razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === 'paid') {
      await Order.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await User.findByIdAndUpdate(userId, { cartData: {} });
      return res.status(200).json({ message: "Payment Verified" });
    } else {
      return res.json({ message: "Payment Failed" });
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ User Order History
export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "User Order Error" });
  }
};

// ✅ Admin View All Orders
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Admin Order Error" });
  }
};

// ✅ Admin: Update Order Status
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ message: "Status Updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Admin: Delete Order (Only if 'Order Placed')
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    if (order.status !== "Order Placed") {
      return res.status(400).json({ success: false, message: "Only 'Order Placed' orders can be deleted" });
    }

    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete Failed" });
  }
};
