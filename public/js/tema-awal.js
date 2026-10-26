// Dijalankan di <head> sebelum halaman tampil.
// 1. Terapkan pilihan tema agar tidak berkedip. Router Astro mengganti atribut <html>
//    setiap pindah halaman, jadi tema dipasang lagi setiap kali halaman baru masuk.
// 2. Saat beranda dibuka untuk pertama kali di peramban ini, tandai agar pembuka
//    kupu-kupu berjalan (lihat public/js/kupu-datang.js dan global.css).
const terapkanTema = () => {
  try {
    const tema = localStorage.getItem('tema');
    if (tema === 'light' || tema === 'dark') document.documentElement.dataset.theme = tema;
  } catch {}
};

terapkanTema();
document.addEventListener('astro:after-swap', terapkanTema);

try {
  const kurangiGerakan = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (location.pathname === '/' && !kurangiGerakan && !localStorage.getItem('kupuSudahDatang')) {
    document.documentElement.dataset.kupu = 'datang';
    localStorage.setItem('kupuSudahDatang', '1');
  }
} catch {}
