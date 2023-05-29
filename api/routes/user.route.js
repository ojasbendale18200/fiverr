import express from "express";
import { deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";



const userRouter = express.Router();

userRouter.delete("/:id",verifyToken,deleteUser );
userRouter.get("/:id", );

export default userRouter

