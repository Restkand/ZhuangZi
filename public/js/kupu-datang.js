// Pembuka kupu-kupu di beranda, hanya pada kunjungan pertama (penanda data-kupu dari
// tema-awal.js). Kupu-kupu muncul kecil di tengah layar, membesar, lalu terbang ke
// tempatnya di atas judul; halaman muncul perlahan. Gerakannya di global.css; skrip ini
// hanya menghitung jarak dari tengah layar ke tempat kupu-kupu, lalu memulai animasi.
// Sekali ketuk, klik, gulir, atau tekan tombol langsung melewatinya.
(() => {
  const akar = document.documentElement;
  if (akar.dataset.kupu !== 'datang') return;

  const kupu = document.querySelector('.kupu-beranda');
  if (!kupu) {
    delete akar.dataset.kupu;
    return;
  }

  const kotak = kupu.getBoundingClientRect();
  kupu.style.setProperty('--kupu-dx', `${innerWidth / 2 - (kotak.left + kotak.width / 2)}px`);
  kupu.style.setProperty('--kupu-dy', `${innerHeight / 2 - (kotak.top + kotak.height / 2)}px`);

  const henti = new AbortController();
  const selesai = () => {
    henti.abort();
    delete akar.dataset.kupu;
    kupu.style.removeProperty('--kupu-dx');
    kupu.style.removeProperty('--kupu-dy');
  };

  kupu.addEventListener('animationend', (e) => e.animationName === 'kupu-pembuka' && selesai(), {
    signal: henti.signal,
  });
  for (const jenis of ['pointerdown', 'keydown', 'wheel', 'touchstart']) {
    addEventListener(jenis, selesai, { signal: henti.signal, passive: true });
  }

  akar.dataset.kupu = 'terbang';
})();
