import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { clearCustomerToken, getCustomerToken } from "../lib/customerAuth";
import CustomerDocuments from "../components/CustomerDocuments";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

export default function ClientPortal() {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [status, setStatus] = useState("Checking your account...");
    const [signingOut, setSigningOut] = useState(false);
    const [birthdayDraft, setBirthdayDraft] = useState("");
    const [savingBirthday, setSavingBirthday] = useState(false);
    const [birthdayMessage, setBirthdayMessage] = useState("");

    useEffect(() => {
        let active = true;

        async function loadCustomer() {
            try {
                const token = getCustomerToken();
                if (!token) {
                    navigate("/client-login", { replace: true });
                    return;
                }
                if (!API_URL) throw new Error("DPS API is not configured.");

                const response = await fetch(`${API_URL}/api/customer/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 401) {
                    clearCustomerToken();
                    navigate("/client-login", { replace: true });
                    return;
                }

                const data = await response.json().catch(() => ({}));
                if (!response.ok) throw new Error(data.error || "Unable to load your account.");

                if (active) {
                    setCustomer(data.customer);
                    setBirthdayDraft(data.customer?.birthday ? String(data.customer.birthday).slice(0, 10) : "");
                    setStatus("");
                }
            } catch (error) {
                if (active) setStatus(error.message || "Unable to load your account.");
            }
        }

        loadCustomer();
        return () => { active = false; };
    }, [navigate]);

    async function handleSignOut() {
        setSigningOut(true);
        clearCustomerToken();
        navigate("/client-login", { replace: true, state: { signedOut: true } });
    }

    async function handleSaveBirthday() {
        if (savingBirthday) return;
        setSavingBirthday(true);
        setBirthdayMessage("");
        try {
            if (!API_URL) throw new Error("DPS API is not configured.");
            const token = getCustomerToken();
            if (!token) throw new Error("Please sign in again.");
            const response = await fetch(`${API_URL}/api/customer/me`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ birthday: birthdayDraft || null }),
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(data.error || "Could not save birthday.");
            setCustomer(data.customer);
            setBirthdayMessage("Birthday saved.");
        } catch (error) {
            setBirthdayMessage(error.message || "Could not save birthday.");
        } finally {
            setSavingBirthday(false);
        }
    }

    return (
        <Layout>
            <main className="client-auth-page">
                <div className="client-auth-card">
                    <p className="client-auth-eyebrow">DPS Client Access</p>
                    <h1>Client Portal</h1>

                    {status && <p role="status">{status}</p>}

                    {customer && (
                        <>
                            <p>Signed in as <strong>{customer.email}</strong>.</p>
                            <div className="client-portal-birthday">
                                <label htmlFor="client-birthday">Your birthday (optional)</label>
                                <div className="client-birthday-row">
                                    <input
                                        id="client-birthday"
                                        type="date"
                                        value={birthdayDraft}
                                        onChange={(event) => setBirthdayDraft(event.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleSaveBirthday}
                                        disabled={savingBirthday}
                                    >
                                        {savingBirthday ? "Saving..." : "Save"}
                                    </button>
                                </div>
                                {birthdayMessage && (
                                    <p role="status" className="client-portal-birthday-status">
                                        {birthdayMessage}
                                    </p>
                                )}
                            </div>
                            <p>
                                For secure document upload and downloads, use the existing
                                CCH iFirm portal. Your DPS website login does not automatically
                                sign you in to CCH iFirm.
                            </p>
                            <CustomerDocuments />

                            <div className="client-portal-actions">
                                <a
                                    href="https://dpsprofessionaltaxservices.cchifirm.us/2/login/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Open Secure Document Portal
                                </a>
                                <Link to="/booking">Request an Appointment</Link>
                                <Link to="/contact">Contact DPS</Link>
                            </div>
                            <button type="button" onClick={handleSignOut} disabled={signingOut}>
                                {signingOut ? "Signing out..." : "Sign Out"}
                            </button>
                        </>
                    )}
                </div>
            </main>
        </Layout>
    );
}
