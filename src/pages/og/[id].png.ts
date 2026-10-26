// Gambar pratinjau tautan (WhatsApp, media sosial) untuk setiap kisah.
// Platform-platform itu tidak menampilkan SVG, jadi ilustrasi dijadikan PNG saat build.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { gambarPratinjau } from '../../lib/pratinjau';

export const getStaticPaths = (async () => {
  const daftar = await getCollection('kisah');
  return daftar.map((kisah) => ({
    params: { id: kisah.id },
    props: { ilustrasi: kisah.data.ilustrasi },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const svg = await readFile(path.join(process.cwd(), 'public', props.ilustrasi));
  const png = await gambarPratinjau(svg, 1040, 560);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
