import crypto from "node:crypto";
import jwt from "jsonwebtoken";

function hasValidStaffKey(req) {
    const supplied = req.get("X-DPS-Staff-Key");
    const expected = process.env.DPS_STAFF_API_KEY;
    if (!supplied || !expected) return false;

    const a = Buffer.from(supplied);
    const b = Buffer.from(expected);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function requireStaff(req, res, next) {
    const authorization = req.headers.authorization ?? "";
    const match = authorization.match(/^Bearer\s+(.+)$/i);

    if (match) {
        const token = match[1].trim();

        if (!process.env.JWT_SECRET) {
            return res.status(503).json({ message: "Staff authentication unavailable." });
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);

            if (!payload?.id || !["staff", "admin"].includes(payload?.role)) {
                return res.status(401).json({ message: "Invalid or expired staff session." });
            }

            req.staff = { id: payload.id, role: payload.role };
            return next();
        } catch (error) {
            if (error?.name === "TokenExpiredError" || error?.name === "JsonWebTokenError") {
                return res.status(401).json({ message: "Invalid or expired staff session." });
            }

            return res.status(503).json({ message: "Unable to verify staff session." });
        }
    }

    if (hasValidStaffKey(req)) {
        req.staff = { id: "staff-key", role: "staff" };
        return next();
    }

    return res.status(401).json({ message: "Unauthorized." });
}

export { hasValidStaffKey };
