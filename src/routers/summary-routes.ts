import { InsertRecharge, ListRecharges } from "../controllers/recharges-controller";
import { Router } from "express";
import { validateSchema } from "../middlewares/schema-middleware";
import { rechargeSchema } from "../schemas/recharge-schema";
import  {SummaryByCPF}  from "../controllers/summary-controller";

const summaryRouter = Router()

summaryRouter.get("/summary/:document", SummaryByCPF)

export default summaryRouter