import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function LoginChoice() {
  return (
    <Layout>
      <main className="login-choice">
        <h1>Log In</h1>
        <p>Choose how you access DPS.</p>

        <div className="login-choice-options">
          <Link to="/client-login" className="login-choice-card">
            <strong>Client Access</strong>
            <span>Sign in to your DPS client portal.</span>
          </Link>

          <a
            href="https://dps-textellent-frontend.onrender.com/login"
            className="login-choice-card"
          >
            <strong>Staff Access</strong>
            <span>Open the separate staff CRM.</span>
          </a>
        </div>
      </main>
    </Layout>
  );
}
