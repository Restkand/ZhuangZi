import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const kisah = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kisah' }),
  schema: z.object({
    judul: z.string(),
    bab: z.string(),
    ilustrasi: z.string(),
    // Deskripsi singkat ilustrasi untuk pembaca layar dan pratinjau tautan.
    ilustrasiAlt: z.string(),
    // Satu atau dua kalimat dari kisah untuk kartu Story Instagram. Bila kosong,
    // kartu memakai ringkasan paragraf pertama.
    kutipan: z.string().optional(),
    // Opsional: satu baris teks asli Tionghoa (domain publik) beserta artinya,
    // ditampilkan di awal kisah.
    teksAsli: z.string().optional(),
    teksAsliArti: z.string().optional(),
    // Opsional: 2–3 kalimat "Tentang kisah ini", ditampilkan setelah catatan sumber.
    tentang: z.string().optional(),
    // Urutan di dalam bab yang sama, mulai dari 1. Antarbab diurutkan menurut nomor bab.
    urutan: z.number(),
  }),
});

export const collections = { kisah };
