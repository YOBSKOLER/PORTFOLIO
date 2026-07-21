"use client";
import { useLang } from "@/components/providers/LanguageProvider";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  GraduationCap,
  Calendar,
  Code2,
  // Smartphone,
  Database,
  Server,
  CheckCircle2,
  Headphones,
} from "lucide-react";

const interests = [
  "Opensource",
  "Big Tech",
  "Tech in Africa",
  "AI Research",
  "Startup",
  "FinTech",
  "Football",
  "FC Barcelona",
  "#Messi G.O.A.T"
];
const interestClasses = [
  "text-[#7c3aed] border-[#7c3aed]/50 bg-[#7c3aed]/15",
  "text-[#5c6aed] border-[#5c6aed]/50 bg-[#5c6aed]/15",
  "text-[#06b6d4] border-[#06b6d4]/50 bg-[#06b6d4]/15",
  "text-[#8b5cf6] border-[#8b5cf6]/50 bg-[#8b5cf6]/15",
  "text-[#f97316] border-[#f97316]/50 bg-[#f97316]/15",
  "text-[#06b6d4] border-[#06b6d4]/50 bg-[#06b6d4]/15",
  "text-[#10b981] border-[#10b981]/50 bg-[#10b981]/15",
  "text-[#ef4444] border-[#ef4444]/50 bg-[#ef4444]/15",
  "text-[#af80cf] border-[#af80cf]/50 bg-[#af80cf]/15",
];

const consultancyItems = [
  "Software architecture & system design",
  "Web & mobile application development",
  "API design & integration",
  // "Server administration & infrastructure management",
];

const competencies = [
  {
    icon: Code2,
    colorClass: "text-[#7c3aed]",
    titleKey: "softwareEng",
    descKey: "softwareDesc",
  },
  // {
  //   icon: Smartphone,
  //   colorClass: "text-[#06b6d4]",
  //   titleKey: "dataScience",
  //   descKey: "dataDesc",
  // },
  {
    icon: Database,
    colorClass: "text-[#10b981]",
    titleKey: "database",
    descKey: "dbDesc",
  },
  {
    icon: Server,
    colorClass: "text-[#f97316]",
    titleKey: "devops",
    descKey: "devopsDesc",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export function About() {
  const { t } = useLang();
  const a = t.about;

  return (
    <section id="about" className="relative py-24 overflow-hidden ">
      <ParticlesBackground />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {a.title} <span className="text-violet-light">{a.titleAccent}</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">{a.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — Main content (2/3) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Journey */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0}
              variants={fadeUp}
              className=" backdrop-blur-md"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                {a.journey}
              </h3>
              <p className="text-slate-400 leading-relaxed mb-4">{a.bio1}</p>
              <p className="text-slate-400 leading-relaxed">{a.bio2}</p>
            </motion.div>

            {/* Core competencies */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
              className="backdrop-blur-md"
            >
              <h3 className="text-2xl font-bold text-white mb-3">
                {a.competencies}
              </h3>
              <p className="text-slate-400 leading-relaxed mb-8">
                {a.competenciesDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {competencies.map(
                  ({ icon: Icon, colorClass, titleKey, descKey }) => (
                    <div
                      key={titleKey}
                      className="bg-navy-800/60 border border-slate-700/50 rounded-xl p-5 hover:border-violet/40 transition"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Icon size={20} className={colorClass} />
                        <span className={`font-semibold ${colorClass}`}>
                          {a[titleKey as keyof typeof a]}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {a[descKey as keyof typeof a]}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </motion.div>
          </div>

          {/* Right sidebar (1/3) */}
          <div className="space-y-6">
            {/* Personal details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-navy-800/60 border backdrop-blur-md border-slate-700/50 rounded-xl p-6 space-y-5"
            >
              <h3 className="text-xl font-bold text-white">
                {a.personalDetails}
              </h3>

              {[
                { icon: User, label: a.name, value: "YOBS KOLER" },
                { icon: Calendar, label: a.age, value: a.ageVal },
                { icon: MapPin, label: a.location2, value: "Douala, Cameroon" },
                { icon: GraduationCap, label: a.education, value: a.eduVal },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon
                    size={18}
                    className="text-violet-light mt-0.5 shrink-0"
                  />
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {label}
                    </div>
                    <div className="text-sm text-slate-400">{value}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-navy-800/60 border backdrop-blur-md border-slate-700/50 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                {a.interests}
              </h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, i) => (
                  <span
                    key={interest}
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${interestClasses[i]}`}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Consultancy */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-navy-800/60 border backdrop-blur-md border-slate-700/50 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                {a.consultancy}
              </h3>
              <p className="text-slate-400 text-sm mb-4">{a.consultancyDesc}</p>
              <ul className="space-y-2 mb-5">
                {consultancyItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-slate-300"
                  >
                    <CheckCircle2
                      size={15}
                      className="text-violet-light mt-0.5 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 w-full bg-violet hover:bg-violet-700 text-white py-3 rounded-lg text-sm font-medium transition"
              >
                <Headphones size={16} />
                {a.scheduleCall}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
