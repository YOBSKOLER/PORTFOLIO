"use client";
import { useState, useEffect } from "react";
import { useLang } from "@/components/providers/LanguageProvider";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import { motion } from "framer-motion";
import { ExternalLink, Folder, Briefcase } from "lucide-react";

type Project = {
  _id: string;
  title: string;
  category: string;
  categoryColor: string;
  bgColor: string;
  description: string;
  tags: string[];
  link: string;
  image?: string;
  type: "personal" | "professional";
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="rounded-2xl overflow-hidden border border-slate-700/50 hover:border-violet-500/40 transition-all duration-300 flex flex-col"
      style={{
        background: "rgba(17,24,39,0.8)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
      }}
    >
      {/* Image ou gradient — hauteur auto */}
      {project.image ? (
        <div className="w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-40 object-cover hover:scale-105 transition duration-500"
          />
        </div>
      ) : (
        <div
          className={`h-28 bg-gradient-to-br ${project.bgColor} flex items-center justify-center`}
        >
          <Folder size={40} className="text-white/70" />
        </div>
      )}

      {/* Content — s'adapte au texte */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-white leading-snug">
            {project.title}
          </h3>
          <span
            className="text-xs px-2 py-0.5 rounded-full shrink-0 font-medium whitespace-nowrap"
            style={{
              color: project.categoryColor,
              background: project.categoryColor + "20",
            }}
          >
            {project.category}
          </span>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300"
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
            className="flex items-center gap-1.5 text-violet-400 hover:text-violet-300 text-xs mt-auto transition w-fit"
          >
            <ExternalLink size={12} /> Visit website
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function Projects() {
  const { t } = useLang();
  const [tab, setTab] = useState<"professional" | "personal">("professional");
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data: Project[]) => {
        setAllProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const projects = allProjects.filter((p) => p.type === tab);

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
            <span className="text-violet-400">{t.projects.titleAccent}</span>
          </h2>
          <p className="text-slate-400">{t.projects.subtitle}</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-[#111827] border border-slate-700/50 rounded-xl p-1 gap-1">
            {(["professional", "personal"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setTab(type)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition ${
                  tab === type
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {type === "professional" ? (
                  <Briefcase size={14} />
                ) : (
                  <Folder size={14} />
                )}
                {t.projects[type]}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <p className="text-center text-slate-500 py-20">
            Aucun projet pour le moment.
          </p>
        ) : (
          // masonry-like : items-start pour que chaque carte prenne sa hauteur naturelle
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
            {projects.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
