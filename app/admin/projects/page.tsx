"use client";
import { useState, useEffect, useRef } from "react";
import { Plus, Pencil, Trash2, ExternalLink, Upload } from "lucide-react";

type Project = {
  _id?: string;
  title: string;
  category: string;
  categoryColor: string;
  bgColor: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
  type: "personal" | "professional";
};

type ProjectForm = {
  title: string;
  category: string;
  categoryColor: string;
  bgColor: string;
  description: string;
  tags: string;
  link: string;
  image: string;
  type: "personal" | "professional";
};

const emptyForm: ProjectForm = {
  title: "",
  category: "",
  categoryColor: "#7c3aed",
  bgColor: "from-violet-600 to-purple-800",
  description: "",
  tags: "",
  link: "",
  image: "",
  type: "professional",
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data: Project[]) => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setForm((f) => ({ ...f, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const save = async () => {
    setSaving(true);
    const data = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    if (editing) {
      await fetch(`/api/projects/${editing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    const updated: Project[] = await fetch("/api/projects").then((r) =>
      r.json(),
    );
    setProjects(updated);
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
    setSaving(false);
  };

  const del = async (id: string) => {
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects((p) => p.filter((x) => x._id !== id));
  };

  const edit = (p: Project) => {
    setForm({ ...p, tags: p.tags.join(", ") });
    setEditing(p._id ?? null);
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
            setForm(emptyForm);
          }}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          <Plus size={16} /> Ajouter
        </button>
      </div>

      {showForm && (
        <div className="bg-[#111827] border border-slate-700 rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-lg">
            {editing ? "Modifier" : "Nouveau"} projet
          </h2>

          <div className="flex gap-3">
            {(["professional", "personal"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setForm({ ...form, type })}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition border ${
                  form.type === type
                    ? "bg-violet-600 border-violet-600 text-white"
                    : "border-slate-600 text-slate-400"
                }`}
              >
                {type === "professional" ? "Professionnel" : "Personnel"}
              </button>
            ))}
          </div>

          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-slate-600 hover:border-violet-500 rounded-xl p-6 cursor-pointer transition flex flex-col items-center gap-3"
          >
            {form.image ? (
              <img
                src={form.image}
                alt="preview"
                className="w-full max-h-40 object-cover rounded-lg"
              />
            ) : (
              <>
                <Upload size={28} className="text-slate-500" />
                <p className="text-slate-500 text-sm">Image du projet</p>
              </>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(["title", "category", "link", "tags"] as const).map((key) => (
              <div key={key}>
                <label className="text-sm text-slate-400 mb-1 block">
                  {key === "tags"
                    ? "Tags (virgule)"
                    : key === "link"
                      ? "Lien"
                      : key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full bg-[#0a0e1a] border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
                />
              </div>
            ))}
            <div>
              <label className="text-sm text-slate-400 mb-1 block">
                Couleur
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={form.categoryColor}
                  onChange={(e) =>
                    setForm({ ...form, categoryColor: e.target.value })
                  }
                  className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent"
                />
                <span className="text-slate-400 text-sm">
                  {form.categoryColor}
                </span>
              </div>
            </div>
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
              disabled={saving}
              className="bg-violet-600 hover:bg-violet-700 disabled:opacity-60 px-6 py-2 rounded-xl text-sm font-medium transition"
            >
              {saving ? "Sauvegarde..." : "Sauvegarder"}
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

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div
              key={p._id}
              className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden"
            >
              <div
                className={`h-36 ${!p.image ? `bg-gradient-to-br ${p.bgColor}` : ""} relative`}
              >
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Upload size={36} className="text-white/30" />
                  </div>
                )}
                <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full bg-black/40 text-white">
                  {p.type === "professional" ? "Pro" : "Perso"}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-white">{p.title}</h3>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full shrink-0"
                    style={{
                      color: p.categoryColor,
                      background: p.categoryColor + "20",
                    }}
                  >
                    {p.category}
                  </span>
                </div>
                <p className="text-slate-400 text-xs line-clamp-2">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {p.tags.map((t) => (
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
                    onClick={() => edit(p)}
                    className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition"
                  >
                    <Pencil size={12} /> Modifier
                  </button>
                  <button
                    onClick={() => p._id && del(p._id)}
                    className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition"
                  >
                    <Trash2 size={12} /> Supprimer
                  </button>
                  {p.link && p.link !== "#" && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition ml-auto"
                    >
                      <ExternalLink size={12} /> Voir
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
