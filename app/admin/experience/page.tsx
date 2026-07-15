"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2, Briefcase, GraduationCap } from "lucide-react";
import {
  experienceData as initExp,
  educationData as initEdu,
} from "@/lib/data";

type Entry = {
  role?: string;
  degree?: string;
  company?: string;
  school?: string;
  location: string;
  period: string;
  periodColor: string;
  description: string;
  tags: string[];
};

function EntryForm({
  initial,
  onSave,
  onCancel,
  type,
}: {
  initial: any;
  onSave: (d: any) => void;
  onCancel: () => void;
  type: "work" | "edu";
}) {
  const [form, setForm] = useState(() => {
    const baseTags = Array.isArray(initial?.tags)
      ? initial.tags.join(", ")
      : (initial?.tags ?? "");

    return {
      ...(type === "work"
        ? { role: "", company: "" }
        : { degree: "", school: "" }),
      location: "",
      period: "",
      periodColor: "#7c3aed",
      description: "",
      tags: "",
      ...initial,
      tags: baseTags, // ← écrase le spread proprement via initializer function
    };
  });

  return (
    <div className="bg-[#0a0e1a] border border-slate-700 rounded-xl p-5 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {type === "work" ? (
          <>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Poste</label>
              <input
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full bg-[#111827] border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">
                Entreprise
              </label>
              <input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full bg-[#111827] border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">
                Diplôme
              </label>
              <input
                value={form.degree}
                onChange={(e) => setForm({ ...form, degree: e.target.value })}
                className="w-full bg-[#111827] border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">École</label>
              <input
                value={form.school}
                onChange={(e) => setForm({ ...form, school: e.target.value })}
                className="w-full bg-[#111827] border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
              />
            </div>
          </>
        )}
        <div>
          <label className="text-xs text-slate-400 mb-1 block">
            Localisation
          </label>
          <input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full bg-[#111827] border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Période</label>
          <input
            value={form.period}
            onChange={(e) => setForm({ ...form, period: e.target.value })}
            placeholder="2023 - 2024"
            className="w-full bg-[#111827] border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400 mb-1 block">
            Couleur badge
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={form.periodColor}
              onChange={(e) =>
                setForm({ ...form, periodColor: e.target.value })
              }
              className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent"
            />
            <span className="text-slate-400 text-sm">{form.periodColor}</span>
          </div>
        </div>
        <div>
          <label className="text-xs text-slate-400 mb-1 block">
            Tags (séparés par virgule)
          </label>
          <input
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            placeholder="React, Node.js, Docker"
            className="w-full bg-[#111827] border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>
      <div>
        <label className="text-xs text-slate-400 mb-1 block">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
          className="w-full bg-[#111827] border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500 resize-none"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={() =>
            onSave({
              ...form,
              tags: form.tags
                .split(",")
                .map((t: string) => t.trim())
                .filter(Boolean),
            })
          }
          className="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          Sauvegarder
        </button>
        <button
          onClick={onCancel}
          className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}

function EntryCard({
  entry,
  onEdit,
  onDelete,
}: {
  entry: any;
  onEdit: () => void;
  onDelete: () => void;
  type: "work" | "edu";
}) {
  return (
    <div className="bg-[#0a0e1a] border border-slate-800 rounded-xl p-5 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-bold text-white">{entry.role || entry.degree}</h3>
          <p className="text-sm" style={{ color: entry.periodColor }}>
            {entry.company || entry.school} — {entry.location}
          </p>
        </div>
        <span
          className="text-xs px-2 py-1 rounded-full shrink-0 font-medium border"
          style={{
            color: entry.periodColor,
            borderColor: entry.periodColor + "50",
            background: entry.periodColor + "15",
          }}
        >
          {entry.period}
        </span>
      </div>
      <p className="text-slate-400 text-sm line-clamp-2">{entry.description}</p>
      <div className="flex flex-wrap gap-1">
        {entry.tags?.map((t: string) => (
          <span
            key={t}
            className="text-xs px-2 py-0.5 bg-slate-800 rounded text-slate-400"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex gap-3 pt-1">
        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition"
        >
          <Pencil size={12} /> Modifier
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition"
        >
          <Trash2 size={12} /> Supprimer
        </button>
      </div>
    </div>
  );
}

export default function AdminExperience() {
  const [experiences, setExperiences] = useState(initExp);
  const [education, setEducation] = useState(initEdu);
  const [showExpForm, setShowExpForm] = useState(false);
  const [showEduForm, setShowEduForm] = useState(false);
  const [editingExp, setEditingExp] = useState<number | null>(null);
  const [editingEdu, setEditingEdu] = useState<number | null>(null);

  const saveExp = (data: any) => {
    if (editingExp !== null)
      setExperiences((e) => e.map((x, i) => (i === editingExp ? data : x)));
    else setExperiences((e) => [...e, data]);
    setShowExpForm(false);
    setEditingExp(null);
  };

  const saveEdu = (data: any) => {
    if (editingEdu !== null)
      setEducation((e) => e.map((x, i) => (i === editingEdu ? data : x)));
    else setEducation((e) => [...e, data]);
    setShowEduForm(false);
    setEditingEdu(null);
  };

  return (
    <div className="p-6 text-white space-y-10">
      {/* Expériences */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Briefcase className="text-violet-400" size={22} /> Expériences
            professionnelles
          </h1>
          <button
            onClick={() => {
              setShowExpForm(true);
              setEditingExp(null);
            }}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            <Plus size={15} /> Ajouter
          </button>
        </div>
        {showExpForm && (
          <EntryForm
            type="work"
            initial={editingExp !== null ? experiences[editingExp] : {}}
            onSave={saveExp}
            onCancel={() => {
              setShowExpForm(false);
              setEditingExp(null);
            }}
          />
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {experiences.map((exp, i) => (
            <EntryCard
              key={i}
              entry={exp}
              type="work"
              onEdit={() => {
                setEditingExp(i);
                setShowExpForm(true);
              }}
              onDelete={() =>
                setExperiences((e) => e.filter((_, idx) => idx !== i))
              }
            />
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800" />

      {/* Formation */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <GraduationCap className="text-cyan-400" size={22} /> Formation &
            Diplômes
          </h2>
          <button
            onClick={() => {
              setShowEduForm(true);
              setEditingEdu(null);
            }}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            <Plus size={15} /> Ajouter
          </button>
        </div>
        {showEduForm && (
          <EntryForm
            type="edu"
            initial={editingEdu !== null ? education[editingEdu] : {}}
            onSave={saveEdu}
            onCancel={() => {
              setShowEduForm(false);
              setEditingEdu(null);
            }}
          />
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {education.map((edu, i) => (
            <EntryCard
              key={i}
              entry={edu}
              type="edu"
              onEdit={() => {
                setEditingEdu(i);
                setShowEduForm(true);
              }}
              onDelete={() =>
                setEducation((e) => e.filter((_, idx) => idx !== i))
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
