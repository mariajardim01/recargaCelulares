"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const summary_controller_1 = require("../controllers/summary-controller");
const summaryRouter = (0, express_1.Router)();
summaryRouter.get("/summary/:document", summary_controller_1.SummaryByCPF);
exports.default = summaryRouter;
