import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { memoryCache } from "../utils/caching";
import { ProductType } from "../types/ProductType";

type Types = {
  token: string,
  version: string,
  data: ProductType[]
}

const ZodToken = z.object({
  token: z.string({ message: "กรุณากรอก Key token | เป็น String" }).uuid({ message: "รูปแบบไม่ใช่ UUID" }),
  version: z.string({ message: "กรุณากรอก Key version | เป็น String"})
});
export async function CacheMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  const version = req.body.version;
  const validatedFields = ZodToken.safeParse({token, version}); // สมมติว่ามี token อยู่ใน body ของ request
  if (!validatedFields.success) {
      return res.status(400).json({
        status: 'bad',
        code: 400,
        errors: validatedFields.error.flatten().fieldErrors
      });
  }
  const cachedData = await memoryCache.get(validatedFields.data.token) as Types;
  if (cachedData && cachedData.version === validatedFields.data.version) {
    // ส่งข้อมูลจาก cache ถ้ามีและ version ตรงกัน
    res.json(cachedData.data);
  } else {
    // ถ้าไม่มี cache หรือ version ไม่ตรงกัน ให้ไปทำงานต่อใน route handler
    next();
  }
}
