import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "../components/Layout";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

export default function ClientConfirm() {
  const location = useLocation();
  const urlToken = new URLSearchParams(location.search).get("token") ?? "";
  const isValidFormat = /^[a-f0-9]{64}$/i.test(urlToken);

  const [status, setStatus] = useState(
    urlToken
      ? { type: "loading", message: isValidFormat ? "" : "This confirmation link is invalid. Ask DPS for a new invitation." }
      : { type: "pending", message: "" }
  );
  const [manualToken, setManualToken] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isValidFormat) {
      confirm(urlToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlToken]);

  async function confirm(token) {
    if (submitting || !API_URL) return;

    setSubmitting(true);
    setStatus({ type: "loading", message: "" });

    try {
      const response = await fetch(`${API_URL}/api/customer/confirm-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "Could not confirm your email.");

      setStatus({
        type: "success",
        message: "Your email is confirmed! You can now connect your account to your DPS invitation.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Could not confirm your email.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layout>
      <main className="client-auth-page">
        <div className="client-auth-card">
          <p className="client-auth-eyebrow">DPS Client Access</p>
          <h1>Confirm Your Email</h1>

          {status.type === "loading" && <p role="status">Confirming your email...</p>}

          {status.type === "pending" && (
            <>
              <p>
                Paste the confirmation token from your email below. (It is the
                long code in the link you clicked.)
              </p>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (/^[a-f0-9]{64}$/i.test(manualToken.trim())) {
                    confirm(manualToken.trim());
                  } else {
                    setStatus({ type: "error", message: "That token doesn't look right. Copy the whole code from your email." });
                  }
                }}
              >
                <label htmlFor="confirm-token">Confirmation token</label>
                <input
                  id="confirm-token"
                  type="text"
                  required
                  value={manualToken}
                  onChange={(event) => setManualToken(event.target.value)}
                />
                <button type="submit" disabled={submitting}>
                  {submitting ? "Confirming..." : "Confirm Email"}
                </button>
              </form>
            </>
          )}

          {status.type === "error" && (
            <p className="client-auth-error" role="alert">
              {status.message}
            </p>
          )}

          {status.type === "success" && (
            <>
              <p role="status">{status.message}</p>
              <p>
                <Link to="/client-portal">Go to Client Portal</Link> or{" "}
                <Link to="/client-login">Sign In</Link>
              </p>
            </>
          )}

          {status.type !== "success" && (
            <p>
              <>
                Already confirmed? <Link to="/client-login">Sign In</Link> or{" "}
                <Link to="/client-link">re-open your invitation link</Link>.
              </>
            </p>
          )}
        </div>
      </main>
    </Layout>
  );
}
