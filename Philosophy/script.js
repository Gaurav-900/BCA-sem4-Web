/* ============================================================
   ETHICS & PUBLIC ADMINISTRATION STUDY PORTAL
   script.js — Complete Vanilla JavaScript
   ============================================================ */

'use strict';

/* ============================================================
   1. CONSTANTS & STATE
   ============================================================ */
const THEME_KEY = 'epa-theme';
const SECTION_KEY = 'epa-section';

let currentSection = 'overview';
let searchIndex = [];          // built once after DOM ready
let searchTimeout = null;

/* ============================================================
   2. DOM REFERENCES
   ============================================================ */
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const menuToggle = document.getElementById('menuToggle');
const themeToggle = document.getElementById('themeToggle');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const mainContent = document.getElementById('mainContent');

/* ============================================================
   3. THEME  (dark / light)
   ============================================================ */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  themeToggle.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  themeToggle.textContent = theme === 'dark' ? '☀' : '◐';
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  // HTML default is "dark"; honour it if nothing saved
  const theme = saved || document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(theme);
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* ============================================================
   4. SIDEBAR  toggle  (desktop collapse / mobile drawer)
   ============================================================ */
function isMobile() { return window.innerWidth < 769; }

function openSidebar() {
  if (isMobile()) {
    sidebar.classList.add('mobile-open');
    sidebarOverlay.classList.add('active');
  } else {
    sidebar.classList.remove('collapsed');
    mainContent.style.marginLeft = 'var(--sidebar-width)';
  }
}

function closeSidebar() {
  if (isMobile()) {
    sidebar.classList.remove('mobile-open');
    sidebarOverlay.classList.remove('active');
  } else {
    sidebar.classList.add('collapsed');
    mainContent.style.marginLeft = '0';
  }
}

function toggleSidebar() {
  if (isMobile()) {
    sidebar.classList.contains('mobile-open') ? closeSidebar() : openSidebar();
  } else {
    sidebar.classList.contains('collapsed') ? openSidebar() : closeSidebar();
  }
}

menuToggle.addEventListener('click', toggleSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

// On resize, fix layout
window.addEventListener('resize', () => {
  if (!isMobile()) {
    sidebarOverlay.classList.remove('active');
    // If sidebar was mobile-open but is now desktop, normalise
    sidebar.classList.remove('mobile-open');
    if (!sidebar.classList.contains('collapsed')) {
      mainContent.style.marginLeft = 'var(--sidebar-width)';
    }
  } else {
    mainContent.style.marginLeft = '0';
  }
});

/* ============================================================
   5. SECTION NAVIGATION
   ============================================================ */
function showSection(id) {
  // Hide all sections
  document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));

  const target = document.getElementById(id);
  if (!target) return;

  target.classList.add('active');
  currentSection = id;
  sessionStorage.setItem(SECTION_KEY, id);

  // Scroll main content to top
  mainContent.scrollTo({ top: 0, behavior: 'smooth' });
  // Also scroll window top for mobile
  window.scrollTo({ top: 0, behavior: 'smooth' });

  updateActiveNavLink(id);

  // On mobile, close sidebar after navigation
  if (isMobile()) closeSidebar();
}

function updateActiveNavLink(id) {
  document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
  const link = document.querySelector(`.nav-link[data-target="${id}"]`);
  if (link) {
    link.classList.add('active');
    // Expand its parent nav-group if collapsed
    const group = link.closest('.nav-group');
    if (group && group.classList.contains('collapsed')) {
      group.classList.remove('collapsed');
    }
  }
}

// Wire up all nav links
document.querySelectorAll('.nav-link[data-target]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showSection(link.dataset.target);
  });
});

// Table-of-contents links anywhere in main content
mainContent.addEventListener('click', e => {
  const a = e.target.closest('a[data-target]');
  if (a) {
    e.preventDefault();
    showSection(a.dataset.target);
  }
});

