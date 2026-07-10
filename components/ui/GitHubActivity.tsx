"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const GITHUB_USERNAME = 'YOBSKOLER'

interface ContribDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

function getColor(level: number) {
  return ['#1e2535', '#3b1f6e', '#5b2da0', '#7c3aed', '#a78bfa'][level] ?? '#1e2535'
}

export function GitHubActivity() {
  const [weeks, setWeeks] = useState<ContribDay[][]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(data => {
        const days: ContribDay[] = data.contributions.map((d: any) => ({
          date: d.date, count: d.count, level: d.level,
        }))
        const grouped: ContribDay[][] = []
        for (let i = 0; i < days.length; i += 7) grouped.push(days.slice(i, i + 7))
        setWeeks(grouped)
        setTotal(data.total?.lastYear ?? days.reduce((s: number, d: ContribDay) => s + d.count, 0))
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', '']

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-navy-800/60 border border-slate-700/50 rounded-2xl p-6 mt-10"
    >
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-violet-light" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub Activity
          </h3>
          {!loading && !error && (
            <p className="text-slate-400 text-sm mt-1">
              <span className="text-violet-light font-semibold">{total}</span> contributions in the last year
            </p>
          )}
        </div>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank" rel="noopener noreferrer"
          className="text-xs text-violet-light hover:text-violet border border-violet/30 px-3 py-1.5 rounded-lg transition"
        >
          @{GITHUB_USERNAME}
        </a>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-32">
          <div className="w-6 h-6 border-2 border-violet border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {error && (
        <p className="text-center text-slate-500 py-10">Impossible de charger l'activité GitHub.</p>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {/* Day labels */}
            <div className="flex flex-col gap-1 mr-1 pt-6">
              {dayLabels.map((d, i) => (
                <div key={i} className="h-3 text-[9px] text-slate-500 leading-3 w-6 text-right">{d}</div>
              ))}
            </div>
            {/* Weeks */}
            <div className="flex flex-col">
              {/* Month labels */}
              <div className="flex gap-1 mb-1 h-5">
                {weeks.map((week, wi) => {
                  const d = new Date(week[0]?.date)
                  const show = d.getDate() <= 7
                  return (
                    <div key={wi} className="w-3 text-[9px] text-slate-500 text-center">
                      {show ? months[d.getMonth()] : ''}
                    </div>
                  )
                })}
              </div>
              {/* Grid */}
              <div className="flex gap-1">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-1">
                    {week.map((day, di) => (
                      <div
                        key={di}
                        title={`${day.date}: ${day.count} contributions`}
                        className="w-3 h-3 rounded-sm hover:ring-1 hover:ring-violet cursor-default transition"
                        style={{ background: getColor(day.level) }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-2 mt-3 justify-end">
            <span className="text-[10px] text-slate-500">Less</span>
            {[0,1,2,3,4].map(l => (
              <div key={l} className="w-3 h-3 rounded-sm" style={{ background: getColor(l) }} />
            ))}
            <span className="text-[10px] text-slate-500">More</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}