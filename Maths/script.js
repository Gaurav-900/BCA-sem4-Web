/* ============================================================
   BCA-64T-215 Mathematics & Statistics — Study Portal
   script.js
   ============================================================ */

// ── Search index ──────────────────────────────────────────────
const SEARCH_INDEX = [
  // Unit I
  { title: 'Definition of a Set', section: 'u1-sets', unit: 'Unit I' },
  { title: 'Types of Sets (Empty, Finite, Infinite…)', section: 'u1-sets', unit: 'Unit I' },
  { title: 'Power Set', section: 'u1-sets', unit: 'Unit I' },
  { title: 'Subsets', section: 'u1-sets', unit: 'Unit I' },
  { title: 'Union and Intersection of Sets', section: 'u1-sets', unit: 'Unit I' },
  { title: 'Complement of a Set', section: 'u1-sets', unit: 'Unit I' },
  { title: 'Venn Diagrams', section: 'u1-sets', unit: 'Unit I' },
  { title: 'De Morgan\'s Laws (Sets)', section: 'u1-sets', unit: 'Unit I' },
  { title: 'Principle of Inclusion–Exclusion', section: 'u1-sets', unit: 'Unit I' },
  { title: 'Cartesian Product', section: 'u1-relations', unit: 'Unit I' },
  { title: 'Definition of Relation', section: 'u1-relations', unit: 'Unit I' },
  { title: 'Reflexive Relation', section: 'u1-relations', unit: 'Unit I' },
  { title: 'Symmetric Relation', section: 'u1-relations', unit: 'Unit I' },
  { title: 'Transitive Relation', section: 'u1-relations', unit: 'Unit I' },
  { title: 'Anti-symmetric Relation', section: 'u1-relations', unit: 'Unit I' },
  { title: 'Equivalence Relation', section: 'u1-relations', unit: 'Unit I' },
  { title: 'Definition of Function', section: 'u1-functions', unit: 'Unit I' },
  { title: 'Domain and Range', section: 'u1-functions', unit: 'Unit I' },
  { title: 'One-to-One (Injective) Function', section: 'u1-functions', unit: 'Unit I' },
  { title: 'Onto (Surjective) Function', section: 'u1-functions', unit: 'Unit I' },
  { title: 'Bijective Function', section: 'u1-functions', unit: 'Unit I' },
  { title: 'Composite Functions', section: 'u1-functions', unit: 'Unit I' },
  { title: 'Inverse of a Function', section: 'u1-functions', unit: 'Unit I' },
  { title: 'Unit I Exam Questions', section: 'u1-exam', unit: 'Unit I' },
  // Unit II
  { title: 'Proposition and Logic', section: 'u2-logic', unit: 'Unit II' },
  { title: 'Conjunction (AND)', section: 'u2-logic', unit: 'Unit II' },
  { title: 'Disjunction (OR)', section: 'u2-logic', unit: 'Unit II' },
  { title: 'Negation (NOT)', section: 'u2-logic', unit: 'Unit II' },
  { title: 'Compound Proposition', section: 'u2-logic', unit: 'Unit II' },
  { title: 'Truth Tables', section: 'u2-logic', unit: 'Unit II' },
  { title: 'Tautology', section: 'u2-logic', unit: 'Unit II' },
  { title: 'Contradiction / Fallacy', section: 'u2-logic', unit: 'Unit II' },
  { title: 'De Morgan\'s Laws (Logic)', section: 'u2-logic', unit: 'Unit II' },
  { title: 'Definition of Matrix', section: 'u2-matrices', unit: 'Unit II' },
  { title: 'Types of Matrices', section: 'u2-matrices', unit: 'Unit II' },
  { title: 'Matrix Addition and Subtraction', section: 'u2-matrices', unit: 'Unit II' },
  { title: 'Matrix Multiplication', section: 'u2-matrices', unit: 'Unit II' },
  { title: 'Non-commutativity of Matrix Multiplication', section: 'u2-matrices', unit: 'Unit II' },
  { title: 'Scalar Multiplication of Matrix', section: 'u2-matrices', unit: 'Unit II' },
  { title: 'Transpose of a Matrix', section: 'u2-matrices', unit: 'Unit II' },
  { title: 'Determinant of a Matrix', section: 'u2-determinants', unit: 'Unit II' },
  { title: 'Minors and Cofactors', section: 'u2-determinants', unit: 'Unit II' },
  { title: 'Properties of Determinants', section: 'u2-determinants', unit: 'Unit II' },
  { title: 'Adjoint of a Matrix', section: 'u2-determinants', unit: 'Unit II' },
  { title: 'Inverse of a Matrix', section: 'u2-determinants', unit: 'Unit II' },
  { title: 'Area of Triangle using Determinants', section: 'u2-determinants', unit: 'Unit II' },
  { title: 'Cramer\'s Rule', section: 'u2-determinants', unit: 'Unit II' },
  { title: 'Unit II Exam Questions', section: 'u2-exam', unit: 'Unit II' },
  // Unit III
  { title: 'Data Collection Methods', section: 'u3-data', unit: 'Unit III' },
  { title: 'Primary and Secondary Data', section: 'u3-data', unit: 'Unit III' },
  { title: 'Classification of Data', section: 'u3-data', unit: 'Unit III' },
  { title: 'Frequency Distribution', section: 'u3-frequency', unit: 'Unit III' },
  { title: 'Histogram', section: 'u3-frequency', unit: 'Unit III' },
  { title: 'Frequency Polygon', section: 'u3-frequency', unit: 'Unit III' },
  { title: 'Ogive (Cumulative Frequency Curve)', section: 'u3-frequency', unit: 'Unit III' },
  { title: 'Arithmetic Mean', section: 'u3-central', unit: 'Unit III' },
  { title: 'Median', section: 'u3-central', unit: 'Unit III' },
  { title: 'Mode', section: 'u3-central', unit: 'Unit III' },
  { title: 'Empirical Relationship: Mean Median Mode', section: 'u3-central', unit: 'Unit III' },
  { title: 'Range', section: 'u3-dispersion', unit: 'Unit III' },
  { title: 'Mean Deviation', section: 'u3-dispersion', unit: 'Unit III' },
  { title: 'Standard Deviation', section: 'u3-dispersion', unit: 'Unit III' },
  { title: 'Variance', section: 'u3-dispersion', unit: 'Unit III' },
  { title: 'Coefficient of Variation (CV)', section: 'u3-dispersion', unit: 'Unit III' },
  { title: 'Unit III Exam Questions', section: 'u3-exam', unit: 'Unit III' },
  // Unit IV
  { title: 'Correlation — Definition', section: 'u4-correlation', unit: 'Unit IV' },
  { title: 'Types of Correlation (Positive/Negative)', section: 'u4-correlation', unit: 'Unit IV' },
  { title: 'Scatter Diagram', section: 'u4-correlation', unit: 'Unit IV' },
  { title: 'Karl Pearson\'s Coefficient of Correlation', section: 'u4-correlation', unit: 'Unit IV' },
  { title: 'Spearman\'s Rank Correlation', section: 'u4-correlation', unit: 'Unit IV' },
  { title: 'Interpretation of r', section: 'u4-correlation', unit: 'Unit IV' },
  { title: 'Regression — Definition', section: 'u4-regression', unit: 'Unit IV' },
  { title: 'Difference Between Correlation and Regression', section: 'u4-regression', unit: 'Unit IV' },
  { title: 'Regression Lines (Y on X, X on Y)', section: 'u4-regression', unit: 'Unit IV' },
  { title: 'Regression Coefficients byx and bxy', section: 'u4-regression', unit: 'Unit IV' },
  { title: 'Properties of Regression Lines', section: 'u4-regression', unit: 'Unit IV' },
  { title: 'Unit IV Exam Questions', section: 'u4-exam', unit: 'Unit IV' },
  // References
  { title: 'Formula Sheet', section: 'formula-sheet', unit: 'Reference' },
  { title: 'Glossary', section: 'glossary', unit: 'Reference' },
  { title: 'Crash Revision', section: 'crash-revision', unit: 'Reference' },
];

