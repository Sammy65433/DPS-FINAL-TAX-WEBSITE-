import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { supabase } from "../lib/supabase";

export default function ClientLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [session, setSession] = useState(null);
    const [checkingSession, setCheckingSession] = useState(true);

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

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password,
            });

            if (error) throw error;
            navigate("/client-portal", { replace: true });
        } catch (error) {
            setErrorMessage(error.message || "Unable to sign in.");
        } finally {
            setSubmitting(false);
        }
    }

    if (checkingSession) return <Layout><main className="client-auth-page">Checking session...</main></Layout>;
    if (session) return <Navigate to="/client-portal" replace />;

    return (
        <Layout>
            <main className="client-auth-page">
                <div className="client-auth-card">
                    <p className="client-auth-eyebrow">DPS Client Access</p>
                    <h1>Client Sign In</h1>
                    <p>Sign in to view your account and access document portal guidance.</p>

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

                        {errorMessage && <p className="client-auth-error" role="alert">{errorMessage}</p>}

                        <button type="submit" disabled={submitting}>
                            {submitting ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <p>Need help accessing your account? <Link to="/contact">Contact DPS</Link>.</p>
                </div>
            </main>
        </Layout>
    );
}
