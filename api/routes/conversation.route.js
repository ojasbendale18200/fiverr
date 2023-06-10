import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
} from "../controllers/conversation.controller.js";

const conversationRouter = express.Router();

conversationRouter.get("/", verifyToken, getConversations);
conversationRouter.post("/", verifyToken, createConversation);
conversationRouter.get("/single/:id", verifyToken, getSingleConversation);
conversationRouter.put("/:id", verifyToken, updateConversation);


export default conversationRouter