import { Response, NextFunction, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthRequest } from "../types/AuthRequest";

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Akses ditolak" });
        return;
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Token tidak valid" });
    }
};

export const verifyRole = (allowedRole: 'admin' | 'user'): RequestHandler => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        const user = req.user as JwtPayload;

        if (!user || user.role !== allowedRole) {
            res.status(403).json({ message: 'Access denied' });
            return;
        }

        next();
    };
};
