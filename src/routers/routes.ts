import { Router } from "express";
import rechargeRouter from "./recharge-routes";
import phoneRouter from "./phone-routes";
import summaryRouter from "./summary-routes";

const router = Router();


router.use(rechargeRouter);
router.use(phoneRouter);
router.use(summaryRouter);


export default router;
