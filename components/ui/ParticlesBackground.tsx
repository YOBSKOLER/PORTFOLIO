"use client";
import { useEffect, useRef } from "react";

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Détecte mobile
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 30 : 100;
    const LINK_DISTANCE = 200;
    const SPEED = isMobile ? 0.4 : 0.9;
    const MOUSE_ENABLED = !isMobile;

    let animId: number;
    let particles: Particle[] = [];
    let mouse = { x: -999, y: -999 };
    let frameCount = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * (canvas?.width ?? 800);
        this.y = Math.random() * (canvas?.height ?? 600);
        this.vx = (Math.random() - 0.5) * SPEED;
        this.vy = (Math.random() - 0.5) * SPEED;
        this.r = Math.random() * 1.5 + 1;
        this.opacity = Math.random() * 1.3 + 1.2;
      }

      update() {
        if (!canvas) return;

        // Attraction souris uniquement sur desktop
        if (MOUSE_ENABLED && mouse.x > 0) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            this.vx += dx * 0.001;
            this.vy += dy * 0.001;
          }
        }

        // Limite vitesse
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > 1.95) {
          this.vx = (this.vx / speed) * 1.5;
          this.vy = (this.vy / speed) * 1.5;
        }

        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
        if (!isMobile) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = "rgba(139, 92, 246, 0.6)";
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function drawLines() {
      // Sur mobile : on ne calcule les lignes qu'une frame sur 2
      if (isMobile && frameCount % 2 !== 0) return;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          // Évite Math.sqrt — utilise distance² pour filtrer d'abord
          const distSq = dx * dx + dy * dy;
          const maxSq = LINK_DISTANCE * LINK_DISTANCE;
          if (distSq < maxSq) {
            const dist = Math.sqrt(distSq);
            const opacity = (1 - dist / LINK_DISTANCE) * 0.7;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx!.lineWidth = 0.8;
            ctx!.stroke();
          }
        }

        // Lignes vers souris — desktop uniquement
        if (MOUSE_ENABLED && mouse.x > 0) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 150 * 150) {
            const dist = Math.sqrt(distSq);
            const opacity = (1 - dist / 160) * 0.7;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(mouse.x, mouse.y);
            ctx!.strokeStyle = `rgba(167, 139, 250, ${opacity})`;
            ctx!.lineWidth = 0.8;
            ctx!.stroke();
          }
        }
      }
    }

    function init() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    }

    function animate() {
      if (!ctx || !canvas) return;
      frameCount++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      drawLines();
      animId = requestAnimationFrame(animate);
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!MOUSE_ENABLED) return;
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => {
      mouse = { x: -999, y: -999 };
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        init();
      }, 200);
    };

    resize();
    init();
    animate();

    if (MOUSE_ENABLED) {
      canvas.addEventListener("mousemove", onMouseMove);
      canvas.addEventListener("mouseleave", onMouseLeave);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
