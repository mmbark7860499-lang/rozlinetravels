"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code2,
  Copy,
  CreditCard,
  Database,
  ExternalLink,
  Eye,
  EyeOff,
  FileCheck2,
  Filter,
  Flame,
  Globe2,
  Lock,
  Luggage,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Plane,
  Plus,
  RefreshCw,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Ticket,
  Trash2,
  TrendingUp,
  User,
  Users,
  X,
  LogOut,
  Tag
} from "lucide-react";
import { BookingRecord, OfferRecord, LeadRecord } from "@/lib/supabase";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<{
    email: string;
    name: string;
    role: string;
    agency: string;
  } | null>(null);

  // Login Form States
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<"bookings" | "leads" | "offers">("bookings");

  // Data States
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [offers, setOffers] = useState<OfferRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Bookings Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Selected Booking Modal
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddOfferModal, setShowAddOfferModal] = useState(false);

  useEffect(() => {
    // Check session
    const storedAuth = localStorage.getItem("rozline-admin-auth") || sessionStorage.getItem("rozline-admin-auth");
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        setAdminUser(parsed);
        setIsAuthenticated(true);
        loadAllData();
      } catch {
        // Fallback
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAuth(true);
    setAuthError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput, password: passwordInput })
      });
      const data = await res.json();

      if (data.ok && data.user) {
        setIsAuthenticated(true);
        setAdminUser(data.user);
        localStorage.setItem("rozline-admin-auth", JSON.stringify(data.user));
        loadAllData();
      } else {
        setAuthError(data.message || "Invalid email or password");
      }
    } catch {
      setAuthError("Unable to connect to authentication server. Check your connection.");
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("rozline-admin-auth");
    sessionStorage.removeItem("rozline-admin-auth");
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [bookingsRes, leadsRes, offersRes] = await Promise.all([
        fetch("/api/bookings").then(r => r.json()),
        fetch("/api/leads").then(r => r.json()),
        fetch("/api/offers").then(r => r.json())
      ]);

      if (bookingsRes.ok && bookingsRes.bookings) {
        setBookings(bookingsRes.bookings);
      }
      if (leadsRes.ok && leadsRes.leads) {
        setLeads(leadsRes.leads);
      }
      if (offersRes.ok && offersRes.offers) {
        setOffers(offersRes.offers);
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Status changers for Bookings
  const handleStatusChange = async (id: string, newStatus: BookingRecord["status"]) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.ok) {
        setBookings(prev => prev.map(b => (b.id === id ? { ...b, status: newStatus } : b)));
        if (selectedBooking && selectedBooking.id === id) {
          setSelectedBooking({ ...selectedBooking, status: newStatus });
        }
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handlePaymentChange = async (id: string, paymentStatus: BookingRecord["payment_status"]) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payment_status: paymentStatus })
      });
      const data = await res.json();
      if (data.ok) {
        setBookings(prev => prev.map(b => (b.id === id ? { ...b, payment_status: paymentStatus } : b)));
        if (selectedBooking && selectedBooking.id === id) {
          setSelectedBooking({ ...selectedBooking, payment_status: paymentStatus });
        }
      }
    } catch (err) {
      console.error("Error updating payment:", err);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking record?")) return;
    try {
      await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      setBookings(prev => prev.filter(b => b.id !== id));
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking(null);
      }
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  // Lead contact status changer
  const handleToggleLeadContacted = async (id: string, currentVal: boolean) => {
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_contacted: !currentVal })
      });
      const data = await res.json();
      if (data.ok) {
        setLeads(prev => prev.map(l => (l.id === id ? { ...l, is_contacted: !currentVal } : l)));
      }
    } catch (err) {
      console.error("Error toggling lead:", err);
    }
  };

  // Offer toggle & delete
  const handleToggleOffer = async (id: string, currentActive: boolean) => {
    try {
      const res = await fetch(`/api/offers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !currentActive })
      });
      const data = await res.json();
      if (data.ok) {
        setOffers(prev => prev.map(o => (o.id === id ? { ...o, is_active: !currentActive } : o)));
      }
    } catch (err) {
      console.error("Error toggling offer:", err);
    }
  };

  const handleDeleteOffer = async (id: string) => {
    if (!confirm("Delete this promotional offer from database?")) return;
    try {
      await fetch(`/api/offers/${id}`, { method: "DELETE" });
      setOffers(prev => prev.filter(o => o.id !== id));
    } catch (err) {
      console.error("Error deleting offer:", err);
    }
  };

  // Add Walk-in Booking
  const handleCreateWalkin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      customer_name: form.get("name"),
      customer_phone: form.get("phone"),
      customer_email: form.get("email"),
      service_type: form.get("service"),
      destination: form.get("destination"),
      travel_date: form.get("date"),
      passengers_count: Number(form.get("passengers") || 1),
      estimated_amount: Number(form.get("amount") || 0),
      notes: form.get("notes")
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.ok && json.booking) {
        setBookings(prev => [json.booking, ...prev]);
        setShowAddModal(false);
      }
    } catch (err) {
      console.error("Failed to add walk-in booking:", err);
    }
  };

  // Add Offer
  const handleCreateOffer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      badge: form.get("badge"),
      title: form.get("title"),
      route: form.get("route"),
      price: form.get("price"),
      original_price: form.get("original_price"),
      validity: form.get("validity"),
      category: form.get("category"),
      image_url: form.get("image_url")
    };

    try {
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.ok && json.offer) {
        setOffers(prev => [json.offer, ...prev]);
        setShowAddOfferModal(false);
      }
    } catch (err) {
      console.error("Failed to add deal:", err);
    }
  };

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      if (serviceFilter !== "all" && b.service_type !== serviceFilter) return false;
      if (statusFilter !== "all" && b.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesRef = b.booking_ref.toLowerCase().includes(q);
        const matchesName = b.customer_name.toLowerCase().includes(q);
        const matchesPhone = b.customer_phone.toLowerCase().includes(q);
        const matchesDest = b.destination.toLowerCase().includes(q);
        return matchesRef || matchesName || matchesPhone || matchesDest;
      }
      return true;
    });
  }, [bookings, serviceFilter, statusFilter, searchQuery]);

  // Metrics
  const stats = useMemo(() => {
    const total = bookings.length;
    const confirmed = bookings.filter(b => b.status === "confirmed" || b.status === "ticket_issued").length;
    const pending = bookings.filter(b => b.status === "pending").length;
    const revenue = bookings
      .filter(b => b.payment_status === "fully_paid" || b.payment_status === "deposit_paid")
      .reduce((sum, b) => sum + Number(b.estimated_amount || 0), 0);
    return { total, confirmed, pending, revenue };
  }, [bookings]);

  // Export CSV
  const handleExportCSV = () => {
    const headers = ["Booking Ref,Customer Name,Phone,Email,Service,Destination,Travel Date,Passengers,Amount,Status,Payment Status\n"];
    const rows = filteredBookings.map(b =>
      `"${b.booking_ref}","${b.customer_name}","${b.customer_phone}","${b.customer_email || ''}","${b.service_type}","${b.destination}","${b.travel_date || ''}","${b.passengers_count || 1}","${b.estimated_amount || 0}","${b.status}","${b.payment_status}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `skyway-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  // WhatsApp helper
  const openWhatsApp = (phone: string, text: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const target = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;
    window.open(`https://wa.me/${target}?text=${encodeURIComponent(text)}`, "_blank");
  };

  // ============================================================================
  // VIEW 1: AUTHENTIC LOGIN SCREEN
  // ============================================================================
  if (!isAuthenticated) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-100 px-4 py-12">
        {/* Ambient Lights */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative w-full max-w-md">
          {/* Card */}
          <div className="overflow-hidden rounded-[2.5rem] border border-zinc-200/90 bg-white/95 p-8 shadow-2xl shadow-emerald-950/10 backdrop-blur-2xl">
            {/* Logo & Header */}
            <div className="text-center">
              <div className="mx-auto relative h-16 w-16 overflow-hidden rounded-full ring-4 ring-emerald-500/20 shadow-md">
                <Image
                  src="/sky-way-logo.jpg"
                  alt="Sky Way Travels Tirur"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-50 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-emerald-800">
                <ShieldCheck size={13} />
                <span>Executive Command Portal</span>
              </div>
              <h1 className="mt-2 font-display text-2xl font-black text-zinc-900">
                Rozline & Sky Way Desk
              </h1>
              <p className="mt-1 text-xs text-zinc-500">
                Sign in with authorized agency credentials to manage live bookings, customer leads, and promotional deals.
              </p>
            </div>

            {/* Error Banner */}
            {authError && (
              <div className="mt-5 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-xs font-bold text-red-700">
                <ShieldAlert size={16} className="shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600">
                  Authorized Email
                </label>
                <div className="relative mt-1.5">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    required
                    placeholder="rozlinetravels@gmail.com"
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50/80 px-4 py-3 pl-10 text-xs font-medium text-zinc-900 outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/15"
                  />
                  <Mail size={16} className="absolute left-3.5 top-3.5 text-zinc-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600">
                  Security Password
                </label>
                <div className="relative mt-1.5">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50/80 px-4 py-3 pl-10 pr-10 text-xs font-medium text-zinc-900 outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/15"
                  />
                  <Lock size={16} className="absolute left-3.5 top-3.5 text-zinc-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-zinc-400 hover:text-zinc-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmittingAuth}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-xl shadow-emerald-700/25 transition hover:brightness-110 active:scale-95 disabled:opacity-50"
              >
                {isSubmittingAuth ? (
                  <>
                    <RefreshCw size={15} className="animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <Lock size={15} />
                    <span>Enter Admin Control Desk</span>
                  </>
                )}
              </button>
            </form>

            {/* Back to Site */}
            <div className="mt-6 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-emerald-700 transition"
              >
                <ArrowLeft size={13} />
                <span>Return to Public Website</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // VIEW 2: AUTHENTICATED COMMAND PORTAL
  // ============================================================================
  return (
    <div className="min-h-screen bg-[#f8fafc] text-zinc-900">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-emerald-500/30">
              <Image src="/sky-way-logo.jpg" alt="Sky Way" fill className="object-cover" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-base font-extrabold text-zinc-900">Rozline & Sky Way Desk</h1>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-black text-emerald-800 border border-emerald-600/20">
                  Executive Desk
                </span>
              </div>
              <p className="text-[11px] font-semibold text-zinc-500">
                Logged in as <span className="font-bold text-emerald-800">{adminUser?.email || "rozlinetravels@gmail.com"}</span> (Super Admin)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={loadAllData}
              title="Refresh Data"
              className="grid h-9 w-9 place-items-center rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-emerald-700 transition"
            >
              <RefreshCw size={15} className={isLoading ? "animate-spin" : ""} />
            </button>

            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition"
            >
              <ExternalLink size={13} />
              <span>Live Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-xs font-black text-red-700 hover:bg-red-100 transition"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Workspace Tab Bar */}
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 sm:px-6 overflow-x-auto border-t border-zinc-100 py-2">
          {[
            { id: "bookings", label: `Bookings (${bookings.length})`, icon: Plane },
            { id: "leads", label: `Inquiries (${leads.length})`, icon: MessageSquare },
            { id: "offers", label: `Special Deals (${offers.length})`, icon: Flame }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-black transition ${
                  active
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* KPI CARDS */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-3xl border border-zinc-200/90 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-zinc-500">Total Bookings</span>
              <div className="grid h-9 w-9 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Plane size={18} />
              </div>
            </div>
            <p className="mt-3 font-display text-3xl font-extrabold text-zinc-900">{stats.total}</p>
            <p className="text-[11px] font-semibold text-emerald-700 mt-1">All Active Records</p>
          </div>

          <div className="rounded-3xl border border-zinc-200/90 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-zinc-500">Active Revenue</span>
              <div className="grid h-9 w-9 place-items-center rounded-2xl bg-amber-50 text-amber-700">
                <CreditCard size={18} />
              </div>
            </div>
            <p className="mt-3 font-display text-3xl font-extrabold text-amber-700">
              ₹{stats.revenue.toLocaleString("en-IN")}
            </p>
            <p className="text-[11px] font-semibold text-zinc-500 mt-1">Verified Inflow</p>
          </div>

          <div className="rounded-3xl border border-zinc-200/90 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-zinc-500">Confirmed / Issued</span>
              <div className="grid h-9 w-9 place-items-center rounded-2xl bg-teal-50 text-teal-700">
                <BadgeCheck size={18} />
              </div>
            </div>
            <p className="mt-3 font-display text-3xl font-extrabold text-zinc-900">{stats.confirmed}</p>
            <p className="text-[11px] font-semibold text-teal-700 mt-1">Confirmed Tickets</p>
          </div>

          <div className="rounded-3xl border border-zinc-200/90 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-zinc-500">Customer Leads</span>
              <div className="grid h-9 w-9 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                <Users size={18} />
              </div>
            </div>
            <p className="mt-3 font-display text-3xl font-extrabold text-zinc-900">{leads.length}</p>
            <p className="text-[11px] font-semibold text-blue-700 mt-1">Active Requests</p>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* TAB 1: BOOKINGS MANAGEMENT */}
        {/* ==================================================================== */}
        {activeTab === "bookings" && (
          <div className="mt-8 space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-1 flex-wrap items-center gap-2">
                {/* Search */}
                <div className="relative min-w-[240px] flex-1 sm:max-w-xs">
                  <Search size={15} className="absolute left-3.5 top-3 text-zinc-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search PNR, name, phone, destination..."
                    className="w-full rounded-2xl border border-zinc-200 bg-white py-2 pl-9 pr-4 text-xs font-semibold text-zinc-900 outline-none focus:border-emerald-600"
                  />
                </div>

                {/* Service Filter */}
                <select
                  value={serviceFilter}
                  onChange={e => setServiceFilter(e.target.value)}
                  className="rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-xs font-bold text-zinc-700 outline-none"
                >
                  <option value="all">All Services</option>
                  <option value="flight">Flights Only</option>
                  <option value="visa">Visas Only</option>
                  <option value="umrah">Umrah Packages</option>
                  <option value="holiday">Holiday Tours</option>
                  <option value="hotel">Hotels</option>
                </select>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-xs font-bold text-zinc-700 outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="ticket_issued">Ticket Issued</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition"
                >
                  <Code2 size={13} />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-1.5 rounded-2xl bg-emerald-600 px-4 py-2 text-xs font-black text-white shadow-md shadow-emerald-700/20 hover:bg-emerald-500 transition"
                >
                  <Plus size={15} />
                  <span>New Walk-in Booking</span>
                </button>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="overflow-hidden rounded-3xl border border-zinc-200/90 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-zinc-100 bg-zinc-50/75 text-[11px] font-black uppercase tracking-wider text-zinc-500">
                    <tr>
                      <th className="px-5 py-3.5">Booking Ref</th>
                      <th className="px-5 py-3.5">Passenger</th>
                      <th className="px-5 py-3.5">Service & Route</th>
                      <th className="px-5 py-3.5">Travel Date</th>
                      <th className="px-5 py-3.5">Amount</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5">Payment</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 font-medium text-zinc-700">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-zinc-400">
                          No booking records match your criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map(b => (
                        <tr key={b.id} className="transition hover:bg-zinc-50/60">
                          <td className="px-5 py-4 font-mono font-bold text-emerald-800">
                            {b.booking_ref}
                          </td>
                          <td className="px-5 py-4">
                            <span className="font-bold text-zinc-900 block">{b.customer_name}</span>
                            <span className="text-[11px] text-zinc-500 block">{b.customer_phone}</span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-black uppercase text-zinc-700">
                              {b.service_type}
                            </span>
                            <span className="ml-2 font-semibold text-zinc-900">
                              {b.origin ? `${b.origin} ➔ ` : ""}{b.destination}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-zinc-600">
                            {b.travel_date || "Open / Unset"}
                          </td>
                          <td className="px-5 py-4 font-black text-emerald-700">
                            ₹{Number(b.estimated_amount || 0).toLocaleString("en-IN")}
                          </td>
                          <td className="px-5 py-4">
                            <select
                              value={b.status}
                              onChange={e => handleStatusChange(b.id, e.target.value as any)}
                              className={`rounded-xl px-2.5 py-1 text-[11px] font-black outline-none ${
                                b.status === "confirmed" || b.status === "ticket_issued"
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                                  : b.status === "pending"
                                  ? "bg-amber-50 text-amber-800 border border-amber-300"
                                  : "bg-zinc-100 text-zinc-700 border border-zinc-200"
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="contacted">Contacted</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="documents_received">Docs Received</option>
                              <option value="ticket_issued">Ticket Issued</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-5 py-4">
                            <select
                              value={b.payment_status}
                              onChange={e => handlePaymentChange(b.id, e.target.value as any)}
                              className={`rounded-xl px-2.5 py-1 text-[11px] font-black outline-none ${
                                b.payment_status === "fully_paid"
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                                  : b.payment_status === "deposit_paid"
                                  ? "bg-blue-50 text-blue-800 border border-blue-300"
                                  : "bg-red-50 text-red-700 border border-red-200"
                              }`}
                            >
                              <option value="unpaid">Unpaid</option>
                              <option value="deposit_paid">Deposit Paid</option>
                              <option value="fully_paid">Fully Paid</option>
                              <option value="refunded">Refunded</option>
                            </select>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() =>
                                  openWhatsApp(
                                    b.customer_phone,
                                    `Hello ${b.customer_name}, regarding your Sky Way Travels booking (${b.booking_ref}) to ${b.destination}. Status: ${b.status.toUpperCase()}. How can we assist you today?`
                                  )
                                }
                                title="Contact via WhatsApp"
                                className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition"
                              >
                                <Send size={13} />
                              </button>

                              <button
                                onClick={() => setSelectedBooking(b)}
                                title="View Full Details"
                                className="grid h-8 w-8 place-items-center rounded-xl bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition"
                              >
                                <Eye size={13} />
                              </button>

                              <button
                                onClick={() => handleDeleteBooking(b.id)}
                                title="Delete Record"
                                className="grid h-8 w-8 place-items-center rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: INBOUND CUSTOMER LEADS */}
        {/* ==================================================================== */}
        {activeTab === "leads" && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-zinc-900">Inbound Customer Leads</h2>
                <p className="text-xs text-zinc-500">
                  Customers who submitted travel queries through the website contact desk.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {leads.map(lead => (
                <div
                  key={lead.id}
                  className={`rounded-3xl border p-5 shadow-sm transition bg-white ${
                    lead.is_contacted ? "border-zinc-200 opacity-80" : "border-emerald-500/50 ring-1 ring-emerald-500/20"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-bold text-zinc-900 text-base">{lead.lead_name}</span>
                      <span className="block text-xs font-semibold text-emerald-800">{lead.lead_phone}</span>
                    </div>
                    <button
                      onClick={() => handleToggleLeadContacted(lead.id, lead.is_contacted)}
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-black ${
                        lead.is_contacted
                          ? "bg-zinc-100 text-zinc-600"
                          : "bg-emerald-50 text-emerald-800 border border-emerald-300"
                      }`}
                    >
                      {lead.is_contacted ? "Contacted" : "Action Needed"}
                    </button>
                  </div>

                  <div className="mt-4 space-y-1.5 text-xs text-zinc-600">
                    <p><span className="font-bold text-zinc-800">Service:</span> {lead.service_needed || "General Inquiry"}</p>
                    <p><span className="font-bold text-zinc-800">Destination:</span> {lead.destination || "Not specified"}</p>
                    {lead.travel_date && <p><span className="font-bold text-zinc-800">Target Date:</span> {lead.travel_date}</p>}
                    {lead.message && (
                      <p className="mt-2 rounded-xl bg-zinc-50 p-2.5 text-zinc-700 italic border border-zinc-100">
                        "{lead.message}"
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() =>
                        openWhatsApp(
                          lead.lead_phone,
                          `Hi ${lead.lead_name}, greetings from Sky Way Travels Tirur! We received your request regarding ${lead.service_needed || "travel services"}. How may we assist you with fares and itinerary?`
                        )
                      }
                      className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-black text-white hover:bg-emerald-500 transition"
                    >
                      <Send size={12} />
                      <span>Reply on WhatsApp</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: PROMOTIONAL OFFERS CMS (LIVE SUPABASE) */}
        {/* ==================================================================== */}
        {activeTab === "offers" && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-zinc-900">Promotional Deals & Flash Offers</h2>
                <p className="text-xs text-zinc-500">
                  Manage the live deals displayed on the public website. Changes apply immediately!
                </p>
              </div>
              <button
                onClick={() => setShowAddOfferModal(true)}
                className="flex items-center gap-1.5 rounded-2xl bg-emerald-600 px-4 py-2 text-xs font-black text-white shadow-md shadow-emerald-700/20 hover:bg-emerald-500 transition"
              >
                <Plus size={15} />
                <span>Add New Travel Deal</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {offers.map(offer => (
                <div
                  key={offer.id}
                  className="overflow-hidden rounded-3xl border border-zinc-200/90 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="relative h-40 w-full">
                    <Image
                      src={offer.image_url}
                      alt={offer.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-black text-black">
                        {offer.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-sm text-zinc-900 line-clamp-1">{offer.title}</h3>
                    <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">{offer.route}</p>
                    <div className="mt-3 flex items-baseline justify-between border-t border-zinc-100 pt-2">
                      <span className="font-display text-lg font-black text-emerald-700">{offer.price}</span>
                      {offer.original_price && (
                        <span className="text-xs text-zinc-400 line-through">{offer.original_price}</span>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                      <button
                        onClick={() => handleToggleOffer(offer.id, offer.is_active)}
                        className={`rounded-full px-3 py-1 text-[11px] font-black ${
                          offer.is_active
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                            : "bg-zinc-100 text-zinc-600"
                        }`}
                      >
                        {offer.is_active ? "Live on Web" : "Hidden"}
                      </button>

                      <button
                        onClick={() => handleDeleteOffer(offer.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete deal"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ==================================================================== */}
      {/* MODAL 1: BOOKING DETAILS MODAL */}
      {/* ==================================================================== */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-[2.5rem] border border-zinc-200 bg-white p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-black text-emerald-700">{selectedBooking.booking_ref}</span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-black uppercase text-emerald-800">
                {selectedBooking.service_type}
              </span>
            </div>

            <h3 className="mt-2 font-display text-2xl font-black text-zinc-900">{selectedBooking.customer_name}</h3>
            <p className="text-xs text-zinc-500">{selectedBooking.customer_phone} • {selectedBooking.customer_email || "No email"}</p>

            <div className="mt-6 space-y-3 rounded-2xl bg-zinc-50 p-4 text-xs">
              <div className="flex justify-between">
                <span className="font-bold text-zinc-500">Route:</span>
                <span className="font-black text-zinc-900">{selectedBooking.origin || "Tirur"} ➔ {selectedBooking.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-zinc-500">Travel Date:</span>
                <span className="font-black text-zinc-900">{selectedBooking.travel_date || "Open"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-zinc-500">Passengers:</span>
                <span className="font-black text-zinc-900">{selectedBooking.passengers_count || 1}</span>
              </div>
              {selectedBooking.selected_flight && (
                <div className="flex justify-between">
                  <span className="font-bold text-zinc-500">Flight:</span>
                  <span className="font-black text-zinc-900">{selectedBooking.selected_flight}</span>
                </div>
              )}
              {selectedBooking.selected_seat && (
                <div className="flex justify-between">
                  <span className="font-bold text-zinc-500">Selected Seat:</span>
                  <span className="font-black text-amber-600">{selectedBooking.selected_seat}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-zinc-200 pt-2">
                <span className="font-bold text-zinc-500">Estimated Price:</span>
                <span className="font-black text-emerald-700 text-sm">₹{Number(selectedBooking.estimated_amount || 0).toLocaleString("en-IN")}</span>
              </div>
            </div>

            {selectedBooking.notes && (
              <div className="mt-4 rounded-xl bg-amber-50 p-3 text-xs text-amber-900 border border-amber-200/50">
                <span className="font-bold block mb-1">Customer / Staff Notes:</span>
                {selectedBooking.notes}
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                onClick={() =>
                  openWhatsApp(
                    selectedBooking.customer_phone,
                    `Hello ${selectedBooking.customer_name}, regarding your booking ${selectedBooking.booking_ref} with Sky Way Travels Tirur.`
                  )
                }
                className="flex-1 flex items-center justify-center gap-1.5 rounded-2xl bg-emerald-600 py-3 text-xs font-black text-white hover:bg-emerald-500 transition"
              >
                <Send size={14} />
                <span>Message on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL 2: ADD WALKIN BOOKING */}
      {/* ==================================================================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-[2.5rem] border border-zinc-200 bg-white p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
            >
              <X size={16} />
            </button>

            <h3 className="font-display text-2xl font-black text-zinc-900">Record Walk-in Booking</h3>
            <p className="text-xs text-zinc-500">Log an in-person or phone reservation directly into the database.</p>

            <form onSubmit={handleCreateWalkin} className="mt-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold uppercase text-zinc-600">Customer Name</label>
                  <input name="name" required placeholder="Passenger name" className="mt-1 w-full rounded-xl border border-zinc-200 p-2.5 outline-none focus:border-emerald-600" />
                </div>
                <div>
                  <label className="font-bold uppercase text-zinc-600">Phone</label>
                  <input name="phone" required placeholder="+91 9876543210" className="mt-1 w-full rounded-xl border border-zinc-200 p-2.5 outline-none focus:border-emerald-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold uppercase text-zinc-600">Service</label>
                  <select name="service" className="mt-1 w-full rounded-xl border border-zinc-200 p-2.5 outline-none">
                    <option value="flight">Flight Ticket</option>
                    <option value="visa">Visa Service</option>
                    <option value="umrah">Umrah Package</option>
                    <option value="holiday">Holiday Tour</option>
                    <option value="hotel">Hotel Stay</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold uppercase text-zinc-600">Destination</label>
                  <input name="destination" required placeholder="e.g. Dubai, Jeddah" className="mt-1 w-full rounded-xl border border-zinc-200 p-2.5 outline-none focus:border-emerald-600" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold uppercase text-zinc-600">Travel Date</label>
                  <input name="date" type="date" className="mt-1 w-full rounded-xl border border-zinc-200 p-2.5 outline-none" />
                </div>
                <div>
                  <label className="font-bold uppercase text-zinc-600">Passengers</label>
                  <input name="passengers" type="number" defaultValue="1" min="1" className="mt-1 w-full rounded-xl border border-zinc-200 p-2.5 outline-none" />
                </div>
                <div>
                  <label className="font-bold uppercase text-zinc-600">Amount (₹)</label>
                  <input name="amount" type="number" placeholder="25000" className="mt-1 w-full rounded-xl border border-zinc-200 p-2.5 outline-none" />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase text-zinc-600">Booking Notes</label>
                <textarea name="notes" rows={2} placeholder="Airlines, seat preference, meal preference..." className="mt-1 w-full rounded-xl border border-zinc-200 p-2.5 outline-none resize-none" />
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-2xl bg-emerald-600 py-3 text-xs font-black uppercase text-white hover:bg-emerald-500 transition"
              >
                Save Booking to Database
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL 3: ADD NEW FLASH DEAL */}
      {/* ==================================================================== */}
      {showAddOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-[2.5rem] border border-zinc-200 bg-white p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setShowAddOfferModal(false)}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
            >
              <X size={16} />
            </button>

            <h3 className="font-display text-2xl font-black text-zinc-900">Publish New Promotional Deal</h3>
            <p className="text-xs text-zinc-500">This deal will immediately show on the live website from Supabase.</p>

            <form onSubmit={handleCreateOffer} className="mt-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold uppercase text-zinc-600">Badge</label>
                  <input name="badge" required defaultValue="LIMITED SEATS" className="mt-1 w-full rounded-xl border border-zinc-200 p-2.5 outline-none" />
                </div>
                <div>
                  <label className="font-bold uppercase text-zinc-600">Category</label>
                  <select name="category" className="mt-1 w-full rounded-xl border border-zinc-200 p-2.5 outline-none">
                    <option value="flight">Flight Deal</option>
                    <option value="umrah">Umrah Deal</option>
                    <option value="holiday">Holiday Tour</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold uppercase text-zinc-600">Title</label>
                <input name="title" required placeholder="e.g. Calicut to Riyadh Special Non-Stop" className="mt-1 w-full rounded-xl border border-zinc-200 p-2.5 outline-none" />
              </div>

              <div>
                <label className="font-bold uppercase text-zinc-600">Route / Airline Info</label>
                <input name="route" required placeholder="CCJ ➔ RUH • Saudia / Air India Express" className="mt-1 w-full rounded-xl border border-zinc-200 p-2.5 outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold uppercase text-zinc-600">Offer Price</label>
                  <input name="price" required placeholder="₹14,999" className="mt-1 w-full rounded-xl border border-zinc-200 p-2.5 outline-none" />
                </div>
                <div>
                  <label className="font-bold uppercase text-zinc-600">Original Price (Strike)</label>
                  <input name="original_price" placeholder="₹18,500" className="mt-1 w-full rounded-xl border border-zinc-200 p-2.5 outline-none" />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase text-zinc-600">Validity</label>
                <input name="validity" defaultValue="Valid for bookings this week" className="mt-1 w-full rounded-xl border border-zinc-200 p-2.5 outline-none" />
              </div>

              <div>
                <label className="font-bold uppercase text-zinc-600">Image URL</label>
                <input name="image_url" defaultValue="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80" className="mt-1 w-full rounded-xl border border-zinc-200 p-2.5 outline-none" />
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-2xl bg-emerald-600 py-3 text-xs font-black uppercase text-white hover:bg-emerald-500 transition"
              >
                Publish Deal to Website
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
