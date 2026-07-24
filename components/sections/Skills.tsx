"use client";
import { useEffect, useState } from "react";
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
  Lock,
} from "lucide-react";
import * as LucideIcons from "lucide-react";

const categoryIcons = [Code2, Server, Smartphone, Terminal, Cloud, Database];

type Skill = {
  name: string;
  icon?: string;
  lucideIcon?: string;
  unlocked: boolean;
};

// Résout l'icône : URL svg OU nom lucide
function SkillIcon({ skill }: { skill: Skill }) {
  if (skill.icon) {
    return (
      <img
        src={skill.icon}
        alt={skill.name}
        className="w-5 h-5 object-contain shrink-0 group-hover:scale-110 transition"
      />
    );
  }
  if (skill.lucideIcon) {
    const Icon = (
      LucideIcons as Record<
        string,
        React.ComponentType<{ size?: number; className?: string }>
      >
    )[skill.lucideIcon];
    if (Icon) return <Icon size={18} className="text-violet-400 shrink-0" />;
  }
  return <div className="w-5 h-5 rounded bg-slate-600 shrink-0" />;
}

function SkillCard({ skill, catColor }: { skill: Skill; catColor: string }) {
  if (!skill.unlocked) {
    return (
      <div className="relative flex items-center gap-2 rounded-lg px-3 py-2 cursor-not-allowed select-none border border-slate-700/20 bg-slate-800/20 opacity-40">
        <div className="relative shrink-0 grayscale">
          <SkillIcon skill={skill} />
          <div className="absolute inset-0 bg-slate-900/50 rounded" />
        </div>
        <span className="text-slate-500 text-sm truncate">{skill.name}</span>
        <div className="absolute -top-1.5 -right-1.5 bg-slate-700 rounded-full p-0.5">
          <Lock size={8} className="text-slate-400" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-2 rounded-lg px-3 py-2 border border-slate-700/40 bg-[#0a0e1a]/50 hover:bg-[#0a0e1a]/80 transition cursor-default group"
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = `0 0 12px 1px ${catColor}40`;
        el.style.borderColor = `${catColor}60`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = "";
        el.style.borderColor = "";
      }}
    >
      <SkillIcon skill={skill} />
      <span className="text-slate-300 text-sm truncate">{skill.name}</span>
    </motion.div>
  );
}

// GitHub Activity (inchangé — garde ton code actuel ici)
const GITHUB_USERNAME = "YOBSKOLER";
type ContribDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
function getColor(level: number) {
  return (
    ["#1e2535", "#3b1f6e", "#5b2da0", "#7c3aed", "#a78bfa"][level] ?? "#1e2535"
  );
}

function GitHubActivity() {
  const [weeks, setWeeks] = useState<ContribDay[][]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
    )
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        const days: ContribDay[] = data.contributions.map(
          (d: { date: string; count: number; level: number }) => ({
            date: d.date,
            count: d.count,
            level: d.level as 0 | 1 | 2 | 3 | 4,
          }),
        );
        const grouped: ContribDay[][] = [];
        for (let i = 0; i < days.length; i += 7)
          grouped.push(days.slice(i, i + 7));
        setWeeks(grouped);
        setTotal(
          data.total?.lastYear ??
            days.reduce((s: number, d: ContribDay) => s + d.count, 0),
        );
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#111827]/80 border border-slate-700/50 rounded-2xl p-6 mt-10"
    >
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <svg
              className="w-5 h-5 text-violet-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub Activity
          </h3>
          {!loading && !error && (
            <p className="text-slate-400 text-sm mt-1">
              <span className="text-violet-400 font-semibold">{total}</span>{" "}
              contributions in the last year
            </p>
          )}
        </div>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-violet-400 hover:text-violet-300 border border-violet-500/30 px-3 py-1.5 rounded-lg transition"
        >
          @{GITHUB_USERNAME}
        </a>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-32">
          <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {error && (
        <p className="text-center text-slate-500 py-10">
          Impossible de charger l&apos;activité GitHub.
        </p>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            <div className="flex flex-col gap-1 mr-1 pt-6">
              {dayLabels.map((d, i) => (
                <div
                  key={i}
                  className="h-3 text-[9px] text-slate-500 leading-3 w-6 text-right"
                >
                  {d}
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1 mb-1 h-5">
                {weeks.map((week, wi) => {
                  const d = new Date(week[0]?.date);
                  const show = d.getDate() <= 7;
                  return (
                    <div
                      key={wi}
                      className="w-3 text-[9px] text-slate-500 text-center"
                    >
                      {show ? months[d.getMonth()] : ""}
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-1">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-1">
                    {week.map((day, di) => (
                      <div
                        key={di}
                        title={`${day.date}: ${day.count}`}
                        className="w-3 h-3 rounded-sm hover:ring-1 hover:ring-violet-500 cursor-default transition"
                        style={{ background: getColor(day.level) }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 justify-end">
            <span className="text-[10px] text-slate-500">Less</span>
            {[0, 1, 2, 3, 4].map((l) => (
              <div
                key={l}
                className="w-3 h-3 rounded-sm"
                style={{ background: getColor(l) }}
              />
            ))}
            <span className="text-[10px] text-slate-500">More</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

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
          className="text-center mb-6"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t.skills.title}{" "}
            <span className="text-violet-400">{t.skills.titleAccent}</span>
          </h2>
          <p className="text-slate-400 mb-4">{t.skills.subtitle}</p>
          <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-violet-500" />
              <span>Maîtrisé</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock size={10} className="text-slate-500" />
              <span>En cours d&apos;apprentissage</span>
            </div>
          </div>
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
                whileHover={{ y: -4 }}
                className="rounded-2xl p-6 transition-all duration-300"
                style={{
                  background: "rgba(17,24,39,0.7)",
                  border: `1.5px solid ${cat.color}40`,
                  boxShadow: `0 0 24px 0 ${cat.color}10`,
                }}
              >
                <div
                  className="flex items-center gap-3 mb-5 pb-4"
                  style={{ borderBottom: `1px solid ${cat.color}30` }}
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="p-2 rounded-lg"
                    style={{ background: cat.color + "20" }}
                  >
                    <Icon size={20} style={{ color: cat.color }} />
                  </motion.div>
                  <span className="font-bold text-white text-lg">
                    {cat.category}
                  </span>
                  <span
                    className="ml-auto text-xs"
                    style={{ color: cat.color + "aa" }}
                  >
                    {cat.skills.filter((s) => s.unlocked).length}/
                    {cat.skills.length}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {cat.skills.map((skill) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      catColor={cat.color}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <GitHubActivity />
      </div>
    </section>
  );
}
