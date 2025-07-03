import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import appMiddleware from "./middlewares/appMiddleware";

dotenv.config();
connectDB()
const app = express();
app.use(appMiddleware);
console.log(`Running in ${process.env.NODE_ENV} mode`);
if (require.main === module) {
    const PORT = Number(process.env.PORT) || 5000;
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });
}


export default app;