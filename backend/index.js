import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from "cors"

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import heroRoutes from './routes/heroRoutes.js' // ✅ Hero route added

dotenv.config()

const port = process.env.PORT || 6000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
 origin: ["https://anajbhandar.onrender.com", "http://localhost:5174"],
 credentials: true
}))

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/hero", heroRoutes) // ✅ Hero section route

app.listen(port, () => {
  console.log("Hello From Server")
  connectDb()
})
