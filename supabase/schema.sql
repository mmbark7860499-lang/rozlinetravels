-- ==============================================================================
-- SKY WAY TRAVELS TIRUR — COMPLETE SUPABASE DATABASE SCHEMA
-- Compatible with PostgreSQL 15+ and Supabase SQL Editor
-- Run this script in your Supabase Project: SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TRIGGER FUNCTION FOR UPDATED_AT
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- TABLE 1: BOOKINGS & RESERVATIONS
-- Stores Flights, Umrah tours, Visas, Holidays, and Hotels inquiries
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_ref VARCHAR(20) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  customer_email VARCHAR(255),
  service_type VARCHAR(50) NOT NULL CHECK (
    service_type IN ('flight', 'visa', 'umrah', 'holiday', 'hotel', 'insurance')
  ),
  origin VARCHAR(100),
  destination VARCHAR(100) NOT NULL,
  travel_date DATE,
  return_date DATE,
  passengers_count INT DEFAULT 1,
  selected_flight VARCHAR(100),
  selected_seat VARCHAR(20),
  cabin_class VARCHAR(50) DEFAULT 'Economy',
  estimated_amount NUMERIC(12, 2) DEFAULT 0,
  currency VARCHAR(10) DEFAULT 'INR',
  status VARCHAR(50) DEFAULT 'pending' CHECK (
    status IN ('pending', 'contacted', 'confirmed', 'documents_received', 'ticket_issued', 'cancelled')
  ),
  payment_status VARCHAR(50) DEFAULT 'unpaid' CHECK (
    payment_status IN ('unpaid', 'deposit_paid', 'fully_paid', 'refunded')
  ),
  notes TEXT,
  source VARCHAR(50) DEFAULT 'web_booking_engine',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for speed
CREATE INDEX IF NOT EXISTS idx_bookings_ref ON public.bookings(booking_ref);
CREATE INDEX IF NOT EXISTS idx_bookings_phone ON public.bookings(customer_phone);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created ON public.bookings(created_at DESC);

-- Trigger
DROP TRIGGER IF EXISTS trigger_bookings_updated_at ON public.bookings;
CREATE TRIGGER trigger_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- TABLE 2: VISA APPLICATIONS & DOCUMENT TRACKER
-- Tracks country visa applications and checklist readiness
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.visa_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_ref VARCHAR(20) UNIQUE NOT NULL,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  applicant_name VARCHAR(255) NOT NULL,
  applicant_phone VARCHAR(50) NOT NULL,
  passport_number VARCHAR(50),
  country_slug VARCHAR(50) NOT NULL,
  country_name VARCHAR(100) NOT NULL,
  visa_type VARCHAR(100) NOT NULL,
  checklist_items JSONB DEFAULT '[]'::jsonb,
  readiness_percentage INT DEFAULT 0,
  status VARCHAR(50) DEFAULT 'under_scrutiny' CHECK (
    status IN ('draft', 'under_scrutiny', 'submitted_to_embassy', 'approved', 'rejected')
  ),
  embassy_ref_no VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_visa_country ON public.visa_applications(country_slug);
CREATE INDEX IF NOT EXISTS idx_visa_status ON public.visa_applications(status);

DROP TRIGGER IF EXISTS trigger_visa_updated_at ON public.visa_applications;
CREATE TRIGGER trigger_visa_updated_at
BEFORE UPDATE ON public.visa_applications
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- TABLE 3: CUSTOMER INQUIRIES & LEADS
-- General leads from homepage contact forms and inquiries
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.customer_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_name VARCHAR(255) NOT NULL,
  lead_phone VARCHAR(50) NOT NULL,
  lead_email VARCHAR(255),
  service_needed VARCHAR(100),
  destination VARCHAR(100),
  travel_date DATE,
  message TEXT,
  is_contacted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.customer_leads(lead_phone);
CREATE INDEX IF NOT EXISTS idx_leads_created ON public.customer_leads(created_at DESC);

-- ==============================================================================
-- TABLE 4: PROMOTIONAL OFFERS (CMS FOR TRAVEL DEALS)
-- Allows staff to update deals dynamically without touching code
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.promotional_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  badge VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  route VARCHAR(255) NOT NULL,
  price VARCHAR(50) NOT NULL,
  original_price VARCHAR(50),
  image_url TEXT NOT NULL,
  validity VARCHAR(100),
  category VARCHAR(50) DEFAULT 'flight',
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- TABLE 5: ADMIN & STAFF PROFILES
-- Stores authorized management accounts
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'super_admin',
  agency_name VARCHAR(255) DEFAULT 'Sky Way Travels Tirur / Rozline Travels',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.admin_profiles (email, full_name, role, agency_name)
