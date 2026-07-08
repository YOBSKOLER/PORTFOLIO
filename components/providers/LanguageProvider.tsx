"use client";
import { createContext, useContext, useState } from "react";
import { translations, Lang } from "@/lib/i18n";

const LangContext = createContext<{
  lang: Lang;
  t: (typeof translations)["en"];
  setLang: (l: Lang) => void;
}>({ lang: "en", t: translations["en"], setLang: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LangContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
