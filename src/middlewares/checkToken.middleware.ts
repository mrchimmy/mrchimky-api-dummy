import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const ZodToken = z.object({
    token: z.string({ message: "กรุณากรอก Key token | เป็น String" }).uuid({ message: "รูปแบบไม่ใช่ UUID" }),
  });

export async function checkToken(req: Request, res: Response, next: NextFunction) {
    try {
        const RawToken = req.headers.authorization;
        const validatedFields = ZodToken.safeParse({ token: RawToken });
        if (!validatedFields.success) {
            return res.status(401).json({
                status: "unauthenticated",
                code: 401,
                message: "Token ต้องเป็น UUID v4 เท่านั้น!!"
            });
        }
        next();
    } catch (error) {
        console.log(error);
    }
} 