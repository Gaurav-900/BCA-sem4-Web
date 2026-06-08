/* ===== CYBER SECURITY STUDY PORTAL – script.js ===== */

// ── SEARCH INDEX ──────────────────────────────────────────
const SEARCH_INDEX = [
  // Unit 1
  { title: "Introduction to Cyber Space", unit: "Unit I", page: "unit1", section: "u1-intro",
    keywords: "cyberspace cyber space definition william gibson components" },
  { title: "History of Internet", unit: "Unit I", page: "unit1", section: "u1-history",
    keywords: "arpanet internet history tcp ip www tim berners lee india vsnl jio" },
  { title: "Cyber Crime", unit: "Unit I", page: "unit1", section: "u1-cybercrime",
    keywords: "cyber crime phishing ransomware identity theft ddos fraud stalking hacking" },
  { title: "Information Security & CIA Triad", unit: "Unit I", page: "unit1", section: "u1-infosec",
    keywords: "information security CIA triad confidentiality integrity availability security policy" },
  { title: "Computer Ethics & Antivirus", unit: "Unit I", page: "unit1", section: "u1-ethics",
    keywords: "computer ethics ten commandments antivirus privacy intellectual property" },
  { title: "Email & Browser Security", unit: "Unit I", page: "unit1", section: "u1-email",
    keywords: "email phishing spear whaling spoofing https browser security" },
  { title: "Password & Wi-Fi Security", unit: "Unit I", page: "unit1", section: "u1-password",
    keywords: "password secure strong wifi wpa3 wpa2 guidelines" },
  { title: "Two-Factor Authentication & Password Manager", unit: "Unit I", page: "unit1", section: "u1-2fa",
    keywords: "2fa two factor authentication otp biometric password manager lastpass bitwarden" },
  // Unit 2
  { title: "Windows Security Guidelines", unit: "Unit II", page: "unit2", section: "u2-windows",
    keywords: "windows security bitlocker uac windows defender firewall backup update" },
  { title: "Social Media Security", unit: "Unit II", page: "unit2", section: "u2-social",
    keywords: "social media security facebook instagram twitter privacy settings catfishing" },
  { title: "Smartphone Security", unit: "Unit II", page: "unit2", section: "u2-smartphone",
    keywords: "smartphone mobile security android ios juice jacking screen lock" },
  { title: "Online Banking & Mobile Banking Security", unit: "Unit II", page: "unit2", section: "u2-banking",
    keywords: "online banking mobile banking security phishing sim swap keylogger" },
  { title: "Credit Card, Debit Card & UPI Security", unit: "Unit II", page: "unit2", section: "u2-card",
    keywords: "credit card debit card upi security skimming pin cvv npci" },
  { title: "e-Wallet & ATM Security", unit: "Unit II", page: "unit2", section: "u2-ewallet",
    keywords: "ewallet micro atm pos security paytm phonpe google pay" },
  // Unit 3
  { title: "Social Engineering", unit: "Unit III", page: "unit3", section: "u3-soceng",
    keywords: "social engineering psychology manipulation authority urgency fear" },
  { title: "Types of Social Engineering", unit: "Unit III", page: "unit3", section: "u3-types",
    keywords: "phishing spear phishing whaling vishing smishing pretexting baiting tailgating shoulder surfing" },
  { title: "How Cyber Criminals Work & Prevention", unit: "Unit III", page: "unit3", section: "u3-criminal",
    keywords: "cyber criminal ecosystem dark web ransomware as a service 1930 helpline certIn" },
  { title: "Cyber Security Threat Landscape", unit: "Unit III", page: "unit3", section: "u3-threats",
    keywords: "threat landscape malware ransomware apt zero day supply chain iot deepfake" },
  { title: "Cyber Security Techniques", unit: "Unit III", page: "unit3", section: "u3-techniques",
    keywords: "encryption aes rsa ids ips vpn pki digital forensics symmetric asymmetric" },
  { title: "Firewall", unit: "Unit III", page: "unit3", section: "u3-firewall",
    keywords: "firewall packet filtering stateful inspection application layer ngfw types rules" },
  // Unit 4
  { title: "Cyber Security Initiatives in India", unit: "Unit IV", page: "unit4", section: "u4-india",
    keywords: "india certin ncsp nciipc cyber surakshit bharat digital india dpdp act 2023" },
  { title: "Incident Handling & Assurance", unit: "Unit IV", page: "unit4", section: "u4-incident",
    keywords: "incident handling response nist lifecycle preparation detection containment recovery" },
  { title: "IT Act & IT Security Law", unit: "Unit IV", page: "unit4", section: "u4-itact",
    keywords: "it act 2000 section 66 identity theft cyber terrorism dpdp act penalties" },
  { title: "Hackers, Attackers & Countermeasures", unit: "Unit IV", page: "unit4", section: "u4-hackers",
    keywords: "white hat black hat grey hat ethical hacker cracker honeypot countermeasures" },
  { title: "Web Application Security", unit: "Unit IV", page: "unit4", section: "u4-webapp",
    keywords: "owasp top 10 sql injection xss cross site scripting waf web application" },
  { title: "Defensive Programming", unit: "Unit IV", page: "unit4", section: "u4-defensive",
    keywords: "defensive programming input validation least privilege sast dast fuzzing secure coding" },
  { title: "Information Destruction & Recovery", unit: "Unit IV", page: "unit4", section: "u4-destroy",
    keywords: "data destruction dban degaussing shredding data recovery recuva testdisk forensics" },
  // Special pages
  { title: "Glossary of Terms", unit: "Reference", page: "glossary", section: null,
    keywords: "glossary terms definitions all units" },
  { title: "Exam Crash Revision", unit: "Reference", page: "examprep", section: null,
    keywords: "exam revision quick notes mnemonic important questions crash course" },
];

