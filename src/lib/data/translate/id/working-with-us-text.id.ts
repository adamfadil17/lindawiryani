import type { WorkingWithUsContent } from "@/lib/data/base/working-with-us-base";

// Teks working-with-us (id). Dikunci per key; urutan ada di base/.
export const content: WorkingWithUsContent = {
  vendorCategories: {
    photography: "Fotografi",
    videography: "Videografi",
    "floral-decor": "Floral & Dekorasi",
    "catering-fb": "Katering & F&B",
    "live-music-entertainment": "Musik Live & Hiburan",
    "hair-makeup": "Rias & Tata Rambut",
    "lighting-av": "Pencahayaan & AV",
    transportation: "Transportasi",
    "stationery-printing": "Alat Tulis & Percetakan",
    venue: "Venue",
    other: "Lainnya",
  },
  openPositions: {
    "wedding-planner-coordinator": {
      title: "Wedding Planner & Koordinator",
      type: "Penuh waktu",
      level: "Menengah–Senior",
      desc: "Memimpin perencanaan menyeluruh dan eksekusi di lokasi untuk pernikahan destinasi mewah di Bali.",
    },
    "creative-design-consultant": {
      title: "Konsultan Desain Kreatif",
      type: "Penuh waktu",
      level: "Senior",
      desc: "Mengonsep dan menghadirkan narasi estetika, moodboard, dan proposal desain yang dibuat khusus bagi pasangan.",
    },
    "client-relations-executive": {
      title: "Eksekutif Hubungan Klien",
      type: "Penuh waktu",
      level: "Menengah",
      desc: "Menjadi titik kontak pertama bagi pasangan internasional, mengelola pertanyaan, konsultasi, dan komunikasi berkelanjutan.",
    },
    "social-media-content-creator": {
      title: "Kreator Media Sosial & Konten",
      type: "Paruh waktu / Freelance",
      level: "Semua level",
      desc: "Menangkap dan meramu konten menarik dari acara kami untuk Instagram, Pinterest, dan platform lainnya.",
    },
  },
  vendorValues: {
    "01": {
      title: "Keselarasan Estetika",
      desc: "Kami hanya bermitra dengan vendor yang karyanya mencerminkan standar keindahan dan intensionalitas kami.",
    },
    "02": {
      title: "Keandalan & Keahlian",
      desc: "Konsistensi kualitas dan profesionalisme di setiap acara yang kami produksi bersama.",
    },
    "03": {
      title: "Semangat Kolaboratif",
      desc: "Kami percaya pernikahan yang hebat diciptakan bersama — bukan sekadar dikoordinasikan.",
    },
    "04": {
      title: "Kepekaan Budaya",
      desc: "Penghormatan mendalam terhadap tradisi dan makna yang terkandung dalam setiap upacara.",
    },
  },
};
