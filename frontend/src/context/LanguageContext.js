// Language Context — provides bilingual support (Hindi / English)
import React, { createContext, useContext, useState, useCallback } from "react";
import translations from "../utils/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(
    localStorage.getItem("krishiai_lang") || "en"
  );

  const toggleLanguage = useCallback(() => {
    const newLang = lang === "en" ? "hi" : "en";
    setLang(newLang);
    localStorage.setItem("krishiai_lang", newLang);
  }, [lang]);

  // Translation helper — t("key") returns text in current language
  const t = useCallback(
    (key) => translations[lang]?.[key] || translations["en"]?.[key] || key,
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t, isHindi: lang === "hi" }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
