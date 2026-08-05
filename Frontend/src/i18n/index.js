import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from './locales/en.js'
import es from "./locales/es.js";
import fr from "./locales/fr.js";
import ht from "./locales/ht.js";

i18n.use(initReactI18next).init({
  debug: true,
  resources: {
    en: { translation: en },
    es: { translation: es },
    fr: { translation: fr },
    ht: { translation: ht },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

console.log("EN howItWorks:", en.howItWorks);
console.log("EN realtyPreview:", en.realtyPreview);
console.log("ES howItWorks:", es.howItWorks);
console.log("ES realtyPreview:", es.realtyPreview);


export default i18n;
