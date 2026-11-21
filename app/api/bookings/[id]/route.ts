import { NextResponse } from "next/server";
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  updateDemoBookingStatus
} from "@/lib/supabase";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { data, error } = await supabase
          .from("bookings")
          .update(body)
          .eq("id", id)
          .select()
          .single();

        if (!error && data) {
          return NextResponse.json({ ok: true, booking: data });
        }
      }
    }

    // Demo update
    const updated = updateDemoBookingStatus(id, body.status);
    return NextResponse.json({ ok: true, booking: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from("bookings").delete().eq("id", id);
      }
    }

    return NextResponse.json({ ok: true, message: `Booking ${id} deleted` });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
