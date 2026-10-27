// Menyusun ilustrasi "Mimpi Menjadi Kupu-kupu" (public/ilustrasi/mimpi-kupu-kupu.svg).
// Pemakaian: node alat/gambar-kupu.mjs public/ilustrasi/mimpi-kupu-kupu.svg
//
// Kupu-kupu memakai bentuk yang sama dengan lambang situs (src/lib/kupu.ts). Rumput
// memakai angka acak dengan benih tetap, jadi hasilnya selalu sama.
import { writeFileSync } from 'node:fs';
import { isiKupu } from '../src/lib/kupu.ts';

const keluaran = process.argv[2];

let benih = 11;
const acak = () => ((benih = (benih * 16807) % 2147483647) / 2147483647);
const r = (n) => Math.round(n * 10) / 10;

const TINTA = '#2C2C2A', ABU2 = '#888780', ABU3 = '#B4B2A9', ABU4 = '#D3D1C7';
const garis = (d, warna, tebal, extra = '') =>
  `<path d="${d}" fill="none" stroke="${warna}" stroke-width="${tebal}" stroke-linecap="round" stroke-linejoin="round"${extra}/>`;

// Kupu-kupu di (x, y) sebagai pusat, dengan skala dan kemiringan tertentu.
// Gambar kupu.ts berukuran 120×80 dengan pusat (60, 40).
const kupu = (x, y, skala, sudut, warna) =>
  `<g transform="translate(${x} ${y}) rotate(${sudut}) scale(${skala}) translate(-60 -40)">${isiKupu(warna)}</g>`;

// Rumput padang: kelompok goresan halus, sama seperti ilustrasi pohon.
function rumput(xAwal, xAkhir, y, tinggi, warna, tebal, jarak = 14) {
  const bagian = [];
  for (let x = xAwal; x < xAkhir; x += jarak + acak() * 22) {
    const n = 2 + Math.floor(acak() * 3);
    for (let i = 0; i < n; i++) {
      const px = x + i * 2.2, py = y + (acak() - 0.5) * 2;
      const t = tinggi * (0.6 + acak() * 0.5);
      bagian.push(`M${r(px)} ${r(py)} q${r(0.5 + acak())} ${r(-t / 2)} ${r(1.5 + acak() * 1.5)} ${r(-t)}`);
    }
  }
  return garis(bagian.join(' '), warna, tebal);
}

const s = [];
s.push(`<rect x="0" y="0" width="550" height="350" rx="12" fill="#F3EEE2"/>`);

// Padang yang lapang: bukit jauh, cakrawala, dan garis-garis tanah tipis.
s.push(garis('M28 246 C90 232 150 236 210 243 C260 249 300 240 350 236 C410 232 470 238 522 233', ABU4, 0.9));
s.push(garis('M40 268 C150 264 260 266 360 265 C430 264 480 266 512 265', ABU3, 1));
s.push(garis('M70 298 C170 294 270 296 340 295 M380 302 C430 299 470 301 500 300', ABU4, 0.9));
s.push(rumput(48, 512, 267, 3, ABU4, 0.6));
s.push(rumput(70, 340, 297, 5, ABU3, 0.65));
s.push(rumput(380, 500, 301, 5, ABU3, 0.65));
s.push(rumput(60, 500, 326, 5, ABU3, 0.65, 34));

// Jejak terbang putus-putus yang melingkar, dari kupu-kupu samar ke kupu-kupu tinta.
// Ujungnya bersambung dengan jejak bawaan kupu-kupu tinta (titik awal jejak di kupu.ts,
// (6, 70), setelah digeser, diputar, dan diskalakan, jatuh di sekitar (302, 163)).
s.push(garis('M176 112 C200 132 214 150 236 146 C256 142 256 120 240 120 C224 120 228 146 252 156 C270 163 288 165 302 163', ABU3, 0.8, ' stroke-dasharray="6 5 10 6"'));

// Kupu-kupu samar di kejauhan (seperti dalam mimpi) dan kupu-kupu tinta yang dekat.
s.push(kupu(160, 98, 0.42, 14, { pekat: ABU3, abu: ABU4, abuMuda: ABU4 }));
s.push(kupu(346, 124, 0.95, -12, { pekat: TINTA, abu: ABU2, abuMuda: ABU3 }));

// Stempel merah dengan garis abstrak.
s.push(`<rect x="470" y="40" width="22" height="28" rx="2" fill="#A32D2D"/>`);
s.push(garis('M476 47 h10 M476 54 h10 M481 54 v9 M476 63 h3 M483 63 h3', '#F3EEE2', 1.2));

const svg = `<svg width="100%" viewBox="0 0 550 350" role="img" xmlns="http://www.w3.org/2000/svg"><title>Mimpi menjadi kupu-kupu</title><desc>Seekor kupu-kupu tinta terbang di atas padang yang lapang; jejak terbang putus-putus melingkar dari seekor kupu-kupu samar di kejauhan, seperti dalam mimpi. Digambar dengan garis tinta di atas kertas krem.</desc>${s.join('')}</svg>\n`;
writeFileSync(keluaran, svg);
console.log('svg', svg.length, 'byte');
