import GoogleTranslate from "./GoogleTranslate";

function TopBar() {
    return (
        <div className="top-bar">
            <div className="container top-bar-content">
                <div className="top-right" style={{ width: "100%", justifyContent: "center" }}>
                    <div className="translate-wrap">
                        <span className="translate-label">🌐 Translate:</span>
                        <GoogleTranslate />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopBar;