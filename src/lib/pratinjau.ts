import sharp from 'sharp';

const KERTAS = '#F3EEE2';

// Menaruh sebuah SVG di tengah kanvas kertas 1200×630, ukuran standar pratinjau tautan.
export async function gambarPratinjau(svg: Buffer, lebar: number, tinggi: number, stempel = false) {
  const isi = await sharp(svg, { density: 300 })
    .resize({ width: lebar, height: tinggi, fit: 'inside' })
    .png()
    .toBuffer();

  const lapisan: sharp.OverlayOptions[] = [{ input: isi, gravity: 'center' }];
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

// Kartu Story Instagram 1080×1920: kupu-kupu di atas, ilustrasi kisah di tengah, goresan
// kuas, lalu ruang kosong di bawah untuk stiker tautan. Stempel sudah ada di ilustrasi.
// Tanpa teks; judul ditulis pembagi langsung di Instagram.
export async function kartuStory(ilustrasi: Buffer, kupu: Buffer) {
  const LEBAR = 1080;
  const TINGGI = 1920;

  const tengah = async (svg: Buffer, lebar: number, tinggi: number, top: number) => {
    const { data, info } = await sharp(svg, { density: 300 })
      .resize({ width: lebar, height: tinggi, fit: 'inside' })
      .png()
      .toBuffer({ resolveWithObject: true });
    return { input: data, top, left: Math.round((LEBAR - info.width) / 2) };
  };

  const goresan = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="25" viewBox="0 0 96 12"><path fill="#888780" d="M4 7C22 3.5 52 3 78 5.5c6 .5 10 1.1 12 1.9-10 .2-30 .8-50 1C24 8.6 12 8.4 4 7Z"/></svg>`
  );
  const lapisan: sharp.OverlayOptions[] = [
    await tengah(kupu, 220, 150, 250),
    await tengah(ilustrasi, 960, 620, 520),
    { input: goresan, top: 1180, left: (LEBAR - 200) / 2 },
  ];

  return sharp({ create: { width: LEBAR, height: TINGGI, channels: 3, background: KERTAS } })
    .composite(lapisan)
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();
}
