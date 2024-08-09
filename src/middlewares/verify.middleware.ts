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
  const version = req.body.version;
  const validatedFields = ZodToken.safeParse({version}); // สมมติว่ามี token อยู่ใน body ของ request
  if (!validatedFields.success) {
      return res.status(400).json({
        status: 'bad',
        code: 400,
        errors: validatedFields.error.flatten().fieldErrors
      });
  }
 next();
}
