"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertRecharge = InsertRecharge;
exports.ListRecharges = ListRecharges;
const recharge_repository_1 = require("../repositories/recharge-repository");
const http_status_1 = __importDefault(require("http-status"));
async function InsertRecharge(req, res) {
    const data = req.body;
    const rechargeOnData = await (0, recharge_repository_1.postRecharge)({ id_number: data.id_number, value: data.value });
    res.status(http_status_1.default.CREATED).send(rechargeOnData);
    return;
}
async function ListRecharges(req, res) {
    const number = req.params.number;
    const result = await (0, recharge_repository_1.getRechargesByPhone)(number);
    res.status(http_status_1.default.OK).send(result);
    return;
}
