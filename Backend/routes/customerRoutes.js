import { Router } from "express";
import { requireCustomer } from "../middleware/requireCustomer.js";

const router = Router();

router.get("/me", requireCustomer, (req, res) => {
  res.json({
    customer: {
      id: req.customer.id,
      email: req.customer.email,
    },
  });
});

router.post("/link", requireCustomer, async (req, res) => {
  const token = req.body?.token;

  if (typeof token !== "string" || !/^[a-f0-9]{64}$/i.test(token)) {
    return res.status(400).json({ message: "Invalid invitation link." });
  }

  if (!req.customer.emailConfirmed || !req.customer.email) {
    return res.status(403).json({
      message: "Confirm your email before connecting your account.",
    });
  }

  const crmUrl = process.env.CRM_BACKEND_URL?.replace(/\/$/, "");
  const redeemKey = process.env.CRM_LINK_REDEEM_KEY;

  if (!crmUrl || !redeemKey) {
    return res.status(503).json({
      message: "Account linking is not configured.",
    });
  }

  try {
    const upstream = await fetch(
      `${crmUrl}/api/internal/contact-links/redeem`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CRM-Link-Key": redeemKey,
        },
        body: JSON.stringify({
          token,
          customerId: req.customer.id,
          verifiedEmail: req.customer.email.trim().toLowerCase(),
        }),
        signal: AbortSignal.timeout(15000),
      }
    );

    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      if ([400, 403, 404, 409].includes(upstream.status)) {
        return res.status(upstream.status).json({
          message: data.message || "Invitation cannot be used.",
        });
      }

      console.error("CRM account-link status:", upstream.status);
      return res.status(502).json({
        message: "Account linking is temporarily unavailable.",
      });
    }

    return res.json({ message: "Customer account connected." });
  } catch (error) {
    console.error("CRM account-link request failed:", error);
    return res.status(502).json({
      message: "Account linking is temporarily unavailable.",
    });
  }
});

export default router;
