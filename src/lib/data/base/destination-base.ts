import type { Destination } from "@/types";

/**
 * Language-neutral destination fields. Shared by every locale — edit once here.
 * Copy lives in translate/<locale>/destination-text.<locale>.ts, keyed by slug.
 *
 * `location` tetap string bahasa Inggris: filter di halaman destinations bekerja
 * pada nilai Inggris, sedangkan tampilannya diterjemahkan lewat `locationNames`
 * di file teks tiap bahasa.
 */
export type DestinationBase = Pick<
  Destination,
  "id" | "slug" | "category_id" | "location" | "image" | "guest_capacity"
>;

/** Teks satu destination (semua field opsional: yang kosong jatuh ke en). */
export type DestinationText = Partial<
  Pick<
    Destination,
    | "name"
    | "type"
    | "description"
    | "long_description"
    | "atmosphere"
    | "accessibility_notes"
    | "seasonal_considerations"
    | "highlights"
    | "best_for"
    | "ceremony_options"
    | "reception_options"
    | "accommodation_nearby"
    | "dining_experiences"
    | "unique_features"
  >
>;

/** Kontrak yang diekspor tiap file teks bahasa. */
export interface DestinationContent {
  /** category id -> nama tampilan */
  categoryNames: Record<string, string>;
  /** lokasi (Inggris) -> nama tampilan; tidak ada entri = tampil Inggris */
  locationNames: Record<string, string>;
  /** slug -> teks */
  destinationText: Record<string, DestinationText>;
}

export const destinationCategoryIds: string[] = ["cat-bali","cat-themes","cat-islands","cat-outsite-bali"];

