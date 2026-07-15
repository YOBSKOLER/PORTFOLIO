"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2, Lock, Unlock } from "lucide-react";
import { skillsData as initSkills } from "@/lib/data";

type Skill = { name: string; icon: string; unlocked: boolean };
type Category = {
  category: string;
  color: string;
  icon: string;
  skills: Skill[];
};

export default function AdminSkills() {
  const [categories, setCategories] = useState<Category[]>(
    initSkills as Category[],
  );
  const [selectedCat, setSelectedCat] = useState(0);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<number | null>(null);
  const [skillForm, setSkillForm] = useState({
    name: "",
    icon: "",
    unlocked: true,
  });

  const cat = categories[selectedCat];

  const saveSkill = () => {
    setCategories((cats) =>
      cats.map((c, i) => {
        if (i !== selectedCat) return c;
        const skills =
          editingSkill !== null
            ? c.skills.map((s, si) => (si === editingSkill ? skillForm : s))
            : [...c.skills, skillForm];
        return { ...c, skills };
      }),
    );
    setShowSkillForm(false);
    setEditingSkill(null);
    setSkillForm({ name: "", icon: "", unlocked: true });
  };

  const deleteSkill = (si: number) => {
    setCategories((cats) =>
      cats.map((c, i) =>
        i !== selectedCat
          ? c
          : { ...c, skills: c.skills.filter((_, idx) => idx !== si) },
      ),
    );
  };

  const toggleUnlock = (si: number) => {
    setCategories((cats) =>
      cats.map((c, i) =>
        i !== selectedCat
          ? c
          : {
              ...c,
              skills: c.skills.map((s, idx) =>
                idx === si ? { ...s, unlocked: !s.unlocked } : s,
              ),
            },
      ),
    );
  };

  const editSkill = (si: number) => {
    setSkillForm(cat.skills[si]);
    setEditingSkill(si);
    setShowSkillForm(true);
  };

  return (
    <div className="p-6 text-white space-y-6">
      <h1 className="text-2xl font-bold">Skills</h1>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c, i) => (
          <button
            key={c.category}
            onClick={() => setSelectedCat(i)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition border"
            style={
              selectedCat === i
                ? { background: c.color, borderColor: c.color, color: "#fff" }
                : {
                    borderColor: c.color + "40",
                    color: c.color,
                    background: c.color + "10",
                  }
            }
          >
            {c.category}
          </button>
        ))}
      </div>

      {/* Skills list */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg" style={{ color: cat.color }}>
            {cat.category}
          </h2>
          <button
            onClick={() => {
              setShowSkillForm(true);
              setEditingSkill(null);
            }}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-3 py-2 rounded-xl text-sm font-medium transition"
          >
            <Plus size={15} /> Ajouter un skill
          </button>
        </div>

        {/* Skill form */}
        {showSkillForm && (
          <div className="bg-[#0a0e1a] border border-slate-700 rounded-xl p-4 space-y-3">
            <h3 className="font-semibold">
              {editingSkill !== null ? "Modifier" : "Nouveau"} skill
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Nom</label>
                <input
                  value={skillForm.name}
                  onChange={(e) =>
                    setSkillForm({ ...skillForm, name: e.target.value })
                  }
                  className="w-full bg-[#111827] border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">
                  URL Icon (devicons)
                </label>
                <input
                  value={skillForm.icon}
                  onChange={(e) =>
                    setSkillForm({ ...skillForm, icon: e.target.value })
                  }
                  placeholder="https://cdn.jsdelivr.net/gh/devicons/..."
                  className="w-full bg-[#111827] border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            {/* Preview icon */}
            {skillForm.icon && (
              <div className="flex items-center gap-2">
                <img
                  src={skillForm.icon}
                  alt="preview"
                  className="w-8 h-8 object-contain"
                />
                <span className="text-xs text-slate-400">Preview</span>
              </div>
            )}

            <div className="flex items-center gap-3">
              <label className="text-sm text-slate-400">Maîtrisé ?</label>
              <button
                onClick={() =>
                  setSkillForm({ ...skillForm, unlocked: !skillForm.unlocked })
                }
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${skillForm.unlocked ? "bg-green-500/20 text-green-400 border border-green-500/40" : "bg-slate-700 text-slate-400 border border-slate-600"}`}
              >
                {skillForm.unlocked ? (
                  <>
                    <Unlock size={12} /> Maîtrisé
                  </>
                ) : (
                  <>
                    <Lock size={12} /> En apprentissage
                  </>
                )}
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={saveSkill}
                className="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-xl text-sm font-medium transition"
              >
                Sauvegarder
              </button>
              <button
                onClick={() => {
                  setShowSkillForm(false);
                  setEditingSkill(null);
                }}
                className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-xl text-sm font-medium transition"
              >
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {cat.skills.map((skill, si) => (
            <div
              key={si}
              className={`flex items-center gap-3 p-3 rounded-xl border transition ${skill.unlocked ? "border-slate-700 bg-slate-800/30" : "border-slate-700/30 bg-slate-800/10 opacity-60"}`}
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className={`w-7 h-7 object-contain shrink-0 ${!skill.unlocked ? "grayscale" : ""}`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {skill.name}
                </p>
                <p className="text-xs text-slate-500">
                  {skill.unlocked ? "✅ Maîtrisé" : "🔒 En apprentissage"}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => toggleUnlock(si)}
                  title={skill.unlocked ? "Verrouiller" : "Déverrouiller"}
                  className="p-1.5 rounded-lg hover:bg-slate-700 transition text-slate-400 hover:text-white"
                >
                  {skill.unlocked ? <Unlock size={13} /> : <Lock size={13} />}
                </button>
                <button
                  onClick={() => editSkill(si)}
                  className="p-1.5 rounded-lg hover:bg-slate-700 transition text-violet-400 hover:text-violet-300"
                >
                  <Pencil size={13} />
                </button>
                <button
                  onClick={() => deleteSkill(si)}
                  className="p-1.5 rounded-lg hover:bg-slate-700 transition text-red-400 hover:text-red-300"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
