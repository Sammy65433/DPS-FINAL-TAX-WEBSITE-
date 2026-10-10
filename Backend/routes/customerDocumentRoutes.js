import { Router } from "express";
import multer from "multer";
import { randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { requireCustomer } from "../middleware/requireCustomer.js";
import { env } from "../config/env.js";

const router = Router();
const BUCKET = "customer-documents";
const MAX_BYTES = 5 * 1024 * 1024;

const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing");
}

const storageClient = createClient(env.SUPABASE_URL, serviceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});

const allowedTypes = new Map([
    ["application/pdf", "pdf"],
    ["image/jpeg", "jpg"],
    ["image/png", "png"],
]);

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_BYTES, files: 1 },
});

router.use(requireCustomer);

router.get("/", async (req, res) => {
    try {
        const { data, error } = await storageClient
            .from("customer_documents")
            .select("id, original_name, mime_type, file_size, created_at")
            .eq("customer_id", req.customer.id)
            .order("created_at", { ascending: false });

        if (error) throw error;
        return res.json({ documents: data ?? [] });
    } catch (error) {
        console.error("Customer document list failed:", error.message);
        return res.status(500).json({ error: "Unable to load documents." });
    }
});

router.post("/", (req, res) => {
    upload.single("document")(req, res, async (uploadError) => {
        if (uploadError) {
            return res.status(400).json({ error: "File must be 5 MB or smaller." });
        }

        if (!req.file) {
            return res.status(400).json({ error: "Choose a file." });
        }

        const extension = allowedTypes.get(req.file.mimetype);
        if (!extension) {
            return res.status(400).json({
                error: "Only PDF, JPG, and PNG files are supported.",
            });
        }

        const storagePath = `${req.customer.id}/${randomUUID()}.${extension}`;

        try {
            const { error: storageError } = await storageClient.storage
                .from(BUCKET)
                .upload(storagePath, req.file.buffer, {
                    contentType: req.file.mimetype,
                    upsert: false,
                });

            if (storageError) throw storageError;

            const { data, error: dbError } = await storageClient
                .from("customer_documents")
                .insert({
                    customer_id: req.customer.id,
                    storage_path: storagePath,
                    original_name: req.file.originalname.slice(0, 200),
                    mime_type: req.file.mimetype,
                    file_size: req.file.size,
                })
                .select("id, original_name, mime_type, file_size, created_at")
                .single();

            if (dbError) {
                await storageClient.storage.from(BUCKET).remove([storagePath]);
                throw dbError;
            }

            return res.status(201).json({ document: data });
        } catch (error) {
            console.error("Customer document upload failed:", error.message);
            return res.status(500).json({ error: "Unable to upload document." });
        }
    });
});

export default router;
