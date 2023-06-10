import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { createOrder, getOrders } from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/:gigId", verifyToken, createOrder);
orderRouter.get("/", verifyToken, getOrders);

export default orderRouter