// ── DOM REFS ──────────────────────────────────────────────
const sidebar       = document.getElementById('sidebar');
const menuToggle    = document.getElementById('menuToggle');
const themeToggle   = document.getElementById('themeToggle');
const searchInput   = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const mainContent   = document.getElementById('mainContent');

// ── SIDEBAR TOGGLE (mobile) ───────────────────────────────
let overlay = document.createElement('div');
overlay.className = 'sidebar-overlay';
document.body.appendChild(overlay);

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('show');
}
function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
}

menuToggle.addEventListener('click', () => {
  sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
});
overlay.addEventListener('click', closeSidebar);

// ── THEME TOGGLE ─────────────────────────────────────────
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('cs-portal-theme', theme);
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// Load saved theme
const savedTheme = localStorage.getItem('cs-portal-theme') || 'dark';
applyTheme(savedTheme);

// ── PAGE NAVIGATION ───────────────────────────────────────
function showPage(pageId, sectionId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    // Scroll to top or section
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
    } else {
      mainContent.scrollTop = 0;
      window.scrollTo(0, 0);
    }
  }
  // Update nav buttons
  document.querySelectorAll('.nav-unit-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === pageId);
  });
  // Close sidebar on mobile
  if (window.innerWidth < 768) closeSidebar();
}

// Nav unit buttons
document.querySelectorAll('.nav-unit-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    showPage(btn.dataset.target);
  });
});

// Nav topic links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const section = link.dataset.section;
    if (!section) return;
    // Determine which page this section belongs to
    const item = SEARCH_INDEX.find(i => i.section === section);
    if (item) showPage(item.page, section);
  });
});

// ── EXAM QUESTION TABS ────────────────────────────────────
function showQTab(btn, contentId) {
  // Find all sibling tabs and contents in same card
  const card = btn.closest('.exam-section');
  card.querySelectorAll('.q-tab').forEach(t => t.classList.remove('active'));
  card.querySelectorAll('.q-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  const content = document.getElementById(contentId);
  if (content) content.classList.add('active');
}
// Expose globally
window.showQTab = showQTab;
window.showPage = showPage;

// ── SEARCH ────────────────────────────────────────────────
function doSearch(query) {
  query = query.trim().toLowerCase();
  if (!query || query.length < 2) {
    searchResults.classList.add('hidden');
    return;
  }
  const matches = SEARCH_INDEX.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.keywords.toLowerCase().includes(query) ||
    item.unit.toLowerCase().includes(query)
  ).slice(0, 8);

  if (!matches.length) {
    searchResults.innerHTML = '<div class="search-result-item"><span class="s-title">No results found</span></div>';
    searchResults.classList.remove('hidden');
    return;
  }

  searchResults.innerHTML = matches.map(item => `
    <div class="search-result-item" data-page="${item.page}" data-section="${item.section || ''}">
      <div class="s-unit">${item.unit}</div>
      <div class="s-title">${highlightMatch(item.title, query)}</div>
    </div>
  `).join('');

  searchResults.querySelectorAll('.search-result-item').forEach(el => {
    el.addEventListener('click', () => {
      showPage(el.dataset.page, el.dataset.section || null);
      searchInput.value = '';
      searchResults.classList.add('hidden');
    });
  });

  searchResults.classList.remove('hidden');
}

function highlightMatch(text, query) {
  const idx = text.toLowerCase().indexOf(query);
  if (idx === -1) return text;
  return text.slice(0, idx) +
    `<strong style="color:var(--accent)">${text.slice(idx, idx + query.length)}</strong>` +
    text.slice(idx + query.length);
}

searchInput.addEventListener('input', e => doSearch(e.target.value));
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    searchResults.classList.add('hidden');
    searchInput.value = '';
  }
});
document.addEventListener('click', e => {
  if (!e.target.closest('.search-wrap')) {
    searchResults.classList.add('hidden');
  }
});

// ── KEYBOARD SHORTCUT: "/" to focus search ────────────────
document.addEventListener('keydown', e => {
  if (e.key === '/' && document.activeElement !== searchInput) {
    e.preventDefault();
    searchInput.focus();
  }
});

// ── SMOOTH SCROLL FOR INTERNAL ANCHOR LINKS ───────────────
document.addEventListener('click', e => {
  const a = e.target.closest('a[href="#"]');
  if (a && a.dataset.section) {
    e.preventDefault();
  }
});

// ── INIT ──────────────────────────────────────────────────
// Show overview on load
showPage('overview');
