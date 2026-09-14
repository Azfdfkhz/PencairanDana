export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { riwayatPencairanData } from "@/data/mockDb";
import { formatRupiah } from "@/lib/format";

export async function GET() {
  try {
    if (!isSupabaseConfigured || !supabase) {
      return NextResponse.json(riwayatPencairanData);
    }

    const { data, error } = await supabase
      .from("pencairan_dana")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return NextResponse.json(riwayatPencairanData);
    }

    const mapped = data.map((item) => {
      const createdAt = new Date(item.created_at || Date.now());
      const tanggal = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(createdAt);

      const jam = `${new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(createdAt)} WIB`;

      const status = item.status || "Diproses";
      const statusType =
        status.toLowerCase() === "berhasil"
          ? "success"
          : status.toLowerCase() === "ditolak"
          ? "danger"
          : "warning";

      return {
        id: item.id,
        noPengajuan: item.no_pengajuan,
        tanggal,
        jam,
        nominal: typeof item.nominal === "number" ? formatRupiah(item.nominal) : String(item.nominal),
        status,
        statusType,
        detailUrl: `/pencairan-dana/detail-dana?id=${item.id}`,

        nominalPencairan: typeof item.nominal === "number" ? formatRupiah(item.nominal) : String(item.nominal),
        lokasiPenyaluran: item.lokasi_penyaluran,
        tanggalPenyaluran: item.tanggal_penyaluran,
        jumlahPenerima: item.jumlah_penerima,
        deskripsiPenyaluran: item.deskripsi_penyaluran,
        catatanPenolakan: item.catatan_penolakan || null,
      };
    });

    return NextResponse.json(mapped);
  } catch (err) {
    return NextResponse.json(riwayatPencairanData);
  }
}
