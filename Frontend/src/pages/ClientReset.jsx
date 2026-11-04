import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "../components/Layout";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

export default function ClientReset() {
  const location = useLocation();
  const urlToken = new URLSearchParams(location.search).get("token") ?? "";
  const isValidFormat = /^[a-f0-9]{64}$/i.test(urlToken);

  const [token, setToken] = useState(urlToken);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setToken(urlToken);
  }, [urlToken]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting || !API_URL) return;

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${API_URL}/api/customer/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token.trim(), password }),
      });

      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "Could not reset your password.");

      setDone(true);
      setStatus({ type: "success", message: "Password updated. You can sign in with your new password." });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Could not reset your password." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layout>
      <main className="client-auth-page">
        <div className="client-auth-card">
          <p className="client-auth-eyebrow">DPS Client Access</p>
          <h1>Reset Password</h1>

          {done ? (
            <>
              <p role="status">{status.message}</p>
              <p>
                <Link to="/client-login">Sign In</Link>
              </p>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <label htmlFor="reset-token">Reset token</label>
              <input
                id="reset-token"
                type="text"
                required
                value={token}
                autoComplete="off"
                onChange={(event) => setToken(event.target.value)}
              />

              <label htmlFor="reset-password">New password (12+ characters)</label>
              <input
                id="reset-password"
                type="password"
                autoComplete="new-password"
                minLength={12}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              {status.type === "error" && (
                <p className="client-auth-error" role="alert">
                  {status.message}
                </p>
              )}

              <button type="submit" disabled={submitting}>
                {submitting ? "Updating..." : "Update Password"}
              </button>
            </form>
          )}
        </div>
      </main>
    </Layout>
  );
}
