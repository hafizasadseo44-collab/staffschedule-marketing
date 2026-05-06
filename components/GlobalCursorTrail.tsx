"use client";

import React, { useRef, useEffect, useCallback } from "react";

/**
 * GlobalCursorTrail — A site-wide interactive SVG cursor trail.
 * Renders a full-viewport SVG layer that responds to mouse movement
 * with elegant, brand-colored particle trails and geometric shapes.
 * Uses pointer-events: none so it never blocks page interactions.
 */

interface Position { x: number; y: number }

interface TrailPoint {
  position: Position;
  time: number;
  drift: Position;
  age: number;
  direction: Position;
}

// Brand-themed color palette — subtle, elegant indigo/violet tones
const TRAIL_COLORS = [
  "rgba(79, 70, 229, 0.12)",   // indigo-600
  "rgba(99, 102, 241, 0.10)",  // indigo-500
  "rgba(124, 58, 237, 0.08)",  // violet-600
  "rgba(139, 92, 246, 0.06)",  // violet-500
  "rgba(67, 56, 202, 0.05)",   // indigo-700 ghost
];

class TrailFollower {
  private points: TrailPoint[] = [];
  private line: SVGPathElement;
  private color: string;
  private stage: SVGSVGElement;
  private removeDelay: number;

  constructor(stage: SVGSVGElement, color: string, removeDelay: number) {
    this.stage = stage;
    this.color = color;
    this.removeDelay = removeDelay;
    this.line = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.line.style.fill = color;
    this.line.style.stroke = color;
    this.line.style.strokeWidth = "1";
    this.line.style.opacity = "0.8";
    this.stage.appendChild(this.line);
  }

  private getDrift(): number {
    return (Math.random() - 0.5) * 2.5;
  }

  public add(position: Position) {
    const direction = { x: 0, y: 0 };
    if (this.points[0]) {
      direction.x = (position.x - this.points[0].position.x) * 0.2;
      direction.y = (position.y - this.points[0].position.y) * 0.2;
    }

    const point: TrailPoint = {
      position,
      time: Date.now(),
      drift: {
        x: this.getDrift() + direction.x / 2,
        y: this.getDrift() + direction.y / 2,
      },
      age: 0,
      direction,
    };

    // Randomly spawn geometric shapes for visual interest
    const chance = Math.random();
    if (chance < 0.06) this.spawnCircle(point);
    else if (chance < 0.10) this.spawnDiamond(point);
    else if (chance < 0.13) this.spawnDot(point);

    this.points.unshift(point);
  }

  private createLine(points: TrailPoint[]): string {
    const path: string[] = [points.length ? "M" : ""];
    if (points.length > 0) {
      let forward = true;
      let i = 0;
      while (i >= 0) {
        const point = points[i];
        const offsetX = point.direction.x * ((i - points.length) / points.length) * 0.5;
        const offsetY = point.direction.y * ((i - points.length) / points.length) * 0.5;
        const x = point.position.x + (forward ? offsetY : -offsetY);
        const y = point.position.y + (forward ? offsetX : -offsetX);
        point.age += 0.15;
        path.push(String(x + point.drift.x * point.age));
        path.push(String(y + point.drift.y * point.age));
        i += forward ? 1 : -1;
        if (i === points.length) { i--; forward = false; }
      }
    }
    return path.join(" ");
  }

  public trim() {
    if (this.points.length > 0) {
      const last = this.points[this.points.length - 1];
      if (last.time < Date.now() - this.removeDelay) {
        this.points.pop();
      }
    }
    this.line.setAttribute("d", this.createLine(this.points));
  }

  private spawnCircle(point: TrailPoint) {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const radius = Math.max(2, (Math.abs(point.direction.x) + Math.abs(point.direction.y)) * 0.8);
    circle.setAttribute("r", String(radius));
    circle.style.fill = this.color;
    circle.setAttribute("cx", "0");
    circle.setAttribute("cy", "0");
    this.animateShape(circle, point);
  }

  private spawnDiamond(point: TrailPoint) {
    const size = Math.max(3, (Math.abs(point.direction.x) + Math.abs(point.direction.y)) * 1.2);
    const diamond = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    diamond.setAttribute("points", `0,${-size} ${size},0 0,${size} ${-size},0`);
    diamond.style.fill = this.color;
    this.animateShape(diamond, point);
  }

  private spawnDot(point: TrailPoint) {
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("r", String(Math.random() * 2 + 1));
    dot.style.fill = this.color;
    dot.setAttribute("cx", "0");
    dot.setAttribute("cy", "0");
    this.animateShape(dot, point);
  }

  private animateShape(shape: SVGElement, point: TrailPoint) {
    this.stage.appendChild(shape);
    const driftX = point.position.x + point.direction.x * (Math.random() * 15) + point.drift.x * (Math.random() * 8);
    const driftY = point.position.y + point.direction.y * (Math.random() * 15) + point.drift.y * (Math.random() * 8);

    shape.style.transform = `translate(${point.position.x}px, ${point.position.y}px)`;
    shape.style.transition = "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
    shape.style.opacity = "0.6";

    requestAnimationFrame(() => {
      shape.style.transform = `translate(${driftX}px, ${driftY}px) scale(0) rotate(${Math.random() * 360}deg)`;
      shape.style.opacity = "0";
      setTimeout(() => {
        if (this.stage.contains(shape)) {
          this.stage.removeChild(shape);
        }
      }, 700);
    });
  }
}

export default function GlobalCursorTrail() {
  const svgRef = useRef<SVGSVGElement>(null);
  const followersRef = useRef<TrailFollower[]>([]);
  const animationRef = useRef<number>();

  const animate = useCallback(() => {
    followersRef.current.forEach((f) => f.trim());
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    // Initialize trail followers with brand colors
    followersRef.current = TRAIL_COLORS.map(
      (color) => new TrailFollower(svgRef.current!, color, 500)
    );

    // Global mouse handler
    const handleMove = (e: MouseEvent) => {
      followersRef.current.forEach((f) => f.add({ x: e.clientX, y: e.clientY }));
    };

    // Global touch handler
    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        followersRef.current.forEach((f) => f.add({ x: touch.clientX, y: touch.clientY }));
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });

    // Start animation loop
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleTouch);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[9999]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    />
  );
}
