function AdminLogin({
    adminPassword,
    setAdminPassword,
    handleLogin,
    loginError,
}) {
    return (
        <section className="section">
            <div className="container" style={{ maxWidth: "500px" }}>
                <p className="eyebrow">Admin Access</p>
                <h2 className="h2-sub">Enter Password</h2>

                <form className="contact-form" onSubmit={handleLogin}>
                    <input
                        type="password"
                        placeholder="Enter admin password"
                        value={adminPassword}
                        onChange={e => setAdminPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="btn">
                        Enter Admin
                    </button>

                    {loginError && <p className="form-status error">{loginError}</p>}
                </form>
            </div>
        </section>
    );
}

export default AdminLogin;
