// Umpan RSS: cara mengikuti kisah baru tanpa notifikasi dan tanpa email.
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { daftarKisah } from '../lib/kisah';
import { ringkasan } from '../lib/ringkasan';

export const GET: APIRoute = async (context) => {
  const daftar = await daftarKisah();
  return rss({
    title: 'Kisah Zhuangzi',
    description: 'Kisah-kisah dari kitab Zhuangzi, diceritakan ulang dalam bahasa Indonesia yang tenang.',
    site: context.site!,
    items: daftar.map((kisah) => ({
      title: kisah.data.judul,
      description: ringkasan(kisah.body ?? ''),
      link: `/kisah/${kisah.id}/`,
      categories: [kisah.data.bab],
    })),
    customData: '<language>id</language>',
  });
};
