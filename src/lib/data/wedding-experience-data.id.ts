// Terjemahan id — bentuk data harus sama persis dengan wedding-experience-data.en.ts
// ─── EXPERIENCE LIST ──────────────────────────────────────────────────────────

import { WeddingExperience } from "@/types";

export const weddingExperienceList: WeddingExperience[] = [
  // ─── Private Villa Weddings ──────────────────────────────────────────────

  {
    id: "1",
    slug: "private-villa-weddings",
    category: "private_villa_weddings",
    name: "Pernikahan Vila Pribadi",

    // Hero
    hero_style: "split",
    hero_image: "/images/venues/banner/private-bg.png",
    hero_desc:
      "Privasi, kebebasan desain, dan suasana yang terasa personal, bukan komersial — tempat pernikahan Anda menjadi pengalaman yang hanya bisa menjadi milik Anda.",

    // Intro
    intro_label: "Mengapa Vila",
    intro_heading: ["Mengapa Memilih", "Pernikahan Vila Pribadi di Bali"],
    intro_body:
      "Di Linda Wiryani Design and Event Planning, kami mengkhususkan diri pada pernikahan vila pribadi di Bali, merancang perayaan yang terasa intim, arsitektural, dan membenamkan secara emosional. Baik menghadap lautan, terselip di tengah hutan, maupun tersembunyi di dalam properti yang tenang, vila pribadi memungkinkan pernikahan berlangsung sebagai pengalaman berlapis — bukan sekadar upacara satu jam.",
    intro_list_label: "Vila pribadi menawarkan:",
    intro_list: [
      "Kebebasan kreatif penuh",
      "Tata letak upacara dan resepsi yang fleksibel",
      "Potensi perayaan selama beberapa hari",
      "Privasi tamu yang menyeluruh",
      "Suasana emosional seperti di rumah sendiri",
    ],
    intro_footnote:
      "Inilah yang membuat pernikahan di vila ideal bagi pasangan yang ingin pernikahannya terasa seperti pertemuan pribadi, bukan pertunjukan yang dipentaskan.",
    intro_images: ["", ""],

    // Approach
    approach_label: "Pendekatan Kami",
    approach_heading: [
      "Perencanaan Pernikahan Vila",
      "yang Mengutamakan Desain",
    ],
    approach_body:
      "Merancang pernikahan di vila membutuhkan lebih dari sekadar dekorasi. Dibutuhkan pemahaman terhadap arsitektur dan ruang sebagai satu kesatuan. Kami mempelajari setiap vila sebagai kanvas kosong dan membangun konsep desain yang menyatu secara alami dengan lingkungan sekitarnya.",
    approach_list_label: "Dibutuhkan pemahaman tentang:",
    approach_list: [
      "Arsitektur dan alur ruang",
      "Cahaya alami dan transisinya",
      "Pergerakan dan kenyamanan tamu",
      "Perencanaan akustik dan teknis",
      "Ritme emosional sepanjang hari",
    ],
    approach_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767280276/Wedding_15_ofe4kx.jpg",

    // Services
    services_label: "Yang Kami Tawarkan",
    services_heading: ["Layanan Pernikahan", "Vila Pribadi Kami"],
    services_list: [
      "Rekomendasi vila yang dikurasi",
      "Analisis lokasi dan desain tata letak",
      "Pengembangan konsep pernikahan secara menyeluruh",
      "Kurasi dan koordinasi vendor",
      "Perencanaan produksi dan logistik",
      "Desain styling, floral, dan ruang",
      "Pelaksanaan dan pengelolaan hari pernikahan",
    ],
    services_footnote:
      "Setiap elemen dirancang agar terasa menyatu, bukan penuh sesak.",
    services_dark_label: "Hari yang Berlangsung",
    services_dark_heading: ["Dari Upacara", "hingga Perayaan"],
    services_dark_body:
      "Pernikahan di vila pribadi sering kali memungkinkan perayaan dengan banyak momen yang utuh. Kami merancang seluruh ritme emosional agar pernikahan Anda mengalir secara alami.",
    services_dark_list: [
      "Pertemuan penyambutan",
      "Koktail di tepi kolam renang",
      "Upacara saat matahari terbenam",
      "Makan malam di meja panjang",
      "Pengalaman after-party",
    ],

    // Closing
    closing_label: "Untuk Anda",
    closing_heading: ["Pernikahan Vila Pribadi", "yang Terasa Seperti Rumah"],
    closing_body:
      "Pernikahan vila Anda seharusnya terasa hangat, penuh niat, dan sangat personal. Setiap pernikahan vila dirancang khusus, tidak pernah berupa paket. Jika Anda sedang merencanakan pernikahan vila pribadi di Bali dan menginginkan tim yang mengutamakan desain serta memahami ruang, emosi, dan eksekusi — kami akan merasa sangat terhormat mendampingi perjalanan Anda.",
    closing_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767280288/Wedding_5_rt7stj.jpg",
    closing_couple_label: "Dirancang untuk pasangan yang mencari:",
    closing_couple_values: [
      "Keterpencilan dan keintiman",
      "Estetika yang halus",
      "Keindahan arsitektural",
      "Pendampingan perencanaan yang tenang",
      "Pengalaman tamu yang istimewa",
    ],

    // Relations
    faqs: [
      {
        id: "faq-pvw-1",
        experience_id: "1",
        question: "Mengapa memilih pernikahan vila pribadi di Bali?",
        answer:
          "Pernikahan vila pribadi menawarkan privasi, kebebasan kreatif, tata letak yang fleksibel, dan suasana yang lebih personal. Pasangan dapat merancang pengalaman dengan banyak momen, seperti makan malam penyambutan, pertemuan di tepi kolam renang, upacara saat matahari terbenam, dan resepsi yang intim.",
        sort_order: 0,
      },
      {
        id: "faq-pvw-2",
        experience_id: "1",
        question: "Apakah vila pribadi cocok untuk pernikahan mewah?",
        answer:
          "Ya. Banyak vila pribadi di Bali dirancang dengan standar keramahtamahan mewah dan ideal untuk pernikahan kelas atas. Dengan desain, produksi, dan perencanaan yang tepat, vila pribadi dapat menjadi tuan rumah perayaan pernikahan yang halus dan istimewa.",
        sort_order: 1,
      },
      {
        id: "faq-pvw-3",
        experience_id: "1",
        question:
          "Berapa banyak tamu yang dapat hadir di pernikahan vila di Bali?",
        answer:
          "Kapasitas tamu bergantung pada vilanya. Beberapa vila ideal untuk pernikahan intim dengan 10–30 tamu, sedangkan properti yang lebih besar dapat menampung perayaan dengan 50–150 tamu. Kami menilai setiap properti dari sisi kenyamanan, alur, dan kelayakan produksi.",
        sort_order: 2,
      },
      {
        id: "faq-pvw-4",
        experience_id: "1",
        question: "Apakah pernikahan vila memerlukan izin khusus?",
        answer:
          "Sebagian pernikahan vila memerlukan izin setempat, persetujuan banjar, atau izin acara, tergantung lokasi dan skalanya. Sebagai wedding planner Anda, kami memandu Anda melalui seluruh persyaratan regulasi dan logistik.",
        sort_order: 3,
      },
      {
        id: "faq-pvw-5",
        experience_id: "1",
        question:
          "Apakah Anda menyediakan perencanaan dan desain lengkap untuk pernikahan vila?",
        answer:
          "Ya. Layanan pernikahan vila pribadi kami mencakup pencarian venue, desain kreatif menyeluruh, pengelolaan vendor, perencanaan produksi, dan koordinasi lengkap pada hari-H.",
        sort_order: 4,
      },
    ],
  },

  // ─── Intimate Weddings ───────────────────────────────────────────────────

  {
    id: "2",
    slug: "intimate-weddings",
    category: "intimate_weddings",
    name: "Pernikahan Intim",

    // Hero
    hero_style: "bottom",
    hero_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878596/BAL_1453_e7hd8w.jpg",
    hero_desc:
      "Pernikahan intim memberi ruang bagi kedekatan, kehadiran, dan keindahan tanpa berlebihan. Dirancang untuk pasangan yang mengutamakan kualitas di atas kuantitas — dan suasana di atas kemegahan.",

    // Intro
    intro_label: "Mengapa Intim",
    intro_heading: ["Mengapa Memilih", "Pernikahan Intim di Bali"],
    intro_body:
      "Di Linda Wiryani Design and Event Planning, kami mengkhususkan diri pada pernikahan intim di Bali, menciptakan perayaan yang terasa hangat, penuh niat, dan sangat personal. Pernikahan ini dirancang untuk pasangan yang mengutamakan kualitas di atas kuantitas dan suasana di atas kemegahan.",
    intro_list_label: null,
    intro_list: [
      "Kedekatan yang lebih dalam dengan tamu",
      "Fleksibilitas desain yang lebih besar",
      "Upacara yang lebih bermakna",
      "Kualitas pengalaman tamu yang lebih tinggi",
      "Alur yang alami dan santai",
    ],
    intro_footnote:
      "Beragamnya lingkungan di Bali membuat pernikahan intim terasa sinematik namun tetap membumi.",
    intro_images: ["", ""],

    // Approach
    approach_label: "Cara Kami Merancang",
    approach_heading: ["Filosofi Pernikahan", "Intim Kami"],
    approach_body:
      "Kami merancang pernikahan intim di sekitar ritme emosional dan harmoni ruang. Setiap detail dipilih untuk mendukung keseluruhan rasa — bukan menenggelamkannya.",
    approach_list_label: "Kami merancang berdasarkan:",
    approach_list: [
      "Ritme emosional",
      "Harmoni ruang",
      "Pengalaman tamu yang penuh perhatian",
      "Bahasa estetika yang halus",
      "Eksekusi yang tenang",
    ],
    approach_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878580/BAL_1451_dhfxcj.jpg",

    // Services
    services_label: "Yang Kami Tawarkan",
    services_heading: ["Layanan Pernikahan", "Intim Kami"],
    services_list: [
      "Pencarian venue dan vila",
      "Pengembangan desain pernikahan",
      "Arahan styling dan floral",
      "Kurasi vendor",
      "Pengelolaan anggaran dan jadwal",
      "Koordinasi hari pernikahan",
    ],
    services_footnote:
      "Peran kami adalah merancang strukturnya agar Anda bisa melepaskan kendali dan tetap sepenuhnya hadir.",
    services_dark_label: "Pengalamannya",
    services_dark_heading: ["Dirancang untuk", "Kehadiran Sepenuhnya"],
    services_dark_body:
      "Pernikahan intim memungkinkan Anda benar-benar merasakan perayaan Anda. Dengan pertemuan yang lebih kecil, setiap momen menjadi hidup — upacara, makan malam, hingga koneksi hening di antara orang-orang terkasih.",
    services_dark_list: [
      "Suasana yang sangat personal",
      "Setiap tamu hadir dengan penuh makna",
      "Upacara yang tidak terburu-buru dan penuh emosi",
      "Pengalaman bersantap yang halus",
      "Ruang untuk koneksi yang tulus",
    ],

    // Closing
    closing_label: "Pernikahan Intim yang Terasa Seperti Anda",
    closing_heading: [
      "Kualitas di atas kuantitas.",
      "Suasana di atas kemegahan.",
    ],
    closing_body:
      "Jika Anda sedang merencanakan pernikahan intim di Bali dan menginginkan tim yang mengutamakan desain serta berlandaskan keramahtamahan, kami akan sangat terhormat mendampingi perjalanan Anda.",
    closing_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878569/BAL_1210_gktw4p.jpg",
    closing_couple_label: null,
    closing_couple_values: [],

    // Relations
    faqs: [
      {
        id: "faq-iw-1",
        experience_id: "2",
        question: "Apa yang dimaksud dengan pernikahan intim?",
        answer:
          "Pernikahan intim umumnya dihadiri 10–50 tamu, sehingga memungkinkan kedekatan yang lebih dalam, desain yang fleksibel, dan suasana yang lebih santai yang berfokus pada momen-momen bermakna.",
        sort_order: 0,
      },
      {
        id: "faq-iw-2",
        experience_id: "2",
        question: "Mengapa memilih pernikahan intim di Bali?",
        answer:
          "Lanskap, venue privat, dan keindahan alam Bali menjadikannya ideal untuk pernikahan intim. Jumlah tamu yang lebih sedikit memungkinkan pasangan merasakan sepenuhnya lokasi, upacara, dan perayaan.",
        sort_order: 1,
      },
      {
        id: "faq-iw-3",
        experience_id: "2",
        question: "Apakah pernikahan intim lebih murah?",
        answer:
          "Belum tentu. Pernikahan intim sering kali berfokus pada kualitas, bukan skala. Banyak pasangan berinvestasi pada venue kelas atas, desain yang halus, hidangan istimewa, dan pengalaman tamu.",
        sort_order: 2,
      },
      {
        id: "faq-iw-4",
        experience_id: "2",
        question:
          "Apakah Anda menyediakan perencanaan lengkap untuk pernikahan intim?",
        answer:
          "Ya. Kami menyediakan perencanaan kreatif dan logistik yang lengkap untuk pernikahan intim, termasuk pemilihan venue, pengembangan desain, koordinasi vendor, dan pengelolaan hari pernikahan.",
        sort_order: 3,
      },
      {
        id: "faq-iw-5",
        experience_id: "2",
        question: "Bisakah pernikahan intim tetap terasa mewah?",
        answer:
          "Bisa. Kemewahan bukan soal ukuran — melainkan tentang kepedulian, desain, dan eksekusi. Pernikahan intim sering kali memungkinkan tingkat detail dan personalisasi yang lebih tinggi.",
        sort_order: 4,
      },
    ],
  },

  // ─── Elopement Weddings ──────────────────────────────────────────────────

  {
    id: "3",
    slug: "elopement-weddings",
    category: "elopement_weddings",
    name: "Pernikahan Elopement",

    // Hero
    hero_style: "centered",
    hero_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939447/Lake_Elopement_hbxm9l.png",
    hero_desc:
      "Pernikahan Elopement di Bali — intim, kaya emosi, dan puitis secara visual — dirancang sebagai pengalaman bermakna, bukan upacara singkat.",

    // Intro
    intro_label: "Latar Tempatnya",
    intro_heading: ["Mengapa Pasangan", "Memilih Elopement di Bali"],
    intro_body:
      "Baik di pantai tersembunyi, lahan terbuka di tengah hutan, vila pribadi, maupun tebing yang dramatis, elopement kami diciptakan sebagai pengalaman bermakna, bukan upacara singkat. Elopement di sini sering terasa bukan seperti acara, melainkan momen sakral.",
    intro_list_label: "Bali menawarkan latar yang sempurna:",
    intro_list: [
      "Keindahan alam",
      "Suasana spiritual",
      "Privasi dan keterpencilan",
      "Lingkungan upacara yang sarat simbol",
      "Lanskap romantis yang sinematik",
    ],
    intro_footnote: null,
    intro_images: ["", ""],

    // Approach
    approach_label: "Filosofi Kami",
    approach_heading: ["Pengalaman Elopement", "yang Dipimpin Desain"],
    approach_body:
      "Setiap elemen dikurasi untuk mendukung kehadiran dan makna. Baik hanya berdua maupun bersama lingkaran kecil orang terkasih, kami menciptakan ruang agar momen Anda berlangsung secara alami.",
    approach_list_label: "Perencanaan elopement kami berfokus pada:",
    approach_list: [
      "Penceritaan yang emosional",
      "Perpaduan alami dengan lanskap",
      "Styling yang sederhana namun halus",
      "Alur yang tenang dan tidak terburu-buru",
      "Koneksi yang otentik",
    ],
    approach_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939447/Volcano_mount_batur_y3gtwu.png",

    // Services
    services_label: "Yang Kami Sediakan",
    services_heading: ["Layanan Elopement", "Bali Kami"],
    services_list: [
      "Pencarian lokasi dan perizinan",
      "Desain dan konsep upacara",
      "Arahan styling dan floral",
      "Koordinasi vendor",
      "Perencanaan jadwal dan logistik",
      "Koordinasi di lokasi",
    ],
    services_footnote: "Untuk Pasangan yang Mencari Kedalaman, Bukan Pameran.",
    services_dark_label: "Nilai-Nilai Kami",
    services_dark_heading: ["Emosi di atas", "Produksi"],
    services_dark_body:
      "Kami merancang elopement untuk pasangan yang menghargai kesederhanaan yang bermakna. Setiap detail dipertimbangkan, tidak ada yang berlebihan.",
    services_dark_list: [
      "Emosi di atas produksi",
      "Kesederhanaan yang bermakna",
      "Desain dengan kepekaan",
      "Kemewahan yang tenang",
      "Pengalaman upacara yang personal",
    ],

    // Closing
    closing_label: "Elopement yang Terasa Sakral",
    closing_heading: ["Abadi. Membumi.", "Jujur secara emosional."],
    closing_body:
      "Jika Anda mencari wedding planner elopement di Bali yang memandang elopement sebagai pengalaman artistik, kami akan sangat terhormat menciptakannya bersama Anda.",
    closing_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939441/Waterfall_Wedding_1_kk2634.png",
    closing_couple_label: null,
    closing_couple_values: [],

    // Relations
    faqs: [
      {
        id: "faq-ew-1",
        experience_id: "3",
        question: "Apa itu pernikahan elopement di Bali?",
        answer:
          "Pernikahan elopement di Bali adalah upacara intim yang berfokus pada pasangan, sering kali tanpa tamu atau hanya dengan lingkaran kecil orang terkasih. Ia mengutamakan emosi, kesederhanaan, dan pengalaman bermakna di atas produksi besar-besaran.",
        sort_order: 0,
      },
      {
        id: "faq-ew-2",
        experience_id: "3",
        question: "Di mana kami bisa melakukan elopement di Bali?",
        answer:
          "Lokasi elopement yang populer meliputi vila pribadi, pantai tersembunyi, lahan terbuka di hutan, air terjun, venue di tepi tebing, dan resor butik. Kami membantu mengkurasi lokasi berdasarkan privasi, suasana, dan kenyamanan.",
        sort_order: 1,
      },
      {
        id: "faq-ew-3",
        experience_id: "3",
        question: "Apakah pernikahan elopement diakui secara hukum di Bali?",
        answer:
          "Persyaratan hukum berbeda-beda tergantung kewarganegaraan dan kondisi pribadi. Kami memandu pasangan mengenai upacara simbolis, proses hukum, dan pilihan yang direkomendasikan.",
        sort_order: 2,
      },
      {
        id: "faq-ew-4",
        experience_id: "3",
        question: "Bisakah elopement tetap dirancang dengan indah?",
        answer:
          "Tentu saja. Elopement kami mengutamakan desain dan dikurasi dengan cermat, dengan fokus pada styling yang halus, alur upacara yang bermakna, serta harmoni visual dengan alam.",
        sort_order: 3,
      },
      {
        id: "faq-ew-5",
        experience_id: "3",
        question:
          "Apakah Anda merencanakan elopement hanya untuk pasangan berdua?",
        answer:
          "Ya. Kami merancang elopement baik untuk dua orang maupun untuk jumlah tamu yang sangat kecil. Setiap pengalaman dirancang khusus.",
        sort_order: 4,
      },
    ],
  },

  // ─── Luxury Weddings ─────────────────────────────────────────────────────

  {
    id: "4",
    slug: "luxury-weddings",
    category: "luxury_weddings",
    name: "Pernikahan Mewah",

    // Hero
    hero_style: "editorial",
    hero_image: "/images/venues/banner/signature-bg.png",
    hero_desc:
      "Pernikahan mewah di Bali yang dibentuk oleh arsitektur, suasana, dan penceritaan — bukan tren.",

    // Intro
    intro_label: "Definisi Kami",
    intro_heading: ["Apa yang Mendefinisikan Kemewahan", "di Linda Wiryani"],
    intro_body:
      "Di Linda Wiryani Design and Event Planning, kami merancang pernikahan mewah di Bali yang terasa istimewa, tenang, dan kaya secara emosional. Pernikahan kami dibentuk oleh arsitektur, suasana, dan penceritaan — bukan tren.",
    intro_list_label: null,
    intro_list: [
      "Arahan artistik",
      "Kedalaman emosional",
      "Keindahan ruang",
      "Eksekusi yang mulus",
      "Layanan yang bijaksana dan penuh perhatian",
    ],
    intro_footnote:
      "Kemewahan sejati adalah ketika segalanya mengalir tanpa usaha.",
    intro_images: ["", ""],

    // Approach
    approach_label: "Cara Kami Bekerja",
    approach_heading: ["Pendekatan Desain", "Pernikahan Mewah Kami"],
    approach_body:
      "Setiap pernikahan mewah dimulai dengan sebuah proses — bukan templat. Hal ini memastikan setiap perayaan terasa utuh dan penuh niat, dari percakapan pertama hingga perpisahan terakhir.",
    approach_list_label: "Setiap pernikahan mewah dimulai dengan:",
    approach_list: [
      "Visi & pemetaan emosional",
      "Kajian venue dan lingkungan",
      "Pengembangan narasi desain",
      "Perencanaan pengalaman tamu",
      "Presisi teknis dan produksi",
    ],
    approach_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1768288826/Amankila_-_Manggis_-_Bali_-_Indonesia_-_Private_Event_04_plvo4w.jpg",

    // Services
    services_label: "Yang Kami Tawarkan",
    services_heading: ["Layanan Pernikahan", "Mewah Kami"],
    services_list: [
      "Arahan kreatif dan desain",
      "Kurasi venue dan vendor",
      "Pengelolaan anggaran dan produksi",
      "Perencanaan acara multi-hari",
      "Desain styling, floral, dan ruang",
      "Orkestrasi hari pernikahan",
    ],
    services_footnote:
      "Kami sengaja hanya menerima sejumlah terbatas pernikahan mewah setiap tahun untuk memastikan keterlibatan kreatif yang penuh.",
    services_dark_label: "Untuk Anda",
    services_dark_heading: ["Untuk Pasangan yang", "Menghargai Seni"],
    services_dark_body:
      "Studio kami dipilih oleh pasangan yang mencari kecerdasan estetika, penceritaan emosional, dan eksekusi kelas dunia.",
    services_dark_list: [
      "Kecerdasan estetika",
      "Profesionalisme yang tenang",
      "Penceritaan yang emosional",
      "Keindahan arsitektural",
      "Pengalaman tamu kelas dunia",
    ],

    // Closing
    closing_label: "Pernikahan Mewah yang Terasa Abadi",
    closing_heading: [
      "Kemewahan tidak boleh terasa berisik.",
      "Ia harus terasa penuh pertimbangan.",
    ],
    closing_body:
      "Jika Anda sedang mencari wedding planner mewah di Bali, kami akan sangat terhormat merancang perayaan yang bermakna, halus, dan tak terlupakan.",
    closing_image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1768288832/Amankila_-_Manggis_-_Bali_-_Indonesia_-_Private_Event_06_rzqgiu.jpg",
    closing_couple_label: null,
    closing_couple_values: [],

    // Relations
    faqs: [
      {
        id: "faq-lw-1",
        experience_id: "4",
        question: "Apa yang mendefinisikan pernikahan mewah di Bali?",
        answer:
          "Pernikahan mewah didefinisikan oleh desain yang matang, estetika yang halus, eksekusi yang mulus, penceritaan emosional, dan pengalaman tamu yang luar biasa — bukan sekadar anggaran atau skala.",
        sort_order: 0,
      },
      {
        id: "faq-lw-2",
        experience_id: "4",
        question: "Apakah Anda merencanakan pernikahan mewah multi-hari?",
        answer:
          "Ya. Kami merancang dan mengelola pengalaman pernikahan multi-hari, termasuk acara penyambutan, pertemuan gladi, hari upacara, dan perayaan perpisahan.",
        sort_order: 1,
      },
      {
        id: "faq-lw-3",
        experience_id: "4",
        question: "Berapa biaya pernikahan mewah di Bali?",
        answer:
          "Anggaran sangat bervariasi tergantung jumlah tamu, venue, cakupan desain, dan kompleksitas produksi. Pernikahan mewah di Bali umumnya dimulai pada tingkat di mana desain, perencanaan, dan produksi profesional secara penuh dibutuhkan.",
        sort_order: 2,
      },
      {
        id: "faq-lw-4",
        experience_id: "4",
        question: "Berapa banyak pernikahan yang Anda tangani setiap tahun?",
        answer:
          "Kami sengaja membatasi jumlah pernikahan mewah yang kami terima demi memastikan fokus kreatif penuh, keterlibatan personal, dan keunggulan eksekusi.",
        sort_order: 3,
      },
      {
        id: "faq-lw-5",
        experience_id: "4",
        question:
          "Apakah Anda bekerja sama dengan venue dan vendor kelas atas?",
        answer:
          "Ya. Kami bekerja sama dengan venue mewah, pengrajin, dan profesional pernikahan tepercaya di seluruh Bali yang memenuhi standar kami dalam hal kualitas, keandalan, dan kehalusan.",
        sort_order: 4,
      },
    ],
  },
];

