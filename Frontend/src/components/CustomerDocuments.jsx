import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
    "application/pdf",
    "image/jpeg",
    "image/png",
]);

export default function CustomerDocuments() {
    const [documents, setDocuments] = useState([]);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState({ type: "", message: "" });
    const fileInputRef = useRef(null);

    const loadDocuments = useCallback(async (signal) => {
        if (!API_URL) throw new Error("DPS API is not configured.");

        const { data, error } = await supabase.auth.getSession();
        if (error || !data.session) throw new Error("Please sign in again.");

        const response = await fetch(`${API_URL}/api/customer/documents`, {
            headers: {
                Authorization: `Bearer ${data.session.access_token}`,
            },
            signal,
        });

        const body = await response.json().catch(() => ({}));
        if (!response.ok) {
            throw new Error(body.error || "Unable to load documents.");
        }

        return body.documents ?? [];
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        async function load() {
            try {
                const items = await loadDocuments(controller.signal);
                if (!controller.signal.aborted) setDocuments(items);
            } catch (error) {
                if (!controller.signal.aborted) {
                    setStatus({
                        type: "error",
                        message: error.message || "Unable to load documents.",
                    });
                }
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }

        load();
        return () => controller.abort();
    }, [loadDocuments]);

    function handleFileChange(event) {
        const selected = event.target.files?.[0] ?? null;
        setFile(selected);
        setStatus({ type: "", message: "" });

        if (!selected) return;

        if (!ALLOWED_TYPES.has(selected.type)) {
            setFile(null);
            event.target.value = "";
            setStatus({
                type: "error",
                message: "Choose a PDF, JPG, or PNG file.",
            });
        } else if (selected.size > MAX_BYTES) {
            setFile(null);
            event.target.value = "";
            setStatus({
                type: "error",
                message: "File must be 5 MB or smaller.",
            });
        }
    }

    async function handleUpload(event) {
        event.preventDefault();
        if (!file || uploading) return;

        setUploading(true);
        setStatus({ type: "", message: "" });

        try {
            if (!API_URL) throw new Error("DPS API is not configured.");

            const { data, error } = await supabase.auth.getSession();
            if (error || !data.session) throw new Error("Please sign in again.");

            const formData = new FormData();
            formData.append("document", file);

            const response = await fetch(`${API_URL}/api/customer/documents`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${data.session.access_token}`,
                },
                body: formData,
            });

            const body = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(body.error || "Upload failed.");

            const items = await loadDocuments();
            setDocuments(items);
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";

            setStatus({
                type: "success",
                message: "Dummy test file uploaded.",
            });
        } catch (error) {
            setStatus({
                type: "error",
                message: error.message || "Upload failed.",
            });
        } finally {
            setUploading(false);
        }
    }

    return (
        <section className="client-documents" aria-labelledby="client-documents-title">
            <h2 id="client-documents-title">Your Documents</h2>
            <p>
                This feature is in testing. Upload non-sensitive dummy files only.
                Use CCH iFirm for real tax documents.
            </p>

            <form onSubmit={handleUpload}>
                <label htmlFor="customer-document">
                    Choose a PDF, JPG, or PNG, up to 5 MB
                </label>
                <input
                    ref={fileInputRef}
                    id="customer-document"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                />
                <button type="submit" disabled={!file || uploading}>
                    {uploading ? "Uploading..." : "Upload Test File"}
                </button>
            </form>

            {status.message && (
                <p
                    role={status.type === "error" ? "alert" : "status"}
                    className={`client-documents-status client-documents-status--${status.type}`}
                >
                    {status.message}
                </p>
            )}

            {loading ? (
                <p>Loading documents...</p>
            ) : documents.length === 0 ? (
                <p>No test documents uploaded yet.</p>
            ) : (
                <ul>
                    {documents.map((document) => (
                        <li key={document.id}>
                            {document.original_name} (
                            {Math.ceil(document.file_size / 1024)} KB)
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
