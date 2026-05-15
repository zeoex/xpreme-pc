"use client";
import { useEffect, useRef } from "react";

const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" +
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]|/\\=+-;:.,?!@#$%^&*";

/* Paleta de colores por columna — azul eléctrico / cian / teal */
const PALETTE = [
  "199,95%", // sky blue
  "180,85%", // cyan
  "210,85%", // cool blue
  "170,80%", // teal
  "195,90%", // azure
];

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const FS = 14;
    let animId: number;
    let drops: number[]   = [];
    let speeds: number[]  = [];
    let colors: string[]  = [];

    const init = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cols = Math.floor(canvas.width / FS);
      drops  = Array.from({ length: cols }, () => Math.random() * -(canvas.height / FS));
      speeds = Array.from({ length: cols }, () => 0.3 + Math.random() * 0.9);
      colors = Array.from({ length: cols }, () => PALETTE[Math.floor(Math.random() * PALETTE.length)]);
      ctx.font = `bold ${FS}px "Courier New", monospace`;
    };

    init();

    const rnd = () => CHARS[Math.floor(Math.random() * CHARS.length)];

    const draw = () => {
      /* Fade lento — rastro largo y visible */
      ctx.fillStyle = "rgba(8,10,24,0.045)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const x    = i * FS;
        const hy   = drops[i] * FS;
        const hue  = colors[i];

        /* Cabeza: blanco puro, siempre brillante */
        ctx.fillStyle = "rgba(230,248,255,1)";
        ctx.fillText(rnd(), x, hy);

        /* Rastro 1 — color brillante */
        if (drops[i] > 1) {
          ctx.fillStyle = `hsla(${hue},75%,0.95)`;
          ctx.fillText(rnd(), x, hy - FS);
        }
        /* Rastro 2 */
        if (drops[i] > 2) {
          ctx.fillStyle = `hsla(${hue},60%,0.75)`;
          ctx.fillText(rnd(), x, hy - FS * 2);
        }
        /* Rastro 3 */
        if (drops[i] > 3) {
          ctx.fillStyle = `hsla(${hue},45%,0.5)`;
          ctx.fillText(rnd(), x, hy - FS * 3);
        }
        /* Rastro 4 */
        if (drops[i] > 5) {
          ctx.fillStyle = `hsla(${hue},30%,0.3)`;
          ctx.fillText(rnd(), x, hy - FS * 5);
        }
        /* Rastro 5 — tenue */
        if (drops[i] > 8) {
          ctx.fillStyle = `hsla(${hue},18%,0.15)`;
          ctx.fillText(rnd(), x, hy - FS * 8);
        }

        drops[i] += speeds[i];

        if (drops[i] * FS > canvas.height + 80 && Math.random() > 0.97) {
          drops[i]  = Math.random() * -(canvas.height / FS / 2);
          speeds[i] = 0.3 + Math.random() * 0.9;
          colors[i] = PALETTE[Math.floor(Math.random() * PALETTE.length)];
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
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.9 }}
    />
  );
}
