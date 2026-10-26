// Tombol musik latar. Tidak pernah autoplay; file baru diunduh saat tombol ditekan.
(() => {
  const tombol = document.querySelector('.tombol-musik');
  const audio = document.querySelector('.audio-musik');
  // Header dipertahankan antarhalaman; jangan pasang pendengar dua kali.
  if (!tombol || !audio || tombol.dataset.siap) return;
  tombol.dataset.siap = '1';

  const label = (teks) => {
    tombol.setAttribute('aria-label', teks);
    tombol.title = teks;
  };
  const perbarui = () => {
    tombol.setAttribute('aria-pressed', String(!audio.paused));
    label(audio.paused ? 'Putar musik latar' : 'Hentikan musik latar');
  };

  audio.volume = 0.5;
  tombol.hidden = false;
  tombol.addEventListener('click', () => {
    if (!audio.paused) return audio.pause();
    // Bisa gagal bila jaringan memblokir atau browser menolak; beri tahu dengan tenang.
    audio.play().catch(() => label('Musik belum bisa diputar di jaringan ini'));
  });
  audio.addEventListener('play', perbarui);
  audio.addEventListener('pause', perbarui);
})();
