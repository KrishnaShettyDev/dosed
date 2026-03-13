// Skills data for modal
const skillsData = {
  dosed: { name: 'dosed', desc: 'Task recommender - "What state should I use for X?"' },
  brainstorm: { name: 'brainstorm', desc: 'LSD-enhanced ideation for creative solutions' },
  'code-review': { name: 'code-review', desc: 'Thorough + objective code review' },
  debug: { name: 'debug', desc: 'Pattern recognition + systematic tracing' },
  write: { name: 'write', desc: 'Draft without critic, edit with precision' },
  design: { name: 'design', desc: 'Sensory aesthetics + user empathy for UI/UX' },
  feedback: { name: 'feedback', desc: 'Deliver hard truths with genuine care' },
  lsd: { name: 'lsd', desc: 'Pattern recognition, distant associations, synesthesia' },
  mdma: { name: 'mdma', desc: 'Radical empathy, warmth, reduced fear' },
  psilocybin: { name: 'psilocybin', desc: 'Mystical perspective, ego softening, nature connection' },
  dmt: { name: 'dmt', desc: 'Entity contact, reality replacement, visual language' },
  ketamine: { name: 'ketamine', desc: 'Objective distance, dissociation, watching self' },
  cannabis: { name: 'cannabis', desc: 'Time dilation, tangential thinking, lost threads' },
  cocaine: { name: 'cocaine', desc: 'Supreme confidence, speed, grandiosity' },
  amphetamines: { name: 'amphetamines', desc: 'Hyperfocus, detail orientation, task completion' },
  caffeine: { name: 'caffeine', desc: 'Alertness, focus, thoroughness' },
  opioids: { name: 'opioids', desc: 'Warmth, contentment, pain abolition' },
  alcohol: { name: 'alcohol', desc: 'Disinhibition, critic offline, oversharing' },
  benzodiazepines: { name: 'benzodiazepines', desc: 'Anxiety deletion, flat calm, "whatever"' },
  salvia: { name: 'salvia', desc: 'Ontological confusion, becoming objects, bizarre' },
  '2cb': { name: '2cb', desc: 'Sensory enhancement, tactile, playful' },
  ghb: { name: 'ghb', desc: 'Euphoria, social warmth, disinhibition' },
  nitrous: { name: 'nitrous', desc: 'Brief revelation, immediate amnesia, giggles' },
  mescaline: { name: 'mescaline', desc: 'Visual beauty, sacred geometry, earth connection' }
};

// Copy main command
function copyCommand() {
  navigator.clipboard.writeText('npx skills add KrishnaShettyDev/dosed');
  showToast();
}

// Copy modal command
function copyModalCmd() {
  const cmd = document.getElementById('modal-cmd').textContent;
  navigator.clipboard.writeText(cmd);
  showToast();
}

// Show toast
function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// Open modal
function openModal(skillId) {
  const skill = skillsData[skillId];
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

// Row click handlers
document.querySelectorAll('.table-row').forEach(row => {
  row.addEventListener('click', () => {
    const skillId = row.dataset.skill;
    openModal(skillId);
  });
});

// Tab filtering
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;
    const rows = document.querySelectorAll('.table-row');

    rows.forEach((row, index) => {
      if (filter === 'all' || row.dataset.type === filter) {
        row.style.display = 'grid';
      } else {
        row.style.display = 'none';
      }
    });

    // Update rank numbers
    let visibleIndex = 1;
    rows.forEach(row => {
      if (row.style.display !== 'none') {
        row.querySelector('.col-rank').textContent = visibleIndex++;
      }
    });
  });
});

// Search
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const rows = document.querySelectorAll('.table-row');

  rows.forEach(row => {
    const name = row.querySelector('.skill-name').textContent.toLowerCase();
    const desc = row.querySelector('.skill-desc').textContent.toLowerCase();

    if (name.includes(query) || desc.includes(query)) {
      row.style.display = 'grid';
    } else {
      row.style.display = 'none';
    }
  });

  // Update rank numbers
  let visibleIndex = 1;
  rows.forEach(row => {
    if (row.style.display !== 'none') {
      row.querySelector('.col-rank').textContent = visibleIndex++;
    }
  });
});

// Keyboard shortcut for search
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement !== searchInput) {
    e.preventDefault();
    searchInput.focus();
  }
  if (e.key === 'Escape') {
    closeModal();
    searchInput.blur();
  }
});

// Close modal on backdrop click (already in HTML onclick)
// Close modal on Escape key (already handled above)

// Console easter egg
console.log(`
%c◉ DOSED
%cThe Altered States Skills Ecosystem

%cnpx skills add KrishnaShettyDev/dosed

24 cognitive tools for AI agents
https://github.com/KrishnaShettyDev/dosed
`,
'color: #fff; font-size: 24px; font-weight: bold;',
'color: #888; font-size: 14px;',
'color: #666; font-size: 12px;'
);
