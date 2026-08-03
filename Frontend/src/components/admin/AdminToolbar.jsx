function AdminToolbar({
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    handleRefresh,
    exportArchivedJson,
    exportArchivedCsv,
    handleLogout,
}) {
    return (
        <div
            style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
            }}
        >
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <div>
                    <label htmlFor="status-filter" style={{ marginRight: "0.5rem" }}>
                        Filter tax by status:
                    </label>

                    <select
                        id="status-filter"
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="booked">Booked</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>

                <input
                    type="text"
                    placeholder="Search by name, email, date, service..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{
                        padding: "0.7rem 0.9rem",
                        border: "1px solid #dfe8e4",
                        borderRadius: "10px",
                        minWidth: "260px",
                    }}
                />
            </div>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <button className="btn" type="button" onClick={handleRefresh}>
                    Refresh Appointments
                </button>

                <button className="btn" type="button" onClick={exportArchivedJson}>
                    Export Archived JSON
                </button>

                <button className="btn" type="button" onClick={exportArchivedCsv}>
                    Export Archived CSV
                </button>

                <button className="btn" type="button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default AdminToolbar;
