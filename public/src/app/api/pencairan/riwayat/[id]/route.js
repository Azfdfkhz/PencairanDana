export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { riwayatPencairanData, rekeningPencairan, kontakPenerima } from "@/data/mockDb";
import { formatRupiah } from "@/lib/format";

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    if (!isSupabaseConfigured || !supabase) {
      const item = riwayatPencairanData.find((d) => String(d.id) === String(id));
      if (!item) {
        return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });
      }
      return NextResponse.json(item);
    }

    const { data, error } = await supabase
      .from("pencairan_dana")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      const fallback = riwayatPencairanData.find((d) => String(d.id) === String(id));
      if (!fallback) {
        return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });
      }
      return NextResponse.json(fallback);
    }

    const formattedNominal = typeof data.nominal === "number" ? formatRupiah(data.nominal) : String(data.nominal);

    const mapped = {
      id: data.id,
      noPengajuan: data.no_pengajuan || `PCR-${data.id}`,
      tanggal: new Date(data.created_at || Date.now()).toLocaleDateString("en-GB"),
      jam: `${new Date(data.created_at || Date.now()).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB`,
      nominal: formattedNominal,
      status: data.status || "Diproses",
      statusType: data.status_type || (data.status === "Berhasil" ? "success" : data.status === "Ditolak" ? "danger" : "warning"),
      detailUrl: `/pencairan-dana/detail-dana?id=${data.id}`,
      nominalPencairan: formattedNominal,
      lokasiPenyaluran: data.lokasi_penyaluran || "-",
      tanggalPenyaluran: data.tanggal_penyaluran || "-",
      jumlahPenerima: data.jumlah_penerima || "-",
      deskripsiPenyaluran: data.deskripsi_penyaluran || "-",
      catatanPenolakan: data.catatan_penolakan || null,
      namaBank: rekeningPencairan.namaBank,
      nomorRekening: rekeningPencairan.nomorRekening,
      namaPemilikRekening: rekeningPencairan.namaPemilikRekening,
      namaKontak: kontakPenerima.namaKontak,
      noWhatsapp: kontakPenerima.noWhatsapp,
      timeline: generateTimeline(data),
    };

    return NextResponse.json(mapped);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

function generateTimeline(item) {
  const createdAt = new Date(item.created_at || Date.now());
  const formattedDate = `${new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(createdAt)} - ${new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(createdAt)} WIB`;

  if (item.status === "Berhasil") {
    return [
      { label: "Pengajuan Dikirim", tanggal: formattedDate, done: true },
      { label: "Pengajuan Diproses", tanggal: formattedDate, done: true },
      { label: "Dana Berhasil Dicairkan", tanggal: formattedDate, done: true },
    ];
  } else if (item.status === "Ditolak") {
    return [
      { label: "Pengajuan Dikirim", tanggal: formattedDate, done: true },
      { label: "Pengajuan Diproses", tanggal: formattedDate, done: true },
      { label: "Pengajuan Ditolak", tanggal: formattedDate, done: true, rejected: true },
    ];
  } else {
    return [
      { label: "Pengajuan Dikirim", tanggal: formattedDate, done: true },
      { label: "Pengajuan Diproses", tanggal: formattedDate, done: true },
      { label: "Menunggu Verifikasi", tanggal: null, done: false },
    ];
  }
}
