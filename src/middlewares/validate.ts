import { ZodSchema } from "zod";
import { Request, Response, NextFunction, RequestHandler } from "express";

export const validate = (schema: ZodSchema<any>): RequestHandler => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: "Validation error",
                errors: result.error.flatten(),
            });
            return;
        }

        req.body = result.data;
        next();
    };
};