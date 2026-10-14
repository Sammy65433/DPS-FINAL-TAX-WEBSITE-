import { Router } from "express";
import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { env } from "../config/env.js";

const router = Router();
const BUCKET = "customer-documents";
const MAX_BYTES = 5 * 1024 * 1024;
const UUID_PATTERN =
  /^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;

const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const storageClient = serviceKey
  ? createClient(env.SUPABASE_URL, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  : null;

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

  if (!UUID_PATTERN.test(customerId)) {
    return res.status(400).json({ message: "Invalid customer ID." });
  }
  if (!storageClient) {
    return res.status(503).json({ message: "Document service unavailable." });
  }

  try {
    const { data, error } = await storageClient
      .from("customer_documents")
      .select("id, original_name, mime_type, file_size, created_at")
      .eq("customer_id", customerId)
      
      .order("created_at", { ascending: false });

    if (error) throw error;
    return res.json({ documents: data ?? [] });
  } catch (error) {
    console.error("Staff document metadata lookup failed:", error.message);
    return res.status(500).json({ message: "Unable to load documents." });
  }
});

router.get("/:customerId/:documentId/download", async (req, res) => {
  const { customerId, documentId } = req.params;

  if (!UUID_PATTERN.test(customerId) || !UUID_PATTERN.test(documentId)) {
    return res.status(400).json({ message: "Invalid document request." });
  }
  if (!storageClient) {
    return res.status(503).json({ message: "Document service unavailable." });
  }

  try {
    const { data: documentRecord, error: lookupError } = await storageClient
      .from("customer_documents")
      .select("storage_path, original_name, mime_type, file_size")
      .eq("id", documentId)
      .eq("customer_id", customerId)
      
      .maybeSingle();

    if (lookupError) throw lookupError;
    if (!documentRecord) {
      return res.status(404).json({ message: "Document not found." });
    }

    const size = Number(documentRecord.file_size);
    if (!Number.isFinite(size) || size < 0 || size > MAX_BYTES) {
      return res.status(413).json({ message: "Document cannot be downloaded." });
    }

    const path = documentRecord.storage_path;
    if (typeof path !== "string" || !path.startsWith(`${customerId}/`)) {
      return res.status(500).json({ message: "Document path is invalid." });
    }

    const { data: file, error: downloadError } = await storageClient.storage
      .from(BUCKET)
      .download(path);

    if (downloadError || !file) {
      console.error(
        "Staff document Storage download failed:",
        downloadError?.message
      );
      return res.status(502).json({ message: "Could not retrieve document." });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    if (buffer.length > MAX_BYTES) {
      return res.status(413).json({ message: "Document cannot be downloaded." });
    }

    const filename = safeFilename(documentRecord.original_name);
    const encodedFilename = encodeURIComponent(
      String(documentRecord.original_name || "document")
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
