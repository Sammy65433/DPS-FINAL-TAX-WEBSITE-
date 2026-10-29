import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import { supabase } from "../lib/supabase";

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

    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;

      if (error) {
        setErrorMessage("Could not check your session.");
      } else {
        setSession(data.session);
      }

      setCheckingSession(false);
    });

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
      const redirectUrl = new URL("/client-login", window.location.origin);

      if (returnTo !== "/client-portal") {
        redirectUrl.searchParams.set("returnTo", returnTo);
      }

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: redirectUrl.toString(),
        },
      });

      if (error) throw error;

      setPassword("");

      if (data.session) {
        setSession(data.session);
        setSuccessMessage(
          "Account created. You must confirm your email before connecting it."
        );
      } else {
        setSuccessMessage(
          "Check your email to confirm your account, then sign in. If your invitation expires, request a fresh one."
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
