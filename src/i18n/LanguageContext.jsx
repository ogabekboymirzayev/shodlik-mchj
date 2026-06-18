import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "./translations.js";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("uz");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("shodlik-lang") : null;
    if (saved === "uz" || saved === "ru") setLang(saved);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
    if (typeof window !== "undefined") localStorage.setItem("shodlik-lang", lang);
  }, [lang]);

  const t = (key) => {
    const parts = key.split(".");
    let cur = translations[lang];
    for (const p of parts) cur = cur?.[p];
    return cur ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, toggle: () => setLang(l => l === "uz" ? "ru" : "uz") }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