VALUES ('rozlinetravels@gmail.com', 'Rozline & Sky Way Executive Desk', 'super_admin', 'Sky Way Travels Tirur / Rozline Travels')
ON CONFLICT (email) DO NOTHING;

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visa_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotional_offers ENABLE ROW LEVEL SECURITY;

-- 1. Public can insert new bookings, visa requests, and leads
CREATE POLICY "Public can submit bookings"
ON public.bookings FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Public can submit visa applications"
ON public.visa_applications FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Public can submit leads"
ON public.customer_leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 2. Public can read active promotional offers
CREATE POLICY "Public can view active offers"
ON public.promotional_offers FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- 3. Service role & authenticated admin full access
CREATE POLICY "Admin full access on bookings"
ON public.bookings FOR ALL
TO service_role, authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Admin full access on visa applications"
ON public.visa_applications FOR ALL
TO service_role, authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Admin full access on leads"
ON public.customer_leads FOR ALL
TO service_role, authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Admin full access on offers"
ON public.promotional_offers FOR ALL
TO service_role, authenticated
USING (true)
WITH CHECK (true);

-- ==============================================================================
-- SAMPLE SEED DATA FOR IMMEDIATE TESTING
-- ==============================================================================
INSERT INTO public.bookings (
  booking_ref,
  customer_name,
  customer_phone,
  customer_email,
  service_type,
  origin,
  destination,
  travel_date,
  passengers_count,
  selected_flight,
  selected_seat,
  cabin_class,
  estimated_amount,
  status,
  payment_status,
  notes
) VALUES
(
  'SW-2026-1001',
  'Afsal Rahman',
  '+91 8590624181',
  'afsal@example.com',
  'flight',
  'CCJ',
  'DXB',
  CURRENT_DATE + INTERVAL '5 days',
  2,
  'EK-563 (Emirates)',
  '02A',
  'Business',
  36900.00,
  'confirmed',
  'deposit_paid',
  'Customer requested extra luggage and South Indian meal.'
),
(
  'SW-2026-1002',
  'Shahana Parveen',
  '+91 9188250904',
  'shahana@example.com',
  'umrah',
  'COK',
  'JED',
  CURRENT_DATE + INTERVAL '12 days',
  3,
  'SV-782 (Saudia)',
  '01K',
  'Economy',
  282000.00,
  'pending',
  'unpaid',
  'Royal Executive 5-Star Swissotel Zamzam group.'
),
(
  'SW-2026-1003',
  'Nithin Kumar',
  '+91 9847123456',
  'nithin@example.com',
  'visa',
  'Tirur',
  'UAE',
  CURRENT_DATE + INTERVAL '3 days',
  1,
  NULL,
  NULL,
  'Tourist Visa',
  6499.00,
  'documents_received',
  'fully_paid',
  '60 Days UAE tourist visit visa. Passport verified.'
)
ON CONFLICT (booking_ref) DO NOTHING;

-- Seed initial promotional offers
INSERT INTO public.promotional_offers (
  badge, title, route, price, original_price, image_url, validity, category, display_order
) VALUES
('LIMITED GULF SEATS', 'Calicut to Dubai Non-Stop', 'CCJ ➔ DXB • Air India Express / IndiGo', '₹12,499', '₹16,500', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80', 'Departures this month', 'flight', 1),
('SPIRITUAL SAVER', 'Direct Umrah Package 15 Days', 'CCJ ➔ JED • Saudia Airlines • Walkable Hotel', '₹69,999', '₹79,000', 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=900&q=80', 'Upcoming batch reservation', 'umrah', 2),
('TROPICAL ESCAPE', 'Maldives Overwater Resort', 'COK ➔ MLE • 4 Days / 3 Nights All-Inclusive', '₹42,999', '₹55,000', 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80', 'Includes Speedboat Transfers', 'holiday', 3),
('EUROPE SPECIAL', 'London & UK Family Tour', 'COK ➔ LHR • Direct Flight Assistance', '₹89,999', '₹1,05,000', 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=900&q=80', 'Visa file documentation included', 'holiday', 4)
ON CONFLICT DO NOTHING;
