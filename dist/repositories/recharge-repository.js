"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRecharge = postRecharge;
exports.getRechargesByPhone = getRechargesByPhone;
const database_1 = __importDefault(require("../database"));
const http_status_1 = __importDefault(require("http-status"));
async function postRecharge(recharge) {
    const number = await database_1.default.query(`SELECT * FROM phones WHERE id= $1`, [recharge.id_number]);
    if (number.rowCount == 0) {
        throw ({
            error: http_status_1.default.NOT_FOUND,
            message: "number not found"
        });
    }
    const rechargeOnData = await database_1.default.query(`INSERT INTO recharges(value, number_id) VALUES($1, $2) RETURNING *`, [recharge.value, recharge.id_number]);
    const rechargeInserted = rechargeOnData.rows[0];
    return rechargeInserted;
}
async function getRechargesByPhone(number) {
    let numberId = await database_1.default.query(`SELECT id FROM phones WHERE number=$1`, [number]);
    console.log(numberId);
    if (numberId.rowCount == 0) {
        throw ({
            error: http_status_1.default.NOT_FOUND,
            message: "number not found"
        });
    }
    const rechargesOnDB = await database_1.default.query(`SELECT * FROM recharges WHERE number_id = $1`, [numberId.rows[0].id]);
    const recharges = rechargesOnDB.rows;
    return recharges;
}
