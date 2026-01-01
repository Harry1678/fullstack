import { Router } from "express";
import v1Tasks from "./v1/tasks.routes";
import v2Tasks from "./v2/tasks.routes";

const router = Router();

router.use("/v1", v1Tasks);
router.use("/v2", v2Tasks);

export default router;
