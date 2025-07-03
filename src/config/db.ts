import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const urlDB = process.env.NODE_ENV === 'production' ? process.env.ATLAS_MONGO_URL : process.env.MONGO_URl;
        await mongoose.connect(urlDB as string, {
            dbName: 'absensiz'
        });
        console.log("Database Connected");
    } catch (error) {
        console.error("Database Connection Failed:", error);
        process.exit(1);
    }
};

export default connectDB;