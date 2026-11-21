"use client";

import { useState } from "react";
import { Plane, QrCode, Sparkles, Luggage, Utensils, ShieldCheck, RefreshCw, Clock } from "lucide-react";

interface RoutePreset {
  fromCode: string;
  fromCity: string;
  toCode: string;
  toCity: string;
  flight: string;
  gate: string;
  seat: string;
  date: string;
  airline: string;
}

const presets: RoutePreset[] = [
  {
    fromCode: "CCJ",
    fromCity: "Calicut / Tirur",
    toCode: "DXB",
    toCity: "Dubai Intl",
    flight: "EK-563",
    gate: "B12",
    seat: "03A",
    date: "DAILY",
    airline: "Emirates First"
  },
  {
    fromCode: "COK",
    fromCity: "Cochin Airport",
    toCode: "JED",
    toCity: "Jeddah Haramain",
    flight: "SV-782",
    gate: "A04",
    seat: "01K",
    date: "DIRECT",
    airline: "Saudia Royal"
  },
  {
    fromCode: "CCJ",
    fromCity: "Calicut Airport",
    toCode: "DOH",
    toCity: "Doha Hamad",
    flight: "QR-517",
    gate: "C08",
    seat: "02B",
    date: "NON-STOP",
    airline: "Qatar Airways"
  },
  {
    fromCode: "COK",
    fromCity: "Cochin Airport",
    toCode: "SIN",
    toCity: "Singapore Changi",
    flight: "SQ-535",
    gate: "D15",
    seat: "05F",
    date: "DIRECT",
    airline: "Singapore Airlines"
  }
];

