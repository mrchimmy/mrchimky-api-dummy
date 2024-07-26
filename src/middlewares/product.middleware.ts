import type { Request, Response, NextFunction } from "express";
const cache = require('memory-cache');

function productCacheMiddleware(req: Request, res: Response, next: NextFunction) {
    const userId = req.body.userId;  // สมมติว่ามี userId อยู่ใน body ของ request
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