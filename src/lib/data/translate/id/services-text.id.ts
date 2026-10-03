import type { ServicesContent } from "@/lib/data/base/services-base";

// Teks services (id). Dikunci per service id / nomor; field lain ada di base/.
export const content: ServicesContent = {
  services: {
    "full-wedding-planning": {
      name: "Perencanaan & Koordinasi Pernikahan Penuh",
      tag: "End-to-End",
      intro: "Layanan perencanaan pernikahan menyeluruh untuk pernikahan destinasi, vila pribadi, dan perayaan istimewa di Bali. Kami mengelola perjalanan pernikahan Anda dari konsep hingga selesai dengan presisi yang tenang dan standar hospitality bintang lima.",
      includes: {
        title: "Yang Termasuk dalam Layanan Ini",
        items: [
          "Konsep pernikahan & arahan kreatif",
          "Pencarian & studi kelayakan venue",
          "Manajemen vendor & penganggaran",
          "Styling, linimasa & perencanaan alur",
          "Koordinasi penuh di hari-H",
        ],
      },
      bestFor: {
        title: "Paling Cocok Untuk",
        desc: "Pernikahan destinasi, pernikahan mewah, pernikahan vila pribadi, dan pasangan yang menginginkan pengalaman yang dikelola sepenuhnya.",
      },
    },
    "wedding-styling": {
      name: "Styling Pernikahan & Arahan Kreatif",
      tag: "Design-Led",
      intro: "Styling pernikahan berbasis desain di Bali yang berfokus pada suasana, keindahan ruang, dan storytelling emosional.",
      includes: {
        title: "Pendekatan Styling Kami",
        items: [
          "Moodboard & storytelling visual",
          "Arahan palet warna & material",
          "Styling upacara & resepsi",
          "Panduan estetika floral & meja",
        ],
      },
      bestFor: {
        title: "Paling Cocok Untuk",
        desc: "Pasangan yang sudah memiliki dukungan perencanaan namun menginginkan desain mewah yang kuat dan kohesif.",
      },
    },
    "private-villa-weddings": {
      name: "Spesialis Pernikahan Vila Pribadi di Bali",
      tag: "Villa & Estate",
      intro: "Kami mengkhususkan diri dalam mengubah vila dan estate pribadi menjadi venue pernikahan yang tertata indah di seluruh Bali.",
      includes: {
        title: "Layanan Pernikahan Vila",
        items: [
          "Studi lokasi & perencanaan layout",
          "Pemetaan alur tamu & produksi",
          "Styling & penciptaan suasana",
          "Koordinasi penuh untuk properti pribadi",
        ],
      },
      bestFor: {
        title: "Paling Cocok Untuk",
        desc: "Estate pribadi, vila butik, venue tersembunyi, dan pernikahan non-hotel.",
      },
    },
    "intimate-elopements": {
      name: "Pernikahan Intim & Elopement di Bali",
      tag: "Intimate",
      intro: "Pernikahan yang tenang dan bermakna, dirancang di sekitar koneksi, alam, dan kesederhanaan yang disengaja.",
      includes: {
        title: "Layanan Intim & Elopement",
        items: [
          "Panduan lokasi & konsep",
          "Dekorasi minimalis atau elegan",
          "Alur upacara yang simbolis",
          "Koordinasi vendor tepercaya",
        ],
      },
      bestFor: {
        title: "Paling Cocok Untuk",
        desc: "Elopement, pernikahan mikro, pembaruan janji nikah, dan upacara destinasi yang penuh makna.",
      },
    },
    "concept-consultation": {
      name: "Konsultasi Konsep & Desain Pernikahan",
      tag: "Consultation",
      intro: "Layanan terfokus untuk pasangan yang menginginkan panduan profesional sebelum berkomitmen pada perencanaan penuh.",
      includes: {
        title: "Cakupan Konsultasi",
        items: [
          "Penyempurnaan visi & tema",
          "Arahan desain",
          "Wawasan anggaran & kelayakan",
          "Peta jalan kreatif",
        ],
      },
      bestFor: {
        title: "Paling Cocok Untuk",
        desc: "Perencanaan tahap awal, kejelasan kreatif, dan validasi desain.",
      },
    },
    "event-table-styling": {
      name: "Styling Acara & Meja di Bali",
      tag: "Styling",
      intro: "Ruang upacara yang terkurasi dan tablescape elegan yang meningkatkan pengalaman tamu.",
      includes: {
        title: "Cakupan Styling",
        items: [
          "Styling upacara & resepsi",
          "Konsep tablescape & santap",
          "Harmoni ruang & kurasi detail",
          "Pengawasan styling di lokasi",
        ],
      },
      bestFor: {
        title: "Paling Cocok Untuk",
        desc: "Pasangan yang menginginkan perayaan yang tertata indah tanpa koordinasi perencanaan penuh.",
      },
    },
    "guest-management": {
      name: "Manajemen Tamu Destinasi",
      tag: "Add-On",
      intro: "Dukungan pernikahan destinasi yang memastikan pengalaman mulus bagi Anda dan tamu di Bali.",
      includes: {
        title: "Layanan Tamu Dapat Mencakup",
        items: [
          "Komunikasi tamu & paket informasi",
          "Koordinasi transfer & akomodasi",
          "Perencanaan itinerary pernikahan",
          "Bantuan tamu di lokasi",
        ],
      },
      bestFor: {
        title: "Paling Cocok Untuk",
        desc: "Pasangan internasional yang membawa tamu dari luar negeri dan membutuhkan pengalaman Bali yang didukung penuh.",
      },
    },
  },
  whyChooseReasons: {
    "01": {
      title: "Hampir Dua Dekade dalam Hospitality Mewah",
      desc: "Fondasi kami berasal dari hampir dua puluh tahun pengalaman di lingkungan hospitality bintang lima. Pengalaman ini membentuk cara kami merencanakan, mendesain, dan mengeksekusi pernikahan — bukan hanya indah, tetapi juga mulus. Alur, waktu, kenyamanan tamu, dan ritme emosional menjadi inti dari setiap perayaan yang kami kurasi.",
    },
    "02": {
      title: "Studio Pernikahan Berbasis di Bali",
      desc: "Berbasis di Bali, kami membawa pemahaman lokal yang mendalam, jaringan profesional tepercaya, dan pengetahuan lapangan di setiap pernikahan. Ini memungkinkan kami mengkurasi lokasi, vendor, dan tim produksi dengan presisi.",
    },
    "03": {
      title: "Metodologi Berbasis Desain",
      desc: "Setiap pernikahan dimulai dari konsep. Alih-alih menggunakan template, kami mengembangkan setiap perayaan melalui suasana, material, proporsi, dan kepekaan ruang. Peran kami melampaui perencanaan hingga ke arahan kreatif.",
    },
    "04": {
      title: "Spesialis Pernikahan Intim & Vila Pribadi",
      desc: "Kami dikenal karena merancang pernikahan intim dan mengubah vila pribadi menjadi lingkungan pernikahan yang tertata indah — dari elopement tersembunyi hingga perayaan vila multi-hari.",
    },
    "05": {
      title: "Tenang, Terstruktur, Tanpa Template",
      desc: "Studio kami menangani jumlah pernikahan yang terbatas setiap tahunnya untuk memastikan kejelasan, kehadiran penuh, dan detail. Setiap proyek mengikuti proses yang matang, memungkinkan pasangan menjalani perjalanan pernikahan mereka dengan tenang dan penuh kepercayaan.",
    },
  },
  serviceDestinations: [
    "Pengalaman pernikahan destinasi di seluruh Bali dan Indonesia",
    "Pernikahan vila pribadi di Bali",
    "Pernikahan intim dan elopement di Bali",
    "Pernikahan mewah di Bali",
  ],
};
