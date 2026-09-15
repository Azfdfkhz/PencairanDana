
export const campaignInfo = {
  id: "rohingya",
  title: "Bantu Pengungsi Rohingya Bertahan di Musim Dingin",
  thumbnail: "/images/SH-Rohingnya.png",
  campaignUrl: "/campaign/rohingya",
};

export const fundSummary = {
  totalFundsCollected: 213788000,
  alreadyWithdrawn: 213788000,
  availableToWithdraw: 190788000,
  minimumWithdrawal: 100000,
};

export const fundDetails = {
  totalFundsCollected: 213788000,
  optimizationFee: {
    total: 30000000,
    breakdown: [
      { label: "PPh Iklan", nominal: 5000000 },
      { label: "Biaya Iklan", nominal: 15000000 },
      { label: "Biaya Optimasi", nominal: 10000000 },
    ],
  },
  paymentGatewayFee: 67000000,
  platformFee: 67000000,
  alreadyWithdrawn: 31788000,
  availableToWithdraw: 147000000,
  lastUpdated: "2026-09-10T08:00:00+20:00",
};

export const withdrawalAccount = {
  bankName: "Bank BCA",
  accountNumber: "1234 5678 90",
  accountHolderName: "Yayasan Berbagi Bahagia",
  verified: true,
};

export const recipientContact = {
  contactName: "Nur Fatilah",
  whatsappNumber: "081231781812",
  whatsappNumberMasked: "+62 812 •••• •89",
};

export const csContact = {
  whatsappNumber: "6281234567890",
};

export const changeBankAccountAssets = {
  formUrl: "/files/Form-Perubahan-Rekening.docx",
  documentList: [
    "Foto/scan KTP atau Kartu Identitas pengaju",
    "Foto buku tabungan atau bukti kepemilikan rekening",
  ],
};

