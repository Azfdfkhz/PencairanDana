"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import StatusBadge from "@/app/pencairan-dana/components/StatusBadge";
import { getRiwayatPencairan } from "@/app/API/PencairanDana";


export default function RiwayatPencairan() {
  const [riwayatData, setRiwayatData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRiwayat() {
      try {
        setLoading(true);

        const data = await getRiwayatPencairan();

        setRiwayatData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRiwayat();
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs md:p-6">
        <h2 className="mb-4 text-base font-bold text-[#1e293b]">
          Riwayat Pencairan
        </h2>

        <p className="text-sm text-gray-500">
          Memuat riwayat pencairan...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs md:p-6">
        <h2 className="mb-4 text-base font-bold text-[#1e293b]">
          Riwayat Pencairan
        </h2>

        <p className="text-sm text-red-500">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs md:p-6">
      <h2 className="mb-4 text-base font-bold text-[#1e293b]">
        Riwayat Pencairan
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs md:text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-[#1e293b]">
              <th className="pb-3 font-bold">
                Tanggal Pengajuan
              </th>

              <th className="pb-3 font-bold">
                Nominal
              </th>

              <th className="pb-3 text-center font-bold">
                Status
              </th>

              <th className="pb-3 text-right font-bold">
                Detail
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {riwayatData.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/50"
              >
                <td className="py-3.5">
                  <p className="font-bold text-[#1e293b]">
                    {item.tanggal}
                  </p>

                  <p className="text-[11px] text-[#94a3b8]">
                    {item.jam}
                  </p>
                </td>

                <td className="py-3.5 font-bold text-[#1e293b]">
                  {item.nominal}
                </td>

                <td className="py-3.5 text-center">
                  <StatusBadge
                    status={item.status}
                    type={item.statusType}
                  />
                </td>

                <td className="py-3.5 text-right">
                  <Link
                    href={item.detailUrl}
                    className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#0052cc] hover:underline"
                  >
                    <span>Lihat detail</span>
                    <ChevronRight size={14} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}