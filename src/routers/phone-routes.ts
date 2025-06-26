import { ListPhonesByCPF, registerPhone } from "../controllers/phones-controller";
import { Router } from "express";
import { validateSchema } from "../middlewares/schema-middleware";
import { phoneSchema } from "../schemas/phones-schema";

const phoneRouter = Router()

phoneRouter.post("/phones",validateSchema(phoneSchema), registerPhone)
phoneRouter.get("/phones/:document", ListPhonesByCPF)

export default phoneRouter