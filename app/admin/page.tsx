"use client";
import {
  FolderOpen,
  Briefcase,
  Award,
  MessageSquare,
  Eye,
  TrendingUp,
  Users,
  Code2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const stats = [
  { label: "Projets", value: "5", icon: FolderOpen, color: "#7c3aed" },
  { label: "Expériences", value: "3", icon: Briefcase, color: "#06b6d4" },
  { label: "Certifications", value: "1", icon: Award, color: "#10b981" },
  { label: "Messages", value: "0", icon: MessageSquare, color: "#f97316" },
  { label: "Skills", value: "36", icon: Code2, color: "#ec4899" },
  { label: "Vues (mois)", value: "—", icon: Eye, color: "#a78bfa" },
];

const visitData = [
  { month: "Jan", visits: 0 },
  { month: "Feb", visits: 0 },
  { month: "Mar", visits: 0 },
  { month: "Apr", visits: 0 },
  { month: "May", visits: 0 },
  { month: "Jun", visits: 12 },
  { month: "Jul", visits: 24 },
];

const sectionData = [
  { name: "Hero", views: 100 },
  { name: "About", views: 78 },
  { name: "Skills", views: 65 },
  { name: "Experience", views: 54 },
  { name: "Projects", views: 82 },
  { name: "Contact", views: 43 },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-8 text-white">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">
          Vue d&apos;ensemble de ton portfolio
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-[#111827] border border-slate-800 rounded-2xl p-4 flex flex-col gap-2"
            style={{
              borderColor: color + "30",
              boxShadow: `0 0 20px ${color}10`,
            }}
          >
            <div
              className="p-2 rounded-lg w-fit"
              style={{ background: color + "20" }}
            >
              <Icon size={18} style={{ color }} />
            </div>
            <div className="text-2xl font-bold" style={{ color }}>
              {value}
            </div>
            <div className="text-xs text-slate-400">{label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visites */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-violet-400" />
            Visites mensuelles
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={visitData}>
              <XAxis dataKey="month" stroke="#475569" tick={{ fontSize: 12 }} />
              <YAxis stroke="#475569" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: "#1e293b",
                  border: "none",
                  borderRadius: 8,
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#7c3aed"
                strokeWidth={2}
                dot={{ fill: "#7c3aed" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sections */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Users size={18} className="text-cyan-400" />
            Sections les plus visitées
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={sectionData}>
              <XAxis dataKey="name" stroke="#475569" tick={{ fontSize: 11 }} />
              <YAxis stroke="#475569" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: "#1e293b",
                  border: "none",
                  borderRadius: 8,
                  color: "#fff",
                }}
              />
              <Bar dataKey="views" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick links */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">Actions rapides</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              label: "Ajouter un projet",
              href: "/admin/projects",
              color: "#7c3aed",
            },
            {
              label: "Ajouter une expérience",
              href: "/admin/experience",
              color: "#06b6d4",
            },
            {
              label: "Ajouter une certification",
              href: "/admin/certifications",
              color: "#10b981",
            },
            {
              label: "Voir les messages",
              href: "/admin/messages",
              color: "#f97316",
            },
          ].map(({ label, href, color }) => (
            <a
              key={href}
              href={href}
              className="text-center py-3 px-4 rounded-xl text-sm font-medium transition border hover:opacity-90"
              style={{
                borderColor: color + "40",
                color,
                background: color + "10",
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
