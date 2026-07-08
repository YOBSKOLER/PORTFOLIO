"use client";
import { useLang } from "@/components/providers/LanguageProvider";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import { motion } from "framer-motion";
import { skillsData } from "@/lib/data";
import {
  Code2,
  Server,
  Smartphone,
  Terminal,
  Cloud,
  Database,
} from "lucide-react";

const categoryIcons = [Code2, Server, Smartphone, Terminal, Cloud, Database];

export function Skills() {
  const { t } = useLang();

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      <ParticlesBackground />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t.skills.title}{" "}
            <span className="text-violet-light">{t.skills.titleAccent}</span>
          </h2>
          <p className="text-slate-400">{t.skills.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((cat, i) => {
            const Icon = categoryIcons[i];
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-navy-800/60 border border-slate-700/50 rounded-xl p-6 hover:border-violet/40 transition"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-700/50">
                  <div className={`p-2 rounded-lg ${cat.bgClass}`}>
                    <Icon size={20} className={cat.colorClass} />
                  </div>
                  <span className="font-bold text-white text-lg">
                    {cat.category}
                  </span>
                </div>

                {/* Skills grid */}
                <div className="grid grid-cols-2 gap-2">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 bg-navy-950/50 rounded-lg px-3 py-2 hover:bg-violet/10 transition cursor-default"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${cat.colorClass.replace("text-", "bg-")}`}
                      />
                      <span className="text-slate-300 text-sm truncate">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
