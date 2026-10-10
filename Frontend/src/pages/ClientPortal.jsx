import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { supabase } from "../lib/supabase";
import CustomerDocuments from "../components/CustomerDocuments";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

export default function ClientPortal() {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [status, setStatus] = useState("Checking your account...");
    const [signingOut, setSigningOut] = useState(false);

    useEffect(() => {
        let active = true;

        async function loadCustomer() {
            try {
                const { data: sessionData, error: sessionError } =
                    await supabase.auth.getSession();

                if (sessionError) throw sessionError;
                if (!sessionData.session) {
                    navigate("/client-login", { replace: true });
                    return;
                }
                if (!API_URL) throw new Error("DPS API is not configured.");

                const response = await fetch(`${API_URL}/api/customer/me`, {
                    headers: {
                        Authorization: `Bearer ${sessionData.session.access_token}`,
                    },
                });

                if (response.status === 401) {
                    await supabase.auth.signOut();
                    navigate("/client-login", { replace: true });
                    return;
                }

                const data = await response.json().catch(() => ({}));
                if (!response.ok) throw new Error(data.error || "Unable to load your account.");

                if (active) {
                    setCustomer(data.customer);
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
        await supabase.auth.signOut();
        navigate("/client-login", { replace: true });
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
