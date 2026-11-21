import { NextResponse } from "next/server";
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  getDemoBookings,
  addDemoBooking,
  BookingRecord
} from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (!supabase) {
        return NextResponse.json({ ok: true, bookings: getDemoBookings(), isDemo: true });
      }

      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error fetching bookings:", error);
        return NextResponse.json({ ok: true, bookings: getDemoBookings(), isDemo: true });
      }

      return NextResponse.json({ ok: true, bookings: data, isDemo: false });
    }

    // Demo Mode fallback
    return NextResponse.json({ ok: true, bookings: getDemoBookings(), isDemo: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message, bookings: getDemoBookings() }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const bookingRef = `SW-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBookingData = {
      booking_ref: bookingRef,
      customer_name: body.customer_name || "Guest Traveler",
      customer_phone: body.customer_phone || "+91 8590624181",
      customer_email: body.customer_email || "",
      service_type: body.service_type || "flight",
      origin: body.origin || "CCJ",
      destination: body.destination || "DXB",
      travel_date: body.travel_date || new Date().toISOString().slice(0, 10),
      return_date: body.return_date || null,
      passengers_count: Number(body.passengers_count) || 1,
      selected_flight: body.selected_flight || "",
      selected_seat: body.selected_seat || "Auto",
      cabin_class: body.cabin_class || "Economy",
      estimated_amount: Number(body.estimated_amount) || 0,
      currency: "INR",
      status: "pending",
      payment_status: "unpaid",
      notes: body.notes || "",
      source: body.source || "web_booking_engine"
    };

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { data, error } = await supabase
          .from("bookings")
          .insert([newBookingData])
          .select()
          .single();

        if (error) {
          console.error("Supabase insert error:", error);
          const fallback = addDemoBooking(newBookingData as any);
          return NextResponse.json({ ok: true, booking: fallback, isDemo: true });
        }

        return NextResponse.json({ ok: true, booking: data, isDemo: false });
      }
    }

    // Fallback to local demo store
    const demoRecord = addDemoBooking(newBookingData as any);
    return NextResponse.json({ ok: true, booking: demoRecord, isDemo: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
