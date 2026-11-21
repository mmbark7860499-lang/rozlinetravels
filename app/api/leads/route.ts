import { NextRequest, NextResponse } from "next/server";
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  getDemoLeads,
  addDemoLead,
  markLeadContacted
} from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { data, error } = await supabase
          .from("customer_leads")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          return NextResponse.json({ ok: true, leads: data, isDemo: false });
        }
      }
    }

    return NextResponse.json({ ok: true, leads: getDemoLeads(), isDemo: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to fetch leads";
    return NextResponse.json({ ok: false, error: errorMsg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lead_name, lead_phone, lead_email, service_needed, destination, travel_date, message } =
      body;

    if (!lead_name || !lead_phone) {
      return NextResponse.json(
        { ok: false, message: "Name and Phone are required" },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { data, error } = await supabase
          .from("customer_leads")
          .insert({
            lead_name,
            lead_phone,
            lead_email: lead_email || null,
            service_needed: service_needed || "General Inquiry",
            destination: destination || null,
            travel_date: travel_date || null,
            message: message || null,
            is_contacted: false
          })
          .select()
          .single();

        if (!error && data) {
          return NextResponse.json({ ok: true, lead: data, isDemo: false }, { status: 201 });
        }
      }
    }

    const demo = addDemoLead({
      lead_name,
      lead_phone,
      lead_email,
      service_needed: service_needed || "General Inquiry",
      destination,
      travel_date,
      message
    });

    return NextResponse.json({ ok: true, lead: demo, isDemo: true }, { status: 201 });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to record lead";
    return NextResponse.json({ ok: false, error: errorMsg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, is_contacted } = body;

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { data, error } = await supabase
          .from("customer_leads")
          .update({ is_contacted })
          .eq("id", id)
          .select()
          .single();

        if (!error) {
          return NextResponse.json({ ok: true, lead: data, isDemo: false });
        }
      }
    }

    const updated = markLeadContacted(id, Boolean(is_contacted));
    return NextResponse.json({ ok: true, lead: updated, isDemo: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to update lead";
    return NextResponse.json({ ok: false, error: errorMsg }, { status: 500 });
  }
}
