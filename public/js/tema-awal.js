// Dijalankan di <head> sebelum halaman tampil.
// 1. Terapkan pilihan tema agar tidak berkedip.
// 2. Saat beranda pertama kali dibuka dalam satu kunjungan, tandai agar kupu-kupu
//    terbang masuk (animasinya di global.css). Kunjungan berikutnya: kupu-kupu sudah hinggap.
// Router Astro mengganti atribut <html> setiap pindah halaman, jadi keduanya dipasang
// lagi setiap kali halaman baru masuk.
const siapkanHalaman = () => {
  const akar = document.documentElement;
  try {
    const tema = localStorage.getItem('tema');
    if (tema === 'light' || tema === 'dark') akar.dataset.theme = tema;
  } catch {}

  try {
    if (location.pathname === '/' && !sessionStorage.getItem('kupuDatang')) {
      akar.dataset.kupu = 'datang';
      sessionStorage.setItem('kupuDatang', '1');
    }
  } catch {}
};

siapkanHalaman();
document.addEventListener('astro:after-swap', siapkanHalaman);
