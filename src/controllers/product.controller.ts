import { faker } from "@faker-js/faker";
import type { Request, Response } from "express";
import { ProductType } from "../types/ProductType";
import { memoryCache } from "../utils/caching";


function randomProducts(): ProductType {
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

export async function getProducts(req: Request, res: Response) {

  const quantity = req.body.quantity || req.query.quantity;
  const token = req.body.token || req.query.token;
  const version = req.body.version || req.query.version;

  const products: ProductType[] = faker.helpers.multiple(randomProducts, {
    count: quantity ? quantity : 10,
  });
  const json = {
    status: "ok",
    code: 200,
    quantity: quantity ? quantity : 10,
    products,
  };
  await memoryCache.set(token, { version: version, data: json });
  return res.status(200).json(json);
}