/* ============================================================
   6. COLLAPSIBLE SIDEBAR NAV GROUPS
   ============================================================ */
document.querySelectorAll('.collapsible-header').forEach(header => {
  const groupId = header.dataset.targetGroup;
  const group = document.getElementById(`nav-${groupId}`);
  if (!group) return;

  // Start expanded
  group.classList.remove('collapsed');

  // Add arrow indicator
  const arrow = document.createElement('span');
  arrow.className = 'nav-arrow';
  arrow.textContent = '▾';
  header.appendChild(arrow);

  header.addEventListener('click', () => {
    const isCollapsed = group.classList.toggle('collapsed');
    arrow.textContent = isCollapsed ? '▸' : '▾';
  });
});

// Style for nav-group collapse (injected once)
const collapseStyle = document.createElement('style');
collapseStyle.textContent = `
  .nav-group { overflow: hidden; transition: max-height 0.3s ease; max-height: 600px; }
  .nav-group.collapsed { max-height: 0; }
  .nav-arrow { float: right; margin-right: 4px; font-size: 0.75rem; transition: transform 0.2s; }
`;
document.head.appendChild(collapseStyle);

/* ============================================================
   7. SEARCH  —  build index then filter
   ============================================================ */
function buildSearchIndex() {
  searchIndex = [];

  document.querySelectorAll('.content-section').forEach(section => {
    const sectionId = section.id;
    const sectionTitle = section.querySelector('h1')?.textContent?.trim() || sectionId;

    // Index every heading (h2, h3) and definition term
    section.querySelectorAll('h2, h3').forEach(h => {
      const text = h.textContent.trim();
      if (text.length < 3) return;
      searchIndex.push({
        id: sectionId,
        title: sectionTitle,
        match: text,
        type: h.tagName,
      });
    });

    // Index definition terms
    section.querySelectorAll('.def-term, .thinker-name, .probity-card strong').forEach(el => {
      const text = el.textContent.trim();
      if (text.length < 2) return;
      searchIndex.push({
        id: sectionId,
        title: sectionTitle,
        match: text,
        type: 'DEF',
      });
    });

    // Index the section title itself
    searchIndex.push({
      id: sectionId,
      title: sectionTitle,
      match: sectionTitle,
      type: 'SECTION',
    });
  });
}

function performSearch(query) {
  const q = query.trim().toLowerCase();
  if (q.length < 2) {
    searchResults.classList.remove('active');
    searchResults.innerHTML = '';
    return;
  }

  const seen = new Set();
  const results = [];

  searchIndex.forEach(item => {
    if (results.length >= 10) return;
    if (item.match.toLowerCase().includes(q)) {
      const key = item.id + '|' + item.match;
      if (!seen.has(key)) {
        seen.add(key);
        results.push(item);
      }
    }
  });

  if (results.length === 0) {
    searchResults.innerHTML = '<div class="search-result-item"><strong>No results found</strong><span>Try different keywords</span></div>';
  } else {
    searchResults.innerHTML = results.map(r => `
      <div class="search-result-item" data-target="${r.id}">
        <strong>${escapeHtml(r.match)}</strong>
        <span>${escapeHtml(r.title)} ${r.type !== 'SECTION' ? '— ' + r.type : ''}</span>
      </div>
    `).join('');

    searchResults.querySelectorAll('.search-result-item[data-target]').forEach(item => {
      item.addEventListener('click', () => {
        showSection(item.dataset.target);
        clearSearch();
      });
    });
  }

  searchResults.classList.add('active');
}

function clearSearch() {
  searchInput.value = '';
  searchResults.classList.remove('active');
  searchResults.innerHTML = '';
}

