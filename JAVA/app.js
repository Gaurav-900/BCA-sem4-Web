/* =====================================================
   Java Study Portal — app.js
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Theme ─────────────────────────────────── */
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('javaTheme') || 'dark';
  root.setAttribute('data-theme', savedTheme);
  const themeBtn = document.getElementById('theme-btn');
  themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  themeBtn.addEventListener('click', () => {
    const cur = root.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('javaTheme', next);
    themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
  });

  /* ── Mobile Sidebar (declared FIRST so closeMobile is available) ── */
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.overlay');
  const menuBtn = document.getElementById('menu-btn');

  function closeMobile() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  }

  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
  });
  overlay.addEventListener('click', closeMobile);

  /* ── Navigation ─────────────────────────────── */
  const sections = document.querySelectorAll('.section');
  const sbLinks  = document.querySelectorAll('.sb-link');

  function showSection(id) {
    sections.forEach(s => s.classList.remove('active'));
    sbLinks.forEach(l => l.classList.remove('active'));

    const target = document.getElementById(id);
    if (!target) { showSection('home'); return; }
    target.classList.add('active');

    const main = document.querySelector('.main');
    main.scrollTop = 0;

    const link = document.querySelector(`.sb-link[data-sec="${id}"]`);
    if (link) {
      link.classList.add('active');
      const items = link.closest('.sb-items');
      if (items && !items.classList.contains('open')) {
        items.classList.add('open');
        const btn = items.previousElementSibling;
        if (btn) btn.classList.add('open');
      }
    }

    history.replaceState(null, '', '#' + id);
    closeMobile();
  }

  sbLinks.forEach(l => {
    l.addEventListener('click', () => showSection(l.dataset.sec));
  });

  // Direct nav buttons (home, lab, glossary, revision, exam-all)
  document.querySelectorAll('.sb-unit-btn[data-sec]').forEach(btn => {
    btn.addEventListener('click', () => showSection(btn.dataset.sec));
  });

  /* ── Unit Toggle (sidebar accordion) ────────── */
  document.querySelectorAll('.sb-unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('open');
      const items = btn.nextElementSibling;
      if (items) items.classList.toggle('open');
    });
  });

  /* ── Home Cards ─────────────────────────────── */
  document.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', () => showSection(el.dataset.goto));
  });

  /* ── Hash Routing ───────────────────────────── */
  const startHash = location.hash ? location.hash.slice(1) : 'home';
  showSection(startHash);

  /* ── Collapsible Sections (Lab Programs dropdowns) ── */
  document.querySelectorAll('.coll-hdr').forEach(hdr => {
    hdr.addEventListener('click', function () {
      this.classList.toggle('open');
      const body = this.nextElementSibling;
      if (body && body.classList.contains('coll-body')) {
        body.classList.toggle('open');
      }
    });
  });

  /* ── Search ─────────────────────────────────── */
  const searchInput   = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  // Build index from all section headings
  const index = [];
  sections.forEach(sec => {
    const id = sec.id;
    const badge = sec.querySelector('.unit-badge');
    const unit  = badge ? badge.textContent.trim() : '';
    sec.querySelectorAll('h1,h2,h3').forEach(h => {
      index.push({ id, title: h.textContent.trim(), unit });
    });
  });

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    if (!q) { searchResults.classList.remove('show'); return; }

    const hits = index.filter(it => it.title.toLowerCase().includes(q)).slice(0, 9);
    if (!hits.length) {
      searchResults.innerHTML = '<div class="sr-item"><div class="sr-title">No results found</div></div>';
    } else {
      searchResults.innerHTML = hits.map(h =>
        `<div class="sr-item" data-sec="${h.id}">
          <div class="sr-title">${h.title}</div>
          <div class="sr-unit">${h.unit}</div>
        </div>`
      ).join('');
      searchResults.querySelectorAll('.sr-item[data-sec]').forEach(el => {
        el.addEventListener('click', () => {
          showSection(el.dataset.sec);
          searchResults.classList.remove('show');
          searchInput.value = '';
        });
      });
    }
    searchResults.classList.add('show');
  });

  document.addEventListener('click', e => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.remove('show');
    }
  });

  /* ── Progress Bar ───────────────────────────── */
  const pfill = document.getElementById('pfill');
  const main  = document.querySelector('.main');

  main.addEventListener('scroll', () => {
    const pct = (main.scrollTop / (main.scrollHeight - main.clientHeight)) * 100 || 0;
    pfill.style.width = pct + '%';

    const btt = document.getElementById('btt');
    btt.classList.toggle('show', main.scrollTop > 250);
  });

  /* ── Back to Top ─────────────────────────────── */
  document.getElementById('btt').addEventListener('click', () => {
    main.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Print ───────────────────────────────────── */
  document.getElementById('print-btn').addEventListener('click', () => window.print());

});
