import { faker } from '@faker-js/faker';
import type { Request, Response } from "express";
import { ProductType } from "../types/ProductType";

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
      created_at: faker.date.past()
    }
  };
};

let myMagicCache: any;


export function index(req: Request, res: Response) {
  const { quantity } = req.body;
  
  if (myMagicCache) {
    res.send({ ...myMagicCache })
  } else {
    const products: ProductType[] = faker.helpers.multiple(randomProducts, {
      count: quantity ? quantity : 10,
    });
    const json = {
      status: 'ok',
      code: 200,
      quantity: quantity ? quantity : 10,
      products
    };
    myMagicCache = json
    res.send({ ...myMagicCache })
    return res.json(json);
  }
};
  