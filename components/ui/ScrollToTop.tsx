"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct =
        docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      setProgress(pct);
      setVisible(scrollTop > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // calcul initial
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const size = 56;
  const center = size / 2;
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Retour en haut"
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      {/* SVG container — par dessus tout */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 -rotate-90"
        style={{ zIndex: 20 }}
      >
        {/* Track gris */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(124,58,237,0.15)"
          strokeWidth="3"
        />
        {/* Progression violette */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#7c3aed"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 0.1s ease" }}
        />
        {/* Progression - couleur vive en bout */}
        {progress > 2 && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#a78bfa"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`2 ${circumference - 2}`}
            strokeDashoffset={strokeDashoffset + 1}
            style={{
              filter: "drop-shadow(0 0 4px #a78bfa)",
              transition: "stroke-dashoffset 0.1s ease",
            }}
          />
        )}
      </svg>

      {/* Glow externe pulsant */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)`,
          filter: "blur(6px)",
          transform: "scale(1.5)",
          zIndex: 1,
        }}
      />

      {/* Fond du bouton */}
      <div
        className="absolute rounded-full bg-[#0d1225] border border-violet-500/40"
        style={{
          inset: "4px",
          zIndex: 10,
          boxShadow: `0 0 ${6 + (progress / 100) * 12}px rgba(124,58,237,${0.3 + (progress / 100) * 0.4})`,
        }}
      />

      {/* Flèche */}
      <ArrowUp
        size={16}
        className="relative text-violet-400"
        style={{
          zIndex: 30,
          filter: `drop-shadow(0 0 4px rgba(167,139,250,0.9))`,
        }}
      />
    </button>
  );
}
