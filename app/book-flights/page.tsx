"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  ExternalLink,
  Headphones,
  Luggage,
  MapPin,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Utensils
} from "lucide-react";
import Navbar from "@/components/Navbar";
import FlightBookingEngine from "@/components/FlightBookingEngine";
import Footer from "@/components/Footer";
import FloatingActionHub from "@/components/FloatingActionHub";

export default function BookFlightsPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-zinc-900 transition-colors duration-500 dark:bg-[#030a05] dark:text-white">
      {/* 3D Glass Header */}
      <Navbar />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#021808] via-[#042810] to-[#021408] px-4 pt-32 pb-24 text-white">
        <div className="pointer-events-none absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-sky-500/20 blur-[130px]" />
        
        <div className="relative mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.25em] text-amber-300 backdrop-blur-md">
            <Sparkles size={14} /> Rozline Flight Desk
          </div>

          <h1 className="mt-4 max-w-4xl font-display text-4xl sm:text-6xl font-extrabold leading-tight">
            Direct & Connecting Flight Bookings
          </h1>

          <p className="mt-4 max-w-2xl text-base sm:text-lg text-zinc-300">
            Search live airfares from Calicut (CCJ), Cochin (COK), Kannur (CNN), and major hubs. Instant seat reservation, verified baggage allowances, and direct WhatsApp ticket issuance.
          </p>
        </div>
      </section>

      {/* Main Booking Engine Console */}
      <section className="relative z-10 -mt-12 px-4 pb-20">
        <FlightBookingEngine />
      </section>

      {/* Feature Highlights */}
      <section className="px-4 pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-md dark:border-white/10 dark:bg-white/5">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-500/15 text-sky-600 dark:text-sky-400">
              <ShieldCheck size={22} />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-zinc-900 dark:text-white">
              Guaranteed Ticket Issuance
            </h3>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Every confirmed booking includes airline PNR, verified ticket number, and complimentary web check-in.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-md dark:border-white/10 dark:bg-white/5">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-500/15 text-amber-500">
              <Headphones size={22} />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-zinc-900 dark:text-white">
              Dedicated Tirur Travel Desk
            </h3>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              No chatbots. Connect directly with our Tirur staff for date changes, extra luggage, and flight updates.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-md dark:border-white/10 dark:bg-white/5">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-500/15 text-teal-500">
              <Luggage size={22} />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-zinc-900 dark:text-white">
              Gulf Baggage Optimization
            </h3>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Special 30kg, 40kg, and 46kg Gulf allowance fares with meal inclusions pre-selected on your ticket.
            </p>
          </div>
        </div>
      </section>

      {/* Footer & Floating Hub */}
      <Footer />
      <FloatingActionHub />
    </main>
  );
}
