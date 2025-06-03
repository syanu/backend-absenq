import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import appMiddleware from "./middlewares/appMiddleware";


dotenv.config();
connectDB()
const app = express();

app.use(appMiddleware);
// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello, TypeScript with Express!');
// });
// app.use('/api/auth', authRoute)
// app.use('/api/user', userRoute)
// app.use('/api/absen', absenRoute)

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   res.status(500).json({ message: "Terjadi kesalahan", error: err.message });
// });



if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;