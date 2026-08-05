import { useEffect } from "react";

function GoogleTranslate() {
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
    }, []);

    return <div id="google_translate_element"></div>;

}

export default GoogleTranslate;
