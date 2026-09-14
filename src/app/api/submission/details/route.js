export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("rincian_dana")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return NextResponse.json({ message: error?.message || "Data rincian dana tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({
      danaTerkumpul: Number(data.dana_terkumpul || 0),
      biayaOptimasi: data.biaya_optimasi || {
        total: 30000000,
        rincian: [
          { label: "PPh Iklan", nominal: 5000000 },
          { label: "Biaya Iklan", nominal: 15000000 },
          { label: "Biaya Optimasi", nominal: 10000000 },
        ],
      },
      biayaPaymentGateway: Number(data.biaya_payment_gateway || 0),
      biayaPlatform: Number(data.biaya_platform || 0),
      sudahDicairkan: Number(data.sudah_dicairkan || 0),
      bisaDicairkan: Number(data.bisa_dicairkan || 0),
      lastUpdated: data.created_at,
    });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
