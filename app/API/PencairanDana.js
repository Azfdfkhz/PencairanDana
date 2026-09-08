
// menggunakan dataDummy pada folder data
import { riwayatPencairanData } from "@/app/data/riwayatPencairanData";

export async function getRiwayatPencairan() {
  return riwayatPencairanData;
}   

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export async function getRiwayatPencairan() {
//   const response = await fetch(`${API_URL}/pencairan/riwayat`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Gagal mengambil riwayat pencairan");
//   }

//   return response.json();
// }