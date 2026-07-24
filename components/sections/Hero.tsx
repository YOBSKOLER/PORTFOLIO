"use client";
import { useLang } from "@/components/providers/LanguageProvider";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import { Download, Headphones, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const techIcons = [
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    alt: "React",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    alt: "Next.js",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
    alt: "Laravel",
  },
    {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    alt: "TypeScript",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    alt: "PostgreSQL",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    alt: "Docker",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    alt: "MongoDB",
  },
];

const stats = [
  { value: "2+", labelKey: "yearsExp" },
  { value: "5+", labelKey: "projects" },
  // { value: "5+", labelKey: "clients" },
];

export function Hero() {
  const { t } = useLang();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      <ParticlesBackground />

      <div className="max-w-7xl mx-auto px-6 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-violet/10 border backdrop-blur-md border-violet/30 rounded-full px-4 py-2 text-violet-light text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for work
            </div>

            <div className="inline-flex items-center gap-2 bg-violet/10 border backdrop-blur-md border-violet/30 rounded-full px-4 py-2 text-violet-light text-sm">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              AI Engeneering & Data Science Enthusiast
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
              {t.hero.greeting}{" "}
              <span className="text-violet-400">{t.hero.name}</span>
            </h1>

            <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
              {t.hero.subtitle}
            </p>

            <a
              href="mailto:yobskoler9@gmail.com"
              className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition w-fit"
            >
              <Mail size={16} />
              <span className="text-sm">yobskoler9@gmail.com</span>
            </a>

            <div className="flex flex-wrap gap-4">
              <a
                href="/cv.pdf"
                download
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                <Download size={18} /> {t.hero.downloadCV}
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 border border-slate-600 hover:border-violet-500 text-slate-300 hover:text-white px-6 py-3 rounded-lg font-medium transition"
              >
                <Headphones size={18} /> {t.hero.contactMe}
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              {stats.map((s) => (
                <div key={s.labelKey}>
                  <div className="text-3xl font-bold text-white">{s.value}</div>
                  <div className="text-slate-400 text-sm">
                    {t.hero[s.labelKey as keyof typeof t.hero]}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech icons */}
            <div>
              <p className="text-slate-500 text-sm mb-3">{t.hero.crafting}</p>
              <div className="flex flex-wrap gap-3">
                {techIcons.map((icon) => (
                  <img
                    key={icon.alt}
                    src={icon.src}
                    alt={icon.alt}
                    className="w-8 h-8 opacity-80 hover:opacity-100 transition hover:scale-110"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Photo avec animation border */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end relative"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-violet-600/20 blur-3xl scale-110" />

              {/* Spinning border ring */}
              <div className="absolute -inset-3 rounded-full">
                <svg
                  className="w-full h-full animate-spin"
                  style={{ animationDuration: "8s" }}
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="47"
                    fill="none"
                    stroke="url(#grad1)"
                    strokeWidth="1.5"
                    strokeDasharray="60 240"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="grad1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Counter-spin ring */}
              <div className="absolute -inset-1.5 rounded-full">
                <svg
                  className="w-full h-full animate-spin"
                  style={{
                    animationDuration: "12s",
                    animationDirection: "reverse",
                  }}
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="47"
                    fill="none"
                    stroke="url(#grad2)"
                    strokeWidth="1"
                    strokeDasharray="30 270"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="grad2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Dot orbiting */}
              <div
                className="absolute -inset-3 rounded-full animate-spin"
                style={{ animationDuration: "6s" }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-violet-400 shadow-lg shadow-violet-400/50" />
              </div>

              {/* Photo */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-violet-500/30 shadow-2xl shadow-violet-500/20">
                <Image
                  src="/profile.jpg"
                  alt="YOBS KOLER"
                  fill
                  sizes="(max-width: 640px) 256px, 320px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Location badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-4 -right-4 bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 flex items-center gap-2 shadow-xl"
              >
                <MapPin size={16} className="text-violet-400 animate-bounce" />
                <div>
                  <div className="text-xs text-slate-400">{t.hero.basedIn}</div>
                  <div className="text-sm font-semibold text-violet-400">
                    {t.hero.location}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
