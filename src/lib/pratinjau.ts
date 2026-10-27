import sharp, { type OverlayOptions } from 'sharp';
import { LORA, barisTengah, bungkus } from './teks-gambar.ts';

const KERTAS = '#F3EEE2';

// Menaruh sebuah SVG di tengah kanvas kertas 1200×630, ukuran standar pratinjau tautan.
export async function gambarPratinjau(svg: Buffer, lebar: number, tinggi: number, stempel = false) {
  const isi = await sharp(svg, { density: 300 })
    .resize({ width: lebar, height: tinggi, fit: 'inside' })
    .png()
    .toBuffer();

  const lapisan: OverlayOptions[] = [{ input: isi, gravity: 'center' }];
  if (stempel) {
    lapisan.push({
      input: Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="56" viewBox="0 0 22 28"><rect width="22" height="28" rx="2" fill="#A32D2D"/><path d="M6 7 h10 M6 14 h10 M11 7 v15 M6 21 h10" stroke="${KERTAS}" stroke-width="1.4" stroke-linecap="round"/></svg>`
      ),
      top: 60,
      left: 1080,
    });
  }

  return sharp({ create: { width: 1200, height: 630, channels: 3, background: KERTAS } })
    .composite(lapisan)
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();
}

interface IsiKartu {
  ilustrasi: Buffer;
  kupu: Buffer;
  kutipan: string;
  judul: string;
  bab: string;
}

// Kartu Story Instagram 1080×1920. Semua isi berada di zona aman (y 230–1650) agar tidak
// tertutup foto profil di atas dan kolom balasan di bawah. Dari atas: kupu-kupu dan nama
// situs, ilustrasi, kutipan, judul dan bab, alamat situs, lalu ruang untuk stiker tautan.
export async function kartuStory({ ilustrasi, kupu, kutipan, judul, bab }: IsiKartu) {
  const LEBAR = 1080;
  const TINGGI = 1920;
  const TENGAH = LEBAR / 2;
  const TEKS_MAKS = 860;

  const tengah = async (svg: Buffer, lebar: number, tinggi: number, top: number) => {
    const { data, info } = await sharp(svg, { density: 300 })
      .resize({ width: lebar, height: tinggi, fit: 'inside' })
      .png()
      .toBuffer({ resolveWithObject: true });
    return { lapisan: { input: data, top, left: Math.round((LEBAR - info.width) / 2) }, tinggi: info.height };
  };

  const kupuKecil = await tengah(kupu, 130, 90, 230);
  const gambar = await tengah(ilustrasi, 900, 580, 410);

  // Teks ditulis sebagai satu SVG transparan selebar kartu, lalu ditumpuk di atasnya.
  const teks: string[] = [];
  teks.push(barisTengah('POHON TAK BERGUNA', { font: LORA.tebal, ukuran: 24, warna: '#5F5E5A', jarak: 6 }, TENGAH, 368));

  let y = 410 + gambar.tinggi + 120;
  const gayaKutipan = { font: LORA.miring, ukuran: 54, warna: '#2C2C2A' };
  for (const baris of bungkus(`“${kutipan}”`, gayaKutipan, TEKS_MAKS)) {
    teks.push(barisTengah(baris, gayaKutipan, TENGAH, y));
    y += 78;
  }

  y += 50;
  const gayaJudul = { font: LORA.tebal, ukuran: 32, warna: '#2C2C2A' };
  for (const baris of bungkus(judul, gayaJudul, TEKS_MAKS)) {
    teks.push(barisTengah(baris, gayaJudul, TENGAH, y));
    y += 46;
  }
  teks.push(barisTengah(`Dari kitab Zhuangzi, ${bab}`, { font: LORA.miring, ukuran: 26, warna: '#5F5E5A' }, TENGAH, y + 4));
  teks.push(barisTengah('pohontakberguna.com', { font: LORA.biasa, ukuran: 26, warna: '#888780', jarak: 1 }, TENGAH, y + 80));

  const lapisanTeks = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${LEBAR}" height="${TINGGI}">${teks.join('')}</svg>`
  );

  return sharp({ create: { width: LEBAR, height: TINGGI, channels: 3, background: KERTAS } })
    .composite([kupuKecil.lapisan, gambar.lapisan, { input: lapisanTeks, top: 0, left: 0 }])
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();
}
