"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRegisterToken = exports.generateToken = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const hashPassword = async (password) => {
    const saltRounds = 10;
    const salt = await bcryptjs_1.default.genSalt(saltRounds);
    const hash = await bcryptjs_1.default.hash(password, salt);
    return hash;
};
exports.hashPassword = hashPassword;
const generateToken = (data) => {
    return jsonwebtoken_1.default.sign(data, `${process.env.APP_SECRET}`, { expiresIn: "1d" });
};
exports.generateToken = generateToken;
const generateRegisterToken = (data) => {
    return jsonwebtoken_1.default.sign(data, `${process.env.APP_SECRET}`, { expiresIn: "20m" });
};
exports.generateRegisterToken = generateRegisterToken;
