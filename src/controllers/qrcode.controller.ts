import type {Request, Response} from 'express';
import QRCode from 'qrcode';
import { z } from "zod";
import { validatedFields } from '../utils/validatedFields';

const ZodQuery = z.object({
    text: z.string({ message: "กรุณากรอก text เช่น ข้อความ หรือ URL" }),
    margin: z.number({ message: "กรุณากรอกเป็นตัวเลข"}).nullable().optional(),
    color: z.object({ primary: z.string(), secondary: z.string() }).nullable().optional()
});

export async function getQrCode(req: Request, res: Response) {
    try {
        const { text, margin, color } = await validatedFields(ZodQuery, req.body, res);
        const data = await QRCode.toDataURL(text, { errorCorrectionLevel: 'H', margin, width: 300, color: {
            dark: color.primary,
            light: color.secondary,
        } })
        const json = {
            status: 'ok',
            code: 200,
            data
        };
        return res.status(200).json(json);
    } catch (error: any) {
        const json = {
            status: 'ok',
            code: 400,
            error: error.message
        }
        return res.status(400).json(json);
    }
}