export const destinationBase: DestinationBase[] = [
  {
    id: "1",
    slug: "uluwatu-wedding",
    category_id: "cat-bali",
    location: "South Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773495615/uluwatu-cover_rcjccs.jpg",
    guest_capacity: "50 - 500+",
  },
  {
    id: "2",
    slug: "ubud-wedding",
    category_id: "cat-bali",
    location: "Ubud & Gianyar",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775311396/Ubud_final1_-_crop_atau_edit_dikit_biar_beda_dari_aslinya_ya_qolh2y.png",
    guest_capacity: "20 - 200",
  },
  {
    id: "3",
    slug: "canggu-wedding",
    category_id: "cat-bali",
    location: "South Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773709788/canggu_zloeql.jpg",
    guest_capacity: "30 - 300",
  },
  {
    id: "4",
    slug: "seminyak-wedding",
    category_id: "cat-bali",
    location: "South Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773709789/seminyak_bihos7.jpg",
    guest_capacity: "50 - 400",
  },
  {
    id: "5",
    slug: "sanur-wedding",
    category_id: "cat-bali",
    location: "South Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775311085/Sanur_Beach_i0zlll.png",
    guest_capacity: "20 - 250",
  },
  {
    id: "6",
    slug: "nusa-dua-wedding",
    category_id: "cat-bali",
    location: "South Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773709793/nusa-dua_n5nqlj.png",
    guest_capacity: "100 - 1000+",
  },
  {
    id: "7",
    slug: "tabanan-wedding",
    category_id: "cat-bali",
    location: "West Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773709788/tabanan_poexyo.jpg",
    guest_capacity: "20 - 200",
  },
  {
    id: "8",
    slug: "nusa-penida-wedding",
    category_id: "cat-islands",
    location: "Nusa Islands",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775309453/Nusa_Penida_final_h8b3bp.png",
    guest_capacity: "5 - 80",
  },
  {
    id: "8b",
    slug: "nusa-lembongan-wedding",
    category_id: "cat-islands",
    location: "Nusa Islands",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775309427/Nusa_Lembongan_Final_vc5hxp.png",
    guest_capacity: "10 - 100",
  },
  {
    id: "8c",
    slug: "nusa-ceningan-wedding",
    category_id: "cat-islands",
    location: "Nusa Islands",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775309438/Nusa_Ceningan_Wedding_xhxycj.png",
    guest_capacity: "5 - 60",
  },
  {
    id: "9",
    slug: "lombok-wedding",
    category_id: "cat-outsite-bali",
    location: "Lombok",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775309336/Lombok_uo3d50.png",
    guest_capacity: "10 - 150",
  },
  {
    id: "9b",
    slug: "sumba-wedding",
    category_id: "cat-outsite-bali",
    location: "Sumba",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775309390/Sumba_wedding_erkew6.png",
    guest_capacity: "10 - 100",
  },
  {
    id: "9c",
    slug: "banyuwangi-wedding",
    category_id: "cat-outsite-bali",
    location: "Java",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775309279/Banyuwangi_wdrvji.png",
    guest_capacity: "10 - 120",
  },
  {
    id: "9d",
    slug: "magelang-wedding",
    category_id: "cat-outsite-bali",
    location: "Java",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775433444/Magelang_q1pjqj.png",
    guest_capacity: "20 - 200",
  },
  {
    id: "10",
    slug: "kuta-wedding",
    category_id: "cat-bali",
    location: "South Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775311046/Kuta_beach_wedding_frmx6j.png",
    guest_capacity: "30 - 400",
  },
  {
    id: "11",
    slug: "legian-wedding",
    category_id: "cat-bali",
    location: "South Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775455577/Legian_mjifbs.png",
    guest_capacity: "30 - 350",
  },
  {
    id: "12",
    slug: "jimbaran-wedding",
    category_id: "cat-bali",
    location: "South Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775313394/Jimbaran_Four_Seasons_Jimbaran_Image_bpl6qe.jpg",
    guest_capacity: "20 - 300",
  },
  {
    id: "13",
    slug: "ketewel-wedding",
    category_id: "cat-bali",
    location: "Ubud & Gianyar",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775310462/Pantai_Ketewel_kvtdjp.png",
    guest_capacity: "10 - 100",
  },
  {
    id: "14",
    slug: "saba-wedding",
    category_id: "cat-bali",
    location: "Ubud & Gianyar",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775360613/Saba_Jeeva_Saba_Resort_zx50m3.png",
    guest_capacity: "20 - 200",
  },
  {
    id: "15",
    slug: "tegallalang-wedding",
    category_id: "cat-bali",
    location: "Ubud & Gianyar",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775309750/Ricefield_wedding_goma3z.jpg",
    guest_capacity: "15 - 120",
  },
  {
    id: "16",
    slug: "sidemen-wedding",
    category_id: "cat-bali",
    location: "East Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773382245/header-destination_vcrwin.jpg",
    guest_capacity: "10 - 80",
  },
  {
    id: "17",
    slug: "amed-wedding",
    category_id: "cat-bali",
    location: "East Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775310741/Amed_x6fd3m.png",
    guest_capacity: "5 - 60",
  },
  {
    id: "18",
    slug: "manggis-wedding",
    category_id: "cat-bali",
    location: "East Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775310715/Manggis_smosgw.png",
    guest_capacity: "10 - 100",
  },
  {
    id: "19",
    slug: "candidasa-wedding",
    category_id: "cat-bali",
    location: "East Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775310702/Candidasa_gpublk.png",
    guest_capacity: "10 - 100",
  },
  {
    id: "20",
    slug: "taman-ujung-wedding",
    category_id: "cat-bali",
    location: "East Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775310726/Taman_Ujung_qugneh.png",
    guest_capacity: "20 - 150",
  },
  {
    id: "21",
    slug: "tulamben-wedding",
    category_id: "cat-bali",
    location: "East Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775310732/Tulamben_c0x7dy.png",
    guest_capacity: "10 - 80",
  },
  {
    id: "22",
    slug: "tirta-gangga-wedding",
    category_id: "cat-bali",
    location: "East Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775310736/Tirta_Gangga_zqgi1k.png",
    guest_capacity: "10 - 80",
  },
  {
    id: "23",
    slug: "savana-tianyar-wedding",
    category_id: "cat-bali",
    location: "East Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775310728/Savana_Tianyar_kbc804.png",
    guest_capacity: "10 - 100",
  },
  {
    id: "24",
    slug: "lovina-wedding",
    category_id: "cat-bali",
    location: "North Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775310970/Lovina_1_m76vmj.png",
    guest_capacity: "10 - 100",
  },
  {
    id: "25",
    slug: "munduk-wedding",
    category_id: "cat-bali",
    location: "North Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775433888/Munduk_wusb1v.png",
    guest_capacity: "10 - 80",
  },
  {
    id: "26",
    slug: "pemuteran-wedding",
    category_id: "cat-bali",
    location: "North Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775313508/Pemuteran_exl1bs.png",
    guest_capacity: "10 - 80",
  },
  {
    id: "27",
    slug: "menjangan-wedding",
    category_id: "cat-bali",
    location: "West Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775434370/Menjangan_final_gkgtup.png",
    guest_capacity: "10 - 60",
  },
  {
    id: "28",
    slug: "pupuan-wedding",
    category_id: "cat-bali",
    location: "West Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775434109/Pupuan_cyfep8.png",
    guest_capacity: "10 - 60",
  },
  {
    id: "29",
    slug: "jatiluwih-wedding",
    category_id: "cat-bali",
    location: "West Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775455696/Jatiluwih_area_1_barat_k8b4wm.png",
    guest_capacity: "20 - 120",
  },
  {
    id: "30",
    slug: "secluded-waterfalls-wedding",
    category_id: "cat-bali",
    location: "West Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775434113/Pupuan_secluded_waterfall2_anoeww.png",
    guest_capacity: "10 - 50",
  },
  {
    id: "31",
    slug: "kintamani-wedding",
    category_id: "cat-bali",
    location: "Highlands, Lakes and Mountains",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773709786/kintamani_jdqg0a.jpg",
    guest_capacity: "20 - 200",
  },
  {
    id: "32",
    slug: "bedugul-wedding",
    category_id: "cat-bali",
    location: "Highlands, Lakes and Mountains",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775310185/Bedugul_Elopement_Venue_Final_hezj0f.png",
    guest_capacity: "20 - 150",
  },
  {
    id: "33",
    slug: "lake-beratan-wedding",
    category_id: "cat-bali",
    location: "Highlands, Lakes and Mountains",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775311306/Lake_Beratan_mv4twx.png",
    guest_capacity: "20 - 150",
  },
  {
    id: "34",
    slug: "lake-buyan-wedding",
    category_id: "cat-bali",
    location: "Highlands, Lakes and Mountains",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775311292/Lake_Buyan_bt7cbw.png",
    guest_capacity: "10 - 80",
  },
  {
    id: "35",
    slug: "lake-tamblingan-wedding",
    category_id: "cat-bali",
    location: "Highlands, Lakes and Mountains",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775311301/Lake_Tamblingan_im1kso.png",
    guest_capacity: "10 - 60",
  },
  {
    id: "36",
    slug: "bali-botanical-garden-wedding",
    category_id: "cat-bali",
    location: "Highlands, Lakes and Mountains",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775433667/Bedugul_Botanical_Garden_z7wq6r.png",
    guest_capacity: "20 - 200",
  },
  {
    id: "37",
    slug: "mount-batur-volcanic-landscapes-wedding",
    category_id: "cat-bali",
    location: "Highlands, Lakes and Mountains",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775311302/Volcano_mount_batur_mk3yom.png",
    guest_capacity: "10 - 80",
  },
  {
    id: "t1",
    slug: "lake-weddings",
    category_id: "cat-themes",
    location: "Highlands, Lakes and Mountains",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775434577/lake-wedding_xqsyuv.png",
    guest_capacity: "10 - 150",
  },
  {
    id: "t2",
    slug: "waterfall-weddings",
    category_id: "cat-themes",
    location: "Ubud & Gianyar, North Bali, West Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775309703/Pupuan_wedding_qvxx0o.png",
    guest_capacity: "5 - 60",
  },
  {
    id: "t3",
    slug: "private-villa-weddings",
    category_id: "cat-themes",
    location: "South Bali, Ubud & Gianyar, East Bali, North Bali, West Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775309730/Private_Villa_Weddings_ckh0kd.png",
    guest_capacity: "10 - 300",
  },
  {
    id: "t4",
    slug: "mountain-weddings",
    category_id: "cat-themes",
    location: "Highlands, Lakes and Mountains",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775314171/Kintamani_romzer.png",
    guest_capacity: "15 - 200",
  },
  {
    id: "t5",
    slug: "jungle-forest-weddings",
    category_id: "cat-themes",
    location: "Ubud & Gianyar, East Bali, North Bali, West Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775311974/Pupuan_Jungle_Wedding_not_the_rice_field_image_ufaadl.png",
    guest_capacity: "10 - 150",
  },
  {
    id: "t6",
    slug: "beachfront-oceanfront-weddings",
    category_id: "cat-themes",
    location: "South Bali, East Bali, North Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775309697/Beachfront_or_oceanfront_wedding_cpcdau.png",
    guest_capacity: "20 - 500",
  },
  {
    id: "t7",
    slug: "royal-balinese-weddings",
    category_id: "cat-themes",
    location: "Ubud & Gianyar, East Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775309659/Royal_Balinese_Wedding_g6qmts.png",
    guest_capacity: "20 - 250",
  },
  {
    id: "t8",
    slug: "rice-paddy-field-weddings",
    category_id: "cat-themes",
    location: "Ubud & Gianyar, East Bali, West Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775433769/Pupuan_rice_paddy_field_ogv5b9.png",
    guest_capacity: "15 - 200",
  },
  {
    id: "t9",
    slug: "riverside-weddings",
    category_id: "cat-themes",
    location: "Ubud & Gianyar, East Bali, North Bali, West Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775309711/Riverside_Wedding_Setting_iyvxh5.png",
    guest_capacity: "10 - 100",
  },
  {
    id: "t10",
    slug: "garden-weddings",
    category_id: "cat-themes",
    location: "South Bali, Ubud & Gianyar, Highlands, Lakes and Mountains",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775313016/Garden_Weddings_b0lzyq.png",
    guest_capacity: "20 - 400",
  },
  {
    id: "t11",
    slug: "chapel-weddings",
    category_id: "cat-themes",
    location: "Ubud, South Bali",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775361533/chapel-wedding_ejqsqz.png",
    guest_capacity: "10 - 150",
  },
];
