import { Router, type IRouter } from "express";
import healthRouter from "./health";
import chatRouter from "./chat";
import lawyersRouter from "./lawyers";

const router: IRouter = Router();

router.use(healthRouter);
router.use(chatRouter);
router.use(lawyersRouter);

export default router;
