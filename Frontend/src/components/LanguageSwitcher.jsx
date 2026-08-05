import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = lang => {
    i18n.changeLanguage(lang);
    console.log("changed language to:", lang);
  };

  return (
    <div className="lang-row">
      <button className="lang-pill" onClick={() => changeLanguage("en")}>
        EN
      </button>
      <button className="lang-pill" onClick={() => changeLanguage("es")}>
        ES
      </button>
      <button className="lang-pill" onClick={() => changeLanguage("fr")}>
        FR
      </button>
      <button className="lang-pill" onClick={() => changeLanguage("ht")}>
        KRY
      </button>
    </div>
  );
}

export default LanguageSwitcher;
