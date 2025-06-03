import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        const userModel = await User.findOne({ email });
        if (!userModel) {
            res.status(404).json({ message: "User tidak tersedia" });
            return;
        }
        const isMatch = await bcrypt.compare(password, userModel.password);
        if (!isMatch) {
            res.status(401).json({ message: "Password salah" });
            return;
        }
        const token = jwt.sign({ id: userModel._id, role: userModel.role }, process.env.JWT_SECRET as string);
        res.status(200).json({ message: "Login Berhasil", data: userModel, token: token });
    } catch (error) {
        console.error(error);

        next(error);
    }
};

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { nama, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "Email sudah digunakan" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userModel = new User({ nama, email, password: hashedPassword, role: role });
        await userModel.save();
        res.status(201).json({ message: "Registrasi berhasil", data: userModel });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ message: "Logout berhasil. Silakan hapus token di sisi klien." });
};