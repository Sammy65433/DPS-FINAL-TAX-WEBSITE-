



export function normalizeEmails(emails = []) {
    return [
        ...new Set(
            emails
                .map(email => String(email || "").trim().toLowerCase())
                .filter(email => email && email.includes("@"))
        ),
    ];
}