export const whyBali = [
  "Tebing samudra yang dramatis",
  "Vila mewah pribadi",
  "Lanskap hutan dan tepi sungai",
  "Pantai berpasir putih",
  "Resor butik dan properti tersembunyi",
];

export const fullServiceIncludes = [
  "Pencarian dan evaluasi venue",
  "Arahan kreatif dan pengembangan desain",
  "Kurasi dan pengelolaan vendor",
  "Perencanaan anggaran dan pengendalian biaya",
  "Jadwal dan lini masa produksi",
  "Perencanaan pengalaman tamu",
  "Orkestrasi upacara dan resepsi",
  "Koordinasi dan pelaksanaan pada hari-H",
];

export const hospitalityValues = [
  "Kejelasan",
  "Presisi",
  "Kenyamanan tamu",
  "Alur emosional",
  "Eksekusi yang mulus",
];

export const coupleValues = [
  "Penceritaan artistik",
  "Perencanaan yang tenang dan profesional",
  "Estetika yang halus",
  "Suasana emosional",
  "Pengalaman tamu yang penuh perhatian",
];

export const designFoundation = [
  "Memahami kisah Anda",
  "Menentukan suasana emosional",
  "Mempelajari venue dan lingkungan sekitarnya",
  "Merancang alur seluruh perayaan",
];

