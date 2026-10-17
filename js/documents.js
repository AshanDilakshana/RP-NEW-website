// Document Repository Filtering & Search

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('doc-search');
  const categoryChips = document.querySelectorAll('.filter-chip[data-category]');
  const docCards = document.querySelectorAll('.doc-item');
  const countEl = document.getElementById('doc-count');

  let activeCategory = 'all';
  let searchQuery = '';

  function filterDocuments() {
    let visibleCount = 0;

    docCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardText = (card.textContent || '').toLowerCase();
      const matchesCategory = (activeCategory === 'all' || cardCategory === activeCategory);
      const matchesSearch = (!searchQuery || cardText.includes(searchQuery));

      if (matchesCategory && matchesSearch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Toggle category block wrappers
    document.querySelectorAll('.doc-category-block').forEach(block => {
      const visibleChildren = block.querySelectorAll('.doc-item:not([style*="display: none"])');
      if (visibleChildren.length > 0) {
        block.style.display = '';
      } else {
        block.style.display = 'none';
      }
    });

    if (countEl) {
      countEl.textContent = `Showing ${visibleCount} document${visibleCount === 1 ? '' : 's'}`;
    }
  }

  // Category chip clicks
  categoryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      categoryChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.getAttribute('data-category');
      filterDocuments();
    });
  });

  // Search input typing
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterDocuments();
    });
  }

  filterDocuments();
});
