// Milestones Timeline Filtering

document.addEventListener('DOMContentLoaded', () => {
  const milestoneSelect = document.getElementById('milestone-filter');
  const milestoneItems = document.querySelectorAll('.timeline-item');

  if (milestoneSelect) {
    milestoneSelect.addEventListener('change', (e) => {
      const selected = e.target.value;

      milestoneItems.forEach(item => {
        const itemStage = item.getAttribute('data-stage');
        if (selected === 'all' || itemStage === selected) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // Accordion Toggle for Milestone Cards
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.accordion-card');
      if (card) {
        card.classList.toggle('open');
      }
    });
  });
});
