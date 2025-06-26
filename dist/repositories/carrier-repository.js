"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCarrier = getCarrier;
const database_1 = __importDefault(require("../database"));
const http_status_1 = __importDefault(require("http-status"));
async function getCarrier(id) {
    let carrierData = await database_1.default.query(`SELECT * FROM carriers WHERE id = $1`, [id]);
    if (carrierData.rowCount == 0) {
        throw ({
            error: http_status_1.default.NOT_FOUND,
            message: "carrier not found"
        });
    }
    carrierData = carrierData.rows[0];
    return carrierData;
}
