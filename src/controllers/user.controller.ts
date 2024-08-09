// Package
import { faker } from "@faker-js/faker";
import type { Request, Response } from "express";

// Type
import { UserType } from "../types/UserType";

// ฟังก์ชั้น สุ่มข้อมูลบุคคล
function ramdomUsers() : UserType {
  // ตั้งชื่อ Func และผมได้มีการกำหนด Type ของ Func นี้ด้วย

  // ด้านล่างจะเป็นข้อมูล Make ทั้งหมดที่ผมเลือกใช้
  return {
    userId: faker.string.uuid(),
    avatar: faker.image.avatar(),
    prefix: faker.person.prefix(),
    fullName: faker.person.fullName(),
    gender: faker.person.gender(),
    sex: faker.person.sex(),
    address: faker.location.country(),
    age: faker.number.int({ max: 69 }),
    nationalId: faker.string.numeric({ length: 13 }),
    phone: faker.phone.number(),
    email: faker.internet.email(),
    job: faker.person.jobType(),
    brithday: faker.date.birthdate(),
  };
}

// getUsers ฟังก์ชั้นที่ส่งออกไป
export async function getUsers(req: Request, res: Response) {
  // สังเกตุว่า Typescript บางครั้งจะต้องกำหนด Type ให้ request กับ response ด้วยซึ่ง Javascript ไม่ต้องทำ

  // ตั้งตัวแปร quantity และถึงข้อมูล quantity จาก Body ใน request ออกมา
  const quantity = req.body.quantity;

  // ส่วนนี้เป็นการสร้างข้อมูล Array หลายๆชุดออกมา อย่างเช่นที่ผมทำผมเช็คว่า มี quantity ไหมถัามีให้ดึง quantity มาแต่ถ้าไม่มีให้ใช้ค่า Default คือ 10
  const users: UserType[] = faker.helpers.multiple(ramdomUsers, {
    count: quantity ? quantity : 10,
  });

  // ส่วนนี้เป็นข้อมูลที่ผมส่งออก response ไป
  const json = {
    status: "ok",
    code: 200,
    quantity: quantity ? quantity : 10,
    users,
  };
  // ส่วนนี้ผมส่งทั้งข้อมูล json และ status ออกไปทุกๆคนสามารถเลือกใช้ในการตรวจสอบได้ว่าจะใช้ status หรือ data.code
  return res.status(200).json(json);
}
