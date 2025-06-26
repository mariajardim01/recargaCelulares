import Joi from "joi";
import { Recharge } from "../protocols/recharge-protocol";

export const rechargeSchema = Joi.object<Recharge>({
    id_number: Joi.number().required(),
    value: Joi.number().required().max(1000).min(10)
})