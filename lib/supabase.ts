import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Retrieve environment credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

/**
 * Check whether Supabase environment variables are provided
 */
export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes("your-project-id") &&
    !supabaseAnonKey.includes("your-anon-key")
  );
};

// Singleton Client instance
let publicClient: SupabaseClient | null = null;
let adminClient: SupabaseClient | null = null;

/**
 * Public client for client-side queries (uses ANON key with RLS)
 */
export const getSupabaseClient = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!publicClient) {
    publicClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true }
    });
  }
  return publicClient;
};

/**
 * Admin client for secure server-side routes (uses SERVICE_ROLE key or anon)
 */
export const getSupabaseAdmin = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!adminClient) {
    const key = supabaseServiceKey || supabaseAnonKey;
    adminClient = createClient(supabaseUrl, key, {
      auth: { persistSession: false }
    });
  }
  return adminClient;
};

export interface BookingRecord {
  id: string;
  booking_ref: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  service_type: "flight" | "visa" | "umrah" | "holiday" | "hotel" | "insurance";
  origin?: string;
  destination: string;
  travel_date?: string;
  return_date?: string;
  passengers_count?: number;
  selected_flight?: string;
  selected_seat?: string;
  cabin_class?: string;
  estimated_amount?: number;
  currency?: string;
  status: "pending" | "contacted" | "confirmed" | "documents_received" | "ticket_issued" | "cancelled";
  payment_status: "unpaid" | "deposit_paid" | "fully_paid" | "refunded";
  notes?: string;
  created_at: string;
}

export interface OfferRecord {
  id: string;
  badge: string;
  title: string;
  route: string;
  price: string;
  original_price?: string;
  image_url: string;
  validity: string;
  category: "flight" | "holiday" | "umrah";
  is_active: boolean;
  display_order?: number;
  created_at?: string;
}

export interface LeadRecord {
  id: string;
  lead_name: string;
  lead_phone: string;
  lead_email?: string;
  service_needed?: string;
  destination?: string;
  travel_date?: string;
  message?: string;
  is_contacted: boolean;
  created_at: string;
}

// In-memory demo store used only when Supabase credentials are not yet added
let demoOffers: OfferRecord[] = [
  {
    id: "off-1",
    badge: "LIMITED GULF SEATS",
    title: "Calicut to Dubai Non-Stop",
    route: "CCJ ➔ DXB • Air India Express / IndiGo",
    price: "₹12,499",
    original_price: "₹16,500",
    image_url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
    validity: "Valid for departures this month",
    category: "flight",
    is_active: true
  },
  {
    id: "off-2",
    badge: "SPIRITUAL SAVER",
    title: "Direct Umrah Package 15 Days",
    route: "CCJ ➔ JED • Saudia Airlines • Walkable Hotel",
    price: "₹69,999",
    original_price: "₹79,000",
    image_url: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=900&q=80",
    validity: "Upcoming batch reservation",
    category: "umrah",
    is_active: true
  },
  {
    id: "off-3",
    badge: "TROPICAL ESCAPE",
    title: "Maldives Overwater Resort",
    route: "COK ➔ MLE • 4 Days / 3 Nights All-Inclusive",
    price: "₹42,999",
    original_price: "₹55,000",
    image_url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80",
    validity: "Includes Speedboat Transfers",
    category: "holiday",
    is_active: true
  },
  {
    id: "off-4",
    badge: "EUROPE SPECIAL",
    title: "London & UK Family Tour",
    route: "COK ➔ LHR • Direct Flight Assistance",
    price: "₹89,999",
    original_price: "₹1,05,000",
    image_url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=900&q=80",
    validity: "Visa file documentation included",
    category: "holiday",
    is_active: true
  }
];

let demoLeads: LeadRecord[] = [
  {
    id: "lead-1",
    lead_name: "Muhammed Shafi",
    lead_phone: "+91 8590624181",
    lead_email: "shafi@example.com",
    service_needed: "Flight Ticket Booking",
    destination: "Doha, Qatar",
    travel_date: "2026-12-10",
    message: "Need 2 tickets urgent non-stop from Calicut.",
    is_contacted: false,
    created_at: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: "lead-2",
    lead_name: "Amina Beevi",
    lead_phone: "+91 9188250904",
    lead_email: "amina@example.com",
    service_needed: "VIP Umrah Package",
    destination: "Makkah / Madinah",
    travel_date: "2026-12-25",
    message: "Family of 4, need ground floor / walkable Haram rooms.",
    is_contacted: true,
    created_at: new Date(Date.now() - 3600000 * 12).toISOString()
  }
];

