import Link from "next/link";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import { Calendar, Clock, Tag } from "lucide-react";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#0a0e1a] text-white relative">
      <ParticlesBackground />
      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Mon <span className="text-violet-400">Blog</span>
          </h1>
          <p className="text-slate-400">
            Mes articles sur le développement web, mobile et la tech en Afrique
          </p>
        </div>
        <div className="text-center text-slate-500 py-20">
          <p className="text-xl mb-2">Aucun article pour le moment.</p>
          <p className="text-sm">Reviens bientôt !</p>
          <Link
            href="/"
            className="mt-6 inline-block text-violet-400 hover:text-violet-300 transition"
          >
            ← Retour au portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}
