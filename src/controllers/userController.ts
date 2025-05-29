import { Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../types/AuthRequest";


export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Akses tidak diizinkan" });
            return;
        }

        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            res.status(404).json({ message: "User tidak ditemukan" });
            return;
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server", error });
    }
};