export default function BoardingPass3D() {
  const [selectedRoute, setSelectedRoute] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const current = presets[selectedRoute];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -14, y: x * 14 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative mx-auto w-full min-w-0 max-w-full sm:max-w-md md:max-w-lg perspective-1000 overflow-hidden">
      {/* Route Quick Switcher */}
      <div className="mb-4 flex items-center justify-between gap-2 overflow-x-auto rounded-full border border-zinc-200/90 bg-white/90 p-1.5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/30">
        {presets.map((preset, idx) => (
          <button
            key={preset.flight}
            onClick={() => setSelectedRoute(idx)}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-black transition-all ${
              selectedRoute === idx
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/25"
                : "text-zinc-700 hover:text-emerald-700 dark:text-white/70 dark:hover:text-white"
            }`}
          >
            {preset.fromCode} → {preset.toCode}
          </button>
        ))}
      </div>

      {/* 3D Interactive Card Container */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.15s ease-out"
        }}
        className="transform-style-3d relative cursor-pointer select-none w-full min-w-0 max-w-full overflow-hidden"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Holographic Border Ring */}
        <div className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] border border-amber-400/40 bg-gradient-to-br from-emerald-950 via-[#072412] to-slate-950 p-4 sm:p-6 text-white shadow-2xl shadow-emerald-950/60 ring-1 ring-white/20">
          
          {/* Hologram Shimmer Layer */}
          <div className="pointer-events-none absolute inset-0 hologram-shimmer opacity-40" />

          {/* Golden Watermark */}
          <div className="pointer-events-none absolute -right-8 -top-8 text-amber-500/10">
            <Plane size={220} />
          </div>

          {!isFlipped ? (
            /* FRONT: BOARDING PASS */
            <div>
              {/* Top Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400/20 text-amber-300">
                    <Sparkles size={16} />
                  </span>
                  <div>
                    <span className="block text-xs font-black uppercase tracking-[0.2em] text-amber-400">
                      Sky Way Tirur VIP Pass
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-300">{current.airline}</span>
                  </div>
                </div>
                <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-black tracking-wider text-emerald-400 border border-emerald-500/30">
                  CONFIRMED TICKET
                </div>
              </div>

              {/* Flight Route Display */}
              <div className="my-6 grid grid-cols-3 items-center text-center">
                <div className="text-left">
                  <span className="block font-display text-3xl sm:text-4xl font-extrabold text-white">
                    {current.fromCode}
                  </span>
                  <span className="block text-xs font-bold text-emerald-200/80 truncate">{current.fromCity}</span>
                  <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400">
                    <Clock size={11} /> 09:30 AM
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-white/50">
                    {current.date}
                  </span>
                  <div className="relative my-1 w-full flex items-center justify-center">
                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                    <Plane size={18} className="absolute text-amber-300" />
                  </div>
                  <span className="rounded-md bg-white/10 px-2 py-0.5 text-[9px] font-bold text-emerald-300">
                    {current.flight}
                  </span>
                </div>

                <div className="text-right">
                  <span className="block font-display text-3xl sm:text-4xl font-extrabold text-white">
                    {current.toCode}
                  </span>
                  <span className="block text-xs font-bold text-emerald-200/80 truncate">{current.toCity}</span>
                  <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400">
                    <Clock size={11} /> 01:45 PM
                  </span>
                </div>
              </div>

              {/* Perforated Divider Tear-Line */}
              <div className="relative my-4 flex items-center justify-between overflow-hidden">
                <div className="h-4 w-4 -ml-2 rounded-full bg-[#030a05]" />
                <div className="h-[1px] w-full border-t border-dashed border-white/20" />
                <div className="h-4 w-4 -mr-2 rounded-full bg-[#030a05]" />
              </div>

              {/* Ticket Details & Barcode */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="rounded-xl bg-white/5 p-2 border border-white/5">
                  <span className="block text-[10px] uppercase font-bold text-zinc-400">Passenger</span>
                  <span className="mt-0.5 block font-bold text-white truncate">VIP Guest</span>
                </div>
                <div className="rounded-xl bg-white/5 p-2 border border-white/5">
                  <span className="block text-[10px] uppercase font-bold text-zinc-400">Seat</span>
                  <span className="mt-0.5 block font-black text-amber-300">{current.seat}</span>
                </div>
                <div className="rounded-xl bg-white/5 p-2 border border-white/5">
                  <span className="block text-[10px] uppercase font-bold text-zinc-400">Gate</span>
                  <span className="mt-0.5 block font-black text-emerald-300">{current.gate}</span>
                </div>
                <div className="rounded-xl bg-white/5 p-2 border border-white/5">
                  <span className="block text-[10px] uppercase font-bold text-zinc-400">Class</span>
                  <span className="mt-0.5 block font-bold text-white">Business</span>
                </div>
              </div>

              {/* Barcode & Flip Hint */}
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex items-center gap-3">
                  <QrCode size={36} className="text-amber-400" />
                  <div className="space-y-0.5 font-mono text-[9px] tracking-[0.25em] text-white/50">
                    <div>||| | |||| | ||||| || |</div>
                    <div>SKYWAY-TIRUR-2026</div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold text-amber-300 backdrop-blur-sm transition hover:bg-white/20">
                  <RefreshCw size={12} />
                  <span>Tap to view perks</span>
                </div>
              </div>
            </div>
          ) : (
            /* BACK: LUXURY INCLUSIONS */
            <div className="py-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={20} className="text-emerald-400" />
                  <h4 className="font-display text-lg font-bold text-white">Sky Way Exclusive Perks</h4>
                </div>
                <span className="rounded-full bg-amber-400/20 px-3 py-1 text-[10px] font-black text-amber-300">
                  ALL-INCLUSIVE
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-3 border border-white/5">
                  <Luggage size={20} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-white">Generous 35-40 KG Baggage Allowance</h5>
                    <p className="text-[11px] text-zinc-300">Includes 7 KG cabin bag + free seat selection on Gulf sectors.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-3 border border-white/5">
                  <Utensils size={20} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-white">Complimentary Gourmet Meals</h5>
                    <p className="text-[11px] text-zinc-300">Special dietary meals & South Indian delicacies pre-selected.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-3 border border-white/5">
                  <Sparkles size={20} className="text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-white">24/7 Tirur Concierge & Web Check-in</h5>
                    <p className="text-[11px] text-zinc-300">Boarding passes sent to your WhatsApp 24 hours prior to takeoff.</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-[11px] font-bold text-emerald-400">Zero Hidden Booking Charges</span>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-sm">
                  <RefreshCw size={12} />
                  <span>Tap to flip back</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