// Sub-experience cards
export const subExperiences = [
  {
    title: "Pernikahan Vila Pribadi",
    subtitle: "di Bali",
    tag: "Vila Pribadi",
    desc: "Privasi, kebebasan desain, dan suasana yang terasa personal, bukan komersial. Merayakan di ruang yang sepenuhnya menjadi milik Anda.",
    href: "/wedding-experiences/private-villa-weddings",
    image: "/images/venues/banner/private-bg.png",
  },
  {
    title: "Pernikahan Intim",
    subtitle: "di Bali",
    tag: "Intim",
    desc: "Ruang untuk kedekatan, kehadiran, dan keindahan tanpa berlebihan. Dirancang untuk pasangan yang mengutamakan kualitas di atas kuantitas.",
    href: "/wedding-experiences/intimate-weddings",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878596/BAL_1453_e7hd8w.jpg",
  },
  {
    title: "Pernikahan Elopement",
    subtitle: "di Bali",
    tag: "Elopement",
    desc: "Elopement bukanlah pernikahan yang lebih kecil — melainkan yang lebih dalam. Kaya emosi, puitis secara visual, dan sepenuhnya milik Anda.",
    href: "/wedding-experiences/elopement-weddings",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767345590/Wedding_18_nnx6an.png",
  },
  {
    title: "Pernikahan Mewah",
    subtitle: "di Bali",
    tag: "Mewah",
    desc: "Kemewahan bukan soal berlebihan — melainkan tentang kehalusan, kepedulian, dan pengalaman. Pernikahan yang dibentuk oleh arsitektur, suasana, dan penceritaan.",
    href: "/wedding-experiences/luxury-weddings",
    image: "/images/venues/banner/signature-bg.png",
  },
];

