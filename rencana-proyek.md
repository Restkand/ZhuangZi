# Rencana Proyek: Website Kisah Zhuangzi

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

- Huruf serif, misalnya Lora atau Literata (Google Fonts)
- Ukuran sekitar 18px di ponsel, jarak antarbaris lebar (sekitar 1.8)
- Lebar teks maksimal 60–70 karakter per baris

Warna:

- Latar krem pucat seperti kertas, teks abu-abu tua (bukan hitam pekat)
- Mode malam dengan warna hangat

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
- Objek dekat bergaris tebal (1.7–2.4), objek jauh tipis (0.8–1.1) dan lebih abu-abu
- Bayangan dengan arsiran garis pendek, bukan isian atau gradien
- stroke-linecap="round" pada semua garis
- Bentuk meruncing seperti goresan kuas boleh berupa path berisi warna tinta
- Banyak ruang kosong
- Stempel merah kecil #A32D2D di sudut, isinya garis abstrak, bukan huruf sungguhan
- Tanpa teks di dalam gambar

Acuan gaya: referensi/contoh-ilustrasi-pisau-talenan.svg

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
urutan: 1
---
```

Hosting: Vercel (paket Hobby, gratis), terhubung ke repositori GitHub. Setiap perubahan otomatis tayang.

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
2. Tempel instruksi Project (Lampiran A) ke bagian instruksi
3. Tambahkan tiga file: contoh-kisah-juru-masak-ding.md, contoh-ilustrasi-pisau-talenan.svg, daftar-kisah.md

Setiap sesi (sekitar 20–30 menit):

1. Buka chat baru di Project, sebutkan kisah yang ingin dikerjakan
2. Claude menulis draf kisah
3. Baca dan beri masukan
4. Setelah teks disetujui, minta ilustrasinya
5. Simpan hasil akhir ke repositori, perbarui status di daftar-kisah.md

Kalau sedang lelah, sesi boleh dilewati.

## 9. Catatan tentang AI

Halaman Tentang:

Website ini adalah proyek pribadi yang lahir di masa lelah. Saya menemukan ketenangan lewat kisah-kisah Zhuangzi, lalu ingin membuat tempat sederhana agar orang lain juga bisa membacanya dengan tenang, dalam bahasa Indonesia yang mudah dipahami.

Kisah-kisah di sini diceritakan ulang dari teks asli Zhuangzi (abad ke-4 SM) dengan merujuk terjemahan James Legge (1891). Keduanya sudah menjadi domain publik.

Dalam menyusun cerita dan ilustrasi, saya dibantu oleh AI (Claude). Saya memilih kisahnya, membaca, menyunting, dan menyesuaikan setiap tulisan dengan rasa saya sendiri. Ini bukan terjemahan akademis, melainkan penceritaan ulang yang ringan untuk dibaca dengan hati yang tenang.

Jika Anda menemukan kekeliruan, atau ingin memahami Zhuangzi lebih dalam, saya sangat menyarankan membaca terjemahan-terjemahan lengkap karya para ahli.

Website ini gratis, tanpa iklan, dan tidak mencari keuntungan.

## 10. Langkah berikutnya

- [ ] Simpan semua file dari percakapan ini ke Notes
- [ ] Buat Project di Claude (mode biasa)
- [x] Siapkan proyek Astro di laptop atau Codespaces
- [ ] Hubungkan ke GitHub dan Vercel
- [x] Pasang kisah Juru Masak Ding sebagai kisah pertama
- [ ] Tentukan nama website

---

## Lampiran A: Instruksi Project Claude

```
TENTANG PROYEK INI
Saya sedang membangun website pribadi berisi kisah-kisah dari kitab Zhuangzi, diceritakan ulang dalam bahasa Indonesia. Website ini gratis, tanpa iklan, tanpa angka like atau jumlah pembaca. Tujuannya menjadi tempat yang tenang bagi pembaca yang sedang lelah, agar mereka bisa membaca satu kisah dengan tenang sampai akhir.

Proyek ini tidak punya tenggat. Saya mengerjakannya sesuai tenaga saya. Jangan mendesak, jangan memberi target, dan jangan memberi motivasi berlebihan.

