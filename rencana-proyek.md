# Rencana Proyek: Pohon Tak Berguna

Website kisah Zhuangzi · https://pohontakberguna.com · *Tempat berteduh bersama kisah-kisah Zhuangzi*

## 1. Tentang proyek

Website pribadi berisi kisah-kisah dari kitab Zhuangzi, diceritakan ulang dalam bahasa Indonesia yang tenang dan mudah dipahami.

Tujuannya menjadi tempat berteduh bagi pembaca yang sedang lelah, agar mereka bisa membaca satu kisah dengan tenang sampai akhir.

Prinsip:

- Gratis, tanpa iklan, tidak mencari keuntungan
- Tanpa angka like, jumlah pembaca, atau kolom komentar
- Tanpa tenggat. Dikerjakan sesuai tenaga, satu kisah setiap kali
- Jujur bahwa proyek ini dibuat dengan bantuan AI

## 2. Sumber dan hak cipta

- Gunakan hanya teks asli Zhuangzi dan terjemahan James Legge (1891) dari https://ctext.org/zhuangzi. Keduanya domain publik.
- Jangan menyalin atau menerjemahkan langsung terjemahan modern (Burton Watson, Brook Ziporyn, Robert Eno, dan lainnya).
- Legge kadang memasukkan nuansa Kristen. Kembalikan ke makna yang lebih netral sesuai teks asli.
- Ilustrasi harus orisinal, tidak meniru lukisan atau karya seni yang sudah ada.
- Jika suatu hari website ini menjadi komersial, konsultasikan dengan orang yang paham hukum.

## 3. Struktur kitab dan urutan pengerjaan

Kitab Zhuangzi terdiri dari 33 bab:

- 7 Bab Dalam (bab 1–7), dianggap paling dekat dengan Zhuangzi sendiri
- 15 Bab Luar (bab 8–22)
- 11 Bab Campuran (bab 23–33)

Urutan pengerjaan:

- Fase 1: Bab Dalam
- Fase 2: Kisah terkenal dari bab lain, seperti bab 17, 18, 19, dan 20
- Fase 3: Sisanya, pelan-pelan

Rincian kisah dan statusnya ada di file daftar-kisah.md. Cocokkan pembagian bab dengan ctext.org sebelum menulis setiap kisah.

## 4. Struktur setiap kisah

1. Judul
2. Keterangan sumber (huruf miring), contoh: "Dari kitab Zhuangzi, Bab 3: Merawat Kehidupan"
3. Kisah, setia pada isi aslinya, paragraf pendek, 400–900 kata
4. Renungan, 4–7 paragraf sangat pendek, memakai "kita", tidak menggurui, ditutup satu kalimat yang tenang
5. Catatan: "Diceritakan ulang dari teks asli Zhuangzi dan terjemahan James Legge (1891), keduanya domain publik, dengan bantuan AI. Bukan terjemahan akademis."

Nada: tenang, reflektif, sederhana. Kalimat pendek. Tidak gaul, tidak kaku. Tokoh memakai "saya", bukan "hamba".

Acuan gaya: referensi/contoh-kisah-juru-masak-ding.md

## 5. Desain website

Tipografi:

- Huruf serif Lora, disimpan di situs sendiri lewat @fontsource (tanpa permintaan ke Google)
- Ukuran sekitar 18px di ponsel, jarak antarbaris lebar (sekitar 1.8)
- Lebar teks maksimal 60–70 karakter per baris

Warna:

- Latar krem pucat seperti kertas, teks abu-abu tua (bukan hitam pekat)
- Mode malam dengan warna hangat, mengikuti perangkat. Tombol kecil di header untuk memilih sendiri
- Musik latar opsional (tombol ♪ di header, tanpa autoplay). Navigasi antarhalaman memakai ClientRouter Astro dan header dipertahankan, agar musik tidak terputus. JavaScript hanya untuk ketiga hal ini; tanpa JS situs tetap utuh dan kedua tombol tersembunyi

Halaman kisah:

- Satu ilustrasi tinta di atas judul
- Keterangan bab dan perkiraan waktu baca
- Pemisah tenang sebelum renungan
- Renungan diberi garis tipis di sisi kiri
- Di akhir hanya ada tautan "Kisah berikutnya", tanpa autoplay atau scroll tanpa ujung

Yang tidak dipakai:

- Iklan, pop-up, notifikasi
- Angka like, jumlah pembaca, komentar

Fitur dengarkan (opsional, bisa ditambahkan nanti):

- Rekam suara sendiri (paling personal)
- Web Speech API di browser (gratis, suara agak kaku)
- Layanan suara AI seperti Google Cloud TTS, Azure, atau ElevenLabs (lebih natural, cek ketentuan dan harga)

## 6. Gaya ilustrasi

- SVG orisinal bergaya tarikan pena atau tinta
- viewBox="0 0 550 350", latar kertas #F3EEE2 dengan rx="12"
- Tinta utama #2C2C2A
- Abu-abu untuk kedalaman: #5F5E5A, #888780, #B4B2A9, #D3D1C7
- Garis tipis dan halus: objek utama 1.0–1.2, detail dan objek jauh 0.6–0.9 dan lebih abu-abu. Hindari garis tebal
- Bayangan dengan arsiran garis pendek yang tipis dan samar, bukan isian atau gradien
- Hindari bentuk yang terkesan kekanak-kanakan: spiral, rumpun rumput berbentuk "v", sosok lidi. Rumput cukup goresan halus di sepanjang garis tanah
- Sosok manusia hanya bila benar-benar perlu; sering kali benda atau alam saja sudah cukup bercerita
- Gambar hal yang memang disebut dalam kisah (misalnya pohon chu yang berbonggol dan berdahan berpilin), bukan tafsiran yang menambah makna lain
- stroke-linecap="round" pada semua garis
- Bentuk meruncing seperti goresan kuas boleh berupa path berisi warna tinta
- Banyak ruang kosong
- Stempel merah kecil #A32D2D di sudut, isinya garis abstrak, bukan huruf sungguhan
- Tanpa teks di dalam gambar

