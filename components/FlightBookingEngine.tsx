"use client";

import { useState, useMemo } from "react";
import {
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  CreditCard,
  FileCheck,
  Filter,
  Luggage,
  MapPin,
  Plane,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  Utensils,
  X
} from "lucide-react";

type ActiveTab = "flights" | "visas" | "umrah" | "holidays" | "hotels";
type TripType = "one-way" | "round-trip";

interface FlightOption {
  id: string;
  airline: string;
  airlineCode: string;
  logo: string;
  flightNumber: string;
  fromCode: string;
  fromName: string;
  toCode: string;
  toName: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  price: number;
  baggage: string;
  meals: boolean;
  cabinClass: string;
}

const popularAirports = [
  { code: "CCJ", name: "Calicut (Kozhikode)", city: "Calicut, Kerala" },
  { code: "COK", name: "Cochin International", city: "Kochi, Kerala" },
  { code: "CNN", name: "Kannur International", city: "Kannur, Kerala" },
  { code: "TRV", name: "Trivandrum International", city: "Thiruvananthapuram, Kerala" },
  { code: "DXB", name: "Dubai International", city: "Dubai, UAE" },
  { code: "JED", name: "King Abdulaziz Intl", city: "Jeddah, Saudi Arabia" },
  { code: "RUH", name: "King Khalid Intl", city: "Riyadh, Saudi Arabia" },
  { code: "DOH", name: "Hamad International", city: "Doha, Qatar" },
  { code: "MCT", name: "Muscat International", city: "Muscat, Oman" },
  { code: "KWI", name: "Kuwait International", city: "Kuwait City" },
  { code: "SIN", name: "Changi International", city: "Singapore" },
  { code: "KUL", name: "Kuala Lumpur Intl", city: "Malaysia" },
  { code: "MLE", name: "Velana International", city: "Male, Maldives" },
  { code: "LHR", name: "Heathrow Airport", city: "London, UK" }
];

