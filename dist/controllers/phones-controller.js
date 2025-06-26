"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPhone = registerPhone;
exports.ListPhonesByCPF = ListPhonesByCPF;
const http_status_1 = __importDefault(require("http-status"));
const carrierValidate_service_1 = require("../services/carrierValidate-service");
const user_repository_1 = require("../repositories/user-repository");
const phone_repository_1 = require("../repositories/phone-repository");
async function registerPhone(req, res) {
    const phoneData = req.body;
    const carrier = await (0, carrierValidate_service_1.CarrierValidation)(phoneData.carrier);
    const user = await (0, user_repository_1.InsertUser)({ cpf: phoneData.cpf, description: phoneData.description, name: phoneData.name });
    const result = await (0, phone_repository_1.InsertPhone)({ carrier_id: carrier.id, user_id: user.id, number: phoneData.number }, user.id);
    res.status(http_status_1.default.CREATED).send(result);
    return;
}
async function ListPhonesByCPF(req, res) {
    const phones = await (0, phone_repository_1.GetPhonesByCPF)(req.params.document);
    res.send(phones).status(http_status_1.default.OK);
    return;
}
