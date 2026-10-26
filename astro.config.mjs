import { defineConfig } from 'astro/config';
import rehypeRenungan from './src/plugins/rehype-renungan.mjs';

// Vercel mengisi alamat produksi saat build. Ganti dengan domain sendiri bila sudah ada.
const site = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:4321';

export default defineConfig({
  site,
  markdown: {
    rehypePlugins: [rehypeRenungan],
  },
});
