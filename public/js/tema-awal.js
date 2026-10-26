// Dijalankan di <head> sebelum halaman tampil.
// 1. Terapkan pilihan tema agar tidak berkedip. Router Astro mengganti atribut <html>
//    setiap pindah halaman, jadi tema dipasang lagi setiap kali halaman baru masuk.
// 2. Setiap kali beranda dibuka (tautan dari luar, tab baru, atau muat ulang), tandai agar
//    pembuka kupu-kupu berjalan (lihat public/js/kupu-datang.js dan global.css). Saat
//    kembali ke beranda dari kisah di dalam situs, pembuka sengaja tidak diulang, karena
//    tanda ini hanya dipasang saat halaman dimuat penuh, bukan setelah pindah halaman.
const terapkanTema = () => {
  try {
    const tema = localStorage.getItem('tema');
    if (tema === 'light' || tema === 'dark') document.documentElement.dataset.theme = tema;
  } catch {}
};

terapkanTema();
document.addEventListener('astro:after-swap', terapkanTema);

const kurangiGerakan = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (location.pathname === '/' && !kurangiGerakan) {
  document.documentElement.dataset.kupu = 'datang';
}