export const faqs = [
  {
    q: "Apa yang dilakukan seorang wedding planner destinasi di Bali?",
    a: "Wedding planner destinasi di Bali mengelola desain kreatif sekaligus seluruh proses perencanaan bagi pasangan yang menikah di Bali. Ini mencakup pencarian venue, pengembangan desain, koordinasi vendor, panduan anggaran, logistik, jadwal, dan pelaksanaan pada hari-H.",
  },
  {
    q: "Mengapa kami perlu menyewa wedding planner lokal di Bali?",
    a: "Wedding planner lokal di Bali memiliki pengetahuan mendalam tentang venue, regulasi, pertimbangan budaya, vendor tepercaya, dan kenyataan produksi di lokasi — memastikan komunikasi yang lebih lancar dan eksekusi yang lebih baik dibandingkan perencanaan dari jarak jauh.",
  },
  {
    q: "Berapa lama sebelumnya kami sebaiknya merencanakan pernikahan destinasi di Bali?",
    a: "Sebagian besar pernikahan destinasi di Bali direncanakan 9–15 bulan sebelumnya. Waktu ini memberi ruang untuk ketersediaan venue, pengembangan desain, pemesanan vendor, logistik tamu, dan perizinan. Pernikahan mewah dan vila pribadi sering kali membutuhkan persiapan yang lebih panjang.",
  },
  {
    q: "Apakah Anda bekerja dengan pasangan internasional?",
    a: "Ya. Linda Wiryani Design and Event Planning mengkhususkan diri pada pernikahan destinasi untuk pasangan internasional. Kami memandu klien melalui seluruh perjalanan perencanaan, termasuk koordinasi zona waktu, konsultasi daring, dan sistem perencanaan yang terperinci.",
  },
  {
    q: "Bisakah Anda membantu kami memilih venue pernikahan yang tepat di Bali?",
    a: "Ya. Kami mengkurasi dan merekomendasikan venue pernikahan berdasarkan visi, jumlah tamu, arah desain, dan tujuan pengalaman Anda — termasuk vila pribadi, resor, dan lokasi tersembunyi di seluruh Bali.",
  },
];
