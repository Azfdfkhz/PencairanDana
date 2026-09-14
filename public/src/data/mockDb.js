
export const campaignInfo = {
  id: "rohingya",
  title: "Bantu Pengungsi Rohingya Bertahan di Musim Dingin",
  thumbnail: "/images/SH-Rohingnya.png",
  campaignUrl: "/campaign/rohingya",
};

export const ringkasanDana = {
  danaTerkumpul: 213788000,
  sudahDicairkan: 213788000,
  bisaDicairkan: 190788000,
  minimalPencairan: 100000,
};

export const rincianDana = {
  danaTerkumpul: 213788000,
  biayaOptimasi: {
    total: 30000000,
    rincian: [
      { label: "PPh Iklan", nominal: 5000000 },
      { label: "Biaya Iklan", nominal: 15000000 },
      { label: "Biaya Optimasi", nominal: 10000000 },
    ],
  },
  biayaPaymentGateway: 67000000,
  biayaPlatform: 67000000,
  sudahDicairkan: 31788000,
  bisaDicairkan: 147000000,
  lastUpdated: "2026-09-10T08:00:00+20:00",
};

export const rekeningPencairan = {
  namaBank: "Bank BCA",
  nomorRekening: "1234 5678 90",
  namaPemilikRekening: "Yayasan Berbagi Bahagia",
  terverifikasi: true,
};

export const kontakPenerima = {
  namaKontak: "Nur Fatilah",
  noWhatsapp: "081231781812",
  noWhatsappMasked: "+62 812 •••• ••89",
};

export const csContact = {
  whatsappNumber: "6281234567890",
};

export const ubahRekeningAssets = {
  formUrl: "/files/Form-Perubahan-Rekening.docx",
  dokumenList: [
    "Foto/scan KTP atau Kartu Identitas pengaju",
    "Foto buku tabungan atau bukti kepemilikan rekening",
  ],
};

export const riwayatPencairanData = [
  {
    id: 1,
    noPengajuan: "PCR-2208137137",
    tanggal: "07 July 2026",
    jam: "04:02 WIB",
    nominal: "Rp 50.000.000",
    status: "Diproses",
    statusType: "warning",
    detailUrl: "/pencairan-dana/detail-dana?id=1",
    nominalPencairan: "Rp 190.788.000",
    lokasiPenyaluran: "Palu, Sulawesi Tengah",
    tanggalPenyaluran: "30–04–2027",
    jumlahPenerima: "150 Orang",
    deskripsiPenyaluran:
      "Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran.",
    namaBank: "Bank BCA",
    nomorRekening: "1234 5678 90",
    namaPemilikRekening: "Nama Pemilik Rekening",
    namaKontak: "Nur Fatilah",
    noWhatsapp: "081231781812",
    timeline: [
      { label: "Pengajuan Dikirim", tanggal: "07 July 2026 - 09:55 WIB", done: true },
      { label: "Pengajuan Diproses", tanggal: "09 July 2026 - 09:55 WIB", done: true },
      { label: "Menunggu Verifikasi", tanggal: null, done: false },
    ],
  },
  {
    id: 2,
    noPengajuan: "PCR-2208137137",
    tanggal: "07 July 2026",
    jam: "04:02 WIB",
    nominal: "Rp 50.000.000",
    status: "Ditolak",
    statusType: "danger",
    detailUrl: "/pencairan-dana/detail-dana?id=2",
    nominalPencairan: "Rp 190.788.000",
    lokasiPenyaluran: "Palu, Sulawesi Tengah",
    tanggalPenyaluran: "30–04–2027",
    jumlahPenerima: "150 Orang",
    deskripsiPenyaluran:
      "Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran.",
    namaBank: "Bank BCA",
    nomorRekening: "1234 5678 90",
    namaPemilikRekening: "Nama Pemilik Rekening",
    namaKontak: "Nur Fatilah",
    noWhatsapp: "081231781812",
    catatanPenolakan:
      "Angka RAB di deskripsi rencana penyaluran dan total pengajuan tidak sesuai",
    timeline: [
      { label: "Pengajuan Dikirim", tanggal: "07 July 2026 - 09:55 WIB", done: true },
      { label: "Pengajuan Diproses", tanggal: "09 July 2026 - 09:55 WIB", done: true },
      { label: "Pengajuan Ditolak", tanggal: "11 July 2026 - 09:55 WIB", done: true, rejected: true },
    ],
  },
  {
    id: 3,
    noPengajuan: "PCR-2208137137",
    tanggal: "07 July 2026",
    jam: "04:02 WIB",
    nominal: "Rp 50.000.000",
    status: "Berhasil",
    statusType: "success",
    detailUrl: "/pencairan-dana/detail-dana?id=3",
    nominalPencairan: "Rp 190.788.000",
    lokasiPenyaluran: "Palu, Sulawesi Tengah",
    tanggalPenyaluran: "30–04–2027",
    jumlahPenerima: "150 Orang",
    deskripsiPenyaluran:
      "Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran.",
    namaBank: "Bank BCA",
    nomorRekening: "1234 5678 90",
    namaPemilikRekening: "Nama Pemilik Rekening",
    namaKontak: "Nur Fatilah",
    noWhatsapp: "081231781812",
    timeline: [
      { label: "Pengajuan Dikirim", tanggal: "07 July 2026 - 09:55 WIB", done: true },
      { label: "Pengajuan Diproses", tanggal: "09 July 2026 - 09:55 WIB", done: true },
      { label: "Dana Berhasil Dicairkan", tanggal: "11 July 2026 - 08:55 WIB", done: true },
    ],
  },
  {
    id: 4,
    noPengajuan: "PCR-2208137138",
    tanggal: "07 July 2026",
    jam: "04:02 WIB",
    nominal: "Rp 50.000.000",
    status: "Berhasil",
    statusType: "success",
    detailUrl: "/pencairan-dana/detail-dana?id=4",
    nominalPencairan: "Rp 190.788.000",
    lokasiPenyaluran: "Palu, Sulawesi Tengah",
    tanggalPenyaluran: "30–04–2027",
    jumlahPenerima: "150 Orang",
    deskripsiPenyaluran:
      "Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran.",
    namaBank: "Bank BCA",
    nomorRekening: "1234 5678 90",
    namaPemilikRekening: "Nama Pemilik Rekening",
    namaKontak: "Nur Fatilah",
    noWhatsapp: "081231781812",
    timeline: [
      { label: "Pengajuan Dikirim", tanggal: "07 July 2026 - 09:55 WIB", done: true },
      { label: "Pengajuan Diproses", tanggal: "09 July 2026 - 09:55 WIB", done: true },
      { label: "Dana Berhasil Dicairkan", tanggal: "11 July 2026 - 08:55 WIB", done: true },
    ],
  },
    {
    id: 5,
    noPengajuan: "PCR-22081374567",
    tanggal: "10 september 2026",
    jam: "04:02 WIB",
    nominal: "Rp 150.000.000",
    status: "Diproses",
    statusType: "warning",
    detailUrl: "/pencairan-dana/detail-dana?id=1",
    nominalPencairan: "Rp 190.788.000",
    lokasiPenyaluran: "Palu, Sulawesi Tengah",
    tanggalPenyaluran: "30–04–2027",
    jumlahPenerima: "150 Orang",
    deskripsiPenyaluran:
      "Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran.",
    namaBank: "Bank BCA",
    nomorRekening: "1234 5678 90",
    namaPemilikRekening: "Nama Pemilik Rekening",
    namaKontak: "Nur Fatilah",
    noWhatsapp: "081231781812",
    timeline: [
      { label: "Pengajuan Dikirim", tanggal: "10 september 2026 - 09:55 WIB", done: true },
      { label: "Pengajuan Diproses", tanggal: "19 september 2026 - 17:55 WIB", done: true },
      { label: "Menunggu Verifikasi", tanggal: null, done: false },
    ],
  },
];

