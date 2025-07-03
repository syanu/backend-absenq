import { Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../types/AuthRequest";

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Access denied" });
            return;
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json({ message: "User found", data: user });
    } catch (error) {
        res.status(500).json({ message: `Server error occurred: ${error}` });
    }
};