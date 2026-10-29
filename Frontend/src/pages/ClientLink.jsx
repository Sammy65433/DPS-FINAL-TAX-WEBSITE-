import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import { getCustomerToken } from "../lib/customerAuth";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

export default function ClientLink() {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const validToken = typeof token === "string" && /^[a-f0-9]{64}$/i.test(token);
  const returnTo = validToken ? `/client-link?token=${token}` : "/client-portal";

  const [sessionToken, setSessionToken] = useState(null);
  const [checking, setChecking] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    setSessionToken(getCustomerToken());
    setChecking(false);
  }, []);

  async function handleConfirm() {
    if (submitting || !validToken || !API_URL) return;

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const authToken = getCustomerToken();
      if (!authToken) throw new Error("Please sign in again.");

      const response = await fetch(`${API_URL}/api/customer/link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ token }),
      });

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(body.message || "Could not connect your account.");
      }

      setStatus({
        type: "success",
        message: "Your account has been connected.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Could not connect your account.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const session = sessionToken ? { user: { email: "" } } : null;

  return (
    <Layout>
      <main className="client-auth-page">
        <div className="client-auth-card">
          <p className="client-auth-eyebrow">DPS Client Access</p>
          <h1>Connect Your Account</h1>

          {!validToken ? (
            <p role="alert">
              This invitation link is invalid. Contact DPS for a new invitation.
            </p>
          ) : checking ? (
            <p>Checking your session...</p>
          ) : !sessionToken ? (
            <>
              <p>Sign in or create a DPS client account before confirming.</p>
              <Link to="/client-login" state={{ returnTo }}>
                Sign In
              </Link>
              {" · "}
              <Link to="/client-signup" state={{ returnTo }}>
                Create Account
              </Link>
            </>
          ) : (
            <>
              <p>
                You are signed in. Confirm only if this is the email that received
                the invitation.
              </p>

              {status.type !== "success" && (
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={submitting || !API_URL}
                >
                  {submitting ? "Connecting..." : "Confirm Connection"}
                </button>
              )}

              {status.message && (
                <p
                  role={status.type === "error" ? "alert" : "status"}
                  className={
                    status.type === "error" ? "client-auth-error" : ""
                  }
                >
                  {status.message}
                </p>
              )}

              <p>
                <Link to="/client-portal">Return to Client Portal</Link>
              </p>
            </>
          )}
        </div>
      </main>
    </Layout>
  );
}
