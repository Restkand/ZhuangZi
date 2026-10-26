// Dijalankan di <head> sebelum halaman tampil.
// 1. Terapkan pilihan tema agar tidak berkedip.
// 2. Setiap kali beranda dibuka, tandai agar pembuka kupu-kupu berjalan (lihat
//    public/js/kupu-datang.js dan global.css): saat dimuat penuh maupun saat kembali ke
//    beranda dari kisah di dalam situs.
// Router Astro mengganti atribut <html> setiap pindah halaman (alamat sudah diperbarui
// sebelum astro:after-swap), jadi keduanya dipasang lagi setiap kali halaman baru masuk.
const siapkanHalaman = () => {
  const akar = document.documentElement;
  try {
    const tema = localStorage.getItem('tema');
    if (tema === 'light' || tema === 'dark') akar.dataset.theme = tema;
  } catch {}

  const kurangiGerakan = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (location.pathname === '/' && !kurangiGerakan) akar.dataset.kupu = 'datang';
};

siapkanHalaman();
document.addEventListener('astro:after-swap', siapkanHalaman);
