"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  FileCheck2,
  Globe2,
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  Search,
  Send,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { useMemo, useState } from "react";
import { visaRequirements } from "./visa-requirements-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActionHub from "@/components/FloatingActionHub";

const whatsappNumber = "918590624181";

export default function VisaRequirementsPage() {
  const [selectedSlug, setSelectedSlug] = useState("uae");
  const [query, setQuery] = useState("");
  const [checkedDocs, setCheckedDocs] = useState<{ [key: string]: boolean }>({});

  const selected =
    visaRequirements.find(country => country.slug === selectedSlug) ?? visaRequirements[0];

  const filteredCountries = useMemo(
    () =>
      visaRequirements.filter(country =>
        country.name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [query]
  );

  function selectCountry(slug: string) {
    setSelectedSlug(slug);
    window.setTimeout(() => {
      document.getElementById("visa-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  const toggleDoc = (doc: string) => {
    const key = `${selected.slug}-${doc}`;
    setCheckedDocs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalDocuments = selected.documents.length;
  const readyDocuments = selected.documents.filter(doc => checkedDocs[`${selected.slug}-${doc}`]).length;
  const readinessPercent = Math.round((readyDocuments / (totalDocuments || 1)) * 100);

  const applyMessage = [
    `🛂 *Sky Way Travels Visa Inquiry: ${selected.name}*`,
    `Readiness: ${readinessPercent}% (${readyDocuments}/${totalDocuments} documents ready)`,
    `Documents Status:`,
    ...selected.documents.map(
      d => `${checkedDocs[`${selected.slug}-${d}`] ? "✅" : "⏳"} ${d}`
    ),
    `\nPlease advise on visa fees, earliest appointment, and processing turnaround.`
  ].join("\n");

  return (
    <main className="min-h-screen bg-[#f8fafc] text-zinc-900 transition-colors duration-500 dark:bg-[#030a05] dark:text-white">
      {/* 3D Glass Header */}
      <Navbar />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#021808] via-[#042810] to-[#021408] px-4 pt-32 pb-24 text-white">
        <div className="pointer-events-none absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-emerald-500/20 blur-[130px]" />
        
        <div className="relative mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.25em] text-amber-300 backdrop-blur-md">
            <Sparkles size={14} /> International Visa Desk
          </div>

          <h1 className="mt-4 max-w-4xl font-display text-4xl sm:text-6xl font-extrabold leading-tight">
            Country-Wise Visa Document Portals
          </h1>

          <p className="mt-4 max-w-2xl text-base sm:text-lg text-zinc-300">
            Accredited embassy document checklists, processing timelines, visa categories and arrival guidelines compiled by Sky Way Travels Tirur.
          </p>
        </div>
      </section>

      {/* Country Selector Card */}
      <section className="relative z-10 -mt-10 px-4 pb-14">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-zinc-200/80 bg-white/90 p-6 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-[#06180c]/90 sm:p-8">
          <div className="flex flex-col gap-4 border-b border-zinc-200 pb-6 dark:border-white/10 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-500">
                17 Available Destinations
              </span>
              <h2 className="mt-1 font-display text-2xl font-bold text-zinc-900 dark:text-white">
                Select Your Destination Country
              </h2>
            </div>

            <div className="relative w-full md:max-w-xs">
              <Search size={18} className="absolute left-3.5 top-3.5 text-zinc-400" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search country..."
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 py-3 pl-10 pr-4 text-xs font-bold text-zinc-900 outline-none transition focus:border-emerald-500 dark:border-white/10 dark:bg-black/30 dark:text-white"
              />
            </div>
          </div>

          {/* Countries Grid */}
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {filteredCountries.map(country => {
              const isSelected = selected.slug === country.slug;
              return (
                <button
                  key={country.slug}
                  type="button"
                  onClick={() => selectCountry(country.slug)}
                  className={`flex flex-col items-center justify-center rounded-2xl p-3 text-center transition-all ${
                    isSelected
                      ? "border border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-700/20 font-black scale-105"
                      : "border border-zinc-200 bg-white/70 text-zinc-700 hover:border-emerald-400 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 font-bold"
                  }`}
                >
                  <span className="text-xs sm:text-sm">{country.name}</span>
                </button>
              );
            })}
          </div>

          {filteredCountries.length === 0 && (
            <div className="py-8 text-center text-sm font-bold text-zinc-500">
              No country found matching &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>
      </section>

      {/* Country Detail Section */}
      <article id="visa-detail" className="scroll-mt-24 px-4 pb-20">
        <div className="mx-auto max-w-7xl">
          {/* Main Visual & Intro */}
          <div className="grid grid-cols-1 gap-8 rounded-[2.5rem] border border-zinc-200/80 bg-white/70 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                <Globe2 size={13} /> {selected.name} Visa Guide
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white">
                {selected.name} Travel Requirements
              </h2>
              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {selected.intro}
              </p>

              {/* Visa Categories */}
              <div className="mt-6">
                <h4 className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Approved Visa Categories
                </h4>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {selected.visaTypes.map(t => (
                    <span
                      key={t}
                      className="rounded-xl border border-zinc-200 bg-white/80 px-3 py-1.5 text-xs font-bold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-zinc-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(applyMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-xl shadow-emerald-700/25 transition hover:scale-105"
                >
                  <Send size={15} />
                  <span>Submit {selected.name} Checklist to WhatsApp</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>

            {/* Destination Photo */}
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl shadow-xl">
              <Image
                src={selected.image}
                alt={`${selected.name} Travel Visa`}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
                priority={selected.slug === "uae"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-[11px] font-black uppercase tracking-widest text-amber-400">Sky Way Verified Guide</p>
                <p className="font-display text-2xl font-bold mt-1">Travel Prepared. Travel Confidently.</p>
              </div>
            </div>
          </div>

          {/* Interactive Document Checklist & Important Notes */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
            {/* Left: Interactive Checklist */}
            <div className="rounded-[2.5rem] border border-zinc-200/80 bg-white/70 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-8">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-white/10">
                <div>
                  <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-white">
                    Mandatory Documents Checklist
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Tick each document you have ready to calculate your submission score.
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-display text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    {readinessPercent}%
                  </span>
                  <span className="block text-[10px] uppercase font-bold text-zinc-400">Ready</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="my-4 h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                  style={{ width: `${readinessPercent}%` }}
                />
              </div>

              {/* Items List */}
              <div className="mt-4 space-y-2.5">
                {selected.documents.map((doc, idx) => {
                  const isChecked = Boolean(checkedDocs[`${selected.slug}-${doc}`]);
                  return (
                    <label
                      key={idx}
                      onClick={() => toggleDoc(doc)}
                      className={`flex cursor-pointer items-start gap-3 rounded-2xl p-3.5 border transition-all ${
                        isChecked
                          ? "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30"
                          : "border-zinc-200 bg-white/80 dark:border-white/5 dark:bg-white/5"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className={`text-xs font-semibold leading-relaxed ${isChecked ? "text-emerald-950 dark:text-emerald-200 font-bold" : "text-zinc-700 dark:text-zinc-300"}`}>
                        {doc}
                      </span>
                    </label>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-white/10">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(applyMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3 text-xs font-black uppercase text-white shadow-md shadow-emerald-700/25"
                >
                  <Send size={14} /> Send Checked Documents for Fast Verification
                </a>
              </div>
            </div>

            {/* Right: Notes & Arrival Guidelines */}
            <div className="space-y-6">
              {/* Important Notes */}
              <div className="rounded-[2.5rem] border border-amber-400/30 bg-amber-400/5 p-6 dark:border-amber-400/20 dark:bg-amber-950/15 sm:p-8">
                <span className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-500">
                  <ShieldCheck size={16} /> Embassy Guidelines & Discretion
                </span>
                <div className="mt-4 space-y-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                  {selected.importantNotes.map((note, idx) => (
                    <p key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-amber-500 mt-0.5">•</span>
                      <span>{note}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Arrival Guidelines */}
              <div className="rounded-[2.5rem] border border-zinc-200/80 bg-white/70 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-8">
                <span className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <BadgeCheck size={16} /> Port of Entry / Arrival Notice
                </span>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {selected.arrival}
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Footer & Floating Hub */}
      <Footer />
      <FloatingActionHub />
    </main>
  );
}
