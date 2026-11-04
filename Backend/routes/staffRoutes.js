import { Router } from "express";
import { requireStaff } from "../middleware/requireStaff.js";
import { staffLogin, staffLogout } from "../controllers/staffAuthController.js";

const router = Router();

router.post("/login", staffLogin);
router.post("/logout", staffLogout);

export default router;
