# Jelajah Baduy

Portal informasi wisata alam dan budaya Baduy di Kabupaten Lebak, Banten. Situs ini statis: HTML, CSS, dan JavaScript biasa, ditambah React.js untuk animasi. Mahasiswa Universitas Pamulang membuatnya sebagai proyek mahasiswa.

Tidak ada `npm install` dan tidak ada proses build. Anda mengunggah folder ini apa adanya.

## Menjalankan

1. Ekstrak ZIP.
2. Buka `index.html` di browser, atau jalankan server lokal dari folder ini:

   ```bash
   python -m http.server 8000
   ```

   Lalu buka `http://localhost:8000`.

Peta membutuhkan koneksi internet untuk memuat Leaflet dan tile OpenStreetMap. Tombol **Lokasi Saya** membutuhkan HTTPS atau localhost, ditambah izin lokasi dari browser.

## Struktur folder

```
Jelajah_Baduy_Animasi/
├── index.html                  Halaman utama: semua bagian situs dan urutan pemuatan skrip
├── README.md                   Dokumen ini
├── .gitignore                  Daftar file yang tidak ikut Git
├── .vscode/
│   └── extensions.json         Rekomendasi ekstensi VS Code
├── assets/
│   └── img/                    Semua foto (hero, destinasi, bacaan singkat)
├── css/
│   ├── style.css               Tampilan utama: warna, tata letak, komponen, responsif
│   ├── form.css                Tampilan form kontak
│   └── react-motion.css        Gaya animasi: reveal saat scroll, hero, hover, progress bar
├── js/
│   ├── destinations.js         Data 7 destinasi dan koordinatnya
│   ├── main.js                 Navigasi, kartu destinasi, dialog, dan peta Leaflet
│   ├── form.js                 Validasi dan pengiriman form kontak
│   └── react/
│       ├── react-runtime.js    Memuat React, lalu memuat react-animations.js
│       └── react-animations.js Komponen React untuk progress scroll dan tombol kembali ke atas
└── vendor/
    └── react/                  Salinan lokal React 16.0.0 dan ReactDOM 16.0.1, plus lisensinya (MIT)
```

## Fungsi tiap bagian

### `index.html`

Berisi header, hero, akses cepat, destinasi, peta, informasi, panduan, tentang, kontak (form), dan footer. Kartu destinasi dan daftar peta kosong di HTML. `js/main.js` mengisinya dari data di `js/destinations.js`.

### `assets/img/`

Delapan foto JPG. Nama file destinasi harus sama dengan `id` di `js/destinations.js`, karena `main.js` menyusun path foto dari `id` tersebut.

| File | Dipakai oleh |
| --- | --- |
| `hero.jpg` | Latar hero (`css/style.css`) |
| `baduy-dalam.jpg`, `baduy-luar.jpg`, `marengo.jpg`, `ciboleger.jpg`, `trekking.jpg`, `sungai.jpg`, `budaya.jpg` | Kartu destinasi (`js/main.js`) |
| `budaya.jpg`, `marengo.jpg`, `sungai.jpg` | Kartu bacaan singkat (`index.html`) |

### `css/`

- `form.css` mengatur tampilan section Kontak: kolom isian, pesan galat, dan status pengiriman.
- `style.css` mengatur seluruh tampilan. Warna utama ada di variabel `:root` pada baris awal file (`--green`, `--cream`, `--earth`, dan seterusnya).
- `react-motion.css` memuat animasi tambahan. Aturan `prefers-reduced-motion` di akhir file mematikan gerak bagi pengguna yang meminta itu di sistemnya.

### `js/destinations.js`

Satu konstanta, `DESTINATIONS`, berisi daftar destinasi. Setiap entri punya field berikut:

| Field | Fungsi |
| --- | --- |
| `id` | Penanda unik dan nama file foto (`assets/img/<id>.jpg`) |
| `name`, `type`, `short`, `attraction`, `challenge`, `detail` | Teks di kartu dan dialog detail |
| `coords` | `[lintang, bujur]` untuk marker, atau `null` jika tidak ada titik |
| `mapLabel`, `source`, `mapsSourceUrl` | Label, asal koordinat, dan tautan sumber |
| `restricted` | `true` menyembunyikan marker (dipakai untuk Baduy Dalam) |
| `lookup` | Kata kunci pencarian untuk entri tanpa koordinat |

### `js/main.js`

Mengelola lima hal, berurutan dari atas ke bawah:

1. Navbar: berubah warna saat scroll dan menu mobile.
2. Kartu destinasi dan dialog detail.
3. Peta Leaflet, marker, popup, dan tombol OpenStreetMap serta Google Maps.
4. Tombol **Lokasi Saya**.
5. Penanda menu aktif sesuai bagian yang terlihat.

File ini memakai `DESTINATIONS`, jadi `destinations.js` harus dimuat lebih dulu.