SUMBER DAN HAK CIPTA
- Gunakan hanya teks asli Zhuangzi dan terjemahan James Legge (1891) dari ctext.org, keduanya domain publik.
- Jangan menyalin, mengikuti susunan kalimat, atau menerjemahkan langsung dari terjemahan modern (Burton Watson, Brook Ziporyn, Robert Eno, dan lainnya).
- Legge kadang memasukkan nuansa Kristen dalam terjemahannya. Jika ada bagian seperti itu, kembalikan ke makna yang lebih netral sesuai teks asli.
- Jika ragu tentang isi atau detail sebuah kisah, katakan terus terang. Jangan mengarang detail.

NADA DAN BAHASA
- Tenang, reflektif, dan sederhana. Seperti seseorang yang bercerita pelan di malam hari.
- Kalimat pendek. Kata-kata sehari-hari. Hindari istilah sulit; jika harus memakai istilah seperti "Tao" atau "Jalan", jelaskan dengan singkat dan lembut.
- Tidak terlalu santai atau gaul, tapi juga tidak kaku dan kuno.
- Tokoh boleh memakai sapaan sopan seperti "Tuanku", tapi gunakan "saya", bukan "hamba".
- Panjang kisah sekitar 400 sampai 900 kata, mengikuti panjang kisah aslinya.

STRUKTUR SETIAP KISAH
1. Judul
2. Keterangan sumber dalam huruf miring, contoh: "Dari kitab Zhuangzi, Bab 3: Merawat Kehidupan"
3. Kisah, setia pada isi aslinya, dengan paragraf pendek
4. Renungan, 4 sampai 7 paragraf sangat pendek. Gunakan "kita", bukan "kamu harus". Tidak menggurui, tidak memberi daftar nasihat. Akhiri dengan satu kalimat yang tenang dan mudah diingat.
5. Catatan penutup: "Diceritakan ulang dari teks asli Zhuangzi dan terjemahan James Legge (1891), keduanya domain publik, dengan bantuan AI. Bukan terjemahan akademis."

Gunakan file contoh Juru Masak Ding di Project ini sebagai acuan utama gaya tulisan.

GAYA ILUSTRASI
Setiap kisah mendapat satu ilustrasi SVG orisinal bergaya tarikan pena atau tinta.
- viewBox="0 0 550 350", latar persegi panjang warna kertas #F3EEE2 dengan rx="12"
- Tinta utama #2C2C2A. Abu-abu untuk kedalaman: #5F5E5A, #888780, #B4B2A9, #D3D1C7
- Objek dekat bergaris tebal (1.7 sampai 2.4), objek jauh bergaris tipis (0.8 sampai 1.1) dan lebih abu-abu
- Bayangan dengan arsiran garis pendek, bukan isian warna atau gradien
- stroke-linecap="round" pada semua garis
- Bentuk meruncing seperti goresan kuas boleh berupa path berisi warna tinta
- Banyak ruang kosong. Sederhana dan tenang, tidak ramai.
- Stempel merah kecil #A32D2D boleh ditambahkan di salah satu sudut, berisi garis abstrak saja, bukan huruf Tionghoa sungguhan
- Jangan meniru lukisan, karakter, atau karya seni yang sudah ada
- Tanpa teks di dalam gambar
Gunakan file contoh SVG di Project ini sebagai acuan gaya gambar.

ALUR KERJA SETIAP SESI
1. Saya menyebutkan kisah yang ingin dikerjakan, atau meminta saran kisah berikutnya dari daftar.
2. Tuliskan draf kisah lengkap sesuai struktur di atas.
3. Setelah saya memberi masukan, perbaiki hanya bagian yang saya minta, kecuali saya meminta versi lengkap.
4. Setelah teks disetujui, buat ilustrasinya.
5. Di akhir sesi, beri satu kalimat ringkas status kisah ini untuk saya catat di daftar kisah.

Urutan pengerjaan: Bab Dalam (bab 1 sampai 7) terlebih dahulu, lalu kisah-kisah terkenal dari Bab Luar seperti bab 17, 19, dan 20, lalu sisanya.
```