export default function FlightBookingEngine() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("flights");
  const [tripType, setTripType] = useState<TripType>("one-way");
  const [fromAirport, setFromAirport] = useState("CCJ");
  const [toAirport, setToAirport] = useState("DXB");
  const [departureDate, setDepartureDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().slice(0, 10);
  });
  const [returnDate, setReturnDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 10);
    return d.toISOString().slice(0, 10);
  });
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedAirlineFilter, setSelectedAirlineFilter] = useState("ALL");
  const [nonStopOnly, setNonStopOnly] = useState(false);

  // Seat Picker Modal State
  const [seatModalFlight, setSeatModalFlight] = useState<FlightOption | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string>("3A");

  // Simulated dynamic flight generation based on selections
  const flightResults = useMemo<FlightOption[]>(() => {
    const from = popularAirports.find(a => a.code === fromAirport)?.name || fromAirport;
    const to = popularAirports.find(a => a.code === toAirport)?.name || toAirport;

    return [
      {
        id: "fl-1",
        airline: "Emirates",
        airlineCode: "EK",
        logo: "🇦🇪",
        flightNumber: "EK-563",
        fromCode: fromAirport,
        fromName: from,
        toCode: toAirport,
        toName: to,
        departureTime: "04:30 AM",
        arrivalTime: "07:15 AM",
        duration: "4h 15m",
        stops: "Direct Non-Stop",
        price: 18450,
        baggage: "30 KG Check-in + 7 KG Cabin",
        meals: true,
        cabinClass: travelClass
      },
      {
        id: "fl-2",
        airline: "Air India Express",
        airlineCode: "IX",
        logo: "🇮🇳",
        flightNumber: "IX-345",
        fromCode: fromAirport,
        fromName: from,
        toCode: toAirport,
        toName: to,
        departureTime: "09:10 AM",
        arrivalTime: "11:55 AM",
        duration: "4h 15m",
        stops: "Direct Non-Stop",
        price: 13990,
        baggage: "30 KG Check-in + 7 KG Cabin",
        meals: true,
        cabinClass: travelClass
      },
      {
        id: "fl-3",
        airline: "Saudia",
        airlineCode: "SV",
        logo: "🇸🇦",
        flightNumber: "SV-782",
        fromCode: fromAirport,
        fromName: from,
        toCode: toAirport,
        toName: to,
        departureTime: "11:40 AM",
        arrivalTime: "03:10 PM",
        duration: "5h 00m",
        stops: "Direct Non-Stop",
        price: 21500,
        baggage: "46 KG (2 Pcs) + 7 KG Cabin",
        meals: true,
        cabinClass: travelClass
      },
      {
        id: "fl-4",
        airline: "IndiGo",
        airlineCode: "6E",
        logo: "🇮🇳",
        flightNumber: "6E-1402",
        fromCode: fromAirport,
        fromName: from,
        toCode: toAirport,
        toName: to,
        departureTime: "06:20 PM",
        arrivalTime: "09:05 PM",
        duration: "4h 15m",
        stops: "Direct Non-Stop",
        price: 12800,
        baggage: "30 KG Check-in + 7 KG Cabin",
        meals: false,
        cabinClass: travelClass
      },
      {
        id: "fl-5",
        airline: "Qatar Airways",
        airlineCode: "QR",
        logo: "🇶🇦",
        flightNumber: "QR-517",
        fromCode: fromAirport,
        fromName: from,
        toCode: toAirport,
        toName: to,
        departureTime: "03:55 AM",
        arrivalTime: "09:20 AM",
        duration: "6h 55m",
        stops: "1 Stop (DOH)",
        price: 24300,
        baggage: "35 KG Check-in + 7 KG Cabin",
        meals: true,
        cabinClass: travelClass
      }
    ];
  }, [fromAirport, toAirport, travelClass]);

  const filteredFlights = useMemo(() => {
    return flightResults.filter(f => {
      if (nonStopOnly && !f.stops.includes("Direct")) return false;
      if (selectedAirlineFilter !== "ALL" && f.airline !== selectedAirlineFilter) return false;
      return true;
    });
  }, [flightResults, nonStopOnly, selectedAirlineFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
      // Smooth scroll to flight results
      document.getElementById("flight-results-anchor")?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  const handleWhatsAppBooking = (flight: FlightOption) => {
    // 1. Asynchronously log booking to Supabase API
    try {
      fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_type: "flight",
          customer_name: "Online Web Traveler",
          customer_phone: "+91 8590624181",
          origin: `${flight.fromCode} (${flight.fromName})`,
          destination: `${flight.toCode} (${flight.toName})`,
          travel_date: departureDate,
          return_date: tripType === "round-trip" ? returnDate : null,
          passengers_count: passengers,
          travel_class: flight.cabinClass,
          selected_seat: selectedSeat,
          estimated_price: flight.price * passengers,
          currency: "INR",
          details: {
            airline: flight.airline,
            flight_number: flight.flightNumber,
            trip_type: tripType,
            departure_time: flight.departureTime,
            arrival_time: flight.arrivalTime,
            stops: flight.stops,
            baggage: flight.baggage
          }
        })
      }).catch(err => console.error("Flight booking sync error:", err));
    } catch {
      // Non-blocking
    }

    const message = [
      `✈️ *Rozline Travels Flight Booking Inquiry*`,
      `Route: ${flight.fromCode} (${flight.fromName}) ➔ ${flight.toCode} (${flight.toName})`,
      `Airline: ${flight.airline} (${flight.flightNumber})`,
      `Trip Type: ${tripType.toUpperCase()}`,
      `Departure Date: ${departureDate}`,
      tripType === "round-trip" ? `Return Date: ${returnDate}` : "",
      `Passengers: ${passengers}`,
      `Class: ${flight.cabinClass}`,
      `Selected Seat: ${selectedSeat}`,
      `Estimated Fare: ₹${(flight.price * passengers).toLocaleString("en-IN")}`,
      `---------------------------------`,
      `Please confirm seat availability and issuance for this itinerary.`
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`https://wa.me/918590624181?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="relative mx-auto w-full max-w-full lg:max-w-6xl overflow-hidden">
      {/* 3D Glass Console Shell */}
      <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-zinc-200/90 bg-white/95 p-3.5 sm:p-7 shadow-2xl shadow-zinc-900/5 backdrop-blur-2xl dark:border-white/10 dark:bg-[#07152b]/90">
        
        {/* Glow Accents */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />

        {/* Category Tabs */}
        <div className="relative z-10 flex items-center gap-1 overflow-x-auto pb-4 border-b border-zinc-200/80 dark:border-white/10">
          {[
            { id: "flights", label: "Flight Tickets", icon: Plane, tag: "Live Desk" },
            { id: "visas", label: "Visa Services", icon: FileCheck, tag: "Fast Track" },
            { id: "umrah", label: "Umrah Packages", icon: Sparkles, tag: "VIP 5★" },
            { id: "holidays", label: "Holidays & Tours", icon: Compass, tag: "Best Deals" },
            { id: "hotels", label: "Luxury Hotels", icon: MapPin, tag: "Instant" }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`group flex shrink-0 items-center gap-2.5 rounded-2xl px-4 py-3 text-xs sm:text-sm font-black transition-all ${
                  active
                    ? "bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg shadow-sky-600/30 ring-1 ring-sky-400/50"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5"
                }`}
              >
                <Icon size={17} className={active ? "text-amber-300" : "text-sky-500"} />
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase ${
                    active ? "bg-black/20 text-white" : "bg-zinc-200 text-zinc-700 dark:bg-white/10 dark:text-zinc-300"
                  }`}
                >
                  {tab.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: FLIGHT SEARCH CONSOLE */}
        {activeTab === "flights" && (
          <div className="relative z-10 pt-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex rounded-full bg-zinc-100 p-1 dark:bg-white/5 border border-zinc-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setTripType("one-way")}
                  className={`rounded-full px-4 py-1.5 text-xs font-black transition-all ${
                    tripType === "one-way"
                      ? "bg-sky-600 text-white shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  One Way
                </button>
                <button
                  type="button"
                  onClick={() => setTripType("round-trip")}
                  className={`rounded-full px-4 py-1.5 text-xs font-black transition-all ${
                    tripType === "round-trip"
                      ? "bg-sky-600 text-white shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  Round Trip
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-sky-700 dark:text-sky-400">
                <ShieldCheck size={16} />
                <span>Direct Agent Fares • 24/7 Tirur WhatsApp Support</span>
              </div>
            </div>

            {/* Flight Search Form */}
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Origin */}
              <div className="relative flex flex-col gap-1.5 rounded-2xl border border-zinc-200 bg-white/70 p-3.5 transition focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 dark:border-white/10 dark:bg-black/40">
                <label className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  <Plane size={13} className="text-sky-500" /> From Airport
                </label>
                <select
                  value={fromAirport}
                  onChange={e => setFromAirport(e.target.value)}
                  className="w-full bg-transparent font-bold text-zinc-900 outline-none dark:text-white"
                >
                  {popularAirports.map(a => (
                    <option key={a.code} value={a.code} className="text-zinc-900">
                      {a.name} ({a.code})
                    </option>
                  ))}
                </select>
                <span className="text-[10px] font-semibold text-zinc-400 truncate">
                  {popularAirports.find(a => a.code === fromAirport)?.city}
                </span>
              </div>

              {/* Destination */}
              <div className="relative flex flex-col gap-1.5 rounded-2xl border border-zinc-200 bg-white/70 p-3.5 transition focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 dark:border-white/10 dark:bg-black/40">
                <label className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  <MapPin size={13} className="text-amber-500" /> To Destination
                </label>
                <select
                  value={toAirport}
                  onChange={e => setToAirport(e.target.value)}
                  className="w-full bg-transparent font-bold text-zinc-900 outline-none dark:text-white"
                >
                  {popularAirports.map(a => (
                    <option key={a.code} value={a.code} className="text-zinc-900">
                      {a.name} ({a.code})
                    </option>
                  ))}
                </select>
                <span className="text-[10px] font-semibold text-zinc-400 truncate">
                  {popularAirports.find(a => a.code === toAirport)?.city}
                </span>
              </div>

              {/* Departure Date */}
              <div className="relative flex flex-col gap-1.5 rounded-2xl border border-zinc-200 bg-white/70 p-3.5 transition focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 dark:border-white/10 dark:bg-black/40">
                <label className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  <Calendar size={13} className="text-sky-500" /> Departure Date
                </label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={e => setDepartureDate(e.target.value)}
                  className="w-full bg-transparent font-bold text-zinc-900 outline-none dark:text-white"
                  required
                />
                <span className="text-[10px] font-semibold text-zinc-400">Flexible dates available</span>
              </div>

              {/* Return Date or Passengers */}
              {tripType === "round-trip" ? (
                <div className="relative flex flex-col gap-1.5 rounded-2xl border border-zinc-200 bg-white/70 p-3.5 transition focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 dark:border-white/10 dark:bg-black/40">
                  <label className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    <Calendar size={13} className="text-amber-500" /> Return Date
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={e => setReturnDate(e.target.value)}
                    className="w-full bg-transparent font-bold text-zinc-900 outline-none dark:text-white"
                    required
                  />
                  <span className="text-[10px] font-semibold text-zinc-400">Round trip savings applied</span>
                </div>
              ) : (
                <div className="relative flex flex-col gap-1.5 rounded-2xl border border-zinc-200 bg-white/70 p-3.5 transition focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 dark:border-white/10 dark:bg-black/40">
                  <label className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    <Users size={13} className="text-sky-500" /> Passengers & Cabin
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      value={passengers}
                      onChange={e => setPassengers(Number(e.target.value))}
                      className="bg-transparent font-bold text-zinc-900 outline-none dark:text-white"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                        <option key={num} value={num} className="text-zinc-900">
                          {num} {num === 1 ? "Adult" : "Travelers"}
                        </option>
                      ))}
                    </select>
                    <span className="text-zinc-400">•</span>
                    <select
                      value={travelClass}
                      onChange={e => setTravelClass(e.target.value)}
                      className="bg-transparent font-bold text-zinc-900 outline-none dark:text-white"
                    >
                      <option value="Economy" className="text-zinc-900">Economy</option>
                      <option value="Business" className="text-zinc-900">Business</option>
                      <option value="First Class" className="text-zinc-900">First</option>
                    </select>
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-400">Infant & child discounts supported</span>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:col-span-2 lg:col-span-4 mt-2">
                <button
                  type="submit"
                  disabled={isSearching}
                  className="flex-1 flex min-h-[52px] sm:min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 px-4 sm:px-6 text-xs sm:text-sm font-black text-white shadow-xl shadow-sky-700/25 transition hover:scale-[1.01] active:scale-[0.99]"
                >
                  {isSearching ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Scanning Airline Fares...
                    </span>
                  ) : (
                    <>
                      <Plane size={18} className="shrink-0" />
                      <span className="truncate">Search Live Flights ({fromAirport} ➔ {toAirport})</span>
                      <ChevronRight size={17} className="shrink-0" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* FLIGHT RESULTS SHOWCASE */}
            <div id="flight-results-anchor" className="mt-8 border-t border-zinc-200 pt-6 dark:border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-white">
                    Available Flights: <span className="text-sky-600 dark:text-sky-400">{fromAirport} ➔ {toAirport}</span>
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Showing best price options for {departureDate}. All prices include taxes & Rozline concierge assistance.
                  </p>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer rounded-xl bg-zinc-100 px-3 py-1.5 font-bold text-zinc-700 dark:bg-white/10 dark:text-zinc-200">
                    <input
                      type="checkbox"
                      checked={nonStopOnly}
                      onChange={e => setNonStopOnly(e.target.checked)}
                      className="rounded text-sky-600"
                    />
                    <span>Direct Flights Only</span>
                  </label>

                  <select
                    value={selectedAirlineFilter}
                    onChange={e => setSelectedAirlineFilter(e.target.value)}
                    className="rounded-xl border border-zinc-200 bg-white px-3 py-1.5 font-bold text-zinc-800 outline-none dark:border-white/10 dark:bg-black/50 dark:text-zinc-200"
                  >
                    <option value="ALL">All Airlines</option>
                    <option value="Emirates">Emirates</option>
                    <option value="Air India Express">Air India Express</option>
                    <option value="Saudia">Saudia</option>
                    <option value="IndiGo">IndiGo</option>
                    <option value="Qatar Airways">Qatar Airways</option>
                  </select>
                </div>
              </div>

              {/* Flight Cards List */}
              <div className="space-y-4">
                {filteredFlights.map(flight => (
                  <div
                    key={flight.id}
                    className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-200/80 bg-white/60 p-4 sm:p-5 transition-all hover:border-sky-500/50 hover:shadow-xl dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.2fr_1.8fr_1fr] md:items-center">
                      {/* Airline Brand */}
                      <div className="flex items-center gap-3.5">
                        <span className="text-3xl">{flight.logo}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-display font-extrabold text-base text-zinc-900 dark:text-white">
                              {flight.airline}
                            </h4>
                            <span className="rounded-md bg-sky-500/15 px-2 py-0.5 text-[10px] font-black text-sky-700 dark:text-sky-400">
                              {flight.flightNumber}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold">{flight.cabinClass}</p>
                        </div>
                      </div>

                      {/* Schedule Timeline */}
                      <div className="grid grid-cols-3 items-center text-center my-1 md:my-0">
                        <div className="text-left">
                          <span className="block text-base sm:text-lg font-black text-zinc-900 dark:text-white">
                            {flight.departureTime}
                          </span>
                          <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">{flight.fromCode}</span>
                        </div>

                        <div className="flex flex-col items-center">
                          <span className="text-[10px] font-bold text-zinc-400 flex items-center gap-1">
                            <Clock size={11} /> {flight.duration}
                          </span>
                          <div className="relative my-1 w-full flex items-center justify-center">
                            <div className="h-[2px] w-full bg-zinc-200 dark:bg-white/20" />
                            <Plane size={14} className="absolute text-sky-500" />
                          </div>
                          <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 truncate max-w-full">
                            {flight.stops}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="block text-base sm:text-lg font-black text-zinc-900 dark:text-white">
                            {flight.arrivalTime}
                          </span>
                          <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">{flight.toCode}</span>
                        </div>
                      </div>

                      {/* Pricing & Booking CTA */}
                      <div className="flex flex-row items-center justify-between border-t border-zinc-100 pt-3 md:flex-col md:items-end md:border-t-0 md:pt-0">
                        <div className="text-left md:text-right">
                          <span className="text-[10px] font-semibold text-zinc-400 block">Total per person</span>
                          <p className="font-display text-xl sm:text-2xl font-black text-sky-700 dark:text-sky-400">
                            ₹{flight.price.toLocaleString("en-IN")}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSeatModalFlight(flight)}
                            className="flex items-center gap-1 rounded-xl border border-zinc-200 px-3 py-2 text-xs font-bold text-zinc-700 transition hover:bg-zinc-100 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/10"
                          >
                            <span>Seat {selectedSeat}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleWhatsAppBooking(flight)}
                            className="flex items-center justify-center gap-1.5 rounded-xl bg-sky-600 px-3.5 py-2 text-xs font-black text-white shadow-md shadow-sky-700/20 transition hover:bg-sky-500"
                          >
                            <Send size={13} />
                            <span>Book</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Inclusions Pill Bar */}
                    <div className="mt-3.5 flex flex-wrap items-center gap-2 sm:gap-3 border-t border-zinc-100 pt-3 text-[10px] sm:text-[11px] font-semibold text-zinc-600 dark:border-white/5 dark:text-zinc-300">
                      <span className="flex items-center gap-1">
                        <Luggage size={12} className="text-amber-500 shrink-0" />
                        <span className="truncate">{flight.baggage}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Utensils size={12} className="text-sky-500 shrink-0" />
                        <span>{flight.meals ? "Meals Included" : "Snacks on Purchase"}</span>
                      </span>
                      <span className="flex items-center gap-1 text-sky-700 dark:text-sky-400">
                        <CheckCircle2 size={12} className="shrink-0" />
                        <span>Free Web Check-in & WhatsApp Pass</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VISA FAST TRACK */}
        {activeTab === "visas" && (
          <div className="relative z-10 pt-6">
            <div className="mb-4">
              <h3 className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
                Fast-Track International Visa Assistance
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Accredited visa document processing for UAE, Saudi Arabia, Schengen, UK, Oman, Qatar, Malaysia & Singapore.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { country: "UAE / Dubai", type: "30 / 60 Days Visit", time: "24 - 48 Hours", fee: "from ₹6,499", flag: "🇦🇪" },
                { country: "Saudi Arabia", type: "Tourist / Umrah e-Visa", time: "Instant e-Visa", fee: "from ₹10,999", flag: "🇸🇦" },
                { country: "Oman", type: "Tourist 26F/36M", time: "2-3 Days", fee: "from ₹4,999", flag: "🇴🇲" },
                { country: "Malaysia", type: "MDAC & e-Visa", time: "1-2 Days", fee: "from ₹2,899", flag: "🇲🇾" },
                { country: "Singapore", type: "E-Pass Tourist", time: "3-4 Days", fee: "from ₹3,499", flag: "🇸🇬" },
                { country: "Thailand", type: "Free / e-Visa on Arrival", time: "Fast Track", fee: "Service ₹1,500", flag: "🇹🇭" },
                { country: "Schengen Europe", type: "Tourist / Business", time: "Appointment + 15d", fee: "Full Checklist", flag: "🇪🇺" },
                { country: "United Kingdom", type: "Standard Visitor", time: "Biometrics + 15d", fee: "Expert File", flag: "🇬🇧" }
              ].map(v => (
                <div
                  key={v.country}
                  className="rounded-2xl border border-zinc-200 bg-white/70 p-4 transition hover:border-sky-500 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{v.flag}</span>
                    <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-[10px] font-black text-sky-600 dark:text-sky-400">
                      {v.time}
                    </span>
                  </div>
                  <h4 className="mt-2 font-display text-base font-bold text-zinc-900 dark:text-white">{v.country}</h4>
                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{v.type}</p>
                  <p className="mt-2 font-extrabold text-amber-500">{v.fee}</p>
                  <a
                    href={`https://wa.me/918590624181?text=${encodeURIComponent(
                      `Hi Rozline Travels, I want to apply for a ${v.country} visa (${v.type}). Please share requirements.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center justify-center gap-1 rounded-xl bg-sky-600/15 py-2 text-xs font-black text-sky-800 transition hover:bg-sky-600 hover:text-white dark:bg-sky-500/15 dark:text-sky-300 dark:hover:bg-sky-500 dark:hover:text-black"
                  >
                    <span>Apply on WhatsApp</span>
                    <ChevronRight size={14} />
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <a
                href="/visa-services"
                className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg transition hover:bg-sky-500"
              >
                <span>View All 17 Country Visa Document Checklists</span>
                <ChevronRight size={16} />
              </a>
            </div>
          </div>
        )}

        {/* TAB 3: UMRAH PACKAGES */}
        {activeTab === "umrah" && (
          <div className="relative z-10 pt-6">
            <div className="mb-4">
              <h3 className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
                Luxury & Classic Umrah Packages
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Departing directly from Calicut (CCJ) & Cochin (COK). Verified hotels within 50-250 meters from the Holy Haram.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  title: "Royal Executive 5-Star",
                  duration: "15 Days VIP Group",
                  price: "₹1,05,000",
                  makkah: "Pullman Zamzam / Swissotel (50m)",
                  madinah: "Dar Al Taqwa / Oberoi (Facing Haram)",
                  flight: "Direct Saudia Airlines (CCJ/COK)",
                  highlights: ["Buffet meals by Kerala Chefs", "Private GMC Yukon Ziyarat", "24/7 Muallim guidance"]
                },
                {
                  title: "Classic Premium 4-Star",
                  duration: "15 Days Deluxe Group",
                  price: "₹78,500",
                  makkah: "Mawaddah / Al Massa (200m)",
                  madinah: "Rawda Royal Inn (180m)",
                  flight: "Direct Air India Express / Saudia",
                  highlights: ["3 Authentic Kerala Meals Daily", "Luxury AC Coach Transfers", "Full Ziyarat Makkah & Madinah"]
                },
                {
                  title: "Economy Comfort Package",
                  duration: "14 Days Budget Group",
                  price: "₹64,999",
                  makkah: "Standard Walkable Hotel (450m)",
                  madinah: "Central Area Hotel (350m)",
                  flight: "Confirmed Flight Booking",
                  highlights: ["Kerala Food Catering Included", "Umrah Visa & Medical Insurance", "Experienced Guide Support"]
                }
              ].map(pkg => (
                <div
                  key={pkg.title}
                  className="rounded-3xl border border-zinc-200 bg-white/70 p-5 shadow-lg transition hover:border-amber-400 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-amber-400/20 px-3 py-1 text-[11px] font-black text-amber-500">
                      {pkg.duration}
                    </span>
                    <span className="font-display text-xl font-black text-sky-700 dark:text-sky-400">
                      {pkg.price}
                    </span>
                  </div>
                  <h4 className="mt-3 font-display text-lg font-bold text-zinc-900 dark:text-white">{pkg.title}</h4>
                  
                  <div className="mt-3 space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                    <p className="flex items-center gap-1.5 font-semibold">
                      <MapPin size={13} className="text-sky-500" /> Makkah: {pkg.makkah}
                    </p>
                    <p className="flex items-center gap-1.5 font-semibold">
                      <MapPin size={13} className="text-amber-500" /> Madinah: {pkg.madinah}
                    </p>
                    <p className="flex items-center gap-1.5 font-semibold">
                      <Plane size={13} className="text-teal-500" /> {pkg.flight}
                    </p>
                  </div>

                  <div className="mt-4 border-t border-zinc-100 pt-3 dark:border-white/10 space-y-1">
                    {pkg.highlights.map(h => (
                      <p key={h} className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                        <CheckCircle2 size={12} className="text-sky-500" /> {h}
                      </p>
                    ))}
                  </div>

                  <a
                    href={`https://wa.me/918590624181?text=${encodeURIComponent(
                      `Hi Rozline Travels Tirur, I would like to book the ${pkg.title} (${pkg.price}) Umrah package. Please share available batch dates.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 py-2.5 text-xs font-black text-white shadow-md shadow-sky-700/20"
                  >
                    <Send size={14} /> Inquire for Group Dates
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: HOLIDAYS & TOURS */}
        {activeTab === "holidays" && (
          <div className="relative z-10 pt-6">
            <div className="mb-4">
              <h3 className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
                Handcrafted International Escapes
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                All packages include verified 4/5-star accommodation, guided transfers, visa assistance and curated itineraries.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Dubai Spectacular", days: "5 Days / 4 Nights", price: "₹24,999", img: "🇦🇪", desc: "Desert Safari, Burj Khalifa 124th Fl, Marina Dhow Cruise, Dubai Mall." },
                { title: "Maldives Water Villa", days: "4 Days / 3 Nights", price: "₹48,500", img: "🇲🇻", desc: "Speedboat transfers, All-Inclusive dining, snorkeling & reef excursion." },
                { title: "Baku & Azerbaijan", days: "5 Days / 4 Nights", price: "₹34,999", img: "🇦🇿", desc: "Fire Temple, Gabala Cable Car, Flame Towers, Old City tour." },
                { title: "Malaysia & Singapore", days: "6 Days / 5 Nights", price: "₹39,500", img: "🇲🇾", desc: "Genting Highlands, Sentosa Island, Universal Studios, Twin Towers." }
              ].map(tour => (
                <div
                  key={tour.title}
                  className="rounded-2xl border border-zinc-200 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{tour.img}</span>
                    <span className="font-display text-base font-black text-sky-700 dark:text-sky-400">{tour.price}</span>
                  </div>
                  <h4 className="mt-2 font-display text-base font-bold text-zinc-900 dark:text-white">{tour.title}</h4>
                  <p className="text-[11px] font-bold text-amber-500">{tour.days}</p>
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{tour.desc}</p>
                  <a
                    href={`https://wa.me/918590624181?text=${encodeURIComponent(
                      `Hi Rozline Travels Tirur, please share the full day-by-day itinerary and flight options for the ${tour.title} (${tour.days}) holiday.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-1 rounded-xl bg-zinc-100 py-2 text-xs font-black text-zinc-800 transition hover:bg-sky-600 hover:text-white dark:bg-white/10 dark:text-zinc-200"
                  >
                    <span>Get Detailed Quote</span>
                    <ChevronRight size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: HOTELS */}
        {activeTab === "hotels" && (
          <div className="relative z-10 pt-6">
            <div className="rounded-2xl bg-zinc-50 p-6 text-center dark:bg-white/5">
              <h3 className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
                Worldwide Hotel Reservations & Corporate Stays
              </h3>
              <p className="mt-2 max-w-xl mx-auto text-xs text-zinc-500 dark:text-zinc-400">
                Access discounted contracted B2B hotel rates in Makkah, Madinah, Dubai Marina, London, Bangkok, Singapore, and across India with instant voucher issuance.
              </p>
              <a
                href="https://wa.me/918590624181?text=Hi%20Sky%20Way%20Travels,%20I%20would%20like%20to%20book%20a%20hotel.%20Please%20assist%20me."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-xs font-black uppercase text-white shadow-lg hover:bg-sky-500"
              >
                <Send size={14} /> Request Hotel Availability
              </a>
            </div>
          </div>
        )}
      </div>

      {/* 3D SEAT PICKER MODAL */}
      {seatModalFlight && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setSeatModalFlight(null)}
          />
          <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/20 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#071a0e] dark:text-white">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3 dark:border-white/10">
              <div>
                <h4 className="font-display text-lg font-bold">Interactive Seat Selection</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {seatModalFlight.airline} {seatModalFlight.flightNumber} • Boeing 777-300ER
                </p>
              </div>
              <button
                onClick={() => setSeatModalFlight(null)}
                className="grid h-8 w-8 place-items-center rounded-full bg-zinc-100 text-zinc-600 dark:bg-white/10 dark:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Aircraft Cabin Graphic */}
            <div className="my-5 rounded-2xl bg-zinc-100 p-4 text-center dark:bg-black/40">
              <div className="mx-auto max-w-[200px] border-b-2 border-sky-500 pb-2 mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
                  ▲ COCKPIT / FRONT ▲
                </span>
              </div>

              {/* Rows */}
              <div className="space-y-2">
                {["1", "2", "3", "4", "5"].map(row => (
                  <div key={row} className="flex items-center justify-center gap-2">
                    {["A", "B"].map(col => {
                      const seatId = `${row}${col}`;
                      const isSelected = selectedSeat === seatId;
                      return (
                        <button
                          key={seatId}
                          type="button"
                          onClick={() => setSelectedSeat(seatId)}
                          className={`h-9 w-9 rounded-lg text-xs font-black transition-all ${
                            isSelected
                              ? "bg-amber-400 text-black shadow-md shadow-amber-400/50 scale-105"
                              : "bg-white text-zinc-700 hover:bg-emerald-100 dark:bg-white/10 dark:text-zinc-200 dark:hover:bg-sky-500/20"
                          }`}
                        >
                          {seatId}
                        </button>
                      );
                    })}

                    <span className="w-6 text-[10px] font-bold text-zinc-400">AISLE</span>

                    {["C", "D"].map(col => {
                      const seatId = `${row}${col}`;
                      const isSelected = selectedSeat === seatId;
                      return (
                        <button
                          key={seatId}
                          type="button"
                          onClick={() => setSelectedSeat(seatId)}
                          className={`h-9 w-9 rounded-lg text-xs font-black transition-all ${
                            isSelected
                              ? "bg-amber-400 text-black shadow-md shadow-amber-400/50 scale-105"
                              : "bg-white text-zinc-700 hover:bg-emerald-100 dark:bg-white/10 dark:text-zinc-200 dark:hover:bg-sky-500/20"
                          }`}
                        >
                          {seatId}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="text-zinc-400">Chosen Seat:</span>{" "}
                <span className="font-extrabold text-amber-500 text-sm">{selectedSeat} (Window / Preferred)</span>
              </div>
              <button
                type="button"
                onClick={() => setSeatModalFlight(null)}
                className="rounded-xl bg-sky-600 px-5 py-2.5 font-bold text-white shadow-md transition hover:bg-sky-500"
              >
                Confirm Seat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
