"use client";

import Image from "next/image";
import { useState } from "react";
import { Clock, MapPin, Sparkles, Send, ArrowUpRight } from "lucide-react";

interface DestinationItem {
  name: string;
  country: string;
  image: string;
  flightTime: string;
  season: string;
  startingPrice: string;
  highlights: string[];
}

const destinationsList: DestinationItem[] = [
  {
    name: "Dubai & Abu Dhabi",
    country: "United Arab Emirates",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
    flightTime: "4h 15m direct from CCJ",
    season: "Oct - Apr Best Time",
    startingPrice: "₹18,999",
    highlights: ["Burj Khalifa", "Desert Safari", "Dhow Cruise"]
  },
  {
    name: "Makkah & Madinah",
    country: "Saudi Arabia",
    image: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=900&q=80",
    flightTime: "5h 00m direct from CCJ/COK",
    season: "Year-Round Spiritual Tours",
    startingPrice: "₹64,999",
    highlights: ["Haram Walking Distance", "Full Ziyarat", "Kerala Food"]
  },
  {
    name: "Maldives Luxury Atolls",
    country: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80",
    flightTime: "1h 35m direct from TRV/COK",
    season: "Nov - May Sunshine",
    startingPrice: "₹42,999",
    highlights: ["Overwater Villas", "Speedboat", "All-Inclusive"]
  },
  {
    name: "Kuala Lumpur & Genting",
    country: "Malaysia",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80",
    flightTime: "4h 25m direct from COK",
    season: "E-Visa Easy Processing",
    startingPrice: "₹28,500",
    highlights: ["Petronas Towers", "Batu Caves", "Cable Car"]
  },
  {
    name: "Singapore City & Marina",
    country: "Singapore",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=80",
    flightTime: "4h 40m direct from COK",
    season: "Ideal Family Vacation",
    startingPrice: "₹38,999",
    highlights: ["Marina Bay Sands", "Universal Studios", "Gardens"]
  },
  {
    name: "Baku & Caspian Coast",
    country: "Azerbaijan",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?auto=format&fit=crop&w=900&q=80",
    flightTime: "Instant E-Visa Hub",
    season: "Apr - Oct Perfect Climate",
    startingPrice: "₹34,999",
    highlights: ["Flame Towers", "Gabala Cable Car", "Old City"]
  },
  {
    name: "Bangkok & Phuket",
    country: "Thailand",
    image: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&w=900&q=80",
    flightTime: "Visa Free / Fast Track",
    season: "Tropical Beaches",
    startingPrice: "₹22,500",
    highlights: ["Phi Phi Islands", "Coral Island", "Night Markets"]
  },
  {
    name: "Istanbul & Cappadocia",
    country: "Turkey",
    image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=900&q=80",
    flightTime: "Hot Air Balloon Wonders",
    season: "Spring & Autumn",
    startingPrice: "₹69,999",
    highlights: ["Bosphorus Cruise", "Hagia Sophia", "Cave Suites"]
  }
];

export default function Destinations3D() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  return (
    <section id="destinations" className="relative px-4 py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.25em] text-amber-500">
            <Sparkles size={14} /> 3D Destination Gallery
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl text-zinc-900 dark:text-white">
            Where Your Next Story Begins
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
            Explore curated international getaways, pilgrimage journeys, and exotic escapes with full flight and visa support handled from our Tirur travel desk.
          </p>
        </div>

        {/* 3D Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinationsList.map((item, idx) => (
            <div
              key={item.name}
              className="group relative perspective-1000 overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white/70 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-amber-400/60 hover:shadow-2xl hover:shadow-emerald-950/20 dark:border-white/10 dark:bg-white/5"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={`${item.name} package`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="rounded-full bg-black/60 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-amber-400 backdrop-blur-md border border-white/10">
                    {item.season}
                  </span>
                  <span className="rounded-full bg-emerald-600/90 px-3 py-1 text-[11px] font-black text-white shadow backdrop-blur-md">
                    {item.startingPrice}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-300">
                    <MapPin size={12} /> {item.country}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
                    {item.name}
                  </h3>

                  <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-zinc-300">
                    <Clock size={12} className="text-amber-400" /> {item.flightTime}
                  </p>

                  {/* Highlights */}
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {item.highlights.map(h => (
                      <span
                        key={h}
                        className="rounded-md bg-white/15 px-2 py-0.5 text-[10px] font-semibold text-white/90 backdrop-blur-sm"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* WhatsApp Action Button */}
                  <a
                    href={`https://wa.me/918590624181?text=${encodeURIComponent(
                      `Hi Sky Way Travels Tirur, I would like to get package details and quote for ${item.name} (${item.country}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-lg transition hover:brightness-110"
                  >
                    <Send size={13} />
                    <span>Inquire Package</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
