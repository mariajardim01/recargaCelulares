"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recharge_routes_1 = __importDefault(require("./recharge-routes"));
const phone_routes_1 = __importDefault(require("./phone-routes"));
const summary_routes_1 = __importDefault(require("./summary-routes"));
const router = (0, express_1.Router)();
router.use(recharge_routes_1.default);
router.use(phone_routes_1.default);
router.use(summary_routes_1.default);
exports.default = router;
