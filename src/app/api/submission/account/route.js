export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { withdrawalAccount } from "@/data/mockDb";

export async function GET() {
  return NextResponse.json(withdrawalAccount);
}
