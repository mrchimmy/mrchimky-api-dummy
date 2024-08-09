import { faker } from "@faker-js/faker";
import type { Request, Response } from "express";
import { UserType } from "../types/UserType";


function ramdomUsers() : UserType {
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

export async function getUsers(req: Request, res: Response) {

  const quantity = req.body.quantity;

  const users: UserType[] = faker.helpers.multiple(ramdomUsers, {
    count: quantity ? quantity : 10,
  });
  const json = {
    status: "ok",
    code: 200,
    quantity: quantity ? quantity : 10,
    users,
  };
  return res.status(200).json(json);
}
