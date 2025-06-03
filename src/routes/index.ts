import { Router } from "express";
import authRoute from "./authRoute";
import userRoute from "./userRoute";
import absenRoute from "./absenRoutes";
const router = Router();

router.use('/api/auth', authRoute)
router.use('/api/user', userRoute)
router.use('/api/absen', absenRoute)
router.use("*", (req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

export default router;