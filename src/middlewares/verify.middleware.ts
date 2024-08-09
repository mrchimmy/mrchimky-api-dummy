// Package & Type From Package
import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

const ZodToken = z.object({
  version: z.string({ message: "กรุณากรอก Key version | เป็น String"})
});
export async function verifyRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // สังเกตุว่า Typescript บางครั้งจะต้องกำหนด Type ให้ request กับ response และ NextFunction ด้วยซึ่ง Javascript ไม่ต้องทำ
  
  // ผมได้ดึงข้อมูลจาก request body ออกมาเป็น version แต่ถ้าเขียนอีกแบบจะได้เป็น const version = req.body.version; ซึ่งมันยาวไป
  const { version } = req.body;
  
  // ส่วนนี้คือ Validate เป็น Parameter ใช้งานเริ่มต้นของ zod ในการตรวจสอบข้อมูลแบบ Object 
  const validatedFields = ZodToken.safeParse({version}); // สมมติว่ามี token อยู่ใน body ของ request
  
  // ส่วนนี้คือเช็คว่า validatedFields.success เป็น true ไหมถ้าเป็น false ให้ทำ if condition นี้
  // เพิ่มเติม สังเกตุว่า ผมใส่ ! นำหน้า validatedFields.success เพราะ if condition จะทำงานเมื่อค่าเป็น true ดังนั้น !validatedFields.success จึงให้อารมณ์เหมือน validatedFields.success เป็น false นะแต่ใส่อันนี้ [ ! ] ให้มันเป็น true หรือ เปลี่ยนจาก false เป็น true นั้นแหละ
  // อีกกรณีถ้า validatedFields.success เป็น true แล้วเราใส่ ! นำหน้า (!validatedFields.success) จะเปลี่ยเนป็น false ทันที ดังนั้นนะครับ ไอนี่ [ ! ] เปลี่ยน True เป็น False และ เปลี่ยน False เป็น True
  if (!validatedFields.success) {
      return res.status(400).json({
        status: 'bad',
        code: 400,
        // อันนี้เป็นข้อมูล Error ของที่เราได้ validatedFields ใว้
        errors: validatedFields.error.flatten().fieldErrors
      });
  }
 next();
}
