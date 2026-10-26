// Gambar pratinjau tautan untuk beranda dan halaman lain: kupu-kupu tinta dan stempel.
import type { APIRoute } from 'astro';
import { isiKupu, viewBoxKupu } from '../../lib/kupu';
import { gambarPratinjau } from '../../lib/pratinjau';

export const GET: APIRoute = async () => {
  const kupu = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBoxKupu}" width="1200" height="800">${isiKupu(
    { pekat: '#2C2C2A', abu: '#888780', abuMuda: '#B4B2A9' }
  )}</svg>`;
  const png = await gambarPratinjau(Buffer.from(kupu), 520, 350, true);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
