"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Clock, MapPin, Plane, Send, Sparkles, Star, Users } from "lucide-react";

export default function UmrahShowcase3D() {
  const [roomType, setRoomType] = useState<"quad" | "triple" | "double">("quad");
  const [pilgrims, setPilgrims] = useState(2);

  const priceMultipliers = {
    quad: 78500,
    triple: 84500,
    double: 94000
  };

  const estimatedTotal = priceMultipliers[roomType] * pilgrims;

  return (
    <section id="umrah" className="relative px-4 py-24 bg-gradient-to-b from-transparent via-sky-950/20 to-transparent">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.25em] text-amber-500">
            <Sparkles size={14} /> Holy Pilgrimage Concierge
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl text-zinc-900 dark:text-white">
            VIP 5-Star & Classic Umrah Services
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
            Carefully curated spiritual journeys with premium hotel accommodations within footsteps of Masjid Al Haram in Makkah and Al Masjid An Nabawi in Madinah.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
          {/* Left Column: Visual Highlights */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-amber-400/30 bg-[#06180c] p-6 text-white shadow-2xl">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=1200&q=85"
                alt="Holy Makkah Clock Tower & Al Haram"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4">
                <span className="rounded-full bg-amber-400/90 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-black">
                  Zero Long Walking Distance
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold text-white">
                  Swissôtel & Pullman Zamzam Makkah
                </h3>
                <p className="text-xs text-sky-200">Just 50 meters to the Holy Courtyard</p>
              </div>
            </div>

            {/* Inclusions Grid */}
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
              {[
                { title: "Direct Flights", desc: "CCJ/COK to Jeddah with Saudia" },
                { title: "Kerala Cuisine", desc: "Breakfast, Lunch & Dinner Daily" },
                { title: "Ziyarat Tours", desc: "Full historical tours with Guide" },
                { title: "Umrah Visa & Health", desc: "Approved e-Visa + Medical Covers" }
              ].map(inc => (
                <div key={inc.title} className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                  <span className="block font-bold text-amber-400">{inc.title}</span>
                  <span className="mt-0.5 block text-[11px] text-zinc-300">{inc.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Umrah Cost Estimator */}
          <div className="rounded-[2.5rem] border border-zinc-200/80 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
              Interactive Package Estimator
            </span>
            <h3 className="mt-1 font-display text-2xl font-bold text-zinc-900 dark:text-white">
              Instant Group & Family Calculation
            </h3>

            <div className="mt-6 space-y-4">
              {/* Room Occupancy */}
              <div>
                <label className="text-xs font-black text-zinc-600 dark:text-zinc-300 uppercase">
                  Select Room Type
                </label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {[
                    { id: "quad", label: "4 Bed Sharing", price: "₹78,500" },
                    { id: "triple", label: "3 Bed Triple", price: "₹84,500" },
                    { id: "double", label: "2 Bed Double", price: "₹94,000" }
                  ].map(r => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRoomType(r.id as any)}
                      className={`rounded-2xl border p-3 text-center transition-all ${
                        roomType === r.id
                          ? "border-amber-400 bg-amber-400/10 text-amber-500 font-black shadow-sm"
                          : "border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 font-bold"
                      }`}
                    >
                      <span className="block text-xs">{r.label}</span>
                      <span className="mt-1 block text-[11px] font-extrabold opacity-80">{r.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Pilgrims */}
              <div>
                <label className="text-xs font-black text-zinc-600 dark:text-zinc-300 uppercase">
                  Number of Pilgrims
                </label>
                <div className="mt-2 flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-sky-500" />
                    <span className="text-sm font-bold text-zinc-800 dark:text-white">
                      {pilgrims} {pilgrims === 1 ? "Person" : "Persons"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPilgrims(Math.max(1, pilgrims - 1))}
                      className="h-8 w-8 rounded-lg bg-white font-black text-zinc-700 shadow-sm dark:bg-white/10 dark:text-white"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => setPilgrims(pilgrims + 1)}
                      className="h-8 w-8 rounded-lg bg-sky-600 font-black text-white shadow-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Total Calculation Display */}
              <div className="rounded-2xl bg-gradient-to-br from-sky-900/30 to-orange-900/20 p-4 border border-amber-400/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">Estimated Total (All-Inclusive):</span>
                  <span className="font-display text-2xl font-black text-amber-500">
                    ₹{estimatedTotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-zinc-400">
                  Includes Direct Flight, 15-Day Hotel Stay, Visa, Meals, Guide & Transport.
                </p>
              </div>

              {/* Submit to WhatsApp */}
              <a
                href={`https://wa.me/918590624181?text=${encodeURIComponent(
                  `Assalamu Alaikum Rozline Travels Tirur, I would like to book Umrah package for ${pilgrims} persons in ${roomType.toUpperCase()} room. Estimated total ₹${estimatedTotal.toLocaleString(
                    "en-IN"
                  )}. Please inform upcoming batch dates.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-xl shadow-sky-700/25 transition hover:scale-[1.01]"
              >
                <Send size={15} /> Confirm Batch Availability on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
