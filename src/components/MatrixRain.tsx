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

    const FONT_SIZE = 13;
    let animId: number;
    let drops: number[] = [];
    let speeds: number[] = [];
    let brightnesses: number[] = [];

    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cols = Math.floor(canvas.width / FONT_SIZE);
      drops = Array.from({ length: cols }, () => Math.random() * -(canvas.height / FONT_SIZE));
      speeds = Array.from({ length: cols }, () => 0.25 + Math.random() * 0.75);
      brightnesses = Array.from({ length: cols }, () => 40 + Math.random() * 60);
      ctx.font = `${FONT_SIZE}px "Courier New", monospace`;
    };

    init();

    const draw = () => {
      // Fade out old characters slowly → creates trail effect
      ctx.fillStyle = "rgba(4,2,14,0.055)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const x = i * FONT_SIZE;
        const headY = drops[i] * FONT_SIZE;

        // Bright white-blue head character
        const headChar = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillStyle = "rgba(224, 247, 255, 0.95)";
        ctx.fillText(headChar, x, headY);

        // Second character — bright primary blue
        if (drops[i] > 1) {
          const c2 = CHARS[Math.floor(Math.random() * CHARS.length)];
          ctx.fillStyle = `hsla(263,80%,${brightnesses[i]}%,0.9)`;
          ctx.fillText(c2, x, headY - FONT_SIZE);
        }

        // Third — mid blue
        if (drops[i] > 2) {
          const c3 = CHARS[Math.floor(Math.random() * CHARS.length)];
          ctx.fillStyle = `hsla(263,80%,${brightnesses[i] * 0.7}%,0.6)`;
          ctx.fillText(c3, x, headY - FONT_SIZE * 2);
        }

        // Fourth — dim blue
        if (drops[i] > 3) {
          const c4 = CHARS[Math.floor(Math.random() * CHARS.length)];
          ctx.fillStyle = `hsla(263,80%,${brightnesses[i] * 0.45}%,0.35)`;
          ctx.fillText(c4, x, headY - FONT_SIZE * 3);
        }

        drops[i] += speeds[i];

        // Reset when off-screen, randomize speed and brightness
        if (drops[i] * FONT_SIZE > canvas.height + 60 && Math.random() > 0.975) {
          drops[i] = Math.random() * -(canvas.height / FONT_SIZE / 2);
          speeds[i] = 0.25 + Math.random() * 0.75;
          brightnesses[i] = 40 + Math.random() * 60;
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    const onResize = () => init();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.55 }}
    />
  );
}
