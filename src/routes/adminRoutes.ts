import express from "express";
import { verifyRole, verifyToken } from "../middlewares/authMiddleware";
import { adminListAbsen,adminGenerateQrCode, overviewAbsen, adminListAbsenDump  } from "../controllers/absenController";
import { validate } from "../middlewares/validate";
import { AbsenGenerateValidation } from "../validations/absenGenerateValidation";

const adminRoute = express.Router();
adminRoute.get("/absen", verifyToken, verifyRole("admin"), adminListAbsen);
adminRoute.post("/absen/generate", verifyToken, verifyRole("admin"),validate(AbsenGenerateValidation), adminGenerateQrCode);
adminRoute.get("/absen/overview", verifyToken, verifyRole("admin"), overviewAbsen);
adminRoute.get("/absen/dump", verifyToken, verifyRole("admin"), adminListAbsenDump);

export default adminRoute;
