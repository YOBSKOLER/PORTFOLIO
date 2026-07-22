'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useLang } from '@/components/providers/LanguageProvider'
import { Sun, Moon, Headphones, Menu, X } from 'lucide-react'

const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'] as const

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const { lang, t, setLang } = useLang()
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Ferme le menu quand on clique un lien
  const handleNavClick = (section: string) => {
    setActive(section)
    setMenuOpen(false)
  }

  // Bloque le scroll body quand menu ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-[#0a0e1a]/95 backdrop-blur-md border-b border-violet-500/20'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <a href="#home" onClick={() => handleNavClick('home')}
            className="text-violet-400 font-bold text-xl z-50 relative">
            YOBS.K
          </a>

          {/* Nav links — desktop */}
          <div className="hidden md:flex items-center gap-8">
            {sections.map((s) => (
              <a key={s} href={`#${s}`} onClick={() => handleNavClick(s)}
                className={`text-sm transition-colors capitalize ${
                  active === s ? 'text-violet-400' : 'text-slate-300 hover:text-white'
                }`}>
                {t.nav[s as keyof typeof t.nav]}
              </a>
            ))}
          </div>

          {/* Right — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="text-xs font-semibold text-slate-300 hover:text-white border border-slate-600 hover:border-violet-500 rounded px-2 py-1 transition">
              {lang === 'en' ? 'FR' : 'EN'}
            </button>

            {mounted && (
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full hover:bg-slate-700/50 text-slate-300 hover:text-white transition">
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            <a href="#contact"
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg text-white text-sm font-medium transition">
              <Headphones size={16} />
              {t.nav.contactBtn}
            </a>
          </div>

          {/* Burger — mobile */}
          <div className="flex md:hidden items-center gap-3 z-50 relative">
            {/* Lang toggle mobile */}
            <button onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="text-xs font-semibold text-slate-300 border border-slate-600 rounded px-2 py-1">
              {lang === 'en' ? 'FR' : 'EN'}
            </button>

            {/* Burger button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition"
              aria-label="Menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#0a0e1a]/98 backdrop-blur-xl"
          onClick={() => setMenuOpen(false)}
        />

        {/* Menu content */}
        <div className={`relative flex flex-col items-center justify-center h-full gap-2 transition-all duration-300 ${
          menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        }`}>

          {/* Nav links */}
          {sections.map((s, i) => (
            <a
              key={s}
              href={`#${s}`}
              onClick={() => handleNavClick(s)}
              className={`text-2xl font-semibold py-3 px-8 rounded-xl transition-all capitalize ${
                active === s
                  ? 'text-violet-400 bg-violet-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
              style={{ transitionDelay: menuOpen ? `${i * 50}ms` : '0ms' }}
            >
              {t.nav[s as keyof typeof t.nav]}
            </a>
          ))}

          {/* Divider */}
          <div className="w-16 h-px bg-slate-700 my-4" />

          {/* Contact button */}
          <a href="#contact" onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-8 py-3 rounded-xl text-white font-medium transition">
            <Headphones size={18} />
            {t.nav.contactBtn}
          </a>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center gap-2 mt-2 text-slate-400 hover:text-white transition text-sm"
            >
              {theme === 'dark'
                ? <><Sun size={16} /> Light mode</>
                : <><Moon size={16} /> Dark mode</>
              }
            </button>
          )}

          {/* Socials */}
          <div className="flex gap-4 mt-4">
            <a href="https://github.com/YOBSKOLER" target="_blank" rel="noopener noreferrer"
              className="text-slate-500 hover:text-violet-400 transition text-xs">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
              className="text-slate-500 hover:text-violet-400 transition text-xs">LinkedIn</a>
            <a href="mailto:yobskoler9@gmail.com"
              className="text-slate-500 hover:text-violet-400 transition text-xs">Email</a>
          </div>
        </div>
      </div>
    </>
  )
}