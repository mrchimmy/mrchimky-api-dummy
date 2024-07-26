"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const port = process.env.APP_PORT || 80;
exports.app.use((0, cors_1.default)());
exports.app.use(body_parser_1.default.urlencoded({ extended: false }));
exports.app.use(body_parser_1.default.json());
const product_route_1 = __importDefault(require("./routes/product.route"));
exports.app.get('/', (req, res) => {
    return res.json({
        message: "Hello World"
    });
});
exports.app.use('/product', product_route_1.default);
exports.app.listen(port, () => {
    console.log(`Express is Running on Port : ${port}`);
});
