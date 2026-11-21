"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, FileCheck, HelpCircle, Send, ShieldCheck, Sparkles } from "lucide-react";

interface QuickVisaCountry {
  name: string;
  slug: string;
  flag: string;
  processingTime: string;
  documents: string[];
}

const visaCountriesList: QuickVisaCountry[] = [
  {
    name: "United Arab Emirates (Dubai)",
    slug: "uae",
    flag: "🇦🇪",
    processingTime: "24 - 48 Hours",
    documents: [
      "Passport scan (first & last 2 pages with 6 months validity)",
      "White background passport-size photograph (80% face)",
      "Confirmed return air ticket copy",
      "PAN Card copy (for primary applicant)"
    ]
  },
  {
    name: "Saudi Arabia (Tourist & Umrah)",
    slug: "saudi-arabia",
    flag: "🇸🇦",
    processingTime: "Instant e-Visa",
    documents: [
      "Passport scan with minimum 6 months validity",
      "Recent passport photograph with white background",
      "Confirmed travel itinerary or Umrah dates",
      "Valid email address & phone number"
    ]
  },
  {
    name: "Oman (e-Visa)",
    slug: "oman",
    flag: "🇴🇲",
    processingTime: "2 - 3 Days",
    documents: [
      "Clear passport bio-pages scan",
      "Digital passport photograph not older than 1 month",
      "Confirmed return flight ticket",
      "Hotel booking voucher"
    ]
  },
  {
    name: "Schengen Europe (France, Germany, Italy, Switzerland)",
    slug: "italy",
    flag: "🇪🇺",
    processingTime: "15 - 20 Days",
    documents: [
      "Original passport valid for 6 months + old passports",
      "Last 6 months stamped bank statement with sufficient funds",
      "3 years Income Tax Returns (ITR)",
      "Leave approval letter / NOC from employer",
      "Confirmed flight reservation & hotel vouchers",
      "Overseas travel medical insurance (min €30,000 cover)"
    ]
  },
  {
    name: "United Kingdom (Standard Visitor)",
    slug: "uk",
    flag: "🇬🇧",
    processingTime: "15 Days",
    documents: [
      "Valid passport with at least 1 blank page",
      "6 months bank statements showing regular salary/income",
      "Employment payslips & leave confirmation",
      "Day-wise trip itinerary in the UK"
    ]
  },
  {
    name: "Malaysia (e-Visa / MDAC)",
    slug: "malaysia",
    flag: "🇲🇾",
    processingTime: "1 - 2 Days",
    documents: [
      "Passport bio pages scan",
      "Studio digital photo (35mm x 50mm white background)",
      "Confirmed return tickets",
      "Hotel accommodation voucher"
    ]
  }
];

