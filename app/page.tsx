"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  Compass,
  FileCheck2,
  Globe2,
  Headphones,
  Hotel,
  Luggage,
  MapPin,
  Palmtree,
  Plane,
  Sailboat,
  Send,
  ShieldCheck,
  Sparkles,
  Ticket,
  UsersRound,
  WalletCards
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero3DCanvas from "@/components/Hero3DCanvas";
import BoardingPass3D from "@/components/BoardingPass3D";
import FlightBookingEngine from "@/components/FlightBookingEngine";
import Destinations3D from "@/components/Destinations3D";
import UmrahShowcase3D from "@/components/UmrahShowcase3D";
import VisaQuickCheck from "@/components/VisaQuickCheck";
import OffersSection from "@/components/OffersSection";
import Reviews3D from "@/components/Reviews3D";
import InquirySection from "@/components/InquirySection";
import Footer from "@/components/Footer";
import FloatingActionHub from "@/components/FloatingActionHub";

const servicesList = [
  { name: "Direct Flight Booking", icon: Plane, desc: "B2B rates, seat selection & instant web check-in" },
  { name: "Gulf & World Visas", icon: FileCheck2, desc: "24-48h UAE, Saudi, Oman, UK & Schengen support" },
  { name: "VIP 5-Star Umrah", icon: Sparkles, desc: "Haram walkable hotels, direct flights & Kerala meals" },
  { name: "International Holidays", icon: Palmtree, desc: "Dubai, Maldives, Baku, Georgia & Malaysia" },
  { name: "Worldwide Hotel Stays", icon: Hotel, desc: "Instant confirmed vouchers at contracted tariffs" },
  { name: "Overseas Insurance", icon: ShieldCheck, desc: "Medical & trip cancellation international cover" }
];

const keyStats = [
  { value: "10,000+", label: "Happy Travelers", sub: "Since Inception" },
  { value: "50+", label: "Global Destinations", sub: "Across 5 Continents" },
  { value: "5,000+", label: "Visas Approved", sub: "99.4% Success Rate" },
  { value: "24/7", label: "Dedicated Concierge", sub: "Tirur Headquarters" }
];

