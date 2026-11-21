"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Compass,
  FileCheck2,
  Menu,
  Moon,
  Phone,
  Plane,
  Sparkles,
  Sun,
  X,
  Send,
  ShieldCheck
} from "lucide-react";

const phonePrimary = "+91 8590624181";
const waNumber = "918590624181";

const navLinks = [
  { label: "Book Flights", href: "/book-flights", icon: Plane, highlight: true },
  { label: "Visa Services", href: "/visa-services", icon: FileCheck2 },
  { label: "Umrah Luxury", href: "#umrah", icon: Sparkles },
  { label: "Destinations", href: "#destinations", icon: Compass },
  { label: "Offers", href: "#offers", icon: ShieldCheck },
  { label: "Contact", href: "#contact", icon: Phone }
];

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Default to clean white luxury theme unless dark is explicitly chosen
    const storedTheme = localStorage.getItem("skyway-theme");
    if (storedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("skyway-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("skyway-theme", "light");
      }
      return next;
    });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-2.5" : "py-4 sm:py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <nav
            className={`flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 ${
              isScrolled
                ? "border-white/15 bg-white/85 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#07152b]/90"
                : "border-white/20 bg-white/65 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-[#030b17]/80"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2.5">
              <div className="relative h-10 w-10 sm:h-11 sm:w-11 overflow-hidden rounded-xl bg-white p-0.5 shadow ring-2 ring-sky-500/30 transition group-hover:ring-orange-500/80">
                <Image
                  src="/logo.png"
                  alt="Rozline Travel and Tours"
                  fill
                  sizes="44px"
                  className="object-contain p-0.5"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black uppercase tracking-[0.16em] text-sky-950 dark:text-sky-300 group-hover:text-orange-500 transition-colors font-display">
                  ROZLINE
                </span>
                <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-zinc-500 dark:text-zinc-400">
                  Travel & Tours
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map(link => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                      link.highlight
                        ? "bg-sky-600/15 text-sky-800 hover:bg-sky-600 hover:text-white dark:bg-sky-500/20 dark:text-sky-300 dark:hover:bg-sky-500 dark:hover:text-black font-bold"
                        : "text-zinc-700 hover:text-sky-600 hover:bg-black/5 dark:text-zinc-200 dark:hover:text-sky-400 dark:hover:bg-white/5"
                    }`}
                  >
                    <Icon size={14} className={link.highlight ? "text-orange-500" : ""} />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Actions: Theme Toggle, Quick Call, WhatsApp */}
            <div className="flex items-center gap-2">
              {/* Dark/Light Toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle visual theme"
                className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-black/10 bg-white/80 text-zinc-800 transition hover:border-orange-400 hover:text-orange-500 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:border-orange-400"
              >
                {isDark ? <Sun size={17} className="text-orange-400" /> : <Moon size={17} />}
              </button>

              {/* Phone Call Icon Button */}
              <a
                href={`tel:${phonePrimary.replace(/\s+/g, "")}`}
                title={`Call Tirur Office: ${phonePrimary}`}
                aria-label="Direct Phone Call"
                className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-sky-600/25 bg-sky-50/80 text-sky-700 transition hover:bg-sky-600 hover:text-white shadow-sm hover:scale-105 active:scale-95 dark:border-sky-500/30 dark:bg-sky-500/15 dark:text-sky-300"
              >
                <Phone size={16} />
              </a>

              {/* WhatsApp Action */}
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                  "Hello Rozline Travels Tirur! I would like to plan my travel."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-sky-700/25 transition hover:scale-105 active:scale-95"
              >
                <Send size={14} />
                <span>WhatsApp</span>
              </a>

              {/* Mobile Drawer Trigger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-sky-950 text-white dark:bg-white/10 lg:hidden"
              >
                <Menu size={18} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 flex h-full w-[85%] max-w-sm flex-col bg-white/95 p-6 shadow-2xl backdrop-blur-2xl dark:bg-[#07152b]/95 dark:text-white">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white p-0.5 shadow ring-2 ring-sky-500/40">
                  <Image
                    src="/logo.png"
                    alt="Rozline Travels logo"
                    fill
                    className="object-contain p-0.5"
                  />
                </div>
                <div>
                  <p className="text-sm font-black uppercase text-sky-700 dark:text-sky-400">Rozline Travels</p>
                  <p className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">Tirur, Malappuram</p>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="grid h-9 w-9 place-items-center rounded-full border border-zinc-200 text-zinc-700 dark:border-white/15 dark:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-2 overflow-y-auto">
              {navLinks.map(link => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-2xl p-3.5 text-sm font-bold transition ${
                      link.highlight
                        ? "bg-sky-600 text-white shadow-md shadow-sky-700/30"
                        : "bg-zinc-100 text-zinc-800 hover:bg-sky-50 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={18} className={link.highlight ? "text-orange-400" : "text-sky-500"} />
                      {link.label}
                    </span>
                    <span className="text-xs opacity-60">→</span>
                  </Link>
                );
              })}
            </div>

            {/* Quick Contact Footer in Drawer */}
            <div className="mt-auto border-t border-zinc-200 pt-6 dark:border-white/10">
              <p className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-orange-400">Direct Contact Line</p>
              <a
                href={`tel:${phonePrimary.replace(/\s+/g, "")}`}
                className="mt-2 flex items-center gap-2 text-sm font-extrabold text-zinc-900 dark:text-white"
              >
                <Phone size={16} className="text-sky-600" />
                <span>{phonePrimary}</span>
              </a>
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-emerald-700/30"
              >
                <Send size={15} /> <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
