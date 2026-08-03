import xlsx from "xlsx";
import { normalizeEmails } from "../utils/normalizeEmails.js";

export function parseClientEmailsFromSpreadsheet() {
    const workbook = xlsx.readFile("./public/DPS Client List.xls");
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const rows = xlsx.utils.sheet_to_json(sheet, {
        range: 4,
        defval: "",
    });

    const emails = normalizeEmails(rows.map(row => row["Email"]));

    return {
        totalRows: rows.length,
        totalEmails: emails.length,
        emails,
    };
}
