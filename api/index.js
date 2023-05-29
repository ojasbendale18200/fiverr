/* eslint-disable no-undef */
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import gigRouter from "./routes/gig.route.js";
import orderRouter from "./routes/order.route.js";
import conversationRouter from "./routes/conversation.route.js";
import messageRouter from "./routes/message.route.js";
import reviewRouter from "./routes/review.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
app.use(cors())





const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGOURL);
      console.log("Connected to mongoDB!");
    } catch (error) {
      console.log(error);
    }
  };

app.use(express.json())
app.use(cookieParser());
app.use("/api/users",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/gigs", gigRouter);
app.use("/api/orders", orderRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/messages", messageRouter);
app.use("/api/reviews", reviewRouter);

  app.listen(4000, () => {
    connect();
    console.log("Backend server is running!");
  });