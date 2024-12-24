import { Router } from "express";
import { recordClock, getUserReports } from "../controllers/userController";
import { authMiddleware } from "../authMiddleware";

const router = Router();

router.post("/:username/clock", authMiddleware, recordClock);
router.get("/:username/reports", authMiddleware, getUserReports);

export default router;
