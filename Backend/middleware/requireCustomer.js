import jwt from "jsonwebtoken";
import { findCustomerByIdService } from "../services/customerService.js";

export async function requireCustomer(req, res, next) {
    const authorization = req.headers.authorization ?? "";
    const match = authorization.match(/^Bearer\s+(.+)$/i);

    if (!match) {
        return res.status(401).json({ error: "Sign in required." });
    }

    const token = match[1].trim();

    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not configured.");
        return res.status(503).json({ error: "Authentication unavailable." });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        if (!payload?.id || payload.role !== "customer") {
            return res.status(401).json({ error: "Invalid or expired session." });
        }

        const { data: customer, error } = await findCustomerByIdService(payload.id);

        if (error || !customer) {
            return res.status(401).json({ error: "Invalid or expired session." });
        }

        req.customer = {
            id: customer.id,
            email: customer.email,
            emailConfirmed: Boolean(customer.emailConfirmed),
        };

        return next();
    } catch (error) {
        if (error?.name === "TokenExpiredError" || error?.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Invalid or expired session." });
        }

        console.error("Customer auth verification failed:", error);
        return res.status(503).json({ error: "Unable to verify session." });
    }
}
