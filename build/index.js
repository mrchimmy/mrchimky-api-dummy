"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_functions_1 = __importDefault(require("firebase-functions"));
const server_1 = require("./server");
exports.app = firebase_functions_1.default.https.onRequest(server_1.app);