// ── State ─────────────────────────────────────────────────────
let currentSection = 'home';

// ── Navigate ──────────────────────────────────────────────────
function navigate(sectionId) {
  // Hide all
  document.querySelectorAll('.content-section').forEach(el => el.classList.remove('active'));
  // Show target
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add('active');
    currentSection = sectionId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // Update sidebar highlights
  updateNavHighlight(sectionId);
  // Close mobile sidebar
  closeMobileSidebar();
  // Close search
  closeSearch();
}

function updateNavHighlight(sectionId) {
  // Nav items
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.section === sectionId);
  });
  // Nav sub items
  document.querySelectorAll('.nav-sub').forEach(el => {
    const isActive = el.dataset.section === sectionId;
    el.classList.toggle('active', isActive);
    // Auto-open parent group
    if (isActive) {
      const body = el.closest('.nav-group-body');
      if (body && !body.classList.contains('open')) {
        body.classList.add('open');
        const header = body.previousElementSibling;
        if (header) header.classList.add('open');
      }
    }
  });
}

// ── Sidebar Navigation Links ──────────────────────────────────
document.querySelectorAll('.nav-item, .nav-sub').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const sec = el.dataset.section;
    if (sec) navigate(sec);
  });
});

// ── Sidebar Groups Toggle ─────────────────────────────────────
document.querySelectorAll('.nav-group-header').forEach(header => {
  header.addEventListener('click', () => {
    const groupId = header.dataset.group;
    const body = document.getElementById('group-' + groupId);
    if (!body) return;
    const isOpen = body.classList.toggle('open');
    header.classList.toggle('open', isOpen);
  });
});

