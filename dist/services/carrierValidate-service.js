"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarrierValidation = CarrierValidation;
const http_status_1 = __importDefault(require("http-status"));
const database_1 = __importDefault(require("../database"));
async function CarrierValidation(carrier) {
    const promiceCarrier = await database_1.default.query("SELECT * FROM carriers WHERE name = $1", [carrier]);
    console.log(promiceCarrier);
    if (promiceCarrier.rowCount == 0) {
        throw ({
            error: http_status_1.default.NOT_FOUND,
            message: "Carrier not found"
        });
    }
    return promiceCarrier.rows[0];
}
