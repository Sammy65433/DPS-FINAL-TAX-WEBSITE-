import { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
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

export default function ClientLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const returnTo = getSafeReturnTo(
    location.state?.returnTo || searchParams.get("returnTo")
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

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

    try {
      if (!API_URL) throw new Error("DPS API is not configured.");

      const response = await fetch(`${API_URL}/api/customer/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Unable to sign in.");

      setCustomerToken(data.token);
      navigate(returnTo, { replace: true });
    } catch (error) {
      setErrorMessage(error.message || "Unable to sign in.");
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

  if (session) {
    return <Navigate to={returnTo} replace />;
  }

  return (
    <Layout>
      <main className="client-auth-page">
        <div className="client-auth-card">
          <p className="client-auth-eyebrow">DPS Client Access</p>
          <h1>Client Sign In</h1>

          <p>
            Sign in to access your portal. If you arrived from an invitation,
            you will return to its confirmation page after signing in.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="client-email">Email</label>
            <input
              id="client-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <label htmlFor="client-password">Password</label>
            <input
              id="client-password"
              type="password"
              autoComplete="current-password"
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
              {submitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p>
            New DPS client?{" "}
            <Link to="/client-signup" state={{ returnTo }}>
              Create an account
            </Link>
          </p>

          <p>
            Need help accessing your account?{" "}
            <Link to="/contact">Contact DPS</Link>.
          </p>
        </div>
      </main>
    </Layout>
  );
}
