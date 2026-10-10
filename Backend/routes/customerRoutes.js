import { Router } from "express";
import { requireCustomer } from "../middleware/requireCustomer.js";

const router = Router();

router.get("/me", requireCustomer, (req, res) => {
  res.json({ customer: req.customer });
});

export default router;
