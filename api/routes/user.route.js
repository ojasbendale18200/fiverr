import express from "express";
import { deleteUser, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const userRouter = express.Router();

userRouter.delete("/:id", verifyToken, deleteUser);
userRouter.get("/:id", getUser);

export default userRouter

