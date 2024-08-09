// Package
import type {Request, Response} from 'express';
import QRCode from 'qrcode';
import { z } from "zod";

// Utility
import { validatedFields } from '../utils/validatedFields';

// ส่วนนี้ผมใช้เป็นการ Validate ข้อมูลที่จะส่งมาใช้ Package ของ zod
const ZodQuery = z.object({
    text: z.string({ message: "กรุณากรอก text เช่น ข้อความ หรือ URL" }),
    margin: z.number({ message: "กรุณากรอกเป็นตัวเลข"}).nullable().optional(),
    color: z.object({ primary: z.string(), secondary: z.string() }).nullable().optional()
});
// เพิ่มเติม .nullable().optional() ส่วนนี้เป็นการกำหนดให้ข้อมูลเป็น null หรือไม่มีค่ามาได้ แต่ถ้ามีค่ามาไม่ตรงกับ Type ที่เราเลือกก็จะ Reject

// getQrCode ฟังก์ชั้นที่ส่งออกไป
export async function getQrCode(req: Request, res: Response) {
    // ผมมีการใช้ try catch เพราะอาจเกิดปัญหาในการสร้าง URL ได้
    try {
        // ส่วนนี้เป็นข้อมูลที่ได้มีการ Validate แล้วผมแยกออกไปเพราะโค้ตจะเยอะ และตามใจผม555
        // เพิ่มเติม { text, margin, color } ข้อมูลที่ออกมานี้ คือข้อมูลจาก Object ที่ผมเจาะจงมาเลย จากปกติที่จะต้อง data.text เป็นต้น
        const { text, margin, color } = await validatedFields(ZodQuery, req.body, res);

        // ส่วนนี้เป็นการทำงานของ Package qrcode ที่สร้าง qrcode ออกมาให้กับเรา
        const data = await QRCode.toDataURL(text, { errorCorrectionLevel: 'H', margin, width: 300, color: {
            dark: color.primary,
            light: color.secondary,
        } })

        // ส่วนนี้เป็นข้อมูลที่ผมส่งออก response ไป
        const json = {
            status: 'ok',
            code: 200,
            data
        };
        
        // ส่วนนี้ผมส่งทั้งข้อมูล json และ status ออกไปทุกๆคนสามารถเลือกใช้ในการตรวจสอบได้ว่าจะใช้ status หรือ data.code
        return res.status(200).json(json);
    } catch (error: any) {
        // ส่วนนี้ผมใช้ error: any เพราะผมขี้เกียจใช้ if error instanceof Error
        const json = {
            status: 'ok',
            code: 400,
            error: error.message
        }

        // ส่วนนี้ผมส่งทั้งข้อมูล json และ status ออกไปทุกๆคนสามารถเลือกใช้ในการตรวจสอบได้ว่าจะใช้ status หรือ data.code
        return res.status(400).json(json);
    }
}