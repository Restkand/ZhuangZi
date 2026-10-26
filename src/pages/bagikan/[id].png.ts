// Kartu Story Instagram (1080×1920) untuk setiap kisah. Instagram tidak menampilkan
// pratinjau tautan di Story, jadi kartu ini diunggah sebagai gambar lalu diberi stiker tautan.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { isiKupu, viewBoxKupu } from '../../lib/kupu';
import { kartuStory } from '../../lib/pratinjau';
import { ringkasan } from '../../lib/ringkasan';

export const getStaticPaths = (async () => {
  const daftar = await getCollection('kisah');
  return daftar.map((kisah) => ({
    params: { id: kisah.id },
    props: {
      ilustrasi: kisah.data.ilustrasi,
      judul: kisah.data.judul,
      bab: kisah.data.bab,
      kutipan: kisah.data.kutipan ?? ringkasan(kisah.body ?? '', 130),
    },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const ilustrasi = await readFile(path.join(process.cwd(), 'public', props.ilustrasi));
  const kupu = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBoxKupu}" width="1200" height="800">${isiKupu(
      { pekat: '#2C2C2A', abu: '#888780', abuMuda: '#B4B2A9' }
    )}</svg>`
  );
  const png = await kartuStory({
    ilustrasi,
    kupu,
    kutipan: props.kutipan,
    judul: props.judul,
    bab: props.bab,
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
