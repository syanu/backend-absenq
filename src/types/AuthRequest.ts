import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: JwtPayload | { id: string; role: "admin" | "user" };
}