export const getDemoOffers = () => [...demoOffers];
export const addDemoOffer = (offer: Omit<OfferRecord, "id">) => {
  const newOffer: OfferRecord = {
    ...offer,
    id: `off-${Date.now()}`
  };
  demoOffers = [newOffer, ...demoOffers];
  return newOffer;
};
export const deleteDemoOffer = (id: string) => {
  demoOffers = demoOffers.filter(o => o.id !== id);
  return true;
};
export const toggleDemoOffer = (id: string) => {
  demoOffers = demoOffers.map(o => (o.id === id ? { ...o, is_active: !o.is_active } : o));
  return demoOffers.find(o => o.id === id);
};

export const getDemoLeads = () => [...demoLeads];
export const addDemoLead = (lead: Omit<LeadRecord, "id" | "created_at" | "is_contacted">) => {
  const newLead: LeadRecord = {
    ...lead,
    id: `lead-${Date.now()}`,
    is_contacted: false,
    created_at: new Date().toISOString()
  };
  demoLeads = [newLead, ...demoLeads];
  return newLead;
};
export const markLeadContacted = (id: string, isContacted = true) => {
  demoLeads = demoLeads.map(l => (l.id === id ? { ...l, is_contacted: isContacted } : l));
  return demoLeads.find(l => l.id === id);
};

// In-memory demo store used only when Supabase credentials are not yet added
let demoBookings: BookingRecord[] = [
  {
    id: "demo-1",
    booking_ref: "SW-2026-1001",
    customer_name: "Afsal Rahman",
    customer_phone: "+91 8590624181",
    customer_email: "afsal.tirur@example.com",
    service_type: "flight",
    origin: "CCJ",
    destination: "DXB",
    travel_date: "2026-12-05",
    passengers_count: 2,
    selected_flight: "EK-563 (Emirates)",
    selected_seat: "02A",
    cabin_class: "Business",
    estimated_amount: 36900,
    currency: "INR",
    status: "confirmed",
    payment_status: "deposit_paid",
    notes: "Requires South Indian hot meals + 40kg baggage.",
    created_at: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: "demo-2",
    booking_ref: "SW-2026-1002",
    customer_name: "Shahana Parveen",
    customer_phone: "+91 9188250904",
    customer_email: "shahana.p@example.com",
    service_type: "umrah",
    origin: "COK",
    destination: "JED",
    travel_date: "2026-12-18",
    passengers_count: 3,
    selected_flight: "SV-782 (Saudia)",
    selected_seat: "01K",
    cabin_class: "Economy",
    estimated_amount: 282000,
    currency: "INR",
    status: "pending",
    payment_status: "unpaid",
    notes: "VIP 5-Star Pullman Zamzam Makkah + Dar Al Taqwa Madinah.",
    created_at: new Date(Date.now() - 3600000 * 18).toISOString()
  },
  {
    id: "demo-3",
    booking_ref: "SW-2026-1003",
    customer_name: "Nithin Kumar",
    customer_phone: "+91 9847123456",
    customer_email: "nithin.k@example.com",
    service_type: "visa",
    origin: "Tirur",
    destination: "UAE",
    travel_date: "2026-11-28",
    passengers_count: 1,
    selected_flight: "Dubai 60-Day Visit",
    selected_seat: "N/A",
    cabin_class: "Tourist Visa",
    estimated_amount: 6499,
    currency: "INR",
    status: "documents_received",
    payment_status: "fully_paid",
    notes: "Passport bio page verified. Ready for embassy transmission.",
    created_at: new Date(Date.now() - 3600000 * 30).toISOString()
  }
];

export const getDemoBookings = () => [...demoBookings];

export const addDemoBooking = (booking: Omit<BookingRecord, "id" | "booking_ref" | "created_at">) => {
  const newRef = `SW-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const record: BookingRecord = {
    ...booking,
    id: `demo-${Date.now()}`,
    booking_ref: newRef,
    created_at: new Date().toISOString()
  };
  demoBookings = [record, ...demoBookings];
  return record;
};

export const updateDemoBookingStatus = (id: string, status: BookingRecord["status"]) => {
  demoBookings = demoBookings.map(b => (b.id === id ? { ...b, status } : b));
  return demoBookings.find(b => b.id === id);
};
