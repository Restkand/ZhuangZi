# Alat

Skrip kecil untuk membuat ulang ilustrasi kisah. Hasilnya SVG biasa di `public/ilustrasi/`;
skrip ini hanya dibutuhkan bila sebuah ilustrasi ingin disetel ulang.

```sh
node alat/gambar-juru-masak.mjs public/ilustrasi/juru-masak-ding.svg
node alat/gambar-pohon.mjs      public/ilustrasi/pohon-tak-berguna.svg
node alat/gambar-kupu.mjs       public/ilustrasi/mimpi-kupu-kupu.svg
```

Catatan:

- Butuh Node.js 22.23.4 atau lebih baru (skrip kupu-kupu membaca `src/lib/kupu.ts` langsung).
- Bagian yang tampak acak (daun, rumput) memakai benih tetap, jadi hasilnya selalu sama.
  Mengubah urutan pemanggilan `acak()` akan menggeser bentuk daun dan rumput.
- Skrip pohon dan kupu-kupu menghasilkan SVG yang sama persis dengan yang sedang tayang.
