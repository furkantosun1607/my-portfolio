"use client";

import { useEffect, useRef, useState } from "react";
import { createWikiGraph, wikiTopics } from "./sutasGraph";
import styles from "./SutasKnowledgeGraph.module.scss";

const graph = createWikiGraph();

export function SutasKnowledgeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !container || !context) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let frame = 0;
    let previousTime = 0;
    let visible = false;
    let pointer: { x: number; y: number } | null = null;

    function draw() {
      if (!context || !width || !height) return;
      const mobile = width < 600;
      const centerX = width * (mobile ? 0.52 : 0.72);
      const centerY = height * (mobile ? 0.72 : 0.5);
      const spreadX = width * (mobile ? 0.6 : 0.41);
      const spreadY = height * (mobile ? 0.3 : 0.6);
      const t = timeRef.current;
      const points = graph.nodes.map((node, index) => ({
        x: centerX + (node.x + (index ? Math.sin(t * 0.27 + node.phase) * 0.023 : 0)) * spreadX,
        y: centerY + (node.y + (index ? Math.cos(t * 0.22 + node.phase) * 0.028 : 0)) * spreadY,
      }));
      let hovered = -1;
      let nearest = 26;
      if (pointer) {
        points.forEach((point, index) => {
          const distance = Math.hypot(point.x - pointer!.x, point.y - pointer!.y);
          if (distance < nearest) {
            nearest = distance;
            hovered = index;
          }
        });
      }
      const connected = new Set<number>();
      if (hovered >= 0) {
        connected.add(hovered);
        graph.edges.forEach(([from, to]) => {
          if (from === hovered) connected.add(to);
          if (to === hovered) connected.add(from);
        });
      }

      context.clearRect(0, 0, width, height);
      graph.edges.forEach(([from, to]) => {
        const highlighted = from === hovered || to === hovered;
        context.beginPath();
        context.moveTo(points[from].x, points[from].y);
        context.lineTo(points[to].x, points[to].y);
        context.strokeStyle = highlighted ? "rgba(126,231,202,0.62)" : "rgba(166,198,192,0.14)";
        context.lineWidth = highlighted ? 1.1 : 0.65;
        context.stroke();
      });

      graph.nodes.forEach((node, index) => {
        const { x, y } = points[index];
        const highlighted = connected.has(index);
        const labeled = Boolean(node.label);
        const radius = node.radius * (mobile ? 0.85 : 1);
        if (labeled || highlighted) {
          const glow = context.createRadialGradient(x, y, 0, x, y, radius * 5);
          glow.addColorStop(0, "rgba(115,228,195,0.19)");
          glow.addColorStop(1, "rgba(115,228,195,0)");
          context.fillStyle = glow;
          context.beginPath();
          context.arc(x, y, radius * 5, 0, Math.PI * 2);
          context.fill();
        }
        context.beginPath();
        context.arc(x, y, highlighted ? radius + 1 : radius, 0, Math.PI * 2);
        context.fillStyle =
          index === 0 ? "#c7f9e8" : highlighted || labeled ? "#8ce2c9" : "rgba(179,202,198,0.65)";
        context.fill();

        if (index === 0) {
          context.beginPath();
          context.arc(x, y, 15 + Math.sin(t * 0.7) * 1.5, 0, Math.PI * 2);
          context.strokeStyle = "rgba(140,226,201,0.32)";
          context.lineWidth = 1;
          context.stroke();
        }

        if (node.label && (index === 0 || !mobile || highlighted)) {
          const text = node.label;
          context.font = `${index === 0 ? "600 13" : "11"}px ui-monospace, monospace`;
          const textWidth = context.measureText(text).width;
          const alignLeft = x > width * 0.85;
          const labelX = alignLeft ? x - textWidth - 16 : x + radius + 10;
          const labelY = y - (index === 0 ? 25 : 12);
          context.fillStyle = "rgba(12,22,23,0.9)";
          context.fillRect(labelX - 5, labelY - 11, textWidth + 10, 20);
          context.fillStyle = index === 0 || highlighted ? "#d9f9ee" : "#8faea6";
          context.fillText(text, labelX, labelY + 3);
        }
      });
    }

    function tick(now: number) {
      // Cap at 30 fps and avoid time jumps when a tab becomes active again.
      if (now - previousTime >= 1000 / 30) {
        timeRef.current += previousTime ? Math.min((now - previousTime) / 1000, 0.06) : 0;
        previousTime = now;
        draw();
      }
      frame = requestAnimationFrame(tick);
    }

    function updateAnimation() {
      cancelAnimationFrame(frame);
      previousTime = 0;
      draw();
      if (visible && !document.hidden && !paused && !motionPreference.matches) {
        frame = requestAnimationFrame(tick);
      }
    }

    function resize() {
      if (!canvas || !container || !context) return;
      const bounds = container.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw();
    }

    function pointerMove(event: PointerEvent) {
      if (!canvas || event.pointerType === "touch") return;
      const bounds = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
      if (paused || motionPreference.matches) draw();
    }
    function pointerLeave() {
      pointer = null;
      draw();
    }

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateAnimation();
    });
    resizeObserver.observe(container);
    intersectionObserver.observe(container);
    motionPreference.addEventListener("change", updateAnimation);
    document.addEventListener("visibilitychange", updateAnimation);
    canvas.addEventListener("pointermove", pointerMove);
    canvas.addEventListener("pointerleave", pointerLeave);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionPreference.removeEventListener("change", updateAnimation);
      document.removeEventListener("visibilitychange", updateAnimation);
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerleave", pointerLeave);
    };
  }, [paused]);

  return (
    <figure className={styles.cover} aria-label="SutasGPT project preview">
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        role="img"
        aria-label={`Illustrative LLMWiki knowledge graph connecting SutasGPT to selected wiki topics: ${wikiTopics.join(", ")}.`}
      />
      <div className={styles.veil} aria-hidden="true" />
      <div className={styles.topline}>
        <span className={styles.wordmark}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 6 12 1-6 12L6 6Z" stroke="currentColor" />
            <circle cx="6" cy="6" r="3" fill="currentColor" />
            <circle cx="18" cy="7" r="2" fill="currentColor" />
            <circle cx="12" cy="19" r="2.5" fill="currentColor" />
          </svg>
          CONNECTED KNOWLEDGE
        </span>
        <button
          type="button"
          className={styles.motionButton}
          aria-label={
            paused ? "Resume knowledge graph animation" : "Pause knowledge graph animation"
          }
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
            {paused ? <path d="M5 3v10l8-5-8-5Z" /> : <path d="M4 3h3v10H4zm5 0h3v10H9z" />}
          </svg>
          <span>{paused ? "Resume" : "Pause"}</span>
        </button>
      </div>
      <div className={styles.copy}>
        <span className={styles.eyebrow}>INTERNAL IT ASSISTANT</span>
        <p className={styles.title}>
          Sutas<span>GPT</span>
          <span className={styles.period}>.</span>
        </p>
        <p className={styles.description}>
          Your IT wiki.
          <br /> Connected.
        </p>
        <span className={styles.detail}>
          Infrastructure knowledge,
          <br />
          one conversation away.
        </span>
      </div>
      <div className={styles.bottomline}>
        <div className={styles.tags}>
          <span>LLMWiki</span>
          <span>RAG</span>
          <span>Streamlit</span>
        </div>
        <figcaption>Illustrative graph · selected wiki topics</figcaption>
      </div>
    </figure>
  );
}
