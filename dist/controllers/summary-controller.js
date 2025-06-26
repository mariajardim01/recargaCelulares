"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SummaryByCPF = SummaryByCPF;
const http_status_1 = __importDefault(require("http-status"));
const user_repository_1 = require("../repositories/user-repository");
const phone_repository_1 = require("../repositories/phone-repository");
const carrier_repository_1 = require("../repositories/carrier-repository");
const recharge_repository_1 = require("../repositories/recharge-repository");
async function SummaryByCPF(req, res) {
    const cpf = req.params.document;
    try {
        const user = await (0, user_repository_1.GetUser)(cpf);
        if (!user) {
            res.status(http_status_1.default.NOT_FOUND).send("User not found.");
            return;
        }
        const phones = await (0, phone_repository_1.GetPhonesByCPF)(cpf);
        const AllPhones = [];
        for (let i = 0; i < phones.length; i++) {
            const phonesData = phones[i];
            const carrierData = await (0, carrier_repository_1.getCarrier)(phonesData.carrier_id);
            if (!carrierData) {
                continue;
            }
            const rechargesList = await (0, recharge_repository_1.getRechargesByPhone)(phonesData.number);
            const actualRecharges = Array.isArray(rechargesList) ? rechargesList : [];
            AllPhones.push({
                number: phonesData.number,
                carrier: {
                    id: carrierData.id,
                    name: carrierData.name,
                    code: carrierData.code,
                },
                recharges: actualRecharges,
            });
        }
        const result = {
            document: cpf,
            user: {
                id: user.id,
                name: user.name,
            },
            phones: AllPhones,
        };
        res.status(http_status_1.default.OK).send(result);
    }
    catch (error) {
        console.error("Error in summaryByCPF:", error);
        if (error && typeof error === "object" && "error" in error && "message" in error) {
            res.status(error.error).send(error.message);
            return;
        }
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send("An unexpected error occurred.");
    }
}
