import type { WeddingConceptsContent } from "@/lib/data/base/wedding-concepts-base";

// Teks wedding-concepts (id). Dikunci per nomor layer; field lain ada di base/.
export const content: WeddingConceptsContent = {
  venueCurationConsiderations: [
    "Identitas arsitektural dan lokasi",
    "Suasana dan rasa tempat",
    "Alur upacara dan resepsi",
    "Kenyamanan tamu dan logistik",
    "Fleksibilitas dan batasan desain",
    "Keselarasan antara venue dan visi",
  ],
  stylingFocusAreas: [
    "Keseimbangan ruang",
    "Palet material alami",
    "Tekstur berlapis",
    "Floral dan instalasi yang penuh perhatian",
    "Penggunaan warna dan ruang kosong secara intensional",
    "Kohesi antara area upacara dan perayaan",
  ],
  editorialSources: [
    "Arsitektur dan lanskap",
    "Fashion dan pengrajinan",
    "Seni, budaya, dan perjalanan",
    "Cahaya, gerakan, dan emosi",
  ],
  conceptLayers: {
    "01": {
      title: "Kurasi Venue",
      subtitle: "Fondasi",
      desc: "Kurasi venue adalah fondasi dari setiap pernikahan yang kami rancang. Alih-alih menyajikan direktori yang lengkap, kami memberikan gambaran terkurasi berdasarkan area — untuk membantu pasangan memahami karakter lokasi, gaya venue, dan indikasi anggaran awal.",
      tag: "Kurasi Venue",
      supports: [
        "Pernikahan Destinasi di Bali",
        "Pernikahan Vila Pribadi",
        "Pernikahan Intim & Elopement",
      ],
    },
    "02": {
      title: "Tema Pernikahan",
      subtitle: "Arahan Emosional",
      desc: "Tema pernikahan membantu pasangan memperjelas perasaan dari perayaan mereka, bukan mendikte dekorasi. Tema kami bukan tren. Ia adalah kerangka emosional — memandu bagaimana ruang, ritme, dan suasana menyatu.",
      tag: "Tema",
      supports: [
        "Skala dan Keintiman",
        "Gaya Upacara",
        "Pengalaman Tamu",
      ],
    },
    "03": {
      title: "Konsep Styling",
      subtitle: "Visi yang Terwujud",
      desc: "Konsep styling menerjemahkan visi menjadi bentuk fisik. Di sinilah suasana menjadi terlihat — melalui komposisi, material, tekstur, dan kesederhanaan. Styling tidak pernah soal berlebihan. Ia soal kejelasan dan harmoni.",
      tag: "Styling",
      supports: [
        "Pernikahan Mewah di Bali",
        "Pernikahan Vila Pribadi",
        "Perayaan Intim",
      ],
    },
    "04": {
      title: "Inspirasi Editorial",
      subtitle: "Awal dari Storytelling",
      desc: "Inspirasi editorial adalah tempat storytelling dimulai. Alih-alih meniru tren, kami mengambil inspirasi dari arsitektur, fashion, seni, budaya, dan perjalanan — menjembatani imajinasi dan kenyataan untuk memandu arahan kreatif maupun eksekusi.",
      tag: "Editorial",
      supports: [
        "Kisah Portofolio",
        "Artikel Jurnal",
        "Konsep Styling",
      ],
    },
  },
  planningJourney: [
    "Memperjelas konsep Anda",
    "Menemukan lingkungan yang tepat",
    "Membentuk narasi desain Anda",
    "Mengkurasi pengalaman tamu",
    "Mengeksekusi dengan presisi yang tenang",
  ],
};
