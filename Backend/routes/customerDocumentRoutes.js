import { Router } from "express";
import multer from "multer";
import { randomUUID } from "node:crypto";
import { getDatabase } from "../config/mongo.js";
import { requireCustomer } from "../middleware/requireCustomer.js";

const router = Router();
const MAX_BYTES = 5 * 1024 * 1024;

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
        const db = getDatabase();
        const docs = await db
            .collection("customer_documents")
            .find({ customerId: req.customer.id })
            .project({ fileData: 0 })
            .sort({ createdAt: -1 })
            .toArray();

        const documents = docs.map((doc) => ({
            id: String(doc._id),
            original_name: doc.originalName,
            mime_type: doc.mimeType,
            file_size: doc.fileSize,
            created_at: doc.createdAt,
            scan_status: doc.scanStatus ?? "pending",
        }));

        res.set("Cache-Control", "no-store");
        return res.json({ documents });
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

        try {
            const db = getDatabase();
            const now = new Date().toISOString();
            const result = await db.collection("customer_documents").insertOne({
                customerId: req.customer.id,
                originalName: req.file.originalname.slice(0, 200),
                mimeType: req.file.mimetype,
                fileSize: req.file.size,
                fileData: req.file.buffer,
                scanStatus: "pending",
                createdAt: now,
            });

            res.set("Cache-Control", "no-store");
            return res.status(201).json({
                document: {
                    id: String(result.insertedId),
                    original_name: req.file.originalname.slice(0, 200),
                    mime_type: req.file.mimetype,
                    file_size: req.file.size,
                    created_at: now,
                    scan_status: "pending",
                },
            });
        } catch (error) {
            console.error("Customer document upload failed:", error.message);
            return res.status(500).json({ error: "Unable to upload document." });
        }
    });
});

export default router;
