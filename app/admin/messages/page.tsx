"use client";
import { useState, useEffect } from "react";
import { Trash2, Mail, RefreshCw } from "lucide-react";

type Message = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
};

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

  const loadMessages = () => {
    setLoading(true);
    fetch("/api/messages")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: Message[]) => {
        setMessages(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Messages error:", err);
        setMessages([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const del = async (id: string) => {
    await fetch(`/api/messages/${id}`, { method: "DELETE" });
    setMessages((m) => m.filter((msg) => msg._id !== id));
    if (selected?._id === id) setSelected(null);
  };

  const markRead = async (msg: Message) => {
    if (!msg.read) {
      await fetch(`/api/messages/${msg._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
      setMessages((m) =>
        m.map((x) => (x._id === msg._id ? { ...x, read: true } : x)),
      );
    }
    setSelected({ ...msg, read: true });
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="p-6 text-white space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          {unread > 0 && (
            <span className="text-sm text-violet-400 font-medium">
              {unread} non lu{unread > 1 ? "s" : ""}
            </span>
          )}
        </div>
        <button
          onClick={loadMessages}
          className="flex items-center gap-2 border border-slate-700 hover:border-violet-500 px-3 py-2 rounded-xl text-sm text-slate-400 hover:text-white transition"
        >
          <RefreshCw size={14} /> Actualiser
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-slate-500 py-12">
                Aucun message
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg._id}
                onClick={() => markRead(msg)}
                className={`bg-[#111827] border rounded-xl p-4 cursor-pointer transition ${
                  selected?._id === msg._id
                    ? "border-violet-500"
                    : msg.read
                      ? "border-slate-800"
                      : "border-violet-500/40"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    {!msg.read && (
                      <span className="w-2 h-2 rounded-full bg-violet-400 shrink-0" />
                    )}
                    <span className="font-semibold text-sm">{msg.name}</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {new Date(msg.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <p className="text-slate-400 text-xs">{msg.email}</p>
                <p className="text-slate-300 text-sm mt-1 line-clamp-1">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>

          {selected ? (
            <div className="bg-[#111827] border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg">{selected.name}</h2>
                <button
                  onClick={() => del(selected._id)}
                  className="text-red-400 hover:text-red-300 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail size={14} />
                <a
                  href={`mailto:${selected.email}`}
                  className="hover:text-violet-400 transition"
                >
                  {selected.email}
                </a>
              </div>
              <p className="text-sm text-slate-500">
                {new Date(selected.createdAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selected.message}
                </p>
              </div>
              <a
                href={`mailto:${selected.email}`}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-xl text-sm font-medium transition w-fit"
              >
                <Mail size={14} /> Répondre
              </a>
            </div>
          ) : (
            <div className="bg-[#111827] border border-slate-800 rounded-xl p-6 flex items-center justify-center text-slate-500">
              Sélectionne un message
            </div>
          )}
        </div>
      )}
    </div>
  );
}
