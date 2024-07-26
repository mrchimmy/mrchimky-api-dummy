"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = index;
const faker_1 = require("@faker-js/faker");
function randomProducts() {
    return {
        productId: faker_1.faker.string.uuid(),
        image: faker_1.faker.image.url(),
        title: faker_1.faker.commerce.productName(),
        description: faker_1.faker.commerce.productDescription(),
        price: parseFloat(faker_1.faker.commerce.price()),
        favorite: faker_1.faker.number.int({ max: 299 }),
        sold: faker_1.faker.number.int({ max: 499 }),
        user: {
            userId: faker_1.faker.string.uuid(),
            avatar: faker_1.faker.image.avatar(),
            username: faker_1.faker.internet.userName(),
            email: faker_1.faker.internet.email(),
            password: faker_1.faker.internet.password(),
            birthdate: faker_1.faker.date.birthdate(),
            created_at: faker_1.faker.date.past()
        }
    };
}
function index(req, res) {
    const { quantity } = req.body;
    const products = faker_1.faker.helpers.multiple(randomProducts, {
        count: quantity ? quantity : 10,
    });
    const json = {
        status: 'ok',
        code: 200,
        quantity: quantity ? quantity : 10,
        products
    };
    return res.json(json);
}
