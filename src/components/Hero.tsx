"use client";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowRight, Terminal, Cpu, Server, Shield } from "lucide-react";
import MatrixRain from "@/components/MatrixRain";

const words = ["Software", "Sistemas", "Redes", "Soluciones"];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % words.length);
        setVisible(true);
      }, 350);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ background: "hsl(270,40%,97%)" }}
    >
      {/* Matrix rain — morado oscuro sobre fondo claro */}
      <MatrixRain />

      {/* Glow sutil para profundidad */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 right-1/4 w-[500px] h-[400px] rounded-full blur-[130px]"
          style={{ background: "hsla(263,75%,55%,0.08)" }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[350px] h-[350px] rounded-full blur-[100px]"
          style={{ background: "hsla(24,94%,53%,0.06)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid lg:grid-cols-2 gap-12 items-center">

        {/* ── Left: texto ── */}
        <div className="animate-fade-up">
          <Badge
            className="mb-6 text-xs font-semibold px-3 py-1"
            style={{
              background: "hsla(263,75%,50%,0.1)",
              color: "hsl(263,75%,40%)",
              border: "1px solid hsla(263,75%,50%,0.35)",
            }}
          >
            Soluciones IT Profesionales
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6"
            style={{ color: "hsl(268,60%,10%)" }}>
            Soporte Técnico
            <br />
            &amp;{" "}
            <span
              className="transition-opacity duration-300"
              style={{ color: "hsl(263,75%,50%)", opacity: visible ? 1 : 0 }}
            >
              {words[wordIdx]}
            </span>
            <br />
            a medida
          </h1>

          <p className="text-lg leading-relaxed mb-8 max-w-lg" style={{ color: "hsl(268,30%,35%)" }}>
            En <strong style={{ color: "hsl(268,60%,10%)" }}>Xpreme PC</strong> resolvemos
            los problemas tecnológicos de tu empresa: desde mantenimiento de
            equipos hasta sistemas de gestión y desarrollo web personalizado.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contacto"
              className={cn(buttonVariants({ size: "lg" }), "bg-primary text-white hover:bg-primary/90 gap-2 shadow-lg")}
              style={{ boxShadow: "0 4px 20px hsla(263,75%,50%,0.35)" }}
            >
              Hablar con un técnico <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#servicios"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }), "border-primary/40 hover:bg-primary/5")}
              style={{ color: "hsl(263,75%,40%)" }}
            >
              Ver servicios
            </a>
          </div>

          {/* Stats */}
          <div
            className="flex flex-wrap gap-8 mt-12 pt-8"
            style={{ borderTop: "1px solid hsla(263,75%,50%,0.2)" }}
          >
            {[
              { value: "500+", label: "Clientes atendidos" },
              { value: "10+",  label: "Años de experiencia" },
              { value: "98%",  label: "Satisfacción" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold" style={{ color: "hsl(263,75%,50%)" }}>
                  {stat.value}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "hsl(268,18%,45%)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: terminal ── */}
        <div className="hidden lg:block animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="relative">
            {/* Terminal card */}
            <div
              className="rounded-xl overflow-hidden shadow-2xl"
              style={{
                background: "hsl(268,60%,8%)",
                border: "1px solid hsla(263,80%,55%,0.3)",
                boxShadow: "0 20px 60px hsla(263,75%,30%,0.25)",
              }}
            >
              {/* Bar */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ background: "hsl(268,55%,12%)", borderBottom: "1px solid hsla(263,80%,55%,0.2)" }}
              >
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
                <span className="ml-2 text-xs font-mono" style={{ color: "hsla(270,30%,95%,0.5)" }}>
                  xpreme-pc ~ terminal
                </span>
              </div>
              {/* Content */}
              <div className="p-5 font-mono text-sm space-y-2">
                <div style={{ color: "hsl(142,70%,60%)" }}>$ diagnose --system --full</div>
                <div style={{ color: "hsla(270,30%,95%,0.45)" }}>Analizando hardware...</div>
                <div style={{ color: "hsl(263,80%,75%)" }}>✓ CPU: OK (35°C)</div>
                <div style={{ color: "hsl(263,80%,75%)" }}>✓ RAM: 16GB disponible</div>
                <div style={{ color: "hsl(263,80%,75%)" }}>✓ Disco: 98% saludable</div>
                <div style={{ color: "hsl(263,80%,75%)" }}>✓ Red: 250 Mbps estable</div>
                <div style={{ color: "hsl(24,94%,65%)" }}>⚡ Optimizando servicios...</div>
                <div style={{ color: "hsl(142,70%,60%)" }}>✓ Sistema optimizado</div>
                <div className="flex items-center gap-1" style={{ color: "hsla(270,30%,95%,0.8)" }}>
                  <span>$</span>
                  <span className="cursor-blink">_</span>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div
              className="absolute -top-4 -right-4 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1"
              style={{ background: "hsl(263,75%,50%)", boxShadow: "0 4px 16px hsla(263,75%,50%,0.5)" }}
            >
              <Shield className="w-3 h-3" /> Soporte 24/7
            </div>
            <div
              className="absolute -bottom-4 -left-4 text-xs font-mono px-3 py-2 rounded-lg shadow-lg flex items-center gap-2"
              style={{
                background: "hsl(0,0%,100%)",
                border: "1px solid hsla(263,75%,50%,0.2)",
                color: "hsl(268,60%,10%)",
              }}
            >
              <Server className="w-4 h-4" style={{ color: "hsl(263,75%,50%)" }} />
              99.9% uptime
            </div>

            {/* Icon grid */}
            <div className="absolute top-1/2 -right-16 flex flex-col gap-3 -translate-y-1/2">
              {[Terminal, Cpu, Server].map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
                  style={{
                    background: "hsl(0,0%,100%)",
                    border: "1px solid hsla(263,75%,50%,0.2)",
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: "hsl(263,75%,50%)" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
