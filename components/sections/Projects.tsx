"use client";
import { useState } from "react";
import { useLang } from "@/components/providers/LanguageProvider";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import { motion } from "framer-motion";
import { personalProjects, professionalProjects } from "@/lib/data";
import { ExternalLink, Folder, Briefcase } from "lucide-react";

type ProjectItem = {
  title: string;
  category: string;
  categoryColor: string;
  categoryBadgeClass?: string;
  bgColor: string;
  description: string;
  tags: string[];
  link?: string;
};

function ProjectCard({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-navy-800/60 border backdrop-blur-md border-slate-700/50 rounded-xl overflow-hidden hover:border-violet/40 transition group"
    >
      {/* Color banner */}
      <div
        className={`h-40 bg-linear-to-br ${project.bgColor} flex items-center justify-center`}
      >
        <Folder
          size={56}
          className="text-white/80 group-hover:scale-110 transition"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-bold text-white">{project.title}</h3>
          <span
            className={`text-xs px-2 py-1 rounded-full shrink-0 font-medium ${project.categoryBadgeClass}`}
          >
            {project.category}
          </span>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-navy-950/80 border border-slate-700 text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.link && project.link !== "#" && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-violet-light hover:text-violet text-sm transition"
          >
            <ExternalLink size={14} />
            Visit website
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function Projects() {
  const { t } = useLang();
  const [tab, setTab] = useState<"professional" | "personal">("professional");

  const projects =
    tab === "professional" ? professionalProjects : personalProjects;

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <ParticlesBackground />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t.projects.title}{" "}
            <span className="text-violet-light">{t.projects.titleAccent}</span>
          </h2>
          <p className="text-slate-400">{t.projects.subtitle}</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-navy-800/60 backdrop-blur-md border border-slate-700/50 rounded-xl p-1 gap-1">
            {(["professional", "personal"] as const).map((t_) => (
              <button
                key={t_}
                onClick={() => setTab(t_)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition ${
                  tab === t_
                    ? "bg-violet text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t_ === "professional" ? (
                  <Briefcase size={15} />
                ) : (
                  <Folder size={15} />
                )}
                {t.projects[t_]}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
