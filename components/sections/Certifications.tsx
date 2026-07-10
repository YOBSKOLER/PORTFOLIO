'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Award, ExternalLink } from 'lucide-react'
import { certifications } from '@/lib/data'

export function Certifications() {
  const [current, setCurrent] = useState(0)
  const total = certifications.length

  const prev = () => setCurrent((c) => (c - 1 + total) % total)
  const next = () => setCurrent((c) => (c + 1) % total)

  const cert = certifications[current]

  return (
    <section id="certifications" className="relative py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            My <span className="text-violet-light">Certifications</span>
          </h2>
          <p className="text-slate-400">Professional certifications and achievements</p>
        </motion.div>

        <div className="relative">
          {/* Carousel card */}
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="bg-navy-800/60 border border-slate-700/50 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6"
          >
            {/* Icon */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: cert.color + '20', border: `1.5px solid ${cert.color}40` }}
            >
              {cert.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cert.logo} alt={cert.issuer} className="w-12 h-12 object-contain" />
              ) : (
                <Award size={36} style={{ color: cert.color }} />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 text-center sm:text-left">
              <div
                className="text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3"
                style={{ color: cert.color, background: cert.color + '20' }}
              >
                {cert.issuer}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
              <p className="text-slate-400 text-sm">{cert.date}</p>
            </div>

            {/* Link */}
            {cert.link && cert.link !== '#' && (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-violet-light hover:text-violet text-sm border border-violet/30 px-4 py-2 rounded-lg transition"
              >
                <ExternalLink size={14} />
                Voir
              </a>
            )}
          </motion.div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-slate-700 hover:border-violet/50 text-slate-400 hover:text-white transition"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {certifications.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{ background: i === current ? '#7c3aed' : '#334155' }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full border border-slate-700 hover:border-violet/50 text-slate-400 hover:text-white transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Counter */}
          <p className="text-center text-xs text-slate-500 mt-3">
            {current + 1} / {total}
          </p>
        </div>
      </div>
    </section>
  )
}