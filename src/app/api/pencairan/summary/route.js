export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("ringkasan_dana")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return NextResponse.json({ message: error?.message || "Data ringkasan dana tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({
      danaTerkumpul: Number(data.dana_terkumpul || 0),
      sudahDicairkan: Number(data.sudah_dicairkan || 0),
      bisaDicairkan: Number(data.bisa_dicairkan || 0),
      minimalPencairan: Number(data.minimal_pencairan || 100000),
    });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
