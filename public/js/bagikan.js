// Menyalakan tombol "Bagikan…" (menu bagikan bawaan perangkat) dan "Salin tautan"
// di baris bagikan kisah, bila peramban mendukungnya. Router Astro menjalankan ulang
// skrip ini di setiap halaman kisah, jadi setiap baris hanya disiapkan sekali.
(() => {
  const baris = document.querySelector('.bagikan');
  if (!baris || baris.dataset.siap) return;
  baris.dataset.siap = '1';

  const { judul, alamat } = baris.dataset;

  const tombolBagikan = baris.querySelector('.tombol-bagikan');
  if (tombolBagikan && navigator.share) {
    tombolBagikan.hidden = false;
    tombolBagikan.addEventListener('click', () => {
      // Dibatalkan pembaca juga dianggap gagal; tidak perlu pesan apa pun.
      navigator.share({ title: judul, url: alamat }).catch(() => {});
    });
  }

  const tombolSalin = baris.querySelector('.tombol-salin');
  if (tombolSalin && navigator.clipboard) {
    tombolSalin.hidden = false;
    tombolSalin.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(alamat);
        tombolSalin.textContent = 'Tautan tersalin';
      } catch {
        tombolSalin.textContent = 'Belum bisa menyalin';
      }
      setTimeout(() => (tombolSalin.textContent = 'Salin tautan'), 2000);
    });
  }
})();
