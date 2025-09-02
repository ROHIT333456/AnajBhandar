import mongoose from "mongoose";

const paymentDetailsSchema = new mongoose.Schema(
  {
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },

    // Pending | Order Placed | Cancelled
    status: {
      type: String,
      enum: ["Pending", "Order Placed", "Cancelled"],
      required: true,
      default: "Pending",
    },

    paymentMethod: { type: String, required: true }, // "COD" | "Razorpay"
    payment: { type: Boolean, required: true, default: false }, // true only after success

    // Optional but useful for audits
    paymentDetails: paymentDetailsSchema,

    date: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
