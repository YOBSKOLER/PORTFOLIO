"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { professionalProjects, personalProjects } from "@/lib/data";

export default function AdminProjects() {
  const [projects, setProjects] = useState([
    ...professionalProjects,
    ...personalProjects,
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    tags: "",
    link: "",
    bgColor: "from-violet-600 to-purple-800",
    categoryColor: "#7c3aed",
  });

  const save = () => {
    if (editing !== null) {
      setProjects((p) =>
        p.map((proj, i) =>
          i === editing
            ? { ...form, tags: form.tags.split(",").map((t) => t.trim()) }
            : proj,
        ),
      );
    } else {
      setProjects((p) => [
        ...p,
        { ...form, tags: form.tags.split(",").map((t) => t.trim()) },
      ]);
    }
    setShowForm(false);
    setEditing(null);
    setForm({
      title: "",
      category: "",
      description: "",
      tags: "",
      link: "",
      bgColor: "from-violet-600 to-purple-800",
      categoryColor: "#7c3aed",
    });
  };

  const del = (i: number) =>
    setProjects((p) => p.filter((_, idx) => idx !== i));

  const edit = (i: number) => {
    const p = projects[i];
    setForm({ ...p, tags: Array.isArray(p.tags) ? p.tags.join(", ") : p.tags });
    setEditing(i);
    setShowForm(true);
  };

  return (
    <div className="p-6 text-white space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projets</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
          }}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          <Plus size={16} /> Ajouter
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-[#111827] border border-slate-700 rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-lg">
            {editing !== null ? "Modifier" : "Nouveau"} projet
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: "title", label: "Titre" },
              { key: "category", label: "Catégorie" },
              { key: "link", label: "Lien" },
              { key: "tags", label: "Tags (séparés par virgule)" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="text-sm text-slate-400 mb-1 block">
                  {label}
                </label>
                <input
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full bg-[#0a0e1a] border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
                />
              </div>
            ))}
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={3}
              className="w-full bg-[#0a0e1a] border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500 resize-none"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={save}
              className="bg-violet-600 hover:bg-violet-700 px-6 py-2 rounded-xl text-sm font-medium transition"
            >
              Sauvegarder
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-xl text-sm font-medium transition"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p, i) => (
          <div
            key={i}
            className="bg-[#111827] border border-slate-800 rounded-2xl p-5 space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-white">{p.title}</h3>
              <span
                className="text-xs px-2 py-1 rounded-full shrink-0"
                style={{
                  color: p.categoryColor,
                  background: p.categoryColor + "20",
                }}
              >
                {p.category}
              </span>
            </div>
            <p className="text-slate-400 text-sm line-clamp-2">
              {p.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {(Array.isArray(p.tags) ? p.tags : []).map((t: string) => (
                <span
                  key={t}
                  className="text-xs px-2 py-0.5 bg-slate-800 rounded text-slate-400"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => edit(i)}
                className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition"
              >
                <Pencil size={13} /> Modifier
              </button>
              <button
                onClick={() => del(i)}
                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition"
              >
                <Trash2 size={13} /> Supprimer
              </button>
              {p.link && p.link !== "#" && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition ml-auto"
                >
                  <ExternalLink size={13} /> Voir
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
