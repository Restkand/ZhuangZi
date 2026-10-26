// Menulis teks Lora di gambar buatan server (kartu Story) sebagai bentuk vektor.
// Server build tidak punya font Lora, jadi huruf diubah menjadi <path> langsung dari
// file font @fontsource yang sudah ada di proyek; hasilnya sama di mana pun di-build.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { parse, type Font } from 'opentype.js';

const muat = (nama: string): Font => {
  const data = readFileSync(path.join(process.cwd(), 'node_modules/@fontsource/lora/files', nama));
  return parse(data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength));
};

export const LORA = {
  biasa: muat('lora-latin-400-normal.woff'),
  miring: muat('lora-latin-400-italic.woff'),
  tebal: muat('lora-latin-500-normal.woff'),
};

interface Gaya {
  font: Font;
  ukuran: number;
  warna: string;
  // Jarak tambahan antarhuruf dalam piksel, untuk label berhuruf kapital.
  jarak?: number;
}

const lebar = (teks: string, { font, ukuran, jarak = 0 }: Gaya) =>
  font.getAdvanceWidth(teks, ukuran) + jarak * Math.max(0, teks.length - 1);

// Memecah teks menjadi baris-baris yang muat dalam lebarMaks.
export function bungkus(teks: string, gaya: Gaya, lebarMaks: number) {
  const baris: string[] = [];
  let sekarang = '';
  for (const kata of teks.split(/\s+/)) {
    const coba = sekarang ? `${sekarang} ${kata}` : kata;
    if (sekarang && lebar(coba, gaya) > lebarMaks) {
      baris.push(sekarang);
      sekarang = kata;
    } else {
      sekarang = coba;
    }
  }
  if (sekarang) baris.push(sekarang);
  return baris;
}

// Satu baris teks rata tengah pada garis dasar y, sebagai <path>.
export function barisTengah(teks: string, gaya: Gaya, tengahX: number, y: number) {
  const { font, ukuran, warna, jarak = 0 } = gaya;
  let x = tengahX - lebar(teks, gaya) / 2;

  if (!jarak) {
    return `<path fill="${warna}" d="${font.getPath(teks, x, y, ukuran).toPathData(2)}"/>`;
  }
  // Dengan jarak antarhuruf: tulis per huruf.
  const bagian: string[] = [];
  for (const huruf of teks) {
    bagian.push(font.getPath(huruf, x, y, ukuran).toPathData(2));
    x += font.getAdvanceWidth(huruf, ukuran) + jarak;
  }
  return `<path fill="${warna}" d="${bagian.join(' ')}"/>`;
}
