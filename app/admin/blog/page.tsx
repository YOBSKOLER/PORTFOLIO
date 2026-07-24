"use client";
import { useState, useEffect, useRef } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, Upload } from "lucide-react";

type Post = {
  _id?: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  published: boolean;
  readTime: number;
  slug?: string;
};

type PostForm = {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string;
  published: boolean;
  readTime: number;
};

const emptyForm: PostForm = {
  title: "",
  excerpt: "",
  content: "",
  coverImage: "",
  tags: "",
  published: false,
  readTime: 5,
};

export default function AdminBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<PostForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: Post[]) => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Posts error:", err);
        setPosts([]);
        setLoading(false);
      });
  }, []);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setForm((f) => ({ ...f, coverImage: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const save = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    const data = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    if (editing) {
      await fetch(`/api/posts/${editing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    const updated: Post[] = await fetch("/api/posts").then((r) => r.json());
    setPosts(updated);
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
    setSaving(false);
  };

  const del = async (id: string) => {
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    setPosts((p) => p.filter((x) => x._id !== id));
  };

  const togglePublish = async (post: Post) => {
    await fetch(`/api/posts/${post._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !post.published }),
    });
    setPosts((p) =>
      p.map((x) =>
        x._id === post._id ? { ...x, published: !x.published } : x,
      ),
    );
  };

  const edit = (post: Post) => {
    setForm({ ...post, tags: post.tags.join(", ") });
    setEditing(post._id ?? null);
    setShowForm(true);
  };

  return (
    <div className="p-6 text-white space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blog</h1>
          <p className="text-slate-400 text-sm mt-1">
            {posts.filter((p) => p.published).length} publié(s) ·{" "}
            {posts.filter((p) => !p.published).length} brouillon(s)
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
            setForm(emptyForm);
          }}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          <Plus size={16} /> Nouvel article
        </button>
      </div>

      {showForm && (
        <div className="bg-[#111827] border border-slate-700 rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-lg">
            {editing ? "Modifier" : "Nouvel"} article
          </h2>

          {/* Cover image */}
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-slate-600 hover:border-violet-500 rounded-xl p-4 cursor-pointer transition flex flex-col items-center gap-2 h-40 justify-center"
          >
            {form.coverImage ? (
              <img
                src={form.coverImage}
                alt="cover"
                className="h-full object-cover rounded-lg w-full"
              />
            ) : (
              <>
                <Upload size={24} className="text-slate-500" />
                <p className="text-slate-500 text-sm">Image de couverture</p>
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
            <div className="sm:col-span-2">
              <label className="text-sm text-slate-400 mb-1 block">
                Titre *
              </label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Mon article sur Next.js..."
                className="w-full bg-[#0a0e1a] border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-slate-400 mb-1 block">
                Résumé
              </label>
              <input
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="Une courte description de l'article..."
                className="w-full bg-[#0a0e1a] border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">
                Tags (virgule)
              </label>
              <input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="Next.js, React, TypeScript"
                className="w-full bg-[#0a0e1a] border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">
                Temps de lecture (min)
              </label>
              <input
                type="number"
                value={form.readTime}
                onChange={(e) =>
                  setForm({ ...form, readTime: parseInt(e.target.value) || 5 })
                }
                className="w-full bg-[#0a0e1a] border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-400 mb-1 block">
              Contenu (HTML ou texte)
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={12}
              placeholder="<h2>Introduction</h2><p>Mon article commence ici...</p>"
              className="w-full bg-[#0a0e1a] border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500 resize-none font-mono"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                setForm((f) => ({ ...f, published: !f.published }))
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition border ${
                form.published
                  ? "bg-green-500/20 text-green-400 border-green-500/40"
                  : "bg-slate-700 text-slate-400 border-slate-600"
              }`}
            >
              {form.published ? (
                <>
                  <Eye size={14} /> Publié
                </>
              ) : (
                <>
                  <EyeOff size={14} /> Brouillon
                </>
              )}
            </button>

            <div className="flex gap-3 ml-auto">
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
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center text-slate-500 py-20">
          Aucun article. Crée ton premier article !
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-[#111827] border border-slate-800 rounded-xl p-5 flex items-start gap-4"
            >
              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-20 h-16 object-cover rounded-lg shrink-0 hidden sm:block"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-white truncate">
                    {post.title}
                  </h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                      post.published
                        ? "bg-green-500/20 text-green-400"
                        : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {post.published ? "Publié" : "Brouillon"}
                  </span>
                </div>
                <p className="text-slate-400 text-xs line-clamp-1 mb-2">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 bg-violet-500/20 rounded text-violet-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => togglePublish(post)}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition"
                  >
                    {post.published ? (
                      <>
                        <EyeOff size={12} /> Dépublier
                      </>
                    ) : (
                      <>
                        <Eye size={12} /> Publier
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => edit(post)}
                    className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition"
                  >
                    <Pencil size={12} /> Modifier
                  </button>
                  <button
                    onClick={() => post._id && del(post._id)}
                    className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition"
                  >
                    <Trash2 size={12} /> Supprimer
                  </button>
                  {post.published && post.slug && (
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition ml-auto"
                    >
                      Voir l&apos;article →
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
