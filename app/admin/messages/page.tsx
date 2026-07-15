"use client";
import { useState } from "react";
import { Trash2, Mail } from "lucide-react";

const mockMessages = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    message: "Bonjour, j'aimerais discuter d'un projet avec vous.",
    date: "2026-07-10",
    read: false,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    message: "Votre portfolio est impressionnant !",
    date: "2026-07-08",
    read: true,
  },
];

export default function AdminMessages() {
  const [messages, setMessages] = useState(mockMessages);
  const [selected, setSelected] = useState<any>(null);

  const del = (id: number) => {
    setMessages((m) => m.filter((msg) => msg.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const markRead = (id: number) => {
    setMessages((m) =>
      m.map((msg) => (msg.id === id ? { ...msg, read: true } : msg)),
    );
  };

  return (
    <div className="p-6 text-white space-y-6">
      <h1 className="text-2xl font-bold">Messages</h1>
      <p className="text-slate-400 text-sm">
        {messages.filter((m) => !m.read).length} non lu(s)
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="space-y-3">
          {messages.length === 0 && (
            <div className="text-center text-slate-500 py-12">
              Aucun message
            </div>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => {
                setSelected(msg);
                markRead(msg.id);
              }}
              className={`bg-[#111827] border rounded-xl p-4 cursor-pointer transition ${
                selected?.id === msg.id
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
                <span className="text-xs text-slate-500">{msg.date}</span>
              </div>
              <p className="text-slate-400 text-xs">{msg.email}</p>
              <p className="text-slate-300 text-sm mt-1 line-clamp-1">
                {msg.message}
              </p>
            </div>
          ))}
        </div>

        {/* Detail */}
        {selected ? (
          <div className="bg-[#111827] border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg">{selected.name}</h2>
              <button
                onClick={() => del(selected.id)}
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
            <p className="text-sm text-slate-500">{selected.date}</p>
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
    </div>
  );
}
