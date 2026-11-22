import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaKey } from "react-icons/fa";
import Layout from "../components/Layout";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

export default function ClientForgot() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting || !API_URL) return;

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${API_URL}/api/customer/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "Could not process request.");

      setStatus({ type: "success", message: body.message || "If the account exists, a reset link has been sent." });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Could not process request." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layout>
      <main className="client-auth-page">
        <div className="client-auth-card">
          <p className="client-auth-eyebrow">DPS Client Access</p>
          <div className="client-auth-icon"><FaKey /></div>
          <h1>Forgot Password</h1>
          <p className="client-auth-text">
            Enter your email to receive a password reset link.
          </p>

          <form onSubmit={handleSubmit} className="client-auth-form">
            <label htmlFor="email">
              <FaEnvelope /> Email
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            <button type="submit" className="client-auth-button" disabled={submitting}>
              {submitting ? "Sending..." : "Send Reset Link"}
            </button>

            {status.message && (
              <p className={`client-auth-status ${status.type}`}>{status.message}</p>
            )}
          </form>

          <p className="client-auth-links">
            <Link to="/client-login">Back to Sign In</Link>
          </p>
        </div>
      </main>
    </Layout>
  );
}
