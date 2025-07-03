import { Router } from "express";
import authRoute from "./authRoute";
import adminRoute from "./adminRoutes";
import userRoute from "./userRoute";
import profileRoute from "./profileRoute";

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: "Server Running!!!",
  });
});
router.use('/api/auth', authRoute)
router.use('/api/profile', profileRoute)
router.use('/api/admin', adminRoute)
router.use('/api/user', userRoute)
router.use("*", (req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

export default router;