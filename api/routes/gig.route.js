import express from "express";
import { createGig, deleteGig, getGig, getGigs } from "../controllers/gig.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const gigRouter = express.Router();

gigRouter.post("/", verifyToken, createGig);
gigRouter.delete("/:id", verifyToken, deleteGig);
gigRouter.get("/single/:id", getGig);
gigRouter.get("/", getGigs);

export default gigRouter