// In-memory "database" untuk pengajuan baru yang dibuat lewat mock API,
// supaya ThanksUp bisa menampilkan data hasil submit yang sesungguhnya
// (bukan hardcode "PCR138-0001") selama sesi mock berjalan.
let nextMockId = riwayatPencairanData.length + 1;

export function insertMockPengajuan(payload) {
  const now = new Date();
  const noPengajuan = `PCR${String(now.getFullYear()).slice(-2)}${String(
    nextMockId
  ).padStart(4, "0")}`;

  const newItem = {
    id: nextMockId++,
    noPengajuan,
    tanggal: formatTanggalSingkat(now),
    jam: formatJamWib(now),
    nominal: payload.nominal,
    status: "Diproses",
    statusType: "warning",
    detailUrl: `/pencairan-dana/detail-dana?id=${nextMockId - 1}`,
    nominalPencairan: payload.nominal,
    lokasiPenyaluran: payload.lokasiPenyaluran,
    tanggalPenyaluran: payload.tanggalPenyaluran,
    jumlahPenerima: payload.jumlahPenerima,
    deskripsiPenyaluran: payload.deskripsiPenyaluran,
    namaBank: rekeningPencairan.namaBank,
    nomorRekening: rekeningPencairan.nomorRekening,
    namaPemilikRekening: rekeningPencairan.namaPemilikRekening,
    namaKontak: kontakPenerima.namaKontak,
    noWhatsapp: kontakPenerima.noWhatsapp,
    timeline: [
      { label: "Pengajuan Dikirim", tanggal: formatTanggalJamPenuh(now), done: true },
      { label: "Pengajuan Diproses", tanggal: null, done: false },
      { label: "Menunggu Verifikasi", tanggal: null, done: false },
    ],
  };

  riwayatPencairanData.unshift(newItem);
  return newItem;
}

function formatTanggalSingkat(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatJamWib(date) {
  return `${new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date)} WIB`;
}

function formatTanggalJamPenuh(date) {
  return `${formatTanggalSingkat(date)} - ${formatJamWib(date)}`;
}
