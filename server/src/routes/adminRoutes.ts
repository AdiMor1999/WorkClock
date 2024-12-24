import { Router } from "express";
import { getAllReports, editUserReport } from "../controllers/adminController";
import { authMiddleware, authorizeAdmin } from "../authMiddleware";

const router = Router();

router.get("/reports", authMiddleware, authorizeAdmin, getAllReports);
router.patch(
  "/reports/:username",
  authMiddleware,
  authorizeAdmin,
  editUserReport
);

export default router;
