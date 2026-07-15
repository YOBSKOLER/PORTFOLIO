"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (password === "admin123") {
      // Cookie à la place de localStorage
      document.cookie = "admin_auth=true; path=/; max-age=86400";
      router.push("/admin");
    } else {
      setError("Mot de passe incorrect");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-[#111827] border border-slate-700 rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-violet-400 mb-1">YOBS.K</div>
          <p className="text-slate-400 text-sm">Dashboard Administration</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-400 mb-2 block">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="••••••••"
              className="w-full bg-[#0a0e1a] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition"
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg font-medium transition"
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
}
