"use client";

import Image from "next/image";
import { BadgeCheck, Star, Sparkles, MessageSquareQuote } from "lucide-react";

const reviewsList = [
  {
    name: "Afsal Rahman",
    location: "Tirur / Dubai Expat",
    text: "Rozline Travels made our family visa and Emirates ticket booking effortless. We got our Dubai visa approval in less than 24 hours and direct seats from Calicut with complete web check-in handled for us.",
    rating: 5,
    tag: "Verified UAE Travel",
    avatar: "https://i.pravatar.cc/160?img=12"
  },
  {
    name: "Shahana Parveen",
    location: "Malappuram",
    text: "Booked our 15-day Umrah package with Rozline. The hotel in Makkah was genuinely 50 meters from Haram just as promised. Authentic Kerala meals and cooperative guides made the pilgrimage deeply peaceful.",
    rating: 5,
    tag: "VIP Umrah Package",
    avatar: "https://i.pravatar.cc/160?img=47"
  },
  {
    name: "Nithin Kumar",
    location: "Calicut",
    text: "Fastest response on WhatsApp! Whenever I need last-minute ticket changes or extra luggage tickets on Gulf routes, Rozline Tirur sorts it out within minutes. Transparent pricing with zero surprise charges.",
    rating: 5,
    tag: "Flight & Insurance",
    avatar: "https://i.pravatar.cc/160?img=68"
  }
];

export default function Reviews3D() {
  return (
    <section className="relative px-4 py-24 bg-gradient-to-b from-transparent via-sky-950/15 to-transparent">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.25em] text-amber-500">
            <Sparkles size={14} /> Traveler Testimonials
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl text-zinc-900 dark:text-white">
            Trusted by 10,000+ Happy Explorers
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <span className="text-sm font-bold text-zinc-700 dark:text-zinc-200">
              4.9 / 5.0 Star Rating on Google Reviews
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsList.map(review => (
            <div
              key={review.name}
              className="relative flex flex-col justify-between rounded-[2rem] border border-zinc-200/80 bg-white/70 p-6 shadow-xl backdrop-blur-xl transition hover:-translate-y-1 hover:border-amber-400 dark:border-white/10 dark:bg-white/5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <span className="rounded-full bg-sky-500/15 px-2.5 py-0.5 text-[10px] font-black text-sky-700 dark:text-sky-400">
                    {review.tag}
                  </span>
                </div>

                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3.5 border-t border-zinc-100 pt-4 dark:border-white/10">
                <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-sky-500/30">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-1.5">
                    {review.name}
                    <BadgeCheck size={14} className="text-sky-500" />
                  </h4>
                  <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