Acuan gaya: referensi/contoh-ilustrasi-pisau-talenan.svg. Skrip pembuat ilustrasi yang sudah tayang ada di folder `alat/`.

## 7. Teknis

Framework: Astro

- Setiap kisah satu file Markdown
- Tanpa JavaScript di browser secara bawaan, ringan dan cepat
- Berjalan di Node.js saat pengembangan dan build. Hasilnya file statis.

Alternatif lebih sederhana: Eleventy (11ty)

Struktur folder:

```
src/
  content/
    kisah/
      juru-masak-ding.md
  layouts/
    Kisah.astro
public/
  ilustrasi/
    juru-masak-ding.svg
```

Frontmatter setiap kisah:

```
---
judul: "Juru Masak Ding dan Pisau yang Tak Pernah Tumpul"
bab: "Bab 3: Merawat Kehidupan"
ilustrasi: "/ilustrasi/juru-masak-ding.svg"
ilustrasiAlt: "Gambar tinta: pisau dapur lebar di atas talenan kayu bundar"
kutipan: "Di antara sendi selalu ada ruang. Mata pisau yang tipis bisa bergerak dengan bebas di sana."
urutan: 1
---
```

Hosting: Vercel (paket Hobby, gratis), terhubung ke repositori GitHub. Setiap perubahan otomatis tayang. Domain: pohontakberguna.com (diatur di `site`, astro.config.mjs).

SEO: sitemap otomatis (@astrojs/sitemap), robots.txt, data terstruktur JSON-LD (WebSite dan Article), judul halaman berpola "Judul Kisah · Kisah Zhuangzi · Pohon Tak Berguna".

- Astro statis dikenali otomatis, tidak perlu adapter.
- Jangan aktifkan Vercel Analytics atau Speed Insights. Keduanya menghitung pengunjung dan bertentangan dengan prinsip "tanpa jumlah pembaca".
- Paket Hobby hanya untuk penggunaan non-komersial. Jika suatu hari menjadi komersial, perlu paket Pro (lihat juga bagian 2).
- Alternatif jika perlu pindah: Cloudflare Pages atau Netlify. Hasil build berupa file statis, jadi mudah dipindahkan.

Catatan iPad:

- Node tidak bisa dijalankan langsung di iPad
- Pengaturan awal dilakukan sekali di laptop, atau lewat GitHub Codespaces di browser
- Setelah itu, menulis kisah baru cukup dari iPad lewat editor GitHub di browser atau aplikasi Working Copy

## 8. Alur kerja dengan Claude

Persiapan (sekali saja, di mode chat biasa, bukan incognito):

1. Buat Project baru di Claude
2. Tempel isi `referensi/instruksi-project.md` ke bagian instruksi (salin ulang setiap kali file itu berubah)
3. Tambahkan tiga file dari folder `referensi/`: contoh-kisah-juru-masak-ding.md, contoh-ilustrasi-pisau-talenan.svg, daftar-kisah.md

Setiap sesi (sekitar 20–30 menit):

1. Buka chat baru di Project, sebutkan kisah yang ingin dikerjakan
2. Claude menulis draf kisah
3. Baca dan beri masukan
4. Setelah teks disetujui, minta ilustrasinya
5. Simpan file Markdown dari Claude ke `src/content/kisah/` dan ilustrasinya ke `public/ilustrasi/`, lalu perbarui status di daftar-kisah.md

Kalau sedang lelah, sesi boleh dilewati.

## 9. Catatan tentang AI

Halaman Tentang:

Website ini adalah proyek pribadi yang lahir di masa lelah. Saya menemukan ketenangan lewat kisah-kisah Zhuangzi, lalu ingin membuat tempat sederhana agar orang lain juga bisa membacanya dengan tenang, dalam bahasa Indonesia yang mudah dipahami.

Kisah-kisah di sini diceritakan ulang dari teks asli Zhuangzi (abad ke-4 SM) dengan merujuk terjemahan James Legge (1891). Keduanya sudah menjadi domain publik.

Dalam menyusun cerita dan ilustrasi, saya dibantu oleh AI (Claude). Saya memilih kisahnya, membaca, menyunting, dan menyesuaikan setiap tulisan dengan rasa saya sendiri. Ini bukan terjemahan akademis, melainkan penceritaan ulang yang ringan untuk dibaca dengan hati yang tenang.

Jika Anda menemukan kekeliruan, atau ingin memahami Zhuangzi lebih dalam, saya sangat menyarankan membaca terjemahan-terjemahan lengkap karya para ahli.

Website ini gratis, tanpa iklan, dan tidak mencari keuntungan.

## 10. Langkah berikutnya

- [x] Siapkan proyek Astro di laptop atau Codespaces
- [x] Pasang kisah Juru Masak Ding sebagai kisah pertama
- [x] Tentukan nama website: Pohon Tak Berguna (domain pohontakberguna.com)

---

## Lampiran A: Instruksi Project Claude

Instruksi lengkap untuk Project Claude kini disimpan di `referensi/instruksi-project.md`, siap disalin ke bagian Instructions pada Project di claude.ai. Isinya mencakup format file kisah yang bisa langsung disimpan ke `src/content/kisah/` (frontmatter, penanda `<!-- renungan -->`, dan kutipan untuk kartu Story).
