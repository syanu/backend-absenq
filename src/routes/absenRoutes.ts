import express from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { generateQrCode, listAbsen } from "../controllers/absenController";

const absenRoute = express.Router();
absenRoute.get("/", verifyToken, listAbsen  );
absenRoute.post("/generate", verifyToken, generateQrCode);

export default absenRoute;
