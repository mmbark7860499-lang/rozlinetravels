"use client";

import { useEffect, useRef } from "react";

interface Waypoint {
  x: number;
  y: number;
  z: number;
  name: string;
  code: string;
}

export default function Hero3DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let rotY = 0;
    let rotX = 0;

    // Air routes originating from Kerala (Calicut / Kochi) to World Hubs
    const globeRadius = Math.min(width, height) * 0.42;

    const latLongToXYZ = (lat: number, lon: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return {
        x: -(r * Math.sin(phi) * Math.cos(theta)),
        y: r * Math.cos(phi),
        z: r * Math.sin(phi) * Math.sin(theta)
      };
    };

    // Geographic coordinates
    const hubs: { name: string; code: string; lat: number; lon: number; isOrigin?: boolean }[] = [
      { name: "Tirur / Calicut", code: "CCJ", lat: 11.25, lon: 75.78, isOrigin: true },
      { name: "Dubai", code: "DXB", lat: 25.2, lon: 55.27 },
      { name: "Jeddah", code: "JED", lat: 21.54, lon: 39.17 },
      { name: "Riyadh", code: "RUH", lat: 24.71, lon: 46.67 },
      { name: "Doha", code: "DOH", lat: 25.28, lon: 51.53 },
      { name: "Singapore", code: "SIN", lat: 1.35, lon: 103.82 },
      { name: "Kuala Lumpur", code: "KUL", lat: 3.14, lon: 101.69 },
      { name: "Maldives", code: "MLE", lat: 4.17, lon: 73.5 },
      { name: "London", code: "LHR", lat: 51.5, lon: -0.12 },
      { name: "Istanbul", code: "IST", lat: 41.0, lon: 28.97 }
    ];

    const waypoints: Waypoint[] = hubs.map(h => {
      const pt = latLongToXYZ(h.lat, h.lon, globeRadius);
      return { ...pt, name: h.name, code: h.code };
    });

    // Generate orbiting particles for cosmic 3D depth
    const particleCount = 120;
    const particles: { x: number; y: number; z: number; size: number; speed: number; alpha: number }[] = [];
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = globeRadius * (0.8 + Math.random() * 0.7);
      particles.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        size: Math.random() * 2 + 1,
        speed: (Math.random() * 0.002 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
        alpha: Math.random() * 0.7 + 0.2
      });
    }

    // Flying pulse beacons along route lines
    const routePackets = hubs.slice(1).map((_, i) => ({
      targetIdx: i + 1,
      progress: Math.random(),
      speed: 0.005 + Math.random() * 0.004
    }));

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / width - 0.5;
      const normY = (e.clientY - rect.top) / height - 0.5;
      targetRotY = normX * 0.8;
      targetRotX = -normY * 0.5;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const normX = (touch.clientX - rect.left) / width - 0.5;
        const normY = (touch.clientY - rect.top) / height - 0.5;
        targetRotY = normX * 0.8;
        targetRotX = -normY * 0.5;
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    let autoRot = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      autoRot += 0.002;
      rotY += (targetRotY + autoRot - rotY) * 0.05;
      rotX += (targetRotX - rotX) * 0.05;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const project = (x: number, y: number, z: number) => {
        // Rotate Y
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;
        // Rotate X
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        // Perspective division
        const fov = 700;
        const scale = fov / (fov + z2 + globeRadius * 0.6);
        return {
          px: width * 0.5 + x1 * scale,
          py: height * 0.5 + y2 * scale,
          scale,
          z2
        };
      };

      // Draw faint 3D latitude & longitude wireframe sphere rings
      ctx.lineWidth = 1;
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
        ctx.beginPath();
        let first = true;
        for (let t = 0; t <= Math.PI * 2; t += 0.15) {
          const r = globeRadius;
          const x = r * Math.cos(t) * Math.cos(angle);
          const y = r * Math.sin(t);
          const z = r * Math.cos(t) * Math.sin(angle);
          const p = project(x, y, z);
          if (first) {
            ctx.moveTo(p.px, p.py);
            first = false;
          } else {
            ctx.lineTo(p.px, p.py);
          }
        }
        ctx.strokeStyle = "rgba(16, 185, 129, 0.06)";
        ctx.stroke();
      }

      // Draw floating particles
      particles.forEach(p => {
        const pr = project(p.x, p.y, p.z);
        if (pr.z2 > -globeRadius) {
          ctx.beginPath();
          ctx.arc(pr.px, pr.py, p.size * pr.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha * Math.max(0.2, pr.scale)})`;
          ctx.fill();
        }
      });

      // Project Origin (Kerala / CCJ)
      const originNode = waypoints[0];
      const pOrigin = project(originNode.x, originNode.y, originNode.z);

      // Draw Flight Arcs
      waypoints.slice(1).forEach((dest, idx) => {
        const pDest = project(dest.x, dest.y, dest.z);

        // Calculate 3D Arc control point raised outwards from globe surface
        const mx = (originNode.x + dest.x) * 0.5;
        const my = (originNode.y + dest.y) * 0.5;
        const mz = (originNode.z + dest.z) * 0.5;
        const dist = Math.sqrt(mx * mx + my * my + mz * mz) || 1;
        const lift = globeRadius * 1.35;
        const cx = (mx / dist) * lift;
        const cy = (my / dist) * lift;
        const cz = (mz / dist) * lift;

        const pMid = project(cx, cy, cz);

        // Visible only if either node is on forward hemisphere
        if (pOrigin.z2 > -globeRadius * 0.6 || pDest.z2 > -globeRadius * 0.6) {
          ctx.beginPath();
          ctx.moveTo(pOrigin.px, pOrigin.py);
          ctx.quadraticCurveTo(pMid.px, pMid.py, pDest.px, pDest.py);
          ctx.strokeStyle = idx % 2 === 0 ? "rgba(16, 185, 129, 0.35)" : "rgba(212, 175, 55, 0.35)";
          ctx.lineWidth = 1.5 * Math.max(0.6, pOrigin.scale);
          ctx.setLineDash([4, 6]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Moving packet along arc
          const packet = routePackets[idx];
          packet.progress = (packet.progress + packet.speed) % 1;
          const t = packet.progress;
          // Quadratic bezier formula
          const qx = (1 - t) * (1 - t) * originNode.x + 2 * (1 - t) * t * cx + t * t * dest.x;
          const qy = (1 - t) * (1 - t) * originNode.y + 2 * (1 - t) * t * cy + t * t * dest.y;
          const qz = (1 - t) * (1 - t) * originNode.z + 2 * (1 - t) * t * cz + t * t * dest.z;
          const pPacket = project(qx, qy, qz);

          // Glow beacon
          ctx.beginPath();
          ctx.arc(pPacket.px, pPacket.py, 3.5 * pPacket.scale, 0, Math.PI * 2);
          ctx.fillStyle = idx % 2 === 0 ? "#10b981" : "#f59e0b";
          ctx.shadowColor = idx % 2 === 0 ? "#10b981" : "#d4af37";
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Draw destination node
        if (pDest.z2 > -globeRadius * 0.5) {
          ctx.beginPath();
          ctx.arc(pDest.px, pDest.py, 4 * pDest.scale, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#10b981";
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Label
          ctx.font = `600 ${Math.max(10, 12 * pDest.scale)}px sans-serif`;
          ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
          ctx.fillText(dest.code, pDest.px + 8, pDest.py - 4);
        }
      });

      // Draw Origin Node prominently
      if (pOrigin.z2 > -globeRadius * 0.5) {
        ctx.beginPath();
        ctx.arc(pOrigin.px, pOrigin.py, 7 * pOrigin.scale, 0, Math.PI * 2);
        ctx.fillStyle = "#d4af37";
        ctx.shadowColor = "#d4af37";
        ctx.shadowBlur = 18;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.font = `bold ${Math.max(11, 13 * pOrigin.scale)}px sans-serif`;
        ctx.fillStyle = "#fde047";
        ctx.fillText("TIRUR HUB (CCJ)", pOrigin.px + 10, pOrigin.py + 4);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
      style={{ touchAction: "none" }}
    />
  );
}
