import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Incorrect password" });
            return;
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string);
        const { password: _, ...safeUser } = user.toObject();
        res.status(200).json({ message: "Login successful", data: safeUser, token: token });
    } catch (error) {
        next(error);
    }
};

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "Email is already in use" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userModel = new User({ name, email, password: hashedPassword, role });
        await userModel.save();
        const { password: _, ...safeUser } = userModel.toObject();
        res.status(201).json({ message: "Registration successful", data: safeUser });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ message: "Logout successful" });
};
