import crypto from "node:crypto";
import jwt from "jsonwebtoken";

function staffPasswordMatches(supplied) {
    const expected = process.env.DPS_ADMIN_PASSWORD;
    if (!expected) return false;

    const a = crypto.createHash("sha256").update(String(supplied ?? "")).digest();
    const b = crypto.createHash("sha256").update(expected).digest();

    return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function staffLogin(req, res) {
    const password = String(req.body?.password ?? "");

    if (!password) {
        return res.status(400).json({ message: "Staff password is required." });
    }

    if (!staffPasswordMatches(password)) {
        return res.status(401).json({ message: "Invalid staff credentials." });
    }

    if (!process.env.JWT_SECRET) {
        return res.status(503).json({ message: "Staff authentication unavailable." });
    }

    const token = jwt.sign(
        { id: "staff-admin", role: "staff", type: "staff" },
        process.env.JWT_SECRET,
        { expiresIn: "8h" }
    );

    return res.json({
        message: "Staff login successful.",
        token,
        staff: { id: "staff-admin", role: "staff" },
    });
}

export async function staffLogout(_req, res) {
    return res.json({ message: "Staff session ended." });
}

export { staffPasswordMatches };
