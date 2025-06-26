"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertUser = InsertUser;
exports.GetUser = GetUser;
const database_1 = __importDefault(require("../database"));
const http_status_1 = __importDefault(require("http-status"));
async function InsertUser(user) {
    const userOnData = await database_1.default.query(`SELECT * FROM users WHERE cpf = $1`, [user.cpf]);
    if (userOnData.rowCount && userOnData.rowCount > 0) {
        return userOnData.rows[0];
    }
    try {
        const userResult = await database_1.default.query(`INSERT INTO users (name, description, cpf) 
        VALUES($1, $2, $3)
        RETURNING *`, [user.name, user.description, user.cpf]);
        console.log(userResult);
        return userResult.rows[0];
    }
    catch (error) {
        console.error("Database error:", error);
        if (error.code === '23505' && error.constraint === 'users_cpf_key') {
            throw {
                error: http_status_1.default.CONFLICT,
                message: "CPF already in use"
            };
        }
        throw {
            error: http_status_1.default.INTERNAL_SERVER_ERROR,
            message: "Database error"
        };
    }
}
async function GetUser(cpf) {
    const user = await database_1.default.query(`SELECT * FROM users WHERE cpf=$1`, [cpf]);
    if (user.rowCount == 0) {
        throw ({
            error: http_status_1.default.NOT_FOUND,
            message: "user not found"
        });
    }
    const userData = user.rows[0];
    return userData;
}
