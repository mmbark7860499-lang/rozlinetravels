import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, passcode } = body;

    // Standard credential check for Rozline Travels Admin
    const validEmail = "rozlinetravels@gmail.com";
    const validPass = "travel@786";
    const backupPasscode = process.env.ADMIN_PASSCODE || "skyway2026";

    // Direct match check
    const isDirectMatch =
      (email && email.trim().toLowerCase() === validEmail.toLowerCase() && password === validPass) ||
      (passcode && passcode.trim() === backupPasscode);

    if (isDirectMatch) {
      return NextResponse.json({
        ok: true,
        user: {
          email: validEmail,
          name: "Rozline & Sky Way Executive Desk",
          role: "Super Admin",
          agency: "Sky Way Travels Tirur / Rozline Travels",
          loginTime: new Date().toISOString()
        },
        token: `skyway-session-${Date.now()}`
      });
    }

    // If Supabase is configured, also try Supabase Auth
    if (isSupabaseConfigured() && email && password) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (!error && data?.user) {
          return NextResponse.json({
            ok: true,
            user: {
              id: data.user.id,
              email: data.user.email || validEmail,
              name: data.user.user_metadata?.full_name || "Rozline Executive",
              role: "Super Admin",
              agency: "Sky Way Travels Tirur / Rozline Travels",
              loginTime: new Date().toISOString()
            },
            token: data.session?.access_token || `supabase-session-${Date.now()}`
          });
        }
      }
    }

    return NextResponse.json(
      { ok: false, message: "Invalid email or password. Please verify your credentials." },
      { status: 401 }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Authentication error";
    return NextResponse.json({ ok: false, error: errorMsg }, { status: 500 });
  }
}
