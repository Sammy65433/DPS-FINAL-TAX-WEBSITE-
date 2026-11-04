import { useState } from "react";

function AdminLogin({
    adminPassword,
    setAdminPassword,
    handleLogin,
    loginError,
}) {
    const [submitting, setSubmitting] = useState(false);

    return (
        <section className="section">
            <div className="container" style={{ maxWidth: "500px" }}>
                <p className="eyebrow">Admin Access</p>
                <h2 className="h2-sub">Staff Sign In</h2>

                <form className="contact-form" onSubmit={handleLogin}>
                    <input
                        type="password"
                        placeholder="Enter staff password"
                        value={adminPassword}
                        onChange={e => setAdminPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="btn" disabled={submitting}>
                        {submitting ? "Signing in..." : "Sign In"}
                    </button>

                    {loginError && <p className="form-status error">{loginError}</p>}
                </form>
            </div>
        </section>
    );
}

export default AdminLogin;
