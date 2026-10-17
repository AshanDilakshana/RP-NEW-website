// Shared UI logic: theme, mobile nav, scroll effects, reveal animations, PDF preview modal

(function () {
  document.documentElement.classList.add('js');
  // Always default to light theme on open ("kohoma open kalath light background eken open wenna oni")
  var saved = null;
  try {
    saved = sessionStorage.getItem('r26-theme');
    localStorage.removeItem('r26-theme'); // Clear any legacy persistent dark mode
  } catch (e) {}
  document.documentElement.setAttribute('data-theme', saved === 'dark' ? 'dark' : 'light');
})();

document.addEventListener('DOMContentLoaded', function () {
  var root = document.documentElement;

  // ---------- Theme toggle ----------
  var themeToggle = document.getElementById('theme-toggle');
  function paintThemeIcon() {
    if (!themeToggle) return;
    var dark = root.getAttribute('data-theme') === 'dark';
    themeToggle.textContent = dark ? '\u263C' : '\u263E';
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  paintThemeIcon();
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { sessionStorage.setItem('r26-theme', next); } catch (e) {}
      paintThemeIcon();
    });
  }

  // ---------- Active nav link ----------
  var current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    if ((a.getAttribute('href') || '').toLowerCase() === current) a.setAttribute('aria-current', 'page');
  });

  // ---------- Mobile menu ----------
  var menuBtn = document.getElementById('menu-toggle');
  var links = document.getElementById('nav-links');
  if (menuBtn && links) {
    menuBtn.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) { links.classList.remove('is-open'); menuBtn.setAttribute('aria-expanded', 'false'); }
    });
  }

  // ---------- Compact header + back to top ----------
  var toTop = document.createElement('button');
  toTop.className = 'icon-btn to-top';
  toTop.setAttribute('aria-label', 'Back to top');
  toTop.textContent = '\u2191';
  document.body.appendChild(toTop);
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  function onScroll() {
    root.classList.toggle('nav-compact', window.scrollY > 40);
    toTop.classList.toggle('is-visible', window.scrollY > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Scroll reveal ----------
  var targets = document.querySelectorAll('.card, .stat-box, .doc-card, .timeline-item, .domain-subtopic, .section-tag, .callout, .filter-bar, .table-responsive');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    targets.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.setProperty('--delay', ((i % 4) * 0.06) + 's');
      io.observe(el);
    });
  }

  // ---------- Domain sub-nav scroll-spy ----------
  var subLinks = document.querySelectorAll('.subnav a');
  if (subLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    subLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          subLinks.forEach(function (a) { a.classList.remove('is-active'); });
          map[en.target.id].classList.add('is-active');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    document.querySelectorAll('.domain-subtopic').forEach(function (s) { spy.observe(s); });
  }

  // ---------- Universal Preview Modal (PDF & Image Lightbox) ----------
  function closeModal() {
    var m = document.getElementById('doc-modal');
    if (!m) return;
    m.classList.remove('active');
    var iframe = m.querySelector('#modal-iframe');
    if (iframe) iframe.src = 'about:blank';
    var img = m.querySelector('#modal-img');
    if (img) img.src = '';
    document.body.style.overflow = '';
  }

  function ensureModal() {
    var m = document.getElementById('doc-modal');
    if (!m) {
      m = document.createElement('div');
      m.className = 'modal-overlay';
      m.id = 'doc-modal';
      m.setAttribute('role', 'dialog');
      m.setAttribute('aria-modal', 'true');
      m.setAttribute('aria-labelledby', 'modal-title');
      m.innerHTML = '<div class="modal-window">' +
        '<div class="modal-header">' +
          '<h4 id="modal-title" style="margin:0; font-size:1.05rem;">Preview</h4>' +
          '<div style="display:flex; gap:8px; align-items:center;">' +
            '<a id="modal-download" class="btn btn-sm btn-primary" href="https://drive.google.com/drive/folders/15jPRr4kKpi_Cq7aian5UC9jXBJKNIt82?usp=sharing" target="_blank" rel="noopener">⬇ Open in Google Drive ↗</a>' +
            '<button type="button" class="icon-btn" id="modal-close" aria-label="Close modal" style="color:var(--text); background:var(--surface); border:1px solid var(--border);">✕</button>' +
          '</div>' +
        '</div>' +
        '<div class="modal-body" id="modal-body">' +
          '<iframe id="modal-iframe" src="about:blank" title="Document Preview" style="display:none; width:100%; height:100%; border:0;"></iframe>' +
          '<img id="modal-img" src="" alt="Preview" style="display:none; max-width:100%; max-height:82vh; object-fit:contain;">' +
        '</div>' +
      '</div>';
      document.body.appendChild(m);
      m.querySelector('#modal-close').addEventListener('click', closeModal);
      m.addEventListener('click', function (e) { if (e.target === m) closeModal(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
    } else {
      // Ensure close button has listener
      var btn = m.querySelector('#modal-close');
      if (btn && !btn.dataset.bound) {
        btn.dataset.bound = 'true';
        btn.addEventListener('click', closeModal);
        m.addEventListener('click', function (e) { if (e.target === m) closeModal(); });
      }
      // Ensure image element exists inside body if previously only iframe was present
      var body = m.querySelector('.modal-body') || m.querySelector('#modal-body');
      if (body && !m.querySelector('#modal-img')) {
        var newImg = document.createElement('img');
        newImg.id = 'modal-img';
        newImg.style.display = 'none';
        newImg.style.maxWidth = '100%';
        newImg.style.maxHeight = '82vh';
        newImg.style.objectFit = 'contain';
        body.appendChild(newImg);
      }
    }
    return m;
  }

  var DRIVE_FOLDER_URL = 'https://drive.google.com/drive/folders/15jPRr4kKpi_Cq7aian5UC9jXBJKNIt82?usp=sharing';

  window.openDocPreview = function (url, title, downloadUrl) {
    var m = ensureModal();
    var modalTitle = m.querySelector('#modal-title');
    var modalIframe = m.querySelector('#modal-iframe');
    var modalImg = m.querySelector('#modal-img');
    var modalDownload = m.querySelector('#modal-download');

    if (modalTitle) modalTitle.textContent = title || 'Document Preview';
    if (modalImg) modalImg.style.display = 'none';
    if (modalIframe) {
      modalIframe.style.display = 'block';
      modalIframe.src = encodeURI(url);
    }
    if (modalDownload) {
      modalDownload.href = downloadUrl || DRIVE_FOLDER_URL;
      modalDownload.target = '_blank';
      modalDownload.rel = 'noopener';
      modalDownload.removeAttribute('download');
      modalDownload.textContent = '⬇ Open in Google Drive ↗';
    }
    m.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.openImageModal = function (url, title) {
    var m = ensureModal();
    var modalTitle = m.querySelector('#modal-title');
    var modalIframe = m.querySelector('#modal-iframe');
    var modalImg = m.querySelector('#modal-img');
    var modalDownload = m.querySelector('#modal-download');

    if (modalTitle) modalTitle.textContent = title || 'Image Preview';
    if (modalIframe) {
      modalIframe.style.display = 'none';
      modalIframe.src = 'about:blank';
    }
    if (modalImg) {
      modalImg.style.display = 'block';
      modalImg.src = encodeURI(url);
      modalImg.alt = title || 'Preview';
    }
    if (modalDownload) {
      modalDownload.href = encodeURI(url);
      modalDownload.textContent = '⬇ Open Full Image';
    }
    m.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
});
