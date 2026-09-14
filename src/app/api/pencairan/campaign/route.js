export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return NextResponse.json({ message: error?.message || "Data campaign tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({
      id: data.id,
      title: data.title,
      thumbnail: data.thumbnail || "/images/SH-Rohingnya.png",
      campaignUrl: data.campaign_url || `/campaign/${data.id}`,
    });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