export default function VisaQuickCheck() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const country = visaCountriesList[selectedIdx];

  const toggleCheck = (doc: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [`${country.slug}-${doc}`]: !prev[`${country.slug}-${doc}`]
    }));
  };

  const totalDocs = country.documents.length;
  const completedDocs = country.documents.filter(doc => checkedItems[`${country.slug}-${doc}`]).length;
  const progressPercent = Math.round((completedDocs / totalDocs) * 100);

  const handleWhatsAppVerification = () => {
    // Asynchronously log to database
    try {
      fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_type: "visa",
          customer_name: "Visa Verification Applicant",
          customer_phone: "+91 8590624181",
          origin: "Tirur",
          destination: country.name,
          travel_class: "Visa Document Scrutiny",
          passengers_count: 1,
          status: "pending",
          details: {
            country: country.name,
            readiness_percentage: progressPercent,
            documents_ready: country.documents.filter(d => checkedItems[`${country.slug}-${d}`])
          }
        })
      }).catch(err => console.error("Visa log error:", err));
    } catch {
      // Non-blocking
    }

    const readyList = country.documents.map(
      d => `${checkedItems[`${country.slug}-${d}`] ? "✅" : "⏳"} ${d}`
    );

    const message = [
      `🛂 *Rozline Travels Visa Document Verification*`,
      `Country: ${country.name}`,
      `Readiness Progress: ${progressPercent}% (${completedDocs}/${totalDocs} documents ready)`,
      `\nDocument Status:`,
      ...readyList,
      `\nPlease assist me with document review, visa appointment, and fast-track submission.`
    ].join("\n");

    window.open(`https://wa.me/918590624181?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="visa" className="relative px-4 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.25em] text-sky-600 dark:text-sky-400">
            <ShieldCheck size={14} /> Interactive Visa Desk
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl text-zinc-900 dark:text-white">
            Instant Visa Document Readiness Checker
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
            Select your destination, tick your available documents, and send your checklist directly to our Tirur visa officers for verification.
          </p>
        </div>

        {/* Checker Console */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 rounded-[2.5rem] border border-zinc-200/80 bg-white/80 p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#05160b]/90 sm:p-8">
          {/* Left: Country Selector */}
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Select Destination Country
            </span>
            <div className="mt-4 space-y-2">
              {visaCountriesList.map((c, i) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setSelectedIdx(i)}
                  className={`flex w-full items-center justify-between rounded-2xl p-3.5 text-left transition-all ${
                    selectedIdx === i
                      ? "border border-sky-500 bg-sky-600 text-white shadow-lg shadow-sky-700/20 font-black"
                      : "border border-zinc-200 bg-white/60 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 font-bold"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">{c.flag}</span>
                    <span className="text-xs sm:text-sm">{c.name}</span>
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      selectedIdx === i ? "bg-black/20 text-white" : "bg-zinc-200 text-zinc-600 dark:bg-white/10 dark:text-zinc-300"
                    }`}
                  >
                    {c.processingTime}
                  </span>
                </button>
              ))}
            </div>

            <Link
              href="/visa-services"
              className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 p-3 text-xs font-bold text-sky-700 transition hover:bg-sky-50 dark:border-white/10 dark:text-sky-400 dark:hover:bg-white/5"
            >
              <span>Explore full 17 country requirements</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Right: Document Checklist */}
          <div className="flex flex-col justify-between rounded-2xl bg-zinc-50/80 p-5 dark:bg-black/30">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-200/80 pb-4 dark:border-white/10">
                <div>
                  <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-white">
                    {country.flag} {country.name} Checklist
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Typical processing time: <span className="font-bold text-amber-500">{country.processingTime}</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-display text-2xl font-black text-sky-600 dark:text-sky-400">
                    {progressPercent}%
                  </span>
                  <span className="block text-[10px] uppercase font-bold text-zinc-400">Readiness</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="my-4 h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-blue-500 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-2.5 my-4">
                {country.documents.map(doc => {
                  const isChecked = Boolean(checkedItems[`${country.slug}-${doc}`]);
                  return (
                    <label
                      key={doc}
                      onClick={() => toggleCheck(doc)}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl p-3 border transition-all ${
                        isChecked
                          ? "border-sky-500 bg-sky-50/60 dark:bg-sky-950/30"
                          : "border-zinc-200 bg-white dark:border-white/5 dark:bg-white/5"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 h-4 w-4 rounded text-sky-600 focus:ring-sky-500"
                      />
                      <span className={`text-xs font-semibold leading-relaxed ${isChecked ? "text-sky-950 dark:text-sky-200 font-bold" : "text-zinc-700 dark:text-zinc-300"}`}>
                        {doc}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 border-t border-zinc-200 pt-4 dark:border-white/10">
              <button
                type="button"
                onClick={handleWhatsAppVerification}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-xl shadow-sky-700/25 transition hover:scale-[1.01]"
              >
                <Send size={15} />
                <span>Submit Checklist to WhatsApp for Quick Verification</span>
              </button>
              <p className="mt-2 text-center text-[11px] text-zinc-500 dark:text-zinc-400">
                Zero service charge for document scrutiny. Our team reviews your papers within 15 minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
