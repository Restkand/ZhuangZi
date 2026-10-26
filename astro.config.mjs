import { defineConfig } from 'astro/config';
import rehypeRenungan from './src/plugins/rehype-renungan.mjs';

// Vercel mengisi alamat produksi saat build. Ganti dengan domain sendiri bila sudah ada.
const site = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:4321';

export default defineConfig({
  site,
  // CSS selalu jadi file terpisah, tidak disisipkan ke HTML, agar cocok dengan
  // Content-Security-Policy "style-src 'self'" di vercel.json.
  build: {
    inlineStylesheets: 'never',
  },
  markdown: {
    rehypePlugins: [rehypeRenungan],
  },
});
