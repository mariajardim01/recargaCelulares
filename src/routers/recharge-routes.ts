import { InsertRecharge, ListRecharges } from "../controllers/recharges-controller";
import { Router } from "express";
import { validateSchema } from "../middlewares/schema-middleware";
import { rechargeSchema } from "../schemas/recharge-schema";

const rechargeRouter = Router()

rechargeRouter.post("/recharges",validateSchema(rechargeSchema), InsertRecharge)
rechargeRouter.get("/recharges/:number", ListRecharges)

export default rechargeRouter