### `js/form.js`

Mengelola form di section **Kontak** (`#kontak`):

- Mengisi pilihan destinasi dari `DESTINATIONS`, jadi daftar ikut berubah saat Anda menambah destinasi.
- Memvalidasi kolom saat pengunjung berpindah kolom dan saat menekan **Kirim Pesan**. Pesan galat muncul di bawah kolom yang salah, dan fokus pindah ke kolom pertama yang bermasalah.
- Menolak tanggal di masa lalu, nomor WhatsApp yang tidak lazim, dan jumlah pengunjung di luar 1 sampai 50.
- Memasang kolom jebakan (`website`) yang tidak terlihat. Bot yang mengisinya mendapat pesan sukses palsu, dan datanya tidak terkirim.

### `js/react/`

- `react-runtime.js` mengecek apakah React dari CDN sudah termuat. Jika belum, file ini memuat salinan di `vendor/react/`, lalu memuat `react-animations.js`.
- `react-animations.js` berisi komponen `MotionUI`. Komponen ini mengelola progress bar scroll, tombol kembali ke atas, animasi hero, dan efek reveal lewat IntersectionObserver. Peta dan kartu tetap dikelola `main.js`.

### `vendor/react/`

React 16.0.0 dan ReactDOM 16.0.1 versi production, plus `LICENSE-REACT.txt`. Situs memakai file ini saat CDN UNPKG (React 18.3.1) tidak bisa dijangkau, sehingga animasi tetap jalan tanpa internet. `react-animations.js` sengaja mendukung kedua versi: ia memakai `ReactDOM.render` dan pembungkus `div` bila `createRoot` dan `React.Fragment` tidak ada. Untuk menyamakan salinan lokal dengan CDN, ganti kedua file dengan `umd/react.production.min.js` dan `umd/react-dom.production.min.js` dari paket npm `react@18.3.1` dan `react-dom@18.3.1`.

## Urutan pemuatan

`index.html` memuat skrip di akhir `<body>` dengan urutan ini:

1. Leaflet (CDN cdnjs)
2. `js/destinations.js`
3. `js/main.js`
4. `js/form.js`
5. React dan ReactDOM (CDN UNPKG)
6. `js/react/react-runtime.js`, yang memuat `js/react/react-animations.js`

Urutan ini penting. `main.js` butuh `DESTINATIONS` dan Leaflet. `form.js` butuh `DESTINATIONS` untuk daftar destinasi. Animasi butuh kartu yang sudah dibuat `main.js`, supaya efek reveal menjangkau semua kartu.

Semua skrip berupa skrip klasik, bukan ES module. Browser memblokir ES module saat Anda membuka `index.html` langsung dari disk (`file://`), jadi struktur ini tetap bisa dibuka tanpa server.

## Mengatur tujuan form

Situs statis tidak punya server, jadi form butuh tujuan pengiriman. Buka `js/form.js` dan isi **salah satu** nilai di `FORM_CONFIG`:

```js
const FORM_CONFIG = {
  endpoint: "https://formspree.io/f/xxxxxxx",  // pilihan 1: email otomatis
  waNumber: "6281234567890",                    // pilihan 2: WhatsApp
  email: ""                                     // pilihan 3: aplikasi email pengunjung
};
```

| Pilihan | Cara kerja | Cocok untuk |
| --- | --- | --- |
| `endpoint` | Form mengirim data JSON ke layanan form (contoh: Formspree). Layanan itu meneruskan pesan ke email Anda. Pengunjung tetap di halaman dan melihat status sukses. | Pesan masuk otomatis ke inbox Anda |
| `waNumber` | Form membuka WhatsApp pengunjung dengan chat ke nomor Anda dan pesan sudah tertulis. Pengunjung menekan kirim sendiri. Nomor boleh `08...` atau `628...`. | Balasan cepat lewat WhatsApp, tanpa akun layanan pihak ketiga |
| `email` | Form membuka aplikasi email pengunjung dengan semua isian sudah tertulis. Pengunjung menekan kirim sendiri. | Tanpa akun layanan pihak ketiga |

Jika semuanya kosong, form menampilkan pesan bahwa penerima belum diatur dan tidak mengirim apa pun. Jika lebih dari satu terisi, urutan pakainya `endpoint`, `waNumber`, lalu `email`.

Data yang dikirim: `nama`, `email`, `whatsapp`, `destinasi`, `tanggal`, `jumlah`, `pesan`.

Cloudflare Pages tidak memproses form dari situs statis, jadi `endpoint` perlu mengarah ke layanan di luar situs ini.

## Mengubah konten

**Menambah destinasi.** Salin satu entri di `js/destinations.js`, ganti `id` dan teksnya, lalu taruh foto di `assets/img/<id>.jpg`. Kartu dan daftar peta bertambah otomatis. Isi `coords` jika titiknya sudah terverifikasi, atau biarkan `null`.

