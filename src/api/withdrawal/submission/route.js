import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    const body = await request.json();
    const { nominal, lokasiPenyaluran, jumlahPenerima, deskripsiPenyaluran } = body;

    // Insert into the 'pencairan_dana' table in Supabase
    const { data, error } = await supabase
      .from("pencairan_dana")
      .insert([
        {
          nominal,
          lokasi_penyaluran: lokasiPenyaluran,
          jumlah_penerima: jumlahPenerima,
          deskripsi: deskripsiPenyaluran,
          status: "Processing",
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data: data[0] }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}