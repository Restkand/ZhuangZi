import { defineConfig } from 'astro/config';
import rehypeRenungan from './src/plugins/rehype-renungan.mjs';

export default defineConfig({
  markdown: {
    rehypePlugins: [rehypeRenungan],
  },
});
