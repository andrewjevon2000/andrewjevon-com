// Shared behaviour for the case study pages: reading progress, mobile section chips,
// tap-to-zoom screenshots, and the draft-notes toggle.
(function () {
  var body = document.body;

  // Reading progress bar
  var bar = document.createElement('div');
  bar.className = 'progress';
  body.prepend(bar);
  function onScroll() {
    var h = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + '%';
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Section chips: highlight the section in view and keep its chip visible
  var chips = [].slice.call(document.querySelectorAll('.chips a'));
  if (chips.length) {
    var targets = chips.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
    var current = null;
    var ticking = false;
    function syncChips() {
      ticking = false;
      // Active = last section whose top has passed 35% of the viewport
      var line = innerHeight * 0.35, idx = -1;
      targets.forEach(function (s, i) { if (s && s.getBoundingClientRect().top <= line) idx = i; });
      var a = chips[idx] || null;
      if (a === current) return;
      if (current) current.classList.remove('on');
      current = a;
      if (a) {
        a.classList.add('on');
        a.parentNode.scrollTo({ left: a.offsetLeft - 16, behavior: 'smooth' });
      }
    }
    addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(syncChips); }
    }, { passive: true });
    syncChips();
  }

  // Tap-to-zoom: dashboards are unreadable at phone width, so open them full-size
  var lb = document.createElement('div');
  lb.className = 'lb';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.innerHTML = '<div class="bar-top"><span>Swipe to explore</span><button type="button">Close</button></div><div class="scroller"><img alt=""></div>';
  body.appendChild(lb);
  var lbImg = lb.querySelector('img');
  var lastFocus = null;
  function close() { lb.classList.remove('open'); body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
  lb.querySelector('button').addEventListener('click', close);
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('scroller')) close(); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape' && lb.classList.contains('open')) close(); });
  document.querySelectorAll('.shot').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (matchMedia('(min-width:900px)').matches) return;
      var img = btn.querySelector('img');
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
      lastFocus = btn;
      lb.classList.add('open');
      body.style.overflow = 'hidden';
      lb.querySelector('button').focus();
    });
  });

  // Draft notes toggle (remembered per browser when storage is available)
  var KEY = 'aj-case-notes';
  var show = true;
  try { show = localStorage.getItem(KEY) !== 'off'; } catch (e) {}
  var t = document.createElement('button');
  t.type = 'button';
  t.className = 'notes-toggle';
  body.appendChild(t);
  function render() {
    body.classList.toggle('show-notes', show);
    var n = document.querySelectorAll('.draft').length;
    t.textContent = show ? 'Hide to-dos (' + n + ')' : 'Show to-dos (' + n + ')';
  }
  t.addEventListener('click', function () {
    show = !show;
    try { localStorage.setItem(KEY, show ? 'on' : 'off'); } catch (e) {}
    render();
  });
  render();
})();
