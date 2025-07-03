import { Response } from "express";
import { AuthRequest } from "../types/AuthRequest";
import SesiAbsensi from "../models/SesiAbsensi";
import Absensi from "../models/Absensi";
import { checkDistanceToTarget } from "../utils/distance";
import mongoose from "mongoose";

export const overviewAbsen = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        const sesiAdmin = await SesiAbsensi.find({ user_id: userId }).lean();
        const sesiAdminIds = sesiAdmin.map((s) => s._id.toString());
        const totalSesi = sesiAdminIds.length;
        const totalHadir = await Absensi.countDocuments({
            sesi_id: { $in: sesiAdminIds.map(id => new mongoose.Types.ObjectId(id)) },
        });
        const persentase = totalSesi === 0 ? 0 : Math.round((totalHadir / totalSesi) * 100);
        res.status(200).json({
            message: "Successfully retrieved",
            data: {
                user_id: userId,
                total_sesi: totalSesi,
                total_hadir: totalHadir,
                persentase_hadir: persentase
            },
        });
    } catch (error) {
        res.status(500).json({ message: `Server error occurred: ${error}` });
    }
};

export const adminListAbsen = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;

        // 1. Ambil semua sesi milik user (admin)
        const sesiAbsenModel = await SesiAbsensi.find({ user_id: userId })
            .sort({ created_at: -1 })
            .lean();

        const sesiIds = sesiAbsenModel.map((sesi) => sesi._id);

        // 2. Ambil semua absensi yang terkait dengan sesi tersebut
        const absensi = await Absensi.find({ sesi_id: { $in: sesiIds } })
            .populate("user_id", "name email") // hanya ambil field penting
            .populate("sesi_id", "_id name")   // optional: buat validasi sesi
            .lean();

        // 3. Gabungkan sesi dengan absensi-nya
        const result = sesiAbsenModel.map((sesi) => {
            const absenList = absensi.filter((a) => {
                let sesiIdStr = "";

                if (a.sesi_id && typeof a.sesi_id === "object" && "_id" in a.sesi_id) {
                    sesiIdStr = (a.sesi_id as any)._id?.toString?.() ?? "";
                } else if (typeof a.sesi_id === "string" || typeof a.sesi_id === "object") {
                    sesiIdStr = a.sesi_id?.toString?.() ?? "";
                }

                return sesiIdStr === sesi._id.toString();
            });

            return {
                ...sesi,
                user_absensi: absenList.map((a) => ({
                    ...a.user_id
                }))
            };
        });

        res.status(200).json({
            message: "Successfully retrieved",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            message: `Server error occurred: ${error}`,
        });
    }
};

export const adminListAbsenDump = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const adminId = req.user?.id;

        if (!adminId || req.user?.role !== "admin") {
            res.status(403).json({ message: "Forbidden: Only admin can access this data" });
        }

        // Ambil semua sesi yang dibuat oleh admin
        const sesi = await mongoose.model("Sesi_Absensis").find({ user_id: adminId }).lean();
        const sesiIds = sesi.map(s => s._id);

        // Ambil semua absensi yang terkait dengan sesi tersebut
        const absensi = await mongoose.model("Absensis").find({ sesi_id: { $in: sesiIds } })
            .populate("user_id", "name email")
            .populate("sesi_id", "name date_start date_end")
            .lean();

        // Format hasilnya
        const data = absensi.map((a) => ({
            absen_id: a._id,
            user_id: a.user_id?._id?.toString() ?? null,
            user_name: a.user_id?.name ?? null,
            sesi_id: a.sesi_id?._id?.toString() ?? null,
            sesi_name: a.sesi_id?.name ?? null,
            date_start: a.sesi_id?.date_start ?? null,
            date_end: a.sesi_id?.date_end ?? null,
            absen_time: a.created_at,
            status: 'Absen'
        }));

        res.status(200).json({
            message: "Berhasil mengambil data absensi",
            data:data
        });

    } catch (error) {
        res.status(500).json({
            message: `Server error occurred: ${error}`,
        });
    }
}

export const adminGenerateQrCode = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        const sesiAbsenModel = new SesiAbsensi({ ...req.body, user_id: userId });
        await sesiAbsenModel.save();
        res.status(201).json({ message: "Attendance session successfully created!", data: sesiAbsenModel });


        // const { location_lat, location_lng } = req.body;

        // const lat = parseFloat(location_lat);
        // const lng = parseFloat(location_lng);

        // if (isNaN(lat) || isNaN(lng)) {
        //      res.status(400).json({ message: 'Koordinat harus berupa angka' });
        // }
        // const { distance, isWithinRange } = checkDistanceToTarget(location_lat, location_lng);

        // if (isWithinRange) {
        //     res.json({ message: 'Dalam jangkauan', distance });
        // } else {
        //     res.status(403).json({ message: 'Di luar jangkauan', distance });
        // }

    } catch (error) {
        res.status(500).json({ message: `Server error occurred: ${error}` });
    }
};

export const listAbsen = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const sesiAbsenModel = await SesiAbsensi.find().sort({ created_at: -1 });
        res.status(200).json({ message: "Successfully retrieved session list", data: sesiAbsenModel });
    } catch (error) {
        res.status(500).json({ message: `Server error occurred: ${error}` });
    }
};

export const absen = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { sesi_id, location_lat, location_lng } = req.body;

        const sesi = await SesiAbsensi.findById(sesi_id);
        if (!sesi) {
            res.status(400).json({ message: "Session not found" });
            return;
        }

        // const now = new Date();
        // if (now < sesi.date_start || now > sesi.date_end) {
        //     res.status(400).json({ message: "Outside of attendance time window" });
        //     return;
        // }

        const existing = await Absensi.findOne({ user_id: req.user?.id, sesi_id });
        if (existing) {
            res.status(400).json({ message: "You have already checked in for this session" });
            return;
        }

        const absen = await Absensi.create({
            user_id: req.user?.id,
            sesi_id,
            absen_time: new Date(),
        });

        res.status(201).json({ message: "Attendance recorded successfully", data: absen });
    } catch (error) {
        res.status(500).json({ message: `Server error occurred: ${error}` });
    }
};

export const historyAbsen = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;

        const history = await Absensi.find({ user_id: userId })
            .populate("sesi_id")
            .populate("user_id")
            .sort({ created_at: -1 })
            .lean<any[]>();

        const formatted = history.map(item => ({
            _id: item._id,
            created_at: item.created_at,
            user: {
                ...item.user_id,
                _id: item.user_id?._id,
                nama: item.user_id?.nama,
                email: item.user_id?.email,
            },
            sesi: {
                ...item.sesi_id
            }
        }));

        res.status(200).json({ message: "Successfully retrieved attendance history", data: formatted });
    } catch (error) {
        res.status(500).json({ message: `Server error occurred: ${error}` });
    }
};
