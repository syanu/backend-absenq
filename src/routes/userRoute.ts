import express from "express";
import { getProfile } from "../controllers/userController";
import { verifyToken } from "../middlewares/authMiddleware";

const userRoute = express.Router();

userRoute.get("/profile", verifyToken, getProfile);

export default userRoute;
