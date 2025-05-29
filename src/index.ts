import express, { Request, Response, NextFunction } from "express";
import authRoute from './routes/authRoute';
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoute from "./routes/userRoute";


dotenv.config();
connectDB()
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: "Terjadi kesalahan", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));