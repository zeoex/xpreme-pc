"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Server, Code2, Wifi, Shield, Database } from "lucide-react";

const slides = [
  {
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&h=600&q=80&auto=format&fit=crop",
    tag: "Infraestructura",
    title: "Data Centers de alta disponibilidad",
    desc: "Diseñamos y gestionamos infraestructuras críticas con redundancia total y monitoreo 24/7.",
    icon: Server,
    accent: "hsl(263,80%,62%)",
  },
  {
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&h=600&q=80&auto=format&fit=crop",
    tag: "Hardware",
    title: "Diagnóstico y reparación especializada",
    desc: "Técnicos certificados con equipamiento profesional para cualquier componente o dispositivo.",
    icon: Database,
    accent: "hsl(263,80%,62%)",
  },
  {
    url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1400&h=600&q=80&auto=format&fit=crop",
    tag: "Desarrollo",
    title: "Software a medida para tu empresa",
    desc: "Aplicaciones web, sistemas de gestión y automatizaciones diseñadas para tus procesos.",
    icon: Code2,
    accent: "hsl(263,80%,62%)",
  },
  {
    url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1400&h=600&q=80&auto=format&fit=crop",
    tag: "Ciberseguridad",
    title: "Protección total de tu información",
    desc: "Soluciones de seguridad perimetral, backups automatizados y respuesta ante incidentes.",
    icon: Shield,
    accent: "hsl(263,80%,62%)",
  },
  {
    url: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=1400&h=600&q=80&auto=format&fit=crop",
    tag: "Redes",
    title: "Conectividad empresarial confiable",
    desc: "Instalación, configuración y soporte de redes cableadas e inalámbricas para pymes y corporaciones.",
    icon: Wifi,
    accent: "hsl(263,80%,62%)",
  },
];

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback(
    (idx: number, dir: "left" | "right") => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(idx);
        setAnimating(false);
      }, 400);
    },
    [animating]
  );

  const next = useCallback(() => go((current + 1) % slides.length, "right"), [current, go]);
  const prev = useCallback(() => go((current - 1 + slides.length) % slides.length, "left"), [current, go]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, paused, next]);

  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "520px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Slides ── */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          {/* Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.url}
            alt={s.title}
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
          {/* Gradient overlays */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(6,8,18,0.92) 0%, rgba(6,8,18,0.65) 55%, rgba(6,8,18,0.25) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(6,8,18,0.8) 0%, transparent 60%)",
            }}
          />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(hsla(263,80%,58%,0.07) 1px, transparent 1px), linear-gradient(90deg, hsla(263,80%,58%,0.07) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      ))}

      {/* ── Content overlay ── */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div
            className="max-w-xl"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating
                ? `translateX(${direction === "right" ? "-24px" : "24px"})`
                : "translateX(0)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            {/* Tag */}
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "hsla(263,80%,58%,0.2)", border: "1px solid hsla(263,80%,58%,0.4)" }}
              >
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <span
                className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ background: "hsla(263,80%,58%,0.15)", color: "hsl(263,80%,78%)", border: "1px solid hsla(263,80%,58%,0.3)" }}
              >
                {slide.tag}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              {slide.title}
            </h2>
            <p className="text-base text-white/70 leading-relaxed mb-6 max-w-md">
              {slide.desc}
            </p>

            {/* Slide counter */}
            <div className="text-xs text-white/40 font-mono">
              {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>

      {/* ── Arrows ── */}
      <button
        onClick={prev}
        aria-label="Anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        style={{ background: "rgba(6,8,18,0.65)", border: "1px solid hsla(263,80%,58%,0.3)", color: "white" }}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        aria-label="Siguiente"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        style={{ background: "rgba(6,8,18,0.65)", border: "1px solid hsla(263,80%,58%,0.3)", color: "white" }}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* ── Dots ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir a slide ${i + 1}`}
            onClick={() => go(i, i > current ? "right" : "left")}
            className="transition-all duration-300"
            style={{
              width: i === current ? "28px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: i === current ? "hsl(263,80%,62%)" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!paused && (
        <div className="absolute bottom-0 left-0 z-20 h-0.5 bg-primary/80" style={{ width: "0%", animation: "carouselProgress 5s linear forwards" }} />
      )}

      <style>{`
        @keyframes carouselProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
