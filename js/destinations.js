// Koordinat pin Google Maps (!3d/!4d), bukan pusat tampilan pada bagian @ URL.
// Sumber dan cara verifikasi tercatat di README.md.
const DESTINATIONS = [
  {
    id:"baduy-dalam", name:"Kawasan Baduy Dalam", type:"Kawasan adat",
    short:"Kawasan adat dengan aturan ketat. Ikuti ketentuan setempat saat berkunjung.",
    attraction:"Kehidupan adat dan hubungan masyarakat dengan alam.",
    challenge:"Berat. Pengunjung umumnya berjalan kaki.",
    detail:"Baduy Dalam menerapkan pembatasan adat yang ketat. Tanyakan aturan terbaru, termasuk pemotretan dan izin masuk, kepada pihak setempat sebelum berkunjung. Kawasan ini tidak ditandai di peta.",
    coords:null, restricted:true, lookup:"Baduy Dalam, Kanekes, Lebak, Banten"
  },
  {
    id:"baduy-luar", name:"Kawasan Baduy Luar", type:"Kawasan adat",
    short:"Permukiman Baduy Luar. Pengunjung boleh datang selama mengikuti aturan adat.",
    attraction:"Rumah tradisional, kerajinan lokal, dan suasana kampung.",
    challenge:"Ringan hingga sedang, bergantung pada jalur.",
    detail:"Titik peta mengikuti pin Wisata Suku Baduy Luar di Google Maps, bukan batas seluruh kawasan Baduy Luar. Ikuti arahan warga dan pemandu lokal serta konfirmasi akses sebelum berangkat.",
    coords:[-6.5958483,106.2256021], mapLabel:"Wisata Suku Baduy Luar", source:"Google Maps", mapsSourceUrl:"https://maps.app.goo.gl/shmm6xuk7fjrLCx6A", restricted:false
  },
  {
    id:"marengo", name:"Kampung Marengo", type:"Lokasi wisata",
    short:"Kampung di kawasan Baduy Luar dengan suasana permukiman tradisional.",
    attraction:"Suasana kampung dan rumah adat.",
    challenge:"Konfirmasi jalur serta waktu tempuh kepada pemandu.",
    detail:"Kampung Marengo berada di kawasan Baduy Luar. Cek ulang rute, aturan, dan akses sebelum berkunjung.",
    coords:[-6.6078819,106.2224494], mapLabel:"Wisata Kampung Marengo Baduy Luar", source:"Google Maps", mapsSourceUrl:"https://maps.app.goo.gl/51wzLEWwCBtxNg7k7", restricted:false
  },
  {
    id:"ciboleger", name:"Terminal dan Gapura Ciboleger", type:"Titik awal perjalanan",
    short:"Salah satu titik gerbang menuju kawasan permukiman Baduy.",
    attraction:"Gapura dan akses menuju kawasan wisata budaya.",
    challenge:"Konfirmasi kondisi transportasi dan jalur sebelum berangkat.",
    detail:"Titik peta mengikuti pin Terminal Ciboleger pada tautan Google Maps dari Dinas Pariwisata Banten. Terminal ini menjadi salah satu titik awal menuju kawasan Baduy. Tanyakan kondisi rute dan aturan terbaru kepada pemandu atau pihak setempat.",
    coords:[-6.5940006,106.2251326], mapLabel:"Terminal Ciboleger", source:"Google Maps / Dinas Pariwisata Banten", mapsSourceUrl:"https://www.google.com/maps/place/Terminal+Ciboleger/data=!4m5!3m4!1s0x2e42691704d8eb0d:0xee273a9bc8db4895!8m2!3d-6.5940006!4d106.2251326", restricted:false
  },
  {
    id:"trekking", name:"Jalur Trekking dan Perbukitan", type:"Aktivitas alam",
    short:"Menikmati lanskap perbukitan, ladang, dan jalur pedesaan.",
    attraction:"Pemandangan hijau dan perjalanan berjalan kaki.",
    challenge:"Sedang hingga berat, bergantung pada rute.",
    detail:"Entri ini mencakup banyak rute, jadi tidak punya satu titik di peta. Tanyakan jarak dan waktu tempuh kepada pemandu lokal. Hindari jalur saat cuaca buruk.",
    coords:null, restricted:false
  },
  {
    id:"sungai", name:"Sungai dan Panorama Alam", type:"Aktivitas alam",
    short:"Menikmati sungai dan lanskap alam di sepanjang jalur yang diperbolehkan.",
    attraction:"Pemandangan alam terbuka dan aliran sungai.",
    challenge:"Bergantung pada lokasi dan kondisi jalur.",
    detail:"Koordinat belum diverifikasi, jadi lokasi spesifik belum ditandai. Jangan pakai sabun atau sampo di sungai.",
    coords:null, restricted:false
  },
  {
    id:"budaya", name:"Permukiman Tradisional dan Budaya", type:"Pengalaman budaya",
    short:"Mengenal rumah tradisional dan kerajinan lokal dengan menghormati warga.",
    attraction:"Arsitektur tradisional dan kerajinan setempat.",
    challenge:"Ikuti arahan warga dan aturan adat.",
    detail:"Minta izin sebelum memotret. Sepakati harga langsung dengan penjual bila membeli kerajinan, dan hormati batasan adat.",
    coords:null, restricted:false
  }
];
