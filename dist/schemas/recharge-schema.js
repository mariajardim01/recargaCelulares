"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rechargeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.rechargeSchema = joi_1.default.object({
    id_number: joi_1.default.number().required(),
    value: joi_1.default.number().required().max(1000).min(10)
});
