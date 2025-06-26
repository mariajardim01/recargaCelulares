"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.phoneSchema = joi_1.default.object({
    cpf: joi_1.default.string().required().length(11),
    name: joi_1.default.string().required().max(250),
    description: joi_1.default.string().required().max(250),
    carrier: joi_1.default.string().required().max(250),
    number: joi_1.default.string().required().length(11)
});
