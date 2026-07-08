"use client";
import { useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";

export function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initializeParticles = async () => {
      await loadSlim(tsParticles);
      if (mounted) {
        setInit(true);
      }
    };

    void initializeParticles();

    return () => {
      mounted = false;
    };
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        particles: {
          number: {
            value: 80,
            density: { enable: true, width: 800, height: 800 },
          },
          color: { value: "#7c3aed" },
          links: {
            enable: true,
            color: "#7c3aed",
            distance: 150,
            opacity: 0.3,
            width: 1,
          },
          move: { enable: true, speed: 0.8, outModes: { default: "bounce" } },
          opacity: { value: 0.5 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            grab: { distance: 140, links: { opacity: 0.8 } },
            push: { quantity: 4 },
          },
        },
      }}
      className="absolute inset-0 -z-10 h-full w-full"
    />
  );
}
