// Identitas situs, di satu tempat. Nama diambil dari kisah pohon yang tak berguna
// di Bab 1: karena tak berguna, ia tak ditebang, dan orang bisa beristirahat di bawahnya.
export const NAMA = 'Pohon Tak Berguna';
export const SLOGAN = 'Tempat berteduh bersama kisah-kisah Zhuangzi';
export const DESKRIPSI =
  'Kisah-kisah dari kitab Zhuangzi, diceritakan ulang dalam bahasa Indonesia yang tenang. Tempat berteduh untuk dibaca pelan-pelan.';
export const PENULIS = 'Restkand';

// Alamat untuk masukan dan laporan kekeliruan dari pembaca.
export const EMAIL = 'renaldi.iskandar07@gmail.com';

// Tautan mailto dengan subjek yang sudah terisi.
export const tautanEmail = (subjek: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(subjek)}`;

// Data terstruktur (JSON-LD) untuk mesin pencari. Tanda "<" di-escape agar isi
// teks tidak bisa menutup tag <script> lebih awal.
export function jsonLd(data: Record<string, unknown>) {
  return JSON.stringify({ '@context': 'https://schema.org', ...data }).replace(/</g, '\\u003c');
}
