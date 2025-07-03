import express from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { getProfile } from "../controllers/profileController";

const profileRoute = express.Router();

profileRoute.get("/", verifyToken, getProfile);

export default profileRoute;
