import { Response } from "express";
import { AuthRequest } from "../types/AuthRequest";
import crypto from "crypto";
import SesiAbsensi from "../models/SesiAbsensi";

export const listAbsen = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (req.user?.role !== "user") {
            res.status(403).json({ message: "can user only" });
            return
        }
        const sesiAbsenModel = await SesiAbsensi.find({ pembuat_id: req.user.id });
        res.status(200).json({ message: "get list succesfuly", sesiAbsenModel });
    } catch (error) {
        res.status(500).json({ message: `Terjadi kesalahan pada server ${error}` });
    }
};

export const generateQrCode = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (req.user?.role !== "admin") {
            res.status(403).json({ message: "Hanya admin yang bisa membuat sesi absensi!" });
            return
        }
        const user_id = req.user?.id;
        // const kode_qr = crypto.randomBytes(6).toString("hex");
        const sesiAbsenModel = new SesiAbsensi({ ...req.body, user_id });
        await sesiAbsenModel.save();
        res.status(201).json({ message: "Sesi absensi berhasil dibuat!", sesiAbsenModel });
    } catch (error) {
        res.status(500).json({ message: `Terjadi kesalahan pada server ${error}` });
    }
};