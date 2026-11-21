"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Clock, Flame, Plane, Send, Sparkles, Ticket } from "lucide-react";
import { OfferRecord } from "@/lib/supabase";

export default function OffersSection() {
  const [offers, setOffers] = useState<OfferRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch("/api/offers");
        const data = await res.json();
        if (data.ok && data.offers) {
          // Filter to active offers only
          setOffers(data.offers.filter((o: OfferRecord) => o.is_active));
        }
      } catch (err) {
        console.error("Failed to load promotional offers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const handleBookOffer = (offer: OfferRecord) => {
    const message = [
      `🔥 *Sky Way Travels Special Offer Inquiry*`,
      `Offer: ${offer.title}`,
      `Route/Details: ${offer.route}`,
      `Special Price: ${offer.price}`,
      `Validity: ${offer.validity}`,
      `---------------------------------------`,
      `Hi Sky Way Tirur team, please confirm seat/package availability for this offer.`
    ].join("\n");

    window.open(`https://wa.me/918590624181?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="offers" className="relative px-4 py-24 bg-white dark:bg-transparent">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400">
            <Flame size={14} className="animate-pulse" /> Verified Flash Deals
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl text-zinc-900 dark:text-white">
            Special Promotional Offers
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
            Handpicked discounted routes and luxury tour slots updated in real-time from our Tirur travel desk.
          </p>
        </div>

        {/* Dynamic Offers Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map(offer => (
            <div
              key={offer.id}
              className="group relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-white/95 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:shadow-2xl dark:border-white/10 dark:bg-white/5"
            >
              {/* Cover Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={offer.image_url}
                  alt={offer.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Badge */}
                <div className="absolute left-3 top-3">
                  <span className="rounded-full bg-amber-500/90 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-black backdrop-blur-md shadow-md">
                    {offer.badge}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="font-display text-base font-bold text-zinc-900 line-clamp-1 dark:text-white">
                  {offer.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-600 line-clamp-1 dark:text-zinc-300">
                  {offer.route}
                </p>

                {/* Pricing Block */}
                <div className="mt-4 flex items-baseline justify-between border-t border-zinc-100 pt-3 dark:border-white/10">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 block">Offer Fare</span>
                    <span className="font-display text-xl font-black text-emerald-700 dark:text-emerald-400">
                      {offer.price}
                    </span>
                  </div>
                  {offer.original_price && (
                    <span className="text-xs font-semibold text-zinc-400 line-through">
                      {offer.original_price}
                    </span>
                  )}
                </div>

                {/* Validity Note */}
                <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                  <Clock size={12} className="text-amber-500" />
                  <span className="truncate">{offer.validity}</span>
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => handleBookOffer(offer)}
                  className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-2xl bg-emerald-600 py-2.5 text-xs font-black text-white shadow-md shadow-emerald-700/20 transition hover:bg-emerald-500 active:scale-95"
                >
                  <Send size={13} />
                  <span>Grab Deal on WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
