// Menyusun ilustrasi "Pohon yang Tak Berguna" (public/ilustrasi/pohon-tak-berguna.svg).
// Pemakaian: node alat/gambar-pohon.mjs public/ilustrasi/pohon-tak-berguna.svg
//
// Rimbunan daun dan rumput memakai angka acak dengan benih tetap, jadi hasilnya selalu
// sama. Mengubah urutan pemanggilan acak() akan menggeser bentuk daun dan rumput.
import { writeFileSync } from 'node:fs';

let benih = 7;
const acak = () => ((benih = (benih * 16807) % 2147483647) / 2147483647);
const r = (n) => Math.round(n * 10) / 10;

const TINTA = '#2C2C2A', ABU1 = '#5F5E5A', ABU2 = '#888780', ABU3 = '#B4B2A9', ABU4 = '#D3D1C7';
const garis = (d, warna, tebal, extra = '') =>
  `<path d="${d}" fill="none" stroke="${warna}" stroke-width="${tebal}" stroke-linecap="round" stroke-linejoin="round"${extra}/>`;

// Gumpalan daun: tepi bergelombang mengelilingi elips (cx, cy, rx, ry). Mengembalikan
// isian tertutup berwarna kertas (agar gumpalan depan menutupi yang di belakang) dan
// garis tepi yang sesekali terputus, seperti goresan tangan.
function rimbun(cx, cy, rx, ry, jumlah, celah = 0.15) {
  const titik = [];
  for (let i = 0; i <= jumlah; i++) {
    const a = (i / jumlah) * Math.PI * 2 + 0.3;
    const g = 1 + (acak() - 0.5) * 0.12;
    titik.push([cx + Math.cos(a) * rx * g, cy + Math.sin(a) * ry * g]);
  }
  titik[jumlah] = titik[0];
  const isi = [`M${r(titik[0][0])} ${r(titik[0][1])}`];
  const tepi = [];
  for (let i = 0; i < jumlah; i++) {
    const [x1, y1] = titik[i];
    const [x2, y2] = titik[i + 1];
    const tengahX = (x1 + x2) / 2, tengahY = (y1 + y2) / 2;
    // Titik kendali didorong keluar dari pusat agar setiap busur menggembung.
    const dx = tengahX - cx, dy = tengahY - cy, p = Math.hypot(dx, dy) || 1;
    const tonjol = 5 + acak() * 3;
    const busur = `Q${r(tengahX + (dx / p) * tonjol)} ${r(tengahY + (dy / p) * tonjol)} ${r(x2)} ${r(y2)}`;
    isi.push(busur);
    if (acak() >= celah) tepi.push(`M${r(x1)} ${r(y1)} ${busur}`);
  }
  return { isi: `${isi.join(' ')} Z`, tepi: tepi.join(' ') };
}

// Goresan pendek di dalam rimbunan, sebagai tekstur daun.
function teksturDaun(cx, cy, rx, ry, jumlah) {
  const bagian = [];
  for (let i = 0; i < jumlah; i++) {
    const a = acak() * Math.PI * 2, j = Math.sqrt(acak()) * 0.75;
    const x = cx + Math.cos(a) * rx * j, y = cy + Math.sin(a) * ry * j;
    bagian.push(`M${r(x)} ${r(y)} q3 -3.5 7 -0.5`);
  }
  return bagian.join(' ');
}

const s = [];
s.push(`<rect x="0" y="0" width="550" height="350" rx="12" fill="#F3EEE2"/>`);

// Latar jauh: bukit tipis dan cakrawala padang.
s.push(garis('M28 250 C80 234 130 238 176 246 C214 253 246 242 280 238', ABU4, 0.9));
s.push(garis('M430 244 C460 238 490 240 522 235', ABU4, 0.9));
s.push(garis('M36 271 C110 267 180 269 230 268', ABU3, 1));
s.push(garis('M412 269 C450 267 485 269 516 268', ABU3, 1));
s.push(garis('M64 303 C140 299 210 301 268 300 M372 307 C420 304 458 306 494 304', ABU4, 0.9));

// Bayangan teduh di tanah selebar kanopi: arsiran halus dan rapat, sangat tipis,
// dengan baris kedua yang lebih pendek di bawahnya.
const arsir = [];
for (let x = 196; x <= 482; x += 6) {
  arsir.push(`M${x} ${r(282 + acak() * 2.5)} l${r(5 + acak() * 2)} -2.5`);
}
for (let x = 232; x <= 446; x += 8) {
  arsir.push(`M${x} ${r(289 + acak() * 2)} l${r(4 + acak() * 2)} -2`);
}
s.push(garis(arsir.join(' '), ABU3, 0.6));

// Pohon chu seperti dalam kisah (Bab 1): "batang besarnya berbonggol, tak bisa diukur
// lurus dengan tali tukang kayu; dahan kecilnya melengkung dan berpilin, tak bisa
// diukur dengan penggaris maupun jangka." Garisnya tipis, senada dengan garis daun.

