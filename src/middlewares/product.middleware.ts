import type { Request, Response, NextFunction } from "express";
import cache from 'memory-cache';
import { z } from "zod";

const isUUID = z.object({
  userId: z.string().uuid({ message: "รูปแบบไม่ใช่ UUID" }),
});
export function productCacheMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = isUUID.safeParse(req.body); // สมมติว่ามี userId อยู่ใน body ของ request
  const version = req.body.version;
  const cachedData = cache.get(userId);

  if (cachedData && cachedData.version === version) {
    // ส่งข้อมูลจาก cache ถ้ามีและ version ตรงกัน
    res.json(cachedData.data);
  } else {
    // ถ้าไม่มี cache หรือ version ไม่ตรงกัน ให้ไปทำงานต่อใน route handler
    next();
  }
}
