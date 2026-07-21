"use client";
import { useLang } from "@/components/providers/LanguageProvider";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import { motion } from "framer-motion";
import { experienceData, educationData } from "@/lib/data";

type TimelineItem = {
  role?: string;
  objective?: string;
  objectiveBadgeClass?: string;
  degree?: string;
  company?: string;
  school?: string;
  location: string;
  period: string;
  periodColor?: string;
  periodBadgeClass?: string;
  periodColorClass?: string;
  description: string;
  tags: string[];
};

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative flex gap-6 "
    >
      {/* Dot */}
      <div className="flex flex-col items-center">
        <div
          className={`w-3 h-3 rounded-full mt-6 shrink-0 ${item.periodColorClass?.replace("text-", "bg-").replace("border-", "")}`}
        />
        <div className="w-px flex-1 bg-slate-700/50 mt-2" />
      </div>

      {/* Card */}
      <div className="flex-1 bg-navy-800/60 border backdrop-blur-md border-slate-700/50 rounded-xl p-6 mb-6 hover:border-violet/40 transition">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
          <h3 className="text-xl font-bold text-white">
            {item.role || item.degree}
          </h3>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border shrink-0 ${item.objectiveBadgeClass}`}
          >
            {item.objective}
          </span>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border shrink-0 ${item.periodBadgeClass}`}
          >
            {item.period}
          </span>
        </div>
        <p className="text-violet-light text-sm font-medium mb-3">
          {item.company || item.school} - {item.location}
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag: string) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-navy-950/80 border border-slate-700 text-slate-300 flex items-center gap-1"
            >
              <span className="w-1 h-1 rounded-full bg-violet-light" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const { t } = useLang();

  return (
    <section id="experience" className="relative py-24 overflow-hidden">
      <ParticlesBackground />

      <div className="max-w-5xl mx-auto px-6">
        {/* Work Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t.experience.title}{" "}
            <span className="text-violet-light">
              {t.experience.titleAccent}
            </span>
          </h2>
          <p className="text-slate-400">{t.experience.subtitle}</p>
        </motion.div>
        <div className="mb-20">
          {experienceData.map((item, i) => (
            <TimelineCard key={i} item={item} index={i} />
          ))}
        </div>
        
        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t.experience.education}{" "}
            <span className="text-violet-light">
              {t.experience.educationAccent}
            </span>
          </h2>
          <p className="text-slate-400">{t.experience.educationSubtitle}</p>
        </motion.div>
        <div>
          {educationData.map((item, i) => (
            <TimelineCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
