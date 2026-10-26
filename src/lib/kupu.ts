// Kupu-kupu tinta, lambang situs. Merujuk mimpi kupu-kupu Zhuangzi (Bab 2).
// Sayap berupa bentuk berisi yang meruncing, seperti goresan kuas: tebal di
// tepi luar, tipis di dekat badan. Sayap kanan sedikit berbeda agar terasa
// sedang terbang, bukan ikon yang simetris.
//
// Dipakai oleh komponen Kupu (warna dari variabel CSS) dan gambar pratinjau
// tautan (warna tetap), jadi warnanya diberikan dari luar.

interface Warna {
  pekat: string;
  abu: string;
  abuMuda: string;
}

export const viewBoxKupu = '0 0 120 80';

export function isiKupu({ pekat, abu, abuMuda }: Warna) {
  return `
<g transform="rotate(-8 60 40)" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 70 C16 64 24 71 32 66 C36 63.5 39 64 42 65.5" fill="none" stroke="${abuMuda}" stroke-width="0.8" stroke-dasharray="7 4 12 5"/>
  <path d="M58 38 C48 21 29 10 19 15 C12 19 17 31 28 37 C38 42 50 41.5 58 40.2 L57 39.6 C50 40.4 39 40 29 35.6 C19.5 30 15.2 20 20.4 17 C30 13.2 47.5 23 58 38 Z" fill="${pekat}"/>
  <path d="M62 37.5 C71 20 88 9 99 12.5 C105.5 15 101 27 91 34 C81 40 70 40.5 62 39.8 L63 39.2 C70.5 39.4 80.5 38.4 89.6 32.8 C98.6 26.4 102.6 16.4 97.8 14.6 C88 11.6 72 21.5 62 37.5 Z" fill="${pekat}"/>
  <path d="M58 43 C48 46 37 52 35 60 C34 67 44 67.5 50 61 C54 56.5 57 50 58.6 44.6 L57.6 44.8 C56 49.5 53 55.5 49 59.6 C44 64.6 36.6 64.5 37.2 60 C39 53 48.5 47.4 58 43 Z" fill="${pekat}"/>
  <path d="M62 43.5 C71 47 80 53.5 81.5 61 C82.5 66.5 75 66.5 70 61 C66 56.5 63.4 50.5 62 45 L63 45.2 C64.6 50 67.4 55.4 71 59.4 C75 63.6 80 63.4 79.6 60.6 C78 54 70.5 48.4 62 43.5 Z" fill="${pekat}"/>
  <path d="M56 38.5 C46 29 33 21 23 19 M64 38 C74 28 86 19.5 96 16.5" fill="none" stroke="${abu}" stroke-width="0.8"/>
  <path d="M30 25 C37 30 45 34 53 37 M88 23 C81 28.5 74 33 67 36.5" fill="none" stroke="${abuMuda}" stroke-width="0.7"/>
  <path d="M40 57 l3 -3 M42 61 l3 -3 M45 63 l3 -3 M78 58 l-3 -3 M76 61.5 l-3 -3" fill="none" stroke="${abu}" stroke-width="0.8"/>
  <path d="M60 29.5 C61.7 36 61.7 48 60 58 C58.3 48 58.3 36 60 29.5 Z" fill="${pekat}"/>
  <path d="M59 31 C56.5 24 52.5 19.5 47 17.5 M61 31 C63.5 25 67 21 72.5 19.5" fill="none" stroke="${pekat}" stroke-width="0.9"/>
  <circle cx="47" cy="17.5" r="1.2" fill="${pekat}"/>
  <circle cx="72.5" cy="19.5" r="1.2" fill="${pekat}"/>
</g>`;
}
