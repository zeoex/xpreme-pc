"use client";
import { useEffect, useRef } from "react";

const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" +
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]|/\\=+-;:.,?!@#$%^&*";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const FS = 13;
    let animId: number;
    let drops: number[] = [];
    let speeds: number[] = [];
    let brightnesses: number[] = [];

    const init = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const cols = Math.floor(canvas.width / FS);
      drops        = Array.from({ length: cols }, () => Math.random() * -(canvas.height / FS));
      speeds       = Array.from({ length: cols }, () => 0.25 + Math.random() * 0.75);
      brightnesses = Array.from({ length: cols }, () => 20 + Math.random() * 30);
      ctx.font = `${FS}px "Courier New", monospace`;
    };

    init();

    const rnd = () => CHARS[Math.floor(Math.random() * CHARS.length)];

    const draw = () => {
      /* Fade claro — fondo lavanda muy suave */
      ctx.fillStyle = "rgba(240,235,255,0.07)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const x   = i * FS;
        const hy  = drops[i] * FS;
        const L   = brightnesses[i]; // luminosidad baja = morado oscuro legible

        /* Cabeza: morado muy oscuro, casi negro-violeta */
        ctx.fillStyle = `hsla(263,90%,${L * 0.6}%,0.95)`;
        ctx.fillText(rnd(), x, hy);

        /* Rastro 1 */
        if (drops[i] > 1) {
          ctx.fillStyle = `hsla(263,80%,${L * 0.8}%,0.75)`;
          ctx.fillText(rnd(), x, hy - FS);
        }
        /* Rastro 2 */
        if (drops[i] > 2) {
          ctx.fillStyle = `hsla(263,70%,${L}%,0.5)`;
          ctx.fillText(rnd(), x, hy - FS * 2);
        }
        /* Rastro 3 */
        if (drops[i] > 4) {
          ctx.fillStyle = `hsla(263,60%,${L * 1.3}%,0.25)`;
          ctx.fillText(rnd(), x, hy - FS * 4);
        }

        drops[i] += speeds[i];
        if (drops[i] * FS > canvas.height + 50 && Math.random() > 0.975) {
          drops[i]        = Math.random() * -(canvas.height / FS / 2);
          speeds[i]       = 0.25 + Math.random() * 0.75;
          brightnesses[i] = 20 + Math.random() * 30;
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    window.addEventListener("resize", init);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", init); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.65, zIndex: 0 }}
    />
  );
}
