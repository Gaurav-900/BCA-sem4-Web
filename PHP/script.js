/* ============================================
   PHP Study Portal — script.js
   Navigation, search, theme, accordions
   ============================================ */

(function () {
  'use strict';

  // ---- Element references ----
  const sidebar      = document.getElementById('sidebar');
  const menuToggle   = document.getElementById('menuToggle');
  const overlay      = document.getElementById('overlay');
  const themeToggle  = document.getElementById('themeToggle');
  const searchInput  = document.getElementById('searchInput');
  const searchResults= document.getElementById('searchResults');
  const navLinks     = document.querySelectorAll('.nav-link');
  const sections     = document.querySelectorAll('.content-section');

  // ---- Search Index ----
  const searchIndex = [
    // Unit I
    { title: 'What is PHP?', section: 'Introduction to PHP', target: 'u1-intro',
      keywords: 'php hypertext preprocessor server side scripting rasmus lerdorf' },
    { title: 'Client-Server Model', section: 'Introduction to PHP', target: 'u1-intro',
      keywords: 'client server apache browser http request response' },
    { title: 'Installation & Configuration', section: 'Unit I', target: 'u1-install',
      keywords: 'install xampp wamp lamp mamp apache iis mysql php.ini' },
    { title: 'php.ini Settings', section: 'Installation', target: 'u1-install',
      keywords: 'php ini configuration error reporting file upload session' },
    { title: 'Features of PHP', section: 'Unit I', target: 'u1-features',
      keywords: 'features php open source cross platform database security fast' },
    { title: 'Writing & Parsing PHP', section: 'Unit I', target: 'u1-writing',
      keywords: 'write parse echo print php tags opening closing syntax' },
    { title: 'Embedding PHP in HTML', section: 'Unit I', target: 'u1-embedding',
      keywords: 'embed html php template interpolation htmlspecialchars' },
    { title: 'Unit I Exam Q&A', section: 'Exam Prep', target: 'u1-exam',
      keywords: 'exam questions answers unit 1 php installation features' },

    // Unit II
    { title: 'Data Types', section: 'Unit II', target: 'u2-datatypes',
      keywords: 'data types int float bool string array object null resource type juggling casting' },
    { title: 'Operators', section: 'Unit II', target: 'u2-operators',
      keywords: 'operators arithmetic assignment comparison logical string ternary null coalescing spaceship' },
    { title: 'PHP Variables — Static & Global', section: 'Unit II', target: 'u2-variables',
      keywords: 'variable static global scope local comments' },
    { title: 'Control Structures — if else switch', section: 'Unit II', target: 'u2-control',
      keywords: 'if else elseif switch case ternary control structures condition' },
    { title: 'Loops — while for foreach', section: 'Unit II', target: 'u2-loops',
      keywords: 'loops while do while for foreach break continue exit die return' },
    { title: 'Arrays', section: 'Unit II', target: 'u2-arrays',
      keywords: 'arrays numeric indexed associative multidimensional array functions sort push pop' },
    { title: 'Unit II Exam Q&A', section: 'Exam Prep', target: 'u2-exam',
      keywords: 'exam questions answers unit 2 data types loops arrays control' },

    // Unit III
    { title: 'Strings', section: 'Unit III', target: 'u3-strings',
      keywords: 'strings single double heredoc nowdoc strlen strtoupper strpos substr explode implode' },
    { title: 'Regular Expressions', section: 'Unit III', target: 'u3-regex',
      keywords: 'regex regular expressions pcre preg match replace split pattern' },
    { title: 'Functions', section: 'Unit III', target: 'u3-functions',
      keywords: 'functions define call parameters return value by reference default variadic recursive closure' },
    { title: 'Form Data Handling', section: 'Unit III', target: 'u3-forms',
      keywords: 'forms get post request variables form data handling submit input' },
    { title: 'Cookies & Sessions', section: 'Unit III', target: 'u3-cookies',
      keywords: 'cookies sessions session start setcookie session destroy browser server' },
    { title: 'Unit III Exam Q&A', section: 'Exam Prep', target: 'u3-exam',
      keywords: 'exam questions answers unit 3 strings functions forms cookies sessions' },

    // Unit IV
    { title: 'Exception Handling', section: 'Unit IV', target: 'u4-exceptions',
      keywords: 'exception error try catch throw finally custom exception class handling' },
    { title: 'File Handling', section: 'Unit IV', target: 'u4-files',
      keywords: 'file fopen fclose fread fwrite fgets copy rename unlink delete file_get_contents' },
    { title: 'Database Handling — MySQL', section: 'Unit IV', target: 'u4-database',
      keywords: 'database mysql mysqli pdo connect insert select update delete truncate order by alias prepared statements sql injection' },
    { title: 'Unit IV Exam Q&A', section: 'Exam Prep', target: 'u4-exam',
      keywords: 'exam questions answers unit 4 exception file database mysql' },

    // Reference
    { title: 'Glossary', section: 'Reference', target: 'glossary',
      keywords: 'glossary terms definitions php mysql session cookie pdo' },
    { title: 'Formula Sheet / Cheatsheet', section: 'Reference', target: 'formula-sheet',
      keywords: 'formula sheet cheatsheet quick reference syntax string array database file' },
    { title: 'Crash Revision', section: 'Exam Prep', target: 'crash-revision',
      keywords: 'crash revision last minute exam prep mnemonics common mistakes key points' },
  ];

  // ---- Section Navigation ----
  function showSection(targetId) {
    // Hide all sections
    sections.forEach(s => s.classList.remove('active'));
    navLinks.forEach(l => l.classList.remove('active'));

    // Show target
    const target = document.getElementById(targetId);
    if (target) {
      target.classList.add('active');
      // Scroll main content to top
      document.getElementById('mainContent').scrollTop = 0;
      window.scrollTo(0, 0);
    }

    // Highlight nav link
    navLinks.forEach(l => {
      if (l.dataset.target === targetId) {
        l.classList.add('active');
        // Scroll sidebar to show active link
        l.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    });

    // Close sidebar on mobile
    if (window.innerWidth <= 900) {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    }

    // Update URL hash without jumping
    history.replaceState(null, '', '#' + targetId);
  }

  // Expose globally (used in onclick attributes)
  window.showSection = showSection;

  // ---- Nav Link clicks ----
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      showSection(this.dataset.target);
    });
  });

  // ---- Mobile sidebar toggle ----
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  });

  // ---- Theme Toggle ----
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀' : '🌙';
    localStorage.setItem('php-portal-theme', theme);
  }

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Load saved theme
  const savedTheme = localStorage.getItem('php-portal-theme') || 'dark';
  applyTheme(savedTheme);

  // ---- Search ----
  function doSearch(query) {
    query = query.trim().toLowerCase();
    if (query.length < 2) {
      searchResults.classList.remove('active');
      searchResults.innerHTML = '';
      return;
    }

    const results = searchIndex.filter(item => {
      return item.title.toLowerCase().includes(query) ||
             item.keywords.includes(query) ||
             item.section.toLowerCase().includes(query);
    });

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-result-item"><div class="result-title">No results found</div></div>';
      searchResults.classList.add('active');
      return;
    }

    searchResults.innerHTML = results.slice(0, 8).map(item => `
      <div class="search-result-item" data-target="${item.target}">
        <div class="result-title">${highlight(item.title, query)}</div>
        <div class="result-section">${item.section}</div>
      </div>
    `).join('');

    searchResults.classList.add('active');

    // Bind click
    searchResults.querySelectorAll('.search-result-item[data-target]').forEach(el => {
      el.addEventListener('click', () => {
        showSection(el.dataset.target);
        searchResults.classList.remove('active');
        searchInput.value = '';
      });
    });
  }

  function highlight(text, query) {
    const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(re, '<mark style="background:rgba(79,142,247,0.3);border-radius:2px;padding:0 2px;">$1</mark>');
  }

  let searchTimer;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => doSearch(searchInput.value), 150);
  });

  searchInput.addEventListener('focus', () => {
    if (searchInput.value.length >= 2) searchResults.classList.add('active');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrap')) {
      searchResults.classList.remove('active');
    }
  });

  // Keyboard navigation in search
  searchInput.addEventListener('keydown', (e) => {
    const items = searchResults.querySelectorAll('.search-result-item[data-target]');
    const current = searchResults.querySelector('.search-result-item.focused');
    let idx = Array.from(items).indexOf(current);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (current) current.classList.remove('focused');
      idx = (idx + 1) % items.length;
      items[idx]?.classList.add('focused');
      items[idx]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (current) current.classList.remove('focused');
      idx = idx <= 0 ? items.length - 1 : idx - 1;
      items[idx]?.classList.add('focused');
      items[idx]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      const focused = searchResults.querySelector('.search-result-item.focused');
      if (focused) {
        showSection(focused.dataset.target);
        searchResults.classList.remove('active');
        searchInput.value = '';
      }
    } else if (e.key === 'Escape') {
      searchResults.classList.remove('active');
      searchInput.blur();
    }
  });

  // ---- Q&A Accordion ----
  document.addEventListener('click', (e) => {
    const question = e.target.closest('.question');
    if (!question) return;
    const qaItem = question.closest('.qa-item');
    if (!qaItem) return;

    const isOpen = qaItem.classList.contains('open');

    // Optionally close others in same section
    // qaItem.closest('.exam-section')?.querySelectorAll('.qa-item.open')
    //   .forEach(el => el.classList.remove('open'));

    qaItem.classList.toggle('open', !isOpen);
  });

  // ---- Handle URL hash on load ----
  function loadFromHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
      showSection(hash);
    } else {
      showSection('home');
    }
  }

  // ---- Keyboard shortcut: '/' to focus search ----
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput &&
        document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      searchInput.focus();
    }
  });

  // ---- Highlight focused search results ----
  document.addEventListener('mousemove', (e) => {
    const item = e.target.closest('.search-result-item');
    if (!item) return;
    searchResults.querySelectorAll('.search-result-item').forEach(el => el.classList.remove('focused'));
    item.classList.add('focused');
  });

  // ---- Lazy syntax highlight: color PHP keywords in code blocks ----
  function highlightCode() {
    document.querySelectorAll('.code-block pre').forEach(pre => {
      if (pre.dataset.highlighted) return;
      pre.dataset.highlighted = '1';

      let html = pre.innerHTML;

      // Comments (do first to avoid processing inside them)
      html = html.replace(/(\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\/)/g,
        '<span style="color:#546e7a">$1</span>');

      // Strings (basic)
      html = html.replace(/(&quot;[^&]*&quot;|'[^']*')/g,
        '<span style="color:#c3e88d">$1</span>');

      // PHP variables
      html = html.replace(/(\$[a-zA-Z_]\w*)/g,
        '<span style="color:#f07178">$1</span>');

      // Keywords
      const kws = ['function','return','echo','print','if','else','elseif','while',
        'for','foreach','do','switch','case','break','continue','exit','die',
        'class','new','extends','throw','try','catch','finally','static',
        'global','public','private','protected','null','true','false',
        'array','string','int','float','bool','void'];
      const kwRe = new RegExp(`\\b(${kws.join('|')})\\b`, 'g');
      html = html.replace(kwRe, '<span style="color:#c792ea">$1</span>');

      // Numbers
      html = html.replace(/\b(\d+\.?\d*)\b/g, '<span style="color:#f78c6c">$1</span>');

      pre.innerHTML = html;
    });
  }

  // Run highlight when section becomes visible
  const observer = new MutationObserver(() => {
    const active = document.querySelector('.content-section.active');
    if (active) highlightCode();
  });
  observer.observe(document.getElementById('mainContent'), { childList: true, subtree: false, attributes: true, attributeFilter: ['class'] });

  // Also run on section change
  const origShowSection = window.showSection;
  window.showSection = function(id) {
    origShowSection(id);
    setTimeout(highlightCode, 50);
  };

  // ---- Progress Indicator ----
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed; top: 56px; left: ${getComputedStyle(document.documentElement).getPropertyValue('--sidebar-w') || '260px'};
    right: 0; height: 2px; background: linear-gradient(90deg, #4f8ef7, #22d3a0);
    transform-origin: left; transform: scaleX(0); z-index: 100;
    transition: transform 0.1s linear;
  `;
  document.body.appendChild(progressBar);

  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    progressBar.style.transform = `scaleX(${progress})`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });

  // ---- Back to top button ----
  const backToTop = document.createElement('button');
  backToTop.innerHTML = '↑';
  backToTop.title = 'Back to top';
  backToTop.style.cssText = `
    position: fixed; bottom: 28px; right: 28px;
    width: 40px; height: 40px; border-radius: 50%;
    background: var(--accent); color: #fff;
    border: none; font-size: 18px; cursor: pointer;
    box-shadow: 0 4px 16px rgba(79,142,247,0.4);
    opacity: 0; transform: translateY(10px);
    transition: all 0.25s; z-index: 99;
    display: flex; align-items: center; justify-content: center;
    font-family: inherit;
  `;
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    const visible = window.scrollY > 300;
    backToTop.style.opacity = visible ? '1' : '0';
    backToTop.style.transform = visible ? 'translateY(0)' : 'translateY(10px)';
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- Focused search result styling ----
  const focusStyle = document.createElement('style');
  focusStyle.textContent = `.search-result-item.focused { background: var(--card-bg); }`;
  document.head.appendChild(focusStyle);

  // ---- Initialize ----
  loadFromHash();
  highlightCode();

})();
