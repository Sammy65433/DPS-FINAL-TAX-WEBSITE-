import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
    createCustomerService,
    findCustomerByEmailService,
    findCustomerByIdService,
    updateCustomerService,
} from "../services/customerService.js";

function generateToken(customer) {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured.");
    }

    return jwt.sign(
        { id: customer.id, role: "customer" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
}

function hashToken(token) {
    return crypto.createHash("sha256").update(token).digest("hex");
}

export async function registerCustomer(req, res) {
    const email = String(req.body?.email ?? "").trim().toLowerCase();
    const password = String(req.body?.password ?? "");
    const firstName = String(req.body?.firstName ?? "").trim();
    const lastName = String(req.body?.lastName ?? "").trim();
    const phone = String(req.body?.phone ?? "").trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Enter a valid email address." });
    }
    if (password.length < 12) {
        return res.status(400).json({
            error: "Password must be at least 12 characters.",
        });
    }

    try {
        const existing = await findCustomerByEmailService(email);
        if (existing.data) {
            return res.status(409).json({ error: "An account with this email already exists." });
        }

        const confirmToken = crypto.randomBytes(32).toString("hex");
        const confirmTokenHash = hashToken(confirmToken);
        const confirmTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

        const passwordHash = await bcrypt.hash(password, 12);

        const { data: customer, error } = await createCustomerService({
            email,
            password: passwordHash,
            firstName,
            lastName,
            phone,
            confirmTokenHash,
            confirmTokenExpiresAt,
        });

        if (error || !customer) {
            console.error("Customer registration failed:", error);
            return res.status(500).json({ error: "Could not create account." });
        }

        return res.status(201).json({
            message:
                "Account created. Confirm your email before connecting it to a CRM contact.",
            confirmToken,
        });
    } catch (error) {
        console.error("Customer registration error:", error);
        return res.status(500).json({ error: "Could not create account." });
    }
}

export async function loginCustomer(req, res) {
    const email = String(req.body?.email ?? "").trim().toLowerCase();
    const password = String(req.body?.password ?? "");

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    try {
        const { data: customer, raw } = await findCustomerByEmailService(email);

        if (!customer || !raw || !(await bcrypt.compare(password, raw.password))) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        const token = generateToken(customer);

        return res.json({
            message: "Login successful.",
            token,
            customer: {
                id: customer.id,
                email: customer.email,
                emailConfirmed: customer.emailConfirmed,
            },
        });
    } catch (error) {
        console.error("Customer login error:", error);
        return res.status(500).json({ error: "Server error." });
    }
}

export async function getCustomerMe(req, res) {
    try {
        const { data: customer, error } = await findCustomerByIdService(req.customer.id);

        if (error || !customer) {
            return res.status(404).json({ error: "Account not found." });
        }

        return res.json({ customer });
    } catch (error) {
        console.error("Customer me error:", error);
        return res.status(500).json({ error: "Unable to load account." });
    }
}

export async function confirmCustomerEmail(req, res) {
    const token = String(req.body?.token ?? "").trim();

    if (!/^[a-f0-9]{64}$/i.test(token)) {
        return res.status(400).json({ error: "Invalid confirmation token." });
    }

    const tokenHash = hashToken(token);

    try {
        const db = (await import("../config/mongo.js")).getDatabase();
        const customer = await db.collection("customers").findOne({
            confirmTokenHash: tokenHash,
            confirmTokenExpiresAt: { $gt: new Date().toISOString() },
        });

        if (!customer) {
            return res.status(400).json({ error: "Confirmation link is invalid or expired." });
        }

        await updateCustomerService(String(customer._id), {
            emailConfirmed: true,
            confirmTokenHash: null,
            confirmTokenExpiresAt: null,
        });

        return res.json({ message: "Email confirmed. You can now connect your account." });
    } catch (error) {
        console.error("Customer confirm error:", error);
        return res.status(500).json({ error: "Could not confirm email." });
    }
}

export async function forgotCustomerPassword(req, res) {
    const email = String(req.body?.email ?? "").trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Enter a valid email address." });
    }

    try {
        const { data: customer } = await findCustomerByEmailService(email);

        if (customer) {
            const resetToken = crypto.randomBytes(32).toString("hex");
            const resetTokenHash = hashToken(resetToken);
            const resetTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

            await updateCustomerService(customer.id, {
                resetTokenHash,
                resetTokenExpiresAt,
            });

            return res.json({
                message: "If the account exists, a reset link has been generated.",
                resetToken,
            });
        }

        return res.json({
            message: "If the account exists, a reset link has been generated.",
        });
    } catch (error) {
        console.error("Forgot password error:", error);
        return res.status(500).json({ error: "Could not process request." });
    }
}

export async function resetCustomerPassword(req, res) {
    const token = String(req.body?.token ?? "").trim();
    const password = String(req.body?.password ?? "");

    if (!/^[a-f0-9]{64}$/i.test(token)) {
        return res.status(400).json({ error: "Invalid reset token." });
    }
    if (password.length < 12) {
        return res.status(400).json({ error: "Password must be at least 12 characters." });
    }

    const tokenHash = hashToken(token);

    try {
        const db = (await import("../config/mongo.js")).getDatabase();
        const customer = await db.collection("customers").findOne({
            resetTokenHash: tokenHash,
            resetTokenExpiresAt: { $gt: new Date().toISOString() },
        });

        if (!customer) {
            return res.status(400).json({ error: "Reset link is invalid or expired." });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        await updateCustomerService(String(customer._id), {
            password: passwordHash,
            resetTokenHash: null,
            resetTokenExpiresAt: null,
        });

        return res.json({ message: "Password updated. You can now sign in." });
    } catch (error) {
        console.error("Reset password error:", error);
        return res.status(500).json({ error: "Could not reset password." });
    }
}
