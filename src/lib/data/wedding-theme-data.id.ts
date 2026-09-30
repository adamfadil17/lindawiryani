// ─── HELPERS ──────────────────────────────────────────────────────────────────

import { WeddingTheme } from "@/types";
import { venueList } from "./venue-data.id";
import { weddingExperienceList } from "./wedding-experience-data.id";

const getVenue = (id: string) => venueList.find((v) => v.id === id)!;
const getExp = (id: string) => weddingExperienceList.find((e) => e.id === id)!;

// ─── THEME LIST ───────────────────────────────────────────────────────────────

export const weddingThemeList: WeddingTheme[] = [
  // ─── ELOPEMENT THEMES ─────────────────────────────────────────────────────

  {
    id: "private-villa-elopement",
    slug: "private-villa-elopement",
    type: "ELOPEMENT",
    title: "Elopement Vila Pribadi",
    description: `<p>Elopement Vila Pribadi dirancang untuk pasangan yang menghargai privasi, ketenangan, dan suasana yang sangat personal. Berlokasi di vila-vila pribadi yang dikurasi dengan cermat, perayaan ini dipandu oleh arsitektur, lanskap, dan alur alami ruang, menciptakan suasana yang intim, tidak terburu-buru, dan dirancang dengan penuh kesengajaan.</p>

<p>Linda Wiryani Design and Event Planning bekerja sama dengan sejumlah vila pribadi menawan yang ideal untuk elopement intim. Pasangan juga dapat memilih merayakan di vila yang mereka pesan sendiri, dengan syarat kesesuaian dan ketentuan venue.</p>

<blockquote><p>Upacara ini tidak dirancang untuk memukau lewat kemewahan berlebih, melainkan untuk menyentuh lewat kejernihan, keseimbangan, dan niat. Pertukaran janji yang tenang. Latar yang ditata dengan penuh pertimbangan. Dan momen yang terasa sangat personal serta abadi.</p></blockquote>

<h3>Yang Termasuk</h3>

<h4>Desain &amp; Koordinasi Upacara</h4>
<ul>
  <li>Perencanaan upacara pernikahan dan koordinasi pada hari-H oleh Linda Wiryani Design &amp; Event Planning (1 orang)</li>
  <li>Celebrant lokal berbahasa Inggris</li>
  <li>Sertifikat pernikahan kenang-kenangan dengan desain khusus</li>
</ul>

<h4>Penataan Bunga <em>(Bunga Lokal | Halus &amp; Elegan)</em></h4>
<ul>
  <li>Backdrop upacara ditata dengan perpaduan harmonis bunga segar lokal, dedaunan alami, dan beberapa elemen artifisial pilihan, disusun dengan cermat agar selaras dengan suasana vila pribadi</li>
  <li>Kelopak bunga di sepanjang jalur upacara</li>
  <li>Rangkaian bunga di lorong upacara yang dirancang terasa alami dan bersahaja</li>
  <li>Buket pengantin dari bunga lokal</li>
  <li>Boutonniere pengantin pria, senada dengan palet bunga</li>
</ul>

<h4>Musik</h4>
<ul>
  <li>Gitaris solo atau pemain biola solo yang membawakan musik upacara yang bersahaja dan sarat suasana</li>
</ul>

<h4>Fotografi</h4>
<ul>
  <li>Fotografer profesional selama 1,5 jam (1 orang)</li>
  <li>Foto-foto pilihan terbaik yang dikurasi dan diedit dengan cermat</li>
  <li>Foto akhir dikirim dalam 1 minggu melalui tautan Google Drive pribadi</li>
</ul>

<h3>Waktu Upacara</h3>
<p>Elopement Vila Pribadi paling indah dinikmati pada dua waktu cahaya alami, ketika suasana di dalam vila terasa paling tenang dan seimbang.</p>
<ul>
  <li><strong>Pagi (Sekitar pukul 07.00 – 09.00)</strong> — Upacara pagi menghadirkan cahaya lembut yang menyebar dan suasana tenteram sebelum hari benar-benar dimulai. Udara umumnya lebih sejuk, lingkungan lebih sunyi, dan cahaya alami dengan lembut menonjolkan garis arsitektur serta lanskap sekitar. Waktu ini terasa intim, segar, dan tidak terburu-buru.</li>
  <li><strong>Matahari Terbenam (Sekitar pukul 17.00 – 18.30)</strong> — Upacara saat matahari terbenam menciptakan suasana hangat keemasan ketika cahaya bergerak melintasi arsitektur vila dan pepohonan di sekitarnya. Peralihan bertahap dari siang ke malam menambah kedalaman dan nuansa romantis, menghadirkan latar yang anggun dan penuh suasana.</li>
</ul>
<p>Waktu upacara final akan dikonfirmasi berdasarkan orientasi arsitektur vila, arah cahaya alami dan pergerakan bayangan, variasi waktu matahari terbenam menurut musim, serta alur ruang dan suasana secara keseluruhan. Upacara pagi sering kali memberikan fleksibilitas yang lebih besar dan kondisi yang lebih tenang, sementara matahari terbenam menawarkan kehangatan warna dan kedalaman visual yang lebih kaya. Waktu yang dipilih akan selalu dipandu oleh cahaya, harmoni ruang, dan maksud estetika upacara secara keseluruhan.</p>

<h3>Catatan Penting</h3>
<ul>
  <li>Paket ini sengaja dikurasi agar tetap sederhana, elegan, dan berfokus pada momen upacara itu sendiri</li>
  <li>Hanya item yang tercantum di atas yang termasuk</li>
  <li>Paket ini dirancang khusus untuk sepasang pengantin</li>
  <li>Waktu upacara akan dikonfirmasi setelah vila pribadi dipilih, dengan mempertimbangkan cahaya alami, suasana, dan tata letak vila demi menciptakan latar yang setenang mungkin</li>
  <li>Tarif akomodasi vila tidak termasuk dan akan ditambahkan sesuai permintaan</li>
  <li>Harga paket mulai dari <strong>IDR 25.000.000</strong></li>
</ul>

<h3>Cuaca &amp; Kondisi Alam</h3>
<p>Elopement Vila Pribadi berlangsung di lingkungan vila terbuka atau semi-terbuka yang tetap dipengaruhi secara alami oleh iklim tropis Bali. Meskipun vila pribadi menawarkan perlindungan struktural yang lebih baik dibandingkan area yang sepenuhnya di luar ruangan, kondisi cuaca seperti hujan, kelembapan, angin, atau hujan tropis yang datang tiba-tiba tetap berada di luar kendali kami.</p>
<p>Jika turun hujan, tidak ada rencana cadangan luar ruangan yang bersifat tetap. Upacara dapat dijeda sejenak hingga cuaca mereda, atau dipindahkan dengan penuh pertimbangan ke area beratap atau dalam ruangan di dalam vila, tergantung pada waktu, tata letak ruang, dan aksesibilitas. Penempatan dekorasi dapat disesuaikan apabila waktu memungkinkan, demi menjaga keselarasan dengan alur arsitektur vila.</p>
<p>Pasangan memahami bahwa kondisi cuaca merupakan bagian dari lingkungan alam Bali dan bukan alasan untuk pembatalan, pengembalian dana, atau penjadwalan ulang, kecuali disepakati lain secara tertulis. Linda Wiryani Design &amp; Event Planning akan selalu mengutamakan keselamatan, kenyamanan, dan integritas estetika dalam keterbatasan waktu, venue, dan kondisi cuaca.</p>

<h3>Ketentuan Pembayaran &amp; Pemesanan</h3>
<ul>
  <li>Deposit sebesar 50% yang tidak dapat dikembalikan diperlukan saat pemesanan dikonfirmasi</li>
  <li>Sisa pembayaran 50% jatuh tempo paling lambat 30 hari sebelum tanggal acara</li>
  <li>Tanggal acara belum dianggap terjamin sampai pembayaran deposit diterima</li>
  <li>Seluruh pembayaran yang telah dilakukan tidak dapat dikembalikan, kecuali dinyatakan lain secara tertulis</li>
  <li>Kegagalan melunasi sisa pembayaran sebelum batas waktu yang disepakati dapat mengakibatkan pembatalan layanan tanpa pengembalian deposit awal</li>
  <li>Jika pasangan memilih mengubah tanggal, lokasi, atau elemen utama upacara setelah konfirmasi, setiap perubahan tetap bergantung pada ketersediaan dan dapat dikenai biaya tambahan</li>
  <li>Biaya sewa dan akomodasi vila (jika ada) terpisah dari paket upacara ini dan mengikuti kebijakan pembayaran dan pembatalan masing-masing vila</li>
</ul>

<h3>Tidak Termasuk</h3>
<p>Hal-hal berikut dapat diatur secara terpisah sesuai permintaan: biaya venue atau acara (jika ada), akomodasi atau menginap di vila, transportasi, sistem suara atau peralatan audio, videografi atau drone, musisi tambahan atau hiburan langsung, tata rias rambut dan wajah, gaun pengantin, jas, atau aksesori, gladi resik yang melibatkan seluruh vendor, serta item apa pun yang tidak dicantumkan secara eksplisit dalam bagian Yang Termasuk.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776940317/Private_Villa_Elopement_Mutiara_6_etnh26.png",
    gallery: [
      {
        id: "private-villa-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776940317/Private_Villa_Elopement_Mutiara_6_etnh26.png",
        sort_order: 0,
        theme_id: "private-villa-elopement",
      },
      {
        id: "private-villa-elopement-img-2",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776940317/Private_Villa_Elopement_Vivara1_wqecfn.png",
        sort_order: 1,
        theme_id: "private-villa-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "cliffside-elopement",
    slug: "cliffside-elopement",
    type: "ELOPEMENT",
    title: "Elopement di Tebing",
    description: `<p>Elopement di Tebing dirancang untuk pasangan yang tertarik pada cakrawala terbuka, ketinggian yang dramatis, dan kekuatan laut yang tenang. Berlokasi di sepanjang tebing pesisir Bali, perayaan ini dibentuk oleh cahaya, angin, dan pemandangan luas, menciptakan suasana yang intim namun menakjubkan.</p>

<p>Linda Wiryani Design and Event Planning bekerja sama dengan pilihan venue tebing menawan dan estat pribadi yang dikurasi, yang cocok untuk elopement intim. Pemilihan venue dipandu oleh aksesibilitas, keselamatan, dan keselarasan desain secara keseluruhan.</p>

<blockquote><p>Upacara ini tidak dirancang untuk memukau lewat kemewahan berlebih, melainkan untuk menyentuh lewat kejernihan, keseimbangan, dan niat. Pertukaran janji yang tenang. Cakrawala tanpa batas. Dan momen yang terasa intim sekaligus luas.</p></blockquote>

<h3>Yang Termasuk</h3>

<h4>Desain &amp; Koordinasi Upacara</h4>
<ul>
  <li>Perencanaan upacara pernikahan dan koordinasi pada hari-H oleh Linda Wiryani Design &amp; Event Planning (1 orang)</li>
  <li>Celebrant lokal berbahasa Inggris</li>
  <li>Sertifikat pernikahan kenang-kenangan dengan desain khusus</li>
  <li>Biaya akses venue sudah termasuk</li>
</ul>

<h4>Penataan Bunga <em>(Bunga Lokal | Halus &amp; Elegan)</em></h4>
<ul>
  <li>Backdrop upacara ditata dengan perpaduan harmonis bunga segar lokal, dedaunan alami, dan beberapa elemen artifisial pilihan, disusun dengan cermat agar selaras dengan suasana tebing</li>
  <li>Kelopak bunga di sepanjang jalur upacara</li>
  <li>Rangkaian bunga di lorong upacara yang dirancang terasa alami namun tertata di tengah lanskap pesisir</li>
  <li>Buket pengantin dari bunga lokal</li>
  <li>Boutonniere pengantin pria, selaras dengan keseluruhan palet bunga</li>
</ul>

<h4>Musik</h4>
<ul>
  <li>Gitaris solo atau pemain biola solo yang membawakan musik upacara yang bersahaja dan sarat suasana</li>
</ul>

<h4>Fotografi</h4>
<ul>
  <li>Fotografer profesional selama 1,5 jam (1 orang)</li>
  <li>Foto-foto pilihan terbaik yang dikurasi dan diedit dengan cermat</li>
  <li>Foto akhir dikirim dalam 1 minggu melalui tautan Google Drive pribadi</li>
</ul>

<h3>Waktu Upacara</h3>
<p>Elopement di Tebing paling indah dinikmati pada dua waktu cahaya alami:</p>
<ul>
  <li><strong>Pagi (Sekitar pukul 07.00 – 09.00)</strong> — Upacara pagi menawarkan angin yang lebih lembut, langit yang lebih cerah, dan cahaya alami yang halus. Suasananya terasa tenang, intim, dan damai, dengan lebih sedikit pengunjung dan lingkungan pesisir yang lebih sunyi.</li>
  <li><strong>Matahari Terbenam (Sekitar pukul 17.00 – 18.30)</strong> — Upacara saat matahari terbenam menghadirkan cahaya keemasan yang dramatis, nuansa cakrawala yang luas, dan suasana sinematik yang alami. Warna langit berubah perlahan, menciptakan latar yang kuat dan penuh emosi di hadapan samudra dan tebing.</li>
</ul>
<p>Waktu upacara final akan dikonfirmasi berdasarkan variasi waktu matahari terbenam menurut musim, kondisi angin, aksesibilitas dan peraturan venue, serta keselamatan dan kenyamanan secara keseluruhan. Meskipun matahari terbenam menawarkan drama visual, kondisi ini juga dapat disertai angin pesisir yang lebih kencang. Upacara pagi umumnya lebih stabil dari segi cuaca. Waktu yang dipilih akan selalu dipandu oleh cahaya alami, pertimbangan keselamatan, dan maksud estetika upacara secara keseluruhan.</p>

<h3>Catatan Penting</h3>
<ul>
  <li>Paket ini sengaja dikurasi agar tetap sederhana, elegan, dan berfokus pada momen upacara itu sendiri</li>
  <li>Hanya item yang tercantum di atas yang termasuk</li>
  <li>Paket ini dirancang khusus untuk sepasang pengantin</li>
  <li>Waktu upacara akan dikonfirmasi setelah venue dipilih, dengan mempertimbangkan cahaya alami, kondisi pasang surut, dan suasana secara keseluruhan</li>
  <li>Harga paket mulai dari <strong>IDR 25.000.000</strong></li>
</ul>

<h3>Cuaca &amp; Kondisi Alam</h3>
<p>Elopement di Tebing berlangsung di lingkungan pesisir yang terbuka secara alami, di mana angin, udara laut, dan pola cuaca yang berubah-ubah merupakan bagian dari lokasinya. Area tebing sangat dipengaruhi oleh hembusan angin yang kencang atau mendadak, panas dan paparan sinar matahari langsung, hujan tropis yang datang tiba-tiba, serta kondisi pesisir yang berubah-ubah.</p>
<p>Jika turun hujan atau angin kencang, tidak ada rencana cadangan luar ruangan yang bersifat tetap. Upacara dapat dijeda sejenak hingga kondisi stabil. Jika venue menyediakan ruang dalam atau beratap, upacara dapat dipindahkan dengan penuh pertimbangan, tergantung pada ketersediaan dan waktu. Struktur bunga dan instalasi dekorasi dapat disesuaikan, diamankan, disederhanakan, atau ditata ulang demi keselamatan sambil tetap menjaga integritas estetika secara keseluruhan.</p>
<p>Keselamatan tetap menjadi prioritas utama. Jika kondisi dinilai tidak aman oleh Planner atau pihak manajemen venue, penyesuaian yang diperlukan akan dilakukan. Pasangan memahami bahwa cuaca dan angin pesisir merupakan unsur alami lingkungan tebing dan bukan alasan untuk pembatalan, pengembalian dana, atau penjadwalan ulang, kecuali disepakati lain secara tertulis.</p>

<h3>Ketentuan Pembayaran &amp; Pemesanan</h3>
<ul>
  <li>Deposit sebesar 50% yang tidak dapat dikembalikan diperlukan saat konfirmasi</li>
  <li>Sisa pembayaran 50% harus dilunasi paling lambat 30 hari sebelum tanggal acara</li>
  <li>Tanggal belum terjamin sampai deposit diterima</li>
  <li>Seluruh pembayaran yang telah dilakukan tidak dapat dikembalikan kecuali dinyatakan lain secara tertulis</li>
  <li>Kegagalan melunasi sisa pembayaran sebelum batas waktu yang disepakati dapat mengakibatkan pembatalan layanan tanpa pengembalian deposit</li>
  <li>Apabila pasangan meminta perubahan pada venue, tanggal upacara, waktu, atau elemen utama setelah konfirmasi, seluruh perubahan bergantung pada ketersediaan dan biaya tambahan dapat dikenakan sesuai penyesuaian logistik, penjadwalan ulang vendor, atau kebijakan venue</li>
  <li>Biaya sewa venue dan akomodasi (jika ada) mengikuti kebijakan pembayaran dan pembatalan masing-masing venue dan terpisah dari paket ini kecuali disertakan secara eksplisit</li>
</ul>

<h3>Tidak Termasuk</h3>
<p>Hal-hal berikut dapat diatur secara terpisah sesuai permintaan: biaya venue atau acara (jika ada), akomodasi atau menginap, transportasi, sistem suara atau peralatan audio tambahan, videografi atau drone, musisi tambahan atau hiburan langsung, tata rias rambut dan wajah, gaun pengantin, jas, atau aksesori, gladi resik yang melibatkan seluruh vendor, serta item apa pun yang tidak dicantumkan secara eksplisit dalam bagian Yang Termasuk.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939445/Cliffside_Elopement_1_vof9yx.png",
    gallery: [
      {
        id: "cliffside-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939445/Cliffside_Elopement_1_vof9yx.png",
        sort_order: 0,
        theme_id: "cliffside-elopement",
      },
      {
        id: "cliffside-elopement-img-2",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939442/Cliffside_Elopement_2_naudou.png",
        sort_order: 1,
        theme_id: "cliffside-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "architectural-modern-tropical-elopement",
    slug: "architectural-modern-tropical-elopement",
    type: "ELOPEMENT",
    title: "Elopement Arsitektural & Tropis Modern",
    description: `<p>Elopement Arsitektural dan Tropis Modern dirancang untuk pasangan yang menyukai garis-garis bersih, material alami, dan ruang dengan karakter visual yang kuat. Berlokasi di venue yang dirancang dengan cermat, mulai dari vila tropis modern hingga estat karya arsitek, perayaan ini dipandu oleh proporsi, cahaya, tekstur, dan alur ruang.</p>

<p>Di sini, arsitektur bukan sekadar latar. Arsitektur membentuk ritme upacara, membingkai setiap momen dengan kejernihan dan niat.</p>

<p>Linda Wiryani Design and Event Planning bekerja sama dengan pilihan venue berorientasi desain yang dikurasi, di mana struktur, material, dan lanskap hadir dalam harmoni yang tenang. Pemilihan venue dipandu oleh integritas arsitektur, privasi, dan koherensi estetika.</p>

<blockquote><p>Upacara ini tidak dirancang untuk memukau lewat kemewahan berlebih, melainkan untuk menyentuh lewat struktur, kesahajaan, dan niat. Garis-garis yang bersih. Tekstur alami. Dan momen yang dibingkai oleh desain yang matang.</p></blockquote>

<h3>Yang Termasuk</h3>

<h4>Desain &amp; Koordinasi Upacara</h4>
<ul>
  <li>Perencanaan upacara pernikahan dan koordinasi pada hari-H oleh Linda Wiryani Design &amp; Event Planning (1 orang)</li>
  <li>Celebrant lokal berbahasa Inggris</li>
  <li>Sertifikat pernikahan kenang-kenangan dengan desain khusus</li>
</ul>

<h4>Penataan Bunga <em>(Bunga Lokal | Halus &amp; Elegan)</em></h4>
<ul>
  <li>Backdrop upacara ditata dengan perpaduan harmonis bunga segar lokal, dedaunan alami, dan beberapa elemen artifisial pilihan, disusun dengan cermat agar selaras dengan suasana arsitektural dan tropis modern</li>
  <li>Kelopak bunga di sepanjang jalur upacara</li>
  <li>Rangkaian bunga di lorong upacara yang dirancang untuk melengkapi garis struktural dan material alami venue</li>
  <li>Buket pengantin dari bunga lokal</li>
  <li>Boutonniere pengantin pria, selaras dengan keseluruhan palet bunga</li>
</ul>

<h4>Musik</h4>
<ul>
  <li>Gitaris solo atau pemain biola solo yang membawakan musik upacara yang bersahaja dan sarat suasana</li>
</ul>

<h4>Fotografi</h4>
<ul>
  <li>Fotografer profesional selama 1,5 jam (1 orang)</li>
  <li>Foto-foto pilihan terbaik yang dikurasi dan diedit dengan cermat</li>
  <li>Foto akhir dikirim dalam 1 minggu melalui tautan Google Drive pribadi</li>
</ul>

<h3>Waktu Upacara</h3>
<p>Elopement Arsitektural &amp; Tropis Modern paling indah dinikmati pada:</p>
<ul>
  <li><strong>Pagi (Sekitar pukul 07.00 – 09.00)</strong> — Cahaya lembut menonjolkan garis arsitektur dan tekstur material. Suasananya terasa tenang, lapang, dan seimbang secara spasial.</li>
  <li><strong>Matahari Terbenam (Sekitar pukul 17.00 – 18.30)</strong> — Cahaya keemasan berinteraksi dengan bentuk-bentuk struktural, menciptakan kedalaman, permainan bayangan, dan suasana sinematik yang anggun.</li>
</ul>
<p>Waktu final akan dipandu oleh orientasi bangunan, pergerakan cahaya, dan komposisi ruang demi memastikan harmoni visual.</p>

<h3>Catatan Penting</h3>
<ul>
  <li>Paket ini sengaja dikurasi agar tetap sederhana, elegan, dan berfokus pada momen upacara itu sendiri</li>
  <li>Hanya item yang tercantum di atas yang termasuk</li>
  <li>Paket ini dirancang khusus untuk sepasang pengantin</li>
  <li>Waktu upacara akan dikonfirmasi setelah venue dipilih, dengan mempertimbangkan cahaya alami, bayangan arsitektural, dan komposisi ruang secara keseluruhan</li>
  <li>Harga paket mulai dari <strong>IDR 25.000.000</strong></li>
</ul>

<h3>Cuaca &amp; Kondisi Alam</h3>
<p>Meskipun upacara ini berlangsung di lingkungan arsitektural, sebagian besar ruang tropis modern di Bali bersifat semi-terbuka, berventilasi alami, atau sebagian terpapar elemen alam. Faktor cuaca dapat meliputi hujan tropis yang datang tiba-tiba, kelembapan dan panas, pergerakan angin melalui struktur terbuka, serta perubahan kondisi cahaya alami.</p>
<p>Jika turun hujan atau cuaca ekstrem, tidak ada jaminan rencana cadangan luar ruangan yang bersifat tetap kecuali disediakan oleh venue. Upacara dapat dijeda sejenak hingga kondisi mereda, atau dipindahkan ke ruang arsitektural yang beratap atau di dalam properti, tergantung pada tata letak dan ketersediaan. Struktur bunga dan elemen dekoratif dapat disederhanakan, diamankan, atau ditata ulang demi keselamatan dan koherensi estetika.</p>
<p>Karena lokasi ini secara sengaja merangkul arsitektur tropis, pasangan memahami bahwa unsur lingkungan merupakan bagian dari pengalaman dan bukan alasan untuk pembatalan, pengembalian dana, atau penjadwalan ulang, kecuali disepakati lain secara tertulis. Keselamatan, kesesuaian struktur, dan peraturan venue akan selalu menjadi dasar keputusan akhir.</p>

<h3>Ketentuan Pembayaran &amp; Pemesanan</h3>
<ul>
  <li>Deposit sebesar 50% yang tidak dapat dikembalikan diperlukan saat pemesanan dikonfirmasi</li>
  <li>Sisa pembayaran 50% harus dilunasi paling lambat 30 hari sebelum tanggal acara</li>
  <li>Tanggal acara belum terjamin sampai deposit diterima</li>
  <li>Seluruh pembayaran yang telah dilakukan tidak dapat dikembalikan kecuali dinyatakan lain secara tertulis</li>
  <li>Kegagalan melunasi sisa pembayaran sebelum batas waktu yang disepakati dapat mengakibatkan pembatalan layanan tanpa pengembalian deposit</li>
  <li>Setiap perubahan yang diminta setelah konfirmasi — termasuk venue, tanggal upacara, elemen penataan, atau logistik utama — bergantung pada ketersediaan dan dapat dikenai biaya tambahan sesuai penyesuaian vendor atau kebijakan venue</li>
  <li>Biaya sewa venue, akomodasi, dan deposit khusus properti (jika ada) mengikuti ketentuan masing-masing venue dan terpisah dari paket upacara ini kecuali disertakan secara eksplisit</li>
</ul>

<h3>Tidak Termasuk</h3>
<p>Hal-hal berikut dapat diatur secara terpisah sesuai permintaan: biaya venue atau acara (jika ada), akomodasi atau menginap, transportasi, sistem suara atau peralatan audio tambahan, videografi atau drone, musisi tambahan atau hiburan langsung, tata rias rambut dan wajah, gaun pengantin, jas, atau aksesori, gladi resik yang melibatkan seluruh vendor, serta item apa pun yang tidak dicantumkan secara eksplisit dalam bagian Yang Termasuk.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939440/Architectural_Modern_Tropical_Elopements_nlnd5r.jpg",
    gallery: [
      {
        id: "architectural-modern-tropical-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939440/Architectural_Modern_Tropical_Elopements_nlnd5r.jpg",
        sort_order: 0,
        theme_id: "architectural-modern-tropical-elopement",
      },
      {
        id: "architectural-modern-tropical-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1777015076/architectural-2_gafx5l.jpg",
        sort_order: 0,
        theme_id: "architectural-modern-tropical-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "forest-jungle-elopement",
    slug: "forest-jungle-elopement",
    type: "ELOPEMENT",
    title: "Elopement Hutan & Rimba",
    description: `<p>Elopement Hutan &amp; Rimba dirancang untuk pasangan yang menyukai kehijauan yang rimbun, cahaya yang tersaring, dan perasaan larut mendalam dalam alam. Berlokasi di hutan tropis dan lanskap rimba, perayaan ini dipandu oleh ritme alam, dedaunan berlapis, tekstur alami, dan momen keheningan yang tenang.</p>

<p>Di sini, alam tidak ditata ulang atau dibentuk kembali. Alam menentukan nada, tempo, dan suasana emosional upacara.</p>

<p>Linda Wiryani Design and Event Planning bekerja sama dengan pilihan sanktuari hutan, lahan terbuka di tengah rimba, dan venue yang menyatu dengan alam, di mana lanskap, cahaya, dan desain hadir dalam keseimbangan alami. Pemilihan venue dipandu oleh aksesibilitas, kepekaan terhadap lingkungan, dan keselarasan dengan sekitarnya.</p>

<blockquote><p>Upacara ini tidak dirancang untuk memukau lewat kemewahan berlebih, melainkan untuk menyentuh lewat kehadiran, kesahajaan, dan keterhubungan dengan alam. Cahaya yang tersaring. Tekstur yang hidup. Dan momen yang dipeluk dengan tenang di dalam hutan.</p></blockquote>

<h3>Yang Termasuk</h3>

<h4>Desain &amp; Koordinasi Upacara</h4>
<ul>
  <li>Perencanaan upacara pernikahan dan koordinasi pada hari-H oleh Linda Wiryani Design &amp; Event Planning (1 orang)</li>
  <li>Celebrant lokal berbahasa Inggris</li>
  <li>Sertifikat pernikahan kenang-kenangan dengan desain khusus</li>
  <li>Biaya akses venue sudah termasuk</li>
</ul>

<h4>Penataan Bunga <em>(Bunga Lokal | Halus &amp; Alami)</em></h4>
<ul>
  <li>Backdrop upacara ditata dengan perpaduan harmonis bunga segar lokal, dedaunan alami, dan beberapa elemen artifisial pilihan, disusun dengan cermat agar selaras dengan suasana hutan atau rimba</li>
  <li>Kelopak bunga di sepanjang jalur upacara</li>
  <li>Rangkaian bunga di lorong upacara yang dipandu oleh bentuk organik dan gerak alami</li>
  <li>Buket pengantin dari bunga lokal</li>
  <li>Boutonniere pengantin pria, selaras dengan keseluruhan palet bunga</li>
</ul>

<h4>Musik</h4>
<ul>
  <li>Gitaris solo atau pemain biola solo yang membawakan musik upacara yang bersahaja dan sarat suasana</li>
</ul>

<h4>Fotografi</h4>
<ul>
  <li>Fotografer profesional selama 1,5 jam (1 orang)</li>
  <li>Foto-foto pilihan terbaik yang dikurasi dan diedit dengan cermat</li>
  <li>Foto akhir dikirim dalam 1 minggu melalui tautan Google Drive pribadi</li>
</ul>

<h3>Waktu Terbaik</h3>
<p>Elopement Hutan &amp; Rimba paling indah dinikmati pada waktu cahaya alami yang melengkapi suasana kanopi.</p>
<ul>
  <li><strong>Pagi (Sekitar pukul 07.00 – 09.00)</strong> — Pagi hari menawarkan kelembapan yang lebih lembut, cahaya yang menyaring lembut melalui pepohonan, dan suasana yang lebih sunyi sebelum aktivitas pengunjung meningkat. Waktu ini terasa tenang, segar, dan membumi.</li>
  <li><strong>Sore Hari (Sekitar pukul 16.30 – 18.00)</strong> — Sore hari menghadirkan warna yang lebih hangat dan bayangan yang lebih dalam di antara lapisan hutan. Cahayanya menjadi lebih sarat suasana, menciptakan kedalaman dan drama yang halus di bawah kanopi.</li>
</ul>
<p>Waktu pastinya akan dikonfirmasi berdasarkan penetrasi cahaya melalui kanopi pepohonan, pola cuaca musiman, aksesibilitas dan peraturan venue, serta keselamatan dan kenyamanan secara keseluruhan. Upacara pagi umumnya menawarkan kondisi cuaca yang lebih stabil dan dinamika lingkungan yang lebih lembut.</p>

<h3>Catatan Penting</h3>
<ul>
  <li>Paket ini sengaja dikurasi agar tetap sederhana, elegan, dan berfokus pada momen upacara itu sendiri</li>
  <li>Hanya item yang tercantum di atas yang termasuk</li>
  <li>Paket ini dirancang khusus untuk sepasang pengantin</li>
  <li>Waktu upacara akan dikonfirmasi setelah venue dipilih, dengan mempertimbangkan cahaya alami, kanopi hutan, dan kondisi lingkungan secara keseluruhan</li>
  <li>Harga paket mulai dari <strong>IDR 25.000.000</strong></li>
</ul>

<h3>Cuaca &amp; Kondisi Alam</h3>
<p>Lingkungan rimba bersifat dinamis secara alami dan dipengaruhi oleh pola iklim tropis. Kondisi dapat meliputi hujan mendadak atau gerimis yang lewat, kelembapan tinggi, medan yang tidak rata atau alami, serangga dan satwa hutan, serta cahaya yang berubah-ubah di bawah kanopi pepohonan.</p>
<p>Karena upacara ini berlangsung di lingkungan alam terbuka, kondisi cuaca berada di luar kendali kami. Jika turun hujan, tidak ada jaminan venue cadangan dalam ruangan yang bersifat tetap kecuali disediakan secara khusus oleh lokasi yang dipilih. Upacara dapat dijeda sejenak hingga cuaca mereda, atau bila memungkinkan, dipindahkan ke area yang terlindung secara alami di dalam venue. Elemen bunga dan dekorasi dapat disesuaikan atau disederhanakan demi keselamatan dan kestabilan struktur.</p>
<p>Pasangan memahami bahwa kondisi hutan tropis merupakan bagian dari lokasi ini dan bukan alasan untuk pembatalan, pengembalian dana, atau penjadwalan ulang, kecuali disepakati lain secara tertulis. Keselamatan dan penghormatan terhadap lingkungan selalu menjadi prioritas utama.</p>

<h3>Ketentuan Pembayaran &amp; Pemesanan</h3>
<ul>
  <li>Deposit sebesar 50% yang tidak dapat dikembalikan diperlukan saat pemesanan dikonfirmasi</li>
  <li>Sisa pembayaran 50% harus dilunasi paling lambat 30 hari sebelum tanggal acara</li>
  <li>Tanggal acara belum dianggap terjamin sampai deposit diterima</li>
  <li>Seluruh pembayaran yang telah dilakukan tidak dapat dikembalikan kecuali dinyatakan lain secara tertulis</li>
  <li>Kegagalan melunasi sisa pembayaran sebelum batas waktu yang disepakati dapat mengakibatkan pembatalan layanan tanpa pengembalian deposit awal</li>
  <li>Setiap perubahan yang diminta pada venue, tanggal upacara, atau elemen desain utama setelah konfirmasi bergantung pada ketersediaan dan dapat dikenai biaya tambahan sesuai penyesuaian logistik atau vendor</li>
  <li>Biaya akses venue dan izin khusus lokasi mengikuti kebijakan masing-masing venue apabila berlaku</li>
</ul>

<h3>Tidak Termasuk</h3>
<p>Hal-hal berikut dapat diatur secara terpisah sesuai permintaan: biaya venue atau acara (jika ada), akomodasi atau menginap, transportasi, sistem suara atau peralatan audio tambahan, videografi atau drone, musisi tambahan atau hiburan langsung, tata rias rambut dan wajah, gaun pengantin, jas, atau aksesori, gladi resik yang melibatkan seluruh vendor, serta item apa pun yang tidak dicantumkan secara eksplisit dalam bagian Yang Termasuk.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939441/Forest_Jungle_Elopements_wgemwg.png",
    gallery: [
      {
        id: "forest-jungle-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939441/Forest_Jungle_Elopements_wgemwg.png",
        sort_order: 0,
        theme_id: "forest-jungle-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "waterfall-elopement",
    slug: "waterfall-elopement",
    type: "ELOPEMENT",
    title: "Elopement Air Terjun",
    description: `<p>Elopement Air Terjun dirancang untuk pasangan yang menyukai gerak alami yang mentah, suara alam, dan kehadiran air mengalir yang menenangkan. Berlokasi di hadapan air terjun yang mengalir deras dan dikelilingi kehijauan yang rimbun, perayaan ini dibentuk oleh kabut, cahaya, dan ritme elemental alam.</p>

<p>Di sini, air bukan sekadar pemandangan. Air menjadi bagian dari suasana upacara, memandu tempo, nada, dan kedalaman emosinya.</p>

<p>Linda Wiryani Design and Event Planning bekerja sama dengan pilihan sanktuari air terjun dan lokasi yang menyatu dengan alam, di mana lanskap, aksesibilitas, dan penghormatan terhadap lingkungan dipertimbangkan dengan cermat. Pemilihan venue mengutamakan keselamatan, privasi, dan keselarasan dengan sekitarnya.</p>

<blockquote><p>Upacara ini tidak dirancang untuk memukau lewat kemewahan berlebih, melainkan untuk menyentuh lewat gerak, rasa membumi, dan kehadiran elemental. Air yang jatuh. Kabut yang lembut. Dan momen yang dibawa perlahan oleh alam itu sendiri.</p></blockquote>

<h3>Yang Termasuk</h3>

<h4>Desain &amp; Koordinasi Upacara</h4>
<ul>
  <li>Perencanaan upacara pernikahan dan koordinasi pada hari-H oleh Linda Wiryani Design &amp; Event Planning (1 orang)</li>
  <li>Celebrant lokal berbahasa Inggris</li>
  <li>Sertifikat pernikahan kenang-kenangan dengan desain khusus</li>
  <li>Biaya akses venue sudah termasuk</li>
</ul>

<h4>Penataan Bunga <em>(Bunga Lokal | Halus &amp; Alami)</em></h4>
<ul>
  <li>Backdrop upacara ditata dengan perpaduan harmonis bunga segar lokal, dedaunan alami, dan beberapa elemen artifisial pilihan, disusun dengan cermat agar selaras dengan suasana air terjun</li>
  <li>Kelopak bunga di sepanjang jalur upacara</li>
  <li>Rangkaian bunga di lorong upacara yang dipandu oleh bentuk organik dan kepekaan terhadap lingkungan</li>
  <li>Buket pengantin dari bunga lokal</li>
  <li>Boutonniere pengantin pria, selaras dengan keseluruhan palet bunga</li>
</ul>

<h4>Musik</h4>
<ul>
  <li>Gitaris solo atau pemain biola solo yang membawakan musik upacara yang bersahaja dan sarat suasana <em>(Catatan: volume musik langsung dapat disesuaikan dengan suara alami air terjun.)</em></li>
</ul>

<h4>Fotografi</h4>
<ul>
  <li>Fotografer profesional selama 1,5 jam (1 orang)</li>
  <li>Foto-foto pilihan terbaik yang dikurasi dan diedit dengan cermat</li>
  <li>Foto akhir dikirim dalam 1 minggu melalui tautan Google Drive pribadi</li>
</ul>

<h3>Waktu Terbaik</h3>
<p>Elopement Air Terjun paling indah dinikmati pada waktu ketika cahaya alami dan aktivitas pengunjung paling mendukung.</p>
<ul>
  <li><strong>Pagi Hari (Sekitar pukul 06.00 – 08.00)</strong> — Upacara pagi menawarkan cahaya yang lebih lembut, kehadiran pengunjung yang lebih sedikit, suasana yang lebih tenang, dan kondisi air yang lebih stabil. Lingkungannya terasa segar, intim, dan damai.</li>
  <li><strong>Sore Hari (Sekitar pukul 16.30 – 17.30)</strong> — Sore hari dapat menghadirkan warna yang lebih hangat dan bayangan yang lebih lembut; namun, keramaian pengunjung dan tingkat kelembapan dapat bervariasi tergantung lokasi.</li>
</ul>
<p>Waktu pagi umumnya direkomendasikan untuk privasi yang lebih baik, kondisi medan yang lebih aman, pencahayaan yang lebih konsisten, dan aktivitas publik yang lebih sedikit. Waktu final akan dikonfirmasi berdasarkan pola cuaca musiman, aksesibilitas, dan pertimbangan keselamatan secara keseluruhan.</p>

<h3>Catatan Penting</h3>
<ul>
  <li>Paket ini sengaja dikurasi agar tetap sederhana, elegan, dan berfokus pada momen upacara itu sendiri</li>
  <li>Hanya item yang tercantum di atas yang termasuk</li>
  <li>Paket ini dirancang khusus untuk sepasang pengantin</li>
  <li>Waktu upacara akan dikonfirmasi setelah lokasi dipilih, dengan mempertimbangkan cahaya alami, debit air, dan kondisi lingkungan</li>
  <li>Harga paket mulai dari <strong>IDR 25.000.000</strong></li>
</ul>

<h3>Cuaca &amp; Kondisi Alam</h3>
<p>Lingkungan air terjun bersifat dinamis secara alami dan dipengaruhi oleh curah hujan musiman, debit air, kondisi medan, dan pola cuaca tropis. Kondisi dapat meliputi hujan mendadak atau gerimis yang lewat, peningkatan volume air setelah hujan, medan alami yang licin atau tidak rata, kelembapan dan kabut, suara alami dari air yang mengalir, serta aksesibilitas yang terbatas tergantung lokasi.</p>
<p>Karena upacara ini berlangsung di lingkungan alam yang aktif, kondisi berada di luar kendali kami. Jika turun hujan atau aliran air deras, upacara dapat dijeda sementara hingga kondisi stabil. Jika ketinggian air atau medan dinilai tidak aman, upacara dapat dipindahkan ke area terdekat yang lebih aman di dalam venue bila memungkinkan. Instalasi bunga dan dekorasi dapat disesuaikan, disederhanakan, atau diamankan demi keselamatan struktur. Keputusan keselamatan yang diambil oleh Planner atau pihak manajemen venue bersifat final.</p>
<p>Paket ini tidak mencakup venue cadangan dalam ruangan yang terjamin kecuali dinyatakan secara khusus. Pasangan memahami bahwa kondisi air terjun merupakan bagian dari lokasi ini dan bukan alasan untuk pembatalan, pengembalian dana, atau penjadwalan ulang, kecuali disepakati lain secara tertulis. Keselamatan dan penghormatan terhadap lingkungan tetap menjadi prioritas utama.</p>

<h3>Ketentuan Pembayaran &amp; Pemesanan</h3>
<ul>
  <li>Deposit sebesar 50% yang tidak dapat dikembalikan diperlukan saat pemesanan dikonfirmasi</li>
  <li>Sisa pembayaran 50% harus dilunasi paling lambat 30 hari sebelum tanggal acara</li>
  <li>Tanggal acara belum terjamin sampai deposit diterima</li>
  <li>Seluruh pembayaran yang telah dilakukan tidak dapat dikembalikan kecuali disepakati lain secara tertulis</li>
  <li>Kegagalan melunasi sisa pembayaran sebelum batas waktu yang disepakati dapat mengakibatkan pembatalan layanan tanpa pengembalian deposit</li>
  <li>Setiap perubahan yang diminta pada tanggal upacara, lokasi, atau elemen utama setelah konfirmasi bergantung pada ketersediaan dan dapat dikenai biaya tambahan sesuai penjadwalan ulang vendor atau penyesuaian izin</li>
  <li>Izin lokasi dan biaya masuk (jika ada) mengikuti kebijakan masing-masing lokasi air terjun</li>
</ul>

<h3>Tidak Termasuk</h3>
<p>Hal-hal berikut dapat diatur secara terpisah sesuai permintaan: biaya venue atau acara (jika ada), akomodasi atau menginap, transportasi, sistem suara atau peralatan audio tambahan, videografi atau drone, musisi tambahan atau hiburan langsung, tata rias rambut dan wajah, gaun pengantin, jas, atau aksesori, gladi resik yang melibatkan seluruh vendor, serta item apa pun yang tidak dicantumkan secara eksplisit dalam bagian Yang Termasuk.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939441/Waterfall_Wedding_1_kk2634.png",
    gallery: [
      {
        id: "waterfall-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939441/Waterfall_Wedding_1_kk2634.png",
        sort_order: 0,
        theme_id: "waterfall-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "rice-field-elopement",
    slug: "rice-field-elopement",
    type: "ELOPEMENT",
    title: "Elopement Sawah",
    description: `<p>Elopement Sawah dirancang untuk pasangan yang menyukai cakrawala terbuka, semilir angin lembut, dan puisi sunyi lanskap pedesaan. Berlokasi di tengah terasering sawah Bali yang subur dan lahan pertanian, perayaan ini berlangsung di bawah langit luas, cahaya yang lembut, dan ketenangan berirama alam.</p>

<p>Di sini, lanskap bukan sekadar pemandangan. Lanskap membentuk suasana upacara, menghadirkan keheningan, keterbukaan, dan rasa kesederhanaan yang membumi.</p>

<p>Linda Wiryani Design and Event Planning bekerja sama dengan pilihan venue sawah dan lokasi pedesaan yang dikurasi, di mana aksesibilitas, privasi, dan keselarasan dengan lingkungan setempat dipertimbangkan dengan saksama. Pemilihan venue menghormati medan alami sekaligus masyarakat di sekitarnya.</p>

<blockquote><p>Upacara ini tidak dirancang untuk memukau lewat kemewahan berlebih, melainkan untuk menyentuh lewat keterbukaan, keseimbangan, dan keterhubungan yang tenang. Langit terbuka. Cahaya yang lembut. Dan momen yang dipeluk perlahan di tengah hamparan sawah.</p></blockquote>

<h3>Yang Termasuk</h3>

<h4>Desain &amp; Koordinasi Upacara</h4>
<ul>
  <li>Perencanaan upacara pernikahan dan koordinasi pada hari-H oleh Linda Wiryani Design &amp; Event Planning (1 orang)</li>
  <li>Celebrant lokal berbahasa Inggris</li>
  <li>Sertifikat pernikahan kenang-kenangan dengan desain khusus</li>
  <li>Biaya akses venue sudah termasuk</li>
</ul>

<h4>Penataan Bunga <em>(Bunga Lokal | Halus &amp; Alami)</em></h4>
<ul>
  <li>Backdrop upacara ditata dengan perpaduan harmonis bunga segar lokal, dedaunan alami, dan beberapa elemen artifisial pilihan, disusun dengan cermat agar selaras dengan lanskap sawah</li>
  <li>Kelopak bunga di sepanjang jalur upacara</li>
  <li>Rangkaian bunga di lorong upacara yang dipandu oleh bentuk organik dan kesederhanaan alami</li>
  <li>Buket pengantin dari bunga lokal</li>
  <li>Boutonniere pengantin pria, selaras dengan keseluruhan palet bunga</li>
</ul>

<h4>Musik</h4>
<ul>
  <li>Gitaris solo atau pemain biola solo yang membawakan musik upacara yang bersahaja dan sarat suasana</li>
</ul>

<h4>Fotografi</h4>
<ul>
  <li>Fotografer profesional selama 1,5 jam (1 orang)</li>
  <li>Foto-foto pilihan terbaik yang dikurasi dan diedit dengan cermat</li>
  <li>Foto akhir dikirim dalam 1 minggu melalui tautan Google Drive pribadi</li>
</ul>

<h3>Waktu Terbaik</h3>
<p>Elopement Sawah paling indah dinikmati pada waktu ketika cahaya lembut dan suhu terasa nyaman.</p>
<ul>
  <li><strong>Pagi Hari (Sekitar pukul 06.00 – 08.00)</strong> — Pagi hari menawarkan udara yang lebih sejuk, cahaya alami yang lebih lembut, dan suasana pedesaan yang lebih sunyi sebelum aktivitas bertani meningkat. Cahayanya terasa segar dan lembut di atas terasering.</li>
  <li><strong>Sore Hari / Matahari Terbenam (Sekitar pukul 17.00 – 18.30)</strong> — Upacara saat matahari terbenam menghadirkan warna keemasan yang hangat di hamparan sawah, menciptakan kedalaman dan pendar di seluruh lanskap. Suasananya terasa luas dan romantis.</li>
</ul>
<p>Waktu pagi umumnya direkomendasikan untuk suhu yang lebih sejuk, kondisi cuaca yang lebih stabil, privasi yang lebih baik, dan pencahayaan yang lebih lembut. Waktu final akan dikonfirmasi berdasarkan pola cahaya musiman, siklus pertanian, dan kenyamanan lingkungan secara keseluruhan.</p>

<h3>Catatan Penting</h3>
<ul>
  <li>Paket ini sengaja dikurasi agar tetap sederhana, elegan, dan berfokus pada momen upacara itu sendiri</li>
  <li>Hanya item yang tercantum di atas yang termasuk</li>
  <li>Paket ini dirancang khusus untuk sepasang pengantin</li>
  <li>Waktu upacara akan dikonfirmasi setelah lokasi dipilih, dengan mempertimbangkan cahaya alami, kondisi lahan, dan suasana secara keseluruhan</li>
  <li>Harga paket mulai dari <strong>IDR 25.000.000</strong></li>
</ul>

<h3>Cuaca &amp; Kondisi Alam</h3>
<p>Lingkungan sawah bersifat terbuka secara alami dan sepenuhnya terpapar kondisi iklim tropis. Faktor yang dapat muncul meliputi paparan sinar matahari langsung dan panas, angin di hamparan terbuka, hujan tropis yang datang tiba-tiba, lumpur atau tanah yang lembek menurut musim, serangga yang lazim di lanskap pedesaan, serta aktivitas pertanian sesuai siklus tanam.</p>
<p>Karena upacara ini berlangsung di lingkungan pedesaan yang aktif, kondisi cuaca dan lahan berada di luar kendali kami. Jika turun hujan atau angin kencang, upacara dapat dijeda sementara hingga kondisi mereda, atau jika tersedia, dipindahkan ke area terlindung di dekatnya. Elemen bunga dan instalasi dekorasi dapat disesuaikan, diamankan, atau disederhanakan demi keselamatan dan harmoni visual. Kondisi medan dapat membatasi beberapa elemen penataan demi alasan keselamatan.</p>
<p>Pasangan memahami bahwa area persawahan adalah lanskap pertanian yang hidup dan bahwa faktor lingkungan merupakan bagian dari lokasi ini. Kondisi cuaca bukan alasan untuk pembatalan, pengembalian dana, atau penjadwalan ulang, kecuali disepakati lain secara tertulis. Keselamatan, penghormatan terhadap aktivitas pertanian setempat, dan keselarasan dengan lingkungan selalu menjadi prioritas.</p>

<h3>Ketentuan Pembayaran &amp; Pemesanan</h3>
<ul>
  <li>Deposit sebesar 50% yang tidak dapat dikembalikan diperlukan saat pemesanan dikonfirmasi</li>
  <li>Sisa pembayaran 50% harus dilunasi paling lambat 30 hari sebelum tanggal acara</li>
  <li>Tanggal acara belum dianggap terjamin sampai deposit diterima</li>
  <li>Seluruh pembayaran yang telah dilakukan tidak dapat dikembalikan kecuali disepakati lain secara tertulis</li>
  <li>Kegagalan melunasi sisa pembayaran sebelum batas waktu yang disepakati dapat mengakibatkan pembatalan layanan tanpa pengembalian deposit</li>
  <li>Setiap perubahan yang diminta pada venue, waktu upacara, atau elemen utama setelah konfirmasi bergantung pada ketersediaan dan dapat dikenai biaya tambahan sesuai penyesuaian logistik atau vendor</li>
  <li>Biaya akses venue dan izin masyarakat setempat (bila berlaku) mengikuti kebijakan setempat dan dapat berbeda tergantung lokasi sawah yang dipilih</li>
</ul>

<h3>Tidak Termasuk</h3>
<p>Hal-hal berikut dapat diatur secara terpisah sesuai permintaan: biaya venue atau acara (jika ada), akomodasi atau menginap, transportasi, sistem suara atau peralatan audio tambahan, videografi atau drone, musisi tambahan atau hiburan langsung, tata rias rambut dan wajah, gaun pengantin, jas, atau aksesori, gladi resik yang melibatkan seluruh vendor, serta item apa pun yang tidak dicantumkan secara eksplisit dalam bagian Yang Termasuk.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939441/Rice_Field_Elopements_z7rkqm.jpg",
    gallery: [
      {
        id: "rice-field-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939441/Rice_Field_Elopements_z7rkqm.jpg",
        sort_order: 0,
        theme_id: "rice-field-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "beachfront-elopement",
    slug: "beachfront-elopement",
    type: "ELOPEMENT",
    title: "Elopement Tepi Pantai",
    description: `<p>Elopement Tepi Pantai dirancang untuk pasangan yang menyukai garis cakrawala, embusan angin laut, dan ritme elemental samudra. Berlokasi di sepanjang garis pantai Bali tempat ombak bertemu langit terbuka, upacara ini berlangsung di tengah udara beraroma garam, cahaya yang berubah-ubah, dan kehadiran air yang menenangkan.</p>

<p>Di sini, samudra bukan sekadar pemandangan. Samudra membentuk suasana upacara, menghadirkan gerak, kejernihan, dan ketenangan yang luas.</p>

<p>Linda Wiryani Design and Event Planning bekerja sama dengan pilihan venue tepi pantai dan lokasi pesisir yang dikurasi, di mana privasi, aksesibilitas, kondisi pasang surut, dan penghormatan terhadap lingkungan dipertimbangkan dengan saksama. Pemilihan venue menghormati garis pantai alami sekaligus peraturan setempat.</p>

<blockquote><p>Upacara ini tidak dirancang untuk memukau lewat kemewahan berlebih, melainkan untuk menyentuh lewat keterbukaan, keseimbangan, dan keterhubungan yang tenang. Cakrawala tanpa batas. Udara asin. Dan janji yang dibawa perlahan oleh laut.</p></blockquote>

<h3>Yang Termasuk</h3>

<h4>Desain &amp; Koordinasi Upacara</h4>
<ul>
  <li>Perencanaan upacara pernikahan dan koordinasi pada hari-H oleh Linda Wiryani Design &amp; Event Planning (1 orang)</li>
  <li>Celebrant lokal berbahasa Inggris</li>
  <li>Sertifikat pernikahan kenang-kenangan dengan desain khusus</li>
  <li>Biaya akses venue sudah termasuk (bila berlaku di lokasi tepi pantai yang disepakati)</li>
</ul>

<h4>Penataan Bunga <em>(Bunga Lokal | Halus &amp; Bernuansa Pesisir)</em></h4>
<ul>
  <li>Backdrop upacara ditata dengan perpaduan harmonis bunga segar lokal, dedaunan alami, dan beberapa elemen artifisial pilihan, disusun dengan cermat agar selaras dengan suasana samudra</li>
  <li>Kelopak bunga di sepanjang jalur upacara</li>
  <li>Rangkaian bunga di lorong upacara yang dipandu oleh alur organik dan kesederhanaan pesisir</li>
  <li>Buket pengantin dari bunga segar lokal</li>
  <li>Boutonniere pengantin pria, selaras dengan keseluruhan palet bunga</li>
</ul>

<h4>Musik</h4>
<ul>
  <li>Gitaris solo atau pemain biola solo yang membawakan musik upacara yang bersahaja dan sarat suasana</li>
</ul>

<h4>Fotografi</h4>
<ul>
  <li>Fotografer profesional selama 1,5 jam (1 orang)</li>
  <li>Foto-foto pilihan terbaik yang dikurasi dan diedit dengan cermat</li>
  <li>Foto akhir dikirim dalam 1 minggu melalui tautan Google Drive pribadi</li>
</ul>

<h3>Waktu Terbaik</h3>
<p>Elopement Tepi Pantai paling indah dinikmati pada waktu cahaya alami yang melengkapi suasana pesisir.</p>
<ul>
  <li><strong>Pagi (Sekitar pukul 07.00 – 09.00)</strong> — Upacara pagi menawarkan angin yang lebih lembut, suhu yang lebih sejuk, pengunjung yang lebih sedikit, dan cahaya alami yang halus. Suasananya terasa tenang, intim, dan damai.</li>
  <li><strong>Matahari Terbenam (Sekitar pukul 17.00 – 18.30)</strong> — Matahari terbenam menghadirkan warna keemasan yang dramatis di cakrawala samudra. Cahayanya perlahan melembut menjadi rona hangat, menciptakan suasana sinematik dan romantis.</li>
</ul>
<p>Upacara pagi umumnya direkomendasikan untuk privasi yang lebih baik, kondisi angin yang lebih stabil, pencahayaan yang lebih lembut, dan kenyamanan yang lebih besar. Waktu upacara final akan dikonfirmasi berdasarkan variasi waktu matahari terbenam menurut musim, jadwal pasang surut, prakiraan angin, dan aksesibilitas venue.</p>

<h3>Catatan Penting</h3>
<ul>
  <li>Paket ini sengaja dikurasi agar tetap sederhana, elegan, dan berfokus pada momen upacara itu sendiri</li>
  <li>Hanya item yang tercantum di atas yang termasuk</li>
  <li>Paket ini dirancang khusus untuk sepasang pengantin</li>
  <li>Waktu upacara akan dikonfirmasi setelah lokasi dipilih, dengan mempertimbangkan pasang surut, cahaya alami, kondisi angin, dan suasana secara keseluruhan</li>
  <li>Harga paket mulai dari <strong>IDR 25.000.000</strong></li>
</ul>

<h3>Cuaca &amp; Kondisi Alam</h3>
<p>Lingkungan pantai bersifat dinamis secara alami dan sepenuhnya terpapar kondisi iklim pesisir. Faktor yang dapat muncul meliputi angin kencang atau berubah-ubah, hujan tropis yang datang tiba-tiba, panas terik dan paparan sinar matahari langsung, perubahan pasang surut, pergeseran pasir dan medan yang tidak rata, serta akses publik tergantung lokasi.</p>
<p>Karena upacara ini berlangsung di area pesisir yang terbuka, kondisi cuaca dan pasang surut berada di luar kendali kami. Jika turun hujan, angin kencang, atau kondisi pasang yang tidak aman, upacara dapat dijeda sejenak hingga kondisi stabil. Jika venue menyediakan area terlindung atau dalam ruangan, upacara dapat dipindahkan bila memungkinkan. Instalasi bunga dan struktur dekorasi dapat disesuaikan, diamankan, disederhanakan, atau ditata ulang demi keselamatan. Elemen penataan dapat dimodifikasi karena kekuatan angin atau kondisi pasir. Keputusan keselamatan yang diambil oleh Planner atau pihak manajemen venue bersifat final.</p>
<p>Pasangan memahami bahwa lingkungan tepi pantai dipengaruhi oleh kekuatan alam pesisir dan bahwa perubahan cuaca atau pasang surut bukan alasan untuk pembatalan, pengembalian dana, atau penjadwalan ulang, kecuali disepakati lain secara tertulis.</p>

<h3>Ketentuan Pembayaran &amp; Pemesanan</h3>
<ul>
  <li>Deposit sebesar 50% yang tidak dapat dikembalikan diperlukan saat pemesanan dikonfirmasi</li>
  <li>Sisa pembayaran 50% harus dilunasi paling lambat 30 hari sebelum tanggal acara</li>
  <li>Tanggal acara belum terjamin sampai deposit diterima</li>
  <li>Seluruh pembayaran yang telah dilakukan tidak dapat dikembalikan kecuali disepakati lain secara tertulis</li>
  <li>Kegagalan melunasi sisa pembayaran sebelum batas waktu yang disepakati dapat mengakibatkan pembatalan layanan tanpa pengembalian deposit</li>
  <li>Setiap perubahan yang diminta pada venue, tanggal upacara, atau elemen utama setelah konfirmasi bergantung pada ketersediaan dan dapat dikenai biaya tambahan sesuai penyesuaian vendor atau kebijakan venue</li>
  <li>Biaya sewa venue, izin, dan peraturan akses (bila berlaku) mengikuti kebijakan masing-masing lokasi tepi pantai dan terpisah kecuali disertakan secara eksplisit</li>
</ul>

<h3>Tidak Termasuk</h3>
<p>Hal-hal berikut dapat diatur secara terpisah sesuai permintaan: akomodasi atau menginap, transportasi, sistem suara atau peralatan audio tambahan, videografi atau drone, musisi tambahan atau hiburan langsung, tata rias rambut dan wajah, gaun pengantin, jas, atau aksesori, gladi resik yang melibatkan seluruh vendor, serta item apa pun yang tidak dicantumkan secara eksplisit dalam bagian Yang Termasuk.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939442/Beachfront_Elopement_Wedding_eo6b6g.jpg",
    gallery: [
      {
        id: "beachfront-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939442/Beachfront_Elopement_Wedding_eo6b6g.jpg",
        sort_order: 0,
        theme_id: "beachfront-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "lake-elopement",
    slug: "lake-elopement",
    type: "ELOPEMENT",
    title: "Elopement Tepi Danau",
    description: `<p>Elopement Tepi Danau dirancang untuk pasangan yang menyukai air yang tenang, udara pegunungan, dan kedalaman refleksi yang hening. Berlokasi di tepi danau Bali yang damai, tempat kabut naik perlahan dari permukaan air dan perbukitan di kejauhan membingkai cakrawala, upacara ini berlangsung di tengah udara sejuk, cahaya yang lembut, dan ketenangan yang membumi.</p>

<p>Di sini, danau bukan sekadar pemandangan. Danau membentuk suasana upacara, menghadirkan keheningan, kejernihan, dan rasa hadir yang mendalam.</p>

<p>Linda Wiryani Design and Event Planning bekerja sama dengan pilihan venue tepi danau dan lokasi dataran tinggi yang dikurasi, di mana aksesibilitas, privasi, kondisi iklim, dan keselarasan dengan lingkungan dipertimbangkan dengan saksama. Pemilihan venue menghormati lanskap alami sekaligus tradisi masyarakat di sekitarnya.</p>

<blockquote><p>Upacara ini tidak dirancang untuk memukau lewat kemewahan berlebih, melainkan untuk menyentuh lewat keheningan, keseimbangan, dan keterhubungan yang tenang. Kabut yang lembut. Air yang tenang. Dan janji yang terpantul perlahan di permukaan danau.</p></blockquote>

<h3>Yang Termasuk</h3>

<h4>Desain &amp; Koordinasi Upacara</h4>
<ul>
  <li>Perencanaan upacara pernikahan dan koordinasi pada hari-H oleh Linda Wiryani Design &amp; Event Planning (1 orang)</li>
  <li>Celebrant lokal berbahasa Inggris</li>
  <li>Sertifikat pernikahan kenang-kenangan dengan desain khusus</li>
  <li>Biaya akses venue sudah termasuk (bila berlaku di lokasi tepi danau yang disepakati)</li>
</ul>

<h4>Penataan Bunga <em>(Bunga Lokal | Halus &amp; Terinspirasi Alam)</em></h4>
<ul>
  <li>Backdrop upacara ditata dengan perpaduan harmonis bunga segar lokal, dedaunan alami, dan beberapa elemen artifisial pilihan, disusun dengan cermat agar selaras dengan suasana tepi danau</li>
  <li>Kelopak bunga di sepanjang jalur upacara</li>
  <li>Rangkaian bunga di lorong upacara yang dipandu oleh bentuk organik dan kesederhanaan alami</li>
  <li>Buket pengantin dari bunga segar lokal</li>
  <li>Boutonniere pengantin pria, selaras dengan keseluruhan palet bunga</li>
</ul>

<h4>Musik</h4>
<ul>
  <li>Gitaris solo atau pemain biola solo yang membawakan musik upacara yang bersahaja dan sarat suasana</li>
</ul>

<h4>Fotografi</h4>
<ul>
  <li>Fotografer profesional selama 1,5 jam (1 orang)</li>
  <li>Foto-foto pilihan terbaik yang dikurasi dan diedit dengan cermat</li>
  <li>Foto akhir dikirim dalam 1 minggu melalui tautan Google Drive pribadi</li>
</ul>

<h3>Waktu Terbaik</h3>
<p>Elopement Tepi Danau paling indah dinikmati pada waktu ketika cahaya dan suasana terasa paling seimbang.</p>
<ul>
  <li><strong>Pagi (Sekitar pukul 07.00 – 09.00)</strong> — Upacara pagi kerap menawarkan permukaan air yang tenang, cahaya lembut yang menyebar, dan suasana damai sebelum aktivitas pengunjung meningkat. Kabut dapat menambah kesan puitis dan ethereal pada lokasi.</li>
  <li><strong>Sore Hari (Sekitar pukul 16.30 – 18.00)</strong> — Sore hari menghadirkan warna yang lebih hangat di atas air dan perbukitan sekitar, menciptakan kedalaman dan pantulan keemasan yang halus.</li>
</ul>
<p>Waktu pagi umumnya direkomendasikan untuk kondisi angin yang lebih stabil, permukaan air yang lebih tenang, privasi yang lebih baik, dan pencahayaan yang lebih lembut. Waktu upacara final akan dikonfirmasi berdasarkan pola cuaca musiman, kondisi jarak pandang, pergerakan angin, dan aksesibilitas venue.</p>

<h3>Catatan Penting</h3>
<ul>
  <li>Paket ini sengaja dikurasi agar tetap sederhana, elegan, dan berfokus pada momen upacara itu sendiri</li>
  <li>Hanya item yang tercantum di atas yang termasuk</li>
  <li>Paket ini dirancang khusus untuk sepasang pengantin</li>
  <li>Waktu upacara akan dikonfirmasi setelah lokasi dipilih, dengan mempertimbangkan cahaya pegunungan, kondisi kabut, pola angin, dan suasana secara keseluruhan</li>
  <li>Harga paket mulai dari <strong>IDR 25.000.000</strong></li>
</ul>

<h3>Cuaca &amp; Kondisi Alam</h3>
<p>Lingkungan danau dipengaruhi oleh kondisi iklim dataran tinggi dan pegunungan. Cuaca dapat berubah lebih cepat dibandingkan di area pesisir. Faktor yang dapat muncul meliputi kabut atau embun tebal di pagi hari, hujan mendadak, suhu yang lebih dingin, angin di atas permukaan air terbuka, fluktuasi kelembapan, serta perubahan tinggi muka air menurut musim.</p>
<p>Karena upacara ini berlangsung di lingkungan alam terbuka, kondisi cuaca dan lingkungan berada di luar kendali kami. Jika turun hujan, angin kencang, atau kabut tebal, upacara dapat dijeda sejenak hingga kondisi mereda. Jika venue menyediakan area beratap atau dalam ruangan, upacara dapat dipindahkan bila memungkinkan. Instalasi bunga dan struktur dekorasi dapat diamankan, disederhanakan, atau ditata ulang demi keselamatan dan keseimbangan estetika. Keterbatasan jarak pandang akibat kabut dianggap sebagai kondisi alami lokasi. Keputusan keselamatan yang diambil oleh Planner atau pihak manajemen venue bersifat final.</p>
<p>Pasangan memahami bahwa lingkungan danau dan pegunungan mengalami variasi cuaca alami dan bahwa kondisi tersebut bukan alasan untuk pembatalan, pengembalian dana, atau penjadwalan ulang, kecuali disepakati lain secara tertulis.</p>

<h3>Ketentuan Pembayaran &amp; Pemesanan</h3>
<ul>
  <li>Deposit sebesar 50% yang tidak dapat dikembalikan diperlukan saat pemesanan dikonfirmasi</li>
  <li>Sisa pembayaran 50% harus dilunasi paling lambat 30 hari sebelum tanggal acara</li>
  <li>Tanggal acara belum dianggap terjamin sampai deposit diterima</li>
  <li>Seluruh pembayaran yang telah dilakukan tidak dapat dikembalikan kecuali disepakati lain secara tertulis</li>
  <li>Kegagalan melunasi sisa pembayaran sebelum batas waktu yang disepakati dapat mengakibatkan pembatalan layanan tanpa pengembalian deposit awal</li>
  <li>Setiap perubahan yang diminta pada venue, tanggal upacara, atau elemen utama setelah konfirmasi bergantung pada ketersediaan dan dapat dikenai biaya tambahan sesuai penyesuaian vendor atau kebijakan venue</li>
  <li>Biaya akses venue dan izin setempat (jika berlaku) mengikuti kebijakan masing-masing lokasi dan terpisah kecuali disertakan secara eksplisit</li>
</ul>

<h3>Tidak Termasuk</h3>
<p>Hal-hal berikut dapat diatur secara terpisah sesuai permintaan: akomodasi atau menginap, transportasi, sistem suara atau peralatan audio tambahan, videografi atau drone, musisi tambahan atau hiburan langsung, tata rias rambut dan wajah, gaun pengantin, jas, atau aksesori, gladi resik yang melibatkan seluruh vendor, serta item apa pun yang tidak dicantumkan secara eksplisit dalam bagian Yang Termasuk.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939447/Lake_Elopement_hbxm9l.png",
    gallery: [
      {
        id: "lake-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939447/Lake_Elopement_hbxm9l.png",
        sort_order: 0,
        theme_id: "lake-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "volcano-mountain-elopement",
    slug: "volcano-mountain-elopement",
    type: "ELOPEMENT",
    title: "Elopement Gunung Berapi & Pegunungan",
    description: `<p>Elopement Gunung Berapi dan Pegunungan dirancang untuk pasangan yang menyukai ketinggian, cakrawala yang luas, dan kekuatan bumi yang tenang. Berlatar lanskap vulkanik Bali yang megah dan punggung-punggung dataran tinggi, tempat awan melintas di atas puncak dan cahaya pagi perlahan terbentang di atas medan, upacara ini berlangsung di tengah udara yang segar, pemandangan luas, dan rasa membumi yang mendalam.</p>

<p>Di sini, gunung bukan sekadar pemandangan. Gunung membentuk suasana upacara, menghadirkan perspektif, ketangguhan, dan keheningan yang kuat, terasa intim sekaligus tak terbatas.</p>

<p>Linda Wiryani Design and Event Planning bekerja sama dengan pilihan titik pandang pegunungan dan lanskap vulkanik yang dikurasi, di mana aksesibilitas, kondisi keselamatan, medan, dan penghormatan terhadap lingkungan dipertimbangkan dengan cermat. Pemilihan venue menghormati topografi alami serta kepekaan budaya setempat terkait kawasan gunung yang sakral.</p>

<blockquote><p>Upacara ini tidak dirancang untuk memukau lewat kemewahan berlebih, melainkan untuk menyentuh lewat ketinggian, kehadiran, dan kekuatan yang tenang. Udara yang segar. Cakrawala yang luas. Dan momen yang dipegang teguh di tepi bumi.</p></blockquote>

<h3>Yang Termasuk</h3>

<h4>Desain &amp; Koordinasi Upacara</h4>
<ul>
  <li>Perencanaan upacara pernikahan dan koordinasi pada hari-H oleh Linda Wiryani Design &amp; Event Planning (1 orang)</li>
  <li>Celebrant lokal berbahasa Inggris</li>
  <li>Sertifikat pernikahan kenang-kenangan dengan desain khusus</li>
  <li>Biaya akses venue sudah termasuk (bila berlaku di lokasi gunung atau gunung berapi yang disepakati)</li>
</ul>

<h4>Penataan Bunga <em>(Bunga Lokal | Halus &amp; Organik)</em></h4>
<ul>
  <li>Backdrop upacara ditata dengan perpaduan harmonis bunga segar lokal, dedaunan alami, dan beberapa elemen artifisial pilihan, disusun dengan cermat agar selaras dengan lanskap vulkanik atau pegunungan</li>
  <li>Kelopak bunga di sepanjang jalur upacara</li>
  <li>Rangkaian bunga di lorong upacara yang dipandu oleh bentuk organik dan kesahajaan alami</li>
  <li>Buket pengantin dari bunga segar lokal</li>
  <li>Boutonniere pengantin pria, selaras dengan keseluruhan palet bunga</li>
</ul>

<h4>Musik</h4>
<ul>
  <li>Gitaris solo atau pemain biola solo yang membawakan musik upacara yang bersahaja dan sarat suasana</li>
</ul>

<h4>Fotografi</h4>
<ul>
  <li>Fotografer profesional selama 1,5 jam (1 orang)</li>
  <li>Foto-foto pilihan terbaik yang dikurasi dan diedit dengan cermat</li>
  <li>Foto akhir dikirim dalam 1 minggu melalui tautan Google Drive pribadi</li>
</ul>

<h3>Waktu Terbaik</h3>
<p>Elopement Gunung Berapi &amp; Pegunungan paling indah dinikmati ketika cahaya dan jarak pandang selaras dengan ritme alami lanskap.</p>
<ul>
  <li><strong>Pagi Hari (Sekitar pukul 06.30 – 08.30)</strong> — Pagi hari umumnya adalah waktu yang paling direkomendasikan. Langit cenderung lebih cerah, angin lebih tenang, dan jarak pandang lebih baik sebelum awan berkumpul. Suasananya terasa segar, luas, dan kuat secara tenang.</li>
  <li><strong>Sore Hari (Sekitar pukul 16.30 – 18.00)</strong> — Sore hari dapat menawarkan warna keemasan yang hangat di atas medan; namun, jarak pandang dapat bervariasi tergantung pergerakan awan dan ketinggian.</li>
</ul>
<p>Upacara pagi sangat direkomendasikan untuk pemandangan pegunungan yang lebih jernih, kondisi angin yang lebih stabil, jarak pandang yang lebih baik, serta kenyamanan dan keselamatan yang lebih besar. Waktu final akan dikonfirmasi berdasarkan pola cuaca musiman, kecenderungan pembentukan awan, prakiraan angin, dan kondisi aksesibilitas.</p>

<h3>Catatan Penting</h3>
<ul>
  <li>Paket ini sengaja dikurasi agar tetap sederhana, elegan, dan berfokus pada momen upacara itu sendiri</li>
  <li>Hanya item yang tercantum di atas yang termasuk</li>
  <li>Paket ini dirancang khusus untuk sepasang pengantin</li>
  <li>Waktu upacara akan dikonfirmasi setelah lokasi dipilih, dengan mempertimbangkan cahaya matahari terbit atau terbenam, pergerakan awan, kondisi angin, dan suasana secara keseluruhan</li>
  <li>Harga paket mulai dari <strong>IDR 25.000.000</strong></li>
</ul>

<h3>Cuaca &amp; Kondisi Alam</h3>
<p>Lingkungan pegunungan dan vulkanik bersifat dinamis secara alami dan dipengaruhi oleh ketinggian serta pola iklim musiman. Kondisi dapat meliputi perubahan cuaca yang cepat, paparan angin yang kencang atau mendadak, suhu yang lebih dingin, kabut pagi atau pergerakan awan, jarak pandang terbatas sesekali, medan alami yang tidak rata, serta akses terbatas di area sakral atau terlindungi tertentu.</p>
<p>Karena upacara ini berlangsung di area luar ruangan dataran tinggi, kondisi cuaca dan medan berada di luar kendali kami. Jika turun hujan, angin kencang, kabut tebal, atau jarak pandang berkurang, upacara dapat dijeda sementara hingga kondisi stabil. Bila memungkinkan, upacara dapat dipindahkan ke area terdekat yang lebih aman di dalam venue. Struktur bunga dan elemen dekorasi dapat diamankan, disederhanakan, atau disesuaikan demi keselamatan dan integritas struktur. Keputusan keselamatan yang diambil oleh Planner atau pihak manajemen venue bersifat final.</p>
<p>Lingkungan pegunungan dapat mengalami angin yang lebih kencang dibandingkan area pesisir atau dataran rendah. Pasangan memahami bahwa faktor lingkungan tersebut merupakan bagian dari lanskap dataran tinggi dan bukan alasan untuk pembatalan, pengembalian dana, atau penjadwalan ulang, kecuali disepakati lain secara tertulis. Keselamatan, kewaspadaan terhadap medan, dan penghormatan terhadap kepekaan budaya setempat seputar gunung yang sakral selalu menjadi prioritas.</p>

<h3>Ketentuan Pembayaran &amp; Pemesanan</h3>
<ul>
  <li>Deposit sebesar 50% yang tidak dapat dikembalikan diperlukan saat pemesanan dikonfirmasi</li>
  <li>Sisa pembayaran 50% harus dilunasi paling lambat 30 hari sebelum tanggal acara</li>
  <li>Tanggal acara belum terjamin sampai deposit diterima</li>
  <li>Seluruh pembayaran yang telah dilakukan tidak dapat dikembalikan kecuali disepakati lain secara tertulis</li>
  <li>Kegagalan melunasi sisa pembayaran sebelum batas waktu yang disepakati dapat mengakibatkan pembatalan layanan tanpa pengembalian deposit</li>
  <li>Setiap perubahan yang diminta pada venue, tanggal upacara, waktu, atau elemen utama setelah konfirmasi bergantung pada ketersediaan dan dapat dikenai biaya tambahan sesuai kompleksitas logistik, persyaratan izin, atau penjadwalan ulang vendor</li>
  <li>Izin akses dan peraturan setempat (jika berlaku) mengikuti kebijakan masing-masing lokasi gunung atau gunung berapi</li>
</ul>

<h3>Tidak Termasuk</h3>
<p>Hal-hal berikut dapat diatur secara terpisah sesuai permintaan: akomodasi atau menginap, transportasi (akses pegunungan mungkin memerlukan kendaraan khusus), sistem suara atau peralatan audio tambahan, videografi atau drone, musisi tambahan atau hiburan langsung, tata rias rambut dan wajah, gaun pengantin, jas, atau aksesori, gladi resik yang melibatkan seluruh vendor, serta item apa pun yang tidak dicantumkan secara eksplisit dalam bagian Yang Termasuk.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939447/Volcano_mount_batur_y3gtwu.png",
    gallery: [
      {
        id: "volcano-mountain-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939447/Volcano_mount_batur_y3gtwu.png",
        sort_order: 0,
        theme_id: "volcano-mountain-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "riverside-elopement",
    slug: "riverside-elopement",
    type: "ELOPEMENT",
    title: "Elopement Tepi Sungai",
    description: `<p>Elopement Tepi Sungai dirancang untuk pasangan yang menyukai air yang mengalir, kontur alami, dan ritme sunyi daratan yang dibentuk oleh tepi sungai. Berlokasi di sepanjang sungai-sungai Bali, upacara ini berlangsung di tengah kehijauan berlapis, gerak yang lembut, dan ketenangan yang terasa membumi sekaligus hidup.</p>

<p>Di sini, alam tidak ditata ulang atau dibentuk kembali. Alam menentukan nada, tempo, dan suasana emosional upacara.</p>

<p>Linda Wiryani Design and Event Planning bekerja sama dengan pilihan lokasi tepi sungai, tepian sungai di tengah rimba, dan venue yang menyatu dengan alam, di mana air, lanskap, dan desain hadir dalam harmoni yang tenang. Pemilihan venue dipandu oleh aksesibilitas, keselamatan, dan kepekaan terhadap lingkungan alam sekitar.</p>

<blockquote><p>Upacara ini tidak dirancang untuk memukau lewat kemewahan berlebih, melainkan untuk menyentuh lewat gerak, keseimbangan, dan keterhubungan dengan alam. Air yang mengalir. Arus yang lembut. Dan momen yang dibawa perlahan menyusuri sungai.</p></blockquote>

<h3>Yang Termasuk</h3>

<h4>Desain &amp; Koordinasi Upacara</h4>
<ul>
  <li>Perencanaan upacara pernikahan dan koordinasi pada hari-H oleh Linda Wiryani Design &amp; Event Planning (1 orang)</li>
  <li>Celebrant lokal berbahasa Inggris</li>
  <li>Sertifikat pernikahan kenang-kenangan dengan desain khusus</li>
  <li>Biaya akses venue sudah termasuk</li>
</ul>

<h4>Penataan Bunga <em>(Bunga Lokal | Halus &amp; Alami)</em></h4>
<ul>
  <li>Backdrop upacara ditata dengan perpaduan harmonis bunga segar lokal, dedaunan alami, dan beberapa elemen artifisial pilihan, disusun dengan cermat agar selaras dengan suasana tepi sungai</li>
  <li>Kelopak bunga di sepanjang jalur upacara</li>
  <li>Rangkaian bunga di lorong upacara yang dipandu oleh bentuk organik dan gerak alami</li>
  <li>Buket pengantin dari bunga lokal</li>
  <li>Boutonniere pengantin pria, selaras dengan keseluruhan palet bunga</li>
</ul>

<h4>Musik</h4>
<ul>
  <li>Gitaris solo atau pemain biola solo yang membawakan musik upacara yang bersahaja dan sarat suasana</li>
</ul>

<h4>Fotografi</h4>
<ul>
  <li>Fotografer profesional selama 1,5 jam (1 orang)</li>
  <li>Foto-foto pilihan terbaik yang dikurasi dan diedit dengan cermat</li>
  <li>Foto akhir dikirim dalam 1 minggu melalui tautan Google Drive pribadi</li>
</ul>

<h3>Waktu Terbaik</h3>
<p>Elopement Tepi Sungai paling indah dinikmati pada waktu cahaya alami yang melengkapi gerak air dan lanskap sekitarnya.</p>
<ul>
  <li><strong>Pagi (Sekitar pukul 07.00 – 09.00)</strong> — Pagi hari menawarkan udara yang lebih sejuk, cahaya yang lebih lembut, dan kondisi lingkungan yang lebih tenang. Suasananya terasa segar, sunyi, dan membumi, dengan aktivitas publik yang lebih sedikit.</li>
  <li><strong>Sore Hari (Sekitar pukul 16.30 – 18.00)</strong> — Sore hari menghadirkan warna yang lebih hangat dan pantulan lembut di permukaan sungai. Cahaya menjadi lebih lembut dan sarat suasana, menciptakan kedalaman di dalam lanskap.</li>
</ul>
<p>Waktu pastinya akan dikonfirmasi berdasarkan arah cahaya alami, aliran sungai dan kondisi keselamatan, pola cuaca musiman, aksesibilitas dan peraturan venue, serta kenyamanan dan keselamatan secara keseluruhan. Upacara pagi umumnya menawarkan kondisi yang lebih stabil dan suasana yang lebih damai.</p>

<h3>Catatan Penting</h3>
<ul>
  <li>Paket ini sengaja dikurasi agar tetap sederhana, elegan, dan berfokus pada momen upacara itu sendiri</li>
  <li>Hanya item yang tercantum di atas yang termasuk</li>
  <li>Paket ini dirancang khusus untuk sepasang pengantin</li>
  <li>Waktu upacara akan dikonfirmasi setelah venue dipilih, dengan mempertimbangkan cahaya alami, aliran sungai, dan kondisi lingkungan secara keseluruhan</li>
  <li>Harga paket mulai dari <strong>IDR 30.000.000</strong></li>
</ul>

<h3>Cuaca &amp; Kondisi Alam</h3>
<p>Lingkungan tepi sungai bersifat dinamis secara alami dan dipengaruhi oleh pola cuaca tropis serta kondisi aliran air. Kondisi dapat meliputi hujan mendadak atau gerimis yang lewat, perubahan ketinggian atau kekuatan arus sungai, kelembapan dan kabut alami, medan alami yang tidak rata di dekat tepian sungai, serangga dan vegetasi di sekitarnya, serta suara alami dari air yang mengalir.</p>
<p>Karena upacara ini berlangsung di lingkungan alam terbuka, kondisi cuaca dan lingkungan berada di luar kendali kami. Jika turun hujan atau aliran air meningkat, tidak ada jaminan venue cadangan dalam ruangan yang bersifat tetap kecuali disediakan secara khusus oleh lokasi yang dipilih. Upacara dapat dijeda sejenak hingga kondisi stabil, atau bila memungkinkan, dipindahkan ke area yang terlindung secara alami atau lebih aman. Elemen bunga dan dekorasi dapat disesuaikan, diamankan, atau disederhanakan demi keselamatan dan kestabilan struktur.</p>
<p>Pasangan memahami bahwa lingkungan tepi sungai adalah sistem alam yang hidup dan bahwa kondisi tersebut bukan alasan untuk pembatalan, pengembalian dana, atau penjadwalan ulang, kecuali disepakati lain secara tertulis. Keselamatan dan penghormatan terhadap lingkungan selalu menjadi prioritas utama.</p>

<h3>Ketentuan Pembayaran &amp; Pemesanan</h3>
<ul>
  <li>Deposit sebesar 50% yang tidak dapat dikembalikan diperlukan saat pemesanan dikonfirmasi</li>
  <li>Sisa pembayaran 50% harus dilunasi paling lambat 30 hari sebelum tanggal acara</li>
  <li>Tanggal acara belum dianggap terjamin sampai deposit diterima</li>
  <li>Seluruh pembayaran yang telah dilakukan tidak dapat dikembalikan kecuali dinyatakan lain secara tertulis</li>
  <li>Kegagalan melunasi sisa pembayaran sebelum batas waktu yang disepakati dapat mengakibatkan pembatalan layanan tanpa pengembalian deposit awal</li>
  <li>Setiap perubahan yang diminta pada venue, tanggal upacara, atau elemen desain utama setelah konfirmasi bergantung pada ketersediaan dan dapat dikenai biaya tambahan sesuai penyesuaian logistik atau vendor</li>
  <li>Biaya akses venue dan izin khusus lokasi mengikuti kebijakan masing-masing venue apabila berlaku</li>
</ul>

<h3>Tidak Termasuk</h3>
<p>Hal-hal berikut dapat diatur secara terpisah sesuai permintaan: biaya venue atau acara (jika ada), akomodasi atau menginap, transportasi, sistem suara atau peralatan audio tambahan, videografi atau drone, musisi tambahan atau hiburan langsung, tata rias rambut dan wajah, gaun pengantin, jas, atau aksesori, gladi resik yang melibatkan seluruh vendor, serta item apa pun yang tidak dicantumkan secara eksplisit dalam bagian Yang Termasuk.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939444/Riverside_Elopement_ccm8dy.png",
    gallery: [
      {
        id: "riverside-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939444/Riverside_Elopement_ccm8dy.png",
        sort_order: 0,
        theme_id: "riverside-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "eco-sustainable-elopement",
    slug: "eco-sustainable-elopement",
    type: "ELOPEMENT",
    title: "Pernikahan Ramah Lingkungan & Berkelanjutan",
    description: `<p>Pernikahan Ramah Lingkungan &amp; Berkelanjutan dirancang untuk pasangan yang menghargai perayaan yang penuh kesadaran, tanggung jawab lingkungan, dan keterhubungan yang lebih dalam dengan tempat. Upacara ini dipandu bukan oleh kemewahan berlebih, melainkan oleh niat — di mana setiap elemen dipertimbangkan dari sisi dampak, asal, dan tujuannya.</p>

<p>Berlokasi di venue alami atau venue yang dipilih dengan cermat, perayaan ini merangkul kesederhanaan, material lokal, dan desain yang sadar lingkungan, membiarkan keindahan muncul lewat kesahajaan dan kesadaran.</p>

<blockquote><p>Di sini, keberlanjutan bukanlah sekadar estetika. Ia adalah filosofi yang membentuk setiap keputusan — dari material dan bunga hingga skala, sumber, dan pengalaman. Pilihan yang sadar. Material alami. Dan momen yang dipeluk dengan kepedulian bagi manusia sekaligus tempatnya.</p></blockquote>

<p>Linda Wiryani Design and Event Planning bekerja sama dengan jaringan venue ramah lingkungan, pengrajin lokal, dan pemasok yang bertanggung jawab yang dikurasi, memastikan setiap perayaan selaras dengan kepekaan lingkungan sekaligus standar desain yang halus.</p>

<h3>Yang Termasuk</h3>

<h4>Desain &amp; Koordinasi Upacara</h4>
<ul>
  <li>Perencanaan upacara pernikahan dan koordinasi pada hari-H oleh Linda Wiryani Design &amp; Event Planning (1 orang)</li>
  <li>Celebrant lokal berbahasa Inggris</li>
  <li>Sertifikat pernikahan kenang-kenangan dengan desain khusus</li>
  <li>Biaya akses venue sudah termasuk (bila berlaku)</li>
</ul>

<h4>Penataan Bunga <em>(Lokal &amp; Desain yang Sadar Lingkungan)</em></h4>
<ul>
  <li>Backdrop upacara ditata dengan perpaduan yang matang antara bunga segar lokal, dedaunan alami, dan beberapa elemen yang dapat digunakan kembali atau artifisial pilihan untuk meminimalkan limbah</li>
  <li>Kelopak bunga di sepanjang jalur upacara (bila sesuai dengan kondisi lingkungan)</li>
  <li>Rangkaian bunga di lorong upacara yang dipandu oleh kesederhanaan alami dan desain berdampak rendah</li>
  <li>Buket pengantin dari bunga segar lokal</li>
  <li>Boutonniere pengantin pria, selaras dengan keseluruhan palet bunga</li>
</ul>

<h4>Musik</h4>
<ul>
  <li>Gitaris solo atau pemain biola solo yang membawakan musik upacara yang bersahaja dan sarat suasana</li>
</ul>

<h4>Fotografi</h4>
<ul>
  <li>Fotografer profesional selama 1,5 jam (1 orang)</li>
  <li>Foto-foto pilihan terbaik yang dikurasi dan diedit dengan cermat</li>
  <li>Foto akhir dikirim dalam 1 minggu melalui tautan Google Drive pribadi</li>
</ul>

<h3>Catatan Penting</h3>
<ul>
  <li>Paket ini sengaja dikurasi agar tetap sederhana, elegan, dan sadar lingkungan</li>
  <li>Hanya item yang tercantum di atas yang termasuk</li>
  <li>Pemilihan desain dan material akan memprioritaskan keberlanjutan, sumber lokal, dan dampak lingkungan yang minimal</li>
  <li>Waktu upacara dan penataan akan disesuaikan dengan venue yang dipilih dan kondisi lingkungan</li>
  <li>Harga paket mulai dari <strong>IDR 25.000.000</strong></li>
  <li>Paket ini dirancang khusus untuk sepasang pengantin</li>
</ul>

<h3>Tidak Termasuk</h3>
<p>Hal-hal berikut dapat diatur secara terpisah sesuai permintaan: akomodasi atau menginap, transportasi (tersedia opsi ramah lingkungan sesuai permintaan), sistem suara atau peralatan audio tambahan, videografi atau drone, musisi tambahan atau hiburan langsung, tata rias rambut dan wajah, gaun pengantin, jas, atau aksesori, gladi resik yang melibatkan seluruh vendor, serta item apa pun yang tidak dicantumkan secara eksplisit dalam bagian Yang Termasuk.</p>

<h3>Cuaca &amp; Kondisi Alam</h3>
<p>Pernikahan Ramah Lingkungan &amp; Berkelanjutan sering berlangsung di lingkungan alami atau semi-terbuka, sehingga dipengaruhi oleh iklim dan kondisi lingkungan sekitar. Kondisi dapat meliputi hujan tropis yang datang tiba-tiba, angin dan aliran udara alami, panas dan kelembapan, serta variasi medan tergantung lokasi.</p>
<p>Karena upacara ini mengutamakan keselarasan dengan alam, kondisi lingkungan dirangkul dan bukan dikendalikan. Jika cuaca kurang mendukung, upacara dapat tetap berlangsung sesuai jadwal bila aman, dijeda sejenak atau dipindahkan ke area terlindung jika tersedia, atau elemen desain disesuaikan atau disederhanakan demi menjaga keselamatan sekaligus meminimalkan dampak lingkungan. Tidak akan ada instalasi struktural yang berlebihan atau solusi yang mengganggu lingkungan sebagai langkah cadangan.</p>
<p>Pasangan memahami bahwa perayaan yang sadar lingkungan dirancang selaras dengan alam, dan bahwa kondisi cuaca bukan alasan untuk pembatalan, pengembalian dana, atau penjadwalan ulang, kecuali disepakati lain secara tertulis.</p>

<h3>Ketentuan Pembayaran &amp; Pemesanan</h3>
<ul>
  <li>Deposit sebesar 50% yang tidak dapat dikembalikan diperlukan saat pemesanan dikonfirmasi</li>
  <li>Sisa pembayaran 50% harus dilunasi paling lambat 30 hari sebelum tanggal acara</li>
  <li>Tanggal acara belum dianggap terjamin sampai deposit diterima</li>
  <li>Seluruh pembayaran yang telah dilakukan tidak dapat dikembalikan kecuali dinyatakan lain secara tertulis</li>
  <li>Kegagalan melunasi sisa pembayaran sebelum batas waktu yang disepakati dapat mengakibatkan pembatalan layanan tanpa pengembalian deposit awal</li>
  <li>Setiap perubahan yang diminta pada venue, tanggal upacara, atau elemen desain setelah konfirmasi bergantung pada ketersediaan dan dapat dikenai biaya tambahan sesuai penyesuaian yang diperlukan</li>
  <li>Kebijakan venue, izin, dan pedoman keberlanjutan akan mengikuti peraturan masing-masing lokasi</li>
</ul>

<h3>Waktu Terbaik</h3>
<p>Pernikahan Ramah Lingkungan &amp; Berkelanjutan paling baik dinikmati pada waktu cahaya alami yang mengurangi dampak lingkungan dan meningkatkan kenyamanan.</p>
<ul>
  <li><strong>Pagi (Sekitar pukul 07.00 – 09.00)</strong> — Pagi hari menawarkan suhu yang lebih sejuk, cahaya yang lebih lembut, dan penggunaan energi yang lebih rendah. Suasananya terasa tenang, segar, dan selaras dengan ritme alam.</li>
  <li><strong>Sore Hari (Sekitar pukul 16.30 – 18.00)</strong> — Sore hari menghadirkan cahaya alami yang hangat dan suasana yang santai sekaligus meminimalkan kebutuhan akan pencahayaan buatan.</li>
</ul>
<p>Upacara pagi umumnya lebih disukai untuk dampak lingkungan yang lebih rendah dan kondisi yang lebih stabil. Waktu final akan dikonfirmasi berdasarkan kondisi cahaya alami, pertimbangan lingkungan, pedoman venue, serta kenyamanan dan pendekatan keberlanjutan secara keseluruhan.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939444/Eco_and_Sustainable_Weddings_twb9v2.png",
    gallery: [
      {
        id: "eco-sustainable-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939444/Eco_and_Sustainable_Weddings_twb9v2.png",
        sort_order: 0,
        theme_id: "eco-sustainable-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "sacred-spiritual-elopement",
    slug: "sacred-spiritual-elopement",
    type: "ELOPEMENT",
    title: "Elopement Sakral atau Spiritual",
    description: `<p>Elopement Sakral atau Spiritual dirancang untuk pasangan yang menyukai keheningan, niat, dan momen refleksi yang tenang. Upacara ini berpusat pada emosi dan bukan pada budaya, dipandu oleh keyakinan pribadi, makna bersama, dan kejernihan batin, bukan tradisi formal.</p>

<p>Berlokasi di lingkungan alam yang damai atau ruang arsitektural yang intim, perayaan ini berlangsung dengan kesederhanaan dan kedalaman. Upacara dapat mencakup janji pribadi, penetapan niat, berkat dalam keheningan, atau gestur simbolis seperti menyalakan lilin, ritual air yang lembut, atau momen meditasi bersama.</p>

<blockquote><p>Di sini, spiritualitas bukanlah pertunjukan. Ia bersifat personal, ke dalam, dan mendalam secara tenang. Momen keheningan. Niat yang dibagikan. Dan janji yang dipegang dengan lembut dalam sunyi.</p></blockquote>

<p>Linda Wiryani Design and Event Planning bekerja sama secara erat dengan setiap pasangan untuk membentuk upacara yang mencerminkan nilai dan perjalanan emosional mereka. Strukturnya fleksibel dan tidak mengharuskan kepatuhan pada kerangka agama atau budaya tertentu. Setiap detail dikurasi dengan kepekaan, rasa hormat, dan keaslian.</p>

<h3>Yang Termasuk</h3>

<h4>Desain &amp; Koordinasi Upacara</h4>
<ul>
  <li>Perencanaan upacara pernikahan dan koordinasi pada hari-H oleh Linda Wiryani Design &amp; Event Planning (1 orang)</li>
  <li>Celebrant atau fasilitator berbahasa Inggris</li>
  <li>Sertifikat pernikahan kenang-kenangan dengan desain khusus</li>
  <li>Biaya akses venue sudah termasuk (bila berlaku di lokasi yang dipilih)</li>
</ul>

<h4>Struktur Upacara</h4>
<ul>
  <li>Panduan janji pribadi dan perancangan alur upacara</li>
  <li>Elemen simbolis opsional (menyalakan lilin, penetapan niat, atau ritual air sederhana)</li>
  <li>Naskah upacara yang dikurasi dengan cermat sesuai keyakinan pasangan</li>
</ul>

<h4>Penataan Bunga <em>(Bunga Lokal | Halus &amp; Bersahaja)</em></h4>
<ul>
  <li>Penataan upacara dengan perpaduan harmonis bunga segar lokal, dedaunan alami, dan beberapa elemen artifisial pilihan, disusun dengan kesahajaan dan keseimbangan yang tenang</li>
  <li>Buket pengantin dari bunga lokal</li>
  <li>Boutonniere pengantin pria, selaras dengan keseluruhan palet</li>
</ul>

<h4>Musik <em>(Meditatif &amp; Minimalis)</em></h4>
<ul>
  <li>Sound healing (misalnya mangkuk Tibet atau mangkuk kristal), atau</li>
  <li>Suling bambu yang lembut (suling), atau</li>
  <li>Rindik, alat musik tradisional Bali yang terbuat terutama dari bambu, atau</li>
  <li>Keheningan alami, membiarkan lingkungan sekitar menjadi lanskap suara</li>
</ul>
<p><em>Musik sengaja dibuat bersahaja agar upacara tetap tenang, hadir, dan mengarah ke dalam.</em></p>

<h4>Fotografi</h4>
<ul>
  <li>Fotografer profesional selama 1,5 jam (1 orang)</li>
  <li>Foto-foto pilihan terbaik yang dikurasi dan diedit dengan cermat</li>
  <li>Foto akhir dikirim dalam 1 minggu melalui tautan Google Drive pribadi</li>
</ul>

<h3>Catatan Penting</h3>
<ul>
  <li>Paket ini sengaja dikurasi agar tetap sederhana, elegan, dan berpusat pada kehadiran emosional</li>
  <li>Hanya item yang tercantum di atas yang termasuk</li>
  <li>Waktu upacara akan dikonfirmasi berdasarkan venue yang dipilih dan suasana yang diinginkan</li>
  <li>Waktu pagi buta atau jam cahaya siang yang lembut sering direkomendasikan untuk mendukung ketenangan, kejernihan, dan fokus</li>
  <li>Elopement Sakral &amp; Spiritual bersifat personal dan universal, serta tidak terikat pada agama atau kerangka budaya tertentu</li>
  <li>Harga paket mulai dari <strong>IDR 30.000.000</strong></li>
  <li>Paket ini dirancang khusus untuk sepasang pengantin</li>
</ul>

<h3>Tidak Termasuk</h3>
<p>Hal-hal berikut dapat diatur secara terpisah sesuai permintaan: akomodasi atau menginap, transportasi, sistem suara atau peralatan audio tambahan (jika diperlukan di luar pendekatan minimal), videografi atau drone, musisi tambahan atau fasilitator upacara, tata rias rambut dan wajah, gaun pengantin, jas, atau aksesori, gladi resik yang melibatkan seluruh vendor, serta item apa pun yang tidak dicantumkan secara eksplisit dalam bagian Yang Termasuk.</p>

<h3>Cuaca &amp; Kondisi Alam</h3>
<p>Elopement Sakral &amp; Spiritual dapat berlangsung di lingkungan luar ruangan maupun semi-terbuka, sehingga dipengaruhi oleh kondisi alam. Kondisi dapat meliputi hujan mendadak atau cuaca yang berubah-ubah, angin atau pergerakan alam sekitar, serta variasi cahaya dan suhu tergantung lokasi.</p>
<p>Karena upacara ini dirancang agar tetap fleksibel dan responsif, kondisi lingkungan dirangkul sebagai bagian dari pengalaman. Jika cuaca kurang mendukung, upacara dapat tetap berlangsung sesuai jadwal bila aman, dijeda sejenak hingga kondisi mereda, dipindahkan ke area terlindung atau dalam ruangan jika tersedia, atau elemen upacara disederhanakan demi menjaga ketenangan dan kesinambungan.</p>
<p>Pasangan memahami bahwa kondisi alam merupakan bagian dari lokasi ini dan bukan alasan untuk pembatalan, pengembalian dana, atau penjadwalan ulang, kecuali disepakati lain secara tertulis.</p>

<h3>Ketentuan Pembayaran &amp; Pemesanan</h3>
<ul>
  <li>Deposit sebesar 50% yang tidak dapat dikembalikan diperlukan saat pemesanan dikonfirmasi</li>
  <li>Sisa pembayaran 50% harus dilunasi paling lambat 30 hari sebelum tanggal acara</li>
  <li>Tanggal acara belum dianggap terjamin sampai deposit diterima</li>
  <li>Seluruh pembayaran yang telah dilakukan tidak dapat dikembalikan kecuali dinyatakan lain secara tertulis</li>
  <li>Kegagalan melunasi sisa pembayaran sebelum batas waktu yang disepakati dapat mengakibatkan pembatalan layanan tanpa pengembalian deposit awal</li>
  <li>Setiap perubahan yang diminta pada tanggal upacara, lokasi, atau struktur setelah konfirmasi bergantung pada ketersediaan dan dapat dikenai biaya tambahan sesuai penyesuaian yang diperlukan</li>
  <li>Biaya akses venue dan izin yang berlaku mengikuti kebijakan masing-masing lokasi</li>
</ul>

<h3>Waktu Terbaik</h3>
<p>Elopement Sakral &amp; Spiritual paling indah dinikmati pada waktu yang mendukung ketenangan, fokus, dan kehadiran emosional.</p>
<ul>
  <li><strong>Pagi (Sekitar pukul 07.00 – 09.00)</strong> — Pagi hari menawarkan keheningan, kejernihan, dan lingkungan yang sunyi. Suasananya terasa segar, membumi, dan tak terganggu — ideal untuk refleksi batin dan momen yang penuh niat.</li>
  <li><strong>Sore Hari (Sekitar pukul 16.30 – 18.00)</strong> — Sore hari menghadirkan cahaya yang lebih lembut dan peralihan yang tenang menuju malam, menciptakan suasana yang hangat dan reflektif.</li>
</ul>
<p>Upacara pagi umumnya direkomendasikan untuk keheningan yang lebih dalam dan gangguan eksternal yang minimal. Waktu final akan dipandu oleh nuansa emosional upacara yang diinginkan, kondisi cahaya alami, ketenangan lingkungan, serta suasana dan aksesibilitas venue.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939444/Sacred_or_Spiritual_Elopement_eelmde.png",
    gallery: [
      {
        id: "sacred-spiritual-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939444/Sacred_or_Spiritual_Elopement_eelmde.png",
        sort_order: 0,
        theme_id: "sacred-spiritual-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "cultural-heritage-elopement",
    slug: "cultural-heritage-elopement",
    type: "ELOPEMENT",
    title: "Upacara Bernuansa Budaya & Warisan",
    description: `<p>Upacara Bernuansa Budaya &amp; Warisan dirancang untuk pasangan yang ingin menghormati tradisi dengan cara yang halus, bermakna, dan relevan secara pribadi. Upacara ini tidak ditentukan oleh formalitas yang kaku, melainkan oleh interpretasi yang matang — di mana elemen budaya dipilih dengan cermat, diadaptasi dengan hormat, dan berpadu mulus ke dalam perayaan yang kontemporer.</p>

<p>Berlokasi di venue yang dikurasi, mulai dari vila pribadi hingga ruang bernuansa warisan budaya, upacara berlangsung dengan niat, simbolisme, dan rasa hormat yang tenang.</p>

<blockquote><p>Di sini, tradisi tidak ditampilkan secara utuh. Ia disaring, disempurnakan, dan diungkapkan dengan kejernihan dan rasa hormat. Sebuah gestur yang bermakna. Sebuah rasa warisan. Dan momen yang menjembatani masa lalu dan masa kini.</p></blockquote>

<p>Linda Wiryani Design and Event Planning mendekati setiap upacara budaya dengan kepekaan dan kepedulian, memastikan setiap elemen autentik sekaligus terkontekstualisasi dengan tepat. Rujukan budaya dapat berupa budaya Bali, Indonesia, atau terinspirasi dari warisan budaya pasangan sendiri.</p>

<h3>Yang Termasuk</h3>

<h4>Desain &amp; Koordinasi Upacara</h4>
<ul>
  <li>Perencanaan upacara pernikahan dan koordinasi pada hari-H oleh Linda Wiryani Design &amp; Event Planning (1 orang)</li>
  <li>Celebrant atau fasilitator budaya berbahasa Inggris (bila berlaku)</li>
  <li>Sertifikat pernikahan kenang-kenangan dengan desain khusus</li>
  <li>Biaya akses venue sudah termasuk (bila berlaku)</li>
</ul>

<h4>Elemen Upacara Budaya <em>(Terkurasi &amp; Halus)</em></h4>
<ul>
  <li>Panduan dalam memilih elemen budaya atau simbolis yang bermakna</li>
  <li>Alur upacara yang disederhanakan dan dikurasi dengan cermat</li>
  <li>Pilihan untuk menyertakan gestur tradisional (diadaptasi dengan hormat), seperti ritual pemberkatan, elemen persembahan, dan pertukaran simbolis</li>
  <li>Koordinasi dengan praktisi budaya setempat bila sesuai</li>
</ul>

<h4>Penataan Bunga <em>(Bunga Lokal | Halus &amp; Kontekstual)</em></h4>
<ul>
  <li>Penataan upacara dengan perpaduan harmonis bunga segar lokal, dedaunan alami, dan beberapa elemen artifisial pilihan</li>
  <li>Desain disesuaikan untuk mencerminkan nuansa budaya sambil tetap menjaga estetika halus khas Linda Wiryani Design and Event Planning</li>
  <li>Buket pengantin dari bunga lokal</li>
  <li>Boutonniere pengantin pria, selaras dengan keseluruhan palet</li>
</ul>

<h4>Musik <em>(Halus &amp; Kontekstual)</em></h4>
<ul>
  <li>Musik tradisional atau instrumental yang lembut bila sesuai, atau iringan modern minimal yang selaras dengan nada upacara</li>
</ul>
<p><em>Musik dikurasi untuk mendukung suasana tanpa menutupi upacara.</em></p>

<h4>Fotografi</h4>
<ul>
  <li>Fotografer profesional selama 1,5 jam (1 orang)</li>
  <li>Foto-foto pilihan terbaik yang dikurasi dan diedit dengan cermat</li>
  <li>Foto akhir dikirim dalam 1 minggu melalui tautan Google Drive pribadi</li>
</ul>

<h3>Catatan Penting</h3>
<ul>
  <li>Paket ini sengaja dikurasi agar tetap halus, penuh hormat, dan tidak terlalu seremonial</li>
  <li>Hanya elemen budaya pilihan yang akan dimasukkan, bukan ritual tradisional secara utuh</li>
  <li>Upacara disesuaikan dengan kenyamanan, sistem kepercayaan, dan tingkat keterlibatan budaya pasangan</li>
  <li>Kepekaan dan kepantasan budaya selalu diutamakan</li>
  <li>Harga paket mulai dari <strong>IDR 35.000.000</strong></li>
  <li>Paket ini dirancang khusus untuk sepasang pengantin</li>
</ul>

<h3>Tidak Termasuk</h3>
<p>Hal-hal berikut dapat diatur secara terpisah sesuai permintaan: upacara tradisional atau keagamaan secara penuh, ritual seremonial ekstensif yang memerlukan beberapa praktisi, tata rias rambut dan wajah, busana tradisional (kebaya, kain dan/atau sarung, aksesori), penampil budaya tambahan, akomodasi atau menginap, transportasi, videografi atau drone, serta item apa pun yang tidak dicantumkan secara eksplisit dalam bagian Yang Termasuk.</p>

<h3>Cuaca &amp; Kondisi Alam</h3>
<p>Upacara Bernuansa Budaya &amp; Warisan dapat berlangsung di lingkungan luar ruangan atau semi-terbuka sehingga tunduk pada kondisi alam. Cuaca, cahaya, dan faktor lingkungan berada di luar kendali Planner. Jika cuaca kurang mendukung, upacara dapat tetap berlangsung sesuai jadwal bila aman, dijeda sejenak atau dipindahkan ke ruang beratap atau dalam ruangan jika tersedia, atau elemen seremonial tertentu disederhanakan atau disesuaikan. Kondisi cuaca bukan alasan untuk pembatalan, pengembalian dana, atau penjadwalan ulang, kecuali disepakati lain secara tertulis.</p>

<h3>Waktu Terbaik</h3>
<p>Upacara budaya paling baik dinikmati pada saat-saat ketenangan dan keseimbangan alami.</p>
<ul>
  <li><strong>Pagi (Sekitar pukul 07.00 – 09.00)</strong> — Cahaya lembut dan suasana yang tenang mendukung upacara yang penuh hormat dan membumi.</li>
  <li><strong>Sore Hari (Sekitar pukul 16.30 – 18.00)</strong> — Warna-warna hangat menciptakan latar yang lebih sarat suasana dan kaya secara visual.</li>
</ul>
<p>Waktu final akan dipandu oleh alur budaya upacara, kondisi cahaya, suasana venue, dan atmosfer secara keseluruhan.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939445/Cultural_Heritage-Inspired_Ceremonies_muscyz.png",
    gallery: [
      {
        id: "cultural-heritage-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939445/Cultural_Heritage-Inspired_Ceremonies_muscyz.png",
        sort_order: 0,
        theme_id: "cultural-heritage-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "sunrise-purification-elopement",
    slug: "sunrise-purification-elopement",
    type: "ELOPEMENT",
    title: "Momen Matahari Terbit atau Penyucian",
    description: `<p>Momen Matahari Terbit atau Penyucian dirancang untuk pasangan yang menyukai pembaruan, kejernihan, dan awal yang tenang. Upacara ini dibentuk oleh peralihan cahaya yang lembut atau tindakan simbolis pembersihan, menandai ambang yang bermakna menuju babak baru.</p>

<p>Berlangsung pada jam-jam awal hari atau di lingkungan berbasis air yang damai, pengalaman ini berlangsung dengan niat yang tenang, cahaya yang lembut, dan rasa penyegaran emosional.</p>

<blockquote><p>Di sini, momen tidak ditentukan oleh skala. Ia ditentukan oleh kehadiran, keheningan, dan transformasi yang tenang. Cahaya pertama. Air yang tenang. Dan sebuah awal yang dipegang dengan lembut dalam ketenangan.</p></blockquote>

<p>Linda Wiryani Design and Event Planning mendekati upacara ini dengan kepekaan dan kesahajaan — memberi ruang bagi refleksi, rasa membumi, dan gestur simbolis yang terasa personal dan tidak dipaksakan.</p>

<h3>Yang Termasuk</h3>

<h4>Desain &amp; Koordinasi Upacara</h4>
<ul>
  <li>Perencanaan upacara pernikahan dan koordinasi pada hari-H oleh Linda Wiryani Design &amp; Event Planning (1 orang)</li>
  <li>Celebrant atau fasilitator berbahasa Inggris</li>
  <li>Sertifikat pernikahan kenang-kenangan dengan desain khusus</li>
  <li>Biaya akses venue sudah termasuk (bila berlaku di lokasi yang dipilih)</li>
</ul>

<h4>Struktur Upacara <em>(Pembaruan &amp; Niat)</em></h4>
<ul>
  <li>Alur upacara terpandu yang berfokus pada awal yang baru, refleksi, dan penetapan niat</li>
  <li>Elemen simbolis opsional seperti penyucian dengan air atau ritual pembersihan yang lembut, refleksi atau meditasi dalam keheningan, serta pertukaran janji pribadi atau penetapan niat</li>
  <li>Naskah upacara yang dikurasi dengan cermat sesuai perjalanan emosional pasangan</li>
</ul>

<h4>Penataan Bunga <em>(Bunga Lokal | Ringan &amp; Minimalis)</em></h4>
<ul>
  <li>Penataan upacara dengan perpaduan halus bunga segar lokal, dedaunan alami, dan beberapa elemen artifisial pilihan</li>
  <li>Dirancang dengan keringanan dan kesahajaan untuk melengkapi kelembutan suasana pagi atau lingkungan berbasis air</li>
  <li>Buket pengantin dari bunga lokal</li>
  <li>Boutonniere pengantin pria, selaras dengan keseluruhan palet</li>
</ul>

<h4>Musik <em>(Lembut &amp; Reflektif)</em></h4>
<ul>
  <li>Sound healing (misalnya mangkuk Tibet atau mangkuk kristal), atau</li>
  <li>Suling bambu yang lembut (suling), atau</li>
  <li>Rindik, alat musik tradisional Bali yang terbuat terutama dari bambu, atau</li>
  <li>Keheningan alami, membiarkan lingkungan membentuk lanskap suara</li>
</ul>
<p><em>Musik tetap minimal dan tidak mengganggu.</em></p>

<h4>Fotografi</h4>
<ul>
  <li>Fotografer profesional selama 1,5 jam (1 orang)</li>
  <li>Foto-foto pilihan terbaik yang dikurasi dan diedit dengan cermat</li>
  <li>Foto akhir dikirim dalam 1 minggu melalui tautan Google Drive pribadi</li>
</ul>

<h3>Catatan Penting</h3>
<ul>
  <li>Paket ini sengaja dikurasi agar tetap tenang, minimalis, dan berpusat pada emosi</li>
  <li>Hanya item yang tercantum di atas yang termasuk</li>
  <li>Waktu upacara merupakan inti dari pengalaman ini dan akan direncanakan dengan cermat di sekitar matahari terbit atau momen cahaya siang yang tenang</li>
  <li>Elemen penyucian bersifat simbolis dan diadaptasi dengan hormat, tanpa mengharuskan upacara keagamaan penuh kecuali diminta</li>
  <li>Pengalaman ini dirancang agar terasa personal, membumi, dan tidak terburu-buru</li>
  <li>Harga paket mulai dari <strong>IDR 35.000.000</strong></li>
  <li>Paket ini dirancang khusus untuk sepasang pengantin</li>
</ul>

<h3>Tidak Termasuk</h3>
<p>Hal-hal berikut dapat diatur secara terpisah sesuai permintaan: akomodasi atau menginap, transportasi (mungkin diperlukan pengaturan pagi buta), sistem suara atau peralatan audio tambahan, videografi atau drone, fasilitator atau praktisi upacara tambahan, tata rias rambut dan wajah, busana atau penataan pengantin, gladi resik yang melibatkan seluruh vendor, serta item apa pun yang tidak dicantumkan secara eksplisit dalam bagian Yang Termasuk.</p>

<h3>Cuaca &amp; Kondisi Alam</h3>
<p>Upacara matahari terbit atau penyucian sering berlangsung di lingkungan luar ruangan atau berbasis air dan tunduk pada kondisi alam. Kondisi dapat meliputi kabut pagi buta atau jarak pandang rendah, perubahan cuaca mendadak, suhu yang lebih dingin, kondisi air tergantung lokasi, serta medan alami dan aksesibilitas.</p>
<p>Karena upacara ini dipandu oleh waktu dan lingkungan alami, kondisi berada di luar kendali kami. Jika cuaca kurang mendukung, upacara dapat tetap berlangsung bila aman, dijeda sejenak hingga kondisi membaik, dipindahkan ke area terlindung di dekatnya jika tersedia, atau elemen simbolis disederhanakan atau disesuaikan.</p>
<p>Pasangan memahami bahwa kondisi alam merupakan bagian dari pengalaman ini dan bukan alasan untuk pembatalan, pengembalian dana, atau penjadwalan ulang, kecuali disepakati lain secara tertulis.</p>

<h3>Ketentuan Pembayaran &amp; Pemesanan</h3>
<ul>
  <li>Deposit sebesar 50% yang tidak dapat dikembalikan diperlukan saat konfirmasi</li>
  <li>Sisa pembayaran 50% harus dilunasi paling lambat 30 hari sebelum tanggal acara</li>
  <li>Tanggal acara belum dianggap terjamin sampai deposit diterima</li>
  <li>Seluruh pembayaran yang telah dilakukan tidak dapat dikembalikan kecuali dinyatakan lain secara tertulis</li>
  <li>Kegagalan menyelesaikan pembayaran sebelum batas waktu yang disepakati dapat mengakibatkan pembatalan layanan tanpa pengembalian dana</li>
  <li>Setiap perubahan yang diminta pada waktu upacara, lokasi, atau struktur setelah konfirmasi bergantung pada ketersediaan dan dapat dikenai biaya tambahan sesuai penyesuaian yang diperlukan</li>
  <li>Akses venue dan izin (jika berlaku) mengikuti kebijakan masing-masing lokasi</li>
</ul>

<h3>Waktu Terbaik</h3>
<p>Waktu adalah inti dari pengalaman ini.</p>
<ul>
  <li><strong>Matahari Terbit (Sekitar pukul 06.00 – 07.30)</strong> — Waktu yang paling direkomendasikan. Cahayanya lembut, suasananya hening, dan lingkungan terasa sunyi serta tak terganggu. Ini menciptakan latar yang paling selaras untuk refleksi dan pembaruan.</li>
  <li><strong>Pagi Buta (Hingga pukul 09.00)</strong> — Masih cocok untuk upacara yang tenang, meskipun cahaya menjadi lebih terang dan aktivitas dapat meningkat secara bertahap.</li>
</ul>
<p>Waktu matahari terbit sangat direkomendasikan untuk keheningan dan privasi maksimal, cahaya alami yang lembut dan menyebar, suasana emosional yang kuat, serta keselarasan dengan tema simbolis pembaruan. Waktu final akan dipandu oleh variasi waktu matahari terbit, aksesibilitas lokasi, kondisi lingkungan, dan nuansa emosional yang diinginkan.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939445/Sunrise_or_Purification_vfhluk.png",
    gallery: [
      {
        id: "sunrise-purification-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939445/Sunrise_or_Purification_vfhluk.png",
        sort_order: 0,
        theme_id: "sunrise-purification-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "editorial-luxury-elopement",
    slug: "editorial-luxury-elopement",
    type: "ELOPEMENT",
    title: "Penceritaan Editorial yang Tetap Manusiawi",
    description: `<p>Di Linda Wiryani Design and Event Planning, kami menciptakan elopement mewah di Bali yang terasa seperti editorial yang dikurasi dengan indah — namun tetap sangat personal dan nyata secara emosional. Sebagai perencana dan desainer elopement di Bali, karya kami berakar pada fashion, desain, dan keramahtamahan bintang lima. Setiap perayaan diarahkan secara artistik dengan cermat, menyeimbangkan estetika yang halus dengan koneksi manusia yang tulus.</p>

<blockquote><p>Setiap detail disengaja. Setiap momen disusun dengan saksama. Namun tak ada yang terasa dibuat-buat atau berjarak. Pendekatan kami terhadap pernikahan elopement di Bali adalah menciptakan suasana yang terasa mengalir dan lekat dengan kehidupan — elegan, namun hangat; halus secara visual, namun jujur secara emosional.</p></blockquote>

<p>Setiap elopement Linda Wiryani Design and Event Planning di Bali tidak pernah ditentukan oleh tren, melainkan oleh tempat, emosi, dan niat. Dari vila pribadi di Uluwatu, lanskap damai di Ubud, hingga lokasi pesisir tersembunyi di seluruh Bali — setiap pernikahan dikurasi dengan cermat agar terasa abadi, bukan sementara. Indah, tertata, dan selalu jujur secara emosional.</p>

<h3>Pengalaman Elopement Kami Meliputi</h3>
<ul>
  <li><strong>Elopement Editorial atau Fashion-Forward di Bali</strong> — Elopement bergaya couture yang dirancang dengan arahan visual yang kuat, ideal untuk pasangan yang mendambakan pernikahan bergaya editorial yang halus di Bali.</li>
  <li><strong>Elopement Intim Bergaya Rumahan</strong> — Pertemuan hangat dan personal yang dirancang seputar kedekatan, kenyamanan, dan alur yang alami.</li>
  <li><strong>Elopement Quiet Luxury di Bali</strong> — Perayaan bersahaja dan berkelas di mana keindahan diungkapkan lewat nada, tekstur, dan emosi — ciri khas pernikahan mewah modern di Bali.</li>
</ul>

<h3>Yang Termasuk</h3>

<h4>Desain &amp; Koordinasi Upacara</h4>
<ul>
  <li>Perencanaan upacara pernikahan dan koordinasi pada hari-H (1 orang)</li>
  <li>Celebrant lokal berbahasa Inggris</li>
  <li>Sertifikat pernikahan kenang-kenangan dengan desain khusus</li>
  <li>Koordinasi akses venue (akses dasar saja)</li>
</ul>

<h4>Penataan Bunga <em>(Komposisi Halus &amp; Alami)</em></h4>
<ul>
  <li>Backdrop upacara menggunakan bunga lokal, dedaunan, dan beberapa elemen artifisial pilihan</li>
  <li>Rangkaian bunga di lorong upacara dengan gerak organik yang alami</li>
  <li>Kelopak bunga di sepanjang jalur upacara</li>
  <li>Buket pengantin dan boutonniere pengantin pria</li>
</ul>

<h4>Musik</h4>
<ul>
  <li>Gitaris solo atau pemain biola solo untuk upacara yang intim dan sarat suasana</li>
</ul>

<h4>Fotografi</h4>
<ul>
  <li>Fotografer profesional (2 jam, 1 orang)</li>
  <li>Foto pilihan terbaik yang telah diedit</li>
  <li>Pengiriman dalam 7 hari melalui galeri online pribadi</li>
</ul>

<h3>Catatan Penting</h3>
<ul>
  <li>Pengalaman ini sengaja dikurasi agar tetap sederhana, halus, dan berfokus pada momen upacara itu sendiri</li>
  <li>Hanya item yang tercantum di atas yang termasuk</li>
  <li>Semua elemen tambahan dapat diatur sesuai permintaan</li>
  <li>Waktu upacara akan dikonfirmasi berdasarkan cahaya alami, kondisi lokasi, dan alur lingkungan secara keseluruhan</li>
  <li>Harga paket mulai dari <strong>IDR 35.000.000</strong></li>
  <li>Paket ini dirancang khusus untuk sepasang pengantin</li>
</ul>

<h3>Tidak Termasuk</h3>
<p>Tersedia sesuai permintaan dengan biaya tambahan: biaya venue atau lokasi (jika diperlukan), akomodasi, transportasi, sistem suara atau tambahan perangkat audio, videografi atau drone, musisi atau hiburan tambahan, tata rias rambut dan wajah, busana dan aksesori pengantin, serta gladi resik bersama seluruh tim vendor.</p>

<h3>Cuaca &amp; Kondisi Alam</h3>
<p>Elopement di luar ruangan dan tepi sungai di Bali dipengaruhi oleh unsur alam seperti cuaca, kelembapan, aliran air, dan medan. Jika turun hujan atau kondisi berubah, upacara dapat dijeda sejenak, penyesuaian dapat dilakukan pada posisi atau penataan, dan gaya dapat disempurnakan demi menjamin keselamatan dan keselarasan. Tidak ada jaminan venue cadangan dalam ruangan yang bersifat tetap kecuali disediakan oleh venue. Kondisi alam ini merupakan bagian dari pengalaman dan tidak dianggap sebagai alasan pembatalan atau pengembalian dana.</p>

<h3>Pembayaran &amp; Pemesanan</h3>
<ul>
  <li>Deposit sebesar 50% yang tidak dapat dikembalikan diperlukan saat konfirmasi</li>
  <li>Sisa pembayaran 50% jatuh tempo 30 hari sebelum acara</li>
  <li>Tanggal baru terjamin setelah deposit diterima</li>
  <li>Seluruh pembayaran tidak dapat dikembalikan kecuali disepakati lain secara tertulis</li>
  <li>Perubahan tanggal, venue, atau desain setelah konfirmasi bergantung pada ketersediaan dan dapat dikenai biaya tambahan</li>
</ul>

<h3>Waktu Terbaik</h3>
<p>Elopement dirancang di sekitar cahaya alami dan keselarasan dengan lingkungan.</p>
<ul>
  <li><strong>Pagi (07.00 – 09.00)</strong> — Cahaya lembut, suhu lebih sejuk, dan suasana yang tenang dan sunyi.</li>
  <li><strong>Sore Hari (16.30 – 18.00)</strong> — Warna-warna hangat, bayangan yang lebih lembut, dan latar yang lebih sarat suasana.</li>
</ul>
<p>Waktu final akan dipandu oleh arah cahaya, pola cuaca, kondisi lokasi, serta kenyamanan dan keselamatan secara keseluruhan.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939444/Editorial_yet_human_storytelling_xnjqzv.png",
    gallery: [
      {
        id: "editorial-luxury-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939444/Editorial_yet_human_storytelling_xnjqzv.png",
        sort_order: 0,
        theme_id: "editorial-luxury-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  // ─── INTIMATE THEMES ──────────────────────────────────────────────────────

  {
    id: "private-villa-estate",
    slug: "private-villa-estate",
    type: "INTIMATE",
    title: "Pernikahan Estat Vila Pribadi",
    description: `<p>Sambut orang-orang terdekat Anda di estat vila eksklusif dengan arsitektur memukau dan taman yang terawat. Pernikahan Estat Vila Pribadi dirancang untuk pasangan yang menginginkan perayaan yang halus dan tidak terburu-buru, sepenuhnya milik mereka sendiri — di mana setiap detail ruang bekerja selaras dengan upacara.</p>

<p>Lokasi ini menawarkan privasi penuh, kemungkinan penataan yang dibuat khusus, dan suasana yang dibentuk oleh arsitektur serta lanskap estat itu sendiri. Baik terselip di antara taman tropis maupun berlatar pemandangan luas, setiap vila menjadi latar hidup bagi hari terpenting Anda.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1768446142/Wedding_1_fyzchu.jpg",
    gallery: [
      {
        id: "private-villa-estate-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1768446142/Wedding_1_fyzchu.jpg",
        sort_order: 0,
        theme_id: "private-villa-estate",
      },
      {
        id: "private-villa-estate-img-2",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1768446128/Wedding_2_pbz9so.jpg",
        sort_order: 1,
        theme_id: "private-villa-estate",
      },
      {
        id: "private-villa-estate-img-3",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1768446105/Lifestyle_1_rka2va.jpg",
        sort_order: 2,
        theme_id: "private-villa-estate",
      },
      {
        id: "private-villa-estate-img-4",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1768446105/Lifestyle_2_iplagw.jpg",
        sort_order: 3,
        theme_id: "private-villa-estate",
      },
      {
        id: "private-villa-estate-img-5",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1768446107/Lifestyle_5_nhlcqw.jpg",
        sort_order: 4,
        theme_id: "private-villa-estate",
      },
    ],
    venue_id: "10",
    venue: getVenue("10"),
    experience_id: "2",
    experience: getExp("2"),
  },
  {
    id: "luxury-resort-intimate",
    slug: "luxury-resort-intimate",
    type: "INTIMATE",
    title: "Pernikahan Intim di Resor Mewah",
    description: `<p>Rasakan keramahtamahan kelas dunia dan venue yang memukau di properti resor bergengsi. Pernikahan Intim di Resor Mewah dirancang untuk pasangan yang menginginkan kemudahan dan kehalusan latar kelas dunia — tanpa skala acara yang besar.</p>

<p>Perayaan ini berlangsung di properti resor pilihan yang menyediakan fasilitas pernikahan khusus, staf acara profesional, dan katering kelas atas. Dari paviliun tepi pantai hingga teras di atas tebing, setiap venue membawa karakternya sendiri yang khas ke dalam perayaan Anda.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878596/BAL_1453_e7hd8w.jpg",
    gallery: [
      {
        id: "luxury-resort-intimate-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767878596/BAL_1453_e7hd8w.jpg",
        sort_order: 0,
        theme_id: "luxury-resort-intimate",
      },
      {
        id: "luxury-resort-intimate-img-2",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767878580/BAL_1451_dhfxcj.jpg",
        sort_order: 1,
        theme_id: "luxury-resort-intimate",
      },
      {
        id: "luxury-resort-intimate-img-3",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767878569/BAL_1210_gktw4p.jpg",
        sort_order: 2,
        theme_id: "luxury-resort-intimate",
      },
      {
        id: "luxury-resort-intimate-img-4",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767878582/BAL_1330_screen-hi-res_dym0xt.jpg",
        sort_order: 3,
        theme_id: "luxury-resort-intimate",
      },
      {
        id: "luxury-resort-intimate-img-5",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767878565/BAL_1338_screen-hi-res_hf0l9e.jpg",
        sort_order: 4,
        theme_id: "luxury-resort-intimate",
      },
      {
        id: "luxury-resort-intimate-img-6",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767878570/BAL_1429_vf3mvt.jpg",
        sort_order: 5,
        theme_id: "luxury-resort-intimate",
      },
    ],
    venue_id: "23",
    venue: getVenue("23"),
    experience_id: "2",
    experience: getExp("2"),
  },
  {
    id: "garden-riverside",
    slug: "garden-riverside",
    type: "INTIMATE",
    title: "Pernikahan Taman & Tepi Sungai",
    description: `<p>Rayakan di tengah bunga yang mekar dan air yang mengalir di taman alam yang damai. Pernikahan Taman &amp; Tepi Sungai merangkul ritme lembut dunia alami — di mana suara air, kelembutan dedaunan, dan langit terbuka berpadu menaungi upacara Anda dalam keindahan yang tenang dan organik.</p>

<p>Perayaan ini dibentuk oleh lanskap itu sendiri. Hamparan rumput tepi sungai yang rimbun, teras taman berbunga, dan paviliun terbuka menghadirkan suasana yang terasa romantis tanpa dibuat-buat sekaligus membumi dalam alam.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769608324/Wedding_3_demaoq.png",
    gallery: [
      {
        id: "garden-riverside-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769608324/Wedding_3_demaoq.png",
        sort_order: 0,
        theme_id: "garden-riverside",
      },
      {
        id: "garden-riverside-img-2",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769608323/Wedding_1_zgtm4d.png",
        sort_order: 1,
        theme_id: "garden-riverside",
      },
      {
        id: "garden-riverside-img-3",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769608331/Wedding_2_sxvamv.png",
        sort_order: 2,
        theme_id: "garden-riverside",
      },
      {
        id: "garden-riverside-img-4",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769608324/Wedding_4_wynsx3.png",
        sort_order: 3,
        theme_id: "garden-riverside",
      },
    ],
    venue_id: "30",
    venue: getVenue("30"),
    experience_id: "2",
    experience: getExp("2"),
  },
  {
    id: "cultural-architectural",
    slug: "cultural-architectural",
    type: "INTIMATE",
    title: "Latar Budaya & Arsitektur",
    description: `<p>Hormati tradisi di venue yang menampilkan kekayaan warisan budaya dan arsitektur Bali yang memukau. Latar Budaya &amp; Arsitektur dirancang untuk pasangan yang tertarik pada kedalaman sebuah tempat — perayaan yang berlangsung di halaman pura, estat warisan, dan venue di mana kesenian Bali dan desain ruang menghadirkan upacaranya sendiri yang tenang.</p>

<p>Pernikahan ini dibentuk sama besarnya oleh karakter venue dan oleh visi pasangan itu sendiri. Elemen seremonial dijalin dengan cermat ke dalam latar, menciptakan perayaan yang terasa berakar, bermakna, dan luar biasa secara visual.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769236708/Wedding_5_ucfdpj.jpg",
    gallery: [
      {
        id: "cultural-architectural-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769236708/Wedding_5_ucfdpj.jpg",
        sort_order: 0,
        theme_id: "cultural-architectural",
      },
      {
        id: "cultural-architectural-img-2",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769236705/Wedding_3_pnefn2.jpg",
        sort_order: 1,
        theme_id: "cultural-architectural",
      },
      {
        id: "cultural-architectural-img-3",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769236703/Wedding_2_u5yqq8.jpg",
        sort_order: 2,
        theme_id: "cultural-architectural",
      },
      {
        id: "cultural-architectural-img-4",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769236704/Wedding_1_t2ksqq.jpg",
        sort_order: 3,
        theme_id: "cultural-architectural",
      },
      {
        id: "cultural-architectural-img-5",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769236705/Wedding_4_bssvtq.jpg",
        sort_order: 4,
        theme_id: "cultural-architectural",
      },
      {
        id: "cultural-architectural-img-6",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769236708/Wedding_6_otcjrs.jpg",
        sort_order: 5,
        theme_id: "cultural-architectural",
      },
      {
        id: "cultural-architectural-img-7",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769236705/Wedding_7_nnurto.jpg",
        sort_order: 6,
        theme_id: "cultural-architectural",
      },
    ],
    venue_id: "19",
    venue: getVenue("19"),
    experience_id: "2",
    experience: getExp("2"),
  },
  {
    id: "destination-intimate",
    slug: "destination-intimate",
    type: "INTIMATE",
    title: "Perayaan Intim di Destinasi",
    description: `<p>Ciptakan kenangan tak terlupakan di venue destinasi unik yang membingkai kisah cinta Anda dengan sempurna. Perayaan Intim di Destinasi dirancang untuk pasangan yang memilih untuk bepergian — merayakan di tempat yang menyimpan makna, keindahan, dan rasa kedatangan.</p>

<p>Pernikahan ini berlangsung di venue yang dipilih karena panorama, karakter yang khas, dan perasaan yang dihadirkan saat tiba. Baik bertengger di atas samudra, terselip di antara sawah berteras, atau menghadap kawah gunung berapi, setiap lokasi menjadi bagian penting dari kisah Anda.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767511823/Wedding_2_byu1us.jpg",
    gallery: [
      {
        id: "destination-intimate-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767511823/Wedding_2_byu1us.jpg",
        sort_order: 0,
        theme_id: "destination-intimate",
      },
      {
        id: "destination-intimate-img-2",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767511815/Wedding_1_nlta08.jpg",
        sort_order: 1,
        theme_id: "destination-intimate",
      },
      {
        id: "destination-intimate-img-3",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767511826/Wedding_3_risbjp.jpg",
        sort_order: 2,
        theme_id: "destination-intimate",
      },
      {
        id: "destination-intimate-img-4",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767511813/Wedding_4_c98b0e.jpg",
        sort_order: 3,
        theme_id: "destination-intimate",
      },
      {
        id: "destination-intimate-img-5",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767511820/Wedding_5_sersgy.jpg",
        sort_order: 4,
        theme_id: "destination-intimate",
      },
      {
        id: "destination-intimate-img-6",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767511811/Wedding_6_uyayfs.jpg",
        sort_order: 5,
        theme_id: "destination-intimate",
      },
      {
        id: "destination-intimate-img-7",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767511818/Wedding_7_f0vgit.jpg",
        sort_order: 6,
        theme_id: "destination-intimate",
      },
    ],
    venue_id: "22",
    venue: getVenue("22"),
    experience_id: "2",
    experience: getExp("2"),
  },
  {
    id: "forest-jungle-intimate",
    slug: "forest-jungle-intimate",
    type: "INTIMATE",
    title: "Pernikahan Intim di Rimba atau Hutan",
    description: `<p>Rayakan ikatan Anda di bawah pepohonan tua di katedral alam yang menawan dan penuh warna hijau. Pernikahan Intim di Rimba atau Hutan berlangsung di lanskap pedalaman Bali yang rimbun — di mana kanopi yang menjulang, cahaya yang tersaring, dan kehadiran alam yang tenang membentuk latar yang tiada duanya.</p>

<p>Upacara ini merangkul keindahan hutan yang liar. Gemerisik dedaunan, sinar matahari yang menerobos kanopi, dan kehijauan di sekelilingnya menciptakan suasana yang terasa purba, puitis, dan sangat hidup.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769609440/Cover_1_py4g8y.jpg",
    gallery: [
      {
        id: "forest-jungle-intimate-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769609440/Cover_1_py4g8y.jpg",
        sort_order: 0,
        theme_id: "forest-jungle-intimate",
      },
    ],
    venue_id: "31",
    venue: getVenue("31"),
    experience_id: "2",
    experience: getExp("2"),
  },
];