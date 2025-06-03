import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.ATLAS_MONGO_URL as string,{
            dbName:'absensiz'
        });
        console.log("Database Connected");
    } catch (error) {
        console.error("Database Connection Failed:", error);
        process.exit(1);
    }
};

export default connectDB;