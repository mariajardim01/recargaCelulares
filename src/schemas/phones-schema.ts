import Joi from "joi";
import { RegisterUserPhone } from "protocols/user-protocol";

export const phoneSchema = Joi.object<RegisterUserPhone>({
    cpf: Joi.string().required().length(11),
    name: Joi.string().required().max(250),
    description: Joi.string().required().max(250),
    carrier: Joi.string().required().max(250),
    number: Joi.string().required().length(11)
})