import { Router } from "express";
import { getCurrentGermanTime } from "../controllers/timeController";

const router = Router();

router.get("/time/germany", getCurrentGermanTime);

export default router;