// ── Open all sidebar groups on load ──────────────────────────
document.querySelectorAll('.nav-group-body').forEach(b => b.classList.add('open'));
document.querySelectorAll('.nav-group-header').forEach(h => h.classList.add('open'));

// ── Theme Toggle ──────────────────────────────────────────────
const themeBtn = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let isDark = prefersDark;
document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
themeBtn.textContent = isDark ? '☀️' : '🌙';

themeBtn.addEventListener('click', () => {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  isDark = savedTheme === 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeBtn.textContent = isDark ? '☀️' : '🌙';
}

// ── Mobile Sidebar ────────────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebarOverlay');

menuToggle.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('mobile-open');
  overlay.classList.toggle('show', isOpen);
});

overlay.addEventListener('click', closeMobileSidebar);

function closeMobileSidebar() {
  sidebar.classList.remove('mobile-open');
  overlay.classList.remove('show');
}

// ── Search ────────────────────────────────────────────────────
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) { closeSearch(); return; }
  const matches = SEARCH_INDEX.filter(item =>
    item.title.toLowerCase().includes(q) || item.unit.toLowerCase().includes(q)
  ).slice(0, 10);

  if (matches.length === 0) {
    searchResults.innerHTML = '<div class="search-result-item" style="color:var(--fg-muted)">No results found</div>';
    searchResults.classList.add('show');
    return;
  }

  searchResults.innerHTML = matches.map(m => `
    <div class="search-result-item" data-section="${m.section}">
      <div>${m.title}</div>
      <div class="sr-unit">${m.unit}</div>
    </div>
  `).join('');
  searchResults.classList.add('show');

  searchResults.querySelectorAll('.search-result-item[data-section]').forEach(el => {
    el.addEventListener('click', () => {
      navigate(el.dataset.section);
      searchInput.value = '';
    });
  });
});

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeSearch(); searchInput.blur(); }
});

document.addEventListener('click', e => {
  if (!e.target.closest('.search-wrap')) closeSearch();
});

function closeSearch() {
  searchResults.classList.remove('show');
  searchResults.innerHTML = '';
}

// ── Keyboard shortcut: / to focus search ─────────────────────
document.addEventListener('keydown', e => {
  if (e.key === '/' && document.activeElement !== searchInput) {
    e.preventDefault();
    searchInput.focus();
    searchInput.select();
  }
});

// ── Progress Bar & Scroll ──────────────────────────────────────
window.addEventListener('scroll', () => {
  // Update progress bar
  const pfill = document.getElementById('pfill');
  if (pfill) {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0;
    pfill.style.width = progress + '%';
  }
});

// Initialize home section on load
navigate('home');
