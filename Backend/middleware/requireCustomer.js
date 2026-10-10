import { createClient } from "@supabase/supabase-js";
import { env } from "../config/env.js";

const authClient = createClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});

export async function requireCustomer(req, res, next) {
    const authorization = req.headers.authorization ?? "";
    const match = authorization.match(/^Bearer\s+(.+)$/i);

    if (!match) {
        return res.status(401).json({ error: "Sign in required." });
    }

    try {
        const { data, error } = await authClient.auth.getUser(match[1]);

        if (error || !data.user) {
            console.error(
                "Customer token verification:",
                error?.message ?? "No user returned"
            );
            return res.status(401).json({
                error: "Invalid or expired session.",
            });
        }

        req.customer = {
            id: data.user.id,
            email: data.user.email,
        };

        next();
    } catch (error) {
        console.error("Customer auth verification failed:", error);
        return res.status(503).json({
            error: "Unable to verify session.",
        });
    }
}
