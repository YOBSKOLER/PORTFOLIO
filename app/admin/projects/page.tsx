"use client";
import { useState, useRef } from "react";
import { Plus, Pencil, Trash2, Award, Upload } from "lucide-react";
import { certifications as initCerts } from "@/lib/data";

type Cert = {
  title: string;
  issuer: string;
  date: string;
  link: string;
  color: string;
  logo: string;
  image: string;
};

const emptyCert: Cert = {
  title: "",
  issuer: "",
  date: "",
  link: "",
  color: "#7c3aed",
  logo: "",
  image: "",
};

export default function AdminCertifications() {
  const [certs, setCerts] = useState<Cert[]>(
    initCerts.map((c) => ({
      ...c,
      image: "",
      logo: c.logo ?? "",
      link: c.link ?? "",
    })),
  );
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState<Cert>(emptyCert);
  const fileRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "image" | "logo",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setForm((f) => ({ ...f, [field]: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const save = () => {
    if (editing !== null) {
      setCerts((c) => c.map((cert, i) => (i === editing ? form : cert)));
    } else {
      setCerts((c) => [...c, form]);
    }
    setShowForm(false);
    setEditing(null);
    setForm(emptyCert);
  };

  const edit = (i: number) => {
    setForm(certs[i]);
    setEditing(i);
    setShowForm(true);
  };

  return (
    <div className="p-6 text-white space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Certifications</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
            setForm(emptyCert);
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
            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Image de la certification
              </label>
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-slate-600 hover:border-violet-500 rounded-xl p-4 cursor-pointer transition flex flex-col items-center gap-2 h-28 justify-center"
              >
                {form.image ? (
                  <img
                    src={form.image}
                    alt="preview"
                    className="h-full object-contain rounded"
                  />
                ) : (
                  <>
                    <Upload size={22} className="text-slate-500" />
                    <p className="text-slate-500 text-xs">
                      Image du certificat
                    </p>
                  </>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFile(e, "image")}
                className="hidden"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Logo de l&apos;organisme
              </label>
              <div
                onClick={() => logoRef.current?.click()}
                className="border-2 border-dashed border-slate-600 hover:border-violet-500 rounded-xl p-4 cursor-pointer transition flex flex-col items-center gap-2 h-28 justify-center"
              >
                {form.logo ? (
                  <img
                    src={form.logo}
                    alt="logo"
                    className="h-full object-contain rounded"
                  />
                ) : (
                  <>
                    <Upload size={22} className="text-slate-500" />
                    <p className="text-slate-500 text-xs">Logo organisme</p>
                  </>
                )}
              </div>
              <input
                ref={logoRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFile(e, "logo")}
                className="hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(["title", "issuer", "date", "link"] as const).map((key) => (
              <div key={key}>
                <label className="text-sm text-slate-400 mb-1 block">
                  {key === "title"
                    ? "Titre"
                    : key === "issuer"
                      ? "Organisme"
                      : key === "date"
                        ? "Date"
                        : "Lien de vérification"}
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
                  value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                  className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent"
                />
                <span className="text-slate-400 text-sm">{form.color}</span>
              </div>
            </div>
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
            className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden"
          >
            {cert.image && (
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-36 object-cover"
              />
            )}
            <div className="p-5 flex items-start gap-3">
              <div
                className="p-2 rounded-xl shrink-0"
                style={{ background: cert.color + "20" }}
              >
                {cert.logo ? (
                  <img
                    src={cert.logo}
                    alt={cert.issuer}
                    className="w-8 h-8 object-contain"
                  />
                ) : (
                  <Award size={22} style={{ color: cert.color }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs font-medium mb-1"
                  style={{ color: cert.color }}
                >
                  {cert.issuer}
                </p>
                <h3 className="font-bold text-sm text-white">{cert.title}</h3>
                <p className="text-slate-500 text-xs mt-1">{cert.date}</p>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => edit(i)}
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
          </div>
        ))}
      </div>
    </div>
  );
}
