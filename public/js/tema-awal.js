// Terapkan pilihan tema sebelum halaman tampil, agar tidak berkedip.
try {
  const tema = localStorage.getItem('tema');
  if (tema === 'light' || tema === 'dark') document.documentElement.dataset.theme = tema;
} catch {}
