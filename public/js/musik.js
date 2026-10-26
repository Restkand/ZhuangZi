// Tombol musik latar. Tidak pernah autoplay; file baru diunduh saat tombol ditekan.
(() => {
  const tombol = document.querySelector('.tombol-musik');
  const audio = document.querySelector('.audio-musik');
  if (!tombol || !audio) return;

  const teks = tombol.querySelector('.teks-musik');
  const perbarui = () => {
    tombol.setAttribute('aria-pressed', String(!audio.paused));
    teks.textContent = audio.paused ? 'Putar musik latar' : 'Hentikan musik latar';
  };

  audio.volume = 0.5;
  tombol.hidden = false;
  tombol.addEventListener('click', () => {
    if (!audio.paused) return audio.pause();
    // Bisa gagal bila jaringan putus atau browser menolak; beri tahu dengan tenang.
    audio.play().catch(() => {
      teks.textContent = 'Musik belum bisa diputar';
    });
  });
  audio.addEventListener('play', perbarui);
  audio.addEventListener('pause', perbarui);
})();
