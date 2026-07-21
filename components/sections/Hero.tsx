/* eslint-disable @next/next/no-img-element */
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
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    alt: "PostgreSQL",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    alt: "TypeScript",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    alt: "Docker",
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
              <span className="text-violet-light">{t.hero.name}</span>
            </h1>

            <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
              {t.hero.subtitle}
            </p>

            <a
              href="mailto:hi@yobskoler.com"
              className="flex items-center gap-2 text-violet-light hover:text-violet transition w-fit"
            >
              <Mail size={16} />
              <span className="text-sm">yobskoler9@gmail.com</span>
            </a>

            <div className="flex flex-wrap gap-4">
              <a
                href="/cv.pdf"
                download
                className="flex items-center gap-2 bg-violet hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                <Download size={18} />
                {t.hero.downloadCV}
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 border border-slate-600 hover:border-violet text-slate-300 hover:text-white px-6 py-3 rounded-lg font-medium transition"
              >
                <Headphones size={18} />
                {t.hero.contactMe}
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
                  // eslint-disable-next-line react/jsx-key
                  <img
                    src={icon.src}
                    alt={icon.alt}
                    className="w-5 h-5 object-contain shrink-0 group-hover:scale-110 transition"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end relative"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-violet/20 blur-3xl scale-110" />

              {/* Photo circle */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-violet/40 shadow-2xl shadow-violet/20">
                <Image
                  src="/images/profile.jpg"
                  alt="YOBS KOLER"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Location badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-4 -right-4 bg-navy-800  border backdrop-blur-md border-slate-700 rounded-xl px-4 py-3 flex items-center gap-2 shadow-xl"
              >
                <MapPin
                  size={20}
                  className="text-violet-light  animate-bounce"
                />
                <div>
                  <div className="text-xs text-slate-400 font-semibold">
                    {t.hero.basedIn}
                  </div>
                  <div className="text-sm font-bold text-violet-light">
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
