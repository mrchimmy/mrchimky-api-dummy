// Package
import { faker } from "@faker-js/faker";
import type { Request, Response } from "express";

// Type
import { ProductType } from "../types/ProductType";

// ฟังก์ชั้น สุ่มสินค้า
function randomProducts(): ProductType {
  // ตั้งชื่อ Func และผมได้มีการกำหนด Type ของ Func นี้ด้วย

  // ด้านล่างจะเป็นข้อมูล Make ทั้งหมดที่ผมเลือกใช้
  return {
    productId: faker.string.uuid(),
    image: faker.image.url(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    favorite: faker.number.int({ max: 299 }),
    sold: faker.number.int({ max: 499 }),
    user: {
      userId: faker.string.uuid(),
      avatar: faker.image.avatar(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      created_at: faker.date.past(),
    },
  };
}
// getProducts ฟังก์ชั้นที่ส่งออกไป
export async function getProducts(req: Request, res: Response) {
  // สังเกตุว่า Typescript บางครั้งจะต้องกำหนด Type ให้ request กับ response ด้วยซึ่ง Javascript ไม่ต้องทำ

  // ตั้งตัวแปร quantity และถึงข้อมูล quantity จาก Body ใน request ออกมา
  const quantity = req.body.quantity;

  // ส่วนนี้เป็นการสร้างข้อมูล Array หลายๆชุดออกมา อย่างเช่นที่ผมทำผมเช็คว่า มี quantity ไหมถัามีให้ดึง quantity มาแต่ถ้าไม่มีให้ใช้ค่า Default คือ 10
  const products: ProductType[] = faker.helpers.multiple(randomProducts, {
    count: quantity ? quantity : 10,
  });

  // ส่วนนี้เป็นข้อมูลที่ผมส่งออก response ไป
  const json = {
    status: "ok",
    code: 200,
    quantity: quantity ? quantity : 10,
    products,
  };
  
  // ส่วนนี้ผมส่งทั้งข้อมูล json และ status ออกไปทุกๆคนสามารถเลือกใช้ในการตรวจสอบได้ว่าจะใช้ status หรือ data.code
  return res.status(200).json(json);
}
