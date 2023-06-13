import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { confirm, getOrders, intent } from "../controllers/order.controller.js";

const orderRouter = express.Router();

// orderRouter.post("/:gigId", verifyToken, createOrder);
orderRouter.get("/", verifyToken, getOrders);
orderRouter.post("/create-payment-intent/:id", verifyToken, intent);
orderRouter.put("/", verifyToken, confirm);

export default orderRouter