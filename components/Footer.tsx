"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Send, ShieldCheck, Heart } from "lucide-react";

const phonePrimary = "+91 8590624181";
const phoneAlt = "+91 9188250904";
const email = "skywaytravelstirur@gmail.com";

export default function Footer() {
  return (
    <footer className="relative border-t border-zinc-200/80 bg-[#020d05] text-white pt-16 pb-12 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-emerald-500/40">
                <Image
                  src="/sky-way-logo.jpg"
                  alt="Sky Way Travels Tirur Logo"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="block text-base font-black uppercase tracking-[0.2em] text-emerald-400">
                  Sky Way Travels
                </span>
                <span className="block text-xs font-semibold text-zinc-400">
                  Tirur, Malappuram, Kerala
                </span>
              </div>
            </Link>

            <p className="mt-4 max-w-md text-xs sm:text-sm leading-relaxed text-zinc-400">
              Sky Way Travels Tirur is Kerala&apos;s premier international travel desk. Specializing in direct flight ticket bookings, 24-hour Gulf visit visas, luxury 5-star Umrah tours, international holiday packages, hotel vouchers, and 24/7 dedicated customer assistance.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.instagram.com/skyway_travels/"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-zinc-300 transition hover:bg-emerald-600 hover:text-white"
                aria-label="Sky Way Instagram"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61561634927052"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-zinc-300 transition hover:bg-emerald-600 hover:text-white"
                aria-label="Sky Way Facebook"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={`mailto:${email}`}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-zinc-300 transition hover:bg-emerald-600 hover:text-white"
                aria-label="Email Sky Way"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-amber-400">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs font-semibold text-zinc-400">
              <li>
                <Link href="/book-flights" className="transition hover:text-emerald-400">
                  Book Flights (Live Desk)
                </Link>
              </li>
              <li>
                <Link href="/visa-services" className="transition hover:text-emerald-400">
                  Visa Document Requirements
                </Link>
              </li>
              <li>
                <a href="#umrah" className="transition hover:text-emerald-400">
                  Umrah & Hajj Packages
                </a>
              </li>
              <li>
                <a href="#destinations" className="transition hover:text-emerald-400">
                  Popular Holiday Destinations
                </a>
              </li>
              <li>
                <a href="#offers" className="transition hover:text-emerald-400">
                  Special Travel Offers
                </a>
              </li>
              <li>
                <Link href="/admin" className="transition text-zinc-500 hover:text-amber-400 flex items-center gap-1">
                  <span>Staff Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-amber-400">
              Services Desk
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs font-semibold text-zinc-400">
              <li>International & Domestic Flights</li>
              <li>Gulf Visit & Tourist Visas</li>
              <li>Luxury Umrah Groups</li>
              <li>Holiday Itineraries & Resorts</li>
              <li>Global Hotel Reservations</li>
              <li>Overseas Travel Insurance</li>
              <li>Passport & Emigration Support</li>
            </ul>
          </div>

          {/* Head Office Tirur */}
          <div>
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-amber-400">
              Headquarters
            </h4>
            <div className="mt-4 space-y-3 text-xs text-zinc-400">
              <p className="flex items-start gap-2.5">
                <MapPin size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Opposite Townhall, Tirur, Malappuram District, Kerala - 676101</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone size={15} className="text-amber-400 shrink-0" />
                <span>{phonePrimary}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone size={15} className="text-amber-400 shrink-0" />
                <span>{phoneAlt}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail size={15} className="text-teal-400 shrink-0" />
                <span className="truncate">{email}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Sky Way Travels Tirur. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 flex items-center gap-1">
            <span>Crafted with</span>
            <Heart size={12} className="text-red-500 fill-red-500" />
            <span>for Travelers Worldwide</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
