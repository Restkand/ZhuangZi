# Kisah Zhuangzi

Kisah-kisah dari kitab Zhuangzi, diceritakan ulang dalam bahasa Indonesia yang tenang dan mudah dipahami.

Proyek pribadi, gratis, tanpa iklan. Disusun dengan bantuan AI (Claude). Rencana lengkap ada di [rencana-proyek.md](rencana-proyek.md).

## Menjalankan secara lokal

Butuh Node.js 20 atau lebih baru.

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
   urutan: 2
   ---
   ```

3. Tulis kisahnya, lalu sisipkan baris `<!-- renungan -->` sebelum bagian renungan.
4. Simpan ilustrasi SVG di `public/ilustrasi/`.

## Lisensi

- Kode: [MIT](LICENSE)
- Kisah dan ilustrasi: [CC BY-NC-SA 4.0](LICENSE-KONTEN.md)
- Teks asli Zhuangzi dan terjemahan James Legge (1891): domain publik
