import express from "express";
import {
    parseClientEmails,
    sendClientBulkEmail,
} from "../controllers/emailController.js";

const router = express.Router();

router.post("/send-client-bulk-email", sendClientBulkEmail);
router.get("/parse-client-emails", parseClientEmails);

export default router;