export const withdrawalHistoryData = [
  {
    id: 1,
    submissionNumber: "PCR-2208137137",
    date: "07 July 2026",
    time: "04:02 WIB",
    nominal: "Rp 50.000.000",
    status: "Diproses",
    statusType: "warning",
    detailUrl: "/pencairan-dana/detail-dana?id=1",
    withdrawalAmount: "Rp 190.788.000",
    distributionLocation: "Palu, Sulawesi Tengah",
    distributionDate: "30–04–2027",
    recipientCount: "150 Orang",
    distributionDescription:
      "Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran.",
    bankName: "Bank BCA",
    accountNumber: "1234 5678 90",
    accountHolderName: "Nama Pemilik Rekening",
    contactName: "Nur Fatilah",
    whatsappNumber: "081231781812",
    timeline: [
      { label: "Pengajuan Dikirim", date: "07 July 2026 - 09:55 WIB", done: true },
      { label: "Pengajuan Diproses", date: "09 July 2026 - 09:55 WIB", done: true },
      { label: "Menunggu Verifikasi", date: null, done: false },
    ],
  },
  {
    id: 2,
    submissionNumber: "PCR-2208137137",
    date: "07 July 2026",
    time: "04:02 WIB",
    nominal: "Rp 50.000.000",
    status: "Ditolak",
    statusType: "danger",
    detailUrl: "/pencairan-dana/detail-dana?id=2",
    withdrawalAmount: "Rp 190.788.000",
    distributionLocation: "Palu, Sulawesi Tengah",
    distributionDate: "30–04–2027",
    recipientCount: "150 Orang",
    distributionDescription:
      "Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran.",
    bankName: "Bank BCA",
    accountNumber: "1234 5678 90",
    accountHolderName: "Nama Pemilik Rekening",
    contactName: "Nur Fatilah",
    whatsappNumber: "081231781812",
    rejectionNote:
      "Angka RAB di deskripsi rencana penyaluran dan total pengajuan tidak sesuai",
    timeline: [
      { label: "Pengajuan Dikirim", date: "07 July 2026 - 09:55 WIB", done: true },
      { label: "Pengajuan Diproses", date: "09 July 2026 - 09:55 WIB", done: true },
      { label: "Pengajuan Ditolak", date: "11 July 2026 - 09:55 WIB", done: true, rejected: true },
    ],
  },
  {
    id: 3,
    submissionNumber: "PCR-2208137137",
    date: "07 July 2026",
    time: "04:02 WIB",
    nominal: "Rp 50.000.000",
    status: "Berhasil",
    statusType: "success",
    detailUrl: "/pencairan-dana/detail-dana?id=3",
    withdrawalAmount: "Rp 190.788.000",
    distributionLocation: "Palu, Sulawesi Tengah",
    distributionDate: "30–04–2027",
    recipientCount: "150 Orang",
    distributionDescription:
      "Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran.",
    bankName: "Bank BCA",
    accountNumber: "1234 5678 90",
    accountHolderName: "Nama Pemilik Rekening",
    contactName: "Nur Fatilah",
    whatsappNumber: "081231781812",
    timeline: [
      { label: "Pengajuan Dikirim", date: "07 July 2026 - 09:55 WIB", done: true },
      { label: "Pengajuan Diproses", date: "09 July 2026 - 09:55 WIB", done: true },
      { label: "Dana Berhasil Dicairkan", date: "11 July 2026 - 08:55 WIB", done: true },
    ],
  },
  {
    id: 4,
    submissionNumber: "PCR-2208137138",
    date: "07 July 2026",
    time: "04:02 WIB",
    nominal: "Rp 50.000.000",
    status: "Berhasil",
    statusType: "success",
    detailUrl: "/pencairan-dana/detail-dana?id=4",
    withdrawalAmount: "Rp 190.788.000",
    distributionLocation: "Palu, Sulawesi Tengah",
    distributionDate: "30–04–2027",
    recipientCount: "150 Orang",
    distributionDescription:
      "Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran.",
    bankName: "Bank BCA",
    accountNumber: "1234 5678 90",
    accountHolderName: "Nama Pemilik Rekening",
    contactName: "Nur Fatilah",
    whatsappNumber: "081231781812",
    timeline: [
      { label: "Pengajuan Dikirim", date: "07 July 2026 - 09:55 WIB", done: true },
      { label: "Pengajuan Diproses", date: "09 July 2026 - 09:55 WIB", done: true },
      { label: "Dana Berhasil Dicairkan", date: "11 July 2026 - 08:55 WIB", done: true },
    ],
  },
    {
    id: 5,
    submissionNumber: "PCR-22081374567",
    date: "10 september 2026",
    time: "04:02 WIB",
    nominal: "Rp 150.000.000",
    status: "Diproses",
    statusType: "warning",
    detailUrl: "/pencairan-dana/detail-dana?id=1",
    withdrawalAmount: "Rp 190.788.000",
    distributionLocation: "Palu, Sulawesi Tengah",
    distributionDate: "30–04–2027",
    recipientCount: "150 Orang",
    distributionDescription:
      "Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran.",
    bankName: "Bank BCA",
    accountNumber: "1234 5678 90",
    accountHolderName: "Nama Pemilik Rekening",
    contactName: "Nur Fatilah",
    whatsappNumber: "081231781812",
    timeline: [
      { label: "Pengajuan Dikirim", date: "10 september 2026 - 09:55 WIB", done: true },
      { label: "Pengajuan Diproses", date: "19 september 2026 - 17:55 WIB", done: true },
      { label: "Menunggu Verifikasi", date: null, done: false },
    ],
  },
];

// In-memory "database" for new submissions created via mock API,
// so ThankYouModal can display actual submit results
// (not hardcoded "PCR138-0001") during the mock session.
let nextMockId = withdrawalHistoryData.length + 1;

export function insertMockSubmission(payload) {
  const now = new Date();
  const submissionNumber = `PCR${String(now.getFullYear()).slice(-2)}${String(
    nextMockId
  ).padStart(4, "0")}`;

  const newItem = {
    id: nextMockId++,
    submissionNumber,
    date: formatShortDate(now),
    time: formatTimeWib(now),
    nominal: payload.nominal,
    status: "Diproses",
    statusType: "warning",
    detailUrl: `/pencairan-dana/detail-dana?id=${nextMockId - 1}`,
    withdrawalAmount: payload.nominal,
    distributionLocation: payload.distributionLocation,
    distributionDate: payload.distributionDate,
    recipientCount: payload.recipientCount,
    distributionDescription: payload.distributionDescription,
    bankName: withdrawalAccount.bankName,
    accountNumber: withdrawalAccount.accountNumber,
    accountHolderName: withdrawalAccount.accountHolderName,
    contactName: recipientContact.contactName,
    whatsappNumber: recipientContact.whatsappNumber,
    timeline: [
      { label: "Pengajuan Dikirim", date: formatFullDateTime(now), done: true },
      { label: "Pengajuan Diproses", date: null, done: false },
      { label: "Menunggu Verifikasi", date: null, done: false },
    ],
  };

  withdrawalHistoryData.unshift(newItem);
  return newItem;
}

function formatShortDate(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatTimeWib(date) {
  return `${new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date)} WIB`;
}

function formatFullDateTime(date) {
  return `${formatShortDate(date)} - ${formatTimeWib(date)}`;
}
