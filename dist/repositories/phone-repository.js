"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertPhone = InsertPhone;
exports.GetPhonesByCPF = GetPhonesByCPF;
const database_1 = __importDefault(require("../database"));
const http_status_1 = __importDefault(require("http-status"));
async function InsertPhone(phone, user_id) {
    const phoneONData = await database_1.default.query(`SELECT * FROM phones WHERE number = $1`, [phone.number]);
    console.log(phoneONData);
    if (phoneONData.rowCount > 0) {
        throw ({
            error: http_status_1.default.CONFLICT,
            message: "this number is already in use"
        });
    }
    const phonesOfUserOnData = await database_1.default.query(`SELECT ALL * FROM phones WHERE user_id = $1`, [user_id]);
    if (phonesOfUserOnData.rowCount >= 3) {
        throw ({
            error: http_status_1.default.CONFLICT,
            message: "User has reached the limit of phone numbers (maximum 3)"
        });
    }
    const phoneInserted = await database_1.default.query(`INSERT INTO phones (number, carrier_id ,user_id) 
    VALUES ($1,$2,$3)
    RETURNING *`, [phone.number, phone.carrier_id, phone.user_id]);
    const dataInserted = phoneInserted.rows[0];
    return dataInserted;
}
async function GetPhonesByCPF(cpf) {
    const userId = await database_1.default.query(`SELECT id from users WHERE cpf = $1 `, [cpf]);
    if (userId.rowCount == 0) {
        return [];
    }
    const Id = userId.rows[0].id;
    const phones = await database_1.default.query(`SELECT * FROM phones WHERE user_id = $1`, [Id]);
    return phones.rows;
}
