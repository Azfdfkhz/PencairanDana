export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("kontak_penerima")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return NextResponse.json({ message: error?.message || "Data kontak tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({
      namaKontak: data.nama_kontak,
      noWhatsapp: data.no_whatsapp,
      noWhatsappMasked: data.no_whatsapp_masked || data.no_whatsapp,
    });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
