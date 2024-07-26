"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_controller_1 = require("../controllers/product.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/get', product_controller_1.index);
exports.default = router;
