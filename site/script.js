// Copy install command
function copyInstall() {
  const cmd = document.getElementById('install-cmd').textContent;
  navigator.clipboard.writeText(cmd);
  showToast();
}

// Copy skill install command
function copySkill(skillName) {
  const cmd = `npx skills add KrishnaShettyDev/dosed --skill ${skillName}`;
  navigator.clipboard.writeText(cmd);
  showToast();
}

// Show toast notification
function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

// Filter substances by category
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    const cards = document.querySelectorAll('.substances-grid .skill-card');

    cards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
        // Re-trigger animation
        card.style.animation = 'none';
        card.offsetHeight; // Trigger reflow
        card.style.animation = null;
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add hover effect sound (optional, subtle)
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.borderColor = 'var(--border-hover)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.borderColor = 'var(--border)';
  });
});

// Keyboard navigation for install buttons
document.querySelectorAll('.skill-install').forEach(btn => {
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      btn.click();
    }
  });
});

// Search functionality (optional enhancement)
function initSearch() {
  const searchInput = document.getElementById('search');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.skill-card');

    cards.forEach(card => {
      const name = card.querySelector('.skill-name').textContent.toLowerCase();
      const desc = card.querySelector('.skill-desc').textContent.toLowerCase();

      if (name.includes(query) || desc.includes(query)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initSearch();

  // Add intersection observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.skill-card, .science-card, .why-card').forEach(el => {
    observer.observe(el);
  });
});

// Console easter egg
console.log(`
%c◉ DOSED %c- Cognitive tools for AI agents

%cTask-matched mental modes.
Different work needs different minds.

Install: npx skills add KrishnaShettyDev/dosed

https://github.com/KrishnaShettyDev/dosed
`,
'color: #a855f7; font-size: 20px; font-weight: bold;',
'color: #a1a1aa; font-size: 14px;',
'color: #71717a; font-size: 12px;'
);
