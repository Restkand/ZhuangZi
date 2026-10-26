// Tombol mode malam. Tanpa JavaScript, tombol tetap tersembunyi dan tema mengikuti perangkat.
(() => {
  const tombol = document.querySelector('.tombol-tema');
  // Header dipertahankan antarhalaman; jangan pasang pendengar dua kali.
  if (!tombol || tombol.dataset.siap) return;
  tombol.dataset.siap = '1';

  const akar = document.documentElement;
  const gelap = () =>
    akar.dataset.theme
      ? akar.dataset.theme === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;
  const perbarui = () =>
    tombol.setAttribute('aria-label', gelap() ? 'Ganti ke mode terang' : 'Ganti ke mode malam');

  tombol.hidden = false;
  perbarui();
  tombol.addEventListener('click', () => {
    akar.dataset.theme = gelap() ? 'light' : 'dark';
    try {
      localStorage.setItem('tema', akar.dataset.theme);
    } catch {}
    perbarui();
  });
})();
