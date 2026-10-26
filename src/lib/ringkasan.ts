// Ringkasan pendek dari paragraf pertama kisah, untuk RSS dan pratinjau tautan.
export function ringkasan(body: string, panjang = 160) {
  const paragraf =
    body
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .find((p) => p && !p.startsWith('#') && !p.startsWith('<!--')) ?? '';

  if (paragraf.length <= panjang) return paragraf;
  return paragraf.slice(0, paragraf.lastIndexOf(' ', panjang)) + '…';
}
