import { sendBulkEmails } from "../services/emailService.js";
import { parseClientEmailsFromSpreadsheet } from "../services/spreadsheetService.js";
import { normalizeEmails } from "../utils/normalizeEmails.js";
import { chunkArray } from "../utils/chunkArray.js";

export async function sendClientBulkEmail(req, res) {
    const { emails, subject, html } = req.body;

    try {
        if (!emails || !Array.isArray(emails) || emails.length === 0) {
            return res.status(400).json({
                message: "A list of recipient emails is required.",
            });
        }

        if (!subject || !html) {
            return res.status(400).json({
                message: "Subject and html are required.",
            });
        }

        const cleanedEmails = normalizeEmails(emails);

        if (cleanedEmails.length === 0) {
            return res.status(400).json({
                message: "No valid emails found.",
            });
        }

        const batches = chunkArray(cleanedEmails, 50);
        const results = [];

        for (const batch of batches) {
            const batchResults = await sendBulkEmails({
                emails: batch,
                subject,
                html,
            });

            results.push(...batchResults);
        }

        const successCount = results.filter(item => item.success).length;
        const failedCount = results.filter(item => !item.success).length;

        res.json({
            message: "Bulk email sending completed.",
            totalRecipients: cleanedEmails.length,
            batches: batches.length,
            successCount,
            failedCount,
            results,
        });
    } catch (error) {
        console.error("Bulk email error:", error);
        res.status(500).json({
            message: "Error sending bulk client emails.",
        });
    }
}

export async function parseClientEmails(req, res) {
    try {
        const result = parseClientEmailsFromSpreadsheet();
        res.json(result);
    } catch (error) {
        console.error("Parse spreadsheet error:", error);
        res.status(500).json({
            message: "Error parsing spreadsheet.",
        });
    }
}
