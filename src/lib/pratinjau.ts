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
