import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";

import { getCustomerSession, setCustomerToken } from "../lib/customerAuth";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

function getSafeReturnTo(value) {
  if (
    typeof value === "string" &&
    /^\/client-link\?token=[a-f0-9]{64}$/i.test(value)
  ) {
    return value;
  }

  return "/client-portal";
}

export default function ClientSignup() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const returnTo = getSafeReturnTo(
    location.state?.returnTo || searchParams.get("returnTo")
  );

  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let active = true;

    const session = getCustomerSession();
    if (active) {
      setSession(session);
      setCheckingSession(false);
    }

    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (!API_URL) throw new Error("DPS API is not configured.");

      const response = await fetch(`${API_URL}/api/customer/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Could not create your account.");

      setPassword("");

      if (data.confirmToken) {
        setSuccessMessage(
          `Account created. Confirm your email before connecting it. Confirmation token: ${data.confirmToken}`
        );
      } else {
        setSuccessMessage(
          "Account created. You can now sign in."
        );
      }
    } catch (error) {
      setErrorMessage(error.message || "Could not create your account.");
    } finally {
      setSubmitting(false);
    }
  }

  if (checkingSession) {
    return (
      <Layout>
        <main className="client-auth-page">
          <p>Checking session...</p>
        </main>
      </Layout>
    );
  }

  if (session && !successMessage) {
    return <Navigate to={returnTo} replace />;
  }

  return (
    <Layout>
      <main className="client-auth-page">
        <div className="client-auth-card">
          <p className="client-auth-eyebrow">DPS Client Access</p>
          <h1>Create Client Account</h1>
          <p>
            Use the email that received your invitation. Creating an account
            does not connect it to a CRM contact until you confirm the invitation.
          </p>

          {!successMessage && (
            <form onSubmit={handleSubmit}>
              <label htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                autoComplete="new-password"
                minLength={12}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              {errorMessage && (
                <p className="client-auth-error" role="alert">
                  {errorMessage}
                </p>
              )}

              <button type="submit" disabled={submitting}>
                {submitting ? "Creating account..." : "Create Account"}
              </button>
            </form>
          )}

          {successMessage && <p role="status">{successMessage}</p>}

          <p>
            Already have an account?{" "}
            <Link to="/client-login" state={{ returnTo }}>
              Sign In
            </Link>
          </p>
        </div>
      </main>
    </Layout>
  );
}
