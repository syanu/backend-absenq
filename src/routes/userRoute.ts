import express from "express";
import { verifyRole, verifyToken } from "../middlewares/authMiddleware";
import { absen, historyAbsen, listAbsen } from "../controllers/absenController";
import { validate } from "../middlewares/validate";
import { AbsenValidation } from "../validations/absenValidation";

const userRoute = express.Router();

userRoute.get("/absen", verifyToken, verifyRole("user"), listAbsen);
userRoute.post("/absen", verifyToken, verifyRole("user"), validate(AbsenValidation), absen);
userRoute.get("/absen/history",verifyToken , verifyRole("user"), historyAbsen);

export default userRoute;
