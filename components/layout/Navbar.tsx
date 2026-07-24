"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useLang } from "@/components/providers/LanguageProvider";
import { Sun, Moon, Headphones, Menu, X } from "lucide-react";

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
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      // Active section detection
      sections.forEach((s) => {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom >= 80) setActive(s);
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (section: string) => {
    setActive(section);
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-[#0a0e1a]/95 backdrop-blur-md border-b border-violet-500/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={() => handleNavClick("home")}
            className="text-violet-400 font-bold text-xl z-50 relative"
          >
            YOBS.K
          </a>

          {/* Nav links desktop */}
          <div className="hidden md:flex items-center gap-8">
            {sections.map((s) => (
              <a
                key={s}
                href={`#${s}`}
                onClick={() => handleNavClick(s)}
                className={`text-sm transition-colors capitalize relative group ${
                  active === s
                    ? "text-violet-400"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {t.nav[s as keyof typeof t.nav]}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-violet-400 transition-all duration-300 ${
                    active === s ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            ))}
          </div>

          {/* Right desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "fr" : "en")}
              className="text-xs font-semibold text-slate-300 hover:text-white border border-slate-600 hover:border-violet-500 rounded px-2 py-1 transition"
            >
              {lang === "en" ? "FR" : "EN"}
            </button>
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
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg text-white text-sm font-medium transition"
            >
              <Headphones size={16} /> {t.nav.contactBtn}
            </a>
          </div>

          {/* Mobile right */}
          <div className="flex md:hidden items-center gap-2 z-50 relative">
            <button
              onClick={() => setLang(lang === "en" ? "fr" : "en")}
              className="text-xs font-semibold text-slate-300 border border-slate-600 rounded px-2 py-1"
            >
              {lang === "en" ? "FR" : "EN"}
            </button>
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full text-slate-300 hover:text-white transition"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl border border-slate-700 hover:border-violet-500 text-slate-300 hover:text-white transition"
              aria-label="Menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#0a0e1a]/98 backdrop-blur-2xl"
          onClick={() => setMenuOpen(false)}
        />

        {/* Animated background circles */}
        <div className="absolute top-20 left-8 w-32 h-32 rounded-full bg-violet-600/10 blur-2xl animate-pulse" />
        <div
          className="absolute bottom-32 right-8 w-40 h-40 rounded-full bg-violet-800/10 blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Content */}
        <div className="relative flex flex-col h-full pt-24 pb-12 px-8">
          {/* Nav links */}
          <div className="flex flex-col gap-1 flex-1">
            {sections.map((s, i) => (
              <a
                key={s}
                href={`#${s}`}
                onClick={() => handleNavClick(s)}
                className={`flex items-center gap-4 py-4 px-4 rounded-2xl transition-all duration-300 group ${
                  active === s
                    ? "bg-violet-500/15 border border-violet-500/30"
                    : "border border-transparent hover:bg-slate-800/50"
                }`}
                style={{
                  transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
                  opacity: menuOpen ? 1 : 0,
                  transition: `all 0.3s ease ${i * 60}ms`,
                }}
              >
                <span
                  className={`w-1.5 h-8 rounded-full transition-all ${active === s ? "bg-violet-400" : "bg-slate-700 group-hover:bg-violet-500/50"}`}
                />
                <span
                  className={`text-2xl font-bold capitalize tracking-wide ${active === s ? "text-violet-400" : "text-slate-300 group-hover:text-white"}`}
                >
                  {t.nav[s as keyof typeof t.nav]}
                </span>
                {active === s && (
                  <span className="ml-auto text-violet-400 text-xs font-mono">
                    ●
                  </span>
                )}
              </a>
            ))}
          </div>

          {/* Bottom */}
          <div className="space-y-4">
            <div className="h-px bg-slate-800" />
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 py-4 rounded-2xl text-white font-semibold text-lg transition w-full"
            >
              <Headphones size={20} /> {t.nav.contactBtn}
            </a>
            <div className="flex gap-4 justify-center">
              <a
                href="https://github.com/YOBSKOLER"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-violet-400 transition text-sm"
              >
                GitHub
              </a>
              <span className="text-slate-700">·</span>
              <a
                href="https://www.linkedin.com/in/yobs-k%C3%B6ler-37859b385/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-violet-400 transition text-sm"
              >
                LinkedIn
              </a>
              <span className="text-slate-700">·</span>
              <a
                href="mailto:yobskoler9@gmail.com"
                className="text-slate-500 hover:text-violet-400 transition text-sm"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
