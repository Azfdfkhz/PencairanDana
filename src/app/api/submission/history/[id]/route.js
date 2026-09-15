export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { withdrawalHistoryData } from "@/data/mockDb";

export async function GET(request, { params }) {
  const { id } = await params;
  const item = withdrawalHistoryData.find((d) => String(d.id) === String(id));
  if (!item) {
    return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json(item);
}
