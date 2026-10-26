// Semua yang ada setelah baris <!-- renungan --> dibungkus dalam
// <section class="renungan">, didahului pemisah yang tenang.
export default function rehypeRenungan() {
  return (tree) => {
    // Astro meneruskan HTML di Markdown sebagai node 'raw', bukan 'comment'.
    const i = tree.children.findIndex(
      (node) =>
        (node.type === 'comment' && node.value.trim() === 'renungan') ||
        (node.type === 'raw' && /^<!--\s*renungan\s*-->$/.test(node.value.trim()))
    );
    if (i === -1) return;

    const isi = tree.children.slice(i + 1);
    tree.children.splice(
      i,
      tree.children.length - i,
      {
        type: 'element',
        tagName: 'div',
        properties: { className: ['pemisah'], ariaHidden: 'true' },
        children: [{ type: 'text', value: '· · ·' }],
      },
      {
        type: 'element',
        tagName: 'section',
        properties: { className: ['renungan'], ariaLabel: 'Renungan' },
        children: isi,
      }
    );
  };
}
