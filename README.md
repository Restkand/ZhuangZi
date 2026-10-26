# Pohon Tak Berguna

*Tempat berteduh bersama kisah-kisah Zhuangzi* · https://pohontakberguna.com

Kisah-kisah dari kitab Zhuangzi, diceritakan ulang dalam bahasa Indonesia yang tenang dan mudah dipahami.
Nama situs diambil dari kisah pohon yang tak berguna di Bab 1: karena tak berguna, ia tak ditebang.
Nama, slogan, dan deskripsi situs diatur di `src/lib/situs.ts`.

Proyek pribadi, gratis, tanpa iklan. Disusun dengan bantuan AI (Claude). Rencana lengkap ada di [rencana-proyek.md](rencana-proyek.md).

## Menjalankan secara lokal

Butuh Node.js 22.23.4 atau lebih baru. Di Windows, pasang juga
[Microsoft Visual C++ Redistributable (x64)](https://aka.ms/vs/17/release/vc_redist.x64.exe),
karena pemroses Markdown Astro memakai modul native.

```sh
npm install
npm run dev      # buka http://localhost:4321
npm run build    # hasil statis di folder dist/
```

## Menambah kisah baru

1. Buat file Markdown di `src/content/kisah/`, misalnya `nama-kisah.md`.
2. Isi frontmatter:

   ```yaml
   ---
   judul: "Judul Kisah"
   bab: "Bab 3: Merawat Kehidupan"
   ilustrasi: "/ilustrasi/nama-kisah.svg"
   ilustrasiAlt: "Gambar tinta: deskripsi singkat isi ilustrasi."
   kutipan: "Satu atau dua kalimat dari kisah untuk kartu Story Instagram (opsional)."
   urutan: 2
   ---
   ```

3. Tulis kisahnya, lalu sisipkan baris `<!-- renungan -->` sebelum bagian renungan.
4. Simpan ilustrasi SVG di `public/ilustrasi/`.

Setiap kisah harus punya `urutan` yang berbeda; build akan berhenti dengan pesan jelas bila ada yang sama.

## Catatan keamanan

- Header keamanan (termasuk Content-Security-Policy) diatur di `vercel.json`.
  CSP melarang skrip dan CSS inline, jadi skrip baru ditaruh di `public/js/`.
- Markdown mengizinkan HTML mentah. Periksa kiriman kisah dari orang lain sebelum digabung.

## Lisensi

- Kode: [MIT](LICENSE)
- Kisah dan ilustrasi: [CC BY-NC-SA 4.0](LICENSE-KONTEN.md)
- Teks asli Zhuangzi dan terjemahan James Legge (1891): domain publik
