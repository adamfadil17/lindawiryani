/**
 * Language-neutral working-with-us keys. Shared by every locale — edit once here.
 * Urutan di bawah menentukan urutan tampil. Teks dikunci per key di
 * translate/<locale>/working-with-us-text.<locale>.ts.
 *
 * Catatan: form di page-client mengirim nilai bahasa Inggris berdasarkan indeks
 * (enData.vendorCategories[idx], enData.openPositions[idx].title), jadi urutan
 * di sini harus tetap sama untuk semua bahasa — dan memang otomatis begitu.
 */
export interface WorkingWithUsContent {
  /** Dikunci per key kategori vendor */
  vendorCategories: Record<string, string>;
  /** Dikunci per key posisi */
  openPositions: Record<
    string,
    { title: string; type: string; level: string; desc: string }
  >;
  /** Dikunci per nomor ("01".."04") */
  vendorValues: Record<string, { title: string; desc: string }>;
}

export const vendorCategoryKeys: string[] = [
  "photography",
  "videography",
  "floral-decor",
  "catering-fb",
  "live-music-entertainment",
  "hair-makeup",
  "lighting-av",
  "transportation",
  "stationery-printing",
  "venue",
  "other"
];

export const openPositionKeys: string[] = [
  "wedding-planner-coordinator",
  "creative-design-consultant",
  "client-relations-executive",
  "social-media-content-creator"
];

export const vendorValueNumbers: string[] = ["01","02","03","04"];
