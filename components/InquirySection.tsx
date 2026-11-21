"use client";

import { FormEvent, useState } from "react";
import { Mail, MapPin, Phone, Send, Sparkles, CheckCircle2 } from "lucide-react";

const phonePrimary = "+91 8590624181";
const phoneAlt = "+91 9188250904";
const email = "skywaytravelstirur@gmail.com";

export default function InquirySection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "");
    const phone = String(formData.get("phone") || "");
    const destination = String(formData.get("destination") || "");
    const date = String(formData.get("date") || "");
    const service = String(formData.get("service") || "Travel Service");
    const notes = String(formData.get("message") || "Please contact with best rates");

    // Asynchronously log lead to Supabase API
    try {
      fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_type: service.toLowerCase().includes("flight")
            ? "flight"
            : service.toLowerCase().includes("visa")
            ? "visa"
            : service.toLowerCase().includes("umrah")
            ? "umrah"
            : "holiday",
          customer_name: name,
          customer_phone: phone,
          origin: "Tirur (Kerala)",
          destination: destination,
          travel_date: date,
          passengers_count: 1,
          travel_class: "Standard",
          status: "pending",
          details: {
            service_requested: service,
            customer_notes: notes,
            source: "Inquiry Form Desk"
          }
        })
      }).catch(err => console.error("Lead sync error:", err));
    } catch {
      // Non-blocking
    }

    const message = [
      `🌟 *Rozline Travels Tirur Travel Inquiry*`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Destination: ${destination}`,
      `Travel Date: ${date}`,
      `Service: ${service}`,
      `Additional Notes: ${notes}`,
      `---------------------------------------`,
      `Inquiry generated via Rozline 3D Travel Desk`
    ].join("\n");

    window.open(`https://wa.me/918590624181?text=${encodeURIComponent(message)}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[3rem] border border-zinc-200/80 bg-gradient-to-br from-[#061833] via-[#092244] to-[#040e1e] p-6 text-white shadow-2xl dark:border-white/10 sm:p-10 lg:p-14">
          
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Column: Office Details */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.25em] text-amber-400">
                <Sparkles size={14} /> Tirur Travel Desk
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl leading-tight">
                Tell Us Where You Want To Fly.
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-300">
                Whether it is an emergency ticket to the Gulf, an upcoming family Umrah, a European holiday, or international visa stamping, our Tirur office is ready to assist you.
              </p>

              <div className="mt-8 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/10 text-amber-400">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Visit Our Tirur Branch</h4>
                    <p className="text-xs text-zinc-300">Opposite Townhall, Tirur, Malappuram, Kerala - 676101</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/10 text-sky-400">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Direct Phone Lines</h4>
                    <p className="text-xs text-zinc-300">{phonePrimary} • {phoneAlt}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/10 text-teal-400">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Email Desk</h4>
                    <p className="text-xs text-zinc-300">{email}</p>
                  </div>
                </div>
              </div>

              {/* Location Map Preview */}
              <div className="mt-8 overflow-hidden rounded-2xl border border-white/15 shadow-lg">
                <iframe
                  title="Rozline Travels Tirur Location"
                  className="h-48 w-full border-0"
                  src="https://www.google.com/maps?q=Opposite%20Townhall%2C%20Tirur%2C%20Malappuram%2C%20Kerala%2C%20India&output=embed"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur-xl shadow-xl sm:p-8">
              <h3 className="font-display text-2xl font-bold text-white">
                Quick WhatsApp Booking Inquiry
              </h3>
              <p className="mt-1 text-xs text-zinc-300">
                Fill the details below to open a formatted booking ticket on WhatsApp.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-300 uppercase">Your Name</label>
                    <input
                      name="name"
                      type="text"
                      placeholder="e.g. Mohammed Ali"
                      required
                      className="mt-1.5 w-full rounded-xl border border-white/20 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-300 uppercase">Phone / WhatsApp</label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="e.g. +91 9876543210"
                      required
                      className="mt-1.5 w-full rounded-xl border border-white/20 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-300 uppercase">Destination</label>
                    <input
                      name="destination"
                      type="text"
                      placeholder="e.g. Dubai, Jeddah, London"
                      required
                      className="mt-1.5 w-full rounded-xl border border-white/20 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-300 uppercase">Travel Date</label>
                    <input
                      name="date"
                      type="date"
                      required
                      className="mt-1.5 w-full rounded-xl border border-white/20 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-300 uppercase">Service Category</label>
                  <select
                    name="service"
                    className="mt-1.5 w-full rounded-xl border border-white/20 bg-black/40 px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-400"
                  >
                    <option value="Flight Ticket Booking" className="text-zinc-900">Flight Ticket Booking</option>
                    <option value="Visa Assistance" className="text-zinc-900">Visa Assistance</option>
                    <option value="Umrah Package" className="text-zinc-900">VIP Umrah Package</option>
                    <option value="Holiday Package" className="text-zinc-900">International Holiday Package</option>
                    <option value="Hotel Reservation" className="text-zinc-900">Hotel Reservation</option>
                    <option value="Travel Insurance" className="text-zinc-900">Travel Medical Insurance</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-300 uppercase">Message / Specific Request</label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Provide airline preference, number of travelers, or specific visa requirements..."
                    className="mt-1.5 w-full rounded-xl border border-white/20 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-xl shadow-sky-700/30 transition hover:brightness-110 active:scale-[0.99]"
                >
                  <Send size={15} />
                  <span>Send Inquiry to Rozline WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
