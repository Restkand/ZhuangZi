import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import rehypeRenungan from './src/plugins/rehype-renungan.mjs';

export default defineConfig({
  // Alamat utama situs: dipakai untuk canonical, sitemap, RSS, dan gambar pratinjau tautan.
  site: 'https://pohontakberguna.com',
  // sitemap-index.xml untuk mesin pencari; robots.txt menunjuk ke sini.
  integrations: [sitemap()],
  // CSS selalu jadi file terpisah, tidak disisipkan ke HTML, agar cocok dengan
  // Content-Security-Policy "style-src 'self'" di vercel.json.
  build: {
    inlineStylesheets: 'never',
  },
  // Pemroses Markdown remark/rehype dengan plugin yang membungkus bagian renungan.
  markdown: {
    processor: unified({ rehypePlugins: [rehypeRenungan] }),
  },
});