// Batang: sedikit miring dan tidak simetris; bonggol terlihat sebagai tonjolan garis tepi.
s.push(garis('M312 272 C318 262 309 252 314 240 C320 228 304 224 311 210 C316 200 320 192 328 184', TINTA, 1.15));
s.push(garis('M352 272 C346 262 356 250 350 238 C345 228 362 220 355 206 C351 196 356 190 352 182', TINTA, 1.15));
s.push(garis('M312 272 C304 274 296 277 288 280 M352 272 C360 274 368 277 376 280 M326 272 C322 276 316 279 308 281', TINTA, 1));
// Lipatan di bonggol dan serat kayu yang ikut berkelok.
s.push(garis('M308 222 c4 -3 6 -8 4 -13 M358 216 c-3 4 -4 9 -2 13', ABU1, 0.8));
s.push(garis('M322 266 C326 252 318 240 324 226 C328 214 322 204 330 192 M342 266 C339 252 347 240 343 226 C340 214 348 204 344 192', ABU2, 0.6));

// Dahan utama yang berkelok-kelok; ujung-ujungnya masuk ke dalam kanopi.
s.push(garis('M328 184 C318 176 306 176 298 166 C292 158 296 148 286 140 C278 134 268 136 260 128 C254 122 256 112 248 104', TINTA, 1.1));
s.push(garis('M336 182 C328 172 318 168 312 158 C306 148 310 140 300 132', TINTA, 0.9));
s.push(garis('M352 182 C362 172 372 174 380 164 C388 154 384 144 394 136 C402 130 412 132 420 124 C426 118 424 108 432 100', TINTA, 1.1));
s.push(garis('M344 180 C352 168 360 164 366 154 C372 144 368 136 378 128', TINTA, 0.9));
s.push(garis('M340 182 C334 168 344 158 338 146 C332 134 344 124 336 112 C330 102 340 92 334 78', TINTA, 1));

// Cabang kecil yang melengkung dan ujungnya melingkar (卷曲).
s.push(
  garis(
    'M286 140 C276 132 270 138 262 146 C256 152 248 150 246 144 q-1 -4 3 -5 ' +
      'M298 166 C286 166 276 172 266 168 C258 165 256 158 262 155 q4 -1 4 3 ' +
      'M394 136 C404 128 412 136 420 144 C426 150 434 148 436 142 q1 -4 -3 -5 ' +
      'M380 164 C392 164 402 170 412 166 C420 163 422 156 416 153 q-4 -1 -4 3 ' +
      'M338 146 C350 140 356 128 352 118 q-2 -4 -5 -1 ' +
      'M336 112 C326 108 318 98 322 90 q3 -3 5 1 ' +
      'M260 128 C252 132 244 128 240 120 q-1 -4 3 -4 ' +
      'M420 124 C428 128 436 124 440 116 q1 -4 -3 -4',
    TINTA,
    0.9
  )
);

// Kanopi seperti payung, cukup teduh untuk berbaring di bawahnya (寢臥其下), dengan
// celah tipis di antara gumpalan. Digambar dari belakang ke depan agar gumpalan depan
// menutupi yang di belakang.
const gumpalan = [
  [340, 54, 50, 25, 15],
  [262, 82, 44, 22, 13],
  [418, 84, 44, 22, 13],
  [240, 116, 40, 19, 12],
  [338, 108, 44, 19, 13],
  [436, 116, 40, 19, 12],
];
for (const [cx, cy, rx, ry, n] of gumpalan) {
  const { isi, tepi } = rimbun(cx, cy, rx, ry, n);
  s.push(`<path d="${isi}" fill="#F3EEE2"/>`);
  s.push(garis(tepi, ABU1, 1.1));
  s.push(garis(teksturDaun(cx, cy, rx, ry, 5), ABU2, 0.8));
}

// Rumput padang: kelompok goresan halus yang sangat tipis di sepanjang garis tanah,
// sedikit condong seperti tertiup angin; makin samar ke kejauhan.
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
s.push(rumput(48, 252, 270, 3, ABU4, 0.6));
s.push(rumput(400, 512, 269, 3, ABU4, 0.6));
s.push(rumput(70, 270, 300, 5, ABU3, 0.65));
s.push(rumput(370, 492, 305, 5, ABU3, 0.65));
s.push(rumput(60, 220, 326, 5, ABU3, 0.65, 30));
s.push(rumput(392, 500, 324, 5, ABU3, 0.65, 30));

// Stempel merah dengan garis abstrak, di pojok kiri atas yang lapang (kanan atas
// sudah terisi kanopi).
s.push(`<rect x="58" y="40" width="22" height="28" rx="2" fill="#A32D2D"/>`);
s.push(garis('M64 48 h10 M69 48 v15 M64 55 h4 M72 55 h2 M64 62 h10', '#F3EEE2', 1.2));

const svg = `<svg width="100%" viewBox="0 0 550 350" role="img" xmlns="http://www.w3.org/2000/svg"><title>Pohon yang tak berguna</title><desc>Pohon tua berbatang berbonggol dengan dahan-dahan yang berkelok dan berpilin di bawah kanopi daun yang lebar dan teduh, berdiri sendiri di padang rumput yang luas dan lapang. Digambar dengan garis tinta di atas kertas krem.</desc>${s.join('')}</svg>\n`;
writeFileSync(process.argv[2], svg);
console.log('svg', svg.length, 'byte');
