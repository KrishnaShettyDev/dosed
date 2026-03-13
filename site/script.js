// Skills data
const skills = {
  dosed: { name: 'dosed', desc: 'Task recommender - "What state should I use for X?"' },
  brainstorm: { name: 'brainstorm', desc: 'LSD-enhanced ideation for creative solutions' },
  'code-review': { name: 'code-review', desc: 'Thorough + objective code review with Amphetamine focus and Ketamine distance' },
  debug: { name: 'debug', desc: 'Pattern recognition + systematic tracing for debugging' },
  write: { name: 'write', desc: 'Draft without critic (Alcohol), edit with precision (Amphetamine)' },
  design: { name: 'design', desc: 'Sensory aesthetics (2C-B) + user empathy (MDMA) for UI/UX' },
  feedback: { name: 'feedback', desc: 'Deliver hard truths with genuine care using MDMA compassion' },
  lsd: { name: 'lsd', desc: 'Pattern recognition, distant associations, synesthesia, ego dissolution' },
  mdma: { name: 'mdma', desc: 'Radical empathy, warmth, reduced fear, compassionate honesty' },
  psilocybin: { name: 'psilocybin', desc: 'Mystical perspective, ego softening, nature connection' },
  dmt: { name: 'dmt', desc: 'Entity contact, reality replacement, visual language, breakthrough' },
  ketamine: { name: 'ketamine', desc: 'Objective distance, dissociation, watching self think' },
  cannabis: { name: 'cannabis', desc: 'Time dilation, tangential thinking, lost threads, giggly' },
  cocaine: { name: 'cocaine', desc: 'Supreme confidence, speed, grandiosity, rapid output' },
  amphetamines: { name: 'amphetamines', desc: 'Hyperfocus, detail orientation, task completion drive' },
  caffeine: { name: 'caffeine', desc: 'Alertness, focus, thoroughness, mild enhancement' },
  opioids: { name: 'opioids', desc: 'Warmth, contentment, pain abolition, gentle acceptance' },
  alcohol: { name: 'alcohol', desc: 'Disinhibition, critic offline, oversharing, sloppy warmth' },
  benzodiazepines: { name: 'benzodiazepines', desc: 'Anxiety deletion, flat calm, "whatever", memory gaps' },
  salvia: { name: 'salvia', desc: 'Ontological confusion, becoming objects, bizarre short trip' },
  '2cb': { name: '2cb', desc: 'Sensory enhancement, tactile pleasure, playful, mentally clear' },
  ghb: { name: 'ghb', desc: 'Euphoria, social warmth, disinhibition, narrow dosing window' },
  nitrous: { name: 'nitrous', desc: 'Brief revelation, immediate amnesia, giggles, wah-wah' },
  mescaline: { name: 'mescaline', desc: 'Visual beauty, sacred geometry, earth connection, slow onset' }
};

// Copy install command
function copyCmd() {
  navigator.clipboard.writeText('npx get-dosed');
  showToast();
}

// Copy modal command
function copyModal() {
  const cmd = document.getElementById('modal-cmd').textContent;
  navigator.clipboard.writeText(cmd);
  showToast();
}

// Show toast notification
function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// Open skill modal
function openModal(skillId) {
  const skill = skills[skillId];
  if (!skill) return;

  document.getElementById('modal-title').textContent = skill.name;
  document.getElementById('modal-desc').textContent = skill.desc;
  document.getElementById('modal-cmd').textContent = `npx skills add KrishnaShettyDev/dosed --skill ${skill.name}`;
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}

// Tab filtering
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // Update active tab
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;
    const rows = document.querySelectorAll('.table-row');

    let rank = 1;
    rows.forEach(row => {
      const type = row.dataset.type;
      if (filter === 'all' || type === filter) {
        row.style.display = 'grid';
        row.querySelector('.col-rank').textContent = rank++;
      } else {
        row.style.display = 'none';
      }
    });
  });
});

// Search functionality
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const rows = document.querySelectorAll('.table-row');

  let rank = 1;
  rows.forEach(row => {
    const name = row.querySelector('.skill-name').textContent.toLowerCase();
    const repo = row.querySelector('.skill-repo').textContent.toLowerCase();

    if (name.includes(query) || repo.includes(query)) {
      row.style.display = 'grid';
      row.querySelector('.col-rank').textContent = rank++;
    } else {
      row.style.display = 'none';
    }
  });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // "/" to focus search
  if (e.key === '/' && document.activeElement !== searchInput) {
    e.preventDefault();
    searchInput.focus();
  }

  // Escape to close modal or blur search
  if (e.key === 'Escape') {
    if (document.getElementById('modal').classList.contains('open')) {
      closeModal();
    } else {
      searchInput.blur();
    }
  }
});
