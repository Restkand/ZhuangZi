// Menyusun ilustrasi "Juru Masak Ding" (public/ilustrasi/juru-masak-ding.svg).
// Pemakaian: node alat/gambar-juru-masak.mjs public/ilustrasi/juru-masak-ding.svg
//
// Komposisinya sama dengan ilustrasi pertama (talenan bundar, pisau dapur lebar, irisan
// kecil), tetapi garisnya ditipiskan agar senada dengan ilustrasi kisah lainnya, dan
// ukurannya diseragamkan menjadi 550×350.
import { writeFileSync } from 'node:fs';

const TINTA = '#2C2C2A', ABU1 = '#5F5E5A', ABU2 = '#888780', ABU3 = '#B4B2A9', ABU4 = '#D3D1C7';
const KERTAS = '#F3EEE2';
const garis = (d, warna, tebal, extra = '') =>
  `<path d="${d}" fill="none" stroke="${warna}" stroke-width="${tebal}" stroke-linecap="round" stroke-linejoin="round"${extra}/>`;
const elips = (cx, cy, rx, ry, warna, tebal, extra = '') =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${warna}" stroke-width="${tebal}"${extra}/>`;

const s = [];

// Garis tipis di kejauhan.
s.push(garis('M60 70 C110 60 150 64 190 58', ABU3, 0.8));
s.push(garis('M90 86 C130 80 160 82 196 76', ABU4, 0.8));

// Talenan kayu bundar: permukaan, sisi tebal, dan lingkar tahun kayu.
s.push(elips(270, 200, 175, 58, TINTA, 1.15));
s.push(garis('M95 200 L95 240 M445 200 L445 240', TINTA, 1.15));
s.push(garis('M95 240 A175 58 0 0 0 445 240', TINTA, 1.15));
s.push(elips(270, 200, 122, 39, ABU2, 0.7, ' stroke-dasharray="46 7 70 9" stroke-linecap="round"'));
s.push(elips(270, 200, 72, 23, ABU2, 0.65, ' stroke-dasharray="30 6 40 8" stroke-linecap="round"'));
s.push(elips(270, 200, 28, 9, ABU3, 0.6));
// Serat kayu di sisi talenan, dan arsiran bayangan di permukaannya.
s.push(garis('M120 240 v22 M160 255 v25 M200 262 v26 M240 266 v26 M270 268 v26 M300 266 v26 M340 262 v26 M380 255 v25 M420 240 v22', ABU2, 0.6));
s.push(garis('M140 250 v14 M180 259 v16 M220 264 v16 M320 264 v16 M360 259 v16 M400 250 v14', ABU3, 0.55));
s.push(garis('M200 240 l10 -3 M222 241 l10 -3 M246 239 l10 -3 M270 236 l10 -3 M294 232 l10 -3', ABU3, 0.6));

// Pisau dapur lebar: bilah, bevel, kilap, paku, punggung bilah, dan gagang.
s.push(`<path d="M180 196 L310 178 L318 214 L192 234 Q176 216 180 196 Z" fill="${KERTAS}" stroke="${TINTA}" stroke-width="1.15" stroke-linejoin="round"/>`);
s.push(garis('M191 225 L316 206', ABU2, 0.7));
s.push(garis('M220 200 L290 190 M230 210 L284 202', ABU3, 0.6));
s.push(`<circle cx="199" cy="203" r="4" fill="none" stroke="${TINTA}" stroke-width="0.9"/>`);
s.push(garis('M310 178 L318 214', TINTA, 1.3));
s.push(`<path d="M318 186 L398 176 Q410 177 410 186 L410 190 Q408 198 398 199 L320 206 Z" fill="${KERTAS}" stroke="${TINTA}" stroke-width="1.1" stroke-linejoin="round"/>`);
s.push(garis('M330 192 L398 184 M332 199 L396 192', ABU2, 0.6));
s.push(`<circle cx="392" cy="188" r="1.6" fill="${TINTA}"/>`);

// Irisan-irisan kecil di tepi talenan.
s.push(elips(216, 246, 7, 3, TINTA, 0.8));
s.push(elips(233, 248, 7, 3, TINTA, 0.8));
s.push(elips(250, 245, 6, 2.6, TINTA, 0.8));

// Garis gerak halus: ayunan pisau yang tenang.
s.push(garis('M140 176 C160 166 180 160 205 160', ABU1, 0.8));
s.push(garis('M150 182 C168 174 186 170 204 170', ABU2, 0.7));
s.push(garis('M205 160 l8 -4 M204 170 l9 -2', ABU1, 0.7));

// Isi digeser 5 piksel ke bawah agar tetap di tengah kanvas 550×350.
const isi = `<g transform="translate(0 5)">${s.join('')}</g>`;
const stempel =
  `<rect x="468" y="44" width="22" height="28" rx="2" fill="#A32D2D"/>` +
  garis('M474 51 h10 M474 58 h10 M479 51 v15 M474 65 h10', KERTAS, 1.2);

const svg = `<svg width="100%" viewBox="0 0 550 350" role="img" xmlns="http://www.w3.org/2000/svg"><title>Pisau dan talenan Juru Masak Ding</title><desc>Talenan kayu bundar dengan serat, pisau dapur lebar di atasnya, dan beberapa irisan kecil, digambar dengan garis tinta tipis di atas kertas krem</desc><rect x="0" y="0" width="550" height="350" rx="12" fill="${KERTAS}"/>${isi}${stempel}</svg>\n`;
writeFileSync(process.argv[2], svg);
console.log('svg', svg.length, 'byte');
