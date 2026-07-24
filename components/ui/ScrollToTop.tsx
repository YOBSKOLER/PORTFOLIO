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
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
      setVisible(scrollTop > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Retour en haut"
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center transition-all duration-500 group ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      {/* Progress ring */}
      <svg
        className="absolute inset-0 w-14 h-14 -rotate-90"
        viewBox="0 0 56 56"
      >
        {/* Track */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="rgba(124,58,237,0.2)"
          strokeWidth="2.5"
        />
        {/* Progress */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="#7c3aed"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-100"
        />
      </svg>

      {/* Button bg */}
      <div className="absolute inset-1.5 rounded-full bg-[#0a0e1a] border border-violet-500/40 group-hover:bg-violet-600/20 group-hover:border-violet-400 transition-all duration-300" />

      {/* Arrow */}
      <ArrowUp
        size={18}
        className="relative z-10 text-violet-400 group-hover:text-white group-hover:-translate-y-0.5 transition-all duration-300"
      />
    </button>
  );
}
