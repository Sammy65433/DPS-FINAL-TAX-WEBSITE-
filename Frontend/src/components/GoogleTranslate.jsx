import { useEffect, useState } from "react";

function GoogleTranslate() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        window.googleTranslateElementInit = () => {
            if (!window.google || !window.google.translate) return;

            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "en",
                    includedLanguages: "en,es,fr,ht",
                    autoDisplay: false,
                },
                "google_translate_element"
            );

            setLoaded(true);
        };

        const existingScript = document.getElementById("google-translate-script");

        if (!existingScript) {
            const script = document.createElement("script");
            script.id = "google-translate-script";
            script.src =
                "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);
        }

        // Fallback: if the widget hasn't rendered after 5s (ad blocker, slow network),
        // mark as failed so we can show a manual link.
        const timer = window.setTimeout(() => {
            const el = document.getElementById("google_translate_element");
            if (!el || !el.querySelector(".goog-te-gadget")) {
                setLoaded(false);
            }
        }, 5000);

        return () => window.clearTimeout(timer);
    }, []);

    return (
        <div id="google_translate_element">
            {!loaded && (
                <a
                    href={`https://translate.google.com/translate?sl=en&tl=es&u=${encodeURIComponent(
                        window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="translate-fallback"
                >
                    Translate
                </a>
            )}
        </div>
    );
}

export default GoogleTranslate;