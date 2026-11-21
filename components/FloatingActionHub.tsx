"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Phone, Send } from "lucide-react";

const phonePrimary = "+91 8590624181";
const waNumber = "918590624181";

export default function FloatingActionHub() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-2.5">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/70 text-white shadow-xl backdrop-blur-md transition-all hover:bg-emerald-600 hover:scale-110 active:scale-95"
        >
          <ArrowUp size={16} />
        </button>
      )}

      {/* Quick Call Button (Mobile Only) */}
      <a
        href={`tel:${phonePrimary.replace(/\s+/g, "")}`}
        aria-label="Direct Phone Call"
        className="grid sm:hidden h-12 w-12 place-items-center rounded-full border border-emerald-400/40 bg-emerald-800 text-white shadow-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95"
      >
        <Phone size={19} />
      </a>

      {/* WhatsApp Concierge Button */}
      <a
        href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
          "Hello Sky Way Travels Tirur! I need assistance with travel planning."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Sky Way Travels on WhatsApp"
        className="group relative flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#25D366] via-emerald-500 to-[#128C7E] p-3 sm:px-5 sm:py-3.5 text-white shadow-2xl shadow-emerald-500/40 transition-all hover:scale-105 hover:shadow-emerald-500/60 active:scale-95 ring-2 ring-white/30"
      >
        {/* Radar Pulse Effect */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-30 blur-sm group-hover:opacity-50 transition-opacity" />
        
        <Send size={20} className="relative transition-transform group-hover:rotate-12" />
        <span className="relative hidden sm:inline text-xs font-black uppercase tracking-wider">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
