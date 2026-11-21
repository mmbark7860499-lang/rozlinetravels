import { NextRequest, NextResponse } from "next/server";
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  deleteDemoOffer,
  toggleDemoOffer
} from "@/lib/supabase";

export const dynamic = "force-dynamic";

/**
 * PATCH: Toggle offer active/inactive status or edit details
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const updatePayload: Record<string, any> = {};
        if (typeof body.is_active === "boolean") updatePayload.is_active = body.is_active;
        if (body.price) updatePayload.price = body.price;
        if (body.title) updatePayload.title = body.title;

        const { data, error } = await supabase
          .from("promotional_offers")
          .update(updatePayload)
          .eq("id", id)
          .select()
          .single();

        if (!error) {
          return NextResponse.json({ ok: true, offer: data, isDemo: false });
        }
      }
    }

    const updated = toggleDemoOffer(id);
    return NextResponse.json({ ok: true, offer: updated, isDemo: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to update offer";
    return NextResponse.json({ ok: false, error: errorMsg }, { status: 500 });
  }
}

/**
 * DELETE: Remove offer
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error } = await supabase.from("promotional_offers").delete().eq("id", id);
        if (!error) {
          return NextResponse.json({ ok: true, isDemo: false });
        }
      }
    }

    deleteDemoOffer(id);
    return NextResponse.json({ ok: true, isDemo: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to delete offer";
    return NextResponse.json({ ok: false, error: errorMsg }, { status: 500 });
  }
}
