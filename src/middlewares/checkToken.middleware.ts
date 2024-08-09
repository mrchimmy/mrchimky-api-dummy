// Package & Type From Package
import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

// ส่วนนี้ผมใช้เป็นการ Validate ข้อมูลที่จะส่งมาใช้ Package ของ zod
const ZodToken = z.object({
    token: z.string({ message: "กรุณากรอก Key token | เป็น String" }).uuid({ message: "รูปแบบไม่ใช่ UUID" }),
  });

// checkToken ฟังก์ชั้นที่ส่งออกไป
export async function checkToken(req: Request, res: Response, next: NextFunction) {
    // สังเกตุว่า Typescript บางครั้งจะต้องกำหนด Type ให้ request กับ response และ NextFunction ด้วยซึ่ง Javascript ไม่ต้องทำ
    // ผมมีการใช้ try catch เพราะผมอยากใช้ครับ ไม่ได้มีปัญหาอะไร
    try {
        // req.headers.authorization ดึงข้อมูลใน headers ออกมา
        const RawToken = req.headers.authorization;
        
        // ส่วนนี้คือ Validate เป็น Parameter ใช้งานเริ่มต้นของ zod ในการตรวจสอบข้อมูลแบบ Object
        const validatedFields = ZodToken.safeParse({ token: RawToken });
        
        // ส่วนนี้คือเช็คว่า validatedFields.success เป็น true ไหมถ้าเป็น false ให้ทำ if condition นี้
        // เพิ่มเติม สังเกตุว่า ผมใส่ ! นำหน้า validatedFields.success เพราะ if condition จะทำงานเมื่อค่าเป็น true ดังนั้น !validatedFields.success จึงให้อารมณ์เหมือน validatedFields.success เป็น false นะแต่ใส่อันนี้ [ ! ] ให้มันเป็น true หรือ เปลี่ยนจาก false เป็น true นั้นแหละ
        // อีกกรณีถ้า validatedFields.success เป็น true แล้วเราใส่ ! นำหน้า (!validatedFields.success) จะเปลี่ยเนป็น false ทันที ดังนั้นนะครับ ไอนี่ [ ! ] เปลี่ยน True เป็น False และ เปลี่ยน False เป็น True
        if (!validatedFields.success) {
            return res.status(401).json({
                status: "unauthenticated",
                code: 401,
                message: "Token ต้องเป็น UUID v4 เท่านั้น!!"
            });
        }
        // next() เป็นฟังก์ชั้นส่งต่อการทำงาน ไปต่อ ถ้าไม่มี middleware ก็จะไม่ไปไหนสักที อย่าลืมใส่กันหล่ะ
        next();
    } catch (error) {
        return res.status(401).json({
            status: "unauthenticated",
            code: 401,
            message: "มีปัญหาบางอย่าง รอให้ Dev มาเจอ"
        });
    }
} 