export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("rekening_pencairan")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return NextResponse.json({ message: error?.message || "Data rekening tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({
      namaBank: data.nama_bank,
      nomorRekening: data.nomor_rekening,
      namaPemilikRekening: data.nama_pemilik,
      terverifikasi: Boolean(data.terverifikasi),
    });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
