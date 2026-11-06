import { Router } from "express";
import { requireCustomer } from "../middleware/requireCustomer.js";
import { requireStaff } from "../middleware/requireStaff.js";
import {
    confirmCustomerEmail,
    forgotCustomerPassword,
    getCustomerMe,
    loginCustomer,
    registerCustomer,
    resetCustomerPassword,
} from "../controllers/customerAuthController.js";
import { findCustomerByEmailService, updateCustomerService } from "../services/customerService.js";

const router = Router();

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.post("/confirm-email", confirmCustomerEmail);
router.post("/forgot-password", forgotCustomerPassword);
router.post("/reset-password", resetCustomerPassword);

router.get("/me", requireCustomer, getCustomerMe);

router.patch("/me", requireCustomer, async (req, res) => {
    const allowed = {};
    const firstName = String(req.body?.firstName ?? "").trim();
    const lastName = String(req.body?.lastName ?? "").trim();
    const phone = String(req.body?.phone ?? "").trim();
    const birthdayRaw = String(req.body?.birthday ?? "").trim();

    if (firstName) allowed.firstName = firstName;
    if (lastName) allowed.lastName = lastName;
    if (phone) allowed.phone = phone;

    if (birthdayRaw) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(birthdayRaw)) {
            return res.status(400).json({ error: "Birthday must be YYYY-MM-DD." });
        }
        if (new Date(birthdayRaw) > new Date()) {
            return res.status(400).json({ error: "Birthday cannot be in the future." });
        }
        allowed.birthday = birthdayRaw;
    } else if (req.body?.birthday === "") {
        allowed.birthday = null;
    }

    try {
        const { data: customer, error } = await updateCustomerService(
            req.customer.id,
            allowed
        );

        if (error || !customer) {
            return res.status(500).json({ error: "Could not update profile." });
        }

        return res.json({ customer });
    } catch (err) {
        console.error("Customer profile update failed:", err);
        return res.status(500).json({ error: "Could not update profile." });
    }
});

router.get("/by-email", requireStaff, async (req, res) => {
    const email = String(req.query?.email ?? "")
        .trim()
        .toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Valid email required." });
    }

    try {
        const { data: customer, error } = await findCustomerByEmailService(email);

        if (error || !customer) {
            return res.status(404).json({
                error: "No client account found for this email. Ask the client to sign up first.",
            });
        }

        return res.json({
            customer: {
                id: customer.id,
                email: customer.email,
                emailConfirmed: customer.emailConfirmed,
            },
        });
    } catch (err) {
        console.error("Customer lookup by email failed:", err);
        return res.status(500).json({ error: "Could not look up client account." });
    }
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
                    birthday: req.customer.birthday || null,
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
