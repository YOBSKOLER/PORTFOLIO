"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useLang } from "@/components/providers/LanguageProvider";
import { Sun, Moon, Headphones } from "lucide-react";

const sections = [
  "home",
  "about",
  "skills",
  "experience",
  "projects",
  "contact",
] as const;

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { lang, t, setLang } = useLang();
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false); // ← AJOUT

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 0);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-navy-950/90 backdrop-blur-md border-b border-violet/20" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className="text-violet-light font-bold text-xl">
          YOBS.K
        </a>

        <div className="hidden md:flex items-center gap-8">
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              onClick={() => setActive(s)}
              className={`text-sm transition-colors ${active === s ? "text-violet-light" : "text-slate-300 hover:text-white"}`}
            >
              {t.nav[s as keyof typeof t.nav]}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "en" ? "fr" : "en")}
            className="text-xs font-semibold text-slate-300 hover:text-white border border-slate-600 rounded px-2 py-1"
          >
            {lang === "en" ? "FR" : "EN"}
          </button>

          {/* ← FIX : render seulement après mount */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-slate-700/50 text-slate-300 hover:text-white transition"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          <a
            href="#contact"
            className="flex items-center gap-2 bg-violet px-4 py-2 rounded-lg text-white text-sm font-medium hover:bg-violet-700 transition"
          >
            <Headphones size={16} />
            {t.nav.contactBtn}
          </a>
        </div>
      </div>
    </nav>
  );
}