searchInput.addEventListener('input', () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => performSearch(searchInput.value), 180);
});

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Escape') clearSearch();

  // Arrow key navigation inside results
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    const items = Array.from(searchResults.querySelectorAll('.search-result-item'));
    if (!items.length) return;
    const focused = searchResults.querySelector('.search-result-item:focus');
    let idx = focused ? items.indexOf(focused) : -1;
    idx = e.key === 'ArrowDown' ? Math.min(idx + 1, items.length - 1) : Math.max(idx - 1, 0);
    items[idx].focus();
  }

  if (e.key === 'Enter') {
    const first = searchResults.querySelector('.search-result-item[data-target]');
    if (first) { showSection(first.dataset.target); clearSearch(); }
  }
});

// Close search on outside click
document.addEventListener('click', e => {
  if (!e.target.closest('.search-wrap')) clearSearch();
});

/* ============================================================
   8. GLOSSARY FILTER
   ============================================================ */
function initGlossarySearch() {
  const input = document.getElementById('glossarySearch');
  if (!input) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    document.querySelectorAll('.gterm').forEach(term => {
      const text = term.textContent.toLowerCase();
      term.classList.toggle('hidden', q.length > 0 && !text.includes(q));
    });
  });
}

/* ============================================================
   9. READING PROGRESS BAR  (optional enhancement)
   ============================================================ */
function initProgressBar() {
  const bar = document.createElement('div');
  bar.id = 'readProgress';
  bar.style.cssText = `
    position:fixed; top:var(--topbar-height); left:0; right:0;
    height:3px; background:var(--accent); z-index:1100;
    transform-origin:left; transform:scaleX(0);
    transition:transform 0.1s linear; pointer-events:none;
  `;
  document.body.appendChild(bar);

  mainContent.addEventListener('scroll', () => {
    const el = mainContent;
    const pct = el.scrollTop / (el.scrollHeight - el.clientHeight) || 0;
    bar.style.transform = `scaleX(${pct})`;
  });
}

/* ============================================================
   10. BACK-TO-TOP  (button)
   ============================================================ */
function initBackToTop() {
  const btn = document.createElement('button');
  btn.id = 'backToTop';
  btn.textContent = '↑';
  btn.title = 'Back to top';
  btn.style.cssText = `
    position:fixed; bottom:28px; right:24px; z-index:500;
    width:42px; height:42px; border-radius:50%;
    background:var(--accent); color:#fff;
    border:none; font-size:1.2rem; cursor:pointer;
    box-shadow:0 4px 16px rgba(0,0,0,0.35);
    opacity:0; transform:translateY(12px);
    transition:opacity 0.25s, transform 0.25s;
    display:flex; align-items:center; justify-content:center;
  `;
  document.body.appendChild(btn);

  mainContent.addEventListener('scroll', () => {
    const show = mainContent.scrollTop > 300;
    btn.style.opacity = show ? '1' : '0';
    btn.style.transform = show ? 'translateY(0)' : 'translateY(12px)';
    btn.style.pointerEvents = show ? 'auto' : 'none';
  });

  btn.addEventListener('click', () => {
    mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   11. KEYBOARD SHORTCUTS
   ============================================================ */
document.addEventListener('keydown', e => {
  // Ctrl/Cmd + K  →  focus search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    searchInput.focus();
    searchInput.select();
  }
  // Escape → close search / close mobile sidebar
  if (e.key === 'Escape') {
    clearSearch();
    if (isMobile()) closeSidebar();
  }
});

/* ============================================================
   12. UTILITY  helpers
   ============================================================ */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ============================================================
   13. INIT  — run everything once DOM is ready
   ============================================================ */
function init() {
  // Theme
  initTheme();

  // Restore or default section
  const hash = window.location.hash.slice(1);
  const saved = sessionStorage.getItem(SECTION_KEY);
  const startId = hash || saved || 'overview';
  showSection(startId);

  // Sidebar initial state
  if (!isMobile()) {
    sidebar.classList.remove('collapsed');
    mainContent.style.marginLeft = 'var(--sidebar-width)';
  }

  // Build search index (after sections rendered)
  buildSearchIndex();

  // Feature init
  initGlossarySearch();
  initProgressBar();
  initBackToTop();
}

// Run after DOM is fully ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
