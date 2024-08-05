import { Response } from "express";

export async function validatedFields(query: any, data: any, res: Response) {
  const validatedFields = query.safeParse(data);
  if (!validatedFields.success) {
    return res.status(400).json({
      status: "bad",
      code: 400,
      errors: validatedFields.error.flatten().fieldErrors,
    });
  }
  return validatedFields.data;
}
