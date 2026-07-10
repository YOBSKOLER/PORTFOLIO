'use client'
import { useLang } from '@/components/providers/LanguageProvider'
import { ParticlesBackground } from '@/components/ui/ParticlesBackground'
import { GitHubActivity } from '@/components/ui/GitHubActivity' 
import { motion } from 'framer-motion'
import { skillsData } from '@/lib/data'
import { Code2, Server, Smartphone, Terminal, Cloud, Database, Lock } from 'lucide-react'

const categoryIcons = [Code2, Server, Smartphone, Terminal, Cloud, Database]

function SkillCard({ skill }: { skill: { name: string; icon: string; unlocked: boolean } }) {
  if (!skill.unlocked) {
    return (
      <div className="relative flex items-center gap-2 bg-navy-950/30 border border-slate-700/20 rounded-lg px-3 py-2 opacity-40 cursor-not-allowed select-none">
        <div className="relative shrink-0">
          <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain grayscale" />
          <div className="absolute inset-0 bg-slate-900/50 rounded" />
        </div>
        <span className="text-slate-500 text-sm truncate">{skill.name}</span>
        <div className="absolute -top-1.5 -right-1.5 bg-slate-700 rounded-full p-0.5">
          <Lock size={8} className="text-slate-400" />
        </div>
      </div>
    )
  }

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="flex items-center gap-2 bg-navy-950/50 border border-slate-700/40 rounded-lg px-3 py-2 hover:bg-violet/10 hover:border-violet/40 transition cursor-default group"
    >
      <img
        src={skill.icon}
        alt={skill.name}
        className="w-5 h-5 object-contain shrink-0 group-hover:scale-110 transition"
      />
      <span className="text-slate-300 text-sm truncate">{skill.name}</span>
    </motion.div>
  )
}

export function Skills() {
  const { t } = useLang()

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      <ParticlesBackground />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t.skills.title} <span className="text-violet-light">{t.skills.titleAccent}</span>
          </h2>
          <p className="text-slate-400 mb-4">{t.skills.subtitle}</p>

          {/* Légende */}
          <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-violet" />
              <span>With time , experience  and practice , i will improve in the following stark   </span>
            </div>
            
          </div>
        </motion.div>

        {/* Grid catégories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((cat, i) => {
            const Icon = categoryIcons[i]
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-navy-800/60 border border-slate-700/50 rounded-xl p-6 hover:border-violet/40 transition"
              >
                {/* Header catégorie — icône Lucide + couleur comme avant */}
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-700/50">
                  <div className="p-2 rounded-lg" style={{ background: cat.color + '20' }}>
                    <Icon size={20} style={{ color: cat.color }} />
                  </div>
                  <span className="font-bold text-white text-lg">{cat.category}</span>
                  <span className="ml-auto text-xs text-slate-600">
                    {cat.skills.filter(s => s.unlocked).length}/{cat.skills.length}
                  </span>
                </div>

                {/* Skills list */}
                <div className="grid grid-cols-2 gap-2">
                  {cat.skills.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* GitHub Activity */}
        <GitHubActivity />
      </div>
    </section>
  )
}

