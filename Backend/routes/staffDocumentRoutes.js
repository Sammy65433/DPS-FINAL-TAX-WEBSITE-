import { Router } from "express";
import crypto from "node:crypto";
import { getDatabase } from "../config/mongo.js";

const router = Router();
const MAX_BYTES = 5 * 1024 * 1024;
const OBJECT_ID_PATTERN = /^[a-f0-9]{24}$/i;

function hasValidStaffKey(req) {
    const supplied = req.get("X-DPS-Staff-Key");
    const expected = process.env.DPS_STAFF_API_KEY;
    if (!supplied || !expected) return false;

    const a = Buffer.from(supplied);
    const b = Buffer.from(expected);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function safeFilename(name) {
    return String(name || "document")
        .replace(/[\r\n"\\/\x00-\x1f\x7f]/g, "_")
        .slice(0, 150);
}

router.use((req, res, next) => {
    if (!hasValidStaffKey(req)) {
        return res.status(401).json({ message: "Unauthorized." });
    }
    res.set("Cache-Control", "no-store");
    return next();
});

router.get("/:customerId", async (req, res) => {
    const { customerId } = req.params;

    if (!OBJECT_ID_PATTERN.test(customerId)) {
        return res.status(400).json({ message: "Invalid customer ID." });
    }

    try {
        const db = getDatabase();
        const docs = await db
            .collection("customer_documents")
            .find({ customerId })
            .project({ fileData: 0 })
            .sort({ createdAt: -1 })
            .toArray();

        const documents = docs.map((doc) => ({
            id: String(doc._id),
            original_name: doc.originalName,
            mime_type: doc.mimeType,
            file_size: doc.fileSize,
            created_at: doc.createdAt,
        }));

        return res.json({ documents });
    } catch (error) {
        console.error("Staff document metadata lookup failed:", error.message);
        return res.status(500).json({ message: "Unable to load documents." });
    }
});

router.get("/:customerId/:documentId/download", async (req, res) => {
    const { customerId, documentId } = req.params;

    if (!OBJECT_ID_PATTERN.test(customerId) || !OBJECT_ID_PATTERN.test(documentId)) {
        return res.status(400).json({ message: "Invalid document request." });
    }

    try {
        const db = getDatabase();
        const { ObjectId } = await import("mongodb");
        const doc = await db.collection("customer_documents").findOne({
            _id: new ObjectId(documentId),
            customerId,
        });

        if (!doc) {
            return res.status(404).json({ message: "Document not found." });
        }

        const buffer = Buffer.isBuffer(doc.fileData)
            ? doc.fileData
            : Buffer.from(doc.fileData?.buffer ?? doc.fileData ?? []);

        if (buffer.length > MAX_BYTES) {
            return res.status(413).json({ message: "Document cannot be downloaded." });
        }

        const filename = safeFilename(doc.originalName);
        const encodedFilename = encodeURIComponent(
            String(doc.originalName || "document")
                .replace(/[\r\n\x00-\x1f\x7f]/g, "_")
                .slice(0, 150)
        );

        res.set({
            "Content-Type": "application/octet-stream",
            "Content-Length": String(buffer.length),
            "Content-Disposition": `attachment; filename="${filename}"; filename*=UTF-8''${encodedFilename}`,
            "X-Content-Type-Options": "nosniff",
            "Cache-Control": "no-store",
        });

        return res.send(buffer);
    } catch (error) {
        console.error("Staff document download failed:", error.message);
        return res.status(500).json({ message: "Unable to download document." });
    }
});

export default router;
