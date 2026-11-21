import { NextRequest, NextResponse } from "next/server";
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  getDemoOffers,
  addDemoOffer,
  OfferRecord
} from "@/lib/supabase";

export const dynamic = "force-dynamic";

/**
 * GET: Fetch offers (either from Supabase or in-memory fallback)
 */
export async function GET() {
  try {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { data, error } = await supabase
          .from("promotional_offers")
          .select("*")
          .order("display_order", { ascending: true })
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          return NextResponse.json({ ok: true, offers: data, isDemo: false });
        }
      }
    }

    return NextResponse.json({ ok: true, offers: getDemoOffers(), isDemo: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to fetch offers";
    return NextResponse.json({ ok: false, error: errorMsg }, { status: 500 });
  }
}

/**
 * POST: Create a new promotional deal
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { badge, title, route, price, original_price, image_url, validity, category } = body;

    if (!title || !price || !route) {
      return NextResponse.json(
        { ok: false, message: "Title, Route, and Price are required" },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { data, error } = await supabase
          .from("promotional_offers")
          .insert({
            badge: badge || "SPECIAL DEAL",
            title,
            route,
            price,
            original_price: original_price || null,
            image_url:
              image_url ||
              "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
            validity: validity || "Limited Time Offer",
            category: category || "flight",
            is_active: true
          })
          .select()
          .single();

        if (!error && data) {
          return NextResponse.json({ ok: true, offer: data, isDemo: false }, { status: 201 });
        }
      }
    }

    const demo = addDemoOffer({
      badge: badge || "SPECIAL DEAL",
      title,
      route,
      price,
      original_price: original_price || "",
      image_url:
        image_url ||
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
      validity: validity || "Limited Time Offer",
      category: category || "flight",
      is_active: true
    });

    return NextResponse.json({ ok: true, offer: demo, isDemo: true }, { status: 201 });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to create offer";
    return NextResponse.json({ ok: false, error: errorMsg }, { status: 500 });
  }
}
