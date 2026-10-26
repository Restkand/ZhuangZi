import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const kisah = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kisah' }),
  schema: z.object({
    judul: z.string(),
    bab: z.string(),
    ilustrasi: z.string(),
    // Deskripsi singkat ilustrasi untuk pembaca layar dan pratinjau tautan.
    ilustrasiAlt: z.string(),
    urutan: z.number(),
  }),
});

export const collections = { kisah };
