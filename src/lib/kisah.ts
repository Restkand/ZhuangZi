import { getCollection } from 'astro:content';

// Semua kisah, diurutkan menurut `urutan`. Build sengaja gagal bila ada dua kisah
// dengan urutan yang sama, karena urutan dan tautan "Kisah berikutnya" jadi tidak pasti.
export async function daftarKisah() {
  const daftar = (await getCollection('kisah')).sort((a, b) => a.data.urutan - b.data.urutan);

  for (let i = 1; i < daftar.length; i++) {
    if (daftar[i].data.urutan === daftar[i - 1].data.urutan) {
      throw new Error(
        `Dua kisah memakai urutan ${daftar[i].data.urutan}: "${daftar[i - 1].id}" dan "${daftar[i].id}". Beri salah satunya nomor lain.`
      );
    }
  }

  return daftar;
}