export default function Home() {
  return (
    <main className="relative w-full max-w-full overflow-x-hidden min-h-screen bg-white text-zinc-900 transition-colors duration-500 dark:bg-[#030b17] dark:text-white">
      {/* 3D Glass Header */}
      <Navbar />

      {/* HERO SECTION WITH 3D CANVAS & HOLOGRAPHIC BOARDING PASS */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-gradient-to-b from-white via-[#f0f7ff] to-white px-4 pt-28 pb-20 text-zinc-900 dark:from-[#030b17] dark:via-[#071a36] dark:to-[#030b17] dark:text-white sm:pt-36">
        {/* 3D Interactive Canvas Engine */}
        <Hero3DCanvas />

        {/* Ambient Radial Lights */}
        <div className="pointer-events-none absolute -top-40 left-1/4 h-[32rem] w-[32rem] rounded-full bg-sky-500/15 blur-[140px] dark:bg-sky-500/20" />
        <div className="pointer-events-none absolute bottom-0 right-10 h-[28rem] w-[28rem] rounded-full bg-orange-500/15 blur-[130px] dark:bg-orange-500/15" />

        <div className="relative z-10 mx-auto grid w-full min-w-0 max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left Column: Headline & Action */}
          <div className="w-full min-w-0 max-w-full">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-600/20 bg-sky-50 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-sky-800 backdrop-blur-md dark:border-orange-400/30 dark:bg-orange-400/10 dark:text-orange-300">
              <Sparkles size={15} />
              <span>Next-Level 3D Travel Desk • Tirur, Kerala</span>
            </div>

            <h1 className="mt-6 font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight text-zinc-900 dark:text-white">
              Elevate Every <br />
              <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-orange-500 bg-clip-text text-transparent dark:from-sky-300 dark:via-blue-400 dark:to-orange-400">
                Journey Beyond
              </span> <br />
              The Horizon.
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg font-medium leading-relaxed text-zinc-600 dark:text-zinc-300">
              Direct international flight bookings, 24-hour Gulf visa approvals, walkable 5-star Umrah tours, and bespoke family holidays handled with complete accountability from Tirur.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#booking"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 px-7 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-sky-600/25 transition hover:scale-105 active:scale-95"
              >
                <span>Launch Flight Engine</span>
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </a>

              <Link
                href="/visa-services"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-6 py-4 text-sm font-bold text-zinc-800 shadow-md backdrop-blur-md transition hover:bg-zinc-50 hover:border-sky-500 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:border-orange-400"
              >
                <FileCheck2 size={17} className="text-sky-600 dark:text-orange-400" />
                <span>Visa Desk</span>
              </Link>
            </div>

            {/* Quick Route Pills */}
            <div className="mt-8 flex flex-wrap items-center gap-2 text-xs font-bold text-zinc-500 dark:text-zinc-400">
              <span className="text-sky-700 dark:text-orange-400">Popular Routes:</span>
              {["CCJ ✈️ Dubai", "COK ✈️ Jeddah", "CCJ ✈️ Doha", "COK ✈️ Singapore", "CCJ ✈️ Riyadh"].map(route => (
                <span
                  key={route}
                  className="rounded-full border border-zinc-200 bg-white/95 px-3 py-1 text-zinc-700 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
                >
                  {route}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Holographic Boarding Pass */}
          <div className="w-full min-w-0 max-w-full overflow-hidden">
            <BoardingPass3D />
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="relative z-20 -mt-10 px-4">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 rounded-[2.5rem] border border-zinc-200/80 bg-white/90 p-6 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-[#07152b]/90 md:grid-cols-4">
          {keyStats.map(stat => (
            <div key={stat.label} className="p-3 text-center">
              <p className="font-display text-3xl sm:text-4xl font-black text-sky-600 dark:text-sky-400">
                {stat.value}
              </p>
              <p className="mt-1 text-xs sm:text-sm font-black text-zinc-800 dark:text-white">
                {stat.label}
              </p>
              <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE BOOKING CONSOLE */}
      <section id="booking" className="relative w-full max-w-full overflow-hidden px-4 py-20">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.25em] text-sky-700 dark:text-sky-400">
            <Plane size={14} /> Comprehensive Travel Console
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl text-zinc-900 dark:text-white">
            Book Flights, Visas & Umrah in One Place
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
            Real-world flight fares, fast-track visa processing, 5-star Umrah batches and international tour packages with immediate confirmation.
          </p>
        </div>

        <FlightBookingEngine />
      </section>

      {/* COMPLETE SERVICES GRID */}
      <section id="services" className="relative w-full max-w-full overflow-hidden px-4 py-20 bg-gradient-to-b from-transparent via-sky-950/15 to-transparent">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.25em] text-orange-500">
              <BadgeCheck size={14} /> Complete Travel Desk
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl text-zinc-900 dark:text-white">
              Designed For High Reliability & Speed
            </h2>
            <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
              Everything your journey needs handled by licensed travel consultants with decades of combined Kerala travel expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicesList.map(s => {
              const Icon = s.icon;
              return (
                <div
                  key={s.name}
                  className="group relative rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500 hover:shadow-2xl dark:border-white/10 dark:bg-white/5"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-600/15 text-sky-700 transition group-hover:bg-sky-600 group-hover:text-white dark:bg-sky-500/15 dark:text-sky-400">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-zinc-900 dark:text-white">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* UMRAH SHOWCASE */}
      <UmrahShowcase3D />

      {/* 3D DESTINATIONS */}
      <Destinations3D />

      {/* INTERACTIVE VISA QUICK CHECK */}
      <VisaQuickCheck />

      {/* PROMOTIONAL OFFERS */}
      <OffersSection />

      {/* TESTIMONIALS */}
      <Reviews3D />

      {/* INQUIRY & CONTACT OFFICE */}
      <InquirySection />

      {/* FOOTER */}
      <Footer />

      {/* ERGONOMIC FLOATING ACTION HUB */}
      <FloatingActionHub />
    </main>
  );
}