**Mengubah kolom form.** Tambah atau hapus kolom di `<form id="contactForm">` pada `index.html`. Aturan validasi tiap kolom ada di objek `rules` dalam `js/form.js`.

**Mengganti foto.** Timpa file di `assets/img/` dengan nama yang sama. Untuk foto di bagian Informasi, ubah atribut `style` pada `<div class="news-image">` di `index.html`.

**Mengubah warna.** Edit variabel di `:root` pada `css/style.css`.

**Memperbarui cache.** Setiap `<link>` dan `<script>` lokal punya `?v=2026112306`. Ganti angkanya di `index.html` dan `js/react/react-runtime.js` setiap kali Anda mengubah CSS atau JS, supaya browser pengunjung memuat versi terbaru.

## Deploy

- **Cloudflare Pages (unggah langsung):** unggah seluruh isi folder ini. `index.html` berada di root.
- **GitHub:** salin seluruh isi folder ini ke root repositori yang menjadi sumber deploy.

## Referensi titik peta

Dicocokkan pada 10 November 2026. Marker, tautan popup, dan tombol Google Maps memakai pasangan lintang dan bujur yang sama. Klik marker memperbarui pilihan destinasi dan tombol peta.

| Titik Google Maps | Lintang | Bujur | Referensi |
| --- | --- | --- | --- |
| Wisata Suku Baduy Luar | -6.5958483 | 106.2256021 | [Pin Google Maps](https://maps.app.goo.gl/shmm6xuk7fjrLCx6A) |
| Wisata Kampung Marengo Baduy Luar | -6.6078819 | 106.2224494 | [Pin Google Maps](https://maps.app.goo.gl/51wzLEWwCBtxNg7k7) |
| Terminal Ciboleger | -6.5940006 | 106.2251326 | [Dinas Pariwisata Banten, tautan Google Maps pada ulasan](https://excitingbanten.id/belanja/jasa-perjalanan/terminal-ciboleger) |

Koordinat berasal dari data pin `!3d` dan `!4d` di URL Google Maps. Pusat tampilan peta setelah tanda `@` tidak dipakai. Peta dasar memakai OpenStreetMap, jadi label dan gambarnya bisa berbeda dari Google Maps.

Aturan penandaan:

- Ciboleger memakai koordinat tetap, sehingga tidak bergantung pada hasil pencarian nama di OpenStreetMap.
- Baduy Dalam tidak ditandai, sesuai pembatasan akses pada data proyek.
- Trekking, sungai, dan budaya tidak punya koordinat karena belum ada titik spesifik yang terverifikasi. Tombol peta untuk entri ini mencari nama kawasannya.

## Aksesibilitas

- Animasi mengikuti pengaturan sistem **Reduce Motion**. Jika pengguna mengaktifkannya, gerak berkurang atau mati.
- Navigasi, tautan peta, dan tombol bisa dipakai lewat keyboard.
- Tombol kembali ke atas hanya bisa difokus saat terlihat.
- Setiap kolom form punya label, penanda wajib, dan pesan galat yang terhubung lewat `aria-describedby`. Status pengiriman dibacakan pembaca layar lewat `role="status"`.
- Progress bar scroll memakai `role="progressbar"` beserta nilai `aria-valuenow`.

## Perubahan dari struktur lama

| Sebelumnya | Sekarang | Alasan |
| --- | --- | --- |
| `Jelajah_Baduy_Animasi/Jelajah_Baduy_React/` (dua folder bersarang) | Satu folder root | Saat unggah ke Cloudflare atau GitHub, `index.html` langsung ada di root |
| 7 file kode di satu folder | `css/`, `js/`, `js/react/` | Pemisahan menurut jenis dan fungsi |
| `img/` | `assets/img/` | Ruang untuk aset lain, seperti ikon atau font |
| `vendor/` berisi 3 file React | `vendor/react/` | Library lain bisa masuk ke `vendor/` tanpa bercampur |
| `script.js` (data + logika) | `js/destinations.js` + `js/main.js` | Anda mengubah data destinasi tanpa menyentuh logika |
| `?v=` berbeda-beda per file | Satu versi `?v=2026112306` | Satu angka untuk diganti saat memperbarui cache |
| Tidak ada form kontak | Section `#kontak`, `css/form.css`, `js/form.js` | Pengunjung bisa bertanya soal rencana kunjungan |
| `<div id="react-motion-root" aria-label=...>` setelah skrip | Sebelum skrip, tanpa `aria-label` | Elemen sudah ada saat React mencarinya. `aria-label` pada `div` tanpa role tidak berfungsi |

Isi `style.css`, `react-motion.css`, `react-animations.js`, dan logika `main.js` tidak berubah. Hanya path file dan komentar yang disesuaikan.
