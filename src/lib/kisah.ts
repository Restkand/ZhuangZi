import { getCollection } from 'astro:content';

// Nomor bab dari kolom `bab`, misalnya "Bab 3: Merawat Kehidupan" menjadi 3.
export function nomorBab(bab: string) {
  const nomor = Number(bab.match(/^Bab (\d+)/)?.[1]);
  if (!nomor) throw new Error(`Kolom bab harus diawali "Bab <nomor>", misalnya "Bab 3: Merawat Kehidupan". Tertulis: "${bab}".`);
  return nomor;
}

// Semua kisah, diurutkan mengikuti urutan kitab: menurut nomor bab, lalu `urutan` untuk
// kisah-kisah di dalam bab yang sama. Urutan ini juga menentukan tautan "Kisah berikutnya".
// Build sengaja gagal bila dua kisah dalam bab yang sama memakai urutan yang sama.
export async function daftarKisah() {
  const daftar = (await getCollection('kisah')).sort(
    (a, b) => nomorBab(a.data.bab) - nomorBab(b.data.bab) || a.data.urutan - b.data.urutan
  );

  for (let i = 1; i < daftar.length; i++) {
    const [sebelum, ini] = [daftar[i - 1], daftar[i]];
    if (nomorBab(sebelum.data.bab) === nomorBab(ini.data.bab) && sebelum.data.urutan === ini.data.urutan) {
      throw new Error(
        `Dua kisah di Bab ${nomorBab(ini.data.bab)} memakai urutan ${ini.data.urutan}: "${sebelum.id}" dan "${ini.id}". Beri salah satunya nomor lain.`
      );
    }
  }

  return daftar;
}
