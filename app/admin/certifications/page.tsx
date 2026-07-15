"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2, Award } from "lucide-react";
import { certifications as initCerts } from "@/lib/data";

export default function AdminCertifications() {
  const [certs, setCerts] = useState(initCerts);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    issuer: "",
    date: "",
    link: "",
    color: "#7c3aed",
    logo: "",
  });

  const save = () => {
    if (editing !== null) {
      setCerts((c) => c.map((cert, i) => (i === editing ? form : cert)));
    } else {
      setCerts((c) => [...c, form]);
    }
    setShowForm(false);
    setEditing(null);
    setForm({
      title: "",
      issuer: "",
      date: "",
      link: "",
      color: "#7c3aed",
      logo: "",
    });
  };

  return (
    <div className="p-6 text-white space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Certifications</h1>
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

      {showForm && (
        <div className="bg-[#111827] border border-slate-700 rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-lg">
            {editing !== null ? "Modifier" : "Nouvelle"} certification
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: "title", label: "Titre" },
              { key: "issuer", label: "Organisme" },
              { key: "date", label: "Date" },
              { key: "link", label: "Lien" },
              { key: "logo", label: "URL Logo" },
              { key: "color", label: "Couleur (hex)" },
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certs.map((cert, i) => (
          <div
            key={i}
            className="bg-[#111827] border border-slate-800 rounded-2xl p-5 flex items-start gap-4"
          >
            <div
              className="p-3 rounded-xl shrink-0"
              style={{ background: cert.color + "20" }}
            >
              {cert.logo ? (
                <img
                  src={cert.logo}
                  alt={cert.issuer}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <Award size={24} style={{ color: cert.color }} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-medium mb-1"
                style={{ color: cert.color }}
              >
                {cert.issuer}
              </p>
              <h3 className="font-bold text-sm text-white truncate">
                {cert.title}
              </h3>
              <p className="text-slate-500 text-xs mt-1">{cert.date}</p>
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => {
                    setForm(cert as any);
                    setEditing(i);
                    setShowForm(true);
                  }}
                  className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 transition"
                >
                  <Pencil size={12} /> Modifier
                </button>
                <button
                  onClick={() =>
                    setCerts((c) => c.filter((_, idx) => idx !== i))
                  }
                  className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition"
                >
                  <Trash2 size={12} /> Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
