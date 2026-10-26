// Terapkan pilihan tema sebelum halaman tampil, agar tidak berkedip.
// Saat pindah halaman, router Astro mengganti atribut <html>, jadi pilihan
// tema dipasang lagi setiap kali halaman baru masuk.
const terapkanTema = (doc) => {
  try {
    const tema = localStorage.getItem('tema');
    if (tema === 'light' || tema === 'dark') doc.documentElement.dataset.theme = tema;
  } catch {}
};

terapkanTema(document);
document.addEventListener('astro:after-swap', () => terapkanTema(document));
